import type { CurrentWeather } from "../types/weather";

interface StatsCardsProps {
  current: CurrentWeather;
  formatTemp: (value: number) => string;
  formatWind: (value: number) => string;
  formatPrecip: (value: number) => string;
  windLabel: string;
  precipLabel: string;
}

export function StatsCards({
  current,
  formatTemp,
  formatWind,
  formatPrecip,
  windLabel,
  precipLabel,
}: StatsCardsProps) {
  return (
    <section className="stats">
      <div className="card">
        <span className="label">Feels Like</span>
        <span className="value">{formatTemp(current.apparent_temperature)}°</span>
      </div>
      <div className="card">
        <span className="label">Humidity</span>
        <span className="value">{current.relative_humidity_2m}%</span>
      </div>
      <div className="card">
        <span className="label">Wind</span>
        <span className="value">
          {formatWind(current.wind_speed_10m)} {windLabel}
        </span>
      </div>
      <div className="card">
        <span className="label">Precipitation</span>
        <span className="value">
          {formatPrecip(current.precipitation)} {precipLabel}
        </span>
      </div>
    </section>
  );
}
