const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1080,height:1920}});
await p.goto('file://'+process.cwd()+'/thumbA.html');await p.evaluate(()=>document.fonts.ready);
for(const [img,pos,out] of [['img/pakai.jpg','50% 50%','THUMB_A']]){
 await p.evaluate(([i,ps])=>{const e=document.querySelector('#bg');e.style.backgroundImage=`url(${i})`;e.style.setProperty('--pos',ps)},[img,pos]);
 await p.waitForTimeout(400);await p.screenshot({path:`../${out}_kamal_916_vs_999.jpg`,type:'jpeg',quality:92})}
await b.close()})();
