const {chromium}=require('playwright');(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1080,height:1920}});
for(const [f,o] of [['thumb.html','THUMB_A'],['thumb_b.html','THUMB_B'],['thumb_c.html','THUMB_C']]){await p.goto('file://'+process.cwd()+'/'+f);await p.evaluate(async()=>{await document.fonts.ready});await p.waitForTimeout(300);
const r=await p.evaluate(()=>{const b=document.querySelector('.tx').getBoundingClientRect();return [b.top|0,b.bottom|0]});console.log(o,r);
await p.screenshot({path:o+'.jpg',type:'jpeg',quality:92});await p.evaluate(()=>document.querySelector('.guide').style.display='block');await p.screenshot({path:o+'_guide.jpg',type:'jpeg',quality:70})}await b.close()})()
