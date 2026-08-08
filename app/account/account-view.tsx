"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { useAuth } from "../components/auth-provider";
import { inr } from "../data/quote";
import { AddressBook } from "./address-book";

const dateFormat = new Intl.DateTimeFormat("en-IN", {
  day: "numeric",
  month: "short",
  year: "numeric",
});

const SECTIONS = [
  { id: "quotes", label: "Saved quotes" },
  { id: "pickups", label: "Pickups" },
  { id: "addresses", label: "Addresses" },
  { id: "payouts", label: "Payouts" },
] as const;

type SectionId = (typeof SECTIONS)[number]["id"];

/** Hand-drawn so it stays crisp at any size and needs no asset. */
function EmptyBox() {
  return (
    <svg
      viewBox="0 0 120 100"
      aria-hidden="true"
      className="h-[150px] w-[180px]"
      fill="none"
      stroke="#1c64f2"
      strokeWidth={2.2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path
        d="M60 20 C 78 12, 98 18, 102 34"
        strokeDasharray="3 5"
        opacity={0.45}
      />
      <circle cx="60" cy="20" r="2.6" fill="#1c64f2" stroke="none" opacity={0.45} />
      <path d="M98 46 L98 76 L60 92 L60 62 Z" fill="#eaf0fe" fillOpacity={0.7} />
      <path d="M22 46 L22 76 L60 92 L60 62 Z" fill="#ffffff" />
      <path d="M22 46 L60 30 L98 46 L60 62 Z" fill="#eaf0fe" />
    </svg>
  );
}

function EmptyState({
  title,
  body,
  action,
}: {
  title: string;
  body: string;
  action?: { label: string; href: string };
}) {
  return (
    <div className="flex flex-col items-center px-6 py-16 text-center">
      <EmptyBox />
      <p className="mt-6 text-[17px] font-semibold text-[#0b0d0e]">{title}</p>
      <p className="mt-2 max-w-sm text-[14px] leading-[1.6] text-[#6b7177]">
        {body}
      </p>
      {action && (
        <Link
          href={action.href}
          className="mt-6 inline-flex rounded-full bg-[#1c64f2] px-6 py-3 text-[14px] font-medium text-white transition-colors hover:bg-[#1751c9]"
        >
          {action.label}
        </Link>
      )}
    </div>
  );
}

export function AccountView() {
  const { ready, user, quotes, addresses, logout, updateProfile, removeQuote } =
    useAuth();
  const router = useRouter();

  const [section, setSection] = useState<SectionId>("quotes");
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    if (ready && !user) router.replace("/login?next=/account");
  }, [ready, user, router]);

  if (!ready || !user) {
    return (
      <div className="h-[420px] animate-pulse rounded-2xl bg-white" aria-hidden />
    );
  }

  const counts: Record<SectionId, number> = {
    quotes: quotes.length,
    pickups: 0,
    addresses: addresses.length,
    payouts: 0,
  };

  const displayName = user.name || "Your profile";
  const initial = (user.name?.[0] ?? user.phone.replace(/\D/g, "").slice(-2, -1) ?? "U").toUpperCase();

  function startEditing() {
    setName(user?.name ?? "");
    setEmail(user?.email ?? "");
    setEditing(true);
  }

  function saveProfile(e: React.FormEvent) {
    e.preventDefault();
    updateProfile({ name: name.trim() || undefined, email: email.trim() || undefined });
    setEditing(false);
  }

  return (
    <>
      <h1 className="text-[clamp(1.75rem,3vw,2.4rem)] font-normal leading-[1.15] tracking-[-0.02em] text-[#0b0d0e]">
        My profile
      </h1>

      {/* Identity runs full width as a banner rather than sitting in a side
          card, so the working area below gets the whole page. */}
      <div className="relative mt-8 overflow-hidden rounded-2xl bg-[#1c64f2] p-8 text-white">
        {["-right-20 -top-24 h-64 w-64", "-bottom-28 left-1/4 h-56 w-56"].map(
          (position) => (
            <span
              key={position}
              aria-hidden="true"
              className={`pointer-events-none absolute rounded-full bg-white/[0.09] ${position}`}
            />
          ),
        )}

        <div className="relative flex flex-wrap items-center gap-6">
          <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-white text-[24px] font-semibold text-[#1c64f2]">
            {initial}
          </span>

          <div className="min-w-0 flex-1">
            <p className="text-[22px] font-semibold tracking-tight">
              {displayName}
            </p>
            <p className="mt-1 text-[14px] text-white/80">
              {user.phone}
              {user.email ? ` · ${user.email}` : ""}
            </p>
            <p className="mt-0.5 text-[13px] text-white/65">
              Member since {dateFormat.format(new Date(user.since))} · Delhi NCR
            </p>
          </div>

          <div className="flex gap-3">
            <button
              type="button"
              onClick={startEditing}
              className="rounded-full bg-white px-5 py-2.5 text-[14px] font-medium text-[#1c64f2] transition-colors hover:bg-[#e8efff]"
            >
              Edit profile
            </button>
            <button
              type="button"
              onClick={() => {
                logout();
                router.replace("/");
              }}
              className="rounded-full border border-white px-5 py-2.5 text-[14px] font-medium text-white transition-colors hover:bg-white/15"
            >
              Sign out
            </button>
          </div>
        </div>

        {editing && (
          <form
            onSubmit={saveProfile}
            className="relative mt-7 grid gap-4 border-t border-white/20 pt-6 sm:grid-cols-[1fr_1fr_auto]"
          >
            <div>
              <label htmlFor="name" className="block text-[13px] text-white/75">
                Name
              </label>
              <input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
                className="mt-1.5 w-full rounded-xl border border-white/45 bg-white/10 px-4 py-2.5 text-[14px] text-white outline-none placeholder:text-white/55 focus:border-white"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-[13px] text-white/75">
                Email for receipts
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="mt-1.5 w-full rounded-xl border border-white/45 bg-white/10 px-4 py-2.5 text-[14px] text-white outline-none placeholder:text-white/55 focus:border-white"
              />
            </div>
            {/* Centre the pair against each other, then drop the whole group
                to the bottom of the row so it lines up with the inputs. */}
            <div className="flex items-center gap-4 sm:self-end sm:pb-0.5">
              <button
                type="submit"
                className="rounded-full bg-white px-5 py-2.5 text-[14px] font-medium text-[#1c64f2] transition-colors hover:bg-[#e8efff]"
              >
                Save
              </button>
              <button
                type="button"
                onClick={() => setEditing(false)}
                className="text-[14px] text-white/80 hover:text-white"
              >
                Cancel
              </button>
            </div>
          </form>
        )}
      </div>

      {!user.email && !editing && (
        <button
          type="button"
          onClick={startEditing}
          className="mt-3 flex w-full items-center justify-between gap-4 rounded-xl border border-[#c2410c]/20 bg-[#fff5ed] px-5 py-3.5 text-left"
        >
          <span className="text-[14px] font-medium text-[#9a3412]">
            No email on file. Add one to get receipts and warranty reminders.
          </span>
          <span aria-hidden="true" className="text-[#9a3412]">
            →
          </span>
        </button>
      )}

      <div className="mt-6 grid gap-6 lg:grid-cols-[240px_minmax(0,1fr)]">
        {/* Vertical rail instead of the reference's pill tabs — it leaves room
            for sections to be added without wrapping. */}
        {/* min-w-0 on both grid children: without it a grid item defaults to
            min-width:auto and the tab row pushes the whole page wider than the
            viewport on a phone. */}
        <nav aria-label="Account sections" className="min-w-0">
          <ul className="flex flex-wrap gap-2 rounded-2xl border border-black/[0.08] bg-white p-2 lg:flex-col lg:flex-nowrap">
            {SECTIONS.map((item) => {
              const active = section === item.id;
              return (
                // Content-width on mobile so labels never overlap; full width
                // once the rail goes vertical.
                <li key={item.id} className="lg:w-full">
                  <button
                    type="button"
                    onClick={() => setSection(item.id)}
                    aria-current={active ? "page" : undefined}
                    className={`w-full whitespace-nowrap rounded-xl px-4 py-3 text-center text-[15px] transition-colors lg:text-left ${
                      active
                        ? "bg-[#eaf0fe] font-medium text-[#1c64f2]"
                        : "text-[#3d4348] hover:bg-[#f7f8f8]"
                    }`}
                  >
                    {item.label}
                    {counts[item.id] > 0 && (
                      <span className="ml-2 rounded-full bg-[#1c64f2] px-2 py-0.5 text-[11px] font-medium text-white">
                        {counts[item.id]}
                      </span>
                    )}
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

        <section className="min-w-0 min-h-[380px] rounded-2xl border border-black/[0.08] bg-white">
          {section === "quotes" &&
            (quotes.length === 0 ? (
              <EmptyState
                title="No quotes yet"
                body="Find your phone, answer five questions, and your price is held for 7 days."
                action={{ label: "Get a quote", href: "/#sell" }}
              />
            ) : (
              <div className="p-8">
                <h2 className="text-[18px] font-semibold tracking-tight text-[#0b0d0e]">
                  Saved quotes
                </h2>
                <p className="mt-1 text-[14px] text-[#6b7177]">
                  Each one is held for 7 days from the date it was quoted.
                </p>

                <ul className="mt-6 divide-y divide-black/[0.07]">
                  {quotes.map((quote) => (
                    <li
                      key={`${quote.model}-${quote.variant}-${quote.at}`}
                      className="flex flex-wrap items-center justify-between gap-4 py-4 first:pt-0"
                    >
                      <div>
                        <p className="text-[15px] font-medium text-[#0b0d0e]">
                          {quote.model}
                        </p>
                        <p className="mt-0.5 text-[13px] text-[#6b7177]">
                          {quote.variant} · quoted{" "}
                          {dateFormat.format(new Date(quote.at))}
                        </p>
                      </div>

                      <div className="flex items-center gap-5">
                        <p className="text-[17px] font-semibold text-[#1c64f2]">
                          ₹{inr.format(quote.amount)}
                        </p>
                        <button
                          type="button"
                          onClick={() =>
                            removeQuote(quote.model, quote.variant)
                          }
                          aria-label={`Remove the quote for ${quote.model} ${quote.variant}`}
                          className="rounded-full p-1.5 text-[#9aa0a6] transition-colors hover:bg-[#f2f3f4] hover:text-[#c2410c]"
                        >
                          <svg
                            viewBox="0 0 24 24"
                            aria-hidden="true"
                            className="h-4 w-4"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth={1.9}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M4 7h16M10 11v6M14 11v6" />
                            <path d="M6 7l1 12.5a1.5 1.5 0 0 0 1.5 1.5h7a1.5 1.5 0 0 0 1.5-1.5L18 7" />
                            <path d="M9.5 7V4.8a.8.8 0 0 1 .8-.8h3.4a.8.8 0 0 1 .8.8V7" />
                          </svg>
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

          {section === "pickups" && (
            <EmptyState
              title="No pickups booked"
              body="Once you accept a quote, your two-hour pickup slot and live agent tracking show up here."
              action={{ label: "Get a quote", href: "/#sell" }}
            />
          )}

          {section === "addresses" && <AddressBook />}

          {section === "payouts" && (
            <EmptyState
              title="No payouts yet"
              body="Every UPI or bank transfer we make to you will be listed here with its receipt."
            />
          )}
        </section>
      </div>
    </>
  );
}
