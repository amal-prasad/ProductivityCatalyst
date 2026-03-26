"use client";

import { useEffect, useRef } from "react";
import { animateOnScroll } from "@/lib/gsap";
import ParallaxBackground from "./ParallaxBackground";
import TextReveal from "./TextReveal";

const TESTIMONIALS = [
  {
    quote:
      "We had 14 teams across three continents. Nobody knew what anyone else was doing. Productivity Catalyst gave us a single source of truth in 48 hours.",
    name: "Sarah Chen",
    title: "CTO, Tier-1 Investment Bank",
  },
  {
    quote:
      "Our Dev and QA teams were constantly stepping on each other. After onboarding, dependency conflicts dropped 70% in the first quarter.",
    name: "James Okafor",
    title: "VP Engineering, Global Consulting Firm",
  },
  {
    quote:
      "I manage 8 product squads. For the first time, I can see cross-team risk without scheduling a single status call. It's transformative.",
    name: "Priya Mehta",
    title: "Head of Product, Enterprise SaaS Company",
  },
  {
    quote:
      "The custom tracker matched our org structure exactly. Other tools forced us into Kanban templates that didn't fit how we actually work.",
    name: "David Strauss",
    title: "Director of IT Operations, Merchant Bank",
  },
];

export default function Testimonials() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const cards = sectionRef.current.querySelectorAll(".testimonial-card");
    animateOnScroll(cards, { stagger: 0.12, y: 40, start: "top 70%" });
    // TextReveal handles the headline animation now
  }, []);

  return (
    <section
      id="testimonials"
      ref={sectionRef}
      className="relative w-full py-[clamp(4rem,10vw,10rem)] border-t border-white/[0.08]"
    >
      <ParallaxBackground src="/images/bg-testimonials.png" alt="Testimonials Background" overlayOpacity={0.8} />
      <div className="relative z-10 max-w-[1280px] mx-auto px-6 md:px-[clamp(1.5rem,5vw,5rem)]">

        <div className="mb-16 section-headline">
          <p className="text-[0.75rem] tracking-[0.2em] uppercase text-secondary mb-4">
            Social Proof
          </p>
          <h2 className="text-white font-bold text-[clamp(2rem,5vw,4rem)] leading-[0.95] tracking-[-0.02em]">
            <TextReveal>Enterprise Teams Trust Us.</TextReveal>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
          {TESTIMONIALS.map((t) => (
            <div
              key={t.name}
              className="testimonial-card border border-white/[0.08] p-8 md:p-10 flex flex-col justify-between gap-8"
            >
              <p className="text-white text-[1rem] leading-[1.75] font-light">
                &ldquo;{t.quote}&rdquo;
              </p>
              <div>
                <p className="text-white text-sm font-semibold">{t.name}</p>
                <p className="text-secondary text-[0.8rem] tracking-[0.05em]">{t.title}</p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
