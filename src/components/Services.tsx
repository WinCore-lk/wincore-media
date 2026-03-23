"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import {
  Layers,
  Smartphone,
  Video,
  Wand2,
  TrendingUp,
  Monitor,
  type LucideIcon,
} from "lucide-react";
import { registerGsapPlugins, getScroller } from "@/lib/motion";

type ServiceItem = {
  title: string;
  description: string;
  icon: LucideIcon;
  link?: string;
};

const services: ServiceItem[] = [
  {
    title: "Digital-First Branding",
    description: "Crafting visual identities that resonate in a digital-native world.",
    icon: Layers,
  },
  {
    title: "Social Media & Influencer Marketing",
    description: "Strategic storytelling and reach that converts followers into fans.",
    icon: Smartphone,
  },
  {
    title: "Motion Video & 3D Animation",
    description: "Immersive visuals that capture attention and drive engagement.",
    icon: Video,
  },
  {
    title: "AI-Powered Website Development",
    description: "Cutting-edge web experiences powered by the latest AI technologies.",
    icon: Wand2,
    link: "https://winpro-ai-site.vercel.app"
  },
  {
    title: "Performance Marketing & Ads",
    description: "Data-driven campaigns focused on measurable growth and ROI.",
    icon: TrendingUp,
  },
  {
    title: "UX/UI + WebGL Experiences",
    description: "Creating smooth, sensory-rich interfaces for high-end digital products.",
    icon: Monitor,
  },
];

export default function Services() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    registerGsapPlugins();
    const scroller = getScroller();
    const ctx = gsap.context(() => {
      gsap.from(".service-card", {
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
          scroller,
          once: true,
        },
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="services" className="py-32 bg-background border-t border-white/5">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20">
          <div className="max-w-xl">
            <span className="text-accent font-bold uppercase tracking-[0.4em] text-sm mb-4 block">Services</span>
            <h2 className="text-4xl md:text-7xl font-black text-white leading-[0.9]">
              Capabilities
            </h2>
          </div>
          <p className="text-white/40 text-lg md:text-xl max-w-sm mt-8 md:mt-0 font-medium">
            Tailored digital solutions designed for the modern landscape.
          </p>
        </div>

        <div ref={containerRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <div
              key={index}
              className="service-card group bg-muted p-10 rounded-3xl border border-white/5 hover:border-accent/40 transition-all duration-500 flex flex-col justify-between h-[400px]"
            >
              <div>
                <div className="mb-8 transform transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-6 origin-left">
                  <service.icon size={40} className="text-secondary" />
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-4 group-hover:text-accent transition-colors">
                  {service.title}
                </h3>
                <p className="text-white/50 text-base leading-relaxed">
                  {service.description}
                </p>
              </div>
              
              <div className="mt-8 flex items-center gap-4">
                <div className="h-0.5 w-8 bg-white/10 group-hover:w-16 group-hover:bg-accent transition-all duration-500" />
                {service.link && (
                    <a href={service.link} target="_blank" rel="noopener noreferrer" className="text-xs uppercase tracking-widest font-black text-white/40 hover:text-white">
                        Learn More
                    </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
