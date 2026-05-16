"use client";

import { useEffect, useMemo, useState } from "react";
import { CurrentConditionsPanel } from "./CurrentConditionsPanel";
import { DogWalkForecastPanel } from "./DogWalkForecastPanel";
import { HourlyForecastPanel } from "./HourlyForecastPanel";
import type { MockWeather } from "./mockWeather";
import { SevenDayForecastPanel } from "./SevenDayForecastPanel";
import { WeatherAlertPanel } from "./WeatherAlertPanel";

const screens = ["current", "hourly", "daily", "alerts", "dogWalk", "news"] as const;

type ScreenId = (typeof screens)[number];

const screenLabels: Record<ScreenId, string> = {
  current: "Current Conditions",
  hourly: "Hourly Forecast",
  daily: "7-Day Forecast",
  alerts: "Weather Alerts",
  dogWalk: "Dog Walk Forecast",
  news: "Local News",
};

type RotatingWeatherScreenProps = {
  weather: MockWeather;
};

export function RotatingWeatherScreen({ weather }: RotatingWeatherScreenProps) {
  const [screenIndex, setScreenIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const currentScreen = screens[screenIndex];

  const progressWidth = useMemo(() => {
    return `${((screenIndex + 1) / screens.length) * 100}%`;
  }, [screenIndex]);

  useEffect(() => {
    if (isPaused) {
      return;
    }

    const timer = window.setInterval(() => {
      setScreenIndex((index) => (index + 1) % screens.length);
    }, 9000);

    return () => window.clearInterval(timer);
  }, [isPaused]);

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "ArrowLeft") {
        setScreenIndex((index) => (index - 1 + screens.length) % screens.length);
      }

      if (event.key === "ArrowRight") {
        setScreenIndex((index) => (index + 1) % screens.length);
      }

      if (event.key === " ") {
        event.preventDefault();
        setIsPaused((paused) => !paused);
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  function showPreviousScreen() {
    setScreenIndex((index) => (index - 1 + screens.length) % screens.length);
  }

  function showNextScreen() {
    setScreenIndex((index) => (index + 1) % screens.length);
  }

  return (
    <section className="p-5">
      <div className="mb-5 grid gap-3 border-4 border-cyan-300 bg-slate-950/80 p-4 md:grid-cols-[1fr_auto] md:items-center">
        <div>
          <p className="font-mono text-xs font-black uppercase text-cyan-200">
            Now Showing
          </p>
          <h2 className="mt-1 text-3xl font-black uppercase text-white">
            {screenLabels[currentScreen]}
          </h2>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={showPreviousScreen}
            className="border-2 border-cyan-300 bg-blue-950 px-3 py-2 font-mono text-xs font-black uppercase text-cyan-100 transition hover:bg-cyan-950"
          >
            Prev
          </button>
          <button
            type="button"
            onClick={() => setIsPaused((paused) => !paused)}
            className="border-2 border-amber-300 bg-slate-950 px-3 py-2 font-mono text-xs font-black uppercase text-amber-300 transition hover:bg-amber-950"
          >
            {isPaused ? "Resume" : "Pause"}
          </button>
          <button
            type="button"
            onClick={showNextScreen}
            className="border-2 border-cyan-300 bg-blue-950 px-3 py-2 font-mono text-xs font-black uppercase text-cyan-100 transition hover:bg-cyan-950"
          >
            Next
          </button>
        </div>
        <div className="h-2 overflow-hidden border border-sky-500 bg-slate-900 md:col-span-2">
          <div
            className="h-full bg-amber-300 transition-all duration-500"
            style={{ width: progressWidth }}
          />
        </div>
      </div>

      <div className="min-h-[520px]">
        {currentScreen === "current" ? (
          <CurrentConditionsPanel weather={weather} />
        ) : null}
        {currentScreen === "hourly" ? (
          <HourlyForecastPanel weather={weather} />
        ) : null}
        {currentScreen === "daily" ? (
          <SevenDayForecastPanel weather={weather} />
        ) : null}
        {currentScreen === "alerts" ? (
          <WeatherAlertPanel weather={weather} />
        ) : null}
        {currentScreen === "dogWalk" ? (
          <DogWalkForecastPanel weather={weather} />
        ) : null}
        {currentScreen === "news" ? <NewsScreen weather={weather} /> : null}
      </div>

      <p className="mt-4 font-mono text-xs font-bold uppercase text-cyan-100">
        Keyboard: left/right arrows change screen. Space pauses or resumes.
      </p>
    </section>
  );
}

function NewsScreen({ weather }: RotatingWeatherScreenProps) {
  return (
    <section className="border-4 border-amber-300 bg-blue-950 p-5 shadow-[8px_8px_0_#061533]">
      <h2 className="mb-4 border-b-4 border-amber-300 pb-3 font-mono text-2xl font-black uppercase text-white">
        Local News Ticker
      </h2>
      <div className="grid gap-3">
        {weather.news.map((item) => (
          <a
            key={item.title}
            href={item.url}
            className="border-2 border-sky-600 bg-slate-950/75 p-4"
          >
            <p className="font-mono text-xs font-black uppercase text-cyan-200">
              {item.source}
            </p>
            <h3 className="mt-2 text-2xl font-black uppercase text-amber-300">
              {item.title}
            </h3>
          </a>
        ))}
      </div>
    </section>
  );
}
