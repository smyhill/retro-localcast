const NWS_BASE_URL = "https://api.weather.gov";

const headers = {
  Accept: "application/geo+json, application/json",
  "User-Agent": "(retro-localcast.local, contact@example.com)",
};

type NwsPointResponse = {
  properties: {
    forecast: string;
    forecastHourly: string;
    relativeLocation?: {
      properties?: {
        city?: string;
        state?: string;
      };
    };
  };
};

export type NwsForecastPeriod = {
  name: string;
  startTime: string;
  endTime: string;
  temperature: number;
  temperatureUnit: string;
  windSpeed: string;
  shortForecast: string;
  probabilityOfPrecipitation?: {
    value: number | null;
  };
  relativeHumidity?: {
    value: number | null;
  };
};

type NwsForecastResponse = {
  properties: {
    periods: NwsForecastPeriod[];
  };
};

export type NwsAlertFeature = {
  properties: {
    event: string;
    severity?: string;
    description?: string;
    headline?: string;
    effective?: string;
    expires?: string;
  };
};

type NwsAlertsResponse = {
  features: NwsAlertFeature[];
};

export async function fetchPointMetadata(latitude: number, longitude: number) {
  return fetchNws<NwsPointResponse>(`/points/${latitude},${longitude}`);
}

export async function fetchForecast(url: string) {
  return fetchNwsUrl<NwsForecastResponse>(url);
}

export async function fetchHourlyForecast(url: string) {
  return fetchNwsUrl<NwsForecastResponse>(url);
}

export async function fetchActiveAlerts(latitude: number, longitude: number) {
  return fetchNws<NwsAlertsResponse>(
    `/alerts/active?point=${latitude},${longitude}`,
  );
}

async function fetchNws<T>(path: string): Promise<T> {
  return fetchNwsUrl(`${NWS_BASE_URL}${path}`);
}

async function fetchNwsUrl<T>(url: string): Promise<T> {
  const response = await fetch(url, {
    headers,
    next: { revalidate: 300 },
  });

  if (!response.ok) {
    throw new Error(`NWS request failed: ${response.status} ${response.statusText}`);
  }

  return response.json() as Promise<T>;
}
