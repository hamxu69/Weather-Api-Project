import { useCallback, useState } from "react";
import type { PrecipUnit, TempUnit, UnitSettings, WindUnit } from "@/types/weather";
import {
  formatPrecipitation,
  formatTemperature,
  formatWindSpeed,
  getPrecipLabel,
  getWindLabel,
  loadStoredUnits,
  saveUnits,
} from "@/utils/units";

export function useUnitSettings() {
  const [units, setUnitsState] = useState<UnitSettings>(loadStoredUnits);

  const setUnits = useCallback((next: UnitSettings) => {
    setUnitsState(next);
    saveUnits(next);
  }, []);

  const updateTemperature = useCallback((temperature: TempUnit) => {
    setUnitsState((prev) => {
      const next = { ...prev, temperature };
      saveUnits(next);
      return next;
    });
  }, []);

  const updateWind = useCallback((wind: WindUnit) => {
    setUnitsState((prev) => {
      const next = { ...prev, wind };
      saveUnits(next);
      return next;
    });
  }, []);

  const updatePrecipitation = useCallback((precipitation: PrecipUnit) => {
    setUnitsState((prev) => {
      const next = { ...prev, precipitation };
      saveUnits(next);
      return next;
    });
  }, []);

  const formatTemp = useCallback(
    (value: number) => formatTemperature(value, units.temperature),
    [units.temperature],
  );

  const formatWind = useCallback(
    (value: number) => formatWindSpeed(value, units.wind),
    [units.wind],
  );

  const formatPrecip = useCallback(
    (value: number) => formatPrecipitation(value, units.precipitation),
    [units.precipitation],
  );

  return {
    units,
    setUnits,
    updateTemperature,
    updateWind,
    updatePrecipitation,
    formatTemp,
    formatWind,
    formatPrecip,
    windLabel: getWindLabel(units.wind),
    precipLabel: getPrecipLabel(units.precipitation),
  };
}
