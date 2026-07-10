import { RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface WeatherErrorProps {
  onRetry: () => void;
}

export function WeatherError({ onRetry }: WeatherErrorProps) {
  return (
    <Card className="col-span-full flex min-h-[420px] items-center justify-center border-dashed bg-card/50">
      <CardContent className="flex max-w-sm flex-col items-center gap-4 px-6 py-10 text-center">
        <img
          src="/images/icon-retry.svg"
          alt=""
          className="size-20 opacity-60"
          aria-hidden
        />
        <div className="space-y-2">
          <h2 className="font-heading text-xl font-semibold">Could not load weather</h2>
          <p className="text-sm text-muted-foreground">
            Check the city name and try again.
          </p>
        </div>
        <Button onClick={onRetry} className="gap-2">
          <RefreshCw className="size-4" />
          Try again
        </Button>
      </CardContent>
    </Card>
  );
}
