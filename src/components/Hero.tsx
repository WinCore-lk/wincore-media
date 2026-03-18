"use client";

import { Suspense, useEffect, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, PointMaterial, Points, Sparkles } from "@react-three/drei";
import * as random from "maath/random/dist/maath-random.esm";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";
import { ArrowDown, Play } from "lucide-react";

function ParticleBackground() {
  const ref = useRef<any>(null);
  const sphere = random.inSphere(new Float32Array(5000), { radius: 1.6 });

  useFrame((_, delta) => {
    if (!ref.current) return;
    ref.current.rotation.x -= delta / 12;
    ref.current.rotation.y -= delta / 18;
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color="#00BFFF"
          size={0.006}
          sizeAttenuation
          depthWrite={false}
        />
      </Points>
    </group>
  );
}

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const split = new SplitType(".hero-title", { types: "lines,words,chars" });

      gsap.set(".hero-title .char", { yPercent: 110 });
      gsap.set(".hero-reveal", { y: 80, opacity: 0 });
      gsap.set(".hero-media-mask", { clipPath: "inset(100% 0 0 0 round 32px)" });

      const tl = gsap.timeline({ defaults: { ease: "expo.out" } });
      tl.to(".hero-title .char", {
        yPercent: 0,
        duration: 1.4,
        stagger: 0.012,
        delay: 0.35,
      })
        .to(
          ".hero-reveal",
          {
            y: 0,
            opacity: 1,
            duration: 1.1,
            stagger: 0.08,
          },
          "-=0.9",
        )
        .to(
          ".hero-media-mask",
          {
            clipPath: "inset(0% 0 0 0 round 32px)",
            duration: 1.9,
            ease: "power4.inOut",
          },
          "-=1.2",
        );

      gsap.to(".hero-parallax", {
        y: 150,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top",
        end: "bottom+=40% top",
        pin: true,
        scrub: 1.1,
        animation: gsap.timeline().to(".hero-fade", {
          opacity: 0,
          scale: 0.92,
          filter: "blur(6px)",
          ease: "power2.out",
        }),
      });

      return () => split.revert();
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen pt-[12vw] pb-[5vw] flex flex-col items-center justify-between overflow-hidden bg-background"
    >
      {/* WebGL Background */}
      <div className="pointer-events-none absolute inset-0 z-0 opacity-70">
        <Canvas camera={{ position: [0, 0, 1.6] }} dpr={[1, 1.5]}>
          <Suspense fallback={null}>
            <color attach="background" args={["#0A0A0A"]} />
            <Float speed={1.2} rotationIntensity={0.25} floatIntensity={0.6}>
              <ParticleBackground />
            </Float>
            <Sparkles
              count={80}
              speed={0.25}
              size={2}
              scale={[10, 6, 2]}
              color="#00BFFF"
              opacity={0.45}
            />
          </Suspense>
        </Canvas>
      </div>

      {/* Vignette */}
      <div className="pointer-events-none absolute inset-0 z-[1] bg-[radial-gradient(circle_at_top,_rgba(10,10,10,0)_0,_rgba(10,10,10,0.88)_62%,_rgba(10,10,10,1)_100%)]" />

      {/* Background watermark */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[50vw] font-black text-white/[0.02] pointer-events-none select-none italic">
        WINCOR
      </div>

      <div className="_container hero-fade relative z-10 w-full">
        <div className="flex justify-between items-center mb-[8vw] hero-reveal">
          <span className="text-[10px] uppercase tracking-[0.4em] font-black text-white/40">
            Colombo / Negombo / Global
          </span>
          <span className="text-[10px] uppercase tracking-[0.4em] font-black text-accent">
            WINCORE MEDIA®
          </span>
        </div>

        <div className="hero-parallax w-full">
          <h1 className="hero-title text-[13vw] md:text-[8vw] leading-[0.82] font-black uppercase tracking-tighter text-center">
            Award‑Winning <br />
            <span className="text-white/10 italic">Creative</span> Digital <br />
            Agency
          </h1>

          <div className="hero-reveal mt-10 flex flex-col items-center gap-4">
            <p className="text-[11px] uppercase tracking-[0.45em] font-black text-white/45 text-center">
              Success Designed Differently <span className="text-accent">•</span> We turn brands into experiences
            </p>
            <p className="text-sm md:text-base text-white/55 max-w-[56ch] text-center font-light leading-relaxed">
              Colombo & global — immersive websites, cinematic storytelling, performance marketing, and AI-powered builds.
            </p>
          </div>
        </div>
      </div>

      <div className="w-full h-[52vh] md:h-[78vh] relative overflow-hidden px-[5vw] mt-[5vw] hero-fade">
        <div className="hero-media-mask w-full h-full relative rounded-[2rem] overflow-hidden group border border-white/10 bg-black/40">
          <div className="absolute inset-0 z-10 pointer-events-none border-[0.5px] border-white/10 grid grid-cols-4 grid-rows-2">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="border-[0.5px] border-white/5" />
            ))}
          </div>

          <video
            autoPlay
            loop
            muted
            playsInline
            className={`w-full h-full object-cover transition-transform duration-[3s] grayscale group-hover:grayscale-0 ${
              expanded ? "scale-100" : "scale-110"
            }`}
          >
            <source src="https://thefirstthelast.agency/assets/video/reel_small.mp4" type="video/mp4" />
          </video>

          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

          <button
            type="button"
            onClick={() => setExpanded((v) => !v)}
            className="absolute bottom-8 right-8 md:bottom-12 md:right-12 z-20 w-28 h-28 md:w-32 md:h-32 rounded-full border border-white/20 bg-white/5 backdrop-blur-xl flex flex-col items-center justify-center gap-2 hover:bg-white hover:text-black transition-all"
            aria-label={expanded ? "Collapse showreel" : "Expand showreel"}
          >
            <span className="text-[10px] uppercase tracking-widest font-black">
              {expanded ? "Close" : "Expand"}
            </span>
            {expanded ? <Play size={14} /> : <ArrowDown size={14} />}
          </button>
        </div>
      </div>

      <div className="absolute bottom-8 left-12 hero-reveal hidden md:block">
        <div className="flex items-center gap-6">
          <div className="w-px h-12 bg-white/20 animate-scroll-line" />
          <span className="text-[10px] uppercase tracking-[0.5em] font-black opacity-30 origin-left -rotate-90">
            Scroll To Explore
          </span>
        </div>
      </div>
    </section>
  );
}
