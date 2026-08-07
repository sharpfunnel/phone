import { modelSlug, type PhoneModel } from "./models";

/**
 * PLACEHOLDER PRICING — every number below is invented for the prototype.
 * Replace with real buyback rates before launch; these figures are shown to
 * sellers as what you will pay them.
 */
const BASE_PRICE: Record<string, number> = {
  "iphone-15-pro-max": 92000,
  "iphone-15-pro": 82000,
  "iphone-15-plus": 68000,
  "iphone-15": 60000,
  "iphone-14-pro-max": 74000,
  "iphone-14-pro": 66000,
  "iphone-14-plus": 52000,
  "iphone-14": 46000,
  "iphone-13-pro-max": 58000,
  "iphone-13-pro": 50000,
  "iphone-13-mini": 32000,
  "iphone-13": 38000,
  "iphone-12-pro-max": 42000,
  "iphone-12-pro": 36000,
  "iphone-12-mini": 22000,
  "iphone-12": 28000,
  "iphone-11-pro-max": 30000,
  "iphone-11-pro": 26000,
  "iphone-11": 19000,
  "iphone-xr": 14000,
  "iphone-xs-max": 16000,
  "iphone-xs": 13000,
  "iphone-x": 11000,
  "iphone-se-2022": 13000,
  "iphone-se-2020": 8000,
  "iphone-8-plus": 8500,
  "iphone-8": 7500,
  "iphone-7-plus": 5500,
  "iphone-7": 4500,

  "galaxy-s24-ultra": 78000,
  "galaxy-s24-plus": 58000,
  "galaxy-s24": 48000,
  "galaxy-s23-ultra": 58000,
  "galaxy-s23": 36000,
  "galaxy-s22-ultra": 40000,
  "galaxy-s22-plus": 30000,
  "galaxy-s22": 24000,
  "galaxy-s21-fe": 16000,
  "galaxy-s21": 18000,
  "galaxy-s20-fe": 11000,
  "galaxy-note-20-ultra": 22000,
  "galaxy-z-flip-5": 42000,
  "galaxy-z-fold-5": 78000,
  "galaxy-a55": 22000,
  "galaxy-a54": 17000,
  "galaxy-a34": 13000,
  "galaxy-a14": 8000,
  "galaxy-m34": 9500,

  "xiaomi-14": 42000,
  "xiaomi-13": 30000,
  "redmi-note-13-pro": 15000,
  "redmi-note-13": 11000,
  "redmi-note-12-pro": 12000,
  "redmi-note-12": 8500,
  "redmi-note-11": 6500,
  "redmi-13c": 5500,
  "mi-11x": 9000,

  "poco-x6-pro": 15000,
  "poco-x6": 12000,
  "poco-m6-pro": 7500,
  "poco-f5": 14000,

  "oneplus-12": 46000,
  "oneplus-11": 32000,
  "oneplus-10-pro": 24000,
  "oneplus-10r": 15000,
  "oneplus-nord-3": 16000,
  "oneplus-nord-ce-3": 12000,
  "oneplus-nord-ce-2": 9000,

  "pixel-8-pro": 52000,
  "pixel-8": 38000,
  "pixel-7a": 20000,
  "pixel-7": 19500,
  "pixel-6a": 12000,

  "vivo-v30": 22000,
  "vivo-v29": 18000,
  "vivo-v27": 14000,
  "vivo-y200": 11000,
  "vivo-t2": 9000,

  "oppo-reno-11": 19000,
  "oppo-reno-10": 15000,
  "oppo-f25-pro": 14000,
  "oppo-a78": 8500,

  "realme-12-pro": 15000,
  "realme-11-pro": 12000,
  "realme-narzo-60": 9000,
  "realme-c55": 6000,

  "nothing-phone-2": 26000,
  "nothing-phone-2a": 15000,
  "nothing-phone-1": 12000,
  "iqoo-neo-9-pro": 22000,
  "iqoo-z9": 12000,
  "iqoo-12": 34000,
  "moto-edge-50": 18000,
  "moto-g84": 10000,
  "moto-g54": 8000,
  "honor-90": 18000,
  "honor-x9b": 12000,
  "nokia-g42": 7000,
  "tecno-camon-20": 6500,
};

const FALLBACK_BASE = 8000;

/** Larger storage is worth more; multipliers applied to the model's base. */
const VARIANT_MULTIPLIER: Record<string, number> = {
  "32 GB": 0.88,
  "64 GB": 1,
  "128 GB": 1.12,
  "256 GB": 1.26,
  "512 GB": 1.42,
  "1 TB": 1.6,
};

export type Question = {
  id: string;
  step: string;
  title: string;
  hint: string;
  options: { label: string; deduction: number }[];
};

/** `deduction` is the fraction knocked off the running estimate. */
export const QUESTIONS: Question[] = [
  {
    id: "age",
    step: "Age",
    title: "How old is your device?",
    hint: "Choose the closest option.",
    options: [
      { label: "0 – 3 months", deduction: 0 },
      { label: "3 – 6 months", deduction: 0.05 },
      { label: "6 – 11 months", deduction: 0.1 },
      { label: "Over 11 months", deduction: 0.18 },
    ],
  },
  {
    id: "screen",
    step: "Screen",
    title: "Is there any screen issue?",
    hint: "Cracks, scratches, touch problems, lines, spots, dead pixels.",
    options: [
      { label: "No", deduction: 0 },
      { label: "Yes", deduction: 0.22 },
    ],
  },
  {
    id: "body",
    step: "Body",
    title: "Any body damage?",
    hint: "Dents, deep scratches, a loose frame, heavy wear.",
    options: [
      { label: "No", deduction: 0 },
      { label: "Yes", deduction: 0.12 },
    ],
  },
  {
    id: "functional",
    step: "Functional",
    title: "Any other problems?",
    hint: "Buttons, speaker, mic, camera, charging, Wi-Fi, Face ID or Touch ID.",
    options: [
      { label: "No", deduction: 0 },
      { label: "Yes", deduction: 0.2 },
    ],
  },
  {
    id: "accessories",
    step: "Accessories",
    title: "What do you still have?",
    hint: "The original box and bill hold their value.",
    options: [
      { label: "Box and bill", deduction: 0 },
      { label: "Box only", deduction: 0.02 },
      { label: "Phone only", deduction: 0.05 },
    ],
  },
];

export function basePriceFor(model: PhoneModel) {
  return BASE_PRICE[modelSlug(model.name)] ?? FALLBACK_BASE;
}

/** Best case for a variant, before any condition deductions. */
export function maxPriceFor(model: PhoneModel, variant: string) {
  const multiplier = VARIANT_MULTIPLIER[variant] ?? 1;
  return Math.round((basePriceFor(model) * multiplier) / 50) * 50;
}

/** Running estimate given whatever has been answered so far. */
export function estimateFor(
  model: PhoneModel,
  variant: string,
  answers: Record<string, string>,
) {
  let price = maxPriceFor(model, variant);

  for (const question of QUESTIONS) {
    const chosen = answers[question.id];
    if (!chosen) continue;
    const option = question.options.find((o) => o.label === chosen);
    if (option) price *= 1 - option.deduction;
  }

  return Math.round(price / 50) * 50;
}

export const inr = new Intl.NumberFormat("en-IN");
