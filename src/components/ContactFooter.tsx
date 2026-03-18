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
      gsap.fromTo(
        ".cf-reveal",
        { y: 90, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.4,
          stagger: 0.08,
          ease: "expo.out",
          scrollTrigger: { trigger: footerRef.current, start: "top 85%" },
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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 md:gap-24 mb-[14vw]">
          <div>
            <p className="cf-reveal text-accent uppercase tracking-[0.55em] font-black text-[11px] mb-10 italic">
              Collaborate
            </p>
            <h2 className="cf-reveal text-[12vw] md:text-[6vw] font-black leading-[0.85] uppercase tracking-tighter mb-12">
              Have a <span className="text-white/20 italic">vision?</span> <br />
              Let&apos;s build it.
            </h2>

            <div className="cf-reveal flex flex-col md:flex-row gap-12">
              <div className="space-y-2">
                <p className="text-white/20 uppercase tracking-[0.3em] font-black text-[10px]">
                  Write to us
                </p>
                <a
                  href="mailto:hello@wincore.media"
                  className="cursor-hover text-2xl font-light hover:text-accent transition-colors"
                >
                  hello@wincore.media
                </a>
              </div>
              <div className="space-y-2">
                <p className="text-white/20 uppercase tracking-[0.3em] font-black text-[10px]">
                  Locations
                </p>
                <p className="text-2xl font-light text-white/80">
                  Negombo <span className="text-white/20">/</span> Colombo
                </p>
              </div>
            </div>
          </div>

          <div className="cf-reveal bg-muted/40 p-10 md:p-14 rounded-[2.5rem] border border-white/10 backdrop-blur-xl">
            <form className="space-y-10" aria-label="Contact form">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="group relative">
                  <input
                    type="text"
                    placeholder="Name"
                    className="w-full bg-transparent border-b border-white/10 py-4 outline-none focus:border-accent transition-all font-light text-lg placeholder:opacity-20"
                    required
                  />
                </div>
                <div className="group relative">
                  <input
                    type="email"
                    placeholder="Email"
                    className="w-full bg-transparent border-b border-white/10 py-4 outline-none focus:border-accent transition-all font-light text-lg placeholder:opacity-20"
                    required
                  />
                </div>
              </div>
              <div className="group relative">
                <textarea
                  placeholder="Your Story"
                  rows={3}
                  className="w-full bg-transparent border-b border-white/10 py-4 outline-none focus:border-accent transition-all font-light text-lg placeholder:opacity-20 resize-none"
                  required
                />
              </div>

              <button
                type="submit"
                className="cursor-hover w-full py-7 bg-accent text-white font-black uppercase tracking-[0.4em] text-[11px] rounded-2xl hover:bg-white hover:text-black transition-all duration-700 shadow-[0_20px_60px_rgba(0,191,255,0.22)]"
              >
                Send Inquiry
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

