const FAQS = [
  {
    q: "How is my selling price calculated?",
    a: "From what buyers actually paid for your exact model on our store this week, minus the deductions your answers trigger. Each deduction is shown with its rupee value.",
  },
  {
    q: "Can the price change at pickup?",
    a: "Only if the agent finds something you did not declare — a crack, a dead camera, a swollen battery. Otherwise the locked figure is what you are paid.",
  },
  {
    q: "When and how am I paid?",
    a: "By UPI or bank transfer at your door, before the box is sealed, with a printed receipt. No vouchers and no waiting period.",
  },
  {
    q: "What do the grades A, B and C mean?",
    a: "A is near-flawless, B has light cosmetic wear, C has visible wear but is fully functional. Every grade is backed by bench photographs of that unit.",
  },
  {
    q: "What does the warranty on a refurbished phone cover?",
    a: "Parts and labour on any hardware fault that is not physical damage, plus free re-work if the same fault returns inside the window.",
  },
  {
    q: "Can I trade my old phone against a refurbished one?",
    a: "Yes. Your locked quote is applied against the listing price and you pay only the difference, in one pickup-and-delivery visit.",
  },
];

export function Faqs() {
  return (
    <section id="faq" className="bg-[#f4f5f6] py-20 lg:py-24">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
        <h2 className="mx-auto max-w-2xl text-center text-[clamp(2rem,4.5vw,3.25rem)] font-normal leading-[1.1] tracking-[-0.03em] text-[#0b0d0e]">
          Answers to your questions
        </h2>

        <dl className="mt-14 grid gap-6 lg:grid-cols-2">
          {FAQS.map((faq) => (
            <div
              key={faq.q}
              className="rounded-xl border border-[#1c64f2] bg-white p-6 shadow-[0_1px_2px_rgba(11,13,14,0.06)]"
            >
              <dt className="text-[16px] font-semibold tracking-[-0.01em] text-[#0b0d0e]">
                {faq.q}
              </dt>
              <dd className="mt-2 text-[15px] leading-[1.65] text-[#6b7177]">
                {faq.a}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
