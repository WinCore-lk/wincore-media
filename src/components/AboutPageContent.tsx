"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";
import {
  registerGsapPlugins,
  getScroller,
  scheduleScrollTriggerRefresh,
  prefersReducedMotion,
} from "@/lib/motion";
import { useLenis } from "@/context/LenisContext";
import { usePreloaderDone } from "@/context/PreloaderContext";
import Link from "next/link";
import { ArrowRight, Globe2, Sparkles, Target } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const TEAM = [
  {
    name: "Sanjaya",
    role: "Creative Director",
    desc: "Driving visual identities and crafting award-winning aesthetic experiences that redefine industry standards.",
    image: "https://images.unsplash.com/photo-1541577141970-eebc8375e6d6?auto=format&fit=crop&q=80",
  },
  {
    name: "Rina",
    role: "AI Lead",
    desc: "Integrating intelligent, generative models and optimized algorithms to power next-generation architectures.",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80",
  },
  {
    name: "Devin",
    role: "Tech Head",
    desc: "Architecting scaleable, robust digital ecosystems with high performance and zero-latency execution.",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80",
  },
  {
    name: "Amali",
    role: "Brand Strategy",
    desc: "Bridging the gap between creative vision and measurable, data-driven market outcomes.",
    image: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&q=80",
  },
];

const PHILOSOPHY = [
  {
    title: "Precision in Craft",
    text: "We believe in pixel-perfect execution. Every interaction, every animation, and every layout is meticulously designed to create an immersive digital experience.",
    icon: Sparkles,
  },
  {
    title: "Targeted Outcomes",
    text: "Beautiful design is only the beginning. We architect solutions that actively drive conversions, engagement, and measurable growth for boutique brands.",
    icon: Target,
  },
  {
    title: "Global Standards",
    text: "Operating out of Colombo with a global reach. We deliver elite-tier digital products that compete with top-tier agencies across Dubai, London, and New York.",
    icon: Globe2,
  },
];

const JOURNEY = [
  {
    num: "01",
    title: "Discover",
    desc: "Market, audience, and constraints into a focused brief.",
  },
  {
    num: "02",
    title: "Design",
    desc: "Concepts into production-ready systems and creative direction.",
  },
  {
    num: "03",
    title: "Deploy",
    desc: "Launch, measure, and refine for long-term growth.",
  },
];

export default function AboutPageContent() {
  const containerRef = useRef<HTMLDivElement>(null);
  const lenis = useLenis();
  const preloaderDone = usePreloaderDone();

  useEffect(() => {
    if (!lenis || !preloaderDone || !containerRef.current) return;

    registerGsapPlugins();
    const scroller = getScroller();
    const reduced = prefersReducedMotion();
    const ctx = gsap.context(() => {
      if (reduced) return;

      // Hero Entry Animation
      const heroHeadline = containerRef.current?.querySelector(".abt-hero-title");
      if (heroHeadline) {
        const split = new SplitType(heroHeadline as HTMLElement, { types: "lines,words" });
        gsap.fromTo(
          split.words,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1.2,
            stagger: 0.05,
            ease: "expo.out",
            delay: 0.2,
          }
        );
      }

      gsap.fromTo(
        ".abt-hero-fade",
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1.2, stagger: 0.15, ease: "power3.out", delay: 0.6 }
      );

      // Parallax image
      gsap.to(".abt-parallax-img", {
        yPercent: 30,
        ease: "none",
        scrollTrigger: {
          trigger: ".abt-hero-media",
          scroller,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });

      // Philosophy Sections Reveal
      const philosophyRows = gsap.utils.toArray<HTMLElement>(".abt-philosophy-row");
      philosophyRows.forEach((row, i) => {
        gsap.fromTo(
          row,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: row,
              scroller,
              start: "top 85%",
              once: true,
            },
          }
        );
      });

      // Team Cards Reveal
      const teamCards = gsap.utils.toArray<HTMLElement>(".abt-team-card");
      teamCards.forEach((card, i) => {
        gsap.fromTo(
          card,
          { opacity: 0, y: 40, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            ease: "back.out(1.2)",
            scrollTrigger: {
              trigger: card,
              scroller,
              start: "top 85%",
              once: true,
            },
          }
        );
      });

      // Journey Line Animation
      gsap.fromTo(
        ".abt-journey-line-fill",
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: ".abt-journey-container",
            scroller,
            start: "top 60%",
            end: "bottom 70%",
            scrub: true,
          },
        }
      );

      const journeySteps = gsap.utils.toArray<HTMLElement>(".abt-journey-step");
      journeySteps.forEach((step) => {
        gsap.fromTo(
          step,
          { opacity: 0, x: -30 },
          {
            opacity: 1,
            x: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: step,
              scroller,
              start: "top 80%",
              once: true,
            },
          }
        );
      });
      
    }, containerRef);

    scheduleScrollTriggerRefresh();
    return () => ctx.revert();
  }, [lenis, preloaderDone]);

  return (
    <div ref={containerRef} className="bg-background min-h-screen text-foreground">
      
      {/* 1. HERO SECTION */}
      <section className="relative px-6 pt-40 pb-20 md:px-12 md:pt-56 md:pb-32 lg:px-24 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(0,191,255,0.05),transparent_70%)] pointer-events-none" />
        
        <div className="max-w-[1400px] mx-auto relative z-10">
          <p className="abt-hero-fade text-[10px] md:text-[11px] font-black uppercase tracking-[0.4em] text-accent mb-6 md:mb-10">
            About Wincore
          </p>
          <h1 className="abt-hero-title font-heading text-[12vw] md:text-[8vw] lg:text-[7rem] font-black uppercase leading-[0.9] tracking-tighter mb-8 md:mb-12">
            boutique standard. <br />
            <span className="text-black/20 italic font-light tracking-tight">global execution.</span>
          </h1>
          <div className="abt-hero-fade flex flex-col md:flex-row md:items-end justify-between gap-10 border-t border-black/10 pt-10">
            <p className="text-lg md:text-xl font-light text-black/60 max-w-2xl leading-relaxed">
              We are a collective of digital craftsmen focused on pushing visual boundaries.
              By blending high-end aesthetic design with mercilessly fast engineering, we position our clients at the forefront of their industries.
            </p>
            <div className="flex flex-col gap-2">
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-black/30">Headquarters</span>
              <span className="text-base font-medium">Colombo, Sri Lanka</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. SHOWCASE MEDIA */}
      <section className="px-5 md:px-10 lg:px-12 pb-24 md:pb-40">
        <div className="abt-hero-media relative w-full h-[60vh] md:h-[80vh] rounded-[2.5rem] overflow-hidden bg-black/5">
          <Image
            src="https://images.unsplash.com/photo-1600607686527-6fb886090705?auto=format&fit=crop&q=80"
            alt="Wincore Culture"
            fill
            className="abt-parallax-img object-cover object-center scale-[1.3]"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
        </div>
      </section>

      {/* 3. PHILOSOPHY */}
      <section className="px-6 md:px-12 lg:px-24 pb-32 md:pb-48">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
          <div className="lg:col-span-5">
            <h2 className="text-[3rem] md:text-[4rem] font-black uppercase leading-[0.95] tracking-tighter text-foreground mb-6">
              Our <br /> Manifesto
            </h2>
            <p className="text-base text-black/50 font-light leading-relaxed max-w-sm">
              We don&apos;t just build websites; we architect digital flagships. Our philosophy stems from the uncompromising belief that every brand deserves an editorial, cinematic presence.
            </p>
          </div>
          <div className="lg:col-span-7 flex flex-col gap-12 md:gap-16 pt-8 lg:pt-0">
            {PHILOSOPHY.map((item, idx) => (
              <div key={idx} className="abt-philosophy-row flex gap-6 md:gap-8 items-start group">
                <div className="shrink-0 flex items-center justify-center w-14 h-14 rounded-full border border-black/10 bg-black/[0.02] group-hover:bg-accent group-hover:border-accent transition-all duration-500">
                  <item.icon className="text-black/40 group-hover:text-white transition-colors duration-500" size={24} strokeWidth={1.5} />
                </div>
                <div>
                  <h3 className="text-xl md:text-2xl font-bold tracking-tight mb-3 group-hover:text-accent transition-colors duration-300">
                    {item.title}
                  </h3>
                  <p className="text-black/50 font-light leading-relaxed text-sm md:text-base">
                    {item.text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. THE JOURNEY (HOW WE WORK) */}
      <section className="px-6 md:px-12 lg:px-24 pb-32 md:pb-48 mt-12 md:mt-24">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
          <div className="lg:col-span-5">
            <p className="text-[11px] font-black uppercase tracking-[0.4em] text-accent mb-6">
              How we work
            </p>
            <h2 className="text-[3rem] md:text-[4.5rem] font-black uppercase leading-[0.95] tracking-tighter text-foreground mb-6">
              Discover <br />
              <span className="text-black/20 italic">&rarr;</span> Design <br />
              <span className="text-black/20 italic">&rarr;</span> Deploy
            </h2>
            <div className="mt-12 md:mt-20 bg-black/[0.03] rounded-3xl p-8 border border-black/5 relative overflow-hidden group">
              <div className="absolute inset-0 bg-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative z-10">
                <p className="text-[11px] font-black uppercase tracking-[0.2em] text-black/40 mb-3">Next step</p>
                <p className="text-xl md:text-2xl font-bold tracking-tight mb-8">Tell us what you&apos;re building &mdash; we&apos;ll scope it.</p>
                <Link
                  href="/contact"
                  className="group/btn relative inline-flex items-center justify-center gap-3 overflow-hidden rounded-xl bg-black px-6 py-4 transition-all duration-300 hover:shadow-[0_15px_30px_rgba(0,0,0,0.15)]"
                >
                  <span className="relative z-10 text-[10px] font-black uppercase tracking-[0.2em] text-white">
                    Start the journey
                  </span>
                  <div className="absolute inset-0 bg-accent translate-y-[100%] transition-transform duration-500 group-hover/btn:translate-y-0" />
                </Link>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 abt-journey-container relative pt-8 lg:pt-0">
            {/* The Background Line */}
            <div className="absolute left-[27px] md:left-[39px] top-6 bottom-6 w-[2px] bg-black/10 rounded-full" />
            {/* The Animated Fill Line */}
            <div className="abt-journey-line-fill absolute left-[27px] md:left-[39px] top-6 bottom-6 w-[2px] bg-accent origin-top rounded-full" />

            <div className="flex flex-col gap-16 md:gap-24 relative z-10 w-full">
              {JOURNEY.map((step, idx) => (
                <div key={idx} className="abt-journey-step flex gap-8 md:gap-12 items-start relative group">
                  <div className="shrink-0 w-14 h-14 md:w-20 md:h-20 rounded-full bg-background border border-black/10 group-hover:border-accent flex items-center justify-center relative z-10 transition-colors duration-500 shadow-[0_8px_16px_rgba(0,0,0,0.03)] group-hover:shadow-[0_16px_32px_rgba(0,191,255,0.15)]">
                    <span className="text-xs md:text-sm font-black tracking-widest text-black/30 group-hover:text-accent transition-colors duration-500">
                      {step.num}
                    </span>
                  </div>
                  <div className="pt-2 md:pt-4">
                    <h3 className="text-3xl md:text-4xl font-black uppercase tracking-tighter mb-4 group-hover:text-accent transition-colors duration-300">
                      {step.title}
                    </h3>
                    <p className="text-base md:text-lg text-black/50 font-light leading-relaxed max-w-sm">
                      {step.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 5. THE SQUAD */}
      <section className="px-6 md:px-12 lg:px-24 pb-32 md:pb-48 bg-black/[0.02] rounded-t-[3rem] md:rounded-t-[5rem] pt-24 md:pt-32 border-t border-black/5">
        <div className="max-w-[1400px] mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20 md:mb-28">
            <div>
              <p className="text-[11px] font-black uppercase tracking-[0.4em] text-accent mb-5">
                The Architects
              </p>
              <h2 className="text-[3rem] md:text-[5rem] font-black uppercase leading-[0.95] tracking-tighter">
                Meet the Team
              </h2>
            </div>
            <p className="max-w-md text-base text-black/50 font-light leading-relaxed">
              A boutique squad means zero bloat and direct communication. You work closely with the people who actually build your product.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {TEAM.map((member, i) => (
              <div key={i} className="abt-team-card group relative flex flex-col gap-6">
                <div className="relative aspect-[3/4] w-full overflow-hidden rounded-[2rem] bg-black/10">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover object-center transition-transform duration-1000 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/10 transition-opacity duration-500 group-hover:opacity-0" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold tracking-tight mb-1">{member.name}</h3>
                  <p className="text-[10px] font-black uppercase tracking-[0.3em] text-accent mb-4">{member.role}</p>
                  <p className="text-sm font-light leading-relaxed text-black/50 line-clamp-3">
                    {member.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. CTA SECTION */}
      <section className="px-6 py-24 md:py-40 md:px-12 lg:px-24 bg-white relative overflow-hidden">
        <div className="max-w-[1400px] mx-auto flex flex-col items-center text-center">
          <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-accent/10 flex items-center justify-center mb-8 border border-accent/20">
            <ArrowRight className="text-accent" size={28} />
          </div>
          <h2 className="text-[10vw] md:text-[6vw] font-black uppercase leading-[0.95] tracking-tighter mb-8 max-w-4xl text-balance">
            Let&apos;s build the extraordinary.
          </h2>
          <Link
            href="/contact"
            className="group relative flex items-center justify-center gap-3 overflow-hidden rounded-2xl bg-black px-8 py-5 transition-all duration-300 hover:shadow-[0_20px_40px_rgba(0,0,0,0.2)] md:px-10 md:py-6"
          >
            <span className="relative z-10 text-[11px] font-black uppercase tracking-[0.2em] text-white md:text-[13px]">
              Initiate a project
            </span>
            <div className="absolute inset-0 bg-accent translate-y-[100%] transition-transform duration-500 group-hover:translate-y-0" />
          </Link>
        </div>
      </section>
    </div>
  );
}
