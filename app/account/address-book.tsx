"use client";

import { useState } from "react";

import { useAuth } from "../components/auth-provider";

const LABELS = ["Home", "Work", "Other"];

const EMPTY = { label: "Home", line1: "", line2: "", city: "", pincode: "" };

export function AddressBook() {
  const { addresses, addAddress, removeAddress, setDefaultAddress } = useAuth();
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState(EMPTY);
  const [error, setError] = useState<string | null>(null);

  function set<K extends keyof typeof EMPTY>(key: K, value: string) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function submit(e: React.FormEvent) {
    e.preventDefault();

    if (!form.line1.trim() || !form.city.trim()) {
      setError("Add at least the house or building, and the city.");
      return;
    }
    if (!/^\d{6}$/.test(form.pincode.trim())) {
      setError("A PIN code is six digits.");
      return;
    }

    addAddress({
      label: form.label,
      line1: form.line1.trim(),
      line2: form.line2.trim() || undefined,
      city: form.city.trim(),
      pincode: form.pincode.trim(),
    });
    setForm(EMPTY);
    setError(null);
    setOpen(false);
  }

  const field =
    "mt-1.5 w-full rounded-xl border border-black/10 px-4 py-2.5 text-[14px] text-[#0b0d0e] outline-none placeholder:text-[#9aa0a6] focus:border-[#1c64f2]";
  const labelClass = "block text-[13px] font-medium text-[#3d4348]";

  return (
    <div className="p-8">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h2 className="text-[18px] font-semibold tracking-tight text-[#0b0d0e]">
            Pickup addresses
          </h2>
          <p className="mt-1 text-[14px] text-[#6b7177]">
            We collect from the default address unless you pick another at
            checkout.
          </p>
        </div>

        {!open && (
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="shrink-0 rounded-full bg-[#1c64f2] px-5 py-2.5 text-[14px] font-medium text-white transition-colors hover:bg-[#1751c9]"
          >
            Add address
          </button>
        )}
      </div>

      {open && (
        <form
          onSubmit={submit}
          className="mt-6 rounded-xl border border-black/[0.08] bg-[#f7f8f8] p-6"
          noValidate
        >
          <fieldset>
            <legend className={labelClass}>Label</legend>
            <div className="mt-2 flex flex-wrap gap-2">
              {LABELS.map((label) => (
                <button
                  key={label}
                  type="button"
                  onClick={() => set("label", label)}
                  aria-pressed={form.label === label}
                  className={`rounded-full border px-4 py-1.5 text-[13px] transition-colors ${
                    form.label === label
                      ? "border-[#1c64f2] bg-[#eaf0fe] font-medium text-[#1c64f2]"
                      : "border-black/10 bg-white text-[#3d4348] hover:bg-[#f2f3f4]"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </fieldset>

          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label htmlFor="line1" className={labelClass}>
                Flat, house or building
              </label>
              <input
                id="line1"
                value={form.line1}
                onChange={(e) => set("line1", e.target.value)}
                placeholder="Flat 402, Sunrise Apartments"
                className={field}
              />
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="line2" className={labelClass}>
                Area, street or landmark{" "}
                <span className="font-normal text-[#8b9197]">(optional)</span>
              </label>
              <input
                id="line2"
                value={form.line2}
                onChange={(e) => set("line2", e.target.value)}
                placeholder="Sector 12, near the metro station"
                className={field}
              />
            </div>

            <div>
              <label htmlFor="city" className={labelClass}>
                City
              </label>
              <input
                id="city"
                value={form.city}
                onChange={(e) => set("city", e.target.value)}
                placeholder="New Delhi"
                className={field}
              />
            </div>

            <div>
              <label htmlFor="pincode" className={labelClass}>
                PIN code
              </label>
              <input
                id="pincode"
                inputMode="numeric"
                maxLength={6}
                value={form.pincode}
                onChange={(e) =>
                  set("pincode", e.target.value.replace(/\D/g, ""))
                }
                placeholder="110019"
                className={field}
              />
            </div>
          </div>

          {error && (
            <p role="alert" className="mt-4 text-[13px] text-[#c2410c]">
              {error}
            </p>
          )}

          <div className="mt-6 flex flex-wrap items-center gap-4">
            <button
              type="submit"
              className="rounded-full bg-[#1c64f2] px-6 py-2.5 text-[14px] font-medium text-white transition-colors hover:bg-[#1751c9]"
            >
              Save address
            </button>
            <button
              type="button"
              onClick={() => {
                setOpen(false);
                setError(null);
              }}
              className="text-[14px] text-[#1c64f2] hover:underline"
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      {addresses.length === 0 ? (
        <p className="mt-8 rounded-xl border border-dashed border-black/15 px-6 py-8 text-center text-[14px] text-[#6b7177]">
          No addresses saved yet. Add one and pickups take two taps.
        </p>
      ) : (
        <ul className="mt-7 grid gap-4 sm:grid-cols-2">
          {addresses.map((address) => (
            <li
              key={address.id}
              className={`rounded-xl border p-5 ${
                address.isDefault
                  ? "border-[#1c64f2] bg-[#f7faff]"
                  : "border-black/[0.08]"
              }`}
            >
              <div className="flex items-center gap-2">
                <span className="text-[15px] font-medium text-[#0b0d0e]">
                  {address.label}
                </span>
                {address.isDefault && (
                  <span className="rounded-full bg-[#eaf0fe] px-2.5 py-0.5 text-[11px] font-medium text-[#1c64f2]">
                    Default
                  </span>
                )}
              </div>

              <address className="mt-2 text-[14px] not-italic leading-[1.6] text-[#5b6167]">
                {address.line1}
                {address.line2 && (
                  <>
                    <br />
                    {address.line2}
                  </>
                )}
                <br />
                {address.city} {address.pincode}
              </address>

              <div className="mt-4 flex items-center gap-4 text-[13px]">
                {!address.isDefault && (
                  <button
                    type="button"
                    onClick={() => setDefaultAddress(address.id)}
                    className="font-medium text-[#1c64f2] hover:underline"
                  >
                    Make default
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => removeAddress(address.id)}
                  className="text-[#6b7177] hover:text-[#c2410c]"
                >
                  Remove
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
