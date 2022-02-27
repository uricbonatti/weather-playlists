import express from 'express';
import 'express-async-errors';
import cors from 'cors';

import corsConfig from '@config/corsConfig';
import weatherSoundtrackRouter from '@routes/weatherSoundtrackRouter';
import errorHandler from '@errors/errorHandler';
import limiter from '@middlewares/limiter';
import metrics from '@middlewares/metrics';
import env from '@config/env';

function app() {
  const expressApp = express();
  expressApp.use(cors(corsConfig));
  env.ENABLE_METRICS && expressApp.use(metrics);
  expressApp.use(express.json());
  expressApp.use(limiter);
  expressApp.use(weatherSoundtrackRouter);

  expressApp.use(errorHandler);

  return expressApp;
}

export default app();
