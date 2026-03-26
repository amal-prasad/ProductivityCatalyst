"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

interface MagneticWrapperProps {
  children: React.ReactElement;
  strength?: number;
  elasticity?: number;
}

export default function MagneticWrapper({
  children,
  strength = 30, // Max distance pixel to move
  elasticity = 0.2, // Quickness of the snap back (GSAP duration)
}: MagneticWrapperProps) {
  const magneticRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = magneticRef.current;
    if (!element) return;

    const xTo = gsap.quickTo(element, "x", {
      duration: 1,
      ease: "elastic.out(1, 0.3)",
    });
    const yTo = gsap.quickTo(element, "y", {
      duration: 1,
      ease: "elastic.out(1, 0.3)",
    });

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { height, width, left, top } = element.getBoundingClientRect();
      const x = clientX - (left + width / 2);
      const y = clientY - (top + height / 2);
      
      // Calculate normalized distance and apply to max strength
      xTo(x * (strength / 100));
      yTo(y * (strength / 100));
    };

    const handleMouseLeave = () => {
      // Snap back
      gsap.to(element, { x: 0, y: 0, duration: elasticity, ease: "power3.out" });
      xTo(0);
      yTo(0);
    };

    element.addEventListener("mousemove", handleMouseMove);
    element.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      element.removeEventListener("mousemove", handleMouseMove);
      element.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [strength, elasticity]);

  // Clone the child and attach ref without adding an extra DOM node wrapper if we can avoid it,
  // but it's safer to wrap in a div that fits content.
  return (
    <div ref={magneticRef} className="inline-block relative cursor-pointer">
      {children}
    </div>
  );
}
