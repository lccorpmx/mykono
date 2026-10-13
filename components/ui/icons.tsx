type IconProps = React.SVGProps<SVGSVGElement>;

const line = {
  fill: "none",
  stroke: "currentColor",
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export function ChevronRight(props: IconProps) {
  return (
    <svg viewBox="0 0 16 16" aria-hidden="true" {...props}>
      <path d="M6 3.5 10.5 8 6 12.5" {...line} strokeWidth={1.6} />
    </svg>
  );
}

export function ChevronLeft(props: IconProps) {
  return (
    <svg viewBox="0 0 16 16" aria-hidden="true" {...props}>
      <path d="M10 3.5 5.5 8l4.5 4.5" {...line} strokeWidth={1.6} />
    </svg>
  );
}

export function SearchIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <circle cx="10.5" cy="10.5" r="6.5" {...line} strokeWidth={1.6} />
      <path d="m15.5 15.5 5 5" {...line} strokeWidth={1.6} />
    </svg>
  );
}

export function CartIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path d="M2.5 4h2.6l2.2 10.6a1.6 1.6 0 0 0 1.6 1.3h8.4a1.6 1.6 0 0 0 1.6-1.2L20.6 8H6.1" {...line} strokeWidth={1.6} />
      <circle cx="9.5" cy="19.6" r="1.3" fill="currentColor" />
      <circle cx="17" cy="19.6" r="1.3" fill="currentColor" />
    </svg>
  );
}

export function InstagramIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <rect x="3" y="3" width="18" height="18" rx="5.2" {...line} strokeWidth={1.6} />
      <circle cx="12" cy="12" r="4.2" {...line} strokeWidth={1.6} />
      <circle cx="17.4" cy="6.6" r="1.1" fill="currentColor" />
    </svg>
  );
}

export function ArrowUpRight(props: IconProps) {
  return (
    <svg viewBox="0 0 16 16" aria-hidden="true" {...props}>
      <path d="M4.5 11.5 11.5 4.5M5.5 4.5h6v6" {...line} strokeWidth={1.5} />
    </svg>
  );
}

/* Feature icons: every stroke can be drawn in with [data-draw]. */

export function LeafIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 48 48" aria-hidden="true" {...props}>
      <g {...line} strokeWidth={1.7}>
        <path data-draw pathLength={1} d="M22 38C12 36 7 26 10 13c11 0 19 7 18 18-.3 3-2.2 5.6-6 7Z" />
        <path data-draw pathLength={1} d="M21.5 37.5C19 30 16 24 11 16" />
        <path data-draw pathLength={1} d="M24.5 33c3-6 9-9 16-8.5-.6 8-6.5 13-14 12.5" />
        <path data-draw pathLength={1} d="M24 41c3-5 8-9.5 13-12.5" />
      </g>
    </svg>
  );
}

export function BowlIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 48 48" aria-hidden="true" {...props}>
      <g {...line} strokeWidth={1.7}>
        <path data-draw pathLength={1} d="M7 24h34c0 8.5-7.6 15-17 15S7 32.5 7 24Z" />
        <path data-draw pathLength={1} d="M18 39.5h12" />
        <path data-draw pathLength={1} d="M13 23.5c.5-5.5 4.6-9 9.4-9 3.8 0 6.7 2.1 8.2 5" />
        <path data-draw pathLength={1} d="M20 23c.8-3 3-4.8 5.7-4.8" />
        <path data-draw pathLength={1} d="M30 23 39 9.5" />
        <path data-draw pathLength={1} d="M37.2 8.2c1.6-1.6 3.8-1.4 4.6-.4.9 1.1.4 3.2-1.3 4.3" />
      </g>
    </svg>
  );
}

export function HeartIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 48 48" aria-hidden="true" {...props}>
      <path
        data-draw
        pathLength={1}
        d="M24 40S7 29.8 7 18.2C7 12.6 11.3 8.5 16.5 8.5c3.3 0 6 1.7 7.5 4.3 1.5-2.6 4.2-4.3 7.5-4.3C36.7 8.5 41 12.6 41 18.2 41 29.8 24 40 24 40Z"
        {...line}
        strokeWidth={1.7}
      />
    </svg>
  );
}

export function SunIcon(props: IconProps) {
  const rays = [0, 45, 90, 135, 180, 225, 270, 315];
  return (
    <svg viewBox="0 0 48 48" aria-hidden="true" {...props}>
      <g {...line} strokeWidth={1.7}>
        <circle data-draw pathLength={1} cx="24" cy="24" r="8" />
        {rays.map((a) => (
          <path key={a} data-draw pathLength={1} d="M24 8.5V4" transform={`rotate(${a} 24 24)`} />
        ))}
      </g>
    </svg>
  );
}
