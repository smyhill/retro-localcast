import type { MockWeather } from "./mockWeather";

type SevenDayForecastPanelProps = {
  weather: MockWeather;
};

export function SevenDayForecastPanel({ weather }: SevenDayForecastPanelProps) {
  return (
    <section className="border-4 border-cyan-300 bg-slate-950/85 p-5 shadow-[8px_8px_0_#061533]">
      <h2 className="mb-4 border-b-4 border-cyan-300 pb-3 font-mono text-2xl font-black uppercase text-white">
        7-Day Forecast
      </h2>
      <div className="grid gap-2">
        {weather.daily.map((day) => (
          <article
            key={day.day}
            className="grid grid-cols-[4rem_1fr_6rem] items-center gap-4 border-2 border-sky-700 bg-blue-950 px-4 py-3"
          >
            <h3 className="font-mono text-xl font-black text-amber-300">
              {day.day}
            </h3>
            <p className="text-sm font-bold uppercase text-white">
              {day.condition}
            </p>
            <p className="text-right font-mono text-lg font-black text-cyan-100">
              {day.high}&deg;/{day.low}&deg;
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
