"use client";

import { useRef } from "react";
import { MOTION, animateMobileScrollFocus, gsap, useGSAP } from "@/lib/gsap";
import VideoBackground from "./VideoBackground";
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

  useGSAP(() => {
    if (!sectionRef.current) return;

    const mq = window.matchMedia("(max-width: 767px)");
    if (mq.matches) {
      const steps = sectionRef.current.querySelectorAll(".mobile-step-row");
      animateMobileScrollFocus(steps, { scaleMin: 0.94 });

      steps.forEach((step) => {
        gsap.fromTo(step.querySelectorAll("span.relative, h3, p"),
          { opacity: 0, y: 15 },
          {
            opacity: 1, y: 0,
            duration: 0.6,
            ease: "power2.out",
            stagger: 0.08,
            scrollTrigger: { trigger: step, start: "top 85%", once: true }
          }
        );
      });
    } else {
      const desktopSteps = sectionRef.current.querySelectorAll(".step-row");
      desktopSteps.forEach((row, i) => {
        const fromLeft = i % 2 === 0;
        gsap.fromTo(row,
          { opacity: 0, x: fromLeft ? -50 : 50 },
          {
            opacity: 1, x: 0,
            duration: MOTION.standard,
            ease: MOTION.smooth,
            scrollTrigger: { trigger: row, start: MOTION.triggerStart, once: true }
          }
        );

        gsap.fromTo(row.querySelectorAll(".flex-col > span, .flex-col > h3, .flex-col > p"),
          { opacity: 0, y: 15 },
          {
            opacity: 1, y: 0,
            duration: 0.6,
            ease: "power2.out",
            stagger: 0.08,
            delay: 0.3,
            scrollTrigger: { trigger: row, start: MOTION.triggerStart, once: true }
          }
        );
      });
    }

    const stepNumbers = sectionRef.current.querySelectorAll(".step-number");
    stepNumbers.forEach((num) => {
      gsap.fromTo(num,
        { opacity: 0, y: 8 },
        { opacity: 1, y: 0, duration: MOTION.micro, ease: MOTION.back,
          scrollTrigger: { trigger: num, start: "top 85%", once: true }
        }
      );
    });
  }, { scope: sectionRef });

  return (
    <section
      id="how-it-works"
      ref={sectionRef}
      className="relative w-full border-t border-white/[0.08]"
    >
      <VideoBackground src="/videos/bg1.mp4" overlayOpacity={0.85} isSticky={true} />

      {/* Common Header */}
      <div className="relative z-10 w-full pt-[clamp(4rem,8vh,8rem)] pb-[clamp(2rem,6vh,6rem)] flex flex-col items-center">
        <div className="w-full max-w-[1280px] mx-auto px-6 md:px-[clamp(1.5rem,5vw,5rem)]">
          <div className="section-headline text-center md:text-left">
            <p className="text-[0.75rem] tracking-[0.2em] uppercase text-secondary mb-4">
              How It Works
            </p>
            <h2 className="text-white font-bold text-[clamp(2rem,5vw,4rem)] leading-[0.95] tracking-[-0.02em]">
              <TextReveal>Five Steps.</TextReveal>
              <br className="hidden md:block" />
              <TextReveal delay={0.2}>To Lasting Impact.</TextReveal>
            </h2>
          </div>
        </div>
      </div>

      {/* Desktop view */}
      <div className="hidden md:block relative z-10 w-full max-w-[1280px] mx-auto overflow-hidden pb-32">
        <div className="flex flex-col gap-12">
          {STEPS.map((step) => (
            <div
              key={step.num}
              className="step-row relative flex flex-row items-center gap-16 px-6 md:px-[clamp(1.5rem,5vw,5rem)]"
            >
              <div className="w-[120px] flex shrink-0 justify-end">
                <span className="step-number text-[4rem] font-bold leading-none text-accent">
                  {step.num}
                </span>
              </div>
              <div className="flex flex-col gap-3 flex-1 px-8 py-10 bg-white/[0.02] border border-white/[0.08] rounded-xl hover:bg-white/[0.04] transition-colors duration-300">
                <span className="text-[0.85rem] tracking-[0.2em] uppercase text-secondary">
                  Step {step.num}
                </span>
                <h3 className="text-white font-bold text-[max(2rem,2.5vw)] leading-tight tracking-[-0.01em]">
                  {step.title}
                </h3>
                <p className="text-secondary text-[1.1rem] leading-[1.7] max-w-xl">
                  {step.body}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Mobile view */}
      <div className="md:hidden relative z-10 flex flex-col max-w-[1280px] mx-auto px-6 pb-[max(clamp(4rem,10vw,10rem),30vh)]">
        {STEPS.map((step, i) => (
           <div
              key={step.num}
              className={`mobile-step-row relative flex flex-col gap-4 py-12 ${
                i < STEPS.length - 1 ? "border-b border-white/[0.08]" : ""
              }`}
            >
              <span
                className="step-number absolute left-0 top-10 text-[8rem] font-bold leading-none select-none pointer-events-none"
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
