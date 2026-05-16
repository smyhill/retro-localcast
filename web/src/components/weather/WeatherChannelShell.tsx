import { CurrentConditionsPanel } from "./CurrentConditionsPanel";
import { DogWalkForecastPanel } from "./DogWalkForecastPanel";
import { HourlyForecastPanel } from "./HourlyForecastPanel";
import { mockWeather } from "./mockWeather";
import { NewsTicker } from "./NewsTicker";
import { RetroClock } from "./RetroClock";
import { SevenDayForecastPanel } from "./SevenDayForecastPanel";
import { WeatherAlertPanel } from "./WeatherAlertPanel";

export function WeatherChannelShell() {
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
                {mockWeather.location}
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
                {mockWeather.current.temperature}&deg;
              </p>
            </div>
          </header>

          <section className="grid gap-5 p-5 xl:grid-cols-[1.2fr_0.8fr]">
            <div className="grid gap-5">
              <CurrentConditionsPanel weather={mockWeather} />
              <HourlyForecastPanel weather={mockWeather} />
              <WeatherAlertPanel weather={mockWeather} />
            </div>
            <div className="grid gap-5">
              <SevenDayForecastPanel weather={mockWeather} />
              <div className="border-4 border-sky-300 bg-slate-950/80 p-5 shadow-[8px_8px_0_#061533]">
                <h2 className="border-b-4 border-sky-300 pb-3 font-mono text-2xl font-black uppercase text-white">
                  Local Radar
                </h2>
                <div className="mt-4 aspect-video border-2 border-sky-700 bg-[linear-gradient(90deg,rgba(34,211,238,0.22)_1px,transparent_1px),linear-gradient(rgba(34,211,238,0.18)_1px,transparent_1px),radial-gradient(circle_at_65%_45%,rgba(250,204,21,0.85),transparent_8%),radial-gradient(circle_at_42%_52%,rgba(34,197,94,0.7),transparent_12%),#082f49] bg-[length:32px_32px,32px_32px,100%_100%,100%_100%,100%_100%] p-4">
                  <div className="flex h-full items-end justify-between font-mono text-xs font-black uppercase text-cyan-100">
                    <span>Bethesda</span>
                    <span>Radar Placeholder</span>
                  </div>
                </div>
              </div>
              <DogWalkForecastPanel weather={mockWeather} />
            </div>
          </section>

          <NewsTicker weather={mockWeather} />
          <footer className="flex flex-wrap items-center justify-between gap-3 bg-blue-950 px-5 py-3 font-mono text-xs font-bold uppercase text-cyan-100">
            <span>Mock data only</span>
            <span>Issued {mockWeather.issuedAt}</span>
          </footer>
        </div>
      </div>
    </main>
  );
}
