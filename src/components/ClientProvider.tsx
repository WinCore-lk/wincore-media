"use client";

import { useEffect, type ReactNode } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function ClientProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

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

    const onTick = (time: number) => {
      lenis.raf(time * 1000);
    };

    const onResize = () => ScrollTrigger.refresh();

    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add(onTick);
    gsap.ticker.lagSmoothing(0);
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
      gsap.ticker.remove(onTick);
      lenis.destroy();
    };
  }, []);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const chapters = gsap.utils.toArray<HTMLElement>(".chapter");

      chapters.forEach((section) => {
        const chapterMode = section.getAttribute("data-chapter");
        if (chapterMode === "pinned" || chapterMode === "custom") return;

        const inner = section.querySelector<HTMLElement>(".chapter-inner") ?? section;

        gsap.fromTo(
          inner,
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
              once: true,
            },
          },
        );

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

      ScrollTrigger.refresh();
    });

    return () => ctx.revert();
  }, [pathname]);

  return <>{children}</>;
}
