"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

import { useAuth } from "./auth-provider";

import type { PhoneModel } from "../data/models";
import {
  QUESTIONS,
  estimateFor,
  inr,
  maxPriceFor,
} from "../data/quote";

type Stage = "variant" | "quote" | "questions";

const PROMISES = [
  "Certified data wipe",
  "Free doorstep pickup",
  "Price locked for 7 days",
];

function Tick({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={className}
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

/** Same frame whether or not we have a bench photo, so nothing shifts. */
function PhoneImage({
  photo,
  alt,
  size,
}: {
  photo?: string;
  alt: string;
  size: number;
}) {
  const compact = size < 120;

  return (
    <div
      className="flex shrink-0 items-center justify-center overflow-hidden rounded-xl bg-[#f5f6f7]"
      style={{ width: size, height: size }}
    >
      {photo ? (
        <Image
          src={photo}
          alt={alt}
          width={size}
          height={size}
          style={{ width: size, height: size }}
          className="object-cover"
        />
      ) : (
        <div className="flex flex-col items-center gap-2 px-2 text-center text-[#b3b8bd]">
          <svg
            viewBox="0 0 24 24"
            aria-hidden="true"
            className={compact ? "h-6 w-6" : "h-9 w-9"}
            fill="none"
            stroke="currentColor"
            strokeWidth={1.5}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect x="6.5" y="2" width="11" height="20" rx="2.5" />
            <line x1="10.5" y1="18.5" x2="13.5" y2="18.5" />
          </svg>
          {!compact && (
            <span className="text-[12px] text-[#8b9197]">
              Photo coming soon
            </span>
          )}
        </div>
      )}
    </div>
  );
}

function Lock() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="h-[0.55em] w-[0.55em] shrink-0"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.9}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="4.5" y="10.5" width="15" height="10" rx="2.5" />
      <path d="M8.5 10.5V7.5a3.5 3.5 0 0 1 7 0v3" />
    </svg>
  );
}

function Arrow() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="h-[18px] w-[18px]"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.9}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14m0 0-6-6m6 6-6 6" />
    </svg>
  );
}

export function SellFlow({
  model,
  variants,
  photo,
  aside,
}: {
  model: PhoneModel;
  variants: string[];
  photo?: string;
  /** Shown beside the first two stages; the questions stage brings its own. */
  aside?: React.ReactNode;
}) {
  const [stage, setStage] = useState<Stage>("variant");
  const [variant, setVariant] = useState<string | null>(null);
  const [answers, setAnswers] = useState<Record<string, string>>({});

  const { ready, user, saveQuote } = useAuth();
  const pathname = usePathname();
  const loginHref = `/login?next=${encodeURIComponent(pathname)}`;
  // Treat "still loading" as signed out so the figure never flashes visible.
  const locked = !ready || !user;

  const maxPrice = variant ? maxPriceFor(model, variant) : 0;
  const estimate = useMemo(
    () => (variant ? estimateFor(model, variant, answers) : 0),
    [model, variant, answers],
  );

  const answeredCount = QUESTIONS.filter((q) => answers[q.id]).length;
  const allAnswered = answeredCount === QUESTIONS.length;

  // Remember the finished quote against the signed-in account.
  useEffect(() => {
    if (!allAnswered || !variant || !user) return;
    saveQuote({ model: `${model.brand} ${model.name}`, variant, amount: estimate });
  }, [allAnswered, variant, user, estimate, model, saveQuote]);

  function pickVariant(next: string) {
    setVariant(next);
    setAnswers({});
    setStage("quote");
  }

  const withAside = (card: React.ReactNode) => (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)]">
      {card}
      {aside}
    </div>
  );

  /* ------------------------------ Variant ------------------------------ */
  if (stage === "variant") {
    return withAside(
      <div className="rounded-2xl border border-black/[0.08] bg-white p-8">
        <div className="mb-8 flex justify-center">
          <PhoneImage
            photo={photo}
            alt={`${model.brand} ${model.name}`}
            size={200}
          />
        </div>

        <div className="flex items-baseline gap-3">
          <span className="text-[22px] font-semibold tracking-tight text-[#1c64f2]">
            01
          </span>
          <h2 className="text-[20px] font-normal tracking-[-0.01em] text-[#0b0d0e]">
            Choose your variant
          </h2>
        </div>
        <p className="mt-2 text-[14px] text-[#6b7177]">
          Not sure? Check Settings, then About phone.
        </p>

        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          {variants.map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => pickVariant(option)}
              className="flex items-center justify-between gap-3 rounded-xl border border-black/10 bg-white px-5 py-4 text-left transition-colors hover:border-[#1c64f2] hover:bg-[#eaf0fe]"
            >
              <span className="text-[15px] text-[#0b0d0e]">{option}</span>
              <span className="text-[13px] text-[#6b7177]">
                {locked
                  ? "up to ₹ XX,XXX"
                  : `up to ₹${inr.format(maxPriceFor(model, option))}`}
              </span>
            </button>
          ))}
        </div>
      </div>,
    );
  }

  /* ------------------------------- Quote ------------------------------- */
  if (stage === "quote") {
    return withAside(
      <div className="overflow-hidden rounded-2xl border border-black/[0.08] bg-white">
        <div className="flex flex-col gap-7 p-8 sm:flex-row sm:items-start">
          <PhoneImage
            photo={photo}
            alt={`${model.brand} ${model.name}`}
            size={180}
          />

          <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-3">
            <h2 className="text-[26px] font-semibold tracking-tight text-[#0b0d0e]">
              {model.name}
            </h2>
            <span className="rounded-full bg-[#eaf0fe] px-3 py-1 text-[13px] font-medium text-[#1c64f2]">
              {variant}
            </span>
          </div>

          <p className="mt-6 text-[14px] text-[#6b7177]">You get up to</p>

          {locked ? (
            <>
              {/* The figure is never rendered while signed out — blurring it
                  would still leave it in the DOM and selectable. */}
              <p className="mt-1 flex items-center gap-3 text-[clamp(2.5rem,6vw,3.5rem)] font-semibold leading-none tracking-[-0.03em] text-[#9aa0a6]">
                ₹ XX,XXX
                <Lock />
              </p>
              <p className="mt-4 max-w-md text-[14px] leading-[1.6] text-[#6b7177]">
                Sign in with your mobile number to see the exact figure and lock
                it for 7 days.
              </p>
              <Link
                href={loginHref}
                className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#1c64f2] px-8 py-4 text-[15px] font-medium text-white transition-colors hover:bg-[#1751c9] sm:w-auto"
              >
                Log in to see your price
                <Arrow />
              </Link>
            </>
          ) : (
            <>
              <p className="mt-1 text-[clamp(2.5rem,6vw,3.5rem)] font-semibold leading-none tracking-[-0.03em] text-[#0b0d0e]">
                ₹{inr.format(maxPrice)}
              </p>
              <p className="mt-3 max-w-md text-[14px] leading-[1.6] text-[#6b7177]">
                That is the flawless-condition price. Answer five questions and
                we will show you exactly what your phone is worth.
              </p>
              <button
                type="button"
                onClick={() => setStage("questions")}
                className="mt-7 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#1c64f2] px-8 py-4 text-[15px] font-medium text-white transition-colors hover:bg-[#1751c9] sm:w-auto"
              >
                Sell my phone now
                <Arrow />
              </button>
            </>
          )}

          <button
            type="button"
            onClick={() => setStage("variant")}
            className="ml-0 mt-3 block text-[14px] text-[#1c64f2] hover:underline sm:ml-6 sm:mt-0 sm:inline-block"
          >
            Change variant
          </button>
          </div>
        </div>

        <ul className="flex flex-wrap gap-x-8 gap-y-3 border-t border-black/[0.07] bg-[#f7f8f8] px-8 py-5">
          {PROMISES.map((promise) => (
            <li
              key={promise}
              className="flex items-center gap-2 text-[14px] text-[#3d4348]"
            >
              <Tick className="h-4 w-4 text-[#1c64f2]" />
              {promise}
            </li>
          ))}
        </ul>
      </div>,
    );
  }

  /* ----------------------------- Questions ----------------------------- */
  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)]">
      <div className="rounded-2xl border border-black/[0.08] bg-white p-8">
        <div className="flex items-center gap-4">
          <PhoneImage
            photo={photo}
            alt={`${model.brand} ${model.name}`}
            size={72}
          />
          <div className="min-w-0">
            <p className="text-[13px] font-medium uppercase tracking-[0.12em] text-[#1c64f2]">
              Evaluating
            </p>
            <h2 className="mt-1 text-[20px] font-semibold tracking-tight text-[#0b0d0e]">
              {model.brand} {model.name} ({variant})
            </h2>
          </div>
        </div>

        {/* Step rail doubles as the progress indicator. */}
        <ol className="mt-5 flex flex-wrap items-center gap-x-2 gap-y-1 text-[13px]">
          {QUESTIONS.map((question, i) => (
            <li key={question.id} className="flex items-center gap-2">
              <span
                className={
                  answers[question.id] ? "text-[#1c64f2]" : "text-[#9aa0a6]"
                }
              >
                {question.step}
              </span>
              {i < QUESTIONS.length - 1 && (
                <span aria-hidden="true" className="text-[#c9ced3]">
                  ›
                </span>
              )}
            </li>
          ))}
        </ol>

        <div
          className="mt-3 h-1 w-full overflow-hidden rounded-full bg-[#eceef1]"
          role="progressbar"
          aria-valuenow={answeredCount}
          aria-valuemin={0}
          aria-valuemax={QUESTIONS.length}
          aria-label="Questions answered"
        >
          <div
            className="h-full rounded-full bg-[#1c64f2] transition-[width] duration-300"
            style={{ width: `${(answeredCount / QUESTIONS.length) * 100}%` }}
          />
        </div>

        <div className="mt-8 space-y-8">
          {QUESTIONS.map((question, i) => (
            <fieldset key={question.id}>
              <legend className="text-[15px] font-medium text-[#0b0d0e]">
                {i + 1}. {question.title}
              </legend>
              <p className="mt-1 text-[13px] text-[#6b7177]">{question.hint}</p>

              <div className="mt-3 flex flex-wrap gap-3">
                {question.options.map((option) => {
                  const chosen = answers[question.id] === option.label;
                  return (
                    <button
                      key={option.label}
                      type="button"
                      aria-pressed={chosen}
                      onClick={() =>
                        setAnswers((prev) => ({
                          ...prev,
                          [question.id]: option.label,
                        }))
                      }
                      className={`min-w-[110px] flex-1 rounded-xl border px-4 py-3 text-[14px] transition-colors sm:flex-none ${
                        chosen
                          ? "border-[#1c64f2] bg-[#eaf0fe] font-medium text-[#1c64f2]"
                          : "border-black/10 text-[#3d4348] hover:bg-[#f7f8f8]"
                      }`}
                    >
                      {option.label}
                    </button>
                  );
                })}
              </div>
            </fieldset>
          ))}
        </div>

        <button
          type="button"
          onClick={() => setStage("quote")}
          className="mt-8 text-[14px] text-[#1c64f2] hover:underline"
        >
          Back to price
        </button>
      </div>

      {/* --------------------------- Evaluation --------------------------- */}
      <aside className="h-fit rounded-2xl border border-black/[0.08] bg-white p-7 lg:sticky lg:top-28">
        <h3 className="text-[17px] font-semibold tracking-tight text-[#0b0d0e]">
          Device evaluation
        </h3>

        <div className="mt-4 rounded-xl bg-[#eaf0fe] p-5">
          <p className="text-[13px] text-[#3d4348]">Estimated value</p>
          <p className="mt-1 text-[28px] font-semibold tracking-tight text-[#1c64f2]">
            ₹{inr.format(estimate)}
          </p>
          <p className="mt-1 text-[12px] text-[#5b6167]">
            {allAnswered
              ? "Final, subject to the doorstep check"
              : `${answeredCount} of ${QUESTIONS.length} answered`}
          </p>
        </div>

        <dl className="mt-6 space-y-4">
          {QUESTIONS.map((question) => (
            <div
              key={question.id}
              className="border-b border-black/[0.06] pb-4 last:border-0 last:pb-0"
            >
              <dt className="text-[13px] font-medium text-[#0b0d0e]">
                {question.step}
              </dt>
              <dd
                className={`mt-0.5 text-[13px] ${
                  answers[question.id] ? "text-[#1c64f2]" : "text-[#9aa0a6]"
                }`}
              >
                {answers[question.id] ?? "Not answered"}
              </dd>
            </div>
          ))}
        </dl>

        <a
          href={allAnswered ? "#quote" : undefined}
          aria-disabled={!allAnswered}
          onClick={(e) => {
            if (!allAnswered) e.preventDefault();
          }}
          className={`mt-6 flex w-full items-center justify-center gap-2 rounded-full px-6 py-3.5 text-[15px] font-medium transition-colors ${
            allAnswered
              ? "bg-[#1c64f2] text-white hover:bg-[#1751c9]"
              : "cursor-not-allowed bg-[#e6e8ea] text-[#9aa0a6]"
          }`}
        >
          {allAnswered ? "Book free pickup" : "Answer all five to continue"}
          {allAnswered && <Arrow />}
        </a>
      </aside>
    </div>
  );
}
