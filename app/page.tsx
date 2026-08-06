import { BrandPriceSection } from "./components/brand-price-grid";
import { Faqs } from "./components/faqs";
import { Hero } from "./components/hero";
import { HowItWorks } from "./components/how-it-works";
import { OfferCards } from "./components/offer-cards";
import { PhoneListings } from "./components/phone-listings";
import { Testimonials } from "./components/testimonials";
import { VisitShop } from "./components/visit-shop";
import { WhatWeBuy } from "./components/what-we-buy";

export default function Home() {
  return (
    <>
      <Hero />
      <BrandPriceSection />
      <PhoneListings />
      <HowItWorks />
      <OfferCards />
      <WhatWeBuy />
      <Testimonials />
      <Faqs />
      <VisitShop />
    </>
  );
}
