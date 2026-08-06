import Image from "next/image";

import { BRANDS, type Brand } from "../data/brands";

const LOGO_HEIGHT = 22;

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

        {/* Label sits on top of the track. Its backdrop fades from transparent
            to the strip colour, so logos travelling left slide under it and
            vanish rather than being clipped at a hard edge. */}
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center bg-gradient-to-l from-transparent via-white via-30% to-white pr-20 sm:pr-32">
          <p className="whitespace-nowrap text-[16px] font-semibold uppercase leading-[1.3] tracking-[0.09em] text-black sm:text-[19px]">
            Brands we buy
            <br />
            and resell
          </p>
        </div>
      </div>
    </div>
  );
}
