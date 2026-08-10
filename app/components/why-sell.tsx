const stroke = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

const ICONS = {
  tag: (
    <>
      <path d="M12.6 3.5H20v7.4l-8.7 8.7a1.5 1.5 0 0 1-2.1 0l-5.3-5.3a1.5 1.5 0 0 1 0-2.1z" />
      <circle cx="16.2" cy="7.8" r="1.35" />
    </>
  ),
  note: (
    <>
      <rect x="2.5" y="6" width="19" height="12" rx="2" />
      <circle cx="12" cy="12" r="2.6" />
      <path d="M6 9.5v5M18 9.5v5" />
    </>
  ),
  van: (
    <>
      <path d="M2.5 7.5h10v8h-10z" />
      <path d="M12.5 10.5h4l3 3v2h-7z" />
      <circle cx="6.5" cy="17.5" r="2" />
      <circle cx="16.5" cy="17.5" r="2" />
    </>
  ),
  shield: (
    <>
      <path d="M12 3l7 2.8v5.4c0 4.3-2.9 8-7 9.3-4.1-1.3-7-5-7-9.3V5.8z" />
      <path d="M9 12l2.2 2.2L15.5 10" />
    </>
  ),
  lock: (
    <>
      <rect x="4.5" y="10.5" width="15" height="10" rx="2.5" />
      <path d="M8.5 10.5V7.5a3.5 3.5 0 0 1 7 0v3" />
    </>
  ),
  star: (
    <path d="M12 3.8l2.55 5.17 5.7.83-4.13 4.02.98 5.68L12 16.82l-5.1 2.68.98-5.68L3.75 9.8l5.7-.83z" />
  ),
};

const REASONS: { icon: keyof typeof ICONS; title: string; body: string }[] = [
  {
    icon: "tag",
    title: "The price is printed, not haggled",
    body: "Every deduction is named in rupees on screen before anyone leaves for your address.",
  },
  {
    icon: "note",
    title: "Paid before the box is sealed",
    body: "UPI or bank transfer at your door, with a printed receipt in your hand.",
  },
  {
    icon: "van",
    title: "Free doorstep pickup",
    body: "Pick a two-hour slot and watch the agent approach on a live map.",
  },
  {
    icon: "shield",
    title: "Certified data wipe",
    body: "The factory reset runs in front of you, and we can hand you a wipe certificate.",
  },
  {
    icon: "lock",
    title: "Your price holds for 7 days",
    body: "Book the pickup whenever suits you. A falling market is our problem, not yours.",
  },
  {
    icon: "star",
    title: "12,400 sales, rated 4.9 / 5",
    body: "Across Guwahati, by the people who actually sold us their phone.",
  },
];

export function WhySell() {
  return (
    <section className="bg-[#f4f5f6] py-20 lg:py-24">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
        <h2 className="max-w-xl text-[clamp(1.75rem,3vw,2.4rem)] font-normal leading-[1.15] tracking-[-0.02em] text-[#0b0d0e]">
          Why sell to us
        </h2>
        <p className="mt-4 max-w-lg text-[15px] leading-[1.6] text-[#5b6167]">
          Six things we commit to on every pickup, whether your phone is
          flawless or has a crack across the screen.
        </p>

        <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {REASONS.map((reason) => (
            <li
              key={reason.title}
              className="rounded-2xl border border-black/[0.06] bg-white p-7"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#ffefe6] text-[#fb5908]">
                <svg
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                  className="h-6 w-6"
                  {...stroke}
                >
                  {ICONS[reason.icon]}
                </svg>
              </span>

              <h3 className="mt-5 text-[17px] font-semibold tracking-tight text-[#0b0d0e]">
                {reason.title}
              </h3>
              <p className="mt-2 text-[14px] leading-[1.6] text-[#5b6167]">
                {reason.body}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
