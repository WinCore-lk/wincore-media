"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import type { ComponentType } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import {
  ArrowUpRight,
  Bot,
  ChartNoAxesCombined,
  Layers,
  Monitor,
  Sparkles,
  Video,
} from "lucide-react";
import { registerGsapPlugins, getScroller, prefersReducedMotion } from "@/lib/motion";

type ServiceItem = {
  title: string;
  summary: string;
  outcomes: string[];
  icon: ComponentType<{ size?: number | string; className?: string }>;
  image: string;
  link?: string;
};

const SERVICES: ServiceItem[] = [
  {
    title: "Digital-First Branding",
    summary: "Identity, visual language, and brand systems for modern channels.",
    outcomes: ["Strategy & naming", "Design systems", "Rollout"],
    icon: Layers,
    image: "https://images.unsplash.com/photo-1516382799247-87df95d790b7?auto=format&fit=crop&q=80&w=1200",
  },
  {
    title: "Social & Influence",
    summary: "Editorial rhythm and creator partnerships that convert attention.",
    outcomes: ["Content pillars", "Campaigns", "Partnerships"],
    icon: Sparkles,
    image: "https://images.unsplash.com/photo-1611162616475-46b635cb6868?auto=format&fit=crop&q=80&w=1200",
  },
  {
    title: "Motion Video & 3D",
    summary: "Reels, explainers, and 3D storytelling for paid and organic.",
    outcomes: ["Motion design", "3D assets", "Ad cutdowns"],
    icon: Video,
    image: "https://images.unsplash.com/photo-1574717024453-3540560a4de9?auto=format&fit=crop&q=80&w=1200",
  },
  {
    title: "AI-Powered Web Development",
    summary: "Fast, premium sites with AI-assisted workflows and strong performance.",
    outcomes: ["Prototyping", "Performance", "CMS"],
    icon: Bot,
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=1200",
    link: "https://winpro-ai-site.vercel.app",
  },
  {
    title: "Performance Marketing",
    summary: "Full-funnel paid media with testing loops and clear reporting.",
    outcomes: ["Paid strategy", "Creative tests", "Attribution"],
    icon: ChartNoAxesCombined,
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1200",
  },
  {
    title: "UX/UI & WebGL",
    summary: "Product UX, UI craft, and immersive WebGL where it matters.",
    outcomes: ["UX systems", "UI design", "WebGL"],
    icon: Monitor,
    image: "https://images.unsplash.com/photo-1558655146-9f40138edfeb?auto=format&fit=crop&q=80&w=1200",
  },
];

const PROCESS = [
  {
    step: "01",
    title: "Discover",
    text: "Market, audience, and constraints into a focused brief.",
  },
  {
    step: "02",
    title: "Design",
    text: "Concepts into production-ready systems and creative direction.",
  },
  {
    step: "03",
    title: "Deploy",
    text: "Launch, measure, and refine for long-term growth.",
  },
];

export default function ServicesPageContent() {
  const rootRef = useRef<HTMLElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    registerGsapPlugins();
    const scroller = getScroller();
    const reduced = prefersReducedMotion();
    const coarsePointer =
      typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches;
    const cardHoverCleanups: Array<() => void> = [];

    const ctx = gsap.context(() => {
      // --- Hero: entrance on load (does not depend on scroll) ---
      if (!reduced) {
        const tl = gsap.timeline({
          defaults: { ease: "expo.out" },
          delay: 0.05,
        });
        tl.from(".svc-orb", { opacity: 0, scale: 0.85, duration: 1.2 }, 0)
          .from(".svc-kicker", { opacity: 0, y: 18, duration: 0.65 }, 0.15)
          .from(
            ".svc-title-line",
            { opacity: 0, y: 36, duration: 0.85, stagger: 0.1 },
            0.22,
          )
          .from(".svc-lead", { opacity: 0, y: 22, duration: 0.75 }, "-=0.45")
          .from(".svc-meta-row", { opacity: 0, y: 14, duration: 0.55 }, "-=0.35");

        if (glowRef.current) {
          gsap.to(glowRef.current, {
            opacity: 0.55,
            duration: 2.4,
            ease: "sine.inOut",
            yoyo: true,
            repeat: -1,
          });
        }
      } else {
        gsap.set(
          [".svc-kicker", ".svc-title-line", ".svc-lead", ".svc-meta-row", ".svc-orb"],
          { clearProps: "all" },
        );
      }

      // --- Cards: per-card scroll reveal (Lenis needs explicit scroller) ---
      if (!reduced) {
        const cards = gsap.utils.toArray<HTMLElement>(".svc-card");
        gsap.set(cards, { force3D: true });
        cards.forEach((card, i) => {
          const bg = card.querySelector<HTMLElement>(".svc-card-bg");
          const content = card.querySelector<HTMLElement>(".svc-card-content");
          const focus = card.querySelector<HTMLElement>(".svc-card-focus");

          gsap.fromTo(
            card,
            {
              opacity: 0,
              y: 88,
              scale: 0.9,
              rotateX: 8,
              transformOrigin: "50% 0%",
              clipPath: "inset(18% 0 0 0 round 1.25rem)",
            },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              rotateX: 0,
              clipPath: "inset(0% 0 0 0 round 1.25rem)",
              duration: 1.05,
              delay: i * 0.06,
              ease: "power4.out",
              scrollTrigger: {
                trigger: card,
                scroller,
                start: "top 90%",
                once: true,
                invalidateOnRefresh: true,
              },
            },
          );

          if (content) {
            gsap.fromTo(
              content,
              { y: 24, opacity: 0 },
              {
                y: 0,
                opacity: 1,
                duration: 0.75,
                delay: 0.1 + i * 0.04,
                ease: "power3.out",
                scrollTrigger: {
                  trigger: card,
                  scroller,
                  start: "top 88%",
                  once: true,
                  invalidateOnRefresh: true,
                },
              },
            );
          }

          gsap.to(card, {
            yPercent: -4,
            ease: "none",
            scrollTrigger: {
              trigger: card,
              scroller,
              start: "top bottom",
              end: "bottom top",
              scrub: 0.95,
              invalidateOnRefresh: true,
            },
          });

          if (bg) {
            gsap.fromTo(
              bg,
              { scale: 1.16, yPercent: 8 },
              {
                scale: 1,
                yPercent: -6,
                ease: "none",
                scrollTrigger: {
                  trigger: card,
                  scroller,
                  start: "top bottom",
                  end: "bottom top",
                  scrub: 1,
                  invalidateOnRefresh: true,
                },
              },
            );
          }

          ScrollTrigger.create({
            trigger: card,
            scroller,
            start: "top 62%",
            end: "bottom 38%",
            onEnter: () => {
              gsap.to(card, { scale: 1.025, duration: 0.45, ease: "power3.out" });
              if (focus) gsap.to(focus, { opacity: 1, duration: 0.45, ease: "power3.out" });
            },
            onEnterBack: () => {
              gsap.to(card, { scale: 1.025, duration: 0.45, ease: "power3.out" });
              if (focus) gsap.to(focus, { opacity: 1, duration: 0.45, ease: "power3.out" });
            },
            onLeave: () => {
              gsap.to(card, { scale: 1, duration: 0.4, ease: "power2.out" });
              if (focus) gsap.to(focus, { opacity: 0, duration: 0.35, ease: "power2.out" });
            },
            onLeaveBack: () => {
              gsap.to(card, { scale: 1, duration: 0.4, ease: "power2.out" });
              if (focus) gsap.to(focus, { opacity: 0, duration: 0.35, ease: "power2.out" });
            },
          });

          if (!coarsePointer) {
            const xTo = gsap.quickTo(card, "x", { duration: 0.35, ease: "power3.out" });
            const yTo = gsap.quickTo(card, "y", { duration: 0.35, ease: "power3.out" });
            const rxTo = gsap.quickTo(card, "rotationX", { duration: 0.45, ease: "power3.out" });
            const ryTo = gsap.quickTo(card, "rotationY", { duration: 0.45, ease: "power3.out" });

            const onMove = (e: PointerEvent) => {
              const rect = card.getBoundingClientRect();
              const nx = (e.clientX - rect.left) / Math.max(rect.width, 1) - 0.5;
              const ny = (e.clientY - rect.top) / Math.max(rect.height, 1) - 0.5;
              xTo(nx * 5);
              yTo(ny * 5);
              rxTo(-ny * 4);
              ryTo(nx * 5);
            };

            const onLeave = () => {
              xTo(0);
              yTo(0);
              rxTo(0);
              ryTo(0);
            };

            card.addEventListener("pointermove", onMove);
            card.addEventListener("pointerleave", onLeave);
            cardHoverCleanups.push(() => {
              card.removeEventListener("pointermove", onMove);
              card.removeEventListener("pointerleave", onLeave);
            });
          }
        });
      }

      // --- New Process section ---
      if (!reduced) {
        gsap.fromTo(
          ".svc-process-line",
          { width: "0%" },
          {
            width: "100%",
            ease: "none",
            scrollTrigger: {
              trigger: ".svc-process-track",
              scroller,
              start: "top 80%",
              end: "bottom 60%",
              scrub: true,
            },
          }
        );

        gsap.fromTo(
          ".svc-process-line-mobile",
          { height: "0%" },
          {
            height: "100%",
            ease: "none",
            scrollTrigger: {
              trigger: ".svc-process-track",
              scroller,
              start: "top 80%",
              end: "bottom 60%",
              scrub: true,
            },
          }
        );

        const processNodes = gsap.utils.toArray<HTMLElement>(".svc-process-node");
        processNodes.forEach((node) => {
          gsap.fromTo(
            node,
            { opacity: 0, y: 40 },
            {
              opacity: 1,
              y: 0,
              duration: 0.8,
              ease: "back.out(1.2)",
              scrollTrigger: {
                trigger: node,
                scroller,
                start: "top 85%",
                once: true,
              },
            }
          );

          const dot = node.querySelector(".svc-process-dot");
          if (dot) {
            gsap.to(dot, {
              boxShadow: "0 0 20px rgba(0, 191, 255, 0.4)",
              borderColor: "rgba(0, 191, 255, 0.6)",
              ease: "power2.out",
              duration: 0.4,
              scrollTrigger: {
                trigger: node,
                scroller,
                start: "top 60%",
                toggleActions: "play none none reverse",
              },
            });
            const text = dot.querySelector("span");
            if (text) {
              gsap.to(text, {
                color: "rgba(0, 191, 255, 1)",
                ease: "power2.out",
                duration: 0.4,
                scrollTrigger: {
                  trigger: node,
                  scroller,
                  start: "top 60%",
                  toggleActions: "play none none reverse",
                },
              });
            }
          }
        });
      }

      // --- CTA ---
      gsap.from(".svc-cta-inner", {
        opacity: reduced ? 1 : 0,
        y: reduced ? 0 : 32,
        scale: reduced ? 1 : 0.98,
        duration: reduced ? 0 : 0.85,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".svc-cta",
          scroller,
          start: "top 88%",
          once: true,
        },
      });

      // Subtle parallax on section glow (scroll-linked)
      if (!reduced && glowRef.current) {
        gsap.to(glowRef.current, {
          yPercent: 12,
          ease: "none",
          scrollTrigger: {
            trigger: rootRef.current,
            scroller,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.2,
          },
        });
      }
    }, rootRef);

    const refresh = () => ScrollTrigger.refresh();
    requestAnimationFrame(refresh);
    const t1 = window.setTimeout(refresh, 120);
    const t2 = window.setTimeout(refresh, 450);

    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
      cardHoverCleanups.forEach((fn) => fn());
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={rootRef}
      className="relative overflow-hidden border-t border-black/5 bg-background pb-24 pt-10 md:pb-32 md:pt-14"
      aria-label="Services overview"
    >
      {/* Ambient + grid */}
      <div className="pointer-events-none absolute inset-0">
        <div
          ref={glowRef}
          className="svc-orb absolute left-1/2 top-[-18%] h-[min(55vh,480px)] w-[min(90vw,720px)] -translate-x-1/2 rounded-full bg-accent/[0.09] blur-[120px]"
        />
        <div
          className="absolute inset-0 opacity-[0.35]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(0,0,0,0.06) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0,0,0,0.06) 1px, transparent 1px)
            `,
            backgroundSize: "64px 64px",
            maskImage: "radial-gradient(ellipse 80% 60% at 50% 20%, black 20%, transparent 75%)",
          }}
        />
      </div>

      <div className="_container relative z-10">
        <header className="svc-intro mb-20 md:mb-24">
          <div className="relative overflow-hidden rounded-2xl bg-white px-8 py-11 shadow-xl shadow-black/8 transition-shadow duration-500 hover:shadow-2xl hover:shadow-black/12 md:px-14 md:py-16 lg:px-16 lg:py-18">
            <div className="absolute left-0 top-0 h-full w-px bg-gradient-to-b from-accent/80 via-accent/20 to-transparent md:left-6" />
            <div className="m-[3px] pl-4 md:pl-10">
              <p className="svc-kicker mb-6 pb-1 text-[10px] font-black uppercase leading-[1.45] tracking-[0.55em] text-accent">
                Services
              </p>
              <h1 className="font-heading text-3xl font-black uppercase leading-[1.15] tracking-tight text-foreground sm:text-4xl md:text-5xl lg:text-[2.85rem] lg:leading-[1.18]">
                <span className="svc-title-line block">
                  Built to scale{" "}
                  <span className="text-secondary italic">modern</span> brands.
                </span>
                <span className="svc-title-line mt-2 block text-foreground/60 md:mt-3">
                  Strategy, craft &amp; AI — end to end.
                </span>
              </h1>
              <p className="svc-lead mt-7 max-w-2xl text-sm leading-relaxed text-foreground/55 md:text-base">
                Wincore delivers digital-first branding, motion, performance, and immersive
                web. One partner, one bar for quality.
              </p>
              <div className="svc-meta-row mt-11 flex flex-wrap gap-8 pt-11 text-[10px] font-black uppercase leading-[1.5] tracking-[0.35em] text-foreground/40">
                <span>Colombo &amp; remote</span>
                <span className="text-accent/90">WebGL · AI · Motion</span>
                <span>Strategy-led delivery</span>
              </div>
            </div>
          </div>
        </header>

        <div className="mb-14 flex items-end justify-between gap-4 md:mb-16">
          <h2 className="text-2xl font-black uppercase tracking-tight text-foreground md:text-3xl leading-[1.1]">
            Capabilities
          </h2>
          <span className="hidden text-[10px] font-black uppercase tracking-[0.4em] text-foreground/35 sm:inline leading-[1.4]">
            06 disciplines
          </span>
        </div>

        <div className="svc-card-grid mb-28 grid grid-cols-1 gap-6 perspective-[1400px] sm:grid-cols-2 md:gap-7 lg:grid-cols-6 lg:gap-8">
          {SERVICES.map((service, index) => {
            const Icon = service.icon;
            const layoutClass =
                  index === 0 || index === 3
                ? "lg:col-span-4 lg:min-h-[440px]"
                : "lg:col-span-2 lg:min-h-[440px]";
            return (
              <article
                key={service.title}
                className={`svc-card group relative isolate flex min-h-[360px] flex-col overflow-hidden rounded-[1.35rem] border border-black/10 bg-black text-white shadow-[0_28px_64px_rgba(0,0,0,0.2)] transition-all duration-500 hover:border-accent/45 hover:shadow-[0_40px_90px_rgba(0,0,0,0.28)] md:min-h-[390px] ${layoutClass}`}
                style={{ transformStyle: "preserve-3d" }}
              >
                <div
                  className="svc-card-bg absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: `url(${service.image})` }}
                  aria-hidden="true"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/74 via-black/34 to-black/22" />
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(0,191,255,0.28),transparent_62%)] opacity-70 transition-opacity duration-700 group-hover:opacity-100" />
                <div className="svc-card-focus pointer-events-none absolute inset-0 bg-gradient-to-br from-accent/12 via-transparent to-transparent opacity-0" />
                <div className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-white/65 to-transparent opacity-70 transition-opacity duration-500 group-hover:opacity-100" />

                <div className="pointer-events-none absolute right-4 top-3 z-10 text-[3.2rem] font-black leading-none tracking-tighter text-white/16 md:text-[4rem]">
                  {String(index + 1).padStart(2, "0")}
                </div>

                <div className="svc-card-content relative z-10 mt-auto px-8 pb-9 pt-18 md:px-9 md:pb-10 md:pt-22">
                  <div className="mb-6 flex items-start justify-between gap-4">
                    <span className="rounded-full border border-white/25 bg-white/10 px-3 py-1 text-[9px] font-black uppercase leading-[1.3] tracking-[0.32em] text-white/82 backdrop-blur-sm">
                      {service.link ? "Platform" : "Service"}
                    </span>
                    <div className="rounded-xl border border-white/20 bg-white/12 p-3 text-white shadow-md shadow-black/20 transition-all duration-500 group-hover:scale-110 group-hover:border-accent/60 group-hover:bg-accent group-hover:text-white group-hover:shadow-lg group-hover:shadow-accent/35">
                      <Icon size={20} />
                    </div>
                  </div>

                  <h3 className="mb-3 text-[1.2rem] font-black leading-[1.22] tracking-tight text-white md:text-[1.45rem]">
                    {service.title}
                  </h3>
                  <p className="mb-6 max-w-[56ch] text-[13px] leading-[1.65] text-white/84 md:text-[14px]">
                    {service.summary}
                  </p>

                  <ul className="mb-6 flex flex-wrap gap-2.5">
                    {service.outcomes.map((outcome) => (
                      <li
                        key={outcome}
                        className="rounded-full border border-white/22 bg-white/12 px-3.5 py-1.5 text-[10px] font-black uppercase leading-[1.2] tracking-[0.14em] text-white/90"
                      >
                        {outcome}
                      </li>
                    ))}
                  </ul>

                  {service.link ? (
                    <a
                      href={service.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-full border border-accent/70 bg-accent px-5 py-2.5 text-[10px] font-black uppercase tracking-[0.26em] text-white transition-transform hover:scale-[1.03]"
                    >
                      WinPro AI
                      <ArrowUpRight size={13} />
                    </a>
                  ) : (
                    <span className="text-[10px] font-black uppercase leading-[1.4] tracking-[0.25em] text-white/74">
                      Strategy-led
                    </span>
                  )}
                </div>
              </article>
            );
          })}
        </div>

        <div className="svc-process-container relative mb-24 md:mb-32 lg:mb-40">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16 md:mb-20">
            <div>
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-accent leading-[1.4] mb-4 block">
                How we work
              </span>
              <h2 className="text-[2.5rem] md:text-[3.5rem] lg:text-[4rem] font-black uppercase tracking-tighter text-foreground leading-[0.95]">
                Process &amp; Scope
              </h2>
            </div>
            <p className="max-w-xs text-sm md:text-base text-foreground/50 font-light leading-relaxed">
              We collapse timelines by focusing only on what matters: discovering the edge, designing the system, and deploying for growth.
            </p>
          </div>

          <div className="svc-process-track relative flex flex-col md:flex-row justify-between gap-12 md:gap-0 mt-8">
            {/* Horizontal Line for Desktop */}
            <div className="absolute hidden md:block top-[2.25rem] left-0 right-0 h-[1px] bg-black/10 z-0" />
            <div className="absolute hidden md:block top-[2.25rem] left-0 h-[2px] w-0 bg-accent z-0 svc-process-line shadow-[0_0_10px_rgba(0,191,255,0.4)]" />
            
            {/* Vertical Line for Mobile */}
            <div className="absolute block md:hidden left-[1.1rem] top-0 bottom-0 w-[1px] bg-black/10 z-0" />
            <div className="absolute block md:hidden left-[1.1rem] top-0 h-0 w-[2px] bg-accent z-0 svc-process-line-mobile shadow-[0_0_10px_rgba(0,191,255,0.4)]" />

            {PROCESS.map((phase) => (
              <div key={phase.step} className="svc-process-node relative z-10 flex flex-row md:flex-col gap-6 md:gap-8 items-start flex-1 group">
                {/* Node Dot */}
                <div className="shrink-0 w-9 h-9 md:w-18 md:h-18 rounded-full bg-background border border-black/10 flex items-center justify-center transition-colors duration-500 shadow-[0_4px_12px_rgba(0,0,0,0.03)] svc-process-dot">
                  <span className="text-[10px] md:text-sm font-black tracking-widest text-black/30 transition-colors duration-300">
                    {phase.step}
                  </span>
                </div>
                {/* Content */}
                <div className="pt-1 md:pt-0 pr-6">
                  <h4 className="text-xl md:text-2xl font-black uppercase tracking-tighter mb-3 transition-colors duration-300 text-foreground group-hover:text-accent">
                    {phase.title}
                  </h4>
                  <p className="text-sm md:text-base text-foreground/50 font-light leading-relaxed max-w-[280px]">
                    {phase.text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="svc-cta relative overflow-visible isolate rounded-2xl bg-gradient-to-br from-accent/[0.09] via-transparent to-secondary/[0.05] shadow-lg shadow-accent/25 transition-shadow duration-500 hover:shadow-xl hover:shadow-accent/35">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_80%_20%,rgba(0,191,255,0.12),transparent_60%)]" />
          <div className="svc-cta-inner relative flex flex-col items-start justify-between gap-10 px-9 py-12 md:flex-row md:items-center md:px-14 md:py-16 lg:px-16 lg:py-[4.75rem]">
            <div>
              <p className="mb-3 text-[10px] font-black uppercase tracking-[0.45em] text-accent leading-[1.4]">
                Next step
              </p>
              <p className="text-2xl font-black uppercase leading-[1.15] tracking-tight text-foreground md:text-3xl">
                Tell us what you&apos;re building — we&apos;ll scope it.
              </p>
            </div>
            <Link
              href="/contact"
              className="relative inline-flex shrink-0 items-center gap-3 rounded-full bg-accent px-12 py-4 text-[11px] font-black uppercase tracking-[0.35em] text-white transition-transform hover:scale-[1.02] active:scale-[0.98] leading-[1.3]"
            >
              Contact
              <ArrowUpRight size={18} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
