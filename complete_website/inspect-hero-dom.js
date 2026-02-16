const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({
    headless: true,
    args: ['--ignore-certificate-errors']
  });
  const context = await browser.newContext({ ignoreHTTPSErrors: true });
  const page = await context.newPage();

  // 1. Log into WordPress
  console.log('=== LOGGING IN ===');
  await page.goto('https://digiwin-thailand.local/wp-login.php', { waitUntil: 'networkidle', timeout: 30000 });
  await page.fill('#user_login', 'admin');
  await page.fill('#user_pass', 'admin');
  await page.click('#wp-submit');
  await page.waitForURL('**/wp-admin/**', { timeout: 15000 });
  console.log('Logged in successfully.');

  // 2. Navigate to the page
  console.log('\n=== NAVIGATING TO PAGE 100684 ===');
  await page.goto('https://digiwin-thailand.local/?page_id=100684', { waitUntil: 'networkidle', timeout: 30000 });
  await page.waitForTimeout(2000);
  console.log('Page loaded:', await page.title());

  // Get full page source for comment counting
  const pageSource = await page.content();

  // 3. Extract .et_pb_section_0 outer HTML (first 500 chars)
  console.log('\n=== .et_pb_section_0 OUTER HTML (first 500 chars) ===');
  const section0 = await page.$('.et_pb_section_0');
  if (section0) {
    const outerHTML = await section0.evaluate(el => el.outerHTML);
    console.log(outerHTML.substring(0, 500));
    console.log('... [total length: ' + outerHTML.length + ']');
  } else {
    console.log('NOT FOUND. Checking what sections exist...');
    const sections = await page.$$eval('[class*="et_pb_section"]', els =>
      els.map(el => ({ tag: el.tagName, classes: el.className, childCount: el.children.length }))
    );
    console.log('Sections found:', JSON.stringify(sections, null, 2));
  }

  // 4. .et_pb_column_0 children
  console.log('\n=== .et_pb_column_0 CHILDREN ===');
  const col0 = await page.$('.et_pb_column_0');
  if (col0) {
    const children = await col0.evaluate(el => {
      return Array.from(el.children).map(child => ({
        tag: child.tagName,
        classes: child.className,
        innerHTML: child.innerHTML.substring(0, 100)
      }));
    });
    children.forEach((c, i) => {
      console.log('  [' + i + '] <' + c.tag + '> class="' + c.classes + '"');
      console.log('       innerHTML: ' + c.innerHTML);
    });
  } else {
    console.log('NOT FOUND');
  }

  // 5. .et_pb_column_1 children
  console.log('\n=== .et_pb_column_1 CHILDREN ===');
  const col1 = await page.$('.et_pb_column_1');
  if (col1) {
    const children = await col1.evaluate(el => {
      return Array.from(el.children).map(child => ({
        tag: child.tagName,
        classes: child.className,
        innerHTML: child.innerHTML.substring(0, 100)
      }));
    });
    children.forEach((c, i) => {
      console.log('  [' + i + '] <' + c.tag + '> class="' + c.classes + '"');
      console.log('       innerHTML: ' + c.innerHTML);
    });
  } else {
    console.log('NOT FOUND');
  }

  // 6. Factory label
  console.log('\n=== FACTORY LABEL ("For Manufacturing Business Owners") ===');
  const factoryLabel = await page.$$eval('*', els => {
    return els.filter(el => el.textContent.includes('Manufacturing Business Owners') && el.children.length === 0)
      .map(el => {
        const path = [];
        let c = el;
        while (c && c !== document.body) {
          let s = c.tagName.toLowerCase();
          if (c.className && typeof c.className === 'string') s += '.' + c.className.trim().split(/\s+/).join('.');
          path.unshift(s);
          c = c.parentElement;
        }
        return { text: el.textContent.substring(0, 80), path: path.join(' > ') };
      });
  });
  console.log(JSON.stringify(factoryLabel, null, 2));

  // 7. Factory subtitle ("Shadow Excel")
  console.log('\n=== FACTORY SUBTITLE (starts with "Shadow Excel") ===');
  const shadowExcel = await page.$$eval('*', els => {
    return els.filter(el => el.textContent.includes('Shadow Excel') && el.children.length === 0)
      .map(el => {
        const path = [];
        let c = el;
        while (c && c !== document.body) {
          let s = c.tagName.toLowerCase();
          if (c.className && typeof c.className === 'string') s += '.' + c.className.trim().split(/\s+/).join('.');
          path.unshift(s);
          c = c.parentElement;
        }
        return { text: el.textContent.substring(0, 100), path: path.join(' > ') };
      });
  });
  console.log(JSON.stringify(shadowExcel, null, 2));

  // 8. Partner label ("For ERP Implementers")
  console.log('\n=== PARTNER LABEL ("For ERP Implementers") ===');
  const partnerLabel = await page.$$eval('*', els => {
    return els.filter(el => el.textContent.includes('ERP Implementers') && el.children.length === 0)
      .map(el => {
        const path = [];
        let c = el;
        while (c && c !== document.body) {
          let s = c.tagName.toLowerCase();
          if (c.className && typeof c.className === 'string') s += '.' + c.className.trim().split(/\s+/).join('.');
          path.unshift(s);
          c = c.parentElement;
        }
        return { text: el.textContent.substring(0, 80), path: path.join(' > ') };
      });
  });
  console.log(JSON.stringify(partnerLabel, null, 2));

  // 9. Partner subtitle ("Man-Day Trap")
  console.log('\n=== PARTNER SUBTITLE ("Man-Day Trap") ===');
  const manDay = await page.$$eval('*', els => {
    return els.filter(el => el.textContent.includes('Man-Day Trap') && el.children.length === 0)
      .map(el => {
        const path = [];
        let c = el;
        while (c && c !== document.body) {
          let s = c.tagName.toLowerCase();
          if (c.className && typeof c.className === 'string') s += '.' + c.className.trim().split(/\s+/).join('.');
          path.unshift(s);
          c = c.parentElement;
        }
        return { text: el.textContent.substring(0, 100), path: path.join(' > ') };
      });
  });
  console.log(JSON.stringify(manDay, null, 2));

  // 10. All Text modules in hero
  console.log('\n=== TEXT MODULES (class containing "et_pb_text") ===');
  const textModules = await page.$$eval('[class*="et_pb_text"]', els => {
    return els.map(el => ({
      classes: el.className,
      innerHTML: el.innerHTML.substring(0, 200),
      containsP: el.innerHTML.includes('<p'),
      fullLength: el.innerHTML.length
    }));
  });
  textModules.forEach((tm, i) => {
    console.log('\n  [Text Module ' + i + ']');
    console.log('    classes: ' + tm.classes);
    console.log('    innerHTML (200): ' + tm.innerHTML);
    console.log('    contains <p>: ' + tm.containsP);
    console.log('    full length: ' + tm.fullLength);
  });

  // 11. Count comment types in page source
  console.log('\n=== COMMENT COUNTS IN PAGE SOURCE ===');
  const wpHtmlComments = (pageSource.match(/<!-- wp:html/g) || []).length;
  const wpDiviCodeComments = (pageSource.match(/<!-- wp:divi\/code/g) || []).length;
  const wpDiviTextComments = (pageSource.match(/<!-- wp:divi\/text/g) || []).length;
  const wpDiviAny = (pageSource.match(/<!-- wp:divi\//g) || []).length;
  const wpAny = (pageSource.match(/<!-- wp:/g) || []).length;
  console.log('wp:html comments: ' + wpHtmlComments);
  console.log('wp:divi/code comments: ' + wpDiviCodeComments);
  console.log('wp:divi/text comments: ' + wpDiviTextComments);
  console.log('wp:divi/* comments (all divi): ' + wpDiviAny);
  console.log('wp:* comments (all): ' + wpAny);

  const allWpComments = pageSource.match(/<!-- wp:[^\n]{0,80}/g) || [];
  console.log('\nFirst 20 wp: comments found:');
  allWpComments.slice(0, 20).forEach((c, i) => console.log('  ' + i + ': ' + c));

  await browser.close();
  console.log('\n=== DONE ===');
})().catch(err => {
  console.error('SCRIPT ERROR:', err.message);
  process.exit(1);
});
