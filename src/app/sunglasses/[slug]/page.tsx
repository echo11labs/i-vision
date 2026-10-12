import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, ShieldCheck, Sun, Sparkles } from "lucide-react";
import { Metadata } from "next";
import { SUNGLASSES_PRODUCTS } from "../fixtures";
import ScrollReset from "@/components/ScrollReset";

type Props = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = SUNGLASSES_PRODUCTS.find((p) => p.slug === slug);
  if (!product) return { title: "Sunglasses | I-VISION" };

  return {
    title: `${product.name} — Sunglasses | I-VISION`,
    description: product.description,
  };
}

export default async function SunglassesDetailPage({
  params,
  searchParams,
}: Props) {
  const { slug } = await params;
  const collectionSearchParams = await searchParams;

  const product = SUNGLASSES_PRODUCTS.find((p) => p.slug === slug);

  if (!product) {
    notFound();
  }

  // Preserve filter context when returning to collection
  const collectionQuery = new URLSearchParams();
  for (const key of ["shape"]) {
    const value = collectionSearchParams[key];
    if (typeof value === "string") collectionQuery.set(key, value);
  }
  const queryString = collectionQuery.toString();
  const backHref = queryString ? `/sunglasses?${queryString}` : "/sunglasses";

  const otherProducts = SUNGLASSES_PRODUCTS.filter((p) => p.slug !== slug).slice(
    0,
    3
  );

  return (
    <div className="flex-grow bg-background text-foreground">
      <ScrollReset />

      {/* ── SECTION 1: PRODUCT HERO ─────────────────────────────────── */}
      <section className="px-6 pb-20 pt-28 sm:px-10 sm:pt-32 lg:px-14 lg:pb-24 lg:pt-40 max-w-[1440px] mx-auto">
        {/* Navigation Breadcrumb */}
        <div className="mb-8 flex items-center justify-between border-b border-foreground/15 pb-5 lg:mb-10">
          <Link
            href={backHref}
            className="inline-flex items-center text-xs font-sans uppercase tracking-[0.15em] text-foreground/70 hover:text-foreground transition-colors focus-ring rounded-sm py-1"
          >
            <ArrowLeft className="h-4 w-4 mr-2" aria-hidden="true" />
            <span>Back to Sun Collection</span>
          </Link>
          <span className="text-[11px] font-sans tracking-[0.2em] uppercase text-foreground/45">
            Sun Architecture
          </span>
        </div>

        {/* 2-Column Product Stage */}
        <div className="grid grid-cols-1 border border-foreground/15 lg:grid-cols-[1.15fr_0.85fr]">
          {/* Main Product Photography */}
          <div className="relative aspect-square w-full overflow-hidden bg-[#ECE8E1] lg:aspect-auto lg:min-h-[700px]">
            <Image
              src={product.image}
              alt={`${product.name} sunglasses in ${product.color}`}
              fill
              sizes="(max-width: 1024px) 100vw, 55vw"
              className="object-cover object-center"
              priority
            />
            <div className="absolute bottom-0 inset-x-0 flex items-center justify-between bg-background/90 px-6 py-4 backdrop-blur-md border-t border-foreground/10">
              <span className="text-xs font-sans tracking-[0.16em] uppercase text-foreground/60">
                {product.shape} silhouette
              </span>
              <span className="text-xs font-sans tracking-[0.12em] uppercase text-foreground/60">
                {product.color}
              </span>
            </div>
          </div>

          {/* Details & Specifications Panel */}
          <div className="flex flex-col justify-between bg-[#F8F6F1] p-8 sm:p-12 lg:p-14 xl:p-18">
            <div>
              <div className="mb-8 border-b border-foreground/15 pb-8">
                <span className="section-kicker text-foreground/50 mb-3 block">
                  I-Vision Sun Edition 01
                </span>
                <h1 className="font-display text-hero tracking-display leading-tight mb-4 text-foreground">
                  {product.name}
                </h1>
                <div className="flex items-center gap-3 text-sm font-sans text-foreground/75">
                  <span className="font-medium">{product.color}</span>
                  <span className="text-foreground/30">•</span>
                  <span>{product.lensColor} Lenses</span>
                </div>
              </div>

              {/* Narrative Description */}
              <div className="mb-10 space-y-4">
                <h2 className="text-xs font-sans tracking-[0.18em] uppercase text-foreground/50">
                  Design Narrative
                </h2>
                <p className="font-sans text-base leading-relaxed text-foreground/80">
                  {product.description}
                </p>
              </div>

              {/* Technical Optics Feature Callouts */}
              <div className="mb-10 space-y-3.5 border-t border-foreground/15 pt-6">
                <h2 className="text-xs font-sans tracking-[0.18em] uppercase text-foreground/50 mb-4">
                  Optical Engineering
                </h2>
                <div className="flex items-center gap-3 text-sm font-sans text-foreground/85">
                  <Sun className="w-4 h-4 text-accent shrink-0" />
                  <span>{product.lensType} — 100% UVA/UVB Filter</span>
                </div>
                <div className="flex items-center gap-3 text-sm font-sans text-foreground/85">
                  <ShieldCheck className="w-4 h-4 text-accent shrink-0" />
                  <span>Anti-reflective interior coating for reduced eye fatigue</span>
                </div>
                <div className="flex items-center gap-3 text-sm font-sans text-foreground/85">
                  <Sparkles className="w-4 h-4 text-accent shrink-0" />
                  <span>Oleophobic & hydrophobic surface treatment</span>
                </div>
              </div>

              {/* Specification Bulletins */}
              <div className="mb-10 border-t border-foreground/15 pt-6">
                <h2 className="text-xs font-sans tracking-[0.18em] uppercase text-foreground/50 mb-3">
                  Craft Details
                </h2>
                <ul className="space-y-2.5 text-xs font-sans text-foreground/70">
                  {product.details.map((detail, idx) => (
                    <li key={idx} className="flex items-baseline gap-2.5">
                      <span className="text-foreground/40 font-mono text-xs select-none shrink-0">—</span>
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Action Bar */}
            <div className="flex flex-col gap-3 pt-6 border-t border-foreground/15">
              <Link
                href="/sunglasses"
                className="inline-flex items-center justify-between bg-foreground text-background px-8 py-4 text-xs font-sans font-medium uppercase tracking-[0.16em] hover:bg-foreground/90 transition-colors focus-ring"
              >
                <span>Browse All Sunglasses</span>
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>

              <Link
                href={`/sunglasses?shape=${product.shape}`}
                className="inline-flex items-center justify-between border border-foreground/20 px-8 py-4 text-xs font-sans font-medium uppercase tracking-[0.16em] hover:border-foreground transition-colors focus-ring"
              >
                <span>View More {product.shape} Frames</span>
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 2: EDITORIAL MODEL SPOTLIGHT ────────────────────── */}
      <section className="bg-[#171917] text-background py-20 lg:py-28 px-6 lg:px-14 border-t border-background/10">
        <div className="max-w-[1440px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Model Image */}
            <div className="lg:col-span-7 relative aspect-[3/4] sm:aspect-[4/5] w-full overflow-hidden bg-background/5">
              <Image
                src={product.modelImage}
                alt={`${product.name} worn on model`}
                fill
                sizes="(max-width: 1024px) 100vw, 60vw"
                className="object-cover object-center"
              />
            </div>

            {/* Editorial Context */}
            <div className="lg:col-span-5 flex flex-col gap-8">
              <span className="section-kicker text-background/50">
                How It Wears
              </span>
              <h2 className="font-display text-display-md tracking-display leading-tight text-background">
                Natural presence.<br />
                Tailored proportion.
              </h2>
              <p className="font-sans text-base leading-relaxed text-background/75">
                Every I-Vision frame is sculpted to balance weight across the nasal
                bridge and temples. {product.name} delivers comfortable, daylight
                wearability with an effortless silhouette.
              </p>

              <div className="border-t border-background/15 pt-6 space-y-3">
                <div className="flex justify-between text-xs font-sans">
                  <span className="text-background/50 uppercase tracking-widest">Model</span>
                  <span className="text-background/90">{product.name}</span>
                </div>
                <div className="flex justify-between text-xs font-sans">
                  <span className="text-background/50 uppercase tracking-widest">Silhouette</span>
                  <span className="text-background/90 capitalize">{product.shape}</span>
                </div>
                <div className="flex justify-between text-xs font-sans">
                  <span className="text-background/50 uppercase tracking-widest">Lens Tint</span>
                  <span className="text-background/90">{product.lensColor}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 3: RELATED STYLES ───────────────────────────────── */}
      <section className="py-20 lg:py-28 px-6 lg:px-14 max-w-[1440px] mx-auto border-t border-foreground/10">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-6">
          <div className="space-y-3">
            <span className="section-kicker text-foreground/50">
              Continue Exploring
            </span>
            <h2 className="font-display text-display-md tracking-display leading-tight">
              Other Sunglasses Styles
            </h2>
          </div>
          <Link
            href="/sunglasses"
            className="text-xs font-sans font-medium uppercase tracking-[0.16em] text-foreground hover:underline inline-flex items-center gap-2"
          >
            <span>View All</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {otherProducts.map((other) => (
            <Link
              key={other.slug}
              href={`/sunglasses/${other.slug}`}
              className="group flex flex-col focus-ring"
            >
              <div className="relative aspect-[4/5] w-full overflow-hidden bg-[#ECE8E1] mb-4 border border-foreground/10">
                <Image
                  src={other.image}
                  alt={other.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]"
                />
              </div>
              <div className="flex items-baseline justify-between">
                <h3 className="font-display text-xl tracking-tight text-foreground group-hover:text-foreground/75 transition-colors">
                  {other.name}
                </h3>
                <span className="text-[10px] font-sans uppercase tracking-widest text-foreground/50">
                  {other.shape}
                </span>
              </div>
              <span className="text-xs font-sans text-foreground/60 mt-1">
                {other.color}
              </span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
