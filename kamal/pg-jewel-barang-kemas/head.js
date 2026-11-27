// Kamal — "Cara tahu emas bukan palsu: 3 soalan wajib" — komposisi deterministik window.render(t)
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

// ---------- latar ----------
const BGFX=$('#bgfx');const SP=[];
for(let i=0;i<40;i++){const r=(i*9301+49297)%233280/233280,r2=(i*4253+1237)%1000/1000;
  SP.push([E(BGFX,`left:0;top:0;width:${4+r*8}px;height:${4+r*8}px;border-radius:50%;background:#F5C542;box-shadow:0 0 12px #F5C542`),r,r2])}
function bgUpd(t,bl){BGFX.style.opacity=bl;for(const [el,r,r2] of SP){const y=1920-((t*(30+r*60)+r2*1920)%2100);el.style.transform=`translate(${(r*1080+wob(t,40,.1,r*9))}px,${y}px)`;el.style.opacity=.2+.5*Math.abs(Math.sin(t*(1+r)+r2*6))}}

const goldBar=(w=150,h=70,fs=15)=>`<div class="bar" style="width:${w}px;height:${h}px;font-size:${fs}px;line-height:1;text-align:center;flex-direction:column">PUBLIC GOLD<span style="font-size:${fs*.75}px;font-weight:800;opacity:.8;margin-top:3px">999.9</span></div>`;
const CK=(sz)=>`<div class="ck" style="position:absolute;right:-${sz/3}px;top:-${sz/3}px;width:${sz}px;height:${sz}px;border-radius:50%;background:#2ecc71;color:#fff;font:900 ${sz*.65}px Mont;display:flex;align-items:center;justify-content:center;box-shadow:0 4px 12px rgba(0,0,0,.5)">✓</div>`;
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
