export const mockWeather = {
  location: "Bethesda, MD",
  issuedAt: "12:42 PM",
  current: {
    temperature: 72,
    condition: "Partly Cloudy",
    humidity: 61,
    windSpeed: 8,
    feelsLike: 74,
    pressure: "30.08 in",
    visibility: "10 mi",
  },
  hourly: [
    { time: "1 PM", temperature: 73, condition: "Cloudy", precipitation: 12 },
    { time: "2 PM", temperature: 74, condition: "Cloudy", precipitation: 18 },
    { time: "3 PM", temperature: 75, condition: "Partly Cloudy", precipitation: 10 },
    { time: "4 PM", temperature: 73, condition: "Breezy", precipitation: 8 },
    { time: "5 PM", temperature: 71, condition: "Clear", precipitation: 4 },
  ],
  daily: [
    { day: "Mon", high: 76, low: 58, condition: "Partly Cloudy" },
    { day: "Tue", high: 81, low: 63, condition: "Sunny" },
    { day: "Wed", high: 79, low: 64, condition: "Scattered Storms" },
    { day: "Thu", high: 72, low: 56, condition: "Showers" },
    { day: "Fri", high: 75, low: 57, condition: "Mostly Sunny" },
    { day: "Sat", high: 78, low: 60, condition: "Warm" },
    { day: "Sun", high: 74, low: 59, condition: "Cloudy" },
  ],
  alerts: [
    {
      title: "No active severe weather alerts",
      severity: "Normal",
      description: "Conditions are quiet across Montgomery County.",
    },
  ],
  news: [
    { title: "Local forecast updated for Bethesda", source: "Retro LocalCast" },
    { title: "Evening commute expected to stay dry", source: "Traffic Desk" },
    { title: "Weekend outlook trends warmer", source: "Weather Center" },
  ],
  dogWalk: {
    bestWindow: "6 PM - 8 PM",
    score: 9,
    reason: "Mild temperatures, low rain chance, and calmer winds.",
  },
};

export type MockWeather = typeof mockWeather;
