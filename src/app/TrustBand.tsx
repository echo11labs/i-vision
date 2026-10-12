import React from "react";

interface BrandItem {
  name: string;
  tagline: string;
  logo: React.ReactNode;
}

const TRUSTED_BRANDS: BrandItem[] = [
  {
    name: "Ray-Ban",
    tagline: "Genuine Since 1937",
    logo: (
      <svg
        viewBox="0 0 130 36"
        fill="currentColor"
        className="h-7 w-auto transition-opacity"
        aria-label="Ray-Ban logo"
      >
        <text
          x="6"
          y="23"
          fontFamily="'Arial Black', Impact, sans-serif"
          fontSize="21"
          fontStyle="italic"
          fontWeight="900"
          letterSpacing="-0.04em"
          transform="rotate(-6 15 18)"
        >
          Ray•Ban
        </text>
        <text
          x="14"
          y="33"
          fontFamily="system-ui, sans-serif"
          fontSize="5.5"
          fontWeight="700"
          letterSpacing="0.22em"
          opacity="0.65"
        >
          GENUINE SINCE 1937
        </text>
      </svg>
    ),
  },
  {
    name: "Crizal",
    tagline: "by Essilor",
    logo: (
      <svg
        viewBox="0 0 145 36"
        fill="currentColor"
        className="h-7 w-auto transition-opacity"
        aria-label="Crizal logo"
      >
        <path
          d="M 6 11 Q 40 3 80 7"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          fill="none"
          opacity="0.85"
        />
        <text
          x="6"
          y="25"
          fontFamily="'Helvetica Neue', Arial, sans-serif"
          fontSize="19"
          fontWeight="700"
          letterSpacing="0.02em"
        >
          Crizal
        </text>
        <circle cx="70" cy="14" r="1.5" fill="currentColor" />
        <text
          x="75"
          y="25"
          fontFamily="system-ui, sans-serif"
          fontSize="6.5"
          fontWeight="600"
          letterSpacing="0.1em"
          opacity="0.6"
        >
          ®
        </text>
        <text
          x="7"
          y="33"
          fontFamily="system-ui, sans-serif"
          fontSize="5.5"
          fontWeight="600"
          letterSpacing="0.18em"
          opacity="0.6"
        >
          BY ESSILOR
        </text>
      </svg>
    ),
  },
  {
    name: "ZEISS",
    tagline: "Precision Optics",
    logo: (
      <svg
        viewBox="0 0 135 36"
        fill="currentColor"
        className="h-7 w-auto transition-opacity"
        aria-label="Carl Zeiss logo"
      >
        <g transform="translate(4, 5)">
          <rect x="0" y="0" width="26" height="26" rx="4" fill="currentColor" />
          <text
            x="13"
            y="17"
            fill="var(--background, #F4F1EB)"
            fontFamily="'Helvetica Neue', Arial, sans-serif"
            fontSize="7"
            fontWeight="900"
            letterSpacing="0.05em"
            textAnchor="middle"
          >
            ZEISS
          </text>
        </g>
        <text
          x="36"
          y="21"
          fontFamily="'Helvetica Neue', Arial, sans-serif"
          fontSize="14"
          fontWeight="800"
          letterSpacing="0.12em"
        >
          ZEISS
        </text>
        <text
          x="37"
          y="29"
          fontFamily="system-ui, sans-serif"
          fontSize="6"
          fontWeight="600"
          letterSpacing="0.22em"
          opacity="0.6"
        >
          PRECISION OPTICS
        </text>
      </svg>
    ),
  },
  {
    name: "Oakley",
    tagline: "High Definition Optics",
    logo: (
      <svg
        viewBox="0 0 145 36"
        fill="currentColor"
        className="h-7 w-auto transition-opacity"
        aria-label="Oakley logo"
      >
        <g transform="translate(4, 8)">
          <path
            d="M10 0 C4 0 0 4.5 0 10 C0 15.5 4 20 10 20 C16 20 20 15.5 20 10 C20 4.5 16 0 10 0 Z M10 4 C13.5 4 16 6.8 16 10 C16 13.2 13.5 16 10 16 C6.5 16 4 13.2 4 10 C4 6.8 6.5 4 10 4 Z"
            fill="currentColor"
          />
        </g>
        <text
          x="30"
          y="23"
          fontFamily="'Arial Black', sans-serif"
          fontSize="14"
          fontWeight="900"
          letterSpacing="0.12em"
        >
          OAKLEY
        </text>
        <text
          x="31"
          y="32"
          fontFamily="system-ui, sans-serif"
          fontSize="5.5"
          fontWeight="700"
          letterSpacing="0.24em"
          opacity="0.6"
        >
          HIGH DEFINITION OPTICS
        </text>
      </svg>
    ),
  },
  {
    name: "Essilor",
    tagline: "World Leader in Lenses",
    logo: (
      <svg
        viewBox="0 0 135 36"
        fill="currentColor"
        className="h-7 w-auto transition-opacity"
        aria-label="Essilor logo"
      >
        <g transform="translate(4, 7)">
          <path d="M0 16 Q12 0 24 16 Z" fill="none" stroke="currentColor" strokeWidth="2" />
          <circle cx="12" cy="11" r="3.5" fill="currentColor" />
        </g>
        <text
          x="34"
          y="22"
          fontFamily="'Helvetica Neue', Arial, sans-serif"
          fontSize="16"
          fontWeight="700"
          letterSpacing="0.04em"
        >
          essilor
        </text>
        <text
          x="35"
          y="30"
          fontFamily="system-ui, sans-serif"
          fontSize="5.5"
          fontWeight="600"
          letterSpacing="0.2em"
          opacity="0.6"
        >
          SEEING THE WORLD BETTER
        </text>
      </svg>
    ),
  },
  {
    name: "Transitions",
    tagline: "Light Intelligent Lenses",
    logo: (
      <svg
        viewBox="0 0 155 36"
        fill="currentColor"
        className="h-7 w-auto transition-opacity"
        aria-label="Transitions logo"
      >
        <g transform="translate(4, 9)">
          <circle cx="9" cy="9" r="4.5" fill="currentColor" />
          <path
            d="M9 1 L9 3 M9 15 L9 17 M1 9 L3 9 M15 9 L17 9 M3.3 3.3 L4.7 4.7 M13.3 13.3 L14.7 14.7 M3.3 14.7 L4.7 13.3 M13.3 4.7 L14.7 3.3"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
        </g>
        <text
          x="28"
          y="22"
          fontFamily="system-ui, -apple-system, sans-serif"
          fontSize="14"
          fontWeight="700"
          letterSpacing="0.04em"
        >
          Transitions
        </text>
        <text
          x="112"
          y="16"
          fontFamily="system-ui, sans-serif"
          fontSize="6.5"
          fontWeight="600"
        >
          ®
        </text>
        <text
          x="29"
          y="30"
          fontFamily="system-ui, sans-serif"
          fontSize="5.5"
          fontWeight="600"
          letterSpacing="0.18em"
          opacity="0.6"
        >
          LIGHT INTELLIGENT LENSES
        </text>
      </svg>
    ),
  },
  {
    name: "Persol",
    tagline: "Torino 1917",
    logo: (
      <svg
        viewBox="0 0 135 36"
        fill="currentColor"
        className="h-7 w-auto transition-opacity"
        aria-label="Persol logo"
      >
        <g transform="translate(2, 6)">
          <path
            d="M0 12 L12 12 L12 8 L24 12 L12 16 L12 12 Z M3 7 L7 3 L9 5 L5 9 Z M3 17 L7 21 L9 19 L5 15 Z"
            fill="currentColor"
          />
        </g>
        <text
          x="29"
          y="22"
          fontFamily="Georgia, serif"
          fontSize="18"
          fontWeight="700"
          fontStyle="italic"
          letterSpacing="-0.02em"
        >
          Persol
        </text>
        <text
          x="30"
          y="30"
          fontFamily="system-ui, sans-serif"
          fontSize="6"
          fontWeight="600"
          letterSpacing="0.25em"
          opacity="0.6"
        >
          TORINO 1917
        </text>
      </svg>
    ),
  },
  {
    name: "Maui Jim",
    tagline: "PolarizedPlus2®",
    logo: (
      <svg
        viewBox="0 0 140 36"
        fill="currentColor"
        className="h-7 w-auto transition-opacity"
        aria-label="Maui Jim logo"
      >
        <text
          x="4"
          y="22"
          fontFamily="'Brush Script MT', 'Bickham Script Pro', cursive, sans-serif"
          fontSize="21"
          fontWeight="700"
          fontStyle="italic"
        >
          Maui Jim
        </text>
        <text
          x="5"
          y="31"
          fontFamily="system-ui, sans-serif"
          fontSize="5.5"
          fontWeight="600"
          letterSpacing="0.22em"
          opacity="0.6"
        >
          POLARIZEDPLUS2®
        </text>
      </svg>
    ),
  },
  {
    name: "Varilux",
    tagline: "Progressive Optics",
    logo: (
      <svg
        viewBox="0 0 135 36"
        fill="currentColor"
        className="h-7 w-auto transition-opacity"
        aria-label="Varilux logo"
      >
        <g transform="translate(2, 8)">
          <polygon points="8,1 15,9 8,17 1,9" stroke="currentColor" strokeWidth="1.5" fill="none" />
        </g>
        <text
          x="23"
          y="21"
          fontFamily="'Helvetica Neue', Arial, sans-serif"
          fontSize="15"
          fontWeight="700"
          letterSpacing="0.08em"
        >
          Varilux
        </text>
        <text
          x="86"
          y="15"
          fontFamily="system-ui, sans-serif"
          fontSize="6"
          fontWeight="600"
        >
          ®
        </text>
        <text
          x="24"
          y="29"
          fontFamily="system-ui, sans-serif"
          fontSize="5.5"
          fontWeight="600"
          letterSpacing="0.18em"
          opacity="0.6"
        >
          PROGRESSIVE OPTICS
        </text>
      </svg>
    ),
  },
  {
    name: "HOYA",
    tagline: "Vision Care",
    logo: (
      <svg
        viewBox="0 0 120 36"
        fill="currentColor"
        className="h-7 w-auto transition-opacity"
        aria-label="Hoya Vision Care logo"
      >
        <text
          x="4"
          y="22"
          fontFamily="'Arial Black', 'Helvetica Neue', sans-serif"
          fontSize="17"
          fontWeight="900"
          letterSpacing="0.18em"
        >
          HOYA
        </text>
        <text
          x="5"
          y="30"
          fontFamily="system-ui, sans-serif"
          fontSize="5.5"
          fontWeight="600"
          letterSpacing="0.22em"
          opacity="0.6"
        >
          VISION CARE
        </text>
      </svg>
    ),
  },
];

export default function TrustBand() {
  return (
    <section 
      aria-label="Authorized eyewear brands and certified lens partners"
      className="w-full bg-background border-t border-b border-foreground/10 py-10 sm:py-14 overflow-hidden"
    >
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-14">
        
        {/* Editorial Sub-Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 sm:mb-10 gap-3">
          <span className="section-kicker text-foreground/60">
            Authorized Eyewear & Certified Lens Partners
          </span>
          <span className="font-sans text-xs tracking-wider uppercase text-foreground/50">
            100% Genuine Optics & Certified Surfacing
          </span>
        </div>

        {/* Brand Logos Continuous Marquee Strip */}
        <div className="relative w-full overflow-hidden py-3">
          {/* Subtle gradient vignette edges to blend marquee seamlessly */}
          <div 
            className="absolute left-0 inset-y-0 w-16 sm:w-28 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none"
            aria-hidden="true" 
          />
          <div 
            className="absolute right-0 inset-y-0 w-16 sm:w-28 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none"
            aria-hidden="true" 
          />

          {/* Marquee Track (Repeated 2x for seamless continuous loop) */}
          <div className="animate-marquee flex items-center gap-12 sm:gap-16 lg:gap-20">
            {[...TRUSTED_BRANDS, ...TRUSTED_BRANDS].map((brand, idx) => (
              <div
                key={`${brand.name}-${idx}`}
                className="group flex-shrink-0 flex items-center px-2 py-3 text-foreground/50 hover:text-foreground transition-all duration-300 cursor-default select-none hover:scale-105 transform"
                title={`${brand.name} — ${brand.tagline}`}
              >
                {brand.logo}
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
