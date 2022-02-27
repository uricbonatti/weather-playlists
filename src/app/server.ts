import 'reflect-metadata';
import '../telemetry';
import '@config/containers';

import app from './app';
import env from '@config/env';

import logger from '@utils/logger';

app.listen(env.PORT, () => {
  logger.info(`[RESTARTING] Server running on port ${env.PORT}`);
});
