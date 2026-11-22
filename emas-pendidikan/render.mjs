// Usage: node render.mjs <from> <to> <outdir>  (frame indices, 30 fps)
import { chromium } from '/opt/node-tools/node_modules/playwright/index.mjs';
import fs from 'fs';
const [,, from, to, out] = process.argv; const FPS = 30;
fs.mkdirSync(out, { recursive: true });
const browser = await chromium.launch({ args: ['--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist'] });
const page = await browser.newPage({ viewport: { width: 1080, height: 1920 } });
page.on('pageerror', e => console.log('[err]', e.message));
await page.goto('http://localhost:8765/index.html?tl=timeline.json');
await page.waitForFunction('window.ready===true', null, { timeout: 120000 });
await page.evaluate('warm()');
const el = page.locator('#stage'); const t0 = Date.now();
for (let i = +from; i < +to; i++) {
  const p = `${out}/f${String(i).padStart(5, '0')}.jpg`;
  if (fs.existsSync(p)) continue;
  await page.evaluate(t => renderAt(t), i / FPS);
  await el.screenshot({ path: p, type: 'jpeg', quality: 92 });
  if (i % 100 === 0) console.log(out, i, ((Date.now() - t0) / 1000).toFixed(0) + 's');
}
await browser.close(); console.log('done', from, to);
