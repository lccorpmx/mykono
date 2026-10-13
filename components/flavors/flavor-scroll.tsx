"use client";

import type Lenis from "lenis";
import { useEffect, useRef } from "react";
import { gsap, MOTION_OK, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { autoScroll, easeInOutQuart, useLenis } from "@/components/providers/smooth-scroll";
import { PillLink } from "@/components/ui/pill-link";
import { FLAVORS, SLOTS, SPLASH, type Floater } from "./flavors";
import { IMPACT, ProductBack, ProductFront, VB } from "./product";
import { FlavorList } from "./flavor-list";

/** Timeline units spent morphing from one flavour to the next. */
const TRANSITION = 1;
/** Timeline units spent resting on a flavour (snap targets sit in the middle). */
const HOLD = 0.7;
/** Scroll distance, in viewport heights, for one timeline unit. */
const VH_PER_UNIT = 0.78;
/** How far (in % of its own height) masked type travels to hide — enough to tuck accents away. */
const HIDE = 135;

const pct = (value: number, of: number) => `${(value / of) * 100}%`;
const first = FLAVORS[0].palette;

function Piece({ id, rot = 0 }: { id: string; rot?: number }) {
  return (
    <svg viewBox="0 0 100 100" className="block size-full overflow-visible" style={{ rotate: `${rot}deg` }}>
      <use href={`#f-${id}`} />
    </svg>
  );
}

function FloatingFruit({ flavor, slot, piece }: { flavor: number; slot: number; piece: Floater }) {
  const s = SLOTS[slot];
  const style = {
    "--x": `${s.x}%`,
    "--y": `${s.y}%`,
    "--mx": `${s.mx}%`,
    "--my": `${s.my}%`,
    "--s": s.s * (piece.scale ?? 1),
  } as React.CSSProperties;
  return (
    <div data-floater={flavor} className="floater absolute will-change-transform" style={style}>
      <div
        className="size-full animate-bob"
        style={{
          animationDuration: `${5.2 + (slot % 3) * 1.4}s`,
          animationDelay: `${-slot * 0.9}s`,
          filter: s.blur ? `blur(${s.blur}px)` : undefined,
        }}
      >
        <Piece id={piece.id} rot={piece.rot} />
      </div>
    </div>
  );
}

export function FlavorScroll() {
  const root = useRef<HTMLElement>(null);
  const lenis = useLenis();
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    lenisRef.current = lenis;
  }, [lenis]);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => setupShowcase(root.current!, () => lenisRef.current));
    },
    { scope: root },
  );

  return (
    <section ref={root} id="sabores" aria-labelledby="sabores-title" className="relative">
      <h2 id="sabores-title" className="sr-only">
        Sabores Mykono
      </h2>

      <div
        data-stage
        aria-hidden="true"
        className="relative h-svh overflow-hidden motion-reduce:hidden"
        style={{ backgroundColor: first.bg, color: first.ink, "--accent": first.accent } as React.CSSProperties}
      >
        {/* Giant flavour name */}
        <div
          data-giant-wrap
          className="pointer-events-none absolute inset-x-0 top-[31%] grid -translate-y-1/2 select-none lg:top-[47%]"
        >
          {FLAVORS.map((f, i) => (
            <div
              key={f.id}
              data-giant={i}
              className="flavor-giant flex items-center justify-center overflow-hidden font-serif font-medium uppercase leading-[0.84] tracking-[-0.02em] [grid-area:1/1]"
              style={{ "--len": f.giant.length, color: f.palette.giant } as React.CSSProperties}
            >
              {[...f.giant].map((ch, k) => (
                <span key={k} data-char className="inline-block will-change-transform">
                  {ch}
                </span>
              ))}
            </div>
          ))}
        </div>

        {/* Soft light behind the cup */}
        <div className="pointer-events-none absolute left-1/2 top-[33%] size-[92vmin] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(255,255,255,0.72),rgba(255,255,255,0))] lg:top-[54%]" />

        {/* Far fruit */}
        <div data-depth="-14" className="pointer-events-none absolute inset-0">
          {FLAVORS.map((f, i) =>
            f.floaters.map((p, k) =>
              SLOTS[k].layer === "back" ? <FloatingFruit key={`${f.id}-${k}`} flavor={i} slot={k} piece={p} /> : null,
            ),
          )}
        </div>

        {/* The cup */}
        <div
          data-product
          data-depth="16"
          className="absolute left-1/2 top-[7svh] aspect-400/540 h-[50svh] -translate-x-1/2 lg:bottom-[1svh] lg:top-auto lg:h-[78svh]"
        >
          <div className="absolute inset-0 animate-float">
            <div className="absolute inset-0">
              {FLAVORS.map((f, i) =>
                f.divers.map((d, k) => (
                  <div
                    key={`${f.id}-${k}`}
                    data-diver={i}
                    className="absolute aspect-square will-change-transform"
                    style={{ left: pct(d.tx, VB.w), top: pct(d.ty, VB.h), width: pct(d.size, VB.w), translate: "-50% -50%" }}
                  >
                    <Piece id={d.id} />
                  </div>
                )),
              )}
            </div>
            <ProductBack yogurt={first.yogurt} />
            <ProductFront />
            <div className="absolute inset-0">
              {FLAVORS.map((f, i) =>
                f.toppings.map((t, k) => (
                  <div
                    key={`${f.id}-${k}`}
                    data-topping={i}
                    className="absolute aspect-square will-change-transform"
                    style={{ left: pct(t.x, VB.w), top: pct(t.y, VB.h), width: pct(t.size, VB.w), translate: "-50% -50%" }}
                  >
                    <Piece id={t.id} rot={t.rot} />
                  </div>
                )),
              )}
              {SPLASH.map((_, k) => (
                <span
                  key={k}
                  data-drop
                  className="absolute aspect-square w-[3.4%] rounded-full shadow-[inset_-2px_-3px_5px_rgba(74,48,32,0.16),0_3px_8px_rgba(74,48,32,0.14)]"
                  style={{ left: pct(IMPACT.x, VB.w), top: pct(IMPACT.y, VB.h), translate: "-50% -50%" }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Near fruit, out of focus */}
        <div data-depth="34" className="pointer-events-none absolute inset-0">
          {FLAVORS.map((f, i) =>
            f.floaters.map((p, k) =>
              SLOTS[k].layer === "front" ? <FloatingFruit key={`${f.id}-${k}`} flavor={i} slot={k} piece={p} /> : null,
            ),
          )}
        </div>

        {/* Copy */}
        <div
          data-copy-col
          className="absolute inset-x-6 bottom-[3svh] top-[60svh] lg:inset-y-0 lg:left-(--gutter) lg:right-auto lg:w-[min(31vw,470px)]"
        >
          {FLAVORS.map((f, i) => (
            <article
              key={f.id}
              data-copy={i}
              className="absolute inset-0 flex flex-col items-center text-center lg:items-start lg:justify-center lg:text-left"
            >
              <p data-fade className="eyebrow flex items-center gap-3 text-[10.5px] lg:text-[11.5px]">
                <span className="h-px w-8 bg-(--accent)" />
                {f.tag}
              </p>
              <h3 className="display mt-3 text-[clamp(46px,13vw,66px)] lg:mt-6 lg:text-[min(5.5vw,11svh)]">
                {f.title.map((line) => (
                  <span key={line} className="line-mask">
                    <span className="line-inner">{line}</span>
                  </span>
                ))}
              </h3>
              <p
                data-fade
                className="mt-3 max-w-[36ch] text-[13.5px] leading-relaxed opacity-80 lg:mt-6 lg:max-w-[34ch] lg:text-[16px]"
              >
                {f.description}
              </p>
              <div data-fade className="mt-5 lg:mt-9">
                <PillLink href="#tienda" tabIndex={-1}>
                  Pide el tuyo
                </PillLink>
              </div>
            </article>
          ))}
        </div>

        {/* What's in the cup (desktop) */}
        <div className="absolute inset-y-0 right-(--gutter) hidden w-[15vw] min-w-52.5 lg:block">
          {FLAVORS.map((f, i) => (
            <div key={f.id} data-list={i} className="absolute inset-0 flex flex-col justify-center">
              <p data-fade className="eyebrow mb-6 text-[10.5px] opacity-70">
                En tu vaso
              </p>
              <ul className="space-y-4">
                {f.ingredients.map((ing) => (
                  <li key={ing.label} data-fade className="flex items-center gap-4">
                    <span className="grid size-13 shrink-0 place-items-center rounded-full bg-white/55 shadow-[0_10px_26px_-14px_rgba(40,20,10,0.35)] backdrop-blur-sm">
                      {ing.id ? (
                        <svg viewBox="0 0 100 100" className="size-8 overflow-visible">
                          <use href={`#f-${ing.id}`} />
                        </svg>
                      ) : (
                        <span className="size-2 rounded-full bg-(--accent)" />
                      )}
                    </span>
                    <span className="text-[14px] font-medium">{ing.label}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <FlavorList />
    </section>
  );
}

/** Builds the pinned, scroll-scrubbed flavour story. Returns a cleanup for gsap.matchMedia. */
function setupShowcase(section: HTMLElement, getLenis: () => Lenis | null) {
  const all = (selector: string) => gsap.utils.toArray<HTMLElement>(section.querySelectorAll(selector));
  const stage = section.querySelector<HTMLElement>("[data-stage]")!;
  const product = section.querySelector<HTMLElement>("[data-product]")!;
  const swirl = section.querySelector("[data-swirl]")!;
  const baseSwirl = section.querySelector("[data-swirl-base]")!;
  const bloomSwirl = section.querySelector("[data-swirl-bloom]")!;
  const bloom = section.querySelector("[data-bloom]")!;
  const sauce = section.querySelector("[data-sauce]")!;
  const sauceArcs = all("[data-sauce] [data-arc]").map((arc) => arc.querySelectorAll("[data-stroke]"));
  const sauceDrips = all("[data-sauce] [data-drip]");
  const sauceAll = [...all("[data-sauce] [data-stroke]"), ...sauceDrips];
  const drops = all("[data-drop]");

  const W = () => product.offsetWidth;
  const H = () => product.offsetHeight;
  const VH = () => window.innerHeight;
  const VW = () => window.innerWidth;

  const copyFades = (i: number) => all(`[data-copy="${i}"] [data-fade], [data-list="${i}"] [data-fade]`);
  const copyLines = (i: number) => all(`[data-copy="${i}"] .line-inner`);
  const giantChars = (i: number) => all(`[data-giant="${i}"] [data-char]`);
  const floaters = (i: number) => all(`[data-floater="${i}"]`);
  const toppings = (i: number) => all(`[data-topping="${i}"]`);
  const divers = (i: number) => all(`[data-diver="${i}"]`);

  const tl = gsap.timeline({ defaults: { ease: "none" } });

  // Resting state: only the first flavour is on stage. These live inside the timeline
  // (not as loose gsap.set calls) so ScrollTrigger refreshes revert and restore them cleanly.
  FLAVORS.forEach((_, i) => {
    if (i === 0) return;
    tl.set(copyFades(i), { autoAlpha: 0, y: 30 }, 0);
    tl.set([...copyLines(i), ...giantChars(i)], { yPercent: HIDE, visibility: "visible" }, 0);
    tl.set(floaters(i), { autoAlpha: 0 }, 0);
    tl.set(toppings(i), { autoAlpha: 0, scale: 0 }, 0);
  });
  tl.set([...all("[data-diver]"), ...drops], { autoAlpha: 0 }, 0);

  const morph = (a: number, b: number, t0: number) => {
    const A = FLAVORS[a];
    const B = FLAVORS[b];
    const impact = t0 + 0.52;

    /* ── the outgoing flavour sinks and drifts away ── */
    tl.to(copyFades(a), { autoAlpha: 0, y: -26, duration: 0.24, stagger: 0.025, ease: "power2.in" }, t0);
    tl.to(copyLines(a), { yPercent: -HIDE, duration: 0.3, stagger: 0.04, ease: "power3.in" }, t0);
    tl.to(giantChars(a), { yPercent: -HIDE, duration: 0.34, stagger: { each: 0.025, from: "center" }, ease: "power3.in" }, t0 + 0.02);
    if (A.toppings.length)
      tl.to(toppings(a), { yPercent: 70, scale: 0.35, autoAlpha: 0, duration: 0.28, stagger: 0.02, ease: "power2.in" }, t0);
    if (A.palette.sauce) {
      tl.to(sauceAll, { strokeDashoffset: -1, duration: 0.28, ease: "power1.in" }, t0);
      tl.set(sauce, { autoAlpha: 0 }, t0 + 0.29);
    }

    floaters(a).forEach((el, k) => {
      const dir = SLOTS[k].x < 50 ? -1 : 1;
      tl.to(
        el,
        {
          y: () => -VH() * (0.78 + (k % 3) * 0.12),
          x: () => dir * VW() * 0.06,
          rotation: dir * 70,
          autoAlpha: 0,
          duration: 0.55,
          ease: "power2.in",
        },
        t0 + k * 0.025,
      );
    });

    /* ── fresh fruit arcs in and plunges into the swirl ── */
    B.divers.forEach((d, k) => {
      const el = divers(b)[k];
      const at = t0 + 0.1 + k * 0.055;
      tl.set(el, { autoAlpha: 1, x: () => d.sx * W(), y: () => d.sy * H(), rotation: d.rot - 220, scale: 1.25 }, at);
      tl.to(el, { x: 0, rotation: d.rot, scale: 1, duration: 0.42, ease: "power1.out" }, at);
      tl.to(el, { y: 0, duration: 0.42, ease: "power2.in" }, at);
      tl.to(el, { y: () => 0.14 * H(), scale: 0.6, duration: 0.1, ease: "power1.in" }, at + 0.42);
      tl.set(el, { autoAlpha: 0 }, at + 0.52);
    });

    // The swirl gives under the weight, then wobbles back.
    tl.to(swirl, { scaleY: 0.95, scaleX: 1.035, svgOrigin: "200 334", duration: 0.07, ease: "power2.out" }, impact);
    tl.to(swirl, { scaleY: 1, scaleX: 1, svgOrigin: "200 334", duration: 0.36, ease: "elastic.out(1, 0.32)" }, impact + 0.07);

    // A few drops of yogurt fly up.
    drops.forEach((el, k) => {
      const s = SPLASH[k];
      tl.set(el, { autoAlpha: 1, x: 0, y: 0, scale: 0.2, backgroundColor: A.palette.yogurt }, impact);
      tl.to(el, { x: () => s.x * W(), y: () => s.y * W(), scale: s.s, duration: 0.24, ease: "power2.out" }, impact);
      tl.to(el, { y: () => (s.y + 0.12) * W(), autoAlpha: 0, duration: 0.16, ease: "power1.in" }, impact + 0.24);
    });

    // The new colour blooms out from where the fruit went in.
    tl.set(bloomSwirl, { attr: { fill: B.palette.yogurt } }, impact - 0.01);
    tl.to(bloom, { attr: { r: 420 }, duration: 0.38, ease: "power2.inOut" }, impact + 0.02);
    tl.set(baseSwirl, { attr: { fill: B.palette.yogurt } }, impact + 0.41);
    tl.set(bloom, { attr: { r: 0 } }, impact + 0.41);

    // Stage takes on the flavour's colours.
    tl.to(
      stage,
      { backgroundColor: B.palette.bg, color: B.palette.ink, "--accent": B.palette.accent, duration: 0.5, ease: "power1.inOut" },
      t0 + 0.38,
    );

    // Sauce is poured from the top, pass by pass, then drips.
    if (B.palette.sauce) {
      const pour = impact + 0.3;
      tl.set(sauceAll, { strokeDashoffset: 1 }, pour - 0.01);
      tl.set(sauce, { color: B.palette.sauce, autoAlpha: 1 }, pour);
      sauceArcs.forEach((strokes, k) => {
        tl.to(strokes, { strokeDashoffset: 0, duration: 0.1, ease: "power1.inOut" }, pour + k * 0.045);
      });
      tl.to(sauceDrips, { strokeDashoffset: 0, duration: 0.12, stagger: 0.03, ease: "power1.out" }, pour + sauceArcs.length * 0.045);
    }

    // Garnish lands on top.
    toppings(b).forEach((el, k) => {
      const at = impact + 0.2 + k * 0.035;
      tl.set(el, { yPercent: -90, rotation: -35 }, at);
      tl.to(el, { yPercent: 0, rotation: 0, scale: 1, autoAlpha: 1, duration: 0.26, ease: "back.out(2.4)" }, at);
    });

    // New fruit drifts up into the frame.
    floaters(b).forEach((el, k) => {
      const dir = SLOTS[k].x < 50 ? -1 : 1;
      const at = t0 + 0.36 + k * 0.03;
      tl.set(el, { y: () => VH() * (0.8 + (k % 3) * 0.1), x: () => dir * VW() * 0.05, rotation: -dir * 80 }, at);
      tl.to(el, { y: 0, x: 0, rotation: 0, duration: 0.62, ease: "power3.out" }, at);
      tl.to(el, { autoAlpha: 1, duration: 0.18 }, at);
    });

    // Type follows.
    tl.to(giantChars(b), { yPercent: 0, duration: 0.42, stagger: { each: 0.03, from: "center" }, ease: "power3.out" }, t0 + 0.44);
    tl.to(copyLines(b), { yPercent: 0, duration: 0.42, stagger: 0.06, ease: "power3.out" }, t0 + 0.6);
    tl.to(copyFades(b), { autoAlpha: 1, y: 0, duration: 0.36, stagger: 0.04, ease: "power3.out" }, t0 + 0.66);
  };

  tl.addLabel("f0", 0);
  let t = HOLD * 0.5;
  for (let i = 1; i < FLAVORS.length; i++) {
    morph(i - 1, i, t);
    t += TRANSITION;
    tl.addLabel(`f${i}`, t + HOLD * 0.45);
    t += HOLD;
  }
  tl.set({}, {}, t);

  const pin = ScrollTrigger.create({
    trigger: stage,
    start: "top top",
    end: () => `+=${tl.duration() * VH_PER_UNIT * VH()}`,
    pin: true,
    scrub: 0.9,
    animation: tl,
    anticipatePin: 1,
    refreshPriority: 1,
    invalidateOnRefresh: true,
  });

  // The cup rises into place as the section arrives.
  gsap
    .timeline({
      defaults: { ease: "none" },
      scrollTrigger: { trigger: stage, start: "top 92%", end: "top top", scrub: true },
    })
    .fromTo(product, { yPercent: 20, scale: 0.86 }, { yPercent: 0, scale: 1 }, 0)
    .fromTo(section.querySelector("[data-copy-col]"), { y: 70, autoAlpha: 0 }, { y: 0, autoAlpha: 1 }, 0.25)
    .fromTo(section.querySelector("[data-giant-wrap]"), { yPercent: -10, autoAlpha: 0 }, { yPercent: 0, autoAlpha: 1 }, 0);

  // Pause idle loops while the stage is off-screen.
  ScrollTrigger.create({
    trigger: section,
    start: "top bottom",
    end: "bottom top",
    onToggle: (self) => stage.toggleAttribute("data-idle", self.isActive),
  });

  // Gentle snapping: once scrolling settles, glide to the nearest finished flavour.
  let release: gsap.core.Tween | undefined;
  const labels = Object.values(tl.labels)
    .map((time) => time / tl.duration())
    .sort((x, y) => x - y);
  const onScrollEnd = () => {
    if (!pin.isActive) return;
    const p = pin.progress;
    const last = labels[labels.length - 1];
    if (p >= last) return;
    const next = Math.max(1, labels.findIndex((l) => l > p));
    const from = labels[next - 1];
    const to = labels[next];
    const local = (p - from) / (to - from);
    const target = pin.direction > 0 ? (local > 0.12 ? to : from) : local < 0.88 ? from : to;
    const y = pin.start + (pin.end - pin.start) * target;
    const distance = Math.abs(y - window.scrollY);
    if (distance < 2) return;
    const lenis = getLenis();
    const duration = gsap.utils.clamp(0.7, 1.4, distance / 800);
    autoScroll.active = true;
    release?.kill();
    release = gsap.delayedCall(duration + 0.15, () => (autoScroll.active = false));
    if (lenis) lenis.scrollTo(y, { duration, easing: easeInOutQuart });
    else window.scrollTo({ top: y, behavior: "smooth" });
  };
  ScrollTrigger.addEventListener("scrollEnd", onScrollEnd);

  // Depth on pointer move.
  let onMove: ((e: PointerEvent) => void) | undefined;
  if (window.matchMedia("(pointer: fine)").matches) {
    const layers = all("[data-depth]").map((el) => ({
      depth: parseFloat(el.dataset.depth ?? "0"),
      x: gsap.quickTo(el, "x", { duration: 1.4, ease: "power3" }),
      y: gsap.quickTo(el, "y", { duration: 1.4, ease: "power3" }),
    }));
    onMove = (e: PointerEvent) => {
      const nx = e.clientX / window.innerWidth - 0.5;
      const ny = e.clientY / window.innerHeight - 0.5;
      layers.forEach((l) => {
        l.x(nx * l.depth);
        l.y(ny * l.depth * 0.6);
      });
    };
    stage.addEventListener("pointermove", onMove);
  }

  return () => {
    release?.kill();
    autoScroll.active = false;
    ScrollTrigger.removeEventListener("scrollEnd", onScrollEnd);
    if (onMove) stage.removeEventListener("pointermove", onMove);
  };
}
