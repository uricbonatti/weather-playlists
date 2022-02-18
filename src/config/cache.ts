import { RedisOptions } from 'ioredis';
import env from './env';

interface ICacheConfig {
  driver: 'redis';
  expiresIn: number;
  config: {
    redis: RedisOptions;
  };
}

export default {
  driver: 'redis',
  expiresIn: 3600,
  config: {
    redis: {
      host: env.REDIS_HOST,
      port: env.REDIS_PORT,
      password: env.REDIS_PASS || undefined
    }
  }
} as ICacheConfig;
