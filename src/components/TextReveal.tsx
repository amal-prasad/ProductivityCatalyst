"use client";

import { useEffect, useRef } from "react";
import { gsap, IS_MOBILE, MOTION } from "@/lib/gsap";

interface TextRevealProps {
  children: string;
  className?: string;
  delay?: number;
  stagger?: number;
  as?: React.ElementType; // h1, h2, p, etc.
}

export default function TextReveal({
  children,
  className = "",
  delay = 0,
  stagger = 0.1,
  as: Component = "div",
}: TextRevealProps) {
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const container = containerRef.current;
      if (!container) return;

      const targets = container.querySelectorAll(".text-reveal-word");
      const isMobile = IS_MOBILE();

      if (isMobile) {
        gsap.fromTo(
          targets,
          { yPercent: 80, opacity: 0 },
          {
            yPercent: 0,
            opacity: 1,
            duration: 0.6,
            ease: MOTION.out,
            stagger: stagger * 0.7,
            delay: delay,
            scrollTrigger: {
              trigger: container,
              start: MOTION.triggerStartMobile,
              once: true,
            },
          }
        );
      } else {
        gsap.fromTo(
          targets,
          { yPercent: 120, rotationZ: 2, opacity: 0 },
          {
            yPercent: 0,
            rotationZ: 0,
            opacity: 1,
            duration: 1,
            ease: "power4.out",
            stagger: stagger,
            delay: delay,
            scrollTrigger: {
              trigger: container,
              start: "top 85%",
              once: true,
            },
          }
        );
      }
    });
    return () => ctx.revert();
  }, [delay, stagger]);

  // Split the text into words
  const words = children.split(" ");

  return (
    <Component ref={containerRef} className={`${className} flex flex-wrap gap-x-[0.25em] gap-y-2`}>
      {words.map((word, i) => (
        <span
          key={i}
          className="text-reveal-mask overflow-hidden inline-block"
        >
          <span className="text-reveal-word inline-block origin-bottom-left will-change-transform opacity-0">
            {word}
          </span>
        </span>
      ))}
    </Component>
  );
}
