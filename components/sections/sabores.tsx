"use client";

import Image, { type StaticImageData } from "next/image";
import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { PillLink } from "@/components/ui/pill-link";
import { ChevronLeft, ChevronRight } from "@/components/ui/icons";
import { OliveBranch } from "@/components/brand/olive-branch";
import baklava from "@/assets/images/sabor-baklava.webp";
import pistache from "@/assets/images/sabor-pistache.webp";
import chocolate from "@/assets/images/sabor-chocolate.webp";

type Item = { name: string; image: StaticImageData; alt: string };

const ITEMS: Item[] = [
  { name: "Miel con baklava", image: baklava, alt: "Helado griego con miel y trozos de baklava en vaso Mykono" },
  { name: "Pistache", image: pistache, alt: "Helado griego de pistache cubierto de pistache molido en vaso Mykono" },
  { name: "Chocolate", image: chocolate, alt: "Helado griego de chocolate con galleta en vaso Mykono" },
];

/** Three copies of the set so the track can loop seamlessly in both directions. */
const LOOP = [...ITEMS, ...ITEMS, ...ITEMS];
const n = ITEMS.length;

export function Sabores() {
  const root = useRef<HTMLElement>(null);
  const track = useRef<HTMLUListElement>(null);
  const index = useRef(n);
  const busy = useRef(false);

  const { contextSafe } = useGSAP({ scope: root });

  const stepSize = () => {
    const cards = track.current!.children;
    return (cards[1] as HTMLElement).offsetLeft - (cards[0] as HTMLElement).offsetLeft;
  };

  useGSAP(
    () => {
      const place = () => gsap.set(track.current, { x: -index.current * stepSize() });
      place();
      window.addEventListener("resize", place);
      return () => window.removeEventListener("resize", place);
    },
    { scope: root },
  );

  const go = contextSafe((dir: 1 | -1) => {
    if (busy.current) return;
    busy.current = true;
    index.current += dir;
    const images = track.current!.querySelectorAll("[data-card-media]");
    gsap.fromTo(images, { xPercent: dir * 10 }, { xPercent: 0, duration: 1.2, ease: "expo.out", overwrite: true });
    gsap.to(track.current, {
      x: -index.current * stepSize(),
      duration: 0.95,
      ease: "expo.inOut",
      onComplete: () => {
        // Jump back into the middle copy without anyone noticing.
        if (index.current >= 2 * n || index.current < n) {
          index.current = ((index.current % n) + n) % n + n;
          gsap.set(track.current, { x: -index.current * stepSize() });
        }
        busy.current = false;
      },
    });
  });

  // Swipe support for touch and pen.
  const startX = useRef<number | null>(null);
  const onPointerDown = (e: React.PointerEvent) => {
    startX.current = e.clientX;
  };
  const onPointerUp = (e: React.PointerEvent) => {
    if (startX.current === null) return;
    const dx = e.clientX - startX.current;
    startX.current = null;
    if (Math.abs(dx) > 40) go(dx < 0 ? 1 : -1);
  };

  return (
    <section id="tienda" ref={root} aria-labelledby="sabores-unicos-title" className="relative overflow-hidden bg-cream py-20 lg:py-28">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-10 -right-16 w-[220px] origin-bottom-right opacity-90 lg:w-[300px]"
      >
        <div className="origin-bottom-right animate-sway">
          <OliveBranch className="w-full -rotate-[58deg]" />
        </div>
      </div>

      <div className="shell grid items-center gap-12 lg:grid-cols-[minmax(0,0.42fr)_minmax(0,1fr)] lg:gap-10">
        <div>
          <p data-reveal="up" className="eyebrow text-[11.5px] text-ink/75">
            Explora
          </p>
          <h2 id="sabores-unicos-title" data-reveal="lines" className="display mt-4 text-[clamp(52px,5.4vw,96px)]">
            <span className="line-mask">
              <span className="line-inner text-aegean">Sabores</span>
            </span>
            <span className="line-mask">
              <span className="line-inner text-gold">Únicos</span>
            </span>
          </h2>
          <p data-reveal="up" className="mt-6 max-w-[36ch] text-[15.5px] leading-relaxed text-muted lg:text-[16.5px]">
            Combinaciones inspiradas <span className="text-ink">en Grecia</span> con ingredientes reales y mucho sabor.
          </p>
          <div data-reveal="up" className="mt-9">
            <PillLink variant="outline" href="#sabores">
              Ver todos
            </PillLink>
          </div>
        </div>

        <div
          data-reveal="up"
          role="region"
          aria-roledescription="carrusel"
          aria-label="Sabores destacados"
          className="relative flex items-center gap-3 lg:gap-5"
        >
          <button
            type="button"
            onClick={() => go(-1)}
            aria-label="Sabor anterior"
            className="z-10 grid size-11 shrink-0 place-items-center rounded-full border-[1.5px] border-aegean text-aegean transition-colors duration-300 hover:bg-aegean hover:text-cream max-sm:hidden"
          >
            <ChevronLeft className="size-4" />
          </button>

          <div
            className="min-w-0 flex-1 touch-pan-y overflow-hidden [container-type:inline-size]"
            onPointerDown={onPointerDown}
            onPointerUp={onPointerUp}
            onPointerCancel={() => (startX.current = null)}
          >
            <ul ref={track} className="flex gap-4 will-change-transform lg:gap-6">
              {LOOP.map((item, i) => {
                const copy = i < n || i >= 2 * n;
                return (
                  <li
                    key={i}
                    aria-hidden={copy || undefined}
                    aria-roledescription="sabor"
                    aria-label={copy ? undefined : `${(i % n) + 1} de ${n}: ${item.name}`}
                    className="group w-[calc((100cqw-16px)/1.35)] shrink-0 sm:w-[calc((100cqw-16px)/2)] lg:w-[calc((100cqw-48px)/3)]"
                  >
                    <div className="relative aspect-[141/182] overflow-hidden rounded-md bg-cream-deep shadow-[0_16px_30px_-22px_rgba(1,45,92,0.4)]">
                      <div data-card-media className="absolute -inset-[6%]">
                        <Image
                          src={item.image}
                          alt={copy ? "" : item.alt}
                          fill
                          placeholder="blur"
                          sizes="(min-width: 1024px) 22vw, (min-width: 640px) 45vw, 72vw"
                          className="object-cover transition-transform duration-[1.2s] ease-out-expo group-hover:scale-[1.06]"
                        />
                      </div>
                    </div>
                    <p className="mt-4 text-center text-[11.5px] font-semibold uppercase tracking-[0.16em] text-ink">
                      <span className="bg-[linear-gradient(currentColor,currentColor)] bg-[length:0%_1px] bg-[position:50%_100%] bg-no-repeat pb-1 transition-[background-size] duration-700 ease-out-expo group-hover:bg-[length:100%_1px]">
                        {item.name}
                      </span>
                    </p>
                  </li>
                );
              })}
            </ul>
          </div>

          <button
            type="button"
            onClick={() => go(1)}
            aria-label="Siguiente sabor"
            className="z-10 grid size-11 shrink-0 place-items-center rounded-full border-[1.5px] border-aegean text-aegean transition-colors duration-300 hover:bg-aegean hover:text-cream max-sm:hidden"
          >
            <ChevronRight className="size-4" />
          </button>
        </div>
      </div>
    </section>
  );
}
