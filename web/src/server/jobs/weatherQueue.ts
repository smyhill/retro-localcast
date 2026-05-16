import { Queue } from "bullmq";

export type WeatherJobData = {
  requestedAt: string;
};

export const weatherQueueName = "weather";

export const weatherQueueConnection = {
  host: process.env.REDIS_HOST ?? "localhost",
  port: Number(process.env.REDIS_PORT ?? 6379),
};

export const weatherQueue = new Queue<WeatherJobData>(weatherQueueName, {
  connection: weatherQueueConnection,
});

export async function enqueueWeatherRefresh() {
  return weatherQueue.add(
    "refresh-all-locations",
    {
      requestedAt: new Date().toISOString(),
    },
    {
      removeOnComplete: 25,
      removeOnFail: 50,
    },
  );
}
