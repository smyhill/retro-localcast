import type { MockWeather } from "./mockWeather";

type NewsTickerProps = {
  weather: MockWeather;
};

export function NewsTicker({ weather }: NewsTickerProps) {
  return (
    <div className="overflow-hidden border-y-4 border-amber-300 bg-slate-950 py-3">
      <div className="retro-ticker flex w-max gap-10 whitespace-nowrap font-mono text-lg font-black uppercase text-amber-300">
        {[...weather.news, ...weather.news].map((item, index) => (
          <span key={`${item.title}-${index}`}>
            <span className="text-cyan-200">{item.source}</span>
            {" // "}
            {item.title}
          </span>
        ))}
      </div>
    </div>
  );
}
