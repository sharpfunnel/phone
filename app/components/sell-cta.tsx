import Image from "next/image";

import { BRAND_BY_SLUG } from "../data/brands";

const PROMISES = ["Maximum value", "Safe and hassle-free", "Free doorstep pickup"];

const QUICK_BRANDS = ["apple", "xiaomi", "samsung", "vivo"];

function Tick() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="h-4 w-4 shrink-0 text-white"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.6}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m4 12.5 5 5 11-11" />
    </svg>
  );
}

function SearchIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="h-5 w-5 text-white/70"
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

export function SellCta() {
  return (
    <section className="bg-white py-20 lg:py-24">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
        <div className="grid items-center gap-10 rounded-3xl bg-[#fb5908] p-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.8fr)] lg:p-12">
          {/* ---------------- Copy and entry points ---------------- */}
          <div>
            <h2 className="max-w-lg text-[clamp(1.75rem,3vw,2.4rem)] font-semibold leading-[1.15] tracking-[-0.02em] text-white">
              Sell your old phone for instant cash
            </h2>

            <ul className="mt-6 flex flex-wrap gap-x-7 gap-y-3">
              {PROMISES.map((promise) => (
                <li
                  key={promise}
                  className="flex items-center gap-2 text-[15px] text-white"
                >
                  <Tick />
                  {promise}
                </li>
              ))}
            </ul>

            {/* Placeholder destination, same as every other CTA on the page —
                wire to the real quote flow when it exists. */}
            <form action="#quote" className="mt-8 max-w-xl">
              <label htmlFor="model-search" className="sr-only">
                Search your phone model to sell
              </label>
              <div className="flex items-center gap-3 rounded-xl border border-white/45 bg-white/10 px-4 py-3.5 focus-within:border-white">
                <SearchIcon />
                <input
                  id="model-search"
                  name="model"
                  type="search"
                  placeholder="Search your phone model to sell"
                  className="w-full bg-transparent text-[15px] text-white outline-none placeholder:text-white/70"
                />
              </div>
            </form>

            <div className="mt-8 flex items-center gap-4">
              <span className="h-px w-8 bg-white/30" />
              <span className="text-[14px] text-white">
                Or choose a brand
              </span>
              <span className="h-px w-8 bg-white/30" />
            </div>

            <div className="mt-5 flex flex-wrap items-center gap-3">
              {QUICK_BRANDS.map((slug) => {
                const brand = BRAND_BY_SLUG[slug];
                return (
                  <a
                    key={slug}
                    href="#quote"
                    className="flex h-[74px] w-[74px] items-center justify-center rounded-xl border border-black/[0.07] bg-white px-4 transition-shadow hover:shadow-[0_2px_10px_rgba(11,13,14,0.09)]"
                  >
                    <Image
                      src={`/brands/${brand.slug}.png`}
                      alt={brand.name}
                      width={brand.width}
                      height={brand.height}
                      unoptimized
                      className="max-h-5 w-auto max-w-full"
                    />
                  </a>
                );
              })}

              <a
                href="#quote"
                className="group ml-1 inline-flex items-center gap-1.5 text-[15px] font-medium text-white"
              >
                More brands
                <span
                  aria-hidden="true"
                  className="transition-transform duration-300 ease-out group-hover:translate-x-1 motion-reduce:transition-none"
                >
                  ›
                </span>
              </a>
            </div>
          </div>

          {/* ---------------- Visual ---------------- */}
          {/* Backdrop is flooded with the same brand colour as the panel, so no frame. */}
          <Image
            src="/sell-cta.jpg"
            alt="A customer browsing our refurbished phone listings"
            width={1200}
            height={900}
            sizes="(max-width: 1024px) 100vw, 560px"
            className="h-auto w-full"
          />
        </div>
      </div>
    </section>
  );
}
