import { prisma } from "@/server/db/prisma";
import { fetchFeedItems, localNewsFeeds } from "@/server/news/rssClient";
import type { NewsItem } from "@/server/news/types";

export async function ingestLocalNews() {
  console.info("news.ingest.started", {
    feeds: localNewsFeeds.length,
  });

  let fetched = 0;
  let inserted = 0;
  let failedFeeds = 0;

  for (const feed of localNewsFeeds) {
    try {
      const items = await fetchFeedItems(feed);
      fetched += items.length;

      for (const item of items) {
        const result = await upsertNewsItem(item);

        if (result.inserted) {
          inserted += 1;
        }
      }
    } catch (error) {
      failedFeeds += 1;
      console.error("news.ingest.failed", {
        source: feed.source,
        url: feed.url,
        error: error instanceof Error ? error.message : "Unknown RSS error",
      });
    }
  }

  console.info("news.ingest.succeeded", {
    fetched,
    inserted,
    failedFeeds,
  });

  return {
    fetched,
    inserted,
    failedFeeds,
  };
}

export async function listRecentNews(limit = 12): Promise<NewsItem[]> {
  const rows = await prisma.newsItem.findMany({
    orderBy: [
      {
        publishedAt: "desc",
      },
      {
        createdAt: "desc",
      },
    ],
    take: limit,
  });

  return rows.map((row) => ({
    title: row.title,
    source: row.source,
    url: row.url,
    publishedAt: row.publishedAt?.toISOString(),
    summary: row.summary ?? undefined,
  }));
}

async function upsertNewsItem(item: NewsItem) {
  const existing = await prisma.newsItem.findUnique({
    where: {
      url: item.url,
    },
    select: {
      id: true,
    },
  });

  if (existing) {
    return {
      inserted: false,
    };
  }

  await prisma.newsItem.create({
    data: {
      source: item.source,
      title: item.title,
      url: item.url,
      summary: item.summary,
      publishedAt: item.publishedAt ? new Date(item.publishedAt) : undefined,
    },
  });

  return {
    inserted: true,
  };
}
