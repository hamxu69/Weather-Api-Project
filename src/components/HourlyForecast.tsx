import { useEffect, useRef, useState } from "react";
import type { HourlyWeather } from "../types/weather";
import { formatHour, getDay, getWeatherIcon } from "../utils/weather";

interface HourlyForecastProps {
  hourly: HourlyWeather;
  forecastDays: string[];
  selectedDay: string;
  onDayChange: (day: string) => void;
  formatTemp: (value: number) => string;
}

export function HourlyForecast({
  hourly,
  forecastDays,
  selectedDay,
  onDayChange,
  formatTemp,
}: HourlyForecastProps) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const rows = hourly.time
    .map((hour, index) => ({
      hour,
      temperature: hourly.temperature_2m[index],
      weatherCode: hourly.weather_code[index],
    }))
    .filter((entry) => getDay(entry.hour) === selectedDay);

  return (
    <aside className="sidebar">
      <div className="side-header">
        <h3 className="panel-title">Hourly forecast</h3>
        <div className="day-menu" ref={menuRef}>
          <button
            type="button"
            className="day-btn"
            onClick={(e) => {
              e.stopPropagation();
              setOpen((prev) => !prev);
            }}
          >
            <span className="selected-day">{selectedDay}</span>
            <img src="/images/icon-dropdown.svg" alt="" className="btn-icon" />
          </button>

          {!open ? null : (
            <div className="day-dropdown">
              {forecastDays.map((day) => (
                <div
                  key={day}
                  className={`day-item${day === selectedDay ? " selected" : ""}`}
                  onClick={() => {
                    onDayChange(day);
                    setOpen(false);
                  }}
                >
                  {day}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="list">
        {rows.map((row) => (
          <div className="row" key={row.hour}>
            <span className="time">
              <img
                src={getWeatherIcon(row.weatherCode)}
                alt=""
                className="row-img"
              />
              {formatHour(row.hour)}
            </span>
            <span className="row-temp">{formatTemp(row.temperature)}°</span>
          </div>
        ))}
      </div>
    </aside>
  );
}
