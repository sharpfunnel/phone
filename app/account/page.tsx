import type { Metadata } from "next";

import { AccountView } from "./account-view";

export const metadata: Metadata = {
  title: "Your account — Electronics",
  description: "Your saved quotes, pickups and account details.",
};

export default function AccountPage() {
  return (
    <div className="bg-[#f4f5f6] py-16 lg:py-20">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
        <AccountView />
      </div>
    </div>
  );
}
