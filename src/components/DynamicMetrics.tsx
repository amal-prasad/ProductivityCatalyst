"use client";

import { useEffect, useRef } from "react";
import { animateCounter, animateOnScroll, animateMobileScrollFocus, MOTION } from "@/lib/gsap";
import VideoBackground from "./VideoBackground";
import gsap from "gsap";

const METRICS = [
  { value: 200, suffix: "+", label: "Enterprise Teams Onboarded" },
  { value: 70, suffix: "%", label: "Reduction in Cross-Team Conflicts" },
  { value: 48, suffix: "h", label: "Average Deployment Time" },
  { value: 14, suffix: "", label: "Countries Served" },
];

export default function DynamicMetrics() {
  const sectionRef = useRef<HTMLElement>(null);
  const numberRefs = useRef<HTMLSpanElement[]>([]);
  const labelRefs = useRef<HTMLParagraphElement[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!sectionRef.current) return;

      const mq = window.matchMedia("(max-width: 767px)");
      
      if (mq.matches) {
        const metricsCells = sectionRef.current.querySelectorAll(".metrics-cell");
        animateMobileScrollFocus(metricsCells, { scaleMin: 0.94, blurMax: 4 });
        
        gsap.fromTo(".section-headline",
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: MOTION.standard, ease: MOTION.out,
            scrollTrigger: { trigger: ".section-headline", start: MOTION.triggerStartMobile }
          }
        );
        
        numberRefs.current.forEach((el, i) => {
          if (!el) return;
          const metric = METRICS[i];
          animateCounter(el, metric.value, {
            suffix: metric.suffix,
            duration: 1.5,
            ease: "power2.out",
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
              once: true,
            },
          });
        });
      } else {
        animateOnScroll(".section-headline", { y: 30 });

        numberRefs.current.forEach((el, i) => {
          if (!el) return;
          const metric = METRICS[i];
          animateCounter(el, metric.value, {
            suffix: metric.suffix,
            duration: 2.2,
            ease: "power2.out",
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
              once: true,
            },
          });
        });

        animateOnScroll(".metric-label", {
          y: 20,
          stagger: 0.12,
        });
      }
    });
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="metrics"
      ref={sectionRef}
      className="relative w-full py-[clamp(4rem,10vw,10rem)] border-t border-white/[0.08]"
    >
      <VideoBackground src="/videos/bg2.mp4" overlayOpacity={0.88} />
      <div className="relative z-10 max-w-[1280px] mx-auto px-6 md:px-[clamp(1.5rem,5vw,5rem)]">

        {/* Section label + headline */}
        <div className="mb-16 md:mb-24 section-headline">
          <p className="text-[0.75rem] tracking-[0.2em] uppercase text-secondary mb-4">
            By the Numbers
          </p>
          <h2 className="text-white font-bold text-[clamp(2rem,5vw,4rem)] leading-[0.95] tracking-[-0.02em]">
            Impact at Scale.
          </h2>
        </div>

        {/* Metrics grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-0">
          {METRICS.map((m, i) => (
            <div
              key={m.label}
              className={`metrics-cell flex flex-col gap-3 py-10 px-6 md:px-8 ${
                i < METRICS.length - 1 ? "border-r border-white/[0.06]" : ""
              }`}
              style={{
                borderRight: i % 2 === 0 && i < METRICS.length - 1
                  ? undefined
                  : undefined,
              }}
            >
              <span
                ref={(el) => {
                  if (el) numberRefs.current[i] = el;
                }}
                className="text-white font-bold text-[clamp(2.5rem,5vw,4.5rem)] leading-none tracking-[-0.03em] tabular-nums"
              >
                0{m.suffix}
              </span>
              <p
                ref={(el) => {
                  if (el) labelRefs.current[i] = el;
                }}
                className="metric-label text-secondary text-[0.8rem] tracking-[0.05em] uppercase leading-[1.5] max-w-[200px]"
              >
                {m.label}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
