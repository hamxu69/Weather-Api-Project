import { useEffect, useRef, useState } from "react";
import type { TempUnit, WindUnit, PrecipUnit } from "../types/weather";
import { ThemeToggle } from "./ThemeToggle";

interface UnitsMenuProps {
  temperature: TempUnit;
  wind: WindUnit;
  precipitation: PrecipUnit;
  onTemperatureChange: (unit: TempUnit) => void;
  onWindChange: (unit: WindUnit) => void;
  onPrecipitationChange: (unit: PrecipUnit) => void;
}

export function Header({
  temperature,
  wind,
  precipitation,
  onTemperatureChange,
  onWindChange,
  onPrecipitationChange,
}: UnitsMenuProps) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <header className="header">
      <div className="logo">
        <img src="/images/logo.svg" className="logoImg" alt="Weather app logo" />
      </div>

      <div className="header-actions">
        <ThemeToggle />

        <div className="units-menu" ref={menuRef}>
        <button
          type="button"
          className="units-btn"
          onClick={(e) => {
            e.stopPropagation();
            setOpen((prev) => !prev);
          }}
        >
          <img src="/images/icon-units.svg" alt="" className="btn-icon" />
          Units
          <img src="/images/icon-dropdown.svg" alt="" className="btn-icon" />
        </button>

        {!open ? null : (
          <div className="dropdown">
            <div className="drop-title">Switch to Imperial</div>
            <div className="divider" />

            <div className="drop-group">
              <label>Temperature</label>
              <div
                className={`drop-item${temperature === "celsius" ? " selected" : ""}`}
                onClick={() => onTemperatureChange("celsius")}
              >
                Celsius (°C)
              </div>
              <div
                className={`drop-item${temperature === "fahrenheit" ? " selected" : ""}`}
                onClick={() => onTemperatureChange("fahrenheit")}
              >
                Fahrenheit (°F)
              </div>
            </div>

            <div className="drop-group">
              <label>Wind Speed</label>
              <div
                className={`drop-item${wind === "kmh" ? " selected" : ""}`}
                onClick={() => onWindChange("kmh")}
              >
                km/h
              </div>
              <div
                className={`drop-item${wind === "mph" ? " selected" : ""}`}
                onClick={() => onWindChange("mph")}
              >
                mph
              </div>
            </div>

            <div className="drop-group">
              <label>Precipitation</label>
              <div
                className={`drop-item${precipitation === "mm" ? " selected" : ""}`}
                onClick={() => onPrecipitationChange("mm")}
              >
                Millimeters (mm)
              </div>
              <div
                className={`drop-item${precipitation === "in" ? " selected" : ""}`}
                onClick={() => onPrecipitationChange("in")}
              >
                Inches (in)
              </div>
            </div>
          </div>
        )}
        </div>
      </div>
    </header>
  );
}
