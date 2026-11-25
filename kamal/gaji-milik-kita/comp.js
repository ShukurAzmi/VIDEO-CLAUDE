// Kamal — "Gaji kita: berapa % betul-betul milik kita?" — komposisi deterministik window.render(t)
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
const FACE=[486,780];
const L={
  FULL:{x:0,y:0,s:1,r:0,b:0},
  PUNCH:{x:FACE[0]*(1-1.08),y:FACE[1]*(1-1.08)+25,s:1.08,r:0,b:0},
  PUNCH2:{x:FACE[0]*(1-1.2),y:FACE[1]*(1-1.2)+40,s:1.2,r:0,b:0},
};
// v3: zoom dikurangkan — 4 kali sahaja, lembut (1.08x), perlahan
const LT=[[0,'FULL'],[29.2,'PUNCH',.8],[32.1,'FULL',.6],[43.5,'PUNCH',.8],[46.1,'FULL',.6],[62.45,'PUNCH',.8],[64.95,'FULL',.6],[68.9,'PUNCH',.8],[70.45,'FULL',.6]];
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

// ---------- babak: "Gaji kita — berapa % betul-betul milik kita?" (masa = output selepas potong) ----------
const SC=[];
function scene(o){o.root=E(G,'left:0;top:0;width:1080px;height:1920px','', 'g');o.build(o.root,o);SC.push(o)}
const outF=(t,e)=>1-cl((t-(e-.22))/.22);
const XM=(sz,c='#ff3b3b')=>`<div class="xm" style="position:absolute;right:24px;top:50%;margin-top:-${sz/2}px;width:${sz}px;height:${sz}px;border-radius:50%;background:${c};color:#fff;font:900 ${sz*.62}px Mont;display:flex;align-items:center;justify-content:center;box-shadow:0 4px 12px rgba(0,0,0,.5);transform:scale(0)">✕</div>`;
const ring=(id,sz,col)=>`<svg width="${sz}" height="${sz}" style="position:absolute;left:0;top:0;transform:rotate(-90deg)"><circle cx="${sz/2}" cy="${sz/2}" r="${sz/2-22}" fill="none" stroke="#2b2210" stroke-width="34"/><circle id="${id}" cx="${sz/2}" cy="${sz/2}" r="${sz/2-22}" fill="none" stroke="${col}" stroke-width="34" stroke-linecap="round" stroke-dasharray="${Math.PI*(sz-44)}" stroke-dashoffset="0"/></svg>`;

// B1 HOOK: GAJI KITA — BERAPA % MILIK KITA?
scene({s:0.15,e:4.3,build(R,o){
  o.h1=E(R,'left:60px;right:140px;top:300px;text-align:center;font:900 100px Mont;white-space:nowrap','💰 <span class="gold">GAJI</span> KITA','g sh');
  o.rg=E(R,'left:270px;top:450px;width:460px;height:460px',ring('r1',460,'url(#gg)')+`<svg width="0" height="0"><defs><linearGradient id="gg"><stop offset="0" stop-color="#FFE680"/><stop offset="1" stop-color="#C8901A"/></linearGradient></defs></svg><div id="pc" style="position:absolute;inset:0;display:flex;align-items:center;justify-content:center;font:900 150px Mont;color:#fff">?%</div>`);
  o.q=E(R,'left:60px;right:140px;top:960px;text-align:center;line-height:1.1;white-space:nowrap','<div style="font:900 76px Mont;color:#fff">BETUL-BETUL</div><div class="gold" style="font:900 96px Mont">MILIK KITA?</div>','g sh');
},upd(t,o){const f=outF(t,o.e);st(o.h1,mix(pop(t,.2),{o:f}));st(o.rg,mix(pop(t,.5,.45),{o:f}));
  const c=o.rg.querySelector('#r1'),L=Math.PI*(460-44);const p=t<3.55?.25+.5*(.5+.5*Math.sin(t*5)):1-.08;c.setAttribute('stroke-dashoffset',L*(1-p));
  o.rg.querySelector('#pc').style.transform=`scale(${t>3.55?1+.15*Math.max(0,1-(t-3.55)/.2):1})`;
  st(o.q,mix(pop(t,1.3),{o:f}));o.q.lastChild.style.transform=`scale(${t>3.55?1+.12*Math.max(0,1-(t-3.55)/.25):1})`;
}});

// B2 SLIP GAJI — tengok betul-betul
scene({s:6.1,e:8.75,build(R,o){
  o.h=E(R,'left:60px;right:140px;top:300px;text-align:center;font:900 92px Mont;white-space:nowrap','📄 <span class="gold">SLIP GAJI</span>','g sh');
  let rows='';for(let i=0;i<6;i++)rows+=`<div style="display:flex;justify-content:space-between;margin:0 50px 30px"><div style="height:26px;width:${260+((i*73)%140)}px;background:#cfc6b0;border-radius:13px"></div><div style="height:26px;width:120px;background:#cfc6b0;border-radius:13px"></div></div>`;
  o.slip=E(R,'left:170px;top:440px;width:660px;height:700px',`<div style="position:absolute;inset:0;background:#fbf7ec;border-radius:18px;box-shadow:0 20px 50px rgba(0,0,0,.6)"><div style="font:900 54px Mont;color:#2a1d00;text-align:center;margin:44px 0 40px;letter-spacing:6px">PENYATA GAJI</div>${rows}</div><div id="mg" style="position:absolute;left:330px;top:300px;font-size:230px">🔍</div>`);
},upd(t,o){const f=outF(t,o.e);st(o.h,mix(pop(t,6.15),{o:f}));st(o.slip,mix(slide(t,6.2,0,120),{r:-2,o:f}));
  const m=o.slip.querySelector('#mg');m.style.opacity=cl((t-7.4)/.2);m.style.transform=`translate(${wob(t,90,.5)-200}px,${wob(t,50,.35,.3)-120}px)`;
}});

// B3 100% GAJI SETIAP BULAN
scene({s:9.3,e:12.25,build(R,o){
  o.c=E(R,'left:110px;top:380px;width:780px;height:760px','<div class="card" style="position:absolute;inset:0"></div><div style="position:absolute;left:0;right:0;top:60px;text-align:center;font:800 50px Mont;color:#ddd;letter-spacing:4px">GAJI SEBULAN</div><div id="n" class="gold" style="position:absolute;left:0;right:0;top:150px;text-align:center;font:900 250px Mont;line-height:1">0%</div><div style="position:absolute;left:70px;top:470px;width:640px;height:90px;border-radius:45px;background:#2b2210;border:3px solid #6b5520;overflow:hidden"><div id="pb" style="height:100%;width:0;background:linear-gradient(90deg,#C8901A,#FFE680)"></div></div><div style="position:absolute;left:0;right:0;top:610px;text-align:center;font:900 64px Mont;color:#fff;white-space:nowrap">SETIAP BULAN 📅</div>');
},upd(t,o){const f=outF(t,o.e);st(o.c,mix(pop(t,9.35,.4),{o:f}));const p=100*eo((t-9.45)/.9);
  o.c.querySelector('#n').textContent=Math.round(p)+'%';o.c.querySelector('#pb').style.width=p+'%';
}});

// B4 KOMITMEN BULANAN — baki gaji makin kecil (ilustrasi)
const KOM=[['🏢','KOPERASI',16.33],['🧾','PINJAMAN PERIBADI',18.07],['🚗','DUIT KERETA',19.75],['🏠','DUIT RUMAH',20.89],['🛡️','INSURANS',21.81],['➕','MACAM-MACAM LAGI',22.87]];
const BAKI=[100,82,64,50,38,30,22];
scene({s:15.45,e:24.35,build(R,o){
  o.h=E(R,'left:60px;right:140px;top:290px;text-align:center;font:900 84px Mont;white-space:nowrap','💸 <span class="gold">KOMITMEN</span>','g sh');
  o.ch=KOM.map(([e,n],i)=>E(R,`left:${110+(i%2)*400}px;top:${410+Math.floor(i/2)*175}px;width:380px;height:150px`,`<div class="card" style="position:absolute;inset:0;border-color:#ff7a7a;display:flex;align-items:center;gap:16px;padding:0 20px"><div style="font-size:66px">${e}</div><div style="font:900 ${n.length>12?36:44}px Mont;color:#fff;line-height:1.05">${n.replace(' ','<br>')}</div></div>`));
  o.bar=E(R,'left:110px;top:960px;width:780px;height:220px','<div class="card" style="position:absolute;inset:0"></div><div style="position:absolute;left:40px;top:26px;font:900 46px Mont;color:#ddd">BAKI GAJI</div><div id="bv" class="gold" style="position:absolute;right:40px;top:14px;font:900 66px Mont">100%</div><div style="position:absolute;left:40px;top:110px;width:700px;height:70px;border-radius:35px;background:#2b2210;overflow:hidden"><div id="bb" style="height:100%;width:100%;background:linear-gradient(90deg,#C8901A,#FFE680)"></div></div><div style="position:absolute;right:44px;top:92px;font:600 24px Mont;color:#999">*ilustrasi</div>');
},upd(t,o){const f=outF(t,o.e);st(o.h,mix(pop(t,15.5),{o:f}));st(o.bar,mix(slide(t,15.6,0,80),{o:f}));
  let k=0;o.ch.forEach((el,i)=>{const t0=KOM[i][2];if(t>=t0)k=i+1;st(el,mix(pop(t,t0),{o:f}))});
  const prev=BAKI[Math.max(0,k-1)],cur=BAKI[k],tk=k?KOM[k-1][2]:0;const v=lerp(prev,cur,eo((t-tk)/.4));
  o.bar.querySelector('#bb').style.width=v+'%';o.bar.querySelector('#bb').style.background=v<40?'linear-gradient(90deg,#b02020,#ff6b6b)':'linear-gradient(90deg,#C8901A,#FFE680)';
  o.bar.querySelector('#bv').textContent=Math.round(v)+'%';
}});

// B5 SEBAHAGIAN BESAR = MILIK ORANG LAIN
scene({s:26.3,e:29.15,build(R,o){
  o.h=E(R,'left:60px;right:140px;top:300px;text-align:center;font:900 76px Mont;white-space:nowrap;color:#fff','BELUM SEMPAT MASUK…','g sh');
  o.w=E(R,'left:340px;top:440px;width:320px;height:320px;font-size:280px;line-height:1;text-align:center','👛');
  o.m=[...Array(7)].map((_,i)=>E(R,'left:440px;top:520px;font-size:110px','💸'));
  o.lab=E(R,'left:60px;right:140px;top:880px;text-align:center;line-height:1.05;white-space:nowrap','<div style="font:900 70px Mont;color:#fff">SEBAHAGIAN BESAR</div><div style="font:900 84px Mont;color:#ff6b6b;text-shadow:0 0 40px rgba(255,60,60,.5)">MILIK ORANG LAIN</div>','g sh');
},upd(t,o){const f=outF(t,o.e);st(o.h,mix(pop(t,26.35),{o:f}));st(o.w,mix(pop(t,26.4),{r:wob(t,4,.8),o:f}));
  o.m.forEach((el,i)=>{const t0=26.7+i*.25,k=cl((t-t0)/1.1),a=(i/6-.5)*2.4;el.style.opacity=(t>t0?1-k*k:0)*f;el.style.transform=`translate(${Math.sin(a)*380*k}px,${-300*k+260*k*k}px) rotate(${a*40*k}deg)`});
  st(o.lab.firstChild,pop(t,26.9));st(o.lab.lastChild,mix(pop(t,28.69),{x:t>28.7&&t<29?Math.sin(t*90)*8:0}));o.lab.style.opacity=f;
}});

// B6 BAKI: CUKUP-CUKUP UNTUK MAKAN
scene({s:32.75,e:36.7,build(R,o){
  o.h=E(R,'left:60px;right:140px;top:310px;text-align:center;font:900 80px Mont;white-space:nowrap;color:#fff','DUIT YANG <span class="gold">TINGGAL</span>','g sh');
  o.c=E(R,'left:110px;top:450px;width:780px;height:700px','<div class="card" style="position:absolute;inset:0"></div><div style="position:absolute;left:0;right:0;top:40px;text-align:center;font-size:220px;line-height:1">🍚</div><div style="position:absolute;left:70px;top:330px;width:640px;height:80px;border-radius:40px;background:#2b2210;border:3px solid #6b5520;overflow:hidden"><div id="bb" style="height:100%;width:30%;background:linear-gradient(90deg,#b02020,#ff6b6b)"></div></div><div style="position:absolute;left:0;right:0;top:460px;text-align:center;line-height:1.1;white-space:nowrap"><div class="gold" style="font:900 96px Mont">CUKUP-CUKUP</div><div style="font:900 64px Mont;color:#fff">UNTUK MAKAN</div></div>');
},upd(t,o){const f=outF(t,o.e);st(o.h,mix(pop(t,32.8),{o:f}));st(o.c,mix(pop(t,33.0,.4),{o:f}));
  o.c.querySelector('#bb').style.width=lerp(30,9,eo((t-33.4)/1.2))+'%';
}});

// B7 ✕ MENYIMPAN / ✕ MASA DEPAN / ✕ HULUR MAK AYAH
const NO=[['🏦','NAK MENYIMPAN','TAK MAMPU',36.95,37.67],['🗓️','RANCANG MASA DEPAN','SUSAH',38.4,39.71],['👨‍👩‍👧','HULUR MAK AYAH','BERKIRA-KIRA',40.4,42.53]];
scene({s:36.8,e:43.4,build(R,o){
  o.it=NO.map(([e,a,b],i)=>E(R,`left:110px;top:${380+i*270}px;width:780px;height:240px`,`<div class="card" style="position:absolute;inset:0;display:flex;align-items:center;gap:30px;padding-left:40px"><div style="font-size:90px">${e}</div><div style="line-height:1.1;white-space:nowrap"><div style="font:900 ${a.length>15?36:46}px Mont;color:#fff">${a}</div><div class="nb" style="font:900 54px Mont;color:#ff6b6b;opacity:0">${b}</div></div></div>${XM(110)}`));
},upd(t,o){const f=outF(t,o.e);o.it.forEach((el,i)=>{const [,,,t0,t1]=NO[i];st(el,mix(slide(t,t0,-220,0,.35),{o:f}));
  el.querySelector('.nb').style.opacity=cl((t-t1)/.15);el.querySelector('.xm').style.transform=`scale(${t<t1?0:ob((t-t1)/.3)})`;
  if(i==2&&t>41.5&&t<42.6)el.style.transform+=` scale(${1+.025*Math.max(0,Math.sin((t-41.5)*Math.PI*2*1.3))})`});
}});

// B8 PINJAMAN HABIS ✓ → ✕ JANGAN AMBIL PINJAMAN BARU
scene({s:46.8,e:52.95,build(R,o){
  o.h=E(R,'left:60px;right:140px;top:300px;text-align:center;font:900 84px Mont;white-space:nowrap','☝️ <span class="gold">SATU PERKARA</span>','g sh');
  o.c=E(R,'left:110px;top:430px;width:780px;height:330px','<div class="card" style="position:absolute;inset:0"></div><div style="position:absolute;left:50px;top:40px;font:900 54px Mont;color:#fff;white-space:nowrap">POTONGAN PINJAMAN</div><div style="position:absolute;left:50px;top:140px;width:680px;height:70px;border-radius:35px;background:#2b2210;border:3px solid #6b5520;overflow:hidden"><div id="pb" style="height:100%;width:0;background:linear-gradient(90deg,#1e8f4e,#6ee7a0)"></div></div><div id="pv" style="position:absolute;left:50px;top:235px;font:900 50px Mont;color:#ddd">0%</div><div id="stp" style="position:absolute;right:30px;top:180px;border:10px solid #2ecc71;border-radius:20px;padding:4px 26px;font:900 76px Mont;color:#2ecc71;transform:rotate(-8deg);opacity:0;background:rgba(10,8,3,.75);white-space:nowrap">HABIS ✓</div>');
  o.n=E(R,'left:110px;top:810px;width:780px;height:330px','<div class="card" style="position:absolute;inset:0;border-color:#ff5a5a;display:flex;flex-direction:column;align-items:center;justify-content:center;line-height:1.1;white-space:nowrap"><div style="font:900 70px Mont;color:#fff">JANGAN AMBIL</div><div style="font:900 74px Mont;color:#ff6b6b">PINJAMAN BARU</div></div><div id="xx" style="position:absolute;inset:0;display:flex;align-items:center;justify-content:center;font:900 330px Mont;color:#ff3b3b;line-height:1;opacity:0">✕</div>');
},upd(t,o){const f=outF(t,o.e);st(o.h,mix(pop(t,46.85),{o:f}));st(o.c,mix(pop(t,47.2,.4),{o:f}));
  const p=100*eio((t-47.6)/2.3);o.c.querySelector('#pb').style.width=p+'%';o.c.querySelector('#pv').textContent=Math.round(p)+'% DIBAYAR';
  const s=o.c.querySelector('#stp'),k=cl((t-49.98)/.15);s.style.opacity=k;s.style.transform=`rotate(-8deg) scale(${lerp(2.2,1,eo(k))})`;
  st(o.n,mix(pop(t,50.45),{o:f}));const x=o.n.querySelector('#xx');x.style.opacity=.85*cl((t-52.0)/.08);x.style.transform=`scale(${t<52?2:lerp(2,1,eo((t-52)/.15))})`;
}});

// B9 SEBALIKNYA: JUMLAH SAMA → SIMPANAN
scene({s:53.05,e:57.75,build(R,o){
  o.h=E(R,'left:60px;right:140px;top:300px;text-align:center;font:900 92px Mont;white-space:nowrap','<span class="gold">SEBALIKNYA</span> 💡','g sh');
  o.a=E(R,'left:110px;top:440px;width:780px;height:230px','<div class="card" style="position:absolute;inset:0;display:flex;align-items:center;justify-content:center;gap:30px;white-space:nowrap"><span style="font-size:110px">💵</span><span style="font:900 70px Mont;color:#fff">JUMLAH <span class="gold">SAMA</span></span></div>');
  o.ar=E(R,'left:60px;right:140px;top:690px;text-align:center;font:900 150px Mont;color:#F5C542;line-height:1','⬇','g sh');
  o.b=E(R,'left:110px;top:870px;width:780px;height:270px',`<div class="card" style="position:absolute;inset:0;display:flex;align-items:center;gap:40px;padding-left:60px;white-space:nowrap">${goldBar(220,110,22)}<span class="gold" style="font:900 86px Mont">SIMPANAN</span></div>${CK(90)}`);
},upd(t,o){const f=outF(t,o.e);st(o.h,mix(pop(t,53.1),{o:f}));st(o.a,mix(pop(t,54.4),{o:f}));
  st(o.ar,{o:cl((t-55.6)/.2)*f,y:t>55.6?wob(t,12,1.4):-30});st(o.b,mix(pop(t,57.05),{o:f}));
  o.b.querySelector('.ck').style.transform=`scale(${t<57.25?0:ob((t-57.25)/.3)})`;
}});

// B10a SEBELUM: RM300 SEBULAN → PINJAMAN
scene({s:57.85,e:62.4,build(R,o){
  o.tag=E(R,'left:60px;right:140px;top:300px;text-align:center;white-space:nowrap','<div style="display:inline-block;background:#3a2e14;border:3px solid #6b5520;color:#ddd;font:900 66px Mont;padding:10px 46px;border-radius:50px">SEBELUM INI</div>','g');
  o.c=E(R,'left:110px;top:470px;width:780px;height:640px','<div class="card" style="position:absolute;inset:0"></div><div class="gold" style="position:absolute;left:0;right:0;top:60px;text-align:center;font:900 190px Mont;line-height:1">RM300</div><div style="position:absolute;left:0;right:0;top:260px;text-align:center;font:900 58px Mont;color:#ddd">SEBULAN</div><div id="to" style="position:absolute;left:0;right:0;top:380px;text-align:center;font:900 84px Mont;color:#ff8080;white-space:nowrap">➜ 🏦 PINJAMAN</div>');
},upd(t,o){const f=outF(t,o.e);st(o.tag,mix(pop(t,57.9),{o:f}));st(o.c,mix(pop(t,59.15,.4),{o:f}));
  const to=o.c.querySelector('#to');to.style.opacity=cl((t-61.1)/.2);to.style.transform=`translateX(${60*(1-eo((t-61.1)/.4))}px)`;
}});

// B10b SELEPAS: SIMPAN RM300 SETIAP BULAN (RM300 x 12 = RM3,600 setahun)
scene({s:65.6,e:68.85,build(R,o){
  o.tag=E(R,'left:60px;right:140px;top:300px;text-align:center;white-space:nowrap','<div style="display:inline-block;background:#1e8f4e;color:#fff;font:900 66px Mont;padding:10px 46px;border-radius:50px;box-shadow:0 0 40px rgba(46,204,113,.5)">SELEPAS HABIS ✓</div>','g');
  o.c=E(R,'left:110px;top:460px;width:780px;height:700px',`<div class="card" style="position:absolute;inset:0"></div><div style="position:absolute;left:0;right:0;top:46px;text-align:center;font:900 70px Mont;color:#fff;white-space:nowrap">SIMPAN <span class="gold" style="font-size:110px">RM300</span></div><div style="position:absolute;left:0;right:0;top:180px;text-align:center;font:900 52px Mont;color:#ddd">SETIAP BULAN</div><div id="cal" style="position:absolute;left:90px;top:280px;width:600px;height:240px;display:grid;grid-template-columns:repeat(6,1fr);gap:14px"></div><div id="yr" style="position:absolute;left:0;right:0;top:560px;text-align:center;font:900 64px Mont;white-space:nowrap;opacity:0">= <span class="gold">RM3,600</span> SETAHUN</div>`);
  const cal=o.c.querySelector('#cal');for(let i=0;i<12;i++)cal.insertAdjacentHTML('beforeend',`<div class="mo" style="border-radius:14px;background:#2b2210;border:2px solid #6b5520;display:flex;align-items:center;justify-content:center;font-size:56px">💰</div>`);
},upd(t,o){const f=outF(t,o.e);st(o.tag,mix(pop(t,65.65),{o:f}));st(o.c,mix(pop(t,65.75,.4),{o:f}));
  o.c.querySelectorAll('.mo').forEach((m,i)=>{const t0=66.4+i*.09;m.firstChild&&0;m.style.background=t>t0?'linear-gradient(160deg,#FFE680,#C8901A)':'#2b2210';m.style.transform=`scale(${t>t0?1+.15*Math.max(0,1-(t-t0)/.2):1})`});
  o.c.querySelector('#yr').style.opacity=cl((t-67.6)/.2);
}});

// B11 DUIT BEBAS ✕ HUTANG BARU
scene({s:71.1,e:73.6,build(R,o){
  o.a=E(R,'left:110px;top:380px;width:780px;height:260px','<div class="card" style="position:absolute;inset:0;display:flex;align-items:center;justify-content:center;gap:24px;white-space:nowrap"><span style="font-size:110px">🕊️</span><span style="font:900 84px Mont" class="gold">DUIT BEBAS</span></div>');
  o.ar=E(R,'left:60px;right:140px;top:660px;text-align:center;font:900 120px Mont;color:#fff;line-height:1','⬇','g sh');
  o.b=E(R,'left:110px;top:820px;width:780px;height:260px','<div class="card" style="position:absolute;inset:0;border-color:#ff5a5a;display:flex;align-items:center;justify-content:center;gap:24px;white-space:nowrap"><span style="font-size:100px">⛓️</span><span style="font:900 70px Mont;color:#ff7070">HUTANG BARU</span></div><div id="xx" style="position:absolute;inset:0;display:flex;align-items:center;justify-content:center;font:900 300px Mont;color:#ff3b3b;line-height:1;opacity:0">✕</div>');
},upd(t,o){const f=outF(t,o.e);st(o.a,mix(pop(t,71.15),{o:f}));st(o.ar,{o:cl((t-71.7)/.2)*f});st(o.b,mix(pop(t,72.0),{o:f}));
  const x=o.b.querySelector('#xx');x.style.opacity=.85*cl((t-72.67)/.08);x.style.transform=`scale(${t<72.67?2:lerp(2,1,eo((t-72.67)/.15))})`;
}});

// B12 UBAH KEWANGAN ≠ TAMBAH PENDAPATAN → KAWAL DUIT YANG ADA ✓
scene({s:74.7,e:81.45,build(R,o){
  o.h=E(R,'left:60px;right:140px;top:300px;text-align:center;font:700 italic 96px Play;white-space:nowrap','<span class="gold">ubah kewangan</span>','g sh');
  o.a=E(R,'left:110px;top:450px;width:780px;height:250px','<div class="card" style="position:absolute;inset:0;display:flex;align-items:center;justify-content:center;flex-direction:column;line-height:1.1;white-space:nowrap"><div style="font:800 46px Mont;color:#ddd">BUKAN SEMESTINYA</div><div style="font:900 60px Mont;color:#fff">TAMBAH PENDAPATAN</div></div><div id="ln" style="position:absolute;left:60px;top:150px;height:12px;width:0;background:#ff3b3b;border-radius:6px;transform:rotate(-4deg)"></div>');
  o.b=E(R,'left:110px;top:760px;width:780px;height:380px',`<div class="card" style="position:absolute;inset:0;border-width:5px;display:flex;align-items:center;gap:30px;padding-left:46px;white-space:nowrap"><span style="font-size:130px">🧠</span><div style="line-height:1.1"><div style="font:900 60px Mont;color:#fff">KAWAL DUIT</div><div class="gold" style="font:900 82px Mont">YANG ADA</div></div></div>${CK(100)}`);
},upd(t,o){const f=outF(t,o.e);st(o.h,mix(pop(t,74.75),{o:f}));st(o.a,mix(pop(t,75.65),{o:f}));
  o.a.querySelector('#ln').style.width=660*eo((t-76.9)/.4)+'px';st(o.a,mix(pop(t,75.65),{o:f*(t>77.2?lerp(1,.55,cl((t-77.2)/.4)):1)}));
  st(o.b,mix(pop(t,79.3),{o:f,s:1+.02*Math.sin(t*5)}));o.b.querySelector('.ck').style.transform=`scale(${t<79.84?0:ob((t-79.84)/.3)})`;
}});

// B13 CTA: SAVE / SHARE / MULA SIMPAN EMAS — LINK DI BIO
scene({s:81.6,e:999,build(R,o){
  o.h=E(R,'left:60px;right:140px;top:300px;text-align:center;font:900 76px Mont;white-space:nowrap','💛 <span style="color:#fff">BERMANFAAT?</span>','g sh');
  const btn=(y,ic,tx,fs=96)=>E(R,`left:150px;top:${y}px;width:700px;height:190px`,`<div class="card" style="position:absolute;inset:0;border-radius:95px;display:flex;align-items:center;justify-content:center;gap:24px;font:900 ${fs}px Mont;white-space:nowrap"><span>${ic}</span><span class="gold">${tx}</span></div><div class="fg" style="position:absolute;right:30px;bottom:-60px;font-size:110px;opacity:0">👆</div>`);
  o.save=btn(430,'🔖','SAVE');o.share=btn(650,'📤','SHARE');
  o.em=E(R,'left:150px;top:850px;width:700px;height:110px',`<div style="display:flex;align-items:center;justify-content:center;gap:24px;white-space:nowrap">${goldBar(150,70,15)}<span style="font:900 56px Mont;color:#fff">MULA SIMPAN EMAS</span></div>`);
  o.bio=btn(975,'🔗','LINK DI BIO',80);
},upd(t,o){st(o.h,pop(t,81.65));
  st(o.save,mix(pop(t,83.0),{s:t>83.91&&t<84.1?.92:1}));st(o.share,mix(pop(t,84.4),{s:t>84.55&&t<84.75?.92:1}));
  o.save.querySelector('.fg').style.opacity=t>83.7&&t<84.4?1:0;o.share.querySelector('.fg').style.opacity=t>84.45&&t<85.3?1:0;
  st(o.em,pop(t,88.2));st(o.bio,mix(pop(t,88.9),{s:t>89.5&&t<89.7?.92:1+.03*Math.sin(t*7)}));const fg=o.bio.querySelector('.fg');fg.style.opacity=t>89.3?1:0;
  fg.style.transform=`translateY(${Math.abs(Math.sin(t*5))*-16}px)`;
}});

// tahap blur video = bila ada grafik
function blurAt(t){let b=0;for(const s of SC){const k=Math.min(cl((t-s.s)/.25),cl((s.e-t)/.25));b=Math.max(b,k)}return eio(b)}

// ---------- kapsyen ----------
const W=window.WORDS||[];const KEY=/^(GAJI|MILIK|PERATUS|100%|SLIP|KOMITMEN|KOPERASI|PINJAMAN|INSURANS|HABIS|JANGAN|BARU|SIMPANAN|SIMPAN|MENYIMPAN|RM300|DISIPLIN|HUTANG|BEBAS|KEWANGAN|PENDAPATAN|MENGAWAL|SAVE|SHARE|LINK|BIO|EMAS|INGAT|SEBALIKNYA|MAKAN)$/;
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
const FL=[3.55,49.98,52.0];
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
      if(r.left<58||r.right>942||r.top<248||r.bottom>1482)bad.push(`${s.s}:${el.textContent.slice(0,18)} [${r.left|0},${r.top|0},${r.right|0},${r.bottom|0}]`);
      if(r.left<330&&r.bottom>1194&&r.top<1250)bad.push(`${s.s}: tindih watermark ${el.textContent.slice(0,18)}`)}}
  const c=$('#cap').getBoundingClientRect();if(c.width>2){const sp=[...$('#cap').children];if(sp.length){const a=sp[0].getBoundingClientRect(),b=sp[sp.length-1].getBoundingClientRect();if(a.left<58||b.right>942)bad.push('cap terkeluar '+$('#cap').textContent)}}
  const l=VB.getBoundingClientRect();if(+VBR.style.opacity>.5&&(l.left<58||l.right>942||l.top<248||l.bottom>1482))bad.push('kad video terkeluar');
  return bad};
