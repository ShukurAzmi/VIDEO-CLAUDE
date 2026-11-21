// node render.js <outdir> <scale> [t1,t2,...|all] [startFrame endFrame]
const { chromium } = require('playwright'); const path = require('path'); const fs = require('fs');
(async () => {
  const [out, scale, which, a, b] = process.argv.slice(2); fs.mkdirSync(out, { recursive: true });
  const br = await chromium.launch(); const pg = await br.newPage({ viewport: { width: 1080, height: 1920 }, deviceScaleFactor: +scale });
  pg.on('pageerror', e => console.error('PAGEERR', e.message)); pg.on('console', m => m.type() === 'error' && console.error('CONSOLE', m.text()));
  await pg.goto('file://' + path.resolve(__dirname, '../comp/index.html')); await pg.evaluate(() => document.fonts.ready);
  const times = which === 'all' ? Array.from({ length: (+b) - (+a) }, (_, i) => (i + (+a)) / 30) : which.split(',').map(Number);
  let i = which === 'all' ? +a : 0;
  for (const t of times) {
    await pg.evaluate(t => window.render(t), t);
    const name = which === 'all' ? `${String(i).padStart(5, '0')}.jpg` : `t${t.toFixed(2)}.jpg`;
    await pg.screenshot({ path: path.join(out, name), type: 'jpeg', quality: 88 }); i++;
  }
  await br.close();
})();
