const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1080,height:1920}});
await p.goto('file://'+process.cwd()+'/thumbD.html');await p.evaluate(()=>document.fonts.ready);await p.waitForTimeout(400);
const bad=await p.evaluate(()=>[...document.querySelectorAll('.g')].map(e=>e.getBoundingClientRect()).filter(r=>r.left<58||r.right>942||r.top<248||r.bottom>1482).map(r=>[r.left|0,r.top|0,r.right|0,r.bottom|0]));console.log('luar zon:',JSON.stringify(bad));
await p.screenshot({path:'THUMB_kamal_dana_kecemasan_1080x1920.jpg',type:'jpeg',quality:93});await b.close()})();
