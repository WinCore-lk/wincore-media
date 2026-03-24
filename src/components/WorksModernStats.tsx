"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { registerGsapPlugins, getScroller, prefersReducedMotion } from "@/lib/motion";

const stats = [
  {
    value: 12,
    suffix: "+",
    label: "Global Awards",
    desc: "Recognized for creative excellence at the highest level of digital craft.",
    image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=1600",
  },
  {
    value: 95,
    suffix: "%",
    label: "Loyalty Rate",
    desc: "Long-term partnerships founded on performance, trust, and evolution.",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=1600",
  },
  {
    value: 200,
    suffix: "+",
    label: "Live Platforms",
    desc: "High-performance digital products shipped for companies worldwide.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1600",
  },
  {
    value: 14,
    suffix: "m",
    label: "Global Reach",
    desc: "Connecting brands with millions of diverse users through cinematic motion.",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=1600",
  },
];

export default function WorksModernStats() {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    registerGsapPlugins();
    const scroller = getScroller();
    const reduced = prefersReducedMotion();
    if (reduced) return;

    const ctx = gsap.context(() => {
      const container = containerRef.current;
      if (!container) return;

      const items = gsap.utils.toArray(".stat-panel");
      const xPercent = -100 * (items.length - 1);

      gsap.to(items, {
        xPercent: xPercent,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          pin: true,
          scrub: 1.2,
          end: () => `+=${container.offsetWidth * 0.5}`,
          invalidateOnRefresh: true,
        },
      });

      // Parallax text inside panels
      items.forEach((item: any) => {
        const text = item.querySelector(".stat-text");
        const img = item.querySelector("img");
        
        gsap.to(text, {
          x: -100,
          opacity: 0.5,
          ease: "none",
          scrollTrigger: {
            trigger: item,
            containerAnimation: gsap.getById("stat-scroll"), // note: will need an id or use the tween
            start: "left center",
            end: "right center",
            scrub: true,
          }
        });

        gsap.to(img, {
          scale: 1.2,
          ease: "none",
          scrollTrigger: {
            trigger: item,
            start: "left right",
            end: "right left",
            scrub: true,
          }
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef} 
      className="relative h-screen bg-background overflow-hidden"
    >
      <div 
        ref={containerRef}
        className="flex h-full w-[400vw] will-change-transform"
      >
        {stats.map((stat, i) => (
          <div 
            key={i} 
            className="stat-panel relative h-full w-screen flex-shrink-0 flex items-center justify-center"
          >
            {/* Background Image */}
            <div className="absolute inset-0 z-0 scale-110">
              <Image 
                src={stat.image} 
                alt="" 
                fill 
                className="object-cover opacity-15 saturate-125 brightness-110" 
              />
              <div className={`absolute inset-0 bg-gradient-to-r from-white via-transparent to-white`} />
            </div>

            {/* Content */}
            <div className="stat-text relative z-10 text-center px-4 max-w-4xl">
              <span className="mb-6 inline-block text-[10px] font-black uppercase tracking-[0.8em] text-accent/60">
                Metric {i + 1}
              </span>
              <h2 className="font-heading text-[22vw] md:text-[18vw] font-black uppercase leading-none tracking-tighter text-foreground">
                {stat.value}
                <span className="text-black/5">{stat.suffix}</span>
              </h2>
              <div className="mt-8 flex flex-col items-center">
                <p className="text-xl md:text-3xl font-black uppercase tracking-tight text-foreground mb-4">
                  {stat.label}
                </p>
                <div className="h-px w-24 bg-accent/20 mb-6" />
                <p className="mx-auto max-w-lg text-base md:text-lg font-light leading-relaxed text-black/40">
                  {stat.desc}
                </p>
              </div>
            </div>

            {/* Side number indicator */}
            <div className="absolute bottom-12 right-12 text-[10vw] font-black text-black/[0.02] leading-none select-none">
              0{i + 1}
            </div>
          </div>
        ))}
      </div>

      {/* Progress Bar */}
      <div className="absolute bottom-0 left-0 h-1 w-full bg-black/5 overflow-hidden z-20">
        <div className="h-full bg-accent origin-left scale-x-0" id="stat-progress" />
      </div>

      {/* Intro Overlay */}
      <div className="pointer-events-none absolute inset-0 z-[5] bg-[radial-gradient(circle_at_center,transparent_0%,white_100%)] opacity-40" />
    </section>
  );
}
