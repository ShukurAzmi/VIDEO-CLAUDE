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
// Adila Gold — "Buy Now vs Simpan RM100" (Yaya edit). Times = output seconds.
window.FLASH = [3.61, 6.85, 15.89, 24.46, 38.03, 46.9, 54.88, 56.05];
window.CAP_OFF = [[55.75, 57.2], [78.5, 99]];

const GOLDBAR = (w = 260) => `<svg width="${w}" height="${w * 150 / 260}" viewBox="0 0 260 150"><defs><linearGradient id="gb${w}" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stop-color="#FFF1B8"/><stop offset=".45" stop-color="#F5C542"/><stop offset="1" stop-color="#A87410"/></linearGradient><linearGradient id="gt${w}" x1="0" x2="1"><stop offset="0" stop-color="#FFE48A"/><stop offset="1" stop-color="#E0A82E"/></linearGradient></defs><path d="M40 40 L220 40 L250 140 L10 140 Z" fill="url(#gb${w})" stroke="#8a5e08" stroke-width="4"/><path d="M40 40 L220 40 L205 10 L55 10 Z" fill="url(#gt${w})" stroke="#8a5e08" stroke-width="4"/><text x="130" y="105" text-anchor="middle" font-family="Mont" font-weight="900" font-size="25" fill="#7a5200" letter-spacing="2">PUBLIC GOLD</text><text x="130" y="128" text-anchor="middle" font-family="Mont" font-weight="700" font-size="16" fill="#7a5200">999.9</text></svg>`;
const RMNOTE = (v = 'RM100', w = 220) => `<svg width="${w}" height="${w * .5}" viewBox="0 0 220 110"><rect x="3" y="3" width="214" height="104" rx="10" fill="#c9a0d8" stroke="#6b3d80" stroke-width="5"/><circle cx="60" cy="55" r="28" fill="none" stroke="#6b3d80" stroke-width="5"/><text x="140" y="68" text-anchor="middle" font-family="Mont" font-weight="900" font-size="34" fill="#4a2060">${v}</text></svg>`;

// 1. HOOK: PELIK KAN? + coin jar that won't fill ---------------------------------
scene({
  s: 0, e: 4.07, tr: 'cut', shade: 1,
  L: t => FULL(1.22 + .05 * P(t, 0, 4) + .08 * Math.exp(-Math.max(0, t - 3.61) * 5) * (t >= 3.61), 180),
  build(r, o) {
    o.a = mk(r, `<div style="font-family:Marker;font-size:108px;color:#F5C542;text-shadow:0 8px 0 #000,0 0 30px rgba(0,0,0,.6);white-space:nowrap">PELIK KAN? 🤔</div>`, 'left:60px;right:140px;top:262px;text-align:center');
    o.b = mk(r, `<div class="glass" style="padding:14px 30px;display:flex;align-items:center;gap:18px;white-space:nowrap"><span style="font-weight:800;font-size:44px;color:#fff">SIMPAN</span><span style="font-weight:900;font-size:66px;color:#F5C542">RM<span id="cnt">0</span></span></div>`, 'left:60px;right:140px;top:440px;display:flex;justify-content:center');
    o.c = mk(r, `<div class="stamp" style="font-size:104px">SUSAH!</div>`, 'left:60px;right:140px;top:580px;display:flex;justify-content:center');
  },
  upd(t, o) {
    ap(o.a, pop(t, 0.02, 0, { from: .3, rot: -8 }));
    ap(o.b, pop(t, 1.55, 0, { from: .6, dy: 30 }));
    const v = t < 1.6 ? 0 : t < 2.9 ? Math.round(100 * eo(P(t, 1.6, 1))) : t < 3.6 ? 100 : Math.max(0, Math.round(100 - 100 * eo(P(t, 3.6, .3))));
    document.getElementById('cnt').textContent = v;
    const s = slam(t, 3.61, 0, -7); ap(o.c, s);
  }
});

// 2. PHONE SHOP + BUY NOW --------------------------------------------------------
scene({
  s: 4.07, e: 7.62, tr: 'slide', bgShow: 1,
  L: t => SPLITR(1.0 + .05 * P(t, 4.07, 3.5)),
  build(r, o) {
    o.ph = mk(r, `<div class="phone" style="position:relative"><div class="notch"></div><div class="scr" style="background:#f4f4f4">
      <div style="background:linear-gradient(135deg,#ff7a45,#ee4d2d);height:170px;padding:70px 24px 0;color:#fff;font-weight:900;font-size:34px">🛒 Kedai Online</div>
      <div style="margin:22px;border-radius:20px;background:#fff;box-shadow:0 6px 16px rgba(0,0,0,.1);padding:20px;text-align:center">
        <div style="font-size:120px;line-height:1.1">👜</div>
        <div style="font-weight:800;font-size:26px;color:#222;margin-top:6px">Beg Tangan Viral</div>
        <div style="display:flex;justify-content:center;align-items:baseline;gap:12px;margin-top:8px"><span style="font-size:22px;color:#999;text-decoration:line-through">RM129</span><span style="font-weight:900;font-size:40px;color:#ee4d2d">RM39</span></div>
        <div style="display:inline-block;margin-top:8px;padding:6px 14px;border-radius:8px;background:#ffe3d9;color:#ee4d2d;font-weight:800;font-size:20px">⚡ FLASH SALE −70%</div>
      </div>
      <div id="bn" style="position:absolute;left:22px;right:22px;bottom:70px;padding:24px;border-radius:18px;background:#ee4d2d;color:#fff;text-align:center;font-weight:900;font-size:40px;letter-spacing:2px">BUY NOW</div>
      <div id="ok" style="position:absolute;left:22px;right:22px;bottom:70px;padding:24px;border-radius:18px;background:#1f8a3b;color:#fff;text-align:center;font-weight:900;font-size:36px;opacity:0">✓ DAH BELI!</div>
      </div></div>`, 'left:50px;top:400px;transform-origin:50% 100%');
    o.hand = mk(r, `<div style="font-size:96px;filter:drop-shadow(0 6px 10px rgba(0,0,0,.5))">👆</div>`, 'left:200px;top:1100px');
    o.pill = mk(r, `<div class="glass" style="padding:14px 28px;color:#fff;font-weight:800;font-size:40px;white-space:nowrap">TIBA-TIBA… <span class="gold">DAH BUY NOW</span> 😅</div>`, 'left:60px;right:140px;top:280px;display:flex;justify-content:center');
  },
  upd(t, o) {
    const p = eo(P(t, 4.07, .55)); o.ph.style.opacity = C(p * 2); o.ph.style.transform = `translateY(${lerp(900, 0, p)}px) rotate(${lerp(-12, -3, p) + Math.sin(t * 1.3) * .8}deg)`;
    ap(o.pill, pop(t, 5.87, 0, { from: .5 }));
    const tap = P(t, 6.3, .5); o.hand.style.opacity = tap > 0 ? 1 : 0;
    o.hand.style.transform = `translate(${lerp(140, 0, eo(tap))}px,${lerp(220, 0, eo(tap))}px) scale(${t > 6.85 && t < 7.0 ? .82 : 1})`;
    const bn = document.getElementById('bn'); bn.style.transform = `scale(${t > 6.85 && t < 7.0 ? .94 : 1 + .03 * Math.sin(t * 9)})`;
    document.getElementById('ok').style.opacity = t > 7.0 ? 1 : 0;
  }
});

// 3. NIGHT SCROLL ---------------------------------------------------------------
scene({
  s: 7.62, e: 10.43, tr: 'zoom', tint: 'rgba(40,70,160,.28)', bgStyle: 'night', shade: 1,
  L: t => FULL(1.1 + .06 * P(t, 7.62, 2.8), 150),
  grade: 'saturate(.8) brightness(.9)',
  build(r, o) {
    o.clk = mk(r, `<div style="display:flex;align-items:center;gap:22px;padding:14px 30px;border-radius:22px;background:rgba(6,10,24,.75);border:2px solid rgba(140,170,255,.5)"><span style="font-size:60px">🌙</span><span style="font-family:Mont;font-weight:900;font-size:76px;color:#cfe0ff;letter-spacing:2px" id="clk">11:47</span><span style="font-weight:800;font-size:34px;color:#8fa6e8">PM</span></div>`, 'left:60px;right:140px;top:278px;display:flex;justify-content:center');
    o.sc = mk(r, `<div style="font-family:Marker;font-size:72px;color:#fff;text-shadow:0 5px 0 #000;white-space:nowrap">scroll… scroll… <span style="display:inline-block" id="sa">⬆️</span></div>`, 'left:60px;right:140px;top:440px;text-align:center');
  },
  upd(t, o) {
    ap(o.clk, pop(t, 8.0, 0, { from: .6 }));
    const m = 47 + Math.floor(P(t, 8.0, 2.4) * 12); document.getElementById('clk').textContent = '11:' + String(m).padStart(2, '0');
    ap(o.sc, pop(t, 9.4, 0, { from: .6, dy: 30 }));
    document.getElementById('sa').style.transform = `translateY(${-((t * 3) % 1) * 30}px)`;
  }
});

// 4. PRICE TAGS WALL --------------------------------------------------------------
scene({
  s: 10.43, e: 14.72, tr: 'slide', bgShow: 1, bgStyle: 'red',
  L: t => LOWER(1.0 + .04 * P(t, 10.43, 4)),
  build(r, o) {
    const tag = (txt, bg, col, sz) => `<div style="position:relative;padding:18px 36px 18px 56px;background:${bg};color:${col};font-weight:900;font-size:${sz}px;border-radius:12px 40px 40px 12px;box-shadow:0 12px 26px rgba(0,0,0,.45);white-space:nowrap"><i style="position:absolute;left:18px;top:50%;margin-top:-10px;width:20px;height:20px;border-radius:50%;background:rgba(0,0,0,.35)"></i>${txt}</div>`;
    o.t = [
      mk(r, tag('🔥 BARANG LALU', '#fff', '#222', 48), 'left:80px;top:290px;transform-origin:0 50%'),
      mk(r, tag('HARGA MURAH!', '#F5C542', '#1a1205', 58), 'left:300px;top:410px;transform-origin:0 50%'),
      mk(r, tag('DISKAUN −70%', '#E53935', '#fff', 62), 'left:90px;top:540px;transform-origin:0 50%'),
    ];
    o.rot = [-4, 3, -2];
  },
  upd(t, o) {
    [11.0, 12.35, 13.85].forEach((s, i) => { const st = pop(t, s, 0, { from: 1.7, ease: eo, d: .22 }); st.tr += ` rotate(${o.rot[i] + Math.sin(t * 2 + i) * 1.2}deg)`; ap(o.t[i], st); });
  }
});

// 5. STOPWATCH < 1 MINIT ------------------------------------------------------------
scene({
  s: 14.72, e: 16.65, tr: 'zoom', bgShow: 1,
  L: t => PIP(640, 300, 280),
  build(r, o) {
    o.sw = mk(r, `<svg width="420" height="470" viewBox="0 0 420 470"><rect x="180" y="0" width="60" height="40" rx="8" fill="#D9A93A"/><circle cx="210" cy="260" r="190" fill="#120d06" stroke="#F5C542" stroke-width="16"/>
      <circle cx="210" cy="260" r="160" fill="none" stroke="#E53935" stroke-width="22" pathLength="1" stroke-dasharray="1" id="swa" transform="rotate(-90 210 260)"/>
      <line x1="210" y1="260" x2="210" y2="120" stroke="#fff" stroke-width="10" stroke-linecap="round" id="swh"/><circle cx="210" cy="260" r="14" fill="#F5C542"/>
      <text x="210" y="350" text-anchor="middle" font-family="Mont" font-weight="900" font-size="54" fill="#fff" id="swt">0:00</text></svg>`, 'left:90px;top:300px;transform-origin:50% 50%');
    o.lbl = mk(r, `<div class="hl" style="font-size:74px;color:#fff;white-space:nowrap">TAK SAMPAI <span class="gold">SEMINIT</span></div>`, 'left:60px;right:140px;top:830px;text-align:center');
    o.bn = mk(r, `<div style="padding:22px 50px;border-radius:999px;background:#E53935;color:#fff;font-weight:900;font-size:54px;box-shadow:0 14px 30px rgba(0,0,0,.4);white-space:nowrap">✓ BUY NOW</div>`, 'left:60px;right:140px;top:960px;display:flex;justify-content:center');
  },
  upd(t, o) {
    ap(o.sw, pop(t, 14.75, 0, { from: .5 }));
    const p = P(t, 14.8, 1.4), sec = Math.round(p * 47);
    document.getElementById('swa').setAttribute('stroke-dashoffset', 1 - p * 47 / 60);
    const a = p * 47 / 60 * 2 * Math.PI; document.getElementById('swh').setAttribute('x2', 210 + 140 * Math.sin(a)); document.getElementById('swh').setAttribute('y2', 260 - 140 * Math.cos(a));
    document.getElementById('swt').textContent = '0:' + String(sec).padStart(2, '0');
    ap(o.lbl, pop(t, 15.15, 0, { from: .7, dy: 20 }));
    ap(o.bn, slam(t, 15.89, 0, -4));
  }
});

// 6. STICKY NOTE: SIMPAN RM100 untuk diri sendiri -----------------------------------
scene({
  s: 16.65, e: 20.64, tr: 'slide', bgShow: 1, bgStyle: 'paper',
  L: t => CARDBR(),
  build(r, o) {
    o.n = mk(r, `<div style="position:relative;width:600px;padding:44px 40px 50px;background:#FFE27A;color:#2a1a05;box-shadow:0 20px 40px rgba(0,0,0,.5);border-radius:4px">
      <div style="position:absolute;left:50%;top:-18px;width:140px;height:38px;margin-left:-70px;background:rgba(255,255,255,.55);transform:rotate(3deg)"></div>
      <div style="font-family:Marker;font-size:46px">To-do bulan ni:</div>
      <div style="display:flex;align-items:center;gap:22px;margin-top:22px"><div style="width:64px;height:64px;border:6px solid #2a1a05;border-radius:10px;position:relative"><span id="chk" style="position:absolute;left:-6px;top:-30px;font-size:84px;color:#E53935;opacity:0">?</span></div>
      <div style="font-weight:900;font-size:62px;line-height:1">SIMPAN <span style="color:#a0280c">RM100</span></div></div>
      <div style="font-family:Play;font-style:italic;font-weight:700;font-size:44px;margin:18px 0 0 86px" id="ds">untuk diri sendiri</div></div>`, 'left:70px;top:330px;transform-origin:50% 0');
  },
  upd(t, o) {
    const s = pop(t, 16.7, 0, { from: .4, rot: -10, ease: eo, d: .4 }); s.tr += ` rotate(${-3 + Math.sin(t * 1.5) * .8}deg)`; ap(o.n, s);
    document.getElementById('ds').style.opacity = C(P(t, 19.7, .3));
    document.getElementById('chk').style.opacity = C(P(t, 20.1, .2));
  }
});

// 7. CALENDAR: NANTILAH… BULAN DEPAN -------------------------------------------------
scene({
  s: 20.64, e: 23.52, tr: 'zoom', tint: 'rgba(90,90,110,.25)',
  L: t => FULL(1.06 + .05 * P(t, 20.64, 2.9), 160),
  grade: 'saturate(.7)', shade: 1,
  build(r, o) {
    o.q = mk(r, `<div style="font-family:Play;font-style:italic;font-weight:800;font-size:88px;color:#fff;text-shadow:0 6px 18px rgba(0,0,0,.7);white-space:nowrap">“Nantilah…”</div>`, 'left:60px;right:140px;top:270px;text-align:center');
    o.cal = mk(r, `<div style="width:300px;border-radius:22px;overflow:hidden;background:#fff;box-shadow:0 18px 40px rgba(0,0,0,.5);text-align:center">
      <div style="background:#E53935;color:#fff;font-weight:900;font-size:40px;padding:12px;letter-spacing:4px" id="mon">NOV</div>
      <div style="font-weight:900;font-size:120px;color:#222;line-height:1.2">1</div></div>`, 'left:390px;top:420px;transform-origin:50% 0');
    o.lbl = mk(r, `<div class="tape" style="font-size:58px;background:#F5C542;color:#1a1205;text-shadow:none;white-space:nowrap">BULAN DEPAN LAH</div>`, 'left:60px;right:140px;top:720px;text-align:center');
  },
  upd(t, o) {
    ap(o.q, pop(t, 21.55, 0, { from: .7, dy: 20 }));
    ap(o.cal, pop(t, 21.9, 0, { from: .4 }));
    const ms = ['NOV', 'DIS', 'JAN', 'FEB', 'MAC']; document.getElementById('mon').textContent = ms[Math.min(4, Math.floor(P(t, 22.4, 1.0) * 5))];
    o.cal.style.transform += ` rotateX(${t > 22.4 && t < 23.4 ? Math.sin((t - 22.4) * 30) * 12 : 0}deg)`;
    const s = pop(t, 22.4, 0, { from: .4 }); s.tr += ' rotate(-2deg)'; ap(o.lbl, s);
  }
});

// 8. BUKAN SEBAB TAK MAMPU (punch-in) ----------------------------------------------------
scene({
  s: 23.52, e: 25.96, tr: 'zoom', shade: 1,
  L: t => FULL(1.3 + .06 * P(t, 23.52, 2.4), 200),
  build(r, o) {
    o.a = mk(r, `<div class="hl stroke" style="font-size:66px;color:#fff;white-space:nowrap;-webkit-text-stroke:4px #000">BUKAN SEBAB</div>`, 'left:60px;right:140px;top:290px;text-align:center');
    o.b = mk(r, `<div style="display:inline-block;position:relative"><span class="hl stroke" style="font-size:118px;color:#F5C542;white-space:nowrap;-webkit-text-stroke:5px #000">TAK MAMPU</span><div id="strike" style="position:absolute;left:-10px;top:50%;height:16px;margin-top:-8px;background:#E53935;border-radius:8px;width:0"></div></div>`, 'left:60px;right:140px;top:370px;text-align:center');
  },
  upd(t, o) {
    ap(o.a, pop(t, 23.55, 0, { from: .6, dy: -20 }));
    ap(o.b, pop(t, 24.4, 0, { from: 2, ease: eo, d: .2 }));
    document.getElementById('strike').style.width = `calc(${eo(P(t, 25.0, .35)) * 100}% + 20px)`;
  }
});

// 9. SPLIT: BELI vs SIMPAN ------------------------------------------------------------
scene({
  s: 25.96, e: 33.39, tr: 'slide', bgShow: 1,
  L: t => LOWER(1.0 + .03 * P(t, 25.96, 7.4)),
  build(r, o) {
    const col = (id, head, em, bg, bd) => `<div id="${id}" style="width:400px;height:370px;border-radius:30px;background:${bg};border:3px solid ${bd};box-shadow:0 16px 36px rgba(0,0,0,.45);padding:24px;text-align:center;position:relative">
      <div style="font-size:90px;line-height:1">${em}</div><div class="hl" style="font-size:56px;color:#fff;margin-top:6px">${head}</div><div class="rows" style="margin-top:14px"></div></div>`;
    o.cL = mk(r, col('cl', 'BELI', '🛍️', 'linear-gradient(160deg,#3a2a0e,#1c1306)', '#F5C542'), 'left:80px;top:280px');
    o.cR = mk(r, col('cr', 'SIMPAN', '🐷', 'linear-gradient(160deg,#2a2d33,#15171b)', '#7d8590'), 'left:520px;top:280px');
    o.vs = mk(r, `<div style="width:90px;height:90px;border-radius:50%;background:#E53935;color:#fff;font-weight:900;font-size:40px;display:flex;align-items:center;justify-content:center;border:5px solid #fff">VS</div>`, 'left:455px;top:420px');
    const row = (txt, c) => `<div style="font-weight:800;font-size:34px;color:${c};margin:8px 0;white-space:nowrap">${txt}</div>`;
    o.l1 = mk(o.cL.querySelector('.rows'), row('⚡ CEPAT', '#FFE48A'), 'position:relative');
    o.l2 = mk(o.cL.querySelector('.rows'), row('😍 RASA SENANG', '#FFE48A'), 'position:relative');
    o.r0 = mk(o.cR.querySelector('.rows'), row('🤫 SENYAP…', '#c9d1d9'), 'position:relative');
    o.r1 = mk(o.cR.querySelector('.rows'), row('✕ TAK ADA BUNGKUSAN', '#ff8a80').replace('34px', '28px'), 'position:relative');
    o.r2 = mk(o.cR.querySelector('.rows'), row('✕ TAK ADA RASA PUAS', '#ff8a80').replace('34px', '28px'), 'position:relative');
  },
  upd(t, o) {
    ap(o.cL, pop(t, 26.0, 0, { from: .6, dy: -40 }));
    ap(o.cR, pop(t, 28.35, 0, { from: .6, dy: -40 }));
    ap(o.vs, pop(t, 28.5, 0, { from: .2 }));
    ap(o.l1, pop(t, 27.35, 0, { from: .4 })); ap(o.l2, pop(t, 27.85, 0, { from: .4 }));
    ap(o.r0, pop(t, 30.15, 0, { from: .4 })); ap(o.r1, pop(t, 31.05, 0, { from: .4 })); ap(o.r2, pop(t, 32.2, 0, { from: .4 }));
    // glow on the winner side changes
    o.cL.style.filter = t > 28.4 ? "brightness(.8)" : "none";
  }
});

// 10. MASA DEPAN jar draining ------------------------------------------------------------
scene({
  s: 33.39, e: 38.45, tr: 'zoom', bgShow: 1, bgStyle: 'red',
  L: t => PIP(650, 290, 270),
  build(r, o) {
    o.t = mk(r, `<div style="font-weight:700;font-size:30px;letter-spacing:6px;color:#e8d9b0">SETIAP KALI</div><div class="hl" style="font-size:84px;color:#fff">BUY NOW…</div>`, 'left:80px;top:300px');
    o.jar = mk(r, `<div style="position:relative;width:440px;height:520px">
      <div style="position:absolute;left:40px;top:0;width:360px;height:50px;border-radius:14px;background:#8a6a2a;border:4px solid #F5C542"></div>
      <div style="position:absolute;left:10px;top:44px;width:420px;height:470px;border-radius:40px 40px 70px 70px;border:8px solid rgba(255,255,255,.75);background:rgba(255,255,255,.06);overflow:hidden">
        <div id="lvl" style="position:absolute;left:0;right:0;bottom:0;height:85%;background:linear-gradient(#FFE48A,#C9930F)"></div>
        <div style="position:absolute;left:0;right:0;top:40%;text-align:center;font-weight:900;font-size:52px;color:#1a1205;mix-blend-mode:multiply">MASA DEPAN</div></div></div>`, 'left:80px;top:560px');
    o.coins = [0, 1, 2, 3, 4].map(() => mk(r, `<div style="width:60px;height:60px;border-radius:50%;background:radial-gradient(circle at 35% 35%,#FFF1B8,#C9930F);border:4px solid #8a5e08"></div>`, 'left:300px;top:1000px'));
    o.lbl = mk(r, `<div class="stamp" style="font-size:84px;white-space:nowrap">IKUT KELUAR</div>`, 'left:200px;top:930px');
    o.m = mk(r, `<div style="font-weight:900;font-size:80px;color:#ff5a52;text-shadow:0 4px 0 #000">−1</div>`, 'left:560px;top:620px');
  },
  upd(t, o) {
    ap(o.t, pop(t, 33.45, 0, { from: .8, dy: 30 }));
    ap(o.jar, pop(t, 33.6, 0, { from: .8, dy: 60, ease: eo }));
    const drops = [34.6, 35.5, 36.5, 37.3, 38.03]; let lv = .85; drops.forEach(d => { lv -= .14 * eo(P(t, d, .4)); });
    document.getElementById('lvl').style.height = (lv * 100) + '%';
    o.coins.forEach((c, i) => { const p = P(t, drops[i], .7); c.style.opacity = p > 0 && p < 1 ? 1 : 0; c.style.transform = `translate(${p * (200 + i * 40)}px,${-80 * Math.sin(p * Math.PI) + p * 400}px) rotate(${p * 400}deg)`; });
    const mm = P(t, 34.6, .6); o.m.style.opacity = mm > 0 && mm < 1 ? 1 - mm : 0; o.m.style.transform = `translateY(${-mm * 80}px)`;
    ap(o.lbl, slam(t, 38.03, 0, -8));
  }
});

// 11. DIRI KITA YANG AKAN DATANG (vertigo) -------------------------------------------------
scene({
  s: 38.45, e: 42.96, tr: 'fade', tint: 'rgba(40,70,120,.2)', shade: 1,
  L: t => FULL(1.0 + .22 * eio(P(t, 38.45, 4.5)), 120),
  grade: 'saturate(.6) brightness(.95) contrast(1.05)',
  build(r, o) {
    o.a = mk(r, `<div style="font-family:Play;font-style:italic;font-weight:700;font-size:64px;color:#fff;text-shadow:0 0 24px rgba(160,200,255,.55),0 4px 14px rgba(0,0,0,.7);white-space:nowrap">kita lupa…</div>`, 'left:60px;right:140px;top:275px;text-align:center');
    o.b = mk(r, `<div class="glass" style="padding:14px 30px;display:flex;align-items:center;gap:16px;white-space:nowrap"><span style="font-size:50px">🧕</span><span style="font-weight:900;font-size:44px;color:#fff">DIRI KITA <span class="gold">AKAN DATANG</span></span></div>`, 'left:60px;right:140px;top:380px;display:flex;justify-content:center');
    o.c = mk(r, `<div class="hl stroke" style="font-size:70px;color:#F5C542;white-space:nowrap;-webkit-text-stroke:4px #000">PERLUKAN DUIT TU 💔</div>`, 'left:60px;right:140px;top:500px;text-align:center');
  },
  upd(t, o) {
    const fl = (s, k) => { const st = pop(t, s, 0, { from: .9, dy: 30, ease: eo, d: .6 }); st.tr += ` translateY(${Math.sin(t * 1.4 + k) * 6}px)`; return st; };
    ap(o.a, fl(38.9, 0)); ap(o.b, fl(39.55, 1));
    const c = pop(t, 41.65, 0, { from: .6 }); c.tr += ` scale(${1 + (t > 41.65 ? .05 * Math.max(0, Math.sin((t - 41.65) * 2 * Math.PI * 1.2)) : 0)})`; ap(o.c, c);
  }
});

// 12. SATU CARA KECIL: asingkan dulu ---------------------------------------------------------
scene({
  s: 42.96, e: 49.85, tr: 'slide', bgShow: 1, bgStyle: 'green',
  L: t => SPLITR(1.0),
  build(r, o) {
    o.pill = mk(r, `<div class="glass" style="padding:12px 26px;color:#fff;font-weight:800;font-size:38px;white-space:nowrap">💡 SATU <span class="gold">CARA KECIL</span></div>`, 'left:60px;top:280px');
    o.s1 = mk(r, `<div style="width:370px;padding:22px 24px;border-radius:24px;background:rgba(0,0,0,.45);border:3px solid #7fd18b">
      <div style="font-weight:700;font-size:24px;letter-spacing:4px;color:#9be7a8">SEBELUM TEKAN</div>
      <div style="margin-top:10px;padding:14px;border-radius:14px;background:#E53935;color:#fff;font-weight:900;font-size:38px;text-align:center;position:relative">BUY NOW<span id="ps" style="position:absolute;right:-18px;top:-22px;width:62px;height:62px;border-radius:50%;background:#fff;color:#E53935;font-size:34px;display:flex;align-items:center;justify-content:center;border:4px solid #E53935">✋</span></div></div>`, 'left:60px;top:400px');
    o.env = mk(r, `<div style="width:370px;height:300px;position:relative">
      <div style="position:absolute;left:0;right:0;bottom:0;height:220px;border-radius:18px;background:linear-gradient(#f3e2b8,#d9bf86);box-shadow:0 14px 30px rgba(0,0,0,.45)"></div>
      <div style="position:absolute;left:0;right:0;bottom:120px;height:0;border-left:185px solid transparent;border-right:185px solid transparent;border-top:110px solid #e8d29c;transform:translateY(110px)"></div>
      <div style="position:absolute;left:0;right:0;bottom:24px;text-align:center;font-weight:900;font-size:32px;color:#5b3a12;line-height:1.1">UNTUK<br>DIRI SENDIRI 💛</div></div>`, 'left:60px;top:700px');
    o.notes = [0, 1, 2].map(i => mk(r, RMNOTE('RM', 150), 'left:120px;top:560px'));
    o.lbl = mk(r, `<div class="hl stroke" style="font-size:64px;color:#F5C542;-webkit-text-stroke:3px #000;line-height:1">ASINGKAN<br>DULU ✓</div>`, 'left:60px;top:1020px');
  },
  upd(t, o) {
    ap(o.pill, pop(t, 43.3, 0, { from: .5 }));
    ap(o.s1, pop(t, 45.1, 0, { from: .6, dy: 30 }));
    const ps = document.getElementById('ps'); ps.style.transform = `scale(${back(P(t, 46.2, .3))})`;
    ap(o.env, pop(t, 46.8, 0, { from: .6, dy: 40 }));
    o.notes.forEach((n, i) => { const p = eo(P(t, 47.0 + i * .35, .6)); n.style.opacity = p > 0 && p < 1 ? 1 : 0; n.style.transform = `translate(${40 * Math.sin(i)}px,${p * 260}px) rotate(${(1 - p) * (i - 1) * 20}deg) scale(${1 - .3 * p})`; });
    ap(o.lbl, pop(t, 46.9, 0, { from: .4 }));
  }
});

// 13. DUIT -> EMAS (flip morph) ------------------------------------------------------------
scene({
  s: 49.85, e: 53.09, tr: 'zoom', bgShow: 1,
  L: t => PIP(90, 290, 270),
  build(r, o) {
    o.t = mk(r, `<div style="font-weight:700;font-size:28px;letter-spacing:5px;color:#e8d9b0">TAK BERJAYA SIMPAN</div><div class="hl" style="font-size:72px;color:#fff">DALAM BENTUK</div><div class="hl" style="font-size:72px;color:#c9a0d8">DUIT?</div>`, 'left:400px;top:300px');
    o.card = mk(r, `<div style="position:relative;width:520px;height:300px;transform-style:preserve-3d">
      <div id="fA" style="position:absolute;inset:0;display:flex;align-items:center;justify-content:center;backface-visibility:hidden">${RMNOTE('RM100', 480)}</div>
      <div id="fB" style="position:absolute;inset:0;display:flex;align-items:center;justify-content:center;backface-visibility:hidden;transform:rotateY(180deg)">${GOLDBAR(460)}</div></div>`, 'left:200px;top:680px;perspective:1200px');
    o.lbl = mk(r, `<div class="tape" style="font-size:48px;letter-spacing:6px;background:#F5C542;color:#1a1205;text-shadow:none;white-space:nowrap">ALIHKAN SIMPANAN ➜</div>`, 'left:60px;right:140px;top:1050px;text-align:center');
  },
  upd(t, o) {
    ap(o.t, pop(t, 49.9, 0, { from: .8, dy: 30 }));
    const c = pop(t, 50.0, 0, { from: .6 }); const fp = eio(P(t, 52.0, .6));
    o.card.style.opacity = c.o; o.card.style.transform = c.tr; o.card.firstElementChild.style.transform = `rotateY(${fp * 180}deg)`;
    ap(o.lbl, pop(t, 51.95, 0, { from: .4 }));
  }
});

// 14. EMAS MACAM NI (gold card reveal from footage) -------------------------------------------
scene({
  s: 53.09, e: 57.21, tr: 'zoom', tint: 'rgba(255,190,80,.10)',
  L: t => t < 55.9 ? FULL(1.12 - .04 * P(t, 53.09, 2.8), 120) : FULL(1.0 + .06 * eo(P(t, 55.9, 1.3)), 0),
  grade: 'saturate(1.12) brightness(1.04)',
  build(r, o) {
    o.h = mk(r, `<div style="display:flex;align-items:baseline;justify-content:center;gap:20px;white-space:nowrap"><span class="hl" style="font-size:50px;color:#fff">KE BENTUK LAIN:</span></div>`, 'left:60px;right:140px;top:280px');
    o.em = mk(r, `<div style="font-family:Play;font-weight:900;font-size:170px;line-height:1;color:#F5C542;text-shadow:0 0 40px rgba(245,197,66,.6),0 8px 0 #000;white-space:nowrap">EMAS ✨</div>`, 'left:60px;right:140px;top:350px;text-align:center');
    o.arrow = mk(r, `<div style="display:flex;flex-direction:column;align-items:center"><div class="glass" style="padding:12px 26px;color:#fff;font-weight:900;font-size:40px;white-space:nowrap">EMAS <span class="gold">PUBLIC GOLD</span></div>
      <svg width="80" height="120" viewBox="0 0 80 120"><path d="M40 6 L40 100 M14 76 L40 104 L66 76" stroke="#F5C542" stroke-width="12" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg></div>`, 'left:60px;right:140px;top:1150px;display:flex;justify-content:center');
    o.sp = mk(r, Array.from({ length: 22 }, (_, i) => `<i style="position:absolute;width:${8 + (i % 4) * 4}px;height:${8 + (i % 4) * 4}px;border-radius:50%;background:#FFE48A;box-shadow:0 0 14px #F5C542"></i>`).join(''), 'left:0;top:0;width:1080px;height:1920px');
  },
  upd(t, o) {
    ap(o.h, pop(t, 53.2, 55.9, { from: .7 }));
    const e = pop(t, 54.85, 0, { from: 2.2, ease: eo, d: .25 }); ap(o.em, e);
    const a = pop(t, 56.05, 0, { from: .5 }); a.tr += ` translateY(${Math.sin(t * 6) * 8}px)`; ap(o.arrow, a);
    const on = C(P(t, 56.0, .3));
    [...o.sp.children].forEach((d, i) => { const ph = (t * .5 + i * .137) % 1; d.style.left = (380 + (i * 97) % 340) + 'px'; d.style.top = (1560 - ph * 300) + 'px'; d.style.opacity = Math.sin(ph * Math.PI) * on; });
  }
});

// 15. HATI TENANG: 2-step checklist ------------------------------------------------------------
scene({
  s: 57.21, e: 60.25, tr: 'slide', bgShow: 1, bgStyle: 'green',
  L: t => CARDBR(),
  build(r, o) {
    const step = (n, txt, sub) => `<div style="display:flex;align-items:center;gap:22px;width:820px;padding:22px 28px;border-radius:24px;background:rgba(255,255,255,.95);box-shadow:0 14px 30px rgba(0,0,0,.4)">
      <div style="flex:none;width:76px;height:76px;border-radius:50%;background:#1f8a3b;color:#fff;font-weight:900;font-size:44px;display:flex;align-items:center;justify-content:center">${n}</div>
      <div><div style="font-weight:900;font-size:44px;color:#1a1205;white-space:nowrap">${txt}</div><div style="font-weight:600;font-size:28px;color:#555">${sub}</div></div></div>`;
    o.a = mk(r, step('1', 'ASINGKAN / SIMPAN DULU', 'duit atau emas'), 'left:60px;top:290px');
    o.b = mk(r, step('2', 'BARULAH BELI', 'dengan hati yang tenang 😌'), 'left:60px;top:440px');
    o.calm = mk(r, `<div style="font-family:Play;font-style:italic;font-weight:800;font-size:76px;color:#F5C542;text-shadow:0 6px 0 #000;white-space:nowrap">hati tenang</div>`, 'left:60px;top:640px');
  },
  upd(t, o) {
    ap(o.a, pop(t, 57.3, 0, { from: .6, dy: 30 }));
    ap(o.b, pop(t, 58.0, 0, { from: .6, dy: 30 }));
    ap(o.calm, pop(t, 59.8, 0, { from: .5 }));
  }
});

// 16. BALANCE: HARI NI vs HARI ESOK -------------------------------------------------------------
scene({
  s: 60.25, e: 65.36, tr: 'zoom', bgShow: 1,
  L: t => LOWER(1.0 + .03 * P(t, 60.25, 5)),
  build(r, o) {
    o.sc = mk(r, `<svg width="900" height="400" viewBox="0 0 900 400">
      <rect x="440" y="60" width="20" height="300" fill="#D9A93A"/><rect x="340" y="350" width="220" height="26" rx="10" fill="#D9A93A"/>
      <g id="beam"><rect x="120" y="50" width="660" height="18" rx="9" fill="#F5C542"/>
        <g id="panL"><line x1="150" y1="60" x2="90" y2="200" stroke="#F5C542" stroke-width="5"/><line x1="150" y1="60" x2="210" y2="200" stroke="#F5C542" stroke-width="5"/><path d="M70 200 L230 200 Q150 260 70 200Z" fill="#C9930F"/>
          <text x="150" y="160" text-anchor="middle" font-size="64">😊</text><text x="150" y="300" text-anchor="middle" font-family="Mont" font-weight="900" font-size="38" fill="#fff">HARI NI</text></g>
        <g id="panR"><line x1="750" y1="60" x2="690" y2="200" stroke="#F5C542" stroke-width="5"/><line x1="750" y1="60" x2="810" y2="200" stroke="#F5C542" stroke-width="5"/><path d="M670 200 L830 200 Q750 260 670 200Z" fill="#C9930F"/>
          <text x="750" y="160" text-anchor="middle" font-size="64" id="esokE">🛡️</text><text x="750" y="300" text-anchor="middle" font-family="Mont" font-weight="900" font-size="38" fill="#fff">HARI ESOK</text></g></g>
      <circle cx="450" cy="58" r="22" fill="#FFE48A"/></svg>`, 'left:90px;top:270px');
    o.ok = mk(r, `<div class="glass" style="padding:10px 26px;color:#fff;font-weight:900;font-size:36px;white-space:nowrap">⚖️ <span class="gold">SEIMBANG</span> — TAK KORBANKAN ESOK</div>`, 'left:60px;right:140px;top:600px;display:flex;justify-content:center');
  },
  upd(t, o) {
    ap(o.sc, pop(t, 60.3, 0, { from: .7, dy: 40 }));
    // tilt left on "gembira hari ni", then balance on "hari esok"
    const ang = t < 61.6 ? 0 : t < 64.5 ? -9 * eo(P(t, 61.6, .5)) : -9 * (1 - eo(P(t, 64.5, .6))) + Math.sin((t - 64.5) * 6) * 2 * Math.exp(-(t - 64.5) * 2);
    const b = document.getElementById('beam'); b.setAttribute('transform', `rotate(${ang} 450 58)`);
    const cy = 60; ['panL', 'panR'].forEach((id, k) => { const x = k ? 750 : 150; const dy = (x - 450) * Math.sin(ang * Math.PI / 180); document.getElementById(id).setAttribute('transform', `rotate(${-ang} ${x} ${cy})`); });
    ap(o.ok, pop(t, 64.7, 0, { from: .5 }));
  }
});

// 17. KAWAN YANG DIAM ---------------------------------------------------------------------------
scene({
  s: 65.36, e: 72.25, tr: 'fade', tint: 'rgba(255,170,120,.10)', shade: 1,
  L: t => FULL(1.04 + .1 * eio(P(t, 65.36, 6.9)), 150),
  grade: 'saturate(.95)',
  build(r, o) {
    o.chat = mk(r, `<div style="width:640px;padding:22px 26px;border-radius:30px;background:rgba(255,255,255,.95);box-shadow:0 14px 34px rgba(0,0,0,.45)">
      <div style="display:flex;align-items:center;gap:16px"><div style="width:64px;height:64px;border-radius:50%;background:#d7c3a0;display:flex;align-items:center;justify-content:center;font-size:38px">🙂</div>
      <div><div style="font-weight:900;font-size:32px;color:#222">Kawan kita</div><div style="font-weight:600;font-size:24px;color:#888" id="st">online</div></div></div>
      <div style="margin-top:16px;font-family:Play;font-style:italic;font-weight:700;font-size:40px;color:#333">“Aku okay je…” <span style="color:#999">(padahal tengah susah)</span></div></div>`, 'left:80px;top:290px');
    o.d = mk(r, `<div style="font-family:Play;font-style:italic;font-weight:800;font-size:80px;color:#fff;text-shadow:0 0 24px rgba(255,200,160,.6),0 4px 14px rgba(0,0,0,.7);white-space:nowrap">diam-diam… 🤐</div>`, 'left:60px;right:140px;top:560px;text-align:center');
    o.u = mk(r, `<div class="glass" style="padding:16px 34px;display:flex;align-items:center;gap:16px;white-space:nowrap"><span style="font-size:52px">💛</span><span style="font-weight:900;font-size:48px;color:#fff">VIDEO NI <span class="gold">UNTUK DIA</span></span></div>`, 'left:60px;right:140px;top:290px;display:flex;justify-content:center');
  },
  upd(t, o) {
    ap(o.chat, pop(t, 65.9, 69.5, { from: .6, dy: -30 }));
    document.getElementById('st').textContent = t > 68.9 ? 'last seen semalam' : 'online';
    ap(o.d, pop(t, 68.9, 69.5, { from: .8, dy: 20, ease: eo, d: .5 }));
    ap(o.u, pop(t, 69.85, 0, { from: .5 }));
  }
});

// 18. SAVE & SHARE --------------------------------------------------------------------------------
scene({
  s: 72.25, e: 76.67, tr: 'slide', bgShow: 1,
  L: t => LOWER(1.0),
  build(r, o) {
    o.q = mk(r, `<div class="hl" style="font-size:50px;color:#fff;white-space:nowrap">VIDEO NI <span class="gold">BERMANFAAT?</span></div>`, 'left:60px;right:140px;top:280px;text-align:center');
    const ic = (em, lbl) => `<div style="display:flex;flex-direction:column;align-items:center;gap:10px"><div style="width:170px;height:170px;border-radius:50%;background:linear-gradient(135deg,#FFE48A,#C9930F);display:flex;align-items:center;justify-content:center;font-size:84px;box-shadow:0 0 40px rgba(245,197,66,.45)">${em}</div><div style="font-weight:900;font-size:44px;color:#fff">${lbl}</div></div>`;
    o.sv = mk(r, ic('🔖', 'SAVE'), 'left:200px;top:380px');
    o.sh = mk(r, ic('📤', 'SHARE'), 'left:560px;top:380px');
  },
  upd(t, o) {
    ap(o.q, pop(t, 72.85, 0, { from: .6 }));
    const a = pop(t, 74.75, 0, { from: .3 }); a.tr += ` scale(${1 + .05 * Math.sin(Math.max(0, t - 75) * 8)})`; ap(o.sv, a);
    const b = pop(t, 75.2, 0, { from: .3 }); b.tr += ` rotate(${Math.sin(Math.max(0, t - 75.4) * 8) * 4}deg)`; ap(o.sh, b);
  }
});

// 19. CTA: klik link di bio --------------------------------------------------------------------------
scene({
  s: 76.67, e: 79.46, tr: 'zoom', bgShow: 1,
  L: t => SPLITR(1.0),
  build(r, o) {
    o.pill = mk(r, `<div class="glass" style="padding:12px 26px;color:#fff;font-weight:800;font-size:36px;white-space:nowrap">NAK <span class="gold">BERMULA?</span></div>`, 'left:60px;top:290px');
    o.ph = mk(r, `<div class="phone" style="position:relative;transform:scale(.92);transform-origin:0 0"><div class="notch"></div><div class="scr" style="background:linear-gradient(#17110a,#0b0804)">
      <div style="margin:80px 26px 0;padding:24px;border-radius:24px;background:linear-gradient(135deg,#FFE48A,#E0A82E 50%,#A87410);color:#1a1205">
        <div style="font-weight:700;font-size:20px;letter-spacing:4px">AKAUN</div><div style="font-family:Play;font-weight:800;font-size:44px;line-height:1">Emas Saya</div>
        <div style="margin-top:30px;font-weight:700;font-size:18px;letter-spacing:3px;opacity:.75">PUBLIC GOLD</div></div>
      <div style="margin:30px 26px 0;display:flex;justify-content:center">${GOLDBAR(230)}</div>
      <div id="ob" style="margin:34px 26px 0;padding:24px;border-radius:20px;background:#F5C542;color:#1a1205;text-align:center;font-weight:900;font-size:32px">BUKA AKAUN</div></div></div>`, 'left:46px;top:400px');
    o.btn = mk(r, `<div class="btn" style="font-size:50px;padding:26px 46px">KLIK LINK DI BIO <span>👆</span></div>`, 'left:60px;right:140px;top:1160px;display:flex;justify-content:center');
  },
  upd(t, o) {
    ap(o.pill, pop(t, 77.8, 0, { from: .5 }));
    const p = eo(P(t, 76.67, .55)); o.ph.style.opacity = C(p * 2); o.ph.style.transform = `translateY(${lerp(900, 0, p)}px) rotate(${lerp(10, 2, p)}deg)`;
    document.getElementById('ob').style.boxShadow = t > 78.5 ? `0 0 ${30 + 20 * Math.sin(t * 8)}px rgba(255,220,120,.9)` : 'none';
    const b = pop(t, 78.5, 0, { from: .3 }); b.tr += ` scale(${1 + .04 * Math.sin(Math.max(0, t - 78.9) * 7)})`; ap(o.btn, b);
  }
});

// 20. OUTRO end card --------------------------------------------------------------------------------
scene({
  s: 79.46, e: 99, tr: 'slide', bgShow: 1,
  L: t => PIP(390, 440, 300),
  build(r, o) {
    o.wm = mk(r, `<img src="../adila_gold_wm.png" style="height:120px">`, 'left:60px;right:140px;top:800px;text-align:center');
    o.sub = mk(r, `<div style="color:#fff;font-weight:700;font-size:32px;letter-spacing:6px;text-align:center">DEALER AKTIF PUBLIC GOLD</div>`, 'left:60px;right:140px;top:950px');
    o.btn = mk(r, `<div class="btn" style="font-size:46px;padding:24px 46px">KLIK LINK DI BIO <span>👆</span></div>`, 'left:60px;right:140px;top:1160px;display:flex;justify-content:center');
  },
  upd(t, o) { ap(o.wm, pop(t, 79.6, 0, { from: .6 })); ap(o.sub, pop(t, 79.8, 0, { from: .8, dy: 20 })); ap(o.btn, { o: 1, tr: `scale(${1 + .04 * Math.sin(t * 7)})` }); }
});
// ---------------- Captions ----------------
const GROUPS = []; (function () { let g = [];
  for (let i = 0; i < W.length; i++) { g.push(W[i]); const gap = i + 1 < W.length ? W[i + 1].s - W[i].e : 9;
    const len = g.reduce((a, w) => a + w.w.length, 0);
    if (g.length >= 3 || len > 15 || gap > .3 || i == W.length - 1) { GROUPS.push(g); g = []; } } })();
const capEl = $('cap'); let lastCapKey = '';
const CAP_OFF = window.CAP_OFF || [];
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
const BGS = { def: 'radial-gradient(120% 70% at 50% 30%,#2a1d0b 0%,#120d06 55%,#070503 100%)', paper: 'radial-gradient(120% 70% at 50% 30%,#3a2a14 0%,#1d1409 60%,#0b0804 100%)', red: 'radial-gradient(120% 70% at 50% 35%,#3a0f0c 0%,#1a0806 60%,#080303 100%)', night: 'radial-gradient(120% 70% at 50% 30%,#14203a 0%,#0a1020 60%,#04060c 100%)', green: 'radial-gradient(120% 70% at 50% 30%,#1f2a12 0%,#121a08 60%,#060903 100%)' };
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
const NEWEND = SEG2.reduce((a, s) => a + s[1] - s[0], 0), OLDEND = SEG1.reduce((a, s) => a + s[1] - s[0], 0);
function n2o(tn) {
  if (tn >= NEWEND) return OLDEND + (tn - NEWEND);
  let o = 0, src = SEG2[SEG2.length - 1][1];
  for (const [a, b] of SEG2) { if (tn <= o + b - a) { src = a + tn - o; break; } o += b - a; }
  let q = 0; for (const [a, b] of SEG1) { if (src < a) return q; if (src <= b) return q + src - a; q += b - a; } return q;
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
  for (const ft of (window.FLASH || [])) if (t >= ft && t < ft + .2) fl = Math.max(fl, .45 * (1 - (t - ft) / .2));
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
