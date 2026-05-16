import type { MockWeather } from "./mockWeather";

type CurrentConditionsPanelProps = {
  weather: MockWeather;
};

export function CurrentConditionsPanel({ weather }: CurrentConditionsPanelProps) {
  return (
    <section className="border-4 border-sky-300 bg-slate-950/80 p-5 shadow-[8px_8px_0_#061533]">
      <div className="flex items-start justify-between gap-6">
        <div>
          <p className="font-mono text-sm font-bold uppercase text-cyan-200">
            Current Conditions
          </p>
          <h2 className="mt-2 text-3xl font-black uppercase text-white">
            {weather.current.condition}
          </h2>
        </div>
        <div className="text-right">
          <p className="font-mono text-7xl font-black leading-none text-amber-300">
            {weather.current.temperature}&deg;
          </p>
          <p className="font-mono text-sm uppercase text-cyan-100">
            Feels {weather.current.feelsLike}&deg;
          </p>
        </div>
      </div>
      <dl className="mt-6 grid grid-cols-2 gap-3 text-sm sm:grid-cols-4">
        <div className="border-2 border-sky-700 bg-blue-950 p-3">
          <dt className="font-mono uppercase text-cyan-200">Humidity</dt>
          <dd className="mt-1 text-2xl font-black text-white">
            {weather.current.humidity}%
          </dd>
        </div>
        <div className="border-2 border-sky-700 bg-blue-950 p-3">
          <dt className="font-mono uppercase text-cyan-200">Wind</dt>
          <dd className="mt-1 text-2xl font-black text-white">
            {weather.current.windSpeed}
          </dd>
        </div>
        <div className="border-2 border-sky-700 bg-blue-950 p-3">
          <dt className="font-mono uppercase text-cyan-200">Pressure</dt>
          <dd className="mt-1 text-xl font-black text-white">
            {weather.current.pressure}
          </dd>
        </div>
        <div className="border-2 border-sky-700 bg-blue-950 p-3">
          <dt className="font-mono uppercase text-cyan-200">Visibility</dt>
          <dd className="mt-1 text-2xl font-black text-white">
            {weather.current.visibility}
          </dd>
        </div>
      </dl>
    </section>
  );
}
