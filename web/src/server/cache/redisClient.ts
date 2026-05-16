import Redis from "ioredis";

const globalForRedis = globalThis as unknown as {
  redis?: Redis;
};

export function getRedisClient() {
  if (!globalForRedis.redis) {
    globalForRedis.redis = new Redis(process.env.REDIS_URL ?? "redis://localhost:6379", {
      connectTimeout: 500,
      lazyConnect: true,
      maxRetriesPerRequest: 0,
    });

    globalForRedis.redis.on("error", () => {
      // Cache failures should not break weather rendering.
    });
  }

  return globalForRedis.redis;
}
