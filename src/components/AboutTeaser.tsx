"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const team = [
  {
    name: "Sanjaya",
    role: "Creative Director",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80",
  },
  {
    name: "Rina",
    role: "AI Lead",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80",
  },
  {
    name: "Devin",
    role: "Tech Head",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80",
  },
  {
    name: "Amali",
    role: "Brand Strategy",
    image:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80",
  },
];

const stats = [
  { value: 10, suffix: "+", label: "Years" },
  { value: 200, suffix: "+", label: "Campaigns" },
];

export default function AboutTeaser() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.set(".abt-title-line", { yPercent: 120 });

      const intro = gsap.timeline({
        defaults: { ease: "expo.out" },
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          once: true,
        },
      });

      intro
        .fromTo(
          ".abt-kicker",
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.55 },
        )
        .to(
          ".abt-title-line",
          { yPercent: 0, duration: 1, stagger: 0.08 },
          "-=0.15",
        )
        .fromTo(
          ".abt-lead",
          { y: 30, opacity: 0, filter: "blur(8px)" },
          { y: 0, opacity: 1, filter: "blur(0px)", duration: 0.75 },
          "-=0.55",
        )
        .fromTo(
          ".abt-rule",
          { scaleX: 0, transformOrigin: "left" },
          { scaleX: 1, duration: 0.65, ease: "power2.out" },
          "-=0.45",
        );

      gsap.fromTo(
        ".abt-stat-card",
        { y: 45, opacity: 0, scale: 0.97 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".abt-stats",
            start: "top 86%",
            once: true,
          },
        },
      );

      const countTargets = gsap.utils.toArray<HTMLElement>(".abt-counter");
      countTargets.forEach((el) => {
        const value = Number(el.dataset.target || "0");
        const counter = { value: 0 };

        gsap.to(counter, {
          value,
          duration: 1.5,
          ease: "power2.out",
          scrollTrigger: {
            trigger: el,
            start: "top 92%",
            once: true,
          },
          onUpdate: () => {
            el.textContent = Math.round(counter.value).toString();
          },
        });
      });

      gsap.fromTo(
        ".abt-photo-card",
        { y: 60, opacity: 0, clipPath: "inset(16% 0 0 0 round 1.25rem)" },
        {
          y: 0,
          opacity: 1,
          clipPath: "inset(0% 0 0 0 round 1.25rem)",
          duration: 1.15,
          stagger: 0.08,
          ease: "expo.out",
          scrollTrigger: {
            trigger: ".abt-gallery",
            start: "top 84%",
            once: true,
          },
        },
      );

      gsap.to("[data-about-shift]", {
        yPercent: -10,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      data-chapter="custom"
      className="chapter relative overflow-hidden border-t border-white/5 bg-background py-[14vw]"
      aria-label="About"
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[-10rem] top-24 h-72 w-72 rounded-full bg-accent/10 blur-3xl" />
      </div>

      <div
        data-watermark
        className="pointer-events-none absolute left-[-8vw] top-1/2 -translate-y-1/2 select-none whitespace-nowrap text-[36vw] font-black uppercase italic text-white/[0.02]"
      >
        Studio
      </div>

      <div className="chapter-inner _container relative z-10">
        <div className="grid grid-cols-1 items-start gap-14 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-5">
            <p className="abt-kicker mb-8 text-[11px] font-black uppercase tracking-[0.48em] text-secondary">
              About
            </p>

            <h2 className="mb-7 text-[11.5vw] font-black uppercase leading-[0.84] tracking-tighter md:text-[5.4vw]">
              <span className="block overflow-hidden">
                <span className="abt-title-line block">Colombo-based.</span>
              </span>
              <span className="block overflow-hidden">
                <span className="abt-title-line block text-white/20 italic">Globally delivered.</span>
              </span>
            </h2>

            <p className="abt-lead max-w-[52ch] text-lg font-light leading-relaxed text-white/60 md:text-xl">
              10+ years turning numbers into stories. A tight team of strategists, designers,
              filmmakers, and builders creating high-end digital work with measurable outcomes.
            </p>

            <div className="abt-rule mt-7 h-px w-full max-w-md bg-gradient-to-r from-accent via-white/15 to-transparent" />

            <div className="abt-stats mt-7 grid grid-cols-1 gap-4 sm:grid-cols-2">
              {stats.map((item) => (
                <article
                  key={item.label}
                  className="abt-stat-card rounded-2xl border border-white/10 bg-white/[0.03] p-5"
                >
                  <p className="mb-3 text-[10px] font-black uppercase tracking-[0.35em] text-white/35">
                    {item.label}
                  </p>
                  <div className="flex items-baseline gap-1">
                    <span className="abt-counter text-5xl font-black leading-none md:text-6xl" data-target={item.value}>
                      0
                    </span>
                    <span className="text-3xl font-bold text-accent md:text-4xl">{item.suffix}</span>
                  </div>
                </article>
              ))}
            </div>
          </div>

          <div data-about-shift className="abt-gallery grid grid-cols-2 gap-4 md:gap-5 lg:col-span-7">
            {team.map((member, index) => (
              <article
                key={member.name}
                className={`abt-photo-card group relative overflow-hidden border border-white/10 bg-muted/40 ${
                  index === 0
                    ? "col-span-2 h-[250px] rounded-[1.5rem] md:h-[300px]"
                    : "h-[215px] rounded-[1.3rem] md:h-[250px]"
                }`}
              >
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover grayscale transition-all duration-[1200ms] group-hover:scale-[1.06] group-hover:grayscale-0"
                  sizes="(max-width: 768px) 100vw, 600px"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />
                <div className="absolute inset-0 flex translate-y-4 flex-col justify-end p-5 transition-transform duration-500 group-hover:translate-y-0 md:p-6">
                  <p className="text-lg font-bold text-white md:text-xl">{member.name}</p>
                  <p className="text-[10px] font-black uppercase tracking-[0.36em] text-accent opacity-0 transition-opacity delay-100 group-hover:opacity-100">
                    {member.role}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
