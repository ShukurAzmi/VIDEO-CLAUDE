// Kamal — "Rumah impian — duit deposit tak cukup" v1 — komposisi deterministik window.render(t)
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
const FACE=[455,820];
const L={
  FULL:{x:0,y:0,s:1,r:0,b:0},
  PUNCH:{x:FACE[0]*(1-1.08),y:FACE[1]*(1-1.08)+25,s:1.08,r:0,b:0},
  PUNCH2:{x:FACE[0]*(1-1.2),y:FACE[1]*(1-1.2)+40,s:1.2,r:0,b:0},
};
// v3: zoom dikurangkan — 4 kali sahaja, lembut (1.08x), perlahan
const LT=[[0,'FULL'],[16.3,'PUNCH',.8],[18.0,'FULL',.6],[32.7,'PUNCH',.8],[37.4,'FULL',.6],[52.85,'PUNCH',.8],[56.2,'FULL',.6],[68.15,'PUNCH',.8],[71.4,'FULL',.6]];
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


// ---------- babak: "Rumah impian — duit deposit tak cukup" (masa = output selepas potong) ----------
const SC=[];
function scene(o){o.root=E(G,'left:0;top:0;width:1080px;height:1920px','', 'g');o.build(o.root,o);SC.push(o)}
const outF=(t,e)=>1-cl((t-(e-.22))/.22);
const pill=(tx,bg='#3a2e14',c='#ddd',bd='#6b5520',fs=60)=>`<div style="display:inline-block;background:${bg};border:3px solid ${bd};color:${c};font:900 ${fs}px Mont;padding:10px 44px;border-radius:50px">${tx}</div>`;
const SHN='<div class="shn" style="position:absolute;top:-200px;left:0;width:120px;height:1400px;background:linear-gradient(90deg,transparent,rgba(255,246,200,.45),transparent);pointer-events:none;opacity:0"></div>';
const shine=(el,t,t0)=>{const s=el.querySelector('.shn');if(s){const k=cl((t-t0)/.9);s.style.transform=`translateX(${lerp(-500,900,k)}px) rotate(20deg)`;s.style.opacity=k>0&&k<1?1:0}};
const head=(a,b,fa=46,fb=76)=>`<div style="font:800 ${fa}px Mont;color:#ddd">${a}</div><div style="font:900 ${fb}px Mont" class="gold">${b}</div>`;
const H=(R,html,top=290)=>E(R,`left:60px;right:140px;top:${top}px;text-align:center;line-height:1.08;white-space:nowrap`,html,'g sh');
// baris senarai: kad 780px, emoji kiri, teks, bulatan ✓/✕ kanan
const row=(em,tx,ok=1,fs=44)=>`<div class="card" style="position:absolute;inset:0;overflow:hidden">${SHN}<div style="position:absolute;left:26px;top:50%;transform:translateY(-50%);font-size:78px">${em}</div>
  <div style="position:absolute;left:130px;right:150px;top:50%;transform:translateY(-50%);font:900 ${fs}px Mont;white-space:nowrap;color:#fff">${tx}</div>
  <div class="mk" style="position:absolute;right:20px;top:50%;width:104px;height:104px;margin-top:-52px;border-radius:50%;background:${ok?'#2ecc71':'#e74c3c'};color:#fff;font:900 66px Mont;display:flex;align-items:center;justify-content:center;opacity:0;box-shadow:0 4px 14px rgba(0,0,0,.5)">${ok?'✓':'✕'}</div></div>`;
const rowUpd=(el,t,t0,tm,f)=>{st(el,mix(slide(t,t0,0,60,.4),{o:f}));shine(el,t,t0+.2);const m=el.querySelector('.mk');const p=pop(t,tm,.35);m.style.opacity=p.o;m.style.transform=`scale(${p.s})`};
const big=(em,sz=300)=>`<div style="font-size:${sz}px;line-height:1;text-align:center;filter:drop-shadow(0 18px 30px rgba(0,0,0,.6))">${em}</div>`;
const glow=`<div style="position:absolute;inset:-60px;border-radius:50%;background:radial-gradient(circle,rgba(245,197,66,.35),transparent 65%)"></div>`;

// B1 RUMAH IDAMAN — rumah + 3 tanda ✓ (lokasi / cantik / harga mampu)
scene({s:2.85,e:7.95,build(R,o){
  o.h=H(R,head('BAYANGKAN…','RUMAH IDAMAN',46,80));
  o.hs=E(R,'left:340px;top:450px;width:320px;height:300px',glow+big('🏡',280));
  o.r=[['📍','LOKASI OKEY'],['✨','CANTIK'],['💰','HARGA MAMPU']].map(([e,x],i)=>E(R,`left:110px;top:${790+i*165}px;width:780px;height:145px`,row(e,x,1,48)));
},upd(t,o){const f=outF(t,o.e);st(o.h,mix(pop(t,2.9),{o:f}));st(o.hs,mix(pop(t,3.66,.45),{o:f,y:wob(t,8,.5)}));
  [[4.84,5.0],[5.72,5.9],[6.24,7.3]].forEach(([a,b],i)=>rowUpd(o.r[i],t,a,b,f));}});

// B1b (muka jelas) terbayang duduk dengan keluarga
scene({s:8.0,e:12.45,nob:1,build(R,o){
  o.t=E(R,'left:60px;right:140px;top:262px;text-align:center;white-space:nowrap',pill('💭 DUDUK DENGAN KELUARGA','rgba(20,14,5,.82)','#F5C542','#E8B830',40),'g');
},upd(t,o){st(o.t,mix(pop(t,10.5),{o:outF(t,o.e)}));}});

// B2 DUIT DEPOSIT — bar terisi sikit, TAK CUKUP
scene({s:12.5,e:16.25,build(R,o){
  o.h=H(R,head('TAPI BILA SAMPAI BAB…','DUIT DEPOSIT',44,96));
  o.c=E(R,'left:110px;top:520px;width:780px;height:560px',`<div class="card" style="position:absolute;inset:0"></div>
   <div style="position:absolute;left:0;right:0;top:40px;text-align:center;font-size:150px">🏦</div>
   <div style="position:absolute;left:60px;right:60px;top:260px;font:800 36px Mont;color:#ddd;display:flex;justify-content:space-between"><span>SIMPANAN</span><span>DEPOSIT</span></div>
   <div style="position:absolute;left:60px;right:60px;top:320px;height:70px;border-radius:35px;background:#2a2418;border:3px solid #6b5520;overflow:hidden"><div class="fill" style="height:100%;width:0;background:linear-gradient(90deg,#C8901A,#F5C542);border-radius:35px"></div></div>
   <div class="no" style="position:absolute;left:0;right:0;top:430px;text-align:center;opacity:0">${pill('✕ TAK CUKUP','#5a1414','#fff','#ff6b6b',58)}</div>`);
},upd(t,o){const f=outF(t,o.e);st(o.h,mix(pop(t,12.55),{o:f}));o.h.lastChild.style.transform=`scale(${t<14.4?1:1+.1*Math.max(0,1-(t-14.4)/.3)})`;
  st(o.c,mix(slide(t,13.1,0,120,.45),{o:f}));o.c.querySelector('.fill').style.width=(38*eo((t-14.4)/1.2))+'%';
  const n=o.c.querySelector('.no'),p=pop(t,15.8);n.style.opacity=p.o;n.style.transform=`scale(${p.s}) rotate(-3deg)`;}});

// B2b (muka jelas) SEDIH KAN?
scene({s:16.3,e:18.05,nob:1,build(R,o){
  o.t=E(R,'left:60px;right:140px;top:262px;text-align:center;white-space:nowrap',pill('😢 SIAPA TAK SEDIH?','rgba(20,14,5,.82)','#F5C542','#E8B830',46),'g');
},upd(t,o){st(o.t,mix(pop(t,17.35),{o:outF(t,o.e)}));}});

// B3 KERJA BERTAHUN-TAHUN — 12 bulan gaji menyala satu-satu → IMPIAN BESAR
const MON=['JAN','FEB','MAC','APR','MEI','JUN','JUL','OGO','SEP','OKT','NOV','DIS'];
scene({s:18.1,e:24.0,build(R,o){
  o.h=H(R,head('KERJA','BERTAHUN-TAHUN',46,80));
  o.g=E(R,'left:110px;top:490px;width:780px;height:470px',`<div class="card" style="position:absolute;inset:0"></div>`+MON.map((m,i)=>`<div class="mo" style="position:absolute;left:${30+(i%4)*184}px;top:${30+Math.floor(i/4)*142}px;width:168px;height:124px;border-radius:18px;background:#2a2418;border:3px solid #6b5520;text-align:center;font:900 30px Mont;color:#888;padding-top:12px;box-sizing:border-box">${m}<div style="font-size:44px;margin-top:4px">💵</div></div>`).join(''));
  o.l=E(R,'left:60px;right:140px;top:990px;text-align:center;white-space:nowrap',pill('⏳ SETIAP BULAN TUNGGU GAJI','#3a2e14','#fff','#E8B830',40),'g');
  o.im=E(R,'left:60px;right:140px;top:1100px;text-align:center;white-space:nowrap',pill('🏡 IMPIAN BESAR','#3a2e14','#F5C542','#E8B830',52),'g');
},upd(t,o){const f=outF(t,o.e);st(o.h,mix(pop(t,18.15),{o:f}));st(o.g,mix(slide(t,18.5,0,100,.45),{o:f}));
  o.g.querySelectorAll('.mo').forEach((m,i)=>{const on=t>19.8+i*.13;m.style.background=on?'linear-gradient(160deg,#FFF0B0,#F5C542 50%,#C8901A)':'#2a2418';m.style.color=on?'#3a2600':'#888';m.style.transform=`scale(${on?1+.12*Math.max(0,1-(t-19.8-i*.13)/.2):1})`});
  st(o.l,mix(pop(t,20.35),{o:f*(t>22.85?cl(1-(t-22.85)/.2):1)}));st(o.im,mix(pop(t,22.91),{o:f}));o.l.style.display=t>23.1?'none':'block';o.im.style.top=t>22.9?'1000px':'1100px';}});

// B4 RUPANYA SIMPANAN TAK BERSEDIA — tabung hampir kosong
scene({s:25.8,e:28.55,build(R,o){
  o.h=H(R,head('RUPANYA…','SIMPANAN KITA',46,80));
  o.j=E(R,'left:290px;top:480px;width:420px;height:520px',`<div style="position:absolute;inset:0;border:8px solid rgba(255,255,255,.7);border-top:none;border-radius:0 0 90px 90px;background:rgba(255,255,255,.06);overflow:hidden"><div class="lv" style="position:absolute;left:0;right:0;bottom:0;height:0;background:linear-gradient(180deg,#F5C542,#C8901A)"></div></div>
   <div style="position:absolute;left:-20px;right:-20px;top:-30px;height:40px;border-radius:14px;background:#C8901A;border:4px solid #FFE680"></div>
   <div style="position:absolute;left:0;right:0;top:200px;text-align:center;font:900 60px Mont;color:#fff">🪙</div>`);
  o.no=E(R,'left:60px;right:140px;top:1060px;text-align:center;white-space:nowrap',pill('⚠️ TAK BERSEDIA LAGI','#5a1414','#fff','#ff6b6b',54),'g');
},upd(t,o){const f=outF(t,o.e);st(o.h,mix(pop(t,25.85),{o:f}));st(o.j,mix(slide(t,26.0,0,100,.45),{o:f,r:wob(t,1.5,.6)}));
  o.j.querySelector('.lv').style.height=(12*eo((t-26.3)/.8))+'%';st(o.no,mix(pop(t,27.34),{o:f}));}});

// B5 PERSONAL LOAN?
scene({s:28.6,e:32.6,build(R,o){
  o.h=H(R,head('MULA TERFIKIR NAK BUAT…','PERSONAL LOAN?',42,84));
  o.c=E(R,'left:190px;top:520px;width:620px;height:380px',`<div style="position:absolute;inset:0;border-radius:34px;background:linear-gradient(140deg,#3b3b46,#16161c);border:4px solid #888;overflow:hidden;box-shadow:0 20px 50px rgba(0,0,0,.7)">${SHN}
   <div style="position:absolute;left:44px;top:60px;width:110px;height:80px;border-radius:14px;background:linear-gradient(140deg,#FFE680,#C8901A)"></div>
   <div style="position:absolute;left:44px;top:190px;font:800 46px Mont;color:#ddd;letter-spacing:6px">**** **** ****</div>
   <div style="position:absolute;left:44px;bottom:40px;font:900 40px Mont;color:#fff">PINJAMAN</div><div style="position:absolute;right:40px;top:40px;font-size:90px">💳</div></div>`);
  o.q=E(R,'left:60px;right:140px;top:960px;text-align:center;white-space:nowrap',pill('🤔 UNTUK CUKUPKAN DUIT','#3a2e14','#fff','#E8B830',44),'g');
},upd(t,o){const f=outF(t,o.e);st(o.h,mix(pop(t,28.65),{o:f}));o.h.lastChild.style.transform=`scale(${t<30.49?1:1+.1*Math.max(0,1-(t-30.49)/.3)})`;
  st(o.c,mix(slide(t,30.3,0,140,.45),{o:f,r:-4+wob(t,1.5,.5)}));shine(o.c,t,30.7);st(o.q,mix(pop(t,31.09),{o:f}));}});

// B5b (muka jelas) JANGAN TUNGGU
scene({s:32.65,e:37.5,nob:1,build(R,o){
  o.t=E(R,'left:60px;right:140px;top:262px;text-align:center;white-space:nowrap',pill('⏰ JANGAN TUNGGU JUMPA RUMAH','rgba(20,14,5,.82)','#F5C542','#E8B830',36),'g');
},upd(t,o){st(o.t,mix(pop(t,33.42),{o:outF(t,o.e)}));}});

// B6 SIMPAN DALAM BENTUK DUIT → SELALU GAGAL → UBAH CARA
scene({s:37.55,e:44.55,build(R,o){
  o.h=H(R,head('SIMPAN DALAM BENTUK','DUIT',46,96));
  o.c=E(R,'left:340px;top:480px;width:320px;height:320px',glow+big('💸',280));
  o.no=E(R,'left:60px;right:140px;top:850px;text-align:center;white-space:nowrap',pill('✕ SELALU GAGAL','#5a1414','#fff','#ff6b6b',58),'g');
  o.ok=E(R,'left:110px;top:990px;width:780px;height:170px',`<div class="card" style="position:absolute;inset:0;display:flex;align-items:center;justify-content:center;gap:20px;font:900 54px Mont;white-space:nowrap">${SHN}<span>🔄</span><span class="gold">UBAH CARA SIMPAN</span></div>`);
},upd(t,o){const f=outF(t,o.e);st(o.h,mix(pop(t,37.6),{o:f}));st(o.c,mix(pop(t,39.6,.45),{o:f,y:wob(t,10,.6),r:wob(t,4,.4)}));
  st(o.no,mix(pop(t,41.58),{o:f,r:-3}));st(o.ok,mix(slide(t,42.84,0,80,.4),{o:f}));shine(o.ok,t,43.2);}});

// B7 CONTOH: 3 cara — asingkan duit / tabung khas / emas
scene({s:44.6,e:52.75,build(R,o){
  o.h=H(R,head('CONTOH','CARA MENYIMPAN',46,80));
  o.r=[['✂️','ASINGKAN DUIT GAJI',44],['🐷','BINA TABUNG KHAS',44],['🪙','SIMPAN DALAM EMAS',44]].map(([e,x,fs],i)=>E(R,`left:110px;top:${490+i*175}px;width:780px;height:155px`,row(e,x,1,fs)));
  o.gb=E(R,'left:360px;top:1030px;width:280px;height:130px',goldBar(280,130,30));
},upd(t,o){const f=outF(t,o.e);st(o.h,mix(pop(t,44.65),{o:f}));
  [[45.46,47.54],[48.14,49.21],[50.39,52.39]].forEach(([a,b],i)=>rowUpd(o.r[i],t,a,b,f));
  st(o.gb,mix(pop(t,51.19,.45),{o:f,r:wob(t,3,.6),y:wob(t,6,.5)}));}});

// B7b (muka jelas) DISIPLIN DIRI
scene({s:52.8,e:56.25,nob:1,build(R,o){
  o.t=E(R,'left:60px;right:140px;top:262px;text-align:center;white-space:nowrap',pill('🎯 DISIPLIN DIRI','rgba(20,14,5,.82)','#F5C542','#E8B830',50),'g');
},upd(t,o){st(o.t,mix(pop(t,54.23),{o:outF(t,o.e)}));}});

// B8 BUKAN SEKADAR BELI RUMAH
scene({s:57.55,e:60.55,build(R,o){
  o.h=H(R,head('KITA SIMPAN','BUKAN SEKADAR',46,84));
  o.c=E(R,'left:110px;top:520px;width:780px;height:420px',`<div class="card" style="position:absolute;inset:0"></div><div style="position:absolute;left:0;right:0;top:40px;text-align:center;font-size:180px">🏠</div>
   <div style="position:absolute;left:0;right:0;top:270px;text-align:center;font:900 76px Mont;color:#fff;white-space:nowrap"><span style="position:relative">BELI RUMAH<span class="ln" style="position:absolute;left:-10px;top:46%;height:12px;width:0;background:#e74c3c;border-radius:6px"></span></span></div>`);
},upd(t,o){const f=outF(t,o.e);st(o.h,mix(pop(t,57.6),{o:f}));st(o.c,mix(slide(t,58.66,0,100,.4),{o:f}));
  o.c.querySelector('.ln').style.width=`calc((100% + 20px) * ${eo((t-59.9)/.35)})`;}});

// B9 TAPI KITA BINA TEMPAT… keluarga / anak membesar / pulang
scene({s:60.6,e:68.05,build(R,o){
  o.h=H(R,head('TAPI KITA BINA','TEMPAT',46,96));
  o.r=[['👨‍👩‍👧','UNTUK KELUARGA',44],['🧒','ANAK-ANAK MEMBESAR',34],['🏡','TEMPAT KITA PULANG',42]].map(([e,x,fs],i)=>E(R,`left:110px;top:${510+i*180}px;width:780px;height:160px`,row(e,x,1,fs)));
},upd(t,o){const f=outF(t,o.e);st(o.h,mix(pop(t,60.65),{o:f}));o.h.lastChild.style.transform=`scale(${t<61.98?1:1+.1*Math.max(0,1-(t-61.98)/.3)})`;
  [[62.42,62.6],[63.66,64.4],[65.54,66.06]].forEach(([a,b],i)=>rowUpd(o.r[i],t,a,b,f));}});

// B9b (muka jelas) JANGAN TUNGGU ESOK
scene({s:68.1,e:71.45,nob:1,build(R,o){
  o.t=E(R,'left:60px;right:140px;top:262px;text-align:center;white-space:nowrap',pill('⏰ JANGAN TUNGGU ESOK','rgba(20,14,5,.82)','#F5C542','#E8B830',46),'g');
},upd(t,o){st(o.t,mix(pop(t,68.9),{o:outF(t,o.e)}));}});

// B10 MULAKAN DENGAN APA YANG KITA MAMPU
scene({s:71.5,e:73.8,build(R,o){
  o.h=H(R,head('MULAKAN DENGAN','APA YANG MAMPU',46,80),330);
  o.b=E(R,'left:340px;top:560px;width:320px;height:320px',glow+big('🌱',260));
  o.d=E(R,'left:60px;right:140px;top:940px;text-align:center;white-space:nowrap',pill('✓ HARI INI','#14401f','#fff','#2ecc71',60),'g');
},upd(t,o){const f=outF(t,o.e);st(o.h,mix(pop(t,71.55),{o:f}));st(o.b,mix(pop(t,72.0,.5),{o:f,y:wob(t,8,.6)}));st(o.d,mix(pop(t,73.34),{o:f}));}});

// B11 SAVE & SHARE
scene({s:75.6,e:79.15,build(R,o){
  o.h=H(R,head('VIDEO NI BERMANFAAT?','TOLONG…',46,84));
  o.b1=E(R,'left:140px;top:540px;width:340px;height:340px',`<div class="card" style="position:absolute;inset:0;border-radius:50%;display:flex;flex-direction:column;align-items:center;justify-content:center"><div style="font-size:130px">🔖</div><div class="gold" style="font:900 52px Mont">SAVE</div></div>`);
  o.b2=E(R,'left:520px;top:540px;width:340px;height:340px',`<div class="card" style="position:absolute;inset:0;border-radius:50%;display:flex;flex-direction:column;align-items:center;justify-content:center"><div style="font-size:130px">📤</div><div class="gold" style="font:900 52px Mont">SHARE</div></div>`);
  o.r=E(R,'left:60px;right:140px;top:950px;text-align:center;white-space:nowrap',pill('👭 KEPADA RAKAN-RAKAN','#3a2e14','#fff','#E8B830',46),'g');
},upd(t,o){const f=outF(t,o.e);st(o.h,mix(pop(t,75.65),{o:f}));st(o.b1,mix(pop(t,76.91),{o:f,s:1+.03*Math.sin(t*6)}));st(o.b2,mix(pop(t,77.61),{o:f,s:1+.03*Math.sin(t*6+1)}));st(o.r,mix(pop(t,78.23),{o:f}));}});

// B12 CTA: NAK MULA SIMPANAN EMAS? → KLIK LINK DI BIO
scene({s:79.2,e:999,build(R,o){
  o.h=H(R,head('NAK MULAKAN','SIMPANAN EMAS?',48,80),300);
  o.gb=E(R,'left:360px;top:500px;width:280px;height:130px',goldBar(280,130,30));
  o.btn=E(R,'left:150px;top:700px;width:700px;height:190px','<div class="card" style="position:absolute;inset:0;border-radius:95px;display:flex;align-items:center;justify-content:center;gap:24px;font:900 76px Mont;white-space:nowrap"><span>🔗</span><span class="gold">KLIK LINK</span></div><div class="fg" style="position:absolute;right:-20px;bottom:-70px;font-size:110px;opacity:0">👆</div>');
  o.dn=E(R,'left:60px;right:140px;top:960px;text-align:center;font:900 68px Mont;color:#fff;white-space:nowrap','DI BIO ☝️','g sh');
},upd(t,o){st(o.h,pop(t,79.25));st(o.gb,mix(pop(t,80.73,.45),{r:wob(t,3,.6)}));
  st(o.btn,mix(pop(t,81.67),{s:t>82.0&&t<82.2?.92:1+.03*Math.sin(t*7)}));const fg=o.btn.querySelector('.fg');fg.style.opacity=t>81.85?1:0;fg.style.transform=`translateY(${Math.abs(Math.sin(t*5))*-16}px)`;
  st(o.dn,mix(pop(t,82.17),{y:wob(t,8,1.4)}));
}});

// tahap blur video = bila ada grafik
function blurAt(t){let b=0;for(const s of SC){if(s.nob)continue;const k=Math.min(cl((t-s.s)/.25),cl((s.e-t)/.25));b=Math.max(b,k)}return eio(b)}

// ---------- kapsyen ----------
const W=window.WORDS||[];const KEY=/^(RUMAH|IDAMAN|IMPIAN|DEPOSIT|EMAS|SIMPAN|SIMPANAN|MENYIMPAN|GAJI|DISIPLINKAN|KELUARGA|ANAK-ANAK|TABUNG|LINK|BIO|BERSEDIA|MAMPU|SAVE|SHARE|KEMAMPUAN)$/;
const CAPG=[];{let g=[];for(let i=0;i<W.length;i++){const w=W[i];g.push(w);const nx=W[i+1];const len=g.reduce((a,x)=>a+x.w.length+1,0)+(nx?nx.w.length:0);const end=/[.,?]$/.test(w.w)||g.length>=3||len>17||(W[i+1]&&W[i+1].s-w.e>.25);if(end||i==W.length-1){CAPG.push(g);g=[]}}}
const CAP=$('#cap');
function capUpd(t){let g=null;for(const x of CAPG){if(t>=x[0].s-.05&&t<x[x.length-1].e+.25)g=x}
  if(!g){CAP.innerHTML='';return}
  const nch=g.reduce((a,w)=>a+w.w.replace(/[.,?-]/g,'').length,0)+g.length;const fs=Math.min(66,Math.floor(820/(nch*0.80)));
  const h=g.map(w=>{const tx=w.w.replace(/[.,?]/g,'').replace(/^-/,'').toUpperCase();const on=t>=w.s-.03;const act=on&&t<w.e+.05;const k=KEY.test(tx);
    const sc=act?1+.12*Math.max(0,1-(t-w.s)/.15):1;
    return `<span style="display:inline-block;margin:0 .3em;font:900 ${fs}px Mont;opacity:${on?1:.0};transform:scale(${sc});color:${k?'#F5C542':'#fff'};-webkit-text-stroke:3px #000;paint-order:stroke fill;text-shadow:0 5px 0 #000,0 8px 18px rgba(0,0,0,.8)">${tx}</span>`}).join('');
  CAP.innerHTML=h}

// ---------- flash pada impak ----------
const FL=[];
const FLASH=$('#flash');

window.render=async function(t){
  const f=Math.min(window.NF||1e9,Math.max(1,Math.round(t*FPS)+1));
  const src=`${FR}/${String(f).padStart(5,'0')}.jpg`;
  if(V.getAttribute('src')!==src){V.src=src;await V.decode().catch(()=>{})}
  const l=layoutAt(t);VB.style.left=l.x+'px';VB.style.top=l.y+'px';VB.style.width=1080*l.s+'px';VB.style.height=1920*l.s+'px';VB.style.borderRadius=l.r+'px';
  V.style.width=1080*l.s+'px';V.style.height=1920*l.s+'px';
  const bl=blurAt(t);V.style.filter=bl>0.001?`blur(${24*bl}px) brightness(${1-.5*bl}) saturate(${1-.3*bl})`:'none';V.style.transformOrigin='50% 40%';V.style.transform=`scale(${1+.08*bl})`;
  Object.assign(VBR.style,{left:l.x-5+'px',top:l.y-5+'px',width:1080*l.s+'px',height:1920*l.s+'px',borderRadius:l.r+5+'px',opacity:l.b});
  bgUpd(t,bl);
  for(const s of SC){const vis=t>=s.s-.001&&t<s.e;s.root.style.display=vis?'block':'none';if(vis){const fo=cl((s.e-t)/.18);s.root.style.opacity=fo;s.upd(t,s)}}
  capUpd(t);
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
