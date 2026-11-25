// Kamal — "Harga emas turun: takut atau peluang?" — komposisi deterministik window.render(t)
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
const FACE=[495,795];
const L={
  FULL:{x:0,y:0,s:1,r:0,b:0},
  PUNCH:{x:FACE[0]*(1-1.08),y:FACE[1]*(1-1.08)+25,s:1.08,r:0,b:0},
  PUNCH2:{x:FACE[0]*(1-1.2),y:FACE[1]*(1-1.2)+40,s:1.2,r:0,b:0},
};
// v3: zoom dikurangkan — 4 kali sahaja, lembut (1.08x), perlahan
const LT=[[0,'FULL'],[9.4,'PUNCH',.8],[11.5,'FULL',.6],[30.5,'PUNCH',.8],[34.8,'FULL',.6],[46.2,'PUNCH',.8],[49.1,'FULL',.6],[68.0,'PUNCH',.8],[70.9,'FULL',.6]];
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

// ---------- babak: setiap babak = grafik BESAR di tengah, video di belakang blur ----------
const SC=[];
function scene(o){o.root=E(G,'left:0;top:0;width:1080px;height:1920px','', 'g');o.build(o.root,o);SC.push(o)}
const outF=(t,e)=>1-cl((t-(e-.22))/.22);

// B1 HOOK: harga emas jatuh RM494/gram
scene({s:0.95,e:3.75,build(R,o){
  o.h1=E(R,'left:60px;right:140px;top:330px;text-align:center;font:900 92px Mont;white-space:nowrap;color:#fff','HARGA EMAS','g sh');
  o.h2=E(R,'left:60px;right:140px;top:430px;text-align:center;font:900 116px Mont;white-space:nowrap;color:#ff4d4d;text-shadow:0 0 40px rgba(255,60,60,.6)','JATUH! 📉','g sh');
  o.tag=E(R,'left:150px;top:640px;width:700px;height:300px','<div class="card" style="position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center"><div style="font:800 36px Mont;color:#ddd;letter-spacing:4px">HARGA HARI INI</div><div id="rm" class="gold" style="font:900 150px Mont;white-space:nowrap;line-height:1.05">RM494</div><div style="font:900 44px Mont;color:#F5C542;letter-spacing:2px">/ 1 GRAM</div></div>');
  o.chart=E(R,'left:150px;top:970px;width:700px;height:210px',`<div class="card" style="position:absolute;inset:0"></div><svg width="700" height="210" style="position:absolute;left:0;top:0"><polyline id="cl" points="40,40 140,70 220,55 330,110 420,95 530,150 650,175" fill="none" stroke="#ff4d4d" stroke-width="12" stroke-linecap="round" stroke-linejoin="round" stroke-dasharray="800" stroke-dashoffset="800"/><path id="ca" d="M630,150 L668,182 L620,190 Z" fill="#ff4d4d" opacity="0"/></svg>`);
},upd(t,o){const f=outF(t,o.e);st(o.h1,mix(pop(t,1.0),{o:f}));st(o.h2,mix(pop(t,1.15),{r:wob(t,.6,.7),o:f}));
  st(o.tag,mix(pop(t,1.65),{o:f}));
  o.tag.querySelector('#rm').textContent='RM'+(t<2.4?Math.floor((t*30*7)%90)+500:494);
  st(o.chart,mix(slide(t,1.3,0,80),{o:f}));o.chart.querySelector('#cl').style.strokeDashoffset=800*(1-eo((t-1.35)/1.0));o.chart.querySelector('#ca').setAttribute('opacity',cl((t-2.3)/.2));
}});

// B2 TAKUT atau PELUANG?
scene({s:6.85,e:8.62,build(R,o){
  o.a=E(R,'left:140px;top:420px;width:720px;height:240px','<div class="card" style="position:absolute;inset:0;border-color:#ff5a5a;display:flex;align-items:center;justify-content:center;font:900 110px Mont;color:#ff6b6b;white-space:nowrap">😨 TAKUT?</div>');
  o.vs=E(R,'left:60px;right:140px;top:700px;text-align:center;font:900 70px Mont;color:#fff;white-space:nowrap','ATAU','g sh');
  o.b=E(R,'left:140px;top:830px;width:720px;height:240px','<div class="card" style="position:absolute;inset:0;display:flex;align-items:center;justify-content:center;font:900 100px Mont;white-space:nowrap"><span>💡</span><span class="gold">&nbsp;PELUANG?</span></div>');
},upd(t,o){const f=outF(t,o.e);const sh=t>6.96&&t<7.5?Math.sin(t*90)*10:0;st(o.a,mix(pop(t,6.9),{x:sh,o:f}));st(o.vs,mix(pop(t,7.4),{o:f}));
  st(o.b,mix(pop(t,8.1),{s:1+.03*Math.sin(t*6),o:f}));
}});

// B3 MEMPERCEPATKAN MATLAMAT SIMPANAN EMAS
scene({s:11.55,e:15.25,build(R,o){
  o.box=E(R,'left:110px;top:360px;width:780px;height:820px','<div class="card" style="position:absolute;inset:0"></div>'+
   '<div style="position:absolute;left:0;right:0;top:50px;text-align:center;font:800 44px Mont;color:#ddd;letter-spacing:3px">MATLAMAT</div>'+
   '<div class="gold" style="position:absolute;left:0;right:0;top:105px;text-align:center;font:900 80px Mont;white-space:nowrap">SIMPANAN EMAS</div>'+
   '<div style="position:absolute;left:60px;top:260px;width:660px;height:70px;border-radius:35px;background:#2b2210;border:3px solid #6b5520;overflow:hidden"><div id="pb" style="height:100%;width:10%;background:linear-gradient(90deg,#C8901A,#FFE680);border-radius:35px"></div></div>'+
   '<div id="pct" style="position:absolute;left:0;right:0;top:360px;text-align:center;font:900 120px Mont;color:#fff">10%</div>'+
   '<div id="ff" style="position:absolute;left:0;right:0;top:510px;text-align:center;font:900 80px Mont;color:#F5C542;white-space:nowrap">⏩ LEBIH LAJU!</div>'+
   '<div id="gb" style="position:absolute;left:250px;top:640px">'+goldBar(280,120,26)+'</div>');
},upd(t,o){const f=outF(t,o.e);st(o.box,mix(pop(t,11.6,.4),{o:f}));
  const p=t<12.5?10+(t-11.6)*8:18+82*eo((t-12.5)/2.0);o.box.querySelector('#pb').style.width=cl(p,0,100)+'%';o.box.querySelector('#pct').textContent=Math.round(cl(p,0,100))+'%';
  const ff=o.box.querySelector('#ff');ff.style.opacity=cl((t-12.5)/.15);ff.style.transform=`translateX(${t>12.5?wob(t,8,4):0}px)`;
  const gb=o.box.querySelector('#gb');gb.style.opacity=cl((t-14.0)/.2);gb.style.transform=`scale(${t<14?0:ob((t-14)/.4)})`;
}});

// B4 DUIT SAMA -> LEBIH BANYAK GRAM
scene({s:18.95,e:23.9,build(R,o){
  o.h=E(R,'left:60px;right:140px;top:300px;text-align:center;font:900 84px Mont;white-space:nowrap','💵 <span style="color:#fff">DUIT</span> <span class="gold">SAMA</span>','g sh');
  const col=(x,lab,c,n,id)=>{let h=`<div style="position:absolute;left:${x}px;top:0;width:420px;height:640px" class="card"><div style="position:absolute;top:24px;width:100%;text-align:center;font:900 40px Mont;color:${c};white-space:nowrap">${lab}</div>`;
    for(let i=0;i<n;i++)h+=`<div class="${id}" style="position:absolute;left:85px;top:${520-i*100}px">${goldBar(250,90,20)}</div>`;return h+`<div id="${id}l" style="position:absolute;bottom:-90px;width:100%;text-align:center;font:900 46px Mont;white-space:nowrap"></div></div>`};
  o.cmp=E(R,'left:62px;top:440px;width:878px;height:640px',col(0,'HARGA TINGGI 📈','#ff7070',2,'hi')+col(458,'HARGA RENDAH 📉','#F5C542',4,'lo'));
},upd(t,o){const f=outF(t,o.e);st(o.h,mix(pop(t,19.0),{o:f}));st(o.cmp,mix(slide(t,19.1,0,80),{o:f}));
  o.cmp.querySelectorAll('.hi').forEach((b,i)=>{b.style.transform=`scale(${t<19.4+i*.15?0:ob((t-19.4-i*.15)/.35)})`});
  o.cmp.querySelectorAll('.lo').forEach((b,i)=>{b.style.transform=`scale(${t<20.6+i*.22?0:ob((t-20.6-i*.22)/.35)})`});
  const hl=o.cmp.querySelector('#hil'),ll=o.cmp.querySelector('#lol');
  hl.innerHTML='<span style="color:#ff8a8a">SIKIT</span>';hl.style.opacity=cl((t-22.3)/.2);
  ll.innerHTML='<span class="gold">LEBIH BANYAK!</span>';ll.style.opacity=cl((t-21.4)/.2);
}});

// B5 TARGET 10/50/100 GRAM
scene({s:27.05,e:30.45,build(R,o){
  o.h=E(R,'left:60px;right:140px;top:300px;text-align:center;font:900 84px Mont;white-space:nowrap','🎯 <span class="gold">TARGET</span> <span style="color:#fff">ANDA</span>','g sh');
  o.items=[10,50,100].map((g,i)=>E(R,`left:150px;top:${450+i*245}px;width:700px;height:210px`,`<div class="card" style="position:absolute;inset:0;display:flex;align-items:center;gap:40px;padding-left:50px">${goldBar(200,100,20)}<div style="font:900 110px Mont;color:#fff;white-space:nowrap">${g}<span class="gold" style="font-size:60px"> GRAM</span></div></div>${CK(80)}`));
},upd(t,o){const f=outF(t,o.e);st(o.h,mix(pop(t,27.05),{o:f}));
  const ts=[27.2,28.1,29.6];o.items.forEach((el,i)=>{st(el,mix(slide(t,ts[i],-200,0,.35),{o:f}));el.querySelector('.ck').style.transform=`scale(${t<ts[i]+.35?0:ob((t-ts[i]-.35)/.3)})`});
}});

// B6 KONSISTEN (cop besar)
scene({s:34.9,e:35.75,build(R,o){
  o.stamp=E(R,'left:100px;top:600px;width:800px;height:260px','<div style="position:absolute;inset:0;border:14px solid #F5C542;border-radius:30px;display:flex;align-items:center;justify-content:center;font:900 110px Mont;color:#F5C542;letter-spacing:6px;background:rgba(10,8,3,.6);white-space:nowrap">KONSISTEN ✓</div>');
},upd(t,o){const k=cl((t-34.95)/.15);st(o.stamp,{o:k*outF(t,o.e),s:lerp(2.2,1,eo(k)),r:-6})}});

// B7 INGAT! JANGAN TUNGGU HARGA NAIK
scene({s:35.78,e:38.0,build(R,o){
  o.warn=E(R,'left:60px;right:140px;top:440px;text-align:center;white-space:nowrap','<div style="display:inline-block;background:#d62828;color:#fff;font:900 90px Mont;padding:14px 50px;border-radius:24px;box-shadow:0 0 50px rgba(255,40,40,.6)">⚠️ INGAT!</div>','g');
  o.h=E(R,'left:60px;right:140px;top:640px;text-align:center;font:900 110px Mont;line-height:1.05;white-space:nowrap;color:#fff','JANGAN<br><span class="gold">TUNGGU</span><br>HARGA NAIK 📈','g sh');
},upd(t,o){const f=outF(t,o.e);st(o.warn,mix(pop(t,35.8),{o:f}));st(o.h,mix(pop(t,36.15),{o:f}));}});

// B8 Naik = MAHAL, Turun = TAKUT
scene({s:39.85,e:45.75,build(R,o){
  o.n1=E(R,'left:120px;top:330px;width:640px;height:370px','<div class="note" style="position:absolute;inset:0;padding:34px 40px;font-size:60px;line-height:1.2">HARGA NAIK 📈<br><span style="font-size:84px;color:#c01818">"MAHALNYA!"</span> 😰</div>');
  o.n2=E(R,'left:240px;top:760px;width:640px;height:370px','<div class="note" style="position:absolute;inset:0;padding:34px 40px;font-size:60px;line-height:1.2;background:#bfe3ff">HARGA TURUN 📉<br><span style="font-size:84px;color:#c01818">"TAKUTNYA!"</span> 😨</div>');
},upd(t,o){const f=outF(t,o.e);const sh=t>44.6&&t<45.2?Math.sin(t*80)*8:0;
  st(o.n1,mix(pop(t,39.9),{r:-3+wob(t,.8,.4),o:f}));st(o.n2,mix(pop(t,43.2),{r:3+wob(t,.8,.4,1),x:sh,o:f}));
}});

// B9 KEJAR HARGA HARI INI ✕ SEMATA-MATA
scene({s:49.15,e:51.95,build(R,o){
  o.chase=E(R,'left:110px;top:340px;width:780px;height:640px',`<div class="card" style="position:absolute;inset:0"></div><div style="position:absolute;left:0;right:0;top:36px;text-align:center;font:900 70px Mont;color:#fff;white-space:nowrap">KEJAR HARGA</div><div style="position:absolute;left:0;right:0;top:115px;text-align:center;font:900 70px Mont;color:#ff7070;white-space:nowrap">HARI INI? 🏃‍♀️</div><svg width="780" height="640" style="position:absolute;left:0;top:0"><polyline id="zz" points="60,580 160,500 230,550 330,400 420,460 520,320 600,380 720,240" fill="none" stroke="#F5C542" stroke-width="12" stroke-linejoin="round" stroke-dasharray="1100" stroke-dashoffset="1100"/></svg>`);
  o.x=E(R,'left:110px;top:340px;width:780px;height:640px;display:flex;align-items:center;justify-content:center;font:900 560px Mont;color:#ff3b3b;line-height:1','✕','g sh');
  o.sm=E(R,'left:60px;right:140px;top:1030px;text-align:center;font:900 100px Mont;color:#ff6b6b;white-space:nowrap','SEMATA-MATA','g sh');
},upd(t,o){const f=outF(t,o.e);st(o.chase,mix(pop(t,49.2,.4),{o:f}));
  o.chase.querySelector('#zz').style.strokeDashoffset=1100*(1-cl((t-49.3)/1.3));
  st(o.x,{o:cl((t-50.75)/.08)*f,s:t<50.75?2:lerp(2,1,eo((t-50.75)/.15))});st(o.sm,mix(pop(t,50.85),{o:f}));
}});

// B10 MATLAMAT KEWANGAN
scene({s:53.25,e:55.72,build(R,o){
  o.tg=E(R,'left:300px;top:330px;width:400px;height:400px','<svg width="400" height="400"><circle cx="200" cy="200" r="190" fill="#c0392b"/><circle cx="200" cy="200" r="142" fill="#fff"/><circle cx="200" cy="200" r="96" fill="#c0392b"/><circle cx="200" cy="200" r="48" fill="#F5C542"/></svg><div id="ar" style="position:absolute;left:190px;top:60px;font:900 140px Mont;color:#F5C542">➶</div>');
  o.lab=E(R,'left:60px;right:140px;top:790px;text-align:center;line-height:1.1;white-space:nowrap','<div style="font:700 italic 90px Play" class="gold">matlamat kewangan</div><div style="font:900 60px Mont;color:#fff;margin-top:14px">SEBAB KITA BELI EMAS 🎯</div>','g sh');
},upd(t,o){const f=outF(t,o.e);st(o.tg,mix(pop(t,53.3),{r:wob(t,3,.4),o:f}));
  const a=o.tg.querySelector('#ar');a.style.opacity=cl((t-53.45)/.05);a.style.transform=`translate(${200*(1-eo((t-53.45)/.18))}px,${-200*(1-eo((t-53.45)/.18))}px)`;
  st(o.lab,mix(slide(t,53.5,0,60),{o:f}));
}});

// B11 Checklist: bijak / kemampuan / gram demi gram
scene({s:58.55,e:62.2,build(R,o){
  o.h=E(R,'left:60px;right:140px;top:300px;text-align:center;font:900 80px Mont;white-space:nowrap','💡 <span class="gold">GUNA PELUANG</span>','g sh');
  const it=[['🧠','DENGAN','BIJAK'],['💰','IKUT','KEMAMPUAN'],['⚖️','GRAM DEMI','GRAM']];
  o.it=it.map(([e,a,b],i)=>E(R,`left:150px;top:${450+i*245}px;width:700px;height:210px`,`<div class="card" style="position:absolute;inset:0;display:flex;align-items:center;gap:34px;padding-left:44px"><div style="font-size:100px">${e}</div><div style="font:800 44px Mont;color:#ddd;line-height:1.1">${a}<br><span class="gold" style="font:900 74px Mont">${b}</span></div></div>${CK(80)}`));
},upd(t,o){const f=outF(t,o.e);st(o.h,mix(pop(t,58.6),{o:f}));const ts=[58.7,60.1,61.3];
  o.it.forEach((el,i)=>{st(el,mix(slide(t,ts[i],200,0,.35),{o:f}));el.querySelector('.ck').style.transform=`scale(${t<ts[i]+.3?0:ob((t-ts[i]-.3)/.3)})`});
}});

// B12 ✕ MENANG TEKA HARGA / ✓ CUKUPKAN SIMPANAN EMAS
scene({s:63.55,e:67.95,build(R,o){
  o.h=E(R,'left:60px;right:140px;top:300px;text-align:center;font:900 80px Mont;white-space:nowrap','<span style="color:#fff">MATLAMAT KITA</span> 🎯','g sh');
  o.a=E(R,'left:150px;top:440px;width:700px;height:300px','<div class="card" style="position:absolute;inset:0;border-color:#ff5a5a;display:flex;align-items:center;gap:30px;padding-left:50px"><div style="font-size:130px">🎲</div><div style="font:900 64px Mont;color:#ff8080;line-height:1.1;white-space:nowrap">MENANG<br>TEKA HARGA</div></div><div id="xx" style="position:absolute;inset:0;display:flex;align-items:center;justify-content:center;font:900 330px Mont;color:#ff3b3b;line-height:1">✕</div>');
  o.b=E(R,'left:150px;top:800px;width:700px;height:340px','<div class="card" style="position:absolute;inset:0;display:flex;align-items:center;gap:30px;padding-left:40px"><div id="gbs" style="position:relative;width:230px;height:200px"></div><div style="font:900 56px Mont;line-height:1.1;color:#fff;white-space:nowrap">CUKUPKAN<br><span class="gold" style="font-size:66px">SIMPANAN<br>EMAS</span></div></div>'+CK(90));
  const gbs=o.b.querySelector('#gbs');[[0,100],[118,100],[59,0]].forEach(([x,y])=>gbs.insertAdjacentHTML('beforeend',`<div class="gbx" style="position:absolute;left:${x}px;top:${y}px">${goldBar(112,90,11)}</div>`));
},upd(t,o){const f=outF(t,o.e);st(o.h,mix(pop(t,63.6),{o:f}));st(o.a,mix(pop(t,63.65),{o:f}));
  const x=o.a.querySelector('#xx');x.style.opacity=.8*cl((t-64.75)/.08);x.style.transform=`scale(${t<64.75?2:lerp(2,1,eo((t-64.75)/.15))})`;
  st(o.b,mix(pop(t,66.2),{o:f}));o.b.querySelectorAll('.gbx').forEach((g,i)=>g.style.transform=`scale(${t<66.4+i*.15?0:ob((t-66.4-i*.15)/.3)})`);
  o.b.querySelector('.ck').style.transform=`scale(${t<67.1?0:ob((t-67.1)/.3)})`;
}});

// B13 CTA: SAVE / SHARE / LINK DI BIO
scene({s:70.95,e:99,build(R,o){
  o.h=E(R,'left:60px;right:140px;top:300px;text-align:center;font:900 76px Mont;white-space:nowrap','💛 <span style="color:#fff">BERMANFAAT?</span>','g sh');
  const btn=(y,ic,tx)=>E(R,`left:150px;top:${y}px;width:700px;height:200px`,`<div class="card" style="position:absolute;inset:0;border-radius:100px;display:flex;align-items:center;justify-content:center;gap:24px;font:900 96px Mont;white-space:nowrap"><span>${ic}</span><span class="gold">${tx}</span></div><div class="fg" style="position:absolute;right:30px;bottom:-60px;font-size:110px;opacity:0">👆</div>`);
  o.save=btn(440,'🔖','SAVE');o.share=btn(690,'📤','SHARE');o.bio=btn(940,'🔗','LINK DI BIO');
  o.bio.firstChild.style.fontSize='80px';
},upd(t,o){st(o.h,pop(t,71.0));
  st(o.save,mix(pop(t,71.1),{s:t>71.25&&t<71.45?.92:1}));st(o.share,mix(pop(t,71.7),{s:t>71.85&&t<72.05?.92:1}));
  o.save.querySelector('.fg').style.opacity=t>71.15&&t<71.9?1:0;o.share.querySelector('.fg').style.opacity=t>71.75&&t<72.6?1:0;
  st(o.bio,mix(pop(t,74.85),{s:t>75.4&&t<75.6?.92:1+.03*Math.sin(t*7)}));const fg=o.bio.querySelector('.fg');fg.style.opacity=t>75.2?1:0;
  fg.style.transform=`translateY(${Math.abs(Math.sin(t*5))*-16}px)`;
}});

// tahap blur video = bila ada grafik
function blurAt(t){let b=0;for(const s of SC){const k=Math.min(cl((t-s.s)/.25),cl((s.e-t)/.25));b=Math.max(b,k)}return eio(b)}

// ---------- kapsyen ----------
const W=window.WORDS||[];const KEY=/^(EMAS|JATUH|RM494|GRAM|TAKUT|PELUANG|MATLAMAT|SIMPANAN|MEMPERCEPATKAN|RENDAH|BANYAK|TINGGI|10|50|100|KONSISTEN|NAIK|MAHAL|TURUN|KEJAR|KEWANGAN|BIJAK|KEMAMPUAN|CUKUPKAN|SAVE|SHARE|LINK|BIO|INGAT|JANGAN|TUNGGU|INILAH|MASANYA|PUBLIC|GOLD)$/;
const CAPG=[];{let g=[];for(let i=0;i<W.length;i++){const w=W[i];g.push(w);const nx=W[i+1];const len=g.reduce((a,x)=>a+x.w.length+1,0)+(nx?nx.w.length:0);const end=/[.,?]$/.test(w.w)||g.length>=3||len>17||(W[i+1]&&W[i+1].s-w.e>.25);if(end||i==W.length-1){CAPG.push(g);g=[]}}}
const CAP=$('#cap');
function capUpd(t){let g=null;for(const x of CAPG){if(t>=x[0].s-.05&&t<x[x.length-1].e+.25)g=x}
  if(!g){CAP.innerHTML='';return}
  const nch=g.reduce((a,w)=>a+w.w.replace(/[.,?-]/g,'').length,0)+g.length;const fs=Math.min(66,Math.floor(820/(nch*0.80)));
  const h=g.map(w=>{const tx=w.w.replace(/[.,?]/g,'').replace(/^-/,'').toUpperCase();const on=t>=w.s-.03;const act=on&&t<w.e+.05;const k=KEY.test(tx);
    const sc=act?1+.12*Math.max(0,1-(t-w.s)/.15):1;
    return `<span style="display:inline-block;margin:0 14px;font:900 ${fs}px Mont;opacity:${on?1:.0};transform:scale(${sc});color:${k?'#F5C542':'#fff'};-webkit-text-stroke:3px #000;paint-order:stroke fill;text-shadow:0 5px 0 #000,0 8px 18px rgba(0,0,0,.8)">${tx}</span>`}).join('');
  CAP.innerHTML=h}

// ---------- flash pada impak ----------
const FL=[1.65,34.95,50.75,64.75];
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
