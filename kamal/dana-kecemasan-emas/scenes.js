// ---------- babak: "Dana kecemasan dulu atau simpan emas?" (masa = output selepas potong) ----------
const SC=[];
function scene(o){o.root=E(G,'left:0;top:0;width:1080px;height:1920px','', 'g');o.build(o.root,o);SC.push(o)}
const outF=(t,e)=>1-cl((t-(e-.22))/.22);
const pill=(tx,bg='#3a2e14',c='#ddd',bd='#6b5520',fs=60)=>`<div style="display:inline-block;background:${bg};border:3px solid ${bd};color:${c};font:900 ${fs}px Mont;padding:10px 44px;border-radius:50px">${tx}</div>`;
const TW=()=>[[.18,.22],[.78,.3],[.62,.68],[.3,.8],[.85,.82]].map(([x,y])=>`<div class="tw" style="position:absolute;left:${x*100}%;top:${y*100}%;width:46px;height:46px;margin:-23px;opacity:0;background:radial-gradient(circle,#fff 0%,rgba(255,240,180,.9) 18%,transparent 55%);clip-path:polygon(50% 0,58% 42%,100% 50%,58% 58%,50% 100%,42% 58%,0 50%,42% 42%);filter:drop-shadow(0 0 8px #FFE680)"></div>`).join('');
const twUpd=(el,t,t0)=>el.querySelectorAll('.tw').forEach((w,i)=>{const p=((t-t0)*1.3+i*.37)%1.6;const k=p<.6?Math.sin(Math.PI*p/.6):0;w.style.opacity=t>t0+.3?k:0;w.style.transform=`scale(${.3+k}) rotate(${p*90}deg)`});
const SHN='<div class="shn" style="position:absolute;top:-200px;left:0;width:120px;height:1400px;background:linear-gradient(90deg,transparent,rgba(255,246,200,.45),transparent);pointer-events:none;opacity:0"></div>';
const badge=(tx,sz=170)=>`<div style="width:${sz}px;height:${sz}px;border-radius:50%;background:linear-gradient(160deg,#FFF0B0,#F5C542 45%,#C8901A);border:6px solid #fff3c4;box-shadow:0 10px 26px rgba(0,0,0,.6);display:flex;align-items:center;justify-content:center;font:900 ${sz*.36}px Mont;color:#3a2600">${tx}</div>`;
const shine=(el,t,t0)=>{const s=el.querySelector('.shn');if(s){const k=cl((t-t0)/.9);s.style.transform=`translateX(${lerp(-500,900,k)}px) rotate(20deg)`;s.style.opacity=k>0&&k<1?1:0}};
const goldTx=(tx,sz)=>`<span class="gold" style="font:900 ${sz}px Mont">${tx}</span>`;
const card=(html,css='')=>`<div class="card" style="position:absolute;inset:0;${css}">${html}</div>`;
const XC=(ok,sz=110)=>`<div style="width:${sz}px;height:${sz}px;border-radius:50%;background:${ok?'#2ecc71':'#e74c3c'};color:#fff;font:900 ${sz*.6}px Mont;display:flex;align-items:center;justify-content:center;box-shadow:0 6px 14px rgba(0,0,0,.5)">${ok?'✓':'✕'}</div>`;
// teks dicoret
const strike=(html)=>`<span style="position:relative;display:inline-block">${html}<span class="sk" style="position:absolute;left:-12px;top:52%;height:16px;width:0;background:#ff4d4d;border-radius:8px;transform:rotate(-5deg);box-shadow:0 3px 8px #000"></span></span>`;
const skUpd=(el,t,t0)=>{el.querySelector('.sk').style.width=(cl((t-t0)/.25)*108)+'%'};
// balang (isi naik)
const jar=(ic,lb,col)=>`<div style="position:absolute;left:0;top:0;width:330px;height:430px;border-radius:30px 30px 60px 60px;border:6px solid ${col};background:rgba(10,8,4,.7);overflow:hidden;box-shadow:0 14px 40px rgba(0,0,0,.6)">
  <div class="fill" style="position:absolute;left:0;right:0;bottom:0;height:0;background:${col==='#E8B830'?'linear-gradient(90deg,#B8860B,#FFE680 35%,#F5C542 60%,#C8901A)':'linear-gradient(90deg,#1e7a4a,#5fe39a 40%,#2ecc71 70%,#1e7a4a)'};box-shadow:0 -6px 20px rgba(255,255,255,.3)">${SHN}</div>
  <div style="position:absolute;left:0;right:0;top:120px;text-align:center;font-size:120px;line-height:1">${ic}</div></div>
  <div style="position:absolute;left:-30px;top:450px;width:390px;text-align:center;font:900 40px Mont;color:#fff;white-space:nowrap;line-height:1.15">${lb}</div>`;
const jarUpd=(el,t,t0,p)=>{el.querySelector('.fill').style.height=(p*eo((t-t0)/.9))+'%';shine(el,t,t0+.6)};

// B1 (2.4) DANA KECEMASAN DULU? vs SIMPAN EMAS — ATAU DUA-DUA?
scene({s:2.4,e:6.25,build(R,o){
  o.h=E(R,'left:60px;right:140px;top:290px;text-align:center;white-space:nowrap',goldTx('MANA DULU?',96),'g sh');
  o.c1=E(R,'left:110px;top:460px;width:370px;height:420px',card(`<div style="text-align:center;padding-top:40px;line-height:1.15"><div style="font-size:150px;line-height:1">🛟</div><div style="font:900 44px Mont;color:#fff;margin-top:26px;white-space:nowrap">DANA</div><div style="font:900 44px Mont;color:#fff;white-space:nowrap">KECEMASAN</div></div>`));
  o.c2=E(R,'left:520px;top:460px;width:370px;height:420px',card(`<div style="text-align:center;padding-top:40px;line-height:1.15;position:relative;height:100%"><div style="font-size:150px;line-height:1">🪙</div><div style="font:900 44px Mont;color:#fff;margin-top:26px;white-space:nowrap">SIMPAN</div><div class="gold" style="font:900 52px Mont;white-space:nowrap">EMAS</div>${TW()}</div>`));
  o.vs=E(R,'left:440px;top:610px;width:120px;text-align:center;font:700 italic 80px Play;color:#fff','vs','g sh');
  o.q=E(R,'left:60px;right:140px;top:940px;text-align:center;white-space:nowrap',pill('ATAU DUA-DUA? 🤔','#5a1414','#fff','#ff6b6b',48),'g');
  o.b=E(R,'left:60px;right:140px;top:1080px;text-align:center;white-space:nowrap;font:800 42px Mont;color:#ddd','📅 DALAM BULAN YANG SAMA','g sh');
},upd(t,o){const f=outF(t,o.e);st(o.h,mix(pop(t,2.45),{o:f}));st(o.c1,mix(slide(t,2.55,-160,0,.45),{o:f,r:-2}));st(o.vs,mix(pop(t,2.85),{o:f}));
  st(o.c2,mix(slide(t,2.85,160,0,.45),{o:f,r:2}));twUpd(o.c2,t,2.9);st(o.q,mix(pop(t,4.62,.35),{o:f,s:1+.015*Math.sin(t*9)}));st(o.b,mix(slide(t,5.3,0,60,.35),{o:f}));
}});

// (muka jelas 6.25–9.4) "Bagi Dila, dana kecemasan memang perlu diutamakan" — zoom

// B2 KITA TAK TAHU BILA… (3 kecemasan)
scene({s:9.5,e:16.95,build(R,o){
  o.h=E(R,'left:60px;right:140px;top:290px;text-align:center;white-space:nowrap;line-height:1.05','<div style="font:800 46px Mont;color:#ddd">KITA TAK TAHU BILA…</div>'+goldTx('⚠️ KECEMASAN',84),'g sh');
  o.it=[['🚗','KERETA ROSAK'],['🏥','MASUK HOSPITAL'],['⚡','PERLU DUIT SEGERA']].map(([e,tx],i)=>E(R,`left:110px;top:${500+i*215}px;width:780px;height:180px`,card(`<div style="position:absolute;left:34px;top:30px;font-size:110px;line-height:1">${e}</div><div style="position:absolute;left:190px;top:58px;font:900 ${i==2?52:58}px Mont;color:#fff;white-space:nowrap">${tx}</div>`)));
},upd(t,o){const f=outF(t,o.e);st(o.h,mix(pop(t,9.55),{o:f}));
  o.it.forEach((el,i)=>{const t0=[11.1,13.6,15.8][i];st(el,mix(slide(t,t0,200,0,.4),{o:f,r:t>t0&&t<t0+.5?wob(t,2,4):0}))});
}});

// B3 SIMPANAN TUNAI — mudah dikeluarkan
scene({s:17.1,e:21.95,build(R,o){
  o.h=E(R,'left:60px;right:140px;top:290px;text-align:center;white-space:nowrap;line-height:1.05','<div style="font:800 46px Mont;color:#ddd">SEBAB ITULAH PERLU</div><div style="font:900 84px Mont;color:#fff">SIMPANAN <span style="color:#5fe39a">TUNAI</span></div>','g sh');
  o.w=E(R,'left:340px;top:470px;width:320px;height:320px;font-size:280px;line-height:1;text-align:center','💵');
  o.n=[0,1,2].map(i=>E(R,`left:${330+i*120}px;top:600px;width:120px;font-size:100px;line-height:1;text-align:center;opacity:0`,'💸'));
  o.c=E(R,'left:110px;top:880px;width:780px;height:190px',card(`<div style="position:absolute;left:40px;top:38px;font-size:110px;line-height:1">🏧</div><div style="position:absolute;left:190px;top:34px;line-height:1.1;white-space:nowrap"><div style="font:800 40px Mont;color:#ddd">MUDAH UNTUK</div><div class="gold" style="font:900 52px Mont">DIKELUARKAN</div></div><div style="position:absolute;right:30px;top:40px">${XC(1,110)}</div>`));
},upd(t,o){const f=outF(t,o.e);st(o.h,mix(pop(t,17.15),{o:f}));st(o.w,mix(pop(t,19.2,.4),{o:f,y:wob(t,10,.8),r:wob(t,4,.5)}));
  o.n.forEach((el,i)=>{const k=cl((t-19.5-i*.25)/1.2);el.style.opacity=k>0&&k<1?f*(1-k):0;el.style.transform=`translate(${(i-1)*120*k}px,${-220*k}px) rotate(${(i-1)*30*k}deg)`});
  st(o.c,mix(slide(t,20.75,0,80,.4),{o:f}));
}});

// B4 JANGAN TANGGUH BERTAHUN-TAHUN (kalendar berputar) — tunggu "sempurna" ✕
scene({s:24.65,e:29.95,build(R,o){
  o.h=E(R,'left:60px;right:140px;top:290px;text-align:center;white-space:nowrap;line-height:1.05','<div style="font:800 46px Mont;color:#ddd">JANGAN TANGGUH</div><div style="font:900 78px Mont;color:#fff">SIMPAN <span class="gold">EMAS</span></div>','g sh');
  o.cal=E(R,'left:330px;top:480px;width:340px;height:360px',`<div style="position:absolute;inset:0;border-radius:30px;background:#f4efe4;box-shadow:0 14px 40px rgba(0,0,0,.6);overflow:hidden"><div style="height:90px;background:#b8322a;color:#fff;font:900 46px Mont;text-align:center;line-height:90px">TAHUN</div><div class="yr" style="font:900 120px Mont;color:#2a1d00;text-align:center;line-height:250px">2026</div></div><div style="position:absolute;right:-70px;top:-40px;font-size:110px">⏳</div>`);
  o.y=E(R,'left:60px;right:140px;top:880px;text-align:center;white-space:nowrap;font:900 62px Mont;color:#ff8a7a','BERTAHUN-TAHUN…','g sh');
  o.p=E(R,'left:110px;top:1010px;width:780px;height:170px',card(`<div style="text-align:center;padding-top:16px;line-height:1.1;white-space:nowrap"><div style="font:800 38px Mont;color:#ddd">TUNGGU DANA KECEMASAN</div><div style="font:900 64px Mont;color:#fff">${strike('"SEMPURNA"')}</div></div>`));
},upd(t,o){const f=outF(t,o.e);st(o.h,mix(pop(t,24.7),{o:f}));st(o.cal,mix(pop(t,25.0),{o:f,r:-3}));
  const yr=2026+Math.min(5,Math.floor(Math.max(0,t-25.87)/.32));o.cal.querySelector('.yr').textContent=yr;
  st(o.y,mix(pop(t,25.87),{o:f}));st(o.p,mix(slide(t,27.6,0,80,.4),{o:f}));skUpd(o.p,t,29.41);
}});

// B5 BAHAGI — sedikit dana kecemasan + sedikit simpanan emas (2 balang)
scene({s:30.15,e:37.05,build(R,o){
  o.h=E(R,'left:60px;right:140px;top:280px;text-align:center;white-space:nowrap;line-height:1.05','<div style="font:800 44px Mont;color:#ddd">JIKA KEMAMPUAN MENGIZINKAN</div>'+goldTx('BAHAGIKAN ✂️',90),'g sh');
  o.j1=E(R,'left:130px;top:520px;width:330px;height:520px',jar('🛟','DANA<br>KECEMASAN','#2ecc71'));
  o.j2=E(R,'left:540px;top:520px;width:330px;height:520px',jar('🪙','SIMPANAN<br><span class="gold">EMAS</span>','#E8B830'));
  o.c=E(R,'left:420px;top:410px;width:160px;height:120px;font-size:96px;line-height:1;text-align:center','💰');
},upd(t,o){const f=outF(t,o.e);st(o.h,mix(pop(t,30.2),{o:f}));st(o.j1,mix(slide(t,30.7,-150,0,.45),{o:f}));st(o.j2,mix(slide(t,30.9,150,0,.45),{o:f}));
  st(o.c,mix(pop(t,32.6),{o:f*(t<36.6?1:0),y:wob(t,8,1.2)}));
  jarUpd(o.j1,t,33.94,55);jarUpd(o.j2,t,36.04,40);
}});

// B6 TAK PERLU JUMLAH BESAR → MULA IKUT KEMAMPUAN
scene({s:37.15,e:42.0,build(R,o){
  o.h=E(R,'left:60px;right:140px;top:300px;text-align:center;white-space:nowrap;font:800 50px Mont;color:#ddd','TAK PERLU MULA DENGAN','g sh');
  o.b=E(R,'left:60px;right:140px;top:380px;text-align:center;white-space:nowrap',strike('<span style="font:900 86px Mont;color:#fff">JUMLAH BESAR</span>'),'g sh');
  o.bars=E(R,'left:200px;top:600px;width:600px;height:300px',[0,1,2].map(i=>`<div class="gb" style="position:absolute;left:${140+i*40}px;top:${200-i*76}px;opacity:0">${goldBar(300,70,22)}</div>`).join('')+TW());
  o.ok=E(R,'left:110px;top:950px;width:780px;height:180px',card(`<div style="position:absolute;left:40px;top:28px;line-height:1.1;white-space:nowrap"><div style="font:800 40px Mont;color:#ddd">MULA DENGAN APA</div><div class="gold" style="font:900 52px Mont">YANG KITA MAMPU</div></div><div style="position:absolute;right:30px;top:35px">${XC(1,110)}</div>`));
},upd(t,o){const f=outF(t,o.e);st(o.h,mix(pop(t,37.2),{o:f}));st(o.b,mix(pop(t,38.43),{o:f}));skUpd(o.b,t,39.13);
  st(o.bars,{o:f});o.bars.querySelectorAll('.gb').forEach((g,i)=>{const t0=39.9+i*.35;g.style.opacity=cl((t-t0)/.15);g.style.transform=`translateY(${-80*(1-eo((t-t0)/.35))}px)`});twUpd(o.bars,t,40.3);
  st(o.ok,mix(slide(t,40.4,0,80,.4),{o:f}));
}});

// (muka jelas 42.0–44.8) "Ingat, keduanya ada fungsi yang berbeza" — zoom
// B7 FUNGSI BERBEZA: TUNAI vs EMAS
scene({s:44.8,e:54.85,build(R,o){
  o.h=E(R,'left:60px;right:140px;top:280px;text-align:center;white-space:nowrap',goldTx('FUNGSI BERBEZA',86),'g sh');
  const col=(ic,tt,c,a,b)=>card(`<div style="text-align:center;padding-top:30px;line-height:1.1"><div style="font-size:120px;line-height:1">${ic}</div><div style="font:900 58px Mont;color:${c};margin-top:18px;white-space:nowrap">${tt}</div></div>
    <div class="l1" style="position:absolute;left:20px;right:20px;top:290px;height:150px;border-radius:22px;background:rgba(255,255,255,.07);text-align:center;padding-top:22px;line-height:1.1;white-space:nowrap;opacity:0">${a}</div>
    <div class="l2" style="position:absolute;left:20px;right:20px;top:460px;height:150px;border-radius:22px;background:rgba(255,255,255,.07);text-align:center;padding-top:22px;line-height:1.1;white-space:nowrap;opacity:0">${b}</div>`);
  o.c1=E(R,'left:90px;top:420px;width:395px;height:650px',col('💵','TUNAI','#5fe39a','<div style="font-size:50px">🚨</div><div style="font:900 34px Mont;color:#fff">KECEMASAN</div>','<div style="font-size:50px">⏱️</div><div style="font:900 30px Mont;color:#fff">JANGKA PENDEK</div>'));
  o.c2=E(R,'left:515px;top:420px;width:395px;height:650px',col('🪙','EMAS','#F5C542','<div style="font-size:50px">🏦</div><div style="font:900 34px Mont;color:#fff">SIMPANAN</div>','<div style="font-size:50px">📈</div><div style="font:900 30px Mont;color:#F5C542">JANGKA PANJANG</div>')+`<div style="position:absolute;inset:0;pointer-events:none">${TW()}</div>`);
},upd(t,o){const f=outF(t,o.e);st(o.h,mix(pop(t,44.85),{o:f}));st(o.c1,mix(slide(t,44.9,-150,0,.45),{o:f}));
  const L=(el,cls,t0)=>{const x=el.querySelector(cls);x.style.opacity=cl((t-t0)/.15);x.style.transform=`scale(${t<t0?0:ob((t-t0)/.35)})`};
  L(o.c1,'.l1',46.45);L(o.c1,'.l2',47.15);
  st(o.c2,mix(slide(t,48.81,150,0,.45),{o:f*cl((t-48.81)/.2)}));twUpd(o.c2,t,49.3);L(o.c2,'.l1',52.54);L(o.c2,'.l2',52.96);
}});

// B8 JANGAN TUNGGU KEWANGAN SEMPURNA → MULA MENYIMPAN
scene({s:54.95,e:59.25,build(R,o){
  o.h=E(R,'left:60px;right:140px;top:330px;text-align:center;white-space:nowrap;line-height:1.05','<div style="font:800 52px Mont;color:#ddd">JANGAN TUNGGU</div><div style="font:900 80px Mont;color:#fff">KEWANGAN</div>','g sh');
  o.sm=E(R,'left:60px;right:140px;top:540px;text-align:center;white-space:nowrap',strike('<span style="font:900 110px Mont;color:#ff8a7a">SEMPURNA</span>'),'g sh');
  o.btn=E(R,'left:150px;top:780px;width:700px;height:200px','<div class="card" style="position:absolute;inset:0;border-radius:100px;display:flex;align-items:center;justify-content:center;gap:18px;font:900 56px Mont;white-space:nowrap"><span>🚀</span><span class="gold">MULA SEKARANG</span></div>'+SHN);
},upd(t,o){const f=outF(t,o.e);st(o.h,mix(pop(t,55.0),{o:f}));st(o.sm,mix(pop(t,56.77),{o:f}));skUpd(o.sm,t,57.43);
  st(o.btn,mix(pop(t,58.29,.4),{o:f,s:1+.03*Math.sin(t*7)}));shine(o.btn,t,58.6);
}});

// B9 YANG PALING PENTING: BUKAN BERAPA BANYAK ✕ — KONSISTEN ✓ (bar naik setiap bulan)
scene({s:60.6,e:67.95,build(R,o){
  o.h=E(R,'left:60px;right:140px;top:280px;text-align:center;white-space:nowrap',goldTx('PALING PENTING',84),'g sh');
  o.a=E(R,'left:110px;top:400px;width:780px;height:150px',card(`<div style="position:absolute;left:40px;top:44px;font:900 54px Mont;color:#ddd;white-space:nowrap">BERAPA BANYAK</div><div style="position:absolute;right:26px;top:22px">${XC(0,105)}</div>`));
  o.b=E(R,'left:110px;top:580px;width:780px;height:150px',card(`<div style="position:absolute;left:40px;top:38px;white-space:nowrap">${goldTx('KONSISTEN',72)}</div><div style="position:absolute;right:26px;top:22px">${XC(1,105)}</div>`,'border-color:#2ecc71'));
  o.ch=E(R,'left:110px;top:770px;width:780px;height:400px',card(`<div style="position:absolute;left:30px;top:18px;font:800 30px Mont;color:#bbb">SIMPANAN EMAS (GRAM)</div>`+[1,2,3,4,5,6].map(i=>`<div class="cb" style="position:absolute;left:${40+(i-1)*120}px;bottom:60px;width:90px;height:0;border-radius:12px 12px 4px 4px;background:linear-gradient(90deg,#C8901A,#FFE680 50%,#F5C542);box-shadow:0 0 16px rgba(245,197,66,.5)"></div><div style="position:absolute;left:${40+(i-1)*120}px;bottom:18px;width:90px;text-align:center;font:800 26px Mont;color:#ddd">B${i}</div>`).join('')+TW()));
  o.n=E(R,'left:600px;top:1180px;width:290px;text-align:right;font:800 24px Mont;color:#bbb','*ilustrasi','g');
},upd(t,o){const f=outF(t,o.e);st(o.h,mix(pop(t,60.65),{o:f}));st(o.a,mix(slide(t,61.25,-150,0,.4),{o:f}));
  st(o.b,mix(pop(t,63.83),{o:f}));st(o.ch,mix(slide(t,64.2,0,80,.4),{o:f}));st(o.n,{o:f*cl((t-64.4)/.3)});
  o.ch.querySelectorAll('.cb').forEach((b,i)=>{b.style.height=(40+i*48)*eo((t-64.6-i*.35)/.4)+'px'});twUpd(o.ch,t,66.5);
}});

// (muka jelas 68.0–73.45) SAVE & SHARE — label kecil sahaja
scene({s:71.4,e:73.45,nob:1,build(R,o){o.t=E(R,'left:60px;right:140px;top:262px;text-align:center;white-space:nowrap',pill('🔖 SAVE &nbsp;•&nbsp; 📤 SHARE','rgba(20,14,5,.82)','#F5C542','#E8B830',40),'g')},upd(t,o){st(o.t,mix(pop(t,71.45),{o:outF(t,o.e)}))}});

// B10 CTA KLIK LINK DI BIO
scene({s:73.5,e:999,build(R,o){
  o.h=E(R,'left:60px;right:140px;top:330px;text-align:center;line-height:1.05;white-space:nowrap','<div style="font:800 50px Mont;color:#ddd">NAK MULAKAN</div><div class="gold" style="font:900 84px Mont">SIMPANAN EMAS?</div>','g sh');
  o.btn=E(R,'left:150px;top:620px;width:700px;height:190px','<div class="card" style="position:absolute;inset:0;border-radius:95px;display:flex;align-items:center;justify-content:center;gap:24px;font:900 72px Mont;white-space:nowrap"><span>🔗</span><span class="gold">KLIK LINK</span></div><div class="fg" style="position:absolute;right:-20px;bottom:-70px;font-size:110px;opacity:0">👆</div>');
  o.dn=E(R,'left:60px;right:140px;top:900px;text-align:center;font:900 70px Mont;color:#fff;white-space:nowrap','DI BIO ✨','g sh');
},upd(t,o){st(o.h,pop(t,73.55));
  st(o.btn,mix(pop(t,75.43),{s:t>75.72&&t<75.9?.92:1+.03*Math.sin(t*7)}));const fg=o.btn.querySelector('.fg');fg.style.opacity=t>75.55?1:0;fg.style.transform=`translateY(${Math.abs(Math.sin(t*5))*-16}px)`;
  st(o.dn,mix(pop(t,76.16),{y:wob(t,8,1.4)}));
}});
