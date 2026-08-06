"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

import {
  CONDITION_TIERS,
  GRADE_TIER,
  GRADE_WEAR,
  type Phone,
} from "../data/phones";

const inr = new Intl.NumberFormat("en-IN");

function CloseIcon() {
  return (
    <svg viewBox="0 -960 960 960" fill="currentColor" className="h-5 w-5">
      <path d="M480-437.85 277.08-234.92q-8.31 8.3-20.89 8.5-12.57.19-21.27-8.5-8.69-8.7-8.69-21.08 0-12.38 8.69-21.08L437.85-480 234.92-682.92q-8.3-8.31-8.5-20.89-.19-12.57 8.5-21.27 8.7-8.69 21.08-8.69 12.38 0 21.08 8.69L480-522.15l202.92-202.93q8.31-8.3 20.89-8.5 12.57-.19 21.27 8.5 8.69 8.7 8.69 21.08 0 12.38-8.69 21.08L522.15-480l202.93 202.92q8.3 8.31 8.5 20.89.19 12.57-8.5 21.27-8.7 8.69-21.08 8.69-12.38 0-21.08-8.69L480-437.85Z" />
    </svg>
  );
}

function CartIcon() {
  return (
    <svg viewBox="0 -960 960 960" fill="currentColor" className="h-5 w-5">
      <path d="M285.79-81.87q-27.62 0-47.24-19.72-19.63-19.72-19.63-47.34 0-27.63 19.72-47.25 19.72-19.62 47.34-19.62 27.63 0 47.25 19.72 19.62 19.72 19.62 47.34 0 27.62-19.72 47.25-19.72 19.62-47.34 19.62Zm387.7 0q-27.62 0-47.25-19.72-19.63-19.72-19.63-47.34 0-27.63 19.72-47.25 19.72-19.62 47.35-19.62 27.62 0 47.24 19.72 19.63 19.72 19.63 47.34 0 27.62-19.72 47.25-19.72 19.62-47.34 19.62ZM241.15-750.7l97.83 205.44h287.87q3.85 0 6.73-1.93 2.88-1.92 4.81-5.77l100.63-182.87q2.31-4.23.77-7.55-1.54-3.32-6.15-3.32H241.15Zm-28.61-59.99h548.31q26.61 0 39.99 22.31 13.38 22.3.85 45.15L688.7-535.13q-9.46 16.65-25.11 26.02-15.65 9.37-34.5 9.37H316.02l-45.83 84.35q-3.08 4.62-.19 9.62 2.88 5 8.65 5h451.24q12.77 0 21.61 8.86 8.85 8.87 8.85 21.67 0 12.79-8.85 21.62-8.84 8.83-21.61 8.83H278.65q-38.11 0-57.15-31.9-19.04-31.91-1.35-64.83l52.7-96.02-124.28-262.3H86.5q-12.77 0-21.61-8.87-8.85-8.86-8.85-21.66 0-12.79 8.85-21.62 8.84-8.83 21.61-8.83h63.31q9.5 0 17.79 5.08 8.29 5.07 12.6 14.11l32.34 68.34Z" />
    </svg>
  );
}

function CheckIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 -960 960 960" fill="currentColor" className={className}>
      <path d="m389-408.31 288.15-288.15q9.08-9.08 21.02-9.08 11.95 0 21.03 9.08 9.08 9.07 9.08 21.34 0 12.27-9.08 21.35L410.73-343.92q-9.19 9.19-21.73 9.19-12.54 0-21.73-9.19L230.15-481.31q-9.07-9.07-8.96-21.34.12-12.27 9.2-21.35 9.07-9.07 21.34-9.07 12.27 0 21.35 9.07L389-408.31Z" />
    </svg>
  );
}

export function InspectionReport({ phone }: { phone: Phone }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [open, setOpen] = useState(false);

  const [tier, setTier] = useState<string>(GRADE_TIER[phone.grade]);
  const [storage, setStorage] = useState(
    phone.storageOptions.find((o) => o.available)?.label ??
      phone.storageOptions[0].label,
  );
  const [color, setColor] = useState(phone.color);
  const [dealsOnly, setDealsOnly] = useState(true);
  const [warrantyAdded, setWarrantyAdded] = useState(false);

  const discount = Math.round(((phone.was - phone.price) / phone.was) * 100);
  const emi = Math.round(phone.price / 12);
  const memberPrice = Math.round(phone.price * 0.978);

  // The dialog can close via Escape or the backdrop as well as the button, so
  // the native `close` event is the single place that resets our state.
  useEffect(() => {
    const el = dialogRef.current;
    if (!el) return;

    const onClose = () => {
      setOpen(false);
      document.documentElement.style.overflow = "";
    };

    el.addEventListener("close", onClose);
    return () => {
      el.removeEventListener("close", onClose);
      document.documentElement.style.overflow = "";
    };
  }, []);

  function openDialog() {
    setOpen(true);
    dialogRef.current?.showModal();
    document.documentElement.style.overflow = "hidden";
  }

  return (
    <>
      <button
        type="button"
        onClick={openDialog}
        className="mt-4 inline-flex w-full items-center justify-center rounded-full bg-[#1c64f2] px-4 py-2.5 text-[13px] font-medium text-white transition-colors hover:bg-[#1751c9]"
      >
        View inspection report
      </button>

      <dialog
        ref={dialogRef}
        aria-labelledby={`report-title-${phone.name}`}
        // Clicking the dialog element itself means the backdrop was hit; the
        // content sits in a child, so real content clicks never match.
        onClick={(e) => {
          if (e.target === dialogRef.current) dialogRef.current?.close();
        }}
        className="m-auto w-[min(1180px,calc(100vw-1.5rem))] rounded-3xl bg-transparent p-0 backdrop:bg-[#0b0d0e]/55"
      >
        {open && (
          <div className="max-h-[92vh] overflow-y-auto rounded-3xl bg-white">
            <button
              type="button"
              onClick={() => dialogRef.current?.close()}
              aria-label="Close inspection report"
              className="absolute right-5 top-5 z-10 flex h-9 w-9 items-center justify-center rounded-full border border-black/10 bg-white text-[#3d4348] transition-colors hover:bg-[#f2f3f4]"
            >
              <CloseIcon />
            </button>

            <div className="grid gap-10 p-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:p-8">
              {/* ---------------- Gallery ---------------- */}
              <div>
                <div className="flex gap-4">
                  {phone.photo && (
                    <div className="hidden w-[76px] shrink-0 flex-col gap-3 sm:flex">
                      <div className="relative aspect-square overflow-hidden rounded-xl border-2 border-[#1c64f2]">
                        <Image
                          src={phone.photo}
                          alt=""
                          fill
                          sizes="76px"
                          className="object-cover"
                        />
                      </div>
                    </div>
                  )}

                  <div className="relative flex-1 overflow-hidden rounded-2xl border border-black/[0.07]">
                    <span className="absolute left-4 top-4 z-10 rounded-full bg-[#1c64f2] px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.08em] text-white">
                      Electronics Assured
                    </span>

                    <div className="relative aspect-square">
                      {phone.photo ? (
                        <Image
                          src={phone.photo}
                          alt={`${phone.name} ${phone.storage}`}
                          fill
                          sizes="(max-width: 1024px) 100vw, 520px"
                          className="object-cover"
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center bg-[#f5f6f7] text-[13px] text-[#6b7177]">
                          Photo pending
                        </div>
                      )}
                    </div>

                    <dl className="grid grid-cols-3 gap-2 bg-[#0b0d0e] px-4 py-3 text-white">
                      {[
                        ["32", "Point Quality Check"],
                        ["10", "Days Refund"],
                        ["06", "Months Warranty"],
                      ].map(([value, label]) => (
                        <div key={label}>
                          <dt className="text-[15px] font-semibold">{value}</dt>
                          <dd className="text-[11px] leading-tight text-white/70">
                            {label}
                          </dd>
                        </div>
                      ))}
                    </dl>
                  </div>
                </div>

                <div className="mt-5 flex gap-3">
                  <button
                    type="button"
                    aria-label="Add to cart"
                    className="flex h-[58px] w-[58px] shrink-0 items-center justify-center rounded-xl border border-black/10 text-[#3d4348] transition-colors hover:bg-[#f2f3f4]"
                  >
                    <CartIcon />
                  </button>
                  <button
                    type="button"
                    className="h-[58px] flex-1 rounded-xl border border-black/10 px-4 transition-colors hover:bg-[#f2f3f4]"
                  >
                    <span className="block text-[15px] font-medium text-[#111315]">
                      Pay with EMI
                    </span>
                    <span className="block text-[11px] text-[#6b7177]">
                      from ₹{inr.format(emi)}/month
                    </span>
                  </button>
                  <button
                    type="button"
                    className="h-[58px] flex-1 rounded-xl bg-[#1c64f2] px-4 text-[15px] font-medium text-white transition-colors hover:bg-[#1751c9]"
                  >
                    Buy Now
                  </button>
                </div>
              </div>

              {/* ---------------- Details ---------------- */}
              <div>
                <h2
                  id={`report-title-${phone.name}`}
                  className="pr-12 text-[22px] font-semibold tracking-tight text-[#0b0d0e]"
                >
                  {phone.name} — Refurbished
                </h2>
                <p className="mt-1.5 text-[14px] text-[#5b6167]">
                  6-month warranty, {tier}, {storage}, {color}
                </p>

                <div className="mt-4 inline-flex items-center gap-2 rounded-lg border border-black/[0.07] bg-[#f7f8f8] p-1">
                  <span className="flex items-center gap-1 rounded-md bg-[#1c64f2] px-2 py-1 text-[13px] font-semibold text-white">
                    {phone.rating.toFixed(1)}
                    <span aria-hidden="true">★</span>
                  </span>
                  <span className="pr-2 text-[13px] text-[#5b6167]">
                    {inr.format(phone.reviews)} reviews
                  </span>
                </div>

                <div className="mt-5 flex flex-wrap items-baseline gap-3">
                  <span className="text-[18px] font-semibold text-[#c2410c]">
                    -{discount}%
                  </span>
                  <span className="text-[30px] font-semibold tracking-tight text-[#0b0d0e]">
                    ₹{inr.format(phone.price)}
                  </span>
                  <span className="text-[16px] text-[#9aa0a6] line-through">
                    ₹{inr.format(phone.was)}
                  </span>
                </div>

                <div className="mt-4 inline-flex items-center gap-2 rounded-lg bg-[#0b0d0e] px-4 py-2.5 text-[14px] font-medium text-white">
                  Get it for ₹{inr.format(memberPrice)} with
                  <span className="font-semibold tracking-[0.08em] text-[#7aa5ff]">
                    PLUS
                  </span>
                </div>

                <p className="mt-4 text-[14px] text-[#3d4348]">
                  ₹{inr.format(emi)}/month EMI available.{" "}
                  <button
                    type="button"
                    className="font-medium text-[#1c64f2] hover:underline"
                  >
                    View Plans
                  </button>
                </p>
                <p className="mt-1 text-[12px] text-[#8b9197]">
                  Bajaj, Snapmint, Instacred EMI available
                </p>

                <hr className="my-6 border-black/[0.07]" />

                <div className="flex items-center justify-between gap-4">
                  <h3 className="text-[16px] font-semibold text-[#0b0d0e]">
                    Condition{" "}
                    <button
                      type="button"
                      className="text-[14px] font-medium text-[#1c64f2] hover:underline"
                    >
                      Learn More
                    </button>
                  </h3>
                  <label className="flex cursor-pointer items-center gap-2 text-[13px] text-[#3d4348]">
                    <span
                      className={`flex h-[18px] w-[18px] items-center justify-center rounded border transition-colors ${
                        dealsOnly
                          ? "border-[#1c64f2] bg-[#1c64f2] text-white"
                          : "border-black/20 bg-white text-transparent"
                      }`}
                    >
                      <CheckIcon className="h-3.5 w-3.5" />
                    </span>
                    <input
                      type="checkbox"
                      checked={dealsOnly}
                      onChange={(e) => setDealsOnly(e.target.checked)}
                      className="sr-only"
                    />
                    Show deals only
                  </label>
                </div>

                <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
                  {CONDITION_TIERS.map((t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => setTier(t)}
                      aria-pressed={tier === t}
                      className={`rounded-lg border px-3 py-2.5 text-[14px] font-medium transition-colors ${
                        tier === t
                          ? "border-[#1c64f2] bg-[#eaf0fe] text-[#1c64f2]"
                          : "border-black/10 text-[#3d4348] hover:bg-[#f7f8f8]"
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>

                <div className="mt-4 overflow-hidden rounded-xl border border-[#1c64f2]/20">
                  <p className="flex items-center gap-2 bg-[#1c64f2] px-4 py-2.5 text-[13px] font-medium text-white">
                    <CheckIcon />
                    All devices have a default 6 Months warranty out of the box
                  </p>
                  <div className="flex flex-wrap items-center justify-between gap-3 bg-[#f7f8f8] px-4 py-3">
                    <p className="text-[13px] text-[#3d4348]">
                      Add <strong className="font-semibold">6 Months</strong>{" "}
                      extended warranty at ₹1,299
                    </p>
                    <button
                      type="button"
                      onClick={() => setWarrantyAdded((v) => !v)}
                      className={`rounded-lg px-5 py-2 text-[13px] font-medium transition-colors ${
                        warrantyAdded
                          ? "bg-[#eaf0fe] text-[#1c64f2]"
                          : "bg-[#0b0d0e] text-white hover:bg-[#26292c]"
                      }`}
                    >
                      {warrantyAdded ? "Added" : "Add"}
                    </button>
                  </div>
                </div>

                <ul className="mt-5 space-y-2 rounded-xl bg-[#f4f5f6] p-5 text-[14px] text-[#3d4348]">
                  {[
                    "Fully tested & 100% functional",
                    GRADE_WEAR[phone.grade],
                    `Battery health ${phone.battery}%`,
                    "6 Months Warranty",
                    "48 hrs no question refund policy",
                  ].map((line) => (
                    <li key={line} className="flex gap-2">
                      <span aria-hidden="true" className="text-[#8b9197]">
                        •
                      </span>
                      {line}
                    </li>
                  ))}
                </ul>

                <h3 className="mt-6 text-[16px] font-semibold text-[#0b0d0e]">
                  Storage
                </h3>
                <div className="mt-3 flex flex-wrap gap-3">
                  {phone.storageOptions.map((option) => (
                    <button
                      key={option.label}
                      type="button"
                      disabled={!option.available}
                      onClick={() => setStorage(option.label)}
                      aria-pressed={storage === option.label}
                      className={`rounded-lg border px-4 py-2.5 text-[14px] font-medium transition-colors ${
                        !option.available
                          ? "cursor-not-allowed border-black/10 text-[#b3b8bd] line-through"
                          : storage === option.label
                            ? "border-[#1c64f2] bg-[#eaf0fe] text-[#1c64f2]"
                            : "border-black/10 text-[#3d4348] hover:bg-[#f7f8f8]"
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>

                <h3 className="mt-6 text-[16px] font-semibold text-[#0b0d0e]">
                  Colour: {color}
                </h3>
                <div className="mt-3 flex flex-wrap gap-3">
                  {phone.colors.map((c) => (
                    <button
                      key={c.name}
                      type="button"
                      onClick={() => setColor(c.name)}
                      aria-label={c.name}
                      aria-pressed={color === c.name}
                      style={{ backgroundColor: c.hex }}
                      className={`flex h-11 w-11 items-center justify-center rounded-full border transition-shadow ${
                        color === c.name
                          ? "border-[#1c64f2] shadow-[0_0_0_2px_#1c64f2]"
                          : "border-black/15"
                      }`}
                    >
                      {color === c.name && (
                        <CheckIcon className="h-5 w-5 text-[#0b0d0e]/70" />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </dialog>
    </>
  );
}
