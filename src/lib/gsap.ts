import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
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

export { gsap, ScrollTrigger };
