"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

export default function Cursor() {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Check if it's a touch device, if so, do nothing
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const cursor = cursorRef.current;
    if (!cursor) return;

    const xTo = gsap.quickTo(cursor, "x", { duration: 0.4, ease: "power3" });
    const yTo = gsap.quickTo(cursor, "y", { duration: 0.4, ease: "power3" });

    const onMouseMove = (e: MouseEvent) => {
      xTo(e.clientX);
      yTo(e.clientY);
    };

    window.addEventListener("mousemove", onMouseMove);

    // Add hover effects to links and buttons
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isClickable = target.closest("a") || target.closest("button");
      if (isClickable) {
        gsap.to(cursor, {
          width: 40,
          height: 40,
          backgroundColor: "#00e5cc", // Accent color
          mixBlendMode: "normal", // Might need to reset mix-blend-mode if it looks bad with difference
          duration: 0.15,
          ease: "power2.out",
        });
      }
    };

    const handleMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isClickable = target.closest("a") || target.closest("button");
      if (isClickable) {
        gsap.to(cursor, {
          width: 12,
          height: 12,
          backgroundColor: "#ffffff",
          mixBlendMode: "difference",
          duration: 0.15,
          ease: "power2.out",
        });
      }
    };

    window.addEventListener("mouseover", handleMouseOver);
    window.addEventListener("mouseout", handleMouseOut);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
      window.removeEventListener("mouseout", handleMouseOut);
    };
  }, []);

  return <div id="cursor" ref={cursorRef} />;
}
