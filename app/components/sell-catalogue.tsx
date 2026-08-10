import Image from "next/image";
import Link from "next/link";

import { BRAND_BY_SLUG } from "../data/brands";
import { PHONE_MODELS, modelSlug, photoFor } from "../data/models";

const MAX_MODELS = 12;

/** Brands in catalogue order, deduped, with their logo slug where we have one. */
const BRANDS_IN_CATALOGUE = [...new Set(PHONE_MODELS.map((m) => m.brand))].map(
  (brand) => ({ brand, slug: brand.toLowerCase() }),
);

function ArrowIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="h-4 w-4"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.9}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14m0 0-6-6m6 6-6 6" />
    </svg>
  );
}

export function SellCatalogue({ brand }: { brand?: string }) {
  const active = BRANDS_IN_CATALOGUE.find((b) => b.slug === brand)?.brand;
  const models = (
    active ? PHONE_MODELS.filter((m) => m.brand === active) : PHONE_MODELS
  ).slice(0, MAX_MODELS);

  return (
    <section id="models" className="bg-white py-20 lg:py-24">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
        <h2 className="text-[clamp(1.75rem,3vw,2.4rem)] font-normal leading-[1.15] tracking-[-0.02em] text-[#0b0d0e]">
          Top selling phones
        </h2>
        <p className="mt-4 max-w-lg text-[15px] leading-[1.6] text-[#5b6167]">
          Pick a brand to narrow the list, then choose your model to start the
          sixty-second check.
        </p>

        {/* Brand filter */}
        <ul className="mt-9 flex flex-wrap gap-3">
          <li>
            <Link
              href="/sell"
              aria-current={!active ? "true" : undefined}
              className={`inline-flex h-[52px] items-center rounded-xl border px-5 text-[14px] font-medium transition-colors ${
                !active
                  ? "border-[#fb5908] bg-[#ffefe6] text-[#fb5908]"
                  : "border-black/[0.08] bg-white text-[#3d4348] hover:bg-[#f7f8f8]"
              }`}
            >
              All brands
            </Link>
          </li>

          {BRANDS_IN_CATALOGUE.map(({ brand: name, slug }) => {
            const logo = BRAND_BY_SLUG[slug];
            const isActive = active === name;

            return (
              <li key={slug}>
                <Link
                  href={`/sell?brand=${slug}`}
                  aria-current={isActive ? "true" : undefined}
                  aria-label={name}
                  className={`inline-flex h-[52px] items-center justify-center rounded-xl border px-5 transition-colors ${
                    isActive
                      ? "border-[#fb5908] bg-[#ffefe6]"
                      : "border-black/[0.08] bg-white hover:bg-[#f7f8f8]"
                  }`}
                >
                  {logo ? (
                    <Image
                      src={`/brands/${logo.slug}.png`}
                      alt={name}
                      width={logo.width}
                      height={logo.height}
                      unoptimized
                      className="max-h-5 w-auto max-w-[76px]"
                    />
                  ) : (
                    <span className="text-[14px] font-medium text-[#3d4348]">
                      {name}
                    </span>
                  )}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Model list */}
        <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {models.map((model) => {
            const photo = photoFor(model);
            // No bench photo for most models yet, so fall back to the brand
            // mark — more use than a generic grey handset.
            const logo = BRAND_BY_SLUG[model.brand.toLowerCase()];

            return (
              <li key={model.name}>
                <Link
                  href={`/sell/${modelSlug(model.name)}`}
                  className="group flex items-center gap-4 rounded-2xl border border-black/[0.08] bg-white p-4 transition-colors hover:border-[#fb5908]/40 hover:bg-[#fffaf7]"
                >
                  <span className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-[#f5f6f7]">
                    {photo ? (
                      <Image
                        src={photo}
                        alt=""
                        width={56}
                        height={56}
                        className="h-14 w-14 object-cover"
                      />
                    ) : logo ? (
                      <Image
                        src={`/brands/${logo.slug}.png`}
                        alt=""
                        width={logo.width}
                        height={logo.height}
                        unoptimized
                        className="max-h-4 w-auto max-w-[38px]"
                      />
                    ) : (
                      <svg
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                        className="h-6 w-6 text-[#b3b8bd]"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={1.5}
                        strokeLinecap="round"
                      >
                        <rect x="6.5" y="2" width="11" height="20" rx="2.5" />
                        <path d="M10.5 18.5h3" />
                      </svg>
                    )}
                  </span>

                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-[15px] font-medium text-[#0b0d0e]">
                      {model.name}
                    </span>
                    <span className="mt-0.5 block text-[13px] text-[#6b7177]">
                      {model.brand}
                    </span>
                  </span>

                  <span className="flex shrink-0 items-center gap-1.5 whitespace-nowrap text-[14px] font-medium text-[#fb5908]">
                    Get price
                    <span className="transition-transform duration-300 ease-out group-hover:translate-x-1 motion-reduce:transition-none">
                      <ArrowIcon />
                    </span>
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>

        {active && (
          <p className="mt-8 text-[14px] text-[#6b7177]">
            Showing {models.length} {active} models.{" "}
            <Link href="/sell" className="font-medium text-[#fb5908] hover:underline">
              Show every brand
            </Link>
          </p>
        )}
      </div>
    </section>
  );
}
