"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import gsap from "gsap";
import { cn } from "@/lib/utils";

export default function Header() {
  const headerRef = useRef<HTMLElement>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        gsap.to(headerRef.current, { yPercent: -100, duration: 0.5, ease: "power2.inOut" });
      } else {
        gsap.to(headerRef.current, { yPercent: 0, duration: 0.5, ease: "power2.inOut" });
      }
      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      ref={headerRef}
      className="fixed top-0 left-0 w-full z-[100] px-6 py-8 md:px-12 flex justify-between items-center mix-blend-difference"
    >
      <Link href="/" className="group flex flex-col items-start">
        <span className="text-3xl font-black tracking-tighter text-white">
          WINCOR
        </span>
        <span className="text-[10px] uppercase tracking-[0.3em] text-accent font-bold -mt-1">
          Agency
        </span>
      </Link>

      <nav className="hidden md:flex items-center gap-10">
        {[
          { label: "Works", href: "/works" },
          { label: "Services", href: "/services" },
          { label: "About", href: "/about" },
          { label: "Contact", href: "/contact" },
        ].map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="text-sm uppercase tracking-widest text-white/70 hover:text-white transition-colors duration-300"
          >
            {item.label}
          </Link>
        ))}
      </nav>

      <button
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className="flex flex-col gap-1.5 md:hidden z-[101]"
      >
        <div className={cn("w-8 h-0.5 bg-white transition-all duration-300", isMenuOpen && "rotate-45 translate-y-2")} />
        <div className={cn("w-8 h-0.5 bg-white transition-all duration-300", isMenuOpen && "opacity-0")} />
        <div className={cn("w-8 h-0.5 bg-white transition-all duration-300", isMenuOpen && "-rotate-45 -translate-y-2")} />
      </button>

      {/* Full screen menu could go here if needed, but keeping it simple for now */}
    </header>
  );
}
