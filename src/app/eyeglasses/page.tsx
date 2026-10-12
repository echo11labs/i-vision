"use client";

import { useState, Suspense, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Sparkles, Glasses, ShieldCheck, Eye, CheckCircle2 } from "lucide-react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import {
  FIXTURE_PRODUCTS,
  type EyeglassesShape,
  type EyeglassesProduct,
} from "./fixtures";

const SHAPE_TABS: { label: string; value: EyeglassesShape }[] = [
  { label: "All Frames", value: "all" },
  { label: "Rectangular", value: "rectangular" },
  { label: "Round", value: "round" },
  { label: "Cat-Eye", value: "cat-eye" },
  { label: "Aviator", value: "aviator" },
];

function EyeglassesProductCard({ product }: { product: EyeglassesProduct }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <article
      className="group relative flex flex-col bg-background focus-within:ring-2 focus-within:ring-foreground transition-all duration-300"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link
        href={`/eyeglasses/${product.slug}`}
        className="block focus:outline-none"
        aria-label={`View ${product.name} optical frame`}
      >
        {/* Media Frame with Dual View (Product / On-Model hover) */}
        <div className="relative aspect-[4/5] w-full overflow-hidden bg-[#ECE8E1] border border-foreground/10">
          {/* Studio Product Shot */}
          <Image
            src={product.image}
            alt={`${product.name} optical frame in ${product.color}`}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className={`object-cover object-center transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] ${
              isHovered ? "opacity-0 scale-105" : "opacity-100 scale-100"
            }`}
            priority={false}
          />

          {/* Model Editorial Shot (revealed on hover) */}
          <Image
            src={product.howItWearsImage}
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

          {/* Luminous Frosted Hover Banner */}
          <div className="absolute bottom-0 inset-x-0 bg-background/95 backdrop-blur-md px-4 py-3 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-between text-foreground border-t border-foreground/10">
            <span className="text-[10px] font-sans uppercase tracking-[0.16em] font-medium text-foreground">
              View Specs & Prescription
            </span>
            <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform text-foreground/70" />
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
              {product.measurements}
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

function OpticalStudyCard({ prod }: { prod: EyeglassesProduct }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link
      href={`/eyeglasses/${prod.slug}`}
      className="group relative flex flex-col focus-ring"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onFocus={() => setIsHovered(true)}
      onBlur={() => setIsHovered(false)}
    >
      {/* Portrait Frame with Optical Lens Soft Blur -> 100% Crystal Clean on Hover */}
      <div className="relative aspect-[3/4] w-full overflow-hidden bg-background mb-4 border border-foreground/15 shadow-xs">
        <Image
          src={prod.howItWearsImage}
          alt={`${prod.name} on-model campaign portrait`}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover object-center will-change-[filter,transform]"
          style={{
            filter: isHovered ? "none" : "blur(1.5px)",
            WebkitFilter: isHovered ? "none" : "blur(1.5px)",
            transform: isHovered ? "scale(1.0)" : "scale(1.02)",
            transition: "filter 0.4s cubic-bezier(0.25, 1, 0.5, 1), transform 0.4s cubic-bezier(0.25, 1, 0.5, 1)",
          }}
        />

        {/* Frame Shape Badge */}
        <div className="absolute top-3.5 left-3.5 z-10 pointer-events-none">
          <span className="font-sans text-[10px] font-medium uppercase tracking-[0.16em] text-foreground/80">
            {prod.shape}
          </span>
        </div>

        {/* Optical Clarity Status Indicator */}
        <div className="absolute top-3.5 right-3.5 z-10 pointer-events-none transition-all duration-300">
          <span
            className={`brand-badge px-2.5 py-1 text-[9px] uppercase tracking-widest border transition-all duration-300 flex items-center shadow-xs ${
              isHovered
                ? "bg-foreground text-background border-foreground font-medium"
                : "bg-background/85 backdrop-blur-md text-foreground/75 border-foreground/10"
            }`}
          >
            <span>{isHovered ? "20/20 Clarity" : "Optical Focus"}</span>
          </span>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <span className="font-display text-xl tracking-tight text-foreground group-hover:text-foreground/75 transition-colors">
          {prod.name}
        </span>
        <ArrowRight className="w-4 h-4 text-foreground/40 group-hover:text-foreground group-hover:translate-x-1 transition-all" />
      </div>
      <span className="text-[11px] font-sans tracking-widest uppercase text-foreground/55 mt-1">
        {prod.color} • {prod.measurements}
      </span>
    </Link>
  );
}

function EyeglassesContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const selectedShape = (searchParams.get("shape") as EyeglassesShape) || "all";

  const handleShapeSelect = (shape: EyeglassesShape) => {
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
    if (selectedShape === "all") return FIXTURE_PRODUCTS;
    return FIXTURE_PRODUCTS.filter((p) => p.shape === selectedShape);
  }, [selectedShape]);

  return (
    <div className="flex-grow bg-background text-foreground">
      {/* ── SECTION 1: EDITORIAL LIGHT HERO ────────────────────────────── */}
      <section className="relative isolate min-h-[85vh] sm:min-h-[90vh] overflow-hidden bg-background text-foreground border-b border-foreground/10">
        <div
          data-motion-media
          aria-hidden="true"
          className="absolute inset-0 -z-20 bg-[url('/images/eyeglasses-hero-mobile.png')] bg-cover bg-center lg:bg-[url('/images/eyeglasses-hero-desktop.png')]"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 bg-gradient-to-t from-background/95 via-background/65 to-transparent lg:bg-gradient-to-r lg:from-background/95 lg:via-background/65 lg:to-transparent"
        />

        <div className="mx-auto flex h-full min-h-[85vh] sm:min-h-[90vh] max-w-[1440px] items-end px-6 pb-16 pt-36 sm:px-10 sm:pb-20 lg:px-14 lg:pb-24">
          <div className="grid w-full grid-cols-1 lg:grid-cols-12 gap-8 items-end">
            <div className="flex flex-col gap-6 lg:gap-8 lg:col-span-8">
              <div className="flex items-center gap-3">
                <span className="section-kicker text-foreground/60">
                  Optical Collection — Edition 01
                </span>
                <span className="text-foreground/30 font-light select-none">—</span>
                <span className="text-[10px] font-sans tracking-[0.2em] uppercase text-foreground/50">
                  Prescription & Digital Clarity
                </span>
              </div>

              <h1 className="font-display text-hero leading-tight tracking-display text-foreground">
                Precision optics.<br />
                Architectural restraint.
              </h1>

              <p className="max-w-lg font-sans text-body-lg leading-relaxed text-foreground/75">
                Engineered with Japanese beta-titanium, hand-beveled Italian acetate,
                and custom core-wire detailing tuned for balanced weight and effortless all-day focus.
              </p>

              <div className="flex flex-wrap items-center gap-6 pt-2">
                <a
                  href="#collection-grid"
                  className="px-8 py-4 bg-foreground text-background text-xs font-sans font-medium uppercase tracking-[0.16em] hover:bg-foreground/90 transition-all focus-ring shadow-sm"
                >
                  Explore Collection ({FIXTURE_PRODUCTS.length})
                </a>
                <Link
                  href="/find-your-frame"
                  className="inline-flex items-center gap-2 text-xs font-sans tracking-wide text-foreground/70 hover:text-foreground underline underline-offset-4 transition-colors"
                >
                  <span>Frame Fit & Prescription Guide</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            <div className="hidden lg:flex flex-col gap-4 lg:col-span-4 border-l border-foreground/15 pl-8 pb-2">
              <div className="flex items-center gap-3 text-foreground/80">
                <Glasses className="w-4 h-4 text-accent shrink-0" />
                <span className="text-xs font-sans tracking-wide">Digital Free-Form Prescription Ready</span>
              </div>
              <div className="flex items-center gap-3 text-foreground/80">
                <ShieldCheck className="w-4 h-4 text-accent shrink-0" />
                <span className="text-xs font-sans tracking-wide">Seven-Barrel Precision Hinges</span>
              </div>
              <div className="flex items-center gap-3 text-foreground/80">
                <Sparkles className="w-4 h-4 text-accent shrink-0" />
                <span className="text-xs font-sans tracking-wide">Custom Engraved Core Wires</span>
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
              Showing {filteredProducts.length} of {FIXTURE_PRODUCTS.length} frames
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
            <EyeglassesProductCard key={product.slug} product={product} />
          ))}
        </div>
      </section>

      {/* ── SECTION 4: EDITORIAL LOOKBOOK / "THE OPTICAL STUDY" ───────── */}
      <section className="bg-[#ECE8E1] text-foreground py-24 sm:py-32 px-6 lg:px-12 border-t border-foreground/10">
        <div className="max-w-[1440px] mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div className="space-y-3">
              <span className="section-kicker text-foreground/50">
                Editorial Presence — Simulated Clarity
              </span>
              <h2 className="font-display text-display-lg tracking-display leading-tight text-foreground">
                The Optical Study
              </h2>
            </div>
            <p className="max-w-md text-sm font-sans text-foreground/70 leading-relaxed">
              Experience the shift from ambient blur into razor-sharp optical clarity.
              Hover over any portrait below to bring the frame and human perspective into focus.
            </p>
          </div>

          {/* Editorial On-Model Gallery with Blur-to-Clear Hover Effect */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-8 sm:gap-10">
            {FIXTURE_PRODUCTS.map((prod) => (
              <OpticalStudyCard key={prod.slug} prod={prod} />
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION 5: PRESCRIPTION & OPTICAL ENGINEERING ────────────── */}
      <section className="py-24 sm:py-28 px-6 lg:px-12 max-w-[1440px] mx-auto border-t border-foreground/10">
        <div className="max-w-2xl mb-16 space-y-3">
          <span className="section-kicker text-foreground/50">
            Optics & Engineering
          </span>
          <h2 className="font-display text-display-md tracking-display leading-tight text-foreground">
            Prescription clarity.<br />Architectural craft.
          </h2>
          <p className="font-sans text-sm text-foreground/70 leading-relaxed pt-1">
            Every pair is calibrated to your individual optical measurements with digital free-form surfacing,
            medical-grade Japanese metals, and non-distorting aspheric geometry.
          </p>
        </div>

        {/* 4-Pillar Optical Specs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10 pb-16">
          <div className="space-y-3 border-t border-foreground/15 pt-6">
            <span className="brand-numeral text-sm text-foreground/40">01</span>
            <div className="flex items-center gap-2 text-foreground">
              <Glasses className="w-4 h-4 text-accent shrink-0" />
              <h3 className="font-display text-lg tracking-tight">Free-Form Surfacing</h3>
            </div>
            <p className="font-sans text-xs text-foreground/70 leading-relaxed">
              Single-vision and progressives surfaced point-by-point to eliminate peripheral distortion and swim effect.
            </p>
          </div>

          <div className="space-y-3 border-t border-foreground/15 pt-6">
            <span className="brand-numeral text-sm text-foreground/40">02</span>
            <div className="flex items-center gap-2 text-foreground">
              <Eye className="w-4 h-4 text-accent shrink-0" />
              <h3 className="font-display text-lg tracking-tight">420nm Blue Filtration</h3>
            </div>
            <p className="font-sans text-xs text-foreground/70 leading-relaxed">
              Selective spectral filtration designed to relieve digital eye fatigue without perceptible yellow tint.
            </p>
          </div>

          <div className="space-y-3 border-t border-foreground/15 pt-6">
            <span className="brand-numeral text-sm text-foreground/40">03</span>
            <div className="flex items-center gap-2 text-foreground">
              <ShieldCheck className="w-4 h-4 text-accent shrink-0" />
              <h3 className="font-display text-lg tracking-tight">High-Index 1.67 Aspheric</h3>
            </div>
            <p className="font-sans text-xs text-foreground/70 leading-relaxed">
              Ultra-slim profile engineered for stronger prescriptions, maintaining lightness and eye proportion.
            </p>
          </div>

          <div className="space-y-3 border-t border-foreground/15 pt-6">
            <span className="brand-numeral text-sm text-foreground/40">04</span>
            <div className="flex items-center gap-2 text-foreground">
              <Sparkles className="w-4 h-4 text-accent shrink-0" />
              <h3 className="font-display text-lg tracking-tight">Diamond Anti-Glare</h3>
            </div>
            <p className="font-sans text-xs text-foreground/70 leading-relaxed">
              Nine-layer vacuum anti-reflective shield combined with hydrophobic and oleophobic smudge resistance.
            </p>
          </div>
        </div>

        {/* Prescription Guidance Banner */}
        <div className="border border-foreground/15 bg-[#ECE8E1] p-8 sm:p-10 lg:p-12 flex flex-col md:flex-row md:items-center justify-between gap-8">
          <div className="space-y-3 max-w-xl">
            <div className="flex items-center gap-2.5 text-xs font-sans uppercase tracking-[0.15em] text-foreground/60">
              <CheckCircle2 className="w-4 h-4 text-accent" />
              <span>Doctor-Verified Prescription Fulfillment</span>
            </div>
            <h4 className="font-display text-2xl tracking-tight text-foreground">
              Have an optical prescription?
            </h4>
            <p className="font-sans text-sm text-foreground/75 leading-relaxed">
              Upload your prescription file or enter your parameters during checkout. All optical orders
              include a complimentary 30-day adaptive comfort guarantee and precision PD calibration.
            </p>
          </div>

          <Link
            href="/find-your-frame"
            className="px-8 py-4 bg-foreground text-background text-xs font-sans font-medium uppercase tracking-[0.16em] hover:bg-foreground/90 transition-all focus-ring shrink-0 inline-flex items-center gap-3"
          >
            <span>Optical Fit & Lens Guide</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </section>

      {/* ── SECTION 6: FOOTER BRIDGE ─────────────────────────────────── */}
      <section className="border-t border-foreground/10 py-16 lg:py-20 px-6 lg:px-12 bg-background">
        <div className="max-w-[1440px] mx-auto flex flex-col sm:flex-row sm:items-center sm:justify-between gap-8">
          <div className="space-y-2">
            <p className="section-kicker text-foreground/40">Sun Protection</p>
            <p className="font-display text-2xl sm:text-3xl tracking-tight text-foreground leading-snug">
              Looking for polarized sunglasses?
            </p>
          </div>
          <Link
            href="/sunglasses"
            className="group inline-flex items-center justify-between gap-4 px-8 py-4 bg-foreground text-background font-sans font-medium tracking-wide transition-colors hover:bg-foreground/90 focus-ring shrink-0"
          >
            <span>Explore Sun Collection</span>
            <ArrowRight className="h-4 w-4 transition-transform motion-safe:group-hover:translate-x-1" />
          </Link>
        </div>
      </section>
    </div>
  );
}

export default function EyeglassesPage() {
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
      <EyeglassesContent />
    </Suspense>
  );
}
