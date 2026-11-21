// ---------------- Layouts (face at 540,860 in 1080x1920 source) ----------------
const FX0 = 540, FY0 = 860;
const FULL = (z = 1, dy = 0, dx = 0) => ({ x: 0, y: 0, w: 1080, h: 1920, r: 0, s: z, fx: 540 + dx, fy: 860 + dy, ring: 0 });
const LOWER = (z = 1) => ({ x: 80, y: 700, w: 840, h: 770, r: 46, s: z, fx: 420, fy: 380, ring: .9 });
const SPLITR = (z = 1) => ({ x: 470, y: 390, w: 460, h: 1070, r: 40, s: z, fx: 230, fy: 430, ring: .9 });
const PIP = (x = 640, y = 290, d = 290) => ({ x, y, w: d, h: d, r: d / 2, s: .52, fx: d / 2, fy: d / 2 + 10, ring: 1 });
const CARDBR = () => ({ x: 540, y: 700, w: 390, h: 560, r: 34, s: .78, fx: 195, fy: 270, ring: .9 });
function mixL(a, b, p) { const o = {}; for (const k in a) o[k] = lerp(a[k], b[k], p); return o; }
const FLASHES = [7.58, 19.66, 36.66, 46.44, 53.9, 78.9];

const S = [];
function scene(o) { o.root = sc(); S.push(o); if (o.build) o.build(o.root, o); return o; }
const TITLE = 'left:60px;right:140px;text-align:center';

// 1. HOOK — headline wall + baki jatuh ---------------------------------------------
scene({
  s: 0, e: 8.0, tr: 'cut', shade: 1,
  L: t => FULL(1.22 + .05 * P(t, 4.6, 3.4) + .08 * Math.exp(-Math.max(0, t - 7.58) * 5) * (t >= 7.58), 250),
  build(r, o) {
    o.a = mk(r, `<div class="hl" style="font-size:58px;color:#fff;white-space:nowrap">KENAPA ANAK MUDA</div>`, TITLE + ';top:280px');
    o.b = mk(r, `<div class="hl" style="font-size:40px;color:#e8d9b0;letter-spacing:8px;white-space:nowrap">ZAMAN SEKARANG</div>`, TITLE + ';top:350px');
    o.c = mk(r, `<div class="hl gold stroke" style="font-size:112px;white-space:nowrap;-webkit-text-stroke:5px #000;text-shadow:0 0 40px rgba(229,57,53,.55)">SUSAH SIMPAN</div>`, TITLE + ';top:410px');
    o.d = mk(r, `<div class="glass" style="display:inline-flex;align-items:center;gap:22px;padding:18px 34px"><span style="font-size:58px">👛</span>
       <div><div style="color:#e8d9b0;font-weight:700;font-size:24px;letter-spacing:5px">BAKI DUIT</div><div id="hk" style="color:#fff;font-weight:900;font-size:66px;line-height:1">RM —</div></div></div>`, TITLE + ';top:560px');
  },
  upd(t, o) {
    ap(o.a, pop(t, 4.45, 0, { from: .7, dy: 30 }));
    ap(o.b, pop(t, 5.98, 0, { from: .8, dy: 20 }));
    const sh = t >= 7.58 ? Math.exp(-(t - 7.58) * 7) * 14 : 0;
    const c = pop(t, 6.42, 0, { from: 2.2, ease: eo, d: .22 }); c.tr = `translate(${jit(t * 4, 1) * sh}px,${jit(t * 4, 2) * sh}px) ` + c.tr; ap(o.c, c);
    ap(o.d, pop(t, 7.2, 0, { from: .5 }));
    const k = $('hk'); const v = Math.round(lerp(2500, 0, eio(P(t, 7.3, .6))));
    k.textContent = 'RM ' + v.toLocaleString('en'); k.style.color = t > 7.75 ? '#ff5a52' : '#fff';
  }
});

// 2. NAMA + BUKAN PANDAI / MEMAHAMI ------------------------------------------------------
scene({
  s: 8.0, e: 14.26, tr: 'zoom',
  L: t => FULL(1.04 + .06 * P(t, 8, 6.2), 40),
  build(r, o) {
    o.lt = mk(r, `<div style="display:flex;align-items:center;gap:22px;padding:16px 34px 16px 18px;border-radius:999px;background:rgba(12,9,4,.72);border:2px solid rgba(245,197,66,.7);box-shadow:0 12px 30px rgba(0,0,0,.4)">
       <div style="width:64px;height:64px;border-radius:50%;background:linear-gradient(135deg,#FFE48A,#C9930F);display:flex;align-items:center;justify-content:center;font-family:Play;font-weight:800;font-size:36px;color:#1a1205">A</div>
       <div><div style="font-family:Play;font-weight:800;font-size:40px;color:#F5C542;line-height:1">Adila Gold</div><div style="color:#fff;font-weight:600;font-size:24px;letter-spacing:2px;margin-top:4px">DEALER AKTIF PUBLIC GOLD</div></div></div>`, TITLE + ';top:288px;display:flex;justify-content:center');
    o.x = mk(r, `<div style="position:relative;display:inline-block"><div class="hl" style="font-size:44px;color:#ff8a80;letter-spacing:6px">BUKAN SEBAGAI</div>
       <div class="hl stroke" style="font-size:96px;color:#fff;white-space:nowrap">🎓 ORANG PANDAI</div><div id="strike" style="position:absolute;left:-10px;top:96px;height:14px;border-radius:7px;background:#E53935;width:0;transform:rotate(-4deg)"></div></div>`, TITLE + ';top:300px');
    o.y = mk(r, `<div class="hl" style="font-size:44px;color:#fff;letter-spacing:6px">TAPI ORANG YANG</div>
       <div style="font-family:Play;font-style:italic;font-weight:900;font-size:108px;color:#F5C542;line-height:1;text-shadow:0 6px 0 #000,0 0 30px rgba(0,0,0,.6);white-space:nowrap">memahami anda</div>`, TITLE + ';top:300px');
    o.h = mk(r, `<div style="font-size:120px">🤝</div>`, 'left:760px;top:520px');
  },
  upd(t, o) {
    ap(o.lt, pop(t, 8.1, 10.6, { from: .7, dy: -30 }));
    ap(o.x, pop(t, 10.66, 12.28, { from: .6 }));
    $('strike').style.width = (eo(P(t, 11.82, .3)) * 640) + 'px';
    ap(o.y, pop(t, 12.28, 0, { from: .4 }));
    const h = pop(t, 13.5, 0, { from: .2, rot: -20 }); h.tr += ` rotate(${Math.sin(t * 5) * 6}deg)`; ap(o.h, h);
  }
});

// 3. HARI KITA — timeline + bateri ----------------------------------------------------------
scene({
  s: 14.26, e: 20.14, tr: 'slide', bgShow: 1,
  L: t => SPLITR(1.0 + .05 * P(t, 14.26, 5.9)),
  build(r, o) {
    o.t = mk(r, `<div class="hl" style="font-size:40px;color:#e8d9b0;letter-spacing:6px">CONTOH…</div><div style="font-family:Marker;font-size:66px;color:#F5C542;line-height:1">hari kita</div>`, 'left:70px;top:300px');
    const R = [['⏰', 'BANGUN PAGI', '07:00'], ['🚗', 'PERGI KERJA', '08:00'], ['🏠', 'BALIK', '18:30']];
    o.rows = R.map((x, i) => mk(r, `<div class="glass" style="width:380px;display:flex;align-items:center;gap:18px;padding:18px 22px"><span style="font-size:56px">${x[0]}</span>
      <div><div style="color:#F5C542;font-weight:800;font-size:24px;letter-spacing:3px">${x[2]}</div><div style="color:#fff;font-weight:900;font-size:36px">${x[1]}</div></div></div>`, `left:60px;top:${470 + i * 150}px`));
    o.bat = mk(r, `<div style="display:flex;align-items:center;gap:6px"><div style="width:300px;height:110px;border:7px solid #fff;border-radius:20px;padding:8px;position:relative">
       <div id="bf" style="height:100%;border-radius:10px;background:#3ccf6e"></div><div id="bp" style="position:absolute;inset:0;display:flex;align-items:center;justify-content:center;font-weight:900;font-size:44px;color:#fff;text-shadow:0 3px 0 #000">100%</div></div>
       <div style="width:16px;height:46px;background:#fff;border-radius:0 8px 8px 0"></div></div>
       <div class="hl stroke" style="font-size:62px;color:#ff5a52;margin-top:14px;white-space:nowrap" id="tl">DAH TAK LARAT</div>`, 'left:60px;top:950px');
  },
  upd(t, o) {
    ap(o.t, pop(t, 14.3, 0, { from: .7, dy: 20 }));
    [15.68, 17.28, 18.06].forEach((s, i) => ap(o.rows[i], pop(t, s, 0, { from: .5, dy: 40 })));
    ap(o.bat, pop(t, 18.6, 0, { from: .7 }));
    const lv = lerp(100, 4, eio(P(t, 18.7, 1.0)));
    $('bf').style.width = lv + '%'; $('bf').style.background = lv > 50 ? '#3ccf6e' : lv > 20 ? '#F5C542' : '#E53935';
    $('bp').textContent = Math.round(lv) + '%';
    const tl = $('tl'); tl.style.opacity = t > 19.66 ? 1 : 0; tl.style.transform = `scale(${lerp(1.6, 1, eo(P(t, 19.66, .2)))})`;
  }
});

// 4. ORDER MAKANAN + KOPI — phone mockup ----------------------------------------------------
scene({
  s: 20.14, e: 23.1, tr: 'zoom', bgShow: 1,
  L: t => CARDBR(),
  build(r, o) {
    o.ph = mk(r, `<div class="phone" style="position:relative"><div class="notch"></div><div class="scr" style="background:#f6f2ea">
      <div style="background:linear-gradient(135deg,#ff7a3d,#ff4d4d);height:170px;padding:70px 26px 0;color:#fff"><div style="font-weight:900;font-size:34px">🛵 FoodRun</div><div style="font-size:20px;opacity:.9">Hantar dalam 25 min</div></div>
      <div id="i1" style="margin:22px 18px 0;padding:16px;border-radius:20px;background:#fff;display:flex;gap:14px;align-items:center;box-shadow:0 4px 12px rgba(0,0,0,.08)"><span style="font-size:64px">🍔</span><div style="flex:1"><div style="font-weight:800;font-size:28px;color:#111">Set Makan Malam</div><div style="font-size:20px;color:#888">Penat, order je</div></div><div style="width:46px;height:46px;border-radius:50%;background:#1f8a3b;color:#fff;font-size:34px;display:flex;align-items:center;justify-content:center">✓</div></div>
      <div id="i2" style="margin:16px 18px 0;padding:16px;border-radius:20px;background:#fff;display:flex;gap:14px;align-items:center;box-shadow:0 4px 12px rgba(0,0,0,.08)"><span style="font-size:64px">☕</span><div style="flex:1"><div style="font-weight:800;font-size:28px;color:#111">Iced Latte</div><div style="font-size:20px;color:#888">Kopi petang</div></div><div style="width:46px;height:46px;border-radius:50%;background:#1f8a3b;color:#fff;font-size:34px;display:flex;align-items:center;justify-content:center">✓</div></div>
      <div id="ob" style="position:absolute;left:26px;right:26px;bottom:40px;padding:24px;border-radius:999px;background:#ff4d4d;color:#fff;text-align:center;font-weight:900;font-size:34px">ORDER SEKARANG</div>
      </div></div>`, 'left:70px;top:290px;transform-origin:50% 100%');
    o.hand = mk(r, `<div style="font-size:96px">👆</div>`, 'left:300px;top:1000px');
    o.tag = mk(r, `<div class="tape" style="font-size:40px;letter-spacing:4px;white-space:nowrap;background:#F5C542;color:#1a1205;text-shadow:none">+ BELANJA LAGI</div>`, 'left:540px;top:440px;transform-origin:0 50%');
  },
  upd(t, o) {
    const p = eo(P(t, 20.14, .5)); o.ph.style.opacity = C(p * 2); o.ph.style.transform = `translateY(${lerp(900, 0, p)}px) rotate(${lerp(-12, -3, p) + Math.sin(t * 1.3) * .6}deg)`;
    const a = pop(t, 20.98, 0, { from: .5, d: .3 }); $('i1').style.opacity = a.o; $('i1').style.transform = a.tr;
    const b = pop(t, 22.06, 0, { from: .5, d: .3 }); $('i2').style.opacity = b.o; $('i2').style.transform = b.tr;
    const tp = P(t, 21.2, .4); o.hand.style.opacity = t > 21.2 && t < 23 ? 1 : 0;
    o.hand.style.transform = `translate(${lerp(120, 0, eo(tp))}px,${lerp(140, 0, eo(tp))}px) scale(${(t > 21.6 && t < 21.75) || (t > 22.55 && t < 22.7) ? .85 : 1})`;
    $('ob').style.boxShadow = t > 21.6 ? `0 0 ${24 + 16 * Math.sin(t * 9)}px rgba(255,77,77,.9)` : 'none';
    const g = pop(t, 22.52, 0, { from: .3 }); g.tr += ' rotate(-4deg)'; ap(o.tag, g);
  }
});

// 5. AKU PENAT, AKU LAYAK REWARD ---------------------------------------------------------------
scene({
  s: 23.1, e: 27.68, tr: 'fade', shade: 1, tint: 'rgba(255,170,90,.12)',
  L: t => FULL(1.18 + .08 * eio(P(t, 23.1, 4.5)), 170),
  build(r, o) {
    o.a = mk(r, `<div style="font-family:Marker;font-size:76px;color:#fff;text-shadow:0 5px 0 #000;transform:rotate(-3deg);white-space:nowrap">"akhirnya… aku penat"</div>`, TITLE + ';top:290px');
    o.b = mk(r, `<div class="stamp" style="color:#F5C542;border-color:#F5C542;font-size:66px;white-space:nowrap">🎁 LAYAK REWARD</div>`, TITLE + ';top:440px');
  },
  upd(t, o) {
    const a = pop(t, 24.64, 0, { from: .6, dy: 20 }); a.tr += ` translateY(${Math.sin(t * 2) * 4}px)`; ap(o.a, a);
    ap(o.b, slam(t, 26.46, 0, -6));
  }
});

// 6. TAK SALAH — sticky note checklist ---------------------------------------------------------
scene({
  s: 27.68, e: 32.22, tr: 'slide', bgShow: 1, bgStyle: 'paper',
  L: t => LOWER(1.0 + .04 * P(t, 27.68, 4.5)),
  build(r, o) {
    o.t = mk(r, `<div class="hl" style="font-size:44px;color:#fff;white-space:nowrap">BETUL, <span class="gold">TAK SALAH</span> PUN</div>`, 'left:80px;top:280px');
    const N = [['REWARD DIRI', '#FFE27A', -2.5, 90], ['KITA LAYAK', '#F7C04A', 2, 330]];
    o.n = N.map((n, i) => mk(r, `<div class="note" style="position:relative;background:${n[1]};width:500px;padding-left:40px">${n[0]}<div class="tick"><svg width="44" height="44" viewBox="0 0 44 44"><path d="M8 23l9 9 19-20" stroke="#fff" stroke-width="7" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg></div>
      <div style="position:absolute;left:50%;top:-16px;width:120px;height:34px;margin-left:-60px;background:rgba(255,255,255,.55)"></div></div>`, `left:${n[3]}px;top:${370 + i * 150}px`));
    o.rot = N.map(n => n[2]);
  },
  upd(t, o) {
    ap(o.t, pop(t, 27.75, 0, { from: .7, dy: 20 }));
    [29.76, 30.96].forEach((s, i) => { const st = pop(t, s, 0, { from: 1.6, rot: o.rot[i] * 4, ease: eo, d: .25 }); st.tr += ` rotate(${o.rot[i]}deg)`; ap(o.n[i], st);
      const tk = o.n[i].querySelector('.tick'); tk.style.transform = `scale(${back(P(t, s + .3, .3))})`; tk.style.opacity = C(P(t, s + .3, .1)); });
  }
});

// 7. KEPERLUAN vs KEHENDAK — split comparison ----------------------------------------------------
scene({
  s: 32.22, e: 37.44, tr: 'zoom', bgShow: 1,
  L: t => PIP(650, 280, 280),
  build(r, o) {
    o.q = mk(r, `<div style="font-family:Marker;font-size:58px;color:#F5C542;line-height:1.05">tapi bila<br>kita fikir…</div>`, 'left:70px;top:300px');
    o.l = mk(r, `<div style="width:400px;height:560px;border-radius:30px;background:rgba(31,138,59,.18);border:4px solid #3ccf6e;padding:30px;text-align:center">
      <div style="font-size:96px">🍚</div><div class="hl" style="font-size:46px;color:#fff;margin-top:10px">KEPERLUAN</div><div style="color:#c8f0d4;font-weight:600;font-size:28px;margin-top:14px;line-height:1.4">makan<br>sewa<br>bil</div>
      <div id="kx" style="position:absolute;inset:0;display:flex;align-items:center;justify-content:center;font-size:300px;color:#E53935;font-weight:900;text-shadow:0 8px 0 #000;opacity:0">✕</div></div>`, 'left:60px;top:620px');
    o.r = mk(r, `<div style="width:400px;height:560px;border-radius:30px;background:rgba(245,197,66,.14);border:4px solid #F5C542;padding:30px;text-align:center">
      <div style="font-size:96px">🛍️</div><div class="hl" style="font-size:46px;color:#F5C542;margin-top:10px">KEHENDAK</div><div style="color:#f3e2b0;font-weight:600;font-size:28px;margin-top:14px;line-height:1.4">"nak reward<br>diri sendiri"</div></div>`, 'left:520px;top:620px');
    o.vs = mk(r, `<div style="width:100px;height:100px;border-radius:50%;background:#120d06;border:4px solid #F5C542;color:#F5C542;font-weight:900;font-size:40px;display:flex;align-items:center;justify-content:center">VS</div>`, 'left:440px;top:850px');
  },
  upd(t, o) {
    ap(o.q, pop(t, 32.3, 0, { from: .7, dy: 20 }));
    const a = pop(t, 33.8, 0, { from: .4, dy: 80 }); ap(o.l, a); ap(o.r, pop(t, 35.14, 0, { from: .4, dy: 80 })); ap(o.vs, pop(t, 35.3, 0, { from: .2 }));
    const x = $('kx'); x.style.opacity = C(P(t, 36.66, .08)); x.style.transform = `scale(${lerp(2.4, 1, eo(P(t, 36.66, .2)))})`;
    o.l.style.filter = t > 36.66 ? 'grayscale(.7) brightness(.7)' : 'none';
  }
});

// 8. HARGAI DIRI SENDIRI? — glass type ----------------------------------------------------------
scene({
  s: 37.44, e: 43.42, tr: 'zoom', tint: 'rgba(80,50,140,.14)',
  L: t => FULL(1.06 + .14 * eio(P(t, 37.44, 6)), 60),
  build(r, o) {
    o.g = mk(r, `<div class="glass" style="padding:28px 40px;display:inline-block"><div class="hl" style="font-size:32px;color:#fff;letter-spacing:3px;white-space:nowrap">BELANJA = SATU-SATUNYA CARA</div>
      <div style="font-family:Play;font-style:italic;font-weight:900;font-size:92px;color:#F5C542;line-height:1.05;white-space:nowrap">hargai diri?</div></div>`, TITLE + ';top:300px');
    o.q = mk(r, `<div style="font-family:Marker;font-size:200px;color:#F5C542;text-shadow:0 8px 0 #000">?</div>`, 'left:790px;top:470px;transform-origin:50% 80%');
  },
  upd(t, o) {
    ap(o.g, pop(t, 39.28, 0, { from: .6, dy: 30 }));
    const q = pop(t, 42.74, 0, { from: .2, rot: -30 }); q.tr += ` rotate(${jit(t, 3) * 4}deg)`; ap(o.q, q);
  }
});

// 9. SIKIT-SIKIT → RESIT PANJANG -----------------------------------------------------------------
scene({
  s: 43.42, e: 46.88, tr: 'slide', bgShow: 1, bgStyle: 'red',
  L: t => CARDBR(),
  build(r, o) {
    const it = ['☕ KOPI', '🍔 MAKAN', '🧋 BUBBLE TEA', '🛍️ SHOPPING', '🚗 GRAB', '🍰 DESSERT', '📦 PARCEL'];
    o.rc = mk(r, `<div style="width:420px;overflow:hidden;height:0" id="rcw"><div style="width:420px;padding:30px 30px 40px;background:#fbfaf6;font-family:'JetBrains Mono',monospace;color:#222;box-shadow:0 20px 40px rgba(0,0,0,.5);
      -webkit-mask-image:linear-gradient(#000 96%,transparent)"><div style="text-align:center;font-weight:800;font-size:30px;letter-spacing:4px">RESIT BULAN NI</div><div style="border-top:3px dashed #999;margin:14px 0"></div>
      ${it.map(x => `<div style="display:flex;justify-content:space-between;font-size:28px;font-weight:700;margin:10px 0"><span>${x}</span><span>✓</span></div>`).join('')}
      <div style="border-top:3px dashed #999;margin:14px 0"></div><div style="display:flex;justify-content:space-between;font-size:34px;font-weight:900"><span>TOTAL</span><span style="color:#E53935">???</span></div></div></div>`, 'left:70px;top:290px');
    o.st = mk(r, `<div class="stamp" style="font-size:50px;padding:2px 18px;white-space:nowrap">DAH BANYAK!</div>`, 'left:60px;top:700px');
    o.t = mk(r, `<div class="hl stroke" style="font-size:54px;color:#fff;white-space:nowrap">HUJUNG BULAN…</div>`, 'left:540px;top:560px');
  },
  upd(t, o) {
    $('rcw').style.height = (eio(P(t, 43.6, 2.4)) * 820) + 'px'; o.rc.style.opacity = t > 43.5 ? 1 : 0;
    ap(o.t, pop(t, 45.52, 0, { from: .6 }));
    ap(o.st, slam(t, 46.44, 0, -10));
  }
});

// 10. SAYA TAK NAK HIDUP ANDA SUSAH — pullback reveal ------------------------------------------
scene({
  s: 46.88, e: 50.26, tr: 'zoom', tint: 'rgba(255,190,80,.08)',
  L: t => FULL(lerp(1.4, 1.06, eio(P(t, 46.88, 1.6))), 40),
  build(r, o) {
    o.a = mk(r, `<div class="hl" style="font-size:52px;color:#fff;white-space:nowrap">SAYA <span class="gold">TAK NAK</span></div>`, TITLE + ';top:290px');
    o.b = mk(r, `<div class="glass" style="display:inline-block;padding:16px 36px"><div class="hl" style="font-size:62px;color:#fff;white-space:nowrap">HIDUP ANDA <span style="color:#ff5a52">SUSAH</span> 💔</div></div>`, TITLE + ';top:370px');
  },
  upd(t, o) { ap(o.a, pop(t, 48.04, 0, { from: .7, dy: 20 })); ap(o.b, pop(t, 48.76, 0, { from: .4 })); }
});

// 11. TURNING POINT — GAJI → ASINGKAN (factory line split) -------------------------------------
scene({
  s: 50.26, e: 56.94, tr: 'zoom', bgShow: 1,
  L: t => SPLITR(1.0 + .04 * P(t, 50.26, 6.6)),
  build(r, o) {
    o.t = mk(r, `<div class="hl" style="font-size:38px;color:#e8d9b0;letter-spacing:4px">MULAKAN SATU</div><div style="font-family:Marker;font-size:76px;color:#F5C542;line-height:1">benda kecil ✨</div>`, 'left:70px;top:290px');
    o.g = mk(r, `<div style="width:380px;padding:24px;border-radius:26px;background:linear-gradient(135deg,#1f6b3a,#0f3d20);border:3px solid #6fe39a;color:#fff;text-align:center;box-shadow:0 16px 40px rgba(0,0,0,.5)">
       <div style="font-size:64px">💵</div><div class="hl" style="font-size:52px">GAJI MASUK</div><div style="font-weight:700;font-size:24px;letter-spacing:3px;color:#bff0cf">HARI GAJI</div></div>`, 'left:60px;top:500px');
    o.bar = mk(r, `<div style="width:380px;height:90px;border-radius:20px;overflow:hidden;display:flex;border:3px solid #fff">
       <div id="sv" style="width:0;background:linear-gradient(90deg,#C9930F,#FFE48A);display:flex;align-items:center;justify-content:center;font-weight:900;font-size:26px;color:#1a1205;white-space:nowrap;overflow:hidden">SIMPAN</div>
       <div style="flex:1;background:#2b2b2b;display:flex;align-items:center;justify-content:center;font-weight:800;font-size:26px;color:#ddd">BELANJA</div></div>`, 'left:60px;top:800px');
    o.k = mk(r, `<div class="tape" style="font-size:58px;background:#F5C542;color:#1a1205;text-shadow:none">ASINGKAN DULU</div>`, 'left:40px;top:950px;transform-origin:0 50%');
    o.coin = mk(r, `<div style="font-size:70px">🪙</div>`, 'left:120px;top:780px');
  },
  upd(t, o) {
    ap(o.t, pop(t, 50.4, 0, { from: .6, dy: 30 }));
    ap(o.g, pop(t, 53.9, 0, { from: .3 }));
    ap(o.bar, pop(t, 54.6, 0, { from: .8, dy: 20 }));
    $('sv').style.width = (eo(P(t, 55.52, .7)) * 34) + '%';
    const k = slam(t, 56.2, 0, -4); ap(o.k, k);
    const cp = P(t, 55.52, .6); o.coin.style.opacity = cp > 0 && cp < 1 ? 1 : 0; o.coin.style.transform = `translateY(${lerp(-200, 0, cp * cp)}px) rotate(${cp * 360}deg)`;
  }
});

// 12. KE DALAM SIMPANAN — tabung + pelbagai simpanan ----------------------------------------------
scene({
  s: 56.94, e: 61.58, tr: 'slide', bgShow: 1, bgStyle: 'paper',
  L: t => LOWER(1.0 + .04 * P(t, 56.94, 4.6)),
  build(r, o) {
    o.j = mk(r, `<div style="position:relative;width:250px;height:330px"><div style="position:absolute;bottom:0;width:250px;height:270px;border-radius:40px 40px 60px 60px;background:rgba(255,255,255,.12);border:5px solid rgba(255,255,255,.7);overflow:hidden">
       <div id="fill" style="position:absolute;bottom:0;left:0;right:0;height:0;background:linear-gradient(#FFE48A,#C9930F)"></div></div>
       <div style="position:absolute;bottom:90px;left:0;right:0;text-align:center;font-weight:900;font-size:30px;color:#1a1205;letter-spacing:2px">SIMPANAN</div>
       <div style="position:absolute;top:40px;left:65px;width:120px;height:22px;border-radius:8px;background:#9a6b00"></div></div>`, 'left:80px;top:300px');
    o.c = [0, 1, 2].map(i => mk(r, `<div style="font-size:64px">🪙</div>`, `left:${150 + i * 40}px;top:250px`));
    const CH = [['🏦', 'BANK'], ['🐷', 'TABUNG'], ['🥇', 'EMAS']];
    o.ch = CH.map((c, i) => mk(r, `<div class="glass" style="padding:14px 26px;display:inline-flex;gap:14px;align-items:center;color:#fff;font-weight:900;font-size:38px"><span style="font-size:48px">${c[0]}</span>${c[1]}</div>`, `left:${400 + (i % 2) * 40}px;top:${300 + i * 120}px`));
    o.tag = mk(r, `<div style="font-family:Marker;font-size:44px;color:#F5C542;transform:rotate(-4deg);white-space:nowrap">apa-apa pun boleh!</div>`, 'left:420px;top:650px');
  },
  upd(t, o) {
    ap(o.j, pop(t, 57.0, 0, { from: .6, dy: 40 }));
    o.c.forEach((c, i) => { const s = 57.9 + i * .3, p = P(t, s, .45); c.style.opacity = p > 0 && p < 1 ? 1 : 0; c.style.transform = `translateY(${p * p * 260}px) rotate(${p * 200}deg)`; });
    $('fill').style.height = (eo(P(t, 58.3, 1.4)) * 70) + '%';
    [59.7, 60.22, 60.52].forEach((s, i) => ap(o.ch[i], pop(t, s, 0, { from: .4, dy: 30 })));
    ap(o.tag, pop(t, 61.02, 0, { from: .5 }));
  }
});

// 13. BUKAN TANPA GEMBIRA → SAYANG DIRI DULU ------------------------------------------------------
scene({
  s: 61.58, e: 68.4, tr: 'zoom', shade: 1,
  L: t => FULL(1.16 + .08 * eio(P(t, 61.58, 6.8)), 170),
  build(r, o) {
    o.q = mk(r, `<div style="font-family:Marker;font-size:64px;color:#fff;text-shadow:0 5px 0 #000">sebab apa?</div>`, TITLE + ';top:300px');
    o.a = mk(r, `<div class="hl" style="font-size:44px;color:#fff;letter-spacing:4px">KITA BUKAN PERLU HIDUP</div><div class="tape" style="font-size:64px;letter-spacing:6px;white-space:nowrap;margin-top:10px">TANPA GEMBIRA</div>`, TITLE + ';top:290px');
    o.x = mk(r, `<div class="stamp" style="font-size:60px;padding:2px 24px">BUKAN!</div>`, 'left:90px;top:470px');
    o.b = mk(r, `<div class="hl" style="font-size:44px;color:#fff;letter-spacing:4px">CUMA PERLU BELAJAR</div><div style="font-family:Play;font-style:italic;font-weight:900;font-size:100px;color:#F5C542;line-height:1.05;text-shadow:0 6px 0 #000,0 0 40px rgba(245,197,66,.45);white-space:nowrap">sayang diri dulu</div>`, TITLE + ';top:290px');
    o.hs = [...Array(8)].map((_, i) => mk(r, `<div style="font-size:${50 + (i % 3) * 16}px">${i % 2 ? '💛' : '✨'}</div>`, 'left:510px;top:520px'));
  },
  upd(t, o) {
    ap(o.q, pop(t, 61.6, 62.5, { from: .6 }));
    ap(o.a, pop(t, 62.56, 65.0, { from: .6, dy: 20 }));
    ap(o.x, slam(t, 63.36, 65.0, -12));
    ap(o.b, pop(t, 65.04, 0, { from: .5, dy: 30 }));
    o.hs.forEach((h, i) => { const p = P(t, 66.58, 1.2), a = i / 8 * Math.PI * 2; h.style.opacity = p > 0 ? (1 - p) : 0;
      h.style.transform = `translate(${Math.cos(a) * 330 * eo(p)}px,${Math.sin(a) * 200 * eo(p) - 60 * p}px) scale(${.5 + eo(p)})`; });
  }
});

// 14. BERMANFAAT → SAVE & SHARE -------------------------------------------------------------------
scene({
  s: 68.4, e: 75.14, tr: 'slide', bgShow: 1,
  L: t => PIP(600, 300, 320),
  build(r, o) {
    o.t = mk(r, `<div class="hl" style="font-size:40px;color:#e8d9b0;letter-spacing:4px">KALAU VIDEO NI</div><div style="font-family:Play;font-style:italic;font-weight:900;font-size:84px;color:#F5C542;line-height:1">bermanfaat</div>`, 'left:70px;top:330px');
    const B = [['🔖', 'SAVE', '#F5C542', '#1a1205'], ['↗', 'SHARE', '#fff', '#111']];
    o.b = B.map((b, i) => mk(r, `<div style="display:inline-flex;align-items:center;gap:20px;padding:26px 50px;border-radius:999px;background:${b[2]};color:${b[3]};font-weight:900;font-size:58px;box-shadow:0 16px 40px rgba(0,0,0,.45)"><span>${b[0]}</span>${b[1]}</div>`, `left:${80 + i * 60}px;top:${700 + i * 170}px`));
    o.r = mk(r, `<div style="color:#fff;font-weight:800;font-size:40px;white-space:nowrap">kepada rakan anda 👭</div>`, 'left:150px;top:1060px');
    o.hand = mk(r, `<div style="font-size:90px">👆</div>`, 'left:330px;top:760px');
  },
  upd(t, o) {
    ap(o.t, pop(t, 70.9, 0, { from: .5, dy: 20 }));
    ap(o.b[0], pop(t, 72.9, 0, { from: .3 })); ap(o.b[1], pop(t, 73.5, 0, { from: .3 }));
    o.b.forEach((b, i) => { const s = [73.05, 73.65][i]; if (t > s && t < s + .15) b.style.transform += ' scale(.9)'; });
    ap(o.r, pop(t, 74.5, 0, { from: .6, dy: 20 }));
    const ty = t < 73.4 ? 0 : 170, p = P(t, 72.7, .35); o.hand.style.opacity = t > 72.7 && t < 75.1 ? 1 : 0;
    o.hand.style.transform = `translate(${lerp(140, 0, eo(p))}px,${lerp(120, 0, eo(p)) + ty}px)`;
  }
});

// 15. SIMPANAN EMAS → KLIK LINK -------------------------------------------------------------------
const BAR = '<svg width=300 height=190 viewBox="0 0 300 190"><defs><linearGradient id=gg x1=0 x2=1 y1=0 y2=1><stop offset=0 stop-color="#FFF1B0"/><stop offset=.45 stop-color="#E8B23A"/><stop offset=1 stop-color="#8A5E00"/></linearGradient></defs><path d="M40 20H260L290 170H10Z" fill="url(#gg)" stroke="#6b4700" stroke-width="5"/><path d="M60 34H240L262 156H38Z" fill="none" stroke="rgba(255,255,255,.45)" stroke-width="3"/><text x=150 y=88 text-anchor=middle font-family="Mont" font-weight=900 font-size=30 fill="#5a3c00">PUBLIC GOLD</text><text x=150 y=126 text-anchor=middle font-family="Mont" font-weight=700 font-size=20 fill="#5a3c00">999.9 FINE</text></svg>';
scene({
  s: 75.14, e: 80.45, tr: 'zoom', bgShow: 1,
  L: t => CARDBR(),
  build(r, o) {
    o.t = mk(r, `<div class="hl" style="font-size:40px;color:#e8d9b0;letter-spacing:4px">NAK MULA BUAT</div><div class="hl gold stroke" style="font-size:86px;white-space:nowrap">SIMPANAN EMAS?</div>`, 'left:70px;top:300px');
    o.bar = mk(r, BAR, 'left:90px;top:520px;filter:drop-shadow(0 20px 30px rgba(0,0,0,.6))');
    o.sp = [...Array(6)].map((_, i) => mk(r, `<div style="font-size:${34 + (i % 3) * 12}px">✨</div>`, `left:${110 + i * 45}px;top:${520 + (i % 2) * 120}px`));
    o.btn = mk(r, `<div class="btn" style="font-size:34px;padding:20px 30px;white-space:nowrap">KLIK LINK DI BAWAH 👇</div>`, 'left:60px;top:1060px');
  },
  upd(t, o) {
    ap(o.t, pop(t, 75.2, 0, { from: .6, dy: 20 }));
    const p = eo(P(t, 78.9, .35)); o.bar.style.opacity = C(p * 3); o.bar.style.transform = `translateY(${lerp(-500, 0, p)}px) rotate(${lerp(-25, -6, p) + Math.sin(t * 2) * 1.5}deg)`;
    o.sp.forEach((s, i) => { const k = (t - 79.0 + i * .13) % .8; s.style.opacity = t > 79 ? Math.sin(C(k / .8) * Math.PI) : 0; s.style.transform = `scale(${.5 + k})`; });
    const b = pop(t, 79.52, 0, { from: .3 }); b.tr += ` scale(${1 + .04 * Math.sin(Math.max(0, t - 80) * 7)})`; ap(o.btn, b);
  }
});

// 16. OUTRO end card ---------------------------------------------------------------------------------
scene({
  s: 80.45, e: 99, tr: 'slide', bgShow: 1,
  L: t => PIP(390, 420, 300),
  build(r, o) {
    o.wm = mk(r, `<img src="../adila_gold_wm.png" style="height:120px">`, TITLE + ';top:790px');
    o.sub = mk(r, `<div style="color:#fff;font-weight:700;font-size:34px;letter-spacing:6px">DEALER AKTIF PUBLIC GOLD</div>`, TITLE + ';top:940px');
    o.btn = mk(r, `<div class="btn" style="font-size:46px;padding:24px 46px">KLIK LINK DI BAWAH 👇</div>`, 'left:60px;right:140px;top:1080px;display:flex;justify-content:center');
  },
  upd(t, o) { ap(o.wm, pop(t, 80.55, 0, { from: .6 })); ap(o.sub, pop(t, 80.7, 0, { from: .8, dy: 20 })); ap(o.btn, { o: 1, tr: `scale(${1 + .04 * Math.sin(t * 7)})` }); }
});

