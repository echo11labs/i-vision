import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Sun } from "lucide-react";
import { SUNGLASSES_PRODUCTS } from "./sunglasses/fixtures";

export default function SunglassesShowcase() {
  const featuredSunglasses = SUNGLASSES_PRODUCTS.slice(0, 4);

  return (
    <section className="w-full bg-[#171917] text-background border-t border-background/10 py-20 sm:py-24 lg:py-32">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-14">
        
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-14 lg:mb-20 gap-8">
          <div className="space-y-4 max-w-2xl">
            <div className="flex items-center gap-2.5">
              <Sun className="w-4 h-4 text-accent" />
              <span className="section-kicker text-background/60">
                Sun Collection — Edition 01
              </span>
            </div>
            <h2 className="font-display text-hero tracking-display leading-tight text-background">
              Form in full sunlight.
            </h2>
          </div>
          
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 lg:text-right">
            <p className="font-sans text-body-lg text-background/70 max-w-sm leading-relaxed">
              Engineered with high-contrast polarizing filters and Japanese titanium for changing daylight.
            </p>
            <Link
              href="/sunglasses"
              className="inline-flex items-center justify-between gap-3 px-6 py-3.5 bg-background text-foreground text-xs font-sans font-medium uppercase tracking-[0.16em] hover:bg-background/90 transition-all focus-ring shrink-0"
            >
              <span>View All Sunglasses</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Mobile Editorial Stack */}
        <div className="flex flex-col gap-12 lg:hidden pb-8">
          {featuredSunglasses.map((item) => (
            <Link
              key={item.slug}
              href={`/sunglasses/${item.slug}`}
              aria-label={`View ${item.name} sunglasses`}
              className="group flex flex-col focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-background"
            >
              {/* Image Container (Sharp edges, 4:5 ratio, Dual Hover) */}
              <div className="relative aspect-[4/5] w-full overflow-hidden bg-[#ECE8E1] mb-4">
                {/* Product Frame Shot */}
                <Image
                  src={item.image}
                  alt={`${item.name} sunglasses in ${item.color}`}
                  fill
                  sizes="(max-width: 1024px) 100vw, 25vw"
                  className="object-cover object-center transition-all duration-[1.2s] ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:opacity-0 group-hover:scale-105"
                />

                {/* On-Model Portrait (reveals on hover) */}
                <Image
                  src={item.modelImage}
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
                <h3 className="font-display text-2xl tracking-tight text-background group-hover:text-background/80 transition-colors">
                  {item.name}
                </h3>
                <span className="text-[10px] font-sans uppercase tracking-widest text-background/50">
                  {item.shape}
                </span>
              </div>

              <div className="flex items-center justify-between text-xs font-sans text-background/60">
                <span>{item.color}</span>
                <span className="text-background/40">{item.measurements}</span>
              </div>
            </Link>
          ))}
        </div>

        {/* Desktop Staggered Grid */}
        <div className="hidden lg:grid lg:grid-cols-4 gap-x-8 pb-0">
          {featuredSunglasses.map((item, index) => (
            <Link
              key={item.slug}
              href={`/sunglasses/${item.slug}`}
              aria-label={`View ${item.name} sunglasses`}
              className={`group flex flex-col focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-background focus-visible:ring-offset-2 focus-visible:ring-offset-[#171917] ${index % 2 !== 0 ? "mt-16" : ""}`}
            >
              {/* Image Container with Dual Hover */}
              <div className="relative aspect-[4/5] w-full overflow-hidden bg-[#ECE8E1] mb-5">
                {/* Product Frame Shot */}
                <Image
                  src={item.image}
                  alt={`${item.name} sunglasses in ${item.color}`}
                  fill
                  sizes="25vw"
                  className="object-cover object-center transition-all duration-[1.2s] ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:opacity-0 group-hover:scale-105"
                />

                {/* On-Model Portrait (reveals on hover) */}
                <Image
                  src={item.modelImage}
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
                <h3 className="font-display text-2xl tracking-tight text-background group-hover:text-background/80 transition-colors">
                  {item.name}
                </h3>
                <span className="text-[10px] font-sans uppercase tracking-widest text-background/50">
                  {item.shape}
                </span>
              </div>

              <div className="flex items-center justify-between text-xs font-sans text-background/60">
                <span>{item.color}</span>
                <span className="text-background/40">{item.measurements}</span>
              </div>
            </Link>
          ))}
        </div>

        {/* Feature Highlights Ribbon */}
        <div className="mt-20 lg:mt-28 pt-12 border-t border-background/10 grid grid-cols-1 md:grid-cols-3 gap-8 text-background/80">
          <div className="space-y-2">
            <span className="text-[11px] font-sans uppercase tracking-[0.2em] text-background/40">Optics</span>
            <p className="text-sm font-sans leading-relaxed">
              Polarized Category 3 lenses engineered to block 100% of UVA and UVB rays without color distortion.
            </p>
          </div>
          <div className="space-y-2">
            <span className="text-[11px] font-sans uppercase tracking-[0.2em] text-background/40">Material</span>
            <p className="text-sm font-sans leading-relaxed">
              Featherlight Japanese titanium and hand-beveled Italian Mazzucchelli acetate crafted for all-day comfort.
            </p>
          </div>
          <div className="space-y-2">
            <span className="text-[11px] font-sans uppercase tracking-[0.2em] text-background/40">Fit Guarantee</span>
            <p className="text-sm font-sans leading-relaxed">
              Thoughtfully balanced temple taper and custom silicon pads designed for natural, secure everyday wear.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
