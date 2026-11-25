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

// ---------- layout video ----------
const FACE=[495,795];
const L={
  FULL:{x:0,y:0,s:1,r:0,b:0},
  PUNCH:{x:FACE[0]*(1-1.12),y:FACE[1]*(1-1.12)+40,s:1.12,r:0,b:0},
  PUNCH2:{x:FACE[0]*(1-1.22),y:FACE[1]*(1-1.22)+40,s:1.22,r:0,b:0},
  CARDR:{x:400,y:300,s:.5,r:34,b:1},
  CARDL:{x:100,y:300,s:.5,r:34,b:1},
  CARDT:{x:262,y:262,s:.44,r:34,b:1},
};
// garis masa layout [masa, nama, tempoh transisi]
const LT=[[0,'FULL'],[1.7,'PUNCH',.25],[3.72,'FULL',.3],[8.6,'CARDR',.4],[15.25,'CARDT',.4],
 [23.9,'FULL',.35],[30.5,'PUNCH2',.25],[33.0,'FULL',.35],[35.75,'PUNCH',.2],[37.8,'FULL',.35],[45.75,'CARDR',.4],
 [51.95,'FULL',.35],[55.7,'CARDL',.4],[62.2,'FULL',.35],[64.2,'PUNCH',.25],[66.2,'FULL',.3],[67.95,'CARDT',.45]];
function layoutAt(t){let cur=L.FULL,prev=L.FULL,k=1;
  for(let i=0;i<LT.length;i++){const [s,n,d=.3]=LT[i];if(t>=s){prev=i?L[LT[i-1][1]]:L.FULL;cur=L[n];k=eio((t-s)/d)}}
  const o={};for(const p of['x','y','s','r','b'])o[p]=lerp(prev[p],cur[p],k);return o}

// ---------- latar ----------
const BGFX=$('#bgfx');const SP=[];
for(let i=0;i<40;i++){const r=(i*9301+49297)%233280/233280,r2=(i*4253+1237)%1000/1000;
  SP.push([E(BGFX,`left:0;top:0;width:${4+r*8}px;height:${4+r*8}px;border-radius:50%;background:#F5C542;box-shadow:0 0 12px #F5C542`),r,r2])}
function bgUpd(t){for(const [el,r,r2] of SP){const y=1920-((t*(30+r*60)+r2*1920)%2100);el.style.transform=`translate(${(r*1080+wob(t,40,.1,r*9))}px,${y}px)`;el.style.opacity=.15+.35*Math.abs(Math.sin(t*(1+r)+r2*6))}}

// ---------- ikon ----------
const goldBar=(w=150,h=70,fs=15)=>`<div class="bar" style="width:${w}px;height:${h}px;font-size:${fs}px;line-height:1;text-align:center;flex-direction:column">PUBLIC GOLD<span style="font-size:${fs*.75}px;font-weight:800;opacity:.8;margin-top:3px">999.9</span></div>`;

// ---------- babak ----------
const SC=[];
function scene(o){o.root=E(G,'left:0;top:0;width:1080px;height:1920px','', 'g');o.build(o.root,o);SC.push(o)}

// 1 HOOK: harga emas jatuh RM494/gram
scene({s:0,e:3.75,build(R,o){
  o.h1=E(R,'left:60px;right:140px;top:262px;text-align:center;font:900 76px Mont;white-space:nowrap','<span style="color:#fff">HARGA EMAS</span>','g sh');
  o.h2=E(R,'left:60px;right:140px;top:345px;text-align:center;font:900 96px Mont;white-space:nowrap;color:#ff4d4d;text-shadow:0 0 30px rgba(255,60,60,.6)','JATUH! 📉','g sh');
  o.tag=E(R,'left:62px;top:560px;width:230px;height:200px','<div class="card" style="position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center"><div style="font:800 26px Mont;color:#ddd;letter-spacing:2px">HARI INI</div><div id="rm" class="gold" style="font:900 62px Mont;white-space:nowrap">RM494</div><div style="font:800 28px Mont;color:#F5C542">/ 1 GRAM</div></div>');
  o.chart=E(R,'left:710px;top:560px;width:230px;height:200px',`<div class="card" style="position:absolute;inset:0"></div><svg width="230" height="200" style="position:absolute;left:0;top:0"><polyline id="cl" points="20,40 60,60 90,48 125,95 155,85 190,150 212,168" fill="none" stroke="#ff4d4d" stroke-width="9" stroke-linecap="round" stroke-linejoin="round" stroke-dasharray="400" stroke-dashoffset="400"/><path id="ca" d="M196,140 L218,174 L180,172 Z" fill="#ff4d4d" opacity="0"/></svg>`);
},upd(t,o){st(o.h1,mix(slide(t,.05,0,-50),{y:wob(t,4,.5)}));st(o.h2,mix(pop(t,1.0),{r:-3+wob(t,1,.7)}));
  st(o.tag,mix(pop(t,1.65),{r:wob(t,1.5,.6)}));
  const n=t<1.65?0:t<2.5?Math.floor((t*30*7)%90)+500:494;o.tag.querySelector('#rm').textContent='RM'+(t<2.5?n:494);
  st(o.chart,slide(t,1.0,120,0));o.chart.querySelector('#cl').style.strokeDashoffset=400*(1-eo((t-1.1)/.9));o.chart.querySelector('#ca').setAttribute('opacity',cl((t-1.9)/.2));
}});

// 2 PERSOALAN: takut atau peluang?
scene({s:3.75,e:8.62,build(R,o){
  o.q=E(R,'left:60px;right:140px;top:270px;text-align:center;font:900 64px Mont;white-space:nowrap','<span style="color:#fff">PERSOALANNYA</span><span class="gold">...</span>','g sh');
  o.q2=E(R,'left:60px;right:140px;top:350px;text-align:center;font:700 italic 54px Play;white-space:nowrap;color:#F5C542','bila harga emas jatuh?','g sh');
  o.a=E(R,'left:70px;top:1030px;width:350px;height:140px','<div class="card" style="position:absolute;inset:0;border-color:#ff5a5a;display:flex;align-items:center;justify-content:center;font:900 52px Mont;color:#ff6b6b;white-space:nowrap">😨 TAKUT?</div>');
  o.vs=E(R,'left:420px;top:1076px;width:100px;text-align:center;font:900 36px Mont;color:#fff','ATAU','g sh');
  o.b=E(R,'left:536px;top:1030px;width:370px;height:140px','<div class="card" style="position:absolute;inset:0;display:flex;align-items:center;justify-content:center;font:900 48px Mont;white-space:nowrap"><span>💡</span><span class="gold">&nbsp;PELUANG?</span></div>');
},upd(t,o){st(o.q,slide(t,4.0,0,-40));st(o.q2,slide(t,5.1,0,30));
  const sh=t>6.96&&t<7.6?Math.sin(t*90)*8:0;st(o.a,mix(pop(t,6.9),{x:sh,r:-2}));st(o.vs,pop(t,7.4));
  st(o.b,mix(pop(t,8.1),{r:1.5,s:1+.025*Math.sin(t*6)}));
}});

// 3 PERCEPAT MATLAMAT (video kad kanan)
scene({s:8.62,e:15.28,build(R,o){
  o.t1=E(R,'left:60px;top:300px;width:320px;font:800 34px Mont;line-height:1.15;color:#fff','KALAU TANYA<br><span class="gold" style="font-size:44px;font-weight:900">SAYA...</span>','g sh');
  o.t2=E(R,'left:60px;top:450px;width:330px;font:900 44px Mont;line-height:1.05','<span class="gold">INILAH</span><br><span style="color:#fff">WAKTUNYA</span> ⏳','g sh');
  o.box=E(R,'left:60px;top:640px;width:320px;height:420px','<div class="card" style="position:absolute;inset:0"></div>'+
   '<div style="position:absolute;left:22px;top:24px;font:800 24px Mont;color:#ddd;letter-spacing:1px">MATLAMAT<br><span style="color:#F5C542;font-size:30px;font-weight:900">SIMPANAN EMAS</span></div>'+
   '<div style="position:absolute;left:22px;top:130px;width:276px;height:36px;border-radius:18px;background:#2b2210;border:2px solid #6b5520;overflow:hidden"><div id="pb" style="height:100%;width:10%;background:linear-gradient(90deg,#C8901A,#FFE680);border-radius:18px"></div></div>'+
   '<div id="pct" style="position:absolute;left:22px;top:180px;font:900 54px Mont;color:#fff">10%</div>'+
   '<div id="ff" style="position:absolute;left:22px;top:258px;width:276px;font:900 40px Mont;color:#F5C542;white-space:nowrap">⏩ LAJU!</div>'+
   '<div id="gb" style="position:absolute;left:85px;top:325px">'+goldBar(150,66,15)+'</div>');
},upd(t,o){st(o.t1,slide(t,8.7,-80,0));st(o.t2,pop(t,9.4));st(o.box,slide(t,11.6,-100,0));
  const p=t<12.5?10+ (t-11.6)*8:10+8+82*eo((t-12.5)/2.2);o.box.querySelector('#pb').style.width=cl(p,0,100)+'%';o.box.querySelector('#pct').textContent=Math.round(cl(p,0,100))+'%';
  const ff=o.box.querySelector('#ff');ff.style.opacity=cl((t-12.5)/.15);ff.style.transform=`translateX(${t>12.5?wob(t,6,4):0}px)`;
  const gb=o.box.querySelector('#gb');gb.style.opacity=cl((t-14.0)/.2);gb.style.transform=`scale(${t<14?0:ob((t-14)/.4)})`;
}});

// 4 PERBANDINGAN: duit sama -> lebih gram (video kad atas)
scene({s:15.28,e:23.92,build(R,o){
  o.sideL=E(R,'left:60px;top:300px;width:190px;font:900 40px Mont;line-height:1.1;text-align:center','<div style="font-size:70px">💵</div><span style="color:#fff">DUIT</span><br><span class="gold">SAMA</span>','g sh');
  o.sideR=E(R,'left:750px;top:330px;width:188px;font:900 32px Mont;line-height:1.1;text-align:center','<div style="font-size:66px">📉</div><span style="color:#fff">HARGA</span><br><span class="gold">RENDAH</span>','g sh');
  const col=(x,lab,col,n,id)=>{let h=`<div style="position:absolute;left:${x}px;top:0;width:410px;height:330px" class="card"><div style="position:absolute;top:16px;width:100%;text-align:center;font:900 30px Mont;color:${col};white-space:nowrap">${lab}</div>`;
    for(let i=0;i<n;i++)h+=`<div class="${id}" style="position:absolute;left:${130+ (i%2)*0}px;top:${250-i*52}px">${goldBar(150,50,13)}</div>`;return h+`<div id="${id}l" style="position:absolute;bottom:-58px;width:100%;text-align:center;font:900 32px Mont;white-space:nowrap"></div></div>`};
  o.cmp=E(R,'left:62px;top:770px;width:878px;height:340px',col(0,'HARGA TINGGI 📈','#ff7070',2,'hi')+col(468,'HARGA RENDAH 📉','#F5C542',4,'lo'));
},upd(t,o){st(o.sideL,pop(t,16.9));st(o.sideR,pop(t,15.6));st(o.cmp,{o:0});
  // panel muncul selepas kad video naik? -> guna ruang sisi bawah kad (y 1150+) tak cukup; tunjuk panel menindih kawasan bawah kad pada 19.2
  const k=eo((t-19.0)/.5);st(o.cmp,{o:cl((t-19)/.25),y:60*(1-k)});
  o.cmp.querySelectorAll('.hi').forEach((b,i)=>{b.style.transform=`scale(${t<19.3+i*.15?0:ob((t-19.3-i*.15)/.35)})`});
  o.cmp.querySelectorAll('.lo').forEach((b,i)=>{b.style.transform=`scale(${t<20.6+i*.22?0:ob((t-20.6-i*.22)/.35)})`});
  const hl=o.cmp.querySelector('#hil'),ll=o.cmp.querySelector('#lol');
  hl.innerHTML='<span style="color:#ff8a8a">GRAM SEDIKIT</span>';hl.style.opacity=cl((t-22.3)/.2);
  ll.innerHTML='<span class="gold">LEBIH BANYAK GRAM!</span>';ll.style.opacity=cl((t-21.4)/.2);
}});

// 5 TARGET 10/50/100 gram + KONSISTEN
scene({s:23.92,e:35.78,build(R,o){
  o.head=E(R,'left:60px;top:285px;width:330px;font:900 46px Mont;line-height:1.05','🎯 <span class="gold">TARGET</span><br><span style="color:#fff;font-size:38px">KUMPUL EMAS</span>','g sh');
  o.items=[10,50,100].map((g,i)=>E(R,`left:60px;top:${450+i*140}px;width:236px;height:118px`,`<div class="card" style="position:absolute;inset:0;display:flex;align-items:center;gap:10px;padding-left:12px">${goldBar(72,42,7)}<div style="font:900 44px Mont;color:#fff;white-space:nowrap;line-height:.95">${g}<br><span class="gold" style="font-size:26px">GRAM</span></div></div><div class="ck" style="position:absolute;right:-16px;top:-16px;width:52px;height:52px;border-radius:50%;background:#2ecc71;color:#fff;font:900 34px Mont;display:flex;align-items:center;justify-content:center;box-shadow:0 4px 10px rgba(0,0,0,.5)">✓</div>`));
  o.now=E(R,'left:60px;right:140px;top:270px;text-align:center;font:900 84px Mont;white-space:nowrap','<span class="gold">INILAH MASANYA</span> ⏰','g sh');
  o.stamp=E(R,'left:520px;top:1040px;width:400px;height:130px','<div style="position:absolute;inset:0;border:8px solid #F5C542;border-radius:18px;display:flex;align-items:center;justify-content:center;font:900 62px Mont;color:#F5C542;letter-spacing:4px;background:rgba(10,8,3,.55);white-space:nowrap">KONSISTEN ✓</div>');
},upd(t,o){const out=t>30.4;st(o.head,mix(slide(t,24.2,-80,0),{o:out?1-cl((t-30.4)/.2):1}));
  const ts=[27.2,28.1,29.6];o.items.forEach((el,i)=>{st(el,mix(slide(t,ts[i],-140,0,.35),{o:out?1-cl((t-30.4)/.2):1}));const c=el.querySelector('.ck');c.style.transform=`scale(${t<ts[i]+.35?0:ob((t-ts[i]-.35)/.3)})`});
  st(o.now,mix(pop(t,30.5),{o:t>33?1-cl((t-33)/.25):1,r:wob(t,1,.5)}));
  const k=t<34.95?0:cl((t-34.95)/.18);st(o.stamp,{o:k,s:lerp(2.2,1,eo(k)),r:-6});
}});

// 6 INGAT! JANGAN TUNGGU HARGA NAIK — mahal / takut
scene({s:35.78,e:45.78,build(R,o){
  o.warn=E(R,'left:60px;right:140px;top:268px;text-align:center;white-space:nowrap','<div style="display:inline-block;background:#d62828;color:#fff;font:900 46px Mont;padding:8px 26px;border-radius:14px;box-shadow:0 0 30px rgba(255,40,40,.6)">⚠️ INGAT!</div>','g');
  o.h=E(R,'left:60px;right:140px;top:360px;text-align:center;font:900 54px Mont;white-space:nowrap;color:#fff','JANGAN <span class="gold">TUNGGU</span> HARGA NAIK','g sh');
  o.n1=E(R,'left:76px;top:560px;width:218px;height:250px','<div class="note" style="position:absolute;inset:0;padding:16px;font-size:28px;line-height:1.2">HARGA NAIK 📈<br><span style="font-size:31px;color:#c01818">"MAHALNYA!"</span> 😰</div>');
  o.n2=E(R,'left:706px;top:560px;width:218px;height:250px','<div class="note" style="position:absolute;inset:0;padding:16px;font-size:28px;line-height:1.2;background:#bfe3ff">HARGA TURUN 📉<br><span style="font-size:31px;color:#c01818">"TAKUTNYA!"</span> 😨</div>');
},upd(t,o){st(o.warn,pop(t,35.8));st(o.h,mix(slide(t,36.1,0,40),{o:t>39?1-cl((t-39)/.2):1}));
st(o.warn,mix(pop(t,35.8),{o:t>39?1-cl((t-39)/.2):1}));
  const sh=t>44.6&&t<45.2?Math.sin(t*80)*6:0;
  st(o.n1,mix(pop(t,39.9),{r:-3+wob(t,.8,.4)}));st(o.n2,mix(pop(t,43.2),{r:3+wob(t,.8,.4,1)+sh*.2,x:sh}));
}});

// 7 SATU PERKARA: bukan kejar harga semata-mata (kad kanan)
scene({s:45.78,e:51.98,build(R,o){
  o.one=E(R,'left:60px;top:300px;width:320px;font:900 36px Mont;line-height:1.1','☝️<br><span style="color:#fff">TAPI INGAT</span><br><span class="gold">SATU PERKARA</span>','g sh');
  o.chase=E(R,'left:60px;top:640px;width:320px;height:360px',`<div class="card" style="position:absolute;inset:0"></div><div style="position:absolute;left:18px;top:18px;font:900 28px Mont;color:#fff;white-space:nowrap">KEJAR HARGA<br><span style="color:#ff7070">HARI INI?</span></div><svg width="320" height="360" style="position:absolute;left:0;top:0"><polyline id="zz" points="20,300 60,250 90,280 130,190 165,230 205,150 240,190 290,110" fill="none" stroke="#F5C542" stroke-width="7" stroke-linejoin="round" stroke-dasharray="520" stroke-dashoffset="520"/></svg><div id="run" style="position:absolute;left:0;top:0;font-size:56px">🏃‍♀️</div>`);
  o.x=E(R,'left:60px;top:640px;width:320px;height:360px;display:flex;align-items:center;justify-content:center;font:900 300px Mont;color:#ff3b3b;line-height:1','✕','g sh');
  o.sm=E(R,'left:60px;top:1020px;width:320px;text-align:center;font:900 36px Mont;color:#ff6b6b;white-space:nowrap','SEMATA-MATA','g sh');
},upd(t,o){st(o.one,slide(t,45.85,-80,0));st(o.chase,slide(t,49.2,-100,0));
  o.chase.querySelector('#zz').style.strokeDashoffset=520*(1-cl((t-49.3)/1.3));
  const pts=[[20,300],[60,250],[90,280],[130,190],[165,230],[205,150],[240,190],[290,110]];const k=cl((t-49.3)/1.3)*(pts.length-1),i=Math.min(pts.length-2,Math.floor(k)),f=k-i;
  const px=lerp(pts[i][0],pts[i+1][0],f)-60,py=lerp(pts[i][1],pts[i+1][1],f)-50;o.chase.querySelector('#run').style.transform=`translate(${px}px,${py}px)`;
  st(o.x,{o:cl((t-50.75)/.08),s:t<50.75?2:lerp(2,1,eo((t-50.75)/.15))});st(o.sm,pop(t,50.85));
}});

// 8 MATLAMAT KEWANGAN (punch)
scene({s:51.98,e:55.72,build(R,o){
  o.h=E(R,'left:60px;right:140px;top:272px;text-align:center;white-space:nowrap;font:700 italic 70px Play','<span class="gold">ada matlamat kewangan</span>','g sh');
  o.tg=E(R,'left:730px;top:560px;width:200px;height:200px','<svg width="200" height="200"><circle cx="100" cy="100" r="96" fill="#c0392b"/><circle cx="100" cy="100" r="72" fill="#fff"/><circle cx="100" cy="100" r="48" fill="#c0392b"/><circle cx="100" cy="100" r="24" fill="#F5C542"/></svg><div id="ar" style="position:absolute;left:96px;top:30px;font:900 70px Mont;color:#F5C542;transform-origin:0 100%">➶</div>');
  o.lab=E(R,'left:60px;right:140px;top:1058px;text-align:center;font:900 50px Mont;white-space:nowrap;line-height:1.05','<span style="color:#fff">BELI EMAS </span><span class="gold">BERSEBAB</span> 🎯','g sh');
},upd(t,o){st(o.h,slide(t,53.3,0,-40));st(o.tg,mix(pop(t,53.35),{r:wob(t,3,.4)}));
  const a=o.tg.querySelector('#ar');a.style.opacity=cl((t-53.4)/.05);a.style.transform=`translate(${120*(1-eo((t-53.4)/.18))}px,${-120*(1-eo((t-53.4)/.18))}px)`;st(o.lab,slide(t,52.2,0,50));
}});

// 9a GUNA PELUANG DENGAN BIJAK — checklist (kad kiri)
scene({s:55.72,e:62.22,build(R,o){
  o.h=E(R,'left:662px;top:296px;width:278px;font:900 30px Mont;line-height:1.1','HARGA TURUN?<br><span class="gold" style="font-size:44px">GUNA<br>PELUANG</span> 💡','g sh');
  const it=[['🧠','DENGAN','BIJAK'],['💰','IKUT','KEMAMPUAN'],['⚖️','GRAM DEMI','GRAM']];
  o.it=it.map(([e,a,b],i)=>E(R,`left:662px;top:${540+i*170}px;width:270px;height:145px`,`<div class="card" style="position:absolute;inset:0;display:flex;align-items:center;gap:8px;padding-left:12px"><div style="font-size:40px">${e}</div><div style="font:800 24px Mont;color:#ddd;line-height:1.1">${a}<br><span class="gold" style="font:900 30px Mont">${b}</span></div></div><div class="ck" style="position:absolute;right:-8px;top:-14px;width:44px;height:44px;border-radius:50%;background:#2ecc71;color:#fff;font:900 30px Mont;display:flex;align-items:center;justify-content:center">✓</div>`));
},upd(t,o){st(o.h,slide(t,56.0,80,0));const ts=[58.7,60.1,61.3];
  o.it.forEach((el,i)=>{st(el,slide(t,ts[i],120,0,.35));el.querySelector('.ck').style.transform=`scale(${t<ts[i]+.3?0:ob((t-ts[i]-.3)/.3)})`});
}});

// 9b BUKAN MENANG TEKA HARGA / CUKUPKAN SIMPANAN
scene({s:62.22,e:67.98,build(R,o){
  o.h=E(R,'left:60px;right:140px;top:270px;text-align:center;font:900 58px Mont;white-space:nowrap','<span style="color:#fff">MATLAMAT KITA</span> 🎯','g sh');
  o.a=E(R,'left:74px;top:560px;width:230px;height:300px','<div class="card" style="position:absolute;inset:0;border-color:#ff5a5a;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center"><div style="font-size:80px">🎲</div><div style="font:900 30px Mont;color:#ff8080;line-height:1.1">MENANG<br>TEKA HARGA</div></div><div id="xx" style="position:absolute;inset:0;display:flex;align-items:center;justify-content:center;font:900 260px Mont;color:#ff3b3b;line-height:1">✕</div>');
  o.b=E(R,'left:696px;top:560px;width:230px;height:300px','<div class="card" style="position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;gap:8px"><div id="gbs" style="position:relative;width:170px;height:100px"></div><div style="font:900 28px Mont;line-height:1.1;color:#fff">CUKUPKAN<br><span class="gold" style="font-size:32px">SIMPANAN<br>EMAS</span></div></div><div class="ck" style="position:absolute;right:-6px;top:-16px;width:54px;height:54px;border-radius:50%;background:#2ecc71;color:#fff;font:900 38px Mont;display:flex;align-items:center;justify-content:center">✓</div>');
  const gbs=o.b.querySelector('#gbs');[[10,46],[80,46],[45,0]].forEach(([x,y])=>gbs.insertAdjacentHTML('beforeend',`<div class="gbx" style="position:absolute;left:${x-10}px;top:${y}px">${goldBar(80,42,8)}</div>`));
},upd(t,o){st(o.h,slide(t,62.3,0,-40));st(o.a,mix(pop(t,63.6),{r:-2}));
  const x=o.a.querySelector('#xx');x.style.opacity=cl((t-64.75)/.08);x.style.transform=`scale(${t<64.75?2:lerp(2,1,eo((t-64.75)/.15))})`;
  st(o.b,mix(pop(t,66.2),{r:2}));o.b.querySelectorAll('.gbx').forEach((g,i)=>g.style.transform=`scale(${t<66.4+i*.15?0:ob((t-66.4-i*.15)/.3)})`);
  o.b.querySelector('.ck').style.transform=`scale(${t<67.1?0:ob((t-67.1)/.3)})`;
}});

// 10 CTA: save, share, link di bio (kad atas)
scene({s:67.98,e:99,build(R,o){
  o.l=E(R,'left:60px;top:330px;width:190px;text-align:center;font:900 34px Mont;line-height:1.1','<div style="font-size:72px">💛</div><span style="color:#fff">BERMANFAAT?</span>','g sh');
  const btn=(x,y,w,ic,tx,id)=>E(R,`left:${x}px;top:${y}px;width:${w}px;height:120px`,`<div class="card" style="position:absolute;inset:0;border-radius:60px;display:flex;align-items:center;justify-content:center;gap:14px;font:900 46px Mont;white-space:nowrap"><span>${ic}</span><span class="gold">${tx}</span></div><div class="fg" style="position:absolute;right:20px;bottom:-40px;font-size:70px;opacity:0">👆</div>`);
  o.save=btn(62,1000,420,'🔖','SAVE');o.share=btn(518,1000,420,'📤','SHARE');
  o.bio=btn(262,1000,560,'🔗','LINK DI BIO');
  o.end=E(R,'left:750px;top:330px;width:188px;text-align:center;font:900 30px Mont;line-height:1.1','<div style="font-size:72px">👭</div><span style="color:#fff">KONGSI KE</span><br><span class="gold">RAKAN</span>','g sh');
},upd(t,o){st(o.l,pop(t,68.6));st(o.end,pop(t,72.3));
  const out=t>74.6?1-cl((t-74.6)/.2):1;
  st(o.save,mix(pop(t,71.1),{o:out,s:t>71.25&&t<71.45?.92:1}));st(o.share,mix(pop(t,71.7),{o:out,s:t>71.85&&t<72.05?.92:1}));
  o.save.querySelector('.fg').style.opacity=t>71.15&&t<72?1:0;o.share.querySelector('.fg').style.opacity=t>71.75&&t<72.6?1:0;
  st(o.bio,mix(pop(t,74.85),{s:t>75.4&&t<75.6?.92:1+.03*Math.sin(t*7)}));o.bio.querySelector('.fg').style.opacity=t>75.2?1:0;
  o.bio.querySelector('.fg').style.transform=`translateY(${Math.abs(Math.sin(t*5))*-14}px)`;
}});

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
const FL=[1.7,6.92,8.6,15.25,23.9,30.5,35.75,45.75,50.75,53.35,55.7,62.2,64.75,67.95];
const FLASH=$('#flash');

window.render=async function(t){
  const f=Math.min(window.NF||1e9,Math.max(1,Math.round(t*FPS)+1));
  const src=`${FR}/${String(f).padStart(5,'0')}.jpg`;
  if(V.getAttribute('src')!==src){V.src=src;await V.decode().catch(()=>{})}
  const l=layoutAt(t);VB.style.left=l.x+'px';VB.style.top=l.y+'px';VB.style.width=1080*l.s+'px';VB.style.height=1920*l.s+'px';VB.style.borderRadius=l.r+'px';
  V.style.width=1080*l.s+'px';V.style.height=1920*l.s+'px';
  Object.assign(VBR.style,{left:l.x-5+'px',top:l.y-5+'px',width:1080*l.s+'px',height:1920*l.s+'px',borderRadius:l.r+5+'px',opacity:l.b});
  bgUpd(t);
  for(const s of SC){const vis=t>=s.s-.001&&t<s.e;s.root.style.display=vis?'block':'none';if(vis){const fo=cl((s.e-t)/.18);s.root.style.opacity=fo;s.upd(t,s)}}
  capUpd(t);
  let fl=0;for(const x of FL){if(t>=x&&t<x+.25)fl=Math.max(fl,.55*(1-(t-x)/.25))}FLASH.style.opacity=fl;
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
