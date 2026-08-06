export type Grade = "A" | "B" | "C";

export type Phone = {
  name: string;
  storage: string;
  grade: Grade;
  battery: number;
  price: number;
  was: number;
  note: string;
  /** "warn" flags a condition caveat, "good" a selling point. */
  tone: "warn" | "good";
  /** Drop a file in /public/phones and set it here to replace the placeholder. */
  photo?: string;
  /** Shown in the inspection report dialog. */
  rating: number;
  reviews: number;
  color: string;
  colors: { name: string; hex: string }[];
  storageOptions: { label: string; available: boolean }[];
};

export const PHONES: Phone[] = [
  {
    name: "iPhone 12",
    storage: "128 GB",
    grade: "A",
    battery: 91,
    price: 27499,
    was: 49999,
    note: "2-day delivery · 10-day return",
    tone: "good",
    photo: "/phones/iphone-12.jpg",
    rating: 4.5,
    reviews: 5121,
    color: "Purple",
    colors: [
      { name: "Purple", hex: "#b9a3d9" },
      { name: "Black", hex: "#1c1c1e" },
      { name: "White", hex: "#f2f2f0" },
      { name: "Red", hex: "#ba0c2e" },
      { name: "Blue", hex: "#2b4c7e" },
    ],
    storageOptions: [
      { label: "4 GB / 64 GB", available: true },
      { label: "4 GB / 128 GB", available: true },
      { label: "4 GB / 256 GB", available: false },
    ],
  },
  {
    name: "iPhone 13",
    storage: "128 GB",
    grade: "A",
    battery: 94,
    price: 34999,
    was: 61900,
    note: "Sealed accessories",
    tone: "good",
    photo: "/phones/iphone-13.jpg",
    rating: 4.4,
    reviews: 4380,
    color: "Blue",
    colors: [
      { name: "Blue", hex: "#275a92" },
      { name: "Midnight", hex: "#1c1c1e" },
      { name: "Starlight", hex: "#f5f2ea" },
      { name: "Pink", hex: "#f0d3d8" },
      { name: "Green", hex: "#40534a" },
    ],
    storageOptions: [
      { label: "4 GB / 128 GB", available: true },
      { label: "4 GB / 256 GB", available: true },
      { label: "4 GB / 512 GB", available: false },
    ],
  },
  {
    name: "Galaxy S22",
    storage: "128 GB",
    grade: "B",
    battery: 88,
    price: 21999,
    was: 49999,
    note: "Faint frame marks",
    tone: "warn",
    photo: "/phones/galaxy-s22.jpg",
    rating: 4.2,
    reviews: 2914,
    color: "Phantom White",
    colors: [
      { name: "Phantom White", hex: "#f2f2f2" },
      { name: "Phantom Black", hex: "#1b1b1b" },
      { name: "Green", hex: "#4b5842" },
      { name: "Pink Gold", hex: "#e8c5b0" },
    ],
    storageOptions: [
      { label: "8 GB / 128 GB", available: true },
      { label: "8 GB / 256 GB", available: false },
    ],
  },
  {
    name: "OnePlus 11",
    storage: "256 GB",
    grade: "A",
    battery: 95,
    price: 31999,
    was: 56999,
    note: "Original box and bill",
    tone: "good",
    photo: "/phones/oneplus-11.jpg",
    rating: 4.6,
    reviews: 1877,
    color: "Titan Black",
    colors: [
      { name: "Titan Black", hex: "#1b1b1e" },
      { name: "Eternal Green", hex: "#123c33" },
    ],
    storageOptions: [
      { label: "8 GB / 128 GB", available: true },
      { label: "16 GB / 256 GB", available: true },
    ],
  },
  {
    name: "Pixel 7",
    storage: "128 GB",
    grade: "B",
    battery: 89,
    price: 19499,
    was: 43999,
    note: "Screen replaced with OEM panel",
    tone: "warn",
    photo: "/phones/pixel-7.jpg",
    rating: 4.1,
    reviews: 1342,
    color: "Lemongrass",
    colors: [
      { name: "Lemongrass", hex: "#e4ecc4" },
      { name: "Obsidian", hex: "#1b1b1b" },
      { name: "Snow", hex: "#f4f4f2" },
    ],
    storageOptions: [
      { label: "8 GB / 128 GB", available: true },
      { label: "8 GB / 256 GB", available: false },
    ],
  },
  {
    name: "iPhone 11",
    storage: "64 GB",
    grade: "C",
    battery: 84,
    price: 16999,
    was: 43900,
    note: "Visible wear, fully functional",
    tone: "warn",
    photo: "/phones/iphone-11.jpg",
    rating: 4.0,
    reviews: 8206,
    color: "Green",
    colors: [
      { name: "Green", hex: "#b3ded4" },
      { name: "Black", hex: "#1f2020" },
      { name: "White", hex: "#f5f5f0" },
      { name: "Purple", hex: "#d5c8e8" },
      { name: "Yellow", hex: "#ffe680" },
      { name: "Red", hex: "#ba0c2e" },
    ],
    storageOptions: [
      { label: "4 GB / 64 GB", available: true },
      { label: "4 GB / 128 GB", available: true },
      { label: "4 GB / 256 GB", available: false },
    ],
  },
  {
    name: "Galaxy S21 FE",
    storage: "128 GB",
    grade: "B",
    battery: 87,
    price: 17999,
    was: 39999,
    note: "New battery fitted",
    tone: "warn",
    photo: "/phones/galaxy-s21-fe.jpg",
    rating: 4.2,
    reviews: 3055,
    color: "Graphite",
    colors: [
      { name: "Graphite", hex: "#2b2b2e" },
      { name: "White", hex: "#f0f0ee" },
      { name: "Olive", hex: "#6b6b4d" },
      { name: "Lavender", hex: "#d6cfe8" },
    ],
    storageOptions: [
      { label: "6 GB / 128 GB", available: true },
      { label: "8 GB / 256 GB", available: false },
    ],
  },
  {
    name: "Nothing Phone 2",
    storage: "256 GB",
    grade: "A",
    battery: 96,
    price: 26499,
    was: 44999,
    note: "Under 4 months old",
    tone: "good",
    photo: "/phones/nothing-phone-2.jpg",
    rating: 4.5,
    reviews: 962,
    color: "Light Green",
    colors: [
      { name: "Light Green", hex: "#b9d9c2" },
      { name: "White", hex: "#f0f0ee" },
      { name: "Dark Grey", hex: "#3a3a3a" },
    ],
    storageOptions: [
      { label: "8 GB / 128 GB", available: true },
      { label: "12 GB / 256 GB", available: true },
    ],
  },
];

/** How many listings the home page teases before linking to the full page. */
export const HOME_PREVIEW_COUNT = 4;

/** Condition tiers, cheapest/most worn first. */
export const CONDITION_TIERS = ["Best Value", "Fair", "Good", "Superb"] as const;

/** The tier a card's grade maps to when the dialog opens. */
export const GRADE_TIER: Record<Grade, string> = {
  C: "Best Value",
  B: "Good",
  A: "Superb",
};

/** Wear description shown in the report, by grade. */
export const GRADE_WEAR: Record<Grade, string> = {
  A: "Light signs of usage, no deep scratches",
  B: "Visible scratches and moderate signs of usage",
  C: "Multiple visible scratches and major signs of usage",
};
