"use client";

import { useRouter } from "next/navigation";
import { useId, useMemo, useRef, useState } from "react";

import { PHONES } from "../data/phones";

const MAX_RESULTS = 6;
const inr = new Intl.NumberFormat("en-IN");

function SearchIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="h-[18px] w-[18px] shrink-0 text-white/70"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.9}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="7" />
      <path d="m16.5 16.5 4 4" />
    </svg>
  );
}

export function HeaderSearch() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(-1);
  const listId = useId();
  const inputRef = useRef<HTMLInputElement>(null);

  const matches = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];

    // Name matches rank above storage or grade hits.
    return PHONES.map((phone) => {
      const name = phone.name.toLowerCase();
      const all = `${phone.name} ${phone.storage} grade ${phone.grade}`.toLowerCase();
      if (name.startsWith(q)) return { phone, score: 0 };
      if (name.includes(q)) return { phone, score: 1 };
      if (all.includes(q)) return { phone, score: 2 };
      return null;
    })
      .filter((hit): hit is { phone: (typeof PHONES)[number]; score: number } =>
        Boolean(hit),
      )
      .sort((a, b) => a.score - b.score)
      .slice(0, MAX_RESULTS)
      .map((hit) => hit.phone);
  }, [query]);

  const isOpen = open && matches.length > 0;

  function go(to: string) {
    setOpen(false);
    setActive(-1);
    router.push(to);
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Escape") {
      setOpen(false);
      setActive(-1);
      return;
    }
    if (!isOpen) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((i) => (i + 1) % matches.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((i) => (i <= 0 ? matches.length - 1 : i - 1));
    }
  }

  return (
    <div className="relative ml-auto w-full max-w-[190px] sm:max-w-[240px] md:max-w-[320px]">
      <form
        role="search"
        onSubmit={(e) => {
          e.preventDefault();
          const picked = active >= 0 ? matches[active] : null;
          const term = picked ? picked.name : query.trim();
          go(
            term
              ? `/buy-refurbished?q=${encodeURIComponent(term)}`
              : "/buy-refurbished",
          );
        }}
      >
        <label htmlFor="buy-search" className="sr-only">
          Search refurbished phones to buy
        </label>

        <div className="flex items-center gap-2 rounded-full border border-white/45 bg-white/10 px-4 py-2.5 focus-within:border-white">
          <SearchIcon />
          <input
            ref={inputRef}
            id="buy-search"
            name="q"
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
            onChange={(e) => {
              setQuery(e.target.value);
              setOpen(true);
              setActive(-1);
            }}
            onFocus={() => setOpen(true)}
            // Options preventDefault on mousedown, so a click never blurs the
            // input and this only fires on a genuine focus change.
            onBlur={() => setOpen(false)}
            onKeyDown={onKeyDown}
            placeholder="Search phones to buy"
            className="w-full bg-transparent text-[14px] text-white outline-none placeholder:text-white/65"
          />
        </div>
      </form>

      {isOpen && (
        <ul
          id={listId}
          role="listbox"
          aria-label="Matching phones in stock"
          className="absolute left-0 right-0 top-full z-50 mt-2 max-h-[320px] w-[min(340px,80vw)] overflow-y-auto rounded-2xl bg-white py-2 text-left shadow-[0_18px_50px_rgba(11,13,14,0.28)] md:w-auto"
        >
          {matches.map((phone, i) => (
            <li key={`${phone.name}-${phone.storage}`}>
              <button
                type="button"
                id={`${listId}-option-${i}`}
                role="option"
                aria-selected={i === active}
                onMouseDown={(e) => e.preventDefault()}
                onMouseEnter={() => setActive(i)}
                onClick={() =>
                  go(`/buy-refurbished?q=${encodeURIComponent(phone.name)}`)
                }
                className={`flex w-full items-center justify-between gap-4 px-4 py-2.5 text-left transition-colors ${
                  i === active ? "bg-[#f2f5fb]" : "bg-white"
                }`}
              >
                <span className="min-w-0">
                  <span className="block truncate text-[14px] text-[#0b0d0e]">
                    {phone.name}
                  </span>
                  <span className="block text-[12px] text-[#8b9197]">
                    {phone.storage} · Grade {phone.grade}
                  </span>
                </span>
                <span className="shrink-0 text-[14px] font-semibold text-[#c2410c]">
                  ₹{inr.format(phone.price)}
                </span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
