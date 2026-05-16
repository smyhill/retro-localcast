import type { MockWeather } from "./mockWeather";

type DogWalkForecastPanelProps = {
  weather: MockWeather;
};

export function DogWalkForecastPanel({ weather }: DogWalkForecastPanelProps) {
  return (
    <section className="border-4 border-teal-300 bg-blue-950 p-5 shadow-[8px_8px_0_#061533]">
      <div className="mb-4 border-b-4 border-teal-300 pb-3">
        <p className="font-mono text-sm font-bold uppercase text-cyan-100">
          Pixel Weather Desk
        </p>
        <h2 className="text-2xl font-black uppercase text-white">
          Dog Walk Forecast
        </h2>
      </div>
      <div className="grid gap-4 sm:grid-cols-[10rem_1fr]">
        <div className="border-4 border-amber-300 bg-slate-950 p-4 text-center">
          <p className="font-mono text-sm uppercase text-cyan-100">Score</p>
          <p className="mt-2 text-6xl font-black text-amber-300">
            {weather.dogWalk.score}
          </p>
          <p className="font-mono text-sm uppercase text-cyan-100">of 10</p>
        </div>
        <div className="border-2 border-sky-600 bg-slate-950/70 p-4">
          <p className="font-mono text-sm uppercase text-cyan-200">
            Best Window
          </p>
          <p className="mt-2 text-3xl font-black text-white">
            {weather.dogWalk.bestWindow}
          </p>
          <p className="mt-4 leading-7 text-cyan-50">{weather.dogWalk.reason}</p>
        </div>
      </div>
    </section>
  );
}
