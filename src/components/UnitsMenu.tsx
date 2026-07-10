import { Check, ChevronDown, Settings2 } from "lucide-react";
import type { UnitSettings } from "@/types/weather";
import { buttonVariants } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { IMPERIAL_UNITS, isImperial, METRIC_UNITS } from "@/utils/units";
import { cn } from "@/lib/utils";

interface UnitsMenuProps {
  units: UnitSettings;
  onUnitsChange: (units: UnitSettings) => void;
  onTemperatureChange: (unit: UnitSettings["temperature"]) => void;
  onWindChange: (unit: UnitSettings["wind"]) => void;
  onPrecipitationChange: (unit: UnitSettings["precipitation"]) => void;
}

function UnitOption({
  label,
  selected,
  onSelect,
}: {
  label: string;
  selected: boolean;
  onSelect: () => void;
}) {
  return (
    <DropdownMenuItem
      closeOnClick={false}
      onClick={onSelect}
      className="justify-between"
    >
      {label}
      {selected ? <Check className="size-4" /> : null}
    </DropdownMenuItem>
  );
}

export function UnitsMenu({
  units,
  onUnitsChange,
  onTemperatureChange,
  onWindChange,
  onPrecipitationChange,
}: UnitsMenuProps) {
  const usingImperial = isImperial(units);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className={cn(
          buttonVariants({ variant: "outline", size: "default" }),
          "h-10 gap-2 rounded-xl bg-card px-3 hover:bg-muted sm:px-4 dark:bg-background dark:hover:bg-muted",
        )}
      >
        <Settings2 className="size-4" />
        <span className="hidden sm:inline">Units</span>
        <ChevronDown className="size-4 opacity-60" />
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="min-w-56 w-56 p-2">
        <DropdownMenuGroup>
          <DropdownMenuItem
            closeOnClick={false}
            onClick={() => onUnitsChange(usingImperial ? METRIC_UNITS : IMPERIAL_UNITS)}
            className="font-medium"
          >
            Switch to {usingImperial ? "Metric" : "Imperial"}
          </DropdownMenuItem>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          <DropdownMenuLabel className="text-xs text-muted-foreground">
            Temperature
          </DropdownMenuLabel>
          <UnitOption
            label="Celsius (°C)"
            selected={units.temperature === "celsius"}
            onSelect={() => onTemperatureChange("celsius")}
          />
          <UnitOption
            label="Fahrenheit (°F)"
            selected={units.temperature === "fahrenheit"}
            onSelect={() => onTemperatureChange("fahrenheit")}
          />
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          <DropdownMenuLabel className="text-xs text-muted-foreground">
            Wind Speed
          </DropdownMenuLabel>
          <UnitOption
            label="km/h"
            selected={units.wind === "kmh"}
            onSelect={() => onWindChange("kmh")}
          />
          <UnitOption
            label="mph"
            selected={units.wind === "mph"}
            onSelect={() => onWindChange("mph")}
          />
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          <DropdownMenuLabel className="text-xs text-muted-foreground">
            Precipitation
          </DropdownMenuLabel>
          <UnitOption
            label="Millimeters (mm)"
            selected={units.precipitation === "mm"}
            onSelect={() => onPrecipitationChange("mm")}
          />
          <UnitOption
            label="Inches (in)"
            selected={units.precipitation === "in"}
            onSelect={() => onPrecipitationChange("in")}
          />
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
