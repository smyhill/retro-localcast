import { prisma } from "@/server/db/prisma";
import { ingestLocalNews } from "@/server/news/newsService";

ingestLocalNews()
  .then(async (result) => {
    await prisma.$disconnect();

    if (result.failedFeeds > 0 && result.fetched === 0) {
      process.exit(1);
    }

    process.exit(0);
  })
  .catch(async (error) => {
    console.error("news.ingest.failed", {
      error: error instanceof Error ? error.message : "Unknown news worker error",
    });
    await prisma.$disconnect();
    process.exit(1);
  });
