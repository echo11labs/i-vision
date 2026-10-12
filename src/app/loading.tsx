export default function GlobalLoading() {
  return (
    <div className="flex-grow flex items-center justify-center min-h-[60vh] bg-background text-foreground">
      <div className="flex flex-col items-center gap-6">
        <div className="font-logo text-xl sm:text-2xl tracking-brand uppercase text-foreground/80 animate-pulse">
          I-VISION
        </div>
        <div className="w-24 h-[1px] bg-foreground/20 overflow-hidden relative">
          <div className="w-10 h-full bg-foreground absolute top-0 left-0 animate-[shimmer_1.4s_infinite_ease-in-out]" />
        </div>
      </div>
    </div>
  );
}
