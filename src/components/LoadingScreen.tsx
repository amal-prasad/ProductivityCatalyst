"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { useLoading } from "@/context/LoadingContext";
import { ScrollTrigger } from "@/lib/gsap";

import LogoMark from "./LogoMark";

/* ──────────────────────────────────────────────────────────────── */

const MIN_DISPLAY_MS = 2500; // minimum time the loading screen is shown
const TICK_INTERVAL = 30;    // how often we update progress (~33fps)

export default function LoadingScreen() {
  const { isLoading, setTransitionComplete } = useLoading();
  const [shouldRender, setShouldRender] = useState(true);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [progress, setProgress] = useState(0);
  const overlayRef = useRef<HTMLDivElement>(null);

  // Track when the component first mounted (lazy initialiser avoids impure render call)
  const mountTimeRef = useRef<number>(0);
  const mountInitialised = useRef(false);

  useEffect(() => {
    if (!mountInitialised.current) {
      mountTimeRef.current = Date.now();
      mountInitialised.current = true;
    }
  }, []);
  // Track whether loading has resolved (from context)
  const loadResolvedRef = useRef(false);

  // When isLoading becomes false, mark it
  useEffect(() => {
    if (!isLoading) {
      loadResolvedRef.current = true;
    }
  }, [isLoading]);

  // Animated progress counter
  useEffect(() => {
    const id = setInterval(() => {
      if (!mountInitialised.current) return; // wait for mount timestamp
      const elapsed = Date.now() - mountTimeRef.current;
      const loadDone = loadResolvedRef.current;

      if (loadDone && elapsed >= MIN_DISPLAY_MS) {
        // Snap to 100 and stop
        setProgress(100);
        clearInterval(id);
        return;
      }

      // Ease toward 95% during loading using an asymptotic curve
      const t = Math.min(elapsed / MIN_DISPLAY_MS, 1);
      const target = loadDone ? 100 : Math.floor(95 * (1 - Math.pow(1 - t, 3)));
      setProgress((prev) => Math.max(prev, target));
    }, TICK_INTERVAL);

    return () => clearInterval(id);
  }, []);

  // When progress hits 100, start fade-out
  const hasFiredFade = useRef(false);
  useEffect(() => {
    if (progress === 100 && !hasFiredFade.current) {
      hasFiredFade.current = true;

      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      if (prefersReducedMotion) {
        // Defer state updates to avoid synchronous setState inside effect body
        requestAnimationFrame(() => {
          setShouldRender(false);
          setTransitionComplete(true);
          ScrollTrigger.refresh();
        });
      } else {
        requestAnimationFrame(() => setIsFadingOut(true));
      }
    }
  }, [progress, setTransitionComplete]);

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

  const handleTransitionEnd = useCallback(() => {
    if (isFadingOut) {
      setShouldRender(false);
      setTransitionComplete(true);
      // Recalculate all ScrollTrigger positions now that the loading overlay is gone
      // and the page layout has stabilized
      requestAnimationFrame(() => {
        ScrollTrigger.refresh();
      });
    }
  }, [isFadingOut, setTransitionComplete]);

  // Focus isolation
  useEffect(() => {
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
      data-testid="loading-screen"
      className={`loading-screen ${isFadingOut ? "loading-screen--fade-out" : ""}`}
      onTransitionEnd={handleTransitionEnd}
    >
      {/* Geometric grid */}
      <div className="loading-grid" />

      {/* Blue glow */}
      <div className="loading-glow" />

      {/* Logo + wordmark */}
      <div className="loading-logo-block">
        <LogoMark size={80} />

        <div className="loading-wordmark">
          <span className="loading-wordmark__productivity">Productivity</span>
          <span className="loading-wordmark__catalyst">Catalyst</span>
        </div>
      </div>

      {/* Percentage counter */}
      <div className="loading-percent">{progress}%</div>

      {/* Bottom progress bar */}
      <div className="loading-bar-track">
        <div
          className="loading-bar-fill"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}
