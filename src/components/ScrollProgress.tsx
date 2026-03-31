"use client";

import { useEffect, useRef } from "react";

export default function ScrollProgress() {
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateProgress = () => {
      if (!progressRef.current) return;
      const scrollTop = window.scrollY;
      const docHeight = document.body.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      progressRef.current.style.width = `${Math.min(progress, 100)}%`;
    };

    window.addEventListener("scroll", updateProgress, { passive: true });
    updateProgress();

    return () => window.removeEventListener("scroll", updateProgress);
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-[3px] z-[9999] bg-white/[0.05]">
      <div
        ref={progressRef}
        className="h-full bg-accent transition-[width] duration-100 ease-out"
        style={{ width: "0%" }}
      />
    </div>
  );
}
