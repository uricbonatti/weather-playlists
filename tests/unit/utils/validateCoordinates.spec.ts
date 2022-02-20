import validateCoordinates, {
  betweenRange,
  isValidLatitude,
  isValidLongitude
} from '@utils/validateCoordinates';

describe('Validade Coordinates', () => {
  it('should return true when the coordinates are valid on validateCoordinates', () => {
    const coordinates = {
      lat: -10,
      lon: -10
    };
    const result = validateCoordinates(coordinates);
    expect(result).toBeTruthy();
  });

  it('should return false when the latitude is invalid on validateCoordinates', () => {
    const coordinates = {
      lat: -200,
      lon: -10
    };
    const result = validateCoordinates(coordinates);

    expect(result).toBeFalsy();
  });

  it('should return false when the longitude is invalid on validateCoordinates', () => {
    const coordinates = {
      lat: -10,
      lon: -200
    };
    const result = validateCoordinates(coordinates);
    expect(result).toBeFalsy();
  });
  it('should return false when the latitude is invalid on isValidLatitude', () => {
    const lat = -200;
    const result = isValidLatitude(lat);
    expect(result).toBeFalsy();
  });
  it('should return true when the latitude is valid on isValidLatitude', () => {
    const lat = 89;
    const result = isValidLatitude(lat);
    expect(result).toBeTruthy();
  });
  it('should return false when the longitude is invalid on isValidLongitude', () => {
    const lat = 189;
    const result = isValidLongitude(lat);
    expect(result).toBeFalsy();
  });
  it('should return true when the longitude is valid on isValidLongitude', () => {
    const lat = 89;
    const result = isValidLongitude(lat);
    expect(result).toBeTruthy();
  });
  it('should return false when the number stay out betweenRange', () => {
    const min = -10;
    const max = 10;
    const num = 15;
    const result = betweenRange(num, min, max);
    expect(result).toBeFalsy();
  });
  it('should return true when the number stay in betweenRange', () => {
    const min = -10;
    const max = 10;
    const num = 5;
    const result = betweenRange(num, min, max);
    expect(result).toBeTruthy();
  });
});
