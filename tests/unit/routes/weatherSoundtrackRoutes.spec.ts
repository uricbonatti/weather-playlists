import { Server } from 'http';
import 'reflect-metadata';

import supertest, { SuperAgentTest } from 'supertest';
import { container } from 'tsyringe';

import app from '@app/app';
import AppError from '@errors/AppError';

let server: Server;
let agent: SuperAgentTest;
let forceError: boolean;
let forceAppError: boolean;

class GenericMockedServices {
  public async execute() {
    if (forceError) {
      throw new Error('Mocked Error');
    }
    if (forceAppError) {
      throw new AppError('Mocked Error', 404);
    }
    return { soundtrack: { mocked: true } };
  }
}
describe('Analysis Routes', () => {
  beforeEach((done) => {
    forceError = false;
    forceAppError = false;
    jest
      .spyOn(container, 'resolve')
      .mockReturnValue(new GenericMockedServices());
    server = app.listen('3334', () => {
      agent = supertest.agent(server);
      return done();
    });
  });
  afterEach(() => {
    return server && server.close();
  });
  it('should return status 200 when soundtrack is sugested without errors on GET /tracks', async () => {
    const response = await agent
      .get('/tracks')
      .query({ city: 'São Paulo', lat: -23.5, lon: -46.6 });
    expect(response.statusCode).toEqual(200);
    expect(response.body).toEqual({ mocked: true });
  });
  it('should return status 200 when soundtrack is sugested without errors only with city on GET /tracks', async () => {
    const response = await agent.get('/tracks').query({ city: 'São Paulo' });
    expect(response.statusCode).toEqual(200);
    expect(response.body).toEqual({ mocked: true });
  });
  it('should return status 200 when soundtrack is sugested without errors only with coordinates on GET /tracks', async () => {
    const response = await agent
      .get('/tracks')
      .query({ lat: -23.5, lon: -46.6 });
    expect(response.statusCode).toEqual(200);
    expect(response.body).toEqual({ mocked: true });
  });
  it('should return status 404 whithout any query params on GET /tracks', async () => {
    const response = await agent.get('/tracks');
    expect(response.statusCode).toEqual(400);
    expect(response.body).toEqual({
      status: 'error',
      route: '/tracks',
      message: 'city or valid coordinates(lon,lon) must be informed.',
      examples: ['/tracks?city=São Paulo', '/tracks?lat=-23.5&lon=-46.6']
    });
  });
  it('should return status 500 when an unknown error occurs on GET /tracks', async () => {
    forceError = true;
    const response = await agent
      .get('/tracks')
      .query({ lat: -23.5, lon: -46.6 });
    expect(response.statusCode).toEqual(500);
    expect(response.body).toEqual({
      status: 'error',
      message: 'Internal server error.'
    });
  });
  it('should return status 400 when an AppError occurs on GET /tracks', async () => {
    forceAppError = true;
    const response = await agent
      .get('/tracks')
      .query({ lat: -23.5, lon: -46.6 });
    expect(response.statusCode).toEqual(404);
    expect(response.body).toEqual({
      status: 'error',
      message: 'Mocked Error'
    });
  });
});
