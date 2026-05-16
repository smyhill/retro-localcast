import type { MockWeather } from "./mockWeather";

type WeatherAlertPanelProps = {
  weather: MockWeather;
};

export function WeatherAlertPanel({ weather }: WeatherAlertPanelProps) {
  return (
    <section className="border-4 border-amber-300 bg-slate-950/85 p-5 shadow-[8px_8px_0_#061533]">
      <h2 className="mb-4 border-b-4 border-amber-300 pb-3 font-mono text-2xl font-black uppercase text-white">
        Weather Alerts
      </h2>
      <div className="grid gap-3">
        {weather.alerts.map((alert) => (
          <article
            key={alert.title}
            className="border-2 border-amber-300 bg-blue-950 p-4"
          >
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h3 className="text-xl font-black uppercase text-amber-300">
                {alert.title}
              </h3>
              <p className="border-2 border-cyan-300 px-3 py-1 font-mono text-xs font-black uppercase text-cyan-100">
                {alert.severity}
              </p>
            </div>
            <p className="mt-3 leading-7 text-white">{alert.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
