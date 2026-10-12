"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { ArrowRight, Eye, ShieldCheck, RefreshCw, FileText } from "lucide-react";
import {
  CONTACT_LENS_PRODUCTS,
  type ContactLensModality,
  type ContactLensProduct,
} from "./fixtures";
import ContactLensVisual from "./ContactLensVisual";

const MODALITY_TABS: { label: string; value: ContactLensModality }[] = [
  { label: "All Lenses", value: "all" },
  { label: "Daily Disposables", value: "dailies" },
  { label: "Monthly Wear", value: "monthlies" },
  { label: "Astigmatism (Toric)", value: "toric" },
  { label: "Multifocal (Presbyopia)", value: "multifocal" },
];

function ContactLensCard({ product }: { product: ContactLensProduct }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <article
      className="group flex flex-col bg-background focus-within:ring-2 focus-within:ring-foreground transition-all duration-300"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* 4:5 Aspect Ratio Media Frame with Dual Hover View */}
      <div className="relative aspect-[4/5] w-full overflow-hidden bg-[#ECE8E1] mb-5">
        <ContactLensVisual product={product} isHovered={isHovered} />

        {/* Top-left Lens Badge (clean text without background) */}
        <div className="absolute top-3.5 left-3.5 z-10 pointer-events-none">
          <span className="font-sans text-[10px] sm:text-[11px] font-medium uppercase tracking-[0.16em] text-foreground/80">
            {product.modalityLabel}
          </span>
        </div>

        {/* Floating Action Hint */}
        <div className="absolute bottom-0 inset-x-0 p-3.5 bg-gradient-to-t from-black/75 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-between text-white">
          <span className="text-[10px] font-sans uppercase tracking-widest font-medium">
            Select Prescription & Packs
          </span>
          <ArrowRight className="w-3.5 h-3.5" />
        </div>
      </div>

      {/* Card Metadata (Line 1: Name + Brand, Line 2: Specs + Price) */}
      <div className="flex items-baseline justify-between mb-1">
        <h3 className="font-display text-2xl tracking-tight text-foreground group-hover:text-foreground/80 transition-colors">
          {product.name}
        </h3>
        <span className="text-[10px] font-sans uppercase tracking-widest text-foreground/50">
          {product.brand}
        </span>
      </div>

      <div className="flex items-center justify-between text-xs font-sans text-foreground/60 mb-2">
        <span>{product.packSize}</span>
        <span className="text-foreground/80 font-medium">
          ${product.pricePerBox} / box
        </span>
      </div>

      <div className="flex items-center justify-between text-[11px] font-mono text-foreground/45 pt-2 border-t border-foreground/10">
        <span>{product.waterContent} H₂O</span>
        <span>{product.oxygenTransmissibility}</span>
      </div>
    </article>
  );
}

export default function ContactLensesView() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const selectedModality = (searchParams.get("modality") as ContactLensModality) || "all";

  const handleModalitySelect = (modality: ContactLensModality) => {
    const params = new URLSearchParams(searchParams.toString());
    if (modality === "all") {
      params.delete("modality");
    } else {
      params.set("modality", modality);
    }
    const queryString = params.toString();
    router.push(queryString ? `${pathname}?${queryString}` : pathname, {
      scroll: false,
    });
  };

  const filteredProducts = useMemo(() => {
    if (selectedModality === "all") return CONTACT_LENS_PRODUCTS;
    return CONTACT_LENS_PRODUCTS.filter((p) => p.modality === selectedModality);
  }, [selectedModality]);

  return (
    <div className="flex-grow bg-background text-foreground">
      
      {/* ── SECTION 1: EDITORIAL HEADER ────────────────────────────── */}
      <section className="relative isolate pt-36 pb-16 sm:pt-44 sm:pb-20 border-b border-foreground/10 bg-background">
        <div className="mx-auto max-w-[1440px] px-6 sm:px-10 lg:px-14">
          <div className="max-w-3xl space-y-5">
            <div className="flex items-center gap-2.5">
              <Eye className="w-4 h-4 text-accent" />
              <span className="section-kicker text-foreground/60">
                Clinical Eye Care — Certified Contact Optics
              </span>
            </div>

            <h1 className="font-display text-hero tracking-display leading-tight text-foreground">
              Weightless sight.<br />
              Calibrated moisture.
            </h1>

            <p className="font-sans text-body-lg text-foreground/75 leading-relaxed max-w-2xl pt-2">
              Direct-from-manufacturer daily and monthly contact lenses from the world&apos;s most trusted ophthalmic laboratories. Sourced in factory-sealed boxes with optometrist prescription verification.
            </p>
          </div>

          {/* Quick Reassurance Ticker */}
          <div className="mt-12 pt-8 border-t border-foreground/10 grid grid-cols-1 sm:grid-cols-3 gap-6 text-foreground/70">
            <div className="flex items-center gap-3">
              <ShieldCheck className="w-4 h-4 text-accent shrink-0" />
              <span className="text-xs font-sans tracking-wide">
                100% Doctor-Verified Prescriptions
              </span>
            </div>
            <div className="flex items-center gap-3">
              <RefreshCw className="w-4 h-4 text-accent shrink-0" />
              <span className="text-xs font-sans tracking-wide">
                Flexible Auto-Replenish & Box Discounts
              </span>
            </div>
            <div className="flex items-center gap-3">
              <FileText className="w-4 h-4 text-accent shrink-0" />
              <span className="text-xs font-sans tracking-wide">
                FSA / HSA Eligible with Itemized Receipts
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 2: MODALITY FILTER BAR ─────────────────────────── */}
      <nav aria-label="Contact Lens Categories" className="sticky top-16 z-30 bg-background/90 backdrop-blur-md border-b border-foreground/10">
        <div className="mx-auto max-w-[1440px] px-6 sm:px-10 lg:px-14">
          <div className="flex items-center justify-between py-4 gap-4 overflow-x-auto no-scrollbar">
            <div className="flex items-center gap-2 sm:gap-3 shrink-0">
              {MODALITY_TABS.map((tab) => {
                const isActive = selectedModality === tab.value;
                return (
                  <button
                    key={tab.value}
                    onClick={() => handleModalitySelect(tab.value)}
                    className={`px-4 py-2 text-xs font-sans uppercase tracking-[0.14em] transition-all focus-ring ${
                      isActive
                        ? "bg-foreground text-background font-medium"
                        : "bg-foreground/5 text-foreground/70 hover:bg-foreground/10 hover:text-foreground"
                    }`}
                  >
                    {tab.label}
                  </button>
                );
              })}
            </div>

            <span className="hidden sm:inline-block text-xs font-sans text-foreground/50 tracking-wider">
              {filteredProducts.length} Formulations
            </span>
          </div>
        </div>
      </nav>

      {/* ── SECTION 3: EDITORIAL PRODUCT GRID ──────────────────────── */}
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-[1440px] px-6 sm:px-10 lg:px-14">
          {filteredProducts.length === 0 ? (
            <div className="text-center py-24 space-y-4">
              <p className="font-display text-2xl text-foreground">
                No lenses found in this category.
              </p>
              <button
                onClick={() => handleModalitySelect("all")}
                className="text-xs font-sans uppercase tracking-widest text-accent underline underline-offset-4"
              >
                Reset Filter
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-14">
              {filteredProducts.map((product) => (
                <ContactLensCard key={product.slug} product={product} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── SECTION 4: HOW ORDERING WORKS (MINIMALIST REASSURANCE) ──── */}
      <section className="border-t border-foreground/10 py-20 bg-foreground/[0.02]">
        <div className="mx-auto max-w-[1440px] px-6 sm:px-10 lg:px-14">
          <div className="max-w-2xl mb-12">
            <span className="section-kicker text-foreground/60 block mb-2">
              Optical Protocol
            </span>
            <h2 className="font-display text-display-md tracking-display text-foreground leading-tight">
              Simple, verified prescription fulfillment.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
            <div className="space-y-3 pt-6 border-t border-foreground/15">
              <span className="font-mono text-xs text-foreground/40 block">
                01 — PRESCRIPTION ENTRY
              </span>
              <h3 className="font-display text-xl text-foreground">
                Select your power & parameters
              </h3>
              <p className="font-sans text-xs text-foreground/70 leading-relaxed">
                Choose your power (SPH), cylinder (CYL), axis, and base curve from your optometrist prescription, or upload a photo of your box.
              </p>
            </div>

            <div className="space-y-3 pt-6 border-t border-foreground/15">
              <span className="font-mono text-xs text-foreground/40 block">
                02 — DOCTOR VERIFICATION
              </span>
              <h3 className="font-display text-xl text-foreground">
                Verified with your eye clinic
              </h3>
              <p className="font-sans text-xs text-foreground/70 leading-relaxed">
                Under federal optical guidelines, our team reaches out directly to your optometrist to verify your active prescription at zero extra charge.
              </p>
            </div>

            <div className="space-y-3 pt-6 border-t border-foreground/15">
              <span className="font-mono text-xs text-foreground/40 block">
                03 — FACTORY FRESH DISPATCH
              </span>
              <h3 className="font-display text-xl text-foreground">
                Sealed direct-from-lab boxes
              </h3>
              <p className="font-sans text-xs text-foreground/70 leading-relaxed">
                Your lenses ship in sterile, factory-sealed boxes with generous expiration dates and our 30-day torn lens replacement guarantee.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 5: EYE CARE FAQ ─────────────────────────────────── */}
      <section className="border-t border-foreground/10 py-20">
        <div className="mx-auto max-w-[1440px] px-6 sm:px-10 lg:px-14">
          <div className="max-w-xl mb-12">
            <span className="section-kicker text-foreground/60 block mb-2">
              Ophthalmic Inquiries
            </span>
            <h2 className="font-display text-display-md tracking-display text-foreground">
              Frequently asked questions.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-14 gap-y-10">
            <div className="space-y-2 pb-6 border-b border-foreground/10">
              <h3 className="font-display text-lg text-foreground">
                Can I use my glasses prescription for contact lenses?
              </h3>
              <p className="font-sans text-xs text-foreground/70 leading-relaxed">
                Glasses sit approximately 12mm away from your eyes, whereas contact lenses rest directly against your cornea. A contact lens prescription requires specific base curve (BC) and diameter (DIA) measurements provided by an eye care professional.
              </p>
            </div>

            <div className="space-y-2 pb-6 border-b border-foreground/10">
              <h3 className="font-display text-lg text-foreground">
                What is the difference between Dailies and Monthlies?
              </h3>
              <p className="font-sans text-xs text-foreground/70 leading-relaxed">
                Daily disposables are worn once and discarded at bedtime, eliminating the need for lens solution or cleaning cases. Monthly lenses are cleaned overnight in multipurpose solution and replaced every 30 days.
              </p>
            </div>

            <div className="space-y-2 pb-6 border-b border-foreground/10">
              <h3 className="font-display text-lg text-foreground">
                Are contact lens orders eligible for FSA / HSA funds?
              </h3>
              <p className="font-sans text-xs text-foreground/70 leading-relaxed">
                Yes. Prescription contact lenses are 100% eligible medical expenses under Flexible Spending Accounts (FSA) and Health Savings Accounts (HSA). We provide an itemized receipt containing all required optical coding upon dispatch.
              </p>
            </div>

            <div className="space-y-2 pb-6 border-b border-foreground/10">
              <h3 className="font-display text-lg text-foreground">
                Can I order contacts and sunglasses together?
              </h3>
              <p className="font-sans text-xs text-foreground/70 leading-relaxed">
                Many of our clients wear daily contact lenses paired with non-prescription I-Vision polarized sunglasses for outdoor clarity and full UV400 radiation shielding.
              </p>
            </div>
          </div>

          {/* Bottom CTA to browse sunglasses / frames */}
          <div className="mt-16 pt-10 border-t border-foreground/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div>
              <p className="font-display text-xl text-foreground">
                Looking to pair your lenses with handcrafted frames?
              </p>
              <p className="font-sans text-xs text-foreground/60 mt-1">
                Explore Japanese titanium optical frames and high-contrast sunglasses.
              </p>
            </div>
            <div className="flex items-center gap-4">
              <Link
                href="/eyeglasses"
                className="px-6 py-3 border border-foreground/20 text-xs font-sans uppercase tracking-[0.16em] hover:bg-foreground hover:text-background transition-colors focus-ring"
              >
                Optical Frames
              </Link>
              <Link
                href="/sunglasses"
                className="px-6 py-3 bg-foreground text-background text-xs font-sans uppercase tracking-[0.16em] hover:bg-foreground/90 transition-colors focus-ring"
              >
                Sunglasses
              </Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
