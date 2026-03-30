import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);

  // Recalculate all trigger positions after fonts/images finish loading
  window.addEventListener("load", () => ScrollTrigger.refresh());
}

/* ─────────────────────────────────────────────────────────
   Timing constants — split by animation type
   ───────────────────────────────────────────────────────── */

export const TIMING = {
  /** Structural load animations (navbar drop-in) */
  structuralLoad: { duration: 0.6, ease: "power2.out" as const },
  /** Scroll-focus micro-interactions (mobile card scrub) */
  scrollFocus: { duration: 0.24, ease: "power2.out" as const },
  /** CTA / button slide-in entrances */
  ctaEntrance: { duration: 0.35, ease: "power3.out" as const },
  /** Blur removal — matches scale duration for synchronised feel */
  blurRemoval: { duration: 0.24, ease: "power2.out" as const },
} as const;

/* ─────────────────────────────────────────────────────────
   Device capability detection — proactive, not reactive
   ───────────────────────────────────────────────────────── */

function getMotionCapabilities() {
  if (typeof window === "undefined") {
    return { prefersReducedMotion: false, isLowEnd: false, useBlur: true };
  }
  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;
  const isLowEnd =
    typeof navigator !== "undefined" &&
    "hardwareConcurrency" in navigator &&
    (navigator.hardwareConcurrency ?? 8) <= 4;
  const useBlur = !prefersReducedMotion && !isLowEnd;
  return { prefersReducedMotion, isLowEnd, useBlur };
}

export { getMotionCapabilities };

/** Fade each word in a headline up from Y+40 on page load */
export function animateHeroWords(container: Element | null) {
  if (!container) return;
  const words = container.querySelectorAll(".hero-word");
  gsap.fromTo(
    words,
    { y: 40, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      duration: 1.4,
      stagger: 0.14,
      ease: "power3.out",
      delay: 0.35,
    }
  );
}

/** Fade + slide a batch of elements on scroll entry */
export function animateOnScroll(
  elements: Element | Element[] | NodeListOf<Element> | null,
  options: {
    trigger?: Element | string;
    y?: number;
    x?: number;
    stagger?: number;
    start?: string;
    duration?: number;
  } = {}
) {
  if (!elements) return;
  const { y = 30, x = 0, stagger = 0, start = "top 80%", duration = 0.9 } = options;
  return gsap.fromTo(
    elements,
    { y, x, opacity: 0 },
    {
      y: 0,
      x: 0,
      opacity: 1,
      duration,
      stagger,
      ease: "power3.out",
      scrollTrigger: {
        trigger: options.trigger ?? (elements instanceof Element ? elements : undefined),
        start,
        once: true,
      },
    }
  );
}

/** CTA section: line1 slides in from left, line2 from right */
export function animateCTASplit(line1: Element | null, line2: Element | null) {
  if (!line1 || !line2) return;
  const tl = gsap.timeline({
    scrollTrigger: { trigger: line1.parentElement, start: "top 75%", once: true },
  });
  tl.fromTo(line1, { x: -60, opacity: 0 }, { x: 0, opacity: 1, duration: 1, ease: "power3.out" }, 0);
  tl.fromTo(line2, { x: 60, opacity: 0 }, { x: 0, opacity: 1, duration: 1, ease: "power3.out" }, 0);
  return tl;
}

/* ─────────────────────────────────────────────────────────
   NEW: Pinned Scroll crossfade animation
   ───────────────────────────────────────────────────────── */

/**
 * Pins a container and crossfades through child items as the user scrolls.
 * Each item blurs + fades out while the next scales up + fades in.
 */
export function animatePinnedScroll(
  container: HTMLElement,
  items: HTMLElement[],
  options: { scrollLength?: number } = {}
) {
  if (!container || items.length === 0) return;

  const { scrollLength = 300 } = options; // scroll-pixels per item transition

  // Master timeline pinned to the container
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: container,
      start: "top top",
      end: `+=${items.length * scrollLength}`,
      pin: true,
      scrub: 0.6,
      anticipatePin: 1,
    },
  });

  // Set initial state: first item visible, others hidden
  items.forEach((item, i) => {
    gsap.set(item, {
      opacity: i === 0 ? 1 : 0,
      scale: i === 0 ? 1 : 0.92,
      filter: i === 0 ? "blur(0px)" : "blur(8px)",
      position: "absolute",
      inset: 0,
      display: "flex",
    });
  });

  // Create crossfade transitions between adjacent items
  for (let i = 0; i < items.length - 1; i++) {
    // Fade out current
    tl.to(items[i], {
      opacity: 0,
      scale: 1.05,
      filter: "blur(8px)",
      duration: 1,
      ease: "power2.inOut",
    });
    // Fade in next (overlapping)
    tl.fromTo(
      items[i + 1],
      { opacity: 0, scale: 0.92, filter: "blur(8px)" },
      { opacity: 1, scale: 1, filter: "blur(0px)", duration: 1, ease: "power2.inOut" },
      "<0.3" // slight overlap for smooth crossfade
    );
    // Pause on the new item for a beat
    tl.to({}, { duration: 0.5 });
  }

  return tl;
}

/* ─────────────────────────────────────────────────────────
   NEW: Animated number counter
   ───────────────────────────────────────────────────────── */

/**
 * Counts a numeric element from 0 to `target`.
 * Supports suffix strings (e.g. "+", "%", "h").
 */
export function animateCounter(
  el: HTMLElement,
  target: number,
  options: {
    suffix?: string;
    prefix?: string;
    duration?: number;
    ease?: string;
    scrollTrigger?: ScrollTrigger.Vars;
  } = {}
) {
  if (!el) return;
  const { suffix = "", prefix = "", duration = 2, ease = "power2.out" } = options;
  const proxy = { val: 0 };

  return gsap.to(proxy, {
    val: target,
    duration,
    ease,
    scrollTrigger: options.scrollTrigger ?? {
      trigger: el,
      start: "top 85%",
      once: true,
    },
    onUpdate() {
      el.textContent = `${prefix}${Math.round(proxy.val)}${suffix}`;
    },
  });
}

/* ─────────────────────────────────────────────────────────
   NEW: Footer line-draw animation
   ───────────────────────────────────────────────────────── */

/**
 * Draws a line (scaleX 0→1) when the element enters the viewport.
 */
export function animateLineDraw(el: HTMLElement) {
  if (!el) return;
  gsap.fromTo(
    el,
    { scaleX: 0 },
    {
      scaleX: 1,
      duration: 1.2,
      ease: "power3.inOut",
      scrollTrigger: {
        trigger: el,
        start: "top 95%",
        once: true,
      },
    }
  );
}

/* ─────────────────────────────────────────────────────────
   Mobile scroll-focus animation
   Each item independently scrubs opacity + scale + blur
   as it passes through the viewport focus band.
   ───────────────────────────────────────────────────────── */

/**
 * Attaches per-element scrub-based ScrollTriggers that animate
 * opacity (0→1→0), scale (0.95→1→0.95), and optionally blur
 * as each item scrolls through a "focus band" in the viewport.
 *
 * Uses `start: "top 85%"` / `end: "top 15%"` as a forgiving band
 * so the last item in a list doesn't need extra bottom padding
 * to reach full visibility.
 *
 * Respects prefers-reduced-motion and low-end device heuristic —
 * falls back to opacity-only on constrained devices.
 */
export function animateMobileScrollFocus(
  items: Element[] | NodeListOf<Element>,
  options: {
    /** ScrollTrigger start position. Default: "top 85%" */
    start?: string;
    /** ScrollTrigger end position. Default: "top 15%" */
    end?: string;
    /** Scale range [min, max]. Default: [0.95, 1] */
    scaleRange?: [number, number];
    /** Additional y offset for entrance. Default: 20 */
    yOffset?: number;
  } = {}
) {
  if (!items || (items instanceof NodeList && items.length === 0)) return;

  const {
    start = "top 85%",
    end = "top 15%",
    scaleRange = [0.95, 1],
    yOffset = 20,
  } = options;

  const { prefersReducedMotion, useBlur } = getMotionCapabilities();

  const elements = items instanceof NodeList ? Array.from(items) : items;

  elements.forEach((item) => {
    // Set initial state
    const fromVars: gsap.TweenVars = {
      opacity: 0,
      scale: scaleRange[0],
      y: yOffset,
    };
    const toVars: gsap.TweenVars = {
      opacity: 1,
      scale: scaleRange[1],
      y: 0,
      duration: TIMING.scrollFocus.duration,
      ease: TIMING.scrollFocus.ease,
      scrollTrigger: {
        trigger: item,
        start,
        end,
        scrub: prefersReducedMotion ? false : 0.4,
        once: prefersReducedMotion, // instant snap if reduced motion
      },
    };

    // Blur only on capable devices
    if (useBlur && !prefersReducedMotion) {
      fromVars.filter = "blur(4px)";
      toVars.filter = "blur(0px)";
    }

    gsap.fromTo(item, fromVars, toVars);
  });
}

export { gsap, ScrollTrigger };
