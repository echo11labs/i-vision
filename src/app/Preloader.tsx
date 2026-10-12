"use client";

import { useEffect, useState, useRef } from "react";
import { TbEyeglass, TbEyeglass2, TbSunglasses, TbStereoGlasses } from "react-icons/tb";
import gsap from "gsap";

const ICONS = [TbEyeglass, TbEyeglass2, TbSunglasses, TbStereoGlasses];

export default function Preloader() {
  const [isLoading, setIsLoading] = useState(true);
  const [currentIconIndex, setCurrentIconIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const numberRef = useRef<HTMLDivElement>(null);
  const iconRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          setIsLoading(false);
        },
      });

      // Animate the progress number and switch icons based on progress
      const progressObj = { value: 0 };
      tl.to(progressObj, {
        value: 100,
        duration: 2.0, // slightly longer to appreciate the icon changes
        ease: "power2.inOut",
        onUpdate: () => {
          if (numberRef.current) {
            numberRef.current.textContent = `${Math.round(progressObj.value)}%`;
          }
          // Switch icons at 25%, 50%, 75%
          const newIndex = Math.min(
            Math.floor(progressObj.value / 25),
            ICONS.length - 1
          );
          setCurrentIconIndex(newIndex);
        },
      });

      // Progress bar line expanding
      tl.fromTo(
        progressRef.current,
        { scaleX: 0, transformOrigin: "left" },
        { scaleX: 1, duration: 2.0, ease: "power2.inOut" },
        "<" // Sync with number counter
      );

      // Icon pop in animation
      tl.fromTo(
        iconRef.current,
        { y: 30, opacity: 0, scale: 0.8 },
        { y: 0, opacity: 1, scale: 1, duration: 0.8, ease: "back.out(1.7)" },
        0
      );

      // Staggered letter reveal for I-Vision
      const letters = textRef.current?.querySelectorAll(".letter");
      tl.fromTo(
        letters || [],
        { y: 100, opacity: 0, rotate: 10 },
        { y: 0, opacity: 1, rotate: 0, stagger: 0.05, duration: 0.8, ease: "power3.out" },
        0.2
      );

      // Add a slight pause
      tl.to({}, { duration: 0.5 });

      // Exit animation: pure fade out
      tl.to([numberRef.current, progressRef.current, textRef.current, iconRef.current], {
        opacity: 0,
        duration: 0.4,
        ease: "power2.out",
        stagger: 0.05,
      });

      tl.to(containerRef.current, {
        opacity: 0,
        duration: 0.6,
        ease: "power2.inOut",
      }, "-=0.15");
    }, containerRef);

    return () => ctx.revert();
  }, []);

  if (!isLoading) return null;

  const CurrentIcon = ICONS[currentIconIndex];

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[10000] flex flex-col items-center justify-center bg-background text-foreground overflow-hidden"
    >
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center w-full max-w-sm px-8">
        
        {/* Brand Name Animation */}
        <div 
          className="flex flex-col items-center justify-center mb-16"
        >
          <div ref={iconRef} className="loader-icon mb-6 text-foreground/80 flex items-center justify-center h-16 w-16">
            <CurrentIcon size={48} strokeWidth={1.25} className="transition-all duration-300 animate-in fade-in zoom-in-95" />
          </div>
          <div ref={textRef} className="font-logo font-normal text-3xl sm:text-4xl md:text-6xl tracking-brand flex overflow-hidden uppercase whitespace-nowrap">
            {"I-Vision".split("").map((char, i) => (
              <span key={i} className="letter inline-block">
                {char}
              </span>
            ))}
          </div>
        </div>

        {/* Progress Bar and Number */}
        <div className="w-full flex flex-col gap-4">
          <div
            ref={progressRef}
            className="w-full h-[1px] bg-foreground origin-left"
          />
          <div
            ref={numberRef}
            className="text-sm font-sans tracking-widest text-right font-medium"
          >
            0%
          </div>
        </div>
      </div>
    </div>
  );
}
