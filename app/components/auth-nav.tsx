"use client";

import Link from "next/link";

import { useAuth } from "./auth-provider";

export function AuthNav() {
  const { ready, user } = useAuth();

  // Render nothing until storage has been read, so the header does not flash
  // "Log in" at someone who is already signed in.
  if (!ready) return <span className="w-16" aria-hidden />;

  return (
    <Link
      href={user ? "/account" : "/login"}
      className="text-[15px] text-white transition-opacity hover:opacity-75"
    >
      {user ? "My account" : "Log in"}
    </Link>
  );
}
