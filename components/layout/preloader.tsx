import { COLUMN_STROKES } from "@/components/brand/logo";

/** Brand curtain: the column draws itself, the name rises, then the curtain lifts (pure CSS). */
export function Preloader() {
  return (
    <div className="preloader" aria-hidden="true">
      <div className="preloader__mark flex flex-col items-center">
        <span className="preloader__word flex overflow-hidden font-serif text-[clamp(44px,7vw,84px)] font-medium leading-[1.05] tracking-[0.04em]">
          {"MYKONO".split("").map((ch, i) => (
            <span key={i}>{ch}</span>
          ))}
        </span>
        <svg viewBox="0 0 60 46" fill="none" className="mt-3 h-[clamp(40px,5.5vw,62px)] w-auto">
          <g stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
            {COLUMN_STROKES.map((s) => (
              <path key={s.d} d={s.d} strokeWidth={s.w} pathLength={1} data-stroke="" />
            ))}
          </g>
        </svg>
      </div>
    </div>
  );
}
