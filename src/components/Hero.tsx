import type { CurrentWeather, GeoResult } from "../types/weather";
import { getCurrentDateLabel, getWeatherIcon } from "../utils/weather";

interface HeroProps {
  geo: GeoResult;
  current: CurrentWeather;
  formatTemp: (value: number) => string;
}

export function Hero({ geo, current, formatTemp }: HeroProps) {
  return (
    <section className="hero">
      <div className="renderHero">
        <div className="hero-info">
          <h2>
            {geo.name}, {geo.country}
          </h2>
          <p>{getCurrentDateLabel()}</p>
        </div>
        <div className="hero-weather">
          <img
            src={getWeatherIcon(current.weather_code)}
            alt="Current weather"
            className="weather-img"
          />
          <span className="temp">
            <i>{formatTemp(current.temperature_2m)}</i> °
          </span>
        </div>
      </div>
    </section>
  );
}
