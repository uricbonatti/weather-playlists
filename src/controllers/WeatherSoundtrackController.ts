import { Request, Response } from 'express';
import logger from '@utils/logger';
import { container } from 'tsyringe';
import WeatherSoundtrackService from '@services/WeatherSoundtrackService';
import LocationDTO from '@interfaces/LocationDTO';

class WeatherSoundtrackController {
  public async getSoundtrack(req: Request, res: Response): Promise<Response> {
    const { city, coordinates }: LocationDTO = req.query;
    logger.info(
      `[WeatherSoundtrackController] - getSoundtrack - Location: ${JSON.stringify(
        { city, coordinates }
      )}`
    );
    const weatherSoundtrackService = container.resolve(
      WeatherSoundtrackService
    );
    const tracks = await weatherSoundtrackService.execute({
      city,
      coordinates
    });

    return res.status(200).json(tracks);
  }
}

export default WeatherSoundtrackController;
