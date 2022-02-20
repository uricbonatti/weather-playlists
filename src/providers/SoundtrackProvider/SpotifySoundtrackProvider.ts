import { inject, injectable } from 'tsyringe';

import SpotifyWebApi from 'spotify-web-api-node';
import AppError from '@errors/AppError';
import env from '@config/env';
import ISoundtrackProvider from '@interfaces/ISoundtrackProvider';
import logger from '@utils/logger';
import ICacheProvider from '@interfaces/ICacheProvider';
import SoundtrackDTO, { SpotifySoundtrack } from '@interfaces/SoundtrackDTO';

@injectable()
class SpotifySoundtrackProvider implements ISoundtrackProvider {
  private spotifyApi: SpotifyWebApi;

  constructor(
    @inject('CacheProvider')
    private cacheProvider: ICacheProvider
  ) {
    this.spotifyApi = new SpotifyWebApi({
      clientId: env.SPOTIFY_CLIENT_ID,
      clientSecret: env.SPOTIFY_SECRET
    });
  }

  public async init() {
    const cacheData = await this.cacheProvider.recover<{ token: string }>(
      'weather_playlists:spotify:token'
    );
    if (!cacheData) {
      const data = await this.spotifyApi.clientCredentialsGrant();
      await this.cacheProvider.save('weather_playlists:spotify:token', {
        token: data.body.access_token
      });
      this.spotifyApi.setAccessToken(data.body.access_token);
    } else {
      this.spotifyApi.setAccessToken(cacheData.token);
    }
  }

  public async search(searchParams: string): Promise<SoundtrackDTO> {
    const cacheKey = `weather_playlists:spotify:${searchParams}`;
    try {
      const cachedData = await this.cacheProvider.recover<SoundtrackDTO>(
        cacheKey
      );
      if (cachedData) {
        return cachedData;
      }
      await this.init();
      const { body } = await this.spotifyApi.searchTracks(searchParams);
      const tracks = { soundtrack: body as SpotifySoundtrack };
      await this.cacheProvider.save(cacheKey, tracks);

      return tracks;
    } catch (err) {
      logger.error('[SpotifySoundtrackProvider] - search - Error:', err);
      throw new AppError('Error getting soundtrack data');
    }
  }
}

export default SpotifySoundtrackProvider;
