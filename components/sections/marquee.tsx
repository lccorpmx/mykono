"use client";

import { useRef } from "react";
import { gsap, MOTION_OK, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { ColumnMark } from "@/components/brand/logo";

const PHRASES = ["Good yogurt", "Good mood", "Helado griego", "Hecho a mano"];

/** Endless band of type that speeds up, leans and reverses with the scroll. */
export function Marquee() {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const track = root.current!.querySelector("[data-track]");
        const skewer = root.current!.querySelector("[data-skew]");
        const loop = gsap.to(track, { xPercent: -50, duration: 42, ease: "none", repeat: -1 });
        const skew = gsap.quickTo(skewer, "skewX", { duration: 0.6, ease: "power3" });
        let settle: gsap.core.Tween | undefined;
        let straighten: gsap.core.Tween | undefined;

        ScrollTrigger.create({
          trigger: root.current,
          start: "top bottom",
          end: "bottom top",
          onToggle: (self) => (self.isActive ? loop.play() : loop.pause()),
          onUpdate(self) {
            const v = self.getVelocity();
            const dir = self.direction;
            const boost = 1 + Math.min(5, Math.abs(v) / 350);
            settle?.kill();
            gsap.to(loop, { timeScale: dir * boost, duration: 0.25, overwrite: true });
            settle = gsap.to(loop, { timeScale: dir, duration: 1.4, delay: 0.3, ease: "power2.out" });
            skew(gsap.utils.clamp(-7, 7, v / -260));
            straighten?.kill();
            straighten = gsap.delayedCall(0.2, () => skew(0));
          },
        });
      });
    },
    { scope: root },
  );

  return (
    <div ref={root} aria-hidden="true" className="relative overflow-hidden bg-cream py-8 lg:py-12">
      <div data-skew>
        <div data-track className="marquee-track">
          {[0, 1].map((copy) => (
            <div key={copy} className="flex shrink-0 items-center">
              {PHRASES.map((phrase, i) => (
                <span key={phrase} className="flex items-center">
                  <span
                    className={`display whitespace-nowrap px-[2.4vw] text-[clamp(42px,6.4vw,116px)] leading-none ${
                      i % 2 ? "text-outline" : "text-aegean"
                    }`}
                  >
                    {phrase}
                  </span>
                  <ColumnMark className="h-[clamp(26px,3.4vw,56px)] w-auto text-gold" strokeScale={1.15} />
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
