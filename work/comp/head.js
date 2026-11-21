// Adila Gold — "Scam & Simpanan" edit. Deterministic frame renderer: window.render(t)
const FPS = 30, NFR = window.NFRAMES || 2090, FRAMEDIR = window.FRAMEDIR || '../bf/';
const W = window.WORDS || [];
const C = (x, a = 0, b = 1) => Math.max(a, Math.min(b, x));
const P = (t, s, d) => C((t - s) / d);
const eo = x => 1 - Math.pow(1 - x, 3);
const eio = x => x < .5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
const back = x => { const c1 = 1.9, c3 = c1 + 1; return 1 + c3 * Math.pow(x - 1, 3) + c1 * Math.pow(x - 1, 2); };
const lerp = (a, b, p) => a + (b - a) * p;
const $ = id => document.getElementById(id);
const fx = $('fx');
function mk(parent, html, css) { const d = document.createElement('div'); d.className = 'abs'; d.innerHTML = html; if (css) d.style.cssText += css; parent.appendChild(d); return d; }
function sc() { const d = document.createElement('div'); d.className = 'sc'; fx.appendChild(d); return d; }
// pop in: returns {o, tr} for an element appearing at s (and leaving at e)
function pop(t, s, e, { d = .38, from = .4, rot = 0, dy = 0, out = .22, ease = back } = {}) {
  const pi = P(t, s, d), po = e ? P(t, e - out, out) : 0;
  const k = ease(pi);
  const sc = lerp(from, 1, k) * (1 + .06 * po);
  return { o: C(pi * 3) * (1 - po), tr: `translateY(${lerp(dy, 0, eo(pi))}px) scale(${sc}) rotate(${lerp(rot, 0, eo(pi))}deg)` };
}
function ap(el, st) { el.style.opacity = st.o; el.style.transform = st.tr; }
function slam(t, s, e, rot = -10) { // rubber-stamp slam
  const p = P(t, s, .22), po = e ? P(t, e - .2, .2) : 0;
  const sc = lerp(2.6, 1, eo(p)) + (p >= 1 ? Math.sin(C((t - s - .22) / .25) * Math.PI) * -.05 : 0);
  return { o: C(p * 4) * (1 - po), tr: `scale(${sc}) rotate(${rot}deg)` };
}
const jit = (t, k = 1) => { const f = Math.floor(t * 8); const r = Math.sin(f * 91.7 + k * 13.1) * 43758.5; return (r - Math.floor(r)) * 2 - 1; };

// ---------------- Layouts (face at 490,800 in source) ----------------
const FX0 = 520, FY0 = 820;
const FULL = (z = 1, dy = 0, dx = 0) => ({ x: 0, y: 0, w: 1080, h: 1920, r: 0, s: z, fx: 540 + dx, fy: 820 + dy, ring: 0 });
const LOWER = (z = 1) => ({ x: 80, y: 700, w: 840, h: 770, r: 46, s: z, fx: 420, fy: 390, ring: .9 });
const SPLITR = (z = 1) => ({ x: 470, y: 390, w: 460, h: 1070, r: 40, s: z, fx: 230, fy: 450, ring: .9 });
const PIP = (x = 640, y = 290, d = 290) => ({ x, y, w: d, h: d, r: d / 2, s: .5, fx: d / 2, fy: d / 2 + 5, ring: 1 });
const CARDBR = () => ({ x: 540, y: 880, w: 380, h: 540, r: 34, s: .75, fx: 190, fy: 285, ring: .9 });
function mixL(a, b, p) { const o = {}; for (const k in a) o[k] = lerp(a[k], b[k], p); return o; }

// ---------------- Scenes ----------------
// each: s,e, L(t) layout, grade(t) -> css filter, tint, shade, tr: transition type, upd(t)
const S = [];
function scene(o) { o.root = sc(); S.push(o); if (o.build) o.build(o.root, o); return o; }
