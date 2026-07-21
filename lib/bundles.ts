export const BUNDLES = [
  { id: "10-sachets", label: "10 × 33g Sachets", badge: "Trial pack", price: null },
  { id: "20-sachets", label: "20 × 33g Sachets", badge: "Home pack", price: null },
  { id: "50-sachets", label: "50 × 33g Sachets", badge: "Family pack", price: null },
  { id: "100-sachets", label: "100 × 33g Sachets", badge: "Value pack", price: null },
  { id: "250g-pack", label: "250g Pack", badge: "Classic pack", price: null },
] as const;

export type BundleLabel = (typeof BUNDLES)[number]["label"];

export const BUNDLE_LABELS = BUNDLES.map((bundle) => bundle.label);

// Prices intentionally remain null until the owner confirms the selling price.
// Keep all future price changes in this file.
