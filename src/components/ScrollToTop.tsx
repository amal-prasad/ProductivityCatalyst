"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function ScrollToTop() {
  const pathname = usePathname();

  // Disable browser scroll restoration so pages always open at top
  useEffect(() => {
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }
  }, []);

  // Scroll to top on every route change and initial load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}
