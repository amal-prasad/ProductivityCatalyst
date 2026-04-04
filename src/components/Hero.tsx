"use client";

import { useRef } from "react";
import { gsap, useGSAP, MOTION, IS_MOBILE } from "@/lib/gsap";
import MagneticWrapper from "./MagneticWrapper";
import { useLoading } from "@/context/LoadingContext";
import { scrollToContact } from "@/lib/scrollToContact";
import ParticleVortex from "./ParticleVortex";

export default function Hero() {
  const headlineRef = useRef<HTMLDivElement>(null);
  const { isTransitionComplete } = useLoading();

  useGSAP(() => {
    if (!headlineRef.current || !isTransitionComplete) return;

    const isMobile = IS_MOBILE();
    const mobileStagger = 0.08;
    const desktopStagger = 0.1;

    const heroTl = gsap.timeline({ delay: 0.1 });

    if (isMobile) {
      heroTl
        .fromTo(".hero-headline",
          { opacity: 0, y: 28 },
          { opacity: 1, y: 0, duration: MOTION.deliberate, ease: MOTION.smooth })
        .fromTo(".hero-subtext",
          { opacity: 0, y: 18 },
          { opacity: 1, y: 0, duration: MOTION.standard, ease: MOTION.out }, `-=${mobileStagger}`)
        .fromTo(".hero-cta-primary",
          { opacity: 0, scale: 0.94, y: 12 },
          { opacity: 1, scale: 1, y: 0, duration: MOTION.snappy, ease: MOTION.back }, `-=${mobileStagger}`)
        .fromTo(".hero-scroll-cue",
          { opacity: 0, y: 8 },
          { opacity: 1, y: 0, duration: MOTION.micro, ease: MOTION.out }, `-=${mobileStagger}`)
        .to(".hero-scroll-cue", {
          opacity: 0.4,
          yoyo: true,
          repeat: -1,
          duration: MOTION.standard,
          ease: MOTION.inOut,
        });
    } else {
      heroTl
        .fromTo(".hero-headline",
          { opacity: 0, y: 24 },
          { opacity: 1, y: 0, duration: MOTION.deliberate, ease: MOTION.smooth })
        .fromTo(".hero-subtext",
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: MOTION.standard, ease: MOTION.out }, `-=${desktopStagger}`)
        .fromTo(".hero-cta-primary",
          { opacity: 0, scale: 0.96, y: 12 },
          { opacity: 1, scale: 1, y: 0, duration: MOTION.snappy, ease: MOTION.back }, `-=${desktopStagger}`)
        .fromTo(".hero-scroll-cue",
          { opacity: 0, x: -8 },
          { opacity: 1, x: 0, duration: MOTION.micro, ease: MOTION.out }, `-=${mobileStagger}`);
    }
  }, { dependencies: [isTransitionComplete] });

  return (
    <section
      id="hero"
      className="relative w-full min-h-[100dvh] flex flex-col justify-center overflow-hidden bg-background"
    >
      {/* Three.js Particle Vortex — fills entire hero, sits behind text */}
      <ParticleVortex />

      {/* Content — left-aligned, constrained width so it stays readable */}
      <div className="relative z-10 max-w-[1280px] mx-auto w-full px-6 md:px-[clamp(1.5rem,5vw,5rem)]">

        {/* Headline — fully left aligned, clamp keeps it in bounds */}
        <div ref={headlineRef} className="hero-headline flex flex-col gap-0" style={{ visibility: isTransitionComplete ? "visible" : "hidden" }}>
          <h1 className="text-white font-bold leading-[0.95] tracking-[-0.02em] text-[clamp(2.5rem,6.5vw,6rem)]">
            <span className="inline-block">LESS</span>{" "}
            <span className="inline-block">CHAOS.</span>
            <span className="block">
              <span className="inline-block">MORE</span>{" "}
              <span className="inline-block">GROWTH.</span>
            </span>
          </h1>
        </div>

        {/* Sub-copy + CTA */}
        <div className="mt-10 flex flex-col sm:flex-row items-start sm:items-center gap-6 max-w-[640px]">
          <p className="hero-subtext max-w-sm text-secondary text-[1rem] leading-[1.7]" style={{ visibility: isTransitionComplete ? "visible" : "hidden" }}>
            Business Consulting, Automation & AI-Enabled Solutions for SMEs. Break free from day-to-day firefighting.
          </p>
          <MagneticWrapper strength={30} elasticity={0.3}>
            <button
              onClick={scrollToContact}
              className="hero-cta-primary btn-primary inline-block shrink-0 text-[0.875rem] font-medium tracking-[0.1em] uppercase text-white border border-white px-8 py-[0.75rem] cursor-pointer"
              style={{ visibility: isTransitionComplete ? "visible" : "hidden" }}
            >
              Book a Call →
            </button>
          </MagneticWrapper>
        </div>
      </div>

      {/* Scroll cue */}
      <div className="hero-scroll-cue absolute bottom-8 left-1/2 -translate-x-1/2 text-[0.65rem] tracking-[0.2em] uppercase text-white/30 flex flex-col items-center gap-3" style={{ visibility: isTransitionComplete ? "visible" : "hidden" }}>
        <span>Scroll</span>
        <span className="h-8 w-px bg-white/20" />
      </div>
    </section>
  );
}
