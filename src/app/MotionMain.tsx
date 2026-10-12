"use client";

import { type ReactNode, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

declare global {
  interface Window {
    __lenis?: Lenis;
  }
}

type MotionMainProps = {
  children: ReactNode;
};

export default function MotionMain({ children }: MotionMainProps) {
  const mainRef = useRef<HTMLElement>(null);
  const lenisRef = useRef<Lenis | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    // Avoid browser restoring old scroll position on page transition
    if (typeof window !== "undefined" && "scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    const lenis = new Lenis({
      autoRaf: true,
      smoothWheel: true,
      syncTouch: false,
      wheelMultiplier: 0.9,
      anchors: true,
      respectReducedMotion: true,
    });

    lenisRef.current = lenis;
    if (typeof window !== "undefined") {
      window.__lenis = lenis;
    }

    const removeScrollListener = lenis.on("scroll", ScrollTrigger.update);

    return () => {
      removeScrollListener();
      lenis.destroy();
      lenisRef.current = null;
      if (typeof window !== "undefined" && window.__lenis === lenis) {
        delete window.__lenis;
      }
    };
  }, []);

  // Immediately scroll to top on every route change
  useEffect(() => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(0, { immediate: true });
    }
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, [pathname]);

  // Refresh scroll triggers when pathname changes
  useEffect(() => {
    const refreshId = window.requestAnimationFrame(() => {
      ScrollTrigger.refresh();
    });
    return () => window.cancelAnimationFrame(refreshId);
  }, [pathname]);

  return (
    <main
      ref={mainRef}
      id="main-content"
      className="flex flex-grow flex-col overflow-x-clip"
    >
      {children}
    </main>
  );
}
