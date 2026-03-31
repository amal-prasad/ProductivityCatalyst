"use client";

import { useEffect, useRef } from "react";
import { animateOnScroll } from "@/lib/gsap";
import VideoBackground from "./VideoBackground";

const INDUSTRIES = [
  "IT Companies",
  "Merchant Banks",
  "Investment Banks",
  "Consulting Firms",
  "Insurance Groups",
  "Healthcare IT",
  "Government Agencies",
  "Logistics & Supply Chain",
  "Fintech Scale-ups",
  "Global Law Firms",
];

export default function Industries() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    animateOnScroll(".section-headline", { y: 30 });
  }, []);

  return (
    <section
      id="industries"
      ref={sectionRef}
      className="relative w-full py-[clamp(4rem,10vw,10rem)] border-t border-white/[0.08] overflow-hidden"
    >
      <VideoBackground src="/videos/bg1.mp4" overlayOpacity={0.6} />
      
      <div className="relative z-10 max-w-[1280px] mx-auto px-6 md:px-[clamp(1.5rem,5vw,5rem)]">

        <div className="mb-12 section-headline">
          <p className="text-[0.75rem] tracking-[0.2em] uppercase text-secondary mb-4">
            Industries
          </p>
          <h2 className="text-white font-bold text-[clamp(2rem,5vw,4rem)] leading-[0.95] tracking-[-0.02em]">
            Built for Complexity.<br />Proven in the Field.
          </h2>
        </div>

        <div className="relative w-full overflow-hidden">
          <div className="marquee-track flex gap-3 w-max pb-4">
            {[...INDUSTRIES, ...INDUSTRIES].map((name, idx) => (
              <span
                key={`${name}-${idx}`}
                className="industry-pill shrink-0 border border-white/[0.08] text-white text-[0.8rem] tracking-[0.08em] uppercase px-5 py-2.5 whitespace-nowrap hover:border-accent hover:text-accent transition-colors duration-300"
              >
                {name}
              </span>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
