"use client";

import { useEffect, useRef } from "react";
import { animateOnScroll } from "@/lib/gsap";
import ParallaxBackground from "./ParallaxBackground";
import TextReveal from "./TextReveal";

const STEPS = [
  {
    num: "01",
    title: "Connect Your Teams",
    body: "Integrate with your existing tools — Jira, Linear, Azure DevOps, or custom trackers. No rip-and-replace. Deployment takes one business day.",
  },
  {
    num: "02",
    title: "Track Everything Live",
    body: "Every team's sprint, backlog, and blocker flows into a single real-time view. Your org's structure, mapped exactly — not forced into a template.",
  },
  {
    num: "03",
    title: "Eliminate the Silos",
    body: "Dependencies surface automatically. Leaders see cross-team risks before they escalate. Teams stop asking 'what is everyone else doing?'",
  },
];

export default function HowItWorks() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const steps = sectionRef.current.querySelectorAll(".step-row");
    animateOnScroll(steps, { x: -40, y: 0, stagger: 0.18, start: "top 75%" });
    // TextReveal handles the headline animation now.
  }, []);

  return (
    <section
      id="how-it-works"
      ref={sectionRef}
      className="relative w-full py-[clamp(4rem,10vw,10rem)] border-t border-white/[0.08]"
    >
      <ParallaxBackground src="/images/bg-how-it-works.png" alt="How It Works Background" overlayOpacity={0.8} />
      <div className="relative z-10 max-w-[1280px] mx-auto px-6 md:px-[clamp(1.5rem,5vw,5rem)]">

        {/* Label + headline */}
        <div className="mb-20 section-headline">
          <p className="text-[0.75rem] tracking-[0.2em] uppercase text-secondary mb-4">
            How It Works
          </p>
          <h2 className="text-white font-bold text-[clamp(2rem,5vw,4rem)] leading-[0.95] tracking-[-0.02em]">
            <TextReveal>Three Steps.</TextReveal>
            <br />
            <TextReveal delay={0.2}>Total Clarity.</TextReveal>
          </h2>
        </div>

        {/* Steps */}
        <div className="flex flex-col">
          {STEPS.map((step, i) => (
            <div
              key={step.num}
              className={`step-row relative flex flex-col md:flex-row md:items-start gap-8 md:gap-16 py-12 md:py-16 ${
                i < STEPS.length - 1 ? "border-b border-white/[0.08]" : ""
              }`}
            >
              {/* Watermark number */}
              <span
                className="absolute left-0 top-0 text-[8rem] md:text-[12rem] font-bold leading-none select-none pointer-events-none"
                style={{ color: "rgba(255,255,255,0.03)" }}
                aria-hidden="true"
              >
                {step.num}
              </span>

              {/* Step number prefix */}
              <span className="relative z-10 text-[0.75rem] tracking-[0.2em] uppercase text-secondary mt-1 md:w-16 shrink-0">
                {step.num}
              </span>

              {/* Content */}
              <div className="relative z-10 flex flex-col gap-4 flex-1">
                <h3 className="text-white font-bold text-[clamp(1.5rem,3vw,2.25rem)] leading-tight tracking-[-0.01em]">
                  {step.title}
                </h3>
                <p className="text-secondary text-[1rem] leading-[1.7] max-w-xl">
                  {step.body}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
