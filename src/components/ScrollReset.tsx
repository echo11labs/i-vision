"use client";

import { useLayoutEffect, Suspense } from "react";
import { usePathname } from "next/navigation";

function ScrollResetContent() {
  const pathname = usePathname();

  useLayoutEffect(() => {
    if (typeof window !== "undefined") {
      if ("scrollRestoration" in window.history) {
        window.history.scrollRestoration = "manual";
      }
      if (window.__lenis) {
        window.__lenis.scrollTo(0, { immediate: true });
      }
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
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
