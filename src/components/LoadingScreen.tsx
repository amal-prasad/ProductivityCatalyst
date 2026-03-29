"use client";

import { useEffect, useState, useRef } from "react";
import { useLoading } from "@/context/LoadingContext";

export default function LoadingScreen() {
  const { isLoading, setTransitionComplete } = useLoading();
  const [shouldRender, setShouldRender] = useState(true);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);

  // Handle accessibility attributes globally
  useEffect(() => {
    if (isLoading) {
      document.body.setAttribute("aria-busy", "true");
    } else {
      document.body.removeAttribute("aria-busy");
    }
    return () => {
      document.body.removeAttribute("aria-busy");
    };
  }, [isLoading]);

  useEffect(() => {
    if (!isLoading) {
      // Respect user motion preferences
      const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      
      if (prefersReducedMotion) {
        setShouldRender(false);
        setTransitionComplete(true);
      } else {
        setIsFadingOut(true);
      }
    }
  }, [isLoading, setTransitionComplete]);

  const handleTransitionEnd = () => {
    if (isFadingOut) {
      setShouldRender(false);
      setTransitionComplete(true);
    }
  };

  useEffect(() => {
    // Focus isolation: force focus onto the loading overlay when active
    if (shouldRender && overlayRef.current) {
      overlayRef.current.focus();
    }
  }, [shouldRender]);

  if (!shouldRender) return null;

  return (
    <div
      ref={overlayRef}
      tabIndex={-1}
      aria-live="polite"
      className={`fixed inset-0 z-[100] flex items-center justify-center bg-background text-white transition-opacity duration-1000 ease-in-out ${
        isFadingOut ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
      onTransitionEnd={handleTransitionEnd}
      style={{ outline: "none" }}
    >
      <div className="flex flex-col items-center justify-center gap-8">
        <div className="relative flex items-center justify-center w-16 h-16">
          <div className="absolute inset-0 border-t-2 border-r-2 border-white/10 rounded-full animate-spin" />
          <div className="absolute inset-2 border-t-2 border-l-2 border-accent rounded-full animate-[spin_1.5s_linear_infinite]" />
        </div>
        <div className="text-[0.65rem] tracking-[0.2em] uppercase text-white/50 animate-pulse">
          Initializing Environment
        </div>
      </div>
    </div>
  );
}
