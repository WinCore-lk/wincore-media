"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import ProjectModal, { type Project } from "@/components/ProjectModal";

const PROJECTS: Project[] = [
  {
    id: 1,
    title: "Brand Campaign for a local bank",
    category: "Branding / Strategy",
    image:
      "https://images.unsplash.com/photo-1554469384-e58fac16e23a?auto=format&fit=crop&q=80&w=1600",
    tags: ["Strategy", "Visual Identity", "UX"],
  },
  {
    id: 2,
    title: "AI-Powered Social Media Platform",
    category: "AI / Development",
    image:
      "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=1600",
    tags: ["AI", "Product", "Engineering"],
  },
  {
    id: 3,
    title: "Motion Video Series for Tourism Board",
    category: "Motion / Video",
    image:
      "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&q=80&w=1600",
    tags: ["Production", "Cinematography", "Editing"],
  },
  {
    id: 4,
    title: "Full Website + WebGL for a tech startup",
    category: "UX/UI / WebGL",
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1600",
    tags: ["Creative Code", "Interaction", "WebGL"],
  },
];

export default function WorkCarousel() {
  const triggerRef = useRef<HTMLDivElement>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const horizontalScroll = gsap.to(".wc-project-card-wrapper", {
        xPercent: -100 * PROJECTS.length,
        ease: "none",
        scrollTrigger: {
          trigger: triggerRef.current,
          pin: true,
          scrub: 1,
          start: "top top",
          end: () => `+=${(triggerRef.current?.offsetWidth || 0) * 3}`,
          invalidateOnRefresh: true,
        },
      });

      gsap.to(".wc-bg-text", {
        x: -500,
        ease: "none",
        scrollTrigger: {
          trigger: triggerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });

      // Premium hover tilt + lift for each card
      const cards = gsap.utils.toArray<HTMLElement>(".wc-tilt");
      cards.forEach((card) => {
        const media = card.querySelector(".wc-media") as HTMLElement | null;
        const shine = card.querySelector(".wc-shine") as HTMLElement | null;
        if (!media) return;

        gsap.set(card, { transformPerspective: 900, transformOrigin: "center" });
        const toRX = gsap.quickTo(card, "rotationX", { duration: 0.35, ease: "power3.out" });
        const toRY = gsap.quickTo(card, "rotationY", { duration: 0.35, ease: "power3.out" });
        const toY = gsap.quickTo(card, "y", { duration: 0.35, ease: "power3.out" });
        const toS = gsap.quickTo(card, "scale", { duration: 0.35, ease: "power3.out" });
        const toMX = gsap.quickTo(media, "x", { duration: 0.6, ease: "power3.out" });
        const toMY = gsap.quickTo(media, "y", { duration: 0.6, ease: "power3.out" });
        const toMS = gsap.quickTo(media, "scale", { duration: 0.8, ease: "power3.out" });
        const toShine = shine
          ? gsap.quickTo(shine, "opacity", { duration: 0.25, ease: "power2.out" })
          : null;

        const onMove = (e: MouseEvent) => {
          const r = card.getBoundingClientRect();
          const px = (e.clientX - r.left) / r.width;
          const py = (e.clientY - r.top) / r.height;
          const rx = (py - 0.5) * -10;
          const ry = (px - 0.5) * 12;
          toRX(rx);
          toRY(ry);
          toY(-8);
          toS(1.01);
          toMX((px - 0.5) * 20);
          toMY((py - 0.5) * 16);
          toMS(1.08);
          toShine?.(1);
          if (shine) {
            shine.style.background = `radial-gradient(600px circle at ${px * 100}% ${py * 100}%, rgba(0,191,255,0.18), transparent 45%)`;
          }
        };

        const onLeave = () => {
          toRX(0);
          toRY(0);
          toY(0);
          toS(1);
          toMX(0);
          toMY(0);
          toMS(1);
          toShine?.(0);
        };

        card.addEventListener("mousemove", onMove);
        card.addEventListener("mouseleave", onLeave);
      });

      return () => horizontalScroll.kill();
    }, triggerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="works"
      ref={triggerRef}
      className="relative min-h-screen overflow-hidden bg-background py-[10vh] border-t border-white/5"
      aria-label="Featured works"
    >
      <div className="wc-bg-text absolute top-1/2 left-[-10vw] -translate-y-1/2 text-[40vw] font-black text-white/[0.02] pointer-events-none select-none uppercase italic whitespace-nowrap">
        Works
      </div>

      <div className="_container relative z-10 mb-[5vh]">
        <div className="flex flex-col md:flex-row justify-between items-end gap-10">
          <div>
            <p className="text-accent text-[11px] uppercase tracking-[0.6em] font-black mb-8 italic">
              Selected Work
            </p>
            <h2 className="text-[12vw] md:text-[6vw] leading-[0.85] font-black uppercase tracking-tighter">
              Our <br />
              <span className="text-white/10 italic">Works</span>
            </h2>
          </div>
          <div className="flex items-center gap-10 mb-3">
            <span className="text-[10px] uppercase tracking-[0.5em] font-black opacity-30">
              Selection 2026®
            </span>
            <div className="w-24 h-px bg-white/10" />
          </div>
        </div>
      </div>

      <div className="relative h-[80vh] flex">
        <div className="flex h-full">
          <div className="wc-project-card-wrapper w-[100vw] flex items-center justify-center flex-shrink-0">
            <div className="text-center">
              <p className="text-accent text-[11px] uppercase tracking-[0.5em] font-black mb-8 italic">
                Scroll To Reveal Projects
              </p>
              <div className="w-px h-32 bg-gradient-to-b from-accent to-transparent mx-auto" />
            </div>
          </div>

          {PROJECTS.map((project, i) => (
            <div
              key={project.id}
              className="wc-project-card-wrapper w-[100vw] h-full flex-shrink-0 px-[10vw]"
            >
              <button
                type="button"
                onClick={() => setSelectedProject(project)}
                className="wc-tilt cursor-hover group relative w-full h-[65vh] md:h-full overflow-hidden bg-muted rounded-[2rem] border border-white/10 text-left shadow-[0_20px_80px_rgba(0,0,0,0.55)]"
              >
                <div className="wc-media absolute inset-0 scale-125">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover grayscale group-hover:grayscale-0 opacity-40 group-hover:opacity-100 transition-all duration-[1s]"
                    sizes="100vw"
                  />
                </div>

                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent pointer-events-none" />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="wc-shine absolute inset-0 opacity-0 pointer-events-none" />

                <div className="absolute top-10 left-10 flex items-center gap-4">
                  <span className="text-[12px] font-black italic text-accent opacity-70">
                    {i + 1} / {PROJECTS.length}
                  </span>
                </div>

                <div className="absolute bottom-0 left-0 p-10 md:p-16 w-full flex flex-col md:flex-row justify-between items-end gap-10">
                  <div className="max-w-[70%]">
                    <p className="text-accent text-[11px] uppercase tracking-[0.4em] mb-4 font-black">
                      {project.category}
                    </p>
                    <h3 className="text-[10vw] md:text-[5vw] leading-[0.85] text-white font-black uppercase tracking-tighter">
                      {project.title.split(" ").map((word, idx) => (
                        <span key={idx} className="block">
                          {word}
                        </span>
                      ))}
                    </h3>
                  </div>

                  <div className="flex flex-col items-end gap-6 text-right">
                    <ul className="flex flex-wrap gap-3 justify-end">
                      {project.tags.map((tag) => (
                        <li
                          key={tag}
                          className="text-[10px] uppercase tracking-widest font-black px-4 py-2 bg-white/5 rounded-full border border-white/10"
                        >
                          {tag}
                        </li>
                      ))}
                    </ul>
                    <div className="flex items-center gap-4 group/btn">
                      <span className="text-xl md:text-2xl font-black italic tracking-tighter transform group-hover/btn:translate-x-[-10px] transition-transform">
                        VIEW PROJECT
                      </span>
                      <div className="w-14 h-14 rounded-full bg-accent flex items-center justify-center">
                        <svg
                          viewBox="0 0 24 24"
                          className="w-6 h-6 text-white"
                          fill="none"
                          stroke="currentColor"
                          aria-hidden="true"
                        >
                          <path d="M5 12h14M12 5l7 7-7 7" strokeWidth="3" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </button>
            </div>
          ))}
        </div>
      </div>

      <ProjectModal
        project={selectedProject}
        isOpen={!!selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
}

