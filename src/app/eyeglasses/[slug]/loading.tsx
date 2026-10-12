export default function ProductDetailLoading() {
  return (
    <div className="flex-grow bg-background text-foreground animate-pulse">
      <section className="px-4 pb-20 pt-28 sm:px-6 sm:pt-32 lg:px-8 lg:pb-24 lg:pt-40 max-w-[1440px] mx-auto">
        {/* Breadcrumb Skeleton */}
        <div className="mb-8 flex items-center justify-between border-b border-foreground/15 pb-5 lg:mb-10">
          <div className="h-4 w-36 bg-foreground/10 rounded-sm" />
          <div className="h-3 w-24 bg-foreground/10 rounded-sm" />
        </div>

        {/* Product Card Grid Skeleton */}
        <div className="grid grid-cols-1 border border-foreground/15 lg:grid-cols-[1.12fr_0.88fr]">
          {/* Image Placeholder */}
          <div className="relative aspect-square w-full bg-[#E5E3DB] lg:aspect-auto lg:min-h-[680px] flex items-center justify-center">
            <div className="w-16 h-16 rounded-full border border-foreground/10 flex items-center justify-center">
              <span className="font-logo text-xs text-foreground/30">IV</span>
            </div>
          </div>

          {/* Details Placeholder */}
          <div className="flex flex-col justify-center bg-[#F8F6F1] p-7 sm:p-10 lg:p-14 xl:p-20">
            <div className="mb-8 border-b border-foreground/15 pb-8 space-y-4">
              <div className="h-3 w-20 bg-foreground/15 rounded-sm" />
              <div className="h-10 sm:h-12 w-3/4 bg-foreground/20 rounded-sm" />
              <div className="h-5 w-1/2 bg-foreground/15 rounded-sm mt-3" />
            </div>

            <div className="mb-12 border-l-2 border-foreground/20 pl-5 space-y-3">
              <div className="h-3 w-24 bg-foreground/15 rounded-sm" />
              <div className="h-4 w-full bg-foreground/15 rounded-sm" />
              <div className="h-4 w-5/6 bg-foreground/10 rounded-sm" />
            </div>

            <div className="flex flex-col gap-3 mt-4">
              <div className="h-12 w-full bg-foreground/80 rounded-sm" />
              <div className="h-12 w-full border border-foreground/20 rounded-sm" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
