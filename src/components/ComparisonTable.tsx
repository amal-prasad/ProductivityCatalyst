"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { MOTION, IS_MOBILE } from "@/lib/gsap";
import TextReveal from "./TextReveal";

const CheckIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#00e5cc" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const XIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#666" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

const COMPARISON_DATA = [
  {
    feature: "Time to First Insight",
    catalyst: "48 hours",
    traditional: "3-6 months",
  },
  {
    feature: "Cross-Team Visibility",
    catalyst: "Real-time dashboards",
    traditional: "Manual status reports",
  },
  {
    feature: "Implementation Support",
    catalyst: "Dedicated consultant",
    traditional: "Self-service documentation",
  },
  {
    feature: "Custom Workflow Matching",
    catalyst: "Tailored to your org",
    traditional: "Generic templates",
  },
  {
    feature: "Ongoing Optimization",
    catalyst: "Quarterly reviews included",
    traditional: "One-time setup",
  },
];

export default function ComparisonTable() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!sectionRef.current) return;
      const rows = sectionRef.current.querySelectorAll(".comparison-row");
      const header = sectionRef.current.querySelector(".comparison-header");
      const isMobile = IS_MOBILE();
      const duration = isMobile ? MOTION.snappy : MOTION.standard;
      const yOffset = isMobile ? 16 : 20;

      if (header) {
        gsap.fromTo(header,
          { opacity: 0, y: yOffset },
          { opacity: 1, y: 0, duration, ease: MOTION.out,
            scrollTrigger: { trigger: header, start: isMobile ? MOTION.triggerStartMobile : "top 85%", once: true }
          }
        );
      }

      if (rows.length) {
        rows.forEach((row) => {
          gsap.fromTo(row,
            { opacity: 0, x: isMobile ? 0 : -20, y: isMobile ? 16 : 0 },
            { opacity: 1, x: 0, y: 0, duration, ease: MOTION.out,
              scrollTrigger: { trigger: row, start: isMobile ? MOTION.triggerStartMobile : "top 85%", once: true }
            }
          );
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative w-full py-[clamp(4rem,10vw,10rem)] bg-[#0a0a0a]">
      <div className="max-w-[1280px] mx-auto px-6 md:px-[clamp(1.5rem,5vw,5rem)]">
        <div className="comparison-header mb-12">
          <p className="text-[0.75rem] tracking-[0.2em] uppercase text-secondary mb-4">
            Why Choose Us
          </p>
          <h2 className="text-white font-bold text-[clamp(2rem,5vw,4rem)] leading-[0.95] tracking-[-0.02em]">
            <TextReveal>The Productivity Catalyst Difference.</TextReveal>
          </h2>
        </div>

        <div className="border border-white/[0.08] overflow-hidden">
          <div className="grid grid-cols-[1fr,1fr,1fr] bg-[#111] border-b border-white/[0.08]">
            <div className="p-6" />
            <div className="p-6 text-center border-l border-white/[0.08]">
              <p className="text-accent font-semibold text-sm tracking-[0.1em] uppercase">Productivity Catalyst</p>
            </div>
            <div className="p-6 text-center border-l border-white/[0.08]">
              <p className="text-secondary font-medium text-sm tracking-[0.1em] uppercase">Traditional Approach</p>
            </div>
          </div>

          {COMPARISON_DATA.map((row, i) => (
            <div key={i} className="comparison-row grid grid-cols-[1fr,1fr,1fr] border-b border-white/[0.08] last:border-b-0 hover:bg-white/[0.02] transition-colors">
              <div className="p-6 flex items-center">
                <p className="text-white text-sm font-medium">{row.feature}</p>
              </div>
              <div className="p-6 flex items-center justify-center gap-3 border-l border-white/[0.08] bg-accent/[0.03]">
                <CheckIcon />
                <p className="text-accent text-sm font-medium">{row.catalyst}</p>
              </div>
              <div className="p-6 flex items-center justify-center gap-3 border-l border-white/[0.08]">
                <XIcon />
                <p className="text-secondary text-sm">{row.traditional}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
