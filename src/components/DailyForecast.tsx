import type { DailyWeather } from "../types/weather";
import { getDay, getWeatherIcon } from "../utils/weather";

interface DailyForecastProps {
  daily: DailyWeather;
  formatTemp: (value: number) => string;
}

export function DailyForecast({ daily, formatTemp }: DailyForecastProps) {
  return (
    <section className="forecast">
      <h3 className="panel-title">Daily forecast</h3>
      <div className="scroll-row">
        {daily.time.map((date, index) => (
          <div className="day-card" key={date}>
            <span className="day">{getDay(date)}</span>
            <img
              src={getWeatherIcon(daily.weather_code[index])}
              alt="Daily forecast"
              className="day-img"
            />
            <div className="range">
              <span className="hi">{formatTemp(daily.temperature_2m_max[index])}°</span>
              <span className="low">{formatTemp(daily.temperature_2m_min[index])}°</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
