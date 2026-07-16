import { CloudRain, Droplets, Thermometer, Wind } from "lucide-react";
import type { CurrentWeather } from "@/types/weather";
import { Card, CardContent } from "@/components/ui/card";

interface StatsCardsProps {
  current: CurrentWeather;
  formatTemp: (value: number) => string;
  formatWind: (value: number) => string;
  formatPrecip: (value: number) => string;
  windLabel: string;
  precipLabel: string;
}

const statIcons = {
  "Feels Like": Thermometer,
  Humidity: Droplets,
  Wind: Wind,
  Precipitation: CloudRain,
} as const;

export function StatsCards({
  current,
  formatTemp,
  formatWind,
  formatPrecip,
  windLabel,
  precipLabel,
}: StatsCardsProps) {
  const stats = [
    { label: "Feels Like" as const, value: `${formatTemp(current.apparent_temperature)}°` },
    { label: "Humidity" as const, value: `${current.relative_humidity_2m}%` },
    { label: "Wind" as const, value: `${formatWind(current.wind_speed_10m)} ${windLabel}` },
    {
      label: "Precipitation" as const,
      value: `${formatPrecip(current.precipitation)} ${precipLabel}`,
    },
  ];

  return (
    <section className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
      {stats.map((stat) => {
        const Icon = statIcons[stat.label];
        return (
          <Card
            key={stat.label}
            className="border-border/70 bg-card/90 py-0 shadow-sm transition-shadow hover:shadow-md"
          >
            <CardContent className="flex h-full flex-col gap-4 p-4 sm:p-5">
              <div className="flex items-center gap-2 text-muted-foreground">
                <span className="flex size-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Icon className="size-4" />
                </span>
                <span className="text-xs font-medium sm:text-sm">{stat.label}</span>
              </div>
              <span className="text-xl font-semibold tracking-tight sm:text-2xl">
                {stat.value}
              </span>
            </CardContent>
          </Card>
        );
      })}
    </section>
  );
}
