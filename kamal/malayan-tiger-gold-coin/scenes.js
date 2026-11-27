// ---------- babak: "Gold Coin Limited Edition Malayan Tiger 2026" (masa = MASA OUTPUT selepas potong jeda; S() tersedia jika perlu masa sumber) ----------
// ---------- babak v2 (kurang effect, lebih green screen, grade Kamal): "PG Jewel — Public Gold kini ada barang kemas" (masa ditulis dalam MASA SUMBER, ditukar dengan S()) ----------
const S=x=>fromSrc(x,SEGS,OFFS);
const FACE=[600,800];
const L={FULL:{x:0,y:0,s:1,r:0,b:0},PUNCH:{x:FACE[0]*(1-1.08),y:FACE[1]*(1-1.08)+20,s:1.08,r:0,b:0}};
// DIGITAL ZOOM: 4 kali sahaja, lembut 1.08x, senyap
const LT=[[0,'FULL'],[6.8,'PUNCH',.8],[11.85,'FULL',.6],[26.75,'PUNCH',.8],[29.8,'FULL',.6]];
function layoutAt(t){let cur=L.FULL,prev=L.FULL,k=1;
  for(let i=0;i<LT.length;i++){const [s,n,d=.3]=LT[i];if(t>=s){prev=i?L[LT[i-1][1]]:L.FULL;cur=L[n];k=eio((t-s)/d)}}
  const o={};for(const p of['x','y','s','r','b'])o[p]=lerp(prev[p],cur[p],k);return o}
// FREEZE (masa output, tempoh)
const FRZ=[[15.95,.85],[19.85,.85]];

const PEND=[];
function setImg(im,src){if(im.getAttribute('src')!==src){im.src=src;PEND.push(im.decode().catch(()=>{}))}}
const brF=(clip,t,t0,off=0,n=150)=>`brf/${clip}/${String(Math.min(n,Math.max(1,Math.floor((t-t0+off)*30)+1))).padStart(5,'0')}.jpg`;
const coin=(sz=150)=>`<div style="width:${sz}px;height:${sz}px;border-radius:50%;background:radial-gradient(circle at 35% 30%,#FFF6C8,#F5C542 40%,#B8860B 85%);border:6px solid #E8B830;box-shadow:inset 0 0 0 8px rgba(120,80,0,.25),0 10px 24px rgba(0,0,0,.55);display:flex;align-items:center;justify-content:center;flex-direction:column;color:#5a3d00;font:900 ${sz*.16}px Mont;line-height:1.1">DINAR<span style="font-size:${sz*.11}px">PUBLIC GOLD</span></div>`;
const glass=(html,css='')=>`<div class="glass" style="position:absolute;inset:0;${css}">${html}</div>`;
// tanda ✓ dilukis (SVG) — CHECK GROW
const ckSvg=(sz,col='#2ecc71')=>`<svg class="cks" width="${sz}" height="${sz}" viewBox="0 0 100 100" style="position:absolute;inset:0"><circle class="cc" cx="50" cy="50" r="46" fill="${col}"/><path class="cp" d="M28 52 L44 68 L74 34" fill="none" stroke="#fff" stroke-width="11" stroke-linecap="round" stroke-linejoin="round" stroke-dasharray="80" stroke-dashoffset="80"/></svg>`;
const ckUpd=(el,t,t0)=>{const c=el.querySelector('.cks');if(!c)return;const p=pop(t,t0,.35);c.style.opacity=p.o;c.style.transform=`scale(${p.s})`;c.querySelector('.cp').style.strokeDashoffset=80*(1-eo((t-t0-.08)/.3))};
// PAPER CUT: tepi koyak
const torn=(n=28,seed=1)=>{const p=[];for(let i=0;i<=n;i++){const r=((i*7919+seed*131)%97)/97;p.push(`${(i/n*100).toFixed(1)}% ${(r*4).toFixed(1)}%`)}for(let i=n;i>=0;i--){const r=((i*104729+seed*71)%89)/89;p.push(`${(i/n*100).toFixed(1)}% ${(100-r*4).toFixed(1)}%`)}return `clip-path:polygon(${p.join(',')})`};
const paper=(html,bg='#f3e6c8',seed=1,css='')=>`<div style="position:absolute;inset:0;filter:drop-shadow(0 10px 10px rgba(0,0,0,.55))"><div style="position:absolute;inset:0;background:${bg};${torn(26,seed)};${css}">${html}</div></div>`;
// MARKER: lakaran bulatan tangan
const mkCircle=(w,h,col='#FF4D4D')=>`<svg width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" style="position:absolute;inset:0;overflow:visible"><path class="mp" d="M${w*.52} ${h*.04} C ${w*.95} ${h*.02}, ${w*1.02} ${h*.9}, ${w*.5} ${h*.97} C ${w*.02} ${h*1.0}, ${-w*.02} ${h*.1}, ${w*.55} ${h*.08}" fill="none" stroke="${col}" stroke-width="10" stroke-linecap="round" stroke-dasharray="3000" stroke-dashoffset="3000"/></svg>`;
const mkUpdC=(el,t,t0,d=.5)=>{const p=el.querySelector('.mp');p.style.strokeDashoffset=3000-(p.getTotalLength()+5)*eo((t-t0)/d)};
const mtx=(tx,fs=64,col='#FF4D4D')=>`<div style="font:400 ${fs}px Marker;color:${col};white-space:nowrap;text-shadow:0 3px 0 rgba(0,0,0,.6),0 0 14px rgba(0,0,0,.5)">${tx}</div>`;
const title=(R,top,html,fs=66)=>E(R,`left:90px;right:180px;top:${top}px;text-align:center;font:900 ${fs}px Mont;white-space:nowrap`,html,'g sh');
const wipe=(el,t,t0,d=.5)=>{const k=eo((t-t0)/d);el.style.opacity=t>=t0?1:0;el.style.clipPath=`inset(0 ${100-k*100}% 0 0)`};

// zon selamat v2 (lebih ketat): x 90–900, y 320–1420
const topPill=(R,html,fs=46,top=330)=>E(R,`left:90px;right:180px;top:${top}px;text-align:center`,html);
const gtag=(tx,fs=44)=>`<div class="glass" style="display:inline-block;padding:14px 40px;border-radius:60px;font:900 ${fs}px Mont;color:#fff;white-space:nowrap">${tx}</div>`;
const imgTile=(src,pos='50% 50%')=>`<div style="position:absolute;inset:0;border-radius:22px;overflow:hidden;border:4px solid #E8B830;box-shadow:0 10px 24px rgba(0,0,0,.6)"><img src="${src}" style="width:100%;height:100%;object-fit:cover;object-position:${pos}">${SHN}</div>`;
const brk=(R,css)=>E(R,css,['top:0;left:0;border-top:6px solid #fff;border-left:6px solid #fff','top:0;right:0;border-top:6px solid #fff;border-right:6px solid #fff','bottom:0;left:0;border-bottom:6px solid #fff;border-left:6px solid #fff','bottom:0;right:0;border-bottom:6px solid #fff;border-right:6px solid #fff'].map(c=>`<div style="position:absolute;width:70px;height:70px;${c};filter:drop-shadow(0 0 6px rgba(0,0,0,.6))"></div>`).join(''));
const coinImg=(src,sz)=>`<div class="cn" style="position:absolute;inset:0;border-radius:50%;box-shadow:0 20px 50px rgba(0,0,0,.7),0 0 50px rgba(245,197,66,.45)"><img src="${src}" style="width:${sz}px;height:${sz}px;display:block"></div>`;
// syiling 3D berpusing: muka depan (harimau) <-> belakang (Public Gold)
const coin3d=(sz)=>`<div class="c3" style="position:absolute;inset:0;transform-style:preserve-3d"><img src="img/c_tiger.png" style="position:absolute;inset:0;width:${sz}px;height:${sz}px;backface-visibility:hidden;filter:drop-shadow(0 18px 30px rgba(0,0,0,.6))"><img src="img/c_pg.png" style="position:absolute;inset:0;width:${sz}px;height:${sz}px;backface-visibility:hidden;transform:rotateY(180deg);filter:drop-shadow(0 18px 30px rgba(0,0,0,.6))"></div>`;
const tw2=(el,t,t0)=>el.querySelectorAll('.tw').forEach((w,i)=>{const p=((t-t0)*1.3+i*.37)%1.6;const k=p<.6?Math.sin(Math.PI*p/.6):0;w.style.opacity=t>t0+.3?k:0;w.style.transform=`scale(${.3+k}) rotate(${p*90}deg)`});

// 1 (nob) HEADLINE kaca — muka jelas 2.5s dulu
scene({s:2.5,e:4.1,nob:1,build(R,o){
  o.h=E(R,'left:140px;top:340px;width:660px;height:150px',glass(`<div style="display:flex;flex-direction:column;align-items:center;justify-content:center;height:100%;line-height:1.15"><div style="font:800 36px Mont;color:#fff">KOLEKSI TERBARU 🐯</div><div style="font:900 60px Mont">${goldTx('GOLD COIN',60)}</div></div>`,'border-radius:30px'));
},upd(t,o){st(o.h,mix(slide(t,o.s,0,-60),{o:outF(t,o.e)}))}});

// 2 BLUR + GRAFIK BESAR — "Limited Edition, Malayan Tiger"
scene({s:4.1,e:6.75,build(R,o){
  o.h=title(R,340,`${goldTx('LIMITED EDITION',64)}`,64);
  o.c=E(R,'left:230px;top:470px;width:540px;height:540px',coin3d(540)+`<div style="position:absolute;inset:0">${TW()}</div>`);
  o.n=E(R,'left:150px;top:1060px;width:640px;height:150px',glass(`<div style="display:flex;flex-direction:column;align-items:center;justify-content:center;height:100%;line-height:1.15"><div style="font:900 56px Mont;color:#fff;white-space:nowrap">MALAYAN TIGER ${goldTx('2026',56)}</div><div style="font:700 28px Mont;color:#E8C870">No. siri 0222 / 1000 pada sijil</div></div>`,'border-radius:30px'));
},upd(t,o){st(o.h,slide(t,o.s,0,-40));st(o.c,mix(pop(t,o.s+.1,.5),{y:wob(t,8,.35)}));
  const r=lerp(-90,0,eo((t-o.s-.1)/.7))+(t>5.9?180*eio((t-5.9)/.7):0);o.c.querySelector('.c3').style.transform=`perspective(1600px) rotateY(${r}deg)`;tw2(o.c,t,o.s);
  st(o.n,mix(pop(t,5.4,.45),{o:outF(t,o.e)}))}});

// 3 (nob, ZOOM + GLASS TAG) — "tangan belah kanan saya ni, berat dia setengah oz"
scene({s:6.8,e:11.85,nob:1,build(R,o){
  o.a=E(R,'left:190px;top:400px;width:400px;height:150px',`<div class="glass" style="position:absolute;inset:0;border-radius:30px;display:flex;flex-direction:column;align-items:center;justify-content:center;line-height:1.05"><div style="font:900 70px Mont">${goldTx('½ OZ',70)}</div><div style="font:800 26px Mont;color:#fff">SETENGAH AUNS ↓</div></div>`);
},upd(t,o){st(o.a,mix(pop(t,10.5,.45),{y:wob(t,6,.5),o:outF(t,o.e)}))}});

// 4 BLUR + GRAFIK BESAR — "Tapi ni 999.9, tengok tuan-tuan?"
scene({s:12.0,e:15.35,build(R,o){
  o.h=title(R,340,`KETULENAN ${goldTx('999.9',72)}`,64);
  o.c=E(R,'left:250px;top:470px;width:500px;height:500px',coinImg('img/c_pg.png',500)+`<div style="position:absolute;inset:0">${TW()}</div>${SHN.replace('top:-200px','top:-450px')}`);
  o.r=[['FINE GOLD',12.9],['EMAS TULEN 24K',13.4]].map(([tx,t0],i)=>{const el=E(R,`left:${i?420:120}px;top:1030px;width:${i?460:280}px;height:110px`,`<div class="card" style="position:absolute;inset:0;border-radius:55px;display:flex;align-items:center;justify-content:center;gap:12px;font:900 34px Mont;white-space:nowrap">${tx}<span style="color:#2ecc71">✓</span></div>`);el.t0=t0;return el});
},upd(t,o){st(o.h,slide(t,o.s,0,-40));st(o.c,mix(pop(t,o.s+.1,.5),{y:wob(t,7,.35)}));o.c.querySelector('.cn').style.transform=`perspective(1600px) rotateY(${lerp(70,0,eo((t-o.s-.1)/.7))}deg)`;tw2(o.c,t,o.s);
  const sh=o.c.querySelector('.shn');const k=cl((t-o.s-.9)/.9);sh.style.transform=`translateX(${lerp(-300,700,k)}px) rotate(20deg)`;sh.style.opacity=k>0&&k<1?1:0;
  o.r.forEach(el=>st(el,slide(t,el.t0,0,40)))}});

// 5 (nob) FREEZE & LABEL — Adila tunjuk kad sijil ½ oz ke kamera
scene({s:15.4,e:17.3,nob:1,build(R,o){
  o.br=brk(R,'left:200px;top:620px;width:480px;height:620px');
  o.lb=E(R,'left:150px;top:420px;width:580px;height:150px',`<div class="card" style="position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;font:900 46px Mont;white-space:nowrap;line-height:1.1"><span>📸 SIJIL EMAS ½ OZ</span>${goldTx('Au 999.9',46)}</div>`);
},upd(t,o){const f=FRZ[0][0],fe=f+FRZ[0][1];st(o.br,{o:t<f?0:cl(1-(t-fe-.4)/.2),s:t<f?0:ob((t-f)/.3)});st(o.lb,mix(slide(t,f+.12,0,-50),{o:outF(t,o.e)}))}});

// 6 (nob) FREEZE & LABEL — syiling 1 oz ke kamera
scene({s:19.3,e:20.7,nob:1,build(R,o){
  o.br=brk(R,'left:340px;top:900px;width:320px;height:330px');
  o.lb=E(R,'left:680px;top:960px;width:220px;height:160px',`<div class="card" style="position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;line-height:1"><div style="font:900 64px Mont">${goldTx('1 OZ',64)}</div><div style="font:800 24px Mont;color:#fff">SATU AUNS</div></div>`);
},upd(t,o){const f=FRZ[1][0],fe=f+FRZ[1][1];st(o.br,{o:t<f?0:cl(1-(t-fe-.4)/.2),s:t<f?0:ob((t-f)/.3)});st(o.lb,mix(slide(t,f+.12,60,0),{o:outF(t,o.e)}))}});

// 7 BLUR + GRAFIK BESAR — perbandingan saiz 1 oz vs ½ oz
scene({s:20.75,e:24.95,build(R,o){
  o.h=title(R,340,`MANA ${goldTx('LEBIH BESAR?',64)}`,62);
  o.a=E(R,'left:110px;top:560px;width:420px;height:420px',coinImg('img/c_tiger.png',420)+`<div style="position:absolute;inset:0">${TW()}</div>`);
  o.b=E(R,'left:580px;top:620px;width:300px;height:300px',coinImg('img/c_half.png',300));
  o.la=E(R,'left:170px;top:1020px;width:300px;height:130px',`<div class="glass" style="position:absolute;inset:0;border-radius:30px;display:flex;flex-direction:column;align-items:center;justify-content:center;line-height:1"><div style="font:900 62px Mont">${goldTx('1 OZ',62)}</div><div style="font:800 24px Mont;color:#fff">±31.1 GRAM</div></div>`);
  o.lb=E(R,'left:580px;top:1020px;width:300px;height:130px',`<div class="glass" style="position:absolute;inset:0;border-radius:30px;display:flex;flex-direction:column;align-items:center;justify-content:center;line-height:1"><div style="font:900 62px Mont">${goldTx('½ OZ',62)}</div><div style="font:800 24px Mont;color:#fff">±15.55 GRAM</div></div>`);
},upd(t,o){st(o.h,slide(t,o.s,0,-40));st(o.a,mix(pop(t,21.7,.5),{y:wob(t,6,.35)}));st(o.b,mix(pop(t,22.35,.45),{y:wob(t,6,.35,.5)}));tw2(o.a,t,21.7);
  st(o.la,slide(t,23.1,0,40));st(o.lb,slide(t,23.9,0,40))}});

// 8 (nob) — "So boleh pusing lah ni" (syiling dekat kamera)
scene({s:25.05,e:26.6,nob:1,build(R,o){o.a=topPill(R,gtag(`🔄 DEPAN & ${goldTx('BELAKANG',46)}`,46))},upd(t,o){st(o.a,mix(slide(t,o.s,0,-40),{o:outF(t,o.e)}))}});

// 9 (nob) GREEN SCREEN + ZOOM + GLASS TAG — "tuan-tuan yang mana ada bajet sekitar ni, boleh" (latar: rakaman paparan syiling Malayan Tiger)
scene({s:26.75,e:29.8,nob:1,build(R,o){
  o.a=E(R,'left:170px;top:340px;width:600px;height:150px',glass(`<div style="display:flex;flex-direction:column;align-items:center;justify-content:center;height:100%;line-height:1.15"><div style="font:900 56px Mont;color:#fff">ADA ${goldTx('BAJET?',56)} 💰</div><div style="font:700 28px Mont;color:#E8C870">pilih ikut kemampuan</div></div>`,'border-radius:30px'));
  o.x=E(R,'left:190px;top:1110px;width:220px;height:100px',`<div class="glass" style="position:absolute;inset:0;border-radius:50px;display:flex;align-items:center;justify-content:center;font:900 50px Mont">${goldTx('½ OZ',50)}</div>`);
  o.y=E(R,'left:600px;top:1110px;width:220px;height:100px',`<div class="glass" style="position:absolute;inset:0;border-radius:50px;display:flex;align-items:center;justify-content:center;font:900 50px Mont">${goldTx('1 OZ',50)}</div>`);
},upd(t,o){st(o.a,mix(pop(t,27.9,.45),{y:wob(t,5,.4),o:outF(t,o.e)}));st(o.x,mix(pop(t,28.6,.4),{y:wob(t,6,.5),o:outF(t,o.e)}));st(o.y,mix(pop(t,28.8,.4),{y:wob(t,6,.5,.4),o:outF(t,o.e)}))}});

// 10 (nob) CTA KACA — tunjuk ke papan tanda PG Jewel
scene({s:29.95,e:33.5,nob:1,build(R,o){
  o.gt=E(R,'left:150px;top:350px;width:620px;height:170px',glass(`<div style="display:flex;flex-direction:column;align-items:center;justify-content:center;height:100%;line-height:1.1"><div style="font:800 32px Mont;color:#fff">📍 DAPATKAN DI</div><div style="font:900 56px Mont;white-space:nowrap">${goldTx('KEDAI EMAS PG JEWEL',44)}</div></div>`,'border-radius:34px'));
  o.btn=E(R,'left:170px;top:1090px;width:580px;height:120px',`<div style="position:absolute;inset:0;border-radius:60px;background:linear-gradient(180deg,#FFE680,#E8B830);box-shadow:0 12px 30px rgba(0,0,0,.6),0 0 30px rgba(245,197,66,.5);display:flex;align-items:center;justify-content:center;font:900 44px Mont;color:#2a1d00;white-space:nowrap">🐯 MALAYAN TIGER 2026</div>`);
},upd(t,o){st(o.gt,mix(pop(t,30.2,.45),{y:wob(t,5,.4)}));st(o.btn,mix(pop(t,31.2,.4),{s:1+.02*Math.sin(t*6)}))}});
