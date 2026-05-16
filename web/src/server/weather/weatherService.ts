import {
  fetchActiveAlerts,
  fetchForecast,
  fetchHourlyForecast,
  fetchPointMetadata,
} from "./nwsClient";
import type { WeatherSnapshot } from "./types";

export async function getWeatherSnapshot(
  latitude: number,
  longitude: number,
): Promise<WeatherSnapshot> {
  const point = await fetchPointMetadata(latitude, longitude);
  const [dailyForecast, hourlyForecast, alerts] = await Promise.all([
    fetchForecast(point.properties.forecast),
    fetchHourlyForecast(point.properties.forecastHourly),
    fetchActiveAlerts(latitude, longitude),
  ]);

  const currentPeriod = hourlyForecast.properties.periods[0];
  const relativeLocation = point.properties.relativeLocation?.properties;
  const locationName =
    relativeLocation?.city && relativeLocation?.state
      ? `${relativeLocation.city}, ${relativeLocation.state}`
      : "Bethesda, MD";

  if (!currentPeriod) {
    throw new Error("NWS hourly forecast did not include any periods");
  }

  return {
    locationName,
    latitude,
    longitude,
    current: {
      temperature: currentPeriod.temperature,
      condition: currentPeriod.shortForecast,
      windSpeed: currentPeriod.windSpeed,
      humidity: currentPeriod.relativeHumidity?.value ?? undefined,
    },
    hourly: hourlyForecast.properties.periods.slice(0, 8).map((period) => ({
      startTime: period.startTime,
      temperature: period.temperature,
      condition: period.shortForecast,
      precipitationChance: period.probabilityOfPrecipitation?.value ?? undefined,
    })),
    daily: dailyForecast.properties.periods.slice(0, 7).map((period) => ({
      name: period.name,
      startTime: period.startTime,
      endTime: period.endTime,
      temperature: period.temperature,
      temperatureUnit: period.temperatureUnit,
      condition: period.shortForecast,
    })),
    alerts: alerts.features.map((feature) => ({
      title: feature.properties.event,
      severity: feature.properties.severity,
      description:
        feature.properties.description ??
        feature.properties.headline ??
        "No alert description provided.",
      effective: feature.properties.effective,
      expires: feature.properties.expires,
    })),
  };
}
