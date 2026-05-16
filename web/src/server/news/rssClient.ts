import Parser from "rss-parser";
import type { NewsItem } from "./types";

type FeedConfig = {
  source: string;
  url: string;
};

const parser = new Parser({
  timeout: 8_000,
  headers: {
    "User-Agent": "Retro LocalCast local news reader",
  },
});

export const localNewsFeeds: FeedConfig[] = [
  {
    source: "Montgomery County",
    url: "https://www2.montgomerycountymd.gov/mcgportalapps/Press_RSS.aspx?rssid=23",
  },
  {
    source: "MCDOT",
    url: "https://www2.montgomerycountymd.gov/mcgportalapps/Press_RSS.aspx?rssid=50",
  },
  {
    source: "Montgomery Planning",
    url: "https://montgomeryplanning.org/feed",
  },
];

export async function fetchFeedItems(feed: FeedConfig): Promise<NewsItem[]> {
  const parsedFeed = await parser.parseURL(feed.url);

  return parsedFeed.items
    .map((item) => normalizeFeedItem(feed.source, item))
    .filter((item): item is NewsItem => item !== null);
}

function normalizeFeedItem(
  source: string,
  item: Parser.Item,
): NewsItem | null {
  const title = item.title?.trim();
  const url = item.link?.trim() ?? item.guid?.trim();

  if (!title || !url) {
    return null;
  }

  return {
    title,
    source,
    url,
    publishedAt: item.isoDate ?? item.pubDate,
    summary: stripHtml(item.contentSnippet ?? item.content ?? item.summary),
  };
}

function stripHtml(value?: string) {
  if (!value) {
    return undefined;
  }

  return value.replace(/<[^>]*>/g, "").replace(/\s+/g, " ").trim();
}
