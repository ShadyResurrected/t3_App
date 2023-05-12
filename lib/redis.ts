import { Redis } from "ioredis";
import JSONCache from "redis-json";

export const redis = new Redis({
  host: process.env.REDIS_HOST,
  port: Number(process.env.REDIS_PORT),
  password: process.env.REDIS_PASSWORD,
});

export const jsonCache = new JSONCache(redis);