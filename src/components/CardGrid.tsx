"use client";

import { useEffect, useRef } from "react";
import { animateOnScroll } from "@/lib/gsap";
import VideoBackground from "./VideoBackground";

const CARDS = [
  {
    tag: "Use Case",
    title: "IT & Software Teams",
    body: "Track sprints, blockers, and cross-squad dependencies in real time. Dev, QA, DevOps, and Product — finally on the same page.",
    accent: "Engineering",
  },
  {
    tag: "Use Case",
    title: "Banking & Financial Services",
    body: "Compliance, risk, trading, and operations aligned on a single dashboard. Built for the complexity of tier-1 institutions.",
    accent: "Finance",
  },
  {
    tag: "Use Case",
    title: "Consulting & Professional Services",
    body: "Client project visibility across practice areas and geographies. Know which teams are blocked before your clients do.",
    accent: "Consulting",
  },
];

export default function CardGrid() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const headline = sectionRef.current.querySelector(".section-headline");
    animateOnScroll(headline, { y: 30, start: "top 80%" });

    const cards = sectionRef.current.querySelectorAll(".grid-card");
    animateOnScroll(cards, { y: 50, stagger: 0.15, start: "top 75%", duration: 0.85 });
  }, []);

  return (
    <section
      id="use-cases"
      ref={sectionRef}
      className="relative w-full py-[clamp(4rem,10vw,10rem)] border-t border-white/[0.08]"
    >
      <VideoBackground src="/videos/bg3.mp4" overlayOpacity={0.85} />
      <div className="relative z-10 max-w-[1280px] mx-auto px-6 md:px-[clamp(1.5rem,5vw,5rem)]">

        {/* Section label + headline */}
        <div className="mb-16 md:mb-24 section-headline">
          <p className="text-[0.75rem] tracking-[0.2em] uppercase text-secondary mb-4">
            Use Cases
          </p>
          <h2 className="text-white font-bold text-[clamp(2rem,5vw,4rem)] leading-[0.95] tracking-[-0.02em]">
            Tailored for Your Industry.
          </h2>
        </div>

        {/* Card grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
          {CARDS.map((card) => (
            <div
              key={card.title}
              className="grid-card group relative border border-white/[0.06] p-8 md:p-10 flex flex-col gap-6 transition-all duration-400 hover:scale-[1.02] hover:z-10"
            >
              {/* Glow overlay — visible on hover */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none grid-card-glow" />

              {/* Tag */}
              <span className="text-[0.65rem] tracking-[0.2em] uppercase text-secondary/60">
                {card.tag}
              </span>

              {/* Title */}
              <h3 className="text-white font-bold text-[1.35rem] leading-[1.2] tracking-[-0.01em]">
                {card.title}
              </h3>

              {/* Body */}
              <p className="text-secondary text-[0.9rem] leading-[1.7] flex-1">
                {card.body}
              </p>

              {/* Bottom accent */}
              <div className="flex items-center justify-between mt-auto pt-6 border-t border-white/[0.06]">
                <span className="text-[0.7rem] tracking-[0.15em] uppercase text-accent/70 group-hover:text-accent transition-colors duration-300">
                  {card.accent}
                </span>
                <span className="text-white/20 group-hover:text-accent text-sm transition-colors duration-300">
                  →
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
