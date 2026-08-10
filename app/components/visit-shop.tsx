// `mapQuery` is what the embedded map searches for, so it must stay in step
// with the address above or customers will be sent to the wrong place.
const SHOP = {
  addressLines: [
    "F-EX The Openbox Store, Lokhra",
    "Beside Sarusajai Stadium, Nalapara",
    "Lokhra Road, NH37, Kamakhya",
    "Guwahati 781029",
  ],
  mapQuery:
    "Fex The Openbox Store, Lokhra Road NH37, Nalapara, Guwahati 781029",
  phone: "+91 84728 33473",
  phoneHref: "tel:+918472833473",
  hours: [
    { days: "Monday to Saturday", time: "10:30 am – 8:00 pm" },
    { days: "Sunday", time: "11:00 am – 6:00 pm" },
  ],
  atCounter: [
    "Sell a phone across the counter and walk out paid",
    "Handle any refurbished unit before you buy it",
    "Collect or drop off a warranty repair",
  ],
};

function PinIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="mt-0.5 h-[18px] w-[18px] shrink-0"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.7}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 21s7-5.5 7-11a7 7 0 1 0-14 0c0 5.5 7 11 7 11z" />
      <circle cx="12" cy="10" r="2.6" />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="mt-0.5 h-[18px] w-[18px] shrink-0"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.7}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7.5V12l3 2" />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="mt-0.5 h-[18px] w-[18px] shrink-0"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.7}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M7 3.5h3l1.5 4-2 1.5a12 12 0 0 0 5.5 5.5l1.5-2 4 1.5v3a2 2 0 0 1-2.2 2A16.5 16.5 0 0 1 5 5.7 2 2 0 0 1 7 3.5z" />
    </svg>
  );
}

export function VisitShop() {
  const directionsHref = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
    SHOP.mapQuery,
  )}`;

  return (
    <section id="visit" className="bg-white py-20 lg:py-24">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
        <div className="relative overflow-hidden rounded-3xl bg-[#fb5908] p-8 lg:p-12">
          {[
            "-right-20 -top-24 h-72 w-72",
            "-bottom-32 -left-16 h-80 w-80",
          ].map((position) => (
            <span
              key={position}
              aria-hidden="true"
              className={`pointer-events-none absolute rounded-full bg-white/[0.09] ${position}`}
            />
          ))}

          <div className="relative flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
            <div>
              <p className="text-[13px] font-medium uppercase tracking-[0.14em] text-white/65">
                Visit us
              </p>
              <h2 className="mt-4 max-w-xl text-[clamp(1.75rem,3.4vw,2.75rem)] font-normal leading-[1.1] tracking-[-0.02em] text-white">
                Come and see the bench yourself
              </h2>
            </div>

            <div className="lg:max-w-sm">
              <p className="text-[15px] leading-[1.6] text-white/80">
                No appointment, no queue ticket. Bring the phone in and watch the
                same 32 checks run in front of you, then leave paid.
              </p>

              {/* Equal halves on a phone so both fit one row; content-width
                  once there is room. */}
              <div className="mt-6 flex gap-3">
                <a
                  href={directionsHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 whitespace-nowrap rounded-full bg-white px-4 py-3 text-center text-[15px] font-medium text-[#fb5908] transition-colors hover:bg-[#ffece0] sm:flex-none sm:px-6"
                >
                  Get directions
                </a>
                <a
                  href={SHOP.phoneHref}
                  className="flex-1 whitespace-nowrap rounded-full border border-white px-4 py-3 text-center text-[15px] font-medium text-white transition-colors hover:bg-white/15 sm:flex-none sm:px-6"
                >
                  Call the shop
                </a>
              </div>
            </div>
          </div>

          <div className="relative mt-10 grid gap-6 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.6fr)]">
            <div className="rounded-2xl bg-white/10 p-7">
              <ul className="space-y-6 text-white">
                <li className="flex gap-3">
                  <PinIcon />
                  <div>
                    <p className="text-[13px] uppercase tracking-[0.1em] text-white/60">
                      Address
                    </p>
                    <address className="mt-1.5 text-[15px] not-italic leading-[1.55]">
                      {SHOP.addressLines.map((line) => (
                        <span key={line} className="block">
                          {line}
                        </span>
                      ))}
                    </address>
                  </div>
                </li>

                <li className="flex gap-3">
                  <ClockIcon />
                  <div>
                    <p className="text-[13px] uppercase tracking-[0.1em] text-white/60">
                      Open
                    </p>
                    <dl className="mt-1.5 space-y-1 text-[15px] leading-[1.55]">
                      {SHOP.hours.map((slot) => (
                        <div key={slot.days}>
                          <dt className="text-white/75">{slot.days}</dt>
                          <dd>{slot.time}</dd>
                        </div>
                      ))}
                    </dl>
                  </div>
                </li>

                <li className="flex gap-3">
                  <PhoneIcon />
                  <div>
                    <p className="text-[13px] uppercase tracking-[0.1em] text-white/60">
                      Phone
                    </p>
                    <a
                      href={SHOP.phoneHref}
                      className="mt-1.5 block text-[15px] hover:underline"
                    >
                      {SHOP.phone}
                    </a>
                  </div>
                </li>
              </ul>

              <div className="mt-7 border-t border-white/20 pt-6">
                <p className="text-[13px] uppercase tracking-[0.1em] text-white/60">
                  At the counter
                </p>
                <ul className="mt-3 space-y-2 text-[14px] leading-snug text-white/85">
                  {SHOP.atCounter.map((item) => (
                    <li key={item} className="flex gap-2">
                      <span aria-hidden="true" className="text-white/50">
                        •
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="min-h-[380px] overflow-hidden rounded-2xl bg-white/10">
              <iframe
                title="Map to our shop"
                src={`https://www.google.com/maps?q=${encodeURIComponent(
                  SHOP.mapQuery,
                )}&output=embed`}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="h-full min-h-[380px] w-full border-0"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
