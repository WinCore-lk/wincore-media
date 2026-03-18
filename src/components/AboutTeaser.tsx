"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const team = [
  { name: "Sanjaya", role: "Creative Director", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80" },
  { name: "Rina", role: "AI Lead", image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80" },
  { name: "Devin", role: "Tech Head", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80" },
  { name: "Amali", role: "Brand Strategy", image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80" },
];

export default function AboutTeaser() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".about-reveal",
        { y: 90, opacity: 0, filter: "blur(10px)" },
        {
          y: 0,
          opacity: 1,
          filter: "blur(0px)",
          duration: 1.2,
          stagger: 0.08,
          ease: "expo.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
          },
        },
      );

      gsap.fromTo(
        ".about-card",
        { y: 50, opacity: 0, scale: 0.97 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 1.0,
          stagger: 0.06,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 70%",
          },
        },
      );

      gsap.to("[data-about-parallax]", {
        yPercent: -14,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about"
      ref={containerRef}
      className="chapter relative py-[14vw] bg-background border-t border-white/5 overflow-hidden"
      aria-label="About"
    >
      <div
        data-watermark
        className="absolute top-1/2 left-[-10vw] -translate-y-1/2 text-[40vw] font-black text-white/[0.02] pointer-events-none select-none uppercase italic whitespace-nowrap"
      >
        Studio
      </div>

      <div className="chapter-inner _container relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-20 items-start">
          <div>
            <span className="about-reveal text-secondary font-bold uppercase tracking-[0.55em] text-[11px] mb-8 italic block">
              About
            </span>
            <h2 className="about-reveal text-[12vw] md:text-[6vw] font-black leading-[0.85] uppercase tracking-tighter mb-10">
              Colombo‑based. <br />
              <span className="text-white/10 italic">Globally</span> delivered.
            </h2>
            <p className="about-reveal text-white/45 text-lg md:text-xl font-light leading-relaxed mb-10 max-w-[52ch]">
              10+ years turning numbers into stories. A tight team of strategists, designers, filmmakers, and builders creating high-end digital work with measurable outcomes.
            </p>

            <div className="about-reveal flex flex-wrap gap-10">
              <div>
                <p className="text-5xl md:text-6xl font-black text-white leading-none">10+</p>
                <p className="text-[10px] uppercase tracking-[0.4em] text-white/30 font-black mt-3">Years</p>
              </div>
              <div>
                <p className="text-5xl md:text-6xl font-black text-white leading-none">200+</p>
                <p className="text-[10px] uppercase tracking-[0.4em] text-white/30 font-black mt-3">Campaigns</p>
              </div>
            </div>
          </div>

          <div data-about-parallax className="grid grid-cols-2 gap-4 md:gap-6">
            {team.map((member, index) => (
              <div
                key={index}
                className="about-card relative h-[240px] md:h-[360px] overflow-hidden rounded-[1.75rem] group border border-white/10 bg-muted/30"
              >
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover transition-transform duration-[1200ms] group-hover:scale-[1.08] grayscale group-hover:grayscale-0"
                  sizes="(max-width: 768px) 50vw, 300px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute inset-0 flex flex-col justify-end p-5 md:p-6 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  <p className="text-lg md:text-xl font-bold text-white">{member.name}</p>
                  <p className="text-[10px] uppercase tracking-[0.4em] text-accent font-black opacity-0 group-hover:opacity-100 transition-opacity delay-100">
                    {member.role}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
