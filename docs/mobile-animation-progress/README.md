# Mobile Animation Enhancement — Progress Tracker

> **Goal:** Make the mobile website as visually impressive as desktop.  
> **Constraint:** Do NOT touch desktop behavior (md: and above). Video background must stay ON.

---

## Status: COMPLETE ✅ (v2 — cinematic rework of PinnedScrollFeatures + Features)

## Files Modified

| File | Change | Status |
|------|--------|--------|
| `src/components/VideoBackground.tsx` | Remove `hidden md:block` → enable video on mobile | ✅ Done |
| `src/components/Hero.tsx` | Full dramatic entrance on mobile (deliberate duration, scale, back ease, scroll-cue pulse) | ✅ Done |
| `src/components/PinnedScrollFeatures.tsx` | Replace entrance with `animateMobileScrollFocus` (scroll-scrub opacity/scale/blur) | ✅ Done |
| `src/components/Features.tsx` | Per-card staggered entrance with scale + `back.out` ease | ✅ Done |
| `src/components/HowItWorks.tsx` | `animateMobileScrollFocus` for step-by-step reveal | ✅ Done |
| `src/components/CardGrid.tsx` | Staggered entrance with scale + `back.out` ease | ✅ Done |
| `src/components/Testimonials.tsx` | Staggered entrance with scale + `back.out` ease | ✅ Done |

---

## Key Design Decisions

1. **VideoBackground**: Removed `hidden md:block` from both sticky and non-sticky variants. Video already has `muted`, `playsInline`, `autoPlay` — correct for mobile autoplay policy.

2. **Hero**: Mobile now mirrors desktop quality:
   - `MOTION.deliberate` (0.75s) for headline instead of `MOTION.snappy` (0.3s)
   - Scale + `back.out` ease on CTA button
   - Scroll-cue now shows on mobile (was hidden before)
   - Continuous scroll-cue pulse after entrance completes

3. **PinnedScrollFeatures**: `animateMobileScrollFocus()` gives each statement a premium scrub-based opacity/scale/blur reveal as user scrolls — replicates the desktop pinned crossfade feel.

4. **Features Cards**: Each card staggers in individually with `scale: 0.95 → 1` and `back.out` ease — feels snappy and modern.

5. **HowItWorks Steps**: `animateMobileScrollFocus()` makes each step "focus in" as user scrolls — perfect for the 01→05 story format.

6. **CardGrid + Testimonials**: Group stagger with `scale: 0.97 → 1` and `back.out` ease, triggered when section enters viewport.

---

## How to Resume

If context is lost, read this file first, then check git diff for current state:
```bash
git diff HEAD src/components/
```

Then invoke `/mobile-anim-status` skill to check progress.

---

## What Was NOT Changed (Desktop Safety)

- All `hidden md:block` / `md:hidden` layout classes: untouched
- Desktop GSAP branches (inside `else` blocks): untouched  
- `animatePinnedScroll` desktop behavior: untouched
- CSS `@media (max-width: 767px)` carousel rules: untouched
- `globals.css`: untouched
