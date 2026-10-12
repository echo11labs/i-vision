// ============================================================================
// EYEGLASSES FIXTURE DATA — ARCHIVAL OPTICAL COLLECTION
// ============================================================================

export type EyeglassesShape = "all" | "rectangular" | "round" | "cat-eye" | "aviator";

export interface EyeglassesProduct {
  slug: string;
  name: string;
  shape: "rectangular" | "round" | "cat-eye" | "aviator";
  color: string;
  image: string;
  howItWearsImage: string;
  material: string;
  measurements: string;
  lensType: string;
  description: string;
  details: string[];
}

export const FIXTURE_PRODUCTS: EyeglassesProduct[] = [
  {
    slug: "the-architect",
    name: "The Architect",
    shape: "rectangular",
    color: "Classic Tortoise",
    image: "/images/frame_rectangular.jpg",
    howItWearsImage: "/images/the-architect.png",
    material: "Japanese Cured Acetate & Titanium",
    measurements: "52 — 18 — 145 mm",
    lensType: "Digital Free-Form Optical",
    description: "A structured rectangular silhouette grounded in mid-century architectural theory. Balanced proportion and bevel-cut temples create an authoritative yet lightweight profile for prolonged studio work.",
    details: [
      "Hand-beveled 8mm Italian cellulose acetate",
      "Custom guilloché-engraved titanium core wires",
      "Seven-barrel German-engineered hinge assembly",
      "Anti-reflective high-index prescription compatibility"
    ]
  },
  {
    slug: "the-academic",
    name: "The Academic",
    shape: "round",
    color: "Matte Black",
    image: "/images/frame_round.jpg",
    howItWearsImage: "/images/The Academic.png",
    material: "Ultra-Lightweight Beta-Titanium",
    measurements: "49 — 20 — 142 mm",
    lensType: "Single Vision & Progressive Ready",
    description: "A timeless pantoscopic circular frame refined with minimalist rim profiling. Featherweight construction ensures zero temple pinch, tailored for intensive reading and cerebral immersion.",
    details: [
      "High-tensile Japanese beta-titanium rimwire",
      "Hand-buffed matte obsidian ion plating",
      "Anatomical silicone nose pads with micro-pivoting",
      "Ultra-thin profile engineered for featherlight balance"
    ]
  },
  {
    slug: "the-editor",
    name: "The Editor",
    shape: "cat-eye",
    color: "Midnight Blue",
    image: "/images/frame_cateye.jpg",
    howItWearsImage: "/images/the-editor.png",
    material: "Layered Cellulose Acetate",
    measurements: "51 — 17 — 140 mm",
    lensType: "Blue-Light Filtering Optical",
    description: "A subtle, architectural lift at the brow that commands attention without excess. Rich midnight tones reveal deep translucence under natural daylight, accentuating high cheekbones.",
    details: [
      "Precision-milled upswept browline geometry",
      "Multi-laminated midnight and smoke acetate",
      "Hypoallergenic nickel-free temple components",
      "Treated with oleophobic smear-resistant coating"
    ]
  },
  {
    slug: "the-pilot",
    name: "The Pilot",
    shape: "aviator",
    color: "Brushed Gold",
    image: "/images/frame_aviator.jpg",
    howItWearsImage: "/images/The-Pilot.png",
    material: "Pure Monel & Titanium Bridge",
    measurements: "55 — 16 — 145 mm",
    lensType: "Anti-Fatigue Computer & Reading Ready",
    description: "An archival teardrop aviator re-engineered for optical clarity. The refined double bridge and satin gold luster bestow an iconic vintage presence with state-of-the-art structural rigidity.",
    details: [
      "Reinforced architectural brow bar and dual bridge",
      "Brushed 24k gold satin electroplated finish",
      "Laser-etched internal temple numbering",
      "Custom featherweight titanium pad arms"
    ]
  },
  {
    slug: "the-modernist",
    name: "The Modernist",
    shape: "rectangular",
    color: "Amber Ash",
    image: "/images/frame_rectangular_2.jpg",
    howItWearsImage: "/images/The-Modernist.png",
    material: "Warm Organic Bio-Acetate",
    measurements: "53 — 19 — 145 mm",
    lensType: "High-Index 1.67 Aspheric Ready",
    description: "Clean horizontal geometry with soft chamfered interior facets. The warm amber ash hue catches ambient light softly, bringing subtle warmth to contemporary minimalist styling.",
    details: [
      "Organic plant-based bio-acetate formula",
      "Soft chamfered rim transitions for comfortable skin contact",
      "Reinforced five-barrel hinge with lock-tight pins",
      "Compatible with high minus and progressive prescriptions"
    ]
  },
  {
    slug: "the-artisan",
    name: "The Artisan",
    shape: "round",
    color: "Vintage Havana",
    image: "/images/frame_round_2.jpg",
    howItWearsImage: "/images/The-Artisan.png",
    material: "Hand-Polished Havana Acetate",
    measurements: "48 — 21 — 142 mm",
    lensType: "Digitally Surfaced Anti-Reflective",
    description: "A panto-inspired round silhouette with a keyhole bridge that sits effortlessly on the nasal crest. Polished by hand with pumice and organic beeswax for a rich, heritage patina.",
    details: [
      "Sculpted architectural keyhole bridge for universal fit",
      "Multi-tonal tortoise marbling unique to every frame",
      "Hand-pinned dual rivet temple attachments",
      "Balanced center-of-mass to eliminate nose ridge red marks"
    ]
  }
];
