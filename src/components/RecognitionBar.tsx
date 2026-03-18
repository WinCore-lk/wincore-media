"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function RecognitionBar() {
  const tickerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ticker = tickerRef.current;
    if (!ticker) return;

    const content = ticker.querySelector(".ticker-content");
    if (!content) return;

    // Duplicate content for seamless loop
    const clone = content.cloneNode(true);
    ticker.appendChild(clone);

    const duration = 20; // seconds

    gsap.to(ticker.children, {
      xPercent: -100,
      repeat: -1,
      duration: duration,
      ease: "linear",
    });
  }, []);

  return (
    <div className="relative py-12 md:py-20 bg-background border-y border-white/5 overflow-hidden">
      <div ref={tickerRef} className="flex whitespace-nowrap">
        <div className="ticker-content flex items-center gap-12 px-6">
          <span className="text-xl md:text-3xl font-medium tracking-tight text-white/40 italic">
            Recognized as Sri Lanka’s most awarded creative & AI-powered digital agency
          </span>
          <div className="w-2 h-2 rounded-full bg-accent" />
          <span className="text-xl md:text-3xl font-medium tracking-tight text-white/40 italic">
            Delivering global excellence from Colombo
          </span>
          <div className="w-2 h-2 rounded-full bg-accent" />
          <span className="text-xl md:text-3xl font-medium tracking-tight text-white/40 italic">
            Innovators in WebGL & AI Experiences
          </span>
          <div className="w-2 h-2 rounded-full bg-accent" />
        </div>
      </div>

      {/* Decorative gradient overlays for soft fade edges */}
      <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
    </div>
  );
}
