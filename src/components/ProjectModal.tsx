"use client";

import { useEffect, useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import Image from "next/image";
import { X, ArrowRight, ExternalLink, Calendar, Code2, Rocket, Briefcase } from "lucide-react";
import Link from "next/link";

export type Project = {
  id: number;
  title: string;
  category: string;
  image: string;
  tags: string[];
  description: string;
  stack: string;
  duration: string;
  role: string;
  impact: string;
  link: string;
};

import GrainOverlay from "@/components/GrainOverlay";

export default function ProjectModal({
  project,
  isOpen,
  onClose,
}: {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}) {
  const modalRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!isOpen) return;

    const ctx = gsap.context(() => {
      // Reset states
      gsap.set(".modal-bg", { opacity: 0 });
      gsap.set(".modal-content", { y: 60, opacity: 0, scale: 0.98, filter: "blur(10px)" });
      gsap.set(".stagger-item", { y: 30, opacity: 0 });
      gsap.set(".image-reveal", { scale: 1.15, opacity: 0, filter: "contrast(1.2) brightness(0.8)" });
      gsap.set(".meta-item", { x: -25, opacity: 0 });
      gsap.set(".close-btn", { scale: 0, opacity: 0 });

      const tl = gsap.timeline({ defaults: { ease: "expo.out" } });

      tl.to(".modal-bg", {
        opacity: 1,
        duration: 1,
      })
      .to(".modal-content", {
        y: 0,
        opacity: 1,
        scale: 1,
        filter: "blur(0px)",
        duration: 1.4,
      }, "-=0.6")
      .to(".image-reveal", {
        scale: 1,
        opacity: 1,
        filter: "contrast(1) brightness(1)",
        duration: 1.8,
        ease: "power3.out"
      }, "-=1.2")
      .to(".stagger-item", {
        y: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.12,
      }, "-=1.4")
      .to(".meta-item", {
        x: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.1,
      }, "-=1.2")
      .to(".close-btn", {
        scale: 1,
        opacity: 1,
        duration: 0.8,
        ease: "back.out(1.7)"
      }, "-=1.5");

      // Floating animation for image
      gsap.to(".image-reveal img", {
        yPercent: 3,
        duration: 8,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });
    }, modalRef);

    return () => ctx.revert();
  }, [isOpen]);

  useEffect(() => {
    const onEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", onEsc);
    } else {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onEsc);
    }

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onEsc);
    };
  }, [isOpen, onClose]);

  if (!project) return null;

  return (
    <div
      ref={modalRef}
      className={`fixed inset-0 z-[2000] flex items-center justify-center p-0 md:p-6 lg:p-12 transition-all duration-500 ${isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
      role="dialog"
      aria-modal="true"
      aria-label={`Project: ${project.title}`}
    >
      {/* Background Overlay */}
      <div 
        className="modal-bg absolute inset-0 bg-black/95 backdrop-blur-3xl"
        onMouseDown={onClose}
      />

      {/* Modal Container */}
      <div 
        ref={contentRef}
        className="modal-content relative w-full max-w-[1400px] h-full md:h-auto max-h-full overflow-hidden bg-[#0a0a0a] md:rounded-[2.5rem] border border-white/10 shadow-[0_50px_100px_rgba(0,0,0,0.9)] flex flex-col lg:flex-row"
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-6 right-6 z-[2010] w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white hover:text-black transition-all group backdrop-blur-md"
          aria-label="Close project modal"
        >
          <X className="w-5 h-5 group-hover:rotate-90 transition-transform duration-500" />
        </button>

        {/* Left: Image / Visual Section */}
        <div className="relative w-full lg:w-3/5 h-[40vh] lg:h-auto overflow-hidden bg-zinc-900">
          <div className="image-reveal absolute inset-0">
            <Image 
              src={project.image} 
              alt={project.title} 
              fill 
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 60vw"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent opacity-60" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a]/40 via-transparent to-transparent hidden lg:block" />
          </div>
          
          {/* Subtle decoration */}
          <div className="absolute bottom-8 left-8 right-8 flex items-end justify-between stagger-item">
            <div className="hidden md:block">
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-black/40 mb-2 block">Visual identity</span>
              <div className="h-px w-24 bg-accent/30" />
            </div>
          </div>
        </div>

        {/* Right: Content Section */}
        <div className="w-full lg:w-2/5 p-8 md:p-12 lg:p-16 overflow-y-auto scrollbar-hide flex flex-col">
          <div className="mb-auto">
            <div className="stagger-item">
              <span className="text-accent uppercase tracking-[0.4em] font-black text-[10px] mb-4 block">
                Case Study / {project.category}
              </span>
              <h2 className="text-4xl md:text-5xl lg:text-3xl font-black leading-[0.95] mb-8 text-foreground uppercase tracking-tighter">
                {project.title}
              </h2>
            </div>

            <div className="space-y-6 text-black/50 text-base md:text-lg font-light leading-relaxed stagger-item">
              <p>
                A cinematic creative solution crafted by Wincore Agency. We combined strategic storytelling with immersive motion and luxury-grade UI to drive measurable outcomes.
              </p>
              <p>
                Built with Next.js, Three.js, and GSAP, the experience balances performance with high-end interaction design.
              </p>
            </div>

            <div className="mt-10 flex flex-wrap gap-2.5 stagger-item">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-[9px] uppercase tracking-widest font-bold px-4 py-2 bg-black/5 rounded-full border border-black/10 text-black/70 hover:bg-accent/10 hover:border-accent/30 transition-colors"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Meta Grid */}
            <div className="mt-16 grid grid-cols-2 gap-x-8 gap-y-10 pt-10 border-t border-black/5">
              <div className="meta-item">
                <div className="flex items-center gap-2 mb-3">
                  <Calendar className="w-3.5 h-3.5 text-accent" />
                  <h4 className="text-[10px] uppercase tracking-[0.2em] font-black text-black/30">Duration</h4>
                </div>
                <p className="text-sm font-medium text-black/90">{project.duration}</p>
              </div>
              
              <div className="meta-item">
                <div className="flex items-center gap-2 mb-3">
                  <Briefcase className="w-3.5 h-3.5 text-accent" />
                  <h4 className="text-[10px] uppercase tracking-[0.2em] font-black text-black/30">Role</h4>
                </div>
                <p className="text-sm font-medium text-black/90">{project.role}</p>
              </div>

              <div className="meta-item">
                <div className="flex items-center gap-2 mb-3">
                  <Code2 className="w-3.5 h-3.5 text-accent" />
                  <h4 className="text-[10px] uppercase tracking-[0.2em] font-black text-black/30">Stack</h4>
                </div>
                <p className="text-sm font-medium text-black/90">{project.stack}</p>
              </div>

              <div className="meta-item">
                <div className="flex items-center gap-2 mb-3">
                  <Rocket className="w-3.5 h-3.5 text-accent" />
                  <h4 className="text-[10px] uppercase tracking-[0.2em] font-black text-black/30">Impact</h4>
                </div>
                <p className="text-sm font-medium text-black/90">{project.impact}</p>
              </div>
            </div>
          </div>

          {/* Action Footer */}
          <div className="mt-16 pt-8 flex flex-col sm:flex-row gap-4 stagger-item">
            <Link
              href="/contact"
              className="group relative flex-1 inline-flex items-center justify-center gap-3 rounded-2xl bg-accent px-8 py-5 text-[11px] font-black uppercase tracking-[0.3em] text-white overflow-hidden transition-all hover:scale-[1.02] active:scale-[0.98]"
              onClick={onClose}
            >
              <div className="absolute inset-0 bg-white/20 translate-y-full transition-transform duration-500 group-hover:translate-y-0" />
              <span className="relative z-10">Start a project</span>
              <ArrowRight className="relative z-10 w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
            
            <button
              className="group flex items-center justify-center gap-3 rounded-2xl border border-black/10 px-8 py-5 text-[11px] font-black uppercase tracking-[0.3em] text-black/60 hover:bg-black/5 hover:text-black transition-all"
            >
              <span>Live Site</span>
              <ExternalLink className="w-4 h-4 opacity-40 group-hover:opacity-100 transition-opacity" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
