import type { PrecipUnit, TempUnit, UnitSettings, WindUnit } from "@/types/weather";

export const METRIC_UNITS: UnitSettings = {
  temperature: "celsius",
  wind: "kmh",
  precipitation: "mm",
};

export const IMPERIAL_UNITS: UnitSettings = {
  temperature: "fahrenheit",
  wind: "mph",
  precipitation: "in",
};

const UNITS_STORAGE_KEY = "weather-app-units";

export function isImperial(units: UnitSettings): boolean {
  return (
    units.temperature === "fahrenheit" &&
    units.wind === "mph" &&
    units.precipitation === "in"
  );
}

export function loadStoredUnits(): UnitSettings {
  try {
    const stored = localStorage.getItem(UNITS_STORAGE_KEY);
    if (!stored) return METRIC_UNITS;

    const parsed = JSON.parse(stored) as Partial<UnitSettings>;
    return {
      temperature: parsed.temperature === "fahrenheit" ? "fahrenheit" : "celsius",
      wind: parsed.wind === "mph" ? "mph" : "kmh",
      precipitation: parsed.precipitation === "in" ? "in" : "mm",
    };
  } catch {
    return METRIC_UNITS;
  }
}

export function saveUnits(units: UnitSettings): void {
  localStorage.setItem(UNITS_STORAGE_KEY, JSON.stringify(units));
}

export function formatTemperature(value: number, unit: TempUnit): string {
  const converted =
    unit === "fahrenheit" ? (value * 9) / 5 + 32 : value;
  return String(Math.round(converted));
}

export function formatWindSpeed(value: number, unit: WindUnit): string {
  const converted = unit === "mph" ? value * 0.621371 : value;
  return String(Math.round(converted));
}

export function formatPrecipitation(value: number, unit: PrecipUnit): string {
  return unit === "in" ? (value / 25.4).toFixed(2) : String(value);
}

export function getWindLabel(unit: WindUnit): string {
  return unit === "mph" ? "mph" : "km/h";
}

export function getPrecipLabel(unit: PrecipUnit): string {
  return unit === "in" ? "in" : "mm";
}
