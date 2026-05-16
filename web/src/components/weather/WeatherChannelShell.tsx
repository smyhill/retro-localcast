import { mockWeather } from "./mockWeather";
import { NewsTicker } from "./NewsTicker";
import { RetroClock } from "./RetroClock";
import { RotatingWeatherScreen } from "./RotatingWeatherScreen";
import { getCachedWeatherSnapshot } from "@/server/cache/weatherCache";
import { listRecentNews } from "@/server/news/newsService";
import type { WeatherSnapshot } from "@/server/weather/types";

const BETHESDA_LOCATION = {
  name: "Bethesda, MD",
  latitude: 38.9847,
  longitude: -77.0947,
};

export async function WeatherChannelShell() {
  const [weather, news] = await Promise.all([getBethesdaWeather(), getTickerNews()]);
  const weatherWithNews = {
    ...weather,
    news,
  };

  return (
    <main className="bg-slate-950 px-4 py-6 text-white sm:px-6 lg:px-8">
      <div className="retro-screen relative mx-auto max-w-7xl overflow-hidden border-4 border-sky-200 bg-[linear-gradient(135deg,#041b45_0%,#062f6f_48%,#10172a_100%)] shadow-[0_0_32px_rgba(56,189,248,0.35)]">
        <div className="relative z-10">
          <header className="grid gap-4 border-b-4 border-sky-200 bg-blue-950 px-5 py-4 md:grid-cols-[1fr_auto_auto] md:items-center">
            <div>
              <p className="font-mono text-sm font-bold uppercase text-cyan-200">
                Retro LocalCast
              </p>
              <h1 className="text-3xl font-black uppercase text-white sm:text-5xl">
                {weatherWithNews.location}
              </h1>
            </div>
            <div className="border-2 border-cyan-300 bg-slate-950 px-4 py-3 text-center">
              <p className="font-mono text-xs uppercase text-cyan-100">
                Local Time
              </p>
              <RetroClock />
            </div>
            <div className="border-2 border-amber-300 bg-slate-950 px-5 py-3 text-center">
              <p className="font-mono text-xs uppercase text-cyan-100">
                Current
              </p>
              <p className="font-mono text-5xl font-black text-amber-300">
                {weatherWithNews.current.temperature}&deg;
              </p>
            </div>
          </header>

          <RotatingWeatherScreen weather={weatherWithNews} />

          <NewsTicker weather={weatherWithNews} />
          <footer className="flex flex-wrap items-center justify-between gap-3 bg-blue-950 px-5 py-3 font-mono text-xs font-bold uppercase text-cyan-100">
            <span>{weather === mockWeather ? "Mock fallback data" : "NWS data"}</span>
            <span>Issued {weatherWithNews.issuedAt}</span>
          </footer>
        </div>
      </div>
    </main>
  );
}

async function getTickerNews() {
  try {
    const news = await listRecentNews(8);

    if (news.length === 0) {
      return mockWeather.news;
    }

    return news.map((item) => ({
      title: item.title,
      source: item.source,
      url: item.url,
      publishedAt: item.publishedAt,
    }));
  } catch {
    return mockWeather.news;
  }
}

async function getBethesdaWeather() {
  try {
    const snapshot = await getCachedWeatherSnapshot(
      BETHESDA_LOCATION.latitude,
      BETHESDA_LOCATION.longitude,
    );

    return mapSnapshotToDisplayWeather(snapshot);
  } catch {
    return mockWeather;
  }
}

function mapSnapshotToDisplayWeather(snapshot: WeatherSnapshot) {
  const currentHour = snapshot.hourly[0];

  return {
    ...mockWeather,
    location: BETHESDA_LOCATION.name,
    issuedAt: formatDisplayTime(new Date()),
    current: {
      ...mockWeather.current,
      temperature: snapshot.current.temperature,
      condition: snapshot.current.condition,
      humidity: snapshot.current.humidity ?? mockWeather.current.humidity,
      windSpeed: snapshot.current.windSpeed,
      feelsLike: snapshot.current.temperature,
    },
    hourly: snapshot.hourly.slice(0, 5).map((hour) => ({
      time: formatHourLabel(hour.startTime),
      temperature: hour.temperature,
      condition: hour.condition,
      precipitation: hour.precipitationChance ?? 0,
    })),
    daily: snapshot.daily.slice(0, 7).map((day) => ({
      day: day.name,
      high: day.temperature,
      low: day.temperature,
      condition: day.condition,
    })),
    alerts:
      snapshot.alerts.length > 0
        ? snapshot.alerts.map((alert) => ({
            title: alert.title,
            severity: alert.severity ?? "Unknown",
            description: alert.description,
          }))
        : mockWeather.alerts,
    dogWalk: {
      ...mockWeather.dogWalk,
      reason: currentHour
        ? `${currentHour.condition} with ${currentHour.precipitationChance ?? 0}% rain chance.`
        : mockWeather.dogWalk.reason,
    },
  };
}

function formatHourLabel(value: string) {
  return new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
  }).format(new Date(value));
}

function formatDisplayTime(value: Date) {
  return new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "2-digit",
  }).format(value);
}
