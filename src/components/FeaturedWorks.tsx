"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ArrowUpRight } from "lucide-react";

interface Project {
  id: number;
  title: string;
  category: string;
  image: string;
  year: string;
}

const projects: Project[] = [
  {
    id: 1,
    title: "Brand Campaign for a local bank",
    category: "Branding",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80",
    year: "2024",
  },
  {
    id: 2,
    title: "AI-Powered Social Media",
    category: "AI / Development",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80",
    year: "2024",
  },
  {
    id: 3,
    title: "Mountain Motion Series",
    category: "Motion Video",
    image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80",
    year: "2023",
  },
  {
    id: 4,
    title: "Next-Gen WebGL Startup",
    category: "UX/UI + WebGL",
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&q=80",
    year: "2023",
  },
  {
    id: 5,
    title: "Colombo Tourism Board",
    category: "Branding",
    image: "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?auto=format&fit=crop&q=80",
    year: "2024",
  },
];

export default function FeaturedWorks() {
  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>(".project-card");

      // Horizontal scroll section
      const totalWidth = cards.length * 70;

      gsap.to(containerRef.current, {
        xPercent: -totalWidth,
        ease: "none",
        scrollTrigger: {
          trigger: triggerRef.current,
          start: "top top",
          end: () => `+=${(containerRef.current?.offsetWidth || 0) * 1.2}`,
          scrub: 1,
          pin: true,
        },
      });

      // Intro title animation
      gsap.from(".works-heading, .works-kicker", {
        y: 40,
        opacity: 0,
        duration: 1,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: triggerRef.current,
          start: "top 75%",
        },
      });

      // Hover tilt / magnetic
      cards.forEach((card) => {
        const image = card.querySelector(".project-image") as HTMLElement;
        const overlay = card.querySelector(".project-overlay") as HTMLElement;

        card.addEventListener("mousemove", (e: MouseEvent) => {
          const rect = card.getBoundingClientRect();
          const x = (e.clientX - rect.left) / rect.width;
          const y = (e.clientY - rect.top) / rect.height;

          gsap.to(image, {
            x: (x - 0.5) * 36,
            y: (y - 0.5) * 24,
            rotationX: (y - 0.5) * -8,
            rotationY: (x - 0.5) * 8,
            scale: 1.06,
            duration: 0.4,
            ease: "power2.out",
          });

          gsap.to(overlay, {
            opacity: 1,
            duration: 0.25,
          });
        });

        card.addEventListener("mouseleave", () => {
          gsap.to(image, {
            x: 0,
            y: 0,
            rotationX: 0,
            rotationY: 0,
            scale: 1,
            duration: 0.45,
            ease: "power2.out",
          });

          gsap.to(overlay, {
            opacity: 0,
            duration: 0.25,
          });
        });
      });
    }, triggerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="works"
      ref={triggerRef}
      className="relative h-screen overflow-hidden bg-background"
    >
      {/* Title Header */}
      <div className="pointer-events-none absolute top-0 left-0 z-10 flex w-full items-end justify-between px-6 py-20 md:px-12">
        <div>
          <p className="works-kicker mb-4 text-xs font-bold uppercase tracking-[0.4em] text-accent">
            Works
          </p>
          <p className="works-heading max-w-xl text-3xl font-bold leading-tight text-white md:text-5xl">
            Featured campaigns and experiences.
          </p>
        </div>
        <div className="hidden md:block">
          <span className="text-xs font-medium uppercase tracking-[0.3em] text-white/40">
            Horizontal reel · 0{projects.length}
          </span>
        </div>
      </div>

      <div
        ref={containerRef}
        className="flex h-full items-center gap-10 pl-[15vw] pr-[30vw] pt-24"
      >
        {projects.map((project) => (
          <div
            key={project.id}
            className="project-card group relative flex h-[55vh] w-[75vw] flex-shrink-0 cursor-pointer overflow-hidden rounded-[32px] border border-white/10 bg-black/40 backdrop-blur-sm md:w-[520px]"
          >
            <div className="project-image absolute inset-0 h-full w-full transition-transform duration-700">
              <Image
                src={project.image}
                alt={project.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 600px"
              />
            </div>

            <div className="project-overlay pointer-events-none absolute inset-0 flex flex-col justify-between bg-gradient-to-t from-black/80 via-black/40 to-transparent p-7 opacity-0">
              <div className="flex items-start justify-between">
                <span className="text-xs font-bold uppercase tracking-[0.3em] text-white/80">
                  {project.year}
                </span>
                <div className="rounded-full border border-white/30 bg-white/10 p-2 backdrop-blur-md">
                  <ArrowUpRight size={18} />
                </div>
              </div>

              <div>
                <span className="mb-2 block text-xs font-bold uppercase tracking-[0.35em] text-accent">
                  {project.category}
                </span>
                <h3 className="text-xl font-semibold text-white md:text-2xl">
                  {project.title}
                </h3>
              </div>
            </div>

            {/* Bottom info for when not hovered */}
            <div className="absolute -bottom-1 left-0 z-20 w-full p-6 text-white transition-opacity duration-300 group-hover:opacity-0">
              <p className="mb-1 text-[10px] font-bold uppercase tracking-[0.3em] text-white/50">
                {project.category}
              </p>
              <h3 className="text-lg font-semibold">{project.title}</h3>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
