"use client";

import { useLayoutEffect, Suspense } from "react";
import { usePathname } from "next/navigation";

function ScrollResetContent() {
  const pathname = usePathname();

  useLayoutEffect(() => {
    // Disable browser automatic scroll restoration to avoid restoring previous page scroll
    if (typeof window !== "undefined") {
      if ("scrollRestoration" in window.history) {
        window.history.scrollRestoration = "manual";
      }

      // Instant scroll to top
      const resetScroll = () => {
        if (window.__lenis) {
          window.__lenis.scrollTo(0, { immediate: true });
        }
        window.scrollTo({ top: 0, left: 0, behavior: "instant" });
        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;
      };

      resetScroll();

      // Ensure layout paint does not clamp scroll to bottom of newly mounted shorter page
      const frameId = requestAnimationFrame(() => {
        resetScroll();
      });

      const timerId = setTimeout(() => {
        resetScroll();
      }, 50);

      return () => {
        cancelAnimationFrame(frameId);
        clearTimeout(timerId);
      };
    }
  }, [pathname]);

  return null;
}

export default function ScrollReset() {
  return (
    <Suspense fallback={null}>
      <ScrollResetContent />
    </Suspense>
  );
}
