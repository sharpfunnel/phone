import type { Metadata } from "next";
import { Suspense } from "react";

import { LoginForm } from "./login-form";

export const metadata: Metadata = {
  title: "Sign in — Electronics",
  description:
    "Sign in with your mobile number to see your locked selling price and track a pickup.",
};

export default function LoginPage() {
  return (
    <div className="bg-[#f4f5f6] py-20 lg:py-24">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
        {/* useSearchParams needs a boundary so the shell can still prerender. */}
        <Suspense
          fallback={
            <div className="mx-auto h-[420px] w-full max-w-md animate-pulse rounded-2xl bg-white" />
          }
        >
          <LoginForm />
        </Suspense>
      </div>
    </div>
  );
}
