/**
 * Rooted at "/" so they also work from /buy-refurbished, /sell/* and /login,
 * where a bare "#hash" would do nothing.
 */
export const NAV_LINKS = [
  { label: "Sell", href: "/sell" },
  { label: "Buy refurbished", href: "/buy-refurbished" },
  { label: "How it works", href: "/#how-it-works" },
  { label: "Reviews", href: "/#reviews" },
  { label: "FAQ", href: "/#faq" },
];
