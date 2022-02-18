export default {
  PORT: process.env.PORT || 8000,
  NODE_ENV: process.env.NODE_ENV,
  MAX_REQUESTS: process.env.MAX_REQUESTS || 60,
  MINUTES_RESEND_REQUEST: process.env.MINUTES_RESEND_REQUEST || 5,
  OPEN_WEATHER_API_KEY: process.env.OPEN_WEATHER_API_KEY,
  SPOTIFY_SECRET: process.env.SPOTIFY_SECRET,
  SPOTIFY_CLIENT_ID: process.env.SPOTIFY_CLIENT_ID,
  REDIS_HOST: process.env.REDIS_HOST,
  REDIS_PORT: process.env.REDIS_PORT,
  REDIS_PASS: process.env.REDIS_PASS
};
