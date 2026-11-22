import { chromium } from '/opt/node-tools/node_modules/playwright/index.mjs';
const b = await chromium.launch({ args: ['--use-angle=swiftshader','--enable-unsafe-swiftshader'] });
const p = await b.newPage({ viewport: { width: 1080, height: 1920 } });
await p.goto('http://localhost:8765/index.html?tl=timeline.json'); await p.waitForFunction('window.ready===true');
const res = await p.evaluate(() => {
  const out = []; const box = el => { const w = document.createTreeWalker(el, NodeFilter.SHOW_TEXT); const rs = []; while (w.nextNode()) { const r = document.createRange(); r.selectNodeContents(w.currentNode); rs.push(...r.getClientRects()); } return rs.length ? { l: Math.min(...rs.map(x => x.left)), r: Math.max(...rs.map(x => x.right)), t: Math.min(...rs.map(x => x.top)), b: Math.max(...rs.map(x => x.bottom)) } : null; };
  for (const s of TL.subs) { renderAt((s.start + s.end) / 2); const bb = box(document.getElementById('sub')); out.push({ k: 'sub', t: s.start, txt: s.text.replace(/<[^>]+>/g, ''), ...bb }); }
  for (const s of TL.titles) { renderAt(s.start + 0.6); const bb = box(document.getElementById('title')); out.push({ k: 'title', t: s.start, txt: s.lines.map(l => l.text).join(' / ').replace(/<[^>]+>/g, ' '), ...bb }); }
  return out;
});
const pad=8; const bad = res.filter(x => x.l < 70+pad || x.r > 940-pad || x.t < 270 || x.b > 1250);
console.log('extremes L',Math.min(...res.map(x=>x.l)).toFixed(0),'R',Math.max(...res.map(x=>x.r)).toFixed(0),'T',Math.min(...res.map(x=>x.t)).toFixed(0),'B',Math.max(...res.map(x=>x.b)).toFixed(0));
console.log('checked', res.length, 'outside', bad.length);
for (const x of bad) console.log(x.k, x.t, JSON.stringify(x.txt), 'L', x.l.toFixed(0), 'R', x.r.toFixed(0), 'T', x.t.toFixed(0), 'B', x.b.toFixed(0));
await b.close();
