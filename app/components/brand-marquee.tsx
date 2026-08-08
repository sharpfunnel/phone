import Image from "next/image";

import { BRANDS, type Brand } from "../data/brands";

const LOGO_HEIGHT = 26;

function Logo({ brand }: { brand: Brand }) {
  return (
    <li className="flex shrink-0 items-center px-8">
      <Image
        src={`/brands/${brand.slug}.png`}
        alt={brand.name}
        width={brand.width}
        height={brand.height}
        loading="eager"
        // Served as-is: these are a few KB each, and a lossy WebP re-encode
        // visibly frays the hard edges of a 22px-tall wordmark.
        unoptimized
        style={{ height: LOGO_HEIGHT, width: "auto" }}
      />
    </li>
  );
}

export function BrandMarquee() {
  return (
    <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
      <div className="relative overflow-hidden border-t border-black/5 bg-white py-10">
        {/* From md up the label overlays the track, its backdrop fading to the
            strip colour so logos slide under it rather than being clipped. On a
            phone that overlay would eat most of the width, so it sits above the
            track as an ordinary heading instead. */}
        <p className="mb-7 text-center text-[15px] font-semibold uppercase tracking-[0.09em] text-black md:pointer-events-none md:text-left md:absolute md:inset-y-0 md:left-0 md:z-10 md:mb-0 md:flex md:items-center md:whitespace-nowrap md:bg-gradient-to-l md:from-transparent md:via-white md:via-30% md:to-white md:pr-28 md:text-[19px] md:leading-[1.3]">
          Brands we buy
          <br className="hidden md:inline" /> and resell
        </p>

        {/* Two identical tracks scroll side by side; each resets after exactly
            its own width, so the second copy is always covering the seam. */}
        <div
          className="marquee"
          style={{ "--marquee-duration": "45s" } as React.CSSProperties}
        >
          <ul className="marquee-track">
            {BRANDS.map((brand) => (
              <Logo key={brand.slug} brand={brand} />
            ))}
          </ul>
          <ul className="marquee-track" aria-hidden="true">
            {BRANDS.map((brand) => (
              <Logo key={`${brand.slug}-dup`} brand={brand} />
            ))}
          </ul>
        </div>

      </div>
    </div>
  );
}
