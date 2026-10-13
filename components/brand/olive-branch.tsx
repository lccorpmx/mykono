/** Olive sprig used for decoration and, blurred, as dappled leaf shadows. */
const LEAVES: [number, number, number, number][] = [
  // x, y (on the stem), rotation, length — alternating above/below, all reaching for the tip
  [18, 106, 12, 40],
  [40, 96, -68, 44],
  [62, 86, 16, 46],
  [84, 74, -62, 48],
  [106, 62, 10, 46],
  [132, 50, -70, 50],
  [150, 39, 6, 44],
  [168, 30, -64, 44],
  [186, 22, 0, 40],
  [200, 18, -52, 36],
  [212, 14, -22, 32],
];

const leaf = (len: number) =>
  `M0 0C${len * 0.2} -${len * 0.13} ${len * 0.68} -${len * 0.14} ${len} 0C${len * 0.68} ${len * 0.14} ${len * 0.2} ${len * 0.13} 0 0Z`;

export function OliveBranch({
  className = "",
  shadow = false,
}: {
  className?: string;
  shadow?: boolean;
}) {
  return (
    <svg viewBox="0 0 220 120" className={className} aria-hidden="true">
      {!shadow && (
        <defs>
          <linearGradient id="olive-leaf" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#5d7040" />
            <stop offset=".6" stopColor="#7f8f5c" />
            <stop offset="1" stopColor="#a3ad84" />
          </linearGradient>
        </defs>
      )}
      <path
        d="M0 112C40 98 92 74 132 50C160 33 186 22 214 14"
        fill="none"
        stroke={shadow ? "currentColor" : "#6b5a3e"}
        strokeWidth={2.2}
        strokeLinecap="round"
      />
      {LEAVES.map(([x, y, rot, len], i) => (
        <path
          key={i}
          d={leaf(len)}
          transform={`translate(${x} ${y}) rotate(${rot})`}
          fill={shadow ? "currentColor" : "url(#olive-leaf)"}
          opacity={shadow ? 1 : i % 3 === 1 ? 0.82 : 1}
        />
      ))}
    </svg>
  );
}
