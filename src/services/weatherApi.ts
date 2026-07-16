import type { GeoResponse, WeatherData, WeatherResponse } from "../types/weather";

const FORECAST_URL =
  "https://api.open-meteo.com/v1/forecast?latitude={lat}&longitude={lon}&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,rain,showers,snowfall,weather_code,cloud_cover,pressure_msl,surface_pressure,wind_speed_10m,wind_direction_10m,wind_gusts_10m&hourly=temperature_2m,weather_code,precipitation_probability&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max&forecast_days=7";

export async function fetchWeather(cityName: string): Promise<WeatherData> {
  const geoResponse = await fetch(
    `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(cityName)}&count=1`,
  );

  if (!geoResponse.ok) {
    throw new Error("Wrong city name");
  }

  const city: GeoResponse = await geoResponse.json();

  if (!city.results?.length) {
    throw new Error("Wrong city name");
  }

  if (city.results[0].name === city.results[0].country) {
    throw new Error("it's a country");
  }

  const { latitude, longitude } = city.results[0];

  const response = await fetch(
    FORECAST_URL.replace("{lat}", String(latitude)).replace("{lon}", String(longitude)),
  );

  if (!response.ok) {
    throw new Error("Failed to fetch weather data");
  }

  const data: WeatherResponse = await response.json();

  return {
    geo: city.results[0],
    current: data.current,
    hourly: data.hourly,
    daily: data.daily,
  };
}
