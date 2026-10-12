"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function CampaignSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const imageWrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !containerRef.current || !imageWrapperRef.current) return;

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // Cinematic scroll zoom with top-anchor: keeps the blonde model's head and glasses
      // fully in view throughout the entire animation without top-edge clipping
      gsap.fromTo(
        imageWrapperRef.current,
        {
          scale: 1.0,
          yPercent: 0,
          transformOrigin: "center top",
        },
        {
          scale: 1.08,
          yPercent: 2,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.2,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef} 
      className="w-full bg-background border-t border-foreground/10 pt-20 lg:pt-28 pb-20 lg:pb-28 overflow-hidden"
    >
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Strip */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 lg:mb-16 gap-8">
          <div className="space-y-4 max-w-2xl">
            <h2 className="section-kicker text-foreground/70">
              The Collection
            </h2>
            <h3 className="font-display text-display-lg tracking-display text-foreground leading-tight">
              Shared perspectives.
            </h3>
          </div>
          <p className="font-sans text-body-lg text-foreground/80 max-w-sm md:text-right leading-relaxed">
            Distinct shapes united by a disciplined approach to proportion. Designed for the spaces we share.
          </p>
        </div>

        {/* 4K Image Container with Scroll Zoom (Preserving 21/9 editorial aspect ratio & headroom) */}
        <div 
          ref={containerRef}
          className="relative w-full aspect-[4/5] sm:aspect-[16/9] lg:aspect-[21/9] bg-foreground/5 overflow-hidden rounded-2xl sm:rounded-3xl shadow-sm"
        >
          <div 
            ref={imageWrapperRef}
            className="relative w-full h-full will-change-transform"
          >
            <Image
              src="/images/group.png"
              alt="Group of people wearing I-Vision frames in an architectural setting"
              fill
              sizes="100vw"
              className="object-cover object-top"
              priority
            />
          </div>
        </div>

        {/* Footer Strip */}
        <div className="mt-8 lg:mt-12 flex justify-end">
           <Link 
              href="/eyeglasses"
              className="group inline-flex items-center text-foreground font-medium tracking-wide transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              <span className="underline underline-offset-4 decoration-foreground/30 group-hover:decoration-foreground transition-colors">
                Explore the collection
              </span>
              <ArrowRight className="h-4 w-4 ml-2 transition-transform motion-safe:group-hover:translate-x-1" aria-hidden="true" />
            </Link>
        </div>
      </div>
    </section>
  );
}
