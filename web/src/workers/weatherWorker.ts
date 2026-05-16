import { Job, QueueEvents, Worker } from "bullmq";
import { cacheWeatherSnapshot } from "@/server/cache/weatherCache";
import { closeRedisClient } from "@/server/cache/redisClient";
import { prisma } from "@/server/db/prisma";
import {
  enqueueWeatherRefresh,
  weatherQueue,
  weatherQueueConnection,
  weatherQueueName,
  type WeatherJobData,
} from "@/server/jobs/weatherQueue";
import { getWeatherSnapshot } from "@/server/weather/weatherService";

type WeatherJobResult = {
  refreshed: number;
  failed: number;
};

const worker = new Worker<WeatherJobData, WeatherJobResult>(
  weatherQueueName,
  refreshAllLocations,
  {
    connection: weatherQueueConnection,
  },
);

worker.on("failed", (job, error) => {
  console.error("worker.job.failed", {
    jobId: job?.id,
    queue: weatherQueueName,
    error: error.message,
  });
});

worker.on("completed", (job, result) => {
  console.info("worker.job.succeeded", {
    jobId: job.id,
    queue: weatherQueueName,
    ...result,
  });
});

async function refreshAllLocations(job: Job<WeatherJobData>) {
  console.info("worker.job.started", {
    jobId: job.id,
    queue: weatherQueueName,
    requestedAt: job.data.requestedAt,
  });

  const locations = await prisma.location.findMany({
    orderBy: {
      name: "asc",
    },
  });

  let refreshed = 0;
  let failed = 0;

  for (const location of locations) {
    try {
      const snapshot = await getWeatherSnapshot(location.latitude, location.longitude);

      await prisma.weatherSnapshot.create({
        data: {
          locationId: location.id,
          provider: "nws",
          temperature: snapshot.current.temperature,
          condition: snapshot.current.condition,
          rawSummary: JSON.stringify({
            current: snapshot.current,
            hourlyCount: snapshot.hourly.length,
            dailyCount: snapshot.daily.length,
            alertsCount: snapshot.alerts.length,
          }),
        },
      });

      await cacheWeatherSnapshot(
        location.latitude,
        location.longitude,
        snapshot,
        location.id,
      );

      refreshed += 1;
      console.info("weather.fetch.succeeded", {
        jobId: job.id,
        locationId: location.id,
        locationName: location.name,
        provider: "nws",
      });
    } catch (error) {
      failed += 1;
      console.error("weather.fetch.failed", {
        jobId: job.id,
        locationId: location.id,
        locationName: location.name,
        provider: "nws",
        error: error instanceof Error ? error.message : "Unknown weather error",
      });
    }
  }

  return {
    refreshed,
    failed,
  };
}

async function runOnce() {
  const queueEvents = new QueueEvents(weatherQueueName, {
    connection: weatherQueueConnection,
  });

  await queueEvents.waitUntilReady();

  const job = await enqueueWeatherRefresh();
  const result = await job.waitUntilFinished(queueEvents);

  await queueEvents.close();
  await worker.close();
  await weatherQueue.close();
  await closeRedisClient();
  await prisma.$disconnect();

  if (result.failed > 0) {
    process.exitCode = 1;
  }
}

runOnce().catch(async (error) => {
  console.error("worker.job.failed", {
    queue: weatherQueueName,
    error: error instanceof Error ? error.message : "Unknown worker error",
  });

  await worker.close();
  await weatherQueue.close();
  await closeRedisClient();
  await prisma.$disconnect();

  process.exit(1);
});
