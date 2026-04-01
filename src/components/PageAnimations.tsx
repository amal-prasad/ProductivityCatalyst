"use client";

import { useEffect } from "react";
import { gsap, MOTION, IS_MOBILE, ScrollTrigger } from "@/lib/gsap";

/**
 * Drop this into any page to animate all [data-animate] elements on scroll.
 * Works in server-rendered pages — just add data-animate attribute to sections.
 */
export default function PageAnimations() {
  useEffect(() => {
    const elements = document.querySelectorAll("[data-animate]");
    if (!elements.length) return;

    const isMobile = IS_MOBILE();

    const ctx = gsap.context(() => {
      elements.forEach((el) => {
        gsap.fromTo(el,
          { opacity: 0, y: isMobile ? 24 : 40 },
          {
            opacity: 1, y: 0,
            duration: isMobile ? MOTION.snappy : MOTION.standard,
            ease: MOTION.out,
            scrollTrigger: {
              trigger: el,
              start: isMobile ? MOTION.triggerStartMobile : "top 85%",
              once: true,
            },
          }
        );
      });
    });

    ScrollTrigger.refresh();

    return () => ctx.revert();
  }, []);

  return null;
}
