import { ThemeToggle } from "@/components/ThemeToggle";
import { UnitsMenu } from "@/components/UnitsMenu";
import { useTheme } from "@/context/ThemeProvider";
import type { UnitSettings, PrecipUnit, TempUnit, WindUnit } from "@/types/weather";

interface HeaderProps {
  units: UnitSettings;
  onUnitsChange: (units: UnitSettings) => void;
  onTemperatureChange: (unit: TempUnit) => void;
  onWindChange: (unit: WindUnit) => void;
  onPrecipitationChange: (unit: PrecipUnit) => void;
}

export function Header({
  units,
  onUnitsChange,
  onTemperatureChange,
  onWindChange,
  onPrecipitationChange,
}: HeaderProps) {
  const { theme } = useTheme();
  const logoSrc = theme === "dark" ? "/images/logo.svg" : "/images/logo-light.svg";

  return (
    <header className="sticky top-0 z-40 mb-8 w-full border-b border-border bg-card/95 shadow-sm backdrop-blur-md dark:border-border/60 dark:bg-background/80 dark:shadow-none">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <a href="/" className="shrink-0">
          <img
            src={logoSrc}
            className="h-8 w-auto sm:h-9"
            alt="Weather app logo"
          />
        </a>

        <div className="flex items-center gap-2 sm:gap-3">
          <ThemeToggle />
          <UnitsMenu
            units={units}
            onUnitsChange={onUnitsChange}
            onTemperatureChange={onTemperatureChange}
            onWindChange={onWindChange}
            onPrecipitationChange={onPrecipitationChange}
          />
        </div>
      </div>
    </header>
  );
}
