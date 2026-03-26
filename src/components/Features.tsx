"use client";

import { useEffect, useRef } from "react";
import { animateOnScroll } from "@/lib/gsap";

const FEATURES = [
  {
    num: "01",
    title: "Real-Time Team Visibility",
    body: "Fragmented teams breed blind spots. Get a live view of every team's priorities, blockers, and output — updated continuously, not monthly.",
  },
  {
    num: "02",
    title: "Zero Blind Spots",
    body: "Cross-functional dependencies become visible before they become problems. Catch conflicts between Dev, QA, and Product before they derail a sprint.",
  },
  {
    num: "03",
    title: "Dependency Radar",
    body: "Know the moment another team's work is blocking yours. Automated dependency mapping keeps every team informed without a single status meeting.",
  },
  {
    num: "04",
    title: "Unified Dashboard",
    body: "One pane of glass for your entire organization. Custom-built trackers adapted to your org's structure — not generic Kanban boards.",
  },
];

const ANGLE_STEP = 360 / FEATURES.length; // 90°

export default function Features() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const carousel = sectionRef.current.querySelector(".carousel-track");
    animateOnScroll(carousel, { y: 60, start: "top 72%" });
    const headline = sectionRef.current.querySelector(".section-headline");
    animateOnScroll(headline, { y: 30, start: "top 80%" });
  }, []);

  return (
    <section
      id="features"
      ref={sectionRef}
      className="w-full py-[clamp(4rem,10vw,10rem)] border-t border-white/[0.08] overflow-hidden"
    >
      <div className="max-w-[1280px] mx-auto px-6 md:px-[clamp(1.5rem,5vw,5rem)]">

        {/* Section label + headline */}
        <div className="mb-16 md:mb-28 section-headline">
          <p className="text-[0.75rem] tracking-[0.2em] uppercase text-secondary mb-4">
            Cross-Team Tracking
          </p>
          <h2 className="text-white font-bold text-[clamp(2rem,5vw,4rem)] leading-[0.95] tracking-[-0.02em]">
            No Team Works Alone.
          </h2>
        </div>

        {/*
          Single DOM tree for both desktop (3D ring) and mobile (flat stack).
          CSS handles both layouts via @media — no duplicated text content.
        */}
        <div className="carousel-track" aria-label="Feature cards">
          <div className="carousel-ring">
            {FEATURES.map((f, i) => {
              const rotateY = ANGLE_STEP * i;
              return (
                <div
                  key={f.num}
                  className="carousel-card"
                  style={
                    { "--card-rotate-y": `${rotateY}deg` } as React.CSSProperties
                  }
                >
                  <span className="carousel-card__num">{f.num}</span>
                  <h3 className="carousel-card__title">{f.title}</h3>
                  <p className="carousel-card__body">{f.body}</p>
                  <div className="carousel-card__accent" aria-hidden="true" />
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
