"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "@/lib/gsap";

interface ParallaxBackgroundProps {
  src: string;
  alt: string;
  speed?: number;
  overlayOpacity?: number;
}

export default function ParallaxBackground({
  src,
  alt,
  speed = 0.5,
  overlayOpacity = 0.6,
}: ParallaxBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const image = imageRef.current;
    if (!container || !image) return;

    // Set initial scale to prevent showing edges during parallax
    gsap.set(image, { scale: 1.2, transformOrigin: "center center" });

    const animation = gsap.fromTo(
      image,
      { yPercent: -10 * speed },
      {
        yPercent: 10 * speed,
        ease: "none",
        scrollTrigger: {
          trigger: container,
          start: "top bottom", // when the top of the container hits the bottom of the viewport
          end: "bottom top", // when the bottom of the container hits the top of the viewport
          scrub: true,
        },
      }
    );

    return () => {
      animation.kill();
    };
  }, [speed]);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 overflow-hidden pointer-events-none -z-10"
    >
      <div className="relative w-full h-full">
        <Image
          ref={imageRef}
          src={src}
          alt={alt}
          fill
          className="object-cover"
          priority={false}
          sizes="100vw"
        />
      </div>
      {/* Dark overlay to ensure text readability */}
      <div
        className="absolute inset-0 bg-[#0a0a0a]"
        style={{ opacity: overlayOpacity }}
      ></div>
    </div>
  );
}
