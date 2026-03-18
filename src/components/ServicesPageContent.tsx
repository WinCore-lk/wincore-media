"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import type { ComponentType } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ArrowUpRight,
  Bot,
  ChartNoAxesCombined,
  Layers,
  Monitor,
  Sparkles,
  Video,
} from "lucide-react";

type ServiceItem = {
  title: string;
  summary: string;
  outcomes: string[];
  icon: ComponentType<{ size?: number | string; className?: string }>;
  link?: string;
};

const SERVICES: ServiceItem[] = [
  {
    title: "Digital-First Branding",
    summary:
      "Identity systems, visual language, and brand architecture built for modern channels.",
    outcomes: ["Naming and strategy", "Brand systems", "Guidelines and rollout"],
    icon: Layers,
  },
  {
    title: "Social Media and Influence",
    summary:
      "Editorial systems and creator partnerships that grow communities and measurable demand.",
    outcomes: ["Content pillars", "Campaign planning", "Influencer alignment"],
    icon: Sparkles,
  },
  {
    title: "Motion Video and 3D",
    summary:
      "High-impact motion assets and product storytelling tailored for paid and organic channels.",
    outcomes: ["Explainer reels", "3D motion design", "Cutdowns for ads"],
    icon: Video,
  },
  {
    title: "AI-Powered Web Development",
    summary:
      "Premium websites accelerated with AI workflows while keeping quality, speed, and conversion first.",
    outcomes: ["Rapid prototyping", "Performance optimization", "Scalable CMS architecture"],
    icon: Bot,
    link: "https://winpro-ai-site.vercel.app",
  },
  {
    title: "Performance Marketing",
    summary:
      "Full-funnel paid campaigns and analytics loops that optimize spend and maximize revenue.",
    outcomes: ["Paid strategy", "Creative testing", "Attribution and reporting"],
    icon: ChartNoAxesCombined,
  },
  {
    title: "UX/UI and WebGL Experiences",
    summary:
      "Immersive interfaces and interactive product journeys engineered for memorability.",
    outcomes: ["Experience design", "Interaction systems", "WebGL implementation"],
    icon: Monitor,
  },
];

const PROCESS = [
  {
    step: "01",
    title: "Discover",
    text: "We map your market, audience, and constraints into a clear strategic brief.",
  },
  {
    step: "02",
    title: "Design",
    text: "We shape concepts into production-ready systems with clear creative direction.",
  },
  {
    step: "03",
    title: "Deploy and Scale",
    text: "We launch, test, and continuously optimize for long-term growth.",
  },
];

export default function ServicesPageContent() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const cleanupFns: Array<() => void> = [];

    const ctx = gsap.context(() => {
      const introTl = gsap.timeline({ defaults: { ease: "power3.out" } });

      introTl
        .fromTo(
          ".svc-kicker",
          { y: 24, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6 },
        )
        .fromTo(
          ".svc-title-line",
          { yPercent: 120 },
          {
            yPercent: 0,
            duration: 1,
            stagger: 0.08,
            ease: "expo.out",
          },
          "-=0.15",
        )
        .fromTo(
          ".svc-lead",
          { y: 28, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.75 },
          "-=0.65",
        );

      gsap.to(".svc-hero", {
        yPercent: -12,
        ease: "none",
        scrollTrigger: {
          trigger: rootRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      gsap.fromTo(
        ".svc-card",
        { y: 64, opacity: 0, scale: 0.98 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.9,
          ease: "power3.out",
          stagger: 0.08,
          scrollTrigger: {
            trigger: ".svc-card-grid",
            start: "top 78%",
          },
        },
      );

      gsap.fromTo(
        ".svc-process, .svc-cta",
        { y: 56, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          stagger: 0.16,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".svc-process",
            start: "top 82%",
          },
        },
      );

      const cards = gsap.utils.toArray<HTMLElement>(".svc-card");
      cards.forEach((card) => {
        const toRX = gsap.quickTo(card, "rotationX", { duration: 0.28, ease: "power2.out" });
        const toRY = gsap.quickTo(card, "rotationY", { duration: 0.28, ease: "power2.out" });
        const toY = gsap.quickTo(card, "y", { duration: 0.28, ease: "power2.out" });

        gsap.set(card, { transformPerspective: 900, transformOrigin: "center" });

        const onMove = (event: MouseEvent) => {
          const rect = card.getBoundingClientRect();
          const px = (event.clientX - rect.left) / rect.width;
          const py = (event.clientY - rect.top) / rect.height;

          toRX((py - 0.5) * -8);
          toRY((px - 0.5) * 10);
          toY(-6);
        };

        const onLeave = () => {
          toRX(0);
          toRY(0);
          toY(0);
        };

        card.addEventListener("mousemove", onMove);
        card.addEventListener("mouseleave", onLeave);
        cleanupFns.push(() => {
          card.removeEventListener("mousemove", onMove);
          card.removeEventListener("mouseleave", onLeave);
        });
      });

    }, rootRef);

    return () => {
      cleanupFns.forEach((fn) => fn());
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={rootRef}
      className="relative overflow-hidden border-t border-white/5 bg-background pt-36 md:pt-44"
      aria-label="Services overview"
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[-12rem] top-28 h-80 w-80 rounded-full bg-accent/15 blur-3xl" />
        <div className="absolute bottom-[-8rem] right-[-8rem] h-96 w-96 rounded-full bg-secondary/15 blur-3xl" />
      </div>

      <div className="_container relative z-10">
        <div className="svc-hero mb-20 md:mb-24">
          <p className="svc-kicker mb-6 text-[11px] font-black uppercase tracking-[0.5em] text-accent">
            Services
          </p>
          <h1 className="max-w-5xl text-[13vw] font-black uppercase leading-[0.85] tracking-tighter md:text-[6.2vw]">
            <span className="block overflow-hidden">
              <span className="svc-title-line block">Crafted To</span>
            </span>
            <span className="block overflow-hidden">
              <span className="svc-title-line ml-2 block text-white/20 italic">Scale</span>
            </span>
            <span className="block overflow-hidden">
              <span className="svc-title-line block">Modern Brands</span>
            </span>
          </h1>
          <p className="svc-lead mt-10 max-w-2xl text-base leading-relaxed text-white/60 md:text-lg">
            Wincore combines strategy, production, and AI-enhanced execution to deliver bold
            digital outcomes. Every service is built as a growth layer, not a one-off task.
          </p>
        </div>

        <div className="svc-card-grid mb-24 grid grid-cols-1 gap-5 md:mb-28 md:grid-cols-2 xl:grid-cols-3">
          {SERVICES.map((service, index) => {
            const Icon = service.icon;

            return (
              <article
                key={service.title}
                className="svc-card group relative overflow-hidden rounded-[1.75rem] border border-white/10 bg-white/[0.03] p-7 transition-all duration-500 hover:-translate-y-1.5 hover:border-accent/60 hover:bg-white/[0.05] md:p-8"
              >
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/80 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                <div className="mb-8 flex items-center justify-between">
                  <span className="text-[10px] font-black uppercase tracking-[0.35em] text-white/35">
                    0{index + 1}
                  </span>
                  <div className="rounded-full border border-white/15 bg-white/5 p-3 text-accent transition-colors group-hover:border-accent/40">
                    <Icon size={18} />
                  </div>
                </div>

                <h2 className="mb-4 text-2xl font-black leading-tight md:text-[1.75rem]">
                  {service.title}
                </h2>
                <p className="mb-6 text-sm leading-relaxed text-white/60 md:text-base">{service.summary}</p>

                <ul className="mb-8 space-y-2 text-sm text-white/70">
                  {service.outcomes.map((outcome) => (
                    <li key={outcome} className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />
                      <span>{outcome}</span>
                    </li>
                  ))}
                </ul>

                {service.link ? (
                  <a
                    href={service.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-[11px] font-black uppercase tracking-[0.3em] text-accent transition-transform duration-300 group-hover:translate-x-1"
                  >
                    Open WinPro AI
                    <ArrowUpRight size={14} />
                  </a>
                ) : (
                  <p className="text-[11px] font-black uppercase tracking-[0.3em] text-white/35">
                    Tailored Scope
                  </p>
                )}
              </article>
            );
          })}
        </div>

        <div className="svc-process mb-24 rounded-[2rem] border border-white/10 bg-muted/30 p-7 md:mb-28 md:p-10">
          <div className="mb-8 flex items-center justify-between gap-6">
            <h3 className="text-3xl font-black uppercase tracking-tight md:text-5xl">How We Work</h3>
            <span className="hidden text-[10px] font-black uppercase tracking-[0.4em] text-white/35 md:block">
              Strategy to execution
            </span>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {PROCESS.map((phase) => (
              <article
                key={phase.step}
                className="rounded-2xl border border-white/10 bg-black/20 p-6"
              >
                <p className="mb-4 text-[10px] font-black uppercase tracking-[0.35em] text-accent">
                  {phase.step}
                </p>
                <h4 className="mb-3 text-2xl font-black">{phase.title}</h4>
                <p className="text-white/60">{phase.text}</p>
              </article>
            ))}
          </div>
        </div>

        <div className="svc-cta mb-20 flex flex-col items-start justify-between gap-8 rounded-[2rem] border border-accent/40 bg-accent/10 p-8 md:mb-28 md:flex-row md:items-center md:p-10">
          <div>
            <p className="mb-2 text-[10px] font-black uppercase tracking-[0.4em] text-accent">Start a project</p>
            <p className="max-w-xl text-2xl font-black leading-tight md:text-4xl">
              Ready to turn your brand into a high-performing digital experience?
            </p>
          </div>

          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-6 py-3 text-[11px] font-black uppercase tracking-[0.32em] text-white transition-all duration-300 hover:border-accent hover:bg-accent hover:text-black"
          >
            Contact Wincore
            <ArrowUpRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  );
}
