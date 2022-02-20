import IWeatherProvider from '@interfaces/IWeatherProvider';
import LocationDTO from '@interfaces/LocationDTO';
import WeatherDTO from '@interfaces/WeatherDTO';

class FakeWeatherProvider implements IWeatherProvider {
  public async search({ city }: LocationDTO): Promise<WeatherDTO> {
    switch (city) {
      case 'São Paulo':
        return {
          coord: { lat: -23.5, lon: -46.6 },
          main: { temp: 16, humidity: 10 },
          timezone: -3
        };
      case 'Rio de Janeiro':
        return {
          coord: { lat: -22.9, lon: -43.2 },
          main: { temp: 40, humidity: 10 },
          timezone: -3
        };
      case 'New York':
        return {
          coord: { lat: 40.7, lon: -74.0 },
          main: { temp: 13, humidity: 10 },
          timezone: -3
        };
      case 'Curitiba':
        return {
          coord: { lat: -25.4, lon: -49.3 },
          main: { temp: -10, humidity: 10 },
          timezone: -3
        };
      default:
        return {
          coord: { lat: -22.9, lon: -43.2 },
          main: { temp: 40, humidity: 10 },
          timezone: -3
        };
    }
  }
}

export default FakeWeatherProvider;
