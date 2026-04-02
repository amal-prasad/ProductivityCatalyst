"use client";

import { useRef } from "react";
import { animatePinnedScroll, MOTION, gsap, ScrollTrigger } from "@/lib/gsap";
import { useGSAP } from "@gsap/react";
import VideoBackground from "./VideoBackground";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

const STATEMENTS = [
  {
    headline: "CXO-Focused.",
    accent: "Cut through noise.",
    sub: "Help senior leaders cut through operational noise and focus energy on growth and strategy.",
  },
  {
    headline: "Automation-First.",
    accent: "Save time, cut costs.",
    sub: "Identify and automate the right processes — saving time, reducing errors, and cutting costs.",
  },
  {
    headline: "AI Where It Counts.",
    accent: "Not a buzzword.",
    sub: "Apply AI-enabled tools where they genuinely add value as a reliable business lever.",
  },
  {
    headline: "Delivery Experience.",
    accent: "Get things done.",
    sub: "Backed by rich experience in project and delivery management — we know how to execute.",
  },
  {
    headline: "SME-First.",
    accent: "Free of enterprise bloat.",
    sub: "Built specifically for growing businesses — practical, affordable, and highly effective.",
  },
  {
    headline: "Fast Results.",
    accent: "Paced for speed.",
    sub: "Engagements structured for speed. Most clients see tangible outcomes within 4–8 weeks.",
  },
];

export default function PinnedScrollFeatures() {
  const containerRef = useRef<HTMLElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<HTMLDivElement[]>([]);

  useGSAP(() => {
    const container = containerRef.current;
    const inner = innerRef.current;
    if (!container || !inner) return;

    const mq = window.matchMedia("(max-width: 767px)");
    if (mq.matches) {
      const sectionLabel = container.querySelector(".pinned-section-label");
      if (sectionLabel) {
        gsap.fromTo(sectionLabel,
          { opacity: 0, letterSpacing: "0.5em" },
          {
            opacity: 1, letterSpacing: "0.2em",
            duration: MOTION.standard, ease: MOTION.smooth,
            scrollTrigger: { trigger: sectionLabel, start: "top 90%", once: true },
          }
        );
      }

      const items = Array.from(container.querySelectorAll(".pinned-item"));
      items.forEach((itemEl) => {
        const counter  = itemEl.querySelector(".pinned-mobile-counter") as HTMLElement | null;
        const headline = itemEl.querySelector(".pinned-mobile-headline") as HTMLElement | null;
        const accent   = itemEl.querySelector(".pinned-accent-text") as HTMLElement | null;
        const body     = itemEl.querySelector(".pinned-mobile-body") as HTMLElement | null;

        const tl = gsap.timeline({ paused: true });

        if (counter) {
          tl.fromTo(counter,
            { scale: 0, opacity: 0, rotationZ: -15 },
            { scale: 1, opacity: 1, rotationZ: 0, duration: MOTION.snappy, ease: MOTION.elastic },
            0
          );
        }

        if (headline) {
          tl.fromTo(headline,
            { clipPath: "inset(0 0 100% 0)", y: 16, opacity: 1 },
            { clipPath: "inset(0 0 0% 0)", y: 0, duration: MOTION.deliberate, ease: MOTION.smooth },
            0.1
          );
        }

        if (accent) {
          tl.fromTo(accent,
            { textShadow: "0 0 0px rgba(0,229,204,0)" },
            {
              textShadow: "0 0 30px rgba(0,229,204,1), 0 0 60px rgba(0,229,204,0.5)",
              duration: 0.35, ease: MOTION.inOut,
              yoyo: true, repeat: 1,
            },
            0.65
          );
        }

        if (body) {
          tl.fromTo(body,
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: MOTION.standard, ease: MOTION.out },
            0.5
          );
        }

        ScrollTrigger.create({
          trigger: itemEl,
          start: "top 84%",
          once: true,
          onEnter: () => tl.play(),
        });
      });
      return;
    }

    // Desktop: pinned crossfade
    const items = itemRefs.current.filter(Boolean);
    animatePinnedScroll(inner, items, { scrollLength: 400 });
  }, { scope: containerRef });

  return (
    <section
      id="pinned-features"
      ref={containerRef}
      className="relative w-full border-t border-white/[0.08]"
    >
      <VideoBackground src="/videos/bg1.mp4" overlayOpacity={0.85} isSticky={true} />
      {/* Section label */}
      <div className="relative z-10 max-w-[1280px] mx-auto px-6 md:px-[clamp(1.5rem,5vw,5rem)] pt-[clamp(4rem,8vw,8rem)]">
        <p className="pinned-section-label text-[0.75rem] tracking-[0.2em] uppercase text-secondary mb-4">
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

      {/* Mobile: sequential stack with cinematic per-item animations */}
      <div className="md:hidden flex flex-col gap-0 max-w-[1280px] mx-auto px-6 py-[clamp(3rem,8vw,6rem)]">
        {STATEMENTS.map((s, i) => (
          <div
            key={i}
            className={`pinned-item flex flex-col gap-5 py-10 ${
              i < STATEMENTS.length - 1 ? "border-b border-white/[0.06]" : ""
            }`}
          >
            <span className="pinned-mobile-counter inline-flex items-center gap-2 text-[0.65rem] tracking-[0.3em] uppercase text-accent/70 self-start">
              <span className="w-4 h-px bg-accent/40 inline-block" />
              {String(i + 1).padStart(2, "0")} / {String(STATEMENTS.length).padStart(2, "0")}
            </span>

            <h3 className="pinned-mobile-headline text-white font-bold text-[clamp(1.6rem,5.5vw,2.5rem)] leading-[1.1] tracking-[-0.02em]">
              {s.headline}{" "}
              <span className="pinned-accent-text">{s.accent}</span>
            </h3>

            <p className="pinned-mobile-body text-secondary text-[0.95rem] leading-[1.75]">
              {s.sub}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
