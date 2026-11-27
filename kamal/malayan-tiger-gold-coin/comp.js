// Kamal — "Cara tahu emas bukan palsu: 3 soalan wajib" — komposisi deterministik window.render(t)
const FPS=30, Q=new URLSearchParams(location.search), FR=Q.get('f')||'bf';
const $=s=>document.querySelector(s), G=$('#g'), V=$('#v'), VB=$('#vbox'), VBR=$('#vborder');
const cl=(x,a=0,b=1)=>Math.max(a,Math.min(b,x));
const eo=x=>1-Math.pow(1-cl(x),3);
const eio=x=>{x=cl(x);return x<.5?4*x*x*x:1-Math.pow(-2*x+2,3)/2};
const ob=x=>{x=cl(x);const c1=1.9,c3=c1+1;return 1+c3*Math.pow(x-1,3)+c1*Math.pow(x-1,2)};
const lerp=(a,b,k)=>a+(b-a)*k;
function E(parent,css,html='',cls='g'){const d=document.createElement('div');d.className=cls;d.style.cssText=css;d.innerHTML=html;parent.appendChild(d);return d}
// animasi bantu: kembalikan {o,s,x,y,r}
const pop=(t,t0,d=.35)=>({o:cl((t-t0)/.12),s:t<t0?0:ob((t-t0)/d)});
const slide=(t,t0,dx=0,dy=60,d=.45)=>{const k=eo((t-t0)/d);return{o:cl((t-t0)/.2),x:dx*(1-k),y:dy*(1-k)}};
function st(el,{o=1,s=1,x=0,y=0,r=0}={}){el.style.opacity=o;el.style.transform=`translate(${x}px,${y}px) scale(${s}) rotate(${r}deg)`}
function mix(a,b){return{o:(a.o??1)*(b.o??1),s:(a.s??1)*(b.s??1),x:(a.x||0)+(b.x||0),y:(a.y||0)+(b.y||0),r:(a.r||0)+(b.r||0)}}
const wob=(t,a=1.2,f=1.3,p=0)=>Math.sin((t+p)*f*Math.PI*2)*a;

// ---------- latar ----------
const BGFX=$('#bgfx');const SP=[];
for(let i=0;i<40;i++){const r=(i*9301+49297)%233280/233280,r2=(i*4253+1237)%1000/1000;
  SP.push([E(BGFX,`left:0;top:0;width:${4+r*8}px;height:${4+r*8}px;border-radius:50%;background:#F5C542;box-shadow:0 0 12px #F5C542`),r,r2])}
function bgUpd(t,bl){BGFX.style.opacity=bl;for(const [el,r,r2] of SP){const y=1920-((t*(30+r*60)+r2*1920)%2100);el.style.transform=`translate(${(r*1080+wob(t,40,.1,r*9))}px,${y}px)`;el.style.opacity=.2+.5*Math.abs(Math.sin(t*(1+r)+r2*6))}}

const goldBar=(w=150,h=70,fs=15)=>`<div class="bar" style="width:${w}px;height:${h}px;font-size:${fs}px;line-height:1;text-align:center;flex-direction:column">PUBLIC GOLD<span style="font-size:${fs*.75}px;font-weight:800;opacity:.8;margin-top:3px">999.9</span></div>`;
const CK=(sz)=>`<div class="ck" style="position:absolute;right:-${sz/3}px;top:-${sz/3}px;width:${sz}px;height:${sz}px;border-radius:50%;background:#2ecc71;color:#fff;font:900 ${sz*.65}px Mont;display:flex;align-items:center;justify-content:center;box-shadow:0 4px 12px rgba(0,0,0,.5)">✓</div>`;
const SC=[];
function scene(o){o.root=E(G,'left:0;top:0;width:1080px;height:1920px','', 'g');o.build(o.root,o);SC.push(o)}
const outF=(t,e)=>1-cl((t-(e-.22))/.22);
const pill=(tx,bg='#3a2e14',c='#ddd',bd='#6b5520',fs=60)=>`<div style="display:inline-block;background:${bg};border:3px solid ${bd};color:${c};font:900 ${fs}px Mont;padding:10px 44px;border-radius:50px">${tx}</div>`;
const TW=()=>[[.18,.22],[.78,.3],[.62,.68],[.3,.8],[.85,.82]].map(([x,y])=>`<div class="tw" style="position:absolute;left:${x*100}%;top:${y*100}%;width:46px;height:46px;margin:-23px;opacity:0;background:radial-gradient(circle,#fff 0%,rgba(255,240,180,.9) 18%,transparent 55%);clip-path:polygon(50% 0,58% 42%,100% 50%,58% 58%,50% 100%,42% 58%,0 50%,42% 42%);filter:drop-shadow(0 0 8px #FFE680)"></div>`).join('');
const SHN='<div class="shn" style="position:absolute;top:-200px;left:0;width:120px;height:1400px;background:linear-gradient(90deg,transparent,rgba(255,246,200,.45),transparent);pointer-events:none;opacity:0"></div>';
const photo=(src,crop=null,pos='50% 50%')=>`<div class="ph" style="position:absolute;inset:0;border-radius:26px;overflow:hidden;border:5px solid #E8B830;box-shadow:0 18px 50px rgba(0,0,0,.7),0 0 40px rgba(245,197,66,.3);background:#000">`+
  (crop?`<img src="${src}" style="position:absolute;width:${crop[0]}px;left:${crop[1]}px;top:${crop[2]}px">`:`<img src="${src}" style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover;object-position:${pos}">`)+SHN+TW()+`</div>`;
const kb=(el,t,t0,a=1,b=1.08,d=4)=>{const im=el.querySelector('.ph img');if(im){im.style.transformOrigin='50% 50%';im.style.transform=`scale(${lerp(a,b,cl((t-t0)/d))})`}
  el.querySelectorAll('.tw').forEach((w,i)=>{const p=((t-t0)*1.3+i*.37)%1.6;const k=p<.6?Math.sin(Math.PI*p/.6):0;w.style.opacity=t>t0+.3?k:0;w.style.transform=`scale(${.3+k}) rotate(${p*90}deg)`})};
const flip=(el,t,t0,dir=1,d=.6)=>{el.querySelector('.ph').style.transform=`perspective(1400px) rotateY(${dir*55*(1-eo((t-t0)/d))}deg)`};
const badge=(tx,sz=170)=>`<div style="width:${sz}px;height:${sz}px;border-radius:50%;background:linear-gradient(160deg,#FFF0B0,#F5C542 45%,#C8901A);border:6px solid #fff3c4;box-shadow:0 10px 26px rgba(0,0,0,.6);display:flex;align-items:center;justify-content:center;font:900 ${sz*.36}px Mont;color:#3a2600">${tx}</div>`;
const shine=(el,t,t0)=>{const s=el.querySelector('.shn');if(s){const k=cl((t-t0)/.9);s.style.transform=`translateX(${lerp(-500,900,k)}px) rotate(20deg)`;s.style.opacity=k>0&&k<1?1:0}};
const goldTx=(tx,sz)=>`<span class="gold" style="font:900 ${sz}px Mont">${tx}</span>`;
const card=(html,css='')=>`<div class="card" style="position:absolute;inset:0;${css}">${html}</div>`;
const SEGS=[[3.3, 4.1], [4.2, 15.85], [15.91, 19.24], [19.89, 23.48], [23.54, 25.05], [25.12, 30.3], [30.7, 32.25], [35.05, 38.35], [38.71, 41.8]],OFFS=[0, 0.6666666666666665, 12.183333333333332, 15.379999999999997, 18.836666666666662, 20.21333333333333, 25.259999999999998, 26.676666666666666, 29.843333333333337],DUR=32.93333333333334;
function fromSrc(x,S,O){let b=null;for(let i=0;i<S.length;i++){if(x<S[i][0])return b===null?O[i]:b;if(x<=S[i][1])return O[i]+x-S[i][0];b=O[i]+S[i][1]-S[i][0]}return b}
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

// tahap blur video = bila ada grafik
function blurAt(t){let b=0;for(const s of SC){if(s.nob)continue;const k=Math.min(cl((t-s.s)/.25),cl((s.e-t)/.25));b=Math.max(b,k)}return eio(b)}

// ---------- kapsyen ----------
const W=window.WORDS||[];const KEY=/^(EMAS|GOLD|COIN|LIMITED|EDITION|MALAYAN|TIGER|OZ|999\.9|SETENGAH|SATU|BAJET|BESAR|PUBLIC)$/;
const CAPG=[];{let g=[];for(let i=0;i<W.length;i++){const w=W[i];g.push(w);const nx=W[i+1];const len=g.reduce((a,x)=>a+x.w.length+1,0)+(nx?nx.w.length:0);const end=/[.,?]$/.test(w.w)||g.length>=3||len>17||(W[i+1]&&W[i+1].s-w.e>.25);if(end||i==W.length-1){CAPG.push(g);g=[]}}}
const CAP=$('#cap');
function capUpd(t){let g=null;for(const x of CAPG){if(t>=x[0].s-.05&&t<x[x.length-1].e+.25)g=x}
  if(!g){CAP.innerHTML='';return}
  const nch=g.reduce((a,w)=>a+w.w.replace(/[.,?-]/g,'').length,0)+g.length;const fs=Math.min(66,Math.floor(780/(nch*0.80)));
  const h=g.map(w=>{const tx=w.w.replace(/[,?]/g,'').replace(/\.$/,'').replace(/^-/,'').toUpperCase();const on=t>=w.s-.03;const act=on&&t<w.e+.05;const k=KEY.test(tx);
    const sc=act?1+.12*Math.max(0,1-(t-w.s)/.15):1;
    return `<span style="display:inline-block;margin:0 .3em;font:900 ${fs}px Mont;opacity:${on?1:.0};transform:scale(${sc});color:${k?'#F5C542':'#fff'};-webkit-text-stroke:3px #000;paint-order:stroke fill;text-shadow:0 5px 0 #000,0 8px 18px rgba(0,0,0,.8)">${tx}</span>`}).join('');
  CAP.innerHTML=h}
const FLASH=$('#flash');

window.render=async function(t){
  let fr=t;for(const [a,d] of FRZ){if(t>=a&&t<a+d)fr=a}
  const f=Math.min(window.NF||1e9,Math.max(1,Math.round(fr*FPS)+1));
  const src=`${FR}/${String(f).padStart(5,'0')}.jpg`;
  if(V.getAttribute('src')!==src){V.src=src;PEND.push(V.decode().catch(()=>{}))}
  const l=layoutAt(t);VB.style.left=l.x+'px';VB.style.top=l.y+'px';VB.style.width=1080*l.s+'px';VB.style.height=1920*l.s+'px';
  V.style.width=1080*l.s+'px';V.style.height=1920*l.s+'px';
  const bl=blurAt(t);V.style.filter=bl>0.001?`blur(${24*bl}px) brightness(${1-.5*bl}) saturate(${1-.3*bl})`:'none';V.style.transformOrigin='50% 40%';V.style.transform=`scale(${1+.08*bl})`;
  VBR.style.opacity=0;
  bgUpd(t,bl);
  for(const s of SC){const vis=t>=s.s-.001&&t<s.e;s.root.style.display=vis?'block':'none';if(vis){const fo=cl((s.e-t)/.18);s.root.style.opacity=fo;
    if(s.fol){s.root.style.transformOrigin='0 0';s.root.style.transform=`translate(${l.x}px,${l.y}px) scale(${l.s})`}
    s.upd(t,s)}}
  capUpd(t);let fl=0;for(const [a] of FRZ){if(t>=a&&t<a+.25)fl=Math.max(fl,.7*(1-(t-a)/.25))}FLASH.style.opacity=fl;
  await Promise.all(PEND.splice(0));
};
window.safecheck=function(){const bad=[];const box=(el)=>el.getBoundingClientRect();
  for(const s of SC){if(s.root.style.display==='none')continue;
    for(const el of s.root.children){if(el.classList.contains('bgx'))continue;if(+getComputedStyle(el).opacity<.05)continue;const r=box(el);if(r.width<2)continue;
      if(r.left<88||r.right>902||r.top<318||r.bottom>1422)bad.push(`${s.s.toFixed(2)}:${el.textContent.trim().slice(0,18)} [${r.left|0},${r.top|0},${r.right|0},${r.bottom|0}]`);}}
  const c=$('#cap');const sp=[...c.children];if(sp.length){const a=sp[0].getBoundingClientRect(),b=sp[sp.length-1].getBoundingClientRect();if(a.left<88||b.right>902)bad.push('cap terkeluar '+c.textContent)}
  return bad};
