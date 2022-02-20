import nock from 'nock';

const baseUrl = 'https://accounts.spotify.com/api/';

const SpotifyAuthInterceptor = nock(baseUrl).persist();
SpotifyAuthInterceptor.post('/token').reply(200, {
  access_token: 'NgCXRKMzYjw',
  token_type: 'bearer',
  expires_in: 3600
});
export default SpotifyAuthInterceptor;
