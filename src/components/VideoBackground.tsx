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

  if (isSticky) {
    return (
      <div className={`absolute inset-0 pointer-events-none select-none z-0 ${className}`}>
        <div className="sticky top-0 w-full h-[100vh] overflow-hidden">
          <video
            ref={videoRef}
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
          >
            <source src={src} type={src.endsWith(".webm") ? "video/webm" : "video/mp4"} />
          </video>
          <div className="absolute inset-0 bg-black" style={{ opacity: overlayOpacity > 0.6 ? 0.6 : overlayOpacity }} />
        </div>
      </div>
    );
  }

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none select-none z-0 ${className}`}>
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src={src} type={src.endsWith(".webm") ? "video/webm" : "video/mp4"} />
      </video>
      <div className="absolute inset-0 bg-black" style={{ opacity: overlayOpacity > 0.6 ? 0.6 : overlayOpacity }} />
    </div>
  );
}
