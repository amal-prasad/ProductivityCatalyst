# 🎬 ANIMATION MASTER PROMPT
## Productivity Catalyst — Desktop & Mobile Unified System
> **Stack**: GSAP 3 + ScrollTrigger · Pure CSS micro-interactions · No Framer Motion
> **Philosophy**: Every element earns its place on screen. Nothing sits still without purpose.

---

## 0. SYSTEM CONSTANTS

Define these in `gsap.ts` as the single source of truth.  
**Never hardcode durations or eases inline.**

```ts
export const MOTION = {
  // Durations
  instant:    0.1,   // state flips, focus rings
  micro:      0.2,   // hover, icon bounce
  snappy:     0.3,   // card reveals, button presses
  standard:   0.5,   // section entrances, nav load
  deliberate: 0.75,  // hero sequence, pinned panels
  cinematic:  1.2,   // page-load curtain, full-bleed reveals

  // Eases
  out:        "power2.out",
  inOut:      "power2.inOut",
  back:       "back.out(1.4)",    // overshoot for cards/badges
  elastic:    "elastic.out(1, 0.4)", // icon pop
  smooth:     "expo.out",         // premium scroll scrub

  // Scroll trigger defaults
  triggerStart:        "top 82%",   // desktop
  triggerStartMobile:  "top 88%",   // mobile — fires earlier
  focusBand:           "top 65%",   // center-focus band for mobile cards
};

// Device detection — set once, use everywhere
export const IS_MOBILE   = () => window.innerWidth < 768;
export const IS_REDUCED  = () =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;
export const IS_LOW_END  = () => navigator.hardwareConcurrency <= 4;

// Blur allowed only if device is capable and user hasn't opted out
export const CAN_BLUR = () => !IS_REDUCED() && !IS_LOW_END();
```

---

## 1. PAGE LOAD SEQUENCE (GLOBAL — BOTH PLATFORMS)

**Rule**: The first 600ms of page load must feel like a curtain rising — structured, top-down, staggered.  
**Order**: Navbar → Hero Headline → Hero Subtext → Hero CTA → Hero Cards/Visuals

### 1.1 Navbar Entrance

```ts
// Navbar.tsx — fires ONCE on mount, never on route change
gsap.fromTo(".navbar", 
  { y: -64, opacity: 0 },
  { 
    y: 0, opacity: 1,
    duration: MOTION.standard,
    ease: MOTION.smooth,
    clearProps: "transform"   // release GPU layer after animation
  }
);
```

**Mobile**: Identical. No exceptions. Navbar is the structural anchor.

---

### 1.2 Hero Section Sequence

```ts
// Hero.tsx — orchestrated timeline, not independent tweens
const heroTl = gsap.timeline({ delay: 0.1 });

heroTl
  .fromTo(".hero-eyebrow",
    { opacity: 0, y: 16 },
    { opacity: 1, y: 0, duration: MOTION.snappy, ease: MOTION.out })

  .fromTo(".hero-headline",
    { opacity: 0, y: 24 },
    { opacity: 1, y: 0, duration: MOTION.deliberate, ease: MOTION.smooth }, "-=0.1")

  .fromTo(".hero-subtext",
    { opacity: 0, y: 16 },
    { opacity: 1, y: 0, duration: MOTION.standard, ease: MOTION.out }, "-=0.3")

  .fromTo(".hero-cta-primary",
    { opacity: 0, scale: 0.96, y: 12 },
    { opacity: 1, scale: 1, y: 0, duration: MOTION.snappy, ease: MOTION.back }, "-=0.2")

  .fromTo(".hero-cta-secondary",
    { opacity: 0, x: -8 },
    { opacity: 1, x: 0, duration: MOTION.micro, ease: MOTION.out }, "-=0.15");
```

**Desktop Hero Cards** (the 3–4 floating stat/feature cards):
```ts
gsap.fromTo(".hero-card",
  { opacity: 0, y: 32, scale: 0.94 },
  {
    opacity: 1, y: 0, scale: 1,
    duration: MOTION.deliberate,
    ease: MOTION.back,
    stagger: { amount: 0.4, from: "start" },
    delay: 0.6    // after headline settles
  }
);
```

**Mobile Hero Cards** — same stagger, tighter values:
```ts
// No floating — stack animation instead
gsap.fromTo(".hero-card",
  { opacity: 0, y: 20 },
  {
    opacity: 1, y: 0,
    duration: MOTION.snappy,
    ease: MOTION.out,
    stagger: 0.12,
    delay: 0.5
  }
);
```

---

## 2. SCROLL ANIMATIONS — CORE ENGINE

### 2.1 `animateOnScroll` — Standard Section Reveal (Desktop)

```ts
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
```

---

### 2.2 `animateMobileScrollFocus` — The Mobile Focus Engine

This is the **centrepiece of the mobile experience**. Each card/step is independently tied to its own ScrollTrigger progress — opacity and scale interpolate as the element moves through the focus band.

```ts
export function animateMobileScrollFocus(
  items: NodeListOf<Element> | Element[],
  opts?: { scaleMin?: number; blurMax?: number }
) {
  if (!IS_MOBILE()) return; // Desktop ignores this completely

  const scaleMin  = opts?.scaleMin ?? 0.93;
  const blurMax   = CAN_BLUR() ? (opts?.blurMax ?? 6) : 0;

  items.forEach((el) => {
    // Initial state
    gsap.set(el, {
      opacity: 0.35,
      scale: scaleMin,
      filter: blurMax > 0 ? `blur(${blurMax}px)` : "none",
    });

    ScrollTrigger.create({
      trigger: el,
      start: "top 85%",      // begins entering viewport
      end:   "top 25%",      // fully in focus zone
      scrub: 0.6,            // slight lag = premium feel
      onUpdate(self) {
        const p = self.progress; // 0 → 1
        gsap.set(el, {
          opacity:  gsap.utils.interpolate(0.35, 1, p),
          scale:    gsap.utils.interpolate(scaleMin, 1, p),
          filter:   blurMax > 0
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
```

**Usage in components:**
```ts
// HowItWorks.tsx
const steps = document.querySelectorAll(".mobile-step-row");
animateMobileScrollFocus(steps);

// PinnedScrollFeatures.tsx
const items = document.querySelectorAll(".pinned-item");
animateMobileScrollFocus(items);
```

---

## 3. COMPONENT-BY-COMPONENT SPEC

### 3.1 Hero Cards (Stat / Feature Cards)

| Property | Desktop | Mobile |
|---|---|---|
| Entrance | `y: 32 → 0`, `scale: 0.94 → 1`, stagger `0.1s` | `y: 20 → 0`, stagger `0.12s` |
| Hover | `scale: 1.03`, `boxShadow` lift, `200ms` | None (touch) |
| Scroll | Static after entrance | `animateMobileScrollFocus` |
| Border glow | CSS `box-shadow` pulse on hover | None |

```css
/* CSS-only hover — zero JS cost */
.hero-card {
  transition: transform 200ms cubic-bezier(0.34, 1.56, 0.64, 1),
              box-shadow 200ms ease;
}
.hero-card:hover {
  transform: translateY(-4px) scale(1.025);
  box-shadow: 0 20px 60px rgba(0,0,0,0.18);
}
```

---

### 3.2 HowItWorks — Step Rows

**Desktop:**
```ts
// Alternating slide-in (left/right) per step
document.querySelectorAll(".step-row").forEach((row, i) => {
  const fromLeft = i % 2 === 0;
  gsap.fromTo(row,
    { opacity: 0, x: fromLeft ? -50 : 50 },
    {
      opacity: 1, x: 0,
      duration: MOTION.standard,
      ease: MOTION.smooth,
      scrollTrigger: { trigger: row, start: MOTION.triggerStart }
    }
  );
});
```

**Mobile:**
```ts
const mobileSteps = document.querySelectorAll(".mobile-step-row");
animateMobileScrollFocus(mobileSteps, { scaleMin: 0.94, blurMax: 4 });
```

**Step number counter animation (both):**
```ts
// Animate the "01 → 05" numerals as they scroll in
gsap.fromTo(".step-number",
  { opacity: 0, y: 8 },
  { opacity: 1, y: 0, duration: MOTION.micro, ease: MOTION.back,
    scrollTrigger: { trigger: ".step-number", start: "top 85%" }
  }
);
```

---

### 3.3 PinnedScrollFeatures

**Desktop** — maintain existing GSAP pin, refine only the card entrance within the pinned container:
```ts
// Inside the pinned sequence, each feature panel entrance:
gsap.fromTo(".feature-panel",
  { opacity: 0, x: 30 },
  { opacity: 1, x: 0, duration: MOTION.standard, ease: MOTION.smooth }
);
```

**Mobile** — no pin. Replace with:
```ts
const pinnedItems = document.querySelectorAll(".pinned-item");
animateMobileScrollFocus(pinnedItems, { scaleMin: 0.92, blurMax: 5 });
```

Add `padding-bottom: 30vh` to the section container so the last item can fully reach the focus band.

---

### 3.4 CTASection

```ts
// CTASection.tsx — currently only animates text. Fix:
const ctaTl = gsap.timeline({
  scrollTrigger: {
    trigger: ".cta-section",
    start: "top 75%",
  }
});

ctaTl
  .fromTo(".cta-headline",
    { opacity: 0, y: 30 },
    { opacity: 1, y: 0, duration: MOTION.standard, ease: MOTION.smooth })

  .fromTo(".cta-subtext",
    { opacity: 0, y: 16 },
    { opacity: 1, y: 0, duration: MOTION.snappy, ease: MOTION.out }, "-=0.2")

  // THE MISSING BUTTON ANIMATION:
  .fromTo(".cta-button-primary",
    { opacity: 0, y: 20, scale: 0.95 },
    { opacity: 1, y: 0, scale: 1,
      duration: MOTION.snappy, ease: MOTION.back }, "-=0.1");
```

**Mobile**: identical — the CTA is a critical conversion element on all viewports.

---

### 3.5 Testimonials / Social Proof Cards

**Desktop — horizontal stagger:**
```ts
gsap.fromTo(".testimonial-card",
  { opacity: 0, y: 24, scale: 0.97 },
  {
    opacity: 1, y: 0, scale: 1,
    duration: MOTION.standard,
    ease: MOTION.back,
    stagger: { amount: 0.5, from: "start" },
    scrollTrigger: { trigger: ".testimonials-grid", start: "top 80%" }
  }
);
```

**Mobile — sequential focus:**
```ts
animateMobileScrollFocus(
  document.querySelectorAll(".testimonial-card"),
  { scaleMin: 0.95, blurMax: 3 }
);
```

---

### 3.6 Pricing Cards

**Desktop:**
```ts
gsap.fromTo(".pricing-card",
  { opacity: 0, y: 40 },
  {
    opacity: 1, y: 0,
    duration: MOTION.deliberate,
    ease: MOTION.smooth,
    stagger: 0.15,
    scrollTrigger: { trigger: ".pricing-grid", start: "top 78%" }
  }
);

// Recommended/highlighted card gets extra pop
gsap.fromTo(".pricing-card--featured",
  { opacity: 0, y: 40, scale: 0.95 },
  { opacity: 1, y: 0, scale: 1,
    duration: MOTION.deliberate, ease: MOTION.back,
    scrollTrigger: { trigger: ".pricing-card--featured", start: "top 78%" }
  }
);
```

**Mobile:** `animateMobileScrollFocus` with `blurMax: 0` (pricing text must stay crisp).

---

### 3.7 FAQ / Accordion

```ts
// Section entrance
gsap.fromTo(".faq-item",
  { opacity: 0, x: -20 },
  {
    opacity: 1, x: 0,
    duration: MOTION.snappy,
    stagger: 0.08,
    ease: MOTION.out,
    scrollTrigger: { trigger: ".faq-section", start: "top 82%" }
  }
);

// Open/close — CSS transition on content height + opacity
```

```css
.faq-content {
  max-height: 0;
  opacity: 0;
  overflow: hidden;
  transition: max-height 300ms cubic-bezier(0.4, 0, 0.2, 1),
              opacity 200ms ease;
}
.faq-item.open .faq-content {
  max-height: 400px; /* generous ceiling */
  opacity: 1;
}
```

---

### 3.8 Footer

```ts
gsap.fromTo(".footer-col",
  { opacity: 0, y: 20 },
  {
    opacity: 1, y: 0,
    duration: MOTION.snappy,
    stagger: 0.1,
    ease: MOTION.out,
    scrollTrigger: { trigger: ".footer", start: "top 95%" }
  }
);
```

---

## 4. MICRO-INTERACTIONS — CSS-ONLY (Zero JS cost)

Apply these globally via `globals.css`. No GSAP needed.

```css
/* ─── Buttons ─── */
.btn-primary {
  transition: transform 150ms cubic-bezier(0.34, 1.56, 0.64, 1),
              box-shadow 150ms ease,
              background-color 150ms ease;
}
.btn-primary:hover  { transform: translateY(-2px) scale(1.02); }
.btn-primary:active { transform: translateY(0px)  scale(0.98); }

/* ─── Icon hover ─── */
.icon-hover {
  transition: transform 200ms cubic-bezier(0.34, 1.56, 0.64, 1);
}
.icon-hover:hover { transform: scale(1.15) rotate(-4deg); }

/* ─── Nav links ─── */
.nav-link::after {
  content: '';
  display: block;
  height: 1.5px;
  background: currentColor;
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 250ms ease;
}
.nav-link:hover::after { transform: scaleX(1); }

/* ─── Cards — touch feedback on mobile ─── */
@media (hover: none) {
  .card:active {
    transform: scale(0.98);
    transition: transform 100ms ease;
  }
}

/* ─── Focus rings — accessibility ─── */
:focus-visible {
  outline: 2px solid var(--color-accent);
  outline-offset: 3px;
  border-radius: 4px;
  transition: outline-offset 100ms ease;
}
```

---

## 5. PERFORMANCE & SAFETY RULES

### 5.1 GPU Layer Management

```ts
// Set willChange BEFORE animation, release AFTER
gsap.set(".animating-el", { willChange: "transform, opacity" });

// In onComplete of every tween:
onComplete: () => gsap.set(".animating-el", { clearProps: "willChange, transform" })
```

Never apply `will-change` to more than 3–5 elements simultaneously on mobile.

---

### 5.2 Reduced Motion + Low-End Fallback

```ts
// gsap.ts — wrap ALL animation registration
export function safeAnimate(fn: () => void, fallbackFn?: () => void) {
  if (IS_REDUCED()) {
    // Instant opacity reveal — zero movement
    fallbackFn?.() ?? gsap.set("[data-animate]", { opacity: 1 });
    return;
  }
  fn();
}

// Usage:
safeAnimate(
  () => animateMobileScrollFocus(items),         // full animation
  () => gsap.set(items, { opacity: 1, scale: 1 }) // instant reveal
);
```

---

### 5.3 ScrollTrigger Refresh on Load

```ts
// gsap.ts — after ALL ScrollTriggers are registered
if (typeof window !== "undefined") {
  window.addEventListener("load", () => {
    ScrollTrigger.refresh();
  });
}
```

This prevents trigger position miscalculation caused by late-loading fonts and images — the #1 mobile GSAP bug.

---

### 5.4 Cleanup on Unmount (React)

```ts
// Every component with GSAP animations:
useEffect(() => {
  const ctx = gsap.context(() => {
    // all gsap calls here
  }, sectionRef);

  return () => ctx.revert(); // kills all tweens + triggers on unmount
}, []);
```

---

## 6. MOBILE-SPECIFIC RULES (Non-Negotiable)

| Rule | Reason |
|---|---|
| No `gsap.pin` on mobile | Fights native momentum scroll |
| No `overflow: hidden` on `body` during scroll | Breaks iOS rubber-band |
| `scrub: 0.4–0.8` only (never `scrub: true`) | `true` = no lag = feels mechanical |
| `stagger` max `0.15s` per item on mobile | More = feels laggy, not deliberate |
| Add `padding-bottom: 30vh` to last scrollFocus section | Last item must reach focus band |
| `blurMax: 0` on text-heavy cards (pricing, FAQ) | Blur on text = illegible mid-scroll |
| All touch targets ≥ 44×44px | Apple HIG + WCAG compliance |

---

## 7. IMPLEMENTATION ORDER (GSD Priority)

```
Phase 1 — Foundation (no visible changes, just infrastructure)
  ✅ Add MOTION constants to gsap.ts
  ✅ Add IS_MOBILE, IS_REDUCED, CAN_BLUR, safeAnimate utilities
  ✅ Add ScrollTrigger.refresh() on window load
  ✅ Add gsap.context cleanup to all components
  ✅ Add global CSS micro-interactions

Phase 2 — High-impact visible wins
  ✅ Navbar entrance animation
  ✅ Hero timeline sequence
  ✅ Hero cards entrance (desktop stagger + mobile stagger)
  ✅ CTA button animation (the missing one)

Phase 3 — Scroll experience
  ✅ animateMobileScrollFocus — build and test in isolation
  ✅ HowItWorks — desktop alternating slide + mobile focus
  ✅ PinnedScrollFeatures — mobile focus replacement

Phase 4 — Supporting sections
  ✅ Testimonials
  ✅ Pricing cards
  ✅ FAQ accordion
  ✅ Footer

Phase 5 — QA
  ✅ npm run build (no ScrollTrigger context conflicts)
  ✅ Chrome DevTools Performance — 60fps scroll on mobile
  ✅ Enable prefers-reduced-motion — confirm instant reveals
  ✅ Test on real device (not just DevTools resize)
```

---

## 8. VERIFICATION CHECKLIST

```
□ Navbar slides in on first load, NOT on route changes
□ Hero headline is first visible element — no flash of invisible content
□ All hero cards visible within 800ms of page load
□ Scroll down on mobile — each card independently focuses (scale + opacity)
□ Last item in every section reaches focus band before section ends
□ CTA button animates in — not just the text above it
□ Blur does NOT appear on pricing or FAQ cards
□ On a real iPhone: scroll feels native, no jank, no hijack
□ Reduced motion: all elements appear instantly, no movement
□ Low-end device (< 4 cores): blur disabled, opacity-only transitions
□ npm run build passes with zero GSAP warnings
□ No will-change leak — DevTools Layers panel shows clean layer tree
```

---

> **Golden Rule**: If an animation takes longer than the user's patience to notice, it is too slow. If it finishes before the eye lands on it, it is too fast. 250ms is almost always correct.
