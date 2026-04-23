"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import LogoMark from "./LogoMark";
import { gsap, MOTION } from "@/lib/gsap";
import { scrollToContact } from "@/lib/scrollToContact";
import ServicesView from "./ServicesView";

const NAV_LINKS = [
  { name: "Services", href: "#services" },
  { name: "How It Works", href: "#how-it-works" },
];

const MenuIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square" strokeLinejoin="miter">
    <line x1="3" y1="12" x2="21" y2="12"></line>
    <line x1="3" y1="6" x2="21" y2="6"></line>
    <line x1="3" y1="18" x2="21" y2="18"></line>
  </svg>
);

const CloseIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square" strokeLinejoin="miter">
    <line x1="18" y1="6" x2="6" y2="18"></line>
    <line x1="6" y1="6" x2="18" y2="18"></line>
  </svg>
);

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [servicesKey, setServicesKey] = useState(0);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("");
  const headerRef = useRef<HTMLElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    // True first load check: use sessionStorage to survive soft reloads while blocking across SPA navigations
    const sessionAnimated = typeof sessionStorage !== "undefined" ? sessionStorage.getItem("navAnimated") : null;

    if (hasAnimated.current || sessionAnimated) {
      // Already animated in this session — instantly show everything
      if (headerRef.current) {
        const targets = headerRef.current.querySelectorAll(".nav-anim-target");
        gsap.set(targets, { opacity: 1, y: 0 });
      }
      return;
    }

    hasAnimated.current = true;
    if (typeof sessionStorage !== "undefined") {
      sessionStorage.setItem("navAnimated", "true");
    }

    const ctx = gsap.context(() => {
      if (!headerRef.current) return;
      const targets = headerRef.current.querySelectorAll(".nav-anim-target");
      gsap.fromTo(
        targets,
        { y: -20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: MOTION.standard,
          stagger: 0.08,
          ease: MOTION.smooth,
          delay: 0.15,
          clearProps: "transform",
        }
      );
    });
    return () => ctx.revert();
  }, []);

  // Prevent scrolling when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Scroll detection for background opacity
  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const isScrolled = window.scrollY > 50;
          setScrolled((prev) => prev === isScrolled ? prev : isScrolled);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Active section highlighting with IntersectionObserver
  useEffect(() => {
    const sectionIds = NAV_LINKS.map((link) => link.href.replace("#", ""));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <header
        ref={headerRef}
        style={{
          // Promote the navbar to its own compositor layer so the backdrop-filter
          // only re-rasters the navbar strip, not the full viewport, on scroll.
          transform: "translateZ(0)",
          willChange: "background-color",
          isolation: "isolate",
          contain: "layout paint",
        }}
        className={`fixed top-0 left-0 w-full z-50 backdrop-blur-md transition-colors duration-300 ${scrolled ? "bg-[#0a0a0a]/95 border-b border-white/[0.12]" : "bg-[#0a0a0a]/85 border-b border-white/[0.08]"
          }`}
      >
        <div className="max-w-[1280px] mx-auto px-6 md:px-12 flex items-center justify-between h-20">
          {/* Logo */}
          <Link
            href="/"
            onClick={(e) => {
              if (window.location.pathname === "/") {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: "smooth" });
              }
              setIsOpen(false);
              setIsServicesOpen(false);
            }}
            className="nav-anim-target text-white font-bold text-xl tracking-tight relative z-50 opacity-0 flex items-center gap-3 cursor-pointer"
          >
            <LogoMark size={32} />
            <span>Productivity Catalyst</span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => {
              const isServicesLink = link.name === "Services";
              const sectionId = link.href.replace("#", "");
              const isActive = activeSection === sectionId || (isServicesLink && isServicesOpen);
              return (
                <Link
                  key={link.name}
                  href={isServicesLink ? "#" : link.href}
                  onClick={(e) => {
                    if (isServicesLink) {
                      e.preventDefault();
                      setIsServicesOpen(true);
                      setServicesKey((prev) => prev + 1);
                    }
                  }}
                  className={`relative nav-anim-target text-[0.75rem] font-medium tracking-[0.15em] uppercase transition-all duration-300 opacity-0 ${isActive ? "text-accent" : "text-white/80 hover:text-white"
                    }`}
                >
                  {link.name}
                  {isActive && (
                    <span className="absolute -bottom-1 left-0 w-full h-[2px] bg-accent" />
                  )}
                </Link>
              );
            })}
            <button
              onClick={scrollToContact}
              style={{ opacity: 0 }}
              className="nav-anim-target text-[0.875rem] font-medium tracking-[0.1em] uppercase text-white border border-white px-[2rem] py-[0.75rem] hover:bg-accent hover:border-accent transition-colors duration-300 cursor-pointer"
            >
              Book a Call →
            </button>
          </nav>

          {/* Mobile Menu Toggle */}
          <button
            className="nav-anim-target md:hidden text-white relative z-50 p-2 opacity-0"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 bg-background z-40 flex flex-col items-center justify-center transition-all duration-500 ease-in-out md:hidden ${isOpen ? "opacity-100 visible pointer-events-auto" : "opacity-0 invisible pointer-events-none"
          }`}
      >
        <nav className="flex flex-col items-center gap-8">
          {NAV_LINKS.map((link) => {
            const isServicesLink = link.name === "Services";
            const sectionId = link.href.replace("#", "");
            const isActive = activeSection === sectionId || (isServicesLink && isServicesOpen);
            return (
              <Link
                key={link.name}
                href={isServicesLink ? "#" : link.href}
                onClick={(e) => {
                  if (isServicesLink) {
                    e.preventDefault();
                    setIsServicesOpen(true);
                    setServicesKey((prev) => prev + 1);
                    setIsOpen(false);
                  } else {
                    setIsOpen(false);
                  }
                }}
                className={`text-2xl font-bold tracking-[0.15em] uppercase transition-colors ${isActive ? "text-accent" : "text-white hover:text-accent"
                  }`}
              >
                {link.name}
              </Link>
            );
          })}
          <button
            onClick={() => { setIsOpen(false); scrollToContact(); }}
            className="mt-4 text-[0.875rem] font-bold tracking-[0.1em] uppercase text-white border border-white px-[2rem] py-[0.75rem] hover:bg-accent hover:border-accent transition-colors duration-300 cursor-pointer"
          >
            Book a Call →
          </button>
        </nav>
      </div>

      <ServicesView key={servicesKey} isOpen={isServicesOpen} onClose={() => setIsServicesOpen(false)} />
    </>
  );
}
