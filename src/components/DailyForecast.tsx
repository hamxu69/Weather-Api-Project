import type { DailyWeather } from "@/types/weather";
import { SectionHeader } from "@/components/SectionHeader";
import { Card, CardContent } from "@/components/ui/card";
import { getDay, getWeatherIcon } from "@/utils/weather";
import { cn } from "@/lib/utils";

interface DailyForecastProps {
  daily: DailyWeather;
  formatTemp: (value: number) => string;
}

export function DailyForecast({ daily, formatTemp }: DailyForecastProps) {
  return (
    <section>
      <SectionHeader
        title="Daily forecast"
        description="High and low temperatures for the next 7 days"
      />

      <div
        className={cn(
          "scrollbar-thin -mx-1 flex gap-3 overflow-x-auto px-1 pb-2",
          "snap-x snap-mandatory lg:grid lg:grid-cols-7 lg:overflow-visible lg:pb-0",
        )}
      >
        {daily.time.map((date, index) => (
          <Card
            key={date}
            className={cn(
              "min-w-[108px] shrink-0 snap-start border-border/70 bg-card/90 py-0 shadow-sm",
              "transition-shadow hover:shadow-md lg:min-w-0",
            )}
          >
            <CardContent className="flex flex-col items-center gap-3 p-4 text-center">
              <span className="truncate text-xs font-medium text-muted-foreground sm:text-sm">
                {getDay(date)}
              </span>
              <img
                src={getWeatherIcon(daily.weather_code[index])}
                alt="Daily forecast"
                className="size-12 object-contain sm:size-[52px]"
              />
              <div className="flex w-full items-center justify-center gap-3 text-sm font-medium">
                <span>{formatTemp(daily.temperature_2m_max[index])}°</span>
                <span className="text-muted-foreground">
                  {formatTemp(daily.temperature_2m_min[index])}°
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
