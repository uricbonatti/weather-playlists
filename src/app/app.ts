import express from 'express';
import 'express-async-errors';
import cors from 'cors';

import corsConfig from '@config/corsConfig';
import weatherSoundtrackRouter from '@routes/weatherSoundtrackRouter';
import errorHandler from '@errors/errorHandler';
import limiter from '@middlewares/limiter';

function app() {
  const expressApp = express();

  expressApp.use(cors(corsConfig));
  expressApp.use(limiter);
  expressApp.use(express.json());
  expressApp.use(weatherSoundtrackRouter);

  expressApp.use(errorHandler);

  return expressApp;
}

export default app();
