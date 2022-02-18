import { Coordinates } from '@interfaces/IWeatherProvider';

export function betweenRange(value: number, n1: number, n2: number): boolean {
  return n1 <= value && n2 >= value;
}

export function isValidLongitude(lon: number): boolean {
  return betweenRange(lon, -180, 180);
}
export function isValidLatitude(lat: number): boolean {
  return betweenRange(lat, -90, 90);
}

export default function validateCoordinates({
  lat,
  lon
}: Coordinates): boolean {
  return isValidLatitude(lat) && isValidLongitude(lon);
}
