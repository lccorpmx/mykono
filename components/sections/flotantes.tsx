import Image from "next/image";
import { PillLink } from "@/components/ui/pill-link";
import flotantesImage from "@/assets/images/flotantes.webp";

/** Hand-drawn arrows, in the photo's own pixel space (1042 × 558). */
const ARROWS = [
  { line: "M84 172C70 214 90 252 136 264", head: "M118 252L138 264L116 272" },
  { line: "M812 214C830 262 802 308 742 322", head: "M760 308L740 322L762 334" },
];

export function Flotantes() {
  return (
    <section id="menu" aria-labelledby="flotantes-title" className="relative overflow-hidden bg-aegean text-cream">
      <div className="xl:h-[29.6vw] xl:min-h-[400px]">
        <div className="shell relative z-10 flex h-full flex-col justify-center pb-12 pt-20 xl:py-0">
          <div className="xl:max-w-[36vw]">
            <div className="flex items-center gap-6">
              <p data-reveal="up" className="eyebrow text-[11.5px] text-cream/90">
                Nuestros favoritos
              </p>
              <span data-reveal="line-x" className="block h-px w-24 bg-cream/45" />
            </div>
            <h2 id="flotantes-title" data-reveal="lines" className="display mt-5 text-[clamp(54px,5.1vw,98px)]">
              <span className="line-mask">
                <span className="line-inner">Flotantes</span>
              </span>
            </h2>
            <span data-reveal="line-x" className="mt-7 block h-px w-full max-w-[420px] bg-cream/35" />
            <p data-reveal="up" className="mt-6 max-w-[26ch] text-[17px] leading-relaxed text-cream/90 xl:text-[18px]">
              Dos formas de encontrar tu creamy karma.
            </p>
            <div data-reveal="up" className="mt-8 xl:mt-10">
              <PillLink variant="light" href="#tienda">
                Ver menú
              </PillLink>
            </div>
          </div>
        </div>
      </div>

      <figure className="relative aspect-[1042/558] w-full xl:absolute xl:bottom-0 xl:right-0 xl:h-full xl:w-auto">
        <div data-reveal="clip" className="absolute inset-0 overflow-hidden">
          <div
            data-reveal-zoom
            className="absolute inset-0 [mask-image:linear-gradient(90deg,transparent,#000_14%)]"
          >
            <Image
              src={flotantesImage}
              alt="Flotante de matcha con helado de matcha y latte con helado Pumpkin Spice, en vasos Mykono"
              fill
              placeholder="blur"
              sizes="(min-width: 1280px) 56vw, 100vw"
              className="object-cover"
            />
          </div>
        </div>

        <figcaption className="pointer-events-none absolute inset-0 text-cream">
          <div data-reveal="up" data-delay="0.35" className="absolute left-[4.6%] top-[13.5%]">
            <p className="text-[clamp(13px,1.35vw,22px)] font-medium uppercase tracking-[0.14em]">Matcha</p>
            <p className="mt-1 text-[clamp(10px,0.95vw,15px)] font-medium uppercase tracking-[0.12em] text-cream/85">
              + Matcha
            </p>
          </div>
          <div data-reveal="up" data-delay="0.5" className="absolute left-[70.6%] top-[13.5%]">
            <p className="text-[clamp(13px,1.35vw,22px)] font-medium uppercase tracking-[0.14em]">Latte</p>
            <p className="mt-2 text-[clamp(11px,1.05vw,17px)] font-medium leading-snug text-cream/90">
              + helado
              <br />
              Pumpkin Spice
            </p>
          </div>
          <svg
            data-reveal="draw"
            data-delay="0.6"
            viewBox="0 0 1042 558"
            className="absolute inset-0 size-full"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.6"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            {ARROWS.map((a) => (
              <g key={a.line}>
                <path data-draw pathLength={1} d={a.line} />
                <path data-draw pathLength={1} d={a.head} />
              </g>
            ))}
          </svg>
        </figcaption>
      </figure>
    </section>
  );
}
