import { Logo } from "@/components/brand/logo";
import { PillLink } from "@/components/ui/pill-link";
import { ArrowUpRight } from "@/components/ui/icons";
import { INSTAGRAM_URL } from "@/components/sections/instagram";

const LINKS = [
  { href: "#inicio", label: "Inicio" },
  { href: "#sabores", label: "Sabores" },
  { href: "#menu", label: "Flotantes" },
  { href: "#tienda", label: "Tienda" },
  { href: "#nosotros", label: "Nosotros" },
];

/** Greek key border. */
function Meander() {
  return (
    <svg aria-hidden="true" className="block h-4 w-full text-gold/80" preserveAspectRatio="none">
      <defs>
        <pattern id="meander" width="22" height="16" patternUnits="userSpaceOnUse">
          <path
            d="M0 14.5H22M14.5 14.5V1.5H3.5V10.5H10.5V5.5H7"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="square"
          />
        </pattern>
      </defs>
      <rect width="100%" height="16" fill="url(#meander)" />
    </svg>
  );
}

export function Footer() {
  return (
    <footer id="contacto" className="relative overflow-hidden bg-aegean text-cream">
      <div className="shell pt-10">
        <Meander />
      </div>

      <div className="shell grid gap-12 py-16 sm:grid-cols-2 lg:grid-cols-[1.3fr_0.8fr_0.9fr_1.1fr] lg:py-20">
        <div data-reveal="up">
          <Logo className="text-[20px] text-cream" />
          <p className="mt-6 max-w-[30ch] text-[15px] leading-relaxed text-cream/75">
            Helado griego natural: cremoso, ligero y lleno de sabor. Hecho con ingredientes reales, todos los días.
          </p>
        </div>

        <nav data-reveal="up" data-delay="0.08" aria-label="Pie de página">
          <p className="eyebrow text-[11px] text-gold">Explora</p>
          <ul className="mt-5 space-y-2.5">
            {LINKS.map((l) => (
              <li key={l.href}>
                <a href={l.href} className="text-[15px] text-cream/85 transition-colors hover:text-cream">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div data-reveal="up" data-delay="0.16">
          <p className="eyebrow text-[11px] text-gold">Síguenos</p>
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noreferrer"
            className="group mt-5 inline-flex items-center gap-2 text-[15px] text-cream/85 transition-colors hover:text-cream"
          >
            Instagram
            <ArrowUpRight className="size-3.5 transition-transform duration-500 ease-out-expo group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </a>
          <p className="mt-2 text-[13px] text-cream/55">@mykono_greekfrozenyogurt</p>
        </div>

        <div data-reveal="up" data-delay="0.24">
          <p className="font-serif text-[30px] uppercase leading-[1.05]">¿Se te antojó?</p>
          <p className="mt-3 max-w-[28ch] text-[15px] leading-relaxed text-cream/75">
            Descubre todos nuestros sabores y encuentra tu favorito.
          </p>
          <div className="mt-7">
            <PillLink variant="light" href="#sabores">
              Ver sabores
            </PillLink>
          </div>
        </div>
      </div>

      <div className="shell" aria-hidden="true">
        <p data-reveal="lines" className="display -mb-[0.16em] text-center text-[17.6vw] leading-[0.8] text-cream/[0.07] lg:text-[calc((100vw-2*var(--gutter))/4.7)]">
          <span className="line-mask">
            <span className="line-inner">Mykono</span>
          </span>
        </p>
      </div>

      <div className="relative border-t border-cream/15">
        <div className="shell flex flex-col gap-2 py-6 text-[12px] tracking-wide text-cream/60 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Mykono · Greek Frozen Yogurt</p>
          <p className="uppercase tracking-[0.2em]">Good yogurt · Good mood</p>
        </div>
      </div>
    </footer>
  );
}
