import { inject, injectable } from 'tsyringe';

import SpotifyWebApi from 'spotify-web-api-node';
import AppError from '@errors/AppError';
import env from '@config/env';
import ISoundtrackProvider from '@interfaces/ISoundtrackProvider';
import logger from '@utils/logger';
import ICacheProvider from '@interfaces/ICacheProvider';

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
    try {
      const cacheData = await this.cacheProvider.recover<{ token: string }>(
        'spotify_token'
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
    } catch (err) {
      logger.error('[SpotifySoundtrackProvider] - init  - Error:', err);
      throw new AppError('Error getting soundtrack data', 500);
    }
  }

  public async search(searchParams: string): Promise<any> {
    const cacheKey = `weather_playlists:spotify:${searchParams}`;
    try {
      const cachedData = await this.cacheProvider.recover<any>(cacheKey);
      if (cachedData) {
        return cachedData;
      }
      await this.init();
      const { body } = await this.spotifyApi.searchTracks(searchParams);
      await this.cacheProvider.save(cacheKey, body);
      return body;
    } catch (err) {
      logger.error('[SpotifySoundtrackProvider] - search - Error:', err);
      throw new AppError('Error getting soundtrack data');
    }
  }
}

export default SpotifySoundtrackProvider;
