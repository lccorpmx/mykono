"use client";

import Image from "next/image";
import { useRef } from "react";
import { gsap, INTRO_AT, MOTION_OK, useGSAP } from "@/lib/gsap";
import { PillLink } from "@/components/ui/pill-link";
import { OliveBranch } from "@/components/brand/olive-branch";
import heroImage from "@/assets/images/hero.webp";

const TITLE = ["Helado", "Griego"];

export function Hero() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add(MOTION_OK, () => {
        const q = gsap.utils.selector(root);
        const header = document.querySelector('[data-intro="header"]');
        const delay = Math.max(0.05, INTRO_AT - 0.45 - performance.now() / 1000);

        // Starting poses are written synchronously (no lazy render), then everything is unveiled.
        gsap.set(q("[data-hero-visual]"), { clipPath: "inset(0% 0% 0% 100%)" });
        gsap.set(q("[data-hero-media]"), { scale: 1.22, xPercent: 6 });
        gsap.set(q("[data-hero-title] .line-inner"), { yPercent: 112 });
        gsap.set(q("[data-hero-sub] > span"), { autoAlpha: 0, y: 18 });
        gsap.set(q("[data-intro]"), { visibility: "visible" });
        gsap.set(q("[data-hero-eyebrow]"), { autoAlpha: 0, letterSpacing: "0.75em" });
        gsap.set(q("[data-hero-cta]"), { autoAlpha: 0, y: 22, scale: 0.94 });
        gsap.set(q("[data-hero-leaves]"), { autoAlpha: 0 });
        if (header) gsap.set(header, { yPercent: -60, autoAlpha: 0 });

        const intro = gsap.timeline({ delay, defaults: { ease: "expo.out" } });
        intro
          .to(q("[data-hero-visual]"), { clipPath: "inset(0% 0% 0% 0%)", duration: 1.7, ease: "expo.inOut" }, 0)
          .to(q("[data-hero-media]"), { scale: 1, xPercent: 0, duration: 2.6 }, 0.1)
          .to(header, { yPercent: 0, autoAlpha: 1, duration: 1.4 }, 0.55)
          .to(q("[data-hero-eyebrow]"), { autoAlpha: 1, letterSpacing: "0.34em", duration: 1.8 }, 0.45)
          .to(q("[data-hero-title] .line-inner"), { yPercent: 0, duration: 1.5, stagger: 0.11 }, 0.5)
          .to(q("[data-hero-sub] > span"), { autoAlpha: 1, y: 0, duration: 1.2, stagger: 0.08 }, 0.95)
          .to(q("[data-hero-cta]"), { autoAlpha: 1, y: 0, scale: 1, duration: 1.2 }, 1.1)
          .to(q("[data-hero-leaves]"), { autoAlpha: 1, duration: 2.4, ease: "sine.out" }, 0.6)
          .to(q(".shine"), { backgroundPosition: "0% 0", duration: 1.8, ease: "power2.inOut" }, 1.25);

        // Leaving the hero: copy drifts up faster than the photograph.
        gsap
          .timeline({
            scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: true },
            defaults: { ease: "none" },
          })
          .to(q("[data-hero-copy]"), { yPercent: -18, autoAlpha: 0.15 }, 0)
          .to(q("[data-hero-parallax]"), { yPercent: 9 }, 0)
          .to(q("[data-hero-leaves]"), { yPercent: 30 }, 0);

        // Depth on pointer move (desktop pointers only).
        if (!window.matchMedia("(pointer: fine)").matches) return;
        const moveMedia = {
          x: gsap.quickTo(q("[data-hero-parallax]"), "x", { duration: 1.2, ease: "power3" }),
          y: gsap.quickTo(q("[data-hero-parallax]"), "y", { duration: 1.2, ease: "power3" }),
        };
        const moveLeaves = {
          x: gsap.quickTo(q("[data-hero-leaves]"), "x", { duration: 1.6, ease: "power3" }),
          y: gsap.quickTo(q("[data-hero-leaves]"), "y", { duration: 1.6, ease: "power3" }),
        };
        const onMove = (e: PointerEvent) => {
          const nx = e.clientX / window.innerWidth - 0.5;
          const ny = e.clientY / window.innerHeight - 0.5;
          moveMedia.x(nx * -18);
          moveMedia.y(ny * -12);
          moveLeaves.x(nx * 36);
          moveLeaves.y(ny * 24);
        };
        const el = root.current!;
        el.addEventListener("pointermove", onMove);
        return () => el.removeEventListener("pointermove", onMove);
      });
    },
    { scope: root },
  );

  return (
    <section id="inicio" ref={root} className="relative isolate overflow-hidden bg-cream">
      <div className="relative flex flex-col lg:block lg:h-svh lg:max-h-270 lg:min-h-170">
        {/* Photograph — arch, sea and the signature cup */}
        <div
          data-intro
          data-hero-visual
          className="relative order-2 aspect-1312/1050 w-full overflow-hidden lg:absolute lg:inset-y-0 lg:right-0 lg:aspect-auto lg:w-[63%]"
        >
          <div data-hero-parallax className="absolute inset-[-3%]">
            <div
              data-hero-media
              className="absolute inset-0 mask-[linear-gradient(180deg,transparent,#000_16%)] lg:mask-[linear-gradient(90deg,transparent_5%,rgba(0,0,0,.5)_16%,#000_33%)]"
            >
              <Image
                src={heroImage}
                alt="Vaso Mykono de helado griego natural con granola, frente a un arco blanco con vista al mar Egeo"
                fill
                priority
                placeholder="blur"
                sizes="(min-width: 1024px) 66vw, 100vw"
                className="object-cover object-[64%_50%]"
              />
            </div>
          </div>
        </div>

        {/* Dappled olive shade across the wall */}
        <div
          data-intro
          data-hero-leaves
          aria-hidden="true"
          className="pointer-events-none absolute left-[-8%] top-[-6%] z-1 w-[70%] text-[#6a5638] opacity-[0.11] mix-blend-multiply blur-[9px] lg:w-[44%]"
        >
          <div className="animate-sway origin-top-left">
            <OliveBranch shadow className="w-full -scale-x-100 rotate-200" />
          </div>
        </div>

        {/* Copy */}
        <div className="shell relative z-10 order-1 flex flex-col pb-10 pt-[clamp(120px,22vw,150px)] lg:h-full lg:justify-center lg:pb-0 lg:pt-16">
          <div data-hero-copy className="max-w-160">
            <p data-intro data-hero-eyebrow className="eyebrow mb-5 text-[11px] text-ink/80 lg:mb-7 lg:text-[13px]">
              Greek frozen yogurt
            </p>
            <h1 data-intro data-hero-title className="display text-[clamp(54px,6.7vw,118px)] text-aegean">
              {TITLE.map((word) => (
                <span key={word} className="line-mask">
                  <span className="line-inner">{word}</span>
                </span>
              ))}
              <span className="line-mask">
                <span className="line-inner shine">Natural</span>
              </span>
            </h1>
            <p
              data-intro
              data-hero-sub
              className="mt-6 text-[14px] font-medium uppercase leading-[1.55] tracking-[0.2em] text-aegean-ink lg:mt-8 lg:text-[17px]"
            >
              <span className="block">Cremoso, ligero</span>
              <span className="block">y lleno de sabor.</span>
            </p>
            <div data-intro data-hero-cta className="mt-8 lg:mt-11">
              <PillLink href="#sabores">Ver sabores</PillLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
