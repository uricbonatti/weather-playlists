export interface Coordinates {
  lat: number;
  lon: number;
}

export default interface LocationDTO {
  city?: string;
  coordinates?: Coordinates;
}
