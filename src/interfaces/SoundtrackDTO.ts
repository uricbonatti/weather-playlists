export interface SpotifySoundtrack {
  name: string;
  uri: string;
  spotify_link: string;
}

export default interface SoundtrackDTO {
  soundtrack: SpotifySoundtrack[];
}
