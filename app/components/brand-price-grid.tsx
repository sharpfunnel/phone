import Image from "next/image";

import { BRAND_BY_SLUG, BRAND_ENTRY_PRICES } from "../data/brands";

const inr = new Intl.NumberFormat("en-IN");

/**
 * Standalone version for the home page, where there is no surrounding page
 * container to sit inside.
 */
export function BrandPriceSection() {
  return (
    <section className="bg-white py-16 lg:py-20">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
        <BrandPriceGrid title="Shop by brand" />
      </div>
    </section>
  );
}

/**
 * Pass `title` to show a visible heading. Without it the heading is still in
 * the markup, just visually hidden — the grid always needs an accessible name.
 */
export function BrandPriceGrid({ title }: { title?: string }) {
  return (
    <section aria-labelledby="shop-by-brand">
      <h2
        id="shop-by-brand"
        className={
          title
            ? "text-center text-[clamp(1.75rem,3vw,2.4rem)] font-normal leading-[1.15] tracking-[-0.02em] text-[#0b0d0e]"
            : "sr-only"
        }
      >
        {title ?? "Shop by brand"}
      </h2>

      <ul
        className={`grid grid-cols-2 gap-x-5 gap-y-6 sm:grid-cols-3 lg:grid-cols-5 ${
          title ? "mt-10" : ""
        }`}
      >
        {BRAND_ENTRY_PRICES.map(({ slug, price, tint }) => {
          const brand = BRAND_BY_SLUG[slug];

          return (
            <li key={slug}>
              <a href={`#brand-${slug}`} className="group block">
                <div
                  // Fixed height rather than aspect-square: the tiles span the
                  // full content width, and a square would make them huge.
                  className="flex h-[124px] w-full items-center justify-center rounded-2xl p-3 transition-transform duration-300 ease-out group-hover:-translate-y-1 motion-reduce:transition-none"
                  style={{ backgroundColor: tint }}
                >
                  <div className="flex h-full w-full items-center justify-center rounded-lg bg-white px-4">
                    <Image
                      src={`/brands/${brand.slug}.png`}
                      alt={brand.name}
                      width={brand.width}
                      height={brand.height}
                      unoptimized
                      className="max-h-6 w-auto max-w-full"
                    />
                  </div>
                </div>

                <p className="mt-3 text-center text-[13px] text-[#1c64f2]">
                  Starting From
                </p>
                <p className="text-center text-[15px] font-semibold text-[#0b0d0e]">
                  ₹{inr.format(price)}
                </p>
              </a>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
