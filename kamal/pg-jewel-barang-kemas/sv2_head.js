
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
