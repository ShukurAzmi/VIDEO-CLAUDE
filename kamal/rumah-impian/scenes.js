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
  o.h=H(R,head('BAYANGKAN…','RUMAH IDAMAN 🏡',46,76));
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
  o.c=E(R,'left:190px;top:520px;width:620px;height:380px',`<div style="position:absolute;inset:0;border-radius:34px;background:linear-gradient(140deg,#3b3b46,#16161c);border:4px solid #888;box-shadow:0 20px 50px rgba(0,0,0,.7)">${SHN}
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
  o.h=H(R,head('SIMPAN DALAM BENTUK','DUIT 💵',46,90));
  o.c=E(R,'left:340px;top:480px;width:320px;height:320px',glow+big('💸',280));
  o.no=E(R,'left:60px;right:140px;top:850px;text-align:center;white-space:nowrap',pill('✕ SELALU GAGAL','#5a1414','#fff','#ff6b6b',58),'g');
  o.ok=E(R,'left:110px;top:990px;width:780px;height:170px',`<div class="card" style="position:absolute;inset:0;display:flex;align-items:center;justify-content:center;gap:20px;font:900 62px Mont;white-space:nowrap">${SHN}<span>🔄</span><span class="gold">UBAH CARA SIMPAN</span></div>`);
},upd(t,o){const f=outF(t,o.e);st(o.h,mix(pop(t,37.6),{o:f}));st(o.c,mix(pop(t,39.6,.45),{o:f,y:wob(t,10,.6),r:wob(t,4,.4)}));
  st(o.no,mix(pop(t,41.58),{o:f,r:-3}));st(o.ok,mix(slide(t,42.84,0,80,.4),{o:f}));shine(o.ok,t,43.2);}});

// B7 CONTOH: 3 cara — asingkan duit / tabung khas / emas
scene({s:44.6,e:52.75,build(R,o){
  o.h=H(R,head('CONTOH','CARA MENYIMPAN',46,80));
  o.r=[['✂️','ASINGKAN BILA DAPAT GAJI',40],['🐷','BINA TABUNG KHAS',44],['🪙','SIMPAN DALAM EMAS',44]].map(([e,x,fs],i)=>E(R,`left:110px;top:${490+i*175}px;width:780px;height:155px`,row(e,x,1,fs)));
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
  o.h=H(R,head('TAPI KITA BINA','TEMPAT 💛',46,96));
  o.r=[['👨‍👩‍👧','UNTUK KELUARGA',44],['🧒','ANAK-ANAK MEMBESAR',40],['🏡','TEMPAT KITA PULANG',42]].map(([e,x,fs],i)=>E(R,`left:110px;top:${510+i*180}px;width:780px;height:160px`,row(e,x,1,fs)));
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

