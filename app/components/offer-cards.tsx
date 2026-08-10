import Image from "next/image";
import Link from "next/link";

import { ArrowSwap } from "./arrow-outward";

const OFFERS = [
  {
    title: "Exchange Offers",
    blurb: "Put your old phone against a newer one and pay only the gap.",
    href: "/sell",
    photo: "/phones/iphone-12.jpg",
    // Each card gets its own blob placement so three blue tiles in a row do
    // not read as one repeated block.
    decor: ["-right-16 -top-20 h-56 w-56", "-bottom-24 left-24 h-44 w-44"],
  },
  {
    title: "Refurbished Device Offers",
    blurb: "Inspected on 32 points, warrantied for 6 months, priced to move.",
    href: "/buy-refurbished",
    photo: "/phones/nothing-phone-2.jpg",
    decor: ["-left-20 -top-16 h-52 w-52", "-bottom-20 right-10 h-56 w-56"],
  },
  {
    title: "Repair Offers",
    blurb: "Screens, batteries and boards fixed with OEM-grade parts.",
    href: "#repair",
    photo: "/phones/iphone-11.jpg",
    decor: ["-right-20 top-16 h-60 w-60", "-top-16 left-10 h-36 w-36"],
  },
];

export function OfferCards() {
  return (
    <section className="bg-white pb-20 lg:pb-24">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
        <h2 className="max-w-xl text-[clamp(1.75rem,3vw,2.4rem)] font-normal leading-[1.15] tracking-[-0.02em] text-[#0b0d0e]">
          Offers running right now
        </h2>
        <p className="mt-4 max-w-lg text-[15px] leading-[1.6] text-[#5b6167]">
          Trade an old handset against a newer one, pick up something we have
          already inspected, or get the phone you own working again. Same
          warranty and same doorstep service on all three.
        </p>

        <ul className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {OFFERS.map((offer) => (
            <li
              key={offer.title}
              className="relative flex min-h-[240px] overflow-hidden rounded-2xl bg-[#1c64f2] p-7"
            >
              {offer.decor.map((position) => (
                <span
                  key={position}
                  aria-hidden="true"
                  className={`pointer-events-none absolute rounded-full bg-white/[0.09] ${position}`}
                />
              ))}

              <div className="relative z-10 flex flex-1 flex-col justify-between gap-6">
                <div>
                  <h3 className="max-w-[9ch] text-[26px] font-semibold leading-[1.15] tracking-[-0.01em] text-white">
                    {offer.title}
                  </h3>
                  <p className="mt-3 max-w-[26ch] text-[13px] leading-snug text-white/75">
                    {offer.blurb}
                  </p>
                </div>

                <Link
                  href={offer.href}
                  aria-label={offer.title}
                  className="group inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white text-[#1c64f2] transition-colors hover:bg-[#e8efff]"
                >
                  <ArrowSwap className="h-[18px] w-[18px]" />
                </Link>
              </div>

              <div className="relative z-10 w-[38%] shrink-0 self-center">
                <div className="relative aspect-square overflow-hidden rounded-xl">
                  <Image
                    src={offer.photo}
                    alt=""
                    fill
                    sizes="(max-width: 768px) 40vw, 170px"
                    className="object-cover"
                  />
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
