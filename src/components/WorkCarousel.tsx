"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import Image from "next/image";
import ProjectModal, { type Project } from "@/components/ProjectModal";
import {
  registerGsapPlugins,
  getScroller,
  prefersReducedMotion,
} from "@/lib/motion";

const PROJECTS: Project[] = [
  {
    id: 1,
    title: "Luminex Ecosystem",
    category: "Vibrant UI / 3D",
    image: "/works/vibrant_webgl.png",
    tags: ["WebGL", "3D UI", "Performance"],
    description: "A neon-fused, high-performance interface for a decentralized tech network. Immersive visuals and colorful data-flow.",
    stack: "React, Three.js, GSAP",
    duration: "10 Weeks",
    role: "Lead Agency",
    impact: "+240% Speed",
    link: "https://luminex.tech",
  },
  {
    id: 2,
    title: "Aurum FinTech",
    category: "Branding / Web Product",
    image: "/works/vibrant_fintech.png",
    tags: ["Fintech", "Glassmorphism", "Branding"],
    description: "Reimagining modern finance with an emerald-gold aesthetic. High saturation, premium glass surfaces, and sophisticated data visualisations.",
    stack: "Next.js, D3.js, GSAP",
    duration: "8 Weeks",
    role: "Core Studio",
    impact: "99% Uptime",
    link: "https://aurum.finance",
  },
  {
    id: 3,
    title: "Nova AI Studio",
    category: "Product / Motion",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=1200",
    tags: ["AI", "Creative", "Motion"],
    description: "Vibrant magenta and violet gradients powering the next generation of creative AI platforms. A study in color and flow.",
    stack: "React, Framer, AI",
    duration: "12 Weeks",
    role: "Creative Partner",
    impact: "1M+ Users",
    link: "https://nova-ai.io",
  },
  {
    id: 4,
    title: "Pulse Tourism",
    category: "Video / Experience",
    image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&q=80&w=1200",
    tags: ["Video", "Cinematic", "Tropics"],
    description: "Hyper-colored cinematic tours for luxury island retreats. Rich tropical palettes and vibrant motion choreography.",
    stack: "After Effects, DaVinci",
    duration: "6 Weeks",
    role: "Production",
    impact: "+300% Booking",
    link: "https://pulse.travel",
  },
  {
    id: 5,
    title: "Vanguard Mobility",
    category: "App / Motion",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1200",
    tags: ["Mobile", "Prototyping", "UI/UX"],
    description: "A dark-mode first UI for premium electric mobility. Fluid micro-interactions and high-contrast typography.",
    stack: "React Native, Reanimated",
    duration: "14 Weeks",
    role: "UX & Dev Partner",
    impact: "4.9 App Store",
    link: "https://vanguard.eco",
  },
  {
    id: 6,
    title: "Aura Architecture",
    category: "Web / Editorial",
    image: "https://images.unsplash.com/photo-1600607686527-6fb886090705?auto=format&fit=crop&q=80&w=1200",
    tags: ["Minimal", "Layout", "Typography"],
    description: "A brutalist yet pristine editorial platform showcasing avant-garde architectural designs.",
    stack: "Next.js, Sanity, GSAP",
    duration: "8 Weeks",
    role: "Full Service",
    impact: "+150% Engagement",
    link: "https://aura-arch.com",
  },
  {
    id: 7,
    title: "Nexus Labs",
    category: "3D / Brand",
    image: "https://images.unsplash.com/photo-1614729939124-032f0b56c9ce?auto=format&fit=crop&q=80&w=1200",
    tags: ["Brand", "3D", "Identity"],
    description: "Brand identity and immersive 3D landing page for a deep-tech research firm. Metallic materials and dynamic lighting.",
    stack: "Spline, React",
    duration: "6 Weeks",
    role: "Visual Lead",
    impact: "Seed Funded",
    link: "https://nexus-labs.ai",
  },
  {
    id: 8,
    title: "Chroma E-Commerce",
    category: "Commerce / UX",
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=1200",
    tags: ["Shopify", "Headless", "UX"],
    description: "A blazingly fast headless commerce storefront for a high-end streetwear label. Infinite scrolling and 3D product previews.",
    stack: "Hydrogen, Tailwind",
    duration: "12 Weeks",
    role: "Tech Partner",
    impact: "+35% Conv. Rate",
    link: "https://chroma.store",
  },
];

export default function WorkCarousel() {
  const sectionRef = useRef<HTMLElement>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  useEffect(() => {
    registerGsapPlugins();
    const scroller = getScroller();
    const reduced = prefersReducedMotion();
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>(".wc-reveal-item");
      cards.forEach((card, i) => {
        gsap.fromTo(
          card,
          { y: reduced ? 0 : 64, opacity: reduced ? 1 : 0, scale: reduced ? 1 : 0.96 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: reduced ? 0 : 0.9,
            delay: i * 0.04,
            ease: "power4.out",
            scrollTrigger: {
              trigger: card,
              scroller,
              start: "top 86%",
              once: true,
            },
          },
        );

        if (!reduced) {
          gsap.to(card, {
            yPercent: -2,
            ease: "none",
            scrollTrigger: {
              trigger: card,
              scroller,
              start: "top bottom",
              end: "bottom top",
              scrub: 0.8,
            },
          });
        }
      });

      const media = gsap.utils.toArray<HTMLElement>(".wc-media");
      media.forEach((el) => {
        if (reduced) return;
        gsap.fromTo(
          el,
          { scale: 1.08 },
          {
            scale: 1,
            ease: "none",
            scrollTrigger: {
              trigger: el,
              scroller,
              start: "top 92%",
              end: "bottom 20%",
              scrub: 0.8,
            },
          },
        );
      });
    }, section);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section
      id="works"
      ref={sectionRef}
      className="relative overflow-hidden bg-background py-20 md:py-28"
      aria-label="Featured works"
    >
      <div className="_container relative z-10">
        <div className="mb-14 flex flex-col gap-6 md:mb-20 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <span className="mb-5 inline-block text-[10px] font-black uppercase leading-[1.35] tracking-[0.42em] text-accent">
              Selected Archives
            </span>
            <h2 className="font-heading text-4xl font-black uppercase leading-[1.02] tracking-tighter text-foreground md:text-5xl lg:text-7xl">
              Works that <br />
              <span className="text-black/30 italic">rewrite the rules</span>
            </h2>
          </div>
          <p className="max-w-md text-sm font-light leading-relaxed text-black/45 md:text-base md:text-right">
            Scroll down to move through projects. Each card pops in, then hands focus to the next.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-x-16 md:gap-y-32">
          {PROJECTS.map((project, i) => (
            <div key={project.id} className={`wc-reveal-item ${i % 2 !== 0 ? 'md:mt-32' : ''}`}>
              <button
                type="button"
                onClick={() => setSelectedProject(project)}
                className="wc-card wc-refer-card group relative block w-full text-left outline-none"
              >
                <div className="wc-refer-inner relative aspect-[4/5] md:aspect-[3/4] lg:aspect-[4/5] w-full overflow-hidden rounded-[2rem] bg-black/5 shadow-[0_24px_64px_rgba(0,0,0,0.04)] transition-all duration-700 group-hover:shadow-[0_40px_80px_rgba(0,191,255,0.15)] group-hover:-translate-y-2">
                  <div className="wc-media wc-refer-media absolute inset-0 transition-transform duration-1000 group-hover:scale-110">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 1240px"
                      quality={95}
                      priority={i === 0}
                      loading={i === 0 ? undefined : "lazy"}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                  </div>

                  <div className="absolute inset-x-0 bottom-0 z-10 p-8 md:p-10 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    <div className="bg-black/20 backdrop-blur-md rounded-2xl p-6 border border-white/20 shadow-2xl">
                      <span className="mb-2 block text-[9px] font-black uppercase leading-[1.35] tracking-[0.4em] text-accent">
                        {project.category}
                      </span>
                      <h3 className="wc-refer-title text-2xl font-black uppercase leading-[0.95] tracking-tight text-white md:text-3xl">
                        {project.title}
                      </h3>
                      <div className="mt-5 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                        <p className="text-[10px] font-black uppercase leading-[1.35] tracking-[0.2em] text-white">
                          View Case Study
                        </p>
                        <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center text-white">
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </button>
            </div>
          ))}
        </div>
      </div>

      <ProjectModal project={selectedProject} isOpen={!!selectedProject} onClose={() => setSelectedProject(null)} />
    </section>
  );
}
