import SoundtrackDTO from './SoundtrackDTO';

export default interface ISoundtrackProvider {
  search(searchParams: string): Promise<SoundtrackDTO>;
}
