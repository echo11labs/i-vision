// ============================================================================
// CONTACT LENSES FIXTURE DATA — I-VISION EYE CARE
// ============================================================================

export type ContactLensModality = "all" | "dailies" | "monthlies" | "toric" | "multifocal";

export interface ContactLensProduct {
  slug: string;
  name: string;
  brand: "Acuvue" | "Alcon" | "CooperVision" | "Bausch + Lomb";
  modality: "dailies" | "monthlies" | "toric" | "multifocal";
  modalityLabel: string;
  packSize: string;
  pricePerBox: number;
  material: string;
  waterContent: string;
  oxygenTransmissibility: string; // Dk/t
  baseCurve: string;
  diameter: string;
  description: string;
  wearingSchedule: string;
  features: string[];
  themeColor: string;
  accentBg: string;
}

export const CONTACT_LENS_PRODUCTS: ContactLensProduct[] = [
  {
    slug: "acuvue-oasys-1-day",
    name: "Acuvue Oasys 1-Day",
    brand: "Acuvue",
    modality: "dailies",
    modalityLabel: "Daily Disposable",
    packSize: "90 lenses / box",
    pricePerBox: 88,
    material: "Senofilcon A (Silicone Hydrogel)",
    waterContent: "38%",
    oxygenTransmissibility: "121 Dk/t",
    baseCurve: "8.5 mm / 9.0 mm",
    diameter: "14.3 mm",
    description:
      "Engineered with HydraLuxe technology featuring a tear-infused design that integrates with your natural tear film for demanding digital screen days.",
    wearingSchedule: "Daily single-use wear",
    features: [
      "HydraLuxe tear-infused network",
      "Highest level of UV protection (Class 1)",
      "Breathable silicone hydrogel matrix",
      "Reduced digital eye strain fatigue",
    ],
    themeColor: "#0066A1",
    accentBg: "#EBF3F8",
  },
  {
    slug: "dailies-total1",
    name: "Dailies Total1",
    brand: "Alcon",
    modality: "dailies",
    modalityLabel: "Daily Disposable",
    packSize: "90 lenses / box",
    pricePerBox: 96,
    material: "Delefilcon A (Water Gradient)",
    waterContent: "33% core, 80%+ surface",
    oxygenTransmissibility: "156 Dk/t",
    baseCurve: "8.5 mm",
    diameter: "14.1 mm",
    description:
      "The world's first water-gradient contact lens. Approaches nearly 100% water at the outermost surface so nothing touches your eye except a cushion of moisture.",
    wearingSchedule: "Daily single-use wear",
    features: [
      "Pioneering Water Gradient technology",
      "Exceptional 156 Dk/t oxygen breathability",
      "Ultra-slick biomimetic surface",
      "All-day end-of-day silky comfort",
    ],
    themeColor: "#9A7632",
    accentBg: "#F6F2EA",
  },
  {
    slug: "biofinity-monthly",
    name: "Biofinity Monthly",
    brand: "CooperVision",
    modality: "monthlies",
    modalityLabel: "Monthly Disposable",
    packSize: "6 lenses / box (6-month supply)",
    pricePerBox: 54,
    material: "Comfilcon A (Naturally Wettable)",
    waterContent: "48%",
    oxygenTransmissibility: "160 Dk/t",
    baseCurve: "8.6 mm",
    diameter: "14.0 mm",
    description:
      "Aquaform Technology binds water throughout the silicone hydrogel matrix, providing natural wettability without surface treatments or artificial wetting agents.",
    wearingSchedule: "Monthly wear (daily or up to 6 nights continuous)",
    features: [
      "Aquaform natural moisture binding",
      "High oxygen permeability for white, clear eyes",
      "Soft, flexible low-modulus material",
      "Optimized round edge geometry",
    ],
    themeColor: "#65498A",
    accentBg: "#F3EFF8",
  },
  {
    slug: "precision1-daily",
    name: "Precision1 Daily",
    brand: "Alcon",
    modality: "dailies",
    modalityLabel: "Daily Disposable",
    packSize: "90 lenses / box",
    pricePerBox: 84,
    material: "Verofilcon A (SMARTSURFACE)",
    waterContent: "51% core, 80%+ surface",
    oxygenTransmissibility: "100 Dk/t",
    baseCurve: "8.3 mm",
    diameter: "14.2 mm",
    description:
      "Created with SMARTSURFACE technology consisting of an ultra-thin micro-moisture layer that delivers precise optical clarity and simple handling for active lifestyles.",
    wearingSchedule: "Daily single-use wear",
    features: [
      "SMARTSURFACE micro-thin moisture shield",
      "Class 1 UVA and UVB radiation block",
      "Effortless insertion and removal stiffness",
      "Sustained tear film stability",
    ],
    themeColor: "#007B88",
    accentBg: "#EBF5F6",
  },
  {
    slug: "air-optix-plus-hydraglyde",
    name: "Air Optix plus HydraGlyde",
    brand: "Alcon",
    modality: "monthlies",
    modalityLabel: "Monthly Disposable",
    packSize: "6 lenses / box",
    pricePerBox: 58,
    material: "Lotrafilcon B (SmartShield)",
    waterContent: "33%",
    oxygenTransmissibility: "138 Dk/t",
    baseCurve: "8.6 mm",
    diameter: "14.2 mm",
    description:
      "Combines SmartShield technology for deposit protection with HydraGlyde moisture matrix to surround the lens in long-lasting surface hydration from day 1 to day 30.",
    wearingSchedule: "Monthly daily wear",
    features: [
      "SmartShield lipid deposit shield",
      "HydraGlyde moisture envelope",
      "High oxygen flow for metabolic ocular health",
      "Consistent wettability all month",
    ],
    themeColor: "#1B4F72",
    accentBg: "#EDF2F7",
  },
  {
    slug: "acuvue-oasys-for-astigmatism",
    name: "Acuvue Oasys for Astigmatism",
    brand: "Acuvue",
    modality: "toric",
    modalityLabel: "Toric (Astigmatism)",
    packSize: "6 lenses / box",
    pricePerBox: 56,
    material: "Senofilcon A with Hydraclear Plus",
    waterContent: "38%",
    oxygenTransmissibility: "129 Dk/t",
    baseCurve: "8.6 mm",
    diameter: "14.5 mm",
    description:
      "Equipped with Blink Stabilized design utilizing four natural eyelid zones to keep the lens aligned and vision crisp regardless of head tilts or rapid eye motion.",
    wearingSchedule: "Bi-weekly / Monthly wear",
    features: [
      "Blink Stabilized toric alignment",
      "Hydraclear Plus smooth moisture matrix",
      "Crisp focus for corneal astigmatism",
      "UV Blocking Class 1 certified",
    ],
    themeColor: "#0B5394",
    accentBg: "#ECF3FA",
  },
  {
    slug: "dailies-total1-multifocal",
    name: "Dailies Total1 Multifocal",
    brand: "Alcon",
    modality: "multifocal",
    modalityLabel: "Multifocal (Presbyopia)",
    packSize: "90 lenses / box",
    pricePerBox: 112,
    material: "Delefilcon A (Water Gradient)",
    waterContent: "33% core, 80%+ surface",
    oxygenTransmissibility: "156 Dk/t",
    baseCurve: "8.5 mm",
    diameter: "14.1 mm",
    description:
      "Precision Profile design offers seamless transition from near reading to intermediate screen work and distance vision, combined with water-gradient comfort.",
    wearingSchedule: "Daily single-use wear",
    features: [
      "Precision Profile smooth progressive zones",
      "Near, intermediate, and distance optical clarity",
      "Water Gradient tear-like surface feel",
      "Prescription reading freedom without bifocals",
    ],
    themeColor: "#8C682A",
    accentBg: "#F7F3EC",
  },
  {
    slug: "biotrue-oneday",
    name: "Biotrue ONEday",
    brand: "Bausch + Lomb",
    modality: "dailies",
    modalityLabel: "Daily Disposable",
    packSize: "90 lenses / box",
    pricePerBox: 76,
    material: "Nesofilcon A (HyperGel)",
    waterContent: "78% (Matches cornea)",
    oxygenTransmissibility: "42 Dk/t",
    baseCurve: "8.6 mm",
    diameter: "14.2 mm",
    description:
      "Inspired by the biology of your eyes. Features 78% water content to match the cornea, with a lipid-layer mimic that retains 98% of moisture throughout 16 hours.",
    wearingSchedule: "Daily single-use wear",
    features: [
      "78% water content matching the human cornea",
      "Biomimetic dehydration barrier",
      "High definition aspheric optics",
      "Exceptional breathability without silicone drying",
    ],
    themeColor: "#2E7D32",
    accentBg: "#EDF5EE",
  },
];
