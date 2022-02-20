import nock from 'nock';
import * as rockTrack from '../spotify/rock.json';
import * as popTrack from '../spotify/pop.json';
import * as classicTrack from '../spotify/classico.json';
import * as partyTrack from '../spotify/festa.json';

const baseUrl = 'https://api.spotify.com/v1/';

const SpotifyApiInterceptor = nock(baseUrl, {
  reqheaders: {
    'accept-encoding': 'gzip, deflate',
    authorization: 'Bearer NgCXRKMzYjw'
  }
}).persist();
SpotifyApiInterceptor.get('/search/?type=track&q=genre%3Aclassical').reply(
  200,
  partyTrack
);

SpotifyApiInterceptor.get('/search/?type=track&q=genre%3Apop%20music').reply(
  200,
  popTrack
);
SpotifyApiInterceptor.get('/search/?type=track&q=genre%3Aclassic%20rock').reply(
  200,
  rockTrack
);
SpotifyApiInterceptor.get('/search/?type=track&q=genre%3Aclassical').reply(
  200,
  classicTrack
);

SpotifyApiInterceptor.get('/search/?type=track&q=failure').reply(404, {
  error: {
    status: 404,
    message: 'The tracks cannot be found'
  }
});

export default SpotifyApiInterceptor;
