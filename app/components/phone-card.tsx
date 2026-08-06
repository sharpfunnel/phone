import Image from "next/image";

import type { Phone } from "../data/phones";
import { InspectionReport } from "./inspection-report";

const inr = new Intl.NumberFormat("en-IN");

function PhotoIcon() {
  return (
    <svg
      viewBox="0 -960 960 960"
      fill="currentColor"
      aria-hidden="true"
      className="h-6 w-6 text-[#b3b8bd]"
    >
      <path d="M212-172q-24.75 0-42.37-17.63Q152-207.25 152-232v-496q0-24.75 17.63-42.38Q187.25-788 212-788h496q24.75 0 42.38 17.62Q768-752.75 768-728v496q0 24.75-17.62 42.37Q732.75-172 708-172H212Zm0-60h496v-496H212v496Zm58-88h384L536-476 434-344l-70-92-94 116Zm-58 88v-496 496Z" />
    </svg>
  );
}

export function PhoneCard({ phone }: { phone: Phone }) {
  return (
    <li className="flex flex-col rounded-2xl border border-black/[0.07] bg-white p-3">
      <div className="relative aspect-square overflow-hidden rounded-xl">
        {phone.photo ? (
          <Image
            src={phone.photo}
            alt={`${phone.name} ${phone.storage}`}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 300px"
            className="object-cover"
          />
        ) : (
          // Placeholder slot. Set `photo` on the entry to swap in a real bench
          // photograph — the frame and sizing stay identical.
          <div className="flex h-full flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-black/15 bg-[#f5f6f7] px-4 text-center">
            <PhotoIcon />
            <p className="text-[12px] text-[#6b7177]">Drop the phone photo</p>
            <p className="text-[11px] text-[#8b9197]">
              or <span className="underline">browse files</span>
            </p>
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col px-1 pb-1 pt-4">
        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded-full bg-[#eaf0fe] px-2.5 py-1 text-[11px] font-medium text-[#1c64f2]">
            Grade {phone.grade}
          </span>
          <span className="rounded-full bg-[#f2f3f4] px-2.5 py-1 text-[11px] font-medium text-[#5b6167]">
            Battery {phone.battery}%
          </span>
        </div>

        <h3 className="mt-3 text-[15px] font-semibold tracking-tight text-[#0b0d0e]">
          {phone.name} · {phone.storage}
        </h3>

        <div className="mt-1.5 flex items-baseline gap-2">
          <span className="text-[17px] font-semibold text-[#c2410c]">
            ₹{inr.format(phone.price)}
          </span>
          <span className="text-[13px] text-[#9aa0a6] line-through">
            ₹{inr.format(phone.was)}
          </span>
        </div>

        <p
          className={`mt-2 text-[12px] leading-snug ${
            phone.tone === "warn" ? "text-[#b45309]" : "text-[#6b7177]"
          }`}
        >
          {phone.note}
        </p>

        <InspectionReport phone={phone} />
      </div>
    </li>
  );
}

export function PhoneGrid({ phones }: { phones: Phone[] }) {
  return (
    <ul className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
      {phones.map((phone) => (
        <PhoneCard key={`${phone.name}-${phone.storage}`} phone={phone} />
      ))}
    </ul>
  );
}
