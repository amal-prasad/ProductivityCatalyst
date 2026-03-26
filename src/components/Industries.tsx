"use client";

import { useEffect, useRef } from "react";
import { animateOnScroll } from "@/lib/gsap";

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
  const pillsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const headline = sectionRef.current.querySelector(".section-headline");
    animateOnScroll(headline, { y: 30, start: "top 80%" });
    if (pillsRef.current) {
      const pills = pillsRef.current.querySelectorAll(".industry-pill");
      animateOnScroll(pills, { y: 20, stagger: 0.06, start: "top 75%" });
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

        {/* Desktop: horizontal scroll row | Mobile: wrapping flex */}
        <div
          ref={pillsRef}
          className="flex gap-3 overflow-x-auto md:overflow-x-scroll pb-2 flex-wrap md:flex-nowrap scrollbar-hide"
        >
          {INDUSTRIES.map((name) => (
            <span
              key={name}
              className="industry-pill shrink-0 border border-white/[0.08] text-white text-[0.8rem] tracking-[0.08em] uppercase px-5 py-2.5 whitespace-nowrap hover:border-accent hover:text-accent transition-colors duration-300"
            >
              {name}
            </span>
          ))}
        </div>

      </div>
    </section>
  );
}
