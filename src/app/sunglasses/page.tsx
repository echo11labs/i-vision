"use client";

import { useState, Suspense, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Sparkles, Sun, ShieldCheck } from "lucide-react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import {
  SUNGLASSES_PRODUCTS,
  type SunglassesShape,
  type SunglassesProduct,
} from "./fixtures";

const SHAPE_TABS: { label: string; value: SunglassesShape }[] = [
  { label: "All Frames", value: "all" },
  { label: "Aviator", value: "aviator" },
  { label: "Rectangular", value: "rectangular" },
  { label: "Round", value: "round" },
  { label: "Cat-Eye", value: "cat-eye" },
  { label: "Square", value: "square" },
];

function SunglassesProductCard({ product }: { product: SunglassesProduct }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <article
      className="group relative flex flex-col bg-background focus-within:ring-2 focus-within:ring-foreground transition-all duration-300"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link
        href={`/sunglasses/${product.slug}`}
        className="block focus:outline-none"
        aria-label={`View ${product.name} sunglasses`}
      >
        {/* Media Frame with Dual View (Product / On-Model hover) */}
        <div className="relative aspect-[4/5] w-full overflow-hidden bg-[#ECE8E1] border border-foreground/10">
          {/* Studio Product Shot */}
          <Image
            src={product.image}
            alt={`${product.name} sunglasses in ${product.color}`}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className={`object-cover object-center transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] ${
              isHovered ? "opacity-0 scale-105" : "opacity-100 scale-100"
            }`}
            priority={false}
          />

          {/* Model Editorial Shot (revealed on hover) */}
          <Image
            src={product.modelImage}
            alt={`${product.name} worn by model`}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className={`object-cover object-center transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] ${
              isHovered ? "opacity-100 scale-100" : "opacity-0 scale-95"
            }`}
          />

          {/* Subtle View Badge */}
          <div className="absolute top-3.5 left-3.5 z-10 pointer-events-none">
            <span className="font-sans text-[10px] sm:text-[11px] font-medium uppercase tracking-[0.16em] text-foreground/80">
              {product.lensType}
            </span>
          </div>

          {/* Hover indicator banner */}
          <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-foreground/80 via-foreground/40 to-transparent p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-between text-background">
            <span className="text-[10px] font-sans uppercase tracking-[0.15em] font-medium">
              View Specs & Lens Details
            </span>
            <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
          </div>
        </div>

        {/* Card Metadata */}
        <div className="pt-5 pb-2 flex flex-col gap-1.5">
          <div className="flex items-baseline justify-between">
            <h3 className="font-display text-2xl tracking-tight text-foreground group-hover:text-foreground/75 transition-colors">
              {product.name}
            </h3>
            <span className="text-[11px] font-sans uppercase tracking-widest text-foreground/50">
              {product.shape}
            </span>
          </div>

          <div className="flex items-center justify-between text-xs font-sans text-foreground/60">
            <span>{product.color}</span>
            <span className="text-foreground/40 text-[11px]">
              Lens: {product.lensColor}
            </span>
          </div>

          <p className="text-xs font-sans text-foreground/60 line-clamp-2 mt-2 leading-relaxed">
            {product.description}
          </p>
        </div>
      </Link>
    </article>
  );
}

function SunglassesContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const selectedShape = (searchParams.get("shape") as SunglassesShape) || "all";

  const handleShapeSelect = (shape: SunglassesShape) => {
    const params = new URLSearchParams(searchParams.toString());
    if (shape === "all") {
      params.delete("shape");
    } else {
      params.set("shape", shape);
    }
    const queryString = params.toString();
    router.push(queryString ? `${pathname}?${queryString}` : pathname, {
      scroll: false,
    });

    // Anchor viewport to the shop/grid section top
    if (typeof window !== "undefined") {
      const el = document.getElementById("collection-grid");
      if (el) {
        const headerOffset = 64;
        const targetY = Math.max(0, el.getBoundingClientRect().top + window.pageYOffset - headerOffset);
        const win = window as unknown as { __lenis?: { scrollTo: (t: number, opts?: { duration?: number }) => void } };
        if (win.__lenis) {
          win.__lenis.scrollTo(targetY, { duration: 0.5 });
        } else {
          window.scrollTo({ top: targetY, behavior: "smooth" });
        }
      }
    }
  };

  const filteredProducts = useMemo(() => {
    if (selectedShape === "all") return SUNGLASSES_PRODUCTS;
    return SUNGLASSES_PRODUCTS.filter((p) => p.shape === selectedShape);
  }, [selectedShape]);

  return (
    <div className="flex-grow bg-background text-foreground">
      {/* ── SECTION 1: EDITORIAL HERO ─────────────────────────────────── */}
      <section className="relative isolate min-h-[85vh] sm:min-h-[90vh] overflow-hidden bg-foreground text-background">
        <div
          data-motion-media
          aria-hidden="true"
          className="absolute inset-0 -z-20 bg-[url('/images/sunglasses-hero-mobile.png')] bg-cover bg-center lg:bg-[url('/images/Sunglasses%20Hero%20%E2%80%94%20Desktop%20(16-9).png')]"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 bg-gradient-to-t from-foreground/95 via-foreground/40 to-transparent lg:bg-gradient-to-r lg:from-foreground/95 lg:via-foreground/50 lg:to-transparent"
        />

        <div className="mx-auto flex h-full min-h-[85vh] sm:min-h-[90vh] max-w-[1440px] items-end px-6 pb-16 pt-36 sm:px-10 sm:pb-20 lg:px-14 lg:pb-24">
          <div className="grid w-full grid-cols-1 lg:grid-cols-12 gap-8 items-end">
            <div className="flex flex-col gap-6 lg:gap-8 lg:col-span-8">
              <div className="flex items-center gap-3">
                <span className="section-kicker text-background/60">
                  Sun Collection — Edition 01
                </span>
                <span className="text-background/30 font-light select-none">—</span>
                <span className="text-[10px] font-sans tracking-[0.2em] uppercase text-background/40">
                  Polarized & CR-39
                </span>
              </div>

              <h1 className="font-display text-hero leading-tight tracking-display text-background">
                Sculpted light.<br />
                Uncompromising focus.
              </h1>

              <p className="max-w-lg font-sans text-body-lg leading-relaxed text-background/75">
                Engineered with Japanese titanium, hand-beveled Italian acetate,
                and calibrated high-contrast polarizing optics designed for changing skies.
              </p>

              <div className="flex flex-wrap items-center gap-6 pt-2">
                <a
                  href="#collection-grid"
                  className="px-8 py-4 bg-background text-foreground text-xs font-sans font-medium uppercase tracking-[0.16em] hover:bg-background/90 transition-all focus-ring"
                >
                  Explore Collection ({SUNGLASSES_PRODUCTS.length})
                </a>
                <Link
                  href="/find-your-frame"
                  className="inline-flex items-center gap-2 text-xs font-sans tracking-wide text-background/70 hover:text-background underline underline-offset-4 transition-colors"
                >
                  <span>Frame Fit Guide</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            <div className="hidden lg:flex flex-col gap-4 lg:col-span-4 border-l border-background/20 pl-8 pb-2">
              <div className="flex items-center gap-3 text-background/80">
                <Sun className="w-4 h-4 text-accent" />
                <span className="text-xs font-sans tracking-wide">100% UVA / UVB Protection</span>
              </div>
              <div className="flex items-center gap-3 text-background/80">
                <ShieldCheck className="w-4 h-4 text-accent" />
                <span className="text-xs font-sans tracking-wide">Seven-Barrel Precision Hinges</span>
              </div>
              <div className="flex items-center gap-3 text-background/80">
                <Sparkles className="w-4 h-4 text-accent" />
                <span className="text-xs font-sans tracking-wide">Hydrophobic & Anti-Glare Coated</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 2: SHAPE FILTER NAVIGATION ────────────────────────── */}
      <section
        id="collection-grid"
        className="sticky top-16 z-30 bg-background/95 backdrop-blur-md border-b border-foreground/10 py-3.5 sm:py-4 px-6 lg:px-12 scroll-mt-16"
      >
        <div className="max-w-[1440px] mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-2 overflow-x-auto hide-scrollbar pb-1 md:pb-0">
            {SHAPE_TABS.map((tab) => {
              const isActive = selectedShape === tab.value;
              return (
                <button
                  key={tab.value}
                  onClick={() => handleShapeSelect(tab.value)}
                  className={`px-4 py-2 text-xs font-sans uppercase tracking-[0.14em] transition-all whitespace-nowrap rounded-sm focus-ring ${
                    isActive
                      ? "bg-foreground text-background font-medium"
                      : "text-foreground/60 hover:text-foreground hover:bg-foreground/5"
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>

          <div className="flex items-center justify-between md:justify-end gap-6 text-xs font-sans text-foreground/50">
            <span>
              Showing {filteredProducts.length} of {SUNGLASSES_PRODUCTS.length} frames
            </span>
            {selectedShape !== "all" && (
              <button
                onClick={() => handleShapeSelect("all")}
                className="text-foreground hover:underline uppercase text-[11px] tracking-wider"
              >
                Reset Filter
              </button>
            )}
          </div>
        </div>
      </section>

      {/* ── SECTION 3: PRODUCT CATALOG GRID ──────────────────────────── */}
      <section className="py-16 sm:py-20 lg:py-28 px-6 lg:px-12 max-w-[1440px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10 lg:gap-12">
          {filteredProducts.map((product) => (
            <SunglassesProductCard key={product.slug} product={product} />
          ))}
        </div>
      </section>

      {/* ── SECTION 4: EDITORIAL LOOKBOOK / ON-MODEL SHOWCASE ────────── */}
      <section className="bg-[#171917] text-background py-24 sm:py-32 px-6 lg:px-12 border-t border-background/10">
        <div className="max-w-[1440px] mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div className="space-y-3">
              <span className="section-kicker text-background/50">
                Editorial Presence
              </span>
              <h2 className="font-display text-display-lg tracking-display leading-tight">
                In The Light
              </h2>
            </div>
            <p className="max-w-md text-sm font-sans text-background/70 leading-relaxed">
              Eyewear shaped for everyday movement. Hover across any frame above
              to see each piece alive on the human form.
            </p>
          </div>

          {/* Complete Editorial On-Model Gallery */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
            {SUNGLASSES_PRODUCTS.map((prod) => (
              <Link
                key={prod.slug}
                href={`/sunglasses/${prod.slug}`}
                className="group relative flex flex-col focus-ring"
              >
                <div className="relative aspect-[3/4] w-full overflow-hidden bg-background/5 mb-4 border border-background/10">
                  <Image
                    src={prod.modelImage}
                    alt={`${prod.name} on-model campaign portrait`}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]"
                  />
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors duration-500" />
                  <div className="absolute top-3.5 left-3.5 z-10 pointer-events-none">
                    <span className="font-sans text-[10px] font-medium tracking-[0.16em] uppercase text-background/90 drop-shadow-xs">
                      {prod.shape}
                    </span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-display text-xl tracking-tight text-background group-hover:text-background/80 transition-colors">
                    {prod.name}
                  </span>
                  <ArrowRight className="w-4 h-4 text-background/40 group-hover:text-background group-hover:translate-x-1 transition-all" />
                </div>
                <span className="text-[11px] font-sans tracking-widest uppercase text-background/50 mt-1">
                  {prod.lensColor} • {prod.lensType}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION 5: CRAFT & OPTICAL SPECIFICATIONS ───────────────── */}
      <section className="py-24 sm:py-28 px-6 lg:px-12 max-w-[1440px] mx-auto border-t border-foreground/10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">
          <div className="space-y-4">
            <span className="brand-numeral text-sm text-foreground/40">01</span>
            <h3 className="font-display text-2xl tracking-tight text-foreground">
              Japanese Beta-Titanium
            </h3>
            <p className="font-sans text-sm text-foreground/70 leading-relaxed">
              Ultra-lightweight and exceptionally resilient. Our metal wireframes
              undergo multi-stage electroplating for lifelong corrosion resistance.
            </p>
          </div>

          <div className="space-y-4">
            <span className="brand-numeral text-sm text-foreground/40">02</span>
            <h3 className="font-display text-2xl tracking-tight text-foreground">
              Calibrated Polarized Optics
            </h3>
            <p className="font-sans text-sm text-foreground/70 leading-relaxed">
              Every lens eliminates 99.9% of surface glare while preserving pure
              chromatic balance, offering supreme clarity on open roads and water.
            </p>
          </div>

          <div className="space-y-4">
            <span className="brand-numeral text-sm text-foreground/40">03</span>
            <h3 className="font-display text-2xl tracking-tight text-foreground">
              Mazzucchelli 1849 Cellulose
            </h3>
            <p className="font-sans text-sm text-foreground/70 leading-relaxed">
              Plant-based cotton and wood-pulp acetate hand-tumbled for 72 hours
              to achieve a warm tactile luster unmatched by molded plastics.
            </p>
          </div>
        </div>
      </section>

      {/* ── SECTION 6: FOOTER BRIDGE ─────────────────────────────────── */}
      <section className="border-t border-foreground/10 py-16 lg:py-20 px-6 lg:px-12 bg-background">
        <div className="max-w-[1440px] mx-auto flex flex-col sm:flex-row sm:items-center sm:justify-between gap-8">
          <div className="space-y-2">
            <p className="section-kicker text-foreground/40">Optical Frames</p>
            <p className="font-display text-2xl sm:text-3xl tracking-tight text-foreground leading-snug">
              Looking for prescription eyeglasses?
            </p>
          </div>
          <Link
            href="/eyeglasses"
            className="group inline-flex items-center justify-between gap-4 px-8 py-4 bg-foreground text-background font-sans font-medium tracking-wide transition-colors hover:bg-foreground/90 focus-ring shrink-0"
          >
            <span>Explore Eyeglasses</span>
            <ArrowRight className="h-4 w-4 transition-transform motion-safe:group-hover:translate-x-1" />
          </Link>
        </div>
      </section>
    </div>
  );
}

export default function SunglassesPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-background flex items-center justify-center">
          <div className="font-logo text-2xl tracking-brand uppercase text-foreground/60 animate-pulse">
            I-VISION
          </div>
        </div>
      }
    >
      <SunglassesContent />
    </Suspense>
  );
}
