// Renders resume/resume.html to assets/Bireshwar_Chakravarty_Resume_2026.pdf
// Usage: node resume/build.js   (requires the `playwright` package)
const path = require('path');
const { chromium } = require('playwright');

(async () => {
  const src = 'file://' + path.join(__dirname, 'resume.html');
  const out = path.join(__dirname, '..', 'assets', 'Bireshwar_Chakravarty_Resume_2026.pdf');
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto(src, { waitUntil: 'networkidle' });
  await page.evaluate(() => document.fonts.ready);

  // Fail loudly if either page's content runs past the A4 sheet.
  const overflow = await page.evaluate(() =>
    [...document.querySelectorAll('.page')].map(p => {
      const body = p.querySelector('.body'), ft = p.querySelector('.ft');
      return Math.round(body.lastElementChild.getBoundingClientRect().bottom - ft.getBoundingClientRect().top);
    })
  );
  console.log('slack per page (px, negative = room left):', overflow.join(', '));
  if (overflow.some(v => v > 0)) { console.error('Content overflows a page'); process.exit(1); }

  await page.pdf({ path: out, format: 'A4', printBackground: true, preferCSSPageSize: true });
  await browser.close();
  console.log('Wrote', out);
})();
