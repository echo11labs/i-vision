// ============================================================================
// SUNGLASSES FIXTURE DATA — I-VISION SUN COLLECTION
// ============================================================================

export type SunglassesShape =
  | "all"
  | "aviator"
  | "rectangular"
  | "round"
  | "cat-eye"
  | "square";

export type SunglassesColor =
  | "all"
  | "Polished Silver & Champagne"
  | "Brushed Titanium"
  | "Dark Tortoise"
  | "Matte Black"
  | "Polished Onyx"
  | "Champagne Gold"
  | "Crystal Smoke";

export type SunglassesSortOption = "featured" | "name-asc" | "name-desc";

export interface SunglassesProduct {
  slug: string;
  name: string;
  shape: "aviator" | "rectangular" | "round" | "cat-eye" | "square";
  color: string;
  lensColor: string;
  lensType: string;
  measurements: string;
  image: string;
  modelImage: string;
  description: string;
  details: string[];
}

export const SUNGLASSES_PRODUCTS: SunglassesProduct[] = [
  {
    slug: "the-alpinist",
    name: "The Alpinist",
    shape: "round",
    color: "Polished Silver & Champagne",
    lensColor: "Glacier Smoke",
    lensType: "High-Altitude Polarized UV400",
    measurements: "49 — 21 — 145 mm",
    image: "/images/sunglasses/the-alpinist-frame.jpg",
    modelImage: "/images/sunglasses/the-alpinist.png",
    description:
      "Engineered for high-altitude clarity and intense alpine sunlight. Calibrated circular titanium-wire rims sculpted with an elevated arched bridge and glare-cutting polarized optics.",
    details: [
      "High-tensile aerospace silver alloy with champagne accents",
      "Category 3 alpine high-contrast polarized filters",
      "Elevated arched keyhole bridge contour",
      "100% UVA/UVB reflection coating with anti-glare backing",
    ],
  },
  {
    slug: "the-pilot-sun",
    name: "The Pilot Sun",
    shape: "aviator",
    color: "Brushed Titanium",
    lensColor: "Smoke Gradient",
    lensType: "Polarized UV400",
    measurements: "58 — 15 — 145 mm",
    image: "/images/sunglasses/the-pilot-sun.jpg",
    modelImage: "/images/sunglasses/model-the-pilot.jpg",
    description:
      "An aerospace-grade titanium aviator featuring calibrated double-bridge architecture and precision gradient lenses for full daylight clarity.",
    details: [
      "Japanese beta-titanium construction",
      "Category 3 polarized optics",
      "Custom silicone temple cushions",
    ],
  },
  {
    slug: "the-riviera",
    name: "The Riviera",
    shape: "rectangular",
    color: "Dark Tortoise",
    lensColor: "Warm Bronze",
    lensType: "CR-39 Polarized",
    measurements: "52 — 20 — 145 mm",
    image: "/images/sunglasses/the-riviera-frame.jpg",
    modelImage: "/images/sunglasses/model-the-riviera.jpg",
    description:
      "Substantial rectangular acetate frame hand-beveled in northern Italy with high-contrast bronze lenses engineered for coastal horizons.",
    details: [
      "Mazzucchelli 8mm custom acetate",
      "High-contrast bronze polarizing filter",
      "Seven-barrel reinforced hinges",
    ],
  },
  {
    slug: "the-solstice",
    name: "The Solstice",
    shape: "round",
    color: "Matte Black",
    lensColor: "Emerald Green",
    lensType: "Mineral Glass Polarized",
    measurements: "50 — 21 — 145 mm",
    image: "/images/sunglasses/the-solstice.jpg",
    modelImage: "/images/sunglasses/model-the-solstice.jpg",
    description:
      "A perfectly balanced circular silhouette carved with subtle coin-edge filigree, fitted with mineral glass lenses in vintage emerald green.",
    details: [
      "Matte black ion-plated stainless steel",
      "Scratch-resistant mineral glass",
      "Weightless adjustable titanium nose pads",
    ],
  },
  {
    slug: "the-siren",
    name: "The Siren",
    shape: "cat-eye",
    color: "Polished Onyx",
    lensColor: "Midnight Black",
    lensType: "High-Definition UV400",
    measurements: "53 — 18 — 140 mm",
    image: "/images/sunglasses/the-siren.jpg",
    modelImage: "/images/sunglasses/model-the-siren.jpg",
    description:
      "A sculpted, architectural cat-eye with razor-sharp geometric facets and deep midnight black lenses that command quiet authority.",
    details: [
      "Hand-polished deep black acetate",
      "Sharply beveled upper browline",
      "Anti-reflective inner lens coating",
    ],
  },
  {
    slug: "the-vanguard",
    name: "The Vanguard",
    shape: "square",
    color: "Champagne Gold",
    lensColor: "Sepia Gradient",
    lensType: "Gradient UV400",
    measurements: "54 — 19 — 145 mm",
    image: "/images/sunglasses/the-vanguard.jpg",
    modelImage: "/images/sunglasses/model-the-vanguard.jpg",
    description:
      "Geometric navigator frame cast in champagne gold with a linear brow bar and gradient sepia lenses calibrated for golden hour light.",
    details: [
      "Dual-tone brushed champagne gold",
      "Graduated sepia tint for changing light",
      "Micro-engraved hinge detail",
    ],
  },
  {
    slug: "the-monolith",
    name: "The Monolith",
    shape: "rectangular",
    color: "Crystal Smoke",
    lensColor: "Charcoal Grey",
    lensType: "Polarized UV400",
    measurements: "56 — 17 — 145 mm",
    image: "/images/sunglasses/the-monolith.jpg",
    modelImage: "/images/sunglasses/model-the-monolith.jpg",
    description:
      "A monumental flat-top silhouette in translucent smoke acetate, balancing bold sculptural heft with transparent lightness.",
    details: [
      "Architectural flat-top contour",
      "Translucent smoke grey acetate",
      "Integrated wire core temple architecture",
    ],
  },
];
