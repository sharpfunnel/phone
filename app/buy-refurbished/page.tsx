import type { Metadata } from "next";

import { BrandPriceGrid } from "../components/brand-price-grid";
import { OfferCards } from "../components/offer-cards";
import { PhoneGrid } from "../components/phone-card";
import { PHONES } from "../data/phones";

export const metadata: Metadata = {
  title: "Buy refurbished phones — Electronics",
  description:
    "Every phone was bought by us, inspected on 32 points and photographed at the bench. Battery health is printed on each listing, and all of them carry a 6-month warranty.",
};

export default function BuyRefurbishedPage() {
  return (
    <>
      <div className="bg-white py-16 lg:py-20">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
          <h1 className="max-w-2xl text-[clamp(2rem,4vw,3rem)] font-normal leading-[1.1] tracking-[-0.03em] text-[#0b0d0e]">
            Buy refurbished
          </h1>
          <p className="mt-5 max-w-xl text-[17px] leading-[1.6] text-[#5b6167]">
            Every phone here was bought by us, inspected on 32 points and
            photographed at the bench. Battery health is printed on the listing
            and each one carries a 6-month warranty.
          </p>

          <div className="mt-12">
            <BrandPriceGrid />
          </div>

          <h2 className="mt-16 text-[clamp(1.75rem,3vw,2.4rem)] font-normal leading-[1.15] tracking-[-0.02em] text-[#0b0d0e]">
            Best Deals
          </h2>
          <p className="mt-3 text-[14px] text-[#6b7177]">
            Showing {PHONES.length} phones
          </p>

          <div className="mt-8">
            <PhoneGrid phones={PHONES} />
          </div>
        </div>
      </div>

      <OfferCards />
    </>
  );
}
