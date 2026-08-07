export type PhoneModel = {
  name: string;
  brand: string;
  /** Real storage configurations, where we have them. */
  variants?: string[];
};

/** URL segment for a model, e.g. "iPhone 13 Pro" -> "iphone-13-pro". */
export function modelSlug(name: string) {
  return name
    .toLowerCase()
    .replace(/[()]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export function findModel(slug: string) {
  return PHONE_MODELS.find((m) => modelSlug(m.name) === slug);
}

// PLACEHOLDER — used for any model without its own `variants`. Replace with a
// real catalogue before launch; quoting a storage size a phone never shipped in
// is the kind of error a seller notices immediately.
const DEFAULT_VARIANTS = ["64 GB", "128 GB", "256 GB"];

export function variantsFor(model: PhoneModel) {
  return model.variants ?? DEFAULT_VARIANTS;
}

/** Phones only. Extend freely — the search reads straight from this list. */
export const PHONE_MODELS: PhoneModel[] = [
  // Apple
  { name: "iPhone 15 Pro Max", brand: "Apple" },
  { name: "iPhone 15 Pro", brand: "Apple" },
  { name: "iPhone 15 Plus", brand: "Apple" },
  { name: "iPhone 15", brand: "Apple" },
  { name: "iPhone 14 Pro Max", brand: "Apple" },
  { name: "iPhone 14 Pro", brand: "Apple" },
  { name: "iPhone 14 Plus", brand: "Apple" },
  { name: "iPhone 14", brand: "Apple" },
  { name: "iPhone 13 Pro Max", brand: "Apple" },
  { name: "iPhone 13 Pro", brand: "Apple" },
  { name: "iPhone 13 Mini", brand: "Apple" },
  { name: "iPhone 13", brand: "Apple" },
  { name: "iPhone 12 Pro Max", brand: "Apple" },
  { name: "iPhone 12 Pro", brand: "Apple" },
  { name: "iPhone 12 Mini", brand: "Apple" },
  { name: "iPhone 12", brand: "Apple" },
  { name: "iPhone 11 Pro Max", brand: "Apple" },
  { name: "iPhone 11 Pro", brand: "Apple" },
  { name: "iPhone 11", brand: "Apple" },
  { name: "iPhone XR", brand: "Apple" },
  { name: "iPhone XS Max", brand: "Apple" },
  { name: "iPhone XS", brand: "Apple" },
  { name: "iPhone X", brand: "Apple" },
  { name: "iPhone SE (2022)", brand: "Apple" },
  { name: "iPhone SE (2020)", brand: "Apple" },
  { name: "iPhone 8 Plus", brand: "Apple" },
  { name: "iPhone 8", brand: "Apple" },
  { name: "iPhone 7 Plus", brand: "Apple" },
  { name: "iPhone 7", brand: "Apple" },

  // Samsung
  { name: "Galaxy S24 Ultra", brand: "Samsung" },
  { name: "Galaxy S24 Plus", brand: "Samsung" },
  { name: "Galaxy S24", brand: "Samsung" },
  { name: "Galaxy S23 Ultra", brand: "Samsung" },
  { name: "Galaxy S23", brand: "Samsung" },
  { name: "Galaxy S22 Ultra", brand: "Samsung" },
  { name: "Galaxy S22 Plus", brand: "Samsung" },
  { name: "Galaxy S22", brand: "Samsung" },
  { name: "Galaxy S21 FE", brand: "Samsung" },
  { name: "Galaxy S21", brand: "Samsung" },
  { name: "Galaxy S20 FE", brand: "Samsung" },
  { name: "Galaxy Note 20 Ultra", brand: "Samsung" },
  { name: "Galaxy Z Flip 5", brand: "Samsung" },
  { name: "Galaxy Z Fold 5", brand: "Samsung" },
  { name: "Galaxy A55", brand: "Samsung" },
  { name: "Galaxy A54", brand: "Samsung" },
  { name: "Galaxy A34", brand: "Samsung" },
  { name: "Galaxy A14", brand: "Samsung" },
  { name: "Galaxy M34", brand: "Samsung" },

  // Xiaomi
  { name: "Xiaomi 14", brand: "Xiaomi" },
  { name: "Xiaomi 13", brand: "Xiaomi" },
  { name: "Redmi Note 13 Pro", brand: "Xiaomi" },
  { name: "Redmi Note 13", brand: "Xiaomi" },
  { name: "Redmi Note 12 Pro", brand: "Xiaomi" },
  { name: "Redmi Note 12", brand: "Xiaomi" },
  { name: "Redmi Note 11", brand: "Xiaomi" },
  { name: "Redmi 13C", brand: "Xiaomi" },
  { name: "Mi 11X", brand: "Xiaomi" },

  // POCO
  { name: "POCO X6 Pro", brand: "POCO" },
  { name: "POCO X6", brand: "POCO" },
  { name: "POCO M6 Pro", brand: "POCO" },
  { name: "POCO F5", brand: "POCO" },

  // OnePlus
  { name: "OnePlus 12", brand: "OnePlus" },
  { name: "OnePlus 11", brand: "OnePlus" },
  { name: "OnePlus 10 Pro", brand: "OnePlus" },
  { name: "OnePlus 10R", brand: "OnePlus" },
  { name: "OnePlus Nord 3", brand: "OnePlus" },
  { name: "OnePlus Nord CE 3", brand: "OnePlus" },
  { name: "OnePlus Nord CE 2", brand: "OnePlus" },

  // Google
  { name: "Pixel 8 Pro", brand: "Google" },
  { name: "Pixel 8", brand: "Google" },
  { name: "Pixel 7a", brand: "Google" },
  { name: "Pixel 7", brand: "Google" },
  { name: "Pixel 6a", brand: "Google" },

  // vivo
  { name: "vivo V30", brand: "vivo" },
  { name: "vivo V29", brand: "vivo" },
  { name: "vivo V27", brand: "vivo" },
  { name: "vivo Y200", brand: "vivo" },
  { name: "vivo T2", brand: "vivo" },

  // OPPO
  { name: "OPPO Reno 11", brand: "OPPO" },
  { name: "OPPO Reno 10", brand: "OPPO" },
  { name: "OPPO F25 Pro", brand: "OPPO" },
  { name: "OPPO A78", brand: "OPPO" },

  // realme
  { name: "realme 12 Pro", brand: "realme" },
  { name: "realme 11 Pro", brand: "realme" },
  { name: "realme Narzo 60", brand: "realme" },
  { name: "realme C55", brand: "realme" },

  // Others
  { name: "Nothing Phone 2", brand: "Nothing" },
  { name: "Nothing Phone 2a", brand: "Nothing" },
  { name: "Nothing Phone 1", brand: "Nothing" },
  { name: "iQOO Neo 9 Pro", brand: "iQOO" },
  { name: "iQOO Z9", brand: "iQOO" },
  { name: "iQOO 12", brand: "iQOO" },
  { name: "Moto Edge 50", brand: "Motorola" },
  { name: "Moto G84", brand: "Motorola" },
  { name: "Moto G54", brand: "Motorola" },
  { name: "HONOR 90", brand: "HONOR" },
  { name: "HONOR X9b", brand: "HONOR" },
  { name: "Nokia G42", brand: "Nokia" },
  { name: "TECNO Camon 20", brand: "TECNO" },
];
