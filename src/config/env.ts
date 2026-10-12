import { name, version } from '../../package.json';

export default {
  PROJECT_NAME: name,
  PROJECT_VERSION: version,
  PORT: Number(process.env.PORT || 3333),
  NODE_ENV: process.env.NODE_ENV,
  MAX_REQUESTS: process.env.MAX_REQUESTS || 60,
  MINUTES_RESEND_REQUEST: process.env.MINUTES_RESEND_REQUEST || 5,
  OPEN_WEATHER_API_KEY: process.env.OPEN_WEATHER_API_KEY,
  SPOTIFY_SECRET: process.env.SPOTIFY_SECRET,
  SPOTIFY_CLIENT_ID: process.env.SPOTIFY_CLIENT_ID,
  REDIS_HOST: process.env.REDIS_HOST,
  REDIS_PORT: Number(process.env.REDIS_PORT || 6379),
  REDIS_PASS: process.env.REDIS_PASS,
  OTEL_EXPORTER_OTLP_ENDPOINT:
    process.env.OTEL_EXPORTER_OTLP_ENDPOINT || 'http://localhost:4318',
  ENABLE_METRICS: process.env.ENABLE_METRICS === 'true',
  ENABLE_TELEMETRY: process.env.ENABLE_TELEMETRY === 'true'
};
