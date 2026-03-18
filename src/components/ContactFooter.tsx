"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

function useColomboTime() {
  const [time, setTime] = useState<string>("");

  useEffect(() => {
    const update = () => {
      const now = new Date();
      const formatter = new Intl.DateTimeFormat("en-LK", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
        timeZone: "Asia/Colombo",
      });
      setTime(formatter.format(now));
    };
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, []);

  return time;
}

export default function ContactFooter() {
  const colomboTime = useColomboTime();
  const footerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.set(".cf-title-line", { yPercent: 120 });

      const visionTl = gsap.timeline({
        defaults: { ease: "expo.out" },
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top 82%",
          once: true,
        },
      });

      visionTl
        .fromTo(
          ".cf-kicker",
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.55 },
        )
        .to(
          ".cf-title-line",
          { yPercent: 0, duration: 1.1, stagger: 0.08 },
          "-=0.2",
        )
        .fromTo(
          ".cf-contact-block",
          { y: 40, opacity: 0, scale: 0.97 },
          { y: 0, opacity: 1, scale: 1, duration: 0.9 },
          "-=0.6",
        );

      gsap.fromTo(
        ".cf-form-shell",
        { y: 50, opacity: 0, scale: 0.96 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".cf-form-shell",
            start: "top 88%",
            once: true,
          },
        },
      );

      gsap.fromTo(
        ".cf-reveal",
        { y: 80, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          stagger: 0.08,
          ease: "expo.out",
          scrollTrigger: { trigger: footerRef.current, start: "top 75%" },
        },
      );
    }, footerRef);
    return () => ctx.revert();
  }, []);

  return (
    <footer
      ref={footerRef}
      id="contact"
      className="pt-[20vw] pb-[6vw] bg-background border-t border-white/5 relative overflow-hidden"
    >
      <div className="absolute top-[30%] left-1/2 -translate-x-1/2 -translate-y-1/2 text-[45vw] font-black text-white/[0.02] pointer-events-none select-none italic">
        WA
      </div>

      <div className="_container relative z-10">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-2 md:gap-20 mb-[14vw]">
          <div className="max-w-[60ch]">
            <p className="cf-kicker mb-8 text-accent uppercase tracking-[0.48em] font-black text-[11px]">
              Collaborate
            </p>

            <h2 className="mb-10 text-[11vw] font-black uppercase leading-[0.84] tracking-tighter md:text-[5.4vw]">
              <span className="block overflow-hidden">
                <span className="cf-title-line block">Have a vision?</span>
              </span>
              <span className="block overflow-hidden">
                <span className="cf-title-line block text-white/20 italic">Let&apos;s build it.</span>
              </span>
            </h2>

            <div className="cf-contact-block space-y-8">
              <div>
                <p className="mb-3 text-[10px] uppercase tracking-[0.3em] font-black text-white/35">
                  Write to us
                </p>
                <a
                  href="mailto:hello@wincore.media"
                  className="cursor-hover font-light text-2xl transition-colors hover:text-accent"
                >
                  hello@wincore.media
                </a>
              </div>
              <div className="h-px w-full bg-gradient-to-r from-accent/50 via-white/10 to-transparent" />
              <div>
                <p className="mb-3 text-[10px] uppercase tracking-[0.3em] font-black text-white/35">
                  Locations
                </p>
                <p className="font-light text-xl text-white/80">
                  Negombo <span className="text-white/20">/</span> Colombo
                </p>
              </div>
            </div>
          </div>

          <div className="cf-form-shell rounded-[2rem] border border-white/10 bg-white/[0.03] p-8 md:p-12 backdrop-blur-sm">
            <form className="space-y-8" aria-label="Contact form">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="group relative">
                  <label className="mb-2 block text-[9px] font-black uppercase tracking-[0.35em] text-white/35">
                    Name
                  </label>
                  <input
                    type="text"
                    placeholder="Your name"
                    className="w-full bg-transparent border-b border-white/15 py-3 text-lg font-light outline-none transition-all placeholder:opacity-20 focus:border-accent"
                    required
                  />
                </div>
                <div className="group relative">
                  <label className="mb-2 block text-[9px] font-black uppercase tracking-[0.35em] text-white/35">
                    Email
                  </label>
                  <input
                    type="email"
                    placeholder="you@company.com"
                    className="w-full bg-transparent border-b border-white/15 py-3 text-lg font-light outline-none transition-all placeholder:opacity-20 focus:border-accent"
                    required
                  />
                </div>
              </div>
              <div className="group relative">
                <label className="mb-2 block text-[9px] font-black uppercase tracking-[0.35em] text-white/35">
                  Your Story
                </label>
                <textarea
                  placeholder="Tell us about your vision..."
                  rows={3}
                  className="w-full resize-none bg-transparent border-b border-white/15 py-3 text-lg font-light outline-none transition-all placeholder:opacity-20 focus:border-accent"
                  required
                />
              </div>

              <button
                type="submit"
                className="cursor-hover mt-2 w-full rounded-2xl bg-accent py-5 font-black uppercase tracking-[0.3em] text-[10px] text-black shadow-[0_20px_60px_rgba(0,191,255,0.25)] transition-all duration-500 hover:scale-[1.02] hover:shadow-[0_28px_80px_rgba(0,191,255,0.35)]"
              >
                Start the Conversation
              </button>
            </form>
          </div>
        </div>

        <div className="cf-reveal grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-12 py-12 border-y border-white/5">
          <div className="space-y-4">
            <p className="text-white/20 uppercase tracking-[0.3em] font-black text-[10px]">
              Colombo
            </p>
            <p className="text-[11px] uppercase tracking-widest font-bold text-white/70">
              World Trade Center <br />
              Echelon Square
            </p>
          </div>
          <div className="space-y-4">
            <p className="text-white/20 uppercase tracking-[0.3em] font-black text-[10px]">
              Negombo
            </p>
            <p className="text-[11px] uppercase tracking-widest font-bold text-white/70">
              Innovation House <br />
              Lewis Place
            </p>
          </div>
          <div className="space-y-4">
            <p className="text-white/20 uppercase tracking-[0.3em] font-black text-[10px]">
              Locally Rooted
            </p>
            <div className="flex items-center gap-3">
              <span className="text-[11px] font-bold text-white/70">SRI LANKA</span>
              <div className="flex flex-col gap-0.5 w-6">
                <div className="h-1 bg-[#F8C400] rounded-sm" />
                <div className="h-1 bg-[#C8102E] rounded-sm" />
                <div className="h-1 bg-[#007A3D] rounded-sm" />
              </div>
            </div>
          </div>
          <div className="space-y-4 text-right md:text-left">
            <p className="text-white/20 uppercase tracking-[0.3em] font-black text-[10px]">
              Live Pulse
            </p>
            <p className="text-3xl md:text-4xl font-black text-accent italic leading-none">
              {colomboTime || "--:--:--"}
            </p>
          </div>
        </div>

        <div className="cf-reveal flex flex-col md:flex-row justify-between items-center pt-12 gap-8">
          <Link href="/" className="cursor-hover flex flex-col items-start">
            <span className="text-3xl font-black tracking-tighter text-white">WINCOR</span>
            <span className="text-[10px] uppercase tracking-[0.3em] text-accent font-bold -mt-1">
              Agency
            </span>
          </Link>

          <div className="flex gap-10 text-[10px] font-black uppercase tracking-[0.4em] text-white/30">
            <a className="cursor-hover hover:text-accent transition-colors" href="#" aria-label="Instagram">
              Instagram
            </a>
            <a className="cursor-hover hover:text-accent transition-colors" href="#" aria-label="LinkedIn">
              LinkedIn
            </a>
            <a className="cursor-hover hover:text-accent transition-colors" href="#" aria-label="Awwwards">
              Awwwards
            </a>
          </div>

          <p className="text-[10px] font-black uppercase tracking-[0.4em] text-white/10 italic text-center md:text-right">
            © {new Date().getFullYear()} WINCORE MEDIA. ALL RIGHTS RESERVED.
          </p>
        </div>
      </div>
    </footer>
  );
}

