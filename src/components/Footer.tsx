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
          {
            opacity: 1, y: 0, duration, ease: MOTION.out,
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
          <div className="footer-col md:col-span-2 bg-white/[0.02] border border-white/[0.08] hover:border-accent/30 hover:bg-white/[0.04] transition-all duration-500 rounded-2xl p-8 relative overflow-hidden flex flex-col sm:flex-row gap-8 justify-between items-start sm:items-center group shadow-lg">
            {/* Background Glow */}
            <div className="absolute inset-0 bg-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            
            <div className="relative z-10 w-full">
              <h4 className="text-white text-xs font-semibold tracking-[0.1em] uppercase mb-4">Contact Us</h4>
              <p className="text-[#a0a0a0] text-sm mb-6 max-w-[280px] leading-relaxed">
                Ready to transform your business? Reach out to discuss how we can help you achieve your goals.
              </p>
              <div className="flex flex-col gap-4 text-sm text-[#666666]">
                <a href="mailto:info@productivitycatalyst.com" className="flex items-center gap-3 hover:text-white transition-colors group/link cursor-pointer w-fit">
                  <span className="w-8 h-8 rounded-full bg-white/[0.05] flex items-center justify-center text-accent group-hover/link:bg-accent/10 transition-colors shrink-0">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </span>
                  <span className="truncate">info@productivitycatalyst.com</span>
                </a>
                <a href="tel:+919232136211" className="flex items-center gap-3 hover:text-white transition-colors group/link cursor-pointer w-fit">
                  <span className="w-8 h-8 rounded-full bg-white/[0.05] flex items-center justify-center text-accent group-hover/link:bg-accent/10 transition-colors shrink-0">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </span>
                  <span>+91 92321 36211</span>
                </a>
              </div>
            </div>
            
            <div className="relative z-10 shrink-0 mt-4 sm:mt-0 w-full sm:w-auto">
              <button
                onClick={scrollToContact}
                className="group/btn w-full sm:w-auto relative overflow-hidden flex items-center justify-center gap-3 text-[0.75rem] font-bold tracking-[0.1em] uppercase text-black bg-accent px-8 py-5 rounded-xl hover:shadow-[0_0_20px_rgba(0,229,204,0.4)] transition-all duration-300 cursor-pointer"
              >
                <span className="relative z-10">Book a Call</span>
                <svg className="w-4 h-4 relative z-10 transform group-hover/btn:translate-x-1 transition-transform inline-block" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300 ease-out" />
              </button>
            </div>
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
