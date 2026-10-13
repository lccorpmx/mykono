type MarkProps = React.SVGProps<SVGSVGElement> & { strokeScale?: number };

const VOLUTE_LEFT =
  "M10.2 7.6L9.1 7.8L8.1 8.2L7.2 8.8L6.4 9.6L5.8 10.5L5.5 11.5L5.3 12.5L5.4 13.5L5.6 14.4L6 15.3L6.6 16L7.3 16.6L8.1 17L8.9 17.3L9.8 17.4L10.6 17.3L11.4 17L12.1 16.6L12.7 16.1L13.2 15.5L13.5 14.8L13.6 14.1L13.6 13.4L13.5 12.7L13.2 12.1L12.9 11.5L12.4 11.1L11.9 10.7L11.3 10.5L10.7 10.5L10.2 10.5L9.7 10.7L9.2 10.9L8.8 11.2L8.5 11.6L8.3 12L8.2 12.5L8.2 12.9L8.3 13.3L8.4 13.7L8.6 14L8.9 14.2L9.2 14.4L9.5 14.5L9.8 14.5L10.1 14.5L10.3 14.4L10.5 14.2";
const VOLUTE_RIGHT =
  "M49.8 7.6L50.9 7.8L51.9 8.2L52.8 8.8L53.6 9.6L54.2 10.5L54.5 11.5L54.7 12.5L54.6 13.5L54.4 14.4L54 15.3L53.4 16L52.7 16.6L51.9 17L51.1 17.3L50.2 17.4L49.4 17.3L48.6 17L47.9 16.6L47.3 16.1L46.8 15.5L46.5 14.8L46.4 14.1L46.4 13.4L46.5 12.7L46.8 12.1L47.1 11.5L47.6 11.1L48.1 10.7L48.7 10.5L49.3 10.5L49.8 10.5L50.3 10.7L50.8 10.9L51.2 11.2L51.5 11.6L51.7 12L51.8 12.5L51.8 12.9L51.7 13.3L51.6 13.7L51.4 14L51.1 14.2L50.8 14.4L50.5 14.5L50.2 14.5L49.9 14.5L49.7 14.4L49.5 14.2";

/** Strokes of the Ionic column, in drawing order (used by the preloader). */
export const COLUMN_STROKES: { d: string; w: number }[] = [
  { d: "M5 3.5H55", w: 2.6 },
  { d: "M9.5 7.6C20 8.8 40 8.8 50.5 7.6", w: 2 },
  { d: VOLUTE_LEFT, w: 1.9 },
  { d: VOLUTE_RIGHT, w: 1.9 },
  { d: "M15.5 12.6C24 14.2 36 14.2 44.5 12.6", w: 1.6 },
  { d: "M17.5 18.5H42.5", w: 1.6 },
  { d: "M18.8 19V42.5M23.6 19V42.5M28.4 19V42.5M33.2 19V42.5M38 19V42.5M41.6 19V42.5", w: 1.6 },
  { d: "M16 43.6H44", w: 2.2 },
];

/** The Ionic column that sits under the Mykono wordmark. */
export function ColumnMark({ strokeScale = 1, ...props }: MarkProps) {
  return (
    <svg viewBox="0 0 60 46" fill="none" aria-hidden="true" {...props}>
      <g stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
        {COLUMN_STROKES.map((s) => (
          <path key={s.d} d={s.d} strokeWidth={s.w * strokeScale} />
        ))}
      </g>
    </svg>
  );
}

export function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex flex-col items-center leading-none ${className}`}>
      <span className="font-serif text-[1.65em] font-medium tracking-[0.02em]">MYKONO</span>
      <ColumnMark className="mt-[0.1em] h-[1.05em] w-auto" />
    </span>
  );
}
