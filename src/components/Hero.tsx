"use client";

import { useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { animateHeroWords } from "@/lib/gsap";
import MagneticWrapper from "./MagneticWrapper";

const ParticleVortex = dynamic(() => import("./ParticleVortex"), { ssr: false });

export default function Hero() {
  const headlineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (headlineRef.current) {
      animateHeroWords(headlineRef.current);
    }
  }, []);

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
            <span className="hero-word inline-block">CLARITY</span>{" "}
            <span className="hero-word inline-block">ACROSS</span>
          </h1>
          <h1 className="text-white font-bold leading-[0.95] tracking-[-0.02em] text-[clamp(2.5rem,6.5vw,6rem)] whitespace-nowrap">
            <span className="hero-word inline-block">EVERY</span>{" "}
            <span className="hero-word inline-block">TEAM.</span>
          </h1>
          <h1 className="text-white font-bold leading-[0.95] tracking-[-0.02em] text-[clamp(2.5rem,6.5vw,6rem)] whitespace-nowrap">
            <span className="hero-word inline-block">FROM</span>{" "}
            <span className="hero-word inline-block">DAY</span>{" "}
            <span className="hero-word inline-block">ONE.</span>
          </h1>
        </div>


        {/* Sub-copy + CTA */}
        <div className="mt-10 flex flex-col sm:flex-row items-start sm:items-center gap-6 max-w-[640px]">
          <p className="max-w-sm text-secondary text-[1rem] leading-[1.7]">
            Real-time cross-team visibility for IT firms, banks, and consultancies. Every team, always in sync.
          </p>
          <MagneticWrapper strength={30} elasticity={0.3}>
            <Link
              href="#contact"
              className="inline-block shrink-0 text-[0.875rem] font-medium tracking-[0.1em] uppercase text-white border border-white px-8 py-[0.75rem] hover:bg-accent hover:border-accent transition-colors duration-300"
            >
              Request a Demo →
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
