const STEPS = [
  {
    stage: "Quote",
    title: "Answer six questions",
    body: "Model, storage, screen, battery, faults, box. The price moves on screen as you answer, with every deduction named in rupees.",
    tags: ["60 seconds", "No sign-up"],
  },
  {
    stage: "Lock",
    title: "Lock the price",
    body: "Your figure is held while you decide, so a falling market is our problem and not yours.",
    tags: ["Held for days", "Cancel free"],
  },
  {
    stage: "Pickup",
    title: "Free doorstep pickup",
    body: "Pick a two-hour slot and watch the agent approach on a live map. They run the same checks at your table.",
    tags: ["Same-day slots", "Live tracking"],
  },
  {
    stage: "Payout",
    title: "Paid before the box is sealed",
    body: "UPI or bank transfer at your door, with a printed receipt. The device becomes our risk from that second.",
    tags: ["Instant transfer", "Receipt on the spot"],
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="bg-white py-20 lg:py-24">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
        <h2 className="mx-auto max-w-3xl text-center text-[clamp(2rem,4.5vw,3.25rem)] font-normal leading-[1.1] tracking-[-0.03em] text-[#0b0d0e]">
          Selling takes four steps
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-center text-[17px] leading-[1.6] text-[#5b6167]">
          Every deduction is named and priced on screen, before anyone comes to
          your door.
        </p>

        <ol className="mt-14 grid gap-6 lg:grid-cols-2">
          {STEPS.map((step, i) => (
            <li
              key={step.stage}
              className="rounded-2xl border border-black/[0.09] bg-white p-8"
            >
              <p className="flex items-baseline gap-2 text-[13px] font-medium uppercase tracking-[0.12em] text-[#fb5908]">
                <span className="text-[24px] font-semibold tracking-[0.02em]">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span>— {step.stage}</span>
              </p>

              <h3 className="mt-4 text-[22px] font-normal tracking-[-0.01em] text-[#0b0d0e]">
                {step.title}
              </h3>

              <p className="mt-3 max-w-xl text-[15px] leading-[1.65] text-[#5b6167]">
                {step.body}
              </p>

              <ul className="mt-6 flex flex-wrap gap-2.5">
                {step.tags.map((tag) => (
                  <li
                    key={tag}
                    className="rounded-full bg-[#f2f3f4] px-3.5 py-1.5 text-[13px] text-[#3d4348]"
                  >
                    {tag}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
