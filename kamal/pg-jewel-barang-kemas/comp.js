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
const SEGS=[[2.2, 8.52], [8.6, 10.64], [10.72, 15.99], [16.08, 24.08], [24.56, 27.3], [27.52, 34.09], [34.91, 39.3], [40.37, 40.92], [41.62, 45.45], [45.97, 54.37], [57.07, 64.1], [64.29, 68.36], [68.48, 73.58], [73.67, 78.02], [78.09, 83.2]],OFFS=[0, 6.186666666666666, 8.093333333333334, 13.23, 21.096666666666668, 23.703333333333337, 30.140000000000008, 34.396666666666675, 34.81333333333335, 38.51000000000002, 46.776666666666685, 53.673333333333346, 57.61000000000001, 62.57666666666667, 66.79333333333332],DUR=71.90333333333332;
function fromSrc(x,S,O){let b=null;for(let i=0;i<S.length;i++){if(x<S[i][0])return b===null?O[i]:b;if(x<=S[i][1])return O[i]+x-S[i][0];b=O[i]+S[i][1]-S[i][0]}return b}

// ---------- babak: "PG Jewel — Public Gold kini ada barang kemas" (masa ditulis dalam MASA SUMBER, ditukar dengan S()) ----------
const S=x=>fromSrc(x,SEGS,OFFS);
const FACE=[370,660];
const L={FULL:{x:0,y:0,s:1,r:0,b:0},PUNCH:{x:FACE[0]*(1-1.08),y:FACE[1]*(1-1.08)+20,s:1.08,r:0,b:0}};
// DIGITAL ZOOM: 3 kali sahaja, lembut 1.08x, senyap
const LT=[[0,'FULL'],[S(26.85),'PUNCH',.8],[S(29.3),'FULL',.6],[S(57.1),'PUNCH',.8],[S(59.15),'FULL',.6],[S(78.1),'PUNCH',.8],[S(80.3),'FULL',.6]];
function layoutAt(t){let cur=L.FULL,prev=L.FULL,k=1;
  for(let i=0;i<LT.length;i++){const [s,n,d=.3]=LT[i];if(t>=s){prev=i?L[LT[i-1][1]]:L.FULL;cur=L[n];k=eio((t-s)/d)}}
  const o={};for(const p of['x','y','s','r','b'])o[p]=lerp(prev[p],cur[p],k);return o}
// FREEZE (masa output, tempoh)
const FRZ=[[S(11.3),.85]];

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
const title=(R,top,html,fs=66)=>E(R,`left:60px;right:140px;top:${top}px;text-align:center;font:900 ${fs}px Mont;white-space:nowrap`,html,'g sh');
const wipe=(el,t,t0,d=.5)=>{const k=eo((t-t0)/d);el.style.opacity=t>=t0?1:0;el.style.clipPath=`inset(0 ${100-k*100}% 0 0)`};

// H0 (nob) HEADLINE — muka jelas dulu, tajuk kecil atas
scene({s:S(2.25),e:S(4.75),nob:1,build(R,o){
  o.h=E(R,'left:60px;right:140px;top:262px;height:150px',glass(`<div style="display:flex;flex-direction:column;align-items:center;justify-content:center;height:100%;line-height:1.15"><div style="font:800 40px Mont;color:#fff">SELAMA NI PUBLIC GOLD =</div><div style="font:900 58px Mont">${goldTx('GOLD BAR SAJA? 🤔',58)}</div></div>`,'border-radius:30px'));
},upd(t,o){st(o.h,mix(slide(t,o.s,0,-60),{o:outF(t,o.e)}))}});

// B1 PAPER CUT — "beli gold bar dan emas saja"
scene({s:S(4.78),e:S(6.15),build(R,o){
  o.bg=E(R,'left:110px;top:330px;width:780px;height:820px',paper('','#e9d9b4',3));
  o.t=E(R,'left:170px;top:380px;width:660px;height:140px',paper(`<div style="display:flex;align-items:center;justify-content:center;height:100%;font:400 66px Marker;color:#2a1d00">TEMPAT BELI…</div>`,'#fff7e2',5));
  o.b=E(R,'left:180px;top:600px;width:420px;height:220px',paper(`<div style="position:absolute;inset:22px;border-radius:14px;background:linear-gradient(160deg,#FFF3B8,#F5C542 35%,#D9A21F 65%,#B8860B);display:flex;flex-direction:column;align-items:center;justify-content:center;color:#5a3d00;font:900 44px Mont">PUBLIC GOLD<span style="font-size:32px">999.9</span></div>`,'#fff',7));
  o.c=E(R,'left:560px;top:760px;width:290px;height:290px',`<div style="position:absolute;inset:0;border-radius:50%;background:#fff;filter:drop-shadow(0 10px 10px rgba(0,0,0,.55));display:flex;align-items:center;justify-content:center">${coin(240)}</div>`);
  o.l=E(R,'left:170px;top:900px;width:360px;height:150px',paper(`<div style="display:flex;align-items:center;justify-content:center;height:100%;font:900 46px Mont;color:#fff">GOLD BAR<br>&amp; DINAR</div>`,'#8a1f1f',9,'text-align:center;line-height:1.05'));
  o.q=E(R,'left:300px;top:1060px;width:420px;height:110px',paper(`<div style="display:flex;align-items:center;justify-content:center;height:100%;font:900 62px Mont;color:#2a1d00">SAJA? 🤔</div>`,'#FFE680',11));
},upd(t,o){const a=o.s;st(o.bg,mix(pop(t,a,.4),{r:-2}));st(o.t,mix(slide(t,a+.08,0,-50),{r:-3}));
  st(o.b,mix(pop(t,a+.18,.4),{r:-6+wob(t,1,.4)}));st(o.c,mix(pop(t,a+.4,.4),{r:8+wob(t,2,.3)}));st(o.l,mix(slide(t,a+.5,-80,0),{r:4}));st(o.q,mix(pop(t,S(5.8),.35),{r:-2}))}});

// B2 BEFORE / AFTER — "tapi sekarang ... boleh keluarkan barang kemas"
scene({s:S(6.2),e:S(10.35),build(R,o){
  o.h=title(R,280,`${goldTx('DULU',70)} <span style="color:#fff">vs</span> ${goldTx('SEKARANG',70)}`,70);
  o.box=E(R,'left:110px;top:400px;width:780px;height:900px',`<div style="position:absolute;inset:0;border-radius:28px;overflow:hidden;border:5px solid #E8B830;box-shadow:0 18px 50px rgba(0,0,0,.7)">
   <div class="aft" style="position:absolute;inset:0"><img src="img/p_gelang.jpg" style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover;object-position:50% 45%">${SHN}${TW()}
     <div style="position:absolute;right:22px;top:22px;background:#2ecc71;color:#fff;font:900 40px Mont;padding:8px 24px;border-radius:40px">SEKARANG ✓</div>
     <div style="position:absolute;left:0;right:0;bottom:0;padding:26px 0;text-align:center;background:linear-gradient(transparent,rgba(0,0,0,.85));font:900 58px Mont;color:#fff">+ BARANG KEMAS 💍</div></div>
   <div class="bef" style="position:absolute;inset:0;background:radial-gradient(ellipse at 50% 40%,#3a2a0c,#0b0803);display:flex;flex-direction:column;align-items:center;justify-content:center;gap:50px">
     <div style="position:absolute;left:22px;top:22px;background:#555;color:#fff;font:900 40px Mont;padding:8px 24px;border-radius:40px">DULU</div>
     ${goldBar(380,190,44)}<div style="display:flex;gap:40px">${coin(200)}${coin(200)}</div>
     <div style="font:900 52px Mont;color:#ddd">GOLD BAR &amp; DINAR</div></div>
   <div class="ln" style="position:absolute;top:0;bottom:0;width:8px;margin-left:-4px;background:#fff;box-shadow:0 0 20px #FFE680"><div style="position:absolute;top:50%;left:50%;width:84px;height:84px;margin:-42px;border-radius:50%;background:#fff;color:#3a2600;font:900 40px Mont;display:flex;align-items:center;justify-content:center">⇆</div></div></div>`);
},upd(t,o){st(o.h,slide(t,o.s,0,-40));st(o.box,pop(t,o.s+.1,.45));
  const k=eio((t-S(8.75))/.9);const x=lerp(100,0,k);o.box.querySelector('.bef').style.clipPath=`inset(0 ${100-x}% 0 0)`;
  const ln=o.box.querySelector('.ln');ln.style.left=x+'%';ln.style.opacity=k>0&&k<1?1:0;shine(o.box,t,S(9.5));kb(o.box,t,S(8.75))}});

// N1 (nob) SPOTLIGHT + FREEZE & LABEL + GLASS TAG — Adila tunjuk rantai
scene({s:S(10.6),e:S(14.0),nob:1,build(R,o){
  o.sp=E(R,'left:0;top:0;width:1080px;height:1920px','','g bgx');
  o.fl=E(R,'left:0;top:0;width:1080px;height:1920px;background:#fff','','g bgx');
  o.br=E(R,'left:390px;top:820px;width:360px;height:470px',['top:0;left:0;border-top:6px solid #fff;border-left:6px solid #fff','top:0;right:0;border-top:6px solid #fff;border-right:6px solid #fff','bottom:0;left:0;border-bottom:6px solid #fff;border-left:6px solid #fff','bottom:0;right:0;border-bottom:6px solid #fff;border-right:6px solid #fff'].map(c=>`<div style="position:absolute;width:70px;height:70px;${c};filter:drop-shadow(0 0 6px rgba(0,0,0,.6))"></div>`).join(''));
  o.lb=E(R,'left:80px;top:1060px;width:290px;height:150px',`<div class="card" style="position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;font:900 42px Mont;white-space:nowrap;line-height:1.1"><span>📸 RANTAI</span>${goldTx('EMAS 916',42)}</div>`);
  o.gt=E(R,'left:590px;top:560px;width:340px;height:200px',glass(`<div style="display:flex;flex-direction:column;align-items:center;justify-content:center;height:100%;line-height:1.15"><div style="font:900 54px Mont">${goldTx('PG JEWEL',54)}</div><div style="font:700 30px Mont;color:#fff">by Public Gold ✦</div></div>`,'border-radius:28px'));
},upd(t,o){const k=cl((t-o.s)/.4)*outF(t,o.e);o.sp.style.opacity=k;o.sp.style.background=`radial-gradient(ellipse 280px 380px at 570px 1060px,transparent 55%,rgba(0,0,0,.72) 100%)`;
  const f=FRZ[0][0];o.fl.style.opacity=t>=f&&t<f+.25?.8*(1-(t-f)/.25):0;
  st(o.br,mix(pop(t,f,.35),{o:t<f+FRZ[0][1]+.6?1:cl(1-(t-f-FRZ[0][1]-.6)/.2)}));st(o.lb,mix(slide(t,f+.12,-60,0),{o:outF(t,o.e)}));
  st(o.gt,mix(pop(t,S(11.94),.45),{y:wob(t,6,.5)}))}});

// B3 SPATIAL GLASS — "satu lagi pilihan"
scene({s:S(14.0),e:S(17.95),build(R,o){
  o.h=title(R,290,`SATU LAGI ${goldTx('PILIHAN',72)}`,72);
  o.stg=E(R,'left:60px;top:440px;width:880px;height:820px;perspective:1600px','');
  const P=[['GOLD BAR',goldBar(200,100,22)],['DINAR',coin(150)],['BARANG KEMAS','<img src="img/p_gelang.jpg" style="width:230px;height:250px;object-fit:cover;object-position:50% 40%;border-radius:18px;border:3px solid #E8B830">']];
  o.p=P.map(([n,h],i)=>E(o.stg,`left:${[20,310,600][i]}px;top:${i==2?170:230}px;width:${i==2?270:250}px;height:${i==2?470:400}px;transform-style:preserve-3d`,glass(`<div style="display:flex;flex-direction:column;align-items:center;justify-content:center;gap:26px;height:100%">${h}<div style="font:900 ${i==2?36:38}px Mont;color:#fff;white-space:nowrap">${n}</div></div>${i==2?`<div style="position:absolute;top:-26px;left:50%;margin-left:-80px;width:160px;background:#2ecc71;color:#fff;font:900 34px Mont;text-align:center;padding:6px 0;border-radius:30px">BARU ✨</div>`:''}`,'border-radius:30px')));
},upd(t,o){st(o.h,slide(t,o.s,0,-40));o.p.forEach((el,i)=>{const t0=o.s+.15+i*.25,k=eo((t-t0)/.7);const ry=[24,0,-24][i]+wob(t,5,.25,i);
  el.style.opacity=cl((t-t0)/.25);el.style.transform=`translateZ(${lerp(-600,i==2?120:0,k)}px) rotateY(${ry}deg) translateY(${wob(t,8,.4,i*.3)}px)`});
  if(t>S(14.72))o.p[2].style.boxShadow='0 0 50px rgba(245,197,66,.6)'}});

// B4 CHECKLIST + CHECK GROW — "kumpul emas dalam bentuk gold bar dan emas"
scene({s:S(18.0),e:S(21.4),build(R,o){
  o.c=E(R,'left:110px;top:360px;width:780px;height:760px',card(''));
  o.h=E(R,'left:110px;top:400px;width:780px;text-align:center;font:900 54px Mont;white-space:nowrap',`SEBELUM NI ${goldTx('KITA KUMPUL',54)}`);
  o.r=[['🟨','GOLD BAR',S(20.48)],['🪙','DINAR / EMAS',S(20.96)],['💍','BARANG KEMAS?',S(21.2)]].map(([em,tx,t0],i)=>{const el=E(R,`left:160px;top:${540+i*180}px;width:680px;height:140px`,`<div class="card" style="position:absolute;inset:0;display:flex;align-items:center;gap:22px;padding-left:30px;border-radius:24px"><span style="font-size:62px">${em}</span><span style="font:900 50px Mont;color:${i==2?'#aaa':'#fff'};white-space:nowrap">${tx}</span></div><div style="position:absolute;right:24px;top:18px;width:104px;height:104px">${i<2?ckSvg(104):''}</div>`);el.t0=t0;return el});
},upd(t,o){st(o.c,pop(t,o.s,.4));st(o.h,slide(t,o.s+.1,0,-30));o.r.forEach((el,i)=>{st(el,slide(t,o.s+.25+i*.15,-80,0));ckUpd(el,t,el.t0)})}});

// B5 PHONE MOCKUP -> SCREEN DIVE — "tapi sekarang ni kita dah ada pilihan"
scene({s:S(21.42),e:S(24.9),build(R,o){
  o.h=title(R,280,`SEKARANG DI ${goldTx('PG JEWEL',70)}`,70);
  o.full=E(R,'left:0;top:0;width:1080px;height:1920px;overflow:hidden','<img style="width:1080px;height:1920px;object-fit:cover">','g bgx');
  o.ph=E(R,'left:330px;top:420px;width:420px;height:860px;transform-origin:50% 50%',`<div style="position:absolute;inset:0;border-radius:64px;background:#111;border:4px solid #E8B830;box-shadow:0 30px 70px rgba(0,0,0,.75),inset 0 0 0 10px #000"></div><div class="scr" style="position:absolute;left:16px;top:16px;right:16px;bottom:16px;border-radius:50px;overflow:hidden;background:#000"><img style="width:100%;height:100%;object-fit:cover"></div><div style="position:absolute;top:30px;left:50%;margin-left:-60px;width:120px;height:32px;border-radius:20px;background:#000"></div>`);
  o.tg=E(R,'left:140px;top:1150px;width:520px;height:110px',glass(`<div style="display:flex;align-items:center;justify-content:center;height:100%;font:900 46px Mont;white-space:nowrap;color:#fff">💍 RANTAI · GELANG · CINCIN</div>`,'border-radius:60px'));
},upd(t,o){const dive=S(22.9),k=eio((t-dive)/.75);
  st(o.h,mix(slide(t,o.s,0,-40),{o:1-cl((t-dive)/.3)}));
  setImg(o.ph.querySelector('.scr img'),brF(5630,t,o.s,0.3,152));setImg(o.full.querySelector('img'),brF(5630,t,o.s,0.3,152));
  const s0=pop(t,o.s+.05,.45);o.ph.style.opacity=s0.o*(1-cl((t-dive-.6)/.2));o.ph.style.transform=`scale(${s0.s*lerp(1,2.75,k)}) translateY(${lerp(0,-30,k)}px)`;
  o.full.style.opacity=cl((t-dive-.55)/.25);st(o.tg,mix(pop(t,dive+.9,.4),{o:outF(t,o.e)}))}});

// N2 (nob) STICKER TAG — "ketulenan 916 dan juga 999"
scene({s:S(24.86),e:S(27.2),nob:1,build(R,o){
  const stk=(tx,sub,bg)=>`<div style="position:absolute;inset:0;border-radius:24px;background:${bg};border:6px solid #fff;box-shadow:0 12px 24px rgba(0,0,0,.6);display:flex;flex-direction:column;align-items:center;justify-content:center;color:#3a2600;line-height:1"><div style="font:900 78px Mont">${tx}</div><div style="font:800 26px Mont;margin-top:6px">${sub}</div></div><div style="position:absolute;right:-6px;top:-6px;width:46px;height:46px;background:linear-gradient(225deg,transparent 50%,#ddd 50%);border-bottom-left-radius:10px"></div>`;
  o.a=E(R,'left:110px;top:780px;width:260px;height:170px',stk('916','EMAS 22K','linear-gradient(160deg,#FFF0B0,#F5C542)'));
  o.b=E(R,'left:640px;top:860px;width:260px;height:170px',stk('999','EMAS 24K','linear-gradient(160deg,#fff,#FFE680)'));
  o.h=E(R,'left:60px;right:140px;top:262px;text-align:center',pill(`✨ PILIHAN KETULENAN`,'rgba(20,14,4,.85)','#fff','#E8B830',46));
},upd(t,o){const sl=(el,t0,r)=>{const k=t<t0?0:ob((t-t0)/.3);el.style.opacity=t>=t0?1:0;el.style.transform=`scale(${lerp(1.8,1,cl(k))*(k>1?k:1)}) rotate(${r+lerp(18,0,cl(k))}deg)`};
  sl(o.a,S(24.95),-8);sl(o.b,S(26.34),7);st(o.h,slide(t,o.s,0,-30))}});

// N3 (nob, zoom) PROMPT BOX — "Kenapa ini menarik untuk saya?"
scene({s:S(26.85),e:S(29.4),nob:1,build(R,o){
  o.b=E(R,'left:60px;top:262px;width:820px;height:130px',`<div style="position:absolute;inset:0;border-radius:34px;background:rgba(18,18,22,.88);border:2px solid rgba(255,255,255,.25);box-shadow:0 14px 34px rgba(0,0,0,.6)"></div><div style="position:absolute;left:30px;top:16px;font:700 24px Mont;color:#999">Tanya apa-apa…</div><div class="tx" style="position:absolute;left:30px;top:50px;font:800 44px Mont;color:#fff;white-space:nowrap"></div><div class="sd" style="position:absolute;right:20px;top:25px;width:80px;height:80px;border-radius:50%;background:#F5C542;color:#2a1d00;font:900 46px Mont;display:flex;align-items:center;justify-content:center">↑</div>`);
},upd(t,o){st(o.b,slide(t,o.s,0,-40));const s='Kenapa ini menarik? 🤔';const n=Math.floor(cl((t-o.s-.2)/1.3)*[...s].length);
  o.b.querySelector('.tx').innerHTML=[...s].slice(0,n).join('')+(Math.floor(t*3)%2?'|':'');const sd=o.b.querySelector('.sd');sd.style.transform=`scale(${t>S(28.8)&&t<S(28.8)+.2?.85:1})`}});

// B6 TAG WALL — "setiap orang ada tujuan berbeza"
scene({s:S(29.42),e:S(34.0),build(R,o){
  o.h=title(R,280,`TUJUAN ${goldTx('BERBEZA',72)}`,72);
  const T=[['💰','SIMPANAN'],['💍','DIPAKAI'],['🎁','HADIAH'],['🛡️','LINDUNG NILAI'],['👪','WARISAN'],['✨','CANTIK'],['🎯','MATLAMAT'],['💒','KAHWIN'],['📈','JANGKA PANJANG']];
  o.tg=T.map(([em,tx],i)=>{const row=Math.floor(i/2.999),c=[[110,500],[500,110],[110,500],[110,500]];
    const x=[100,480,140,470,100,500,120,500,260][i],y=[420,440,600,620,780,800,960,980,1130][i];
    return E(R,`left:${x}px;top:${y}px;height:120px`,`<div class="${i%3==1?'glass':'card'}" style="height:120px;display:flex;align-items:center;gap:14px;padding:0 30px;border-radius:60px;font:900 40px Mont;white-space:nowrap"><span style="font-size:48px">${em}</span>${tx}</div>`)});
  o.n=E(R,'left:60px;right:140px;top:1260px;text-align:center;font:700 26px Mont;color:#ccc','*contoh tujuan');
},upd(t,o){st(o.h,slide(t,o.s,0,-40));o.tg.forEach((el,i)=>st(el,mix(pop(t,o.s+.3+i*.22,.35),{r:[-3,2,-2,3,-1,2,-3,1,0][i],y:wob(t,4,.5,i)})));st(o.n,{o:cl((t-o.s-2)/.3)})}});

// B7 WRAP FOCUS — "gold bar untuk simpanan jangka masa panjang"
scene({s:S(34.54),e:S(39.3),build(R,o){
  o.h=title(R,290,`GOLD BAR = ${goldTx('SIMPANAN',70)}`,70);
  o.glow=E(R,'left:190px;top:520px;width:620px;height:620px;border-radius:50%;background:radial-gradient(circle,rgba(255,220,120,.45),transparent 65%)','');
  o.bar=E(R,'left:270px;top:690px;width:460px;height:230px',goldBar(460,230,52)+SHN);
  const s='• SIMPANAN JANGKA MASA PANJANG ';o.ch=[...s+s].map(c=>E(R,'left:0;top:0;font:900 44px Mont;color:#FFE680;text-shadow:0 3px 8px rgba(0,0,0,.8)',c===' '?'&nbsp;':c));
  o.ft=E(R,'left:60px;right:140px;top:1130px;text-align:center',pill('⏳ 5 · 10 · 20 TAHUN','rgba(20,14,4,.85)','#fff','#E8B830',44));
},upd(t,o){st(o.h,slide(t,o.s,0,-40));st(o.bar,mix(pop(t,o.s+.15,.45),{r:-4+wob(t,2,.3),y:wob(t,8,.4)}));st(o.glow,{o:cl((t-o.s)/.5),s:1+.05*Math.sin(t*3)});shine(o.bar,t,o.s+.8);
  const N=o.ch.length,a0=(t-o.s)*.7;o.ch.forEach((el,i)=>{const a=a0+i/N*Math.PI*2,x=500+Math.cos(a)*330,y=800+Math.sin(a)*120,z=Math.sin(a);
    el.style.zIndex=z>0?3:0;el.style.opacity=cl((t-o.s-.5-i*.012)/.2)*(z>0?1:.18);el.style.transform=`translate(${x-14}px,${y-26}px) scale(${.75+.3*(z+1)/2}) rotate(${Math.cos(a)*-12}deg)`});
  o.bar.style.zIndex=2;st(o.ft,pop(t,S(38.0),.4))}});

// B8 FRAME BREAK — "ada pula yang suka barang kemas"
scene({s:S(40.4),e:S(44.15),build(R,o){
  o.h=title(R,276,`SUKA ${goldTx('BARANG KEMAS',68)} 💍`,64);
  // gambar 900x1600 -> 680x1209 di (200,270); bingkai di dalam; potongan badan "pecah" keluar bingkai
  o.fr=E(R,'left:290px;top:640px;width:470px;height:690px;border-radius:24px;overflow:hidden;border:8px solid #E8B830;box-shadow:0 20px 60px rgba(0,0,0,.7)',`<img src="img/p_adila_gelang.jpg" style="position:absolute;left:-98px;top:-378px;width:680px;height:1209px">${SHN}`);
  o.cut=E(R,'left:192px;top:262px;width:680px;height:1209px;clip-path:inset(0 0 23% 0)',`<img src="img/cut_adila_gelang.png" style="width:680px;height:1209px">`);
  o.tg=E(R,'left:600px;top:1180px;width:320px;height:100px',glass(`<div style="display:flex;align-items:center;justify-content:center;height:100%;font:900 40px Mont;color:#fff">BOLEH PAKAI ✨</div>`,'border-radius:50px'));
},upd(t,o){st(o.h,slide(t,o.s,0,-40));const p=pop(t,o.s+.1,.45);st(o.fr,p);const k=eo((t-o.s-.55)/.6);o.cut.style.opacity=cl((t-o.s-.5)/.15);o.cut.style.transform=`translate(8px,${lerp(30,0,k)}px) scale(${lerp(.96,1,k)})`;
  st(o.tg,pop(t,S(44.0)-.6,.4));shine(o.fr,t,o.s+1)}});

// N4 (nob) SKIN TEXT + FINGER TEXT — "boleh pakai ... cantik"
scene({s:S(44.15),e:S(48.3),nob:1,build(R,o){
  o.sk=E(R,'left:640px;top:1040px;width:280px;height:120px;mix-blend-mode:soft-light',`<div style="font:400 64px Marker;color:#2a1600;transform:perspective(500px) rotateX(18deg) rotateZ(-14deg);text-align:center">PAKAI ✓</div>`,'g bgx');
  o.sk2=E(R,'left:640px;top:1040px;width:280px;height:120px;opacity:.55',`<div style="font:400 64px Marker;color:#FFE680;transform:perspective(500px) rotateX(18deg) rotateZ(-14deg);text-align:center;text-shadow:0 0 10px rgba(0,0,0,.6)">PAKAI ✓</div>`);
  o.fg=E(R,'left:300px;top:900px;width:460px;height:200px',`<svg width="460" height="200" style="position:absolute;inset:0;overflow:visible"><path class="fl" d="M150 190 C 150 140, 190 120, 240 110" stroke="#fff" stroke-width="5" fill="none" stroke-dasharray="200" stroke-dashoffset="200"/></svg><div class="ft" style="position:absolute;left:230px;top:40px;font:900 62px Mont;white-space:nowrap">${goldTx('CANTIK',62)} ✨</div>`);
},upd(t,o){const a=S(44.06);const k=cl((t-a)/.35)*cl((S(46.2)-t)/.3);o.sk.style.opacity=k*.95;o.sk2.style.opacity=k*.9;
  const f=S(46.6);o.fg.querySelector('.fl').style.strokeDashoffset=200*(1-eo((t-f)/.3));const ft=o.fg.querySelector('.ft');const p=pop(t,f+.2,.35);ft.style.opacity=p.o;ft.style.transform=`scale(${p.s})`;o.fg.style.opacity=outF(t,o.e)}});

// B9 SWAP — "PG Jewel dah memberikan pilihan tambahan ... barang kemas"
scene({s:S(48.34),e:S(54.37),build(R,o){
  o.h=title(R,280,`${goldTx('PG JEWEL',70)} · PILIHAN TAMBAHAN`,54);
  const C=[['GOLD BAR',`<div style="position:absolute;inset:0;background:radial-gradient(#3a2a0c,#0b0803);display:flex;align-items:center;justify-content:center">${goldBar(420,210,48)}</div>`],
    ['DINAR',`<div style="position:absolute;inset:0;background:radial-gradient(#3a2a0c,#0b0803);display:flex;align-items:center;justify-content:center">${coin(340)}</div>`],
    ['PG JEWEL','<img src="img/p_adila_rantai.jpg" style="position:absolute;width:820px;left:-130px;top:-60px">'],
    ['BARANG KEMAS','<img src="img/p_gelang.jpg" style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover;object-position:50% 45%">']];
  o.c=C.map(([n,h],i)=>E(R,'left:180px;top:420px;width:640px;height:860px',`<div style="position:absolute;inset:0;border-radius:30px;overflow:hidden;border:5px solid #E8B830;box-shadow:0 18px 50px rgba(0,0,0,.7);background:#000">${h}${SHN}<div style="position:absolute;left:0;right:0;bottom:0;padding:24px 0;text-align:center;background:linear-gradient(transparent,rgba(0,0,0,.85));font:900 58px Mont;color:#fff">${n}</div></div>`));
  o.T=[S(48.4),S(49.62),S(50.7),S(53.1)];
},upd(t,o){st(o.h,slide(t,o.s,0,-40));let cur=0;o.T.forEach((x,i)=>{if(t>=x)cur=i});
  o.c.forEach((el,i)=>{const d=i-cur;const k=eio((t-o.T[cur])/.5);let x=0,r=0,s=1,op=1,z=10-Math.abs(d);
    if(d==0){x=lerp(600,0,i?k:1);r=lerp(12,0,i?k:1);s=1}else if(d==-1){x=lerp(0,-620,k);r=lerp(0,-12,k);op=1-k;z=11}else if(d>0){x=18*d;r=2*d;s=1-.07*d;op=d<3?.6:0}else op=0;
    el.style.zIndex=z;st(el,{o:op*cl((t-o.s)/.25),x,r,s});if(d==0)shine(el,t,o.T[cur]+.3)})}});

// N5 (nob, zoom, ikut video) SKIN TAG — "Tapi satu perkara yang saya nak pesan"
scene({s:S(57.1),e:S(59.2),nob:1,fol:1,build(R,o){
  o.tag=E(R,'left:640px;top:1150px;width:240px;height:200px;transform-origin:30px 0',`<svg width="240" height="60" style="position:absolute;left:0;top:0"><path d="M30 0 C 50 30, 70 40, 90 58" stroke="#fff" stroke-width="3" fill="none"/></svg><div style="position:absolute;left:70px;top:56px;width:170px;height:110px;background:#fffaf0;border-radius:10px 26px 26px 10px;box-shadow:0 8px 18px rgba(0,0,0,.5);display:flex;flex-direction:column;align-items:center;justify-content:center;color:#2a1d00;line-height:1"><div style="font:900 40px Mont">916</div><div style="font:800 22px Mont;margin-top:4px">GELANG</div><div style="position:absolute;left:12px;top:46px;width:16px;height:16px;border-radius:50%;background:#555"></div></div>`);
  o.h=E(R,'left:130px;right:210px;top:262px;text-align:center',pill('☝️ PESANAN PENTING','rgba(120,20,20,.9)','#fff','#ff8a8a',42));
},upd(t,o){const p=pop(t,o.s+.2,.4);o.tag.style.opacity=p.o*outF(t,o.e);o.tag.style.transform=`scale(${p.s}) rotate(${Math.sin((t-o.s)*4)*8*Math.exp(-(t-o.s)*.6)}deg)`;st(o.h,mix(slide(t,o.s,0,-30),{o:outF(t,o.e)}))}});

// N6 (nob) MARKER — "jangan hanya tengok cantik / reka bentuk semata-mata tanpa fahami"
scene({s:S(59.22),e:S(63.6),nob:1,build(R,o){
  o.c=E(R,'left:560px;top:1060px;width:330px;height:300px',mkCircle(330,300));
  o.t1=E(R,'left:470px;top:930px;width:460px;height:110px',mtx('CANTIK JE? ✕',68));
  o.t2=E(R,'left:80px;top:1000px;width:420px;height:110px',mtx('REKA BENTUK ≠ NILAI',44,'#FFE680'));
  o.t3=E(R,'left:60px;right:140px;top:275px;text-align:center',`<div style="display:inline-block;background:#FFE680;color:#2a1d00;font:400 58px Marker;padding:10px 40px;border-radius:8px;transform:rotate(-2deg);box-shadow:0 10px 24px rgba(0,0,0,.5)">FAHAMI DULU! ✍️</div>`);
},upd(t,o){mkUpdC(o.c,t,S(59.84));st(o.t1,pop(t,S(60.32),.35));st(o.t2,pop(t,S(61.36),.35));st(o.t3,mix(pop(t,S(62.58),.4),{r:wob(t,1,.5)}));}});

// B10 CHECKLIST + CHECK GROW — "ketulenan, harga belian dan spread sebelum membuat keputusan"
scene({s:S(64.29),e:S(68.4),build(R,o){
  o.c=E(R,'left:110px;top:330px;width:780px;height:950px',card(''));
  o.h=E(R,'left:110px;top:370px;width:780px;text-align:center;font:900 56px Mont;white-space:nowrap',`📋 SEMAK ${goldTx('SEBELUM BELI',56)}`);
  o.r=[['🔍','KETULENAN','916 / 999',S(64.3)],['🏷️','HARGA BELIAN','ikut harga semasa',S(64.94)],['↔️','SPREAD','beza harga beli & jual',S(66.0)]].map(([em,tx,sub,t0],i)=>{const el=E(R,`left:150px;top:${500+i*190}px;width:700px;height:160px`,`<div class="card" style="position:absolute;inset:0;display:flex;align-items:center;gap:20px;padding-left:28px;border-radius:24px"><span style="font-size:60px">${em}</span><div style="line-height:1.1"><div style="font:900 48px Mont;color:#fff;white-space:nowrap">${tx}</div><div style="font:700 28px Mont;color:#E8C870">${sub}</div></div></div><div style="position:absolute;right:24px;top:28px;width:104px;height:104px">${ckSvg(104)}</div>`);el.t0=t0+.35;return el});
  o.big=E(R,'left:390px;top:1060px;width:220px;height:220px',ckSvg(220,'#F5C542'));
  o.k=E(R,'left:110px;top:1080px;width:780px;text-align:center;font:900 50px Mont;color:#fff','','g sh');
},upd(t,o){st(o.c,pop(t,o.s,.4));st(o.h,slide(t,o.s+.05,0,-30));o.r.forEach((el,i)=>{st(el,slide(t,o.s+.15+i*.12,-80,0));ckUpd(el,t,el.t0)});
  const g=S(67.38);const c=o.big.querySelector('.cks');const k=eo((t-g)/.5);ckUpd(o.big,t,g);c.style.transform=`scale(${t<g?0:lerp(.2,1,k)})`;o.big.style.opacity=t<g?0:1}});

// N7 (nob) GREEN SCREEN — latar diganti rakaman kedai (dibuat dalam gs.py); ikon atas
scene({s:S(68.5),e:S(73.6),nob:1,build(R,o){
  o.h=E(R,'left:60px;right:140px;top:262px;text-align:center',pill('TAK KISAHLAH…','rgba(20,14,4,.85)','#fff','#E8B830',46));
  o.i=[['🟨','GOLD BAR',S(71.1)],['🪙','DINAR',S(71.58)],['💍','BARANG KEMAS',S(72.7)]].map(([em,tx,t0],i)=>{const el=E(R,`left:${[80,355,630][i]}px;top:370px;width:${i==2?280:255}px;height:150px`,glass(`<div style="display:flex;flex-direction:column;align-items:center;justify-content:center;height:100%;line-height:1.1"><span style="font-size:58px">${em}</span><span style="font:900 ${i==2?32:36}px Mont;color:#fff;white-space:nowrap">${tx}</span></div>`,'border-radius:26px'));el.t0=t0;return el});
},upd(t,o){st(o.h,slide(t,o.s,0,-30));o.i.forEach(el=>st(el,mix(pop(t,el.t0,.4),{y:wob(t,5,.5,el.t0)})))}});

// B11 HEADLINE — "Yang penting beli emas dengan berilmu. Bukan ikut emosi"
scene({s:S(73.46),e:S(77.95),build(R,o){
  o.a=E(R,'left:60px;right:140px;top:420px;text-align:center;font:900 96px Mont;color:#fff;white-space:nowrap','YANG PENTING','g sh');
  o.b=E(R,'left:90px;right:170px;top:560px;text-align:center;white-space:nowrap',goldTx('BELI EMAS',130),'g sh');
  o.c=E(R,'left:60px;right:140px;top:730px;text-align:center;white-space:nowrap',`<span style="font:900 104px Mont;color:#fff">DENGAN </span>${goldTx('ILMU',120)}`,'g sh');
  o.d=E(R,'left:200px;top:960px;width:600px;height:150px',`<div style="position:absolute;inset:0;display:flex;align-items:center;justify-content:center;font:900 84px Mont;color:#bbb;white-space:nowrap">BUKAN EMOSI</div><svg width="600" height="150" style="position:absolute;inset:0;overflow:visible"><path class="mp" d="M10 90 C 200 60, 400 100, 590 62" stroke="#FF4D4D" stroke-width="14" stroke-linecap="round" fill="none" stroke-dasharray="3000" stroke-dashoffset="3000"/></svg>`);
},upd(t,o){st(o.a,slide(t,o.s,0,-40));st(o.b,mix(pop(t,S(74.38),.45),{s:1+.02*Math.sin(t*4)}));st(o.c,pop(t,S(75.14),.4));st(o.d,slide(t,S(76.16),0,40));mkUpdC(o.d,t,S(76.74),.4)}});

// B12 CTA — "nak tahu lebih lanjut tentang PG Jewel ... klik link di bawah"
scene({s:S(80.42),e:S(83.2)+.5,build(R,o){
  o.ph=E(R,'left:250px;top:330px;width:500px;height:560px',photo('img/p_adila_rantai.jpg',[700,-120,-40]));
  o.gt=E(R,'left:190px;top:840px;width:620px;height:170px',glass(`<div style="display:flex;flex-direction:column;align-items:center;justify-content:center;height:100%;line-height:1.1"><div style="font:900 70px Mont">${goldTx('PG JEWEL',70)}</div><div style="font:700 32px Mont;color:#fff">nak tahu lebih lanjut?</div></div>`,'border-radius:34px'));
  o.btn=E(R,'left:170px;top:1060px;width:660px;height:140px',`<div style="position:absolute;inset:0;border-radius:70px;background:linear-gradient(180deg,#FFE680,#E8B830);box-shadow:0 12px 30px rgba(0,0,0,.6),0 0 30px rgba(245,197,66,.5);display:flex;align-items:center;justify-content:center;font:900 56px Mont;color:#2a1d00;white-space:nowrap">KLIK LINK DI BAWAH</div><div class="fg" style="position:absolute;right:20px;top:80px;font-size:90px">👆</div>`);
  o.dn=E(R,'left:60px;right:140px;top:1230px;text-align:center;font-size:80px','👇👇','g sh');
},upd(t,o){st(o.ph,pop(t,o.s,.45));flip(o.ph,t,o.s);kb(o.ph,t,o.s);shine(o.ph,t,o.s+.6);st(o.gt,pop(t,S(80.78),.4));
  st(o.btn,mix(pop(t,S(82.34),.35),{s:t>S(82.64)&&t<S(82.64)+.15?.94:1+.03*Math.sin(t*7)}));const fg=o.btn.querySelector('.fg');fg.style.opacity=t>S(82.5)?1:0;fg.style.transform=`translateY(${Math.abs(Math.sin(t*5))*-16}px)`;
  st(o.dn,mix(pop(t,S(82.7),.3),{y:wob(t,8,1.4)}))}});

// tahap blur video = bila ada grafik
function blurAt(t){let b=0;for(const s of SC){if(s.nob)continue;const k=Math.min(cl((t-s.s)/.25),cl((s.e-t)/.25));b=Math.max(b,k)}return eio(b)}

// ---------- kapsyen ----------
const W=window.WORDS||[];const KEY=/^(EMAS|PUBLIC|GOLD|BAR|PG|JEWEL|BARANG|KEMAS|PILIHAN|916|999|KETULENAN|HARGA|BELIAN|SPREAD|ILMU|BERILMU|EMOSI|DINAR|CANTIK|PAKAI|SIMPANAN|LINK|TAMBAHAN|MENARIK|BERBEZA|KEPUTUSAN|PENTING)$/;
const CAPG=[];{let g=[];for(let i=0;i<W.length;i++){const w=W[i];g.push(w);const nx=W[i+1];const len=g.reduce((a,x)=>a+x.w.length+1,0)+(nx?nx.w.length:0);const end=/[.,?]$/.test(w.w)||g.length>=3||len>17||(W[i+1]&&W[i+1].s-w.e>.25);if(end||i==W.length-1){CAPG.push(g);g=[]}}}
const CAP=$('#cap');
function capUpd(t){let g=null;for(const x of CAPG){if(t>=x[0].s-.05&&t<x[x.length-1].e+.25)g=x}
  if(!g){CAP.innerHTML='';return}
  const nch=g.reduce((a,w)=>a+w.w.replace(/[.,?-]/g,'').length,0)+g.length;const fs=Math.min(66,Math.floor(820/(nch*0.80)));
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
  capUpd(t);FLASH.style.opacity=0;
  await Promise.all(PEND.splice(0));
};
window.safecheck=function(){const bad=[];const box=(el)=>el.getBoundingClientRect();
  for(const s of SC){if(s.root.style.display==='none')continue;
    for(const el of s.root.children){if(el.classList.contains('bgx'))continue;if(+getComputedStyle(el).opacity<.05)continue;const r=box(el);if(r.width<2)continue;
      if(r.left<58||r.right>942||r.top<248||r.bottom>1482)bad.push(`${s.s.toFixed(2)}:${el.textContent.trim().slice(0,18)} [${r.left|0},${r.top|0},${r.right|0},${r.bottom|0}]`);}}
  const c=$('#cap');const sp=[...c.children];if(sp.length){const a=sp[0].getBoundingClientRect(),b=sp[sp.length-1].getBoundingClientRect();if(a.left<58||b.right>942)bad.push('cap terkeluar '+c.textContent)}
  return bad};
