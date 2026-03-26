"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { animateCTASplit } from "@/lib/gsap";
import VideoBackground from "./VideoBackground";
import TextReveal from "./TextReveal";
import MagneticWrapper from "./MagneticWrapper";

export default function CTASection() {
  const line1Ref = useRef<HTMLHeadingElement>(null);
  const line2Ref = useRef<HTMLHeadingElement>(null);
  const btnRef = useRef<HTMLAnchorElement>(null);

  // We are currently replacing animateCTASplit with TextReveal, but keeping the ref just in case.
  // Actually, we don't need animateCTASplit if we use TextReveal.
  
  return (
    <section
      id="contact"
      className="relative w-full border-t border-white/[0.08]"
      style={{ padding: "clamp(6rem, 10vw, 10rem) 0" }}
    >
      <VideoBackground src="/videos/bg2.mp4" overlayOpacity={0.8} />
      <div className="relative z-10 max-w-[1280px] mx-auto px-6 md:px-[clamp(1.5rem,5vw,5rem)] flex flex-col items-center text-center gap-10">

        <h2
          ref={line1Ref}
          className="text-white font-bold text-[clamp(2.5rem,6vw,5.5rem)] leading-[0.95] tracking-[-0.02em]"
        >
          <TextReveal>Focus on Growth.</TextReveal>
        </h2>
        <h2
          ref={line2Ref}
          className="text-white font-bold text-[clamp(2.5rem,6vw,5.5rem)] leading-[0.95] tracking-[-0.02em]"
        >
          <TextReveal delay={0.2}>Not Firefighting.</TextReveal>
        </h2>

        <MagneticWrapper strength={40} elasticity={0.4}>
          <Link
            ref={btnRef}
            href="#contact"
            className="inline-block text-[0.875rem] font-medium tracking-[0.1em] uppercase text-white border border-white px-10 py-4 hover:bg-accent hover:border-accent transition-colors duration-300"
          >
            Book a Discovery Call →
          </Link>
        </MagneticWrapper>

      </div>
    </section>
  );
}
