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
  // Slack = how far the footer's bottom edge sits from the bottom of the A4 sheet
  // (negative = room left). Header, stat strip and footer never shrink, so any
  // overflow pushes the footer past the sheet and is caught here.
  const overflow = await page.evaluate(() =>
    [...document.querySelectorAll('.page')].map(p => {
      const ft = p.querySelector('.ft');
      return Math.round(ft.getBoundingClientRect().bottom - p.getBoundingClientRect().bottom);
    })
  );
  console.log('slack per page (px, negative = room left):', overflow.join(', '));
  if (overflow.some(v => v > 0)) { console.error('Content overflows a page'); process.exit(1); }

  await page.pdf({ path: out, format: 'A4', printBackground: true, preferCSSPageSize: true });
  await browser.close();
  console.log('Wrote', out);
})();
