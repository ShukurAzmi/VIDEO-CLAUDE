
// ---------- babak v2 (kurang effect, lebih green screen, grade Kamal): "PG Jewel — Public Gold kini ada barang kemas" (masa ditulis dalam MASA SUMBER, ditukar dengan S()) ----------
const S=x=>fromSrc(x,SEGS,OFFS);
const FACE=[370,660];
const L={FULL:{x:0,y:0,s:1,r:0,b:0},PUNCH:{x:FACE[0]*(1-1.08),y:FACE[1]*(1-1.08)+20,s:1.08,r:0,b:0}};
// DIGITAL ZOOM: 4 kali sahaja, lembut 1.08x, senyap
const LT=[[0,'FULL'],[S(11.9),'PUNCH',.8],[S(13.8),'FULL',.6],[S(26.85),'PUNCH',.8],[S(29.3),'FULL',.6],[S(57.1),'PUNCH',.8],[S(59.15),'FULL',.6],[S(78.1),'PUNCH',.8],[S(80.3),'FULL',.6]];
function layoutAt(t){let cur=L.FULL,prev=L.FULL,k=1;
  for(let i=0;i<LT.length;i++){const [s,n,d=.3]=LT[i];if(t>=s){prev=i?L[LT[i-1][1]]:L.FULL;cur=L[n];k=eio((t-s)/d)}}
  const o={};for(const p of['x','y','s','r','b'])o[p]=lerp(prev[p],cur[p],k);return o}
// FREEZE (masa output, tempoh)
const FRZ=[[S(11.3),.85],[S(46.75),.85]];

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

// 1 (nob) HEADLINE — muka jelas dulu, tajuk kaca kecil
scene({s:S(2.25),e:S(4.75),nob:1,build(R,o){
  o.h=E(R,'left:110px;top:330px;width:700px;height:150px',glass(`<div style="display:flex;flex-direction:column;align-items:center;justify-content:center;height:100%;line-height:1.15"><div style="font:800 38px Mont;color:#fff">SELAMA NI PUBLIC GOLD =</div><div style="font:900 54px Mont">${goldTx('GOLD BAR SAJA? 🤔',54)}</div></div>`,'border-radius:30px'));
},upd(t,o){st(o.h,mix(slide(t,o.s,0,-60),{o:outF(t,o.e)}))}});

// 2 BEFORE / AFTER — "gold bar dan dinar saja ... sekarang boleh keluarkan barang kemas"
scene({s:S(4.8),e:S(10.35),build(R,o){
  o.h=title(R,330,`${goldTx('DULU',66)} <span style="color:#fff">vs</span> ${goldTx('SEKARANG',66)}`,66);
  o.box=E(R,'left:180px;top:440px;width:680px;height:790px',`<div style="position:absolute;inset:0;border-radius:28px;overflow:hidden;border:5px solid #E8B830;box-shadow:0 18px 50px rgba(0,0,0,.7)">
   <div class="aft" style="position:absolute;inset:0"><img src="img/p_gelang.jpg" style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover;object-position:50% 45%">${SHN}${TW()}
     <div style="position:absolute;right:22px;top:22px;background:#2ecc71;color:#fff;font:900 38px Mont;padding:8px 24px;border-radius:40px">SEKARANG ✓</div>
     <div style="position:absolute;left:0;right:0;bottom:0;padding:26px 0;text-align:center;background:linear-gradient(transparent,rgba(0,0,0,.85));font:900 54px Mont;color:#fff">+ BARANG KEMAS 💍</div></div>
   <div class="bef" style="position:absolute;inset:0;background:#0b0803">
     <img src="img/goldbar.jpg" style="position:absolute;left:0;top:0;width:100%;height:50%;object-fit:cover;object-position:40% 55%">
     <img src="img/dinar.jpg" style="position:absolute;left:0;top:50%;width:100%;height:50%;object-fit:cover;object-position:50% 55%;border-top:4px solid #E8B830">
     <div style="position:absolute;left:22px;top:22px;background:#555;color:#fff;font:900 38px Mont;padding:8px 24px;border-radius:40px">DULU</div>
     <div style="position:absolute;left:22px;top:calc(50% - 70px);background:rgba(0,0,0,.75);color:#fff;font:900 40px Mont;padding:6px 20px;border-radius:14px">GOLD BAR</div>
     <div style="position:absolute;left:22px;bottom:22px;background:rgba(0,0,0,.75);color:#fff;font:900 40px Mont;padding:6px 20px;border-radius:14px">DINAR</div></div>
   <div class="ln" style="position:absolute;top:0;bottom:0;width:8px;margin-left:-4px;background:#fff;box-shadow:0 0 20px #FFE680"><div style="position:absolute;top:50%;left:50%;width:84px;height:84px;margin:-42px;border-radius:50%;background:#fff;color:#3a2600;font:900 40px Mont;display:flex;align-items:center;justify-content:center">⇆</div></div></div>`);
},upd(t,o){st(o.h,slide(t,o.s,0,-40));st(o.box,pop(t,o.s+.1,.45));
  const k=eio((t-S(8.75))/.9);const x=lerp(100,0,k);o.box.querySelector('.bef').style.clipPath=`inset(0 ${100-x}% 0 0)`;
  const ln=o.box.querySelector('.ln');ln.style.left=x+'%';ln.style.opacity=k>0&&k<1?1:0;shine(o.box,t,S(9.5));kb(o.box,t,S(8.75))}});

// 3 (nob) FREEZE & LABEL + GLASS TAG + ZOOM — Adila tunjuk rantai
scene({s:S(10.6),e:S(14.0),nob:1,build(R,o){
  o.br=brk(R,'left:400px;top:820px;width:340px;height:450px');
  o.lb=E(R,'left:100px;top:1040px;width:280px;height:150px',`<div class="card" style="position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;font:900 40px Mont;white-space:nowrap;line-height:1.1"><span>📸 RANTAI</span>${goldTx('EMAS 916',40)}</div>`);
  o.gt=E(R,'left:560px;top:560px;width:330px;height:190px',glass(`<div style="display:flex;flex-direction:column;align-items:center;justify-content:center;height:100%;line-height:1.15"><div style="font:900 52px Mont">${goldTx('PG JEWEL',52)}</div><div style="font:700 28px Mont;color:#fff">by Public Gold ✦</div></div>`,'border-radius:28px'));
},upd(t,o){const f=FRZ[0][0],fe=f+FRZ[0][1];st(o.br,{o:t<f?0:cl(1-(t-fe-.4)/.2),s:t<f?0:ob((t-f)/.3)});st(o.lb,mix(slide(t,f+.12,-60,0),{o:cl(1-(t-fe-.6)/.2)}));
  st(o.gt,mix(pop(t,S(11.94),.45),{y:wob(t,6,.5),o:outF(t,o.e)}))}});

// 4 (nob) GREEN SCREEN A — "satu lagi pilihan" (latar: IMG_5630)
scene({s:S(14.0),e:S(17.95),nob:1,build(R,o){o.a=topPill(R,gtag(`SATU LAGI ${goldTx('PILIHAN',48)} ✨`,48));
  o.b=E(R,'left:560px;top:880px;width:320px;height:110px',`<div class="glass" style="position:absolute;inset:0;border-radius:55px;display:flex;align-items:center;justify-content:center;font:900 38px Mont;color:#fff;white-space:nowrap">💍 BARANG KEMAS</div>`);
},upd(t,o){st(o.a,mix(pop(t,o.s+.3,.45),{y:wob(t,5,.4)}));st(o.b,mix(pop(t,S(14.72),.4),{y:wob(t,6,.5,.3)}))}});

// 5 CHECKLIST + CHECK GROW — "kumpul emas dalam bentuk gold bar dan dinar"
scene({s:S(18.0),e:S(21.4),build(R,o){
  o.c=E(R,'left:130px;top:400px;width:740px;height:760px',card(''));
  o.h=E(R,'left:130px;top:440px;width:740px;text-align:center;font:900 52px Mont;white-space:nowrap',`SEBELUM NI ${goldTx('KITA KUMPUL',52)}`);
  o.r=[['img/goldbar.jpg','40% 50%','GOLD BAR',S(20.48)],['img/dinar.jpg','50% 45%','DINAR',S(20.96)],['img/p_gelang.jpg','50% 45%','BARANG KEMAS?',S(21.2)]].map(([src,pos,tx,t0],i)=>{const el=E(R,`left:170px;top:${570+i*185}px;width:660px;height:150px`,`<div class="card" style="position:absolute;inset:0;border-radius:24px"></div><div style="position:absolute;left:16px;top:15px;width:120px;height:120px">${imgTile(src,pos)}</div><div style="position:absolute;left:160px;top:0;height:150px;display:flex;align-items:center;font:900 46px Mont;color:${i==2?'#aaa':'#fff'};white-space:nowrap">${tx}</div><div style="position:absolute;right:22px;top:25px;width:100px;height:100px">${i<2?ckSvg(100):''}</div>`);el.t0=t0;return el});
},upd(t,o){st(o.c,pop(t,o.s,.4));st(o.h,slide(t,o.s+.1,0,-30));o.r.forEach((el,i)=>{st(el,slide(t,o.s+.25+i*.15,-80,0));ckUpd(el,t,el.t0)})}});

// 6 (nob) GREEN SCREEN B — "sekarang ada pilihan ... ketulenan 916 dan 999" (latar: IMG_5629)
scene({s:S(21.42),e:S(27.2),nob:1,build(R,o){o.a=topPill(R,gtag(`SEKARANG DI ${goldTx('PG JEWEL',48)}`,48));
  const tg=(n,sub)=>`<div class="glass" style="position:absolute;inset:0;border-radius:28px;display:flex;flex-direction:column;align-items:center;justify-content:center;line-height:1"><div style="font:900 76px Mont">${goldTx(n,76)}</div><div style="font:800 26px Mont;color:#fff;margin-top:6px">${sub}</div></div>`;
  o.x=E(R,'left:110px;top:800px;width:250px;height:170px',tg('916','EMAS 22K'));o.y=E(R,'left:640px;top:860px;width:250px;height:170px',tg('999','EMAS 24K'));
},upd(t,o){st(o.a,mix(pop(t,o.s+.3,.45),{y:wob(t,5,.4),o:outF(t,o.e)}));st(o.x,mix(pop(t,S(24.95),.4),{y:wob(t,6,.5)}));st(o.y,mix(pop(t,S(26.34),.4),{y:wob(t,6,.5,.4)}))}});

// 7 (nob, zoom) — "Kenapa ini menarik untuk saya?"
scene({s:S(26.85),e:S(29.4),nob:1,build(R,o){o.a=topPill(R,gtag('KENAPA MENARIK? 🤔',46))},upd(t,o){st(o.a,mix(slide(t,o.s,0,-40),{o:outF(t,o.e)}))}});

// 8 LOGO PUBLIC GOLD — "kumpul gold bar untuk simpanan jangka masa panjang"
scene({s:S(34.54),e:S(39.3),build(R,o){
  o.h=title(R,330,`GOLD BAR = ${goldTx('SIMPANAN',64)}`,64);
  o.lg=E(R,'left:210px;top:470px;width:600px;height:600px',`<div class="ph" style="position:absolute;inset:0;border-radius:30px;overflow:hidden;border:5px solid #E8B830;box-shadow:0 18px 50px rgba(0,0,0,.7),0 0 40px rgba(245,197,66,.35)"><img src="img/pglogo.png" style="width:100%;height:100%">${SHN}${TW()}</div>`);
  o.ft=topPill(R,gtag('⏳ JANGKA MASA PANJANG',44),44,1130);
},upd(t,o){st(o.h,slide(t,o.s,0,-40));st(o.lg,mix(pop(t,o.s+.15,.45),{y:wob(t,6,.35)}));flip(o.lg,t,o.s+.15);kb(o.lg,t,o.s+.4,1,1.04);shine(o.lg,t,o.s+.8);st(o.ft,pop(t,S(38.0),.4))}});

// 9 FRAME BREAK — "ada pula yang suka barang kemas"
scene({s:S(40.4),e:S(44.15),build(R,o){
  o.h=title(R,330,`SUKA ${goldTx('BARANG KEMAS',62)} 💍`,58);
  o.fr=E(R,'left:290px;top:680px;width:470px;height:660px;border-radius:24px;overflow:hidden;border:8px solid #E8B830;box-shadow:0 20px 60px rgba(0,0,0,.7)',`<img src="img/p_adila_gelang.jpg" style="position:absolute;left:-98px;top:-388px;width:680px;height:1209px">${SHN}`);
  o.cut=E(R,'left:192px;top:300px;width:680px;height:1209px;clip-path:inset(20% 0 25% 0)',`<img src="img/cut_adila_gelang.png" style="width:680px;height:1209px">`,'g bgx');
},upd(t,o){st(o.h,slide(t,o.s,0,-40));st(o.fr,pop(t,o.s+.1,.45));const k=eo((t-o.s-.55)/.6);o.cut.style.opacity=cl((t-o.s-.5)/.15);o.cut.style.transform=`translate(8px,${lerp(30,0,k)}px) scale(${lerp(.96,1,k)})`;shine(o.fr,t,o.s+1)}});

// 10 (nob) FREEZE & LABEL — "rasa benda tu cantik" (gelang di tangan)
scene({s:S(46.6),e:S(48.3),nob:1,build(R,o){
  o.br=brk(R,'left:450px;top:930px;width:340px;height:380px');
  o.lb=E(R,'left:100px;top:960px;width:300px;height:150px',`<div class="card" style="position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;font:900 40px Mont;white-space:nowrap;line-height:1.1"><span>✨ GELANG</span>${goldTx('EMAS 916',40)}</div>`);
},upd(t,o){const f=FRZ[1][0],fe=f+FRZ[1][1];st(o.br,{o:t<f?0:cl(1-(t-fe-.4)/.2),s:t<f?0:ob((t-f)/.3)});st(o.lb,mix(slide(t,f+.12,-60,0),{o:outF(t,o.e)}))}});

// 11 (nob) GREEN SCREEN C — "PG Jewel memberikan pilihan tambahan" (latar: IMG_5629 cincin)
scene({s:S(48.34),e:S(54.37),nob:1,build(R,o){o.a=E(R,'left:150px;top:330px;width:620px;height:170px',glass(`<div style="display:flex;flex-direction:column;align-items:center;justify-content:center;height:100%;line-height:1.15"><div style="font:900 60px Mont">${goldTx('PG JEWEL',60)}</div><div style="font:800 34px Mont;color:#fff">PILIHAN TAMBAHAN ✨</div></div>`,'border-radius:30px'));
  o.b=E(R,'left:560px;top:900px;width:320px;height:110px',`<div class="glass" style="position:absolute;inset:0;border-radius:55px;display:flex;align-items:center;justify-content:center;font:900 38px Mont;color:#fff;white-space:nowrap">💍 BARANG KEMAS</div>`);
},upd(t,o){st(o.a,mix(pop(t,S(48.76),.45),{y:wob(t,5,.4),o:outF(t,o.e)}));st(o.b,mix(pop(t,S(53.1),.4),{y:wob(t,6,.5)}))}});

// 12 (nob, zoom) — "Tapi satu perkara yang saya nak pesan"
scene({s:S(57.1),e:S(59.2),nob:1,build(R,o){o.a=topPill(R,pill('☝️ PESANAN PENTING','rgba(120,20,20,.9)','#fff','#ff8a8a',42))},upd(t,o){st(o.a,mix(slide(t,o.s,0,-30),{o:outF(t,o.e)}))}});

// 13 (nob) — "...tanpa kita fahami" (nota marker sahaja; bulatan & "CANTIK JE?" dibuang)
scene({s:S(62.4),e:S(64.2),nob:1,build(R,o){o.a=topPill(R,`<div style="display:inline-block;background:#FFE680;color:#2a1d00;font:400 56px Marker;padding:10px 40px;border-radius:8px;transform:rotate(-2deg);box-shadow:0 10px 24px rgba(0,0,0,.5)">FAHAMI DULU! ✍️</div>`)},upd(t,o){st(o.a,mix(pop(t,S(62.58),.4),{o:outF(t,o.e)}))}});

// 14 CHECKLIST + CHECK GROW — "ketulenan, harga belian dan spread sebelum membuat keputusan"
scene({s:S(64.29),e:S(68.4),build(R,o){
  o.c=E(R,'left:130px;top:340px;width:740px;height:950px',card(''));
  o.h=E(R,'left:130px;top:380px;width:740px;text-align:center;font:900 52px Mont;white-space:nowrap',`📋 SEMAK ${goldTx('SEBELUM BELI',52)}`);
  o.r=[['🔍','KETULENAN','916 / 999',S(64.3)],['🏷️','HARGA BELIAN','ikut harga semasa',S(64.94)],['↔️','SPREAD','beza harga beli & jual',S(66.0)]].map(([em,tx,sub,t0],i)=>{const el=E(R,`left:170px;top:${500+i*190}px;width:660px;height:160px`,`<div class="card" style="position:absolute;inset:0;display:flex;align-items:center;gap:20px;padding-left:28px;border-radius:24px"><span style="font-size:58px">${em}</span><div style="line-height:1.1"><div style="font:900 46px Mont;color:#fff;white-space:nowrap">${tx}</div><div style="font:700 28px Mont;color:#E8C870">${sub}</div></div></div><div style="position:absolute;right:22px;top:30px;width:100px;height:100px">${ckSvg(100)}</div>`);el.t0=t0+.35;return el});
  o.big=E(R,'left:400px;top:1080px;width:200px;height:200px',ckSvg(200,'#F5C542'));
},upd(t,o){st(o.c,pop(t,o.s,.4));st(o.h,slide(t,o.s+.05,0,-30));o.r.forEach((el,i)=>{st(el,slide(t,o.s+.15+i*.12,-80,0));ckUpd(el,t,el.t0)});
  const g=S(67.38);const c=o.big.querySelector('.cks');const k=eo((t-g)/.5);ckUpd(o.big,t,g);c.style.transform=`scale(${t<g?0:lerp(.2,1,k)})`;o.big.style.opacity=t<g?0:1}});

// 15 (nob) GREEN SCREEN D — "tak kisahlah gold bar ke, dinar ke, barang kemas" (latar: IMG_5729)
scene({s:S(68.5),e:S(73.6),nob:1,build(R,o){
  o.h=topPill(R,gtag('TAK KISAHLAH…',42));
  o.i=[['img/goldbar.jpg','40% 50%','GOLD BAR',S(71.1)],['img/dinar.jpg','50% 45%','DINAR',S(71.58)],['img/p_gelang.jpg','50% 45%','BARANG KEMAS',S(72.7)]].map(([src,pos,tx,t0],i)=>{const el=E(R,`left:${[110,375,640][i]}px;top:440px;width:250px;height:300px`,`<div class="glass" style="position:absolute;inset:0;border-radius:26px"></div><div style="position:absolute;left:15px;top:15px;width:220px;height:200px">${imgTile(src,pos)}</div><div style="position:absolute;left:0;right:0;top:226px;text-align:center;font:900 ${i==2?29:34}px Mont;color:#fff;white-space:nowrap">${tx}</div>`);el.t0=t0;return el});
},upd(t,o){st(o.h,slide(t,o.s,0,-30));o.i.forEach(el=>st(el,mix(pop(t,el.t0,.4),{y:wob(t,5,.5,el.t0)})))}});

// 16 HEADLINE — "Yang penting beli emas dengan berilmu. Bukan ikut emosi"
scene({s:S(73.46),e:S(77.95),build(R,o){
  o.a=E(R,'left:90px;right:180px;top:440px;text-align:center;font:900 90px Mont;color:#fff;white-space:nowrap','YANG PENTING','g sh');
  o.b=E(R,'left:90px;right:180px;top:575px;text-align:center;white-space:nowrap',goldTx('BELI EMAS',120),'g sh');
  o.c=E(R,'left:90px;right:180px;top:735px;text-align:center;white-space:nowrap',`<span style="font:900 96px Mont;color:#fff">DENGAN </span>${goldTx('ILMU',110)}`,'g sh');
  o.d=E(R,'left:210px;top:950px;width:580px;height:150px',`<div style="position:absolute;inset:0;display:flex;align-items:center;justify-content:center;font:900 80px Mont;color:#bbb;white-space:nowrap">BUKAN EMOSI</div><svg width="580" height="150" style="position:absolute;inset:0;overflow:visible"><path class="mp" d="M10 90 C 200 60, 400 100, 570 62" stroke="#FF4D4D" stroke-width="14" stroke-linecap="round" fill="none" stroke-dasharray="3000" stroke-dashoffset="3000"/></svg>`);
},upd(t,o){st(o.a,slide(t,o.s,0,-40));st(o.b,pop(t,S(74.38),.45));st(o.c,pop(t,S(75.14),.4));st(o.d,slide(t,S(76.16),0,40));mkUpdC(o.d,t,S(76.74),.4)}});

// 17 CTA — "nak tahu lebih lanjut tentang PG Jewel ... klik link di bawah"
scene({s:S(80.42),e:S(83.2)+.5,build(R,o){
  o.ph=E(R,'left:260px;top:360px;width:480px;height:540px',photo('img/p_adila_rantai.jpg',[680,-120,-40]));
  o.gt=E(R,'left:200px;top:850px;width:600px;height:160px',glass(`<div style="display:flex;flex-direction:column;align-items:center;justify-content:center;height:100%;line-height:1.1"><div style="font:900 66px Mont">${goldTx('PG JEWEL',66)}</div><div style="font:700 30px Mont;color:#fff">nak tahu lebih lanjut?</div></div>`,'border-radius:34px'));
  o.btn=E(R,'left:180px;top:1060px;width:640px;height:130px',`<div style="position:absolute;inset:0;border-radius:65px;background:linear-gradient(180deg,#FFE680,#E8B830);box-shadow:0 12px 30px rgba(0,0,0,.6),0 0 30px rgba(245,197,66,.5);display:flex;align-items:center;justify-content:center;font:900 52px Mont;color:#2a1d00;white-space:nowrap">KLIK LINK DI BAWAH</div><div class="fg" style="position:absolute;right:30px;top:60px;font-size:80px">👆</div>`);
},upd(t,o){st(o.ph,pop(t,o.s,.45));flip(o.ph,t,o.s);kb(o.ph,t,o.s);shine(o.ph,t,o.s+.6);st(o.gt,pop(t,S(80.78),.4));
  st(o.btn,mix(pop(t,S(82.34),.35),{s:t>S(82.64)&&t<S(82.64)+.15?.95:1+.02*Math.sin(t*7)}));const fg=o.btn.querySelector('.fg');fg.style.opacity=t>S(82.5)?1:0;fg.style.transform=`translateY(${Math.abs(Math.sin(t*5))*-14}px)`}});

