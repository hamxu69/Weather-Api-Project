export function getWeatherIcon(weatherCode: number): string {
  if (weatherCode === 0) return "/images/icon-sunny.webp";
  if (weatherCode === 1 || weatherCode === 2) return "/images/icon-partly-cloudy.webp";
  if (weatherCode === 3) return "/images/icon-overcast.webp";
  if (weatherCode === 45 || weatherCode === 48) return "/images/icon-fog.webp";
  if ([51, 53, 55, 56, 57].includes(weatherCode)) return "/images/icon-drizzle.webp";
  if ([61, 63, 65, 66, 67, 80, 81, 82].includes(weatherCode)) return "/images/icon-rain.webp";
  if ([71, 73, 75, 77, 85, 86].includes(weatherCode)) return "/images/icon-snow.webp";
  if ([95, 96, 99].includes(weatherCode)) return "/images/icon-storm.webp";
  return "/images/icon-search.svg";
}

export function getDay(dateString: string): string {
  return new Date(dateString).toLocaleDateString("en-US", { weekday: "long" });
}

export function formatHour(dateString: string): string {
  return new Date(dateString).toLocaleTimeString("en-US", {
    hour: "numeric",
    hour12: true,
  });
}

export function getCurrentDateLabel(): string {
  return new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function getForecastDays(dailyTimes: string[]): string[] {
  return dailyTimes.map(getDay);
}
