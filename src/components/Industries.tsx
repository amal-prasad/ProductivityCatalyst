"use client";

import { useEffect, useRef } from "react";
import { animateOnScroll, gsap } from "@/lib/gsap";

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
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const headline = sectionRef.current.querySelector(".section-headline");
    animateOnScroll(headline, { y: 30, start: "top 80%" });
    if (trackRef.current) {
      const scrollWidth = trackRef.current.scrollWidth;
      const distance = scrollWidth / 2;
      gsap.to(trackRef.current, {
        x: -distance,
        duration: distance / 50,
        ease: "none",
        repeat: -1,
      });
    }
  }, []);

  return (
    <section
      id="industries"
      ref={sectionRef}
      className="w-full py-[clamp(4rem,10vw,10rem)] border-t border-white/[0.08]"
    >
      <div className="max-w-[1280px] mx-auto px-6 md:px-[clamp(1.5rem,5vw,5rem)]">

        <div className="mb-12 section-headline">
          <p className="text-[0.75rem] tracking-[0.2em] uppercase text-secondary mb-4">
            Industries
          </p>
          <h2 className="text-white font-bold text-[clamp(2rem,5vw,4rem)] leading-[0.95] tracking-[-0.02em]">
            Built for Complexity.<br />Proven in the Field.
          </h2>
        </div>

        {/* Infinite Marquee */}
        <div className="relative w-full overflow-hidden mask-image-[linear-gradient(to_right,transparent,black_5%,black_95%,transparent)]">
          <div
            ref={trackRef}
            className="flex gap-3 w-max pb-4"
          >
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
