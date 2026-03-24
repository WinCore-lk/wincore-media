"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import SplitType from "split-type";
import { registerGsapPlugins, prefersReducedMotion } from "@/lib/motion";
import dynamic from "next/dynamic";

const WorksScene = dynamic(() => import("@/components/WorksScene"), { ssr: false });

export default function WorksHero() {
  const rootRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    registerGsapPlugins();
    const reduced = prefersReducedMotion();
    if (reduced) return;

    const ctx = gsap.context(() => {
      const h1 = titleRef.current?.querySelector("h1");
      if (h1) {
        const split = new SplitType(h1, { types: "chars,lines" });
        gsap.set(split.chars, { 
          opacity: 0,
          scale: 0.2,
          y: 60,
          filter: "blur(15px)"
        });

        const revealTl = gsap.timeline({ delay: 0.5 });
        
        revealTl.to(split.chars, {
          opacity: 1,
          scale: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 1.8,
          stagger: 0.02,
          ease: "expo.out",
        })
        .from(".scene-wrap", {
          opacity: 0,
          scale: 1.2,
          duration: 3,
          ease: "power2.out"
        }, "-=1.8");

        // Cinematic Pull-back on scroll
        gsap.to(rootRef.current, {
          scale: 0.92,
          opacity: 0.6,
          filter: "blur(10px)",
          ease: "none",
          scrollTrigger: {
            trigger: rootRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 1.2,
          }
        });
      }

      gsap.from(".hero-sub", {
        y: 40,
        opacity: 0,
        duration: 1.5,
        ease: "power4.out",
        stagger: 0.15,
        delay: 1.2,
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={rootRef}
      className="relative min-h-[90vh] flex flex-col items-center justify-center overflow-hidden bg-background px-4 pt-40 pb-16 md:px-8 md:pt-48 md:pb-20"
    >
      <div className="scene-wrap absolute inset-0 opacity-10 mix-blend-multiply pointer-events-none">
        <WorksScene />
      </div>

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(255,255,255,0.8)_80%)] z-1" />
      
      <div className="relative z-10 w-full max-w-[1240px] text-center">
        <div ref={titleRef} className="flex flex-col items-center">
          <span className="hero-sub mb-8 inline-flex items-center gap-4 px-6 py-2.5 rounded-full border border-black/5 bg-black/[0.04] backdrop-blur-2xl">
            <span className="w-2.5 h-2.5 rounded-full bg-accent shadow-[0_0_15px_rgba(0,136,204,0.5)] animate-pulse" />
            <span className="text-[11px] font-black uppercase tracking-[0.5em] text-black/40">Selected Archive 2024</span>
          </span>
          
          <h1 className="font-heading text-[16vw] sm:text-[14vw] md:text-[10vw] lg:text-[9vw] font-black uppercase leading-[0.82] tracking-tighter text-foreground mix-blend-darken filter drop-shadow-[0_0_40px_rgba(255,255,255,0.8)]">
            World-class <br />
            <span className="text-black/15 italic font-light tracking-[-0.08em] hover:text-black transition-colors duration-1000 cursor-default">creativity</span>
          </h1>
          
          <p className="hero-sub mx-auto mt-16 max-w-3xl text-lg font-light leading-relaxed text-black/40 md:text-xl md:leading-relaxed">
            Crafting cinematic digital experiences that blend <br />
            <span className="text-black/80 font-medium italic underline decoration-accent/30 underline-offset-8">strategic logic with creative wonder.</span>
          </p>

          {/* Mouse hint icon logic is handled via GSAP entrance */}
          <div className="hero-sub mt-20 flex flex-col items-center animate-bounce-slow">
             <div className="w-6 h-10 rounded-full border border-black/10 flex items-start justify-center p-1.5">
               <div className="w-1 h-2 rounded-full bg-accent" />
             </div>
          </div>
        </div>
      </div>
    </section>
  );
}
