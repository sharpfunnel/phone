// Material Symbols "arrow_outward". Filled with currentColor so it picks up
// each button's own text colour instead of being locked to white.
export function ArrowOutward({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 -960 960 960"
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
      className={className}
    >
      <path d="M636.89-610.61 290.22-263.93q-12.92 12.91-31.83 12.79-18.91-.12-31.82-13.03-12.92-12.92-12.92-31.95t12.92-31.95L573-674.5H282.39q-19.15 0-32.32-13.17-13.18-13.18-13.18-32.33t13.18-32.33q13.17-13.17 32.32-13.17h400q19.15 0 32.33 13.17 13.17 13.18 13.17 32.33v400q0 19.15-13.17 32.33-13.18 13.17-32.33 13.17t-32.32-13.17q-13.18-13.18-13.18-32.33v-290.61Z" />
    </svg>
  );
}

/**
 * Two arrows in a clipped box. On hover the first exits along the direction it
 * points (up and to the right) while a second slides in from the opposite
 * corner to replace it. Requires `group` on the enclosing button.
 */
export function ArrowSwap({ className = "h-[18px] w-[18px]" }) {
  const shared =
    "absolute inset-0 h-full w-full transition-transform duration-300 ease-out motion-reduce:transition-none";

  return (
    <span className={`relative inline-block shrink-0 overflow-hidden ${className}`}>
      <ArrowOutward
        className={`${shared} group-hover:translate-x-full group-hover:-translate-y-full`}
      />
      <ArrowOutward
        className={`${shared} -translate-x-full translate-y-full group-hover:translate-x-0 group-hover:translate-y-0`}
      />
    </span>
  );
}
