import { Request, Response } from 'express';
import logger from '@utils/logger';
import { container } from 'tsyringe';
import WeatherSoundtrackService from '@services/WeatherSoundtrackService';
import validateCoordinates from '@utils/validateCoordinates';
import AppError from '@errors/AppError';

interface QueryLocation {
  city?: string;
  lat?: number;
  lon?: number;
}

class WeatherSoundtrackController {
  public async getSoundtrack(req: Request, res: Response): Promise<Response> {
    const { city, lat, lon }: QueryLocation = req.query;
    let coordinates = { lat: 0, lon: 0 };
    const validCoordinate = lat && lon && validateCoordinates({ lat, lon });
    if (!city && !validCoordinate) {
      throw new AppError('City or valid coordinates must be informed');
    }
    if (validCoordinate) {
      coordinates = { lat, lon };
    }
    logger.info(
      `[WeatherSoundtrackController] - getSoundtrack - Location: ${JSON.stringify(
        { city, coordinates }
      )}`
    );
    const weatherSoundtrackService = container.resolve(
      WeatherSoundtrackService
    );
    const { soundtrack } = await weatherSoundtrackService.execute({
      city,
      coordinates
    });

    return res.status(200).json(soundtrack);
  }
}

export default WeatherSoundtrackController;
