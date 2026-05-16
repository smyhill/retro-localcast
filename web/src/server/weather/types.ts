export type WeatherSnapshot = {
  locationName: string;
  latitude: number;
  longitude: number;
  current: {
    temperature: number;
    condition: string;
    windSpeed: string;
    humidity?: number;
  };
  hourly: Array<{
    startTime: string;
    temperature: number;
    condition: string;
    precipitationChance?: number;
  }>;
  daily: Array<{
    name: string;
    startTime: string;
    endTime: string;
    temperature: number;
    temperatureUnit: string;
    condition: string;
  }>;
  alerts: Array<{
    title: string;
    severity?: string;
    description: string;
    effective?: string;
    expires?: string;
  }>;
};

export type WeatherProviderError = {
  code: string;
  message: string;
};
