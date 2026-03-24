"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { registerGsapPlugins, prefersReducedMotion } from "@/lib/motion";

const clients = [
  "Nova Bank", "Nexus AI", "Island Pulse", "Vortex Tech", "Midas Luxury", 
  "Aura Digital", "Zenith Media", "Orbit Systems", "Prime Assets", "Eclipse Global"
];

export default function ClientStrip() {
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    registerGsapPlugins();
    const reduced = prefersReducedMotion();
    if (reduced) return;

    const track = trackRef.current;
    if (!track) return;

    gsap.to(track, {
      xPercent: -50,
      duration: 35,
      ease: "none",
      repeat: -1,
    });
  }, []);

  return (
    <div className="relative border-y border-white/5 bg-black/40 py-16 md:py-24 overflow-hidden backdrop-blur-sm">
      <div className="absolute left-0 top-0 bottom-0 w-32 md:w-64 bg-gradient-to-r from-background to-transparent z-10" />
      <div className="absolute right-0 top-0 bottom-0 w-32 md:w-64 bg-gradient-to-l from-background to-transparent z-10" />
      
      <div className="max-w-7xl mx-auto px-4 mb-12">
        <p className="text-[10px] font-black uppercase tracking-[0.5em] text-white/20 text-center">Trusted by Industry Leaders</p>
      </div>

      <div ref={trackRef} className="flex whitespace-nowrap will-change-transform">
        {/* Double the list for seamless loop */}
        {[...clients, ...clients].map((client, i) => (
          <div key={i} className="flex-shrink-0 px-12 md:px-20 text-2xl md:text-3xl font-black uppercase tracking-tighter text-white/10 hover:text-accent/40 transition-colors duration-500 cursor-default grayscale hover:grayscale-0">
            {client}
          </div>
        ))}
      </div>
    </div>
  );
}
