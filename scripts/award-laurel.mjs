/**
 * Prints the laurel branch that frames AwardBadge, as a CSS url() data URI. The badge paints
 * it as a mask in the badge colour (src/components/AwardBadge.astro, --award-laurel).
 *
 *   node scripts/award-laurel.mjs        prints the URI; paste it into --award-laurel
 *
 * The branch: a stem arcing up the left side of a 50x100 box, with paired almond leaves that
 * shrink toward the tip. Change the numbers here to redraw it.
 */
const cx = 47;
const cy = 48;
const r = 33;
const pt = (deg) => {
  const a = (deg * Math.PI) / 180;
  return [cx + Math.cos(a) * r, cy + Math.sin(a) * r * 1.15];
};
const n = (v) => String(Number(v.toFixed(1)));
const leaf = (L, W) =>
  `M0 0C${n(W)} ${n(-L * 0.3)} ${n(W * 0.7)} ${n(-L * 0.8)} 0 ${n(-L)}C${n(-W * 0.7)} ${n(-L * 0.8)} ${n(-W)} ${n(-L * 0.3)} 0 0Z`;
const leaves = [];
const N = 7;
for (let i = 0; i < N; i++) {
  const t = i / (N - 1);
  const deg = 118 + t * 132;
  const [x, y] = pt(deg);
  const heading = deg + 90; // direction of travel along the arc
  const L = 13 - t * 4.5;
  const W = 4.6 - t * 1.4;
  const at = `translate(${n(x)} ${n(y)})`;
  leaves.push(`<path d='${leaf(L, W)}' transform='${at} rotate(${(heading - 38).toFixed(0)})'/>`);
  if (i < N - 1) leaves.push(`<path d='${leaf(L * 0.85, W * 0.9)}' transform='${at} rotate(${(heading + 34).toFixed(0)})'/>`);
}
const stem = Array.from({ length: 21 }, (_, i) => pt(112 + (i / 20) * 140))
  .map(([x, y], i) => `${i ? "L" : "M"}${n(x)} ${n(y)}`)
  .join("");
const svg = `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 50 100'><path d='${stem}' fill='none' stroke='#000' stroke-width='1.4' stroke-linecap='round'/>${leaves.join("")}</svg>`;
const uri = "data:image/svg+xml," + svg.replace(/%/g, "%25").replace(/#/g, "%23").replace(/</g, "%3C").replace(/>/g, "%3E");
console.log(uri);
