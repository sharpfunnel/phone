import type { Metadata } from "next";
import Link from "next/link";

import { BrandPriceGrid } from "../components/brand-price-grid";
import { OfferCards } from "../components/offer-cards";
import { PhoneGrid } from "../components/phone-card";
import { PHONES } from "../data/phones";

export const metadata: Metadata = {
  title: "Buy refurbished phones — Electronics",
  description:
    "Every phone was bought by us, inspected on 32 points and photographed at the bench. Battery health is printed on each listing, and all of them carry a 6-month warranty.",
};

export default async function BuyRefurbishedPage({
  searchParams,
}: PageProps<"/buy-refurbished">) {
  const { q } = await searchParams;
  const query = (typeof q === "string" ? q : "").trim().toLowerCase();

  const phones = query
    ? PHONES.filter((phone) =>
        `${phone.name} ${phone.storage} ${phone.grade}`
          .toLowerCase()
          .includes(query),
      )
    : PHONES;

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
            {query ? `Results for “${q}”` : "Best Deals"}
          </h2>
          <p className="mt-3 flex flex-wrap items-center gap-3 text-[14px] text-[#6b7177]">
            Showing {phones.length}{" "}
            {phones.length === 1 ? "phone" : "phones"}
            {query && (
              <Link
                href="/buy-refurbished"
                className="font-medium text-[#1c64f2] hover:underline"
              >
                Clear search
              </Link>
            )}
          </p>

          <div className="mt-8">
            {phones.length > 0 ? (
              <PhoneGrid phones={phones} />
            ) : (
              <div className="rounded-2xl border border-dashed border-black/15 bg-[#f7f8f8] px-6 py-16 text-center">
                <p className="text-[16px] font-medium text-[#0b0d0e]">
                  Nothing in stock matches that
                </p>
                <p className="mx-auto mt-2 max-w-sm text-[14px] leading-[1.6] text-[#6b7177]">
                  Try a shorter search, or browse everything we have inspected
                  and listed.
                </p>
                <Link
                  href="/buy-refurbished"
                  className="mt-6 inline-flex rounded-full bg-[#1c64f2] px-6 py-3 text-[14px] font-medium text-white transition-colors hover:bg-[#1751c9]"
                >
                  See all phones
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      <OfferCards />
    </>
  );
}
