"use client";

import { useEffect, useRef } from "react";
import { animateOnScroll, animatePinnedScroll } from "@/lib/gsap";
import TextReveal from "./TextReveal";

const STEPS = [
  {
    num: "01",
    title: "Discover",
    body: "Listen deeply to understand your business, challenges, and goals.",
  },
  {
    num: "02",
    title: "Diagnose",
    body: "Audit your processes and data to identify the highest-value opportunities.",
  },
  {
    num: "03",
    title: "Design",
    body: "Propose a solution tailored to your budget, timeline, and team.",
  },
  {
    num: "04",
    title: "Deploy",
    body: "Build, test, and go live — with your team involved every step.",
  },
  {
    num: "05",
    title: "Drive",
    body: "Measure results, iterate, and ensure adoption for lasting impact.",
  },
];

export default function HowItWorks() {
  const sectionRef = useRef<HTMLElement>(null);
  const desktopContainerRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    if (!sectionRef.current) return;
    
    const mq = window.matchMedia("(max-width: 767px)");
    if (mq.matches) {
      const steps = sectionRef.current.querySelectorAll(".mobile-step-row");
      animateOnScroll(steps, { x: -40, y: 0, stagger: 0.18, start: "top 75%" });
      return;
    }

    if (desktopContainerRef.current && itemRefs.current.length > 0) {
      animatePinnedScroll(desktopContainerRef.current, itemRefs.current.filter(Boolean), { scrollLength: 400 });
    }
  }, []);

  return (
    <section
      id="how-it-works"
      ref={sectionRef}
      className="relative w-full border-t border-white/[0.08]"
    >
      {/* Desktop view */}
      <div
        ref={desktopContainerRef}
        className="hidden md:flex w-full min-h-[100dvh] flex-col justify-center relative bg-background"
      >
        <div className="w-full max-w-[1280px] mx-auto px-6 md:px-[clamp(1.5rem,5vw,5rem)] mb-12">
          {/* Label + headline */}
          <div className="section-headline">
            <p className="text-[0.75rem] tracking-[0.2em] uppercase text-secondary mb-4">
              How It Works
            </p>
            <h2 className="text-white font-bold text-[clamp(2rem,5vw,4rem)] leading-[0.95] tracking-[-0.02em]">
              <TextReveal>Five Steps.</TextReveal>
              <br />
              <TextReveal delay={0.2}>To Lasting Impact.</TextReveal>
            </h2>
          </div>
        </div>

        <div className="relative w-full h-[55vh] max-w-[1280px] mx-auto overflow-hidden">
          {STEPS.map((step, i) => (
            <div
              key={step.num}
              ref={(el) => {
                if (el) itemRefs.current[i] = el;
              }}
              className="absolute inset-0 flex flex-row items-center gap-16 px-6 md:px-[clamp(1.5rem,5vw,5rem)] bg-background"
            >
              <span
                className="absolute left-6 top-1/2 -translate-y-1/2 text-[14rem] md:text-[18rem] font-bold leading-none select-none pointer-events-none"
                style={{ color: "rgba(255,255,255,0.02)" }}
                aria-hidden="true"
              >
                {step.num}
              </span>
              <div className="relative z-10 flex flex-col gap-6 flex-1 pt-6">
                <span className="text-[0.85rem] tracking-[0.2em] uppercase text-accent">
                  {step.num}
                </span>
                <h3 className="text-white font-bold text-[clamp(2rem,4vw,3.25rem)] leading-tight tracking-[-0.01em]">
                  {step.title}
                </h3>
                <p className="text-secondary text-[1.2rem] leading-[1.7] max-w-2xl">
                  {step.body}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Mobile view */}
      <div className="md:hidden flex flex-col max-w-[1280px] mx-auto px-6 pb-[clamp(4rem,10vw,10rem)]">
        {STEPS.map((step, i) => (
           <div
              key={step.num}
              className={`mobile-step-row relative flex flex-col gap-4 py-12 ${
                i < STEPS.length - 1 ? "border-b border-white/[0.08]" : ""
              }`}
            >
              <span
                className="absolute left-0 top-10 text-[8rem] font-bold leading-none select-none pointer-events-none"
                style={{ color: "rgba(255,255,255,0.03)" }}
                aria-hidden="true"
              >
                {step.num}
              </span>
              <span className="relative z-10 text-[0.75rem] tracking-[0.2em] uppercase text-secondary shrink-0">
                {step.num}
              </span>
              <div className="relative z-10 flex flex-col gap-2">
                <h3 className="text-white font-bold text-[1.75rem] leading-tight tracking-[-0.01em]">
                  {step.title}
                </h3>
                <p className="text-secondary text-[1rem] leading-[1.7]">
                  {step.body}
                </p>
              </div>
            </div>
        ))}
      </div>
    </section>
  );
}
