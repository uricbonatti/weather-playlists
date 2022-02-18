import { createLogger, transports, format } from 'winston';

import env from '../config/env';

const setTransports =
  env.NODE_ENV === 'test'
    ? []
    : [
        new transports.Console({
          format: format.combine(
            format.simple(),
            format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
            format.printf(
              ({ timestamp, level, message }) =>
                `[${timestamp}] ${level.toUpperCase()} ${message}`
            )
          )
        })
      ];

const logger = createLogger({
  level: 'info',
  format: format.combine(
    format.simple(),
    format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    format.printf(
      ({ timestamp, level, message }) =>
        `[${timestamp}] ${level.toUpperCase()} ${message}`
    )
  ),
  transports: setTransports
});

export default logger;
