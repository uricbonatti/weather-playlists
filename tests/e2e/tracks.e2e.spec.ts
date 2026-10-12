import 'reflect-metadata';
import { RedisContainer, StartedRedisContainer } from '@testcontainers/redis';
import Redis from 'ioredis';
import nock from 'nock';
import request from 'supertest';
import type { Express } from 'express';
import { container } from 'tsyringe';
import type RedisCacheProvider from '@providers/CacheProvider/RedisCacheProvider';

import partyTracks from '../mocks/spotify/festa.json';

// Fluxo completo: Express real + Redis real (Testcontainers); só as APIs externas (OpenWeather e Spotify) são simuladas.
jest.setTimeout(120_000);

const OPEN_WEATHER = 'https://api.openweathermap.org';
const SPOTIFY_ACCOUNTS = 'https://accounts.spotify.com';
const SPOTIFY_API = 'https://api.spotify.com';

let redisContainer: StartedRedisContainer;
let redis: Redis;
let app: Express;

function mockWeather(city: string, temp: number) {
  return nock(OPEN_WEATHER)
    .get('/data/2.5/weather')
    .query({
      appid: process.env.OPEN_WEATHER_API_KEY,
      units: 'metric',
      q: city
    })
    .reply(200, {
      coord: { lat: -8.05, lon: -34.9 },
      main: { temp },
      timezone: -3
    });
}

beforeAll(async () => {
  // O nock intercepta o módulo http inteiro: desliga enquanto o Testcontainers fala com o Docker.
  nock.restore();
  redisContainer = await new RedisContainer('redis:7-alpine').start();
  process.env.REDIS_HOST = redisContainer.getHost();
  process.env.REDIS_PORT = String(redisContainer.getPort());
  process.env.ENABLE_METRICS = 'true';
  process.env.MAX_REQUESTS = '1000';

  // Importa só depois de configurar o ambiente: config e DI leem o env no import.
  await import('@config/containers');
  app = (await import('@app/app')).default as Express;

  redis = new Redis(redisContainer.getPort(), redisContainer.getHost());
  nock.activate();
  nock.disableNetConnect();
  nock.enableNetConnect(/(127\.0\.0\.1|localhost)/);
});

afterEach(() => nock.cleanAll());

afterAll(async () => {
  nock.enableNetConnect();
  nock.restore();
  await container.resolve<RedisCacheProvider>('CacheProvider').disconnect();
  redis?.disconnect();
  await redisContainer?.stop();
});

describe('GET /tracks (e2e)', () => {
  it('sugere músicas de festa para temperatura acima de 30°C e grava no cache do Redis', async () => {
    const weather = mockWeather('Recife', 32);
    const token = nock(SPOTIFY_ACCOUNTS).post('/api/token').reply(200, {
      access_token: 'e2e-token',
      token_type: 'bearer',
      expires_in: 3600
    });
    const search = nock(SPOTIFY_API)
      .get('/v1/search/')
      .query({ type: 'track', q: 'genre:party' })
      .reply(200, partyTracks);

    const res = await request(app).get('/tracks').query({ city: 'Recife' });

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);
    expect(res.body[0]).toEqual(
      expect.objectContaining({
        name: expect.any(String),
        uri: expect.any(String)
      })
    );
    expect(weather.isDone() && token.isDone() && search.isDone()).toBe(true);

    const cached = await redis.get('weather_playlists:spotify:genre:party');
    expect(JSON.parse(cached as string).soundtrack).toEqual(res.body);
    expect(
      await redis.ttl('weather_playlists:spotify:genre:party')
    ).toBeGreaterThan(3500);
  });

  it('serve a playlist do cache do Redis sem chamar o Spotify de novo', async () => {
    mockWeather('Recife', 33);
    // Sem mock do Spotify: se o cache falhar, a requisição externa é bloqueada e a resposta vira erro.

    const res = await request(app).get('/tracks').query({ city: 'Recife' });

    expect(res.status).toBe(200);
    expect(res.body.length).toBeGreaterThan(0);
    expect(nock.pendingMocks()).toHaveLength(0);
  });

  it('retorna 404 quando a cidade não existe', async () => {
    nock(OPEN_WEATHER)
      .get('/data/2.5/weather')
      .query(true)
      .reply(404, { cod: '404', message: 'city not found' });

    const res = await request(app).get('/tracks').query({ city: 'Bhujerba' });

    expect(res.status).toBe(404);
    expect(res.body).toEqual({
      status: 'error',
      message: 'Location not found'
    });
  });

  it('retorna 400 quando não recebe cidade nem coordenadas', async () => {
    const res = await request(app).get('/tracks');

    expect(res.status).toBe(400);
    expect(res.body.status).toBe('error');
  });

  it('expõe métricas Prometheus em /metrics', async () => {
    const res = await request(app).get('/metrics');

    expect(res.status).toBe(200);
    expect(res.text).toContain('http_request_duration_seconds');
    expect(res.text).toContain('process_cpu_user_seconds_total');
  });
});
