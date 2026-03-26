"use client";

import { useEffect, useRef } from "react";
import { animatePinnedScroll, animateOnScroll } from "@/lib/gsap";

const STATEMENTS = [
  {
    headline: "One platform. Every team.",
    accent: "Complete transparency.",
    sub: "Gain complete visibility across departments, time zones, and workflows — without a single status meeting.",
  },
  {
    headline: "Surface hidden risks",
    accent: "before they escalate.",
    sub: "Automated cross-team dependency mapping catches conflicts weeks before they derail a sprint.",
  },
  {
    headline: "Custom-built trackers",
    accent: "that match your org.",
    sub: "Not generic Kanban boards. Trackers adapted to your structure — from trading desks to dev squads.",
  },
  {
    headline: "Real-time visibility.",
    accent: "Not weekly status reports.",
    sub: "Every team's priorities, blockers, and output updated continuously. Leadership sees the truth — live.",
  },
];

export default function PinnedScrollFeatures() {
  const containerRef = useRef<HTMLElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const container = containerRef.current;
    const inner = innerRef.current;
    if (!container || !inner) return;

    // Mobile: skip pinning, use simple fade-ins instead
    const mq = window.matchMedia("(max-width: 767px)");
    if (mq.matches) {
      const items = container.querySelectorAll(".pinned-item");
      animateOnScroll(items, { y: 40, stagger: 0.2, start: "top 80%" });
      return;
    }

    // Desktop: pinned crossfade
    const items = itemRefs.current.filter(Boolean);
    animatePinnedScroll(inner, items, { scrollLength: 400 });
  }, []);

  return (
    <section
      id="pinned-features"
      ref={containerRef}
      className="w-full border-t border-white/[0.08]"
    >
      {/* Section label */}
      <div className="max-w-[1280px] mx-auto px-6 md:px-[clamp(1.5rem,5vw,5rem)] pt-[clamp(4rem,8vw,8rem)]">
        <p className="text-[0.75rem] tracking-[0.2em] uppercase text-secondary mb-4">
          Why Productivity Catalyst
        </p>
      </div>

      {/* Desktop: pinned scroll container */}
      <div className="hidden md:block">
        <div
          ref={innerRef}
          className="relative w-full min-h-[100dvh] flex items-center justify-center"
        >
          {STATEMENTS.map((s, i) => (
            <div
              key={i}
              ref={(el) => {
                if (el) itemRefs.current[i] = el;
              }}
              className="pinned-item flex flex-col items-center justify-center text-center px-6 max-w-[900px] mx-auto"
            >
              <span className="text-[0.7rem] tracking-[0.25em] uppercase text-secondary/60 mb-6">
                {String(i + 1).padStart(2, "0")} / {String(STATEMENTS.length).padStart(2, "0")}
              </span>
              <h2 className="text-white font-bold text-[clamp(2rem,4.5vw,3.75rem)] leading-[1.05] tracking-[-0.02em] mb-2">
                {s.headline}
              </h2>
              <h2 className="font-bold text-[clamp(2rem,4.5vw,3.75rem)] leading-[1.05] tracking-[-0.02em] mb-8 pinned-accent-text">
                {s.accent}
              </h2>
              <p className="text-secondary text-[1.05rem] leading-[1.75] max-w-[600px]">
                {s.sub}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Mobile: sequential stack (no pinning) */}
      <div className="md:hidden flex flex-col gap-16 max-w-[1280px] mx-auto px-6 py-[clamp(3rem,8vw,6rem)]">
        {STATEMENTS.map((s, i) => (
          <div key={i} className="pinned-item flex flex-col gap-4">
            <span className="text-[0.7rem] tracking-[0.25em] uppercase text-secondary/60">
              {String(i + 1).padStart(2, "0")} / {String(STATEMENTS.length).padStart(2, "0")}
            </span>
            <h3 className="text-white font-bold text-[clamp(1.5rem,5vw,2.25rem)] leading-[1.1] tracking-[-0.01em]">
              {s.headline}{" "}
              <span className="pinned-accent-text">{s.accent}</span>
            </h3>
            <p className="text-secondary text-[0.95rem] leading-[1.7] max-w-md">
              {s.sub}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
