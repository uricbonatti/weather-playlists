/* eslint-disable @typescript-eslint/no-var-requires */
import ISoundtrackProvider from '@interfaces/ISoundtrackProvider';
import SoundtrackDTO from '@interfaces/SoundtrackDTO';
import * as rockTrack from './spotify/rock.json';
import * as popTrack from './spotify/pop.json';
import * as classicTrack from './spotify/classico.json';
import * as partyTrack from './spotify/festa.json';

class FakeSoundtrackProvider implements ISoundtrackProvider {
  public async search(searchParams: string): Promise<SoundtrackDTO> {
    switch (searchParams) {
      case 'genre:pop music':
        return { soundtrack: popTrack };
      case 'genre:classic rock':
        return { soundtrack: rockTrack };
      case 'genre:classical':
        return { soundtrack: classicTrack };
      case 'genre:party':
        return { soundtrack: partyTrack };
      default:
        return { soundtrack: classicTrack };
    }
  }
}

export default FakeSoundtrackProvider;
