/**
 * Button label that slides up out of view on hover while an identical copy
 * rises into its place from below. Requires `group` on the enclosing button.
 */
export function SwapLabel({ children }: { children: React.ReactNode }) {
  const shared =
    "block transition-transform duration-300 ease-out motion-reduce:transition-none";

  return (
    <span className="relative inline-block overflow-hidden align-bottom">
      <span className={`${shared} group-hover:-translate-y-full`}>
        {children}
      </span>
      {/* Duplicate is decorative — the first copy already carries the text. */}
      <span
        aria-hidden="true"
        className={`${shared} absolute inset-0 translate-y-full group-hover:translate-y-0`}
      >
        {children}
      </span>
    </span>
  );
}
