const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1080,height:1920}});
await p.goto('file://'+process.cwd()+'/thumb.html');await p.evaluate(()=>document.fonts.ready);
for(const [img,pos,out,top] of [['img/p1.jpg','50% 40%','THUMB_A','-260px'],['img/p2.jpg','50% 40%','THUMB_B','-120px']]){
 await p.evaluate(([i,ps,tp])=>{const e=document.querySelector('#bg');e.style.backgroundImage=`url(${i})`;e.style.setProperty('--pos',ps);e.style.setProperty('--top',tp)},[img,pos,top]);
 await p.waitForTimeout(400);const bad=await p.evaluate(()=>[...document.querySelectorAll('.g')].map(e=>{const s=e.firstElementChild||e;const r=s.getBoundingClientRect();return (r.left<58||r.right>942||r.bottom>1482)?e.textContent+' '+(r.left|0)+'-'+(r.right|0):''}).filter(Boolean));console.log(out,bad);await p.screenshot({path:`../${out}_harry_potter_aurora.jpg`,type:'jpeg',quality:92})}
await b.close()})();
