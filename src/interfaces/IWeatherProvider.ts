import WeatherDTO from './WeatherDTO';
import LocationDTO from './LocationDTO';

export default interface IWeatherProvider {
  search(location: LocationDTO): Promise<WeatherDTO>;
}
