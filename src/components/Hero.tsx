"use client";

import { Suspense, useEffect, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, PointMaterial, Points, Sparkles } from "@react-three/drei";
import * as random from "maath/random/dist/maath-random.esm";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";
import { ArrowDown, Play } from "lucide-react";

// ─────────────────────────────────────
// WebGL particle sphere
// ─────────────────────────────────────
function ParticleField() {
  const ref = useRef<any>(null);
  const [sphere] = useState(() =>
    random.inSphere(new Float32Array(6000), { radius: 1.5 })
  );

  useFrame((_, delta) => {
    if (!ref.current) return;
    ref.current.rotation.x -= delta / 14;
    ref.current.rotation.y -= delta / 20;
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color="#00BFFF"
          size={0.005}
          sizeAttenuation
          depthWrite={false}
          opacity={0.85}
        />
      </Points>
    </group>
  );
}

// ─────────────────────────────────────
// Hero
// ─────────────────────────────────────
export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const splits: SplitType[] = [];

    const ctx = gsap.context(() => {
      // 1. Split h1 into chars
      const titleEl = containerRef.current?.querySelector(".hero-title") as HTMLElement;
      if (!titleEl) return;

      const split = new SplitType(titleEl, { types: "chars,lines" });
      splits.push(split);

      // Title reveal: 3D perspective reveal
      if (split.chars) {
        gsap.fromTo(
          split.chars,
          { opacity: 0, y: 100, rotateX: -90, transformOrigin: "50% 50% -100px" },
          {
            opacity: 1,
            y: 0,
            rotateX: 0,
            duration: 1.2,
            stagger: 0.015,
            ease: "expo.out",
            delay: 0.8,
            clearProps: "all",
          }
        );
      }

      // 2. Kicker / Sub / Button / Reels
      gsap.fromTo(".hero-kicker",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 1, ease: "expo.out", delay: 0.4, clearProps: "all" }
      );

      gsap.fromTo(".hero-sub",
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1.2, ease: "expo.out", delay: 1, clearProps: "all" }
      );

      gsap.fromTo(".hero-reel",
        { opacity: 0, scale: 0.95, y: 40 },
        { opacity: 1, scale: 1, y: 0, duration: 1.5, ease: "expo.out", delay: 1.2, clearProps: "all" }
      );

      gsap.fromTo(".hero-scroll-hint",
        { opacity: 0 },
        { opacity: 1, duration: 1, delay: 2, clearProps: "opacity" }
      );

      // 3. Scroll effects
      gsap.to(".hero-title-wrap", {
        y: -100,
        opacity: 0,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        }
      });
      gsap.to(".hero-reel", {
        scale: 1.05,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        }
      });
    }, containerRef);

    return () => {
      splits.forEach((s) => s.revert());
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative flex min-h-[110vh] flex-col items-center justify-between overflow-hidden bg-background pb-[5vw] pt-[12vw]"
    >
      {/* ── WebGL ── */}
      <div className="pointer-events-none absolute inset-0 z-0 opacity-35">
        <Canvas camera={{ position: [0, 0, 1.5] }} dpr={[1, 2]}>
          <Suspense fallback={null}>
            <color attach="background" args={["#0A0A0A"]} />
            <Float speed={1.4} rotationIntensity={0.4} floatIntensity={0.7}>
              <ParticleField />
            </Float>
            <Sparkles count={100} speed={0.35} size={1.2} scale={[14, 9, 4]} color="#00BFFF" opacity={0.25} />
          </Suspense>
        </Canvas>
      </div>

      {/* ── Vignette ── */}
      <div className="pointer-events-none absolute inset-0 z-[1] bg-[radial-gradient(ellipse_at_center,transparent_20%,rgba(10,10,10,0.75)_65%,rgba(10,10,10,1)_100%)]" />

      {/* ── Giant watermark ── */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 select-none text-[58vw] font-black italic tracking-tighter text-white/[0.012]">
        WINCORE
      </div>

      {/* ── Main content (fades on scroll) ── */}
      <div className="hero-content _container relative z-10 w-full">
        {/* Meta bar */}
        <div className="hero-meta mb-[8vw] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent" />
            <span className="text-[10px] font-black uppercase tracking-[0.5em] text-white/25">
              Live · Colombo · Global
            </span>
          </div>
          <span className="text-[10px] font-black uppercase tracking-[0.5em] text-accent/70">
            Wincore Media®
          </span>
        </div>

        {/* Title */}
        <div className="hero-title-wrap flex flex-col items-center">
          <h1
            className="hero-title w-full text-center text-[15vw] font-black uppercase leading-[0.78] tracking-[-0.04em] md:text-[10vw]"
            style={{ perspective: "900px" }}
          >
            Creating <br />
            <span className="font-light italic text-white/5">Icons</span> Of <br />
            Digital Era
          </h1>
        </div>

        {/* Sub */}
        <div className="hero-sub mt-12 flex flex-col items-center gap-5">
          <p className="text-[10px] font-black uppercase tracking-[0.65em] text-white/25">
            Success Designed&nbsp;
            <span className="text-secondary italic">Differently</span>
          </p>
          <p className="max-w-[58ch] text-center text-sm font-light leading-relaxed text-white/35 md:text-lg">
            We engineer hyper-premium digital experiences — cinematic storytelling, AI-powered builds, and WebGL-heavy interfaces.
          </p>
        </div>
      </div>

      {/* ── Showreel ── */}
      <div className="hero-reel relative mt-[5vw] w-full overflow-hidden px-[5vw]">
        <div className="group relative h-[50vh] w-full overflow-hidden rounded-[1.75rem] border border-white/[0.08] bg-black/50 md:h-[74vh]">
          {/* Grid overlay */}
          <div className="pointer-events-none absolute inset-0 z-10 grid grid-cols-4 grid-rows-2">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="border-[0.5px] border-white/[0.04]" />
            ))}
          </div>

          <video
            autoPlay
            loop
            muted
            playsInline
            className={`h-full w-full object-cover grayscale transition-all duration-[2.5s] group-hover:grayscale-0 ${
              expanded ? "scale-100" : "scale-[1.08]"
            }`}
          >
            <source src="https://thefirstthelast.agency/assets/video/reel_small.mp4" type="video/mp4" />
          </video>

          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

          {/* Expand button */}
          <button
            type="button"
            onClick={() => setExpanded((v) => !v)}
            className="absolute bottom-8 right-8 z-20 flex h-28 w-28 flex-col items-center justify-center gap-2 rounded-full border border-white/15 bg-white/5 backdrop-blur-xl transition-all duration-500 hover:border-accent hover:bg-accent md:bottom-12 md:right-12 md:h-32 md:w-32"
            aria-label={expanded ? "Collapse" : "Expand showreel"}
          >
            <span className="text-[9px] font-black uppercase tracking-widest">
              {expanded ? "Close" : "Play"}
            </span>
            {expanded ? <Play size={12} /> : <ArrowDown size={12} />}
          </button>
        </div>
      </div>

      {/* ── Scroll hint ── */}
      <div className="hero-scroll-hint absolute bottom-8 left-12 hidden md:flex items-center gap-5">
        <div className="h-10 w-px animate-scroll-line bg-white/15" />
        <span className="origin-left -rotate-90 text-[9px] font-black uppercase tracking-[0.55em] text-white/20">
          Scroll
        </span>
      </div>
    </section>
  );
}
