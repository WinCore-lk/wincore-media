"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { LenisProvider } from "@/context/LenisContext";
import { registerGsapPlugins } from "@/lib/motion";

export default function ClientProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [lenis, setLenis] = useState<Lenis | null>(null);
  // Keep a stable ref so we can access the instance in cleanup without
  // triggering re-renders.
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // Register once — safe to call multiple times across HMR.
    registerGsapPlugins();

    const instance = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
      infinite: false,
      autoRaf: false,
    });

    lenisRef.current = instance;

    // Wire ScrollTrigger <-> Lenis BEFORE handing the instance to React state
    // so that any ScrollTrigger that initialises while `lenis` flips truthy
    // already has the correct proxy.
    instance.on("scroll", ScrollTrigger.update);

    ScrollTrigger.scrollerProxy(document.documentElement, {
      scrollTop(value) {
        if (arguments.length && typeof value === "number") {
          instance.scrollTo(value, { immediate: true });
        }
        return instance.scroll;
      },
      getBoundingClientRect() {
        return {
          top: 0,
          left: 0,
          width: window.innerWidth,
          height: window.innerHeight,
        };
      },
      pinType: document.documentElement.style.transform ? "transform" : "fixed",
    });

    // Make `document.documentElement` the default scroller for all new
    // ScrollTriggers created throughout the app.
    ScrollTrigger.defaults({ scroller: document.documentElement });

    // RAF loop — Lenis is set to autoRaf:false so we drive it manually.
    let rafId = 0;
    function raf(time: number) {
      instance.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    // Expose lenis to React context — this is the signal that PageMotion
    // components wait for before setting up their scroll triggers.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setLenis(instance);

    // --- Refresh helpers ---
    const onResize = () => ScrollTrigger.refresh();
    window.addEventListener("resize", onResize);

    const refreshAll = () => ScrollTrigger.refresh();
    window.addEventListener("load", refreshAll, { once: true });

    const fontsReady = (document as Document & { fonts?: { ready: Promise<void> } }).fonts?.ready;
    fontsReady?.then(refreshAll).catch(() => undefined);

    // Belt-and-suspenders: a late refresh after fonts + images settle.
    const tLoad = window.setTimeout(refreshAll, 1200);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", onResize);
      instance.destroy();
      lenisRef.current = null;
      setLenis(null);
      window.clearTimeout(tLoad);
    };
  }, []);

  // On every route change scroll back to top and refresh measurements.
  useEffect(() => {
    if (!lenis) return;
    lenis.scrollTo(0, { immediate: true });
    const t1 = requestAnimationFrame(() => ScrollTrigger.refresh());
    const t2 = window.setTimeout(() => ScrollTrigger.refresh(), 350);
    const t3 = window.setTimeout(() => ScrollTrigger.refresh(), 900);
    return () => {
      cancelAnimationFrame(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [pathname, lenis]);

  return <LenisProvider value={lenis}>{children}</LenisProvider>;
}
