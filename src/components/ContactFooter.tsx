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

      gsap.fromTo(".cf-kicker",
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "expo.out", clearProps: "transform,opacity",
          scrollTrigger: { trigger: ".cf-kicker", start: "top 90%", once: true } }
      );

      // Title lines — each line individually triggered
      const titleLines = gsap.utils.toArray<HTMLElement>(".cf-title-line");
      titleLines.forEach((el, i) => {
        gsap.fromTo(el,
          { yPercent: 110, opacity: 0 },
          { yPercent: 0, opacity: 1, duration: 1, ease: "expo.out", delay: i * 0.08, clearProps: "transform,opacity",
            scrollTrigger: { trigger: el, start: "top 92%", once: true } }
        );
      });

      gsap.fromTo(".cf-contact-block",
        { y: 36, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, ease: "expo.out", clearProps: "transform,opacity",
          scrollTrigger: { trigger: ".cf-contact-block", start: "top 88%", once: true } }
      );

      gsap.fromTo(".cf-form-shell",
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "expo.out",
          clearProps: "transform,opacity",
          scrollTrigger: {
            trigger: ".cf-form-shell",
            start: "top 88%",
            once: true,
          },
        }
      );

      const reveals = gsap.utils.toArray<HTMLElement>(".cf-reveal");
      reveals.forEach((el, i) => {
        gsap.fromTo(el,
          { y: 60, opacity: 0 },
          { y: 0, opacity: 1, duration: 1, ease: "expo.out", delay: i * 0.07, clearProps: "transform,opacity",
            scrollTrigger: { trigger: el, start: "top 90%", once: true } }
        );
      });
    }, footerRef);
    return () => ctx.revert();
  }, []);

  return (
    <footer
      ref={footerRef}
      id="contact"
      className="relative overflow-hidden border-t border-white/5 bg-background pb-12 pt-[15vw]"
    >
      {/* Background large text */}
      <div className="pointer-events-none absolute -bottom-[5vw] left-1/2 -translate-x-1/2 select-none italic text-[35vw] font-black text-white/[0.02]">
        WINCORE
      </div>

      <div className="_container relative z-10">
        {/* ── Main Contact Section ── */}
        <div className="mb-[15vw] grid grid-cols-1 gap-20 lg:grid-cols-2 lg:gap-32">
          {/* Left: Content */}
          <div className="flex flex-col justify-center">
            <span className="cf-kicker mb-10 text-[11px] font-black uppercase tracking-[0.5em] text-accent">
              Let&apos;s Build Together
            </span>
            <h2 className="mb-14 text-[13vw] font-black uppercase leading-[0.82] tracking-tighter md:text-[6.5vw]">
              <span className="block overflow-hidden">
                <span className="cf-title-line block">HAVE A</span>
              </span>
              <span className="block overflow-hidden">
                <span className="cf-title-line block text-white/20 italic">VISION?</span>
              </span>
            </h2>

            <div className="cf-contact-block space-y-12">
              <div className="group">
                <p className="mb-4 text-[10px] font-black uppercase tracking-[0.4em] text-white/30 transition-colors group-hover:text-accent">
                  Direct Line
                </p>
                <a
                  href="mailto:hello@wincore.media"
                  className="cursor-hover text-3xl font-light tracking-tight transition-all duration-500 hover:tracking-wide md:text-4xl"
                >
                  hello@wincore.media
                </a>
              </div>

              <div className="h-[2px] w-full bg-gradient-to-r from-accent/40 via-white/5 to-transparent" />

              <div className="grid grid-cols-2 gap-10 md:gap-20">
                <div>
                  <p className="mb-4 text-[10px] font-black uppercase tracking-[0.4em] text-white/30">
                    Presence
                  </p>
                  <p className="text-xl font-light text-white/70 leading-relaxed">
                    Colombo <br />
                    <span className="text-white/20">Sri Lanka</span>
                  </p>
                </div>
                <div>
                  <p className="mb-4 text-[10px] font-black uppercase tracking-[0.4em] text-white/30">
                    Socials
                  </p>
                  <div className="flex flex-col gap-3 text-sm font-bold uppercase tracking-widest text-white/40">
                    <a href="#" className="cursor-hover transition-colors hover:text-white">Instagram</a>
                    <a href="#" className="cursor-hover transition-colors hover:text-white">LinkedIn</a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Form */}
          <div className="cf-form-shell relative">
            {/* Glow effect */}
            <div className="absolute -inset-1 rounded-[3rem] bg-gradient-to-br from-accent/20 to-secondary/10 blur-2xl opacity-50" />
            
            <div className="relative rounded-[2.5rem] border border-white/[0.08] bg-white/[0.03] p-10 backdrop-blur-2xl md:p-14">
              <form className="space-y-10" aria-label="Quick contact">
                <div className="space-y-8">
                  <div className="relative border-b border-white/10 pb-4 transition-all focus-within:border-accent">
                    <label className="mb-2 block text-[9px] font-black uppercase tracking-[0.4em] text-white/30">
                      Discovery
                    </label>
                    <input
                      type="text"
                      placeholder="My name is..."
                      className="w-full bg-transparent text-xl font-light outline-none placeholder:text-white/10 focus:placeholder:opacity-0"
                      required
                    />
                  </div>

                  <div className="relative border-b border-white/10 pb-4 transition-all focus-within:border-accent">
                    <label className="mb-2 block text-[9px] font-black uppercase tracking-[0.4em] text-white/30">
                      Email
                    </label>
                    <input
                      type="email"
                      placeholder="Reach me at..."
                      className="w-full bg-transparent text-xl font-light outline-none placeholder:text-white/10 focus:placeholder:opacity-0"
                      required
                    />
                  </div>

                  <div className="relative border-b border-white/10 pb-4 transition-all focus-within:border-accent">
                    <label className="mb-2 block text-[9px] font-black uppercase tracking-[0.4em] text-white/30">
                      The Challenge
                    </label>
                    <textarea
                      placeholder="I want to build..."
                      rows={2}
                      className="w-full resize-none bg-transparent text-xl font-light outline-none placeholder:text-white/10 focus:placeholder:opacity-0"
                      required
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="cursor-hover group relative flex w-full items-center justify-center overflow-hidden rounded-2xl bg-white p-6 transition-all duration-500 hover:bg-accent"
                >
                  <span className="relative z-10 text-[11px] font-black uppercase tracking-[0.4em] text-black transition-colors group-hover:text-black">
                    Unlock Velocity
                  </span>
                  <div className="absolute inset-0 -translate-x-full bg-accent transition-transform duration-500 group-hover:translate-x-0" />
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* ── Secondary Footer ── */}
        <div className="cf-reveal flex flex-col items-start justify-between gap-16 border-t border-white/5 pt-16 md:flex-row md:items-end">
          <div className="flex flex-col gap-6">
            <Link href="/" className="cursor-hover flex flex-col items-start">
              <span className="text-4xl font-black tracking-tighter text-white">WINCOR</span>
              <span className="text-[11px] font-bold uppercase tracking-[0.4em] text-accent -mt-1">
                Agency
              </span>
            </Link>
            <div className="flex items-center gap-4">
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white/20">
                Time in Colombo:
              </span>
              <span className="text-lg font-black italic tracking-widest text-accent/80">
                {colomboTime || "--:--"}
              </span>
            </div>
          </div>

          <div className="flex flex-col items-start gap-8 md:items-end">
            <p className="text-left text-[11px] font-bold uppercase tracking-[0.5em] text-white/30 md:text-right">
              Sri Lanka&apos;s AI Native <br />
              Digital Experience Studio®
            </p>
            <div className="text-left text-[10px] font-black uppercase tracking-[0.5em] text-white/10 md:text-right">
              © {new Date().getFullYear()} WINCORE MEDIA. <br />
              All rights reserved.
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

