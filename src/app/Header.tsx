"use client";

import { useState, useRef, useEffect, useMemo } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { X, ArrowRight } from "lucide-react";
import { FIXTURE_PRODUCTS } from "./eyeglasses/fixtures";
import { SUNGLASSES_PRODUCTS } from "./sunglasses/fixtures";
import { useFocusTrap } from "./useFocusTrap";

const NAV_ITEMS = [
  { href: "/eyeglasses", label: "Eyeglasses" },
  { href: "/sunglasses", label: "Sunglasses" },
  { href: "/find-your-frame", label: "Guide" },
  { href: "/about", label: "About" },
];

const POPULAR_SEARCHES = [
  { label: "Rectangular Frames", query: "rectangular" },
  { label: "Round Classics", query: "round" },
  { label: "Bold Cat-eye", query: "cat-eye" },
  { label: "Titanium Aviators", query: "aviator" },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const searchInputRef = useRef<HTMLInputElement>(null);
  const searchDialogRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  
  const pathname = usePathname();
  const router = useRouter();

  const isDarkHeroPage = pathname === "/" || pathname === "/sunglasses";
  const isAllDarkPage = pathname === "/find-your-frame";

  // Scroll detection for transparent-to-solid transition
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Derived Search Results (combining eyeglasses and sunglasses across all attributes)
  const searchResults = useMemo(() => {
    const rawQuery = searchQuery.trim().toLowerCase();
    if (!rawQuery) return [];

    const tokens = rawQuery.split(/\s+/).filter(Boolean);
    if (tokens.length === 0) return [];

    // Optical items search corpus
    const optical = FIXTURE_PRODUCTS.filter((product) => {
      const corpus = [
        product.name,
        product.shape,
        product.shape.replace(/-/g, " "),
        product.shape.replace(/-/g, ""),
        product.color,
        product.material,
        product.lensType,
        product.description,
        ...(product.details || []),
        "eyeglasses",
        "optical",
        "glasses",
        "spectacles",
        "frames",
      ]
        .join(" ")
        .toLowerCase();

      return tokens.every((token) => {
        const cleanToken = token.replace(/-/g, "");
        return corpus.includes(token) || corpus.includes(cleanToken);
      });
    }).map((p) => ({ ...p, category: "Eyeglasses", href: `/eyeglasses/${p.slug}` }));

    // Sunglasses items search corpus
    const sun = SUNGLASSES_PRODUCTS.filter((product) => {
      const isPolarized =
        product.lensType.toLowerCase().includes("polar") ||
        product.details.some((d) => d.toLowerCase().includes("polar"));

      const corpus = [
        product.name,
        product.shape,
        product.shape.replace(/-/g, " "),
        product.shape.replace(/-/g, ""),
        product.color,
        product.lensColor,
        product.lensType,
        product.description,
        ...(product.details || []),
        "sunglasses",
        "sunglass",
        "shades",
        "sun",
        "uv400",
        "frames",
        isPolarized ? "polarized polarised" : "",
      ]
        .join(" ")
        .toLowerCase();

      return tokens.every((token) => {
        const cleanToken = token.replace(/-/g, "");
        return corpus.includes(token) || corpus.includes(cleanToken);
      });
    }).map((p) => ({ ...p, category: "Sunglasses", href: `/sunglasses/${p.slug}` }));

    const combined = [...sun, ...optical];

    // Rank results: exact name match > partial name match > shape match > other
    const scoreItem = (item: { name: string; shape: string }) => {
      const nameLower = item.name.toLowerCase();
      const shapeLower = item.shape.toLowerCase();
      if (nameLower === rawQuery) return 10;
      if (nameLower.includes(rawQuery)) return 8;
      if (shapeLower === rawQuery) return 6;
      if (shapeLower.includes(rawQuery)) return 4;
      return 1;
    };

    return combined.sort((a, b) => scoreItem(b) - scoreItem(a));
  }, [searchQuery]);

  // Focus management for search overlay
  useEffect(() => {
    if (isSearchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isSearchOpen]);

  useFocusTrap(isSearchOpen, searchDialogRef);
  useFocusTrap(isMobileMenuOpen, mobileMenuRef);

  const closeSearch = () => setIsSearchOpen(false);
  const closeMobileMenu = () => setIsMobileMenuOpen(false);
  const openMobileMenu = () => {
    setIsMobileMenuOpen(true);
    setIsSearchOpen(false);
  };

  // Lock body scroll when overlays are open
  useEffect(() => {
    if (isSearchOpen || isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isSearchOpen, isMobileMenuOpen]);

  // Escape key handler for search & mobile menu
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (isSearchOpen) {
          closeSearch();
        } else if (isMobileMenuOpen) {
          closeMobileMenu();
        }
      }
    };

    if (isSearchOpen || isMobileMenuOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isSearchOpen, isMobileMenuOpen]);

  const openSearch = () => {
    setIsSearchOpen(true);
    setIsMobileMenuOpen(false);
    setSearchQuery("");
  };

  const handleSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && searchResults.length > 0) {
      const firstResult = searchResults[0];
      router.push(firstResult.href);
      closeSearch();
    }
  };

  const isTextWhite = isScrolled ? isAllDarkPage : (isDarkHeroPage || isAllDarkPage);
  const activeUnderline = isTextWhite ? "bg-background" : "bg-foreground";

  const headerClass = `
    fixed top-0 z-40 w-full transition-all duration-300 flex items-center
    ${isScrolled 
      ? (isAllDarkPage 
          ? "h-16 bg-foreground/95 backdrop-blur-md border-b border-background/10 text-background shadow-xs" 
          : "h-16 bg-background/95 backdrop-blur-md border-b border-foreground/10 text-foreground shadow-xs")
      : `h-20 lg:h-24 bg-transparent border-b border-transparent ${isTextWhite ? "text-background" : "text-foreground"}`
    }
  `;

  return (
    <>
      <header className={headerClass}>
        <div className="mx-auto flex h-full items-center justify-between px-6 lg:px-12 w-full max-w-[1440px]">
          
          {/* Desktop Left Navigation */}
          <nav className="hidden lg:flex items-center gap-10 w-1/3">
            {NAV_ITEMS.map((item) => {
              const isActive = pathname === item.href;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-xs tracking-[0.1em] uppercase font-sans relative group py-1"
                >
                  <span className={`transition-opacity duration-300 ${isActive ? "opacity-100 font-medium" : "opacity-70 group-hover:opacity-100"}`}>
                    {item.label}
                  </span>
                  <span 
                    className={`absolute bottom-0 left-0 w-full h-[1px] transform origin-left transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] ${isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"} ${activeUnderline}`} 
                  />
                </Link>
              );
            })}
          </nav>

          {/* Mobile Menu Trigger */}
          <div className="flex lg:hidden">
            <button
              type="button"
              onClick={isMobileMenuOpen ? closeMobileMenu : openMobileMenu}
              className="text-xs tracking-[0.1em] uppercase font-sans group relative py-1"
            >
              <span className="opacity-70 group-hover:opacity-100 transition-opacity duration-300">
                Menu
              </span>
            </button>
          </div>

          {/* Logo: Right on mobile as before, Centered on desktop */}
          <div className="flex justify-end lg:justify-center lg:w-1/3">
            <Link 
              href="/" 
              className="font-logo text-brand-logo tracking-brand leading-none font-normal whitespace-nowrap"
            >
              I-VISION
            </Link>
          </div>

          {/* Desktop Right Actions */}
          <div className="hidden lg:flex items-center justify-end gap-10 lg:w-1/3">
            <button
              onClick={openSearch}
              className="text-xs tracking-caps uppercase font-sans relative group py-1"
            >
              <span className="opacity-70 group-hover:opacity-100 transition-opacity duration-300">Search</span>
              <span className={`absolute bottom-0 left-0 w-full h-[1px] transform origin-left transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] scale-x-0 group-hover:scale-x-100 ${activeUnderline}`} />
            </button>
          </div>
          
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div
          ref={mobileMenuRef}
          className="fixed inset-0 z-[100] flex flex-col bg-background text-foreground lg:hidden animate-in slide-in-from-top-4 fade-in duration-500"
          role="dialog"
          aria-modal="true"
        >
          {/* Header */}
          <div className="flex justify-between items-center h-24 px-6 shrink-0">
            <span className="font-logo text-brand-logo tracking-brand leading-none font-normal whitespace-nowrap">I-VISION</span>
            <button onClick={closeMobileMenu} className="p-2 -mr-2 text-foreground hover:text-foreground/60 transition-colors">
              <X className="h-8 w-8" strokeWidth={1} />
            </button>
          </div>
          
          {/* Main Links */}
          <nav className="flex flex-col px-6 pt-8 pb-8 overflow-y-auto flex-1 hide-scrollbar">
            <ul className="flex flex-col">
              {NAV_ITEMS.map((item, index) => (
                <li key={item.href} className="border-b border-foreground/10">
                  <Link
                    href={item.href}
                    onClick={closeMobileMenu}
                    className="group flex flex-col py-6 focus-visible:outline-none"
                  >
                    <span className="text-[10px] font-brand tracking-caps uppercase text-foreground/40 mb-2">
                      0{index + 1}
                    </span>
                    <div className="flex items-center justify-between w-full">
                      <span className="font-display text-5xl sm:text-6xl tracking-tight text-foreground transition-transform duration-500 group-active:translate-x-2">
                        {item.label}
                      </span>
                      <ArrowRight className="h-6 w-6 text-foreground/20 transition-all duration-500 group-active:text-foreground" strokeWidth={1} />
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
            
            {/* Search Action */}
            <div className="mt-12 flex flex-col pt-4">
              <button onClick={openSearch} className="flex items-center justify-between py-4 border border-foreground/20 px-6 rounded-none text-xs font-sans tracking-[0.15em] uppercase hover:bg-foreground hover:text-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground">
                <span>Search Collection</span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
              </button>
            </div>
          </nav>
          
          {/* Footer Area */}
          <div className="px-6 py-8 mt-auto shrink-0 flex justify-between items-end">
            <div className="flex flex-col gap-3 text-xs font-sans text-foreground/60">
              <span className="hover:text-foreground cursor-pointer transition-colors">Instagram</span>
              <span className="hover:text-foreground cursor-pointer transition-colors">Journal</span>
              <span className="hover:text-foreground cursor-pointer transition-colors">Contact</span>
            </div>
            <div className="flex flex-col items-end gap-5">
              <div className="text-[9px] font-sans uppercase tracking-[0.2em] text-foreground/40 text-right leading-relaxed">
                © 2026<br/>I-VISION STUDIO
              </div>
              <div className="flex flex-col items-end gap-1.5 pt-3 border-t border-foreground/10 mt-auto">
                <div className="flex items-center gap-1.5">
                  <span className="text-[8px] font-sans uppercase tracking-[0.2em] text-foreground/40">Developed by</span>
                  <a href="https://echo11.tech" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground rounded-sm">
                    <Image src="/images/echo11.png" alt="Echo11 Labs" width={12} height={12} className="opacity-50 group-hover:opacity-100 transition-opacity rounded-sm" />
                    <span className="text-[10px] font-sans font-semibold tracking-wider text-foreground/50 group-hover:text-foreground transition-colors">
                      echo11.labs
                    </span>
                  </a>
                </div>
                <a href="mailto:echo11.labs@gmail.com" className="text-[9px] font-mono text-foreground/30 hover:text-foreground/70 transition-colors uppercase tracking-[0.15em] mt-0.5">
                  echo11.labs@gmail.com
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Search Overlay */}
      {isSearchOpen && (
        <div 
          ref={searchDialogRef}
          className="fixed inset-0 z-[100] flex flex-col bg-background text-foreground animate-in slide-in-from-top-4 fade-in duration-500" 
          role="dialog" 
          aria-modal="true" 
          aria-label="Collection search"
        >
          {/* Header Controls */}
          <div className="flex justify-between items-center h-24 px-6 lg:px-12 w-full shrink-0 border-b border-foreground/5">
            <span className="font-logo text-brand-logo tracking-brand leading-none font-normal">I-VISION</span>
            <button 
              onClick={closeSearch} 
              className="p-2 -mr-2 text-foreground hover:text-foreground/60 transition-colors focus-visible:outline-none"
              aria-label="Close search (Press Escape)"
            >
              <X className="h-8 w-8" strokeWidth={1} />
            </button>
          </div>

          <div className="flex flex-col flex-1 max-w-[1440px] mx-auto w-full px-6 lg:px-12 pt-8 lg:pt-14 pb-12 overflow-y-auto hide-scrollbar">
            {/* Massive Search Input */}
            <div className="relative border-b border-foreground/20 pb-6 mb-8 lg:mb-12 flex items-center">
              <input
                ref={searchInputRef}
                type="search"
                aria-label="Search collection"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={handleSearchKeyDown}
                placeholder="What are you looking for?"
                className="w-full bg-transparent border-none text-3xl sm:text-5xl lg:text-7xl font-display tracking-tight focus:outline-none placeholder:text-foreground/20 text-foreground pr-12"
              />
              {searchQuery.trim().length > 0 && (
                <button
                  type="button"
                  onClick={() => {
                    setSearchQuery("");
                    searchInputRef.current?.focus();
                  }}
                  className="p-2 -mr-2 text-foreground/40 hover:text-foreground transition-colors focus-visible:outline-none"
                  aria-label="Clear search input"
                >
                  <X className="w-6 h-6 sm:w-8 sm:h-8" strokeWidth={1.25} />
                </button>
              )}
            </div>
            
            {searchQuery.trim().length === 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 animate-in fade-in duration-700 delay-100 fill-mode-both">
                {/* Popular Searches */}
                <div>
                  <h3 className="text-[10px] font-sans font-medium tracking-[0.2em] uppercase text-foreground/40 mb-6">Popular Searches</h3>
                  <ul className="flex flex-col gap-5">
                    {POPULAR_SEARCHES.map((item) => (
                      <li key={item.label}>
                        <button 
                          onClick={() => {
                            setSearchQuery(item.query);
                            searchInputRef.current?.focus();
                          }}
                          className="font-display text-3xl lg:text-4xl text-foreground hover:text-foreground/50 transition-colors text-left focus-visible:outline-none"
                        >
                          {item.label}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
                
                {/* Featured Discovery */}
                <div className="hidden sm:block">
                  <h3 className="text-[10px] font-sans font-medium tracking-[0.2em] uppercase text-foreground/40 mb-6">Featured Discovery</h3>
                  <Link href="/sunglasses" onClick={closeSearch} className="group block relative aspect-[16/9] lg:aspect-[21/9] overflow-hidden bg-muted rounded-none focus-visible:outline-none">
                    <Image src="/images/frame_aviator.jpg" fill alt="Featured Collection" className="object-cover object-center group-hover:scale-105 transition-transform duration-[1.5s] ease-[cubic-bezier(0.25,1,0.5,1)]" />
                    <div className="absolute inset-0 bg-black/10 transition-colors group-hover:bg-black/20" />
                    <div className="absolute inset-0 p-6 sm:p-8 flex flex-col justify-end">
                      <span className="font-display text-3xl sm:text-4xl text-white drop-shadow-md">The Aviator Heritage</span>
                      <span className="text-[10px] font-sans font-semibold uppercase tracking-[0.15em] text-white/90 mt-2 flex items-center gap-2">
                        Explore Collection <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                      </span>
                    </div>
                  </Link>
                </div>
              </div>
            ) : searchResults.length > 0 ? (
              <div>
                <div className="flex items-center justify-between mb-8 pb-3 border-b border-foreground/10">
                  <span className="text-[11px] font-sans uppercase tracking-[0.2em] text-foreground/50 font-medium">
                    {searchResults.length} {searchResults.length === 1 ? "Frame Available" : "Frames Available"}
                  </span>
                  <span className="hidden sm:inline text-[11px] font-sans text-foreground/40 tracking-wider">
                    Press Enter to view top match
                  </span>
                </div>
                <ul className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-4 sm:gap-x-8 gap-y-12">
                  {searchResults.map((product) => (
                    <li key={`${product.category}-${product.slug}`} className="animate-in fade-in slide-in-from-bottom-4 duration-500 fill-mode-both">
                      <Link 
                        href={product.href}
                        onClick={closeSearch}
                        className="group flex flex-col focus-visible:outline-none"
                      >
                        <div className="relative aspect-[4/5] w-full bg-muted mb-4 overflow-hidden border border-foreground/10">
                          <Image 
                            src={product.image}
                            alt={product.name}
                            fill
                            sizes="(max-width: 768px) 50vw, 25vw"
                            className="object-cover object-center group-hover:scale-105 transition-transform duration-[1.2s] ease-[cubic-bezier(0.25,1,0.5,1)]"
                          />
                          <div className="absolute top-2 left-2 z-10">
                            <span className="text-[9px] font-sans uppercase tracking-[0.15em] px-2 py-0.5 bg-background/90 backdrop-blur-sm text-foreground/80">
                              {product.category}
                            </span>
                          </div>
                          <div className="absolute inset-0 bg-foreground/0 transition-colors duration-700 group-hover:bg-foreground/5" />
                        </div>
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-1 sm:gap-0">
                          <div className="flex flex-col">
                            <span className="font-display text-xl sm:text-2xl text-foreground group-hover:text-foreground/70 transition-colors">
                              {product.name}
                            </span>
                            <span className="font-sans text-[10px] sm:text-xs text-foreground/50 capitalize mt-1 tracking-wider">
                              {product.color}
                            </span>
                          </div>
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-20 text-center animate-in fade-in duration-500 max-w-md mx-auto">
                <p className="font-display text-3xl sm:text-4xl text-foreground mb-3 leading-snug">
                  No frames match &ldquo;{searchQuery}&rdquo;.
                </p>
                <p className="font-sans text-sm text-foreground/60 mb-8 leading-relaxed">
                  Try searching by shape (round, aviator), material (titanium, acetate), or feature (polarized).
                </p>
                <div className="flex flex-wrap items-center justify-center gap-4">
                  <button 
                    onClick={() => {
                      setSearchQuery("");
                      searchInputRef.current?.focus();
                    }} 
                    className="text-xs font-sans uppercase tracking-[0.15em] px-4 py-2.5 border border-foreground/20 hover:border-foreground transition-colors focus-visible:outline-none"
                  >
                    Clear search
                  </button>
                  <Link
                    href="/eyeglasses"
                    onClick={closeSearch}
                    className="text-xs font-sans uppercase tracking-[0.15em] px-4 py-2.5 bg-foreground text-background hover:bg-foreground/90 transition-colors focus-visible:outline-none"
                  >
                    View Eyeglasses
                  </Link>
                  <Link
                    href="/sunglasses"
                    onClick={closeSearch}
                    className="text-xs font-sans uppercase tracking-[0.15em] px-4 py-2.5 bg-foreground text-background hover:bg-foreground/90 transition-colors focus-visible:outline-none"
                  >
                    View Sunglasses
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

    </>
  );
}
