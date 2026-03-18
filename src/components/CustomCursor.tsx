"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches) return;

    const cursor = cursorRef.current;
    const glow = glowRef.current;
    if (!cursor || !glow) return;

    const mouse = { x: -100, y: -100 };
    gsap.set([cursor, glow], { xPercent: -50, yPercent: -50, opacity: 0 });

    const moveCursor = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;

      gsap.to(cursor, { x: mouse.x, y: mouse.y, duration: 0.12, opacity: 1, ease: "power2.out" });
      gsap.to(glow, { x: mouse.x, y: mouse.y, duration: 0.9, opacity: 0.55, ease: "power3.out" });
    };

    const onHoverEnter = () => {
      gsap.to(cursor, { scale: 12, mixBlendMode: "difference", backgroundColor: "white", duration: 0.45, ease: "power3.out" });
      gsap.to(glow, { scale: 0, opacity: 0, duration: 0.25, ease: "power2.out" });
    };

    const onHoverLeave = () => {
      gsap.to(cursor, { scale: 1, mixBlendMode: "normal", backgroundColor: "#00BFFF", duration: 0.45, ease: "power3.out" });
      gsap.to(glow, { scale: 1, opacity: 0.55, duration: 0.45, ease: "power3.out" });
    };

    window.addEventListener("mousemove", moveCursor);

    // Bind hover handlers to interactive elements, including dynamically added ones.
    const timer = window.setInterval(() => {
      const interactive = document.querySelectorAll("a, button, [role='button'], .cursor-hover");
      interactive.forEach((el) => {
        const anyEl = el as any;
        if (anyEl._cursor_bound) return;
        el.addEventListener("mouseenter", onHoverEnter);
        el.addEventListener("mouseleave", onHoverLeave);
        anyEl._cursor_bound = true;
      });
    }, 900);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.clearInterval(timer);
    };
  }, []);

  return (
    <div className="hidden lg:block pointer-events-none z-[9999] fixed inset-0 overflow-hidden">
      <div
        ref={cursorRef}
        className="w-[10px] h-[10px] bg-accent rounded-full absolute pointer-events-none"
      />
      <div
        ref={glowRef}
        className="w-[160px] h-[160px] bg-accent/30 blur-[90px] rounded-full absolute pointer-events-none"
      />
    </div>
  );
}
