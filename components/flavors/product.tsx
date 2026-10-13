import { COLUMN_STROKES } from "@/components/brand/logo";

/** Product artwork lives in a 400 × 540 box; every overlay is positioned in the same units. */
export const VB = { w: 400, h: 540 } as const;

/** Point where falling fruit meets the swirl — the colour bloom grows from here. */
export const IMPACT = { x: 205, y: 118 } as const;

const r = (n: number) => Math.round(n * 10) / 10;

type Tier = { cx: number; y: number; w: number; h: number; sag: number; tilt: number };

const BELLY = 1.3;

const TIERS: Tier[] = [
  { cx: 200, y: 306, w: 126, h: 60, sag: 18, tilt: 14 },
  { cx: 201, y: 254, w: 104, h: 56, sag: 16, tilt: 14 },
  { cx: 199, y: 205, w: 82, h: 52, sag: 14, tilt: 13 },
  { cx: 201, y: 160, w: 60, h: 46, sag: 11, tilt: 12 },
  { cx: 199, y: 121, w: 39, h: 40, sag: 8, tilt: 10 },
];

/** A puffy band of soft serve, seen slightly from above. */
function band({ cx, y, w, h, sag, tilt }: Tier) {
  const lx = cx - w;
  const rx = cx + w;
  const ly = y + tilt / 2;
  const ry = y - tilt / 2;
  const hh = h / 2;
  return [
    `M${r(lx)} ${r(ly - hh)}`,
    `C${r(cx - w * 0.5)} ${r(ly - hh + sag)} ${r(cx + w * 0.5)} ${r(ry - hh + sag)} ${r(rx)} ${r(ry - hh)}`,
    `C${r(rx + hh * 1.1)} ${r(ry - hh)} ${r(rx + hh * 1.1)} ${r(ry + hh)} ${r(rx)} ${r(ry + hh)}`,
    `C${r(cx + w * 0.5)} ${r(ry + hh + sag * BELLY)} ${r(cx - w * 0.5)} ${r(ly + hh + sag * BELLY)} ${r(lx)} ${r(ly + hh)}`,
    `C${r(lx - hh * 1.1)} ${r(ly + hh)} ${r(lx - hh * 1.1)} ${r(ly - hh)} ${r(lx)} ${r(ly - hh)}Z`,
  ].join("");
}

/** A line that follows a band's curvature (piping ridges and highlights). */
function ridge({ cx, y, w, h, sag, tilt }: Tier, t: number, span: number) {
  const lx = cx - w * span;
  const rx = cx + w * span;
  const ly = y + tilt / 2;
  const ry = y - tilt / 2;
  const off = (t - 0.5) * h;
  const s = sag * (1 + (BELLY - 1) * t);
  return `M${r(lx)} ${r(ly + off)}C${r(cx - w * 0.5)} ${r(ly + off + s)} ${r(cx + w * 0.5)} ${r(ry + off + s)} ${r(rx)} ${r(ry + off)}`;
}

const TIP =
  "M164 124C158 100 172 80 188 68C200 59 207 50 209 34C219 44 224 58 220 72C236 86 242 106 234 124C222 136 176 138 164 124Z";
const TIP_HIGHLIGHT = "M178 118C174 98 186 82 200 72C206 66 209 58 210 48";

const BANDS = TIERS.map((t) => ({
  d: band(t),
  ridges: [ridge(t, 0.64, 0.86), ridge(t, 0.82, 0.86)],
  shine: ridge(t, 0.34, 0.7),
  dash: `${r(t.w * 0.8)} 999`,
  dashOffset: r(-t.w * 0.08),
}));

/**
 * Sauce poured over the top: one pass across the front of each band, tilted like
 * a spiral and ending at the silhouette so it reads as wrapping round the back.
 */
function sauceArc({ cx, y, w, h, sag, tilt }: Tier, t: number, reach: number, lean: number) {
  const off = (t - 0.5) * h;
  const s = sag * (1 + (BELLY - 1) * t);
  // Run into the rounded ends so each pass disappears round the side.
  const edge = w + (h / 2) * reach;
  const p0 = [cx + edge, y - tilt / 2 + off - lean];
  const p1 = [cx + w * 0.45, y - tilt / 2 + off + s * 1.1];
  const p2 = [cx - w * 0.55, y + tilt / 2 + off + s * 1.1];
  const p3 = [cx - edge, y + tilt / 2 + off + lean];
  const mid = [(p0[0] + 3 * p1[0] + 3 * p2[0] + p3[0]) / 8, (p0[1] + 3 * p1[1] + 3 * p2[1] + p3[1]) / 8];
  return {
    d: `M${r(p0[0])} ${r(p0[1])}C${r(p1[0])} ${r(p1[1])} ${r(p2[0])} ${r(p2[1])} ${r(p3[0])} ${r(p3[1])}`,
    mid,
  };
}

const ARCS = [
  sauceArc(TIERS[4], 0.52, 0.72, 9),
  sauceArc(TIERS[3], 0.55, 0.72, 11),
  sauceArc(TIERS[2], 0.57, 0.74, 12),
  sauceArc(TIERS[1], 0.58, 0.74, 13),
  sauceArc(TIERS[0], 0.56, 0.76, 13),
];

export const SAUCE_ARCS = ["M171 92C184 108 216 106 233 86", ...ARCS.map((a) => a.d)];
/** Slightly uneven pour. */
export const SAUCE_WIDTHS = [5.5, 6.5, 6, 7, 6.5, 7];

/** Drips hang from the lowest point of a few passes. */
export const DRIPS = [
  { from: ARCS[1].mid, dx: -14, len: 15 },
  { from: ARCS[3].mid, dx: 22, len: 22 },
  { from: ARCS[4].mid, dx: -30, len: 16 },
  { from: ARCS[2].mid, dx: 18, len: 12 },
].map(({ from: [x, y], dx, len }) => {
  const sx = x + dx;
  const sy = y - 1;
  return `M${r(sx)} ${r(sy)}C${r(sx + 1)} ${r(sy + len * 0.45)} ${r(sx - 1)} ${r(sy + len * 0.75)} ${r(sx)} ${r(sy + len)}`;
});

function Swirl({ id }: { id: "a" | "b" }) {
  return (
    <>
      {BANDS.map((b, i) => (
        <g key={i}>
          <path d={b.d} transform="translate(0 7)" fill="#4a3020" opacity=".2" filter="url(#pd-soft)" />
          <path d={b.d} />
          <path d={b.d} fill="url(#pd-sv)" />
          <path d={b.d} fill="url(#pd-sh)" />
          <g fill="none" stroke="#4a3020" strokeOpacity=".08" strokeWidth="1.5" strokeLinecap="round">
            {b.ridges.map((d) => (
              <path key={d} d={d} />
            ))}
          </g>
          <path
            d={b.shine}
            fill="none"
            stroke="#fff"
            strokeOpacity=".6"
            strokeWidth="5"
            strokeLinecap="round"
            filter="url(#pd-glow)"
            strokeDasharray={b.dash}
            strokeDashoffset={b.dashOffset}
          />
        </g>
      ))}
      <path d={TIP} transform="translate(0 6)" fill="#4a3020" opacity=".2" filter="url(#pd-soft)" />
      <path d={TIP} data-tip={id} />
      <path d={TIP} fill="url(#pd-sv)" />
      <path d={TIP} fill="url(#pd-sh)" />
      <path d={TIP_HIGHLIGHT} fill="none" stroke="#fff" strokeOpacity=".6" strokeWidth="5" strokeLinecap="round" filter="url(#pd-glow)" />
    </>
  );
}

/** Floor shadow, inner wall, the swirl (base + colour bloom) and the sauce. */
export function ProductBack({ yogurt }: { yogurt: string }) {
  return (
    <svg viewBox={`0 0 ${VB.w} ${VB.h}`} className="absolute inset-0 size-full overflow-visible" aria-hidden="true">
      <defs>
        <linearGradient id="pd-sv" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fff" stopOpacity="0" />
          <stop offset=".3" stopColor="#fff" stopOpacity=".55" />
          <stop offset=".52" stopColor="#fff" stopOpacity=".1" />
          <stop offset=".8" stopColor="#4a3020" stopOpacity=".05" />
          <stop offset="1" stopColor="#4a3020" stopOpacity=".24" />
        </linearGradient>
        <linearGradient id="pd-sh" x1="0" x2="1">
          <stop offset="0" stopColor="#fff" stopOpacity=".28" />
          <stop offset=".36" stopColor="#fff" stopOpacity="0" />
          <stop offset=".74" stopColor="#4a3020" stopOpacity=".05" />
          <stop offset="1" stopColor="#4a3020" stopOpacity=".22" />
        </linearGradient>
        <radialGradient id="pd-floor" cx=".5" cy=".5" r=".5">
          <stop offset="0" stopColor="#2b1d10" stopOpacity=".3" />
          <stop offset="1" stopColor="#2b1d10" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="pd-bloom-grad" cx=".5" cy=".5" r=".5">
          <stop offset=".78" stopColor="#fff" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </radialGradient>
        <filter id="pd-soft" x="-20%" y="-30%" width="140%" height="180%">
          <feGaussianBlur stdDeviation="4.5" />
        </filter>
        <filter id="pd-glow" x="-20%" y="-50%" width="140%" height="200%">
          <feGaussianBlur stdDeviation="2.2" />
        </filter>
        <mask id="pd-bloom" maskUnits="userSpaceOnUse" x="-40" y="-80" width="480" height="560">
          <circle data-bloom cx={IMPACT.x} cy={IMPACT.y} r="0" fill="url(#pd-bloom-grad)" />
        </mask>
      </defs>

      <ellipse cx="200" cy="508" rx="140" ry="14" fill="url(#pd-floor)" />
      <path d="M42 330A158 24 0 0 1 358 330Z" fill="#ddd7cd" />

      <g data-swirl>
        <g data-swirl-base fill={yogurt}>
          <Swirl id="a" />
        </g>
        <g data-swirl-bloom fill={yogurt} mask="url(#pd-bloom)">
          <Swirl id="b" />
        </g>
      </g>

      <g data-sauce fill="none" strokeLinecap="round" strokeLinejoin="round" visibility="hidden">
        {SAUCE_ARCS.map((d, i) => (
          <g key={d} data-arc={i}>
            <path data-stroke d={d} pathLength={1} stroke="currentColor" strokeWidth={SAUCE_WIDTHS[i]} strokeDasharray="1" strokeDashoffset="1" />
            <path
              data-stroke
              d={d}
              pathLength={1}
              stroke="#fff"
              strokeOpacity=".45"
              strokeWidth="1.8"
              strokeDasharray="1"
              strokeDashoffset="1"
              transform="translate(-1 -2)"
            />
          </g>
        ))}
        {DRIPS.map((d) => (
          <path key={d} data-drip d={d} pathLength={1} stroke="currentColor" strokeWidth="6.5" strokeDasharray="1" strokeDashoffset="1" />
        ))}
      </g>
    </svg>
  );
}

/** Paper cup body, rolled lip and the printed logo — sits in front of the swirl. */
export function ProductFront() {
  const body = "M42 330A158 24 0 0 0 358 330L326 482C322 496 282 504 200 504C118 504 78 496 74 482Z";
  return (
    <svg viewBox={`0 0 ${VB.w} ${VB.h}`} className="absolute inset-0 size-full overflow-visible" aria-hidden="true">
      <defs>
        <linearGradient id="pd-cup" x1="0" x2="1">
          <stop offset="0" stopColor="#c9d1db" />
          <stop offset=".16" stopColor="#eceff3" />
          <stop offset=".4" stopColor="#ffffff" />
          <stop offset=".68" stopColor="#f2f4f7" />
          <stop offset="1" stopColor="#bcc5d1" />
        </linearGradient>
        <linearGradient id="pd-cupv" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#3a2a1a" stopOpacity=".18" />
          <stop offset=".2" stopColor="#3a2a1a" stopOpacity="0" />
          <stop offset=".86" stopColor="#3a2a1a" stopOpacity="0" />
          <stop offset="1" stopColor="#3a2a1a" stopOpacity=".12" />
        </linearGradient>
        <linearGradient id="pd-lip" x1="0" x2="1">
          <stop offset="0" stopColor="#d5dbe3" />
          <stop offset=".38" stopColor="#ffffff" />
          <stop offset=".7" stopColor="#f5f7f9" />
          <stop offset="1" stopColor="#cdd4dd" />
        </linearGradient>
      </defs>
      <path d={body} fill="url(#pd-cup)" />
      <path d={body} fill="url(#pd-cupv)" />
      <path d="M42 330A158 24 0 0 0 358 330" fill="none" stroke="url(#pd-lip)" strokeWidth="11" strokeLinecap="round" />
      <path d="M50 334A152 22 0 0 0 350 334" fill="none" stroke="#fff" strokeOpacity=".9" strokeWidth="2" />
      <text
        x="200"
        y="414"
        textAnchor="middle"
        fontFamily="var(--font-display), serif"
        fontWeight="500"
        fontSize="40"
        letterSpacing=".5"
        fill="#013f7d"
      >
        MYKONO
      </text>
      <g transform="translate(172 421) scale(.94)" fill="none" stroke="#013f7d" strokeLinecap="round" strokeLinejoin="round">
        {COLUMN_STROKES.map((s) => (
          <path key={s.d} d={s.d} strokeWidth={s.w} />
        ))}
      </g>
    </svg>
  );
}
