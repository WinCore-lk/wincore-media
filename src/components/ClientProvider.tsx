"use client";

import { useEffect, ReactNode } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function ClientProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    // Register GSAP plugins
    gsap.registerPlugin(ScrollTrigger);

    // Initialize Lenis
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
      infinite: false,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Sync GSAP with Lenis
    lenis.on("scroll", ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    // Global cinematic scroll choreography for non-pinned chapters.
    // Use these classes in sections: .chapter, .chapter-inner, [data-watermark], [data-parallax]
    const chapters = gsap.utils.toArray<HTMLElement>(".chapter");
    chapters.forEach((section) => {
      if (section.getAttribute("data-chapter") === "pinned") return;
      const inner = section.querySelector<HTMLElement>(".chapter-inner");

      gsap.fromTo(
        inner ?? section,
        { opacity: 0, y: 90, scale: 0.96, filter: "blur(10px)" },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          filter: "blur(0px)",
          duration: 1.1,
          ease: "expo.out",
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        },
      );

      // Soft zoom-out on exit (cinematic)
      gsap.to(inner ?? section, {
        opacity: 0,
        y: -60,
        scale: 0.985,
        filter: "blur(8px)",
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "bottom 70%",
          end: "bottom top",
          scrub: true,
        },
      });

      // Watermark parallax
      const watermark = section.querySelector<HTMLElement>("[data-watermark]");
      if (watermark) {
        gsap.to(watermark, {
          x: -220,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });
      }

      // Generic parallax items
      const parallaxItems = section.querySelectorAll<HTMLElement>("[data-parallax]");
      parallaxItems.forEach((el) => {
        const amount = Number(el.getAttribute("data-parallax") ?? 60);
        gsap.fromTo(
          el,
          { y: amount },
          {
            y: -amount,
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          },
        );
      });
    });

    // Keep triggers accurate across resize / font load.
    const onResize = () => ScrollTrigger.refresh();
    window.addEventListener("resize", onResize);
    ScrollTrigger.refresh();

    return () => {
      window.removeEventListener("resize", onResize);
      lenis.destroy();
      gsap.ticker.remove(raf);
      ScrollTrigger.killAll(false);
    };
  }, []);

  return <>{children}</>;
}
