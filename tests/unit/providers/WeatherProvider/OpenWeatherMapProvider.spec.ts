import '../../../mocks/interceptors/OpenWeatherMapApiInterceptor';
import OpenWeatherMapProvider from '@providers/WeatherProvider/OpenWeatherMapProvider';
import AppError from '@errors/AppError';

let provider: OpenWeatherMapProvider;

describe('OpenWeatherMapProvider', () => {
  beforeEach(() => {
    provider = new OpenWeatherMapProvider();
  });
  it('should be able to get the weather params from openweathermap api with city existing', async () => {
    const data = await provider.search({
      city: 'São Paulo'
    });
    expect(data).toMatchObject({
      coord: {
        lon: -46.6388,
        lat: -23.5489
      },
      main: {
        temp: -25.5
      },
      timezone: -3
    });
  });
  it('should be able to get the weather params from openweathermap api with valid coordinates', async () => {
    const data = await provider.search({
      coordinates: {
        lat: -23.5489,
        lon: -46.6388
      }
    });
    expect(data).toMatchObject({
      coord: {
        lon: -46.6388,
        lat: -23.5489
      },
      main: {
        temp: -23.5
      },
      timezone: -3
    });
  });
  it('should throw an AppError with a non exist city', async () => {
    await expect(
      provider.search({
        city: 'Bhujerba'
      })
    ).rejects.toBeInstanceOf(AppError);
  });
  it('should throw an Error with an invalid latitude', async () => {
    await expect(
      provider.search({
        coordinates: {
          lat: -123.5489,
          lon: -46.6388
        }
      })
    ).rejects.toBeInstanceOf(Error);
  });
  it('should throw an Error with an invalid longitude', async () => {
    await expect(
      provider.search({
        coordinates: {
          lat: -23.5489,
          lon: -246.6388
        }
      })
    ).rejects.toBeInstanceOf(Error);
  });
});
