type IconName = "phone" | "clock" | "cracked" | "lock";

const CATEGORIES: { name: string; icon: IconName; note: string }[] = [
  {
    name: "Any brand",
    icon: "phone",
    note: "Apple, Samsung, Xiaomi, OnePlus and every other name in the strip above",
  },
  {
    name: "Any age",
    icon: "clock",
    note: "Launched last month or eight years ago — both get a quote",
  },
  {
    name: "Any condition",
    icon: "cracked",
    note: "Boxed and flawless, or cracked and refusing to switch on",
  },
  {
    name: "Locked or unlocked",
    icon: "lock",
    note: "Carrier locks are fine; account locks just need signing out",
  },
];

const CONDITIONS = [
  "Screen cracked, chipped or lifting",
  "Battery health under 80%",
  "Water damage, working or not",
  "Dead — will not power on at all",
  "Faulty buttons, speaker or camera",
  "No box, no charger, no bill",
];

const REQUIREMENTS = [
  "A government ID at pickup, asked for only after the inspection — never before you see the final price.",
  "The IMEI checked against the CEIR stolen-device registry, in front of you.",
  "iCloud or your Google account signed out, so the phone can be reset.",
  "A factory reset, which our agent will walk you through at your table.",
];

// Drawn from primitives rather than icon-font paths so every glyph renders
// predictably at this size.
function Icon({ name }: { name: IconName }) {
  const common = {
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.6,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-6 w-6">
      {name === "phone" && (
        <g {...common}>
          <rect x="7" y="2.5" width="10" height="19" rx="2.5" />
          <line x1="10.5" y1="18.5" x2="13.5" y2="18.5" />
        </g>
      )}
      {name === "clock" && (
        <g {...common}>
          <circle cx="12" cy="12" r="8.5" />
          <path d="M12 7.5V12l3 2" />
        </g>
      )}
      {name === "cracked" && (
        <g {...common}>
          <rect x="7" y="2.5" width="10" height="19" rx="2.5" />
          <path d="M13.5 2.5 10 10h4l-3 7.5" />
        </g>
      )}
      {name === "lock" && (
        <g {...common}>
          <rect x="4.5" y="10.5" width="15" height="10" rx="2.5" />
          <path d="M8.5 10.5V7.5a3.5 3.5 0 0 1 7 0v3" />
        </g>
      )}
    </svg>
  );
}

function Tick() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="mt-0.5 h-4 w-4 shrink-0 text-[#1c64f2]"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.4}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m4 12.5 5 5 11-11" />
    </svg>
  );
}

export function WhatWeBuy() {
  return (
    <section id="sell" className="bg-[#f4f5f6] py-20 lg:py-24">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
        <h2 className="max-w-2xl text-[clamp(1.75rem,3vw,2.4rem)] font-normal leading-[1.15] tracking-[-0.02em] text-[#0b0d0e]">
          What we buy
        </h2>
        <p className="mt-4 max-w-xl text-[15px] leading-[1.6] text-[#5b6167]">
          Phones, and only phones. It is all we have bought since we started, so
          the price we quote is the price we can stand behind.
        </p>

        <ul className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {CATEGORIES.map((category) => (
            <li
              key={category.name}
              className="rounded-2xl border border-black/[0.06] bg-white p-5"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#eaf0fe] text-[#1c64f2]">
                <Icon name={category.icon} />
              </span>
              <h3 className="mt-4 text-[15px] font-semibold text-[#0b0d0e]">
                {category.name}
              </h3>
              <p className="mt-1 text-[13px] text-[#6b7177]">{category.note}</p>
            </li>
          ))}
        </ul>

        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          <div className="rounded-2xl border border-black/[0.06] bg-white p-8">
            <h3 className="text-[20px] font-normal tracking-[-0.01em] text-[#0b0d0e]">
              We still buy it when
            </h3>
            <p className="mt-2 text-[14px] leading-[1.6] text-[#5b6167]">
              None of these is a rejection. Each one is a named deduction you see
              on screen before anyone leaves for your address.
            </p>
            <ul className="mt-5 grid gap-3 sm:grid-cols-2">
              {CONDITIONS.map((condition) => (
                <li
                  key={condition}
                  className="flex gap-2.5 text-[14px] leading-snug text-[#3d4348]"
                >
                  <Tick />
                  {condition}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl border border-black/[0.06] bg-white p-8">
            <h3 className="text-[20px] font-normal tracking-[-0.01em] text-[#0b0d0e]">
              What we need from you
            </h3>
            <p className="mt-2 text-[14px] leading-[1.6] text-[#5b6167]">
              Four things, all handled at your door. Nothing is asked for before
              you have a price in hand.
            </p>
            <ul className="mt-5 space-y-3">
              {REQUIREMENTS.map((requirement) => (
                <li
                  key={requirement}
                  className="flex gap-2.5 text-[14px] leading-snug text-[#3d4348]"
                >
                  <Tick />
                  {requirement}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
