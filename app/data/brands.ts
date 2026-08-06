export type Brand = {
  slug: string;
  name: string;
  /** Native size of the PNG in /public/brands — never upscaled. */
  width: number;
  height: number;
};

export const BRANDS: Brand[] = [
  { slug: "apple", name: "Apple", width: 128, height: 42 },
  { slug: "samsung", name: "Samsung", width: 144, height: 22 },
  { slug: "xiaomi", name: "Xiaomi", width: 140, height: 92 },
  { slug: "oneplus", name: "OnePlus", width: 156, height: 37 },
  { slug: "vivo", name: "vivo", width: 144, height: 41 },
  { slug: "oppo", name: "OPPO", width: 144, height: 34 },
  { slug: "realme", name: "realme", width: 145, height: 58 },
  { slug: "poco", name: "POCO", width: 140, height: 42 },
  { slug: "motorola", name: "Motorola", width: 35, height: 35 },
  { slug: "google", name: "Google Pixel", width: 142, height: 145 },
  { slug: "nokia", name: "Nokia", width: 144, height: 26 },
  { slug: "lenovo", name: "Lenovo", width: 146, height: 50 },
  { slug: "lg", name: "LG", width: 145, height: 70 },
  { slug: "honor", name: "HONOR", width: 145, height: 30 },
  { slug: "iqoo", name: "iQOO", width: 145, height: 35 },
  { slug: "tecno", name: "TECNO", width: 145, height: 28 },
];

export const BRAND_BY_SLUG = Object.fromEntries(
  BRANDS.map((b) => [b.slug, b]),
) as Record<string, Brand>;

/**
 * Entry price per brand for the "Starting From" grid, with the pastel tile
 * tint. Prices are placeholders — wire them to real inventory before launch.
 */
export const BRAND_ENTRY_PRICES: {
  slug: string;
  price: number;
  tint: string;
}[] = [
  { slug: "apple", price: 13899, tint: "#eceef1" },
  { slug: "google", price: 8799, tint: "#e3edfb" },
  { slug: "samsung", price: 5599, tint: "#dfe6f7" },
  { slug: "oneplus", price: 6599, tint: "#fde7e7" },
  { slug: "xiaomi", price: 3599, tint: "#fdeadd" },
  { slug: "poco", price: 5799, tint: "#fdf3cf" },
  { slug: "vivo", price: 5499, tint: "#e0f0fb" },
  { slug: "oppo", price: 7299, tint: "#e2f3e6" },
  { slug: "motorola", price: 6699, tint: "#fbe3e3" },
  { slug: "realme", price: 6199, tint: "#fdf1d6" },
];
