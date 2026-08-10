import Link from "next/link";

import { modelSlug } from "../data/models";
import { ModelSearch } from "./model-search";

// Phones only — no laptops, tablets or consoles.
const POPULAR_MODELS = [
  "iPhone 13",
  "iPhone 12",
  "Galaxy S22",
  "OnePlus 11",
  "Pixel 7",
  "Redmi Note 12",
  "iPhone 11",
  "Galaxy S21 FE",
];

// Kept in step with the hero's stat row on purpose — two different numbers for
// the same claim on one page reads as invented.
const STATS = [
  { value: "4.9 / 5", label: "Verified rating" },
  { value: "12,400", label: "Sales completed" },
  { value: "54 min", label: "Median quote to payout" },
];

/**
 * `as` lets the dedicated /sell page render this as the page's h1 while the
 * home page keeps it as an h2 under its own hero.
 */
export function SellSearch({
  as: Heading = "h2",
  id = "sell",
}: {
  as?: "h1" | "h2";
  id?: string;
}) {
  return (
    <section id={id} className="bg-white py-20 lg:py-24">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
        <div className="relative overflow-hidden rounded-3xl bg-[#1c64f2]">
          {[
            "-left-24 -top-20 h-72 w-72",
            "-right-16 top-10 h-56 w-56",
            "-bottom-28 left-1/3 h-64 w-64",
          ].map((position) => (
            <span
              key={position}
              aria-hidden="true"
              className={`pointer-events-none absolute rounded-full bg-white/[0.09] ${position}`}
            />
          ))}

          <div className="relative px-6 py-14 text-center lg:px-12 lg:py-16">
            <p className="text-[13px] font-medium uppercase tracking-[0.14em] text-white/70">
              Sell your phone
            </p>

            <Heading className="mx-auto mt-5 max-w-3xl text-[clamp(2rem,4.2vw,3.1rem)] font-semibold leading-[1.1] tracking-[-0.03em] text-white">
              Tell us the model, get{" "}
              <span className="text-[#bcd3fb]">instant cash</span>
            </Heading>

            <p className="mx-auto mt-5 max-w-lg text-[16px] leading-[1.6] text-white/80">
              Free doorstep pickup, a certified data wipe and payment before the
              box is sealed.
            </p>

            <ModelSearch />

            <p className="mt-10 text-[13px] font-medium uppercase tracking-[0.14em] text-white/60">
              Popular right now
            </p>

            <ul className="mx-auto mt-5 flex max-w-3xl flex-wrap justify-center gap-2.5">
              {POPULAR_MODELS.map((model) => (
                <li key={model}>
                  <Link
                    href={`/sell/${modelSlug(model)}`}
                    className="inline-block rounded-full border border-white/45 px-4 py-2 text-[14px] text-white transition-colors hover:border-white hover:bg-white/15"
                  >
                    {model}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Stats sit on their own band rather than floating under the pills,
              so the panel closes with a defined edge. */}
          <dl className="relative grid grid-cols-1 gap-6 border-t border-white/20 bg-white/[0.08] px-6 py-7 text-center sm:grid-cols-3 lg:px-12">
            {STATS.map((stat) => (
              <div key={stat.label}>
                <dt className="text-[22px] font-semibold tracking-tight text-white">
                  {stat.value}
                </dt>
                <dd className="mt-1 text-[13px] text-white/75">{stat.label}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
