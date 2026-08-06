"use client";

import { useCallback, useEffect, useRef, useState } from "react";

// Draft copy — replace with real, attributable reviews before launch.
const REVIEWS = [
  {
    quote:
      "The quote said ₹27,400 and ₹27,400 is what hit my account before the agent had even taped the box shut. I had braced myself for the usual haggling at the door and it never came.",
    name: "Aarav Mehta",
    place: "Rohini",
    detail: "Sold an iPhone 12",
    rating: 5,
  },
  {
    quote:
      "My screen had a crack running corner to corner and I assumed that meant no offer at all. It was a ₹2,100 deduction, named on screen, and the rest of the price stood.",
    name: "Priya Nair",
    place: "Gurugram",
    detail: "Sold a Galaxy S21 FE",
    rating: 5,
  },
  {
    quote:
      "I locked the price on a Tuesday and only got around to booking the pickup that Sunday. It was still the same number. Nobody tried to requote me.",
    name: "Rahul Bansal",
    place: "Noida",
    detail: "Sold a OnePlus 9",
    rating: 5,
  },
  {
    quote:
      "Bought a refurbished Pixel 7 and the listing had already told me the screen was an OEM replacement. Finding that written down before I paid is why I trusted the rest of it.",
    name: "Sneha Kapoor",
    place: "Dwarka",
    detail: "Bought a Pixel 7",
    rating: 5,
  },
  {
    quote:
      "The agent ran the same 32 checks at my dining table that the website described, and talked me through the factory reset instead of just taking the phone away.",
    name: "Imran Qureshi",
    place: "Okhla",
    detail: "Sold an iPhone 11",
    rating: 5,
  },
  {
    quote:
      "Battery health was 79% and I expected that to be an argument. It was a line item worth ₹900. I have sold three phones here since.",
    name: "Ananya Rao",
    place: "Indirapuram",
    detail: "Sold a Redmi Note 11",
    rating: 4,
  },
  {
    quote:
      "Pickup slot was two hours wide and the live map meant I did not waste the afternoon waiting. Payment by UPI landed while the agent was still on my sofa.",
    name: "Vikram Singh",
    place: "Janakpuri",
    detail: "Sold a Galaxy S22",
    rating: 5,
  },
  {
    quote:
      "I had lost the box and the bill years ago. It cost me a few hundred rupees rather than the whole sale, which is not what I had been quoted elsewhere.",
    name: "Meera Joshi",
    place: "Faridabad",
    detail: "Sold an iPhone XR",
    rating: 4,
  },
  {
    quote:
      "The refurbished OnePlus arrived with the six-month warranty card in the box. Speaker rattled in week three, they collected it and returned it fixed in four days.",
    name: "Karan Malhotra",
    place: "Saket",
    detail: "Bought a OnePlus 11",
    rating: 5,
  },
  {
    quote:
      "They asked for my Aadhaar only after the inspection was finished and the price agreed. Small thing, but it is the part that made me comfortable.",
    name: "Divya Sharma",
    place: "Vasant Kunj",
    detail: "Sold a Vivo V25",
    rating: 5,
  },
];

function Arrow({ dir }: { dir: "left" | "right" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-5 w-5"
    >
      {dir === "left" ? (
        <path d="M19 12H5m0 0 6-6m-6 6 6 6" />
      ) : (
        <path d="M5 12h14m0 0-6-6m6 6-6 6" />
      )}
    </svg>
  );
}

// Rotated through the cards so a row of blue tiles does not read as one
// repeated block — same trick as the offer cards.
const DECOR = [
  ["-right-14 -top-16 h-44 w-44", "-bottom-20 -left-12 h-40 w-40"],
  ["-left-16 top-8 h-48 w-48", "-bottom-16 -right-8 h-36 w-36"],
  ["-right-20 bottom-2 h-52 w-52", "-top-16 left-10 h-32 w-32"],
];

function QuoteMark() {
  // One mark, drawn once and mirrored across by translation.
  const mark =
    "M13 6C8 7 4 11 4 17v7c0 1.1.9 2 2 2h6c1.1 0 2-.9 2-2v-6c0-1.1-.9-2-2-2H9c0-3 1.5-5 4.5-6z";

  return (
    <svg
      viewBox="0 0 32 32"
      aria-hidden="true"
      className="h-8 w-8 shrink-0 text-white/35"
      fill="currentColor"
    >
      <path d={mark} />
      <path d={mark} transform="translate(14,0)" />
    </svg>
  );
}

function Stars({ rating }: { rating: number }) {
  return (
    <p aria-label={`${rating} out of 5`} className="text-[14px] tracking-[2px]">
      <span className="text-white">{"★".repeat(rating)}</span>
      <span className="text-white/30">{"★".repeat(5 - rating)}</span>
    </p>
  );
}

export function Testimonials() {
  const trackRef = useRef<HTMLUListElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  const sync = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    // 2px of slack: sub-pixel scroll widths never land exactly on the end.
    setAtStart(track.scrollLeft <= 2);
    setAtEnd(track.scrollLeft + track.clientWidth >= track.scrollWidth - 2);
  }, []);

  useEffect(() => {
    sync();
    window.addEventListener("resize", sync);
    return () => window.removeEventListener("resize", sync);
  }, [sync]);

  function step(direction: 1 | -1) {
    const track = trackRef.current;
    if (!track) return;
    const card = track.querySelector("li");
    const amount = card
      ? card.getBoundingClientRect().width + 20
      : track.clientWidth;
    track.scrollBy({ left: direction * amount, behavior: "smooth" });
  }

  return (
    <section id="reviews" className="bg-white py-20 lg:py-24">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <h2 className="text-[clamp(1.75rem,3vw,2.4rem)] font-normal leading-[1.15] tracking-[-0.02em] text-[#0b0d0e]">
              What our customers say
            </h2>
            <p className="mt-4 max-w-xl text-[15px] leading-[1.6] text-[#5b6167]">
              Every review below came from someone who sold us a phone or bought
              one back from us, in Delhi NCR.
            </p>
          </div>

          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => step(-1)}
              disabled={atStart}
              aria-label="Previous reviews"
              className="flex h-12 w-12 items-center justify-center rounded-full border border-black/10 bg-white text-[#0b0d0e] transition-colors hover:bg-[#f2f3f4] disabled:cursor-not-allowed disabled:opacity-35 disabled:hover:bg-white"
            >
              <Arrow dir="left" />
            </button>
            <button
              type="button"
              onClick={() => step(1)}
              disabled={atEnd}
              aria-label="Next reviews"
              className="flex h-12 w-12 items-center justify-center rounded-full border border-black/10 bg-white text-[#0b0d0e] transition-colors hover:bg-[#f2f3f4] disabled:cursor-not-allowed disabled:opacity-35 disabled:hover:bg-white"
            >
              <Arrow dir="right" />
            </button>
          </div>
        </div>

        {/* Native scrolling with snap points, so touch, trackpad and keyboard
            all work without the buttons having to own the state. */}
        <ul
          ref={trackRef}
          onScroll={sync}
          tabIndex={0}
          className="mt-10 flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {REVIEWS.map((review, i) => (
            <li
              key={review.name}
              className="relative flex w-[85vw] max-w-[380px] shrink-0 snap-start flex-col overflow-hidden rounded-2xl bg-[#1c64f2] p-7 sm:w-[360px]"
            >
              {DECOR[i % DECOR.length].map((position) => (
                <span
                  key={position}
                  aria-hidden="true"
                  className={`pointer-events-none absolute rounded-full bg-white/[0.09] ${position}`}
                />
              ))}

              {/* `relative` on each block so it paints above the absolutely
                  positioned circles without needing z-index. */}
              <div className="relative flex items-start justify-between gap-4">
                <Stars rating={review.rating} />
                <QuoteMark />
              </div>

              <blockquote className="relative mt-4 flex-1 text-[15px] leading-[1.65] text-white/90">
                {review.quote}
              </blockquote>

              <footer className="relative mt-6 border-t border-white/20 pt-4">
                <p className="text-[15px] font-semibold text-white">
                  {review.name}
                </p>
                <p className="mt-0.5 text-[13px] text-white/70">
                  {review.place} · {review.detail}
                </p>
              </footer>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
