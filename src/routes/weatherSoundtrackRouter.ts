import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import WeatherSoundtrackController from '@controllers/WeatherSoundtrackController';

const weatherSoundtrackController = new WeatherSoundtrackController();

const weatherSoundtrackRouter = Router();

weatherSoundtrackRouter.get(
  '/tracks',
  celebrate({
    [Segments.QUERY]: Joi.object()
      .keys({
        city: Joi.string(),
        lat: Joi.number()
          .min(-90)
          .max(90)
          .when('city', { not: Joi.exist(), then: Joi.required() }),
        lon: Joi.number()
          .min(-180)
          .max(180)
          .when('city', { not: Joi.exist(), then: Joi.required() })
      })
      .messages({
        city: 'City or valid coordinates must be informed',
        lat: 'City or valid coordinates must be informed',
        lon: 'City or valid coordinates must be informed'
      })
  }),
  weatherSoundtrackController.getSoundtrack
);

export default weatherSoundtrackRouter;
