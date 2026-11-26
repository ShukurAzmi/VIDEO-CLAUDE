// ---------- babak: "Edisi Harry Potter — 0.5G Limited Edition Gold Bar (box khas PG Jewel)" (masa = output) ----------
const SC=[];
function scene(o){o.root=E(G,'left:0;top:0;width:1080px;height:1920px','', 'g');o.build(o.root,o);SC.push(o)}
const outF=(t,e)=>1-cl((t-(e-.22))/.22);
const pill=(tx,bg='#3a2e14',c='#ddd',bd='#6b5520',fs=60)=>`<div style="display:inline-block;background:${bg};border:3px solid ${bd};color:${c};font:900 ${fs}px Mont;padding:10px 44px;border-radius:50px">${tx}</div>`;
const TW=()=>[[.18,.22],[.78,.3],[.62,.68],[.3,.8],[.85,.82]].map(([x,y])=>`<div class="tw" style="position:absolute;left:${x*100}%;top:${y*100}%;width:46px;height:46px;margin:-23px;opacity:0;background:radial-gradient(circle,#fff 0%,rgba(255,240,180,.9) 18%,transparent 55%);clip-path:polygon(50% 0,58% 42%,100% 50%,58% 58%,50% 100%,42% 58%,0 50%,42% 42%);filter:drop-shadow(0 0 8px #FFE680)"></div>`).join('');
const SHN='<div class="shn" style="position:absolute;top:-200px;left:0;width:120px;height:1400px;background:linear-gradient(90deg,transparent,rgba(255,246,200,.45),transparent);pointer-events:none;opacity:0"></div>';
const photo=(src,crop=null,pos='50% 50%')=>`<div class="ph" style="position:absolute;inset:0;border-radius:26px;overflow:hidden;border:5px solid #E8B830;box-shadow:0 18px 50px rgba(0,0,0,.7),0 0 40px rgba(245,197,66,.3);background:#000">`+
  `<img src="${src}" style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover;object-position:${pos}">`+SHN+TW()+`</div>`;
const kb=(el,t,t0,a=1,b=1.08,d=4)=>{const im=el.querySelector('.ph img');if(im){im.style.transformOrigin='50% 50%';im.style.transform=`scale(${lerp(a,b,cl((t-t0)/d))})`}
  el.querySelectorAll('.tw').forEach((w,i)=>{const p=((t-t0)*1.3+i*.37)%1.6;const k=p<.6?Math.sin(Math.PI*p/.6):0;w.style.opacity=t>t0+.3?k:0;w.style.transform=`scale(${.3+k}) rotate(${p*90}deg)`})};
const flip=(el,t,t0,dir=1,d=.6)=>{el.querySelector('.ph').style.transform=`perspective(1400px) rotateY(${dir*55*(1-eo((t-t0)/d))}deg)`};
const shine=(el,t,t0)=>{const s=el.querySelector('.shn');if(s){const k=cl((t-t0)/.9);s.style.transform=`translateX(${lerp(-500,900,k)}px) rotate(20deg)`;s.style.opacity=k>0&&k<1?1:0}};
const goldTx=(tx,sz)=>`<span class="gold" style="font:900 ${sz}px Mont">${tx}</span>`;
const card=(html,css='')=>`<div class="card" style="position:absolute;inset:0;${css}">${html}</div>`;
const mark=(ok,sz=110)=>`<div class="mk" style="position:absolute;right:-${sz*.3}px;top:-${sz*.3}px;width:${sz}px;height:${sz}px;border-radius:50%;background:${ok?'#2ecc71':'#e74c3c'};color:#fff;font:900 ${sz*.62}px Mont;display:flex;align-items:center;justify-content:center;box-shadow:0 6px 16px rgba(0,0,0,.6);border:4px solid #fff">${ok?'✓':'✕'}</div>`;
// kad emas mini (0.5G) — warna 4 koleksi
const minicard=(bg)=>`<div style="position:absolute;inset:0;border-radius:16px;background:${bg};border:4px solid #E8B830;box-shadow:0 10px 24px rgba(0,0,0,.6);overflow:hidden"><div class="bar" style="position:absolute;left:50%;top:50%;width:62px;height:96px;margin:-48px 0 0 -31px;font-size:14px;flex-direction:column;line-height:1.1;text-align:center">0.5G<span style="font-size:10px">999.9</span></div>${SHN}</div>`;
const topPill=(R,html,fs=40)=>E(R,'left:60px;right:140px;top:262px;text-align:center;white-space:nowrap',pill(html,'rgba(20,14,5,.85)','#fff','#E8B830',fs),'g');

// B1 (2.35) EDISI HARRY POTTER — foto box (p1)
scene({s:2.35,e:6.35,build(R,o){
  o.h=E(R,'left:60px;right:140px;top:280px;text-align:center;white-space:nowrap;line-height:1.05','<div style="font:800 44px Mont;color:#ddd">PUBLIC GOLD KELUARKAN</div>'+goldTx('EDISI HARRY POTTER',66),'g sh');
  o.p=E(R,'left:200px;top:470px;width:600px;height:640px',photo('img/p1s.jpg',null,'40% 52%'));
  o.l=E(R,'left:60px;right:140px;top:1150px;text-align:center;white-space:nowrap',pill('✨ 0.5G LIMITED EDITION','rgba(20,14,5,.92)','#F5C542','#E8B830',48),'g');
},upd(t,o){const f=outF(t,o.e);st(o.h,mix(pop(t,2.4),{o:f}));st(o.p,mix(slide(t,2.55,0,80,.5),{o:f,r:-1.5}));flip(o.p,t,2.55,1,.7);kb(o.p,t,2.55,1.12,1.0,3.5);shine(o.p,t,3.1);
  st(o.l,mix(pop(t,5.34),{o:f}));
}});

// B2 (7.1) 2 CARA DAPATKAN: e-commerce app / beli direct PG Jewel
scene({s:7.1,e:12.15,build(R,o){
  o.h=E(R,'left:60px;right:140px;top:300px;text-align:center;white-space:nowrap','<div style="font:800 46px Mont;color:#ddd">BOLEH DAPATKAN MELALUI</div>'+goldTx('2 CARA',110),'g sh');
  o.c1=E(R,'left:140px;top:560px;width:720px;height:220px',card(`<div style="display:flex;align-items:center;gap:30px;height:100%;padding-left:40px"><div style="font-size:96px">📱</div><div style="line-height:1.1"><div style="font:800 34px Mont;color:#ddd">CARA 1</div><div class="gold" style="font:900 56px Mont;white-space:nowrap">E-COMMERCE APP</div></div></div>`));
  o.c2=E(R,'left:140px;top:840px;width:720px;height:220px',card(`<div style="display:flex;align-items:center;gap:30px;height:100%;padding-left:40px"><div style="font-size:96px">🏬</div><div style="line-height:1.1"><div style="font:800 34px Mont;color:#ddd">CARA 2 · BELI DIRECT</div><div class="gold" style="font:900 60px Mont;white-space:nowrap">PG JEWEL</div></div></div>`));
},upd(t,o){const f=outF(t,o.e);st(o.h,mix(pop(t,7.15),{o:f}));st(o.c1,mix(slide(t,9.4,-120,0,.45),{o:f}));st(o.c2,mix(slide(t,10.6,120,0,.45),{o:f}));}});

// B3 (12.2) TAPI — e-commerce app ✕ tak dapat box special edition
scene({s:12.2,e:17.0,build(R,o){
  o.h=E(R,'left:60px;right:140px;top:300px;text-align:center;white-space:nowrap',goldTx('YANG SPECIAL…',84),'g sh');
  o.c1=E(R,'left:160px;top:500px;width:680px;height:260px',card(`<div style="text-align:center;padding-top:30px;line-height:1.15"><div style="font-size:80px">📱</div><div style="font:900 50px Mont;color:#fff;white-space:nowrap">E-COMMERCE APP</div></div>`)+'<div class="mk1" style="opacity:0">'+mark(false,120)+'</div>');
  o.n=E(R,'left:60px;right:140px;top:830px;text-align:center;white-space:nowrap;line-height:1.15','<div style="font:900 50px Mont;color:#ff8a80">TAK DAPAT</div><div style="font:900 50px Mont;color:#fff">📦 SPECIAL EDITION BOX</div>','g sh');
},upd(t,o){const f=outF(t,o.e);st(o.h,mix(pop(t,12.25),{o:f}));st(o.c1,mix(slide(t,14.0,0,80,.45),{o:f}));const m=o.c1.querySelector('.mk1');const p=pop(t,15.67);m.style.opacity=p.o;m.style.transform=`scale(${p.s})`;
  st(o.n,mix(pop(t,15.75),{o:f}));}});

// B3b (17.05, nob — Adila tunjuk box) SPECIAL EDITION BOX
scene({s:17.05,e:20.1,nob:1,build(R,o){o.t=topPill(R,'📦 <span class="gold">SPECIAL EDITION BOX</span>',42)},upd(t,o){st(o.t,mix(pop(t,17.1),{o:outF(t,o.e)}))}});

// B4 (20.15) ✓ KENA BELI DIRECT DI PG JEWEL — foto p2 (logo PG Jewel + box)
scene({s:20.15,e:23.1,build(R,o){
  o.h=E(R,'left:60px;right:140px;top:280px;text-align:center;white-space:nowrap;line-height:1.05','<div style="font:800 46px Mont;color:#ddd">KENA BELI DIRECT DI</div>'+goldTx('PG JEWEL',100),'g sh');
  o.p=E(R,'left:220px;top:480px;width:560px;height:700px',photo('img/p2s.jpg',null,'30% 35%')+'<div class="mk1" style="position:absolute;right:0;top:0;opacity:0">'+mark(true,130)+'</div>');
},upd(t,o){const f=outF(t,o.e);st(o.h,mix(pop(t,20.2),{o:f}));st(o.p,mix(slide(t,20.3,0,80,.5),{o:f,r:1.5}));flip(o.p,t,20.3,-1,.7);kb(o.p,t,20.3,1,1.1,2.8);shine(o.p,t,20.9);
  const m=o.p.querySelector('.mk1');const p=pop(t,22.45);m.style.opacity=p.o;m.style.transform=`scale(${p.s})`;}});

// B5 (23.2) BELI 4 KOLEKSI → DAPAT 1 BOX
const COL=['linear-gradient(160deg,#8e1b2b,#4a0d16)','linear-gradient(160deg,#1f5a3a,#0c2a1b)','linear-gradient(160deg,#243a8e,#101c47)','linear-gradient(160deg,#c9a227,#6e5410)'];
scene({s:23.2,e:27.6,build(R,o){
  o.h=E(R,'left:60px;right:140px;top:290px;text-align:center;white-space:nowrap;line-height:1.05','<div style="font:800 46px Mont;color:#ddd">BELI</div>'+goldTx('4 KOLEKSI',100),'g sh');
  o.k=COL.map((c,i)=>E(R,`left:${150+i*185}px;top:520px;width:150px;height:200px`,minicard(c)));
  o.eq=E(R,'left:60px;right:140px;top:760px;text-align:center;font:900 80px Mont;color:#fff','⬇','g sh');
  o.b=E(R,'left:60px;right:140px;top:880px;text-align:center;white-space:nowrap',pill('🎁 DAPAT <span class="gold">1 BOX</span> KHAS','rgba(20,14,5,.92)','#fff','#E8B830',64),'g');
},upd(t,o){const f=outF(t,o.e);st(o.h,mix(pop(t,23.25),{o:f}));o.k.forEach((k,i)=>{st(k,mix(pop(t,23.45+i*.18),{o:f,r:(i-1.5)*3+wob(t,1.5,.6,i)}));shine(k,t,24.4+i*.15)});
  st(o.eq,mix(pop(t,25.3),{o:f,y:wob(t,8,1.2)}));st(o.b,mix(pop(t,26.5),{o:f,s:1+.03*Math.sin(t*6)}));}});

// B6 (27.65, nob) LIMITED EDITION — hanya beli direct
scene({s:27.65,e:31.5,nob:1,build(R,o){o.t=topPill(R,'✨ <span class="gold">LIMITED EDITION</span> SAHAJA',42)},upd(t,o){st(o.t,mix(pop(t,27.8),{o:outF(t,o.e)}))}});
// B7 (32.6, nob) BOX + COVER
scene({s:32.6,e:36.6,nob:1,build(R,o){o.t=topPill(R,'📦 BOX + <span class="gold">COVER</span>',46)},upd(t,o){st(o.t,mix(pop(t,32.62),{o:outF(t,o.e)}))}});
// B8 (36.85, nob) BOLEH BUKA
scene({s:36.85,e:38.6,nob:1,build(R,o){o.t=topPill(R,'🔓 BOLEH <span class="gold">BUKA</span>',46)},upd(t,o){st(o.t,mix(pop(t,37.5),{o:outF(t,o.e)}))}});
// B9 (38.7, nob) 4 SLOT CARD — titik 1..4
scene({s:38.7,e:45.0,nob:1,build(R,o){o.t=topPill(R,'🃏 <span class="gold">4 SLOT CARD</span>',46);
  o.d=E(R,'left:60px;right:140px;top:360px;display:flex;justify-content:center;gap:22px',COL.map(c=>`<div class="dt" style="width:46px;height:46px;border-radius:50%;background:${c};border:3px solid #E8B830;box-shadow:0 4px 10px rgba(0,0,0,.6)"></div>`).join(''),'g')},
 upd(t,o){const f=outF(t,o.e);st(o.t,mix(pop(t,39.64),{o:f}));o.d.querySelectorAll('.dt').forEach((d,i)=>{const p=pop(t,40.1+i*.2);d.style.opacity=p.o*f;d.style.transform=`scale(${p.s})`})}});
// B10 (45.1, nob) MASUKKAN GOLD BAR ONE BY ONE
scene({s:45.1,e:48.9,nob:1,build(R,o){o.t=topPill(R,'🥇 MASUK <span class="gold">GOLD BAR</span> 1 BY 1',40)},upd(t,o){st(o.t,mix(pop(t,46.42),{o:outF(t,o.e)}))}});

// B11 (51.95) CTA JOM KE PG JEWEL BERDEKATAN — foto p1
scene({s:51.95,e:56.2,build(R,o){
  o.h=E(R,'left:60px;right:140px;top:280px;text-align:center;white-space:nowrap;line-height:1.05','<div style="font:800 50px Mont;color:#ddd">JOM DATANG KE</div>'+goldTx('PG JEWEL',104),'g sh');
  o.p=E(R,'left:230px;top:500px;width:540px;height:620px',photo('img/p1s.jpg',null,'30% 20%'));
  o.l=E(R,'left:60px;right:140px;top:1150px;text-align:center;white-space:nowrap',pill('📍 YANG BERDEKATAN','rgba(20,14,5,.92)','#F5C542','#E8B830',52),'g');
},upd(t,o){const f=outF(t,o.e);st(o.h,mix(pop(t,52.0),{o:f}));st(o.p,mix(slide(t,52.2,0,80,.5),{o:f,r:-1.5}));flip(o.p,t,52.2,1,.7);kb(o.p,t,52.2,1.1,1.0,3.5);shine(o.p,t,52.8);
  st(o.l,mix(pop(t,54.48),{o:f}));}});

// B12 (56.4, nob — klip sambungan produk) penutup
scene({s:56.4,e:999,nob:1,build(R,o){o.t=topPill(R,'✨ <span class="gold">0.5G LIMITED EDITION</span>',42);
  o.b=E(R,'left:60px;right:140px;top:345px;text-align:center;white-space:nowrap',pill('📍 DAPATKAN DI PG JEWEL','rgba(20,14,5,.85)','#fff','#E8B830',34),'g')},
 upd(t,o){st(o.t,pop(t,56.5));st(o.b,pop(t,57.3))}});
