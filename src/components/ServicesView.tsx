"use client";

import { useState, useEffect } from "react";
import { servicesData } from "@/lib/servicesData";
import VideoBackground from "./VideoBackground";

export default function ServicesView({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Reset index when opened and manage body scroll
  useEffect(() => {
    if (isOpen) {
      setCurrentIndex(0);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [isOpen]);

  const handleNext = () => {
    if (currentIndex < servicesData.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  return (
    <div
      className={`fixed inset-0 z-[100] transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
        isOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      {/* Background Video */}
      <VideoBackground src="/videos/bg2.mp4" overlayOpacity={0.65} className="!z-0" />

      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute top-6 right-6 md:top-8 md:right-12 z-50 p-3 rounded-full bg-black/20 hover:bg-white/10 border border-white/10 backdrop-blur-md transition-colors cursor-pointer text-white/80 hover:text-white group"
        aria-label="Close services"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square">
          <line x1="18" y1="6" x2="6" y2="18" className="transition-transform group-hover:rotate-90 origin-center duration-300"></line>
          <line x1="6" y1="6" x2="18" y2="18" className="transition-transform group-hover:rotate-90 origin-center duration-300"></line>
        </svg>
      </button>

      {/* Navigation Arrows */}
      <div className="absolute inset-y-0 left-0 w-16 md:w-24 lg:w-32 z-40 flex items-center justify-center pointer-events-none">
        <button
          onClick={handlePrev}
          disabled={currentIndex === 0}
          className={`pointer-events-auto p-3 rounded-full bg-black/20 hover:bg-white/10 border border-white/10 backdrop-blur-md transition-all duration-300 cursor-pointer text-white/80 hover:text-white ${
            currentIndex === 0 ? "opacity-0 pointer-events-none -translate-x-4" : "opacity-100 translate-x-0"
          }`}
          aria-label="Previous service"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square">
            <polyline points="15 18 9 12 15 6"></polyline>
          </svg>
        </button>
      </div>

      <div className="absolute inset-y-0 right-0 w-16 md:w-24 lg:w-32 z-40 flex items-center justify-center pointer-events-none">
        <button
          onClick={handleNext}
          disabled={currentIndex === servicesData.length - 1}
          className={`pointer-events-auto p-3 rounded-full bg-black/20 hover:bg-white/10 border border-white/10 backdrop-blur-md transition-all duration-300 cursor-pointer text-white/80 hover:text-white ${
            currentIndex === servicesData.length - 1 ? "opacity-0 pointer-events-none translate-x-4" : "opacity-100 translate-x-0"
          }`}
          aria-label="Next service"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square">
            <polyline points="9 18 15 12 9 6"></polyline>
          </svg>
        </button>
      </div>

      {/* Carousel Track */}
      <div className="w-full h-full overflow-hidden flex items-center relative z-10">
        <div
          className="flex w-full h-full transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {servicesData.map((service, index) => (
            <div key={service.id} className="w-full h-full shrink-0 flex items-center justify-center px-16 md:px-24 lg:px-32 relative">
              
              {/* Glassmorphic Panel */}
              <div 
                className="w-full max-w-4xl max-h-[85vh] overflow-y-auto bg-black/30 backdrop-blur-2xl border border-white/10 rounded-3xl p-8 md:p-12 lg:p-16 shadow-[0_16px_64px_rgba(0,0,0,0.6)] flex flex-col items-start text-left transform-gpu [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-white/10 [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-white/20"
                style={{
                  opacity: currentIndex === index ? 1 : 0.3,
                  transform: currentIndex === index ? 'scale(1)' : 'scale(0.9)',
                  transition: 'opacity 700ms cubic-bezier(0.22,1,0.36,1), transform 700ms cubic-bezier(0.22,1,0.36,1)'
                }}
              >
                <div className="text-accent font-mono text-[0.75rem] md:text-[0.875rem] tracking-[0.2em] mb-6 uppercase flex items-center gap-4">
                  <span className="w-8 h-px bg-accent/50"></span>
                  Panel {service.num}
                </div>
                
                <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white leading-[1.1] tracking-tight mb-6">
                  {service.title}
                </h2>
                
                <p className="text-xl md:text-2xl text-white/90 mb-10 max-w-2xl font-light">
                  {service.shortBody}
                </p>

                <div className="h-px w-full bg-gradient-to-r from-accent/50 to-transparent mb-10"></div>

                <p className="text-base md:text-lg text-white/70 mb-12 max-w-3xl leading-relaxed">
                  {service.fullDescription}
                </p>

                <ul className="space-y-4 w-full text-white/80">
                  {service.bulletPoints.map((point, i) => (
                    <li key={i} className="flex items-start gap-4 group">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-accent shrink-0 mt-0.5 transition-transform group-hover:translate-x-1 duration-300">
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                      <span className="text-sm md:text-base leading-relaxed tracking-wide font-medium">{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
