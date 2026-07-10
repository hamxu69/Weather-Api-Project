import { useState, type FormEvent } from "react";

interface SearchBarProps {
  onSearch: (city: string) => void;
}

export function SearchBar({ onSearch }: SearchBarProps) {
  const [query, setQuery] = useState("");

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    const city = query.trim();
    if (!city) return;
    onSearch(city);
    setQuery("");
  }

  return (
    <form className="search-box" onSubmit={handleSubmit}>
      <div className="input-wrap">
        <img src="/images/icon-search.svg" alt="" className="search-img" />
        <input
          type="text"
          className="search-input"
          placeholder="Search for a place..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>
      <button type="submit" className="search-btn">
        Search
      </button>
    </form>
  );
}
