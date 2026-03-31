"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { gsap, MOTION } from "@/lib/gsap";
import VideoBackground from "./VideoBackground";
import TextReveal from "./TextReveal";
import MagneticWrapper from "./MagneticWrapper";

export default function CTASection() {
  const line1Ref = useRef<HTMLHeadingElement>(null);
  const line2Ref = useRef<HTMLHeadingElement>(null);
  const btnRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const mq = window.matchMedia("(max-width: 767px)");
      const startTrigger = mq.matches ? "top 80%" : "top 75%";
      const yOffset = mq.matches ? 16 : 30;
      const duration = mq.matches ? MOTION.snappy : MOTION.standard;

      const ctaTl = gsap.timeline({
        scrollTrigger: {
          trigger: "#contact",
          start: startTrigger,
        }
      });

      if (line1Ref.current && line2Ref.current && btnRef.current) {
        ctaTl
          .fromTo(line1Ref.current,
            { opacity: 0, y: yOffset },
            { opacity: 1, y: 0, duration: duration, ease: MOTION.out })
          .fromTo(line2Ref.current,
            { opacity: 0, y: yOffset * 0.5 },
            { opacity: 1, y: 0, duration: duration * 0.8, ease: MOTION.out }, "-=0.15")
          .fromTo(btnRef.current,
            { opacity: 0, y: yOffset * 0.6 },
            { opacity: 1, y: 0, duration: duration * 0.8, ease: MOTION.out }, "-=0.1");
      }
    });
    return () => ctx.revert();
  }, []);
  return (
    <section
      id="contact"
      className="relative w-full border-t border-white/[0.08]"
      style={{ padding: "clamp(6rem, 10vw, 10rem) 0" }}
    >
      <VideoBackground src="/videos/bg2.mp4" overlayOpacity={0.8} />
      <div className="relative z-10 max-w-[1280px] mx-auto px-6 md:px-[clamp(1.5rem,5vw,5rem)] flex flex-col items-center text-center gap-10">

        <h2
          ref={line1Ref}
          className="text-white font-bold text-[clamp(2.5rem,6vw,5.5rem)] leading-[0.95] tracking-[-0.02em]"
        >
          <TextReveal>Focus on Growth.</TextReveal>
        </h2>
        <h2
          ref={line2Ref}
          className="text-white font-bold text-[clamp(2.5rem,6vw,5.5rem)] leading-[0.95] tracking-[-0.02em]"
        >
          <TextReveal delay={0.2}>Not Firefighting.</TextReveal>
        </h2>

        <MagneticWrapper strength={40} elasticity={0.4}>
          <Link
            ref={btnRef}
            href="#contact"
            className="inline-block text-[0.875rem] font-medium tracking-[0.1em] uppercase text-white border border-white px-10 py-4 hover:bg-accent hover:border-accent transition-colors duration-300"
          >
            Book a Discovery Call →
          </Link>
        </MagneticWrapper>

      </div>
    </section>
  );
}
