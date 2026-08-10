import type { Metadata } from "next";

import { Faqs } from "../components/faqs";
import { HowItWorks } from "../components/how-it-works";
import { OfferCards } from "../components/offer-cards";
import { SellCatalogue } from "../components/sell-catalogue";
import { SellSearch } from "../components/sell-search";
import { Testimonials } from "../components/testimonials";
import { WhySell } from "../components/why-sell";

export const metadata: Metadata = {
  title: "Sell your old phone for instant cash — Electronics",
  description:
    "Get a verified price for your old phone in sixty seconds, locked for 7 days. Free doorstep pickup, a certified data wipe and payment before the box is sealed, across Delhi NCR.",
};

export default async function SellPage({
  searchParams,
}: PageProps<"/sell">) {
  const { brand } = await searchParams;

  return (
    <>
      <SellSearch as="h1" id="quote" />
      <HowItWorks />
      <OfferCards />
      <WhySell />
      <SellCatalogue brand={typeof brand === "string" ? brand : undefined} />
      <Testimonials />
      <Faqs />
    </>
  );
}
