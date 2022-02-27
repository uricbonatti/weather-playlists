import { createLogger, transports, format } from 'winston';
import env from '../config/env';

import { context, trace } from '@opentelemetry/api';

function tracingFormat() {
  return format((info) => {
    const span = trace.getSpanContext(context.active());
    if (span) {
      info.traceId = span.traceId;
      info.spanId = span.spanId;
    }
    return info;
  })();
}
const jaegerTransport = new transports.Http({
  format: format.combine(tracingFormat(), format.json()),
  silent: false
});
const setTransports =
  env.NODE_ENV === 'test'
    ? []
    : [
        new transports.Console({
          format: format.combine(
            format.simple(),
            tracingFormat(),
            format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
            format.printf(({ timestamp, level, traceId, spanId, message }) => {
              const traceLog = traceId ? `[${traceId}]` : '';
              const spanLog = spanId ? `[${spanId}]` : '';
              return `[${timestamp}]${traceLog}${spanLog} ${level.toUpperCase()} ${message}`;
            })
          )
        })
      ];

const logger = createLogger({
  transports: setTransports
});

logger.add(jaegerTransport);
export default logger;
