import { inject, injectable } from 'tsyringe';
import logger from '@utils/logger';
import IWeatherProvider from '@interfaces/IWeatherProvider';
import ISoundtrackProvider from '@interfaces/ISoundtrackProvider';
import LocationDTO from './../interfaces/LocationDTO';
import AppError from '@errors/AppError';
import SoundtrackDTO from '@interfaces/SoundtrackDTO';

enum MusicGenre {
  party = 'genre:party',
  pop = 'genre:pop music',
  rock = 'genre:classic rock',
  classic = 'genre:classical'
}

@injectable()
class SoundtrackByTemperatureService {
  constructor(
    @inject('WeatherProvider')
    private weatherProvider: IWeatherProvider,
    @inject('SoundtrackProvider')
    private soundtrackProvider: ISoundtrackProvider
  ) {}

  public async execute({
    city,
    coordinates
  }: LocationDTO): Promise<SoundtrackDTO> {
    logger.info(
      `[WeatherSoundtrackService] - execute - Location: ${JSON.stringify({
        city,
        coordinates
      })}`
    );
    if (city || coordinates) {
      const { main } = await this.weatherProvider.search({ city, coordinates });
      const { temp } = main;

      let soundtrackGenre = MusicGenre.classic;
      if (temp > 30) {
        soundtrackGenre = MusicGenre.party;
      } else if (temp >= 15) {
        soundtrackGenre = MusicGenre.pop;
      } else if (temp >= 10) {
        soundtrackGenre = MusicGenre.rock;
      }
      logger.info(
        `[WeatherSoundtrackService] - execute - Temp: ${temp} - Genre: ${soundtrackGenre}`
      );
      return this.soundtrackProvider.search(soundtrackGenre);
    }
    throw new AppError('City or valid coordinates must be informed');
  }
}
export default SoundtrackByTemperatureService;
