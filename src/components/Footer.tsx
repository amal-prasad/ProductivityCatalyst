"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { animateLineDraw } from "@/lib/gsap";

const NAV_LINKS = ["Features", "How It Works", "Industries", "Testimonials"];
const LEGAL_LINKS = ["Privacy Policy", "Terms of Service"];

export default function Footer() {
  const lineRef = useRef<HTMLDivElement>(null);
  const year = new Date().getFullYear();

  useEffect(() => {
    if (lineRef.current) {
      animateLineDraw(lineRef.current);
    }
  }, []);

  return (
    <footer className="w-full relative">
      {/* Animated top border — draws left-to-right on scroll entry */}
      <div
        ref={lineRef}
        className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-accent/60 via-white/20 to-transparent origin-left"
        style={{ transform: "scaleX(0)" }}
      />
      {/* Static fallback border behind the animated line */}
      <div className="absolute top-0 left-0 w-full h-px bg-white/[0.08]" />

      <div className="max-w-[1280px] mx-auto px-6 md:px-[clamp(1.5rem,5vw,5rem)] py-10 flex flex-col gap-6">

        {/* Top row — nav links */}
        <div className="flex flex-wrap gap-x-8 gap-y-3 justify-center md:justify-between items-center">
          <span className="text-white font-bold tracking-tight text-sm">
            Productivity Catalyst
          </span>
          <nav className="flex flex-wrap gap-6">
            {NAV_LINKS.map((l) => (
              <Link
                key={l}
                href={`#${l.toLowerCase().replace(/\s+/g, "-")}`}
                className="footer-link relative text-[0.75rem] tracking-[0.1em] uppercase text-[#666666] hover:text-white transition-colors"
              >
                {l}
              </Link>
            ))}
          </nav>
        </div>

        {/* Bottom row — copyright + legal */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 pt-6 border-t border-white/[0.08]">
          <span className="text-[0.75rem] text-[#666666]">
            &copy; {year} Productivity Catalyst. ✉ info@productivitycatalyst.com | ☎ +91 92321 36211
          </span>
          <div className="flex gap-6">
            {LEGAL_LINKS.map((l) => (
              <Link
                key={l}
                href="#"
                className="footer-link relative text-[0.75rem] text-[#666666] hover:text-white transition-colors"
              >
                {l}
              </Link>
            ))}
          </div>
        </div>

      </div>
    </footer>
  );
}
