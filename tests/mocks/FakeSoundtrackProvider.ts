/* eslint-disable @typescript-eslint/no-var-requires */
import ISoundtrackProvider from '@interfaces/ISoundtrackProvider';
import SoundtrackDTO from '@interfaces/SoundtrackDTO';

class FakeSoundtrackProvider implements ISoundtrackProvider {
  public async search(searchParams: string): Promise<SoundtrackDTO> {
    switch (searchParams) {
      case 'genre:pop music':
        return {
          soundtrack: [
            {
              name: 'Love Story (Taylor’s Version)',
              uri: 'spotify:track:5JixKG2cp8uTu7RmjmD0aQ',
              spotify_link:
                'https://open.spotify.com/track/5JixKG2cp8uTu7RmjmD0aQ'
            }
          ]
        };
      case 'genre:classic rock':
        return {
          soundtrack: [
            {
              name: 'Have You Ever Seen The Rain',
              uri: 'spotify:track:675SuKGFjigRRcGg8Ju6gT',
              spotify_link:
                'https://open.spotify.com/track/675SuKGFjigRRcGg8Ju6gT'
            }
          ]
        };
      case 'genre:classical':
        return {
          soundtrack: [
            {
              name: 'Divenire',
              uri: 'spotify:track:6HqaTDzMAHSlhXuMysUOUb',
              spotify_link:
                'https://open.spotify.com/track/6HqaTDzMAHSlhXuMysUOUb'
            }
          ]
        };
      case 'genre:party':
        return {
          soundtrack: [
            {
              name: 'Wenn Es Nachts Ist',
              uri: 'spotify:track:5r0iMfLookwrfLiYNXEgF1',
              spotify_link:
                'https://open.spotify.com/track/675SuKGFjigRRcGg8Ju6gT'
            }
          ]
        };
      default:
        return {
          soundtrack: [
            {
              name: 'Divenire',
              uri: 'spotify:track:6HqaTDzMAHSlhXuMysUOUb',
              spotify_link:
                'https://open.spotify.com/track/6HqaTDzMAHSlhXuMysUOUb'
            }
          ]
        };
    }
  }
}

export default FakeSoundtrackProvider;
