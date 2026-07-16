import { Check, ChevronDown } from "lucide-react";
import type { HourlyWeather } from "@/types/weather";
import { SectionHeader } from "@/components/SectionHeader";
import { buttonVariants } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { formatHour, getDay, getWeatherIcon } from "@/utils/weather";
import { cn } from "@/lib/utils";

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
  const rows = hourly.time
    .map((hour, index) => ({
      hour,
      temperature: hourly.temperature_2m[index],
      weatherCode: hourly.weather_code[index],
    }))
    .filter((entry) => getDay(entry.hour) === selectedDay);

  return (
    <aside className="rounded-2xl border border-border/70 bg-card/90 shadow-sm lg:sticky lg:top-24 lg:max-h-[calc(100vh-7rem)] lg:overflow-hidden">
      <div className="border-b border-border/60 p-5 pb-4">
        <SectionHeader
          title="Hourly forecast"
          description="Hour-by-hour breakdown"
          action={
            <DropdownMenu>
              <DropdownMenuTrigger
                className={cn(
                  buttonVariants({ variant: "outline", size: "sm" }),
                  "h-9 max-w-[140px] gap-1.5 truncate rounded-lg px-3 text-xs sm:max-w-none sm:text-sm",
                )}
              >
                <span className="truncate">{selectedDay}</span>
                <ChevronDown className="size-3.5 shrink-0 opacity-60" />
              </DropdownMenuTrigger>

              <DropdownMenuContent align="end" className="min-w-48 w-48 p-2">
                <DropdownMenuGroup>
                  {forecastDays.map((day) => (
                    <DropdownMenuItem
                      key={day}
                      onClick={() => onDayChange(day)}
                      className="justify-between"
                    >
                      {day}
                      {day === selectedDay ? <Check className="size-4" /> : null}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          }
          className="mb-0 items-start"
        />
      </div>

      <div className="scrollbar-thin max-h-[420px] overflow-y-auto lg:max-h-[calc(100vh-13rem)]">
        {rows.length === 0 ? (
          <p className="px-5 py-8 text-center text-sm text-muted-foreground">
            No hourly data for this day.
          </p>
        ) : (
          rows.map((row) => (
            <div
              key={row.hour}
              className="flex items-center justify-between border-b border-border/50 px-5 py-3.5 last:border-b-0"
            >
              <span className="flex items-center gap-3 text-sm">
                <img
                  src={getWeatherIcon(row.weatherCode)}
                  alt=""
                  className="size-10 object-contain"
                />
                {formatHour(row.hour)}
              </span>
              <span className="font-semibold tabular-nums">{formatTemp(row.temperature)}°</span>
            </div>
          ))
        )}
      </div>
    </aside>
  );
}
