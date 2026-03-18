"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

const SERVICES = [
  {
    title: "Digital-First Branding",
    image:
      "https://images.unsplash.com/photo-1554469384-e58fac16e23a?auto=format&fit=crop&q=80&w=1200",
    desc: "Identity systems engineered for authority across channels.",
  },
  {
    title: "Social Media & Influencer Marketing",
    image:
      "https://images.unsplash.com/photo-1520975958221-7d9d0f1b7aa2?auto=format&fit=crop&q=80&w=1200",
    desc: "Campaign narratives designed for reach, retention, and action.",
  },
  {
    title: "Motion Video & 3D Animation",
    image:
      "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&q=80&w=1200",
    desc: "Cinematic motion language built to stop the scroll.",
  },
  {
    title: "AI-Powered Website Development",
    image:
      "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=1200",
    desc: "Modern builds, AI-accelerated workflows, premium performance.",
    link: "https://winpro-ai-site.vercel.app",
  },
  {
    title: "Performance Marketing & Ads",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1200",
    desc: "Data-first growth strategies with creative that converts.",
  },
  {
    title: "UX/UI + WebGL Experiences",
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1200",
    desc: "Immersive digital architecture built for 2026® experiences.",
  },
];

export default function ServiceCards() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const followerRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".service-row-anim",
        { y: 100, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.4,
          stagger: 0.08,
          ease: "expo.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 85%",
          },
        },
      );
    }, sectionRef);

    const moveFollower = (e: MouseEvent) => {
      if (followerRef.current && activeIndex !== null) {
        gsap.to(followerRef.current, {
          x: e.clientX,
          y: e.clientY,
          duration: 0.8,
          ease: "power3.out",
        });
      }
    };

    window.addEventListener("mousemove", moveFollower);
    return () => {
      window.removeEventListener("mousemove", moveFollower);
      ctx.revert();
    };
  }, [activeIndex]);

  return (
    <section
      id="services"
      ref={sectionRef}
      className="py-[15vw] bg-background relative overflow-hidden border-t border-white/5"
      aria-label="Services"
    >
      <div className="absolute bottom-[-10vw] left-[-5vw] text-[30vw] font-black text-white/[0.02] pointer-events-none select-none uppercase italic whitespace-nowrap">
        Services®
      </div>

      <div className="_container relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end gap-12 mb-24 md:mb-32">
          <div>
            <p className="text-accent text-[11px] uppercase tracking-[0.6em] font-black mb-8 italic">
              Capabilities
            </p>
            <h2 className="text-[12vw] md:text-[6vw] leading-[0.85] font-black uppercase tracking-tighter">
              Building <br />
              <span className="text-white/10 italic">Impact</span>
            </h2>
          </div>
          <div className="max-w-[420px]">
            <p className="text-white/30 text-lg md:text-xl font-light leading-relaxed">
              We bridge AI precision with cinematic strategy. Every service is a brick in your brand&apos;s
              digital empire.
            </p>
          </div>
        </div>

        <div className="flex flex-col">
          {SERVICES.map((s, i) => (
            <div
              key={s.title}
              onMouseEnter={() => setActiveIndex(i)}
              onMouseLeave={() => setActiveIndex(null)}
              className="service-row-anim group relative py-14 md:py-20 border-b border-white/5 flex flex-col md:flex-row justify-between items-center transition-all"
            >
              <div className="absolute inset-x-[-5vw] inset-y-0 bg-white/5 scale-y-0 group-hover:scale-y-100 transition-transform duration-700 origin-bottom" />

              <div className="relative z-10 flex items-baseline gap-8 md:gap-12 group-hover:translate-x-6 transition-transform duration-700">
                <span className="text-accent font-black text-lg italic opacity-30 group-hover:opacity-100 transition-opacity">
                  0{i + 1}
                </span>
                <h3 className="text-[9.5vw] md:text-[4.5vw] font-black uppercase tracking-tighter leading-none">
                  {s.title}
                </h3>
              </div>

              <div className="relative z-10 max-w-[420px] text-center md:text-right mt-8 md:mt-0 group-hover:translate-x-[-1.5rem] transition-transform duration-700">
                <p className="text-white/40 font-light text-lg md:text-xl leading-snug group-hover:text-white/80 transition-colors">
                  {s.desc}
                </p>
                <div className="mt-6 flex items-center justify-center md:justify-end gap-3 text-accent opacity-0 group-hover:opacity-100 transition-all duration-700 translate-y-4 group-hover:translate-y-0">
                  <span className="text-[10px] uppercase tracking-widest font-black">
                    {s.link ? "Open WinPro AI" : "More Info"}
                  </span>
                  <ArrowUpRight size={16} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div
        ref={followerRef}
        className={`fixed top-0 left-0 w-[320px] md:w-[400px] h-[440px] md:h-[550px] pointer-events-none z-[50] overflow-hidden rounded-3xl transition-opacity duration-700 ${
          activeIndex !== null ? "opacity-100 scale-100" : "opacity-0 scale-95"
        }`}
        style={{ transform: "translate(-50%, -50%)" }}
        aria-hidden="true"
      >
        {SERVICES.map((s, i) => (
          <div
            key={s.title}
            className={`absolute inset-0 transition-opacity duration-700 ${
              activeIndex === i ? "opacity-100" : "opacity-0"
            }`}
          >
            <Image src={s.image} alt={s.title} fill className="object-cover grayscale" sizes="400px" />
            <div className="absolute inset-0 bg-accent/20 mix-blend-overlay" />
          </div>
        ))}
      </div>
    </section>
  );
}

