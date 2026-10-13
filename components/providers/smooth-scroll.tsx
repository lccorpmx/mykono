"use client";

import Lenis from "lenis";
import { createContext, useContext, useEffect, useState } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

const LenisContext = createContext<Lenis | null>(null);

export const useLenis = () => useContext(LenisContext);

/** True while the page is gliding on its own (snapping), so UI can ignore that motion. */
export const autoScroll = { active: false };

/** Smoothly scrolls to an in-page target, falling back to native scrolling. */
export function scrollToTarget(lenis: Lenis | null, target: string | number) {
  if (lenis) {
    lenis.scrollTo(target, { duration: 1.6, easing: easeInOutQuart, force: true });
    return;
  }
  if (typeof target === "number") window.scrollTo({ top: target, behavior: "smooth" });
  else document.querySelector(target)?.scrollIntoView({ behavior: "smooth" });
}

export function easeInOutQuart(t: number) {
  return t < 0.5 ? 8 * t * t * t * t : 1 - Math.pow(-2 * t + 2, 4) / 2;
}

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const [lenis, setLenis] = useState<Lenis | null>(null);

  useEffect(() => {
    // Always start at the hero: the intro and the pinned showcase are choreographed from the top.
    if ("scrollRestoration" in history) history.scrollRestoration = "manual";
    window.scrollTo(0, 0);

    const instance = new Lenis({ lerp: 0.085, wheelMultiplier: 0.95, autoRaf: false });
    instance.on("scroll", ScrollTrigger.update);

    const tick = (time: number) => instance.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    // In-page anchors glide instead of jumping.
    const onClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey) return;
      const link = (event.target as HTMLElement).closest<HTMLAnchorElement>('a[href^="#"]');
      const hash = link?.getAttribute("href");
      if (!hash || hash.length < 2 || !document.querySelector(hash)) return;
      event.preventDefault();
      scrollToTarget(instance, hash);
    };
    document.addEventListener("click", onClick);

    // Webfonts change line heights; re-measure every trigger once they are in.
    document.fonts?.ready.then(() => ScrollTrigger.refresh());
    setLenis(instance);

    return () => {
      document.removeEventListener("click", onClick);
      gsap.ticker.remove(tick);
      instance.destroy();
      setLenis(null);
    };
  }, []);

  return <LenisContext.Provider value={lenis}>{children}</LenisContext.Provider>;
}
