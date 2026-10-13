import { FLAVORS } from "./flavors";

/**
 * Text version of the flavour showcase: what screen readers get, and what
 * people who prefer reduced motion see instead of the pinned animation.
 */
export function FlavorList() {
  return (
    <div className="motion-safe:sr-only motion-reduce:py-24">
      <div className="shell">
        <p className="eyebrow text-aegean-ink/70">Nuestros sabores</p>
        <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {FLAVORS.map((f) => (
            <li
              key={f.id}
              className="rounded-[28px] p-8"
              style={{ backgroundColor: f.palette.bg, color: f.palette.ink }}
            >
              <div aria-hidden="true" className="flex gap-2">
                {f.ingredients
                  .filter((i) => i.id)
                  .map((i) => (
                    <span key={i.label} className="grid size-14 place-items-center rounded-full bg-white/60">
                      <svg viewBox="0 0 100 100" className="size-9 overflow-visible">
                        <use href={`#f-${i.id}`} />
                      </svg>
                    </span>
                  ))}
              </div>
              <p className="eyebrow mt-6 text-[11px] opacity-75">{f.tag}</p>
              <h3 className="display mt-2 text-5xl">{f.name}</h3>
              <p className="mt-4 text-[15px] leading-relaxed opacity-85">{f.description}</p>
              <p className="mt-4 text-sm font-medium">{f.ingredients.map((i) => i.label).join(" · ")}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
