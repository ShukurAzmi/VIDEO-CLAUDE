// node render.js <workdir> <outdir> <scale> all <start> <end>   |  node render.js <workdir> <outdir> <scale> stills t1,t2
// FINAL=1 -> guna bfB (1080 + grade + glow)
const {chromium}=require('playwright'),fs=require('fs'),path=require('path');
const [W,OUT,SC,MODE,A,B]=process.argv.slice(2);const scale=+SC;
const words=fs.readFileSync(path.join(W,'words_out.json'),'utf8');
const FR=process.env.FINAL?'bfB':'bf';const NF=fs.readdirSync(path.join(W,FR)).length;
(async()=>{fs.mkdirSync(OUT,{recursive:true});const br=await chromium.launch();
 async function mk(){const p=await br.newPage({viewport:{width:1080,height:1920},deviceScaleFactor:scale});
  await p.addInitScript(`window.WORDS=${words};window.NF=${NF};`);
  await p.goto('file://'+path.join(W,'index.html')+'?f='+FR);await p.evaluate(async()=>{await document.fonts.ready});return p}
 if(MODE==='stills'){const p=await mk();const bad=new Set();
  for(const t of A.split(',').map(Number)){await p.evaluate(t=>window.render(t),t);(await p.evaluate(()=>window.safecheck())).forEach(b=>bad.add(t+' '+b));
   await p.screenshot({path:path.join(OUT,`s_${t.toFixed(2)}.jpg`),type:'jpeg',quality:85})}
  console.log([...bad].join('\n')||'safe ok');await br.close();return}
 if(MODE==='check'){const p=await mk();const bad=new Set();for(let t=0;t<+A;t+=0.1){await p.evaluate(t=>window.render(t),t);(await p.evaluate(()=>window.safecheck())).forEach(b=>bad.add(b.replace(/\[.*\]/,'')+'@'+t.toFixed(1)))}
  const m={};for(const b of bad){const k=b.split('@')[0];(m[k]=m[k]||[]).push(b.split('@')[1])}for(const k in m)console.log(k,m[k][0],'..',m[k].at(-1));console.log('check done');await br.close();return}
 const f0=Math.round(+A*30),f1=Math.round(+B*30),N=4,per=Math.ceil((f1-f0)/N);
 await Promise.all([...Array(N)].map(async(_,k)=>{const p=await mk();
  for(let f=f0+k*per;f<Math.min(f1,f0+(k+1)*per);f++){await p.evaluate(t=>window.render(t),f/30);await p.screenshot({path:path.join(OUT,String(f+1).padStart(5,'0')+'.jpg'),type:'jpeg',quality:92})}}));
 await br.close()})();
