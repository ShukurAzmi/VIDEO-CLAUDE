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

// ---------- layout video (v2: tiada kad; video penuh, zoom senyap) ----------
const FACE=[360,860];
const L={
  FULL:{x:0,y:0,s:1,r:0,b:0},
  PUNCH:{x:FACE[0]*(1-1.08),y:FACE[1]*(1-1.08)+25,s:1.08,r:0,b:0},
  PUNCH2:{x:FACE[0]*(1-1.2),y:FACE[1]*(1-1.2)+40,s:1.2,r:0,b:0},
};
// v3: zoom dikurangkan — 4 kali sahaja, lembut (1.08x), perlahan
const LT=[[0,'FULL'],[5.0,'PUNCH',.8],[6.4,'FULL',.6],[20.5,'PUNCH',.8],[23.0,'FULL',.6],[45.5,'PUNCH',.8],[49.2,'FULL',.6],[66.0,'PUNCH',.8],[69.1,'FULL',.6]];
function layoutAt(t){let cur=L.FULL,prev=L.FULL,k=1;
  for(let i=0;i<LT.length;i++){const [s,n,d=.3]=LT[i];if(t>=s){prev=i?L[LT[i-1][1]]:L.FULL;cur=L[n];k=eio((t-s)/d)}}
  const o={};for(const p of['x','y','s','r','b'])o[p]=lerp(prev[p],cur[p],k);return o}

// ---------- latar ----------
const BGFX=$('#bgfx');const SP=[];
for(let i=0;i<40;i++){const r=(i*9301+49297)%233280/233280,r2=(i*4253+1237)%1000/1000;
  SP.push([E(BGFX,`left:0;top:0;width:${4+r*8}px;height:${4+r*8}px;border-radius:50%;background:#F5C542;box-shadow:0 0 12px #F5C542`),r,r2])}
function bgUpd(t,bl){BGFX.style.opacity=bl;for(const [el,r,r2] of SP){const y=1920-((t*(30+r*60)+r2*1920)%2100);el.style.transform=`translate(${(r*1080+wob(t,40,.1,r*9))}px,${y}px)`;el.style.opacity=.2+.5*Math.abs(Math.sin(t*(1+r)+r2*6))}}

const goldBar=(w=150,h=70,fs=15)=>`<div class="bar" style="width:${w}px;height:${h}px;font-size:${fs}px;line-height:1;text-align:center;flex-direction:column">PUBLIC GOLD<span style="font-size:${fs*.75}px;font-weight:800;opacity:.8;margin-top:3px">999.9</span></div>`;
const CK=(sz)=>`<div class="ck" style="position:absolute;right:-${sz/3}px;top:-${sz/3}px;width:${sz}px;height:${sz}px;border-radius:50%;background:#2ecc71;color:#fff;font:900 ${sz*.65}px Mont;display:flex;align-items:center;justify-content:center;box-shadow:0 4px 12px rgba(0,0,0,.5)">✓</div>`;


// ---------- babak: "Cara tahu emas bukan palsu — 3 soalan wajib" (masa = output selepas potong) ----------
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
// tiub ketulinan (isi emas naik); data-p = peratus
const tube=(lb,col='#F5C542')=>`<div style="position:absolute;inset:0;border-radius:40px;border:5px solid #E8B830;background:rgba(10,8,4,.75);overflow:hidden;box-shadow:0 14px 40px rgba(0,0,0,.6)">
  <div class="fill" style="position:absolute;left:0;right:0;bottom:0;height:0;background:linear-gradient(90deg,#B8860B,#FFE680 35%,#F5C542 60%,#C8901A);box-shadow:0 -6px 20px rgba(255,230,128,.7)">${SHN}</div>
  <div class="alloy" style="position:absolute;left:0;right:0;top:0;height:0;background:repeating-linear-gradient(135deg,#4a4a4a 0 14px,#3a3a3a 14px 28px);opacity:0"></div>
  <div style="position:absolute;left:0;right:0;bottom:24px;text-align:center;font:900 64px Mont;color:#3a2600">${lb}</div></div>`;
const tubeUpd=(el,t,t0,p,d=.9)=>{const k=eo((t-t0)/d);el.querySelector('.fill').style.height=(p*k)+'%';const a=el.querySelector('.alloy');a.style.height=(100-p)+'%';a.style.opacity=cl((t-t0-d)/.3);shine(el,t,t0+d)};
const cnt=(t,t0,v,d=.9,dec=1)=>(v*eo((t-t0)/d)).toFixed(dec);

// baris kad: emoji + teks + bulatan ✓/✕ di kanan
const row=(em,tx,fs=44,ok=true)=>`<div class="card" style="position:absolute;inset:0;display:flex;align-items:center;gap:18px;padding-left:26px;border-radius:24px"><span style="font-size:60px;line-height:1">${em}</span><span style="font:900 ${fs}px Mont;white-space:nowrap;color:#fff">${tx}</span></div>`+
  `<div class="mk" style="position:absolute;right:18px;top:50%;margin-top:-42px;width:84px;height:84px;border-radius:50%;background:${ok?'#2ecc71':'#e74c3c'};color:#fff;font:900 54px Mont;display:flex;align-items:center;justify-content:center;box-shadow:0 4px 12px rgba(0,0,0,.5)">${ok?'✓':'✕'}</div>`;
const mkUpd=(el,t,t0)=>{const m=el.querySelector('.mk');if(m){const p=pop(t,t0,.3);m.style.opacity=p.o;m.style.transform=`scale(${p.s})`}};
const numB=(n,sz=150)=>badge(n,sz);

// B1 (2.3) EMAS ASLI atau PALSU? — jongkong + dua kad
scene({s:2.3,e:4.95,build(R,o){
  o.ph=E(R,'left:190px;top:300px;width:700px;height:440px',photo('img/bar.jpg'));
  o.mg=E(R,'left:640px;top:560px;width:220px;height:220px;font-size:190px;line-height:1','🔍');
  o.a=E(R,'left:170px;top:790px;width:330px;height:150px',card(`<div style="display:flex;align-items:center;justify-content:center;height:100%;gap:14px;font:900 58px Mont;white-space:nowrap"><span>✅</span><span class="gold">ASLI</span></div>`));
  o.b=E(R,'left:550px;top:790px;width:330px;height:150px',card(`<div style="display:flex;align-items:center;justify-content:center;height:100%;gap:14px;font:900 58px Mont;color:#ff8a8a;white-space:nowrap"><span>❌</span><span>PALSU</span></div>`,'border-color:#ff6b6b'));
  o.q=E(R,'left:60px;right:140px;top:990px;text-align:center;white-space:nowrap',pill('MACAM MANA NAK TAHU? 🤔','#3a2e14','#fff','#E8B830',42));
},upd(t,o){const f=outF(t,o.e);st(o.ph,mix(slide(t,2.3,0,60,.5),{o:f}));flip(o.ph,t,2.3);kb(o.ph,t,2.3);shine(o.ph,t,2.7);
  st(o.mg,mix(pop(t,2.75),{o:f,x:wob(t,30,.5),y:wob(t,18,.7,.2),r:-10}));
  st(o.a,mix(pop(t,2.9),{o:f}));st(o.b,mix(pop(t,3.3),{o:f,r:wob(t,1.5,2)}));st(o.q,mix(pop(t,3.9),{o:f}));
}});

// B2 (6.7) DUIT HASIL KITA — jangan malu bertanya, kita sendiri perlu tahu
scene({s:6.7,e:9.85,build(R,o){
  o.w=E(R,'left:390px;top:290px;width:300px;height:300px;font-size:250px;line-height:1;text-align:center','👛');
  o.n=[...Array(5)].map((_,i)=>E(R,`left:${440+i*30}px;top:400px;width:100px;height:100px;font-size:80px;line-height:1`,'💵'));
  o.h=E(R,'left:60px;right:140px;top:630px;text-align:center;white-space:nowrap','<span style="font:800 46px Mont;color:#ddd">DUIT HASIL </span>'+goldTx('KITA SENDIRI',64),'g sh');
  o.r1=E(R,'left:150px;top:760px;width:740px;height:130px',row('🙋‍♀️','JANGAN MALU BERTANYA',34));
  o.r2=E(R,'left:150px;top:920px;width:740px;height:130px',row('🧠','KITA PERLU TAHU',44));
},upd(t,o){const f=outF(t,o.e);st(o.w,mix(pop(t,6.75),{o:f,r:wob(t,4,.8)}));
  o.n.forEach((el,i)=>{const k=cl((t-7.5-i*.12)/1.2);st(el,{o:k>0&&k<1?f*Math.sin(Math.PI*k):0,x:(i-2)*110*k,y:-160*k+120*k*k,r:(i-2)*25*k})});
  st(o.h,mix(slide(t,7.84,0,40),{o:f}));st(o.r1,mix(slide(t,6.9,-80,0),{o:f}));mkUpd(o.r1,t,7.2);st(o.r2,mix(slide(t,8.54,-80,0),{o:f}));mkUpd(o.r2,t,9.3);
}});

// B3 (12.6) BELI EMAS MURAH SECARA ONLINE — foto telefon + tag harga
scene({s:12.6,e:16.7,build(R,o){
  o.ph=E(R,'left:230px;top:290px;width:620px;height:720px',photo('img/online.jpg',null,'50% 40%'));
  o.tag=E(R,'left:110px;top:560px;width:380px;height:190px',`<div style="position:absolute;inset:0;background:linear-gradient(160deg,#ff5a5a,#c81e1e);border:5px solid #fff;border-radius:26px;box-shadow:0 12px 30px rgba(0,0,0,.6);text-align:center;line-height:1.05;padding-top:20px">
    <div style="font:900 40px Mont;color:#fff;white-space:nowrap">🔥 EMAS MURAH</div><div style="font:900 62px Mont;color:#FFE680;white-space:nowrap">SALE 50%</div></div>`);
  o.il=E(R,'left:140px;top:760px;width:300px;font:600 24px Mont;color:#ddd','*ilustrasi');
  o.q=E(R,'left:60px;right:140px;top:1050px;text-align:center;white-space:nowrap',pill('📱 SECARA ONLINE','#3a2e14','#fff','#E8B830',54));
},upd(t,o){const f=outF(t,o.e);st(o.ph,mix(slide(t,12.6,80,0,.5),{o:f}));flip(o.ph,t,12.6,-1);kb(o.ph,t,12.6);
  st(o.tag,mix(pop(t,15.47),{o:f,r:-8+wob(t,2,1.2)}));st(o.il,{o:cl((t-15.7)/.3)*f});st(o.q,mix(pop(t,16.2),{o:f}));
}});

// B4 (16.7) BARANG SAMPAI — RUPA-RUPANYA BUKAN EMAS!
scene({s:16.7,e:20.4,build(R,o){
  o.ph=E(R,'left:190px;top:300px;width:700px;height:520px',photo('img/parcel.jpg'));
  o.x=E(R,'left:390px;top:410px;width:300px;height:300px;border-radius:50%;border:16px solid #ff4d4d;box-shadow:0 0 40px rgba(255,60,60,.6)','<div style="position:absolute;left:50%;top:50%;width:300px;height:16px;margin:-8px 0 0 -150px;background:#ff4d4d;transform:rotate(45deg)"></div><div style="position:absolute;left:50%;top:50%;width:300px;height:16px;margin:-8px 0 0 -150px;background:#ff4d4d;transform:rotate(-45deg)"></div>');
  o.h=E(R,'left:60px;right:140px;top:870px;text-align:center;white-space:nowrap',pill('😱 BUKAN EMAS!','#5a1414','#fff','#ff6b6b',66));
  o.sub=E(R,'left:60px;right:140px;top:1010px;text-align:center;white-space:nowrap;font:800 42px Mont;color:#ddd','TAK SEPERTI DIJANJIKAN','g sh');
},upd(t,o){const f=outF(t,o.e);st(o.ph,mix(pop(t,16.75,.45),{o:f,r:wob(t,.8,1.5)}));kb(o.ph,t,16.75);
  st(o.x,mix(pop(t,18.2,.35),{o:f*.95}));st(o.h,mix(pop(t,18.3),{o:f,x:t>18.3&&t<18.7?wob(t,8,8):0}));st(o.sub,mix(slide(t,19.6,0,30),{o:f}));
}});

// B5 (23.3) 3 SOALAN WAJIB TANYA
scene({s:23.3,e:26.2,build(R,o){
  o.b=E(R,'left:390px;top:290px;width:300px;height:300px',badge('3',300));
  o.h=E(R,'left:60px;right:140px;top:620px;text-align:center;white-space:nowrap;line-height:1.05','<div class="gold" style="font:900 80px Mont">SOALAN WAJIB</div><div style="font:800 52px Mont;color:#fff">ANDA TANYA ❓</div>','g sh');
  o.c=[0,1,2].map(i=>E(R,`left:${150+i*250}px;top:860px;width:220px;height:180px`,card(`<div style="text-align:center;padding-top:24px;line-height:1"><div class="gold" style="font:900 80px Mont">${i+1}</div><div style="font-size:44px">❓</div></div>`)));
},upd(t,o){const f=outF(t,o.e);st(o.b,mix(pop(t,23.75,.45),{o:f,r:wob(t,4,.6)}));st(o.h,mix(slide(t,24.2,0,40),{o:f}));
  o.c.forEach((el,i)=>st(el,mix(pop(t,24.7+i*.2),{o:f,y:wob(t,6,.8,i*.3)})));
}});

// B6 (26.2) SOALAN 1: ADA KEDAI FIZIKAL? boleh pergi & periksa sendiri
scene({s:26.2,e:32.95,build(R,o){
  o.n=E(R,'left:150px;top:290px;width:740px;height:130px',`<div style="display:flex;align-items:center;gap:22px">${numB('1',130)}<div style="font:900 56px Mont;color:#fff;white-space:nowrap">SOALAN <span class="gold">PERTAMA</span></div></div>`);
  o.ph=E(R,'left:150px;top:450px;width:740px;height:320px',photo('img/kedai.jpg',null,'50% 55%'));
  o.lb=E(R,'left:60px;right:140px;top:800px;text-align:center;white-space:nowrap',pill('🏪 ADA KEDAI FIZIKAL?','#3a2e14','#fff','#E8B830',50));
  o.r1=E(R,'left:150px;top:910px;width:740px;height:120px',row('📍','BOLEH PERGI',46));
  o.r2=E(R,'left:150px;top:1050px;width:740px;height:120px',row('🔍','PERIKSA SENDIRI',44));
},upd(t,o){const f=outF(t,o.e);st(o.n,mix(slide(t,26.25,-60,0),{o:f}));
  st(o.ph,mix(slide(t,29.2,0,60,.5),{o:f}));flip(o.ph,t,29.2);kb(o.ph,t,29.2,1,1.1,3.7);shine(o.ph,t,29.6);
  st(o.lb,mix(pop(t,29.72),{o:f}));
  st(o.r1,mix(slide(t,31.04,-80,0),{o:f}));mkUpd(o.r1,t,31.3);st(o.r2,mix(slide(t,31.9,-80,0),{o:f}));mkUpd(o.r2,t,32.3);
}});

// B7 (33.0) SOALAN 2: MAKLUMAT JELAS — berat & ketulinan
scene({s:33.0,e:38.05,build(R,o){
  o.n=E(R,'left:150px;top:290px;width:740px;height:130px',`<div style="display:flex;align-items:center;gap:22px">${numB('2',130)}<div style="font:900 56px Mont;color:#fff;white-space:nowrap">SOALAN <span class="gold">KEDUA</span></div></div>`);
  o.bar=E(R,'left:300px;top:470px;width:480px;height:220px;overflow:hidden;border-radius:12px','<div class="bar" style="width:480px;height:220px;font-size:52px;flex-direction:column">PUBLIC GOLD<span style="font-size:36px;opacity:.8;margin-top:8px">999.9</span></div>'+SHN);
  o.lb=E(R,'left:60px;right:140px;top:730px;text-align:center;white-space:nowrap',pill('📄 MAKLUMAT JELAS?','#3a2e14','#fff','#E8B830',50));
  o.r1=E(R,'left:150px;top:860px;width:740px;height:120px',row('⚖️','BERAT',50));
  o.r2=E(R,'left:150px;top:1000px;width:740px;height:120px',row('✨','KETULINAN',50));
},upd(t,o){const f=outF(t,o.e);st(o.n,mix(slide(t,33.05,-60,0),{o:f}));
  st(o.bar,mix(pop(t,34.33,.45),{o:f,r:-3+wob(t,1.5,.5),y:wob(t,8,.6)}));shine(o.bar,t,34.8);
  st(o.lb,mix(pop(t,35.22),{o:f}));
  st(o.r1,mix(slide(t,36.58,-80,0),{o:f}));mkUpd(o.r1,t,36.8);st(o.r2,mix(slide(t,37.3,-80,0),{o:f}));mkUpd(o.r2,t,37.5);
}});

// B8 (38.05) SOALAN 3: BOLEH JUAL BALIK DI SYARIKAT YANG SAMA?
scene({s:38.05,e:45.45,build(R,o){
  o.n=E(R,'left:150px;top:290px;width:740px;height:130px',`<div style="display:flex;align-items:center;gap:22px">${numB('3',130)}<div style="font:900 56px Mont;color:#fff;white-space:nowrap">SOALAN <span class="gold">KETIGA</span></div></div>`);
  o.a=E(R,'left:110px;top:520px;width:300px;height:240px',card(`<div style="text-align:center;padding-top:30px;line-height:1.1"><div style="font-size:96px">🛒</div><div class="gold" style="font:900 52px Mont">BELI</div></div>`));
  o.b=E(R,'left:620px;top:520px;width:300px;height:240px',card(`<div style="text-align:center;padding-top:30px;line-height:1.1"><div style="font-size:96px">💰</div><div class="gold" style="font:900 40px Mont;white-space:nowrap">JUAL BALIK</div></div>`));
  o.c=E(R,'left:420px;top:540px;width:190px;height:190px;font-size:160px;line-height:1;text-align:center','🔄');
  o.lb=E(R,'left:60px;right:140px;top:830px;text-align:center;white-space:nowrap;line-height:1.1','<div style="font:800 46px Mont;color:#ddd">BOLEH JUAL DI</div>'+goldTx('SYARIKAT YANG SAMA?',58),'g sh');
  o.ic=E(R,'left:60px;right:140px;top:1000px;text-align:center;font-size:110px;line-height:1','🏢');
},upd(t,o){const f=outF(t,o.e);st(o.n,mix(slide(t,38.1,-60,0),{o:f}));
  st(o.a,mix(pop(t,39.06),{o:f}));st(o.b,mix(pop(t,40.82),{o:f}));st(o.c,mix(pop(t,41.16),{o:f,r:(t-41.16)*120}));
  st(o.lb,mix(slide(t,43.77,0,40),{o:f}));st(o.ic,mix(pop(t,44.29),{o:f,y:wob(t,8,1)}));
}});

// B9 (49.5) JANGAN TERBURU-BURU MEMBELI
scene({s:49.5,e:51.2,build(R,o){
  o.h=E(R,'left:390px;top:330px;width:300px;height:300px;font-size:260px;line-height:1;text-align:center','✋');
  o.t=E(R,'left:60px;right:140px;top:680px;text-align:center;white-space:nowrap;line-height:1.05','<div style="font:900 72px Mont;color:#fff">JANGAN</div><div style="font:900 76px Mont;color:#ff8a8a">TERBURU-BURU!</div>','g sh');
},upd(t,o){const f=outF(t,o.e);st(o.h,mix(pop(t,49.55,.4),{o:f,r:wob(t,6,2)}));st(o.t,mix(pop(t,49.8),{o:f}));
}});

// B10 (51.7) JANGAN BELI DI TEMPAT YANG TAK BOLEH SEMAK
scene({s:51.7,e:55.35,build(R,o){
  o.h=E(R,'left:60px;right:140px;top:300px;text-align:center;white-space:nowrap',pill('🚫 JANGAN BELI EMAS','#5a1414','#fff','#ff6b6b',54));
  o.ic=E(R,'left:340px;top:450px;width:400px;height:300px;font-size:200px;line-height:1;text-align:center','🏚️');
  o.q=E(R,'left:670px;top:420px;width:150px;height:150px;font-size:120px;line-height:1','❓');
  o.r1=E(R,'left:150px;top:820px;width:740px;height:130px',row('🔍','TAK BOLEH SEMAK',44,false));
},upd(t,o){const f=outF(t,o.e);st(o.h,mix(pop(t,51.75),{o:f}));st(o.ic,mix(pop(t,53.08,.4),{o:f}));st(o.q,mix(pop(t,53.5),{o:f,r:wob(t,12,1)}));
  st(o.r1,mix(slide(t,54.18,-80,0),{o:f}));mkUpd(o.r1,t,54.66);
}});

// B11 (55.35) ✓ BELI DI TEMPAT YANG BOLEH: pergi, periksa, penjelasan
scene({s:55.35,e:60.05,build(R,o){
  o.ph=E(R,'left:150px;top:290px;width:740px;height:360px',photo('img/kemas.jpg'));
  o.h=E(R,'left:60px;right:140px;top:600px;text-align:center;white-space:nowrap',pill('✅ BELI DI TEMPAT YANG…','#14401f','#fff','#2ecc71',46));
  o.r=[['📍','BOLEH PERGI',46,57.78],['🔍','BOLEH PERIKSA',46,58.32],['💬','DAPAT PENJELASAN',40,59.5]].map(([e,x,fs,t0],i)=>{const el=E(R,`left:150px;top:${720+i*135}px;width:740px;height:115px`,row(e,x,fs));el.t0=t0;return el});
},upd(t,o){const f=outF(t,o.e);st(o.ph,mix(slide(t,55.4,0,60,.5),{o:f}));flip(o.ph,t,55.4);kb(o.ph,t,55.4);shine(o.ph,t,55.8);
  st(o.h,mix(pop(t,55.85),{o:f}));o.r.forEach(el=>{st(el,mix(slide(el===o.r[0]?t:t,el.t0,-80,0),{o:f}));mkUpd(el,t,el.t0+.25)});
}});

// B12 (60.05) ILMU > HARGA MURAH — neraca
scene({s:60.05,e:65.3,build(R,o){
  o.h=E(R,'left:60px;right:140px;top:290px;text-align:center;white-space:nowrap;line-height:1.05','<div style="font:800 46px Mont;color:#ddd">DALAM MEMBELI EMAS</div>'+goldTx('ILMU PALING PENTING',62),'g sh');
  o.sc=E(R,'left:150px;top:470px;width:740px;height:560px',`
   <div style="position:absolute;left:362px;top:60px;width:16px;height:460px;background:linear-gradient(90deg,#B8860B,#FFE680,#B8860B);border-radius:8px"></div>
   <div style="position:absolute;left:250px;top:500px;width:240px;height:40px;background:linear-gradient(#FFE680,#B8860B);border-radius:20px"></div>
   <div class="beam" style="position:absolute;left:40px;top:60px;width:660px;height:0;transform-origin:330px 0">
     <div style="position:absolute;left:0;top:-10px;width:660px;height:20px;background:linear-gradient(#FFE680,#C8901A);border-radius:10px"></div>
     <div class="pl" style="position:absolute;left:-40px;top:0;width:240px;transform-origin:120px 0"><div style="margin:0 auto;width:4px;height:120px;background:#E8B830"></div><div class="card" style="height:150px;text-align:center;line-height:1.05;padding-top:16px"><div style="font-size:64px">📚</div><div class="gold" style="font:900 44px Mont">ILMU</div></div></div>
     <div class="pr" style="position:absolute;left:460px;top:0;width:240px;transform-origin:120px 0"><div style="margin:0 auto;width:4px;height:120px;background:#E8B830"></div><div class="card" style="height:150px;text-align:center;line-height:1.05;padding-top:16px"><div style="font-size:64px">🏷️</div><div style="font:900 30px Mont;color:#ddd;white-space:nowrap">HARGA MURAH</div></div></div>
   </div>`);
  o.q=E(R,'left:60px;right:140px;top:1080px;text-align:center;white-space:nowrap',pill('BETUL TAK? 😉','#3a2e14','#fff','#E8B830',54));
},upd(t,o){const f=outF(t,o.e);st(o.h,mix(slide(t,60.1,0,40),{o:f}));st(o.sc,mix(pop(t,60.5,.45),{o:f}));
  const a=-14*eo((t-62.68)/.7)+(t>62.68?wob(t,1.2,.7):0);o.sc.querySelector('.beam').style.transform=`rotate(${a}deg)`;
  o.sc.querySelector('.pl').style.transform=`rotate(${-a}deg)`;o.sc.querySelector('.pr').style.transform=`rotate(${-a}deg)`;
  st(o.q,mix(pop(t,65.31),{o:f}));
}});

// B13 (69.4) SAVE & SHARE kepada rakan-rakan
scene({s:69.4,e:71.8,build(R,o){
  o.a=E(R,'left:150px;top:420px;width:340px;height:300px',card(`<div style="text-align:center;padding-top:40px;line-height:1.1"><div style="font-size:120px">🔖</div><div class="gold" style="font:900 60px Mont">SAVE</div></div>`));
  o.b=E(R,'left:550px;top:420px;width:340px;height:300px',card(`<div style="text-align:center;padding-top:40px;line-height:1.1"><div style="font-size:120px">📤</div><div class="gold" style="font:900 60px Mont">SHARE</div></div>`));
  o.c=E(R,'left:60px;right:140px;top:790px;text-align:center;white-space:nowrap',pill('👭 KEPADA RAKAN-RAKAN','#3a2e14','#fff','#E8B830',46));
},upd(t,o){const f=outF(t,o.e);st(o.a,mix(pop(t,69.73),{o:f,s:t>70.0&&t<70.15?.94:1}));st(o.b,mix(pop(t,70.37),{o:f,s:t>70.6&&t<70.75?.94:1}));st(o.c,mix(pop(t,70.91),{o:f}));
}});

// B14 (71.85) CTA: MULAKAN SIMPANAN EMAS — KLIK LINK DI BAWAH
scene({s:71.85,e:76.35,build(R,o){
  o.h=E(R,'left:60px;right:140px;top:290px;text-align:center;white-space:nowrap;line-height:1.05','<div style="font:800 48px Mont;color:#ddd">NAK MULAKAN</div>'+goldTx('SIMPANAN EMAS?',72),'g sh');
  o.bars=[0,1,2,3].map(i=>E(R,`left:${[290,530,410,410][i]}px;top:${[600,600,520,440][i]}px;width:220px;height:80px`,goldBar(220,80,22)));
  o.btn=E(R,'left:170px;top:740px;width:700px;height:180px','<div class="card" style="position:absolute;inset:0;border-radius:90px;display:flex;align-items:center;justify-content:center;gap:24px;font:900 74px Mont;white-space:nowrap"><span>🔗</span><span class="gold">KLIK LINK</span></div><div class="fg" style="position:absolute;right:-10px;bottom:-60px;font-size:100px;opacity:0">👆</div>');
  o.dn=E(R,'left:60px;right:140px;top:980px;text-align:center;font:900 64px Mont;color:#fff;white-space:nowrap','DI BAWAH 👇','g sh');
},upd(t,o){st(o.h,slide(t,71.9,0,40));o.bars.forEach((el,i)=>st(el,mix(pop(t,73.26+i*.12),{y:-(1-eo((t-73.26-i*.12)/.4))*80})));
  st(o.btn,mix(pop(t,74.28),{s:t>74.6&&t<74.8?.93:1+.03*Math.sin(t*7)}));const fg=o.btn.querySelector('.fg');fg.style.opacity=t>74.45?1:0;fg.style.transform=`translateY(${Math.abs(Math.sin(t*5))*-16}px)`;
  st(o.dn,mix(pop(t,74.68),{y:wob(t,8,1.4)}));
}});

// tahap blur video = bila ada grafik
function blurAt(t){let b=0;for(const s of SC){if(s.nob)continue;const k=Math.min(cl((t-s.s)/.25),cl((s.e-t)/.25));b=Math.max(b,k)}return eio(b)}

// ---------- kapsyen ----------
const W=window.WORDS||[];const KEY=/^(EMAS|PALSU|ASLI|MURAH|ONLINE|KEDAI|FIZIKAL|BERAT|KETULINANNYA|JUAL|SAMA|ILMU|PENTING|SEMAK|PERIKSA|PENJELASAN|SIMPANAN|LINK|SAVE|SHARE|TIGA|SOALAN|WAJIB|PERTAMA|KEDUA|KETIGA|BIJAK|TERBURU-BURU|PERGI)$/;
const CAPG=[];{let g=[];for(let i=0;i<W.length;i++){const w=W[i];g.push(w);const nx=W[i+1];const len=g.reduce((a,x)=>a+x.w.length+1,0)+(nx?nx.w.length:0);const end=/[.,?]$/.test(w.w)||g.length>=3||len>17||(W[i+1]&&W[i+1].s-w.e>.25);if(end||i==W.length-1){CAPG.push(g);g=[]}}}
const CAP=$('#cap');
function capUpd(t){let g=null;for(const x of CAPG){if(t>=x[0].s-.05&&t<x[x.length-1].e+.25)g=x}
  if(!g){CAP.innerHTML='';return}
  const nch=g.reduce((a,w)=>a+w.w.replace(/[.,?-]/g,'').length,0)+g.length;const fs=Math.min(66,Math.floor(820/(nch*0.80)));
  const h=g.map(w=>{const tx=w.w.replace(/[,?]/g,'').replace(/\.$/,'').replace(/^-/,'').toUpperCase();const on=t>=w.s-.03;const act=on&&t<w.e+.05;const k=KEY.test(tx);
    const sc=act?1+.12*Math.max(0,1-(t-w.s)/.15):1;
    return `<span style="display:inline-block;margin:0 .3em;font:900 ${fs}px Mont;opacity:${on?1:.0};transform:scale(${sc});color:${k?'#F5C542':'#fff'};-webkit-text-stroke:3px #000;paint-order:stroke fill;text-shadow:0 5px 0 #000,0 8px 18px rgba(0,0,0,.8)">${tx}</span>`}).join('');
  CAP.innerHTML=h}

// ---------- flash pada impak ----------
const FL=[];
const FLASH=$('#flash');

// v3: kelajuan asal (santai), jeda >0.25s dipendekkan ke ~0.13s — babak ditulis dalam masa v1; tukar masa baru -> potongan -> sumber -> masa v1
const KSP=1.0,SEG_N=[[0.0, 10.18], [10.37, 17.44], [17.57, 21.53], [21.73, 26.56], [26.64, 28.13], [28.38, 29.4], [30.35, 35.54], [35.59, 42.12], [42.16, 43.2], [43.39, 47.51], [47.65, 50.46], [50.67, 50.98], [50.98, 55.44], [55.55, 64.7], [64.8, 70.36], [70.44, 72.88], [72.93, 79.08], [79.14, 82.45]],OFF_N=[0, 10.046666666666667, 16.983333333333334, 20.810000000000002, 25.506666666666668, 26.863333333333333, 27.75, 32.806666666666665, 39.203333333333326, 40.11, 44.096666666666664, 46.77333333333333, 46.949999999999996, 51.276666666666664, 60.29333333333334, 65.72, 68.02666666666666, 74.04333333333331],DUR_N=77.35333333333331;
const SEG_O=[[0.08, 5.67], [5.64, 10.14], [10.41, 17.4], [17.61, 21.49], [21.77, 26.52], [26.68, 28.09], [28.42, 29.36], [30.39, 35.5], [35.63, 37.96], [37.98, 38.32], [38.31, 42.08], [42.18, 43.17], [43.43, 44.72], [44.7, 47.48], [47.69, 50.42], [50.71, 50.94], [51.02, 53.14], [53.14, 55.4], [55.59, 61.55], [61.62, 64.66], [64.84, 70.32], [70.48, 72.84], [72.97, 79.05], [79.18, 82.45]],OFF_O=[0, 5.456666666666666, 9.823333333333334, 16.68, 20.426666666666666, 25.043333333333333, 26.32, 27.126666666666665, 32.10333333333333, 34.3, 34.50666666666667, 38.14333333333333, 39.0, 40.156666666666666, 42.80333333333333, 45.4, 45.49666666666666, 47.48333333333333, 49.60999999999999, 55.43666666666665, 58.34333333333332, 63.689999999999976, 65.91666666666664, 71.8633333333333],DUR_O=75.1333333333333;
function toSrc(t,S,O){let best=S[0][0];for(let i=0;i<S.length;i++){if(t>=O[i])best=S[i][0]+(t-O[i]);}return best}
function fromSrc(x,S,O){let b=null;for(let i=0;i<S.length;i++){if(x<S[i][0])return b===null?O[i]:b;if(x<=S[i][1])return O[i]+x-S[i][0];b=O[i]+S[i][1]-S[i][0]}return b}
function OLD(t){const c=t*KSP;if(c>=DUR_N)return DUR_O+(t-DUR_N/KSP);return fromSrc(toSrc(c,SEG_N,OFF_N),SEG_O,OFF_O)}
window.render=async function(tn){const t=OLD(tn);
  const f=Math.min(window.NF||1e9,Math.max(1,Math.round(tn*FPS)+1));
  const src=`${FR}/${String(f).padStart(5,'0')}.jpg`;
  if(V.getAttribute('src')!==src){V.src=src;await V.decode().catch(()=>{})}
  const l=layoutAt(t);VB.style.left=l.x+'px';VB.style.top=l.y+'px';VB.style.width=1080*l.s+'px';VB.style.height=1920*l.s+'px';VB.style.borderRadius=l.r+'px';
  V.style.width=1080*l.s+'px';V.style.height=1920*l.s+'px';
  const bl=blurAt(t);V.style.filter=bl>0.001?`blur(${24*bl}px) brightness(${1-.5*bl}) saturate(${1-.3*bl})`:'none';V.style.transformOrigin='50% 40%';V.style.transform=`scale(${1+.08*bl})`;
  Object.assign(VBR.style,{left:l.x-5+'px',top:l.y-5+'px',width:1080*l.s+'px',height:1920*l.s+'px',borderRadius:l.r+5+'px',opacity:l.b});
  bgUpd(t,bl);
  for(const s of SC){const vis=t>=s.s-.001&&t<s.e;s.root.style.display=vis?'block':'none';if(vis){const fo=cl((s.e-t)/.18);s.root.style.opacity=fo;s.upd(t,s)}}
  capUpd(tn);
  let fl=0;for(const x of FL){if(t>=x&&t<x+.25)fl=Math.max(fl,.35*(1-(t-x)/.25))}FLASH.style.opacity=fl;
};
// semakan safe zone: kembalikan elemen grafik yang terkeluar
window.safecheck=function(){const bad=[];const box=(el)=>el.getBoundingClientRect();
  const sc=1/(window.devicePixelRatio||1)*(window.devicePixelRatio||1);
  for(const s of SC){if(s.root.style.display==='none')continue;
    for(const el of s.root.children){if(+getComputedStyle(el).opacity<.05)continue;const r=box(el);if(r.width<2)continue;
      if(r.left<58||r.right>942||r.top<248||r.bottom>1482)bad.push(`${s.s}:${el.textContent.slice(0,18)} [${r.left|0},${r.top|0},${r.right|0},${r.bottom|0}]`);}}
  const c=$('#cap').getBoundingClientRect();if(c.width>2){const sp=[...$('#cap').children];if(sp.length){const a=sp[0].getBoundingClientRect(),b=sp[sp.length-1].getBoundingClientRect();if(a.left<58||b.right>942)bad.push('cap terkeluar '+$('#cap').textContent)}}
  const l=VB.getBoundingClientRect();if(+VBR.style.opacity>.5&&(l.left<58||l.right>942||l.top<248||l.bottom>1482))bad.push('kad video terkeluar');
  return bad};
