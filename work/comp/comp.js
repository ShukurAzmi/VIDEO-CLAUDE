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
const FX0 = 490, FY0 = 800;
const FULL = (z = 1, dy = 0, dx = 0) => ({ x: 0, y: 0, w: 1080, h: 1920, r: 0, s: z, fx: 490 + dx, fy: 800 + dy, ring: 0 });
const LOWER = (z = 1) => ({ x: 80, y: 700, w: 840, h: 770, r: 46, s: z, fx: 420, fy: 390, ring: .9 });
const SPLITR = (z = 1) => ({ x: 470, y: 390, w: 460, h: 1070, r: 40, s: z, fx: 230, fy: 450, ring: .9 });
const PIP = (x = 640, y = 290, d = 290) => ({ x, y, w: d, h: d, r: d / 2, s: .5, fx: d / 2, fy: d / 2 + 5, ring: 1 });
const CARDBR = () => ({ x: 540, y: 880, w: 380, h: 540, r: 34, s: .75, fx: 190, fy: 285, ring: .9 });
function mixL(a, b, p) { const o = {}; for (const k in a) o[k] = lerp(a[k], b[k], p); return o; }

// ---------------- Scenes ----------------
// each: s,e, L(t) layout, grade(t) -> css filter, tint, shade, tr: transition type, upd(t)
const S = [];
function scene(o) { o.root = sc(); S.push(o); if (o.build) o.build(o.root, o); return o; }

// 1. HOOK -------------------------------------------------------------
scene({
  s: 0, e: 4.96, tr: 'cut', shade: 1,
  L: t => FULL(1.24 + .04 * P(t, 0, 4.9) + .09 * Math.exp(-Math.max(0, t - 4.04) * 5) * (t >= 4.04), 170),
  build(r, o) {
    o.l1 = mk(r, `<div class="hl" style="font-size:54px;color:#fff;text-align:center">DUIT YANG KITA KUMPUL</div>`, 'left:60px;right:140px;top:282px;text-align:center');
    o.l2 = mk(r, `<div class="hl gold stroke" style="font-size:104px;text-align:center;-webkit-text-stroke:4px #000">BERTAHUN-TAHUN</div>`, 'left:60px;right:140px;top:340px');
    o.bar = mk(r, `<div style="width:760px;height:26px;border-radius:13px;background:rgba(255,255,255,.15);border:2px solid rgba(245,197,66,.6);overflow:hidden"><div id="hb" style="height:100%;width:0;background:linear-gradient(90deg,#C9930F,#FFE48A)"></div></div>
      <div style="display:flex;justify-content:space-between;color:#e8d9b0;font-weight:700;font-size:24px;letter-spacing:4px;margin-top:8px"><span>SIMPANAN</span><span id="hp">0%</span></div>`, 'left:160px;top:470px');
    o.k1 = mk(r, `<div class="hl stroke" style="font-size:62px;color:#fff;text-align:center">HILANG DALAM</div>`, 'left:60px;right:140px;top:280px');
    o.k2 = mk(r, `<div class="hl stroke" style="font-size:124px;color:#F5C542;text-align:center;-webkit-text-stroke:5px #000;text-shadow:0 0 40px rgba(229,57,53,.6)">SATU MALAM</div>`, 'left:60px;right:140px;top:340px');
  },
  upd(t, o) {
    ap(o.l1, pop(t, 0.05, 3.3, { from: .7, dy: 30 }));
    ap(o.l2, pop(t, 1.38, 3.3, { from: .3 }));
    const fill = t < 3.3 ? eio(P(t, .4, 2.6)) : 1 - eo(P(t, 3.3, .7));
    document.getElementById('hb').style.width = (fill * 100) + '%';
    document.getElementById('hb').style.background = t < 3.3 ? 'linear-gradient(90deg,#C9930F,#FFE48A)' : 'linear-gradient(90deg,#7a1010,#E53935)';
    document.getElementById('hp').textContent = Math.round(fill * 100) + '%';
    ap(o.bar, pop(t, .3, 4.0, { from: .9, dy: 20 }));
    const shake = t >= 4.04 ? Math.exp(-(t - 4.04) * 7) * 14 : 0;
    ap(o.k1, pop(t, 3.3, 0, { from: .6 }));
    const s2 = pop(t, 4.04, 0, { from: 2.2, ease: eo, d: .2 });
    s2.tr = `translate(${jit(t * 4, 1) * shake}px,${jit(t * 4, 2) * shake}px) ` + s2.tr; ap(o.k2, s2);
  }
});

// 2. PHONE + AWAS -----------------------------------------------------
scene({
  s: 4.96, e: 9.0, tr: 'slide', bgShow: 1,
  L: t => SPLITR(1.0 + .05 * P(t, 4.96, 4)),
  build(r, o) {
    o.pill = mk(r, `<div class="glass" style="padding:16px 30px;color:#fff;font-weight:800;font-size:38px;letter-spacing:2px">⚠️ SATU <span class="gold">MESEJ</span> SAHAJA</div>`, 'left:60px;top:290px');
    o.ph = mk(r, `<div class="phone" style="position:relative"><div class="notch"></div><div class="scr" style="background:linear-gradient(#e9e3d8,#dcd3c4)">
      <div style="background:#1f2c33;height:150px;padding:64px 26px 0;display:flex;align-items:center;gap:16px">
        <div style="width:62px;height:62px;border-radius:50%;background:#8a96a0;color:#fff;font-weight:800;font-size:34px;display:flex;align-items:center;justify-content:center">?</div>
        <div><div style="color:#fff;font-weight:700;font-size:27px">+60 1X-XXX XXXX</div><div style="color:#9fb0b8;font-size:20px">Nombor tidak dikenali</div></div></div>
      <div id="typing" style="margin:30px 0 0 22px;width:110px;height:56px;border-radius:28px;background:#fff;display:flex;gap:10px;align-items:center;justify-content:center">
        <i class="d" style="width:13px;height:13px;border-radius:50%;background:#999"></i><i class="d" style="width:13px;height:13px;border-radius:50%;background:#999"></i><i class="d" style="width:13px;height:13px;border-radius:50%;background:#999"></i></div>
      <div id="msg" style="position:absolute;left:20px;top:180px;width:330px;padding:22px 24px;border-radius:6px 26px 26px 26px;background:#fff;font-size:29px;line-height:1.3;color:#111;box-shadow:0 4px 10px rgba(0,0,0,.12)">
        Tahniah! 🎉 <b>Masuk sikit je</b>, esok <b>confirm untung</b> 💰<br><span style="color:#1a73e8;text-decoration:underline">klik-link-ni.xyz</span><div style="text-align:right;font-size:18px;color:#888;margin-top:6px">11:47 PM ✓✓</div></div>
      </div></div>`, 'left:46px;top:400px;transform-origin:50% 100%');
    o.st = mk(r, `<div class="stamp">AWAS!</div>`, 'left:30px;top:640px;transform-origin:50% 50%');
    o.al = mk(r, '', 'left:0;top:0;width:1080px;height:1920px;box-shadow:inset 0 0 160px 40px rgba(229,57,53,.85)');
  },
  upd(t, o) {
    ap(o.pill, pop(t, 5.5, 0, { from: .6, dy: -20 }));
    const p = eo(P(t, 4.96, .55));
    o.ph.style.opacity = C(p * 2); o.ph.style.transform = `translateY(${lerp(900, 0, p)}px) rotate(${lerp(-14, -4, p) + Math.sin(t * 1.3) * .8}deg)`;
    const ty = document.getElementById('typing'); ty.style.opacity = t > 5.2 && t < 5.8 ? 1 : 0;
    [...ty.children].forEach((d, i) => d.style.transform = `translateY(${Math.sin(t * 14 - i) * 5}px)`);
    const m = document.getElementById('msg'); const ms = pop(t, 5.8, 0, { from: .5, d: .35 }); m.style.opacity = ms.o; m.style.transform = ms.tr; m.style.transformOrigin = '0 0';
    ap(o.st, slam(t, 8.05, 0, -12));
    o.al.style.opacity = t > 7.75 ? (.5 + .5 * Math.sin((t - 7.75) * 2 * Math.PI * 2.2)) * (1 - P(t, 8.7, .3)) : 0;
  }
});

// 3. QUESTION + NAME -----------------------------------------------------
scene({
  s: 9.0, e: 12.4, tr: 'zoom',
  L: t => FULL(1.03 + .05 * P(t, 9, 3.4), 0),
  build(r, o) {
    o.lt = mk(r, `<div style="display:flex;align-items:center;gap:22px;padding:16px 34px 16px 18px;border-radius:999px;background:rgba(12,9,4,.72);border:2px solid rgba(245,197,66,.7);box-shadow:0 12px 30px rgba(0,0,0,.4)">
       <div style="width:64px;height:64px;border-radius:50%;background:linear-gradient(135deg,#FFE48A,#C9930F);display:flex;align-items:center;justify-content:center;font-family:Play;font-weight:800;font-size:36px;color:#1a1205">A</div>
       <div><div style="font-family:Play;font-weight:800;font-size:40px;color:#F5C542;line-height:1">Adila Gold</div><div style="color:#fff;font-weight:600;font-size:24px;letter-spacing:2px;margin-top:4px">DEALER AKTIF PUBLIC GOLD</div></div></div>`, 'left:60px;right:140px;top:288px;display:flex;justify-content:center');
    o.q = mk(r, `<div style="font-family:Marker;font-size:230px;color:#F5C542;text-shadow:0 8px 0 #000,0 0 30px rgba(0,0,0,.6)">?</div>`, 'left:750px;top:470px;transform-origin:50% 80%');
    o.q2 = mk(r, `<div style="font-family:Marker;font-size:44px;color:#fff;text-shadow:0 4px 0 #000;transform:rotate(8deg)">untuk apa?</div>`, 'left:700px;top:770px');
  },
  upd(t, o) {
    ap(o.lt, pop(t, 9.15, 12.25, { from: .7, dy: -30 }));
    const s = pop(t, 11.4, 12.4, { from: .2, rot: -30 }); s.tr += ` rotate(${jit(t, 3) * 4}deg) translate(${jit(t, 4) * 3}px,${jit(t, 5) * 3}px)`; ap(o.q, s);
    const s2 = pop(t, 11.6, 12.4, { from: .5 }); s2.tr += ` rotate(${jit(t, 6) * 2}deg)`; ap(o.q2, s2);
  }
});

// 4. CHECKLIST (sticky notes) ------------------------------------------
const ICON = {
  med: '<svg viewBox="0 0 76 76"><rect x="4" y="4" width="68" height="68" rx="16" fill="#E53935"/><path d="M30 16h16v14h14v16H46v14H30V46H16V30h14z" fill="#fff"/></svg>',
  bag: '<svg viewBox="0 0 76 76"><rect x="6" y="22" width="64" height="44" rx="8" fill="#5b3a12"/><path d="M26 22v-8h24v8" stroke="#5b3a12" stroke-width="7" fill="none"/><rect x="6" y="38" width="64" height="5" fill="#E8B94A"/></svg>',
  bolt: '<svg viewBox="0 0 76 76"><circle cx="38" cy="38" r="34" fill="#1c1108"/><path d="M42 10L20 42h16l-4 24 24-34H40z" fill="#F5C542"/></svg>',
};
scene({
  s: 12.4, e: 20.55, tr: 'slide', bgShow: 1, bgStyle: 'paper',
  L: t => PIP(640, 290, 290),
  build(r, o) {
    o.t1 = mk(r, `<div class="hl" style="font-size:52px;color:#fff">KITA SIMPAN DUIT</div><div style="font-family:Play;font-style:italic;font-weight:800;font-size:96px;color:#F5C542;line-height:1">untuk…</div>`, 'left:80px;top:300px');
    o.chip = mk(r, `<div class="glass" style="padding:12px 26px;color:#fff;font-weight:800;font-size:34px;letter-spacing:3px">IN CASE <span class="gold">IN FUTURE</span></div>`, 'left:80px;top:510px');
    const N = [['JATUH SAKIT', 'med', '#FFE27A', -3, 80], ['HILANG PEKERJAAN', 'bag', '#FFD15C', 2, 150], ['TAK DIJANGKA', 'bolt', '#F7C04A', -1.5, 100]];
    o.notes = N.map((n, i) => mk(r, `<div class="note" style="position:relative;background:${n[2]}"><div class="ic">${ICON[n[1]]}</div>${n[0]}<div class="tick"><svg width="44" height="44" viewBox="0 0 44 44"><path d="M8 23l9 9 19-20" stroke="#fff" stroke-width="7" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg></div>
      <div style="position:absolute;left:50%;top:-16px;width:120px;height:34px;margin-left:-60px;background:rgba(255,255,255,.55);transform:rotate(${-n[3] * 2}deg)"></div></div>`, `left:${n[4]}px;top:${640 + i * 190}px;transform-origin:50% 50%`));
    o.rot = N.map(n => n[3]);
  },
  upd(t, o) {
    ap(o.t1, pop(t, 12.5, 0, { from: .8, dy: 30 }));
    ap(o.chip, pop(t, 13.0, 0, { from: .6 }));
    [15.68, 16.84, 18.8].forEach((s, i) => {
      const st = pop(t, s, 0, { from: 1.6, rot: o.rot[i] * 4, ease: eo, d: .25 });
      st.tr += ` rotate(${o.rot[i]}deg)`; ap(o.notes[i], st);
      const tk = o.notes[i].querySelector('.tick'); const k = back(P(t, s + .3, .3)); tk.style.transform = `scale(${k})`; tk.style.opacity = C(P(t, s + .3, .1));
    });
    fx.style.transform = '';
  }
});

// 5. SCAM SANGAT BIJAK ---------------------------------------------------
scene({
  s: 20.55, e: 25.1, tr: 'zoom', shade: 1, tint: 'rgba(200,30,30,.22)',
  L: t => FULL(1.22 + .1 * eio(P(t, 20.55, 4.5)), 170),
  grade: 'saturate(.85) contrast(1.1)',
  build(r, o) {
    o.a = mk(r, `<div class="tape" style="font-size:110px;color:#ff5a52">SCAM</div>`, 'left:60px;right:140px;top:268px;text-align:center');
    o.b = mk(r, `<div class="tape" style="font-size:66px;background:#F5C542;color:#1a1205;text-shadow:0 2px 0 #fff8;box-shadow:0 8px 20px rgba(0,0,0,.5),inset 0 0 0 3px #c99a20">SANGAT BIJAK</div>`, 'left:60px;right:140px;top:412px;text-align:center');
  },
  upd(t, o) {
    const a = pop(t, 21.45, 0, { from: 1.8, ease: eo, d: .18 }); a.tr += ' rotate(-3deg)'; ap(o.a, a);
    const b = pop(t, 22.3, 0, { from: .2, d: .3 }); b.tr += ' rotate(2deg)'; ap(o.b, b);
  }
});

// 6. BAIT bubble (frame break) --------------------------------------------
scene({
  s: 25.1, e: 28.1, tr: 'slide', bgShow: 1,
  L: t => LOWER(1.0 + .04 * P(t, 25.1, 3)),
  build(r, o) {
    o.bub = mk(r, `<div style="position:relative;width:840px;padding:30px 40px 34px;border-radius:44px;background:#fff;box-shadow:0 24px 60px rgba(0,0,0,.5)">
      <div style="font-weight:800;font-size:26px;letter-spacing:5px;color:#E53935">💬 KATA SCAMMER:</div>
      <div style="font-family:Play;font-style:italic;font-weight:800;font-size:58px;line-height:1.08;color:#141414;margin-top:8px">“Masuk sikit je, esok <span style="color:#1f8a3b">confirm</span> dah untung!”</div>
      <div style="position:absolute;left:520px;bottom:-46px;width:0;height:0;border-left:30px solid transparent;border-right:30px solid transparent;border-top:60px solid #fff"></div></div>`, 'left:80px;top:290px;transform-origin:60% 100%');
    o.arrow = mk(r, `<svg width="210" height="150" viewBox="0 0 210 150"><path id="ar" d="M10 140 L70 95 L110 112 L195 20" stroke="#2ecc71" stroke-width="14" fill="none" stroke-linecap="round" stroke-linejoin="round" pathLength="1" stroke-dasharray="1" stroke-dashoffset="1"/><path d="M160 18 L198 16 L194 54" stroke="#2ecc71" stroke-width="14" fill="none" stroke-linecap="round" stroke-linejoin="round" id="ah" opacity="0"/></svg>`, 'left:820px;top:200px');
    o.st = mk(r, `<div class="stamp" style="font-size:96px;background:rgba(255,255,255,.0)">PERANGKAP!</div>`, 'left:130px;top:390px');
  },
  upd(t, o) {
    ap(o.bub, pop(t, 25.15, 0, { from: .3, d: .45 }));
    const p = eo(P(t, 26.86, .6)); document.getElementById('ar').setAttribute('stroke-dashoffset', 1 - p); document.getElementById('ah').setAttribute('opacity', p > .95 ? 1 : 0);
    o.arrow.style.opacity = 0;
    ap(o.st, slam(t, 27.5, 0, -8));
  }
});

// 7. ILMU: punch-in then paper cut --------------------------------------
scene({
  s: 28.1, e: 31.9, tr: 'zoom', shade: 0,
  L: t => t < 29.3 ? FULL(1.38, 0, 0) : FULL(1.24 + .05 * P(t, 29.3, 2.6), 170),
  shadeF: t => t >= 29.3 ? 1 : 0,
  build(r, o) {
    const strip = (txt, bg, col, rot) => `<div style="display:inline-block;padding:16px 34px;background:${bg};color:${col};font-weight:900;font-size:70px;text-transform:uppercase;transform:rotate(${rot}deg);
      clip-path:polygon(0 6%,4% 0,12% 5%,22% 0,35% 4%,48% 0,60% 5%,73% 1%,86% 5%,96% 0,100% 8%,99% 92%,95% 100%,84% 95%,70% 100%,57% 96%,44% 100%,30% 95%,18% 100%,6% 96%,0 100%);box-shadow:0 10px 20px rgba(0,0,0,.4)">${txt}</div>`;
    o.a = mk(r, strip('TAK ADA ILMU', '#f3ecdf', '#151515', -2), 'left:60px;right:140px;top:270px;text-align:center');
    o.b = mk(r, strip('= KITA SENDIRI <span style="color:#F5C542">PERCAYA</span>', '#151515', '#fff', 1.5).replace('font-size:70px', 'font-size:58px'), 'left:60px;right:140px;top:395px;text-align:center');
  },
  upd(t, o) {
    ap(o.a, pop(t, 29.3, 0, { from: .5, dy: -40, rot: -6 }));
    ap(o.b, pop(t, 30.35, 0, { from: .5, dy: 40, rot: 6 }));
  }
});

// 8. CHART DROP -----------------------------------------------------------
scene({
  s: 31.9, e: 37.2, tr: 'slide', bgShow: 1, bgStyle: 'red',
  L: t => PIP(90, 290, 270),
  build(r, o) {
    o.t = mk(r, `<div style="font-weight:700;font-size:28px;letter-spacing:6px;color:#e8d9b0">BAKI</div><div class="hl" style="font-size:84px;color:#fff">SIMPANAN</div><div class="hl" style="font-size:84px;color:#F5C542">KITA</div>`, 'left:410px;top:300px');
    o.ch = mk(r, `<div style="position:relative;width:840px;height:500px;border-radius:30px;background:rgba(0,0,0,.45);border:2px solid rgba(255,255,255,.12)">
      <svg width="840" height="500" viewBox="0 0 900 520" preserveAspectRatio="none" style="position:absolute;inset:0">
        <g stroke="rgba(255,255,255,.08)" stroke-width="2">${[100, 200, 300, 400].map(y => `<line x1="40" x2="870" y1="${y}" y2="${y}"/>`).join('')}</g>
        <path id="cArea" fill="url(#cg)" opacity=".5"/><path id="cLine" fill="none" stroke-width="10" stroke-linejoin="round" stroke-linecap="round"/>
        <circle id="cDot" r="16"/>
        <defs><linearGradient id="cg" x1="0" x2="0" y1="0" y2="1"><stop offset="0" id="cs1" stop-color="#F5C542"/><stop offset="1" stop-color="#F5C542" stop-opacity="0"/></linearGradient></defs>
      </svg></div>`, 'left:90px;top:650px');
    o.heart = mk(r, `<div class="glass" style="padding:14px 26px;color:#fff;font-weight:800;font-size:36px;display:flex;align-items:center;gap:14px">💔 SAKIT HATI</div>`, 'left:520px;top:690px');
    o.les = mk(r, `<div class="stamp" style="font-size:110px">LESAP</div>`, 'left:260px;top:850px');
  },
  upd(t, o) {
    // series: rise (31.9-33.1), crash to .45 at 33.19, drift, crash to 0 at 36.71
    const pts = []; const n = 60;
    const grow = eo(P(t, 31.9, 1.1));
    for (let i = 0; i <= n; i++) {
      const x = i / n; let v = .15 + .7 * x + .03 * Math.sin(x * 14);
      if (x > grow) break; pts.push([x, v]);
    }
    let lastV = pts.length ? pts[pts.length - 1][1] : .15;
    let drop = 0; if (t > 33.19) drop = .45 * eo(P(t, 33.19, .4)); if (t > 34.6) drop += .2 * eo(P(t, 34.6, 1.2)); if (t > 36.6) drop = .65 + (lastV - .65) * eo(P(t, 36.6, .3));
    const ext = t > 33.19 ? C((t - 33.19) / 3.6) : 0; const extra = [];
    if (t > 33.19) { for (let k = 1; k <= 12; k++) { const x = 1 + .25 * k / 12 * ext; } }
    // build path scaled into 0..1 with drop appended as a vertical-ish crash at the end
    const X = x => 50 + x * 640, Y = v => 470 - v * 420;
    let d = pts.map((p, i) => (i ? 'L' : 'M') + X(p[0]) + ' ' + Y(p[1])).join(' ');
    let ex = X(pts.length ? pts[pts.length - 1][0] : 0), ey = Y(lastV);
    if (t > 33.19) { const v2 = Math.max(0, lastV - drop); ex = X(1) + 160 * eo(ext); ey = Y(v2); d += ` L${X(1) + 40} ${Y(lastV - drop * .6)} L${ex} ${ey}`; }
    const red = t > 33.19;
    const L = document.getElementById('cLine'); L.setAttribute('d', d); L.setAttribute('stroke', red ? '#E53935' : '#F5C542');
    document.getElementById('cArea').setAttribute('d', d ? d + ` L${ex} 470 L50 470 Z` : '');
    document.getElementById('cs1').setAttribute('stop-color', red ? '#E53935' : '#F5C542');
    const D = document.getElementById('cDot'); D.setAttribute('cx', ex); D.setAttribute('cy', ey); D.setAttribute('fill', red ? '#E53935' : '#F5C542');
    ap(o.t, pop(t, 31.95, 0, { from: .8, dy: 30 }));
    ap(o.ch, pop(t, 31.9, 0, { from: .9, dy: 60, ease: eo }));
    ap(o.heart, pop(t, 33.7, 0, { from: .4 }));
    ap(o.les, slam(t, 36.68, 0, -9));
  }
});

// 9. SEGAN / MALU / PENDAM ---------------------------------------------------
scene({
  s: 37.2, e: 42.2, tr: 'fade', tint: 'rgba(40,70,120,.18)',
  L: t => FULL(1.0 + .12 * eio(P(t, 37.2, 5)), 0),
  grade: 'saturate(.55) brightness(.92) contrast(1.05)',
  build(r, o) {
    const w = (txt, sz) => `<div style="font-family:Play;font-style:italic;font-weight:700;font-size:${sz}px;color:#fff;text-shadow:0 0 24px rgba(160,200,255,.55),0 4px 14px rgba(0,0,0,.7)">${txt}</div>`;
    o.a = mk(r, w('segan…', 84), 'left:110px;top:282px'); o.b = mk(r, w('malu…', 84), 'left:640px;top:282px');
    o.c = mk(r, `<div class="glass" style="padding:14px 34px;display:flex;align-items:center;gap:18px"><span style="font-size:48px">🤐</span><span style="font-weight:900;font-size:58px;color:#fff;letter-spacing:2px">PENDAM SENDIRI</span></div>`, 'left:60px;right:140px;top:288px;display:flex;justify-content:center');
  },
  upd(t, o) {
    const fl = (s, e, k) => { const st = pop(t, s, e, { from: .9, dy: 30, ease: eo, d: .6 }); st.tr += ` translateY(${Math.sin(t * 1.4 + k) * 6}px)`; return st; };
    ap(o.a, fl(39.0, 41.3, 0)); ap(o.b, fl(40.0, 41.3, 2));
    ap(o.c, pop(t, 41.35, 0, { from: .7 }));
  }
});

// 10. RED FLAGS -----------------------------------------------------------------
scene({
  s: 42.2, e: 48.9, tr: 'slide', bgShow: 1, bgStyle: 'red',
  L: t => CARDBR(),
  build(r, o) {
    o.t = mk(r, `<div style="font-weight:800;font-size:30px;letter-spacing:8px;color:#ff8a80">🚩 TANDA-TANDA</div><div class="hl" style="font-size:92px;color:#fff">SCAM</div>`, 'left:70px;top:290px');
    const F = ['JANJI UNTUNG TETAP', 'SURUH CEPAT-CEPAT JOIN', 'SURUH ORANG LAIN MASUK'];
    o.f = F.map((f, i) => mk(r, `<div class="flag"><div class="x">✕</div>${f}</div>`, `left:70px;top:${480 + i * 128}px`));
    o.st = mk(r, `<div class="stamp" style="font-size:150px">ELAK!</div>`, 'left:70px;top:900px');
  },
  upd(t, o) {
    ap(o.t, pop(t, 42.3, 0, { from: .7, dy: -20 }));
    [44.2, 45.2, 46.25].forEach((s, i) => { const st = pop(t, s, 0, { from: .6, ease: eo, d: .3 }); st.tr = `translateX(${lerp(-700, 0, eo(P(t, s, .35)))}px)`; ap(o.f[i], st); });
    ap(o.st, slam(t, 48.3, 0, -10));
  }
});

// 11. SIMPANAN ≠ DUIT ------------------------------------------------------------
scene({
  s: 48.9, e: 51.55, tr: 'zoom', tint: 'rgba(255,190,80,.10)',
  L: t => FULL(1.05 + .06 * P(t, 48.9, 2.7), 0),
  grade: 'saturate(1.12) brightness(1.04)',
  build(r, o) {
    o.h = mk(r, `<div class="glass" style="padding:16px 36px;display:flex;align-items:baseline;gap:18px"><span style="font-family:Play;font-weight:800;font-size:64px;color:#F5C542">Simpanan</span><span style="font-weight:900;font-size:64px;color:#fff">≠</span><span style="font-weight:900;font-size:50px;color:#fff">DUIT SAHAJA</span></div>`, 'left:60px;right:140px;top:282px;display:flex;justify-content:center');
    o.sp = mk(r, Array.from({ length: 18 }, (_, i) => `<i style="position:absolute;width:${6 + (i % 4) * 3}px;height:${6 + (i % 4) * 3}px;border-radius:50%;background:#FFE48A;box-shadow:0 0 12px #F5C542" data-i="${i}"></i>`).join(''), 'left:0;top:0;width:1080px;height:1920px');
  },
  upd(t, o) {
    ap(o.h, pop(t, 49.9, 0, { from: .5 }));
    [...o.sp.children].forEach((d, i) => { const ph = (t * .12 + i * .137) % 1; d.style.left = (60 + (i * 197) % 960) + 'px'; d.style.top = (1250 - ph * 1000) + 'px'; d.style.opacity = Math.sin(ph * Math.PI) * .8; });
  }
});

// 12. DUIT -> EMAS (factory line) --------------------------------------------------
const NOTE_SVG = '<svg width="190" height="100" viewBox="0 0 190 100"><rect x="3" y="3" width="184" height="94" rx="10" fill="#7fb98a" stroke="#2f6b3a" stroke-width="5"/><circle cx="95" cy="50" r="26" fill="none" stroke="#2f6b3a" stroke-width="5"/><text x="95" y="61" text-anchor="middle" font-family="Mont" font-weight="900" font-size="30" fill="#2f6b3a">RM</text></svg>';
const BAR_SVG = '<svg width="260" height="150" viewBox="0 0 260 150"><defs><linearGradient id="gb" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stop-color="#FFF1B8"/><stop offset=".45" stop-color="#F5C542"/><stop offset="1" stop-color="#A87410"/></linearGradient><linearGradient id="gt" x1="0" x2="1"><stop offset="0" stop-color="#FFE48A"/><stop offset="1" stop-color="#E0A82E"/></linearGradient></defs><path d="M40 40 L220 40 L250 140 L10 140 Z" fill="url(#gb)" stroke="#8a5e08" stroke-width="4"/><path d="M40 40 L220 40 L205 10 L55 10 Z" fill="url(#gt)" stroke="#8a5e08" stroke-width="4"/><text x="130" y="105" text-anchor="middle" font-family="Mont" font-weight="900" font-size="25" fill="#7a5200" letter-spacing="2">PUBLIC GOLD</text><text x="130" y="128" text-anchor="middle" font-family="Mont" font-weight="700" font-size="16" fill="#7a5200">999.9</text></svg>';
scene({
  s: 51.55, e: 55.05, tr: 'slide', bgShow: 1,
  L: t => PIP(660, 290, 270),
  build(r, o) {
    o.t = mk(r, `<div class="hl" style="font-size:56px;color:#fff">ALIHKAN</div><div class="hl" style="font-size:56px;color:#fff">SIMPANAN KE</div><div style="font-family:Play;font-weight:800;font-size:92px;color:#F5C542;line-height:1">bentuk emas</div>`, 'left:80px;top:300px');
    o.belt = mk(r, `<div style="width:860px;height:30px;border-radius:15px;background:repeating-linear-gradient(90deg,#3a2a12 0 40px,#25190a 40px 80px);border:3px solid #6b4a16" id="belt"></div>`, 'left:60px;top:1010px');
    o.mach = mk(r, `<div style="width:220px;height:250px;border-radius:26px;background:linear-gradient(#2c2010,#140d05);border:4px solid #D9A93A;display:flex;align-items:center;justify-content:center;box-shadow:0 0 50px rgba(245,197,66,.25)"><div style="font-size:90px;color:#F5C542;font-weight:900">→</div></div>`, 'left:360px;top:770px');
    o.n = [0, 1, 2].map(() => mk(r, NOTE_SVG, 'left:0;top:900px'));
    o.bar = mk(r, BAR_SVG, 'left:660px;top:860px;transform-origin:50% 80%');
    o.glow = mk(r, `<div style="width:420px;height:420px;border-radius:50%;background:radial-gradient(circle,rgba(255,220,120,.55),rgba(255,200,80,0) 65%)"></div>`, 'left:580px;top:730px');
    o.lbl = mk(r, `<div class="hl stroke" style="font-size:120px;color:#F5C542;-webkit-text-stroke:4px #000">EMAS</div>`, 'left:560px;top:620px');
  },
  upd(t, o) {
    ap(o.t, pop(t, 51.6, 0, { from: .8, dy: 30 }));
    document.getElementById('belt').style.backgroundPosition = `${t * 160}px 0`;
    ap(o.belt, pop(t, 51.7, 0, { from: 1, ease: eo })); ap(o.mach, pop(t, 51.9, 0, { from: .5 }));
    o.n.forEach((d, i) => { const ph = (t - 52.0 - i * .8); const x = 40 + ph * 330; d.style.opacity = ph > 0 && x < 290 ? 1 : 0; d.style.transform = `translateX(${x}px) rotate(${Math.sin(t * 6 + i) * 3}deg)`; });
    const b = pop(t, 54.55, 0, { from: .2, d: .45 }); b.tr += ` rotate(${Math.sin(t * 2) * 2}deg)`; ap(o.bar, b);
    o.glow.style.opacity = C(P(t, 54.55, .4)) * (.75 + .25 * Math.sin(t * 5)); o.glow.style.transform = `scale(${.8 + .2 * Math.sin(t * 3)})`;
    ap(o.lbl, pop(t, 54.64, 0, { from: .3 }));
  }
});

// 13. BERMANFAAT (pullback reveal) ----------------------------------------------------
scene({
  s: 55.05, e: 59.9, tr: 'zoom', tint: 'rgba(255,190,80,.08)',
  L: t => FULL(1.0 + .42 * (1 - eio(P(t, 55.05, 1.4))), 0),
  grade: 'saturate(1.08)',
  build(r, o) {
    o.p = mk(r, `<div class="glass" style="padding:16px 34px;display:flex;align-items:center;gap:18px"><span style="font-size:52px">💛</span><span style="font-weight:900;font-size:58px;color:#fff">VIDEO INI <span class="gold">BERMANFAAT?</span></span></div>`, 'left:60px;right:140px;top:288px;display:flex;justify-content:center');
  },
  upd(t, o) { ap(o.p, pop(t, 57.0, 0, { from: .5 })); }
});

// 14. SHARE -----------------------------------------------------------------------------
scene({
  s: 59.9, e: 63.6, tr: 'slide', bgShow: 1,
  L: t => LOWER(1.0),
  build(r, o) {
    o.hub = mk(r, `<div style="width:150px;height:150px;border-radius:50%;background:linear-gradient(135deg,#FFE48A,#C9930F);display:flex;align-items:center;justify-content:center;box-shadow:0 0 50px rgba(245,197,66,.5)"><svg width="80" height="80" viewBox="0 0 24 24"><path fill="#1a1205" d="M18 16.1c-.8 0-1.4.3-2 .8l-7.1-4.2c.1-.2.1-.5.1-.7s0-.5-.1-.7L16 7.2c.5.5 1.2.8 2 .8 1.7 0 3-1.3 3-3s-1.3-3-3-3-3 1.3-3 3c0 .2 0 .5.1.7L8 9.8C7.5 9.3 6.8 9 6 9c-1.7 0-3 1.3-3 3s1.3 3 3 3c.8 0 1.5-.3 2-.8l7.1 4.2c-.1.2-.1.4-.1.6 0 1.6 1.3 2.9 2.9 2.9s2.9-1.3 2.9-2.9-1.2-2.9-2.8-2.9z"/></svg></div>`, 'left:425px;top:300px');
    o.env = [0, 1, 2, 3].map(i => mk(r, `<div style="font-size:64px">✉️</div>`, 'left:465px;top:335px'));
    o.fr = [[110, 300], [780, 290], [150, 520], [760, 520]].map(([x, y]) => mk(r, `<div style="width:110px;height:110px;border-radius:50%;background:#2a1d0b;border:4px solid #F5C542;display:flex;align-items:center;justify-content:center;font-size:62px">🙂</div>`, `left:${x}px;top:${y}px`));
    o.txt = mk(r, `<div class="hl" style="font-size:44px;color:#fff;text-align:center;white-space:nowrap">SHARE KEPADA <span class="gold">RAKAN-RAKAN</span></div>`, 'left:60px;right:140px;top:640px');
  },
  upd(t, o) {
    ap(o.hub, pop(t, 60.0, 0, { from: .3 }));
    const T = [[110, 300], [780, 290], [150, 520], [760, 520]];
    o.env.forEach((d, i) => { const p = eo(P(t, 60.65 + i * .18, .6)); d.style.opacity = p > 0 && p < 1 ? 1 : 0; d.style.transform = `translate(${(T[i][0] - 435) * p}px,${(T[i][1] - 305) * p - Math.sin(p * Math.PI) * 120}px) rotate(${p * 360 * (i % 2 ? 1 : -1)}deg)`; });
    o.fr.forEach((d, i) => ap(d, pop(t, 61.1 + i * .18, 0, { from: .3 })));
    ap(o.txt, pop(t, 60.65, 0, { from: .7, dy: 20 }));
  }
});

// 15. CTA: akaun emas + link in bio --------------------------------------------------------
scene({
  s: 63.6, e: 68.27, tr: 'zoom', bgShow: 1,
  L: t => SPLITR(1.0),
  build(r, o) {
    o.ph = mk(r, `<div class="phone" style="position:relative"><div class="notch"></div><div class="scr" style="background:linear-gradient(#17110a,#0b0804)">
      <div style="margin:80px 26px 0;padding:26px;border-radius:26px;background:linear-gradient(135deg,#FFE48A,#E0A82E 50%,#A87410);color:#1a1205;box-shadow:0 14px 30px rgba(0,0,0,.4)">
        <div style="font-weight:700;font-size:20px;letter-spacing:4px">AKAUN</div><div style="font-family:Play;font-weight:800;font-size:46px;line-height:1">Emas Saya</div>
        <div style="margin-top:46px;font-weight:700;font-size:18px;letter-spacing:3px;opacity:.75">SIMPANAN DALAM BENTUK EMAS</div></div>
      <div style="margin:34px 26px 0;display:flex;justify-content:center">${BAR_SVG.replace('width="260"', 'width="230"')}</div>
      <div id="openBtn" style="margin:40px 26px 0;padding:26px;border-radius:20px;background:#F5C542;color:#1a1205;text-align:center;font-weight:900;font-size:34px;letter-spacing:2px">BUKA AKAUN</div>
      <div id="okTick" style="position:absolute;left:0;right:0;bottom:60px;text-align:center;color:#9be7a8;font-weight:800;font-size:26px">✓ Mudah & selamat bermula</div>
      </div></div>`, 'left:46px;top:420px;transform-origin:50% 100%');
    o.pill = mk(r, `<div class="glass" style="padding:14px 28px;color:#fff;font-weight:800;font-size:36px">AKAUN EMAS <span class="gold">PUBLIC GOLD</span></div>`, 'left:46px;top:300px');
    o.hand = mk(r, `<div style="font-size:90px;filter:drop-shadow(0 6px 10px rgba(0,0,0,.5))">👆</div>`, 'left:200px;top:1000px');
    o.btn = mk(r, `<div class="btn">KLIK LINK IN BIO <span style="font-size:52px">👆</span></div>`, 'left:60px;right:140px;top:1290px;display:flex;justify-content:center');
  },
  upd(t, o) {
    const p = eo(P(t, 63.6, .55)); o.ph.style.opacity = C(p * 2); o.ph.style.transform = `translateY(${lerp(900, 0, p)}px) rotate(${lerp(10, 3, p)}deg)`;
    ap(o.pill, pop(t, 64.85, 0, { from: .5 }));
    const tap = P(t, 64.45, .5); o.hand.style.opacity = tap > 0 && t < 65.6 ? 1 : 0; o.hand.style.transform = `translate(${lerp(120, 0, eo(tap))}px,${lerp(160, 0, eo(tap))}px) scale(${t > 64.95 && t < 65.15 ? .85 : 1})`;
    const ob = document.getElementById('openBtn'); ob.style.boxShadow = t > 64.95 ? `0 0 ${30 + 20 * Math.sin(t * 8)}px rgba(255,220,120,.9)` : 'none';
    const b = pop(t, 66.85, 0, { from: .3 }); b.tr += ` scale(${1 + .04 * Math.sin(Math.max(0, t - 67.3) * 7)})`; ap(o.btn, b);
  }
});

// 16. OUTRO end card ---------------------------------------------------------------------------
scene({
  s: 68.27, e: 99, tr: 'slide', bgShow: 1,
  L: t => PIP(390, 470, 300),
  build(r, o) {
    o.wm = mk(r, `<img src="../adila_gold_wm.png" style="height:120px">`, 'left:60px;right:140px;top:830px;text-align:center');
    o.sub = mk(r, `<div style="color:#fff;font-weight:700;font-size:34px;letter-spacing:6px;text-align:center">DEALER AKTIF PUBLIC GOLD</div>`, 'left:60px;right:140px;top:980px');
    o.btn = mk(r, `<div class="btn" style="font-size:46px;padding:24px 46px">KLIK LINK IN BIO <span>👆</span></div>`, 'left:60px;right:140px;top:1290px;display:flex;justify-content:center');
  },
  upd(t, o) { ap(o.wm, pop(t, 68.4, 0, { from: .6 })); ap(o.sub, pop(t, 68.6, 0, { from: .8, dy: 20 })); ap(o.btn, { o: 1, tr: `scale(${1 + .04 * Math.sin(t * 7)})` }); }
});

// ---------------- Captions ----------------
const GROUPS = []; (function () { let g = [];
  for (let i = 0; i < W.length; i++) { g.push(W[i]); const gap = i + 1 < W.length ? W[i + 1].s - W[i].e : 9;
    const len = g.reduce((a, w) => a + w.w.length, 0);
    if (g.length >= 3 || len > 15 || gap > .3 || i == W.length - 1) { GROUPS.push(g); g = []; } } })();
const capEl = $('cap'); let lastCapKey = '';
const CAP_OFF = [[66.8, 99]];
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
  if (ci >= 0) { const k = Math.min(3, Math.floor((tn - CUTB[ci]) * FPS + 1e-6)); const s2 = `../tails/c${ci}_${k + 1}.jpg`;
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
  for (const ft of [4.04, 8.08, 21.47, 27.52, 36.7, 48.32, 54.6]) if (t >= ft && t < ft + .2) fl = Math.max(fl, .45 * (1 - (t - ft) / .2));
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
