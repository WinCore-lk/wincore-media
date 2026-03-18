"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function Preloader() {
  const [percentage, setPercentage] = useState(0);
  const preloaderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setPercentage((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        const inc = Math.random() > 0.84 ? 5 : 1;
        return Math.min(prev + inc, 100);
      });
    }, 40);

    gsap.set(".preloader-reveal", { yPercent: 100, skewY: 5 });
    gsap.to(".preloader-reveal", {
      yPercent: 0,
      skewY: 0,
      duration: 1.4,
      stagger: 0.08,
      ease: "expo.out",
    });

    if (percentage === 100) {
      const tl = gsap.timeline({
        onComplete: () => {
          if (preloaderRef.current) preloaderRef.current.style.display = "none";
          document.body.style.overflow = "";
        },
      });

      document.body.style.overflow = "hidden";

      tl.to(".preloader-reveal", {
        yPercent: -110,
        skewY: -6,
        duration: 1.1,
        stagger: 0.05,
        ease: "expo.inOut",
        delay: 0.7,
      }).to(
        preloaderRef.current,
        {
          yPercent: -100,
          duration: 1.3,
          ease: "expo.inOut",
        },
        "-=0.9",
      );
    }

    return () => clearInterval(interval);
  }, [percentage]);

  return (
    <div
      ref={preloaderRef}
      className="fixed inset-0 z-[9999] bg-background flex flex-col justify-between p-10 md:p-24 overflow-hidden"
      aria-hidden="true"
    >
      <div className="flex justify-between items-start relative z-10">
        <div className="overflow-hidden">
          <span className="preloader-reveal block text-[10px] uppercase tracking-[0.4em] font-black text-accent">
            WINCOR <span className="text-white/30">Agency</span>
          </span>
        </div>
        <div className="overflow-hidden hidden md:block">
          <span className="preloader-reveal block text-[10px] uppercase tracking-[0.4em] font-black text-white/10 italic">
            Initializing cinematic experience…
          </span>
        </div>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-end gap-10 relative z-10">
        <div className="max-w-[820px] overflow-hidden">
          <h1 className="preloader-reveal text-[14vw] md:text-[7vw] font-black leading-[0.85] uppercase tracking-tighter">
            Success <br />
            <span className="text-white/10 italic">Designed</span>
          </h1>
        </div>

        <div className="overflow-hidden">
          <div className="preloader-reveal flex items-baseline gap-4">
            <span className="text-[26vw] md:text-[12vw] font-black leading-none italic">
              {percentage}
            </span>
            <span className="text-[6vw] md:text-[2.5vw] text-accent font-black tracking-widest">
              %
            </span>
          </div>
        </div>
      </div>

      <div
        className="absolute bottom-0 left-0 h-[2px] bg-accent transition-all duration-300 shadow-[0_0_20px_rgba(0,191,255,0.75)]"
        style={{ width: `${percentage}%` }}
      />

      <div className="absolute inset-0 opacity-[0.03] pointer-events-none grid grid-cols-12 h-full w-full">
        {Array.from({ length: 12 }).map((_, i) => (
          <div key={i} className="border-r border-white/20 h-full" />
        ))}
      </div>
    </div>
  );
}

