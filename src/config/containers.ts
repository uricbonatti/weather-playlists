import { container } from 'tsyringe';
import ISoundtrackProvider from '@interfaces/ISoundtrackProvider';
import IWeatherProvider from '@interfaces/IWeatherProvider';
import SpotifySoundtrackProvider from '@providers/SoundtrackProvider/SpotifySoundtrackProvider';
import OpenWeatherMapProvider from '@providers/WeatherProvider/OpenWeatherMapProvider';
import ICacheProvider from '@interfaces/ICacheProvider';
import RedisCacheProvider from '@providers/CacheProvider/RedisCacheProvider';

container.registerSingleton<ICacheProvider>(
  'CacheProvider',
  RedisCacheProvider
);

container.registerSingleton<ISoundtrackProvider>(
  'SoundtrackProvider',
  SpotifySoundtrackProvider
);

container.registerSingleton<IWeatherProvider>(
  'WeatherProvider',
  OpenWeatherMapProvider
);
