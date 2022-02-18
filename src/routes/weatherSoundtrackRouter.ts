import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import WeatherSoundtrackController from '@controllers/WeatherSoundtrackController';

const weatherSoundtrackController = new WeatherSoundtrackController();

const weatherSoundtrackRouter = Router();

weatherSoundtrackRouter.get(
  '/tracks',
  celebrate({
    [Segments.QUERY]: Joi.object().keys({
      city: Joi.string(),
      coordinates: Joi.object().keys({
        lat: Joi.number().required().min(-90).max(90),
        lon: Joi.number().required().min(-180).max(180)
      })
    })
  }),
  weatherSoundtrackController.getSoundtrack
);

export default weatherSoundtrackRouter;
