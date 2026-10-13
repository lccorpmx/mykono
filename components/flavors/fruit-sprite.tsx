/**
 * SVG symbol sprite with every ingredient illustration.
 * Server Component: geometry is generated once on the server and referenced
 * everywhere else with <use href="#f-…" />.
 */

const r = (n: number) => Math.round(n * 10) / 10;

/** Deterministic PRNG so the art is identical on every build. */
function rng(seed: number) {
  let s = seed >>> 0;
  return () => (s = (Math.imul(s, 1664525) + 1013904223) >>> 0) / 4294967296;
}

const STRAWBERRY_SEEDS: [number, number][] = [
  [34, 37], [46, 35], [58, 35], [70, 38], [25, 47], [38, 46], [51, 45], [64, 46], [77, 48], [29, 57], [42, 56],
  [55, 56], [68, 57], [34, 67], [47, 66], [60, 66], [71, 64], [40, 76], [52, 76], [63, 74], [47, 85], [56, 84],
];

function strawberryStreaks() {
  return [-60, -40, -20, 0, 20, 40, 60, 150, 170, 190, 210].map((a) => {
    const rad = (a * Math.PI) / 180;
    const x1 = 50 + Math.sin(rad) * 6;
    const y1 = 56 - Math.cos(rad) * 10;
    const x2 = 50 + Math.sin(rad) * 24;
    const y2 = 56 - Math.cos(rad) * 26;
    return `M${r(x1)} ${r(y1)}L${r(x2)} ${r(y2)}`;
  });
}

function drupelets() {
  const out: [number, number][] = [];
  const R = 6.6;
  for (let row = 0; row < 7; row++) {
    const y = 24 + row * 10;
    const t = (y - 54) / 34;
    const half = 33 * Math.sqrt(Math.max(0, 1 - t * t)) * (row === 0 ? 0.8 : 1);
    const n = Math.max(2, Math.round((half * 2) / (R * 1.75)));
    for (let i = 0; i < n; i++) {
      const x = 50 - half + (i + 0.5) * ((half * 2) / n) + (row % 2 ? 1.6 : -1.6);
      out.push([r(x), y]);
    }
  }
  return out;
}

function crumbs(seed: number) {
  const rnd = rng(seed);
  const greens = ["#a9c94c", "#8db43a", "#c4db6f", "#739d2f", "#b7d15a"];
  return Array.from({ length: 26 }, () => {
    const cx = 16 + rnd() * 68;
    const cy = 34 + rnd() * 32;
    const s = 2.6 + rnd() * 3.6;
    const a = rnd() * 6.28;
    const pts = [0, 1, 2, 3, 4]
      .map((k) => {
        const aa = a + k * 1.256 + (rnd() - 0.5) * 0.6;
        const rr = s * (0.6 + rnd() * 0.5);
        return `${r(cx + Math.cos(aa) * rr)} ${r(cy + Math.sin(aa) * rr)}`;
      })
      .join(" ");
    const pick = rnd();
    const fill = pick < 0.12 ? "#86506a" : pick < 0.2 ? "#e2ecae" : greens[Math.floor(rnd() * greens.length)];
    return { pts, fill };
  });
}

function figSeeds() {
  const rnd = rng(11);
  return Array.from({ length: 46 }, () => {
    const a = rnd() * Math.PI * 2;
    const d = 5 + rnd() * 21;
    const x = r(50 + Math.cos(a) * d * 0.95);
    const y = r(62 + Math.sin(a) * d * 0.9);
    return { x, y, rot: r(a * 57.3 + 90), fill: rnd() < 0.5 ? "#ffe2a0" : "#f6c978" };
  });
}

const LEAF_GRADIENT = "url(#sb-l)";
const KERNEL = "url(#pk-k)";

export function FruitSprite() {
  return (
    <svg width="0" height="0" className="pointer-events-none absolute" aria-hidden="true" focusable="false">
      <defs>
        {/* shared */}
        <linearGradient id="sb-l" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#8fd05c" />
          <stop offset="1" stopColor="#3b8a31" />
        </linearGradient>
        <linearGradient id="pk-k" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#c9e070" />
          <stop offset=".5" stopColor="#93b83e" />
          <stop offset="1" stopColor="#5a8526" />
        </linearGradient>

        {/* Strawberry */}
        <radialGradient id="sb-b" cx=".36" cy=".34" r=".75">
          <stop offset="0" stopColor="#ff6f73" />
          <stop offset=".42" stopColor="#e8283b" />
          <stop offset=".8" stopColor="#b3142a" />
          <stop offset="1" stopColor="#860b1d" />
        </radialGradient>
        <symbol id="f-strawberry" viewBox="0 0 100 100">
          <path d="M50 25C67 23 85 31 85 49C85 67 68 86 52 93C50 94 48 94 46 92C31 84 15 67 15 49C15 32 33 23 50 25Z" fill="url(#sb-b)" />
          {STRAWBERRY_SEEDS.map(([x, y]) => (
            <g key={`${x}-${y}`} transform={`translate(${x} ${y}) rotate(${r((x - 50) * 0.9)})`}>
              <ellipse rx="2.6" ry="3.4" fill="#8f0b1d" opacity=".35" />
              <ellipse rx="1.3" ry="2.1" cy="-.3" fill="#ffe39a" />
            </g>
          ))}
          <ellipse cx="34" cy="44" rx="6" ry="11" transform="rotate(-28 34 44)" fill="#fff" opacity=".26" />
          <g fill={LEAF_GRADIENT}>
            <path d="M50 28C44 19 34 17 25 22C33 23 40 27 46 31Z" />
            <path d="M50 28C52 18 60 13 70 13C63 18 58 23 54 30Z" />
            <path d="M50 28C58 23 70 24 78 31C69 30 61 31 54 32Z" />
            <path d="M50 28C43 29 32 34 28 42C36 37 43 34 49 32Z" />
            <path d="M51 29C57 32 64 38 66 45C60 40 55 36 50 33Z" />
          </g>
          <path d="M50 27C50 19 52 12 57 6" fill="none" stroke="#4d8a2c" strokeWidth="3.2" strokeLinecap="round" />
        </symbol>

        {/* Strawberry, halved */}
        <radialGradient id="sh-f" cx=".5" cy=".5" r=".62">
          <stop offset="0" stopColor="#fff3f1" />
          <stop offset=".4" stopColor="#ffc6cb" />
          <stop offset=".78" stopColor="#ff7684" />
          <stop offset="1" stopColor="#f03a52" />
        </radialGradient>
        <linearGradient id="sh-o" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#f2414f" />
          <stop offset="1" stopColor="#a50f26" />
        </linearGradient>
        <symbol id="f-strawberry-half" viewBox="0 0 100 100">
          <path d="M50 22C68 20 86 30 86 50C86 68 68 87 51 94C49 95 47 94 45 93C30 86 14 68 14 50C14 30 32 20 50 22Z" fill="url(#sh-o)" />
          <path d="M50 28C64 27 79 35 79 51C79 66 64 82 50 88C36 82 21 66 21 51C21 35 36 27 50 28Z" fill="url(#sh-f)" />
          <g stroke="#fff" strokeOpacity=".45" strokeWidth="1.6" strokeLinecap="round">
            {strawberryStreaks().map((d) => (
              <path key={d} d={d} />
            ))}
          </g>
          <path d="M50 33C57 40 59 54 55 68C53 75 47 75 45 68C41 54 43 40 50 33Z" fill="#fff8f6" opacity=".9" />
          <g fill="#ffe39a">
            {[[22, 46], [19, 58], [26, 72], [78, 46], [81, 58], [74, 72], [38, 86], [62, 86]].map(([x, y]) => (
              <ellipse key={`${x}-${y}`} cx={x} cy={y} rx="1.1" ry="1.7" />
            ))}
          </g>
          <g fill={LEAF_GRADIENT}>
            <path d="M50 24C42 16 30 16 22 23C31 23 39 25 46 28Z" />
            <path d="M50 24C58 16 70 16 78 23C69 23 61 25 54 28Z" />
            <path d="M50 25C47 17 49 10 54 5C54 12 53 18 53 25Z" />
          </g>
        </symbol>

        {/* Mango cube */}
        <linearGradient id="mc-t" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#ffe07a" />
          <stop offset="1" stopColor="#ffbd2e" />
        </linearGradient>
        <linearGradient id="mc-l" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fbb02a" />
          <stop offset="1" stopColor="#ef8d12" />
        </linearGradient>
        <linearGradient id="mc-r" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ee9616" />
          <stop offset="1" stopColor="#d06c08" />
        </linearGradient>
        <symbol id="f-mango" viewBox="0 0 100 100">
          <g strokeLinejoin="round" strokeWidth="7">
            <path d="M50 52L18 34L18 70L50 88Z" fill="url(#mc-l)" stroke="url(#mc-l)" />
            <path d="M50 52L82 34L82 70L50 88Z" fill="url(#mc-r)" stroke="url(#mc-r)" />
            <path d="M50 16L82 34L50 52L18 34Z" fill="url(#mc-t)" stroke="url(#mc-t)" />
          </g>
          <g fill="none" stroke="#fff" strokeLinecap="round">
            <path d="M16 35L50 54L84 35" strokeOpacity=".55" strokeWidth="2" />
            <path d="M50 55V86" strokeOpacity=".35" strokeWidth="2" />
            <path d="M26 46L26 70M34 51L34 76M66 51V76M74 46V70" strokeOpacity=".14" strokeWidth="2" />
          </g>
          <ellipse cx="44" cy="30" rx="12" ry="5" transform="rotate(-25 44 30)" fill="#fff" opacity=".5" />
          <circle cx="62" cy="27" r="2" fill="#fff" opacity=".7" />
        </symbol>

        {/* Whole mango */}
        <radialGradient id="mw-b" cx=".34" cy=".3" r=".85">
          <stop offset="0" stopColor="#ffe27a" />
          <stop offset=".42" stopColor="#f9b131" />
          <stop offset=".78" stopColor="#ee7420" />
          <stop offset="1" stopColor="#c9421a" />
        </radialGradient>
        <linearGradient id="mw-g" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#7fb84a" stopOpacity=".95" />
          <stop offset=".42" stopColor="#9cc756" stopOpacity="0" />
        </linearGradient>
        <symbol id="f-mango-whole" viewBox="0 0 100 100">
          <path d="M32 18C48 7 72 12 84 30C95 47 90 72 72 86C55 99 30 95 18 78C7 62 13 31 32 18Z" fill="url(#mw-b)" />
          <path d="M32 18C48 7 72 12 84 30C95 47 90 72 72 86C55 99 30 95 18 78C7 62 13 31 32 18Z" fill="url(#mw-g)" />
          <path d="M70 84C58 92 38 92 26 80" fill="none" stroke="#a8321a" strokeOpacity=".25" strokeWidth="4" strokeLinecap="round" />
          <path d="M37 16C38 10 41 6 45 4" fill="none" stroke="#6b5a2e" strokeWidth="3" strokeLinecap="round" />
          <path d="M45 6C52 -1 66 0 72 7C63 10 53 10 45 6Z" fill={LEAF_GRADIENT} />
          <ellipse cx="38" cy="38" rx="8" ry="15" transform="rotate(-32 38 38)" fill="#fff" opacity=".3" />
          <circle cx="60" cy="30" r="2.2" fill="#fff" opacity=".55" />
        </symbol>

        {/* Blueberry */}
        <radialGradient id="bb-b" cx=".36" cy=".32" r=".78">
          <stop offset="0" stopColor="#8592da" />
          <stop offset=".32" stopColor="#4c57a8" />
          <stop offset=".72" stopColor="#2a2d6c" />
          <stop offset="1" stopColor="#16173b" />
        </radialGradient>
        <radialGradient id="bb-bloom" cx=".5" cy=".5" r=".5">
          <stop offset=".62" stopColor="#b9c2ee" stopOpacity="0" />
          <stop offset="1" stopColor="#b9c2ee" stopOpacity=".42" />
        </radialGradient>
        <symbol id="f-blueberry" viewBox="0 0 100 100">
          <circle cx="50" cy="52" r="37" fill="url(#bb-b)" />
          <circle cx="50" cy="52" r="37" fill="url(#bb-bloom)" />
          <g transform="translate(61 33)">
            <path d="M0-9.5L2.6-3.3L9.1-2.9L4.1 1.3L5.6 7.7L0 4.2L-5.6 7.7L-4.1 1.3L-9.1-2.9L-2.6-3.3Z" fill="#221c46" />
            <circle r="3.6" fill="#3b3472" />
            <circle r="1.4" cx="-.8" cy="-.8" fill="#6a63a8" />
          </g>
          <ellipse cx="36" cy="40" rx="8" ry="5.5" transform="rotate(-30 36 40)" fill="#fff" opacity=".32" />
        </symbol>

        {/* Raspberry & blackberry */}
        <radialGradient id="rb-d" cx=".38" cy=".32" r=".7">
          <stop offset="0" stopColor="#ff86a6" />
          <stop offset=".45" stopColor="#e02a5a" />
          <stop offset="1" stopColor="#9c0d38" />
        </radialGradient>
        <radialGradient id="bk-d" cx=".38" cy=".3" r=".72">
          <stop offset="0" stopColor="#9a6fbf" />
          <stop offset=".4" stopColor="#4a2066" />
          <stop offset="1" stopColor="#1a0827" />
        </radialGradient>
        {(["raspberry", "blackberry"] as const).map((kind) => (
          <symbol key={kind} id={`f-${kind}`} viewBox="0 0 100 100">
            <path
              d="M50 18C72 18 86 34 84 56C82 76 66 92 50 92C34 92 18 76 16 56C14 34 28 18 50 18Z"
              fill={kind === "raspberry" ? "#8c0c33" : "#1d0a2b"}
            />
            {drupelets().map(([x, y]) => (
              <g key={`${x}-${y}`}>
                <circle cx={x} cy={y} r="6.6" fill={kind === "raspberry" ? "url(#rb-d)" : "url(#bk-d)"} />
                <circle cx={r(x - 2)} cy={r(y - 2.2)} r="1.5" fill="#fff" opacity={kind === "raspberry" ? 0.55 : 0.7} />
              </g>
            ))}
            <g fill={LEAF_GRADIENT}>
              <path d="M50 19C44 12 36 12 30 16C37 17 43 19 48 22Z" />
              <path d="M50 19C56 12 64 12 70 16C63 17 57 19 52 22Z" />
            </g>
          </symbol>
        ))}

        {/* Pistachio */}
        <symbol id="f-pistachio" viewBox="0 0 100 100">
          <path d="M18 60C20 38 46 22 68 25C84 27 90 40 85 53C79 69 52 80 33 77C23 76 17 69 18 60Z" fill={KERNEL} />
          <path d="M60 28C74 27 86 35 85 48C80 56 70 52 64 46C60 40 55 34 60 28Z" fill="#7b3f59" opacity=".72" />
          <path d="M28 72C40 77 54 74 62 69C52 67 40 65 30 62Z" fill="#6c3a4e" opacity=".5" />
          <path d="M70 58C76 56 80 52 82 48" fill="none" stroke="#7b3f59" strokeOpacity=".5" strokeWidth="3" strokeLinecap="round" />
          <ellipse cx="40" cy="44" rx="13" ry="5" transform="rotate(-24 40 44)" fill="#fff" opacity=".32" />
        </symbol>
        <linearGradient id="ps-s" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#f4e6c6" />
          <stop offset=".6" stopColor="#dcc391" />
          <stop offset="1" stopColor="#b9975e" />
        </linearGradient>
        <symbol id="f-pistachio-shell" viewBox="0 0 100 100">
          <path d="M14 58C16 34 42 18 66 20C86 22 94 38 88 54C82 68 60 80 38 80C24 80 13 71 14 58Z" fill="url(#ps-s)" />
          <path d="M24 50C34 36 54 28 74 31C70 39 52 47 34 54C30 56 25 55 24 50Z" fill={KERNEL} />
          <path d="M56 32C64 30 72 30 74 31C70 37 64 41 58 43C56 40 54 35 56 32Z" fill="#7b3f59" opacity=".7" />
          <path d="M24 50C34 36 54 28 74 31" fill="none" stroke="#8c6b3a" strokeOpacity=".55" strokeWidth="2" />
          <path d="M22 66C34 70 54 68 70 60" fill="none" stroke="#a88650" strokeOpacity=".45" strokeWidth="1.6" strokeLinecap="round" />
          <ellipse cx="40" cy="64" rx="12" ry="4" transform="rotate(-12 40 64)" fill="#fff" opacity=".35" />
        </symbol>
        <symbol id="f-crumbs" viewBox="0 0 100 100">
          {crumbs(7).map(({ pts, fill }) => (
            <polygon key={pts} points={pts} fill={fill} />
          ))}
        </symbol>

        {/* Fig */}
        <linearGradient id="fg-s" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#7a3570" />
          <stop offset="1" stopColor="#3a1036" />
        </linearGradient>
        <radialGradient id="fg-f" cx=".5" cy=".6" r=".55">
          <stop offset="0" stopColor="#7c1430" />
          <stop offset=".35" stopColor="#c3304f" />
          <stop offset=".72" stopColor="#ec7d79" />
          <stop offset="1" stopColor="#f7c2a8" />
        </radialGradient>
        <symbol id="f-fig-half" viewBox="0 0 100 100">
          <path d="M50 9C56 9 58 15 58 20C74 26 88 44 88 62C88 80 72 93 50 93C28 93 12 80 12 62C12 44 26 26 42 20C42 15 44 9 50 9Z" fill="url(#fg-s)" />
          <path d="M50 15C54 15 55 20 55 24C69 30 82 46 82 62C82 77 68 88 50 88C32 88 18 77 18 62C18 46 31 30 45 24C45 20 46 15 50 15Z" fill="#f6e6d6" />
          <path d="M50 22C53 22 53 26 53 29C65 34 77 48 77 62C77 75 65 84 50 84C35 84 23 75 23 62C23 48 35 34 47 29C47 26 47 22 50 22Z" fill="url(#fg-f)" />
          {figSeeds().map((s) => (
            <ellipse key={`${s.x}-${s.y}`} cx={s.x} cy={s.y} rx=".9" ry="2" transform={`rotate(${s.rot} ${s.x} ${s.y})`} fill={s.fill} />
          ))}
          <path d="M50 52C54 56 55 64 50 72C45 64 46 56 50 52Z" fill="#6a0f28" opacity=".55" />
          <path d="M50 9C50 6 51 3 54 1" fill="none" stroke="#6b7f3a" strokeWidth="3" strokeLinecap="round" />
          <path d="M22 50C26 38 34 30 42 26" fill="none" stroke="#fff" strokeOpacity=".35" strokeWidth="2.4" strokeLinecap="round" />
        </symbol>
        <radialGradient id="fw-b" cx=".36" cy=".42" r=".7">
          <stop offset="0" stopColor="#a65d93" />
          <stop offset=".45" stopColor="#6e2b62" />
          <stop offset="1" stopColor="#36102f" />
        </radialGradient>
        <symbol id="f-fig" viewBox="0 0 100 100">
          <path d="M50 8C57 8 59 15 59 21C75 28 88 45 88 63C88 81 72 94 50 94C28 94 12 81 12 63C12 45 25 28 41 21C41 15 43 8 50 8Z" fill="url(#fw-b)" />
          <g fill="none" stroke="#e7b6d6" strokeOpacity=".16" strokeWidth="2" strokeLinecap="round">
            <path d="M30 40C24 52 24 72 34 86" />
            <path d="M42 30C36 48 36 70 42 90" />
            <path d="M58 30C64 48 64 70 58 90" />
            <path d="M70 40C76 52 76 72 66 86" />
          </g>
          <path d="M44 20C46 17 54 17 56 20C54 23 46 23 44 20Z" fill="#7d9a45" />
          <path d="M50 8C50 5 51 2 54 0" fill="none" stroke="#6b7f3a" strokeWidth="3.2" strokeLinecap="round" />
          <ellipse cx="34" cy="50" rx="6" ry="14" transform="rotate(18 34 50)" fill="#fff" opacity=".22" />
        </symbol>

        {/* Honey */}
        <radialGradient id="hn-d" cx=".42" cy=".6" r=".6">
          <stop offset="0" stopColor="#ffe7a0" />
          <stop offset=".45" stopColor="#f6b21c" />
          <stop offset="1" stopColor="#bf7406" />
        </radialGradient>
        <symbol id="f-honey" viewBox="0 0 100 100">
          <path d="M50 8C58 26 78 46 78 63C78 79 66 92 50 92C34 92 22 79 22 63C22 46 42 26 50 8Z" fill="url(#hn-d)" />
          <path d="M38 52C34 60 34 70 38 76" fill="none" stroke="#fff" strokeOpacity=".7" strokeWidth="4" strokeLinecap="round" />
          <circle cx="61" cy="72" r="3" fill="#fff" opacity=".45" />
        </symbol>

        {/* Walnut */}
        <radialGradient id="wn-b" cx=".4" cy=".35" r=".7">
          <stop offset="0" stopColor="#e3b077" />
          <stop offset=".55" stopColor="#b47a40" />
          <stop offset="1" stopColor="#6e4019" />
        </radialGradient>
        <symbol id="f-walnut" viewBox="0 0 100 100">
          <path d="M50 14C62 9 77 15 81 27C91 31 93 45 87 53C93 62 89 76 79 80C75 91 60 95 50 88C40 95 25 91 21 80C11 76 7 62 13 53C7 45 9 31 19 27C23 15 38 9 50 14Z" fill="url(#wn-b)" />
          <g fill="none" stroke="#5a3214" strokeLinecap="round" strokeOpacity=".7">
            <path d="M50 16C47 34 53 52 50 86" strokeWidth="2.6" />
            <path d="M16 53C28 49 36 56 46 53" strokeWidth="2" />
            <path d="M84 53C72 49 64 56 54 53" strokeWidth="2" />
            <path d="M26 34C32 30 38 34 42 30M58 30C62 34 68 30 74 34M26 72C32 68 38 72 42 68M58 68C62 72 68 68 74 72" strokeWidth="1.6" strokeOpacity=".45" />
          </g>
          <path d="M24 30C30 22 38 19 44 19" fill="none" stroke="#fff" strokeOpacity=".35" strokeWidth="2.4" strokeLinecap="round" />
        </symbol>

        {/* Mint */}
        <linearGradient id="mt-l" x1="0" y1="1" x2="1" y2="0">
          <stop offset="0" stopColor="#2f7d32" />
          <stop offset=".55" stopColor="#5fb24a" />
          <stop offset="1" stopColor="#9ad672" />
        </linearGradient>
        <symbol id="f-mint" viewBox="0 0 100 100">
          <path d="M12 76C20 42 48 18 88 12C84 46 62 76 24 86C18 87 13 83 12 76Z" fill="url(#mt-l)" />
          <g fill="none" stroke="#d9f5c4" strokeLinecap="round">
            <path d="M17 82C40 62 60 40 86 14" strokeOpacity=".55" strokeWidth="1.8" />
            <path
              d="M32 66C30 58 30 50 34 42M44 54C44 46 46 38 52 30M56 42C58 34 62 28 68 22M30 68C38 70 46 70 54 66M42 56C50 58 58 56 66 50M54 44C62 44 70 40 76 34"
              strokeOpacity=".35"
              strokeWidth="1.3"
            />
          </g>
        </symbol>

        {/* Greek yogurt dollop (for the "natural" ingredient list) */}
        <radialGradient id="yg-d" cx=".38" cy=".32" r=".8">
          <stop offset="0" stopColor="#ffffff" />
          <stop offset=".6" stopColor="#f1ebe0" />
          <stop offset="1" stopColor="#cfc3b1" />
        </radialGradient>
        <symbol id="f-yogurt" viewBox="0 0 100 100">
          <ellipse cx="50" cy="80" rx="36" ry="7" fill="#7a6248" opacity=".18" />
          <path d="M14 70C10 56 22 46 34 46C34 32 46 22 58 26C68 16 86 24 84 40C94 46 92 66 82 72C70 80 28 82 14 70Z" fill="url(#yg-d)" stroke="#bfb19c" strokeOpacity=".7" strokeWidth="1.5" />
          <path d="M28 58C36 52 48 52 56 56M46 40C52 36 60 36 66 40M62 62C68 58 76 58 80 62" fill="none" stroke="#b4a58e" strokeOpacity=".8" strokeWidth="2.2" strokeLinecap="round" />
          <ellipse cx="40" cy="50" rx="8" ry="4" fill="#fff" />
        </symbol>
      </defs>
    </svg>
  );
}

export type FruitId =
  | "strawberry"
  | "strawberry-half"
  | "mango"
  | "mango-whole"
  | "blueberry"
  | "raspberry"
  | "blackberry"
  | "pistachio"
  | "pistachio-shell"
  | "crumbs"
  | "fig-half"
  | "fig"
  | "honey"
  | "walnut"
  | "mint"
  | "yogurt";
