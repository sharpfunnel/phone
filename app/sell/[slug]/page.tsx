import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { SellFlow } from "../../components/sell-flow";
import { BRANDS } from "../../data/brands";
import {
  PHONE_MODELS,
  findModel,
  modelSlug,
  photoFor,
  variantsFor,
} from "../../data/models";

const STEPS = [
  {
    title: "Answer six questions",
    body: "Screen, battery, faults, box. Every deduction is named in rupees as you go.",
  },
  {
    title: "Lock the price for 7 days",
    body: "Book a pickup whenever suits you. A falling market is our problem.",
  },
  {
    title: "Paid at your door",
    body: "UPI or bank transfer before the box is sealed, with a printed receipt.",
  },
];

export function generateStaticParams() {
  return PHONE_MODELS.map((model) => ({ slug: modelSlug(model.name) }));
}

export async function generateMetadata({
  params,
}: PageProps<"/sell/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const model = findModel(slug);
  if (!model) return { title: "Phone not found — Electronics" };

  return {
    title: `Sell your ${model.name} — Electronics`,
    description: `Get a verified price for your ${model.brand} ${model.name} in sixty seconds, locked for 7 days and paid at your door in Delhi NCR.`,
  };
}

export default async function SellModelPage({
  params,
}: PageProps<"/sell/[slug]">) {
  const { slug } = await params;
  const model = findModel(slug);
  if (!model) notFound();

  const variants = variantsFor(model);
  const logo = BRANDS.find(
    (b) => b.name.toLowerCase() === model.brand.toLowerCase(),
  );

  return (
    <div className="bg-white py-12 lg:py-16">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
        <nav aria-label="Breadcrumb">
          <ol className="flex flex-wrap items-center gap-2 text-[13px] text-[#6b7177]">
            <li>
              <Link href="/" className="hover:text-[#0b0d0e]">
                Home
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li>
              <Link href="/#sell" className="hover:text-[#0b0d0e]">
                Sell your phone
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li className="text-[#0b0d0e]">{model.brand}</li>
          </ol>
        </nav>

        <h1 className="mt-6 text-[clamp(2rem,4vw,3rem)] font-normal leading-[1.1] tracking-[-0.03em] text-[#0b0d0e]">
          Sell your {model.name}
        </h1>
        <p className="mt-4 max-w-xl text-[16px] leading-[1.6] text-[#5b6167]">
          Start with the variant you own. The condition questions come next, and
          your price is locked before anyone leaves for your address.
        </p>

        <div className="mt-12">
          <SellFlow
            model={model}
            variants={variants}
            photo={photoFor(model)}
            aside={
              <aside className="relative h-fit overflow-hidden rounded-2xl bg-[#1c64f2] p-8 text-white">
            {["-right-16 -top-20 h-56 w-56", "-bottom-24 -left-12 h-52 w-52"].map(
              (position) => (
                <span
                  key={position}
                  aria-hidden="true"
                  className={`pointer-events-none absolute rounded-full bg-white/[0.09] ${position}`}
                />
              ),
            )}

            {logo && (
              <span className="relative inline-flex h-11 items-center rounded-xl bg-white px-4">
                <Image
                  src={`/brands/${logo.slug}.png`}
                  alt={logo.name}
                  width={logo.width}
                  height={logo.height}
                  unoptimized
                  className="max-h-4 w-auto"
                />
              </span>
            )}

            <p className="relative mt-5 text-[20px] font-semibold tracking-tight">
              {model.name}
            </p>
            <p className="relative mt-1 text-[14px] text-white/75">
              {model.brand} · Bought in any condition
            </p>

            <ol className="relative mt-7 space-y-5 border-t border-white/20 pt-7">
              {STEPS.map((step, i) => (
                <li key={step.title} className="flex gap-4">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white/15 text-[13px] font-semibold">
                    {i + 1}
                  </span>
                  <div>
                    <p className="text-[15px] font-medium">{step.title}</p>
                    <p className="mt-1 text-[13px] leading-snug text-white/75">
                      {step.body}
                    </p>
                  </div>
                </li>
              ))}
            </ol>

                <p className="relative mt-7 border-t border-white/20 pt-5 text-[12px] leading-snug text-white/70">
                  Free doorstep pickup across Delhi NCR. ID is checked only after
                  the inspection, never before you see your price.
                </p>
              </aside>
            }
          />
        </div>
      </div>
    </div>
  );
}
