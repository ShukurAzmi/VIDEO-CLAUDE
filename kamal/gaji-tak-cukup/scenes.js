// ---------- babak: "Gaji tak cukup, macam mana nak simpan emas?" (masa = output selepas potong) ----------
const SC=[];
function scene(o){o.root=E(G,'left:0;top:0;width:1080px;height:1920px','', 'g');o.build(o.root,o);SC.push(o)}
const outF=(t,e)=>1-cl((t-(e-.22))/.22);
const XM=(sz,c='#ff3b3b')=>`<div class="xm" style="position:absolute;right:24px;top:50%;margin-top:-${sz/2}px;width:${sz}px;height:${sz}px;border-radius:50%;background:${c};color:#fff;font:900 ${sz*.62}px Mont;display:flex;align-items:center;justify-content:center;box-shadow:0 4px 12px rgba(0,0,0,.5);transform:scale(0)">✕</div>`;
const CKR=(sz)=>`<div class="xm" style="position:absolute;right:24px;top:50%;margin-top:-${sz/2}px;width:${sz}px;height:${sz}px;border-radius:50%;background:#2ecc71;color:#fff;font:900 ${sz*.62}px Mont;display:flex;align-items:center;justify-content:center;box-shadow:0 4px 12px rgba(0,0,0,.5);transform:scale(0)">✓</div>`;
const pill=(tx,bg='#3a2e14',c='#ddd',bd='#6b5520',fs=60)=>`<div style="display:inline-block;background:${bg};border:3px solid ${bd};color:${c};font:900 ${fs}px Mont;padding:10px 44px;border-radius:50px">${tx}</div>`;

// B1 HOOK: GAJI TAK CUKUP → NAK SIMPAN EMAS?
scene({s:0.1,e:3.0,build(R,o){
  o.a=E(R,'left:110px;top:330px;width:780px;height:330px','<div class="card" style="position:absolute;inset:0;border-color:#ff6b6b"></div><div style="position:absolute;left:0;right:0;top:40px;text-align:center;font-size:120px;line-height:1">💸</div><div style="position:absolute;left:0;right:0;top:190px;text-align:center;font:900 76px Mont;color:#fff;white-space:nowrap">GAJI <span style="color:#ff6b6b">TAK CUKUP</span></div>');
  o.q=E(R,'left:60px;right:140px;top:720px;text-align:center;line-height:1.05;white-space:nowrap','<div style="font:900 72px Mont;color:#fff">NAK SIMPAN</div><div class="gold" style="font:900 150px Mont">EMAS?</div>','g sh');
  o.bar=E(R,'left:330px;top:1010px;width:340px;height:150px',goldBar(340,150,34));
},upd(t,o){const f=outF(t,o.e);st(o.a,mix(pop(t,.15),{o:f,x:t>.85&&t<1.15?Math.sin(t*90)*8:0}));
  st(o.q,mix(pop(t,1.4),{o:f}));o.q.lastChild.style.transform=`scale(${t>2.53?1+.15*Math.max(0,1-(t-2.53)/.25):1})`;
  st(o.bar,mix(pop(t,2.53,.4),{o:f,r:wob(t,3,.6)}));
}});

// B2 SOALAN PALING KERAP — KAKITANGAN KERAJAAN
scene({s:4.5,e:8.65,build(R,o){
  o.h=E(R,'left:60px;right:140px;top:300px;text-align:center;font:900 60px Mont;white-space:nowrap','❓ <span class="gold">SOALAN</span> PALING KERAP','g sh');
  o.b=[['💬','Gaji tak cukup…'],['💬','Boleh ke simpan emas?'],['💬','Nak mula macam mana?']].map(([e,tx],i)=>E(R,`left:${i%2?200:110}px;top:${440+i*170}px;width:690px;height:140px`,`<div style="position:absolute;inset:0;background:#fbf7ec;border-radius:70px;box-shadow:0 14px 30px rgba(0,0,0,.55);display:flex;align-items:center;gap:18px;padding-left:34px;white-space:nowrap"><span style="font-size:64px">${e}</span><span style="font:800 38px Mont;color:#2a1d00">${tx}</span></div>`));
  o.id=E(R,'left:110px;top:980px;width:780px;height:180px','<div class="card" style="position:absolute;inset:0;display:flex;align-items:center;justify-content:center;gap:24px;white-space:nowrap"><span style="font-size:90px">🪪</span><span class="gold" style="font:900 46px Mont">KAKITANGAN KERAJAAN</span></div>');
},upd(t,o){const f=outF(t,o.e);st(o.h,mix(pop(t,4.55),{o:f}));o.b.forEach((el,i)=>st(el,mix(slide(t,4.9+i*.45,i%2?120:-120,0),{o:f})));
  st(o.id,mix(pop(t,7.39),{o:f}));
}});

// B3 SLIP GAJI — potongan sana sini
const POT=[['PINJAMAN PERIBADI',14.03],['DUIT KERETA',15.87],['DUIT RUMAH',16.87],['KOPERASI',17.73],['MACAM-MACAM LAGI',18.47]];
scene({s:10.35,e:19.25,build(R,o){
  o.h=E(R,'left:60px;right:140px;top:290px;text-align:center;font:900 88px Mont;white-space:nowrap','📄 <span class="gold">SLIP GAJI</span>','g sh');
  o.slip=E(R,'left:140px;top:420px;width:720px;height:760px',`<div style="position:absolute;inset:0;background:#fbf7ec;border-radius:18px;box-shadow:0 20px 50px rgba(0,0,0,.6)"></div><div style="position:absolute;left:0;right:0;top:34px;text-align:center;font:900 48px Mont;color:#2a1d00;letter-spacing:5px">POTONGAN</div>`+
    POT.map(([n],i)=>`<div class="pr" style="position:absolute;left:44px;right:44px;top:${130+i*112}px;height:92px;display:flex;justify-content:space-between;align-items:center;border-bottom:3px dashed #d8cfb8;opacity:0;white-space:nowrap"><span style="font:900 ${n.length>14?36:42}px Mont;color:#2a1d00">${n}</span><span style="font:900 46px Mont;color:#d62828">− RM</span></div>`).join('')+
    `<div style="position:absolute;left:44px;right:44px;top:690px;height:4px;background:#2a1d00"></div>`);
  o.st=E(R,'left:300px;top:1000px;width:480px;height:150px','<div style="position:absolute;inset:0;border:10px solid #d62828;border-radius:20px;display:flex;align-items:center;justify-content:center;font:900 70px Mont;color:#d62828;background:rgba(251,247,236,.85);white-space:nowrap">SANA SINI!</div>');
},upd(t,o){const f=outF(t,o.e);st(o.h,mix(pop(t,10.4),{o:f}));st(o.slip,mix(slide(t,10.5,0,120),{r:-1.5,o:f}));
  o.slip.querySelectorAll('.pr').forEach((el,i)=>{const t0=POT[i][1];el.style.opacity=cl((t-t0)/.12);el.style.transform=`translateX(${-40*(1-eo((t-t0)/.3))}px)`});
  st(o.st,{o:(t>11.95&&t<13.9?1:0)*f,s:t<11.95?2:lerp(1.6,1,eo((t-11.95)/.15)),r:-8});
}});

// B4 BELUM MASUK… dapur, anak, bil, keluarga
const BM=[['🍳','BELANJA DAPUR',20.69],['🎒','DUIT ANAK',22.31],['🧾','BIL',23.45],['👨‍👩‍👧','KOMITMEN KELUARGA',24.37]];
scene({s:19.35,e:25.5,build(R,o){
  o.h=E(R,'left:60px;right:140px;top:300px;text-align:center;font:900 80px Mont;white-space:nowrap;color:#fff','BELUM <span class="gold">MASUK</span> LAGI…','g sh');
  o.ch=BM.map(([e,n],i)=>E(R,`left:110px;top:${430+i*180}px;width:780px;height:155px`,`<div class="card" style="position:absolute;inset:0;border-color:#ff8a5a;display:flex;align-items:center;gap:28px;padding-left:40px;white-space:nowrap"><div style="font-size:84px">${e}</div><div style="font:900 ${n.length>14?46:56}px Mont;color:#fff">${n}</div></div>`));
},upd(t,o){const f=outF(t,o.e);st(o.h,mix(pop(t,19.4),{o:f}));o.ch.forEach((el,i)=>st(el,mix(slide(t,BM[i][2]-.1,-200,0,.35),{o:f})));
}});

// B5 HUJUNG BULAN — DUIT GAJI TINGGAL SIKIT
scene({s:27.0,e:30.0,build(R,o){
  o.h=E(R,'left:60px;right:140px;top:300px;text-align:center;font:900 80px Mont;white-space:nowrap;color:#fff','📅 <span class="gold">HUJUNG BULAN</span>','g sh');
  o.c=E(R,'left:110px;top:440px;width:780px;height:700px','<div class="card" style="position:absolute;inset:0"></div><div id="w" style="position:absolute;left:0;right:0;top:40px;text-align:center;font-size:230px;line-height:1">👛</div><div style="position:absolute;left:70px;top:330px;width:640px;height:84px;border-radius:42px;background:#2b2210;border:3px solid #6b5520;overflow:hidden"><div id="bb" style="height:100%;width:100%"></div></div><div style="position:absolute;left:0;right:0;top:460px;text-align:center;line-height:1.1;white-space:nowrap"><div style="font:900 60px Mont;color:#fff">DUIT GAJI</div><div id="tl" style="font:900 96px Mont;color:#ff6b6b;opacity:0">TINGGAL SIKIT</div></div>');
},upd(t,o){const f=outF(t,o.e);st(o.h,mix(pop(t,27.05),{o:f}));st(o.c,mix(pop(t,27.2,.4),{o:f}));
  const v=lerp(100,8,eo((t-27.6)/1.6));const b=o.c.querySelector('#bb');b.style.width=v+'%';b.style.background=v<40?'linear-gradient(90deg,#b02020,#ff6b6b)':'linear-gradient(90deg,#C8901A,#FFE680)';
  const tl=o.c.querySelector('#tl');tl.style.opacity=cl((t-29.13)/.1);tl.style.transform=`translateY(${t>29.13?0:-20}px) scale(${t>29.13?1+.12*Math.max(0,1-(t-29.13)/.25):1})`;
  o.c.querySelector('#w').style.transform=`rotate(${wob(t,5,.9)}deg)`;
}});

// B6 SIMPAN EMAS = ORANG BANYAK DUIT SAHAJA? 🤔
scene({s:31.7,e:36.75,build(R,o){
  o.h=E(R,'left:60px;right:140px;top:300px;text-align:center;font:900 72px Mont;white-space:nowrap;color:#fff','KITA <span class="gold">RASA</span>…','g sh');
  o.c=E(R,'left:110px;top:430px;width:780px;height:560px',`<div class="card" style="position:absolute;inset:0"></div><div style="position:absolute;left:0;right:0;top:50px;display:flex;justify-content:center;gap:16px">${goldBar(170,82,17)}${goldBar(170,82,17)}${goldBar(170,82,17)}</div><div style="position:absolute;left:0;right:0;top:190px;text-align:center;font:900 66px Mont;color:#fff;white-space:nowrap">SIMPAN EMAS =</div><div style="position:absolute;left:0;right:0;top:290px;text-align:center;line-height:1.05;white-space:nowrap"><div style="font:900 62px Mont;color:#fff">🤑 ORANG</div><div class="gold" style="font:900 76px Mont">BANYAK DUIT?</div></div>`);
  o.q=E(R,'left:60px;right:140px;top:1040px;text-align:center;white-space:nowrap',pill('🤔 BETUL TAK?','#3a2e14','#fff','#E8B830',58),'g');
},upd(t,o){const f=outF(t,o.e);st(o.h,mix(pop(t,31.75),{o:f}));st(o.c,mix(pop(t,31.9,.4),{o:f}));st(o.q,mix(pop(t,36.2),{o:f,r:wob(t,2,1)}));
}});

// B7 KISAH: PENYIMPAN EMAS — BERMULA NILAI KECIL
scene({s:38.6,e:42.55,build(R,o){
  o.h=E(R,'left:60px;right:140px;top:300px;text-align:center;white-space:nowrap',pill('📖 KISAH BENAR','#3a2e14','#F5C542','#E8B830',62),'g');
  o.c=E(R,'left:110px;top:450px;width:780px;height:680px','<div class="card" style="position:absolute;inset:0"></div><div style="position:absolute;left:0;right:0;top:40px;text-align:center;font-size:170px;line-height:1">🧕</div><div style="position:absolute;left:0;right:0;top:240px;text-align:center;font:900 58px Mont;color:#fff;white-space:nowrap">SEORANG PENYIMPAN</div><div style="position:absolute;left:0;right:0;top:330px;text-align:center;font:800 46px Mont;color:#ddd">BERMULA DENGAN</div><div id="nk" class="gold" style="position:absolute;left:0;right:0;top:400px;text-align:center;font:900 100px Mont;white-space:nowrap;opacity:0">NILAI KECIL</div><div id="cn" style="position:absolute;left:0;right:0;top:540px;text-align:center;font-size:80px;opacity:0">🪙</div>');
},upd(t,o){const f=outF(t,o.e);st(o.h,mix(pop(t,38.65),{o:f}));st(o.c,mix(pop(t,38.85,.4),{o:f}));
  const nk=o.c.querySelector('#nk');nk.style.opacity=cl((t-41.18)/.12);nk.style.transform=`scale(${t<41.18?.6:ob((t-41.18)/.35)})`;
  const cn=o.c.querySelector('#cn');cn.style.opacity=cl((t-41.5)/.15);cn.style.transform=`translateY(${wob(t,8,1.2)}px)`;
}});

// B8 DIA TAK TUNGGU: ✕ GAJI BESAR ✕ HUTANG SELESAI
const TT=[['💼','GAJI BESAR',43.75,44.29],['📉','HUTANG SELESAI',46.86,47.56]];
scene({s:42.6,e:48.05,build(R,o){
  o.h=E(R,'left:60px;right:140px;top:300px;text-align:center;font:900 80px Mont;white-space:nowrap;color:#fff','DIA <span style="color:#ff6b6b">TAK TUNGGU</span>','g sh');
  o.it=TT.map(([e,n],i)=>E(R,`left:110px;top:${450+i*310}px;width:780px;height:260px`,`<div class="card" style="position:absolute;inset:0;display:flex;align-items:center;gap:28px;padding-left:40px;white-space:nowrap"><div style="font-size:100px">${e}</div><div style="line-height:1.1"><div style="font:800 40px Mont;color:#ddd">TUNGGU…</div><div style="font:900 ${n.length>11?40:58}px Mont;color:#fff">${n}</div></div></div>${XM(120)}`));
},upd(t,o){const f=outF(t,o.e);st(o.h,mix(pop(t,42.65),{o:f}));
  o.it.forEach((el,i)=>{const [,,t0,t1]=TT[i];st(el,mix(slide(t,t0-.3,-200,0,.35),{o:f}));el.querySelector('.xm').style.transform=`scale(${t<t1?0:ob((t1<t?(t-t1)/.3:0))})`});
}});

// B9 MULA IKUT MAMPU — KONSISTEN — SIKIT DEMI SIKIT — GRAM TERKUMPUL
scene({s:49.35,e:57.0,build(R,o){
  o.h=E(R,'left:60px;right:140px;top:300px;text-align:center;font:900 76px Mont;white-space:nowrap;color:#fff','MULA <span class="gold">IKUT MAMPU</span>','g sh');
  o.c=E(R,'left:110px;top:430px;width:780px;height:740px',`<div class="card" style="position:absolute;inset:0"></div><div id="stp" style="position:absolute;left:0;right:0;top:40px;text-align:center"><span style="display:inline-block;border:10px solid #2ecc71;border-radius:20px;padding:4px 30px;font:900 76px Mont;color:#2ecc71;transform:rotate(-6deg);background:rgba(10,8,3,.75);white-space:nowrap">KONSISTEN</span></div><div style="position:absolute;left:0;right:0;top:210px;text-align:center;font:800 44px Mont;color:#ddd">SIKIT DEMI SIKIT</div><div id="jar" style="position:absolute;left:80px;top:290px;width:620px;height:300px;display:flex;align-items:flex-end;justify-content:center;gap:18px"></div><div id="gm" style="position:absolute;left:0;right:0;top:620px;text-align:center;font:900 70px Mont;white-space:nowrap;opacity:0">GRAM <span class="gold">TERKUMPUL</span> ✓</div>`);
  const j=o.c.querySelector('#jar');for(let i=0;i<6;i++)j.insertAdjacentHTML('beforeend',`<div class="gb" style="width:84px;height:${60+i*44}px;border-radius:12px;background:linear-gradient(160deg,#FFF3B8 0%,#F5C542 30%,#D9A21F 60%,#FFE680 75%,#B8860B 100%);box-shadow:inset 0 3px 0 rgba(255,255,255,.6),0 8px 16px rgba(0,0,0,.5);transform-origin:50% 100%;transform:scaleY(0)"></div>`);
},upd(t,o){const f=outF(t,o.e);st(o.h,mix(pop(t,49.4),{o:f}));st(o.c,mix(pop(t,49.6,.4),{o:f}));
  const sp=o.c.querySelector('#stp');sp.style.opacity=cl((t-52.24)/.06);sp.style.transform=`scale(${t<52.24?2:lerp(1.8,1,eo((t-52.24)/.15))})`;
  o.c.querySelectorAll('.gb').forEach((b,i)=>{const t0=53.1+i*.55;b.style.transform=`scaleY(${eo((t-t0)/.35)})`});
  const g=o.c.querySelector('#gm');g.style.opacity=cl((t-56.19)/.15);g.style.transform=`scale(${t<56.57?1:1+.1*Math.max(0,1-(t-56.57)/.25)})`;
}});

// B10 TAK SEMESTINYA BELI 1 GRAM TERUS
scene({s:59.3,e:61.6,build(R,o){
  o.c=E(R,'left:110px;top:400px;width:780px;height:700px',`<div class="card" style="position:absolute;inset:0"></div><div style="position:absolute;left:0;right:0;top:50px;text-align:center;font:800 50px Mont;color:#ddd;white-space:nowrap">TAK SEMESTINYA</div><div style="position:absolute;left:0;right:0;top:140px;text-align:center;font:900 64px Mont;color:#fff;white-space:nowrap">BELI <span class="gold" style="font-size:110px">1 GRAM</span></div><div style="position:absolute;left:0;right:0;top:290px;display:flex;justify-content:center">${goldBar(300,150,30)}</div><div style="position:absolute;left:0;right:0;top:510px;text-align:center;font:900 76px Mont;color:#ff6b6b;white-space:nowrap">TERUS ✕</div>`);
},upd(t,o){const f=outF(t,o.e);st(o.c,mix(pop(t,59.35,.4),{o:f}));
}});

// B11 MULA DENGAN RM100 (top up akaun emas GAP)
scene({s:61.65,e:65.5,build(R,o){
  o.h=E(R,'left:60px;right:140px;top:300px;text-align:center;font:900 76px Mont;white-space:nowrap;color:#fff','✅ <span class="gold">BOLEH MULA</span>','g sh');
  o.c=E(R,'left:110px;top:440px;width:780px;height:700px','<div class="card" style="position:absolute;inset:0;border-width:5px"></div><div style="position:absolute;left:0;right:0;top:50px;text-align:center;font:800 54px Mont;color:#ddd">DENGAN</div><div id="n" class="gold" style="position:absolute;left:0;right:0;top:130px;text-align:center;font:900 210px Mont;line-height:1">RM100</div><div style="position:absolute;left:0;right:0;top:390px;text-align:center;font:900 52px Mont;color:#fff;white-space:nowrap">📱 TOP UP</div><div style="position:absolute;left:0;right:0;top:480px;text-align:center;font:900 64px Mont;white-space:nowrap"><span class="gold">AKAUN EMAS GAP</span></div><div style="position:absolute;left:0;right:0;top:580px;text-align:center;font:800 40px Mont;color:#ddd">PUBLIC GOLD</div>');
},upd(t,o){const f=outF(t,o.e);st(o.h,mix(pop(t,61.7),{o:f}));st(o.c,mix(pop(t,61.8,.4),{o:f}));
  o.c.querySelector('#n').style.transform=`scale(${t<62.51?1:1+.14*Math.max(0,1-(t-62.51)/.25)})`;
}});

// B11b (muka jelas, Adila tunjuk app) — label kecil di atas sahaja, tiada blur
scene({s:65.6,e:69.0,nob:1,build(R,o){
  o.t=E(R,'left:60px;right:140px;top:262px;text-align:center;white-space:nowrap',pill('📱 SIMPAN SIKIT-SIKIT','rgba(20,14,5,.82)','#F5C542','#E8B830',44),'g');
},upd(t,o){st(o.t,mix(pop(t,65.65),{o:outF(t,o.e)}));}});

// B12 PASTIKAN DULU ✓ KEPERLUAN ASAS ✓ KOMITMEN WAJIB
const PD=[['🍚','KEPERLUAN ASAS',71.03,71.59],['📋','KOMITMEN WAJIB',72.23,72.61]];
scene({s:70.45,e:74.35,build(R,o){
  o.h=E(R,'left:60px;right:140px;top:300px;text-align:center;font:900 80px Mont;white-space:nowrap','☝️ <span class="gold">PASTIKAN DULU</span>','g sh');
  o.it=PD.map(([e,n],i)=>E(R,`left:110px;top:${450+i*300}px;width:780px;height:250px`,`<div class="card" style="position:absolute;inset:0;display:flex;align-items:center;gap:28px;padding-left:40px;white-space:nowrap"><div style="font-size:80px">${e}</div><div style="font:900 44px Mont;color:#fff">${n}</div></div>${CKR(120)}`));
  o.f=E(R,'left:60px;right:140px;top:1060px;text-align:center;white-space:nowrap',pill('SELESAI ✓','#1e8f4e','#fff','#2ecc71',56),'g');
},upd(t,o){const f=outF(t,o.e);st(o.h,mix(pop(t,70.5),{o:f}));
  o.it.forEach((el,i)=>{const [,,t0,t1]=PD[i];st(el,mix(slide(t,t0-.25,-200,0,.35),{o:f}));el.querySelector('.xm').style.transform=`scale(${t<t1?0:ob((t-t1)/.3)})`});
  st(o.f,mix(pop(t,73.01),{o:f}));
}});

// B13 ✕ JANGAN BERHUTANG NAK SIMPAN EMAS
scene({s:74.4,e:77.55,build(R,o){
  o.c=E(R,'left:110px;top:400px;width:780px;height:720px',`<div class="card" style="position:absolute;inset:0;border-color:#ff5a5a"></div><div style="position:absolute;left:0;right:0;top:50px;text-align:center;font:900 70px Mont;color:#fff;white-space:nowrap">🚫 JANGAN</div><div style="position:absolute;left:0;right:0;top:160px;text-align:center;font:900 92px Mont;color:#ff6b6b;white-space:nowrap">BERHUTANG</div><div style="position:absolute;left:0;right:0;top:300px;display:flex;align-items:center;justify-content:center;gap:28px;white-space:nowrap"><span style="font-size:110px">⛓️</span>${goldBar(240,115,24)}</div><div style="position:absolute;left:0;right:0;top:500px;text-align:center;font:900 52px Mont;color:#fff;white-space:nowrap">SEMATA-MATA</div><div style="position:absolute;left:0;right:0;top:580px;text-align:center;font:900 60px Mont;white-space:nowrap" class="gold">NAK SIMPAN EMAS</div><div id="xx" style="position:absolute;left:0;right:0;top:250px;text-align:center;font:900 260px Mont;color:#ff3b3b;line-height:1;opacity:0">✕</div>`);
},upd(t,o){const f=outF(t,o.e);st(o.c,mix(pop(t,74.45,.4),{o:f}));
  const x=o.c.querySelector('#xx');x.style.opacity=.9*cl((t-75.0)/.08);x.style.transform=`scale(${t<75.0?2:lerp(2,1,eo((t-75.0)/.15))})`;
}});

// B14 JANGAN TUNGGU KAYA → MULAKAN DENGAN KEMAMPUAN, BUKAN PAKSAAN
scene({s:77.6,e:83.65,build(R,o){
  o.a=E(R,'left:110px;top:360px;width:780px;height:220px','<div class="card" style="position:absolute;inset:0;display:flex;align-items:center;justify-content:center;gap:24px;white-space:nowrap"><span style="font-size:70px">⏳</span><span style="font:900 50px Mont;color:#fff">JANGAN TUNGGU <span style="color:#ff6b6b">KAYA</span></span></div><div id="ln" style="position:absolute;left:50px;top:104px;height:12px;width:0;background:#ff3b3b;border-radius:6px;transform:rotate(-3deg)"></div>');
  o.b=E(R,'left:110px;top:650px;width:780px;height:470px',`<div class="card" style="position:absolute;inset:0;border-width:5px"></div><div style="position:absolute;left:0;right:0;top:40px;text-align:center;font:700 italic 80px Play;white-space:nowrap"><span class="gold">mulakan dengan</span></div><div id="km" class="gold" style="position:absolute;left:0;right:0;top:150px;text-align:center;font:900 100px Mont;white-space:nowrap">KEMAMPUAN</div><div id="bp" style="position:absolute;left:0;right:0;top:310px;text-align:center;font:900 60px Mont;color:#ddd;white-space:nowrap;opacity:0">BUKAN <span style="color:#ff6b6b;text-decoration:line-through;text-decoration-thickness:8px">PAKSAAN</span></div>${CK(100)}`);
},upd(t,o){const f=outF(t,o.e);st(o.a,mix(pop(t,77.65),{o:f*(t>80.6?lerp(1,.55,cl((t-80.6)/.4)):1)}));
  o.a.querySelector('#ln').style.width=680*eo((t-79.1)/.4)+'px';
  st(o.b,mix(pop(t,80.6),{o:f}));o.b.querySelector('#km').style.transform=`scale(${t<81.28?1:1+.1*Math.max(0,1-(t-81.28)/.25)})`;
  o.b.querySelector('#bp').style.opacity=cl((t-82.08)/.15);o.b.querySelector('.ck').style.transform=`scale(${t<81.28?0:ob((t-81.28)/.3)})`;
}});

// B15 CTA: BERMANFAAT? → BELAJAR MULA SIMPAN EMAS IKUT GAJI → KLIK LINK DI BAWAH
scene({s:85.3,e:999,build(R,o){
  o.h=E(R,'left:60px;right:140px;top:300px;text-align:center;font:900 76px Mont;white-space:nowrap','💛 <span style="color:#fff">BERMANFAAT?</span>','g sh');
  o.c=E(R,'left:110px;top:430px;width:780px;height:400px',`<div class="card" style="position:absolute;inset:0"></div><div style="position:absolute;left:0;right:0;top:40px;text-align:center;font:800 46px Mont;color:#ddd">BELAJAR CARA</div><div style="position:absolute;left:0;right:0;top:110px;display:flex;align-items:center;justify-content:center;gap:24px;white-space:nowrap">${goldBar(150,70,15)}<span class="gold" style="font:900 64px Mont">MULA SIMPAN</span></div><div style="position:absolute;left:0;right:0;top:230px;text-align:center;font:900 54px Mont;color:#fff;white-space:nowrap">IKUT KEMAMPUAN GAJI</div>`);
  o.btn=E(R,'left:150px;top:900px;width:700px;height:190px','<div class="card" style="position:absolute;inset:0;border-radius:95px;display:flex;align-items:center;justify-content:center;gap:24px;font:900 76px Mont;white-space:nowrap"><span>🔗</span><span class="gold">KLIK LINK</span></div><div class="fg" style="position:absolute;right:-20px;bottom:-70px;font-size:110px;opacity:0">👆</div>');
  o.dn=E(R,'left:60px;right:140px;top:1110px;text-align:center;font:900 60px Mont;color:#fff;white-space:nowrap','DI BAWAH 👇','g sh');
},upd(t,o){st(o.h,pop(t,85.35));st(o.c,pop(t,87.18,.4));
  st(o.btn,mix(pop(t,91.44),{s:t>91.94&&t<92.14?.92:1+.03*Math.sin(t*7)}));const fg=o.btn.querySelector('.fg');fg.style.opacity=t>91.75?1:0;fg.style.transform=`translateY(${Math.abs(Math.sin(t*5))*-16}px)`;
  st(o.dn,mix(pop(t,92.3),{y:wob(t,10,1.4)}));
}});

