"use client";

import { useEffect, useState, useRef, Suspense } from "react";
import { usePathname, useSearchParams } from "next/navigation";

function NavigationProgressContent() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isVisible, setIsVisible] = useState(false);
  const [progress, setProgress] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const startTimeRef = useRef<number>(0);
  const isFirstRender = useRef(true);
  const prevPathname = useRef(pathname);

  // When pathname or searchParams change, smoothly complete the progress bar
  useEffect(() => {
    // Avoid running on initial mount
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    const isPathChange = prevPathname.current !== pathname;
    prevPathname.current = pathname;

    // Pin scroll to top immediately ONLY on actual route change (never on searchParams filter click)
    if (isPathChange && typeof window !== "undefined") {
      if (window.__lenis) {
        window.__lenis.scrollTo(0, { immediate: true });
      }
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    }

    if (timerRef.current) clearInterval(timerRef.current);
    const elapsed = Date.now() - startTimeRef.current;
    const minDuration = 180; // ensure animation is visible and smooth
    const remainingTime = Math.max(0, minDuration - elapsed);

    const completeTimer = setTimeout(() => {
      setProgress(100);
      const hideTimer = setTimeout(() => {
        setIsVisible(false);
        setProgress(0);
      }, 300);
      return () => clearTimeout(hideTimer);
    }, remainingTime);

    return () => clearTimeout(completeTimer);
  }, [pathname, searchParams]);

  // Global listener for link clicks and popstate
  useEffect(() => {
    const startProgress = () => {
      if (timerRef.current) clearInterval(timerRef.current);
      startTimeRef.current = Date.now();
      setIsVisible(true);
      setProgress(25);

      // Incrementally advance progress to simulate luxurious loading feel
      timerRef.current = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 88) {
            if (timerRef.current) clearInterval(timerRef.current);
            return 88;
          }
          if (prev < 50) return prev + 20;
          if (prev < 75) return prev + 10;
          return prev + 3;
        });
      }, 100);
    };

    const handleClick = (e: MouseEvent) => {
      // Find closest anchor tag
      const target = e.target as HTMLElement | null;
      const anchor = target?.closest("a") as HTMLAnchorElement | null;
      if (!anchor) return;

      const href = anchor.getAttribute("href");
      if (!href) return;

      // Ignore external links, downloads, new tabs, and modified clicks
      if (
        anchor.target === "_blank" ||
        anchor.hasAttribute("download") ||
        e.metaKey ||
        e.ctrlKey ||
        e.shiftKey ||
        e.altKey ||
        e.defaultPrevented
      ) {
        return;
      }

      // Check if it's an internal link
      const isInternal =
        href.startsWith("/") ||
        href.startsWith(window.location.origin);

      if (!isInternal) return;

      // Ignore purely in-page hash anchors (e.g. #main-content)
      const currentUrl = new URL(window.location.href);
      const targetUrl = new URL(anchor.href, window.location.href);

      if (
        currentUrl.pathname === targetUrl.pathname &&
        currentUrl.search === targetUrl.search &&
        targetUrl.hash
      ) {
        return;
      }

      // If navigating to the exact same page without hash, ignore
      if (
        currentUrl.pathname === targetUrl.pathname &&
        currentUrl.search === targetUrl.search
      ) {
        return;
      }

      startProgress();
    };

    const handlePopState = () => {
      startProgress();
    };

    window.addEventListener("app:navigation-start", startProgress);
    document.addEventListener("click", handleClick, { capture: true });
    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("app:navigation-start", startProgress);
      document.removeEventListener("click", handleClick, { capture: true });
      window.removeEventListener("popstate", handlePopState);
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  if (!isVisible && progress === 0) return null;

  return (
    <div
      aria-hidden="true"
      className="fixed top-0 left-0 right-0 z-[100000] pointer-events-none transition-opacity duration-300"
      style={{ opacity: isVisible ? 1 : 0 }}
    >
      <div
        className="relative h-[2.5px] bg-gradient-to-r from-foreground via-accent to-foreground transition-[width] duration-300 ease-out shadow-[0_1px_6px_rgba(23,25,23,0.3)]"
        style={{
          width: `${progress}%`,
        }}
      >
        {/* Glowing leading indicator */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-8 h-[5px] rounded-full bg-accent blur-[2px] opacity-90" />
      </div>
    </div>
  );
}

export default function NavigationProgress() {
  return (
    <Suspense fallback={null}>
      <NavigationProgressContent />
    </Suspense>
  );
}
