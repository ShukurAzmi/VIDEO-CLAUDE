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
const SEGS=[[5.25, 12.98], [13.14, 13.57], [13.89, 15.78], [15.86, 26.24], [26.63, 34.0]],OFFS=[0, 7.596666666666667, 7.893333333333333, 9.649999999999999, 19.896666666666665],DUR=27.266666666666666;
function fromSrc(x,S,O){let b=null;for(let i=0;i<S.length;i++){if(x<S[i][0])return b===null?O[i]:b;if(x<=S[i][1])return O[i]+x-S[i][0];b=O[i]+S[i][1]-S[i][0]}return b}
// ---------- babak: "PG Jewel Mydin Bukit Jambul — tebus barang kemas dengan akaun emas GAP" (masa = MASA SUMBER, ditukar dengan S()) ----------
const S=x=>fromSrc(x,SEGS,OFFS);
const FACE=[560,700];
const L={FULL:{x:0,y:0,s:1,r:0,b:0},PUNCH:{x:FACE[0]*(1-1.08),y:FACE[1]*(1-1.08)+20,s:1.08,r:0,b:0}};
// DIGITAL ZOOM: lembut 1.08x, senyap (serentak glass tag)
const LT=[[0,'FULL'],[S(11.6),'PUNCH',.8],[S(13.9),'FULL',.6],[S(21.0),'PUNCH',.8],[S(25.2),'FULL',.6]];
function layoutAt(t){let cur=L.FULL,prev=L.FULL,k=1;
  for(let i=0;i<LT.length;i++){const [s,n,d=.3]=LT[i];if(t>=s){prev=i?L[LT[i-1][1]]:L.FULL;cur=L[n];k=eio((t-s)/d)}}
  const o={};for(const p of['x','y','s','r','b'])o[p]=lerp(prev[p],cur[p],k);return o}
const FRZ=[];
const PEND=[];
function setImg(im,src){if(im.getAttribute('src')!==src){im.src=src;PEND.push(im.decode().catch(()=>{}))}}
const NBR={IMG_5691:324,IMG_5700:74,IMG_5728:358,IMG_5729:164,IMG_5731:182,IMG_5733:160,IMG_5734:364,IMG_5735:164,IMG_5736:155,RING:914};
const brF=(clip,t,t0,off=0)=>`brf2/${clip}/${String(Math.min(NBR[clip],Math.max(1,Math.floor((t-t0+off)*30)+1))).padStart(5,'0')}.jpg`;
const vclip=(pos='50% 50%')=>`<div class="ph" style="position:absolute;inset:0;border-radius:26px;overflow:hidden;border:5px solid #E8B830;box-shadow:0 18px 50px rgba(0,0,0,.7),0 0 40px rgba(245,197,66,.3);background:#000"><img style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover;object-position:${pos}">${SHN}${TW()}</div>`;
const vupd=(el,clip,t,t0,off)=>setImg(el.querySelector('.ph img'),brF(clip,t,t0,off));
const glass=(html,css='')=>`<div class="glass" style="position:absolute;inset:0;${css}">${html}</div>`;
const ckSvg=(sz,col='#2ecc71')=>`<svg class="cks" width="${sz}" height="${sz}" viewBox="0 0 100 100" style="position:absolute;inset:0"><circle class="cc" cx="50" cy="50" r="46" fill="${col}"/><path class="cp" d="M28 52 L44 68 L74 34" fill="none" stroke="#fff" stroke-width="11" stroke-linecap="round" stroke-linejoin="round" stroke-dasharray="80" stroke-dashoffset="80"/></svg>`;
const ckUpd=(el,t,t0)=>{const c=el.querySelector('.cks');if(!c)return;const p=pop(t,t0,.35);c.style.opacity=p.o;c.style.transform=`scale(${p.s})`;c.querySelector('.cp').style.strokeDashoffset=80*(1-eo((t-t0-.08)/.3))};
const title=(R,top,html,fs=66)=>E(R,`left:90px;right:180px;top:${top}px;text-align:center;font:900 ${fs}px Mont;white-space:nowrap`,html,'g sh');
const topPill=(R,html,top=330)=>E(R,`left:90px;right:180px;top:${top}px;text-align:center`,html);
const gtag=(tx,fs=44)=>`<div class="glass" style="display:inline-block;padding:14px 40px;border-radius:60px;font:900 ${fs}px Mont;color:#fff;white-space:nowrap">${tx}</div>`;
const tw2=(el,t,t0)=>el.querySelectorAll('.tw').forEach((w,i)=>{const p=((t-t0)*1.3+i*.37)%1.6;const k=p<.6?Math.sin(Math.PI*p/.6):0;w.style.opacity=t>t0+.3?k:0;w.style.transform=`scale(${.3+k}) rotate(${p*90}deg)`});
const shine2=(el,t,t0)=>{const s=el.querySelector('.shn');if(s){const k=cl((t-t0)/.9);s.style.transform=`translateX(${lerp(-500,900,k)}px) rotate(20deg)`;s.style.opacity=k>0&&k<1?1:0}};
const pgj=(fs)=>`<span style="font:700 ${fs}px Play;color:#E0262B;text-shadow:0 0 1px #fff,0 2px 0 #fff3c4">PG</span> <span style="font:900 ${fs*.6}px Mont;letter-spacing:.15em">${goldTx('JEWEL',fs*.6)}</span>`;

// 1 (nob) muka jelas dulu — pil lokasi
scene({s:S(6.6),e:S(8.45),nob:1,build(R,o){
  o.a=topPill(R,gtag(`📍 MYDIN ${goldTx('BUKIT JAMBUL',44)}`,44));
},upd(t,o){st(o.a,mix(slide(t,o.s,0,-50),{o:outF(t,o.e)}))}});

// 2 BLUR + GRAFIK BESAR — "Apa yang ada dekat tingkat lower ground ni" (rakaman kedai IMG_5700)
scene({s:S(8.5),e:S(11.55),build(R,o){
  o.h=title(R,340,`TINGKAT ${goldTx('LOWER GROUND',62)}`,58);
  o.v=E(R,'left:190px;top:450px;width:560px;height:760px',vclip());
  o.q=E(R,'left:300px;top:1110px;width:340px;height:110px',`<div class="glass" style="position:absolute;inset:0;border-radius:55px;display:flex;align-items:center;justify-content:center;font:900 46px Mont;white-space:nowrap">ADA APA? 👀</div>`);
},upd(t,o){st(o.h,slide(t,o.s,0,-40));st(o.v,mix(pop(t,o.s+.1,.5),{y:wob(t,6,.3)}));flip(o.v,t,o.s+.1);vupd(o.v,'IMG_5700',t,o.s,0);tw2(o.v,t,o.s);shine2(o.v,t,o.s+.7);
  st(o.q,mix(pop(t,o.s+1.2,.4),{y:wob(t,5,.5)}))}});

// 3 (nob) ZOOM + GLASS TAG — "adalah PG Jewel" (kamera ke papan tanda)
scene({s:S(11.65),e:S(13.85),nob:1,build(R,o){
  o.a=E(R,'left:160px;top:340px;width:600px;height:170px',glass(`<div style="display:flex;flex-direction:column;align-items:center;justify-content:center;height:100%;line-height:1.05"><div style="white-space:nowrap">${pgj(84)}</div><div style="font:800 26px Mont;color:#E8C870">KEDAI EMAS · by Public Gold</div></div>`,'border-radius:34px'));
},upd(t,o){st(o.a,mix(pop(t,o.s+.05,.45),{y:wob(t,5,.4),o:outF(t,o.e)}))}});

// 4 BLUR + GRAFIK BESAR — "tempat jual dan beli emas"
scene({s:S(14.6),e:S(17.25),build(R,o){
  o.h=title(R,340,`TEMPAT ${goldTx('JUAL & BELI',64)}`,58);
  o.v=E(R,'left:160px;top:450px;width:620px;height:560px',vclip('50% 40%'));
  o.j=E(R,'left:130px;top:1060px;width:310px;height:120px',`<div class="card" style="position:absolute;inset:0;border-radius:60px;display:flex;align-items:center;justify-content:center;font:900 44px Mont;white-space:nowrap">JUAL 💰</div>`);
  o.b=E(R,'left:500px;top:1060px;width:310px;height:120px',`<div class="card" style="position:absolute;inset:0;border-radius:60px;display:flex;align-items:center;justify-content:center;font:900 44px Mont;white-space:nowrap">BELI ✨</div>`);
  o.x=E(R,'left:430px;top:1085px;width:80px;height:70px',`<div style="font:900 52px Mont;color:#F5C542;text-align:center">⇄</div>`);
},upd(t,o){st(o.h,slide(t,o.s,0,-40));st(o.v,mix(pop(t,o.s+.1,.5),{y:wob(t,6,.3)}));vupd(o.v,'IMG_5734',t,o.s,.2);tw2(o.v,t,o.s);shine2(o.v,t,o.s+.6);
  st(o.j,slide(t,S(15.9),-60,0));st(o.b,slide(t,S(16.5),60,0));st(o.x,pop(t,S(16.4),.35))}});

// 5 BLUR + GRAFIK BESAR — "khas untuk orang yang dah ada akaun emas GAP"
scene({s:S(18.15),e:S(20.85),build(R,o){
  o.h=title(R,350,`${goldTx('KHAS',70)} UNTUK`,66);
  o.c=E(R,'left:150px;top:500px;width:640px;height:520px',`<div class="card" style="position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:14px;line-height:1.05">
    <div style="font-size:150px;line-height:1">📱</div><div style="font:800 40px Mont;color:#fff;white-space:nowrap">PEMILIK</div><div style="font:900 70px Mont;white-space:nowrap">${goldTx('AKAUN EMAS GAP',62)}</div></div>`+`<div style="position:absolute;inset:0">${TW()}</div>`);
  o.k=E(R,'left:690px;top:450px;width:130px;height:130px',ckSvg(130));
  o.n=E(R,'left:160px;top:1080px;width:620px;height:100px',`<div style="font:700 32px Mont;color:#E8C870;text-align:center;white-space:nowrap">simpanan emas di Public Gold</div>`);
},upd(t,o){st(o.h,slide(t,o.s,0,-40));st(o.c,mix(pop(t,o.s+.1,.5),{y:wob(t,5,.35)}));tw2(o.c,t,o.s);ckUpd(o.k,t,S(20.1));st(o.n,slide(t,S(20.2),0,30))}});

// 6 (nob) GREEN SCREEN + ZOOM + GLASS TAG — "pilih nak keluarkan item barang kemas 916 ataupun 999" (latar: dulang barang kemas IMG_5729)
scene({s:S(21.0),e:S(25.25),nob:1,build(R,o){
  o.a=E(R,'left:150px;top:340px;width:620px;height:150px',glass(`<div style="display:flex;flex-direction:column;align-items:center;justify-content:center;height:100%;line-height:1.1"><div style="font:800 32px Mont;color:#fff">KELUARKAN JADI</div><div style="font:900 54px Mont;white-space:nowrap">${goldTx('BARANG KEMAS 💍',54)}</div></div>`,'border-radius:30px'));
  o.x=E(R,'left:150px;top:1100px;width:250px;height:110px',`<div class="glass" style="position:absolute;inset:0;border-radius:55px;display:flex;align-items:center;justify-content:center;font:900 62px Mont">${goldTx('916',62)}</div>`);
  o.or=E(R,'left:400px;top:1125px;width:120px;height:60px',`<div style="font:800 30px Mont;text-align:center;color:#fff;text-shadow:0 2px 8px #000">atau</div>`);
  o.y=E(R,'left:520px;top:1100px;width:250px;height:110px',`<div class="glass" style="position:absolute;inset:0;border-radius:55px;display:flex;align-items:center;justify-content:center;font:900 62px Mont">${goldTx('999',62)}</div>`);
},upd(t,o){st(o.a,mix(pop(t,S(22.0),.45),{y:wob(t,5,.4),o:outF(t,o.e)}));st(o.x,mix(pop(t,S(23.64),.4),{y:wob(t,6,.5),o:outF(t,o.e)}));
  st(o.or,{o:cl((t-S(24.3))/.2)*outF(t,o.e)});st(o.y,mix(pop(t,S(24.8),.4),{y:wob(t,6,.5,.4),o:outF(t,o.e)}))}});

// 7 BLUR + CHECKLIST — "yang bestnya, hanya bawa IC sahaja dan telefon"
scene({s:S(25.35),e:S(28.95),build(R,o){
  o.h=title(R,350,`YANG ${goldTx('BEST?',72)} 😍`,66);
  o.s2=title(R,450,`<span style="font:800 40px Mont;color:#E8C870">HANYA BAWA</span>`,40);
  o.r=[['🪪','IC',27.4],['📱','TELEFON',28.5]].map(([ic,tx,t0],i)=>{const el=E(R,`left:150px;top:${560+i*260}px;width:640px;height:210px`,`<div class="card" style="position:absolute;inset:0;display:flex;align-items:center;gap:30px;padding-left:44px"><div style="font-size:110px;line-height:1">${ic}</div><div style="font:900 54px Mont;white-space:nowrap">${tx}</div></div><div style="position:absolute;right:22px;top:50px;width:110px;height:110px">${ckSvg(110)}</div>`);el.t0=S(t0);return el});
},upd(t,o){st(o.h,slide(t,o.s,0,-40));st(o.s2,slide(t,o.s+.3,0,-20));
  o.r.forEach(el=>{st(el,slide(t,el.t0-.45,0,50));ckUpd(el,t,el.t0)})}});

// 8 BLUR + KIPAS 3 KLIP — "dan boleh pilih lah nak barang kemas apa"
const FAN=[['RING',13.0,-10,-140,'50% 50%'],['IMG_5735',1.0,0,0,'50% 50%'],['IMG_5728',0.5,10,140,'50% 50%']];
scene({s:S(29.0),e:S(31.0),build(R,o){
  o.h=title(R,350,`PILIH ${goldTx('SENDIRI',70)} 💍`,64);
  o.f=FAN.map(([c,off,r,dx,pos],i)=>{const el=E(R,`left:${290+dx}px;top:520px;width:360px;height:600px`,vclip(pos));el.c=c;el.off=off;el.r=r;el.dx=dx;el.t0=o.s+.2+i*.35;return el});
  o.f.push(o.f.splice(1,1)[0]);o.f.forEach((el,i)=>el.style.zIndex=i);
},upd(t,o){st(o.h,slide(t,o.s,0,-40));o.f.forEach(el=>{const p=pop(t,el.t0,.45);st(el,{o:p.o,s:p.s,x:0,y:wob(t,5,.4,el.r),r:el.r*eo((t-el.t0)/.5)});vupd(el,el.c,t,o.s,el.off);tw2(el,t,el.t0)})}});

// 9 (nob) CTA KACA — "banyak pilihan kat sini" (kamera ke paparan)
scene({s:S(31.05),e:S(34.0)+.01,nob:1,build(R,o){
  o.gt=E(R,'left:150px;top:350px;width:620px;height:190px',glass(`<div style="display:flex;flex-direction:column;align-items:center;justify-content:center;height:100%;line-height:1.1"><div style="font:800 32px Mont;color:#fff">📍 DATANG KE</div><div style="font:900 50px Mont;white-space:nowrap">${goldTx('KEDAI EMAS PG JEWEL',46)}</div><div style="font:700 28px Mont;color:#E8C870">Mydin Bukit Jambul · Lower Ground</div></div>`,'border-radius:34px'));
  o.btn=E(R,'left:170px;top:1090px;width:580px;height:120px',`<div style="position:absolute;inset:0;border-radius:60px;background:linear-gradient(180deg,#FFE680,#E8B830);box-shadow:0 12px 30px rgba(0,0,0,.6),0 0 30px rgba(245,197,66,.5);display:flex;align-items:center;justify-content:center;font:900 44px Mont;color:#2a1d00;white-space:nowrap">💍 BANYAK PILIHAN</div>`);
},upd(t,o){st(o.gt,mix(pop(t,o.s+.1,.45),{y:wob(t,5,.4)}));st(o.btn,mix(pop(t,S(31.7),.4),{s:1+.02*Math.sin(t*6)}))}});

// tahap blur video = bila ada grafik
function blurAt(t){let b=0;for(const s of SC){if(s.nob)continue;const k=Math.min(cl((t-s.s)/.25),cl((s.e-t)/.25));b=Math.max(b,k)}return eio(b)}

// ---------- kapsyen ----------
const W=window.WORDS||[];const KEY=/^(EMAS|PG|JEWEL|GAP|AKAUN|KHAS|916|999|BARANG|KEMAS|IC|TELEFON|BESTNYA|PILIHAN|MYDIN)$/;
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
