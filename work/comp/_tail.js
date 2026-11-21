// ---------------- Captions ----------------
const GROUPS = []; (function () { let g = [];
  for (let i = 0; i < W.length; i++) { g.push(W[i]); const gap = i + 1 < W.length ? W[i + 1].s - W[i].e : 9;
    const len = g.reduce((a, w) => a + w.w.length, 0);
    if (g.length >= 3 || len > 15 || gap > .3 || i == W.length - 1) { GROUPS.push(g); g = []; } } })();
const capEl = $('cap'); let lastCapKey = '';
const CAP_OFF = [[80.45, 99]];
function caps(t) {
  if (CAP_OFF.some(([a, b]) => t >= a && t < b)) { capEl.innerHTML = ''; lastCapKey = ''; return; }
  let g = GROUPS.find((g, i) => t >= g[0].s - .05 && t < (GROUPS[i + 1] ? Math.min(GROUPS[i + 1][0].s - .05, g[g.length - 1].e + .6) : g[g.length - 1].e + .6));
  if (!g) { capEl.innerHTML = ''; lastCapKey = ''; return; }
  const key = g[0].s; if (key !== lastCapKey) { capEl.innerHTML = g.map(w => `<span class="${w.hl ? 'k' : ''}">${w.w}</span>`).join(''); lastCapKey = key; }
  const sp = capEl.children; g.forEach((w, i) => { const on = t >= w.s - .03; const el = sp[i];
    el.style.opacity = on ? 1 : .0; const k = back(P(t, w.s - .03, .18)); el.style.transform = `scale(${lerp(.7, 1, k)}) translateY(${lerp(14, 0, eo(P(t, w.s - .03, .18)))}px)`;
    el.classList.toggle('on', t >= w.s - .03 && t < w.e + .05 && !w.hl); });
}

// ---------------- Base layer ----------------
const bw = $('bw'), bimg = $('bimg'), ring = $('bwRing'), tintEl = document.createElement('div');
tintEl.style.cssText = 'position:absolute;inset:0;pointer-events:none;mix-blend-mode:multiply;opacity:0'; $('stage').insertBefore(tintEl, $('vign'));
const bgEl = $('bg'), shade = $('topShade'), flash = $('flash');
const BGS = { def: 'radial-gradient(120% 70% at 50% 30%,#2a1d0b 0%,#120d06 55%,#070503 100%)', paper: 'radial-gradient(120% 70% at 50% 30%,#3a2a14 0%,#1d1409 60%,#0b0804 100%)', red: 'radial-gradient(120% 70% at 50% 35%,#3a0f0c 0%,#1a0806 60%,#080303 100%)' };
function layoutAt(t) {
  const i = S.findIndex(s => t >= s.s && t < s.e); const cur = S[Math.max(0, i)];
  let L = cur.L(t); const prev = S[i - 1]; const TD = .42;
  if (prev && t < cur.s + TD) { const p = eio(P(t, cur.s, TD)); L = mixL(prev.L(cur.s - .001), L, p); }
  return { L, cur, prev, i };
}
function applyBase(L) {
  bw.style.left = L.x + 'px'; bw.style.top = L.y + 'px'; bw.style.width = L.w + 'px'; bw.style.height = L.h + 'px'; bw.style.borderRadius = L.r + 'px';
  bimg.style.transform = bimg2.style.transform = `translate(${L.fx - FX0 * L.s}px,${L.fy - FY0 * L.s}px) scale(${L.s})`;
  ring.style.left = (L.x - 6) + 'px'; ring.style.top = (L.y - 6) + 'px'; ring.style.width = (L.w + 12) + 'px'; ring.style.height = (L.h + 12) + 'px'; ring.style.borderRadius = (L.r + 6) + 'px'; ring.style.opacity = L.ring;
}

// ---- v2 timeline: new output time -> old (v1) animation time; crossfade at cuts ----
const SEG2 = window.SEG2, SEG1 = window.SEG1, bimg2 = $('bimg2');
const CUTB = []; { let o = 0; SEG2.forEach((s, i) => { o += s[1] - s[0]; if (i < SEG2.length - 1) CUTB.push(o); }); }
const NEWEND = SEG2.reduce((a, s) => a + s[1] - s[0], 0);
function n2o(tn) { // output time -> SOURCE time (scenes are authored in source seconds)
  if (tn >= NEWEND) return SEG2[SEG2.length - 1][1] + (tn - NEWEND);
  let o = 0; for (const [a, b] of SEG2) { if (tn <= o + b - a) return a + tn - o; o += b - a; } return SEG2[SEG2.length - 1][1];
}
window.render = async function (tn) {
  const fr = Math.min(NFR, Math.max(1, Math.round(tn * FPS) + 1));
  const src = FRAMEDIR + String(fr).padStart(5, '0') + '.jpg';
  if (bimg.getAttribute('src') !== src) { bimg.src = src; try { await bimg.decode(); } catch (e) { } }
  let xf = 0; const ci = CUTB.findIndex(c => tn >= c - 1e-6 && tn < c + 4 / FPS);
  if (ci >= 0) { const k = Math.min(3, Math.floor((tn - CUTB[ci]) * FPS + 1e-6)); const s2 = `${window.TAILDIR||"../tails/"}c${ci}_${k + 1}.jpg`;
    if (bimg2.getAttribute('src') !== s2) { bimg2.src = s2; try { await bimg2.decode(); } catch (e) { } } xf = 1 - (k + 1) / 5; }
  bimg2.style.opacity = xf;
  const t = n2o(tn);
  const { L, cur, prev, i } = layoutAt(t);
  applyBase(L);
  // transitions
  const tp = t - cur.s; let blur = 0, fl = 0;
  if (cur.tr === 'zoom' && tp < .35) { blur = 14 * (1 - eo(tp / .35)); fl = .35 * (1 - tp / .35); }
  if (cur.tr === 'slide' && tp < .3) { blur = 6 * (1 - tp / .3); }
  if (cur.tr === 'fade' && tp < .5) { fl = 0; }
  // impact flashes
  for (const ft of FLASHES) if (t >= ft && t < ft + .2) fl = Math.max(fl, .45 * (1 - (t - ft) / .2));
  flash.style.opacity = fl;
  const grade = cur.grade || 'none';
  bimg.style.filter = bimg2.style.filter = (grade === 'none' ? '' : grade) + (blur > .2 ? ` blur(${blur}px)` : '');
  tintEl.style.background = cur.tint || 'transparent'; tintEl.style.opacity = cur.tint ? C(P(t, cur.s, .4)) : 0;
  const sh = cur.shadeF ? cur.shadeF(t) : (cur.shade || 0); shade.style.opacity = sh;
  bgEl.style.background = BGS[cur.bgStyle || 'def'];
  // scene visibility + updates (current, plus previous fading out during transition)
  S.forEach((s, k) => {
    let o = 0; if (k === i) o = C(P(t, s.s, .12)); else if (k === i - 1 && t < S[i].s + .2) o = 1 - P(t, S[i].s, .2);
    s.root.style.opacity = o; if (o > 0 && s.upd) s.upd(t, s);
  });
  caps(t);
  return true;
};
