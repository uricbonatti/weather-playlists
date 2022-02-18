import { Coordinates } from './LocationDTO';

export default interface WeatherDTO {
  coord: Coordinates;
  main: {
    temp: number;
    [key: string]: number;
  };
  timezone: number;
  [key: string]: any;
}
