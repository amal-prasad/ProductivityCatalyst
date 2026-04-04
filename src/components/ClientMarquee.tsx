"use client";

import { useRef } from "react";
import Image from "next/image";
import { gsap, useGSAP, MOTION } from "@/lib/gsap";

const CLIENTS = [
  { name: "RS Group", logo: "/images/clients/rs-group-logo.jpeg" },
  { name: "SNP Solutions", logo: "/images/clients/snp-solutions.jpeg" },
];

/** Separator diamond between client logos */
function Separator() {
  return (
    <span className="shrink-0 w-1.5 h-1.5 rotate-45 bg-accent/40 mx-8 md:mx-14" />
  );
}

function ClientLogo({ name, logo }: { name: string; logo: string }) {
  return (
    <>
      <div className="shrink-0 flex items-center justify-center h-20 md:h-28 px-6 md:px-10">
        <Image
          src={logo}
          alt={name}
          width={300}
          height={120}
          className="h-16 md:h-24 w-auto object-contain transition-transform duration-300 hover:scale-105"
          draggable={false}
          priority
        />
      </div>
      <Separator />
    </>
  );
}

export default function ClientMarquee() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (!sectionRef.current) return;

      const mq = window.matchMedia("(max-width: 767px)");

      gsap.fromTo(
        sectionRef.current.querySelector(".client-marquee-label"),
        { opacity: 0, y: 16 },
        {
          opacity: 1,
          y: 0,
          duration: MOTION.standard,
          ease: MOTION.out,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: mq.matches ? MOTION.triggerStartMobile : MOTION.triggerStart,
            once: true,
          },
        }
      );

      gsap.fromTo(
        sectionRef.current.querySelector(".client-marquee-container"),
        { opacity: 0 },
        {
          opacity: 1,
          duration: MOTION.deliberate,
          ease: MOTION.out,
          delay: 0.15,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: mq.matches ? MOTION.triggerStartMobile : MOTION.triggerStart,
            once: true,
          },
        }
      );
    },
    { scope: sectionRef }
  );

  // Repeat enough times so the track is wide enough for seamless looping
  const repeated = Array.from({ length: 8 }, () => CLIENTS).flat();
  // The CSS animation translates -50%, so we need two identical halves
  const items = [...repeated, ...repeated];

  return (
    <section
      ref={sectionRef}
      className="relative w-full py-12 md:py-16 border-t border-white/[0.08] overflow-hidden"
    >
      {/* Label */}
      <p className="client-marquee-label text-center text-[0.7rem] tracking-[0.25em] uppercase text-secondary mb-8 md:mb-10">
        Trusted by Industry Leaders
      </p>

      {/* Marquee container */}
      <div className="client-marquee-container relative">
        {/* Edge fade masks */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-16 md:w-32 z-10 bg-gradient-to-r from-[#0a0a0a] to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-16 md:w-32 z-10 bg-gradient-to-l from-[#0a0a0a] to-transparent" />

        {/* Single-row track */}
        <div className="group relative w-full overflow-hidden">
          <div className="client-marquee-track flex items-center w-max py-2">
            {items.map((client, idx) => (
              <ClientLogo
                key={`${client.name}-${idx}`}
                name={client.name}
                logo={client.logo}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Thin accent line */}
      <div className="mt-10 md:mt-14 mx-auto max-w-[1280px] px-6 md:px-[clamp(1.5rem,5vw,5rem)]">
        <div className="h-px bg-gradient-to-r from-transparent via-accent/20 to-transparent" />
      </div>
    </section>
  );
}
