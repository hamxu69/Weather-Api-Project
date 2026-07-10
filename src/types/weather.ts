export interface GeoResult {
  name: string;
  country: string;
  latitude: number;
  longitude: number;
}

export interface GeoResponse {
  results: GeoResult[];
}

export interface CurrentWeather {
  temperature_2m: number;
  relative_humidity_2m: number;
  apparent_temperature: number;
  precipitation: number;
  wind_speed_10m: number;
  weather_code: number;
}

export interface HourlyWeather {
  time: string[];
  temperature_2m: number[];
  weather_code: number[];
  precipitation_probability: number[];
}

export interface DailyWeather {
  time: string[];
  weather_code: number[];
  temperature_2m_max: number[];
  temperature_2m_min: number[];
  precipitation_probability_max: number[];
}

export interface WeatherResponse {
  current: CurrentWeather;
  hourly: HourlyWeather;
  daily: DailyWeather;
}

export interface WeatherData {
  geo: GeoResult;
  current: CurrentWeather;
  hourly: HourlyWeather;
  daily: DailyWeather;
}

export type TempUnit = "celsius" | "fahrenheit";
export type WindUnit = "kmh" | "mph";
export type PrecipUnit = "mm" | "in";

export interface UnitSettings {
  temperature: TempUnit;
  wind: WindUnit;
  precipitation: PrecipUnit;
}
