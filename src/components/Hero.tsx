"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import {
  ArrowDown, ArrowRight, Play,
  Trophy, Users, Zap,
  Palette, Box, Globe, Sparkles,
} from "lucide-react";
import { getScroller, scheduleScrollTriggerRefresh } from "@/lib/motion";
import { useLenis } from "@/context/LenisContext";

// Register once at module level — safe in Next.js
gsap.registerPlugin(ScrollTrigger);

const HeroScene = dynamic(() => import("@/components/hero/HeroScene"), {
  ssr: false,
  loading: () => null,
});

const FOCUS = [
  { label: "Brand systems", tag: "Strategy", desc: "Visual identities that scale and perform.", icon: Palette },
  { label: "Motion & 3D", tag: "Craft", desc: "Cinematic depth for digital interfaces.", icon: Box },
  { label: "WebGL & Tech", tag: "Build", desc: "Immersive high-performance web experiences.", icon: Globe },
  { label: "AI Workflows", tag: "Scale", desc: "Accelerated delivery with precision AI.", icon: Sparkles },
];

// ─── count-up utility ─────────────────────────────────────────────────────────
function startCountUp() {
  document.querySelectorAll<HTMLElement>(".stat-value").forEach((el) => {
    const target = parseInt(el.dataset.target ?? "0", 10);
    const proxy = { val: 0 };
    gsap.to(proxy, {
      val: target,
      duration: 2,
      ease: "power2.out",
      onUpdate() { el.textContent = Math.round(proxy.val).toString(); },
    });
  });
}

export default function Hero() {
  const introRef = useRef<HTMLElement>(null);
  const reelRef = useRef<HTMLElement>(null);
  const [expanded, setExpanded] = useState(false);
  const lenis = useLenis();

  // ─────────────────────────────────────────────────────────────────────────
  // STEP 1 — useLayoutEffect: set initial hidden states BEFORE first paint
  //          This prevents the "everything visible at once" flash.
  // ─────────────────────────────────────────────────────────────────────────
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Lines: hide by pushing down inside their overflow-hidden parent
      gsap.set(".hero-line-inner", { yPercent: 105 });

      // Everything else: invisible + slightly offset
      gsap.set([
        ".hero-eyebrow",
        ".hero-sub",
        ".hero-metric-shell",
        ".hero-metric-card",
        ".hero-side-card",
        ".hero-side-row",
        ".hero-side-cta",
        ".hero-approach-chip",
        ".hero-approach-title",
        ".hero-approach-arrow-wrap",
        ".hero-scroll-hint",
      ], { autoAlpha: 0, y: 22 });

      // Side card slides from right
      gsap.set(".hero-side-card", { autoAlpha: 0, x: 40, y: 0 });
    }, introRef);

    return () => ctx.revert();
  }, []);

  // ─────────────────────────────────────────────────────────────────────────
  // STEP 2 — Entrance timeline (independent of Lenis — fires on mount)
  // ─────────────────────────────────────────────────────────────────────────
  useEffect(() => {
    let cleanupMagnetic: (() => void) | undefined;
    let cleanupCardTilt: (() => void) | undefined;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        delay: 0.1,
        defaults: { ease: "expo.out" },
      });

      // — eyebrow
      tl.to(".hero-eyebrow", {
        autoAlpha: 1, y: 0, duration: 0.8,
      }, 0);

      // — headline lines (slide up from clip mask)
      tl.to(".hero-line-inner", {
        yPercent: 0,
        duration: 1.1,
        stagger: 0.13,
        ease: "power4.out",
      }, 0.12);

      // — sub-copy
      tl.to(".hero-sub", {
        autoAlpha: 1, y: 0, duration: 0.85,
      }, 0.45);

      // — metric groups
      tl.to(".hero-metric-shell", {
        autoAlpha: 1,
        y: 0,
        duration: 0.7,
        stagger: 0.09,
        ease: "power3.out",
      }, 0.54);

      // — cards inside metric groups
      tl.to(".hero-metric-card", {
        autoAlpha: 1, y: 0,
        duration: 0.58,
        stagger: 0.06,
        ease: "power3.out",
      }, 0.62);

      tl.add(() => startCountUp(), 0.92);

      // — side card (slides in from right)
      tl.to(".hero-side-card", {
        autoAlpha: 1, x: 0,
        duration: 1.05,
        ease: "expo.out",
      }, 0.25);

      // — side rows cascade
      tl.to(".hero-side-row", {
        autoAlpha: 1, y: 0,
        duration: 0.6,
        stagger: 0.09,
        ease: "back.out(1.5)",
      }, 0.55);

      // — side CTA (staged reveal for stronger hierarchy)
      tl.fromTo(".hero-side-cta", {
        autoAlpha: 0,
        y: 30,
        clipPath: "inset(0 0 100% 0 round 1.25rem)",
      }, {
        autoAlpha: 1,
        y: 0,
        clipPath: "inset(0 0 0% 0 round 1.25rem)",
        duration: 0.72,
        ease: "power4.out",
      }, 0.86);
      tl.to(".hero-approach-chip", {
        autoAlpha: 1,
        y: 0,
        duration: 0.45,
        ease: "power3.out",
      }, 0.99);
      tl.to(".hero-approach-title", {
        autoAlpha: 1,
        y: 0,
        duration: 0.52,
        ease: "power3.out",
      }, 1.03);
      tl.to(".hero-approach-arrow-wrap", {
        autoAlpha: 1,
        y: 0,
        duration: 0.52,
        ease: "power3.out",
      }, 1.05);

      // — scroll hint
      tl.to(".hero-scroll-hint", {
        autoAlpha: 1, y: 0, duration: 0.6,
      }, 1.0);

      // ── after entrance: ambient idle loops ────────────────────────────────
      tl.add(() => {
        // gradient shimmer on "performs"
        gsap.fromTo(".hero-performs",
          { backgroundPositionX: "0%" },
          { backgroundPositionX: "100%", duration: 4, repeat: -1, yoyo: true, ease: "sine.inOut" }
        );

        // floating stat cards
        gsap.to(".hero-stat", {
          y: (i) => (i % 2 === 0 ? 3 : -3),
          duration: 2.8, repeat: -1, yoyo: true,
          ease: "sine.inOut", stagger: 0.15,
        });

        // glow orb pulse on card
        gsap.fromTo(".hero-why-glow",
          { scale: 1, opacity: 0.6 },
          { scale: 1.3, opacity: 1, duration: 4, repeat: -1, yoyo: true, ease: "sine.inOut" }
        );

        // scroll line pulse
        gsap.fromTo(".hero-scroll-line",
          { scaleY: 0.2, opacity: 0.3 },
          { scaleY: 1, opacity: 1, duration: 1.4, repeat: -1, yoyo: true, ease: "sine.inOut" }
        );

        // CTA glint sweep
        gsap.fromTo(".hero-approach-glint",
          { xPercent: -130, opacity: 0.1 },
          {
            xPercent: 180,
            opacity: 0.42,
            duration: 2.8,
            repeat: -1,
            repeatDelay: 1.5,
            ease: "sine.inOut",
          }
        );

        // Metric shell sweep keeps card groups feeling alive.
        gsap.fromTo(".hero-metric-sweep",
          { xPercent: -135, opacity: 0.05 },
          {
            xPercent: 180,
            opacity: 0.24,
            duration: 3.2,
            repeat: -1,
            repeatDelay: 1.2,
            ease: "sine.inOut",
            stagger: 0.35,
          }
        );
      }, "+=0");

    }, introRef);

    const approachBtn = introRef.current?.querySelector<HTMLElement>(".hero-approach-btn");
    if (approachBtn) {
      const xTo = gsap.quickTo(approachBtn, "x", { duration: 0.45, ease: "power3.out" });
      const yTo = gsap.quickTo(approachBtn, "y", { duration: 0.45, ease: "power3.out" });

      const onMove = (e: PointerEvent) => {
        const rect = approachBtn.getBoundingClientRect();
        const dx = ((e.clientX - rect.left) / rect.width - 0.5) * 12;
        const dy = ((e.clientY - rect.top) / rect.height - 0.5) * 10;
        xTo(dx);
        yTo(dy);
      };

      const onLeave = () => {
        xTo(0);
        yTo(0);
      };

      approachBtn.addEventListener("pointermove", onMove);
      approachBtn.addEventListener("pointerleave", onLeave);

      cleanupMagnetic = () => {
        approachBtn.removeEventListener("pointermove", onMove);
        approachBtn.removeEventListener("pointerleave", onLeave);
      };
    }

    const interactiveCards = Array.from(
      introRef.current?.querySelectorAll<HTMLElement>(".hero-metric-card, .hero-side-row") ?? []
    );

    if (interactiveCards.length) {
      const cleanups: Array<() => void> = [];

      interactiveCards.forEach((card) => {
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
          ryTo(nx * 6);
        };

        const onLeave = () => {
          xTo(0);
          yTo(0);
          rxTo(0);
          ryTo(0);
        };

        card.addEventListener("pointermove", onMove);
        card.addEventListener("pointerleave", onLeave);
        cleanups.push(() => {
          card.removeEventListener("pointermove", onMove);
          card.removeEventListener("pointerleave", onLeave);
        });
      });

      cleanupCardTilt = () => {
        cleanups.forEach((fn) => fn());
      };
    }

    return () => {
      cleanupMagnetic?.();
      cleanupCardTilt?.();
      ctx.revert();
    };
  }, []); // ← zero deps: runs once, never blocked

  // ─────────────────────────────────────────────────────────────────────────
  // STEP 3 — Scroll animations (needs Lenis scroller)
  // ─────────────────────────────────────────────────────────────────────────
  useEffect(() => {
    if (!lenis) return;
    const scroller = getScroller();

    const ctx = gsap.context(() => {
      // hero content fades on scroll
      gsap.to(".hero-content-layer", {
        opacity: 0.12, y: -40,
        ease: "none",
        scrollTrigger: {
          trigger: introRef.current,
          scroller,
          start: "top top",
          end: "bottom top",
          scrub: 0.9,
        },
      });

      // parallax background orbs
      gsap.to(".hero-parallax-slow", {
        yPercent: 14,
        ease: "none",
        scrollTrigger: {
          trigger: introRef.current,
          scroller,
          start: "top top",
          end: "bottom top",
          scrub: 2,
        },
      });

      gsap.to(".hero-parallax-fast", {
        yPercent: -10,
        ease: "none",
        scrollTrigger: {
          trigger: introRef.current,
          scroller,
          start: "top top",
          end: "bottom top",
          scrub: 1.2,
        },
      });

      // Column drift to create depth while keeping readability.
      gsap.to(".hero-left-col", {
        yPercent: -6,
        ease: "none",
        scrollTrigger: {
          trigger: introRef.current,
          scroller,
          start: "top top",
          end: "bottom top",
          scrub: 1.1,
        },
      });

      gsap.to(".hero-metric-card", {
        yPercent: (i) => (i % 2 === 0 ? -3.5 : 3.5),
        rotate: (i) => (i === 0 ? -0.6 : i === 1 ? 0.6 : 0),
        transformOrigin: "50% 50%",
        ease: "none",
        stagger: 0.03,
        scrollTrigger: {
          trigger: introRef.current,
          scroller,
          start: "top top",
          end: "bottom top",
          scrub: 1.3,
        },
      });

      gsap.to(".hero-metric-shell", {
        yPercent: -4,
        ease: "none",
        stagger: 0.08,
        scrollTrigger: {
          trigger: introRef.current,
          scroller,
          start: "top top",
          end: "bottom top",
          scrub: 1.25,
        },
      });

      gsap.to(".hero-right-col", {
        yPercent: 7,
        scale: 0.985,
        transformOrigin: "50% 30%",
        ease: "none",
        scrollTrigger: {
          trigger: introRef.current,
          scroller,
          start: "top top",
          end: "bottom top",
          scrub: 1.1,
        },
      });

      // Subtle card-line drift makes the stack feel less static.
      gsap.to(".hero-side-row", {
        yPercent: (i) => (i % 2 === 0 ? -4 : 4),
        ease: "none",
        stagger: 0.04,
        scrollTrigger: {
          trigger: introRef.current,
          scroller,
          start: "top top",
          end: "bottom top",
          scrub: 1.5,
        },
      });

      // Keep Process CTA alive through the hero scroll range.
      gsap.to(".hero-approach-btn", {
        y: -5,
        boxShadow: "0 18px 44px rgba(0,191,255,0.15)",
        ease: "none",
        scrollTrigger: {
          trigger: introRef.current,
          scroller,
          start: "top top",
          end: "bottom top",
          scrub: 1.2,
        },
      });

      gsap.to(".hero-approach-arrow-wrap", {
        rotate: 16,
        ease: "none",
        scrollTrigger: {
          trigger: introRef.current,
          scroller,
          start: "top top",
          end: "bottom top",
          scrub: 1.4,
        },
      });

      // WebGL canvas fades out
      gsap.to(".hero-canvas-wrap", {
        opacity: 0.04,
        scale: 1.025,
        ease: "none",
        immediateRender: false,
        scrollTrigger: {
          trigger: introRef.current,
          scroller,
          start: "top top",
          end: "bottom top",
          scrub: 0.9,
        },
      });
    }, introRef);

    // ── reel section ──────────────────────────────────────────────────────
    const ctxReel = gsap.context(() => {
      const items: [string, number][] = [
        [".reel-kicker", 88],
        [".reel-title", 86],
        [".reel-copy", 84],
        [".reel-video-shell", 78],
      ];
      items.forEach(([sel, pct], idx) => {
        gsap.from(sel, {
          autoAlpha: 0,
          y: idx === items.length - 1 ? 40 : 20,
          duration: idx === items.length - 1 ? 1 : 0.7,
          ease: "expo.out",
          scrollTrigger: {
            trigger: reelRef.current,
            scroller,
            start: `top ${pct}%`,
            once: true,
          },
        });
      });
    }, reelRef);

    scheduleScrollTriggerRefresh();
    return () => { ctx.revert(); ctxReel.revert(); };
  }, [lenis]);

  return (
    <>
      <section
        id="hero-section"
        ref={introRef}
        className="relative flex min-h-[100svh] flex-col justify-center bg-background px-4 pt-20 pb-12 md:px-8 md:pt-24 md:pb-16"
      >
        {/* background layers */}
        <div className="pointer-events-none absolute inset-0 z-0">
          <div className="hero-parallax-slow absolute inset-0 bg-[radial-gradient(ellipse_120%_80%_at_50%_-20%,rgba(0,191,255,0.16),transparent_58%)]" />
          <div className="hero-parallax-fast absolute bottom-0 left-1/2 h-[min(60vh,520px)] w-[min(100%,900px)] -translate-x-1/2 bg-[radial-gradient(ellipse_at_center,rgba(212,175,119,0.09),transparent_68%)] blur-2xl" />
          <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_0%,#0A0A0A_92%)]" />
        </div>

        <div className="hero-canvas-wrap pointer-events-none absolute inset-0 z-[1] opacity-[0.3] md:opacity-[0.36]">
          <HeroScene heroId="hero-section" />
        </div>

        <div className="pointer-events-none absolute inset-0 z-[2] bg-[radial-gradient(ellipse_85%_55%_at_50%_35%,transparent_0%,rgba(10,10,10,0.78)_58%,#0A0A0A_100%)]" />

        <div className="hero-content-layer _container relative z-10 mx-auto w-full max-w-[1240px]">
          <div className="grid min-h-[min(85vh,900px)] grid-cols-1 items-start gap-16 lg:grid-cols-12 lg:gap-16 lg:items-center">

            {/* ── LEFT column ── */}
            <div className="hero-left-col flex flex-col text-left lg:col-span-6">

              <p className="hero-eyebrow mb-5 text-[10px] font-black uppercase tracking-[0.5em] text-white/40">
                Wincore Agency · <span className="text-accent/90">Colombo &amp; global</span>
              </p>

              {/* 
                CRITICAL: each .hero-line must have overflow-hidden so the
                sliding .hero-line-inner is invisible before it enters.
                The pb-[0.06em] prevents descenders from clipping.
              */}
              <h1 className="hero-headline font-heading text-[2.1rem] font-black uppercase leading-[1.02] tracking-tight text-white sm:text-5xl md:text-6xl lg:text-[3.35rem] lg:leading-[1.05]">
                <span className="hero-line block overflow-hidden pb-[0.2em]">
                  <span className="hero-line-inner block">Creative digital</span>
                </span>
                <span className="hero-line block overflow-hidden pb-[0.2em]">
                  <span className="hero-line-inner block text-white/35">that actually</span>
                </span>
                <span className="hero-line block overflow-hidden pb-[0.2em]">
                  <span className="hero-line-inner hero-performs block bg-gradient-to-r from-white via-white to-accent bg-[length:200%_100%] bg-clip-text text-transparent">
                    performs
                  </span>
                </span>
              </h1>

              <p className="hero-sub mt-7 max-w-xl text-base font-light leading-relaxed text-white/50 md:mt-8 md:text-lg">
                Brand systems, motion, WebGL, and AI-accelerated delivery — one team, one standard.
                Built for clarity, speed, and measurable outcomes.
              </p>

              <div className="hero-metrics-wrap mt-11 md:mt-[3.25rem]">
                <div className="hero-metric-shell group/shell relative overflow-hidden rounded-[1.55rem] border border-white/[0.09] bg-gradient-to-br from-white/[0.05] via-black/35 to-black/50 p-3 shadow-[0_12px_34px_rgba(0,0,0,0.35)] backdrop-blur-md sm:p-4">
                  <div className="hero-metric-sweep pointer-events-none absolute inset-y-0 left-[-30%] w-[22%] -skew-x-12 bg-gradient-to-r from-transparent via-accent/25 to-transparent" />
                  <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_100%_at_100%_0%,rgba(0,191,255,0.08),transparent_58%)]" />
                  <div className="grid grid-cols-1 gap-3 lg:grid-cols-12 lg:gap-4">
                    <article className="hero-metric-card relative rounded-2xl border border-white/[0.09] bg-gradient-to-b from-white/[0.08] to-white/[0.02] p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] [transform-style:preserve-3d] lg:col-span-5">
                      <div className="pointer-events-none absolute inset-0 rounded-2xl bg-[radial-gradient(95%_55%_at_15%_0%,rgba(255,255,255,0.08),transparent_65%)]" />
                      <p className="mb-4 text-[9px] font-black uppercase tracking-[0.32em] text-white/35">
                        Outcomes
                      </p>
                      <div className="hero-pills flex flex-wrap gap-2.5">
                        {["Branding", "Motion", "WebGL", "AI dev", "Performance"].map((p) => (
                          <span
                            key={p}
                            className="rounded-full border border-white/[0.1] bg-white/[0.04] px-3 py-1.5 text-[9px] font-black uppercase tracking-[0.28em] text-white/50"
                          >
                            {p}
                          </span>
                        ))}
                      </div>
                    </article>

                    <article className="hero-metric-card relative rounded-2xl border border-white/[0.09] bg-gradient-to-b from-white/[0.08] to-white/[0.02] p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] [transform-style:preserve-3d] lg:col-span-7">
                      <div className="pointer-events-none absolute inset-0 rounded-2xl bg-[radial-gradient(95%_55%_at_15%_0%,rgba(255,255,255,0.08),transparent_65%)]" />
                      <p className="mb-4 text-[9px] font-black uppercase tracking-[0.32em] text-white/35">
                        Actions
                      </p>
                      <div className="hero-actions flex flex-wrap items-center gap-2.5">
                        <Link
                          href="/contact"
                          className="cursor-hover inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-[9px] font-black uppercase tracking-[0.28em] text-[#0A0A0A] transition-transform hover:scale-[1.02] active:scale-[0.98]"
                        >
                          Start a project
                          <ArrowRight size={14} strokeWidth={2.5} />
                        </Link>
                        <Link
                          href="/works"
                          className="cursor-hover inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/[0.04] px-6 py-3 text-[9px] font-black uppercase tracking-[0.28em] text-white/90 transition-colors hover:border-accent/50 hover:text-accent"
                        >
                          View work
                        </Link>
                        <Link
                          href="/services"
                          className="cursor-hover inline-flex items-center gap-2 rounded-full border border-white/15 bg-transparent px-5 py-3 text-[9px] font-black uppercase tracking-[0.26em] text-white/55 transition-colors hover:border-white/30 hover:text-white/90"
                        >
                          Services
                          <ArrowRight size={13} strokeWidth={2.5} />
                        </Link>
                      </div>
                    </article>
                  </div>
                </div>

                <div className="hero-metric-shell group/shell relative mt-3 overflow-hidden rounded-[1.55rem] border border-white/[0.09] bg-gradient-to-br from-white/[0.05] via-black/35 to-black/50 p-3 shadow-[0_12px_34px_rgba(0,0,0,0.35)] backdrop-blur-md sm:mt-4 sm:p-4">
                  <div className="hero-metric-sweep pointer-events-none absolute inset-y-0 left-[-30%] w-[22%] -skew-x-12 bg-gradient-to-r from-transparent via-secondary/20 to-transparent" />
                  <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_100%_at_100%_0%,rgba(212,175,119,0.07),transparent_60%)]" />
                  <dl className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                    {[
                      { label: "Awards Won", value: 12, suffix: "+", icon: Trophy, color: "text-accent" },
                      { label: "Client Retention", value: 95, suffix: "%", icon: Users, color: "text-secondary" },
                      { label: "Campaigns", value: 200, suffix: "+", icon: Zap, color: "text-white" },
                    ].map((stat, i) => (
                      <div
                        key={stat.label}
                        className="hero-metric-card hero-stat group relative flex flex-col gap-1.5 rounded-2xl border border-white/[0.09] bg-gradient-to-b from-white/[0.08] to-white/[0.02] p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] transition-all duration-500 hover:border-white/18 hover:bg-white/[0.08] [transform-style:preserve-3d]"
                      >
                        <div className="absolute inset-0 z-0 pointer-events-none opacity-0 transition-opacity duration-700 group-hover:opacity-10">
                          <div className="absolute top-0 right-0 h-24 w-24 rounded-full bg-accent/20 blur-2xl" />
                          <div className="absolute bottom-0 left-0 h-16 w-16 rounded-full bg-secondary/10 blur-xl" />
                        </div>
                        <div className="relative z-10 mb-3 flex items-center justify-between">
                          <div className="rounded-lg bg-white/[0.03] p-2 transition-all duration-500 group-hover:bg-accent/10 group-hover:scale-110">
                            <stat.icon
                              className={`${stat.color} opacity-40 transition-all duration-500 group-hover:opacity-100`}
                              size={16}
                            />
                          </div>
                          <span className="text-[8px] font-black uppercase tracking-[0.2em] text-white/10 transition-colors group-hover:text-accent/40">
                            {String(i + 1).padStart(2, "0")}
                          </span>
                        </div>
                        <dt className="relative z-10 text-[9px] font-bold uppercase tracking-[0.18em] text-white/30 transition-colors group-hover:text-white/60">
                          {stat.label}
                        </dt>
                        <dd className="relative z-10 flex items-baseline gap-1">
                          <span className="stat-value text-3xl font-black tracking-tighter text-white" data-target={stat.value}>
                            0
                          </span>
                          <span className={`text-sm font-bold ${stat.color}`}>{stat.suffix}</span>
                        </dd>
                        <div className="absolute bottom-0 left-0 h-[1.5px] w-0 bg-gradient-to-r from-transparent via-accent/40 to-transparent transition-all duration-700 group-hover:w-full" />
                      </div>
                    ))}
                  </dl>
                </div>
              </div>
            </div>

            {/* ── RIGHT column (side card) ── */}
            <aside className="hero-right-col hero-side-card lg:col-span-6 lg:self-center">
              <div className="relative overflow-hidden rounded-[2.5rem] border border-white/[0.08] bg-gradient-to-br from-white/[0.06] to-black/[0.25] p-9 shadow-[0_30px_60px_rgba(0,0,0,0.4)] backdrop-blur-xl md:p-12 lg:p-[3.25rem]">
                <div className="hero-why-glow pointer-events-none absolute -right-12 -top-12 h-48 w-48 rounded-full bg-accent/10 blur-[80px]" />

                <header className="mb-9 flex items-center justify-between md:mb-10">
                  <p className="text-[10px] font-black uppercase tracking-[0.5em] text-accent">Why Wincore</p>
                  <div className="h-[1px] w-12 bg-white/10" />
                </header>

                <ul className="space-y-3.5 md:space-y-4">
                  {FOCUS.map((item) => (
                    <li
                      key={item.label}
                      className="hero-side-row group/row relative rounded-2xl border border-white/0 p-1.5 transition-all duration-500 hover:border-white/[0.05] hover:bg-white/[0.02]"
                    >
                      <div className="flex items-start gap-4.5 py-3.5">
                        <div className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/[0.03] transition-all duration-500 group-hover/row:scale-110 group-hover/row:bg-accent/10">
                          <item.icon
                            className="text-white/40 transition-colors duration-500 group-hover/row:text-accent"
                            size={18}
                            strokeWidth={1.5}
                          />
                          <div className="absolute inset-0 rounded-xl bg-accent/20 opacity-0 blur-md transition-opacity duration-500 group-hover/row:opacity-100" />
                        </div>
                        <div className="flex flex-col gap-1.5 pr-2 pb-1.5">
                          <div className="mb-0.5 flex flex-wrap items-center gap-2.5">
                            <span className="text-[15px] font-bold tracking-tight text-white/90">{item.label}</span>
                            <span className="shrink-0 rounded-full border border-white/10 px-2 py-0.5 text-[8px] font-black uppercase tracking-[0.15em] text-white/20">
                              {item.tag}
                            </span>
                          </div>
                          <p className="text-[13px] leading-relaxed text-white/40 transition-colors group-hover/row:text-white/60">
                            {item.desc}
                          </p>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>

                <div className="hero-side-cta mt-10 border-t border-white/[0.08] pt-8.5 md:mt-11 md:pt-9">
                  <Link
                    href="/about"
                    className="hero-approach-btn cursor-hover group/btn relative flex w-full items-center justify-between gap-5 overflow-hidden rounded-2xl border border-white/[0.11] bg-gradient-to-r from-white/[0.07] via-white/[0.03] to-transparent px-5 py-4 transition-all duration-500 hover:border-accent/45 hover:shadow-[0_16px_40px_rgba(0,191,255,0.14)] md:px-6 md:py-[1.125rem]"
                  >
                    <div className="hero-approach-glint pointer-events-none absolute inset-y-0 left-[-35%] w-[28%] -skew-x-12 bg-gradient-to-r from-transparent via-accent/30 to-transparent" />
                    <div className="absolute inset-x-0 bottom-0 h-[1px] w-0 bg-gradient-to-r from-transparent via-accent/60 to-transparent transition-all duration-700 group-hover/btn:w-full" />

                    <div className="relative z-10 flex min-w-0 items-center gap-4">
                      <span className="hero-approach-chip shrink-0 rounded-full border border-accent/35 bg-accent/10 px-2.5 py-1 text-[8px] font-black uppercase tracking-[0.28em] text-accent/90">
                        Process
                      </span>
                      <span className="hero-approach-title text-[11px] font-black uppercase tracking-[0.3em] text-white/90 pb-0.5 transition-colors group-hover/btn:text-accent">
                        Our approach
                      </span>
                    </div>

                    <span className="hero-approach-arrow-wrap relative z-10 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/15 bg-white/[0.03] transition-all duration-500 group-hover/btn:border-accent/45 group-hover/btn:bg-accent/10">
                      <ArrowRight
                        className="text-white/40 transition-all duration-500 group-hover/btn:translate-x-0.5 group-hover/btn:text-accent"
                        size={16}
                        strokeWidth={2.5}
                      />
                    </span>
                  </Link>
                </div>
              </div>
            </aside>
          </div>
        </div>

        {/* scroll hint */}
        <div className="hero-scroll-hint pointer-events-none absolute bottom-6 left-1/2 z-10 hidden -translate-x-1/2 md:block">
          <div className="flex flex-col items-center gap-2 text-[9px] font-black uppercase tracking-[0.4em] text-white/30">
            <span>Scroll</span>
            <div className="hero-scroll-line h-10 w-px origin-top bg-gradient-to-b from-accent/60 to-transparent" />
          </div>
        </div>
      </section>

      {/* ── Reel section ── */}
      <section
        ref={reelRef}
        className="hero-reel-block relative border-t border-white/5 bg-background px-4 py-14 md:px-[5vw] md:py-20"
      >
        <div className="_container mx-auto mb-8 flex flex-col gap-3 text-center md:flex-row md:items-end md:justify-between md:text-left">
          <div>
            <p className="reel-kicker text-[10px] font-black uppercase tracking-[0.45em] text-accent">Showreel</p>
            <h2 className="reel-title mt-2 text-2xl font-black uppercase tracking-tight text-white md:text-3xl">
              Motion <span className="text-white/25 italic">&amp;</span> craft
            </h2>
          </div>
          <p className="reel-copy max-w-md text-sm text-white/40 md:text-base">
            A short reel — hover for colour, tap to expand on desktop.
          </p>
        </div>

        <div className="reel-video-shell group relative mx-auto max-w-6xl overflow-hidden rounded-2xl border border-white/[0.08] bg-black/50 md:rounded-3xl">
          <div className="pointer-events-none absolute inset-0 z-10 grid grid-cols-4 grid-rows-2 opacity-30">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="border-[0.5px] border-white/[0.06]" />
            ))}
          </div>

          <div className="relative aspect-video w-full md:aspect-[21/9] md:min-h-[320px]">
            <video
              autoPlay loop muted playsInline preload="metadata"
              className={`h-full w-full object-cover transition-all duration-[2s] group-hover:grayscale-0 ${expanded ? "scale-100" : "scale-[1.02] grayscale"
                }`}
            >
              <source src="https://thefirstthelast.agency/assets/video/reel_small.mp4" type="video/mp4" />
            </video>
            <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-black/20" />
            <button
              type="button"
              onClick={() => setExpanded((v) => !v)}
              className="absolute bottom-5 right-5 z-20 flex min-h-[44px] min-w-[44px] flex-col items-center justify-center gap-1 rounded-full border border-white/25 bg-black/50 px-5 py-3 text-[9px] font-black uppercase tracking-widest backdrop-blur-md transition-all hover:border-accent hover:bg-accent/20 md:bottom-8 md:right-8"
              aria-label={expanded ? "Minimize video" : "Expand video"}
            >
              {expanded ? "Minimize" : "Expand"}
              {expanded ? <ArrowDown size={14} /> : <Play size={14} />}
            </button>
          </div>
        </div>
      </section>
    </>
  );
}