import Link from "next/link";

import { NAV_LINKS } from "../data/nav";
import { AuthNav } from "./auth-nav";
import { HeaderSearch } from "./header-search";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 bg-[#1c64f2]">
      <div className="mx-auto flex h-20 max-w-[1400px] items-center gap-4 px-6 sm:gap-10 lg:px-12">
        <Link
          href="/"
          className="shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight text-white"
        >
          Electronics<span className="text-white">.</span>
        </Link>

        <nav className="hidden shrink-0 items-center gap-6 md:flex lg:gap-8">
          {NAV_LINKS.map((link) => {
            const className =
              "whitespace-nowrap text-[15px] text-white transition-opacity hover:opacity-75";

            // Real routes navigate client-side; the rest are in-page anchors.
            return link.href.startsWith("/") ? (
              <Link key={link.label} href={link.href} className={className}>
                {link.label}
              </Link>
            ) : (
              <a key={link.label} href={link.href} className={className}>
                {link.label}
              </a>
            );
          })}
        </nav>

        <div className="ml-auto flex items-center gap-4 sm:gap-6">
          <HeaderSearch />
          {/* Desktop only — on phones the bottom bar carries the account tab. */}
          <div className="hidden md:block">
            <AuthNav />
          </div>
          <a
            href="tel:+919810044119"
            className="hidden shrink-0 whitespace-nowrap text-[15px] text-white transition-opacity hover:opacity-75 xl:block"
          >
            +91 98100 44119
          </a>
          {/* Outlined rather than a solid white pill, so its label can be white
              like the rest of the header text. */}
          <Link
            href="/login?next=/sell"
            className="hidden whitespace-nowrap rounded-full border border-white px-4 py-2.5 text-[14px] font-medium text-white transition-colors hover:bg-white/15 sm:inline-block sm:px-6 sm:py-3 sm:text-[15px]"
          >
            Get a quote
          </Link>
        </div>
      </div>
    </header>
  );
}
