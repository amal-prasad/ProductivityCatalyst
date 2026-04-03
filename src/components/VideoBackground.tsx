"use client";

import React, { useRef, useEffect } from "react";

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

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.8;
    }
  }, []);

  const videoContent = (
    <>
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        poster="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 9'%3E%3Crect width='16' height='9' fill='%230a0a0a'/%3E%3C/svg%3E"
        className="absolute inset-0 w-full h-full object-cover z-0"
      >
        <source src={src} type={src.endsWith(".webm") ? "video/webm" : "video/mp4"} />
      </video>
      <div className="absolute inset-0 bg-black z-0" style={{ opacity: overlayOpacity > 0.6 ? 0.6 : overlayOpacity }} />
    </>
  );

  if (isSticky) {
    return (
      <div className={`absolute inset-0 pointer-events-none select-none z-0 ${className}`}>
        <div className="sticky top-0 w-full h-[100vh] overflow-hidden">
          {videoContent}
        </div>
      </div>
    );
  }

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none select-none z-0 ${className}`}>
      {videoContent}
    </div>
  );
}
