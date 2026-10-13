"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { Logo } from "@/components/brand/logo";
import { CartIcon, InstagramIcon, SearchIcon } from "@/components/ui/icons";
import { autoScroll, useLenis } from "@/components/providers/smooth-scroll";

export const NAV = [
  { id: "inicio", label: "Inicio" },
  { id: "nosotros", label: "Nosotros" },
  { id: "sabores", label: "Sabores" },
  { id: "tienda", label: "Tienda" },
  { id: "contacto", label: "Contacto" },
] as const;

type NavId = (typeof NAV)[number]["id"];

const MENU_CLOSED = "circle(0% at 92% 4%)";
const MENU_OPEN = "circle(150% at 92% 4%)";

export function Header() {
  const root = useRef<HTMLElement>(null);
  const menu = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLUListElement>(null);
  const indicator = useRef<HTMLSpanElement>(null);
  const [active, setActive] = useState<NavId>("inicio");
  const [open, setOpen] = useState(false);
  const openRef = useRef(false);
  const lenis = useLenis();

  // Transparent over the hero, frosted once scrolled, tucked away while reading downwards.
  useGSAP(() => {
    const el = root.current!;
    let state = "";
    ScrollTrigger.create({
      start: 0,
      end: "max",
      onUpdate(self) {
        const y = self.scroll();
        if (autoScroll.active && y >= 24) return;
        const next = y < 24 ? "top" : self.direction === 1 && y > 260 ? "hidden" : "solid";
        if (next !== state && !openRef.current) el.dataset.state = state = next;
      },
    });

    NAV.forEach(({ id }) => {
      const section = document.getElementById(id);
      if (!section) return;
      ScrollTrigger.create({
        trigger: section,
        start: "top 55%",
        end: "bottom 55%",
        onToggle: (self) => self.isActive && setActive(id),
      });
    });
  });

  // Slide the underline to the active link.
  useLayoutEffect(() => {
    const link = navRef.current?.querySelector<HTMLElement>(`[data-id="${active}"]`);
    const bar = indicator.current;
    if (!link || !bar) return;
    bar.style.width = `${link.offsetWidth * 0.62}px`;
    bar.style.transform = `translateX(${link.offsetLeft + link.offsetWidth * 0.19}px)`;
  }, [active]);

  // Mobile menu: a circle wipes open from the toggle, then the links rise.
  const menuTl = useRef<gsap.core.Timeline | null>(null);
  useGSAP(
    () => {
      openRef.current = open;
      if (!open && !menuTl.current) return; // initial render: already closed
      const panel = menu.current!;
      menuTl.current?.kill();
      const tl = (menuTl.current = gsap.timeline());
      if (open) {
        tl.set(panel, { visibility: "visible" })
          .fromTo(panel, { clipPath: MENU_CLOSED }, { clipPath: MENU_OPEN, duration: 0.95, ease: "expo.inOut" })
          .fromTo(
            panel.querySelectorAll("[data-menu-item]"),
            { yPercent: 115 },
            { yPercent: 0, duration: 1, stagger: 0.06, ease: "expo.out" },
            0.4,
          )
          .fromTo(
            panel.querySelector("[data-menu-foot]"),
            { autoAlpha: 0, y: 16 },
            { autoAlpha: 1, y: 0, duration: 0.8, ease: "expo.out" },
            0.7,
          );
      } else {
        tl.to(panel, { clipPath: MENU_CLOSED, duration: 0.7, ease: "expo.inOut" }).set(panel, { visibility: "hidden" });
      }
    },
    { dependencies: [open] },
  );

  // While the menu is open the page stays put and Escape closes it.
  useEffect(() => {
    if (!open) return;
    lenis?.stop();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      lenis?.start();
    };
  }, [open, lenis]);

  return (
    <>
      <header
        ref={root}
        data-state="top"
        data-menu-open={open ? "" : undefined}
        className="group/header fixed inset-x-0 top-0 z-50 transition-[translate,background-color,box-shadow] duration-700 ease-out-expo data-[state=hidden]:-translate-y-full data-[state=solid]:bg-cream/80 data-[state=solid]:shadow-[0_1px_0_rgba(1,63,125,0.08)] data-[state=solid]:backdrop-blur-xl data-menu-open:translate-y-0! data-menu-open:bg-transparent! data-menu-open:shadow-none! data-menu-open:backdrop-blur-none!"
      >
        <div
          data-intro="header"
          className="shell flex h-19 items-center justify-between transition-[height,color] duration-700 ease-out-expo group-data-menu-open/header:text-cream lg:h-23 lg:group-data-[state=solid]/header:h-19"
        >
          <a href="#inicio" aria-label="Mykono — inicio" className="text-aegean group-data-menu-open/header:text-cream">
            <Logo className="text-[15px] lg:text-[17px]" />
          </a>

          <nav aria-label="Principal" className="hidden lg:block">
            <ul ref={navRef} className="relative flex items-center gap-[clamp(28px,3vw,52px)]">
              {NAV.map(({ id, label }) => (
                <li key={id}>
                  <a
                    href={`#${id}`}
                    data-id={id}
                    aria-current={active === id ? "true" : undefined}
                    className="relative block py-3 text-[11.5px] font-semibold uppercase tracking-[0.18em] text-aegean-ink/75 transition-colors duration-300 hover:text-aegean aria-[current]:text-aegean"
                  >
                    {label}
                  </a>
                </li>
              ))}
              <span
                ref={indicator}
                aria-hidden="true"
                className="absolute bottom-1 left-0 h-0.5 rounded-full bg-aegean transition-[transform,width] duration-700 ease-out-expo"
              />
            </ul>
          </nav>

          <div className="flex items-center gap-1 text-aegean group-data-menu-open/header:text-cream">
            <a
              href="#sabores"
              aria-label="Buscar sabores"
              className="grid size-11 place-items-center rounded-full transition-colors hover:bg-aegean/8"
            >
              <SearchIcon className="size-5.25" />
            </a>
            <a
              href="#tienda"
              aria-label="Ir a la tienda"
              className="relative grid size-11 place-items-center rounded-full transition-colors hover:bg-aegean/8"
            >
              <CartIcon className="size-5.5" />
              <span className="absolute right-2 top-2.5 size-2 rounded-full bg-gold" />
            </a>
            <button
              type="button"
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? "Cerrar menú" : "Abrir menú"}
              onClick={() => setOpen((v) => !v)}
              className="relative ml-1 grid size-11 place-items-center rounded-full lg:hidden"
            >
              <span
                className={`absolute h-[1.5px] w-5 bg-current transition-transform duration-500 ease-out-expo ${open ? "rotate-45" : "-translate-y-1"}`}
              />
              <span
                className={`absolute h-[1.5px] w-5 bg-current transition-transform duration-500 ease-out-expo ${open ? "-rotate-45" : "translate-y-1"}`}
              />
            </button>
          </div>
        </div>
      </header>

      <div
        ref={menu}
        id="mobile-menu"
        className="invisible fixed inset-0 z-40 flex h-svh flex-col justify-between bg-aegean px-6 pb-10 pt-28 text-cream lg:hidden"
        style={{ clipPath: MENU_CLOSED }}
      >
        <nav aria-label="Menú móvil">
          <ul className="space-y-1">
            {NAV.map(({ id, label }, i) => (
              <li key={id} className="overflow-hidden">
                <a
                  href={`#${id}`}
                  data-menu-item
                  onClick={() => setOpen(false)}
                  className="flex items-baseline gap-4 py-1 font-serif text-[13vw] uppercase leading-[1.02] sm:text-[64px]"
                >
                  <span className="font-sans text-xs tracking-[0.2em] text-gold">0{i + 1}</span>
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div data-menu-foot className="flex items-center justify-between border-t border-cream/20 pt-6 text-sm">
          <span className="eyebrow text-cream/70">Greek frozen yogurt</span>
          <a
            href="https://www.instagram.com/mykono_greekfrozenyogurt/"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2"
          >
            <InstagramIcon className="size-5" /> Instagram
          </a>
        </div>
      </div>
    </>
  );
}
