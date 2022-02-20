import { findOnCelebrateErrorResponse } from '@errors/errorHandler';

describe('findOnCelebrateErrorResponse', () => {
  it('should return correct response when the key is found on celebrateErrorResponses', () => {
    const key = 'city';
    const response = findOnCelebrateErrorResponse(
      key,
      'Fake default error message'
    );
    expect(response).toEqual({
      status: 'error',
      route: '/tracks',
      message: 'city or valid coordinates(lon,lon) must be informed.',
      examples: ['/tracks?city=São Paulo', '/tracks?lat=-23.5&lon=-46.6']
    });
  });

  it('should return correct response when the key is not found on celebrateErrorResponses', () => {
    const key = 'fake';
    const response = findOnCelebrateErrorResponse(
      key,
      'Fake default error message'
    );
    expect(response).toEqual({
      status: 'error',
      message: 'Fake default error message'
    });
  });
});
