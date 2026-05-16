import { getRedisClient } from "./redisClient";
import { getWeatherSnapshot } from "@/server/weather/weatherService";
import type { WeatherSnapshot } from "@/server/weather/types";

const WEATHER_PROVIDER = "nws";

export const weatherCacheTtls = {
  currentWeather: 10 * 60,
  hourlyForecast: 30 * 60,
  dailyForecast: 60 * 60,
  alerts: 5 * 60,
};

const weatherSnapshotTtl = Math.min(
  weatherCacheTtls.currentWeather,
  weatherCacheTtls.hourlyForecast,
  weatherCacheTtls.dailyForecast,
  weatherCacheTtls.alerts,
);

export function buildLatestWeatherCacheKey(locationId: string) {
  return `weather:latest:${locationId}`;
}

export function buildProviderWeatherCacheKey(latitude: number, longitude: number) {
  return `weather:provider:${WEATHER_PROVIDER}:${formatCoordinate(latitude)}:${formatCoordinate(longitude)}`;
}

export async function getCachedWeatherSnapshot(
  latitude: number,
  longitude: number,
): Promise<WeatherSnapshot> {
  const cacheKey = buildProviderWeatherCacheKey(latitude, longitude);
  const cachedSnapshot = await readCachedSnapshot(cacheKey);

  if (cachedSnapshot) {
    console.info("api.weather.cache_hit", {
      cacheKey,
      provider: WEATHER_PROVIDER,
      latitude,
      longitude,
    });
    return cachedSnapshot;
  }

  console.info("api.weather.cache_miss", {
    cacheKey,
    provider: WEATHER_PROVIDER,
    latitude,
    longitude,
  });

  const snapshot = await getWeatherSnapshot(latitude, longitude);
  await writeCachedSnapshot(cacheKey, snapshot);

  return snapshot;
}

async function readCachedSnapshot(cacheKey: string) {
  try {
    const redis = getRedisClient();
    const cachedValue = await redis.get(cacheKey);

    if (!cachedValue) {
      return null;
    }

    return JSON.parse(cachedValue) as WeatherSnapshot;
  } catch (error) {
    console.warn("api.weather.cache_read_failed", {
      cacheKey,
      message: error instanceof Error ? error.message : "Unknown Redis error",
    });
    return null;
  }
}

async function writeCachedSnapshot(cacheKey: string, snapshot: WeatherSnapshot) {
  try {
    const redis = getRedisClient();
    await redis.set(cacheKey, JSON.stringify(snapshot), "EX", weatherSnapshotTtl);
  } catch (error) {
    console.warn("api.weather.cache_write_failed", {
      cacheKey,
      message: error instanceof Error ? error.message : "Unknown Redis error",
    });
  }
}

function formatCoordinate(value: number) {
  return value.toFixed(4);
}
