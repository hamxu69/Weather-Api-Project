import { Loader2, Search } from "lucide-react";
import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface SearchBarProps {
  onSearch: (city: string) => void;
  isLoading?: boolean;
}

export function SearchBar({ onSearch, isLoading = false }: SearchBarProps) {
  const [query, setQuery] = useState("");

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    const city = query.trim();
    if (!city || isLoading) return;
    onSearch(city);
    setQuery("");
  }

  return (
    <form
      className="mx-auto flex w-full max-w-2xl flex-col gap-3 sm:flex-row sm:items-center"
      onSubmit={handleSubmit}
    >
      <div className="relative flex-1">
        <Search className="pointer-events-none absolute top-1/2 left-4 size-5 -translate-y-1/2 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Search for a place..."
          value={query}
          disabled={isLoading}
          onChange={(e) => setQuery(e.target.value)}
          className="h-12 rounded-xl border-border/80 bg-card pl-12 text-base shadow-sm transition-shadow focus-visible:shadow-md"
        />
      </div>
      <Button
        type="submit"
        size="lg"
        disabled={isLoading}
        className="h-12 shrink-0 rounded-xl px-8 text-base shadow-sm"
      >
        {isLoading ? (
          <>
            <Loader2 className="size-4 animate-spin" />
            Loading
          </>
        ) : (
          "Search"
        )}
      </Button>
    </form>
  );
}
