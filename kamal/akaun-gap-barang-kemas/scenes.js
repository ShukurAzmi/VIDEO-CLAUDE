// ---------- babak v2: "Akaun GAP kini boleh tebus barang kemas (PG Jewel)" (masa = output selepas potong) ----------
const SC=[];
function scene(o){o.root=E(G,'left:0;top:0;width:1080px;height:1920px','', 'g');o.build(o.root,o);SC.push(o)}
const outF=(t,e)=>1-cl((t-(e-.22))/.22);
const pill=(tx,bg='#3a2e14',c='#ddd',bd='#6b5520',fs=60)=>`<div style="display:inline-block;background:${bg};border:3px solid ${bd};color:${c};font:900 ${fs}px Mont;padding:10px 44px;border-radius:50px">${tx}</div>`;
const TW=()=>[[.18,.22],[.78,.3],[.62,.68],[.3,.8],[.85,.82]].map(([x,y])=>`<div class="tw" style="position:absolute;left:${x*100}%;top:${y*100}%;width:46px;height:46px;margin:-23px;opacity:0;background:radial-gradient(circle,#fff 0%,rgba(255,240,180,.9) 18%,transparent 55%);clip-path:polygon(50% 0,58% 42%,100% 50%,58% 58%,50% 100%,42% 58%,0 50%,42% 42%);filter:drop-shadow(0 0 8px #FFE680)"></div>`).join('');
//SHNDEF
const SHN='<div class="shn" style="position:absolute;top:-200px;left:0;width:120px;height:1400px;background:linear-gradient(90deg,transparent,rgba(255,246,200,.45),transparent);pointer-events:none;opacity:0"></div>';
// foto B-roll dalam bingkai emas; crop = [lebar img, kiri, atas]
const photo=(src,crop=null,pos='50% 50%')=>`<div class="ph" style="position:absolute;inset:0;border-radius:26px;overflow:hidden;border:5px solid #E8B830;box-shadow:0 18px 50px rgba(0,0,0,.7),0 0 40px rgba(245,197,66,.3);background:#000">`+
  (crop?`<img src="${src}" style="position:absolute;width:${crop[0]}px;left:${crop[1]}px;top:${crop[2]}px">`:`<img src="${src}" style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover;object-position:${pos}">`)+SHN+TW()+`</div>`;
const kb=(el,t,t0,a=1,b=1.08,d=4)=>{const im=el.querySelector('.ph img');im.style.transformOrigin='50% 45%';im.style.transform=`scale(${lerp(a,b,cl((t-t0)/d))})`;
  el.querySelectorAll('.tw').forEach((w,i)=>{const p=((t-t0)*1.3+i*.37)%1.6;const k=p<.6?Math.sin(Math.PI*p/.6):0;w.style.opacity=t>t0+.3?k:0;w.style.transform=`scale(${.3+k}) rotate(${p*90}deg)`})};
// 3D masuk: putar dari sisi
const flip=(el,t,t0,dir=1,d=.6)=>{el.querySelector('.ph').style.transform=`perspective(1400px) rotateY(${dir*55*(1-eo((t-t0)/d))}deg)`};
const badge=(tx,sz=170)=>`<div style="width:${sz}px;height:${sz}px;border-radius:50%;background:linear-gradient(160deg,#FFF0B0,#F5C542 45%,#C8901A);border:6px solid #fff3c4;box-shadow:0 10px 26px rgba(0,0,0,.6);display:flex;align-items:center;justify-content:center;font:900 ${sz*.36}px Mont;color:#3a2600">${tx}</div>`;
const shine=(el,t,t0)=>{const s=el.querySelector('.shn');if(s){const k=cl((t-t0)/.9);s.style.transform=`translateX(${lerp(-500,900,k)}px) rotate(20deg)`;s.style.opacity=k>0&&k<1?1:0}};

// mockup telefon dengan rakaman skrin akaun emas GAP (scr/00001..00200, 720x1560 → skala PW/720)
const PW=430,PS=PW/720;
const phone=()=>`<div style="position:absolute;inset:0;border-radius:56px;background:#111;border:4px solid #E8B830;box-shadow:0 24px 60px rgba(0,0,0,.75),0 0 50px rgba(245,197,66,.35)"></div>
  <div style="position:absolute;left:14px;top:14px;width:${PW}px;height:${Math.round(1560*PS*.86)}px;border-radius:44px;overflow:hidden;background:#fff" class="ph"><img class="scr" src="img/gap50.jpg" style="position:absolute;left:0;top:0;width:${PW}px">${SHN}${TW()}</div>
  <div style="position:absolute;right:26px;bottom:-44px;font:800 24px Mont;color:#ddd;opacity:.85">*ilustrasi</div>`;
const PH_H=Math.round(1560*PS*.86)+28;
// v4: skrin statik img/gap50.jpg (720x1290) — zoom perlahan + kilauan + sapuan cahaya
function scrF(el,t,t0,off=0){kb(el,t,t0,1,1.05,2.5);shine(el,t,t0+.5)}
// cincin sorot atas elemen dalam skrin (koordinat px rakaman 720 lebar)
const ring=(x,y,w,h)=>`<div class="rg" style="position:absolute;left:${14+x*PS}px;top:${14+y*PS}px;width:${w*PS}px;height:${h*PS}px;border:5px solid #F5C542;border-radius:18px;box-shadow:0 0 0 4px rgba(0,0,0,.35),0 0 24px #F5C542;opacity:0"></div>`;
const ringUpd=(el,i,t,t0,t1=99)=>{const r=el.querySelectorAll('.rg')[i];const on=t>=t0&&t<t1;r.style.opacity=on?cl((t-t0)/.12)*(t1-t<.15?cl((t1-t)/.15):1):0;r.style.transform=`scale(${on?1+.05*Math.sin((t-t0)*8):1})`};
// kanta pembesar: bahagian atas app (kod PG + baki) dibesarkan keluar dari skrin
const LZ=490/720;
const lens=()=>`<div style="position:absolute;inset:0;border-radius:24px;overflow:hidden;border:5px solid #F5C542;box-shadow:0 0 34px rgba(245,197,66,.8),0 18px 44px rgba(0,0,0,.75);background:#fff url(img/gap50.jpg) 0 -${Math.round(92*LZ)}px/490px auto"></div>${SHN}`;
const lensUpd=(el,t,t0,t1,f)=>{const k=t<t0?0:ob((t-t0)/.4);const ko=t>t1?cl(1-(t-t1)/.25):1;st(el,{o:cl((t-t0)/.12)*ko*f,s:lerp(.4,1,k)*(t>t0?1+.015*Math.sin((t-t0)*5):1),y:lerp(-120,0,eo((t-t0)/.4))});shine(el,t,t0+.35)};
const callout=(e,a,b)=>`<div style="position:absolute;inset:0;background:linear-gradient(160deg,rgba(28,20,8,.95),rgba(8,6,3,.95));border:3px solid #E8B830;border-radius:24px;box-shadow:0 12px 30px rgba(0,0,0,.6);padding:18px 20px;white-space:nowrap"><div style="font-size:58px;line-height:1">${e}</div><div style="font:800 28px Mont;color:#ddd;margin-top:10px">${a}</div><div class="gold" style="font:900 34px Mont;line-height:1.15">${b}</div></div>`;

// B1 (2.6s, selepas Adila mula bercakap) HANYA BOLEH KELUAR GOLD BAR & DINAR SAJA?
scene({s:2.55,e:5.25,build(R,o){
  o.h=E(R,'left:60px;right:140px;top:290px;text-align:center;line-height:1.05;white-space:nowrap','<div style="font:800 46px Mont;color:#ddd">AKAUN EMAS GAP</div><div style="font:900 70px Mont;color:#fff">HANYA BOLEH <span class="gold">KELUAR…</span></div>','g sh');
  o.gb=E(R,'left:110px;top:480px;width:380px;height:520px',photo('img/goldbar.png',[560,-90,-70]));
  o.gbl=E(R,'left:110px;top:1010px;width:380px;text-align:center;font:900 54px Mont;white-space:nowrap','<span class="gold">GOLD BAR</span>','g sh');
  o.dn=E(R,'left:510px;top:480px;width:380px;height:520px',photo('img/dinar.jpg',null,'50% 62%'));
  o.dnl=E(R,'left:510px;top:1010px;width:380px;text-align:center;font:900 54px Mont;white-space:nowrap','<span class="gold">DINAR</span>','g sh');
  o.q=E(R,'left:60px;right:140px;top:1090px;text-align:center;white-space:nowrap',pill('SAJA? 🤔','#5a1414','#fff','#ff6b6b',62),'g');
},upd(t,o){const f=outF(t,o.e);st(o.h,mix(pop(t,2.6),{o:f}));
  st(o.gb,mix(slide(t,3.4,-220,0,.4),{o:f,r:-2}));kb(o.gb,t,3.4,1,1.08,2);shine(o.gb,t,3.7);st(o.gbl,mix(pop(t,3.5),{o:f}));
  st(o.dn,mix(slide(t,3.95,220,0,.4),{o:f,r:2}));kb(o.dn,t,3.95,1.05,1.12,2);shine(o.dn,t,4.2);st(o.dnl,mix(pop(t,4.03),{o:f}));
  st(o.q,mix(pop(t,4.31,.35),{o:f}));
}});

// B2 (muka jelas) SEKARANG ADA PILIHAN LEBIH MENARIK
scene({s:5.3,e:7.45,nob:1,build(R,o){
  o.t=E(R,'left:60px;right:140px;top:262px;text-align:center;white-space:nowrap',pill('✨ PILIHAN LEBIH MENARIK','rgba(20,14,5,.82)','#F5C542','#E8B830',44),'g');
},upd(t,o){st(o.t,mix(pop(t,5.6),{o:outF(t,o.e)}));}});

// B3 MELALUI PG JEWEL — foto gelang di pergelangan (logo PG di latar)
scene({s:7.5,e:9.9,build(R,o){
  o.h=E(R,'left:60px;right:140px;top:280px;text-align:center;line-height:1;white-space:nowrap','<div style="font:800 46px Mont;color:#ddd">MELALUI</div><div class="gold" style="font:700 italic 120px Play">PG Jewel</div>','g sh');
  o.p=E(R,'left:190px;top:540px;width:620px;height:660px',photo('img/gelang1b.jpg',null,'50% 30%'));
},upd(t,o){const f=outF(t,o.e);st(o.h,mix(pop(t,7.6),{o:f}));o.h.lastChild.style.transform=`scale(${t<7.93?1:1+.12*Math.max(0,1-(t-7.93)/.3)})`;
  st(o.p,mix(slide(t,7.75,0,80,.5),{o:f,r:-1.5}));flip(o.p,t,7.75,1,.7);kb(o.p,t,7.75,1.15,1.0,2.2);shine(o.p,t,8.2);
}});

// B3b KHAS UNTUK AKAUN EMAS GAP — telefon dengan app Public Gold
scene({s:9.95,e:12.3,build(R,o){
  o.h=E(R,'left:60px;right:140px;top:280px;text-align:center;font:900 60px Mont;white-space:nowrap;color:#fff','KHAS UNTUK <span class="gold">AKAUN GAP</span>','g sh');
  o.ph=E(R,`left:110px;top:380px;width:${PW+28}px;height:${PH_H}px`,phone()+ring(140,190,440,125));
  o.lz=E(R,'left:95px;top:645px;width:490px;height:170px',lens());
  o.c1=E(R,'left:595px;top:560px;width:320px;height:190px',callout('📱','AKAUN','EMAS GAP'));
  o.c2=E(R,'left:595px;top:790px;width:320px;height:190px',callout('💍','BOLEH TEBUS','KEMAS'));
},upd(t,o){const f=outF(t,o.e);st(o.h,mix(pop(t,10.0),{o:f}));st(o.ph,mix(slide(t,10.0,0,200,.45),{o:f,r:-2}));scrF(o.ph,t,9.95,0);ringUpd(o.ph,0,t,10.6);lensUpd(o.lz,t,10.9,99,f);
  st(o.c1,mix(slide(t,10.6,150,0,.35),{o:f}));st(o.c2,mix(slide(t,11.7,150,0,.35),{o:f}));
}});

// B4 BARANG KEMAS 916 & 999 — foto gelang
scene({s:12.35,e:15.35,build(R,o){
  o.h=E(R,'left:60px;right:140px;top:290px;text-align:center;font:900 78px Mont;white-space:nowrap','💍 <span class="gold">BARANG KEMAS</span>','g sh');
  o.p=E(R,'left:170px;top:400px;width:660px;height:800px',photo('img/gelang2b.jpg',null,'50% 48%'));
  o.b1=E(R,'left:110px;top:900px;width:190px;height:190px',badge('916',190));
  o.b2=E(R,'left:700px;top:900px;width:190px;height:190px',badge('999',190));
},upd(t,o){const f=outF(t,o.e);st(o.h,mix(pop(t,12.4),{o:f}));st(o.p,mix(slide(t,12.4,0,120),{o:f,r:1.5}));flip(o.p,t,12.4,-1,.7);kb(o.p,t,12.4,1,1.1,3);shine(o.p,t,12.9);
  st(o.b1,mix(pop(t,13.2),{o:f,r:-10+wob(t,3,.7)}));st(o.b2,mix(pop(t,14.98),{o:f,r:10+wob(t,3,.7,.3)}));
}});

// B5 (muka jelas, Adila tunjuk app) EMAS DIKUMPUL SIKIT-SIKIT
scene({s:15.4,e:19.75,nob:1,build(R,o){
  o.t=E(R,'left:60px;right:140px;top:262px;text-align:center;white-space:nowrap',pill('🪙 EMAS DIKUMPUL SIKIT-SIKIT','rgba(20,14,5,.82)','#F5C542','#E8B830',40),'g');
},upd(t,o){st(o.t,mix(pop(t,17.1),{o:outF(t,o.e)}));}});

// B6 BUKAN SEKADAR → GOLD BAR / DINAR (foto sebenar)
scene({s:19.8,e:23.55,build(R,o){
  o.h=E(R,'left:60px;right:140px;top:290px;text-align:center;line-height:1.05;white-space:nowrap','<div style="font:900 74px Mont;color:#fff">BUKAN <span class="gold">SEKADAR</span></div><div style="font:800 46px Mont;color:#ddd">DITEBUS DALAM BENTUK</div>','g sh');
  o.gb=E(R,'left:110px;top:500px;width:380px;height:500px',photo('img/goldbar.png',[540,-80,-60]));
  o.gbl=E(R,'left:110px;top:1010px;width:380px;text-align:center;font:900 54px Mont;white-space:nowrap','<span class="gold">GOLD BAR</span>','g sh');
  o.dn=E(R,'left:510px;top:500px;width:380px;height:500px',photo('img/dinar.jpg',null,'50% 62%'));
  o.dnl=E(R,'left:510px;top:1010px;width:380px;text-align:center;font:900 54px Mont;white-space:nowrap','<span class="gold">DINAR</span>','g sh');
  o.pl=E(R,'left:60px;right:140px;top:1090px;text-align:center;white-space:nowrap',pill('TAPI JUGA… ➕','#3a2e14','#fff','#E8B830',54),'g');
},upd(t,o){const f=outF(t,o.e);st(o.h,mix(pop(t,19.85),{o:f}));
  st(o.gb,mix(slide(t,20.3,-200,0,.35),{o:f,r:-2,s:t>22.55&&t<23.1?1.05:1}));flip(o.gb,t,20.3,-1);kb(o.gb,t,20.3,1,1.08,3);shine(o.gb,t,22.55);st(o.gbl,mix(pop(t,20.4),{o:f}));
  st(o.dn,mix(slide(t,20.6,200,0,.35),{o:f,r:2,s:t>23.25&&t<23.55?1.05:1}));flip(o.dn,t,20.6,1);kb(o.dn,t,20.6,1.05,1.12,3);shine(o.dn,t,23.25);st(o.dnl,mix(pop(t,20.7),{o:f}));
  st(o.pl,mix(pop(t,23.3),{o:f}));
}});

// B7 BOLEH DAPATKAN PILIHAN BARANG KEMAS — kipas 3 foto (cincin / gelang / gelang tangan)
const FAN=[['img/cincin.jpg','50% 70%','💍 CINCIN',-8,-190,24.25],['img/gelang1b.jpg','50% 45%','✨ GELANG TANGAN',8,190,24.9],['img/gelang2b.jpg','50% 50%','📿 GELANG',0,0,25.55]];
scene({s:23.6,e:27.85,build(R,o){
  o.h=E(R,'left:60px;right:140px;top:290px;text-align:center;line-height:1.05;white-space:nowrap','<div style="font:800 46px Mont;color:#ddd">BOLEH DAPATKAN</div><div class="gold" style="font:900 80px Mont">BARANG KEMAS ✓</div>','g sh');
  o.fan=FAN.map(([src,pos,lb])=>{const el=E(R,'left:300px;top:470px;width:400px;height:640px',photo(src,null,pos)+`<div style="position:absolute;left:0;right:0;bottom:-26px;text-align:center;white-space:nowrap"><span style="display:inline-block;background:rgba(20,14,5,.92);border:3px solid #E8B830;border-radius:30px;padding:6px 22px;font:900 30px Mont;color:#F5C542">${lb}</span></div>`);el.style.transformOrigin='50% 120%';return el});
},upd(t,o){const f=outF(t,o.e);st(o.h,mix(pop(t,23.65),{o:f}));o.h.lastChild.style.transform=`scale(${t<26.37?1:1+.1*Math.max(0,1-(t-26.37)/.25)})`;
  o.fan.forEach((el,i)=>{const [,, ,r,x,t0]=FAN[i];const k=eo((t-t0)/.55);st(el,{o:cl((t-t0)/.2)*f,x:x*k,y:220*(1-k),r:r*k,s:lerp(.6,i==2?1:.78,k)});flip(el,t,t0,i==1?-1:1,.55);kb(el,t,t0,1.05,1.15,3);shine(el,t,t0+.4)});
}});

// B8 (muka jelas, Adila tunjuk gelang) CANTIK KAN?
scene({s:27.9,e:29.25,nob:1,build(R,o){
  o.t=E(R,'left:60px;right:140px;top:262px;text-align:center;white-space:nowrap',pill('💛 CANTIK KAN?','rgba(20,14,5,.82)','#F5C542','#E8B830',48),'g');
},upd(t,o){st(o.t,mix(pop(t,28.15),{o:outF(t,o.e)}));}});

// B9 DAH ADA AKAUN GAP? — telefon, sorot baki emas
scene({s:29.3,e:31.95,build(R,o){
  o.h=E(R,'left:60px;right:140px;top:280px;text-align:center;font:900 64px Mont;white-space:nowrap;color:#fff','DAH ADA <span class="gold">AKAUN GAP?</span>','g sh');
  o.ph=E(R,`left:110px;top:380px;width:${PW+28}px;height:${PH_H}px`,phone()+ring(140,190,440,125)+ring(28,335,160,108));
  o.lz=E(R,'left:95px;top:645px;width:490px;height:170px',lens());
  o.c1=E(R,'left:595px;top:520px;width:320px;height:190px',callout('🪙','BAKI EMAS','DALAM GAP'));
  o.c2=E(R,'left:595px;top:750px;width:320px;height:190px',callout('✅','BOLEH TUKAR','KE KEMAS'));
},upd(t,o){const f=outF(t,o.e);st(o.h,mix(pop(t,29.35),{o:f}));st(o.ph,mix(slide(t,29.4,0,200,.45),{o:f,r:2}));scrF(o.ph,t,29.3,60);
  ringUpd(o.ph,0,t,30.1,31.0);ringUpd(o.ph,1,t,31.0);lensUpd(o.lz,t,30.2,30.95,f);
  st(o.c1,mix(slide(t,30.1,150,0,.35),{o:f}));st(o.c2,mix(slide(t,31.0,150,0,.35),{o:f}));
}});

// B9b TENGOK PILIHAN DI PG JEWEL — foto Adila di kedai
scene({s:32.0,e:34.15,build(R,o){
  o.p=E(R,'left:190px;top:300px;width:620px;height:760px',photo('img/adila2.jpg',null,'50% 35%'));
  o.l=E(R,'left:60px;right:140px;top:1080px;text-align:center;white-space:nowrap',pill('👀 TENGOK PILIHAN DI <span class="gold">PG JEWEL</span>','rgba(20,14,5,.92)','#fff','#E8B830',46),'g');
},upd(t,o){const f=outF(t,o.e);st(o.p,mix(slide(t,32.05,0,80,.5),{o:f,r:1.5}));flip(o.p,t,32.05,-1,.7);kb(o.p,t,32.05,1,1.08,2.2);shine(o.p,t,32.4);
  st(o.l,mix(pop(t,33.3),{o:f}));
}});

// B10 (muka jelas) BELUM ADA AKAUN GAP?
scene({s:34.2,e:36.5,nob:1,build(R,o){
  o.t=E(R,'left:60px;right:140px;top:262px;text-align:center;white-space:nowrap',pill('🙋 BELUM ADA AKAUN GAP?','rgba(20,14,5,.82)','#F5C542','#E8B830',44),'g');
},upd(t,o){st(o.t,mix(pop(t,34.8),{o:outF(t,o.e)}));}});

// B11 CARA MULA MENYIMPAN — telefon, sorot + TOP UP & harga GAP
scene({s:36.55,e:38.85,build(R,o){
  o.h=E(R,'left:60px;right:140px;top:280px;text-align:center;font:900 64px Mont;white-space:nowrap;color:#fff','CARA <span class="gold">MULA SIMPAN</span>','g sh');
  o.ph=E(R,`left:110px;top:380px;width:${PW+28}px;height:${PH_H}px`,phone()+ring(28,335,160,108)+ring(26,476,670,68)+'<div class="fg" style="position:absolute;left:60px;top:235px;font-size:90px;opacity:0">👆</div>');
  o.st=[['1️⃣','BUKA','AKAUN GAP'],['2️⃣','TEKAN','+ TOP UP'],['3️⃣','EMAS','TERKUMPUL']].map(([e,a,b],i)=>E(R,`left:595px;top:${470+i*215}px;width:320px;height:190px`,callout(e,a,b)));
},upd(t,o){const f=outF(t,o.e);st(o.h,mix(pop(t,36.6),{o:f}));st(o.ph,mix(slide(t,36.6,0,200,.45),{o:f,r:-2}));scrF(o.ph,t,36.55,120);
  ringUpd(o.ph,0,t,37.3,38.1);ringUpd(o.ph,1,t,38.1);const fg=o.ph.querySelector('.fg');fg.style.opacity=t>37.3&&t<38.1?1:0;fg.style.transform=`translateY(${Math.abs(Math.sin(t*6))*-14}px)`;
  o.st.forEach((el,i)=>st(el,mix(slide(t,36.9+i*.5,150,0,.35),{o:f})));
}});

// B12 CTA: NAK MULA MENYIMPAN? → KLIK LINK DI BIO
scene({s:38.9,e:999,build(R,o){
  o.h=E(R,'left:60px;right:140px;top:300px;text-align:center;line-height:1.05;white-space:nowrap','<div style="font:800 48px Mont;color:#ddd">NAK MULA</div><div class="gold" style="font:900 84px Mont">MENYIMPAN?</div>','g sh');
  o.btn=E(R,'left:150px;top:640px;width:700px;height:190px','<div class="card" style="position:absolute;inset:0;border-radius:95px;display:flex;align-items:center;justify-content:center;gap:24px;font:900 76px Mont;white-space:nowrap"><span>🔗</span><span class="gold">KLIK LINK</span></div><div class="fg" style="position:absolute;right:-20px;bottom:-70px;font-size:110px;opacity:0">👆</div>');
  o.dn=E(R,'left:60px;right:140px;top:900px;text-align:center;font:900 68px Mont;color:#fff;white-space:nowrap','DI BIO ☝️','g sh');
},upd(t,o){st(o.h,pop(t,38.95));
  st(o.btn,mix(pop(t,39.4),{s:t>39.72&&t<39.92?.92:1+.03*Math.sin(t*7)}));const fg=o.btn.querySelector('.fg');fg.style.opacity=t>39.55?1:0;fg.style.transform=`translateY(${Math.abs(Math.sin(t*5))*-16}px)`;
  st(o.dn,mix(pop(t,40.2),{y:wob(t,8,1.4)}));
}});

