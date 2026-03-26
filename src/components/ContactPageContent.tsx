"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import SplitType from "split-type";
import { ArrowUpRight, Mail, MapPin, Clock } from "lucide-react";
import { registerGsapPlugins, prefersReducedMotion } from "@/lib/motion";

type SubmitState = "idle" | "loading" | "sent" | "error";

const SERVICES = [
  "Branding & Identity",
  "Website Design & Build",
  "Motion & Video",
  "Performance Marketing",
  "WebGL & Immersive",
  "Strategy & Consulting",
  "Other",
];

function useColomboTime() {
  const [time, setTime] = useState("");
  useEffect(() => {
    const fmt = () =>
      new Intl.DateTimeFormat("en-US", {
        hour: "2-digit", minute: "2-digit", second: "2-digit",
        hour12: false, timeZone: "Asia/Colombo",
      }).format(new Date());
    window.setTimeout(() => setTime(fmt()), 0);
    const id = window.setInterval(() => setTime(fmt()), 1000);
    return () => window.clearInterval(id);
  }, []);
  return time;
}

export default function ContactPageContent() {
  const rootRef = useRef<HTMLElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const colomboTime = useColomboTime();
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [submitState, setSubmitState] = useState<SubmitState>("idle");
  const [feedback, setFeedback] = useState("");

  function toggleService(svc: string) {
    setSelectedServices((prev) =>
      prev.includes(svc) ? prev.filter((s) => s !== svc) : [...prev, svc]
    );
  }

  useEffect(() => {
    registerGsapPlugins();
    const reduced = prefersReducedMotion();
    const splits: SplitType[] = [];

    const ctx = gsap.context(() => {
      if (reduced) return;

      // Hero
      const titleEl = rootRef.current?.querySelector(".ct-hero-title");
      if (titleEl) {
        const split = new SplitType(titleEl as HTMLElement, { types: "lines,words" });
        splits.push(split);
        gsap.fromTo(split.words, 
          { y: 50, opacity: 0 },
          { y: 0, opacity: 1, duration: 1.2, stagger: 0.04, ease: "expo.out", delay: 0.1 }
        );
      }

      gsap.fromTo(".ct-fade-up",
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1, stagger: 0.1, ease: "power3.out", delay: 0.4 }
      );

      // Info Blocks
      gsap.fromTo(".ct-info-block",
        { opacity: 0, x: -20 },
        { 
          opacity: 1, x: 0, duration: 0.8, stagger: 0.1, ease: "power3.out",
          scrollTrigger: { trigger: ".ct-info-grid", start: "top 80%", once: true }
        }
      );

      // Form 
      gsap.fromTo(".ct-form-row",
        { opacity: 0, y: 20 },
        {
          opacity: 1, y: 0, duration: 0.8, stagger: 0.06, ease: "power3.out",
          scrollTrigger: { trigger: formRef.current, start: "top 80%", once: true }
        }
      );

    }, rootRef);
    
    return () => { splits.forEach((s) => s.revert()); ctx.revert(); };
  }, []);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const name    = String(fd.get("name")    ?? "").trim();
    const email   = String(fd.get("email")   ?? "").trim();
    const company = String(fd.get("company") ?? "").trim();
    const website = String(fd.get("website") ?? "").trim();
    const message = String(fd.get("message") ?? "").trim();

    if (!name || !email || !message) {
      setSubmitState("error"); setFeedback("Please fill in all required fields."); return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setSubmitState("error"); setFeedback("Please enter a valid email address."); return;
    }

    setSubmitState("loading"); setFeedback("");
    window.setTimeout(() => {
      const body = [
        `Name: ${name}`, `Email: ${email}`,
        company ? `Company: ${company}` : "",
        website ? `Website: ${website}` : "",
        selectedServices.length ? `Services: ${selectedServices.join(", ")}` : "",
        "", message,
      ].filter(Boolean).join("\n");

      window.location.href = `mailto:hello@wincore.media?subject=${encodeURIComponent(`Project inquiry — ${name}`)}&body=${encodeURIComponent(body)}`;
      setSubmitState("sent");
      setFeedback("Launching your email client. If nothing opens, write to hello@wincore.media.");
      formRef.current?.reset();
      setSelectedServices([]);
    }, 450);
  }

  return (
    <section ref={rootRef} className="bg-background min-h-[100svh] text-foreground relative overflow-hidden flex flex-col justify-between">
      {/* Background Ambience */}
      <div className="absolute top-[-10%] right-[-10%] w-[800px] h-[800px] bg-accent/[0.04] blur-[140px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-secondary/[0.03] blur-[120px] rounded-full pointer-events-none" />

      <div>
        {/* HERO SECTION */}
        <div className="pt-40 pb-16 md:pt-56 md:pb-24 px-6 md:px-12 lg:px-24 max-w-[1400px] mx-auto relative z-10 w-full">
          <p className="ct-fade-up text-[11px] font-black uppercase tracking-[0.45em] text-accent mb-6 md:mb-10">
            Contact Wincore
          </p>
          <h1 className="ct-hero-title font-heading text-[12vw] md:text-[8vw] lg:text-[7.5rem] font-black uppercase leading-[0.85] tracking-tighter mb-10 md:mb-16">
            Start the <br />
            <span className="text-black/20 italic font-light tracking-tight">conversation.</span>
          </h1>
          
          <div className="ct-fade-up flex flex-col md:flex-row justify-between items-start md:items-end gap-10 border-b border-black/10 pb-16">
            <p className="text-lg md:text-2xl font-light text-black/50 max-w-xl leading-relaxed">
              Whether building a premium brand, an immersive WebGL site, or executing a global campaign, everything starts with a simple hello.
            </p>
            <a
              href="https://cal.com/wincore"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center justify-center gap-4 bg-black text-white px-8 py-5 md:px-10 md:py-6 rounded-full shadow-[0_12px_24px_rgba(0,0,0,0.15)] hover:shadow-[0_20px_40px_rgba(0,191,255,0.2)] transition-all duration-300 w-full md:w-auto shrink-0"
            >
              <span className="text-[11px] font-black uppercase tracking-[0.2em] whitespace-nowrap">Book a discovery call</span>
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center group-hover:bg-accent transition-colors duration-300 transform group-hover:scale-110">
                <ArrowUpRight size={16} />
              </div>
            </a>
          </div>
        </div>

        {/* TWO COL LAYOUT: CONTACT INFO + FORM */}
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-24 pb-32 md:pb-48 grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 relative z-10">
          
          {/* INFO COLUMN */}
          <div className="ct-info-grid lg:col-span-4 flex flex-col gap-10 md:gap-14 pt-2">
            <div className="ct-info-block flex gap-5 group">
              <div className="shrink-0 w-12 h-12 rounded-full border border-black/10 flex items-center justify-center bg-black/[0.02] group-hover:border-accent group-hover:bg-accent/5 transition-all duration-300">
                <Mail className="text-black/40 group-hover:text-accent transition-colors duration-300" size={20} />
              </div>
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-black/40 mb-2">Direct email</p>
                <a href="mailto:hello@wincore.media" className="text-xl md:text-2xl font-bold tracking-tight text-foreground hover:text-accent transition-colors block break-words">
                  hello@wincore.media
                </a>
                <p className="text-sm font-light text-black/50 mt-2">Always available. Replies within 24 hours.</p>
              </div>
            </div>

            <div className="ct-info-block flex gap-5 group">
              <div className="shrink-0 w-12 h-12 rounded-full border border-black/10 flex items-center justify-center bg-black/[0.02] group-hover:border-accent group-hover:bg-accent/5 transition-all duration-300">
                <MapPin className="text-black/40 group-hover:text-accent transition-colors duration-300" size={20} />
              </div>
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-black/40 mb-2">Headquarters</p>
                <p className="text-xl md:text-2xl font-bold tracking-tight text-foreground">
                  Colombo, LK
                </p>
                <p className="text-sm font-light text-black/50 mt-2">Remote-first, operating globally.</p>
              </div>
            </div>

            <div className="ct-info-block flex gap-5 group">
              <div className="shrink-0 w-12 h-12 rounded-full border border-black/10 flex items-center justify-center bg-black/[0.02] group-hover:border-accent group-hover:bg-accent/5 transition-all duration-300">
                <Clock className="text-black/40 group-hover:text-accent transition-colors duration-300" size={20} />
              </div>
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-black/40 mb-2">Local Time</p>
                <p className="text-xl md:text-2xl font-bold tracking-tight text-foreground tabular-nums">
                  {colomboTime || "—:—:—"}
                </p>
                <p className="text-sm font-light text-black/50 mt-2">GMT +5:30</p>
              </div>
            </div>
          </div>

          {/* FORM COLUMN */}
          <div className="lg:col-span-8 bg-black/[0.015] border border-black/5 shadow-[0_4px_24px_rgba(0,0,0,0.02)] rounded-[2rem] p-8 md:p-12 lg:p-16">
            <form ref={formRef} onSubmit={handleSubmit} noValidate className="flex flex-col gap-12 md:gap-14">
              
              <div className="ct-form-row">
                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-black/40 mb-6">
                  What do you need help with?
                </p>
                <div className="flex flex-wrap gap-3 md:gap-4">
                  {SERVICES.map((svc) => {
                    const active = selectedServices.includes(svc);
                    return (
                      <button
                        key={svc}
                        type="button"
                        onClick={() => toggleService(svc)}
                        className={`px-5 py-3 md:px-6 md:py-3.5 rounded-full text-xs md:text-sm font-medium transition-all duration-300 border ${
                          active
                            ? "bg-black border-black text-white shadow-[0_12px_24px_rgba(0,0,0,0.15)] transform -translate-y-1"
                            : "bg-white border-black/10 text-black/60 hover:border-black/30 hover:text-black hover:bg-black/5"
                        }`}
                      >
                        {svc}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="ct-form-row grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-12 pt-6">
                <div className="relative group">
                  <input
                    id="name" name="name" type="text"
                    required disabled={submitState === "loading"}
                    className="w-full bg-transparent border-b border-black/15 pb-4 pt-4 text-lg md:text-xl font-medium text-foreground outline-none focus:border-accent transition-colors peer"
                    placeholder=" "
                  />
                  <label htmlFor="name" className="absolute left-0 top-4 text-black/40 text-lg transition-all duration-300 peer-focus:-top-4 peer-focus:text-[10px] peer-focus:font-black peer-focus:uppercase peer-focus:tracking-[0.2em] peer-focus:text-accent peer-not-placeholder-shown:-top-4 peer-not-placeholder-shown:text-[10px] peer-not-placeholder-shown:font-black peer-not-placeholder-shown:uppercase peer-not-placeholder-shown:tracking-[0.2em] peer-not-placeholder-shown:text-black/60 cursor-text">
                    Your Name *
                  </label>
                </div>

                <div className="relative group">
                  <input
                    id="email" name="email" type="email"
                    required disabled={submitState === "loading"}
                    className="w-full bg-transparent border-b border-black/15 pb-4 pt-4 text-lg md:text-xl font-medium text-foreground outline-none focus:border-accent transition-colors peer"
                    placeholder=" "
                  />
                  <label htmlFor="email" className="absolute left-0 top-4 text-black/40 text-lg transition-all duration-300 peer-focus:-top-4 peer-focus:text-[10px] peer-focus:font-black peer-focus:uppercase peer-focus:tracking-[0.2em] peer-focus:text-accent peer-not-placeholder-shown:-top-4 peer-not-placeholder-shown:text-[10px] peer-not-placeholder-shown:font-black peer-not-placeholder-shown:uppercase peer-not-placeholder-shown:tracking-[0.2em] peer-not-placeholder-shown:text-black/60 cursor-text">
                    Email Address *
                  </label>
                </div>

                <div className="relative group">
                  <input
                    id="company" name="company" type="text"
                    disabled={submitState === "loading"}
                    className="w-full bg-transparent border-b border-black/15 pb-4 pt-4 text-lg md:text-xl font-medium text-foreground outline-none focus:border-accent transition-colors peer"
                    placeholder=" "
                  />
                  <label htmlFor="company" className="absolute left-0 top-4 text-black/40 text-lg transition-all duration-300 peer-focus:-top-4 peer-focus:text-[10px] peer-focus:font-black peer-focus:uppercase peer-focus:tracking-[0.2em] peer-focus:text-accent peer-not-placeholder-shown:-top-4 peer-not-placeholder-shown:text-[10px] peer-not-placeholder-shown:font-black peer-not-placeholder-shown:uppercase peer-not-placeholder-shown:tracking-[0.2em] peer-not-placeholder-shown:text-black/60 cursor-text">
                    Company (Optional)
                  </label>
                </div>

                <div className="relative group">
                  <input
                    id="website" name="website" type="url"
                    disabled={submitState === "loading"}
                    className="w-full bg-transparent border-b border-black/15 pb-4 pt-4 text-lg md:text-xl font-medium text-foreground outline-none focus:border-accent transition-colors peer"
                    placeholder=" "
                  />
                  <label htmlFor="website" className="absolute left-0 top-4 text-black/40 text-lg transition-all duration-300 peer-focus:-top-4 peer-focus:text-[10px] peer-focus:font-black peer-focus:uppercase peer-focus:tracking-[0.2em] peer-focus:text-accent peer-not-placeholder-shown:-top-4 peer-not-placeholder-shown:text-[10px] peer-not-placeholder-shown:font-black peer-not-placeholder-shown:uppercase peer-not-placeholder-shown:tracking-[0.2em] peer-not-placeholder-shown:text-black/60 cursor-text">
                    Website URL (Optional)
                  </label>
                </div>
              </div>

              <div className="ct-form-row relative group pt-6">
                <textarea
                  id="message" name="message" rows={4}
                  required disabled={submitState === "loading"}
                  className="w-full bg-transparent border-b border-black/15 pb-4 pt-4 text-lg md:text-xl font-medium text-foreground outline-none focus:border-accent transition-colors peer resize-none"
                  placeholder=" "
                />
                <label htmlFor="message" className="absolute left-0 top-4 text-black/40 text-lg transition-all duration-300 peer-focus:-top-4 peer-focus:text-[10px] peer-focus:font-black peer-focus:uppercase peer-focus:tracking-[0.2em] peer-focus:text-accent peer-not-placeholder-shown:-top-4 peer-not-placeholder-shown:text-[10px] peer-not-placeholder-shown:font-black peer-not-placeholder-shown:uppercase peer-not-placeholder-shown:tracking-[0.2em] peer-not-placeholder-shown:text-black/60 cursor-text">
                  Your Message *
                </label>
              </div>

              {submitState === "error" && feedback && (
                <div className="ct-form-row px-5 py-4 bg-red-50 border border-red-100 rounded-xl flex gap-3 items-center">
                  <div className="h-2 w-2 rounded-full bg-red-500 shrink-0" />
                  <p className="text-sm font-medium text-red-600">{feedback}</p>
                </div>
              )}
              {submitState === "sent" && feedback && (
                <div className="ct-form-row px-5 py-4 bg-emerald-50 border border-emerald-100 rounded-xl flex gap-3 items-center">
                  <div className="h-2 w-2 rounded-full bg-emerald-500 shrink-0" />
                  <p className="text-sm font-medium text-emerald-600">{feedback}</p>
                </div>
              )}

              <div className="ct-form-row pt-6 flex flex-col md:flex-row items-center justify-between gap-8 md:gap-6 mt-4 border-t border-black/5">
                <p className="text-xs font-light text-black/40 text-center md:text-left mx-auto md:mx-0 order-2 md:order-1">
                  Any files to attach? <br className="hidden md:block" /> Email us directly at <a href="mailto:hello@wincore.media" className="font-semibold text-black hover:text-accent transition-colors">hello@wincore.media</a>
                </p>
                
                <button
                  type="submit"
                  disabled={submitState === "loading"}
                  className="group relative flex items-center justify-center gap-3 overflow-hidden rounded-xl bg-accent px-10 py-5 w-full md:w-auto transition-all duration-300 hover:shadow-[0_15px_30px_rgba(0,191,255,0.25)] min-w-[200px] order-1 md:order-2"
                >
                  <span className="relative z-10 text-[11px] font-black uppercase tracking-[0.2em] text-white">
                    {submitState === "loading" ? "Processing..." : "Submit Enquiry"}
                  </span>
                  <div className="absolute inset-0 bg-black translate-y-[100%] transition-transform duration-500 group-hover:translate-y-0" />
                </button>
              </div>

            </form>
          </div>
        </div>
      </div>

    </section>
  );
}
