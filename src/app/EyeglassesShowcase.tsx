import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Glasses } from "lucide-react";
import { FIXTURE_PRODUCTS } from "./eyeglasses/fixtures";

export default function EyeglassesShowcase() {
  const featuredEyeglasses = FIXTURE_PRODUCTS.slice(0, 4);

  return (
    <section className="w-full bg-background pt-32 pb-16 sm:pt-40 sm:pb-20 lg:pb-28">
      <div className="mx-auto max-w-[1440px] px-6 sm:px-12 lg:px-20">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 lg:mb-16 gap-6">
          <div className="max-w-2xl space-y-4">
            <div className="flex items-center gap-2">
              <Glasses className="w-4 h-4 text-foreground/50" />
              <h2 className="section-kicker text-foreground/50">
                Optical Collection — Archival Edition
              </h2>
            </div>
            <h3 className="font-display text-display-lg leading-tight tracking-display text-foreground">
              Clarity for daily thought.
            </h3>
            <p className="text-body-lg text-foreground/70 font-sans max-w-lg mt-4">
              Calibrated Japanese beta-titanium and cured bio-acetate engineered for sustained focus and weightless wear.
            </p>
          </div>
          
          <div className="shrink-0">
            <Link 
              href="/eyeglasses"
              className="group inline-flex items-center text-foreground hover:text-accent font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              <span className="underline underline-offset-4 decoration-foreground/30 group-hover:decoration-accent transition-colors">
                View all optical frames
              </span>
              <ArrowRight className="h-4 w-4 ml-2 transition-transform motion-safe:group-hover:translate-x-1" aria-hidden="true" />
            </Link>
          </div>
        </div>

        {/* Mobile Editorial Stack */}
        <div className="flex flex-col gap-12 lg:hidden pb-8">
          {featuredEyeglasses.map((item) => (
            <Link 
              key={item.slug}
              href={`/eyeglasses/${item.slug}`}
              aria-label={`View ${item.name} eyeglasses`}
              className="group flex flex-col focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground"
            >
              {/* Image Container (Sharp edges, 4:5 ratio, Dual Hover) */}
              <div className="relative aspect-[4/5] w-full overflow-hidden bg-[#ECE8E1] mb-4">
                {/* Product Frame Shot */}
                <Image
                  src={item.image}
                  alt={`${item.name} optical frame in ${item.color}`}
                  fill
                  sizes="(max-width: 1024px) 100vw, 25vw"
                  className="object-cover object-center transition-all duration-[1.2s] ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:opacity-0 group-hover:scale-105"
                />

                {/* On-Model Portrait (reveals on hover) */}
                <Image
                  src={item.howItWearsImage}
                  alt={`${item.name} worn on model`}
                  fill
                  sizes="(max-width: 1024px) 100vw, 25vw"
                  className="object-cover object-center opacity-0 group-hover:opacity-100 group-hover:scale-100 transition-all duration-[1.2s] ease-[cubic-bezier(0.25,1,0.5,1)]"
                />

                {/* Top-left Lens Badge (clean text without background) */}
                <div className="absolute top-3.5 left-3.5 z-10 pointer-events-none">
                  <span className="font-sans text-[10px] sm:text-[11px] font-medium uppercase tracking-[0.16em] text-foreground/80">
                    {item.lensType}
                  </span>
                </div>

                {/* Floating Action Hint */}
                <div className="absolute bottom-0 inset-x-0 p-3.5 bg-gradient-to-t from-black/75 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-between text-white">
                  <span className="text-[10px] font-sans uppercase tracking-widest font-medium">
                    Explore Details
                  </span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
              
              {/* Title & Specs */}
              <div className="flex items-baseline justify-between mb-1">
                <h3 className="font-display text-2xl tracking-tight text-foreground group-hover:text-foreground/80 transition-colors">
                  {item.name}
                </h3>
                <span className="text-[10px] font-sans uppercase tracking-widest text-foreground/50">
                  {item.shape}
                </span>
              </div>

              <div className="flex items-center justify-between text-xs font-sans text-foreground/60">
                <span>{item.color}</span>
                <span className="text-foreground/40">{item.measurements}</span>
              </div>
            </Link>
          ))}
        </div>

        {/* Desktop Staggered Grid */}
        <div className="hidden lg:grid lg:grid-cols-4 gap-x-8 pb-0">
          {featuredEyeglasses.map((item, index) => (
            <Link 
              key={item.slug}
              href={`/eyeglasses/${item.slug}`}
              aria-label={`View ${item.name} eyeglasses`}
              className={`group flex flex-col focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-offset-2 focus-visible:ring-offset-background ${index % 2 !== 0 ? "mt-16" : ""}`}
            >
              {/* Image Container with Dual Hover */}
              <div className="relative aspect-[4/5] w-full overflow-hidden bg-[#ECE8E1] mb-5">
                {/* Product Frame Shot */}
                <Image
                  src={item.image}
                  alt={`${item.name} optical frame in ${item.color}`}
                  fill
                  sizes="25vw"
                  className="object-cover object-center transition-all duration-[1.2s] ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:opacity-0 group-hover:scale-105"
                />

                {/* On-Model Portrait (reveals on hover) */}
                <Image
                  src={item.howItWearsImage}
                  alt={`${item.name} worn on model`}
                  fill
                  sizes="25vw"
                  className="object-cover object-center opacity-0 group-hover:opacity-100 group-hover:scale-100 transition-all duration-[1.2s] ease-[cubic-bezier(0.25,1,0.5,1)]"
                />

                {/* Top-left Lens Badge (clean text without background) */}
                <div className="absolute top-3.5 left-3.5 z-10 pointer-events-none">
                  <span className="font-sans text-[10px] sm:text-[11px] font-medium uppercase tracking-[0.16em] text-foreground/80">
                    {item.lensType}
                  </span>
                </div>

                {/* Floating Action Hint */}
                <div className="absolute bottom-0 inset-x-0 p-3.5 bg-gradient-to-t from-black/75 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-between text-white">
                  <span className="text-[10px] font-sans uppercase tracking-widest font-medium">
                    Explore Details
                  </span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
              
              {/* Title & Specs */}
              <div className="flex items-baseline justify-between mb-1">
                <h3 className="font-display text-2xl tracking-tight text-foreground group-hover:text-foreground/80 transition-colors">
                  {item.name}
                </h3>
                <span className="text-[10px] font-sans uppercase tracking-widest text-foreground/50">
                  {item.shape}
                </span>
              </div>

              <div className="flex items-center justify-between text-xs font-sans text-foreground/60">
                <span>{item.color}</span>
                <span className="text-foreground/40">{item.measurements}</span>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
}
