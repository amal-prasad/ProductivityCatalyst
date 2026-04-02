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

export const MOTION = {
  // Durations
  instant: 0.1,   // state flips, focus rings
  micro: 0.2,   // hover, icon bounce
  snappy: 0.3,   // card reveals, button presses
  standard: 0.5,   // section entrances, nav load
  deliberate: 0.75,  // hero sequence, pinned panels
  cinematic: 1.2,   // page-load curtain, full-bleed reveals

  // Eases
  out: "power2.out",
  inOut: "power2.inOut",
  back: "back.out(1.4)",    // overshoot for cards/badges
  elastic: "elastic.out(1, 0.4)", // icon pop
  smooth: "expo.out",         // premium scroll scrub

  // Scroll trigger defaults
  triggerStart: "top 82%",   // desktop
  triggerStartMobile: "top 88%",   // mobile — fires earlier
  focusBand: "top 65%",   // center-focus band for mobile cards
};

// Device detection — set once, use everywhere
export const IS_MOBILE = () => typeof window !== 'undefined' && window.innerWidth < 768;
export const IS_REDUCED = () => typeof window !== 'undefined' && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
export const IS_LOW_END = () => typeof navigator !== 'undefined' && navigator.hardwareConcurrency <= 4;

// Blur allowed only if device is capable and user hasn't opted out
export const CAN_BLUR = () => !IS_REDUCED() && !IS_LOW_END();

export function safeAnimate(fn: () => void, fallbackFn?: () => void) {
  if (IS_REDUCED()) {
    // Instant opacity reveal — zero movement
    if (fallbackFn) {
      fallbackFn();
    } else {
      gsap.set("[data-animate]", { opacity: 1 });
    }
    return;
  }
  fn();
}

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
  selector: string,
  opts?: { stagger?: number; y?: number; delay?: number }
) {
  gsap.fromTo(selector,
    { opacity: 0, y: opts?.y ?? 40 },
    {
      opacity: 1, y: 0,
      duration: MOTION.standard,
      ease: MOTION.out,
      stagger: opts?.stagger ?? 0,
      delay: opts?.delay ?? 0,
      scrollTrigger: {
        trigger: selector,
        start: MOTION.triggerStart,
        toggleActions: "play none none none",
      }
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
      duration: MOTION.cinematic,
      ease: MOTION.inOut,
      scrollTrigger: {
        trigger: el,
        start: "top 95%",
        once: true,
      },
    }
  );
}

/* ─────────────────────────────────────────────────────────
   Scroll-triggered entrance animation
   ───────────────────────────────────────────────────────── */

// Ensure ScrollTrigger is registered in this utility file
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function animateEntrance(
  items: NodeListOf<Element> | Element[] | null | undefined,
  opts?: { y?: number; duration?: number }
) {
  if (!items) return;

  const arr = Array.from(items);
  if (!arr.length) return;

  const y = opts?.y ?? 30;
  const duration = opts?.duration ?? MOTION?.snappy ?? 0.4;
  const mobile = typeof IS_MOBILE === "function" ? IS_MOBILE() : false;

  arr.forEach((el) => {
    // 1. THE ULTIMATE GUARD:
    // Check if it exists AND is physically attached to the DOM right now.
    if (!el || !(el instanceof Element) || !el.isConnected) return;

    // 2. PREVENT STRICT MODE DUPLICATES:
    // Safely clear out any old ScrollTriggers attached to this specific element FIRST
    ScrollTrigger.getAll().forEach(st => {
      if (st.trigger === el) {
        st.kill();
      }
    });

    // Then kill the tweens
    gsap.killTweensOf(el);

    // Re-check connection immediately before animating — React 19 Strict Mode
    // can unmount/remount between the guard above and this call.
    if (!el.isConnected) return;

    gsap.fromTo(el,
      { opacity: 0, y },
      {
        opacity: 1,
        y: 0,
        duration,
        ease: MOTION?.out || "power2.out",
        scrollTrigger: {
          trigger: el,
          start: mobile ? (MOTION?.triggerStartMobile || "top 85%") : (MOTION?.triggerStart || "top 80%"),
          once: true,
        },
      }
    );
  });
}

/* ─────────────────────────────────────────────────────────
   Mobile scroll-focus animation
   ───────────────────────────────────────────────────────── */

/**
 * Attaches per-element scrub-based ScrollTriggers that animate
 * opacity (0→1→0), scale (0.95→1→0.95), and optionally blur
 * as each item scrolls through a "focus band" in the viewport.
 */
export function animateMobileScrollFocus(
  items: NodeListOf<Element> | Element[],
  opts?: { scaleMin?: number; blurMax?: number }
) {
  if (!IS_MOBILE()) return; // Desktop ignores this completely

  const scaleMin = opts?.scaleMin ?? 0.93;
  const blurMax = CAN_BLUR() ? (opts?.blurMax ?? 6) : 0;

  items.forEach((el) => {
    // 1. GUARD
    if (!el || !(el instanceof Element) || !el.isConnected) return;

    // 2. PREVENT STRICT MODE DUPLICATES:
    ScrollTrigger.getAll().forEach(st => {
      if (st.trigger === el) {
        st.kill();
      }
    });

    gsap.killTweensOf(el);

    // Initial state
    gsap.set(el, {
      opacity: 0.35,
      scale: scaleMin,
      filter: blurMax > 0 ? `blur(${blurMax}px)` : "none",
    });

    ScrollTrigger.create({
      trigger: el,
      start: "top 85%",      // begins entering viewport
      end: "top 25%",      // fully in focus zone
      scrub: 0.6,            // slight lag = premium feel
      onUpdate(self) {
        const p = self.progress; // 0 → 1
        gsap.set(el, {
          opacity: gsap.utils.interpolate(0.35, 1, p),
          scale: gsap.utils.interpolate(scaleMin, 1, p),
          filter: blurMax > 0
            ? `blur(${gsap.utils.interpolate(blurMax, 0, p)}px)`
            : "none",
        });
      },
      onLeave() {
        // Element scrolled past — fade it back slightly
        gsap.to(el, {
          opacity: 0.5, scale: 0.96,
          duration: MOTION.micro, ease: MOTION.out
        });
      },
      onEnterBack() {
        // Re-entering from below — reset scrub
        gsap.set(el, { opacity: 0.35, scale: scaleMin });
      }
    });
  });
}

export { gsap, ScrollTrigger };