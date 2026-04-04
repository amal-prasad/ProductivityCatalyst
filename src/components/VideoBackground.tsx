"use client";

import React, { useRef, useEffect, useState } from "react";

export default function VideoBackground({
  src,
  overlayOpacity = 0.6,
  className = "",
  isSticky = false,
}: {
  src: string;
  overlayOpacity?: number;
  className?: string;
  isSticky?: boolean;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  // Lazy-load: only start playing when the section enters the viewport
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "200px 0px" } // start loading 200px before visible
    );

    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  // Set playback rate once visible and loaded
  useEffect(() => {
    if (isVisible && videoRef.current) {
      videoRef.current.playbackRate = 0.8;
    }
  }, [isVisible]);

  const videoContent = (
    <>
      {isVisible && (
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          poster="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 9'%3E%3Crect width='16' height='9' fill='%230a0a0a'/%3E%3C/svg%3E"
          className="absolute inset-0 w-full h-full object-cover z-0"
        >
          <source src={src} type={src.endsWith(".webm") ? "video/webm" : "video/mp4"} />
        </video>
      )}
      <div className="absolute inset-0 bg-black z-0" style={{ opacity: overlayOpacity }} />
    </>
  );

  if (isSticky) {
    return (
      <div ref={containerRef} className={`absolute inset-0 pointer-events-none select-none z-0 ${className}`}>
        <div className="sticky top-0 w-full h-[100vh] overflow-hidden">
          {videoContent}
        </div>
      </div>
    );
  }

  return (
    <div ref={containerRef} className={`absolute inset-0 overflow-hidden pointer-events-none select-none z-0 ${className}`}>
      {videoContent}
    </div>
  );
}
