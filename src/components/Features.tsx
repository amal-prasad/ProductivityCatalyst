"use client";

import { useRef } from "react";
import { animateOnScroll, MOTION } from "@/lib/gsap";
import VideoBackground from "./VideoBackground";
import { servicesData } from "@/lib/servicesData";
import Link from "next/link";

// 1. Import GSAP, ScrollTrigger, and the official React hook
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

// 2. Explicitly register plugins outside the component to prevent 'undefined' errors
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

const ANGLE_STEP = 360 / servicesData.length;

export default function Features() {
  const sectionRef = useRef<HTMLElement>(null);

  // 3. Replace useEffect with useGSAP for automatic cleanup and scope management
  useGSAP(() => {
    if (!sectionRef.current) return;

    const mq = window.matchMedia("(max-width: 767px)");

    if (mq.matches) {
      // Headline: clip-path curtain reveal
      const headline = sectionRef.current.querySelector(".section-headline");
      if (headline) {
        const label = headline.querySelector("p");
        const h2 = headline.querySelector("h2");

        if (label) {
          gsap.fromTo(label,
            { opacity: 0, letterSpacing: "0.4em" },
            {
              opacity: 1, letterSpacing: "0.2em",
              // Optional chaining added to MOTION constants as a fallback safeguard
              duration: MOTION?.standard || 0.5,
              ease: MOTION?.smooth || "power2.out",
              scrollTrigger: { trigger: headline, start: "top 88%", once: true },
            }
          );
        }

        if (h2) {
          gsap.fromTo(h2,
            { clipPath: "inset(0 0 100% 0)", y: 16, opacity: 1 },
            {
              clipPath: "inset(0 0 0% 0)", y: 0,
              duration: MOTION?.deliberate || 0.8,
              ease: MOTION?.smooth || "power2.out",
              delay: 0.15,
              scrollTrigger: { trigger: headline, start: "top 88%", once: true },
            }
          );
        }
      }

      // Cards: 3D perspective flip-in with staggered delay
      const cards = Array.from(sectionRef.current.querySelectorAll(".carousel-card"));
      cards.forEach((cardEl, i) => {
        const card = cardEl as HTMLElement;
        const accentLine = card.querySelector(".carousel-card__accent") as HTMLElement | null;

        // 3D flip entrance
        gsap.fromTo(card,
          {
            transformPerspective: 900,
            rotateX: -18,
            y: 50,
            opacity: 0,
            scale: 0.94,
          },
          {
            transformPerspective: 900,
            rotateX: 0,
            y: 0,
            opacity: 1,
            scale: 1,
            duration: MOTION?.deliberate || 0.8,
            ease: "power4.out",
            delay: i * 0.1,
            transformOrigin: "top center",
            scrollTrigger: { trigger: card, start: MOTION?.triggerStartMobile || "top 85%", once: true },
            onComplete() {
              // Accent line draws in after card lands
              if (accentLine) {
                gsap.fromTo(accentLine,
                  { scaleX: 0, transformOrigin: "left center", opacity: 0.35 },
                  { scaleX: 1, opacity: 0.6, duration: MOTION?.standard || 0.5, ease: MOTION?.smooth || "power2.out" }
                );
              }
            },
          }
        );

        // Text stagger inside card (Mobile)
        gsap.fromTo(card.querySelectorAll(".carousel-card__num, .carousel-card__title, .carousel-card__body, .mt-auto"),
          { opacity: 0, y: 15 },
          {
            opacity: 1, y: 0,
            duration: 0.7, ease: "power2.out",
            stagger: 0.08,
            delay: i * 0.1 + 0.35,
            scrollTrigger: { trigger: card, start: MOTION?.triggerStartMobile || "top 85%", once: true }
          }
        );
      });

    } else {
      gsap.fromTo(".carousel-track",
        { opacity: 0, y: 60 },
        {
          opacity: 1, y: 0,
          duration: MOTION?.standard || 0.5,
          ease: MOTION?.out || "power2.out",
          scrollTrigger: { trigger: ".carousel-track", start: "top 72%", once: true }
        }
      );

      // Text stagger inside cards (Desktop)
      gsap.fromTo(".carousel-card__num, .carousel-card__title, .carousel-card__body, .mt-auto",
        { opacity: 0, y: 15 },
        {
          opacity: 1, y: 0,
          duration: 0.6, ease: "power2.out",
          stagger: 0.04,
          delay: 0.25,
          scrollTrigger: { trigger: ".carousel-track", start: "top 72%", once: true }
        }
      );

      // Safeguard in case animateOnScroll tries to fire before GSAP is fully ready
      if (typeof animateOnScroll === 'function') {
        animateOnScroll(".section-headline", { y: 30 });
      }
    }
  }, { scope: sectionRef }); // Passing the scope eliminates the need for manual context reverting

  return (
    <section
      id="features"
      ref={sectionRef}
      className="relative w-full py-[clamp(4rem,10vw,10rem)] border-t border-white/[0.08] overflow-hidden"
    >
      <VideoBackground src="/videos/bg1.mp4" overlayOpacity={0.6} />
      <div className="relative z-10 max-w-[1280px] mx-auto px-6 md:px-[clamp(1.5rem,5vw,5rem)]">

        {/* Section label + headline */}
        <div className="mb-16 md:mb-28 section-headline">
          <p className="text-[0.75rem] tracking-[0.2em] uppercase text-secondary mb-4">
            Our Services
          </p>
          <h2 className="text-white font-bold text-[clamp(2rem,5vw,4rem)] leading-[0.95] tracking-[-0.02em]">
            Consulting, Automation & AI.
          </h2>
        </div>

        <div className="carousel-track" aria-label="Feature cards">
          <div className="carousel-ring">
            {servicesData.map((f, i) => {
              const rotateY = ANGLE_STEP * i;
              return (
                <Link
                  href={`/services/${f.slug}`}
                  key={f.num}
                  className="carousel-card block hover:bg-white/[0.05] transition-colors duration-300"
                  style={
                    { "--card-rotate-y": `${rotateY}deg` } as React.CSSProperties
                  }
                >
                  <span className="carousel-card__num">{f.num}</span>
                  <h3 className="carousel-card__title">{f.title}</h3>
                  <p className="carousel-card__body mb-6">{f.shortBody}</p>

                  <div className="mt-auto pt-4 border-t border-white/[0.08] flex items-center justify-between group-hover:border-white/[0.15] transition-colors duration-300">
                    <span className="text-xs uppercase tracking-widest text-secondary group-hover:text-white transition-colors">
                      Explore Service
                    </span>
                    <span className="text-secondary group-hover:text-accent group-hover:translate-x-1 transition-all duration-300 transform">
                      →
                    </span>
                  </div>

                  <div className="carousel-card__accent" aria-hidden="true" />
                </Link>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}