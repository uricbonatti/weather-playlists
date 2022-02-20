import 'reflect-metadata';

import '../../../mocks/interceptors/SpotifyAuthInterceptor';
import '../../../mocks/interceptors/SpotifyApiInterceptor';
import AppError from '@errors/AppError';
import SpotifySoundtrackProvider from '@providers/SoundtrackProvider/SpotifySoundtrackProvider';
import FakeCacheProvider from './../../../mocks/FakeCacheProvider';

import * as rockTrack from '../../../mocks/spotify/rock.json';
import * as popTrack from '../../../mocks/spotify/pop.json';
import * as classicTrack from '../../../mocks/spotify/classico.json';
import * as partyTrack from '../../../mocks/spotify/festa.json';
import SpotifyWebApi from 'spotify-web-api-node';

let provider: SpotifySoundtrackProvider;
let fakeCacheProvider: FakeCacheProvider;

describe('SpotifySoundtrackProvider', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    fakeCacheProvider = new FakeCacheProvider();
    provider = new SpotifySoundtrackProvider(fakeCacheProvider);
  });
  it('should be able to get the tracks from spotify api with valid params on search ', async () => {
    const data = await provider.search('genre:pop music');
    expect(data).toMatchObject({ soundtrack: popTrack });
  });
  it('should throw an app error when occurs on search', async () => {
    await expect(provider.search('failure')).rejects.toBeInstanceOf(AppError);
  });
  it('should be able to get the tracks from cache on search', async () => {
    fakeCacheProvider.save('weather_playlists:spotify:genre:classical', {
      soundtrack: { mockedTracks: true }
    });
    const data = await provider.search('genre:classical');
    expect(data).toMatchObject({ soundtrack: { mockedTracks: true } });
  });
  it('should be able to get the tracks from spotify api and save in cache on search ', async () => {
    await provider.search('genre:classic rock');
    const data = await fakeCacheProvider.recover(
      'weather_playlists:spotify:genre:classic rock'
    );
    expect(data).toMatchObject({ soundtrack: rockTrack });
  });
  it('should be able to auth on spotify caching token on init', async () => {
    await provider.init();
    const data = await fakeCacheProvider.recover(
      'weather_playlists:spotify:token'
    );
    expect(data).toStrictEqual({ token: 'NgCXRKMzYjw' });
  });
  it('should be able to recover from cache the auth token on init', async () => {
    const spy = jest.spyOn(SpotifyWebApi.prototype, 'setAccessToken');
    const provider2 = new SpotifySoundtrackProvider(fakeCacheProvider);
    await fakeCacheProvider.save('weather_playlists:spotify:token', {
      token: 'FakeToken'
    });
    await provider2.init();
    expect(spy).toHaveBeenCalledWith('FakeToken');
  });
});
