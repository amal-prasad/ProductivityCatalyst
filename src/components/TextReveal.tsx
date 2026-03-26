"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

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
    const container = containerRef.current;
    if (!container) return;

    // The span wrappers holding the actual words
    const targets = container.querySelectorAll(".text-reveal-word");

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
          start: "top 85%", // Trigger when the top of container hits 85% of viewport
          once: true,
        },
      }
    );
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
