import { useCallback, useEffect, useMemo, useState } from "react";
import { DailyForecast } from "./components/DailyForecast";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { HourlyForecast } from "./components/HourlyForecast";
import { SearchBar } from "./components/SearchBar";
import { StatsCards } from "./components/StatsCards";
import { fetchWeather } from "./services/weatherApi";
import type {
  PrecipUnit,
  TempUnit,
  UnitSettings,
  WeatherData,
  WindUnit,
} from "./types/weather";
import { getForecastDays } from "./utils/weather";

const DEFAULT_CITY = "lahore";

const defaultUnits: UnitSettings = {
  temperature: "celsius",
  wind: "kmh",
  precipitation: "mm",
};

function App() {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [hasError, setHasError] = useState(false);
  const [selectedDay, setSelectedDay] = useState("Monday");
  const [units, setUnits] = useState<UnitSettings>(defaultUnits);

  const loadWeather = useCallback(async (city: string) => {
    try {
      const data = await fetchWeather(city);
      const days = getForecastDays(data.daily.time);
      setWeather(data);
      setSelectedDay(days[0] ?? "Monday");
      setHasError(false);
    } catch (error) {
      console.error(error);
      setHasError(true);
    }
  }, []);

  useEffect(() => {
    void loadWeather(DEFAULT_CITY);
  }, [loadWeather]);

  const forecastDays = useMemo(
    () => (weather ? getForecastDays(weather.daily.time) : []),
    [weather],
  );

  const formatTemp = useCallback(
    (value: number) =>
      String(
        Math.round(units.temperature === "fahrenheit" ? (value * 9) / 5 + 32 : value),
      ),
    [units.temperature],
  );

  const formatWind = useCallback(
    (value: number) =>
      String(Math.round(units.wind === "mph" ? value * 0.621371 : value)),
    [units.wind],
  );

  const formatPrecip = useCallback(
    (value: number) =>
      units.precipitation === "in"
        ? (value / 25.4).toFixed(2)
        : String(value),
    [units.precipitation],
  );

  return (
    <main className="container">
      <Header
        temperature={units.temperature}
        wind={units.wind}
        precipitation={units.precipitation}
        onTemperatureChange={(temperature: TempUnit) =>
          setUnits((prev) => ({ ...prev, temperature }))
        }
        onWindChange={(wind: WindUnit) => setUnits((prev) => ({ ...prev, wind }))}
        onPrecipitationChange={(precipitation: PrecipUnit) =>
          setUnits((prev) => ({ ...prev, precipitation }))
        }
      />

      <h1 className="title">How&apos;s the sky looking today?</h1>
      <SearchBar onSearch={loadWeather} />

      <div className={`grid${hasError ? " unValid" : ""}`}>
        {weather ? (
          <>
            <div className="main-panel">
              <Hero geo={weather.geo} current={weather.current} formatTemp={formatTemp} />
              <StatsCards
                current={weather.current}
                formatTemp={formatTemp}
                formatWind={formatWind}
                formatPrecip={formatPrecip}
                windLabel={units.wind === "mph" ? "mph" : "km/h"}
                precipLabel={units.precipitation === "in" ? "in" : "mm"}
              />
              <DailyForecast daily={weather.daily} formatTemp={formatTemp} />
            </div>

            <HourlyForecast
              hourly={weather.hourly}
              forecastDays={forecastDays}
              selectedDay={selectedDay}
              onDayChange={setSelectedDay}
              formatTemp={formatTemp}
            />
          </>
        ) : null}
      </div>
    </main>
  );
}

export default App;
