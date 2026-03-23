import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * Shared motion helpers — Lenis uses document.documentElement as the scroll root.
 */

/** Register GSAP plugins exactly once, even across HMR reloads. */
let _pluginsRegistered = false;
export function registerGsapPlugins(): void {
  if (_pluginsRegistered) return;
  gsap.registerPlugin(ScrollTrigger);
  _pluginsRegistered = true;
}

export function getScroller(): HTMLElement {
  return document.documentElement;
}

export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/** Double refresh after layout (fonts, Lenis, images) */
export function scheduleScrollTriggerRefresh(): void {
  requestAnimationFrame(() => ScrollTrigger.refresh());
  window.setTimeout(() => ScrollTrigger.refresh(), 450);
}
