import Link from "next/link";

import { AuthNav } from "./auth-nav";

// Rooted at "/" so they also work from /buy-refurbished, /sell/* and /login,
// where a bare "#hash" would do nothing.
const NAV_LINKS = [
  { label: "Sell", href: "/#sell" },
  { label: "Buy refurbished", href: "/buy-refurbished" },
  { label: "How it works", href: "/#how-it-works" },
  { label: "Reviews", href: "/#reviews" },
  { label: "FAQ", href: "/#faq" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 bg-[#1c64f2]">
      <div className="mx-auto flex h-20 max-w-[1400px] items-center gap-10 px-6 lg:px-12">
        <Link
          href="/"
          className="text-xl font-semibold tracking-tight text-white"
        >
          Electronics<span className="text-white">.</span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => {
            const className =
              "text-[15px] text-white transition-opacity hover:opacity-75";

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

        <div className="ml-auto flex items-center gap-6">
          <a
            href="tel:+919810044119"
            className="hidden text-[15px] text-white transition-opacity hover:opacity-75 lg:block"
          >
            +91 98100 44119
          </a>
          <AuthNav />
          {/* Outlined rather than a solid white pill, so its label can be white
              like the rest of the header text. */}
          <Link
            href="/login?next=/%23sell"
            className="rounded-full border border-white px-6 py-3 text-[15px] font-medium text-white transition-colors hover:bg-white/15"
          >
            Get a quote
          </Link>
        </div>
      </div>
    </header>
  );
}
