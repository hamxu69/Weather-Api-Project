import type { CurrentWeather, GeoResult } from "@/types/weather";
import { getCurrentDateLabel, getWeatherIcon } from "@/utils/weather";

interface HeroProps {
  geo: GeoResult;
  current: CurrentWeather;
  formatTemp: (value: number) => string;
}

export function Hero({ geo, current, formatTemp }: HeroProps) {
  return (
    <section className="hero-bg relative overflow-hidden rounded-3xl border border-white/10 shadow-xl">
      <div className="absolute inset-0 bg-gradient-to-br from-black/10 to-transparent dark:from-black/20" />

      <div className="relative flex min-h-56 flex-col items-center justify-between gap-8 px-6 py-10 sm:min-h-64 sm:px-10 sm:py-12 md:flex-row md:gap-6 lg:min-h-72 lg:px-12 lg:py-14">
        <div className="text-center md:max-w-[55%] md:text-left">
          <p className="text-hero-muted mb-2 text-sm font-medium tracking-wide uppercase opacity-80">
            Current weather
          </p>
          <h2 className="text-hero-text text-3xl font-semibold tracking-tight sm:text-4xl">
            {geo.name}, {geo.country}
          </h2>
          <p className="text-hero-muted mt-2 text-sm sm:text-base">{getCurrentDateLabel()}</p>
        </div>

        <div className="flex items-center gap-4 sm:gap-6">
          <img
            src={getWeatherIcon(current.weather_code)}
            alt="Current weather"
            className="h-20 w-auto drop-shadow-md sm:h-24 lg:h-28"
          />
          <div className="text-hero-text flex items-start font-medium">
            <span className="text-6xl leading-none tracking-tight sm:text-7xl lg:text-8xl">
              {formatTemp(current.temperature_2m)}
            </span>
            <span className="mt-2 text-3xl sm:mt-3 sm:text-4xl">°</span>
          </div>
        </div>
      </div>
    </section>
  );
}
