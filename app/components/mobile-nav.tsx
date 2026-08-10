"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import { NAV_LINKS } from "../data/nav";
import { useAuth } from "./auth-provider";

const stroke = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.7,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

function HomeIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-6 w-6" {...stroke}>
      <path d="M4 11.5 12 4.5l8 7" />
      <path d="M6 10.5V20h12v-9.5" />
    </svg>
  );
}

function TagIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-6 w-6" {...stroke}>
      <path d="M12.6 3.5H20v7.4l-8.7 8.7a1.5 1.5 0 0 1-2.1 0l-5.3-5.3a1.5 1.5 0 0 1 0-2.1z" />
      <circle cx="16.2" cy="7.8" r="1.35" />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-6 w-6" {...stroke}>
      <rect x="6.5" y="2.5" width="11" height="19" rx="2.5" />
      <path d="M10.5 18.5h3" />
    </svg>
  );
}

function PersonIcon() {
  return (
    <svg
      viewBox="0 -960 960 960"
      aria-hidden="true"
      className="h-6 w-6"
      fill="currentColor"
    >
      <path d="M367-527q-47-47-47-113t47-113q47-47 113-47t113 47q47 47 47 113t-47 113q-47 47-113 47t-113-47ZM160-240v-32q0-34 17.5-62.5T224-378q62-31 126-46.5T480-440q66 0 130 15.5T736-378q29 15 46.5 43.5T800-272v32q0 33-23.5 56.5T720-160H240q-33 0-56.5-23.5T160-240Zm80 0h480v-32q0-11-5.5-20T700-306q-54-27-109-40.5T480-360q-56 0-111 13.5T260-306q-9 5-14.5 14t-5.5 20v32Zm296.5-343.5Q560-607 560-640t-23.5-56.5Q513-720 480-720t-56.5 23.5Q400-673 400-640t23.5 56.5Q447-560 480-560t56.5-23.5ZM480-640Zm0 400Z" />
    </svg>
  );
}

function MoreIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-6 w-6" {...stroke}>
      <path d="M4 8h16M4 16h16" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-6 w-6" {...stroke}>
      <path d="m6 6 12 12M18 6 6 18" />
    </svg>
  );
}

/**
 * Bottom tab bar for phones. Four destinations plus a sheet carrying the
 * profile and the full navigation.
 */
export function MobileNav() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [open, setOpen] = useState(false);
  const { user } = useAuth();
  const pathname = usePathname();

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

  function openSheet() {
    setOpen(true);
    dialogRef.current?.showModal();
    document.documentElement.style.overflow = "hidden";
  }

  function closeSheet() {
    dialogRef.current?.close();
  }

  const initial = (
    user?.name?.[0] ??
    user?.phone.replace(/\D/g, "").slice(-2, -1) ??
    "U"
  ).toUpperCase();

  const tabs = [
    { label: "Home", href: "/", icon: <HomeIcon />, match: pathname === "/" },
    {
      label: "Sell",
      href: "/sell",
      icon: <TagIcon />,
      match: pathname === "/sell",
    },
    {
      label: "Buy",
      href: "/buy-refurbished",
      icon: <PhoneIcon />,
      match: pathname.startsWith("/buy-refurbished"),
    },
    {
      label: user ? "Account" : "Log in",
      href: user ? "/account" : "/login",
      icon: <PersonIcon />,
      match: pathname.startsWith("/account") || pathname.startsWith("/login"),
    },
  ];

  return (
    <>
      {/* pb-safe keeps the bar clear of the iOS home indicator. */}
      <nav
        aria-label="Primary"
        className="fixed inset-x-0 bottom-0 z-40 border-t border-black/10 bg-white pb-[env(safe-area-inset-bottom)] md:hidden"
      >
        <ul className="mx-auto flex max-w-md items-stretch">
          {tabs.map((tab) => (
            <li key={tab.label} className="flex-1">
              <Link
                href={tab.href}
                aria-current={tab.match ? "page" : undefined}
                className={`flex flex-col items-center gap-1 py-2.5 text-[11px] transition-colors ${
                  tab.match ? "text-[#fb5908]" : "text-[#6b7177]"
                }`}
              >
                {tab.icon}
                {tab.label}
              </Link>
            </li>
          ))}

          <li className="flex-1">
            <button
              type="button"
              onClick={openSheet}
              aria-expanded={open}
              className="flex w-full flex-col items-center gap-1 py-2.5 text-[11px] text-[#6b7177] transition-colors"
            >
              <MoreIcon />
              More
            </button>
          </li>
        </ul>
      </nav>

      <dialog
        ref={dialogRef}
        aria-label="More"
        onClick={(e) => {
          if (e.target === dialogRef.current) closeSheet();
        }}
        className="mb-0 mt-auto w-full max-w-none rounded-t-3xl bg-white p-0 backdrop:bg-[#0b0d0e]/55"
      >
        {open && (
          <div className="p-6 pb-[calc(1.5rem+env(safe-area-inset-bottom))]">
            <div className="flex justify-end">
              <button
                type="button"
                onClick={closeSheet}
                aria-label="Close"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-black/10 text-[#3d4348] transition-colors hover:bg-[#f2f3f4]"
              >
                <CloseIcon />
              </button>
            </div>

            {/* Profile first, menu underneath. */}
            {user ? (
              <Link
                href="/account"
                onClick={closeSheet}
                className="mt-1 flex items-center gap-4 rounded-2xl bg-[#fb5908] p-5 text-white"
              >
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white text-[19px] font-semibold text-[#fb5908]">
                  {initial}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-[17px] font-semibold tracking-tight">
                    {user.name || "Your profile"}
                  </span>
                  <span className="mt-0.5 block truncate text-[13px] text-white/80">
                    {user.phone}
                  </span>
                </span>
                <span aria-hidden="true" className="text-white/80">
                  →
                </span>
              </Link>
            ) : (
              <div className="mt-1 rounded-2xl border border-black/[0.08] bg-[#f7f8f8] p-5">
                <div className="flex items-center gap-4">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#e6e8ea] text-[#8b9197]">
                    <PersonIcon />
                  </span>
                  <div className="min-w-0">
                    <p className="text-[16px] font-semibold text-[#0b0d0e]">
                      Not signed in
                    </p>
                    <p className="mt-0.5 text-[13px] text-[#6b7177]">
                      Sign in to see your exact price.
                    </p>
                  </div>
                </div>
                <Link
                  href="/login"
                  onClick={closeSheet}
                  className="mt-4 block rounded-full bg-[#fb5908] px-6 py-3 text-center text-[15px] font-medium text-white transition-colors hover:bg-[#d24705]"
                >
                  Log in
                </Link>
              </div>
            )}

            <ul className="mt-5 border-t border-black/[0.07] pt-3">
              {NAV_LINKS.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    onClick={closeSheet}
                    className="block rounded-xl px-3 py-3.5 text-[16px] text-[#0b0d0e] transition-colors hover:bg-[#f7f8f8]"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            <a
              href="tel:+918472833473"
              className="mt-4 block rounded-full bg-[#fb5908] px-6 py-3.5 text-center text-[15px] font-medium text-white transition-colors hover:bg-[#d24705]"
            >
              Call +91 84728 33473
            </a>
          </div>
        )}
      </dialog>
    </>
  );
}
