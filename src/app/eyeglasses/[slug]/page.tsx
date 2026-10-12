import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, ShieldCheck, Sparkles, Glasses } from "lucide-react";
import { Metadata } from "next";
import { FIXTURE_PRODUCTS } from "../fixtures";
import HowItWearsEffect from "@/components/HowItWearsEffect";
import ScrollReset from "@/components/ScrollReset";

type Props = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = FIXTURE_PRODUCTS.find((p) => p.slug === slug);
  if (!product) return { title: "Eyeglasses | I-VISION" };

  return {
    title: `${product.name} — Optical Collection | I-VISION`,
    description: product.description,
  };
}

export default async function ProductDetailPage({ params, searchParams }: Props) {
  const { slug } = await params;
  const collectionSearchParams = await searchParams;
  
  const product = FIXTURE_PRODUCTS.find((p) => p.slug === slug);
  
  if (!product) {
    notFound();
  }

  // Keep the collection filter context intact when returning to frames
  const collectionQuery = new URLSearchParams();
  for (const key of ["shape", "color", "sort"]) {
    const value = collectionSearchParams[key];
    if (typeof value === "string") collectionQuery.set(key, value);
  }
  const queryString = collectionQuery.toString();
  const backHref = queryString ? `/eyeglasses?${queryString}` : "/eyeglasses";
  
  const similarShapesQuery = new URLSearchParams();
  similarShapesQuery.set("shape", product.shape);

  const relatedProducts = FIXTURE_PRODUCTS.filter((p) => p.slug !== slug).slice(0, 3);

  return (
    <div className="flex-grow bg-background text-foreground">
      <ScrollReset />
      
      {/* ── SECTION 1: PRODUCT HERO ─────────────────────────────────── */}
      <section className="px-4 pb-20 pt-28 sm:px-6 sm:pt-32 lg:px-12 lg:pb-24 lg:pt-40 max-w-[1440px] mx-auto">
        <div className="mb-8 flex items-center justify-between border-b border-foreground/15 pb-5 lg:mb-10">
          <Link 
            href={backHref}
            className="inline-flex items-center text-xs font-sans uppercase tracking-[0.15em] text-foreground/70 hover:text-foreground transition-colors focus-ring rounded-sm py-1"
          >
            <ArrowLeft className="h-4 w-4 mr-2" aria-hidden="true" />
            <span className="underline underline-offset-4 decoration-transparent hover:decoration-foreground/30 transition-colors">
              Back to Optical Collection
            </span>
          </Link>
          <span className="text-[11px] font-sans tracking-[0.2em] uppercase text-foreground/45">
            Archival Optical Study
          </span>
        </div>

        <div className="grid grid-cols-1 border border-foreground/15 lg:grid-cols-[1.12fr_0.88fr]">
          {/* Product Image Column */}
          <div className="relative aspect-square w-full overflow-hidden bg-[#ECE8E1] lg:aspect-auto lg:min-h-[700px]">
            <Image 
              src={product.image}
              alt={`${product.name} optical frame in ${product.shape} shape, color ${product.color}`}
              fill
              sizes="(max-width: 1024px) 100vw, 55vw"
              className="object-cover object-center"
              priority
            />
            <div className="absolute bottom-0 left-0 right-0 flex items-center justify-between bg-background/90 px-6 py-4 backdrop-blur-md border-t border-foreground/10">
              <span className="text-xs font-sans tracking-[0.16em] uppercase text-foreground/60">
                {product.shape.replace("-", " ")} silhouette
              </span>
              <span className="text-xs font-sans tracking-[0.12em] uppercase text-foreground/60">
                {product.color}
              </span>
            </div>
          </div>

          {/* Product Details Column */}
          <div className="flex flex-col justify-between bg-[#F8F6F1] p-8 sm:p-12 lg:p-14 xl:p-18">
            <div>
              <div className="mb-8 border-b border-foreground/15 pb-8">
                <span className="section-kicker text-foreground/50 mb-3 block">
                  I-Vision Optical Archive
                </span>
                <h1 className="font-display text-hero tracking-display leading-tight mb-4 text-foreground">
                  {product.name}
                </h1>
                <div className="flex items-center gap-3 text-sm font-sans text-foreground/75">
                  <span className="font-medium capitalize">{product.shape.replace("-", " ")}</span>
                  <span className="text-foreground/30">•</span>
                  <span>{product.color}</span>
                  <span className="text-foreground/30">•</span>
                  <span className="text-foreground/60">{product.measurements}</span>
                </div>
              </div>
              
              {/* Narrative Description */}
              <div className="mb-8 space-y-3">
                <h2 className="text-xs font-sans tracking-[0.18em] uppercase text-foreground/50">
                  Design Narrative
                </h2>
                <p className="font-sans text-base leading-relaxed text-foreground/80">
                  {product.description}
                </p>
              </div>

              {/* Optical Engineering Callouts */}
              <div className="mb-8 space-y-3.5 border-t border-foreground/15 pt-6">
                <h2 className="text-xs font-sans tracking-[0.18em] uppercase text-foreground/50 mb-3">
                  Optical & Craft Standards
                </h2>
                <div className="flex items-center gap-3 text-sm font-sans text-foreground/85">
                  <Glasses className="w-4 h-4 text-accent shrink-0" />
                  <span>{product.lensType}</span>
                </div>
                <div className="flex items-center gap-3 text-sm font-sans text-foreground/85">
                  <ShieldCheck className="w-4 h-4 text-accent shrink-0" />
                  <span>Material: {product.material}</span>
                </div>
                <div className="flex items-center gap-3 text-sm font-sans text-foreground/85">
                  <Sparkles className="w-4 h-4 text-accent shrink-0" />
                  <span>Calibrated weight distribution for all-day nasal comfort</span>
                </div>
              </div>

              {/* Specification Bulletins */}
              <div className="mb-8 border-t border-foreground/15 pt-6">
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
                href="/find-your-frame"
                className="inline-flex items-center justify-between bg-foreground text-background px-8 py-4 text-xs font-sans font-medium uppercase tracking-[0.16em] hover:bg-foreground/90 transition-colors focus-ring"
              >
                <span>Find Your Fit / Prescription Guide</span>
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              
              <Link 
                href={`/eyeglasses?${similarShapesQuery.toString()}`}
                className="inline-flex items-center justify-between border border-foreground/20 px-8 py-4 text-xs font-sans font-medium uppercase tracking-[0.16em] hover:border-foreground transition-colors focus-ring"
              >
                <span>Explore Similar {product.shape} Frames</span>
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 2: LIFESTYLE / HOW IT WEARS ──────────────────────── */}
      {/* 
        This is a template section that expects per-product lifestyle photography 
        in a real CMS implementation. Using editorial assets as a placeholder.
      */}
      <section className="w-full bg-foreground border-t border-foreground/10 text-background pt-20 lg:pt-28 pb-20 lg:pb-28">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 lg:mb-16 gap-8">
            <div className="space-y-4 max-w-2xl">
              <h2 className="section-kicker text-background/50">
                In Context
              </h2>
              <h3 className="font-display text-display-lg tracking-display text-background leading-tight">
                How it wears.
              </h3>
            </div>
            <p className="font-sans text-lg text-background/80 max-w-sm md:text-right leading-relaxed">
              Form and proportion designed to complement the individual face.
            </p>
          </div>

          <div className="relative w-full aspect-[4/5] sm:aspect-[16/9] lg:aspect-[21/9] bg-background/5 overflow-hidden">
            <HowItWearsEffect imageUrl={product.howItWearsImage || "/images/editorial_desktop.jpg"} />
          </div>

        </div>
      </section>

      {/* ── SECTION 3: RELATED OPTICAL FRAMES ────────────────────────── */}
      <section className="py-20 lg:py-24 px-6 lg:px-12 max-w-[1440px] mx-auto border-t border-foreground/10">
        <div className="flex items-center justify-between mb-12">
          <div>
            <span className="section-kicker text-foreground/50">Curated Archive</span>
            <h2 className="font-display text-2xl sm:text-3xl tracking-tight text-foreground mt-2">
              Explore More Optical Frames
            </h2>
          </div>
          <Link
            href="/eyeglasses"
            className="text-xs font-sans uppercase tracking-[0.14em] text-foreground/70 hover:text-foreground underline underline-offset-4"
          >
            All Frames ({FIXTURE_PRODUCTS.length})
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {relatedProducts.map((rel) => (
            <Link
              key={rel.slug}
              href={`/eyeglasses/${rel.slug}`}
              className="group flex flex-col focus-ring"
            >
              <div className="relative aspect-[4/5] w-full overflow-hidden bg-[#ECE8E1] border border-foreground/10 mb-4">
                <Image
                  src={rel.image}
                  alt={rel.name}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]"
                />
                <div className="absolute top-3.5 left-3.5 pointer-events-none">
                  <span className="font-sans text-[10px] font-medium tracking-[0.16em] uppercase text-foreground/80">
                    {rel.shape}
                  </span>
                </div>
              </div>
              <div className="flex items-baseline justify-between">
                <h3 className="font-display text-xl tracking-tight text-foreground group-hover:text-foreground/75 transition-colors">
                  {rel.name}
                </h3>
                <span className="text-xs font-sans text-foreground/50">
                  {rel.color}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

    </div>
  );
}
