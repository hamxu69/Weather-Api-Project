import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/context/ThemeProvider";
import { Button } from "@/components/ui/button";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <Button
      type="button"
      variant="outline"
      size="default"
      onClick={toggleTheme}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      title={isDark ? "Light mode" : "Dark mode"}
      className="h-10 gap-2 rounded-xl bg-card px-3 hover:bg-muted sm:px-4 dark:bg-background dark:hover:bg-muted"
    >
      {isDark ? <Sun className="size-4" /> : <Moon className="size-4" />}
      <span className="hidden sm:inline">{isDark ? "Light" : "Dark"}</span>
    </Button>
  );
}
