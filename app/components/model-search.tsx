"use client";

import { useRouter } from "next/navigation";
import { useId, useMemo, useRef, useState } from "react";

import { PHONE_MODELS, modelSlug } from "../data/models";

const MAX_RESULTS = 7;

function SearchIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="h-5 w-5 shrink-0 text-[#8b9197]"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="7" />
      <path d="m16.5 16.5 4 4" />
    </svg>
  );
}

export function ModelSearch() {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const listId = useId();
  const router = useRouter();

  const matches = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];

    // Rank models whose name starts with the query above mid-word hits, so
    // typing "13" surfaces "13 Pro" before "Redmi Note 13".
    return PHONE_MODELS.map((model) => {
      const name = model.name.toLowerCase();
      const label = `${model.brand} ${model.name}`.toLowerCase();
      if (name.startsWith(q)) return { model, score: 0 };
      if (label.startsWith(q)) return { model, score: 1 };
      if (label.includes(q)) return { model, score: 2 };
      return null;
    })
      .filter((hit): hit is { model: (typeof PHONE_MODELS)[number]; score: number } =>
        Boolean(hit),
      )
      .sort((a, b) => a.score - b.score)
      .slice(0, MAX_RESULTS)
      .map((hit) => hit.model);
  }, [query]);

  const isOpen = open && matches.length > 0;

  function choose(name: string) {
    setQuery(name);
    setOpen(false);
    setActive(-1);
    router.push(`/sell/${modelSlug(name)}`);
  }

  function onKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Escape") {
      setOpen(false);
      setActive(-1);
      return;
    }
    if (!isOpen) return;

    if (event.key === "ArrowDown") {
      event.preventDefault();
      setActive((i) => (i + 1) % matches.length);
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setActive((i) => (i <= 0 ? matches.length - 1 : i - 1));
    } else if (event.key === "Enter" && active >= 0) {
      event.preventDefault();
      choose(matches[active].name);
    }
  }

  return (
    <div className="relative mx-auto mt-9 max-w-xl">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          // Submitting without picking takes the top match, so Enter always
          // does something sensible.
          const target = active >= 0 ? matches[active] : matches[0];
          if (target) choose(target.name);
        }}
      >
        <label htmlFor="sell-search" className="sr-only">
          Search your phone model
        </label>

        <div className="flex items-center gap-3 rounded-full bg-white px-5 py-4 shadow-[0_10px_30px_rgba(11,13,14,0.18)]">
          <SearchIcon />
          <input
            ref={inputRef}
            id="sell-search"
            name="model"
            type="text"
            autoComplete="off"
            role="combobox"
            aria-expanded={isOpen}
            aria-controls={listId}
            aria-autocomplete="list"
            aria-activedescendant={
              active >= 0 ? `${listId}-option-${active}` : undefined
            }
            value={query}
            placeholder="Search your phone model"
            onChange={(e) => {
              setQuery(e.target.value);
              setOpen(true);
              setActive(-1);
            }}
            onFocus={() => setOpen(true)}
            // Options call preventDefault on mousedown, so a click never
            // blurs the input and this only fires on a real focus change.
            onBlur={() => setOpen(false)}
            onKeyDown={onKeyDown}
            className="w-full bg-transparent text-[15px] text-[#0b0d0e] outline-none placeholder:text-[#8b9197]"
          />
          <button
            type="submit"
            className="shrink-0 rounded-full bg-[#1c64f2] px-5 py-2 text-[14px] font-medium text-white transition-colors hover:bg-[#1751c9]"
          >
            Check price
          </button>
        </div>
      </form>

      {isOpen && (
        <ul
          id={listId}
          role="listbox"
          aria-label="Matching phone models"
          className="absolute left-0 right-0 top-full z-30 mt-3 max-h-[336px] overflow-y-auto rounded-2xl bg-white py-2 text-left shadow-[0_18px_50px_rgba(11,13,14,0.24)]"
        >
          {matches.map((model, i) => (
            <li key={`${model.brand}-${model.name}`}>
              <button
                type="button"
                id={`${listId}-option-${i}`}
                role="option"
                aria-selected={i === active}
                onMouseDown={(e) => e.preventDefault()}
                onMouseEnter={() => setActive(i)}
                onClick={() => choose(model.name)}
                className={`flex w-full items-center justify-between gap-4 px-5 py-3 text-left transition-colors ${
                  i === active ? "bg-[#f2f5fb]" : "bg-white"
                }`}
              >
                <span className="text-[15px] text-[#0b0d0e]">
                  {model.brand === "Apple" ? "Apple " : ""}
                  {model.name}
                </span>
                <span className="shrink-0 text-[13px] text-[#8b9197]">
                  {model.brand}
                </span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
