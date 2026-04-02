---
name: mobile-anim-status
description: Check the status of the mobile animation enhancement project for ProductivityCatalyst
user_invocable: true
---

Read the progress tracker at `docs/mobile-animation-progress/README.md` and report:

1. **Overall status** — which files are done, which are pending
2. **Quick sanity check** — grep for `hidden md:block` in `src/components/VideoBackground.tsx` (should NOT be present if done)
3. **Animation upgrade check** — grep for `animateMobileScrollFocus` in `PinnedScrollFeatures.tsx` and `HowItWorks.tsx` (should be present if done)
4. **Hero check** — grep for `MOTION.deliberate` in the mobile branch of `Hero.tsx` (should be present if done)
5. **Stagger check** — grep for `stagger: 0.1` (or similar) in `CardGrid.tsx` and `Testimonials.tsx` (should be present if done)

Then output a clean status table and list any items that still need attention.
