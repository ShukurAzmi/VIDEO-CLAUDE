const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1080,height:1920}});
await p.goto('file://'+process.cwd()+'/thumbP.html');await p.evaluate(()=>document.fonts.ready);
for(const [img,out] of [['th/a.jpg','THUMB_A'],['th/b.jpg','THUMB_B']]){
 await p.evaluate(i=>{document.querySelector('#bg').style.backgroundImage=`url(${i})`},img);
 await p.waitForTimeout(400);await p.screenshot({path:`${out}_kamal_emas_bukan_palsu.jpg`,type:'jpeg',quality:93})}
await b.close()})();
