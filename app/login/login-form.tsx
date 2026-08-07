"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import { useAuth } from "../components/auth-provider";

export function LoginForm() {
  const { ready, user, pendingPhone, requestOtp, verifyOtp } = useAuth();
  const router = useRouter();
  const params = useSearchParams();
  const next = params.get("next") ?? "/account";

  const [phone, setPhone] = useState("");
  const [code, setCode] = useState("");
  const [demoCode, setDemoCode] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const codeRef = useRef<HTMLInputElement>(null);

  // Already signed in? Nothing to do here.
  useEffect(() => {
    if (ready && user) router.replace(next);
  }, [ready, user, next, router]);

  const digits = phone.replace(/\D/g, "");
  const phoneValid = digits.length === 10;

  function sendOtp(e: React.FormEvent) {
    e.preventDefault();
    if (!phoneValid) {
      setError("Enter the 10 digits of your mobile number.");
      return;
    }
    setError(null);
    setDemoCode(requestOtp(`+91 ${digits}`));
    setTimeout(() => codeRef.current?.focus(), 0);
  }

  function checkOtp(e: React.FormEvent) {
    e.preventDefault();
    if (!verifyOtp(code.trim())) {
      setError("That code does not match. Check it and try again.");
      return;
    }
    setError(null);
    router.replace(next);
  }

  return (
    <div className="mx-auto w-full max-w-md rounded-2xl border border-black/[0.08] bg-white p-8">
      {!pendingPhone ? (
        <form onSubmit={sendOtp} noValidate>
          <h1 className="text-[26px] font-semibold tracking-tight text-[#0b0d0e]">
            Sign in to see your price
          </h1>
          <p className="mt-3 text-[15px] leading-[1.6] text-[#5b6167]">
            We use your number to lock the quote and arrange the pickup. No
            password to remember.
          </p>

          <label
            htmlFor="phone"
            className="mt-7 block text-[14px] font-medium text-[#0b0d0e]"
          >
            Mobile number
          </label>
          <div className="mt-2 flex items-center gap-2 rounded-xl border border-black/10 px-4 py-3.5 focus-within:border-[#1c64f2]">
            <span className="text-[15px] text-[#6b7177]">+91</span>
            <input
              id="phone"
              name="phone"
              type="tel"
              inputMode="numeric"
              autoComplete="tel-national"
              maxLength={11}
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="98100 44119"
              className="w-full bg-transparent text-[15px] text-[#0b0d0e] outline-none placeholder:text-[#9aa0a6]"
            />
          </div>

          {error && (
            <p role="alert" className="mt-3 text-[13px] text-[#c2410c]">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={!phoneValid}
            className="mt-6 w-full rounded-full bg-[#1c64f2] px-8 py-3.5 text-[15px] font-medium text-white transition-colors hover:bg-[#1751c9] disabled:cursor-not-allowed disabled:bg-[#e6e8ea] disabled:text-[#9aa0a6]"
          >
            Send me a code
          </button>

          <p className="mt-5 text-[12px] leading-snug text-[#8b9197]">
            By continuing you agree to our{" "}
            <Link href="#terms" className="underline">
              terms
            </Link>{" "}
            and{" "}
            <Link href="#privacy" className="underline">
              privacy policy
            </Link>
            .
          </p>
        </form>
      ) : (
        <form onSubmit={checkOtp} noValidate>
          <h1 className="text-[26px] font-semibold tracking-tight text-[#0b0d0e]">
            Enter the code
          </h1>
          <p className="mt-3 text-[15px] leading-[1.6] text-[#5b6167]">
            Sent to {pendingPhone}.
          </p>

          {demoCode && (
            <p className="mt-5 rounded-xl border border-[#c2410c]/25 bg-[#fff5ed] px-4 py-3 text-[13px] leading-snug text-[#9a3412]">
              <strong className="font-semibold">Demo only:</strong> no SMS is
              sent. Your code is{" "}
              <span className="font-mono font-semibold">{demoCode}</span>.
            </p>
          )}

          <label
            htmlFor="otp"
            className="mt-6 block text-[14px] font-medium text-[#0b0d0e]"
          >
            6-digit code
          </label>
          <input
            ref={codeRef}
            id="otp"
            name="otp"
            type="text"
            inputMode="numeric"
            autoComplete="one-time-code"
            maxLength={6}
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="······"
            className="mt-2 w-full rounded-xl border border-black/10 px-4 py-3.5 text-center font-mono text-[20px] tracking-[0.4em] text-[#0b0d0e] outline-none focus:border-[#1c64f2]"
          />

          {error && (
            <p role="alert" className="mt-3 text-[13px] text-[#c2410c]">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={code.replace(/\D/g, "").length !== 6}
            className="mt-6 w-full rounded-full bg-[#1c64f2] px-8 py-3.5 text-[15px] font-medium text-white transition-colors hover:bg-[#1751c9] disabled:cursor-not-allowed disabled:bg-[#e6e8ea] disabled:text-[#9aa0a6]"
          >
            Verify and continue
          </button>
        </form>
      )}
    </div>
  );
}
