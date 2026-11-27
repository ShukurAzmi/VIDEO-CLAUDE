const {chromium}=require('playwright');const [H,O,G]=process.argv.slice(2);(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1080,height:1920}});
await p.goto('file://'+H);await p.evaluate(async()=>{await document.fonts.ready});
const r=await p.evaluate((G)=>{if(G)document.querySelector('.guide').style.display='block';for(const e of document.querySelectorAll('.fit')){let fs=parseFloat(getComputedStyle(e).fontSize);while(e.scrollWidth>e.clientWidth+1&&fs>30){fs-=2;e.style.fontSize=fs+'px'}}
 const b=document.querySelector('.tx').getBoundingClientRect();return [b.top|0,b.bottom|0]},G);console.log('tulisan y',r[0],'-',r[1]);
await p.waitForTimeout(300);await p.screenshot({path:O,type:'jpeg',quality:93});await b.close()})()
