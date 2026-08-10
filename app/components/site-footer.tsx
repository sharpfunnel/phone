import Image from "next/image";
import Link from "next/link";

const COLUMNS = [
  {
    heading: "Sell",
    links: [
      { label: "Get a quote", href: "/sell" },
      { label: "How it works", href: "/#how-it-works" },
      { label: "Price lock", href: "/#how-it-works" },
      { label: "Pickup areas", href: "/#visit" },
    ],
  },
  {
    heading: "Buy",
    links: [
      { label: "Refurbished phones", href: "/buy-refurbished" },
      { label: "Grades explained", href: "/#faq" },
      { label: "Warranty", href: "/#faq" },
      { label: "Returns", href: "/#faq" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "Reviews", href: "/#reviews" },
      { label: "FAQ", href: "/#faq" },
      { label: "Visit the shop", href: "/#visit" },
      { label: "What we buy", href: "/#what-we-buy" },
    ],
  },
];

// PLACEHOLDER — swap for the real inbox before launch.
const EMAIL = "help@example.com";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#fb5908] py-16 lg:py-20">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
        <div className="text-center">
          {/* The full lockup — mascot and wordmark — only appears here; the
              header carries the wordmark alone so it stays legible small. */}
          <Image
            src="/logo-fex-full.png"
            alt="F-EX. Buy, sell, exchange."
            width={354}
            height={123}
            className="mx-auto h-16 w-auto sm:h-20"
            priority={false}
          />
          <p className="mx-auto mt-4 max-w-xl text-[15px] leading-[1.6] text-white">
            We buy used phones at a printed price and sell them refurbished, with
            the inspection report attached. Doorstep pickup and payout across
            Guwahati.
          </p>
        </div>

        <div className="mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {COLUMNS.map((column) => (
            <div key={column.heading}>
              <h2 className="text-[13px] font-medium uppercase tracking-[0.14em] text-white">
                {column.heading}
              </h2>
              <ul className="mt-4 space-y-3">
                {column.links.map((link) => (
                  <li key={link.label}>
                    {link.href.startsWith("/") ? (
                      <Link
                        href={link.href}
                        className="text-[15px] text-white transition-opacity hover:opacity-75"
                      >
                        {link.label}
                      </Link>
                    ) : (
                      <a
                        href={link.href}
                        className="text-[15px] text-white transition-opacity hover:opacity-75"
                      >
                        {link.label}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <h2 className="text-[13px] font-medium uppercase tracking-[0.14em] text-white">
              Contact
            </h2>
            <ul className="mt-4 space-y-3 text-[15px] text-white">
              <li>
                <a
                  href="tel:+918472833473"
                  className="transition-opacity hover:opacity-75"
                >
                  +91 84728 33473
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${EMAIL}`}
                  className="transition-opacity hover:opacity-75"
                >
                  {EMAIL}
                </a>
              </li>
              <li className="text-white">Mon to Sat, 10:30 – 8</li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 border-t border-white/20 pt-6 text-[14px] text-white">
          <p>© {year} F-EX. All rights reserved.</p>
          <a href="#privacy" className="transition-opacity hover:opacity-75">
            Privacy
          </a>
          <a href="#terms" className="transition-opacity hover:opacity-75">
            Terms
          </a>
        </div>
      </div>
    </footer>
  );
}
