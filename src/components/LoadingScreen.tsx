"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { useLoading } from "@/context/LoadingContext";

/* ─────────────────────────────────────────────────────────────────
   Inline SVG — Productivity Catalyst flag/rocket logo
   Dark navy (#0b1437) vertical bar + electric blue (#4d7cfe) stripes
   ───────────────────────────────────────────────────────────────── */
function LogoMark({ size = 80 }: { size?: number }) {
  const scale = size / 100;
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* Vertical bar */}
      <rect x="22" y="12" width="8" height="72" rx="1" fill="#0b1437" />
      {/* Top bracket */}
      <rect x="22" y="12" width="22" height="6" rx="1" fill="#0b1437" />
      {/* Three horizontal speed stripes */}
      <rect x="38" y="22" width="28" height="7" rx="3.5" fill="#4d7cfe" />
      <rect x="38" y="38" width="32" height="7" rx="3.5" fill="#4d7cfe" />
      <rect x="38" y="54" width="26" height="7" rx="3.5" fill="#4d7cfe" />
      {/* Curved bottom connector */}
      <path
        d="M30 64 Q30 78, 44 78 Q56 78, 62 70"
        stroke="#4d7cfe"
        strokeWidth="7"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}

/* ──────────────────────────────────────────────────────────────── */

const MIN_DISPLAY_MS = 3000; // minimum time the loading screen is shown
const TICK_INTERVAL = 40;    // how often we update progress (~25fps)

export default function LoadingScreen() {
  const { isLoading, setTransitionComplete } = useLoading();
  const [shouldRender, setShouldRender] = useState(true);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [progress, setProgress] = useState(0);
  const overlayRef = useRef<HTMLDivElement>(null);

  // Track when the component first mounted
  const mountTimeRef = useRef(Date.now());
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
        setShouldRender(false);
        setTransitionComplete(true);
      } else {
        setIsFadingOut(true);
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
