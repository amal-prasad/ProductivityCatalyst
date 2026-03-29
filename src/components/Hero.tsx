"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import dynamic from "next/dynamic";
import Link from "next/link";
import { animateHeroWords } from "@/lib/gsap";
import MagneticWrapper from "./MagneticWrapper";
import { useLoading } from "@/context/LoadingContext";

const ParticleVortex = dynamic(() => import("./ParticleVortex"), { 
  ssr: false,
  loading: () => <div className="absolute inset-0 bg-background" />
});

export default function Hero() {
  const headlineRef = useRef<HTMLDivElement>(null);
  const subContentRef = useRef<HTMLDivElement>(null);
  const { isTransitionComplete } = useLoading();

  useEffect(() => {
    let ctx = gsap.context(() => {
      if (headlineRef.current && isTransitionComplete) {
        animateHeroWords(headlineRef.current);
        // Fade in sub-content after hero words animate
        if (subContentRef.current) {
          gsap.to(subContentRef.current, {
            opacity: 1,
            duration: 0.8,
            ease: "power2.out",
            delay: 1.0, // start after hero words are mostly done
          });
        }
      }
    });
    return () => ctx.revert();
  }, [isTransitionComplete]);

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
        <div ref={headlineRef} className="flex flex-col gap-0">
          <h1 className="text-white font-bold leading-[0.95] tracking-[-0.02em] text-[clamp(2.5rem,6.5vw,6rem)] whitespace-nowrap">
            <span className="hero-word inline-block">LESS</span>{" "}
            <span className="hero-word inline-block">CHAOS.</span>
          </h1>
          <h1 className="text-white font-bold leading-[0.95] tracking-[-0.02em] text-[clamp(2.5rem,6.5vw,6rem)] whitespace-nowrap">
            <span className="hero-word inline-block">MORE</span>{" "}
            <span className="hero-word inline-block">GROWTH.</span>
          </h1>
        </div>


        {/* Sub-copy + CTA */}
        <div ref={subContentRef} className="hero-sub-content mt-10 flex flex-col sm:flex-row items-start sm:items-center gap-6 max-w-[640px]">
          <p className="max-w-sm text-secondary text-[1rem] leading-[1.7]">
            Business Consulting, Automation & AI-Enabled Solutions for SMEs. Break free from day-to-day firefighting.
          </p>
          <MagneticWrapper strength={30} elasticity={0.3}>
            <Link
              href="#contact"
              className="inline-block shrink-0 text-[0.875rem] font-medium tracking-[0.1em] uppercase text-white border border-white px-8 py-[0.75rem] hover:bg-accent hover:border-accent transition-colors duration-300"
            >
              Book structured call →
            </Link>
          </MagneticWrapper>
        </div>
      </div>

      {/* Scroll cue */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-[0.65rem] tracking-[0.2em] uppercase text-white/30 flex flex-col items-center gap-3">
        <span>Scroll</span>
        <span className="h-8 w-px bg-white/20" />
      </div>
    </section>
  );
}
