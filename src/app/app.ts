import express from 'express';
import 'express-async-errors';
import cors from 'cors';

import corsConfig from '@config/corsConfig';
import weatherSoundtrackRoutes from '@routes/weatherSoundtrackRoutes';
import errorHandler from '@errors/errorHandler';
import limiter from '@middlewares/limiter';
import env from '@config/env';

function app() {
  const expressApp = express();

  expressApp.use(cors(corsConfig));
  expressApp.use(express.json());
  expressApp.get('/health', (req, res) => res.json(env));
  expressApp.use(limiter);
  expressApp.use(weatherSoundtrackRoutes);

  expressApp.use(errorHandler);

  return expressApp;
}

export default app();
