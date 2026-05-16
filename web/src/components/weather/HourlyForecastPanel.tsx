import type { MockWeather } from "./mockWeather";

type HourlyForecastPanelProps = {
  weather: MockWeather;
};

export function HourlyForecastPanel({ weather }: HourlyForecastPanelProps) {
  return (
    <section className="border-4 border-blue-300 bg-blue-950 p-5 shadow-[8px_8px_0_#061533]">
      <div className="mb-4 flex items-center justify-between gap-4 border-b-4 border-blue-300 pb-3">
        <h2 className="font-mono text-2xl font-black uppercase text-white">
          Hourly Forecast
        </h2>
        <p className="font-mono text-sm uppercase text-amber-300">
          Next 5 Hours
        </p>
      </div>
      <div className="grid gap-3 md:grid-cols-5">
        {weather.hourly.map((hour) => (
          <article
            key={hour.time}
            className="border-2 border-sky-600 bg-slate-950/75 p-4 text-center"
          >
            <h3 className="font-mono text-lg font-black text-cyan-200">
              {hour.time}
            </h3>
            <p className="mt-3 text-4xl font-black text-amber-300">
              {hour.temperature}&deg;
            </p>
            <p className="mt-2 min-h-10 text-sm font-bold uppercase text-white">
              {hour.condition}
            </p>
            <p className="mt-3 font-mono text-xs uppercase text-cyan-100">
              Rain {hour.precipitation}%
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
