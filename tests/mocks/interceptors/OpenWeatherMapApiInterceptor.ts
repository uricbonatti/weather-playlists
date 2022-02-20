import env from '@config/env';
import nock from 'nock';
// Bhujerba

const baseUrl = 'https://api.openweathermap.org/data/2.5';

const failureParams1 = {
  appid: env.OPEN_WEATHER_API_KEY,
  units: 'metric',
  q: 'Bhujerba'
};
const failureParams2 = {
  appid: env.OPEN_WEATHER_API_KEY,
  units: 'metric',
  lat: -123.5489,
  lon: -46.6388
};
const failureParams3 = {
  appid: env.OPEN_WEATHER_API_KEY,
  units: 'metric',
  lat: -23.5489,
  lon: -146.6388
};
const successParams1 = {
  appid: env.OPEN_WEATHER_API_KEY,
  units: 'metric',
  lat: -23.5489,
  lon: -46.6388
};
const successParams2 = {
  appid: env.OPEN_WEATHER_API_KEY,
  units: 'metric',
  q: 'São Paulo'
};

const OpenWeatherMapApiInterceptor = nock(baseUrl).persist();

OpenWeatherMapApiInterceptor.get('/weather')
  .query(successParams1)
  .reply(200, {
    coord: {
      lon: -46.6388,
      lat: -23.5489
    },
    main: {
      temp: -23.5
    },
    timezone: -3
  });

OpenWeatherMapApiInterceptor.get('/weather')
  .query(successParams2)
  .reply(200, {
    coord: {
      lon: -46.6388,
      lat: -23.5489
    },
    main: {
      temp: -25.5
    },
    timezone: -3
  });
OpenWeatherMapApiInterceptor.get('/weather').query(failureParams1).reply(404, {
  cod: '404',
  message: 'city not found'
});
OpenWeatherMapApiInterceptor.get('/weather').query(failureParams2).reply(400, {
  cod: '400',
  message: 'wrong latitude'
});
OpenWeatherMapApiInterceptor.get('/weather').query(failureParams3).reply(400, {
  cod: '400',
  message: 'wrong longitude'
});

export default OpenWeatherMapApiInterceptor;
