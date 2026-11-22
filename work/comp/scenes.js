// Adila Gold — "Susah Nak Simpan Duit?" (Yaya edit, adila13). Times = output seconds.
window.FLASH = [0.96, 8.39, 16.59, 32.6, 46.27, 62.92];
window.CAP_OFF = [[97.75, 120]];

const GOLDBAR = (w = 260, id = 'a') => `<svg width="${w}" height="${w * 150 / 260}" viewBox="0 0 260 150"><defs><linearGradient id="gb${id}" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stop-color="#FFF1B8"/><stop offset=".45" stop-color="#F5C542"/><stop offset="1" stop-color="#A87410"/></linearGradient><linearGradient id="gt${id}" x1="0" x2="1"><stop offset="0" stop-color="#FFE48A"/><stop offset="1" stop-color="#E0A82E"/></linearGradient></defs><path d="M40 40 L220 40 L250 140 L10 140 Z" fill="url(#gb${id})" stroke="#8a5e08" stroke-width="4"/><path d="M40 40 L220 40 L205 10 L55 10 Z" fill="url(#gt${id})" stroke="#8a5e08" stroke-width="4"/><text x="130" y="105" text-anchor="middle" font-family="Mont" font-weight="900" font-size="25" fill="#7a5200" letter-spacing="2">PUBLIC GOLD</text><text x="130" y="128" text-anchor="middle" font-family="Mont" font-weight="700" font-size="16" fill="#7a5200">999.9</text></svg>`;
const CTR = 'left:60px;right:140px;display:flex;justify-content:center;';
const $$ = id => document.getElementById(id);

// 1. HOOK: SUSAH NAK SIMPAN DUIT? -----------------------------------------------------------
scene({
  s: 0, e: 3.32, tr: 'cut', shade: 1,
  L: t => FULL(1.2 + .05 * P(t, 0, 3.3) + .08 * Math.exp(-Math.max(0, t - .96) * 5) * (t >= .96), 280),
  build(r, o) {
    o.q = mk(r, `<div style="font-weight:800;font-size:52px;color:#fff;letter-spacing:2px;white-space:nowrap;text-shadow:0 4px 14px rgba(0,0,0,.8)">PERNAH RASA…</div>`, CTR + 'top:262px');
    o.st = mk(r, `<div class="stamp" style="font-size:100px">SUSAH!</div>`, CTR + 'top:330px');
    o.d = mk(r, `<div style="font-family:Marker;font-size:72px;color:#F5C542;text-shadow:0 7px 0 #000;white-space:nowrap">nak simpan duit? 💸</div>`, CTR + 'top:490px');
  },
  upd(t, o) {
    ap(o.q, pop(t, 0.02, 0, { from: .6, dy: -20 }));
    ap(o.st, slam(t, .96, 0, -6));
    const d = pop(t, 2.4, 0, { from: .5, rot: 6 }); d.tr += ` rotate(${Math.sin(t * 3) * 1.5}deg)`; ap(o.d, d);
  }
});

// 2. MULA SIMPAN progress bar (stuck) --------------------------------------------------------
scene({
  s: 3.32, e: 6.43, tr: 'zoom', bgStyle: 'def',
  L: t => PIP(650, 280, 280),
  build(r, o) {
    o.t = mk(r, `<div style="font-weight:700;font-size:30px;letter-spacing:6px;color:#e8d9b0">SETIAP KALI</div><div class="hl" style="font-size:82px;color:#fff">NAK MULA</div><div class="hl" style="font-size:82px;color:#F5C542">SIMPAN…</div>`, 'left:80px;top:300px');
    o.bar = mk(r, `<div class="glass" style="width:820px;padding:30px 34px">
      <div style="display:flex;justify-content:space-between;font-weight:800;font-size:36px;color:#fff"><span>💰 SIMPANAN</span><span id="pc">0%</span></div>
      <div style="margin-top:18px;height:56px;border-radius:30px;background:rgba(0,0,0,.5);overflow:hidden;border:3px solid rgba(245,197,66,.6)"><div id="pb" style="height:100%;width:0;background:repeating-linear-gradient(45deg,#F5C542 0 26px,#D9A93A 26px 52px)"></div></div>
      <div id="pe" style="margin-top:16px;font-weight:800;font-size:34px;color:#ff8a80;opacity:0">⚠ ADA HALANGAN…</div></div>`, 'left:90px;top:700px');
  },
  upd(t, o) {
    ap(o.t, pop(t, 3.35, 0, { from: .7, dy: 30 }));
    ap(o.bar, pop(t, 4.34, 0, { from: .6, dy: 50 }));
    const p = t < 5.3 ? 30 * eo(P(t, 4.6, .7)) : 30 - 18 * eo(P(t, 5.9, .4));
    $$('pb').style.width = p + '%'; $$('pc').textContent = Math.round(p) + '%';
    $$('pe').style.opacity = C(P(t, 5.9, .2));
  }
});

// 3. HALANGAN: road block barriers ------------------------------------------------------------
scene({
  s: 6.43, e: 9.93, tr: 'slide', bgStyle: 'red',
  L: t => LOWER(1.0 + .04 * P(t, 6.43, 3.5)),
  build(r, o) {
    o.h = mk(r, `<div class="hl stroke" style="font-size:66px;color:#fff;white-space:nowrap;-webkit-text-stroke:4px #000">MACAM-MACAM</div>`, CTR + 'top:270px');
    const bar = `<svg width="230" height="150" viewBox="0 0 230 150"><rect x="20" y="70" width="14" height="80" fill="#ccc"/><rect x="196" y="70" width="14" height="80" fill="#ccc"/><rect x="5" y="30" width="220" height="56" rx="8" fill="#fff" stroke="#222" stroke-width="4"/><g fill="#E53935"><path d="M15 30h40l-40 56z"/><path d="M75 30h40l-40 56h-40z"/><path d="M135 30h40l-40 56h-40z"/><path d="M195 30h30v12l-30 44h-40z"/></g></svg>`;
    o.b = [0, 1, 2].map(i => mk(r, bar, `left:${90 + i * 280}px;top:500px;transform-origin:50% 100%`));
    o.lb = mk(r, `<div class="tape" style="font-size:64px;background:#E53935;color:#fff;text-shadow:none;white-space:nowrap">🚧 HALANGAN 🚧</div>`, CTR + 'top:370px');
  },
  upd(t, o) {
    ap(o.h, pop(t, 6.5, 0, { from: .6, dy: -20 }));
    [7.73, 8.05, 8.39].forEach((s, i) => { const st = pop(t, s, 0, { from: .2, d: .3 }); st.tr += ` rotate(${(i - 1) * 4}deg)`; ap(o.b[i], st); });
    ap(o.lb, slam(t, 8.39, 0, -3));
  }
});

// 4. BETUL TAK? SETUJU TAK? poll ---------------------------------------------------------------
scene({
  s: 9.93, e: 11.41, tr: 'zoom', shade: 1,
  L: t => FULL(1.28, 220),
  build(r, o) {
    o.p = mk(r, `<div style="width:760px;padding:26px 30px;border-radius:30px;background:rgba(255,255,255,.95);box-shadow:0 18px 40px rgba(0,0,0,.5)">
      <div style="font-weight:900;font-size:44px;color:#1a1205">BETUL TAK? 🤔</div>
      <div style="margin-top:16px;position:relative;height:70px;border-radius:16px;background:#eee;overflow:hidden"><div id="pv" style="position:absolute;inset:0;width:0;background:#F5C542"></div><div style="position:relative;padding:12px 20px;font-weight:900;font-size:38px;color:#1a1205;display:flex;justify-content:space-between"><span>✋ SETUJU!</span><span id="pn">0%</span></div></div></div>`, 'left:100px;top:280px');
  },
  upd(t, o) {
    ap(o.p, pop(t, 9.95, 0, { from: .5 }));
    const v = eo(P(t, 10.55, .7)) * 97; $$('pv').style.width = v + '%'; $$('pn').textContent = Math.round(v) + '%';
  }
});

// 5. DAH CUBA — percubaan counter ---------------------------------------------------------------
scene({
  s: 11.41, e: 15.49, tr: 'slide', bgStyle: 'def',
  L: t => SPLITR(1.0 + .04 * P(t, 11.41, 4)),
  build(r, o) {
    o.h = mk(r, `<div class="hl" style="font-size:62px;color:#fff;line-height:1.05">KITA<br><span class="gold">DAH CUBA</span><br>DAH PUN!</div>`, 'left:70px;top:290px');
    o.rows = [1, 2, 3].map(i => mk(r, `<div class="flag" style="width:370px;font-size:38px;padding:16px 22px"><div class="x" style="width:58px;height:58px;font-size:38px">✕</div>CUBAAN #${i}</div>`, `left:60px;top:${640 + i * 120}px`));
    o.lb = mk(r, `<div style="font-family:Marker;font-size:56px;color:#F5C542;text-shadow:0 5px 0 #000;white-space:nowrap">bukan sekali dua…</div>`, 'left:60px;top:1160px');
  },
  upd(t, o) {
    ap(o.h, pop(t, 11.45, 0, { from: .6, dy: 30 }));
    [12.31, 14.43, 14.71].forEach((s, i) => ap(o.rows[i], pop(t, s, 0, { from: .4, rot: -4 })));
    ap(o.lb, pop(t, 14.2, 0, { from: .6 }));
  }
});

// 6. TEKAD — azam bulan ni ------------------------------------------------------------------------
scene({
  s: 15.49, e: 19.81, tr: 'zoom', bgStyle: 'paper',
  L: t => CARDBR(),
  build(r, o) {
    o.n = mk(r, `<div style="position:relative;width:760px;padding:40px 44px 46px;background:#FFF6D8;color:#2a1a05;box-shadow:0 20px 40px rgba(0,0,0,.5);border-radius:6px;background-image:repeating-linear-gradient(transparent 0 58px,rgba(80,120,200,.25) 58px 60px)">
      <div style="position:absolute;left:50%;top:-18px;width:160px;height:38px;margin-left:-80px;background:rgba(255,255,255,.6);transform:rotate(-3deg)"></div>
      <div style="font-weight:800;font-size:34px;letter-spacing:5px;color:#a0280c">AZAM BULAN NI 📌</div>
      <div style="font-family:Marker;font-size:60px;margin-top:14px;line-height:1.15">“Kali ni aku <span style="color:#a0280c">BETUL-BETUL</span> nak simpan!”</div></div>`, 'left:70px;top:290px;transform-origin:50% 0');
    o.tk = mk(r, `<div class="hl stroke" style="font-size:104px;color:#F5C542;white-space:nowrap;-webkit-text-stroke:5px #000">TEKAD! 💪</div>`, 'left:60px;top:900px');
  },
  upd(t, o) {
    const s = pop(t, 15.55, 0, { from: .5, rot: -8, ease: eo, d: .4 }); s.tr += ` rotate(${-2 + Math.sin(t * 1.4) * .7}deg)`; ap(o.n, s);
    ap(o.tk, slam(t, 16.59, 0, -6));
  }
});

// 7. BANK APP: masuk RM100 -----------------------------------------------------------------------
scene({
  s: 19.81, e: 22.76, tr: 'slide', bgStyle: 'green',
  L: t => SPLITR(1.0),
  build(r, o) {
    o.ph = mk(r, `<div class="phone" style="position:relative;transform:scale(.95);transform-origin:0 0"><div class="notch"></div><div class="scr" style="background:linear-gradient(#0f2b1c,#08150e)">
      <div style="padding:80px 30px 0;color:#9be7a8;font-weight:800;font-size:24px;letter-spacing:4px">🏦 AKAUN BANK</div>
      <div style="margin:20px 26px 0;padding:26px;border-radius:24px;background:rgba(255,255,255,.08);border:2px solid rgba(155,231,168,.4)">
        <div style="color:#cfe;font-weight:600;font-size:22px">Baki simpanan</div>
        <div style="color:#fff;font-weight:900;font-size:66px">RM<span id="bk">0</span></div></div>
      <div id="tx" style="margin:24px 26px 0;padding:18px 22px;border-radius:18px;background:#1f8a3b;color:#fff;font-weight:800;font-size:28px;opacity:0">✓ Pindahan masuk +RM100</div>
      <div style="margin:22px 26px 0;color:#7fa;font-weight:600;font-size:22px">Bulan ni: <b>TEKAD SIMPAN</b> 💪</div></div></div>`, 'left:46px;top:330px');
  },
  upd(t, o) {
    const p = eo(P(t, 19.81, .5)); o.ph.style.opacity = C(p * 2); o.ph.style.transform = `translateY(${lerp(900, 0, p)}px) rotate(${lerp(-10, -2, p)}deg)`;
    $$('bk').textContent = Math.round(100 * eo(P(t, 20.85, .6)));
    const x = P(t, 20.85, .3); $$('tx').style.opacity = x; $$('tx').style.transform = `translateY(${(1 - x) * 30}px)`;
  }
});

// 8. TUP-TUP! comic burst -----------------------------------------------------------------------------
scene({
  s: 22.76, e: 24.3, tr: 'zoom', shade: 1,
  L: t => FULL(1.3 + .05 * P(t, 22.76, 1.5), 290, 0),
  build(r, o) {
    o.b = mk(r, `<div style="position:relative;width:640px;height:340px"><svg width="640" height="340" viewBox="0 0 640 340" style="position:absolute;inset:0"><path d="M320 10 L370 90 L470 30 L450 120 L620 110 L500 180 L600 280 L450 240 L420 330 L340 250 L230 330 L230 240 L60 290 L160 190 L20 130 L180 120 L150 20 L260 90 Z" fill="#F5C542" stroke="#000" stroke-width="8"/></svg>
      <div style="position:absolute;inset:0;display:flex;align-items:center;justify-content:center;font-family:Marker;font-size:110px;color:#E53935;text-shadow:4px 4px 0 #000">TUP-TUP!</div></div>`, CTR + 'top:260px');
    o.w = mk(r, `<div class="glass" style="padding:12px 30px;color:#fff;font-weight:900;font-size:44px;white-space:nowrap">📅 MINGGU <span class="gold">DEPAN…</span></div>`, CTR + 'top:600px');
  },
  upd(t, o) {
    const b = pop(t, 22.78, 0, { from: .2, rot: -15, d: .3 }); b.tr += ` rotate(${Math.sin(t * 20) * (t < 23.3 ? 2 : .5)}deg)`; ap(o.b, b);
    ap(o.w, pop(t, 23.3, 0, { from: .6, dy: 30 }));
  }
});

// 9. NOTIFIKASI: kenduri / makan tempat mahal ----------------------------------------------------------
scene({
  s: 24.3, e: 28.78, tr: 'slide', bgStyle: 'night',
  L: t => LOWER(1.0 + .04 * P(t, 24.3, 4.5)),
  build(r, o) {
    const nt = (ic, ttl, sub) => `<div style="display:flex;align-items:center;gap:20px;width:840px;padding:18px 24px;border-radius:26px;background:rgba(245,245,250,.96);box-shadow:0 14px 30px rgba(0,0,0,.45)"><div style="flex:none;width:76px;height:76px;border-radius:18px;background:#1a1a1f;display:flex;align-items:center;justify-content:center;font-size:46px">${ic}</div><div style="flex:1;min-width:0"><div style="display:flex;justify-content:space-between;font-weight:700;font-size:22px;color:#888"><span>${ttl}</span><span>sekarang</span></div><div style="font-weight:800;font-size:34px;color:#111;white-space:nowrap">${sub}</div></div></div>`;
    o.n1 = mk(r, nt('💌', 'JEMPUTAN', 'Jemputan kenduri Sabtu ni 🎉'), 'left:60px;top:270px');
    o.n2 = mk(r, nt('🍽️', 'MEMBER', '“Jom makan tempat mahal!” 😋'), 'left:60px;top:400px');
    o.n3 = mk(r, nt('💸', 'AKAUN BANK', 'Duit keluar… lagi & lagi'), 'left:60px;top:530px');
  },
  upd(t, o) {
    [[o.n1, 25.45], [o.n2, 26.67], [o.n3, 28.02]].forEach(([el, s]) => { const p = eo(P(t, s, .35)); el.style.opacity = C(p * 2); el.style.transform = `translateY(${lerp(-60, 0, p)}px) scale(${lerp(.92, 1, p)})`; });
  }
});

// 10. BAKI MENYUSUT: RM100 -> separuh -> kosong -----------------------------------------------------------
scene({
  s: 28.78, e: 33.47, tr: 'zoom', bgStyle: 'red',
  L: t => PIP(650, 280, 280),
  build(r, o) {
    o.t = mk(r, `<div style="font-weight:700;font-size:30px;letter-spacing:6px;color:#e8d9b0">TAHU-TAHU…</div><div class="hl" style="font-size:66px;color:#fff">BAKI<br>AKAUN</div>`, 'left:80px;top:310px');
    o.g = mk(r, `<div style="width:820px;padding:30px;border-radius:30px;background:rgba(0,0,0,.55);border:3px solid rgba(229,57,53,.7);text-align:center">
      <div style="font-weight:900;font-size:150px;line-height:1;color:#fff" id="bal">RM100</div>
      <div style="margin-top:20px;height:60px;border-radius:30px;background:rgba(255,255,255,.12);overflow:hidden"><div id="bb" style="height:100%;width:100%;background:linear-gradient(90deg,#E53935,#F5C542)"></div></div>
      <div style="display:flex;justify-content:space-between;margin-top:14px;font-weight:800;font-size:32px;color:#ccc"><span id="l1">TINGGAL SEPARUH</span><span id="l2">HUJUNG BULAN</span></div></div>`, 'left:90px;top:680px');
    o.k = mk(r, `<div class="stamp" style="font-size:110px;white-space:nowrap">KOSONG!</div>`, CTR + 'top:770px');
  },
  upd(t, o) {
    ap(o.t, pop(t, 28.8, 0, { from: .8, dy: 30 }));
    ap(o.g, pop(t, 29.0, 0, { from: .7, dy: 60, ease: eo }));
    const v = 100 - 50 * eo(P(t, 30.61, .5)) - 50 * eo(P(t, 32.3, .35));
    $$('bal').textContent = 'RM' + Math.round(v); $$('bb').style.width = v + '%';
    $$('bal').style.color = v < 60 ? '#ff6a60' : '#fff';
    $$('l1').style.color = t > 31.07 ? '#F5C542' : '#888'; $$('l2').style.color = t > 31.69 ? '#ff6a60' : '#888';
    ap(o.k, slam(t, 32.6, 0, -8));
  }
});

// 11. KENAPA LEMAH SANGAT? (introspective) ------------------------------------------------------------------
scene({
  s: 33.47, e: 37.52, tr: 'fade', tint: 'rgba(40,70,140,.25)', shade: 1, bgStyle: 'night',
  L: t => FULL(1.02 + .2 * eio(P(t, 33.47, 4)), 220),
  grade: 'saturate(.55) brightness(.92) contrast(1.05)',
  build(r, o) {
    o.a = mk(r, `<div style="font-family:Play;font-style:italic;font-weight:700;font-size:60px;color:#cfe0ff;text-shadow:0 0 24px rgba(140,180,255,.55),0 4px 14px rgba(0,0,0,.7);white-space:nowrap">lepas tu kita terfikir…</div>`, CTR + 'top:275px');
    o.b = mk(r, `<div class="hl stroke" style="font-size:84px;color:#fff;white-space:nowrap;-webkit-text-stroke:4px #000">KENAPA AKU</div>`, CTR + 'top:370px');
    o.c = mk(r, `<div class="hl stroke" style="font-size:86px;color:#ff6a60;white-space:nowrap;-webkit-text-stroke:5px #000">LEMAH SANGAT?</div>`, CTR + 'top:470px');
  },
  upd(t, o) {
    const fl = (s, k) => { const st = pop(t, s, 0, { from: .9, dy: 30, ease: eo, d: .6 }); st.tr += ` translateY(${Math.sin(t * 1.4 + k) * 6}px)`; return st; };
    ap(o.a, fl(33.5, 0)); ap(o.b, fl(35.71, 1));
    const c = pop(t, 36.7, 0, { from: 1.8, ease: eo, d: .22 }); c.tr += ` translateX(${t > 36.7 && t < 37.1 ? jit(t * 6) * 6 : 0}px)`; ap(o.c, c);
  }
});

// 12. ORANG LAIN ✓ vs AKU ✕ ------------------------------------------------------------------------------------
scene({
  s: 37.52, e: 40.48, tr: 'slide', bgStyle: 'def',
  L: t => LOWER(1.0),
  build(r, o) {
    const col = (em, head, mark, bg, bd, mc) => `<div style="width:400px;height:360px;border-radius:30px;background:${bg};border:3px solid ${bd};box-shadow:0 16px 36px rgba(0,0,0,.45);padding:24px;text-align:center;position:relative">
      <div style="font-size:110px;line-height:1.1">${em}</div><div class="hl" style="font-size:52px;color:#fff;margin-top:6px">${head}</div>
      <div style="position:absolute;right:-20px;top:-20px;width:96px;height:96px;border-radius:50%;background:${mc};border:5px solid #fff;color:#fff;font-weight:900;font-size:56px;display:flex;align-items:center;justify-content:center">${mark}</div></div>`;
    o.cA = mk(r, col('👥', 'ORANG LAIN', '✓', 'linear-gradient(160deg,#1f3a1a,#0e1a0b)', '#7fd18b', '#1f8a3b'), 'left:80px;top:280px');
    o.cB = mk(r, col('🙋‍♀️', 'AKU?', '✕', 'linear-gradient(160deg,#3a1513,#1a0807)', '#E53935', '#E53935'), 'left:520px;top:280px');
  },
  upd(t, o) {
    ap(o.cA, pop(t, 37.8, 0, { from: .6, dy: -40 }));
    const b = pop(t, 39.15, 0, { from: .6, dy: -40 }); b.tr += ` translateX(${t > 39.15 && t < 39.6 ? jit(t * 5, 2) * 10 : 0}px)`; ap(o.cB, b);
  }
});

// 13. MENGALAH — white flag lowering ------------------------------------------------------------------------------
scene({
  s: 40.48, e: 44.04, tr: 'zoom', tint: 'rgba(90,90,110,.28)', shade: 1,
  L: t => FULL(1.08 - .05 * P(t, 40.48, 3.5), 160),
  grade: 'saturate(.5)',
  build(r, o) {
    o.f = mk(r, `<svg width="300" height="330" viewBox="0 0 300 330"><rect x="40" y="10" width="12" height="320" rx="6" fill="#c9b07a"/><path id="flg" d="M52 20 Q120 0 180 30 T290 30 L290 150 Q230 120 180 150 T52 140 Z" fill="#f4f4f4" stroke="#999" stroke-width="3"/></svg>`, 'left:80px;top:270px;transform-origin:50% 100%');
    o.l = mk(r, `<div style="font-family:Play;font-style:italic;font-weight:800;font-size:66px;color:#fff;text-shadow:0 4px 14px rgba(0,0,0,.8);white-space:nowrap">perlahan-lahan…</div>`, 'left:400px;top:300px');
    o.m = mk(r, `<div class="tape" style="font-size:72px;white-space:nowrap">MENGALAH</div>`, 'left:400px;top:420px');
  },
  upd(t, o) {
    const f = pop(t, 40.5, 0, { from: .6, dy: 40 }); f.tr += ` translateY(${eio(P(t, 42.26, 1.4)) * 120}px) rotate(${-eio(P(t, 42.26, 1.4)) * 8}deg)`; ap(o.f, f);
    const w = Math.sin(t * 4) * 8; $$('flg').setAttribute('d', `M52 20 Q120 ${w} 180 30 T290 ${30 + w} L290 ${150 + w} Q230 ${120 - w} 180 150 T52 140 Z`);
    ap(o.l, pop(t, 41.0, 0, { from: .8, dy: 20, ease: eo, d: .5 }));
    ap(o.m, pop(t, 42.26, 0, { from: .4 }));
  }
});

// 14. TAPI... FIKIR BALIK -> BUKAN MALAS -------------------------------------------------------------------------
scene({
  s: 44.04, e: 47.07, tr: 'zoom', shade: 1,
  L: t => FULL(1.22 + .05 * P(t, 44.04, 3), 270),
  build(r, o) {
    o.rw = mk(r, `<div class="glass" style="padding:14px 30px;display:flex;align-items:center;gap:18px;white-space:nowrap"><span style="font-size:56px;display:inline-block" id="rwi">⏪</span><span style="font-weight:900;font-size:48px;color:#fff">TAPI <span class="gold">FIKIR BALIK…</span></span></div>`, CTR + 'top:270px');
    o.a = mk(r, `<div class="hl stroke" style="font-size:64px;color:#fff;white-space:nowrap;-webkit-text-stroke:4px #000">KITA BUKAN</div>`, CTR + 'top:420px');
    o.b = mk(r, `<div style="display:inline-block;position:relative"><span class="hl stroke" style="font-size:130px;color:#F5C542;white-space:nowrap;-webkit-text-stroke:5px #000">MALAS</span><div id="mstk" style="position:absolute;left:-10px;top:50%;height:16px;width:0;background:#E53935;border-radius:8px;transform:rotate(-6deg);box-shadow:0 4px 0 #000"></div></div>`, CTR + 'top:500px');
  },
  upd(t, o) {
    ap(o.rw, pop(t, 44.06, 0, { from: .5 })); $$('rwi').style.transform = `rotate(${-t * 200 % 360}deg)`;
    ap(o.a, pop(t, 45.83, 0, { from: .6, dy: -20 }));
    ap(o.b, pop(t, 46.27, 0, { from: 2, ease: eo, d: .2 }));
    $$('mstk').style.width = `calc(${eo(P(t, 46.6, .3)) * 100}% + 20px)`;
  }
});

// 15. KERJA SETIAP HARI, PENAT — battery ---------------------------------------------------------------------------
scene({
  s: 47.07, e: 49.2, tr: 'slide', bgStyle: 'def',
  L: t => PIP(90, 280, 280),
  build(r, o) {
    o.t = mk(r, `<div style="font-weight:700;font-size:30px;letter-spacing:5px;color:#e8d9b0">KERJA</div><div class="hl" style="font-size:66px;color:#fff">SETIAP HARI</div>`, 'left:420px;top:330px');
    o.bt = mk(r, `<div style="display:flex;align-items:center"><div style="width:520px;height:220px;border:14px solid #fff;border-radius:40px;padding:14px;position:relative"><div id="btl" style="height:100%;width:90%;border-radius:20px;background:#7fd18b"></div><div id="btp" style="position:absolute;inset:0;display:flex;align-items:center;justify-content:center;font-weight:900;font-size:80px;color:#fff;text-shadow:0 4px 0 #000">90%</div></div><div style="width:34px;height:90px;background:#fff;border-radius:0 14px 14px 0"></div></div>`, 'left:150px;top:680px');
    o.p = mk(r, `<div class="hl stroke" style="font-size:96px;color:#ff6a60;white-space:nowrap;-webkit-text-stroke:4px #000">PENAT 😮‍💨</div>`, CTR + 'top:980px');
  },
  upd(t, o) {
    ap(o.t, pop(t, 47.1, 0, { from: .8, dy: 30 }));
    ap(o.bt, pop(t, 47.3, 0, { from: .6 }));
    const v = 90 - 80 * eo(P(t, 47.6, 1.1)); $$('btl').style.width = v + '%'; $$('btp').textContent = Math.round(v) + '%';
    $$('btl').style.background = v > 50 ? '#7fd18b' : v > 25 ? '#F5C542' : '#E53935';
    ap(o.p, pop(t, 48.62, 0, { from: .4 }));
  }
});

// 16. DUIT TERLALU DEKAT DENGAN TANGAN --------------------------------------------------------------------------------
scene({
  s: 49.2, e: 52.12, tr: 'zoom', bgStyle: 'def',
  L: t => SPLITR(1.0 + .04 * P(t, 49.2, 3)),
  build(r, o) {
    o.h = mk(r, `<div class="hl" style="font-size:54px;color:#fff;line-height:1.05">DUIT DALAM<br><span class="gold">AKAUN</span></div>`, 'left:70px;top:290px');
    o.vis = mk(r, `<div style="position:relative;width:380px;height:440px">
      <div id="dh" style="position:absolute;left:0;top:150px;font-size:130px">🫳</div>
      <div style="position:absolute;right:0;top:300px;width:150px;height:100px;border-radius:14px;background:linear-gradient(135deg,#9be7a8,#3a9b4e);border:4px solid #1f5a2a;display:flex;align-items:center;justify-content:center;font-weight:900;font-size:36px;color:#0c2a12">RM</div>
      <div id="dm" style="position:absolute;left:20px;right:20px;top:60px;text-align:center;font-weight:900;font-size:40px;color:#ff8a80">↔ 1 cm</div></div>`, 'left:70px;top:480px');
    o.lb = mk(r, `<div class="tape" style="font-size:44px;letter-spacing:4px;background:#F5C542;color:#1a1205;text-shadow:none;white-space:nowrap">TERLALU DEKAT!</div>`, 'left:60px;top:1000px');
  },
  upd(t, o) {
    ap(o.h, pop(t, 49.25, 0, { from: .6, dy: 30 }));
    ap(o.vis, pop(t, 49.5, 0, { from: .6 }));
    const p = eo(P(t, 50.86, .8)); $$('dh').style.transform = `translate(${p * 110}px,${p * 70}px)`;
    $$('dm').style.opacity = C(P(t, 51.2, .3));
    ap(o.lb, slam(t, 50.86, 0, -3));
  }
});

// 17. SATU KALI TEKAN -> HILANG ----------------------------------------------------------------------------------------
scene({
  s: 52.12, e: 55.77, tr: 'slide', bgStyle: 'red',
  L: t => LOWER(1.0),
  build(r, o) {
    o.btn = mk(r, `<div style="position:relative;display:inline-block"><div id="tbtn" style="padding:30px 70px;border-radius:999px;background:#E53935;color:#fff;font-weight:900;font-size:64px;box-shadow:0 14px 0 #8a1a17,0 24px 40px rgba(0,0,0,.5);white-space:nowrap">SATU KALI TEKAN</div><div id="tfg" style="position:absolute;right:-30px;bottom:-90px;font-size:100px">👆</div></div>`, CTR + 'top:290px');
    o.cash = [0, 1, 2, 3, 4, 5].map(i => mk(r, `<div style="font-size:70px">💸</div>`, 'left:470px;top:560px'));
    o.hl = mk(r, `<div class="hl stroke" style="font-size:90px;color:#fff;white-space:nowrap;-webkit-text-stroke:4px #000">DAH <span style="color:#ff6a60">HILANG!</span></div>`, CTR + 'top:470px');
    o.tf = mk(r, `<div class="glass" style="padding:10px 26px;color:#fff;font-weight:800;font-size:38px;white-space:nowrap">⏱️ TAK SEMPAT <span class="gold">BERFIKIR</span></div>`, CTR + 'top:600px');
  },
  upd(t, o) {
    ap(o.btn, pop(t, 52.15, 0, { from: .5 }));
    const press = t > 52.68 && t < 52.85; $$('tbtn').style.transform = `translateY(${press ? 10 : 0}px)`; $$('tbtn').style.boxShadow = press ? '0 4px 0 #8a1a17,0 10px 20px rgba(0,0,0,.5)' : '0 14px 0 #8a1a17,0 24px 40px rgba(0,0,0,.5)';
    $$('tfg').style.transform = `translate(${press ? -10 : 0}px,${press ? -10 : 0}px)`;
    o.cash.forEach((c, i) => { const p = P(t, 52.9 + i * .08, 1.0); c.style.opacity = p > 0 && p < 1 ? 1 - p : 0; const a = (i / 6) * Math.PI * 2; c.style.transform = `translate(${Math.cos(a) * 380 * eo(p)}px,${Math.sin(a) * 160 * eo(p) - 40 * p}px) rotate(${p * 200}deg)`; });
    ap(o.hl, pop(t, 53.42, 0, { from: 1.8, ease: eo, d: .22 }));
    ap(o.tf, pop(t, 54.06, 0, { from: .5, dy: 20 }));
  }
});

// 18. PELBAGAI BENTUK SIMPANAN — morphing tiles ---------------------------------------------------------------------------
scene({
  s: 55.77, e: 61.36, tr: 'zoom', shade: 1, bgStyle: 'def',
  L: t => FULL(1.1 - .04 * P(t, 55.77, 5.6), 330),
  build(r, o) {
    o.h = mk(r, `<div class="hl stroke" style="font-size:56px;color:#fff;white-space:nowrap;-webkit-text-stroke:3px #000">SIMPANAN <span class="gold">TAK SEMESTINYA</span></div>`, CTR + 'top:270px');
    o.d = mk(r, `<div style="display:inline-block;position:relative;font-family:Play;font-style:italic;font-weight:800;font-size:80px;color:#fff;text-shadow:0 4px 14px rgba(0,0,0,.8);white-space:nowrap">dalam bentuk duit sahaja<div id="dstk" style="position:absolute;left:-10px;top:52%;height:12px;width:0;background:#E53935;border-radius:6px"></div></div>`, CTR + 'top:350px');
    const tile = (em, lb) => `<div style="width:190px;height:190px;border-radius:30px;background:rgba(20,14,6,.82);border:3px solid rgba(245,197,66,.7);display:flex;flex-direction:column;align-items:center;justify-content:center;box-shadow:0 14px 30px rgba(0,0,0,.5)"><div style="font-size:84px;line-height:1">${em}</div><div style="font-weight:900;font-size:26px;color:#F5C542;margin-top:8px">${lb}</div></div>`;
    o.tl = [['💵', 'TUNAI'], ['🏦', 'BANK'], ['🪙', 'EMAS'], ['📜', 'ASET']].map(([e, l], i) => mk(r, tile(e, l), `left:${80 + i * 210}px;top:480px`));
    o.pb = mk(r, `<div class="glass" style="padding:12px 30px;color:#fff;font-weight:900;font-size:44px;white-space:nowrap">✨ <span class="gold">PELBAGAI BENTUK</span></div>`, CTR + 'top:690px');
  },
  upd(t, o) {
    ap(o.h, pop(t, 56.38, 0, { from: .6, dy: -20 }));
    ap(o.d, pop(t, 57.74, 0, { from: .8, dy: 20 }));
    $$('dstk').style.width = `calc(${eo(P(t, 59.1, .35)) * 100}% + 20px)`;
    [59.56, 59.9, 60.24, 60.58].forEach((s, i) => { const st = pop(t, s, 0, { from: .3, rot: (i - 1.5) * 8 }); st.tr += ` translateY(${Math.sin(t * 2 + i) * 6}px)`; ap(o.tl[i], st); });
    o.tl[2].style.filter = t > 60.96 ? `drop-shadow(0 0 ${20 + 10 * Math.sin(t * 8)}px rgba(245,197,66,.9))` : 'none';
    ap(o.pb, pop(t, 60.96, 0, { from: .5 }));
  }
});

// 19. SIMPANAN EMAS — gold reveal ---------------------------------------------------------------------------------------------
scene({
  s: 61.36, e: 63.55, tr: 'zoom', tint: 'rgba(255,190,80,.12)', shade: 1,
  L: t => FULL(1.18 + .05 * eo(P(t, 62.92, .8)), 300),
  grade: 'saturate(1.12) brightness(1.04)',
  build(r, o) {
    o.s1 = mk(r, `<div style="font-weight:800;font-size:44px;color:#fff;letter-spacing:4px;white-space:nowrap">SALAH SATUNYA…</div>`, CTR + 'top:265px');
    o.em = mk(r, `<div style="font-family:Play;font-weight:900;font-size:130px;line-height:1;color:#F5C542;text-shadow:0 0 40px rgba(245,197,66,.65),0 8px 0 #000;white-space:nowrap">EMAS ✨</div>`, CTR + 'top:330px');
    o.gb = mk(r, GOLDBAR(240, 'r'), CTR + 'top:480px');
    o.sp = mk(r, Array.from({ length: 20 }, (_, i) => `<i style="position:absolute;width:${8 + (i % 4) * 4}px;height:${8 + (i % 4) * 4}px;border-radius:50%;background:#FFE48A;box-shadow:0 0 14px #F5C542"></i>`).join(''), 'left:0;top:0;width:1080px;height:1920px');
  },
  upd(t, o) {
    ap(o.s1, pop(t, 61.4, 0, { from: .7 }));
    ap(o.em, pop(t, 62.3, 0, { from: 2.2, ease: eo, d: .25 }));
    const g = pop(t, 62.92, 0, { from: .3, rot: -10 }); g.tr += ` translateY(${Math.sin(t * 3) * 6}px)`; ap(o.gb, g);
    const on = C(P(t, 62.92, .3));
    [...o.sp.children].forEach((d, i) => { const ph = (t * .6 + i * .137) % 1; d.style.left = (150 + (i * 137) % 760) + 'px'; d.style.top = (640 - ph * 380) + 'px'; d.style.opacity = Math.sin(ph * Math.PI) * on; });
  }
});

// 20. BUKAN SEKADAR NOMBOR DALAM SKRIN ------------------------------------------------------------------------------------------
scene({
  s: 63.55, e: 66.74, tr: 'slide', bgStyle: 'night',
  L: t => LOWER(1.0 + .03 * P(t, 63.55, 3.2)),
  build(r, o) {
    o.scr = mk(r, `<div style="position:relative;width:470px;height:300px;border-radius:26px;background:#0a0f1e;border:8px solid #2a2a2e;box-shadow:0 20px 40px rgba(0,0,0,.6);overflow:hidden">
      <div style="position:absolute;left:0;right:0;top:20px;text-align:center;color:#7aa0ff;font-weight:700;font-size:24px;letter-spacing:4px">SKRIN</div>
      <div id="num" style="position:absolute;left:0;right:0;top:90px;text-align:center;font-family:monospace;font-weight:900;font-size:70px;color:#9fc0ff">RM 100.00</div>
      <div id="nx" style="position:absolute;inset:0;display:flex;align-items:center;justify-content:center;font-size:220px;color:#E53935;font-weight:900;opacity:0">✕</div></div>`, 'left:80px;top:280px');
    o.gb = mk(r, `<div style="text-align:center">${GOLDBAR(300, 'n')}<div class="hl" style="font-size:40px;color:#F5C542;margin-top:6px">BOLEH DIPEGANG</div></div>`, 'left:580px;top:300px');
    o.lb = mk(r, `<div class="glass" style="padding:10px 26px;color:#fff;font-weight:900;font-size:40px;white-space:nowrap">BUKAN SEKADAR <span class="gold">NOMBOR</span></div>`, CTR + 'top:610px');
  },
  upd(t, o) {
    ap(o.scr, pop(t, 63.6, 0, { from: .6, dy: 30 }));
    const g = t > 65.72 && t < 66.3; $$('num').textContent = g ? ['RM 1#0.0?', 'R? 10@.00', 'RM 1 0 0'][Math.floor(t * 20) % 3] : 'RM 100.00';
    $$('num').style.transform = g ? `translateX(${jit(t * 4) * 8}px)` : 'none';
    $$('nx').style.opacity = C(P(t, 66.24, .15));
    ap(o.gb, pop(t, 64.11, 0, { from: .4, rot: 8 }));
    ap(o.lb, pop(t, 65.1, 0, { from: .6 }));
  }
});

// 21. NILAI TERSENDIRI + KENA USAHA DULU ---------------------------------------------------------------------------------------------
scene({
  s: 66.74, e: 70.57, tr: 'zoom', bgStyle: 'green',
  L: t => CARDBR(),
  build(r, o) {
    o.v = mk(r, `<div style="display:flex;align-items:center;gap:30px"><div style="position:relative">${GOLDBAR(300, 'v')}<div style="position:absolute;left:50%;top:-40px;transform:translateX(-50%);font-size:60px">💎</div></div><div><div style="font-weight:700;font-size:28px;letter-spacing:5px;color:#e8d9b0">ADA</div><div class="hl" style="font-size:60px;color:#F5C542;line-height:1">NILAI<br>TERSENDIRI</div></div></div>`, 'left:80px;top:300px');
    const step = (n, txt) => `<div style="display:flex;align-items:center;gap:18px;width:470px;padding:16px 20px;border-radius:22px;background:rgba(255,255,255,.95);box-shadow:0 12px 26px rgba(0,0,0,.4)"><div style="flex:none;width:62px;height:62px;border-radius:50%;background:#1f8a3b;color:#fff;font-weight:900;font-size:36px;display:flex;align-items:center;justify-content:center">${n}</div><div style="font-weight:900;font-size:32px;color:#1a1205;white-space:nowrap">${txt}</div></div>`;
    o.s1 = mk(r, step('1', 'USAHA DULU 🏃‍♀️'), 'left:60px;top:880px');
    o.s2 = mk(r, step('2', 'BARU BOLEH GUNA'), 'left:60px;top:1010px');
  },
  upd(t, o) {
    ap(o.v, pop(t, 66.8, 0, { from: .6, dy: 30 }));
    ap(o.s1, pop(t, 69.79, 0, { from: .6, dy: 30 }));
    ap(o.s2, pop(t, 70.19, 0, { from: .6, dy: 30 }));
  }
});

// 22. TAK BOLEH SESUKA HATI — lock --------------------------------------------------------------------------------------------------
scene({
  s: 70.57, e: 72.86, tr: 'slide', bgStyle: 'def',
  L: t => PIP(650, 280, 280),
  build(r, o) {
    o.t = mk(r, `<div style="font-weight:700;font-size:30px;letter-spacing:5px;color:#e8d9b0">TAK BOLEH</div><div class="hl" style="font-size:62px;color:#fff">SESUKA<br>HATI</div>`, 'left:80px;top:310px');
    o.lk = mk(r, `<svg width="300" height="360" viewBox="0 0 300 360"><path id="shk" d="M80 160 V100 a70 70 0 0 1 140 0 V160" fill="none" stroke="#d9d9d9" stroke-width="28"/><rect x="40" y="150" width="220" height="190" rx="30" fill="#F5C542" stroke="#8a5e08" stroke-width="6"/><circle cx="150" cy="230" r="24" fill="#5b3a12"/><rect x="140" y="240" width="20" height="50" rx="8" fill="#5b3a12"/></svg>`, 'left:390px;top:700px');
    o.lb = mk(r, `<div class="hl stroke" style="font-size:70px;color:#F5C542;white-space:nowrap;-webkit-text-stroke:3px #000">SENTUH ≠ TERUS HABIS</div>`, CTR + 'top:1090px');
  },
  upd(t, o) {
    ap(o.t, pop(t, 70.6, 0, { from: .8, dy: 30 }));
    ap(o.lk, pop(t, 70.9, 0, { from: .5 }));
    $$('shk').setAttribute('transform', `translate(0,${-40 * (1 - eo(P(t, 72.11, .2)))})`);
    o.lk.style.transform += ` rotate(${t > 72.15 && t < 72.5 ? Math.sin((t - 72.15) * 50) * 5 : 0}deg)`;
    ap(o.lb, pop(t, 71.73, 0, { from: .5 }));
  }
});

// 23. RUANG JEDA: betulkah aku perlukan? ---------------------------------------------------------------------------------------------
scene({
  s: 72.86, e: 77.35, tr: 'fade', tint: 'rgba(255,170,120,.10)', shade: 1,
  L: t => FULL(1.05 + .14 * eio(P(t, 72.86, 4.5)), 170),
  grade: 'saturate(.95)',
  build(r, o) {
    o.pz = mk(r, `<div class="glass" style="padding:14px 30px;display:flex;align-items:center;gap:18px;white-space:nowrap"><span style="width:56px;height:56px;border-radius:50%;background:#F5C542;display:flex;align-items:center;justify-content:center;font-weight:900;font-size:30px;color:#1a1205">❚❚</span><span style="font-weight:900;font-size:42px;color:#fff">RUANG <span class="gold">BERFIKIR</span> SEKEJAP</span></div>`, CTR + 'top:270px');
    o.bub = mk(r, `<div style="position:relative;padding:26px 40px;border-radius:50px;background:rgba(255,255,255,.96);box-shadow:0 14px 34px rgba(0,0,0,.45)"><div style="font-family:Play;font-style:italic;font-weight:800;font-size:60px;color:#2a1a05;white-space:nowrap">“Betul ke aku <span style="color:#a0280c">perlukan</span> ni?”</div>
      <i style="position:absolute;left:120px;bottom:-34px;width:40px;height:40px;border-radius:50%;background:rgba(255,255,255,.96)"></i><i style="position:absolute;left:90px;bottom:-66px;width:22px;height:22px;border-radius:50%;background:rgba(255,255,255,.96)"></i></div>`, CTR + 'top:400px');
  },
  upd(t, o) {
    ap(o.pz, pop(t, 72.9, 0, { from: .6, dy: -20 }));
    const b = pop(t, 75.45, 0, { from: .5, dy: 30 }); b.tr += ` translateY(${Math.sin(t * 1.6) * 6}px)`; ap(o.bub, b);
  }
});

// 24. BUKAN TAK MAMPU — tempat terlalu mudah ------------------------------------------------------------------------------------------
scene({
  s: 77.35, e: 83.89, tr: 'zoom', bgStyle: 'def',
  L: t => SPLITR(1.0 + .04 * P(t, 77.35, 6.5)),
  build(r, o) {
    o.a = mk(r, `<div style="font-weight:700;font-size:30px;letter-spacing:5px;color:#e8d9b0">KADANG-KADANG</div><div style="display:inline-block;position:relative;margin-top:6px"><span class="hl" style="font-size:58px;color:#fff;white-space:nowrap">BUKAN KITA<br>TAK MAMPU</span><div id="kstk" style="position:absolute;left:-8px;top:72%;height:12px;width:0;background:#E53935;border-radius:6px;transform:rotate(-4deg)"></div></div>`, 'left:70px;top:290px');
    o.dr = mk(r, `<div style="width:370px;padding:22px;border-radius:26px;background:rgba(0,0,0,.5);border:3px solid rgba(229,57,53,.7);text-align:center">
      <div style="font-size:90px;line-height:1.1">🚪💸</div><div style="font-weight:900;font-size:34px;color:#ff8a80;margin-top:8px">TEMPAT SIMPAN</div><div class="hl" style="font-size:52px;color:#fff">TERLALU MUDAH</div><div style="font-weight:700;font-size:26px;color:#ccc">nak guna</div></div>`, 'left:60px;top:620px');
    o.lb = mk(r, `<div class="tape" style="font-size:40px;letter-spacing:3px;background:#F5C542;color:#1a1205;text-shadow:none;white-space:nowrap">ALIH KE TEMPAT LAIN ➜</div>`, 'left:60px;top:1050px');
  },
  upd(t, o) {
    ap(o.a, pop(t, 77.4, 0, { from: .7, dy: 30 }));
    $$('kstk').style.width = `calc(${eo(P(t, 79.9, .35)) * 100}% + 16px)`;
    ap(o.dr, pop(t, 80.87, 0, { from: .5, dy: 40 }));
    ap(o.lb, pop(t, 82.31, 0, { from: .4 }));
  }
});

// 25. GAGAL TAK APA — JANGAN MENGALAH ---------------------------------------------------------------------------------------------------
scene({
  s: 83.89, e: 87.73, tr: 'zoom', shade: 1, bgStyle: 'green',
  L: t => FULL(1.18 + .05 * P(t, 83.89, 3.8), 260),
  build(r, o) {
    o.a = mk(r, `<div style="font-family:Play;font-style:italic;font-weight:800;font-size:76px;color:#fff;text-shadow:0 4px 14px rgba(0,0,0,.8);white-space:nowrap">gagal pun tak apa 🤍</div>`, CTR + 'top:275px');
    o.b = mk(r, `<div style="font-weight:800;font-size:40px;letter-spacing:5px;color:#e8d9b0;text-align:center">YANG PENTING</div><div class="hl stroke" style="font-size:64px;color:#F5C542;white-space:nowrap;-webkit-text-stroke:4px #000;text-align:center">JANGAN MENGALAH 💪</div>`, CTR + 'top:400px;flex-direction:column;align-items:center');
  },
  upd(t, o) {
    ap(o.a, pop(t, 84.0, 0, { from: .7, dy: 20 }));
    const b = pop(t, 85.55, 0, { from: .5 }); b.tr += ` scale(${1 + (t > 86.97 ? .04 * Math.sin((t - 86.97) * 8) : 0)})`; ap(o.b, b);
  }
});

// 26. SAVE & SHARE -----------------------------------------------------------------------------------------------------------------------
scene({
  s: 87.73, e: 94.04, tr: 'slide', bgStyle: 'def',
  L: t => LOWER(1.0),
  build(r, o) {
    o.q = mk(r, `<div class="hl" style="font-size:50px;color:#fff;white-space:nowrap">VIDEO NI <span class="gold">BERMANFAAT?</span></div>`, CTR + 'top:280px');
    const ic = (em, lbl) => `<div style="display:flex;flex-direction:column;align-items:center;gap:10px"><div style="width:170px;height:170px;border-radius:50%;background:linear-gradient(135deg,#FFE48A,#C9930F);display:flex;align-items:center;justify-content:center;font-size:84px;box-shadow:0 14px 30px rgba(0,0,0,.45)">${em}</div><div class="hl" style="font-size:44px;color:#fff">${lbl}</div></div>`;
    o.sv = mk(r, ic('🔖', 'SAVE'), 'left:200px;top:370px');
    o.sh = mk(r, ic('📤', 'SHARE'), 'left:560px;top:370px');
    o.rk = mk(r, `<div class="glass" style="padding:8px 24px;color:#fff;font-weight:800;font-size:34px;white-space:nowrap">👭 KEPADA <span class="gold">RAKAN ANDA</span></div>`, CTR + 'top:620px');
  },
  upd(t, o) {
    ap(o.q, pop(t, 88.66, 0, { from: .6 }));
    const a = pop(t, 91.08, 0, { from: .3 }); a.tr += ` scale(${1 + .05 * Math.sin(Math.max(0, t - 91.3) * 8)})`; ap(o.sv, a);
    const b = pop(t, 91.86, 0, { from: .3 }); b.tr += ` rotate(${Math.sin(Math.max(0, t - 92) * 8) * 4}deg)`; ap(o.sh, b);
    ap(o.rk, pop(t, 93.14, 0, { from: .5 }));
  }
});

// 27. CTA link di bio -----------------------------------------------------------------------------------------------------------------------
scene({
  s: 94.04, e: 97.75, tr: 'zoom', bgStyle: 'def',
  L: t => SPLITR(1.0),
  build(r, o) {
    o.pill = mk(r, `<div class="glass" style="padding:12px 26px;color:#fff;font-weight:800;font-size:34px;white-space:nowrap">NAK MULA <span class="gold">SIMPAN EMAS?</span></div>`, 'left:60px;top:290px');
    o.ph = mk(r, `<div class="phone" style="position:relative;transform:scale(.9);transform-origin:0 0"><div class="notch"></div><div class="scr" style="background:linear-gradient(#17110a,#0b0804)">
      <div style="margin:80px 26px 0;padding:24px;border-radius:24px;background:linear-gradient(135deg,#FFE48A,#E0A82E 50%,#A87410);color:#1a1205">
        <div style="font-weight:700;font-size:20px;letter-spacing:4px">SIMPANAN</div><div style="font-family:Play;font-weight:800;font-size:44px;line-height:1">Emas Saya</div>
        <div style="margin-top:30px;font-weight:700;font-size:18px;letter-spacing:3px;opacity:.75">PUBLIC GOLD</div></div>
      <div style="margin:30px 26px 0;display:flex;justify-content:center">${GOLDBAR(230, 'c')}</div>
      <div id="ob" style="margin:34px 26px 0;padding:24px;border-radius:20px;background:#F5C542;color:#1a1205;text-align:center;font-weight:900;font-size:32px">MULA SEKARANG</div></div></div>`, 'left:46px;top:390px');
    o.btn = mk(r, `<div class="btn" style="font-size:50px;padding:26px 46px">KLIK LINK DI BIO <span>👆</span></div>`, CTR + 'top:1150px');
  },
  upd(t, o) {
    ap(o.pill, pop(t, 94.1, 0, { from: .5 }));
    const p = eo(P(t, 94.04, .55)); o.ph.style.opacity = C(p * 2); o.ph.style.transform = `translateY(${lerp(900, 0, p)}px) rotate(${lerp(10, 2, p)}deg)`;
    $$('ob').style.boxShadow = t > 96.72 ? `0 0 ${30 + 20 * Math.sin(t * 8)}px rgba(255,220,120,.9)` : 'none';
    const b = pop(t, 96.72, 0, { from: .3 }); b.tr += ` scale(${1 + .04 * Math.sin(Math.max(0, t - 97) * 7)})`; ap(o.btn, b);
  }
});

// 28. OUTRO end card ---------------------------------------------------------------------------------------------------------------------------
scene({
  s: 97.75, e: 120, tr: 'slide', bgStyle: 'def',
  L: t => PIP(390, 420, 300),
  build(r, o) {
    o.wmk = mk(r, `<img src="../adila_gold_wm.png" style="height:120px">`, 'left:60px;right:140px;top:790px;text-align:center');
    o.sub = mk(r, `<div style="color:#fff;font-weight:700;font-size:32px;letter-spacing:6px;text-align:center">DEALER AKTIF PUBLIC GOLD</div>`, 'left:60px;right:140px;top:940px');
    o.btn = mk(r, `<div class="btn" style="font-size:46px;padding:24px 46px">KLIK LINK DI BIO <span>👆</span></div>`, CTR + 'top:1120px');
  },
  upd(t, o) { ap(o.wmk, pop(t, 97.85, 0, { from: .6 })); ap(o.sub, pop(t, 98.05, 0, { from: .8, dy: 20 })); ap(o.btn, { o: 1, tr: `scale(${1 + .04 * Math.sin(t * 7)})` }); }
});
