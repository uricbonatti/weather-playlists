import axios from 'axios';

import WeatherDTO from '@interfaces/WeatherDTO';
import IWeatherProvider from '@interfaces/IWeatherProvider';
import env from '@config/env';
import AppError from '@errors/AppError';
import logger from '@utils/logger';
import LocationDTO from '@interfaces/LocationDTO';

class OpenWeatherMapProvider implements IWeatherProvider {
  private apiBaseUrl = 'https://api.openweathermap.org/data/2.5/weather';
  public async search(
    { city: cityName, coordinates }: LocationDTO = {
      city: '',
      coordinates: { lat: 0, lon: 0 }
    }
  ): Promise<WeatherDTO> {
    logger.info(
      `[OpenWeatherMapProvider] - search - Data:${JSON.stringify({
        cityName,
        ...coordinates
      })}`
    );

    const city = cityName && cityName.length ? cityName : undefined;
    try {
      const { data } = await axios.get<WeatherDTO>(this.apiBaseUrl, {
        params: {
          appid: env.OPEN_WEATHER_API_KEY,
          units: 'metric',
          q: city,
          ...coordinates
        }
      });
      return data;
    } catch (err) {
      logger.error('[OpenWeatherMapProvider] - search - Error:', err);
      if (Number(err.response.data.cod) === 404) {
        throw new AppError('Location not found', 404);
      }
      throw err;
    }
  }
}

export default OpenWeatherMapProvider;
