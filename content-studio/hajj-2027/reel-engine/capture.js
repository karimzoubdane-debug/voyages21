const { chromium } = require('playwright-core');
const fs = require('fs');
(async () => {
  const exe = fs.readFileSync(process.argv[2], 'utf8').trim();
  const html = 'file://' + process.argv[3];
  const outdir = process.argv[4];
  const version = process.argv[5] && process.argv[5] !== '-' ? process.argv[5] : null;
  const probe = process.argv[6] ? process.argv[6].split(',').map(Number) : null;
  const fps = 24;
  const browser = await chromium.launch({ executablePath: exe, args: ['--no-sandbox','--force-color-profile=srgb','--hide-scrollbars','--disable-gpu'] });
  const page = await browser.newPage({ viewport: { width: 1080, height: 1920 }, deviceScaleFactor: 1 });
  if (version) await page.addInitScript(v => { window.__FORCE_V = v; }, version);
  await page.goto(html, { waitUntil: 'load' });
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(400);
  const DUR = await page.evaluate(() => window.__DURATION);
  if (probe) {
    for (const t of probe) { await page.evaluate(t => window.__render(t), t); await page.screenshot({ path: `${outdir}/p_${t}.png`, clip: { x:0,y:0,width:1080,height:1920 } }); }
    console.log('PROBE_DONE ' + probe.join(',') + ' DUR=' + DUR);
  } else {
    const N = Math.round(DUR/1000*fps);
    for (let f=0; f<N; f++) { const t = f/fps*1000; await page.evaluate(t => window.__render(t), t); await page.screenshot({ path: `${outdir}/f${String(f).padStart(4,'0')}.jpg`, type:'jpeg', quality:95, clip: { x:0,y:0,width:1080,height:1920 } }); }
    console.log('CAPTURED ' + N + ' DUR=' + DUR);
  }
  await browser.close();
})().catch(e => { console.error('ERR', e); process.exit(1); });
