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

function descriptionParagraphs(text: string) {
  return text
    .split(/\n+/)
    .map((s) => s.trim())
    .filter(Boolean);
}

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

  useLayoutEffect(() => {
    if (!isOpen) return;

    const ctx = gsap.context(() => {
      gsap.set(".modal-bg", { opacity: 0 });
      gsap.set(".modal-content", { y: 40, opacity: 0, scale: 0.98 });
      gsap.set(".stagger-item", { y: 24, opacity: 0 });
      gsap.set(".image-reveal", { scale: 1.02, opacity: 0 });
      gsap.set(".meta-item", { y: 16, opacity: 0 });
      gsap.set(".close-btn", { scale: 0, opacity: 0 });

      const tl = gsap.timeline({ defaults: { ease: "expo.out" } });

      tl.to(".modal-bg", {
        opacity: 1,
        duration: 0.55,
      })
        .to(
          ".modal-content",
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.75,
          },
          "-=0.35",
        )
        .to(
          ".image-reveal",
          {
            scale: 1,
            opacity: 1,
            duration: 0.9,
            ease: "power3.out",
          },
          "-=0.55",
        )
        .to(
          ".stagger-item",
          {
            y: 0,
            opacity: 1,
            duration: 0.65,
            stagger: 0.08,
          },
          "-=0.5",
        )
        .to(
          ".meta-item",
          {
            y: 0,
            opacity: 1,
            duration: 0.5,
            stagger: 0.06,
          },
          "-=0.45",
        )
        .to(
          ".close-btn",
          {
            scale: 1,
            opacity: 1,
            duration: 0.45,
            ease: "back.out(1.6)",
          },
          "-=0.6",
        );
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

  const parsedDescription = descriptionParagraphs(project.description);
  const bodyCopy =
    parsedDescription.length > 0
      ? parsedDescription
      : [
          "Strategic storytelling, motion, and interface craft — built for measurable outcomes.",
        ];

  return (
    <div
      ref={modalRef}
      className={`fixed inset-0 z-[2000] flex items-start justify-center overflow-y-auto overscroll-contain p-4 sm:p-6 md:items-center md:p-10 lg:p-12 transition-all duration-300 ${
        isOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
      }`}
      role="dialog"
      aria-modal="true"
      aria-label={`Project: ${project.title}`}
    >
      <div className="modal-bg absolute inset-0 bg-black/50 backdrop-blur-md" onMouseDown={onClose} />

      <div
        className="modal-content relative z-[1] my-auto flex w-full max-w-[min(100%,1280px)] flex-col overflow-hidden rounded-[1.35rem] border border-black/10 bg-background shadow-[0_48px_120px_rgba(0,0,0,0.14)] sm:rounded-2xl lg:my-6 lg:max-h-[min(94dvh,960px)] lg:flex-row lg:rounded-[2rem]"
      >
        <button
          type="button"
          onClick={onClose}
          className="close-btn group absolute right-4 top-4 z-[2010] flex h-12 w-12 items-center justify-center rounded-full border border-black/10 bg-background/95 text-foreground shadow-sm backdrop-blur-sm transition-colors hover:bg-foreground hover:text-background sm:right-6 sm:top-6 lg:right-7 lg:top-7"
          aria-label="Close project modal"
        >
          <X className="h-5 w-5 transition-transform duration-300 group-hover:rotate-90" />
        </button>

        {/* Image — tall enough, contain so nothing is cropped off-frame */}
        <div className="relative flex w-full shrink-0 flex-col bg-muted lg:w-[47%] lg:min-h-0 lg:min-w-0 lg:border-r lg:border-black/8 lg:self-stretch">
          <div className="relative aspect-[16/11] w-full sm:aspect-[16/10] lg:aspect-auto lg:h-full lg:min-h-[min(66vh,580px)]">
            <div className="image-reveal absolute inset-0">
              <Image
                src={project.image}
                alt={project.title}
                fill
                className="object-contain object-center p-6 sm:p-8 lg:p-10"
                sizes="(max-width: 1024px) 100vw, 46vw"
                priority
              />
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-background/90 via-background/20 to-transparent lg:from-background/70" />
            </div>
          </div>

          <div className="pointer-events-none absolute bottom-6 left-6 right-6 sm:bottom-8 sm:left-8 stagger-item md:block">
            <span className="mb-2 block text-[10px] font-black uppercase tracking-[0.35em] text-foreground/50">
              Visual identity
            </span>
            <div className="h-px w-20 bg-accent/50" />
          </div>
        </div>

        {/* Copy + meta — scrolls independently on short viewports */}
        <div className="flex min-h-0 min-w-0 flex-1 flex-col overflow-y-auto">
          <div className="flex flex-1 flex-col gap-10 px-8 pb-14 pt-[5rem] sm:gap-11 sm:px-12 sm:pb-16 sm:pt-[4.75rem] lg:gap-12 lg:px-16 lg:pb-20 lg:pt-20">
            <header className="stagger-item space-y-4">
              <p className="text-[11px] font-black uppercase tracking-[0.32em] text-accent">
                Case study · {project.category}
              </p>
              <h2 className="break-words text-[1.85rem] font-black uppercase leading-[1.08] tracking-tight text-foreground sm:text-[2.1rem] lg:text-[2.25rem]">
                {project.title}
              </h2>
            </header>

            <div className="stagger-item space-y-5 text-[16px] font-light leading-[1.65] text-foreground/75 sm:text-[17px] lg:leading-[1.7]">
              {bodyCopy.map((para, i) => (
                <p key={i} className="max-w-prose">
                  {para}
                </p>
              ))}
            </div>

            <div className="stagger-item flex flex-wrap gap-2.5 sm:gap-3">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center rounded-full border border-black/10 bg-black/[0.03] px-4 py-2.5 text-[10px] font-bold uppercase tracking-wider text-foreground/85 sm:px-5 sm:py-2.5"
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 md:gap-6">
              {[
                { icon: Calendar, label: "Duration", value: project.duration },
                { icon: Briefcase, label: "Role", value: project.role },
                { icon: Code2, label: "Stack", value: project.stack },
                { icon: Rocket, label: "Impact", value: project.impact },
              ].map(({ icon: Icon, label, value }) => (
                <div
                  key={label}
                  className="meta-item rounded-2xl border border-black/8 bg-black/[0.02] px-6 py-8 sm:px-7 sm:py-9 md:px-8 md:py-10"
                >
                  <div className="mb-3.5 flex items-center gap-2.5 text-[10px] font-black uppercase tracking-[0.18em] text-foreground/50">
                    <Icon className="h-4 w-4 shrink-0 text-accent" aria-hidden />
                    {label}
                  </div>
                  <p className="break-words text-[15px] font-medium leading-snug text-foreground sm:text-base">
                    {value}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="stagger-item mt-auto flex flex-col gap-4 border-t border-black/8 bg-background/95 px-8 py-10 sm:flex-row sm:gap-5 sm:px-12 sm:py-12 lg:px-16 lg:py-12">
            <Link
              href="/contact"
              className="group relative inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-accent px-8 py-4 text-[10px] font-black uppercase tracking-[0.28em] text-white transition-transform hover:scale-[1.01] active:scale-[0.99] sm:py-5"
              onClick={onClose}
            >
              <span className="relative z-10">Start a project</span>
              <ArrowRight className="relative z-10 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>

            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl border border-black/12 bg-background px-8 py-4 text-[10px] font-black uppercase tracking-[0.28em] text-foreground/75 transition-colors hover:border-accent/40 hover:text-foreground sm:py-5"
            >
              Live site
              <ExternalLink className="h-4 w-4 opacity-60" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
