import json,sys,os,math
from playwright.sync_api import sync_playwright
PAGE=r"""<html><head><style>
html,body{margin:0;width:1080px;height:1920px;background:transparent;overflow:hidden;font-family:Inter,sans-serif}
.el{position:absolute;left:0;right:0;display:flex;justify-content:center;opacity:0}
.hdr{top:150px}
.hbox{padding:22px 46px 26px;border-radius:22px;text-align:center;background:linear-gradient(#3a2511,#1c1108);border:4px solid #D9A93A;box-shadow:0 10px 30px rgba(0,0,0,.5),inset 0 0 0 2px rgba(255,220,140,.25)}
.hn{color:#E8B94A;font-weight:700;font-size:30px;letter-spacing:9px}
.ht{color:#fff;font-weight:800;font-size:54px;line-height:1.12;margin-top:6px;text-transform:uppercase;max-width:800px}
.pop{top:1010px;flex-direction:column;align-items:center}
.pt{font-weight:900;font-size:56px;text-transform:uppercase;text-shadow:0 4px 0 #000,0 0 18px rgba(0,0,0,.8);-webkit-text-stroke:2px #000;paint-order:stroke fill}
.pm{font-weight:900;font-size:88px;line-height:1.05;text-align:center;text-transform:uppercase;max-width:980px;-webkit-text-stroke:3px #000;paint-order:stroke fill;text-shadow:0 6px 0 #000,0 0 26px rgba(0,0,0,.7)}
.icon{position:absolute;left:50px;top:20px}
.cap{top:1330px}
.ct{font-weight:900;font-size:50px;color:#fff;text-transform:uppercase;-webkit-text-stroke:2.5px #000;paint-order:stroke fill;text-shadow:0 4px 6px rgba(0,0,0,.8)}
.ct b{color:#F5C542}
.cta{top:1180px}
.cbox{display:flex;align-items:center;gap:22px;padding:26px 46px;border-radius:999px;background:linear-gradient(135deg,#F5C542,#C9930F);box-shadow:0 12px 40px rgba(0,0,0,.35)}
.gr{top:1010px}
.gbox{width:800px;padding:20px 30px 16px;border-radius:24px;background:linear-gradient(#3a2511,#1c1108);border:4px solid #D9A93A;box-shadow:0 10px 30px rgba(0,0,0,.5)}
.orb{position:absolute;left:0;top:0;opacity:0}
</style></head><body><div id=orbit></div><div id=root></div></body></html>"""
ICONS={
 "chart":'<svg width=150 height=115 viewBox="0 0 170 130"><path d="M8 4V122H166" stroke="#fff" stroke-width="6" fill="none"/><path d="M20 105L60 80L95 92L150 40" stroke="#F5C542" stroke-width="9" fill="none" stroke-linecap="round" stroke-linejoin="round"/><circle cx="150" cy="40" r="11" fill="#F5C542"/></svg>',
 "shield":'<svg width=115 height=135 viewBox="0 0 130 150"><path d="M65 6L120 26V70C120 106 96 132 65 144C34 132 10 106 10 70V26Z" fill="#F5C542" stroke="#9A6B00" stroke-width="6"/><path d="M38 75L58 95L95 52" stroke="#1a5e20" stroke-width="13" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>',
 "bar":'<svg width=120 height=170 viewBox="0 0 150 210"><defs><linearGradient id=g x1=0 x2=1 y1=0 y2=1><stop offset=0 stop-color="#FFE48A"/><stop offset=.5 stop-color="#E0A82E"/><stop offset=1 stop-color="#9A6B00"/></linearGradient></defs><rect x=8 y=8 width=134 height=194 rx=12 fill="url(#g)" stroke="#7a5200" stroke-width=5 transform="rotate(-8 75 105)"/><text x=75 y=112 text-anchor=middle font-family=Inter font-weight=900 font-size=30 fill="#5a3c00" transform="rotate(-8 75 105)">GOLD</text></svg>'}
COIN='<svg width=64 height=64 viewBox="0 0 64 64"><defs><radialGradient id=c cx=.35 cy=.3><stop offset=0 stop-color="#FFF0A8"/><stop offset=.55 stop-color="#F5C542"/><stop offset=1 stop-color="#A9760A"/></radialGradient></defs><circle cx=32 cy=32 r=29 fill="url(#c)" stroke="#8a5d00" stroke-width=3/><circle cx=32 cy=32 r=21 fill=none stroke="#B5820E" stroke-width=2.5/><text x=32 y=42 text-anchor=middle font-family=Inter font-weight=900 font-size=28 fill="#8a5d00">G</text></svg>'
SPARK='<svg width=48 height=48 viewBox="0 0 48 48"><path d="M24 0C26 15 33 22 48 24C33 26 26 33 24 48C22 33 15 26 0 24C15 22 22 15 24 0Z" fill="#FFE9A0"/></svg>'
JS=r"""
(ev)=>{
 const R=document.getElementById('root'),E='cubic-bezier(.22,1,.36,1)',B='cubic-bezier(.34,1.56,.64,1)';
 const mk=(cls,html)=>{const d=document.createElement('div');d.className='el '+cls;d.innerHTML=html;R.appendChild(d);return d};
 const win=(el,s,e,kin,kout,easing)=>{const D=(e-s)*1000,a=Math.min(300,D/3)/D,b=1-Math.min(200,D/4)/D;
  el.animate([Object.assign({opacity:0,easing:easing||E},kin),Object.assign({opacity:1,transform:'none'},{offset:a}),{opacity:1,transform:'none',offset:b},Object.assign({opacity:0},kout)],{duration:D,delay:s*1000,fill:'none'});};
 (ev.headers||[]).forEach(h=>{const d=mk('hdr',`<div class=hbox><div class=hn>PERKARA #${h.n}</div><div class=ht>${h.title}</div></div>`);
  win(d,h.s,h.e,{transform:'translateY(-60px) scale(.9)'},{transform:'translateY(-30px)'},B);});
 (ev.pops||[]).forEach(p=>{const ic=p.icon?`<div class=icon>${ev._icons[p.icon]}</div>`:'';
  const d=mk('pop',`${ic}${p.top?`<div class=pt style="color:${p.topColor||'#fff'}">${p.top}</div>`:''}<div class=pm style="color:${p.color||'#F5C542'}">${p.main}</div>`);
  win(d,p.s,p.e,{transform:'scale(.4)'},{transform:'scale(1.1)'},B);});
 if(ev.graph){const g=ev.graph;
  const d=mk('gr',`<div class=gbox><div style="display:flex;justify-content:space-between;align-items:center"><div style="color:#E8B94A;font-weight:800;font-size:30px;letter-spacing:5px">${g.title}</div><div style="color:#bfa56a;font-weight:600;font-size:22px">ILUSTRASI</div></div>
  <svg width=740 height=190 viewBox="0 0 740 190" style="display:block;margin-top:6px"><g stroke="rgba(255,255,255,.12)" stroke-width=2><path d="M0 47H740M0 95H740M0 143H740"/></g>
  <path class=ln pathLength=1 d="M10 160 L90 112 L150 140 L250 82 L320 118 L420 60 L490 96 L600 34 L640 54 L730 18" stroke="#F5C542" stroke-width=9 fill=none stroke-linecap=round stroke-linejoin=round stroke-dasharray=1 stroke-dashoffset=1 style="filter:drop-shadow(0 0 8px rgba(245,197,66,.6))"/></svg>
  <div style="color:#fff;font-weight:700;font-size:26px;text-align:center;margin-top:2px">Naik turun biasa. Jangka panjang, fokus pada gram.</div></div>`);
  win(d,g.s,g.e,{transform:'translateY(60px) scale(.9)'},{transform:'translateY(30px)'},B);
  d.querySelector('.ln').animate([{strokeDashoffset:1},{strokeDashoffset:0}],{duration:Math.min(2200,(g.e-g.s)*1000-700),delay:g.s*1000+350,fill:'both',easing:'ease-in-out'});}
 const W=ev.words||[];let g=[];
 for(let i=0;i<W.length;i++){g.push(W[i]);const gap=i+1<W.length?W[i+1].s-W[i].e:9;
  if(g.length>=3||gap>0.35||/[.,!?]$/.test(W[i].w)||i==W.length-1){const grp=g.slice();g=[];
   grp.forEach((w,k)=>{const html=grp.map((x,j)=>j==k||x.hl?`<b>${x.w.replace(/[.,]$/,'')}</b>`:x.w.replace(/[.,]$/,'')).join(' ');
    const d=mk('cap',`<div class=ct>${html}</div>`),s=w.s,e=k+1<grp.length?grp[k+1].s:Math.min(w.e+0.15,(W[W.indexOf(grp[grp.length-1])+1]||{s:99}).s),D=Math.max(60,(e-s)*1000);
    d.animate(k==0?[{opacity:0,transform:'scale(.85)'},{opacity:1,transform:'none',offset:Math.min(.5,90/D)},{opacity:1}]:[{opacity:1},{opacity:1}],{duration:D,delay:s*1000,fill:'none'});});}}
 if(ev.cta){const c=ev.cta;const d=mk('cta',`<div class=cbox><div style="width:62px;height:62px;border-radius:50%;background:#1a1408;color:#F5C542;font-size:50px;font-weight:800;display:flex;align-items:center;justify-content:center">+</div><div style="color:#1a1408;font-weight:800;font-size:46px;line-height:1.15">${c.text}</div></div>`);
  win(d,c.s,c.e,{transform:'translateY(80px) scale(.85)'},{transform:'none'},B);}
 // orbit
 const O=document.getElementById('orbit');window._orb=[];
 for(let i=0;i<9;i++){const sp=i%3==2;const d=document.createElement('div');d.className='orb';d.innerHTML=sp?ev._spark:ev._coin;O.appendChild(d);window._orb.push({d,sp,ph:i/9*Math.PI*2})}
 document.getAnimations().forEach(a=>a.pause());
 window._t=(t)=>{document.getAnimations().forEach(a=>a.currentTime=t*1000);
  const cx=540,cy=945,rx=430,ry=150,tilt=-7*Math.PI/180;
  const fade=Math.min(1,t/0.8,(ev.duration-t)/0.6);
  window._orb.forEach(o=>{const a=o.ph+t*2*Math.PI/10;const x0=Math.cos(a)*rx,y0=Math.sin(a)*ry;
   const x=cx+x0*Math.cos(tilt)-y0*Math.sin(tilt),y=cy+x0*Math.sin(tilt)+y0*Math.cos(tilt);
   const front=Math.sin(a)>0;let op=front?0.95:0.5;const sc=front?1:0.7;
   if(!front){op*=Math.min(1,Math.max(0,(Math.abs(x-540)-230)/80))}
   const base=o.sp?24:32;o.d.style.opacity=Math.max(0,op*fade)*(o.sp?(0.6+0.4*Math.sin(t*6+o.ph)):1);
   o.d.style.transform=`translate(${x-base}px,${y-base}px) scale(${sc*(o.sp?1:(0.55+0.45*Math.abs(Math.cos(a*2+t))*0+0.9))}) rotate(${o.sp?t*80:0}deg)`;});};
}"""
def main():
    ev=json.load(open(sys.argv[1]));out=sys.argv[2];fps=30
    still=float(sys.argv[sys.argv.index('--still')+1]) if '--still' in sys.argv else None
    os.makedirs(out,exist_ok=True)
    with sync_playwright() as pw:
        b=pw.chromium.launch(executable_path='/opt/pw-browsers/chromium-1243/chrome-linux64/chrome',args=['--no-sandbox'])
        pg=b.new_page(viewport={"width":1080,"height":1920});pg.set_content(PAGE)
        ev['_icons']=ICONS;ev['_coin']=COIN;ev['_spark']=SPARK;pg.evaluate(JS,ev)
        times=[still] if still is not None else [i/fps for i in range(int(ev["duration"]*fps))]
        for i,t in enumerate(times):
            pg.evaluate(f"window._t({t})");pg.screenshot(path=f"{out}/{i:05d}.png",omit_background=True)
        b.close()
main()
