import { chromium } from '/opt/node-tools/node_modules/playwright/index.mjs';
const [,, tl='timeline_preview.json', out='stills', ...times] = process.argv;
const browser = await chromium.launch({ args: ['--use-angle=swiftshader','--enable-unsafe-swiftshader','--ignore-gpu-blocklist'] });
const page = await browser.newPage({ viewport: { width: 1080, height: 1920 } });
page.on('console', m => console.log('[page]', m.text())); page.on('pageerror', e => console.log('[err]', e.message));
await page.goto(`http://localhost:8765/index.html?tl=${tl}`);
await page.waitForFunction('window.ready===true', null, { timeout: 120000 });
let t0 = Date.now(); await page.evaluate('warm()'); console.log('warm ms', Date.now() - t0);
const fs = await import('fs'); fs.mkdirSync(out, { recursive: true });
for (const t of times.map(Number)) {
  t0 = Date.now(); const id = await page.evaluate(t => renderAt(t), t);
  await page.locator('#stage').screenshot({ path: `${out}/t${String(t).padStart(5, '0')}_${id}.jpg`, type: 'jpeg', quality: 80 });
  console.log(t, id, Date.now() - t0, 'ms');
}
await browser.close();
