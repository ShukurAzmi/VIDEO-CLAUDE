// Adila Gold — "Nilai Duit Semakin Kecil" (adila12). Masa = masa output (selepas potong jeda).
window.FLASH = [3.32, 22.06, 37.54, 64.14];
window.CAP_OFF = [[64.7, 69.55], [85.0, 99]];

const H1 = (txt, sz = 64, col = '#fff', extra = '') => `<div class="hl stroke" style="font-size:${sz}px;color:${col};text-align:center;white-space:nowrap;-webkit-text-stroke:4px #000;${extra}">${txt}</div>`;
const SERIF = (txt, sz = 80, col = '#F5C542') => `<div style="font-family:Play;font-style:italic;font-weight:800;font-size:${sz}px;color:${col};line-height:1.05;text-shadow:0 6px 18px rgba(0,0,0,.6)">${txt}</div>`;
const PILL = (html, sz = 40) => `<div class="glass" style="padding:14px 32px;color:#fff;font-weight:800;font-size:${sz}px;letter-spacing:1px;white-space:nowrap">${html}</div>`;
const CENTER = top => `left:60px;right:140px;top:${top}px;display:flex;justify-content:center`;
const NOTE = (lbl = 'RM1', w = 300) => `<svg width="${w}" height="${w * .5}" viewBox="0 0 300 150"><rect x="4" y="4" width="292" height="142" rx="14" fill="#8cc49a" stroke="#2f6b3a" stroke-width="6"/><rect x="18" y="18" width="264" height="114" rx="8" fill="none" stroke="#2f6b3a" stroke-width="2" stroke-dasharray="6 5"/><circle cx="230" cy="75" r="40" fill="#b6dcc0" stroke="#2f6b3a" stroke-width="4"/><text x="110" y="95" text-anchor="middle" font-family="Mont" font-weight="900" font-size="64" fill="#1f4d29">${lbl}</text></svg>`;
const COIN = (d = 120, lbl = '') => `<svg width="${d}" height="${d}" viewBox="0 0 120 120"><defs><radialGradient id="cg${d}" cx=".35" cy=".3"><stop offset="0" stop-color="#FFF3C4"/><stop offset=".55" stop-color="#F5C542"/><stop offset="1" stop-color="#A87410"/></radialGradient></defs><circle cx="60" cy="60" r="56" fill="url(#cg${d})" stroke="#7a5408" stroke-width="4"/><circle cx="60" cy="60" r="42" fill="none" stroke="#C9930F" stroke-width="3"/><text x="60" y="70" text-anchor="middle" font-family="Mont" font-weight="900" font-size="30" fill="#6b4806">${lbl}</text></svg>`;
const ROTI = (d = 210) => `<svg width="${d}" height="${d}" viewBox="0 0 210 210"><ellipse cx="105" cy="112" rx="100" ry="92" fill="#f4f1ea" stroke="#cfc8b8" stroke-width="4"/><ellipse cx="105" cy="108" rx="72" ry="64" fill="#E4B66A"/><path d="M60 100 Q105 60 150 104 Q110 150 70 118 Q100 88 132 108 Q104 128 86 110" fill="none" stroke="#B87A2A" stroke-width="7" stroke-linecap="round"/><circle cx="80" cy="84" r="6" fill="#c98e3c"/><circle cx="138" cy="132" r="5" fill="#c98e3c"/></svg>`;
const GBAR = (w = 300) => `<svg width="${w}" height="${w * .58}" viewBox="0 0 300 174"><defs><linearGradient id="gbF${w}" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stop-color="#FFF1B8"/><stop offset=".45" stop-color="#F5C542"/><stop offset="1" stop-color="#A87410"/></linearGradient><linearGradient id="gbT${w}" x1="0" x2="1"><stop offset="0" stop-color="#FFE48A"/><stop offset="1" stop-color="#E0A82E"/></linearGradient></defs><path d="M10 160 L50 40 L250 40 L290 160 Z" fill="url(#gbF${w})" stroke="#8a5d0a" stroke-width="5"/><path d="M50 40 L80 10 L220 10 L250 40 Z" fill="url(#gbT${w})" stroke="#8a5d0a" stroke-width="5"/><text x="150" y="98" text-anchor="middle" font-family="Mont" font-weight="900" font-size="27" fill="#6b4806" letter-spacing="1">PUBLIC GOLD</text><text x="150" y="134" text-anchor="middle" font-family="Mont" font-weight="700" font-size="20" fill="#6b4806">999.9</text></svg>`;
const XMARK = `<div style="width:70px;height:70px;border-radius:50%;background:#E53935;display:flex;align-items:center;justify-content:center;color:#fff;font-weight:900;font-size:46px;border:4px solid #fff">✕</div>`;
const TICK = `<div style="width:70px;height:70px;border-radius:50%;background:#1f8a3b;display:flex;align-items:center;justify-content:center;border:4px solid #fff"><svg width="40" height="40" viewBox="0 0 44 44"><path d="M8 23l9 9 19-20" stroke="#fff" stroke-width="7" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg></div>`;
const shk = (t, t0, a = 14) => { const s = t >= t0 ? Math.exp(-(t - t0) * 7) * a : 0; return `translate(${jit(t * 4, 1) * s}px,${jit(t * 4, 2) * s}px) `; };

// 1. HOOK: nilai duit semakin kecil ------------------------------------------------
scene({
  s: 0, e: 3.88, tr: 'cut', shade: 1,
  L: t => FULL(1.22 + .05 * P(t, 0, 3.8) + .08 * Math.exp(-Math.max(0, t - 3.32) * 5) * (t >= 3.32), 170),
  build(r, o) {
    o.a = mk(r, H1('PERNAH TERFIKIR TAK?', 50), CENTER(275));
    o.b = mk(r, H1('NILAI <span style="color:#F5C542">DUIT</span> KITA', 78), CENTER(345));
    o.n = mk(r, NOTE('RM1', 300), 'left:640px;top:470px;transform-origin:50% 50%');
    o.k = mk(r, H1('SEMAKIN KECIL', 96, '#F5C542', 'text-shadow:0 0 40px rgba(229,57,53,.6)'), CENTER(455));
  },
  upd(t, o) {
    ap(o.a, pop(t, 0.05, 3.2, { from: .7, dy: 30 }));
    ap(o.b, pop(t, 1.5, 0, { from: .4 }));
    const n = pop(t, 2.0, 3.2, { from: .3 }); const shrink = lerp(1, .35, eo(P(t, 2.8, .5)));
    n.tr += ` scale(${shrink}) rotate(${Math.sin(t * 3) * 4}deg)`; ap(o.n, n);
    const k = pop(t, 3.32, 0, { from: 2.2, ease: eo, d: .2 }); k.tr = shk(t, 3.32) + k.tr; ap(o.k, k);
  }
});

// 2. KERJA KUAT + SIMPANAN (checklist) ---------------------------------------------
scene({
  s: 3.88, e: 7.96, tr: 'slide', bgStyle: 'def',
  L: t => SPLITR(1.0 + .04 * P(t, 3.88, 4)),
  build(r, o) {
    o.t = mk(r, `<div style="font-weight:700;font-size:30px;letter-spacing:6px;color:#e8d9b0">CONTOH…</div>`, 'left:70px;top:300px');
    const row = (ic, a, b) => `<div class="glass" style="width:380px;padding:26px 24px;display:flex;flex-direction:column;gap:14px;align-items:flex-start">
      <div style="font-size:70px">${ic}</div><div class="hl" style="font-size:46px;color:#fff">${a}</div><div class="hl" style="font-size:52px;color:#F5C542">${b}</div></div>`;
    o.r1 = mk(r, row('💪', 'KERJA', 'KUAT'), 'left:60px;top:390px');
    o.r2 = mk(r, row('💰', 'BUAT', 'SIMPANAN'), 'left:60px;top:760px');
    o.t1 = mk(r, TICK, 'left:370px;top:370px'); o.t2 = mk(r, TICK, 'left:370px;top:740px');
  },
  upd(t, o) {
    ap(o.t, pop(t, 3.95, 0, { from: .8 }));
    ap(o.r1, pop(t, 4.85, 0, { from: .5, dy: 40 })); ap(o.r2, pop(t, 6.62, 0, { from: .5, dy: 40 }));
    ap(o.t1, pop(t, 5.4, 0, { from: .2 })); ap(o.t2, pop(t, 7.2, 0, { from: .2 }));
  }
});

// 3. KENAPA TAK PERNAH CUKUP -------------------------------------------------------
scene({
  s: 7.96, e: 12.11, tr: 'zoom', shade: 1, tint: 'rgba(40,70,120,.16)',
  L: t => FULL(1.14 + .08 * eio(P(t, 7.96, 4)), 170),
  grade: 'saturate(.7) contrast(1.05)',
  build(r, o) {
    o.a = mk(r, `<div style="font-family:Play;font-style:italic;font-weight:700;font-size:52px;color:#e8e2d4">in the end…</div>`, CENTER(278));
    o.q = mk(r, `<div style="font-family:Marker;font-size:120px;color:#F5C542;text-shadow:0 6px 0 #000">KENAPA?</div>`, CENTER(330));
    o.c = mk(r, `<div class="tape" style="font-size:52px;color:#ff6a5f;letter-spacing:5px">TAK PERNAH CUKUP</div>`, CENTER(462));
  },
  upd(t, o) {
    ap(o.a, pop(t, 8.3, 9.2, { from: .8, dy: 20 }));
    const q = pop(t, 9.24, 0, { from: .2, rot: -20 }); q.tr += ` rotate(${jit(t, 3) * 3}deg)`; ap(o.q, q);
    const c = pop(t, 10.9, 0, { from: 1.8, ease: eo, d: .2 }); c.tr += ' rotate(-2deg)'; ap(o.c, c);
  }
});

// 4. DULU: RM1 = 2 roti canai (sepia) ----------------------------------------------
scene({
  s: 12.11, e: 17.2, tr: 'slide', bgStyle: 'paper',
  L: t => PIP(650, 290, 270),
  build(r, o) {
    o.d = mk(r, `<div style="display:inline-block;padding:8px 26px;border:4px solid #e8d9b0;border-radius:10px;font-weight:900;font-size:44px;letter-spacing:10px;color:#e8d9b0;transform:rotate(-4deg)">DULU</div>`, 'left:80px;top:300px');
    o.sr = mk(r, SERIF('ingat tak?', 70, '#fff'), 'left:80px;top:400px');
    o.n = mk(r, NOTE('RM1', 360), 'left:80px;top:620px');
    o.eq = mk(r, `<div class="hl" style="font-size:110px;color:#F5C542">=</div>`, 'left:470px;top:650px');
    o.p1 = mk(r, ROTI(220), 'left:100px;top:880px'); o.p2 = mk(r, ROTI(220), 'left:360px;top:900px');
    o.lb = mk(r, H1('2 KEPING ROTI CANAI', 54, '#F5C542'), 'left:60px;top:1140px');
  },
  upd(t, o) {
    ap(o.d, pop(t, 12.2, 0, { from: .6 })); ap(o.sr, pop(t, 12.4, 0, { from: .8, dy: 20 }));
    const n = pop(t, 13.6, 0, { from: .3, rot: -12 }); n.tr += ` rotate(${Math.sin(t * 2) * 2}deg)`; ap(o.n, n);
    ap(o.eq, pop(t, 15.1, 0, { from: .4 }));
    ap(o.p1, pop(t, 15.6, 0, { from: .2, dy: -80 })); ap(o.p2, pop(t, 16.16, 0, { from: .2, dy: -80 }));
    ap(o.lb, pop(t, 16.44, 0, { from: .6 }));
  }
});

// 5. HARI INI: RM1 tak cukup 1 keping ----------------------------------------------
scene({
  s: 17.2, e: 23.17, tr: 'zoom', bgStyle: 'red',
  L: t => LOWER(1.0 + .04 * P(t, 17.2, 6)),
  build(r, o) {
    o.d = mk(r, `<div style="display:inline-block;padding:10px 26px;background:#E53935;border-radius:10px;font-weight:900;font-size:40px;letter-spacing:8px;color:#fff">HARI INI</div>`, 'left:80px;top:270px');
    o.n = mk(r, NOTE('RM1', 260), 'left:80px;top:370px');
    o.eq = mk(r, `<div class="hl" style="font-size:90px;color:#fff">=</div>`, 'left:375px;top:390px');
    o.p = mk(r, `<div style="position:relative;width:210px;height:210px">${ROTI(210)}<div class="hl" style="position:absolute;left:-10px;right:-10px;top:-40px;text-align:center;font-size:40px;color:#fff">1 KEPING?</div></div>`, 'left:470px;top:330px');
    o.st = mk(r, `<div class="stamp" style="font-size:88px;padding:4px 26px">TAK CUKUP!</div>`, 'left:200px;top:460px');
  },
  upd(t, o) {
    ap(o.d, pop(t, 17.3, 0, { from: .6 }));
    ap(o.n, pop(t, 18.87, 0, { from: .3, rot: 10 }));
    ap(o.eq, pop(t, 19.67, 0, { from: .4 }));
    const p = pop(t, 20.88, 0, { from: .2 }); const half = t > 21.9 ? .55 : 1; p.tr += ` scaleX(${lerp(1, half, eo(P(t, 21.9, .3)))})`; ap(o.p, p);
    const s = slam(t, 22.06, 0, -8); s.tr = shk(t, 22.06, 10) + s.tr; ap(o.st, s);
  }
});

// 6. TAK ADA SIAPA UMUM ------------------------------------------------------------
scene({
  s: 23.17, e: 26.89, tr: 'fade', shade: 1, tint: 'rgba(40,70,120,.14)',
  L: t => FULL(1.18 + .06 * P(t, 23.17, 3.7), 170),
  grade: 'saturate(.6) brightness(.95)',
  build(r, o) {
    o.a = mk(r, PILL('🤫 TAK ADA SIAPA <span class="gold">UMUM</span>', 50), CENTER(285));
    o.b = mk(r, SERIF('tak ada siapa bunyi…', 70, '#fff'), CENTER(400));
  },
  upd(t, o) {
    ap(o.a, pop(t, 24.0, 0, { from: .7 }));
    const b = pop(t, 25.74, 0, { from: .9, dy: 30, ease: eo, d: .6 }); b.tr += ` translateY(${Math.sin(t * 1.5) * 5}px)`; ap(o.b, b);
  }
});

// 7. GAJI vs BELANJA (bar race) ----------------------------------------------------
scene({
  s: 26.89, e: 32.98, tr: 'slide', bgStyle: 'def',
  L: t => PIP(90, 290, 260),
  build(r, o) {
    o.yr = mk(r, `<div style="font-weight:700;font-size:28px;letter-spacing:6px;color:#e8d9b0">TAHUN</div><div class="hl yrN" style="font-size:96px;color:#fff">2015</div>`, 'left:400px;top:300px');
    o.m = mk(r, H1('SEMUA DAH MAHAL', 52, '#ff6a5f'), 'left:400px;top:440px');
    const bar = (lbl, col, cls) => `<div style="display:flex;align-items:center;gap:20px;margin-bottom:46px"><div class="hl" style="width:250px;font-size:48px;color:#fff">${lbl}</div>
      <div style="width:540px;height:80px;border-radius:16px;background:rgba(255,255,255,.08);border:2px solid rgba(255,255,255,.15);overflow:hidden;position:relative"><div class="${cls}" style="height:100%;width:0;background:${col}"></div></div>
      <div class="hl ${cls}A" style="font-size:66px;color:${col.includes('E53935') ? '#ff6a5f' : '#F5C542'};width:80px"></div></div>`;
    o.ch = mk(r, `<div class="glass" style="padding:40px 30px 0;width:960px">${bar('GAJI', 'linear-gradient(90deg,#C9930F,#FFE48A)', 'bG')}${bar('BELANJA', 'linear-gradient(90deg,#7a1010,#E53935)', 'bB')}</div>`, 'left:60px;top:640px');
  },
  upd(t, o) {
    o.yr.querySelector('.yrN').textContent = 2015 + Math.round(11 * eio(P(t, 26.9, 5)));
    ap(o.yr, pop(t, 26.95, 0, { from: .8 })); ap(o.m, pop(t, 28.29, 0, { from: .4 }));
    ap(o.ch, pop(t, 28.7, 0, { from: .9, dy: 60, ease: eo }));
    const g = 30 * eo(P(t, 29.5, 1.0)), b = 95 * eio(P(t, 30.9, 1.4));
    r_ = o.ch; r_.querySelector('.bG').style.width = (25 + g) + '%'; r_.querySelector('.bB').style.width = (25 + b * .75) + '%';
    r_.querySelector('.bGA').textContent = t > 29.5 ? '↑' : ''; r_.querySelector('.bBA').textContent = t > 30.9 ? '⇈' : '';
  }
});
var r_;

// 8. TOLAK SANA SINI -> KOSONG (receipt) -------------------------------------------
scene({
  s: 32.98, e: 38.36, tr: 'zoom', bgStyle: 'paper',
  L: t => SPLITR(1.0 + .04 * P(t, 32.98, 5)),
  build(r, o) {
    const ln = (a, b, c) => `<div class="${c}" style="display:flex;justify-content:space-between;font-family:monospace;font-weight:700;font-size:34px;color:#222;padding:10px 0;border-bottom:2px dashed #bbb"><span>${a}</span><span style="color:#c62828">${b}</span></div>`;
    o.rc = mk(r, `<div style="width:380px;padding:30px 26px 40px;background:#fbf8f1;box-shadow:0 20px 40px rgba(0,0,0,.5);clip-path:polygon(0 0,100% 0,100% 97%,92% 100%,84% 97%,76% 100%,68% 97%,60% 100%,52% 97%,44% 100%,36% 97%,28% 100%,20% 97%,12% 100%,4% 97%,0 100%)">
      <div style="text-align:center;font-family:monospace;font-weight:900;font-size:36px;color:#111;letter-spacing:4px">GAJI BULAN INI</div>
      <div style="text-align:center;font-family:monospace;font-size:24px;color:#666;margin-bottom:10px">— kira-kira —</div>
      ${ln('TOLAK SANA', '−', 'l1')}${ln('TOLAK SINI', '−', 'l2')}${ln('TOLAK LAGI', '−', 'l3')}
      <div style="display:flex;justify-content:space-between;font-family:monospace;font-weight:900;font-size:44px;color:#111;padding-top:18px"><span>BAKI</span><span class="bk">…</span></div></div>`, 'left:60px;top:360px;transform-origin:50% 0');
    o.k = mk(r, `<div class="stamp" style="font-size:72px;padding:4px 22px">KOSONG</div>`, 'left:60px;top:920px');
    o.h = mk(r, H1('HUJUNG BULAN', 46), 'left:60px;top:1110px;width:420px');
  },
  upd(t, o) {
    const p = eo(P(t, 33.0, .5)); o.rc.style.opacity = C(p * 2); o.rc.style.transform = `translateY(${lerp(-300, 0, p)}px) rotate(${-2 + Math.sin(t) * .6}deg)`;
    ['.l1', '.l2', '.l3'].forEach((c, i) => { const el = o.rc.querySelector(c); el.style.opacity = C(P(t, [34.63, 35.41, 35.9][i], .15)); });
    o.rc.querySelector('.bk').textContent = t > 37.54 ? 'RM0' : '…'; o.rc.querySelector('.bk').style.color = t > 37.54 ? '#c62828' : '#111';
    ap(o.h, pop(t, 36.27, 0, { from: .6 }));
    const s = slam(t, 37.54, 0, -9); s.tr = shk(t, 37.54, 10) + s.tr; ap(o.k, s);
  }
});

// 9. YANG PALING SAKIT (punch-in) --------------------------------------------------
scene({
  s: 38.36, e: 42.4, tr: 'zoom', shade: 1, tint: 'rgba(200,30,30,.18)',
  L: t => FULL(1.24 + .1 * eio(P(t, 38.36, 4)) + .05 * Math.sin(Math.max(0, t - 38.98) * 7) * Math.exp(-Math.max(0, t - 38.98) * 3) * (t > 38.98), 170),
  grade: 'saturate(.85) contrast(1.1)',
  build(r, o) {
    o.a = mk(r, H1('YANG PALING', 56), CENTER(275));
    o.b = mk(r, H1('SAKIT 💔', 110, '#ff5a52'), CENTER(340));
    o.c = mk(r, PILL('DUIT SIMPAN <span class="gold">BERTAHUN-TAHUN</span>', 40), CENTER(495));
  },
  upd(t, o) {
    ap(o.a, pop(t, 38.6, 0, { from: .7, dy: 20 }));
    const b = pop(t, 38.98, 0, { from: 2.2, ease: eo, d: .2 }); b.tr = shk(t, 38.98, 10) + b.tr + ` scale(${1 + .04 * Math.max(0, Math.sin((t - 38.98) * 7))})`; ap(o.b, b);
    ap(o.c, pop(t, 41.14, 0, { from: .5 }));
  }
});

// 10. NOMBOR SAMA, BOLEH BELI MAKIN SIKIT (basket) ---------------------------------
scene({
  s: 42.4, e: 46.46, tr: 'slide', bgStyle: 'def',
  L: t => CARDBR(),
  build(r, o) {
    o.n = mk(r, `<div class="glass" style="padding:24px 34px;display:flex;align-items:center;gap:26px"><div><div style="font-weight:700;font-size:26px;letter-spacing:5px;color:#e8d9b0">NOMBOR DIA</div><div class="hl" style="font-size:84px;color:#fff">RM 1,000</div></div>
      <div class="sm" style="padding:10px 20px;border-radius:12px;background:#1f8a3b;color:#fff;font-weight:900;font-size:38px">SAMA</div></div>`, 'left:60px;top:290px');
    o.l = mk(r, `<div style="font-weight:800;font-size:34px;letter-spacing:3px;color:#fff">YANG BOLEH DIBELI:</div>`, 'left:70px;top:540px');
    const IT = ['🍚', '🥚', '🍞', '🥛', '🧴', '🍗'];
    o.it = IT.map((e, i) => mk(r, `<div style="width:130px;height:130px;border-radius:24px;background:rgba(255,255,255,.1);border:2px solid rgba(245,197,66,.4);display:flex;align-items:center;justify-content:center;font-size:76px">${e}</div>`, `left:${70 + (i % 3) * 150}px;top:${610 + Math.floor(i / 3) * 150}px`));
    o.m = mk(r, H1('MAKIN SIKIT ↓', 52, '#ff6a5f'), 'left:60px;top:930px');
  },
  upd(t, o) {
    ap(o.n, pop(t, 42.4, 0, { from: .8, dy: -20 }));
    o.n.querySelector('.sm').style.opacity = C(P(t, 43.35, .15));
    ap(o.l, pop(t, 43.8, 0, { from: .8 }));
    o.it.forEach((d, i) => { const a = pop(t, 44.0 + i * .06, 0, { from: .3 }); const gone = [45.35, 45.6, 45.85, 46.0][5 - i] || 0; const k = gone ? P(t, gone, .2) : 0;
      a.o *= 1 - k; a.tr += ` translateY(${k * 80}px) scale(${1 - k * .5})`; ap(d, a); });
    ap(o.m, pop(t, 45.93, 0, { from: .4 }));
  }
});

// 11. PENAT KITA IKUT MENGECIL ------------------------------------------------------
scene({
  s: 46.46, e: 49.39, tr: 'zoom', shade: 1,
  L: t => FULL(1.3 - .14 * eio(P(t, 46.46, 2.9)), 170),
  grade: 'saturate(.8)',
  build(r, o) {
    o.a = mk(r, H1('PENAT KITA', 80), CENTER(280));
    o.b = mk(r, H1('IKUT MENGECIL', 100, '#F5C542'), CENTER(380));
  },
  upd(t, o) {
    ap(o.a, pop(t, 46.74, 0, { from: .5 }));
    const b = pop(t, 47.54, 0, { from: .6 }); b.tr += ` scale(${lerp(1, .5, eo(P(t, 47.9, .8)))})`; ap(o.b, b);
  }
});

// 12. BUKAN MALAS, BUKAN BOROS ------------------------------------------------------
scene({
  s: 49.39, e: 52.53, tr: 'slide', bgStyle: 'night',
  L: t => LOWER(1.0 + .03 * P(t, 49.39, 3)),
  build(r, o) {
    const tag = (w) => `<div style="display:flex;align-items:center;gap:22px;padding:20px 34px;border-radius:22px;background:rgba(10,14,28,.85);border:3px solid rgba(160,190,255,.45);box-shadow:0 14px 30px rgba(0,0,0,.4)">${XMARK}<span class="hl" style="font-size:62px;color:#fff">KITA BUKAN <span style="color:#F5C542">${w}</span></span></div>`;
    o.a = mk(r, tag('MALAS'), 'left:80px;top:300px'); o.b = mk(r, tag('BOROS'), 'left:80px;top:480px');
  },
  upd(t, o) {
    [50.05, 51.99].forEach((s, i) => { const st = pop(t, s, 0, { from: .6, ease: eo, d: .3 }); st.tr = `translateX(${lerp(-800, 0, eo(P(t, s, .35)))}px)`; ap([o.a, o.b][i], st); });
  }
});

// 13. SENYAP-SENYAP HILANG (note dissolves) -----------------------------------------
scene({
  s: 52.53, e: 57.11, tr: 'fade', shade: 1, tint: 'rgba(30,50,110,.18)',
  L: t => FULL(1.2 + .06 * P(t, 52.53, 4.6), 170),
  grade: 'saturate(.55) brightness(.94)',
  build(r, o) {
    o.n = mk(r, NOTE('RM', 340), 'left:370px;top:285px');
    o.pt = mk(r, Array.from({ length: 26 }, (_, i) => `<i style="position:absolute;width:${8 + i % 4 * 4}px;height:${8 + i % 4 * 4}px;background:#8cc49a;border-radius:2px"></i>`).join(''), 'left:0;top:0;width:1080px;height:1920px');
    o.a = mk(r, SERIF('senyap-senyap…', 76, '#fff'), CENTER(300));
    o.b = mk(r, H1('HILANG', 120, '#ff5a52'), CENTER(400));
  },
  upd(t, o) {
    const n = pop(t, 52.6, 0, { from: .7 }); const dis = P(t, 54.85, .9);
    n.o *= 1 - dis; n.tr += ` rotate(${Math.sin(t * 2) * 3}deg) scale(${1 - dis * .2})`; ap(o.n, n);
    [...o.pt.children].forEach((d, i) => { const k = P(t, 54.85 + (i % 7) * .05, 1.3); d.style.left = (420 + (i * 37) % 260 + k * (i % 2 ? 1 : -1) * (60 + i * 9)) + 'px'; d.style.top = (320 + (i * 53) % 150 - k * (80 + i * 6)) + 'px'; d.style.opacity = k > 0 && k < 1 ? (1 - k) : 0; d.style.transform = `rotate(${k * 300 + i * 20}deg)`; });
    const a = pop(t, 54.85, 0, { from: .9, ease: eo, d: .5 }); a.tr += ` translateY(${Math.sin(t * 1.4) * 5}px)`; ap(o.a, a);
    ap(o.b, pop(t, 55.82, 0, { from: 1.8, ease: eo, d: .2 }));
  }
});

// 14. JADI... SELAMA NI -------------------------------------------------------------
scene({
  s: 57.11, e: 60.52, tr: 'zoom',
  L: t => FULL(1.02 + .06 * P(t, 57.11, 3.4), 0),
  build(r, o) { o.a = mk(r, PILL('JADI, <span class="gold">SELAMA NI…</span>', 48), CENTER(290)); },
  upd(t, o) { ap(o.a, pop(t, 57.2, 0, { from: .6 })); }
});

// 15. BENTUK LAIN? -> EMAS -----------------------------------------------------------
scene({
  s: 60.52, e: 64.77, tr: 'slide', bgStyle: 'def',
  L: t => SPLITR(1.0 + .04 * P(t, 60.52, 4)),
  build(r, o) {
    o.a = mk(r, `<div class="hl" style="font-size:46px;color:#fff">KENAPA TAK</div><div class="hl" style="font-size:46px;color:#fff">CUBA SIMPAN</div>${SERIF('bentuk lain?', 68)}`, 'left:60px;top:300px');
    o.glow = mk(r, `<div style="width:460px;height:460px;border-radius:50%;background:radial-gradient(circle,rgba(255,220,120,.6),rgba(255,200,80,0) 65%)"></div>`, 'left:-10px;top:620px');
    o.bar = mk(r, GBAR(360), 'left:40px;top:760px;transform-origin:50% 80%');
    o.lb = mk(r, H1('EMAS', 130, '#F5C542'), 'left:60px;top:990px;width:360px');
    o.sp = mk(r, Array.from({ length: 14 }, (_, i) => `<i style="position:absolute;width:${6 + i % 3 * 4}px;height:${6 + i % 3 * 4}px;border-radius:50%;background:#FFE48A;box-shadow:0 0 12px #F5C542"></i>`).join(''), 'left:0;top:0;width:1080px;height:1920px');
  },
  upd(t, o) {
    ap(o.a, pop(t, 60.6, 0, { from: .8, dy: 30 }));
    const b = pop(t, 64.14, 0, { from: .2, d: .45 }); b.tr += ` rotate(${Math.sin(t * 2) * 2}deg)`; ap(o.bar, b);
    o.glow.style.opacity = C(P(t, 64.14, .4)) * (.75 + .25 * Math.sin(t * 5));
    ap(o.lb, pop(t, 64.2, 0, { from: .3 }));
    [...o.sp.children].forEach((d, i) => { const ph = ((t - 64.14) * .35 + i * .071) % 1; d.style.left = (60 + (i * 61) % 400) + 'px'; d.style.top = (1150 - ph * 600) + 'px'; d.style.opacity = t > 64.14 ? Math.sin(ph * Math.PI) * .9 : 0; });
  }
});

// 16. "MACAM NI" — dia tunjuk kad emas (JANGAN tutup tangan/kad; kapsyen OFF) -------
scene({
  s: 64.77, e: 69.55, tr: 'cut', tint: 'rgba(255,190,80,.08)',
  L: t => FULL(1.0, 0), grade: 'saturate(1.08) brightness(1.03)',
  build(r, o) {
    o.a = mk(r, PILL('✨ MACAM NI <span class="gold">👇</span>', 46), CENTER(262));
    o.b = mk(r, PILL('EMAS <span class="gold">DIHARGAI</span> SEJAK DULU', 40), CENTER(262));
    o.ar = mk(r, `<svg width="150" height="260" viewBox="0 0 150 260"><path d="M30 10 C 120 60, 130 150, 70 230" stroke="#F5C542" stroke-width="12" fill="none" stroke-linecap="round" pathLength="1" stroke-dasharray="1" class="arP"/><path d="M40 205 L70 235 L100 200" stroke="#F5C542" stroke-width="12" fill="none" stroke-linecap="round" stroke-linejoin="round" class="arH"/></svg>`, 'left:790px;top:860px');
    o.ok = mk(r, `<div style="padding:12px 24px;border-radius:999px;background:linear-gradient(135deg,#FFE48A,#F5C542 40%,#C9930F);color:#1a1205;font-weight:900;font-size:36px;white-space:nowrap">EMAS ✓</div>`, 'left:760px;top:790px');
  },
  upd(t, o) {
    ap(o.a, pop(t, 64.85, 66.0, { from: .6 }));
    ap(o.b, pop(t, 66.06, 0, { from: .6 }));
    const p = eo(P(t, 65.1, .5)); o.ar.querySelector('.arP').setAttribute('stroke-dashoffset', 1 - p); o.ar.querySelector('.arH').style.opacity = p > .95 ? 1 : 0;
    ap(o.ok, pop(t, 65.3, 0, { from: .4 }));
  }
});

// 17. TAK PERLU BANYAK, MULA SIKIT (coin stack) --------------------------------------
scene({
  s: 69.55, e: 73.07, tr: 'zoom', bgStyle: 'green',
  L: t => LOWER(1.0 + .04 * P(t, 69.55, 3.5)),
  build(r, o) {
    o.a = mk(r, `<div class="hl" style="font-size:50px;color:#fff">TAK PERLU BANYAK</div>${SERIF('mula dengan sikit', 76)}`, 'left:80px;top:290px');
    o.c = [0, 1, 2, 3, 4].map(i => mk(r, `<div style="width:170px;height:44px;border-radius:50%;background:linear-gradient(#FFE48A,#C9930F);border:3px solid #8a5d0a;box-shadow:0 4px 0 #8a5d0a"></div>`, `left:680px;top:${620 - i * 30}px`));
    o.ck = mk(r, `<div style="padding:10px 24px;border-radius:14px;background:#1f8a3b;color:#fff;font-weight:900;font-size:40px">JADILAH ✓</div>`, 'left:660px;top:470px');
  },
  upd(t, o) {
    ap(o.a, pop(t, 69.6, 0, { from: .8, dy: 30 }));
    o.c.forEach((d, i) => { const s = 70.5 + i * .25; const p = eo(P(t, s, .3)); d.style.opacity = C(P(t, s, .05)); d.style.transform = `translateY(${lerp(-400, 0, p)}px)`; });
    ap(o.ck, pop(t, 71.78, 0, { from: .3 }));
  }
});

// 18. PENAT KITA TAK HILANG -------------------------------------------------------------
scene({
  s: 73.07, e: 75.58, tr: 'zoom', shade: 1, tint: 'rgba(255,190,80,.10)',
  L: t => FULL(1.16 + .06 * P(t, 73.07, 2.5), 170),
  grade: 'saturate(1.12) brightness(1.04)',
  build(r, o) {
    o.a = mk(r, H1('ASALKAN PENAT KITA', 52), CENTER(280));
    o.b = mk(r, `<div style="display:flex;align-items:center;gap:20px">${TICK}${H1('TAK HILANG', 100, '#F5C542')}</div>`, CENTER(355));
    o.sp = mk(r, Array.from({ length: 16 }, (_, i) => `<i style="position:absolute;width:${6 + i % 4 * 3}px;height:${6 + i % 4 * 3}px;border-radius:50%;background:#FFE48A;box-shadow:0 0 12px #F5C542"></i>`).join(''), 'left:0;top:0;width:1080px;height:1920px');
  },
  upd(t, o) {
    ap(o.a, pop(t, 73.1, 0, { from: .7, dy: 20 }));
    ap(o.b, pop(t, 74.17, 0, { from: .3 }));
    [...o.sp.children].forEach((d, i) => { const ph = (t * .14 + i * .131) % 1; d.style.left = (80 + (i * 211) % 840) + 'px'; d.style.top = (1200 - ph * 900) + 'px'; d.style.opacity = Math.sin(ph * Math.PI) * .8 * C(P(t, 74.2, .5)); });
  }
});

// 19. BERMANFAAT? SAVE & SHARE --------------------------------------------------------
scene({
  s: 75.58, e: 81.83, tr: 'slide', bgStyle: 'def',
  L: t => PIP(650, 290, 270),
  build(r, o) {
    o.a = mk(r, `<div class="hl" style="font-size:50px;color:#fff">VIDEO NI</div>${SERIF('bermanfaat?', 86)}`, 'left:80px;top:310px');
    const B = (ic, lbl) => `<div style="display:flex;flex-direction:column;align-items:center;gap:14px"><div class="bt" style="width:200px;height:200px;border-radius:50%;background:rgba(255,255,255,.1);border:4px solid #F5C542;display:flex;align-items:center;justify-content:center">${ic}</div><div class="hl" style="font-size:52px;color:#fff">${lbl}</div></div>`;
    const SAVE = '<svg width="100" height="110" viewBox="0 0 24 26"><path d="M5 2h14v22l-7-5-7 5z" fill="#F5C542"/></svg>';
    const SHR = '<svg width="110" height="110" viewBox="0 0 24 24"><path fill="#F5C542" d="M14 4l8 7-8 7v-4.2C8.5 13.8 5 15.6 2 20c1-6 4.5-10.6 12-11.6z"/></svg>';
    o.s1 = mk(r, B(SAVE, 'SAVE'), 'left:150px;top:620px'); o.s2 = mk(r, B(SHR, 'SHARE'), 'left:560px;top:620px');
    o.f = mk(r, PILL('KEPADA <span class="gold">RAKAN ANDA</span> 🤝', 44), CENTER(960));
    o.h = mk(r, `<div style="font-size:90px;filter:drop-shadow(0 6px 10px rgba(0,0,0,.5))">👆</div>`, 'left:0;top:0');
  },
  upd(t, o) {
    ap(o.a, pop(t, 75.7, 0, { from: .8, dy: 30 }));
    ap(o.s1, pop(t, 79.6, 0, { from: .3 })); ap(o.s2, pop(t, 80.1, 0, { from: .3 }));
    const hit = (el, tt) => { const b = el.querySelector('.bt'); const on = t > tt; b.style.background = on ? 'linear-gradient(135deg,#FFE48A,#C9930F)' : 'rgba(255,255,255,.1)'; b.firstChild.style && (b.querySelector('path').style.fill = on ? '#1a1205' : '#F5C542'); b.style.transform = `scale(${t > tt && t < tt + .15 ? .9 : 1})`; };
    hit(o.s1, 79.93); hit(o.s2, 80.39);
    const hx = t < 80.2 ? 260 : 670, hy = 790; const ap_ = pop(t, 79.7, 81.6, { from: .8 });
    o.h.style.opacity = ap_.o; o.h.style.transform = `translate(${lerp(hx + 40, hx, C(P(t, t < 80.2 ? 79.75 : 80.2, .18)))}px,${hy}px)`;
    ap(o.f, pop(t, 80.73, 0, { from: .6 }));
  }
});

// 20. CTA: nak bermula, klik -------------------------------------------------------------
scene({
  s: 81.83, e: 85.0, tr: 'zoom',
  L: t => FULL(1.04 + .04 * P(t, 81.83, 3.2), 0),
  build(r, o) {
    o.a = mk(r, PILL('NAK <span class="gold">MULA SIMPAN EMAS?</span>', 44), CENTER(285));
    o.b = mk(r, `<div class="btn" style="font-size:48px;padding:24px 44px">KLIK LINK DI BIO <span>👆</span></div>`, CENTER(1130));
    o.by = mk(r, `<div style="font-family:Marker;font-size:110px;color:#F5C542;text-shadow:0 6px 0 #000;transform:rotate(-8deg)">bye! 👋</div>`, 'left:700px;top:380px');
  },
  upd(t, o) {
    ap(o.a, pop(t, 82.0, 0, { from: .6 }));
    const b = pop(t, 84.21, 0, { from: .3 }); b.tr += ` scale(${1 + .04 * Math.sin(Math.max(0, t - 84.6) * 7)})`; ap(o.b, b);
    ap(o.by, pop(t, 84.73, 0, { from: .3, rot: 20 }));
  }
});

// 21. OUTRO end card ------------------------------------------------------------------------
scene({
  s: 85.0, e: 99, tr: 'slide', bgStyle: 'def',
  L: t => PIP(390, 420, 300),
  build(r, o) {
    o.wm = mk(r, `<img src="../adila_gold_wm.png" style="height:120px">`, 'left:60px;right:140px;top:780px;text-align:center');
    o.sub = mk(r, `<div style="color:#fff;font-weight:700;font-size:34px;letter-spacing:6px;text-align:center">DEALER AKTIF PUBLIC GOLD</div>`, 'left:60px;right:140px;top:930px');
    o.btn = mk(r, `<div class="btn" style="font-size:46px;padding:24px 46px">KLIK LINK DI BIO <span>👆</span></div>`, CENTER(1080));
  },
  upd(t, o) { ap(o.wm, pop(t, 85.1, 0, { from: .6 })); ap(o.sub, pop(t, 85.3, 0, { from: .8, dy: 20 })); ap(o.btn, { o: C(P(t, 85.4, .3)), tr: `scale(${1 + .04 * Math.sin(t * 7)})` }); }
});
