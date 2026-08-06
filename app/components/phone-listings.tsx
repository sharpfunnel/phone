import Link from "next/link";

import { HOME_PREVIEW_COUNT, PHONES } from "../data/phones";
import { ArrowSwap } from "./arrow-outward";
import { PhoneGrid } from "./phone-card";
import { SwapLabel } from "./swap-label";

export function PhoneListings() {
  return (
    <section className="bg-[#f4f5f6] py-20 lg:py-24">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="max-w-lg text-[clamp(1.75rem,3vw,2.4rem)] font-normal leading-[1.15] tracking-[-0.02em] text-[#0b0d0e]">
              Refurbished phones, with the report attached
            </h2>
            <p className="mt-4 max-w-md text-[15px] leading-[1.6] text-[#5b6167]">
              Each unit was bought by us, inspected on 32 points and photographed
              at the bench. Battery health is printed on the listing.
            </p>
          </div>

          <Link
            href="/buy-refurbished"
            className="group inline-flex shrink-0 items-center gap-2 rounded-full bg-[#1c64f2] px-6 py-3 text-[15px] font-medium text-white transition-colors hover:bg-[#1751c9]"
          >
            <SwapLabel>All 1,240 phones</SwapLabel>
            <ArrowSwap className="h-4 w-4" />
          </Link>
        </div>

        <div className="mt-12">
          <PhoneGrid phones={PHONES.slice(0, HOME_PREVIEW_COUNT)} />
        </div>
      </div>
    </section>
  );
}
