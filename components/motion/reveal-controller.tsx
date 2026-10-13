"use client";

import { gsap, MOTION_OK, ScrollTrigger, useGSAP } from "@/lib/gsap";

/**
 * Wires every declarative [data-reveal] / [data-parallax] element on the page,
 * so sections can stay Server Components and simply describe their motion.
 *
 *   up       fade and rise
 *   lines    masked lines (.line-inner) slide up
 *   stagger  children rise one after another (and draw any [data-draw] strokes)
 *   draw     SVG strokes with pathLength=1 draw themselves
 *   clip     image wipes open from the bottom while its [data-reveal-zoom] settles
 *   line-x   hairline grows from the left
 *
 * Starting poses live inside each tween (fromTo) so ScrollTrigger refreshes can
 * revert and re-apply them cleanly; lazy:false writes them before the element is
 * unhidden, so no frame ever shows the final state early.
 */
export function RevealController() {
  useGSAP(() => {
    const mm = gsap.matchMedia();

    mm.add(MOTION_OK, () => {
      const ease = "expo.out";
      const lazy = false;

      gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((el) => {
        const type = el.dataset.reveal;
        const delay = parseFloat(el.dataset.delay ?? "0");
        const scrollTrigger = { trigger: el, start: "top 88%", once: true };

        switch (type) {
          case "up":
            gsap.fromTo(el, { autoAlpha: 0, y: 44 }, { autoAlpha: 1, y: 0, duration: 1.3, ease, delay, lazy, scrollTrigger });
            break;
          case "lines":
            gsap.fromTo(
              el.querySelectorAll(".line-inner"),
              { yPercent: 135 },
              { yPercent: 0, duration: 1.45, ease, stagger: 0.1, delay, lazy, scrollTrigger },
            );
            break;
          case "stagger": {
            const tl = gsap.timeline({ delay, scrollTrigger });
            tl.fromTo(el.children, { autoAlpha: 0, y: 40 }, { autoAlpha: 1, y: 0, duration: 1.2, ease, stagger: 0.09, lazy });
            const strokes = el.querySelectorAll("[data-draw]");
            if (strokes.length)
              tl.fromTo(
                strokes,
                { strokeDasharray: 1, strokeDashoffset: 1 },
                { strokeDashoffset: 0, duration: 1.6, ease: "power2.inOut", stagger: 0.02, lazy },
                0.15,
              );
            break;
          }
          case "draw":
            gsap.fromTo(
              el.querySelectorAll("[data-draw]"),
              { strokeDasharray: 1, strokeDashoffset: 1 },
              { strokeDashoffset: 0, duration: 1.3, ease: "power2.inOut", stagger: 0.18, delay, lazy, scrollTrigger },
            );
            break;
          case "clip": {
            const tl = gsap.timeline({ delay, scrollTrigger: { ...scrollTrigger, start: "top 92%" } });
            tl.fromTo(
              el,
              { clipPath: "inset(100% 0% 0% 0%)" },
              { clipPath: "inset(0% 0% 0% 0%)", duration: 1.6, ease: "expo.inOut", lazy },
            );
            const zoom = el.querySelector("[data-reveal-zoom]");
            if (zoom) tl.fromTo(zoom, { scale: 1.3 }, { scale: 1, duration: 2.2, ease, lazy }, 0);
            break;
          }
          case "line-x":
            gsap.fromTo(
              el,
              { scaleX: 0, transformOrigin: "0% 50%" },
              { scaleX: 1, duration: 1.6, ease: "expo.inOut", delay, lazy, scrollTrigger },
            );
            break;
          default:
            gsap.fromTo(el, { autoAlpha: 0 }, { autoAlpha: 1, duration: 1, delay, lazy, scrollTrigger });
        }

        // Starting pose is already written; containers that don't fade themselves can be shown.
        if (type && ["lines", "stagger", "draw", "clip", "line-x"].includes(type)) gsap.set(el, { visibility: "visible" });
      });

      gsap.utils.toArray<HTMLElement>("[data-parallax]").forEach((el) => {
        const amount = parseFloat(el.dataset.parallax ?? "8");
        gsap.fromTo(
          el,
          { yPercent: -amount },
          {
            yPercent: amount,
            ease: "none",
            scrollTrigger: { trigger: el.parentElement, start: "top bottom", end: "bottom top", scrub: true },
          },
        );
      });

      // Triggers were created by several components; make sure they refresh top-to-bottom.
      ScrollTrigger.sort();
      ScrollTrigger.refresh();
    });
  });

  return null;
}
