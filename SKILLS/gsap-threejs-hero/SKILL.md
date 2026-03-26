---
name: gsap-threejs-hero
description: >
  Implement a Three.js WebGL particle-vortex hero section in a Next.js App Router project,
  with GSAP scroll-triggered animations and Lenis smooth scroll. Use this skill whenever
  building a premium dark-theme landing page that needs a 3D animated hero (particle sphere,
  vortex, point cloud), interactive mouse parallax, or any Three.js + GSAP + Next.js
  integration pattern. Also use it when adding GSAP ScrollTrigger animations to a Next.js
  site that uses Lenis for smooth scroll.
---

# GSAP + Three.js Hero Skill

A production-ready recipe for building a WorldQuant Foundry–style 3D particle hero inside a
Next.js 15/16 App Router project, with Lenis smooth scroll and GSAP ScrollTrigger animations.

---

## Architecture Overview

```
src/
├── lib/
│   ├── gsap.ts          # Register plugins + reusable animation helpers
│   └── lenis.ts         # (if needed) standalone Lenis config
├── components/
│   ├── ParticleVortex.tsx   # Three.js WebGL canvas — "use client" + dynamic import
│   ├── SmoothScroll.tsx     # Lenis wrapper — "use client"
│   └── Hero.tsx             # Consumes ParticleVortex + GSAP word animation
└── app/
    └── layout.tsx           # Wraps body in SmoothScroll, mounts Cursor
```

---

## Key Rules

1. **SSR-safe Three.js**: Never import Three.js directly at module scope in a Server Component.
   Always use `dynamic(() => import('./ParticleVortex'), { ssr: false })` inside a Client Component.

2. **Plugin registration**: Register `ScrollTrigger` once in `lib/gsap.ts` inside a
   `typeof window !== "undefined"` guard. Import from this file everywhere — never from `gsap` directly.

3. **Lenis + ScrollTrigger sync**: Lenis and GSAP ScrollTrigger must share the scroll position.
   In the Lenis RAF loop, call `ScrollTrigger.update()` after `lenis.raf(time)`.

4. **Cleanup on unmount**: All Three.js resources MUST be disposed in the `useEffect` return:
   `geometry.dispose()`, `material.dispose()`, `renderer.dispose()`, `cancelAnimationFrame(rafId)`.

---

## Three.js Fibonacci Sphere Recipe

Produces ~3,000 evenly-distributed particles on a sphere surface:

```ts
function createSphereParticles(count: number, radius: number): Float32Array {
  const positions = new Float32Array(count * 3);
  const phi = Math.PI * (3 - Math.sqrt(5)); // golden angle

  for (let i = 0; i < count; i++) {
    const y = 1 - (i / (count - 1)) * 2;
    const r = Math.sqrt(1 - y * y);
    const theta = phi * i;
    const noise = 0.1 * radius;
    positions[i * 3]     = r * Math.cos(theta) * radius + (Math.random() - 0.5) * noise;
    positions[i * 3 + 1] = y * radius + (Math.random() - 0.5) * noise;
    positions[i * 3 + 2] = r * Math.sin(theta) * radius + (Math.random() - 0.5) * noise;
  }
  return positions;
}
```

Use `THREE.PointsMaterial` with `sizeAttenuation: true`, `transparent: true`.

---

## Mouse Parallax Pattern

```ts
const mouse = { x: 0, y: 0 };
window.addEventListener("mousemove", (e) => {
  mouse.x = e.clientX / window.innerWidth - 0.5;
  mouse.y = e.clientY / window.innerHeight - 0.5;
});

// Inside animation loop — lerp toward mouse:
targetRotation.x += (mouse.y * 0.4 - targetRotation.x) * 0.05;
targetRotation.y += (mouse.x * 0.6 - targetRotation.y) * 0.05;
particles.rotation.x += targetRotation.x * 0.01;
particles.rotation.y += targetRotation.y * 0.01;
```

---

## GSAP Animation Helpers (in `lib/gsap.ts`)

```ts
// Hero word fade-up on load — call with container element
export function animateHeroWords(container: Element | null) {
  const words = container?.querySelectorAll(".hero-word");
  if (!words) return;
  gsap.fromTo(words, { y: 40, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.08, duration: 0.9, ease: "power3.out", delay: 0.2 });
}

// Generic scroll-triggered fade+slide
export function animateOnScroll(elements, options = {}) {
  const { y = 30, x = 0, stagger = 0, start = "top 80%", duration = 0.9 } = options;
  return gsap.fromTo(elements, { y, x, opacity: 0 }, {
    y: 0, x: 0, opacity: 1, duration, stagger, ease: "power3.out",
    scrollTrigger: { trigger: options.trigger ?? elements, start, once: true },
  });
}

// CTA split animation — line1 from left, line2 from right
export function animateCTASplit(line1, line2) {
  const tl = gsap.timeline({ scrollTrigger: { trigger: line1.parentElement, start: "top 75%", once: true } });
  tl.fromTo(line1, { x: -60, opacity: 0 }, { x: 0, opacity: 1, duration: 1, ease: "power3.out" }, 0);
  tl.fromTo(line2, { x: 60, opacity: 0 }, { x: 0, opacity: 1, duration: 1, ease: "power3.out" }, 0);
}
```

---

## WQF-Style Hero Layout

The WorldQuant Foundry layout wraps text around a centered 3D element:

```tsx
<div className="flex items-baseline justify-between">
  <h1>LEFT WORDS</h1>
  <div className="hidden md:block flex-shrink-0 w-[38vw] max-w-[500px]" aria-hidden="true" />
  <h1 className="text-right">RIGHT WORDS</h1>
</div>
<h1>FULL WIDTH SECOND LINE</h1>
```

The spacer div creates the "hole" the Three.js canvas fills. The canvas is `position: absolute; inset: 0` in the hero section.

---

## Common Pitfalls

| Pitfall | Fix |
|---------|-----|
| Three.js imported in Server Component | Use `dynamic(..., { ssr: false })` |
| ScrollTrigger fires before Lenis ready | Add `ScrollTrigger.normalizeScroll(true)` or sync with Lenis RAF |
| Particle canvas flickers on resize | Use `ResizeObserver` on the canvas; call `renderer.setSize(w, h, false)` |
| Memory leak on route changes | Always dispose geometry, material, renderer in useEffect cleanup |
| Custom cursor conflicts with `mix-blend-mode` | Reset `mix-blend-mode` to `normal` on hover-expand, back to `difference` on restore |
