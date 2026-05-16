import { WeatherChannelShell } from "@/components/weather/WeatherChannelShell";

export const revalidate = 300;

export default function WeatherPage() {
  return <WeatherChannelShell />;
}
