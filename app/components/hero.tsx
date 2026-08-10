import Image from "next/image";
import Link from "next/link";

import { ArrowSwap } from "./arrow-outward";
import { BrandMarquee } from "./brand-marquee";
import { SwapLabel } from "./swap-label";

const STATS = [
  { value: "4.9 / 5", label: "12,400 rated sales" },
  { value: "54 min", label: "Median quote to payout" },
  { value: "7 days", label: "Price lock, no doorstep cuts" },
  { value: "6-month", label: "Warranty on every refurb" },
];

export function Hero() {
  return (
    <section className="bg-white">
      <div className="mx-auto grid max-w-[1400px] items-center gap-12 px-6 py-16 lg:grid-cols-2 lg:gap-16 lg:px-12 lg:py-24">
        {/* Copy */}
        <div>
          <span className="inline-flex items-center rounded-full border border-black/10 bg-white px-5 py-2.5 text-[13px] font-medium uppercase tracking-[0.14em] text-[#3d4348]">
            We buy&nbsp;·&nbsp;We sell&nbsp;·&nbsp;
            <span className="text-[#1c64f2]">Delhi NCR</span>
          </span>

          <h1 className="mt-8 text-[clamp(2.5rem,5.2vw,4.25rem)] font-normal leading-[1.06] tracking-[-0.03em] text-[#0b0d0e]">
            Sell your old phone.
            <br />
            Buy a better
            <br />
            refurbished one.
          </h1>

          <p className="mt-7 max-w-xl text-lg leading-[1.65] text-[#4a5157]">
            A verified price in sixty seconds, locked for 7 days and paid at
            your door. Or buy a phone we have already bought, inspected on 32
            points and covered for 6 months.
          </p>

          <div className="mt-9 flex flex-col gap-4 sm:flex-row">
            <Link
              href="/sell"
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-[#1c64f2] px-8 py-4 text-base font-medium text-white transition-colors hover:bg-[#1751c9]"
            >
              <SwapLabel>Get my selling price</SwapLabel>
              <ArrowSwap />
            </Link>
            <Link
              href="/buy-refurbished"
              className="inline-flex items-center justify-center rounded-full border border-black/10 bg-white px-8 py-4 text-base font-medium text-[#111315] transition-colors hover:bg-[#f2f3f4]"
            >
              Browse refurbished phones
            </Link>
          </div>

          <dl className="mt-14 grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-4">
            {STATS.map((stat) => (
              <div key={stat.value}>
                <dt className="whitespace-nowrap text-[22px] font-semibold tracking-tight text-[#0b0d0e] xl:text-[26px]">
                  {stat.value}
                </dt>
                <dd className="mt-1.5 text-[13px] leading-snug text-[#5b6167]">
                  {stat.label}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        {/* Image */}
        <div className="relative aspect-[5/4] w-full overflow-hidden rounded-3xl bg-[#dfe2e5]">
          <Image
            src="/hero.jpg"
            alt="Customer unboxing a refurbished phone at home"
            fill
            priority
            quality={90}
            sizes="(max-width: 1024px) 100vw, 620px"
            className="object-cover"
          />
        </div>
      </div>

      <BrandMarquee />
    </section>
  );
}
