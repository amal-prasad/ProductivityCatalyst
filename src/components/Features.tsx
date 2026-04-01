"use client";

import { useEffect, useRef } from "react";
import { animateOnScroll, animateEntrance, MOTION } from "@/lib/gsap";
import VideoBackground from "./VideoBackground";
import { servicesData } from "@/lib/servicesData";
import Link from "next/link";
import gsap from "gsap";

const ANGLE_STEP = 360 / servicesData.length;

export default function Features() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!sectionRef.current) return;

      const mq = window.matchMedia("(max-width: 767px)");
      
      if (mq.matches) {
        const cards = sectionRef.current.querySelectorAll(".carousel-card");
        animateEntrance(cards, { y: 24, duration: MOTION.snappy });

        gsap.fromTo(sectionRef.current.querySelector(".section-headline"),
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: MOTION.snappy, ease: MOTION.out,
            scrollTrigger: { trigger: sectionRef.current.querySelector(".section-headline"), start: MOTION.triggerStartMobile, once: true }
          }
        );
      } else {
        gsap.fromTo(".carousel-track",
          { opacity: 0, y: 60 },
          { opacity: 1, y: 0, duration: MOTION.standard, ease: MOTION.out,
            scrollTrigger: { trigger: ".carousel-track", start: "top 72%" }
          }
        );
        animateOnScroll(".section-headline", { y: 30 });
      }
    });
    return () => ctx.revert();
  }, []);

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

        {/*
          Single DOM tree for both desktop (3D ring) and mobile (flat stack).
          CSS handles both layouts via @media — no duplicated text content.
        */}
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
