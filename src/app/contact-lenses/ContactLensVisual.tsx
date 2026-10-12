"use client";

import React from "react";
import { ContactLensProduct } from "./fixtures";

interface ContactLensVisualProps {
  product: ContactLensProduct;
  isHovered: boolean;
}

export default function ContactLensVisual({
  product,
  isHovered,
}: ContactLensVisualProps) {
  return (
    <div className="relative w-full h-full flex items-center justify-center p-6 select-none overflow-hidden bg-[#ECE8E1]">
      {/* Background warm gallery texture */}
      <div className="absolute inset-0 bg-radial from-white/40 via-transparent to-black/[0.04] pointer-events-none" />

      {/* STATE 1: Luxury Minimalist Packaging Box */}
      <div
        className={`relative w-4/5 max-w-[240px] aspect-[16/10] bg-white rounded-xs shadow-md border border-black/[0.06] flex flex-col justify-between p-4 transition-all duration-[1.2s] ease-[cubic-bezier(0.25,1,0.5,1)] ${
          isHovered
            ? "opacity-0 scale-95 pointer-events-none"
            : "opacity-100 scale-100"
        }`}
      >
        {/* Brand Accent Bar (Authentic Color Tone) */}
        <div
          className="absolute top-0 inset-x-0 h-1.5 rounded-t-xs"
          style={{ backgroundColor: product.themeColor }}
        />

        {/* Box Header */}
        <div className="flex items-start justify-between pt-1">
          <div>
            <span className="font-sans text-[8.5px] tracking-[0.2em] uppercase font-bold text-black/50 block">
              {product.brand}
            </span>
            <span className="font-display text-[15px] sm:text-[16px] font-semibold text-black/90 leading-tight tracking-tight block mt-0.5">
              {product.name}
            </span>
          </div>
          <span className="text-[7.5px] font-sans font-medium px-1.5 py-0.5 border border-black/15 text-black/60 uppercase tracking-widest">
            Rx Only
          </span>
        </div>

        {/* Box Graphic Motif (Subtle wave/gradient) */}
        <div className="my-auto py-2">
          <div className="w-full h-6 rounded-xs overflow-hidden opacity-35 relative flex items-center">
            <svg viewBox="0 0 100 24" className="w-full h-full" preserveAspectRatio="none">
              <path
                d="M0,12 C25,2 50,22 75,12 C88,7 95,14 100,12 L100,24 L0,24 Z"
                fill={product.themeColor}
              />
            </svg>
          </div>
        </div>

        {/* Box Footer Specs */}
        <div className="pt-2 border-t border-black/[0.07] flex items-end justify-between text-[8px] font-sans text-black/60">
          <div>
            <span className="block font-medium uppercase tracking-wider text-black/80">
              {product.packSize}
            </span>
            <span className="text-[7.5px] text-black/45 tracking-wide">
              BC {product.baseCurve.split(" ")[0]} • DIA {product.diameter}
            </span>
          </div>
          <div className="text-right">
            <span className="block font-semibold text-black/75">
              {product.waterContent.split(" ")[0]} H₂O
            </span>
            <span className="text-[7px] tracking-wider uppercase text-black/40">
              {product.oxygenTransmissibility}
            </span>
          </div>
        </div>
      </div>

      {/* STATE 2: Sterile Saline Blister Pack & Translucent Lens Inspection (Revealed on Hover) */}
      <div
        className={`absolute inset-0 flex flex-col items-center justify-center p-6 transition-all duration-[1.2s] ease-[cubic-bezier(0.25,1,0.5,1)] ${
          isHovered
            ? "opacity-100 scale-100"
            : "opacity-0 scale-105 pointer-events-none"
        }`}
      >
        {/* Contact Lens Floating Graphic in Blister Cup */}
        <div className="relative w-36 h-36 flex items-center justify-center">
          {/* Saline solution bowl outline */}
          <div className="absolute inset-0 rounded-full border border-black/10 bg-white/60 shadow-inner backdrop-blur-xs" />

          {/* Precision liquid curvature ring */}
          <div
            className="absolute inset-3 rounded-full opacity-20 border-2 border-dashed"
            style={{ borderColor: product.themeColor }}
          />

          {/* Translucent Contact Lens Dome */}
          <svg
            viewBox="0 0 100 100"
            className="w-24 h-24 transform -rotate-12 drop-shadow-sm"
            aria-hidden="true"
          >
            {/* Outer Lens Edge */}
            <circle
              cx="50"
              cy="50"
              r="40"
              fill="none"
              stroke={product.themeColor}
              strokeWidth="1.8"
              opacity="0.45"
            />
            {/* High-Index Optical Zone */}
            <circle
              cx="50"
              cy="50"
              r="26"
              fill={product.themeColor}
              opacity="0.1"
              stroke={product.themeColor}
              strokeWidth="0.8"
            />
            {/* Spherical Reflection Arc */}
            <path
              d="M 28 36 A 32 32 0 0 1 68 28"
              fill="none"
              stroke="white"
              strokeWidth="2.5"
              strokeLinecap="round"
              opacity="0.8"
            />
            {/* Base Curve Contour */}
            <path
              d="M 32 64 Q 50 74 68 64"
              fill="none"
              stroke="white"
              strokeWidth="1.2"
              strokeLinecap="round"
              opacity="0.5"
            />
          </svg>
        </div>

        {/* Detailed Inspection Telemetry */}
        <div className="mt-4 text-center space-y-1">
          <span className="text-[9px] font-sans uppercase tracking-[0.2em] font-semibold text-foreground/80 block">
            {product.material}
          </span>
          <span className="text-[11px] font-mono text-foreground/60 block">
            BC: {product.baseCurve} — DIA: {product.diameter}
          </span>
          <span className="text-[10px] font-sans text-foreground/50 block">
            {product.wearingSchedule}
          </span>
        </div>
      </div>
    </div>
  );
}
