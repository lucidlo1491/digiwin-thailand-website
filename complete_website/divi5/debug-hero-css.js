const puppeteer = require('puppeteer');
const config = require('./lib/screenshot-config');
const { waitForDiviReady } = require('./lib/wait-for-divi');

(async () => {
  const browser = await puppeteer.launch({
    headless: 'new', args: config.PUPPETEER_ARGS, protocolTimeout: config.PROTOCOL_TIMEOUT,
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });
  await config.loadFonts(page);
  await page.goto('https://digiwin-thailand.local/library-template-test/', { waitUntil: config.WAIT_UNTIL, timeout: 60000 });
  await waitForDiviReady(page);
  await page.goto('https://digiwin-thailand.local/library-template-test/', { waitUntil: config.WAIT_UNTIL, timeout: 60000 });
  await waitForDiviReady(page);

  const info = await page.evaluate(() => {
    const section = document.querySelector('.et_pb_section');
    if (!section) return { found: false };

    const classes = section.className;
    const inlineStyle = section.getAttribute('style');

    // Find style tags with our gradient
    const styleTags = document.querySelectorAll('style');
    let freeFormCSS = '';
    let freeFormTagCount = 0;
    for (const st of styleTags) {
      if (st.textContent.includes('linear-gradient(165deg')) {
        freeFormTagCount++;
        freeFormCSS = st.textContent.substring(0, 800);
      }
    }

    const totalStyleTags = styleTags.length;

    // Check link[rel=stylesheet] for Divi page CSS
    const links = document.querySelectorAll('link[rel=stylesheet]');
    const diviLinks = Array.from(links).filter(l => l.href.includes('et-cache') || l.href.includes('divi'));

    // Check what selector the freeForm CSS is actually using
    const sectionMatch = classes.match(/et_pb_section_(\d+)/);
    const sectionSelector = sectionMatch ? '.et_pb_section_' + sectionMatch[1] : 'NO_MATCH';

    // Check if GLOBAL_THEME_RESET is present
    let globalResetFound = false;
    for (const st of styleTags) {
      if (st.textContent.includes('et_pb_row:not(')) {
        globalResetFound = true;
        break;
      }
    }

    return {
      classes: classes.substring(0, 300),
      sectionSelector,
      inlineStyle: inlineStyle || 'none',
      totalStyleTags,
      freeFormTagCount,
      freeFormCSS: freeFormCSS.substring(0, 500),
      globalResetFound,
      diviStylesheetCount: diviLinks.length,
      diviStylesheetHrefs: diviLinks.map(l => l.href.split('/').slice(-3).join('/')),
    };
  });

  console.log(JSON.stringify(info, null, 2));
  await browser.close();
})();
