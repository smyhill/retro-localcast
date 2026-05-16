import { NextResponse } from "next/server";
import { listRecentNews } from "@/server/news/newsService";

export async function GET() {
  try {
    const news = await listRecentNews();
    return NextResponse.json({
      news,
    });
  } catch (error) {
    return NextResponse.json(
      {
        error: {
          code: "news_fetch_failed",
          message:
            error instanceof Error ? error.message : "Unknown news fetch error",
        },
      },
      {
        status: 500,
      },
    );
  }
}
