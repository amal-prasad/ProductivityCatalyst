"use client";

import { useEffect, useRef } from "react";
import { MOTION } from "@/lib/gsap";
import VideoBackground from "./VideoBackground";
import TextReveal from "./TextReveal";
import gsap from "gsap";

const StarIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="#00e5cc" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
  </svg>
);

const TESTIMONIALS = [
  {
    quote:
      "We had 14 teams across three continents. Nobody knew what anyone else was doing. Productivity Catalyst gave us a single source of truth in 48 hours.",
    name: "Sarah Chen",
    title: "CTO, Tier-1 Investment Bank",
    initials: "SC",
    stars: 5,
  },
  {
    quote:
      "Our Dev and QA teams were constantly stepping on each other. After onboarding, dependency conflicts dropped 70% in the first quarter.",
    name: "James Okafor",
    title: "VP Engineering, Global Consulting Firm",
    initials: "JO",
    stars: 5,
  },
  {
    quote:
      "I manage 8 product squads. For the first time, I can see cross-team risk without scheduling a single status call. It's transformative.",
    name: "Priya Mehta",
    title: "Head of Product, Enterprise SaaS Company",
    initials: "PM",
    stars: 5,
  },
  {
    quote:
      "The custom tracker matched our org structure exactly. Other tools forced us into Kanban templates that didn't fit how we actually work.",
    name: "David Strauss",
    title: "Director of IT Operations, Merchant Bank",
    initials: "DS",
    stars: 5,
  },
];

export default function Testimonials() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!sectionRef.current) return;
      const cards = sectionRef.current.querySelectorAll(".testimonial-card");
      
      gsap.fromTo(cards,
        { opacity: 0, y: 32 },
        { opacity: 1, y: 0,
          duration: MOTION.standard, ease: MOTION.out, stagger: 0.1,
          scrollTrigger: { trigger: sectionRef.current, start: MOTION.triggerStart }
        }
      );
    });
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="testimonials"
      ref={sectionRef}
      className="relative w-full py-[clamp(4rem,10vw,10rem)] border-t border-white/[0.08]"
    >
      <VideoBackground src="/videos/bg1.mp4" overlayOpacity={0.8} />
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
              className="testimonial-card border border-white/[0.08] p-8 md:p-10 flex flex-col justify-between gap-6 bg-[#0a0a0a]/50"
            >
              <div className="flex gap-1">
                {Array.from({ length: t.stars }).map((_, i) => (
                  <StarIcon key={i} />
                ))}
              </div>
              <p className="text-white text-[1rem] leading-[1.75] font-light">
                &ldquo;{t.quote}&rdquo;
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-accent/20 border border-accent/40 flex items-center justify-center text-accent font-semibold text-sm">
                  {t.initials}
                </div>
                <div>
                  <p className="text-white text-sm font-semibold">{t.name}</p>
                  <p className="text-secondary text-[0.8rem] tracking-[0.05em]">{t.title}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
