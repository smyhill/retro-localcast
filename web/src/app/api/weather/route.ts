import { NextResponse } from "next/server";
import { getCachedWeatherSnapshot } from "@/server/cache/weatherCache";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const latitude = Number(searchParams.get("lat"));
  const longitude = Number(searchParams.get("lon"));

  if (!Number.isFinite(latitude) || !Number.isFinite(longitude)) {
    return NextResponse.json(
      {
        error: {
          code: "invalid_coordinates",
          message: "Expected /api/weather?lat={latitude}&lon={longitude}",
        },
      },
      { status: 400 },
    );
  }

  try {
    const snapshot = await getCachedWeatherSnapshot(latitude, longitude);
    return NextResponse.json(snapshot);
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unknown weather provider error";

    return NextResponse.json(
      {
        error: {
          code: "weather_provider_failed",
          message,
        },
      },
      { status: 502 },
    );
  }
}
