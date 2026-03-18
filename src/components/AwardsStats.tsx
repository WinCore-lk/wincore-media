"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const stats = [
  {
    value: 12,
    label: "Local & International Awards",
    suffix: "+",
  },
  {
    value: 95,
    label: "Client Retention Rate",
    suffix: "%",
  },
  {
    value: 200,
    label: "Campaigns Delivered",
    suffix: "+",
  },
  {
    value: 10,
    label: "Years of Digital Excellence",
    suffix: "y",
  },
];

export default function AwardsStats() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const numbers = gsap.utils.toArray<HTMLElement>(".stat-number");
      
      numbers.forEach((num) => {
        const targetValue = parseInt(num.getAttribute("data-target") || "0");
        
        gsap.to(num, {
          textContent: targetValue,
          duration: 2.5,
          ease: "power2.out",
          scrollTrigger: {
            trigger: num,
            start: "top 85%",
          },
          onUpdate: function() {
            num.textContent = Math.round(Number(num.textContent)).toString();
          },
        });
      });

      gsap.fromTo(
        ".awards-intro",
        { y: 50, opacity: 0, filter: "blur(8px)" },
        {
          y: 0,
          opacity: 1,
          filter: "blur(0px)",
          duration: 1,
          stagger: 0.08,
          ease: "expo.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 78%" },
        },
      );

      gsap.fromTo(
        ".award-card",
        { y: 80, opacity: 0, scale: 0.96 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 1.2,
          stagger: 0.08,
          ease: "expo.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 70%" },
        },
      );

      // Background decorative animation
      gsap.to(".awards-bg-circle", {
        scale: 1.5,
        opacity: 0.3,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="chapter relative py-[14vw] bg-background overflow-hidden border-t border-white/5"
      aria-label="Awards and stats"
    >
      <div
        data-watermark
        className="absolute top-1/2 left-[-8vw] -translate-y-1/2 text-[38vw] font-black text-white/[0.02] pointer-events-none select-none uppercase italic whitespace-nowrap"
      >
        Achievements
      </div>

      {/* Decorative Circles */}
      <div className="awards-bg-circle absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 border border-accent/10 rounded-full pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] border border-white/5 rounded-full pointer-events-none" />

      <div className="chapter-inner _container relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end gap-12 mb-16 md:mb-24">
          <div>
            <span className="awards-intro text-secondary font-bold uppercase tracking-[0.55em] text-[11px] mb-8 italic block">
              Achievements
            </span>
            <h2 className="awards-intro text-[10vw] md:text-[5vw] font-black leading-[0.85] uppercase tracking-tighter max-w-[14ch]">
              Winning results <span className="text-white/10 italic">that lead</span>
            </h2>
          </div>
          <p className="awards-intro text-white/35 text-lg md:text-xl font-light max-w-[420px] leading-relaxed">
            Awards are a signal. Outcomes are the standard. We build systems that perform and visuals that move.
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="award-card group flex flex-col items-center text-center rounded-[2rem] border border-white/10 bg-muted/40 backdrop-blur-xl p-7 md:p-10 transition-transform duration-700 hover:-translate-y-2"
            >
              <div className="mb-4">
                <span 
                    className="stat-number text-5xl md:text-8xl font-black text-white tracking-tighter"
                    data-target={stat.value}
                >
                    0
                </span>
                <span className="text-3xl md:text-5xl font-bold text-accent">{stat.suffix}</span>
              </div>
              <p className="text-sm md:text-base text-white/40 font-bold uppercase tracking-widest max-w-[150px]">
                {stat.label}
              </p>
              
              {/* Divider line that glows on hover */}
              <div className="w-10 h-px bg-white/10 mt-8 group-hover:w-24 group-hover:bg-accent transition-all duration-700" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
