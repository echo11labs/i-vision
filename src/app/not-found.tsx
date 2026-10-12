"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";

export default function NotFound() {
  const containerRef = useRef<HTMLDivElement>(null);
  const sharpLayerRef = useRef<HTMLDivElement>(null);
  const lensFrameRef = useRef<HTMLDivElement>(null);

  const lensPosRef = useRef({ x: 0, y: 0 });
  const targetPosRef = useRef({ x: 0, y: 0 });
  const isHoveringRef = useRef(false);
  const timeRef = useRef(0);
  const animFrameRef = useRef<number | null>(null);

  const lensRadius = 135;

  // Mark body with is-not-found to completely suppress footer
  useEffect(() => {
    document.body.classList.add("is-not-found");
    return () => {
      document.body.classList.remove("is-not-found");
    };
  }, []);

  // RAF loop driving sharpLayer clipPath and lensFrame transform directly
  useEffect(() => {
    if (typeof window !== "undefined") {
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      lensPosRef.current = { x: centerX, y: centerY };
      targetPosRef.current = { x: centerX, y: centerY };
    }

    const loop = () => {
      timeRef.current += 0.02;

      let target = targetPosRef.current;
      
      // If idle (not hovering), gentle ambient breathing drift over the central 404
      if (!isHoveringRef.current && typeof window !== "undefined") {
        const cx = window.innerWidth / 2;
        const cy = window.innerHeight / 2;
        target = {
          x: cx + Math.sin(timeRef.current * 0.75) * 80,
          y: cy + Math.cos(timeRef.current * 0.55) * 35,
        };
      }

      const prev = lensPosRef.current;
      // Responsive, fluid tracking factor (smooth without dragging behind)
      const lerpSpeed = isHoveringRef.current ? 0.22 : 0.08;
      const nx = prev.x + (target.x - prev.x) * lerpSpeed;
      const ny = prev.y + (target.y - prev.y) * lerpSpeed;
      lensPosRef.current = { x: nx, y: ny };

      // Apply coordinates directly to DOM elements with sub-pixel alignment
      if (sharpLayerRef.current) {
        const clipVal = `circle(${lensRadius}px at ${nx}px ${ny}px)`;
        sharpLayerRef.current.style.clipPath = clipVal;
        sharpLayerRef.current.style.setProperty("-webkit-clip-path", clipVal);
      }
      if (lensFrameRef.current) {
        lensFrameRef.current.style.transform = `translate3d(${nx - lensRadius}px, ${ny - lensRadius}px, 0)`;
      }

      animFrameRef.current = requestAnimationFrame(loop);
    };

    animFrameRef.current = requestAnimationFrame(loop);
    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [lensRadius]);

  // Pointer & Touch tracking with exact container-relative alignment
  const updateTargetFromPointer = (clientX: number, clientY: number) => {
    isHoveringRef.current = true;
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      targetPosRef.current = {
        x: clientX - rect.left,
        y: clientY - rect.top,
      };
    } else {
      targetPosRef.current = { x: clientX, y: clientY };
    }
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    updateTargetFromPointer(e.clientX, e.clientY);
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    updateTargetFromPointer(e.clientX, e.clientY);
  };

  const handlePointerLeave = () => {
    isHoveringRef.current = false;
  };

  return (
    <div
      ref={containerRef}
      id="not-found-screen"
      onPointerMove={handlePointerMove}
      onPointerDown={handlePointerDown}
      onPointerLeave={handlePointerLeave}
      className="fixed inset-0 z-30 w-screen h-screen overflow-hidden bg-background text-foreground flex flex-col justify-between px-6 sm:px-12 py-8 sm:py-12 select-none"
    >
      {/* ── Top Optometric Calibration Bar ── */}
      <div className="flex items-center justify-between w-full pt-16 sm:pt-4 pointer-events-none z-10">
        <span className="text-[10px] sm:text-[11px] font-mono tracking-[0.25em] uppercase text-foreground/40">
          + SPH: -4.04D &nbsp;&bull;&nbsp; AXIS: 180°
        </span>
        <span className="text-[9px] sm:text-[10px] font-mono tracking-[0.3em] uppercase text-foreground/35 hidden sm:block">
          OPTICAL SPECIMEN &bull; LOSS OF RESOLUTION
        </span>
        <span className="text-[10px] sm:text-[11px] font-mono tracking-[0.25em] uppercase text-foreground/40">
          PD: 63.5MM &bull; CYL: 0.00 +
        </span>
      </div>

      {/* ── FULL-SCREEN LAYER 1: OUT-OF-FOCUS BLURRED 404 ── */}
      <div 
        className="absolute inset-0 flex flex-col items-center justify-center text-center filter blur-[14px] opacity-40 pointer-events-none select-none z-0"
        aria-hidden="true"
      >
        <div className="font-display text-[28vw] sm:text-[24vw] md:text-[20vw] font-normal tracking-wider leading-none text-foreground">
          404
        </div>
        <p className="text-xs sm:text-sm md:text-base font-sans tracking-[0.5em] sm:tracking-[0.7em] uppercase text-foreground/70 mt-2 font-medium">
          OUT OF FOCUS
        </p>
        <p className="font-display italic text-base sm:text-lg text-foreground/50 mt-1">
          Perspective unmapped.
        </p>
      </div>

      {/* ── FULL-SCREEN LAYER 2: SHARP IN-FOCUS 404 (Masked via CSS clip-path to circular lens) ── */}
      <div
        ref={sharpLayerRef}
        className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none select-none z-10"
        aria-hidden="true"
      >
        <div className="font-display text-[28vw] sm:text-[24vw] md:text-[20vw] font-normal tracking-wider leading-none text-foreground drop-shadow-xs">
          404
        </div>
        <p className="text-xs sm:text-sm md:text-base font-sans tracking-[0.5em] sm:tracking-[0.7em] uppercase text-foreground mt-2 font-semibold">
          OUT OF FOCUS
        </p>
        <p className="font-display italic text-base sm:text-lg text-foreground mt-1">
          Perspective unmapped.
        </p>
      </div>

      {/* ── FULL-SCREEN LAYER 3: FLOATING EYEWEAR LENS FRAME (Centered on Cursor) ── */}
      <div
        ref={lensFrameRef}
        className="absolute top-0 left-0 pointer-events-none rounded-full border border-foreground/35 shadow-[0_0_0_1px_rgba(255,255,255,0.4),0_8px_32px_-8px_rgba(0,0,0,0.14)] backdrop-brightness-[1.02] z-20"
        style={{
          width: `${lensRadius * 2}px`,
          height: `${lensRadius * 2}px`,
          willChange: "transform",
        }}
        aria-hidden="true"
      >
        {/* Inner Titanium Bevel Ring */}
        <div className="absolute inset-1 rounded-full border border-foreground/15" />
        
        {/* Anti-Reflective Glint */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-transparent via-white/10 to-transparent opacity-60" />

        {/* Microscopic Optical Alignment Crosshairs */}
        <div className="absolute top-2 left-1/2 -translate-x-1/2 w-[1px] h-2 bg-foreground/35" />
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-[1px] h-2 bg-foreground/35" />
        <div className="absolute left-2 top-1/2 -translate-y-1/2 h-[1px] w-2 bg-foreground/35" />
        <div className="absolute right-2 top-1/2 -translate-y-1/2 h-[1px] w-2 bg-foreground/35" />

        {/* Center Target Mark */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-[1px] bg-foreground/25" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-3 w-[1px] bg-foreground/25" />

        {/* Rim engraving */}
        <span className="absolute bottom-3 left-1/2 -translate-x-1/2 text-[8px] font-mono tracking-widest text-foreground/45 uppercase whitespace-nowrap">
          I-VISION &bull; 49□21 &bull; 20/20
        </span>
      </div>

      {/* ── Minimalist Editorial Return Actions ── */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-6 w-full max-w-5xl mx-auto pb-4 z-30 pointer-events-auto">
        <div className="text-center sm:text-left">
          <p className="text-[10px] font-sans uppercase tracking-[0.2em] text-foreground/40 mb-1">
            Status 404 &bull; Coordinate Unresolved
          </p>
          <p className="text-xs font-sans text-foreground/60 tracking-wide">
            Hover cursor to inspect perspective with clarity.
          </p>
        </div>

        <div className="flex items-center gap-5">
          <Link
            href="/"
            className="group inline-flex items-center gap-2.5 px-6 py-3.5 bg-foreground text-background text-xs font-sans font-medium uppercase tracking-[0.18em] transition-all hover:bg-foreground/85 rounded-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground"
          >
            <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-1" />
            <span>Return to Studio</span>
          </Link>

          <Link
            href="/eyeglasses"
            className="group inline-flex items-center gap-1.5 text-xs font-sans uppercase tracking-[0.18em] text-foreground/60 hover:text-foreground transition-colors py-2 focus-visible:outline-none"
          >
            <span>Explore Frames</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>

    </div>
  );
}
