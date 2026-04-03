"use client";

import { useRef } from "react";
import Link from "next/link";
import { animateLineDraw, gsap, MOTION, IS_MOBILE, useGSAP } from "@/lib/gsap";
import { scrollToContact } from "@/lib/scrollToContact";

const SERVICES = [
  { name: "CXO Productivity", href: "/services/cxo-productivity" },
  { name: "Business Assessment", href: "/services/business-assessment" },
  { name: "Workflow Solutions", href: "/services/workflow-solutions" },
  { name: "Business Insights", href: "/services/business-insights" },
  { name: "Project Delivery", href: "/services/project-delivery" },
  { name: "Team Building", href: "/services/team-building" },
  { name: "Smart Engagement", href: "/services/smart-engagement" },
  { name: "Custom Solutions", href: "/services/custom-solutions" },
];
const LEGAL_LINKS = [
  { name: "Privacy Policy", href: "/privacy" },
  { name: "Terms of Service", href: "/terms" },
];

export default function Footer() {
  const lineRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLElement>(null);
  const year = new Date().getFullYear();

  useGSAP(() => {
    if (lineRef.current) {
      animateLineDraw(lineRef.current);
    }

    if (footerRef.current) {
      const columns = footerRef.current.querySelectorAll(".footer-col");
      const isMobile = IS_MOBILE();
      const duration = isMobile ? MOTION.snappy : MOTION.standard;

      columns.forEach((col) => {
        gsap.fromTo(col,
          { opacity: 0, y: isMobile ? 16 : 24 },
          { opacity: 1, y: 0, duration, ease: MOTION.out,
            scrollTrigger: { trigger: col, start: isMobile ? MOTION.triggerStartMobile : "top 90%", once: true }
          }
        );
      });
    }
  }, { scope: footerRef });

  return (
    <footer ref={footerRef} className="w-full relative">
      {/* Animated top border — draws left-to-right on scroll entry */}
      <div
        ref={lineRef}
        className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-accent/60 via-white/20 to-transparent origin-left"
        style={{ transform: "scaleX(0)" }}
      />
      {/* Static fallback border behind the animated line */}
      <div className="absolute top-0 left-0 w-full h-px bg-white/[0.08]" />

      <div className="max-w-[1280px] mx-auto px-6 md:px-[clamp(1.5rem,5vw,5rem)] py-10 flex flex-col gap-6">

        {/* 4-column footer grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12 pb-8 border-b border-white/[0.08]">
          {/* Column 1: Logo & tagline */}
          <div className="footer-col md:col-span-1">
            <span className="text-white font-bold tracking-tight text-sm block mb-4">
              Productivity Catalyst
            </span>
            <p className="text-[#666666] text-xs leading-relaxed mb-6">
              Less Chaos. More Growth. Business consulting, automation & AI solutions for SMEs.
            </p>
            <div className="flex gap-4">
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#666666] hover:text-accent transition-colors"
                aria-label="LinkedIn"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#666666] hover:text-accent transition-colors"
                aria-label="Twitter"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Column 2: Navigation */}
          <div className="footer-col">
            <h4 className="text-white text-xs font-semibold tracking-[0.1em] uppercase mb-4">Navigation</h4>
            <nav className="flex flex-col gap-3">
              <Link href="/" className="footer-link relative text-[#666666] text-sm hover:text-white transition-colors">
                Home
              </Link>
              <Link href="/#features" className="footer-link relative text-[#666666] text-sm hover:text-white transition-colors">
                Services
              </Link>
              <Link href="/#how-it-works" className="footer-link relative text-[#666666] text-sm hover:text-white transition-colors">
                How It Works
              </Link>
              <Link href="/about" className="footer-link relative text-[#666666] text-sm hover:text-white transition-colors">
                About
              </Link>
            </nav>
          </div>

          {/* Column 3: Services */}
          <div className="footer-col">
            <h4 className="text-white text-xs font-semibold tracking-[0.1em] uppercase mb-4">Services</h4>
            <nav className="flex flex-col gap-3">
              {SERVICES.map((s) => (
                <Link
                  key={s.href}
                  href={s.href}
                  className="footer-link relative text-[#666666] text-sm hover:text-white transition-colors"
                >
                  {s.name}
                </Link>
              ))}
            </nav>
          </div>

          {/* Column 4: Contact */}
          <div className="footer-col">
            <h4 className="text-white text-xs font-semibold tracking-[0.1em] uppercase mb-4">Contact</h4>
            <div className="flex flex-col gap-3 text-sm text-[#666666]">
              <p>info@productivitycatalyst.com</p>
              <p>+91 92321 36211</p>
            </div>
            <button
              onClick={scrollToContact}
              className="inline-block mt-6 text-[0.75rem] font-medium tracking-[0.1em] uppercase text-white border border-white px-6 py-3 hover:bg-accent hover:border-accent transition-colors duration-300 cursor-pointer"
            >
              Book a Call →
            </button>
          </div>
        </div>

        {/* Bottom row — copyright + legal + back to top */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 pt-6">
          <span className="text-[0.75rem] text-[#666666]">
            &copy; {year} Productivity Catalyst. All rights reserved.
          </span>
          <div className="flex gap-6 items-center">
            {LEGAL_LINKS.map((l) => (
              <Link
                key={l.name}
                href={l.href}
                className="footer-link relative text-[0.75rem] text-[#666666] hover:text-white transition-colors"
              >
                {l.name}
              </Link>
            ))}
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="text-[0.75rem] text-[#666666] hover:text-accent transition-colors ml-4"
              aria-label="Back to top"
            >
              Back to Top ↑
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
}
