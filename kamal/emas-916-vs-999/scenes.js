// ---------- babak: "Emas 916 vs 999 — ketulinan & spread value" (masa = output selepas potong) ----------
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

// B1 (2.35) 916 POPULAR vs 999 SPREAD RENDAH — KENAPA?
scene({s:2.35,e:4.75,build(R,o){
  o.b1=E(R,'left:170px;top:400px;width:260px;height:260px',badge('916',260));
  o.vs=E(R,'left:440px;top:470px;width:120px;text-align:center;font:900 80px Play;color:#fff','vs','g sh');
  o.b2=E(R,'left:570px;top:400px;width:260px;height:260px',badge('999',260));
  o.l1=E(R,'left:110px;top:700px;width:380px;height:200px',card(`<div style="text-align:center;padding-top:22px;line-height:1.1"><div style="font-size:64px">💛</div><div class="gold" style="font:900 36px Mont;white-space:nowrap">LEBIH POPULAR</div></div>`));
  o.l2=E(R,'left:510px;top:700px;width:380px;height:200px',card(`<div style="text-align:center;padding-top:22px;line-height:1.1"><div style="font:900 34px Mont;color:#ddd;white-space:nowrap">📉 SPREAD</div><div class="gold" style="font:900 38px Mont;white-space:nowrap">LEBIH RENDAH</div></div>`));
  o.q=E(R,'left:60px;right:140px;top:960px;text-align:center;white-space:nowrap',pill('KENAPA? 🤔','#5a1414','#fff','#ff6b6b',70),'g');
},upd(t,o){const f=outF(t,o.e);st(o.b1,mix(pop(t,2.4),{o:f,r:-6+wob(t,3,.6)}));st(o.vs,mix(pop(t,2.55),{o:f}));st(o.b2,mix(pop(t,2.7),{o:f,r:6+wob(t,3,.6,.3)}));
  st(o.l1,mix(slide(t,2.6,0,80,.4),{o:f}));st(o.l2,mix(slide(t,3.37,0,80,.4),{o:f}));st(o.q,mix(pop(t,4.15,.35),{o:f,s:1+.04*Math.sin(t*9)}));
}});

// B2 PERBEZAAN UTAMA → KETULINAN
scene({s:6.6,e:9.75,build(R,o){
  o.h=E(R,'left:60px;right:140px;top:300px;text-align:center;white-space:nowrap;line-height:1.05','<div style="font:800 50px Mont;color:#ddd">PERBEZAAN UTAMA</div><div style="font:900 84px Mont;color:#fff">916 <span style="font:700 italic 70px Play;color:#ddd">vs</span> <span class="gold">999</span></div>','g sh');
  o.bar=E(R,'left:310px;top:640px;width:380px;height:180px;overflow:hidden;border-radius:10px','<div class="bar" style="width:380px;height:180px;font-size:42px;flex-direction:column">PUBLIC GOLD<span style="font-size:30px;opacity:.8;margin-top:6px">999.9</span></div>'+SHN);
  o.mg=E(R,'left:620px;top:600px;width:260px;height:260px;font-size:230px;line-height:1','🔍');
  o.k=E(R,'left:60px;right:140px;top:900px;text-align:center;white-space:nowrap',goldTx('KETULINAN',120),'g sh');
  o.k2=E(R,'left:60px;right:140px;top:1060px;text-align:center;white-space:nowrap;font:800 44px Mont;color:#ddd','(KADAR EMAS TULIN)','g sh');
},upd(t,o){const f=outF(t,o.e);st(o.h,mix(pop(t,6.65),{o:f}));st(o.bar,mix(slide(t,7.0,0,100,.45),{o:f,r:-3}));shine(o.bar,t,8.81);
  st(o.mg,mix(slide(t,7.4,200,-60,.5),{o:f,x:wob(t,18,.7),y:wob(t,12,.9,.2),r:-10}));
  st(o.k,mix(pop(t,8.81,.4),{o:f}));st(o.k2,mix(pop(t,9.05),{o:f}));
}});

// B3a EMAS 916 = 91.6% EMAS TULIN (tiub isi)
scene({s:9.85,e:14.6,build(R,o){
  o.h=E(R,'left:60px;right:140px;top:290px;text-align:center;white-space:nowrap','<span style="font:900 88px Mont;color:#fff">EMAS </span>'+goldTx('916',96),'g sh');
  o.tb=E(R,'left:170px;top:430px;width:260px;height:700px',tube('916'));
  o.n=E(R,'left:470px;top:560px;width:430px;text-align:left;white-space:nowrap;line-height:1','<div class="gold" style="font:900 130px Mont"><span class="nv">0.0</span>%</div><div style="font:900 50px Mont;color:#fff;margin-top:10px">EMAS TULIN</div>','g sh');
  o.al=E(R,'left:470px;top:880px;width:430px;white-space:nowrap;font:800 36px Mont;color:#bbb;line-height:1.2','⚙️ 8.4% LOGAM LAIN<br><span style="font-size:30px;color:#999">(campuran supaya kuat)</span>','g sh');
},upd(t,o){const f=outF(t,o.e);st(o.h,mix(pop(t,9.9),{o:f}));st(o.tb,mix(slide(t,10.0,-120,0,.45),{o:f}));tubeUpd(o.tb,t,10.9,91.6);
  st(o.n,mix(pop(t,10.9),{o:f}));o.n.querySelector('.nv').textContent=cnt(t,10.9,91.6);st(o.al,mix(slide(t,12.3,80,0),{o:f}));
}});

// (muka jelas 14.65–17.0) manakala emas 999…
// B3b 916 vs 999 — dua tiub
scene({s:17.0,e:21.0,build(R,o){
  o.h=E(R,'left:60px;right:140px;top:280px;text-align:center;white-space:nowrap',goldTx('KANDUNGAN EMAS TULIN',54),'g sh');
  o.t1=E(R,'left:220px;top:400px;width:220px;height:640px',tube('916'));
  o.t2=E(R,'left:580px;top:400px;width:220px;height:640px',tube('999'));
  o.n1=E(R,'left:170px;top:1070px;width:320px;text-align:center;font:900 76px Mont;color:#fff','91.6%','g sh');
  o.n2=E(R,'left:530px;top:1070px;width:320px;text-align:center;white-space:nowrap','<span class="gold" style="font:900 84px Mont"><span class="nv">0.0</span>%</span>','g sh');
  o.up=E(R,'left:820px;top:430px;width:100px;font-size:80px','⬆️');
},upd(t,o){const f=outF(t,o.e);st(o.h,mix(pop(t,17.05),{o:f}));st(o.t1,{o:f*cl((t-17.0)/.2)});tubeUpd(o.t1,t,16.0,91.6,.01);st(o.n1,{o:f*cl((t-17.0)/.2)});
  st(o.t2,mix(slide(t,17.1,150,0,.4),{o:f}));tubeUpd(o.t2,t,17.49,99.9);st(o.n2,mix(pop(t,17.49),{o:f}));o.n2.querySelector('.nv').textContent=cnt(t,17.49,99.9);
  st(o.up,mix(pop(t,18.6),{o:f,y:wob(t,12,1.2)}));
}});

// B4 BERAT SAMA ⚖️ — 999 lebih banyak emas tulin
const pan=(lb)=>`<div style="position:absolute;left:0;top:0;width:260px;height:220px"><div style="position:absolute;left:127px;top:0;width:6px;height:120px;background:#E8B830"></div>
  <div style="position:absolute;left:0;top:118px;width:260px;height:18px;border-radius:0 0 130px 130px;background:linear-gradient(#FFE680,#C8901A)"></div>
  <div class="bar" style="position:absolute;left:40px;top:40px;width:180px;height:78px;font-size:46px">${lb}</div></div>`;
scene({s:22.3,e:27.3,build(R,o){
  o.h=E(R,'left:60px;right:140px;top:290px;text-align:center;white-space:nowrap;line-height:1.05','<div style="font:900 84px Mont;color:#fff">⚖️ BERAT <span class="gold">SAMA</span></div>','g sh');
  o.sc=E(R,'left:150px;top:470px;width:700px;height:520px',`<div style="position:absolute;left:340px;top:90px;width:20px;height:380px;background:linear-gradient(90deg,#B8860B,#FFE680,#B8860B);border-radius:8px"></div>
    <div style="position:absolute;left:250px;top:450px;width:200px;height:40px;border-radius:20px 20px 6px 6px;background:linear-gradient(#FFE680,#B8860B)"></div>
    <div class="beam" style="position:absolute;left:0;top:80px;width:700px;height:520px;transform-origin:350px 18px">
      <div style="position:absolute;left:20px;top:8px;width:660px;height:20px;border-radius:10px;background:linear-gradient(#FFF0B0,#C8901A)"></div>
      <div class="p1" style="position:absolute;left:-90px;top:20px">${pan('916')}</div><div class="p2" style="position:absolute;left:530px;top:20px">${pan('999')}</div></div>`);
  o.c=E(R,'left:110px;top:1010px;width:780px;height:150px',card(`<div style="text-align:center;padding-top:18px;line-height:1.15;white-space:nowrap"><div style="font:800 36px Mont;color:#ddd">KANDUNGAN EMAS TULIN</div><div style="font:900 50px Mont;color:#fff"><span class="gold">999</span> LEBIH TINGGI ✓</div></div>`));
},upd(t,o){const f=outF(t,o.e);st(o.h,mix(pop(t,22.35),{o:f}));st(o.sc,mix(slide(t,22.5,0,120,.45),{o:f}));
  const a=t<26.44?6*Math.sin((t-22.5)*3)*Math.max(0,1-(t-22.5)/3.5):0;o.sc.querySelector('.beam').style.transform=`rotate(${a}deg)`;
  o.sc.querySelectorAll('.p1,.p2').forEach(p=>p.style.transform=`rotate(${-a}deg)`);
  st(o.c,mix(slide(t,24.37,0,80,.4),{o:f}));o.h.firstChild.style.transform=`scale(${t<26.44?1:1+.1*Math.max(0,1-(t-26.44)/.3)})`;
}});

// B5 SPREAD VALUE DI PG JEWEL — foto rantai depan logo PG
scene({s:27.4,e:29.9,build(R,o){
  o.h=E(R,'left:60px;right:140px;top:280px;text-align:center;white-space:nowrap;line-height:1.05','<div style="font:800 46px Mont;color:#ddd">TENGOK PULA</div>'+goldTx('SPREAD VALUE',92),'g sh');
  o.p=E(R,'left:230px;top:480px;width:540px;height:660px',photo('img/rantais.jpg',null,'50% 45%'));
  o.l=E(R,'left:60px;right:140px;top:1080px;text-align:center;white-space:nowrap',pill('📍 PG JEWEL','rgba(20,14,5,.92)','#F5C542','#E8B830',56),'g');
},upd(t,o){const f=outF(t,o.e);st(o.h,mix(pop(t,27.45),{o:f}));st(o.p,mix(slide(t,27.6,0,80,.5),{o:f,r:-1.5}));flip(o.p,t,27.6,1,.7);kb(o.p,t,27.6,1.12,1.0,2.3);shine(o.p,t,28.1);
  st(o.l,mix(pop(t,29.36),{o:f}));
}});

// B5b (muka jelas) BARANG KEMAS PUBLIC GOLD
scene({s:29.95,e:32.1,nob:1,build(R,o){
  o.t=E(R,'left:60px;right:140px;top:262px;text-align:center;white-space:nowrap',pill('💍 BARANG KEMAS PUBLIC GOLD','rgba(20,14,5,.82)','#F5C542','#E8B830',38),'g');
},upd(t,o){st(o.t,mix(pop(t,30.68),{o:outF(t,o.e)}));}});

// B6 SPREAD VALUE: 999 ~9% vs 916 ~13% (carta bar)
const row=(b)=>`<div style="position:absolute;left:0;top:0">${badge(b,150)}</div><div style="position:absolute;left:170px;top:20px;width:610px;height:110px;border-radius:55px;background:rgba(255,255,255,.08);border:3px solid #6b5520"></div>
  <div class="bf" style="position:absolute;left:170px;top:20px;width:0;height:110px;border-radius:55px;background:linear-gradient(90deg,#C8901A,#FFE680);box-shadow:0 0 24px rgba(245,197,66,.6);overflow:hidden">${SHN}</div>
  <div class="bv" style="position:absolute;left:190px;top:22px;font:900 76px Mont;color:#fff;white-space:nowrap;text-shadow:0 4px 10px #000"></div>`;
const rowUpd=(el,t,t0,p,lb)=>{const k=eo((t-t0)/.8);const w=610*p/13*k*.9;el.querySelector('.bf').style.width=w+'px';const v=el.querySelector('.bv');v.style.left=(190+w)+'px';v.textContent=t>t0?`~${Math.round(p*k)}%`:'';v.style.opacity=cl((t-t0)/.2);shine(el,t,t0+.8)};
scene({s:32.15,e:39.6,build(R,o){
  o.h=E(R,'left:60px;right:140px;top:280px;text-align:center;white-space:nowrap;line-height:1.05','<div style="font:800 46px Mont;color:#ddd">SPREAD VALUE</div><div style="font:900 70px Mont;color:#fff">BARANG <span class="gold">KEMAS</span></div>','g sh');
  o.r1=E(R,'left:110px;top:540px;width:780px;height:150px',row('999'));
  o.r2=E(R,'left:110px;top:780px;width:780px;height:150px',row('916'));
  o.c=E(R,'left:110px;top:1000px;width:780px;height:130px',card(`<div style="text-align:center;padding-top:28px;white-space:nowrap;font:900 52px Mont;color:#fff">📉 <span class="gold">999</span> LEBIH RENDAH ✓</div>`));
  o.n=E(R,'left:600px;top:1145px;width:290px;text-align:right;font:800 24px Mont;color:#bbb','*anggaran','g');
},upd(t,o){const f=outF(t,o.e);st(o.h,mix(pop(t,32.2),{o:f}));st(o.r1,mix(slide(t,33.3,-150,0,.4),{o:f}));rowUpd(o.r1,t,35.52,9);
  st(o.r2,mix(slide(t,37.32,-150,0,.4),{o:f}));rowUpd(o.r2,t,38.4,13);st(o.c,mix(pop(t,36.12),{o:f}));st(o.n,{o:f*cl((t-35.5)/.3)});
}});

// B7 HARGA JUAL vs BELI — jurang
const gap=(b,w,lb,col)=>`<div style="position:absolute;left:0;top:10px">${badge(b,130)}</div>
  <div class="gx" style="position:absolute;left:160px;top:0;width:620px;height:150px">
  <div style="position:absolute;left:0;top:30px;padding:10px 18px;border-radius:16px;background:#1d3a24;border:3px solid #2ecc71;font:900 34px Mont;color:#fff">BELI</div>
  <div class="gj" style="position:absolute;left:${130+w}px;top:30px;padding:10px 18px;border-radius:16px;background:#3a1d1d;border:3px solid #ff6b6b;font:900 34px Mont;color:#fff">JUAL</div>
  <div class="ga" style="position:absolute;left:128px;top:56px;width:${w}px;height:8px;background:${col};border-radius:4px"></div>
  <div class="gl" style="position:absolute;left:128px;top:82px;width:${w}px;text-align:center;font:900 30px Mont;color:${col};white-space:nowrap">${lb}</div></div>`;
const gapUpd=(el,t,t0)=>{const k=eo((t-t0)/.6);el.querySelector('.gj').style.transform=`translateX(${-(1-k)*120}px)`;el.querySelector('.ga').style.transform=`scaleX(${k})`;el.querySelector('.ga').style.transformOrigin='0 0';el.querySelector('.gl').style.opacity=cl((t-t0-.4)/.2)};
scene({s:41.9,e:46.9,build(R,o){
  o.h=E(R,'left:60px;right:140px;top:280px;text-align:center;white-space:nowrap;line-height:1.05','<div style="font:800 46px Mont;color:#ddd">JURANG HARGA</div><div style="font:900 74px Mont;color:#fff"><span class="gold">JUAL</span> & <span class="gold">BELI</span></div>','g sh');
  o.g1=E(R,'left:110px;top:520px;width:780px;height:160px',gap('999',150,'KECIL ✓','#2ecc71'));
  o.g2=E(R,'left:110px;top:740px;width:780px;height:160px',gap('916',300,'LEBIH BESAR','#ff9f6b'));
  o.c=E(R,'left:110px;top:980px;width:780px;height:150px',card(`<div style="text-align:center;padding-top:20px;line-height:1.1;white-space:nowrap"><div style="font:800 34px Mont;color:#ddd">SPREAD EMAS 999</div><div class="gold" style="font:900 60px Mont">LEBIH RENDAH ✓</div></div>`));
},upd(t,o){const f=outF(t,o.e);st(o.h,mix(pop(t,41.95),{o:f}));st(o.g1,mix(slide(t,42.34,0,60,.35),{o:f}));gapUpd(o.g1,t,42.5);
  st(o.g2,mix(slide(t,42.84,0,60,.35),{o:f}));gapUpd(o.g2,t,43.0);st(o.c,mix(pop(t,45.21),{o:f}));
}});

// B8 916 UNTUK PERHIASAN — foto Adila pakai cincin & gelang
scene({s:48.6,e:52.5,build(R,o){
  o.h=E(R,'left:60px;right:140px;top:280px;text-align:center;white-space:nowrap',pill('💍 UNTUK <span class="gold">PERHIASAN</span>','rgba(20,14,5,.92)','#fff','#E8B830',58),'g');
  o.p=E(R,'left:250px;top:400px;width:580px;height:760px',photo('img/pakais.jpg',null,'55% 55%'));
  o.b=E(R,'left:110px;top:860px;width:220px;height:220px',badge('916',220));
  o.ok=E(R,'left:110px;top:1090px;width:220px;text-align:center;font:900 40px Mont;white-space:nowrap','<span class="gold">PILIHAN ✓</span>','g sh');
},upd(t,o){const f=outF(t,o.e);st(o.h,mix(pop(t,49.65),{o:f}));st(o.p,mix(slide(t,48.65,0,80,.5),{o:f,r:1.5}));flip(o.p,t,48.65,-1,.7);kb(o.p,t,48.65,1,1.1,3.5);shine(o.p,t,49.2);
  st(o.b,mix(pop(t,50.47),{o:f,r:-8+wob(t,3,.6)}));st(o.ok,mix(pop(t,51.83),{o:f}));
}});

// B9 999 BOLEH DIPERTIMBANGKAN — foto cincin di tapak tangan
scene({s:53.2,e:58.5,build(R,o){
  o.h=E(R,'left:60px;right:140px;top:280px;text-align:center;white-space:nowrap;font:900 60px Mont;color:#fff','NAK <span class="gold">EMAS LEBIH TULIN?</span>','g sh');
  o.p=E(R,'left:330px;top:380px;width:500px;height:620px',photo('img/cincin3s.jpg',null,'50% 72%'));
  o.b=E(R,'left:110px;top:430px;width:230px;height:230px',badge('999',230));
  o.l=[['✓ EMAS TULIN LEBIH TINGGI',54.09],['✓ SPREAD LEBIH RENDAH',55.41]].map(([tx],i)=>E(R,`left:110px;top:${1025+i*78}px;width:780px;height:70px`,`<div style="position:absolute;inset:0;border-radius:35px;background:rgba(20,14,5,.92);border:3px solid #E8B830;text-align:center;font:900 40px Mont;line-height:64px;white-space:nowrap"><span class="gold">${tx}</span></div>`));
  o.ok=E(R,'left:110px;top:700px;width:230px;text-align:center;white-space:nowrap;line-height:1.1','<div style="font:800 28px Mont;color:#ddd">BOLEH</div><div class="gold" style="font:900 26px Mont">DIPERTIMBANG</div>','g sh');
},upd(t,o){const f=outF(t,o.e);st(o.h,mix(pop(t,53.25),{o:f}));st(o.p,mix(slide(t,53.3,120,0,.5),{o:f,r:2}));flip(o.p,t,53.3,1,.7);kb(o.p,t,53.3,1.05,1.15,4);shine(o.p,t,53.8);
  o.l.forEach((el,i)=>st(el,mix(slide(t,[54.09,55.41][i],-150,0,.35),{o:f})));st(o.b,mix(pop(t,56.95),{o:f,r:8+wob(t,3,.6)}));st(o.ok,mix(pop(t,57.66),{o:f}));
}});

// B10 JANGAN TENGOK CANTIK SAHAJA (coret)
scene({s:60.3,e:62.4,build(R,o){
  o.h=E(R,'left:60px;right:140px;top:380px;text-align:center;white-space:nowrap;font:900 84px Mont;color:#fff','JANGAN TENGOK','g sh');
  o.c=E(R,'left:60px;right:140px;top:520px;text-align:center;white-space:nowrap','<span style="position:relative;display:inline-block">'+goldTx('CANTIK',150)+'<span class="sk" style="position:absolute;left:-10px;top:50%;height:16px;width:0;background:#ff4d4d;border-radius:8px;transform:rotate(-6deg);box-shadow:0 3px 8px #000"></span></span>','g sh');
  o.sah=E(R,'left:60px;right:140px;top:720px;text-align:center;white-space:nowrap;font:900 84px Mont;color:#fff','SAHAJA ✋','g sh');
  o.r=E(R,'left:380px;top:860px;width:240px;height:240px;font-size:200px;line-height:1;text-align:center','💍'+TW());
},upd(t,o){const f=outF(t,o.e);st(o.h,mix(pop(t,60.35),{o:f}));st(o.c,mix(pop(t,61.4),{o:f}));st(o.sah,mix(pop(t,61.89),{o:f}));
  o.c.querySelector('.sk').style.width=(cl((t-61.95)/.25)*105)+'%';st(o.r,mix(pop(t,60.6),{o:f,r:wob(t,8,.6),y:wob(t,10,.8)}));kb(o.r,t,60.6);
}});

// B11 FAHAMI 3 PERKARA
scene({s:62.45,e:65.5,build(R,o){
  o.h=E(R,'left:60px;right:140px;top:290px;text-align:center;white-space:nowrap;font:900 76px Mont;color:#fff','FAHAMI <span class="gold">3 PERKARA</span>','g sh');
  o.it=[['1','🔍','KETULINAN'],['2','📉','SPREAD'],['3','🎯','TUJUAN BELI']].map(([n,e,tx],i)=>E(R,`left:110px;top:${450+i*210}px;width:780px;height:180px`,card(`<div style="position:absolute;left:26px;top:30px;width:120px;height:120px">${badge(n,120)}</div><div style="position:absolute;left:175px;top:42px;font-size:84px;line-height:1">${e}</div><div style="position:absolute;left:290px;top:54px;font:900 62px Mont;white-space:nowrap" class="gold">${tx}</div>`)));
},upd(t,o){const f=outF(t,o.e);st(o.h,mix(pop(t,62.45),{o:f}));o.it.forEach((el,i)=>st(el,mix(slide(t,[62.77,63.53,64.23][i],180,0,.35),{o:f})));}});

// B12 BELI EMAS BIARLAH BERILMU
scene({s:65.6,e:68.95,build(R,o){
  o.q=E(R,'left:110px;top:400px;width:780px;height:520px',card(`<div style="position:absolute;left:30px;top:-10px;font:700 200px Play;color:#E8B830;opacity:.5;line-height:1">“</div>
    <div style="text-align:center;padding-top:90px;line-height:1.1;white-space:nowrap"><div style="font:900 72px Mont;color:#fff">BELI EMAS</div><div style="font:900 72px Mont;color:#fff">BIARLAH</div><div class="bk gold" style="font:900 104px Mont;display:inline-block">BERILMU</div></div>`));
  o.n=E(R,'left:110px;top:960px;width:780px;height:150px',`<div style="position:absolute;inset:0;border-radius:30px;background:#3a1414;border:3px solid #ff6b6b;text-align:center;padding-top:14px;line-height:1.1;white-space:nowrap"><div style="font:800 40px Mont;color:#ddd">BUKAN SEKADAR</div><div style="font:900 52px Mont;color:#fff">IKUT ORANG ✕</div></div>`);
},upd(t,o){const f=outF(t,o.e);st(o.q,mix(pop(t,65.65,.4),{o:f}));const bk=o.q.querySelector('.bk');bk.style.opacity=cl((t-66.83)/.12);bk.style.transform=`scale(${t<66.83?0:ob((t-66.83)/.35)})`;
  st(o.n,mix(slide(t,67.35,0,80,.35),{o:f}));
}});

// B13 (muka jelas, Adila tunjuk rantai) EMAS PERHIASAN
scene({s:69.05,e:73.78,nob:1,build(R,o){
  o.t=E(R,'left:60px;right:140px;top:262px;text-align:center;white-space:nowrap',pill('💛 EMAS PERHIASAN','rgba(20,14,5,.82)','#F5C542','#E8B830',48),'g');
},upd(t,o){st(o.t,mix(pop(t,71.6),{o:outF(t,o.e)}));}});

// B14 CTA KLIK LINK
scene({s:73.83,e:999,build(R,o){
  o.h=E(R,'left:60px;right:140px;top:320px;text-align:center;line-height:1.05;white-space:nowrap','<div style="font:800 50px Mont;color:#ddd">BERMINAT?</div><div class="gold" style="font:900 78px Mont">EMAS PERHIASAN</div>','g sh');
  o.btn=E(R,'left:150px;top:620px;width:700px;height:190px','<div class="card" style="position:absolute;inset:0;border-radius:95px;display:flex;align-items:center;justify-content:center;gap:24px;font:900 76px Mont;white-space:nowrap"><span>🔗</span><span class="gold">KLIK LINK</span></div><div class="fg" style="position:absolute;right:-20px;bottom:-70px;font-size:110px;opacity:0">👆</div>');
  o.dn=E(R,'left:60px;right:140px;top:900px;text-align:center;font:900 64px Mont;color:#fff;white-space:nowrap','DI BAWAH 👇','g sh');
},upd(t,o){st(o.h,pop(t,73.85));
  st(o.btn,mix(pop(t,74.26),{s:t>74.6&&t<74.8?.92:1+.03*Math.sin(t*7)}));const fg=o.btn.querySelector('.fg');fg.style.opacity=t>74.4?1:0;fg.style.transform=`translateY(${Math.abs(Math.sin(t*5))*-16}px)`;
  st(o.dn,mix(pop(t,74.66),{y:wob(t,8,1.4)}));
}});

