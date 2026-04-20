/**
 * measure-hero.js — Measure all computed styles on the event hero VB template
 * v2: Targets .evhero-wrap (the embedded CSS wrapper class) instead of
 *     document.querySelector('.et_pb_section') which hits the header TB section.
 */
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

  // Double-load for Divi CSS regeneration
  await page.goto('https://digiwin-thailand.local/library-template-test/', { waitUntil: config.WAIT_UNTIL, timeout: 60000 });
  await waitForDiviReady(page);
  await page.goto('https://digiwin-thailand.local/library-template-test/', { waitUntil: config.WAIT_UNTIL, timeout: 60000 });
  await waitForDiviReady(page);

  const m = await page.evaluate(() => {
    const cs = (el) => el ? window.getComputedStyle(el) : null;
    const csPseudo = (el, pseudo) => el ? window.getComputedStyle(el, pseudo) : null;
    const rect = (el) => el ? el.getBoundingClientRect() : null;

    // ── Target the wrapper class, NOT generic .et_pb_section ──
    const wrap = document.querySelector('[class*="evhero-wrap"]') ||
                 document.querySelector('[class*="-wrap"]');
    const section = wrap || document.querySelector('.et_pb_section');
    const sectionCS = cs(section);
    const sectionBefore = csPseudo(section, '::before');
    const rows = section ? Array.from(section.querySelectorAll(':scope > .et_pb_row')) : [];

    // Find elements within the section scope (not header/footer)
    const scope = section || document;
    const backLink = scope.querySelector('a[class*="-back"]');
    const h1 = scope.querySelector('.et_pb_text_inner h1');
    const subtitleOuter = scope.querySelector('[class*="-subtitle"]');
    const subtitleP = subtitleOuter ? subtitleOuter.querySelector('.et_pb_text_inner p') : null;
    const subtitleTextInner = subtitleOuter ? subtitleOuter.querySelector('.et_pb_text_inner') : null;
    const facts = scope.querySelector('div[class*="-facts"]');
    const factValue = scope.querySelector('[class*="-fact-value"]');
    const factLabel = scope.querySelector('[class*="-fact-label"]');
    const factIcon = scope.querySelector('[class*="-fact-icon"] svg');
    const cta = scope.querySelector('.et_pb_button');
    const badgeOuter = scope.querySelector('[class*="-badge"]');
    const badgeTextInner = badgeOuter ? badgeOuter.querySelector('.et_pb_text_inner') : null;
    const badgeP = badgeTextInner ? badgeTextInner.querySelector('p') : null;

    const backLinkRect = rect(backLink);
    const badgeRect = rect(badgeP || badgeOuter);
    const h1Rect = rect(h1);
    const subtitleRect = rect(subtitleP);
    const factsRect = rect(facts);
    const ctaRect = rect(cta);
    const sectionRect = rect(section);

    return {
      _META: {
        wrapFound: Boolean(wrap),
        wrapClass: wrap ? wrap.className : 'NOT FOUND',
        sectionTag: section ? section.tagName : 'NOT FOUND',
        totalSections: document.querySelectorAll('.et_pb_section').length,
      },
      'AC-1 SECTION': {
        '1.1 background': sectionCS ? sectionCS.backgroundImage : null,
        '1.2 paddingTop': sectionCS ? sectionCS.paddingTop : null,
        '1.2 paddingRight': sectionCS ? sectionCS.paddingRight : null,
        '1.2 paddingBottom': sectionCS ? sectionCS.paddingBottom : null,
        '1.2 paddingLeft': sectionCS ? sectionCS.paddingLeft : null,
        '1.3 overflow': sectionCS ? sectionCS.overflow : null,
        '1.4 position': sectionCS ? sectionCS.position : null,
        '1.5 ::before opacity': sectionBefore ? sectionBefore.opacity : null,
        '1.5 ::before pointerEvents': sectionBefore ? sectionBefore.pointerEvents : null,
        '1.5 ::before zIndex': sectionBefore ? sectionBefore.zIndex : null,
        '1.6 height': sectionRect ? Math.round(sectionRect.height) : null,
      },
      'AC-2 VERTICAL_GAPS': {
        '2.1 backLink→badge': (badgeRect && backLinkRect) ? Math.round(badgeRect.top - backLinkRect.bottom) : 'N/A',
        '2.2 badge→h1': (h1Rect && badgeRect) ? Math.round(h1Rect.top - badgeRect.bottom) : 'N/A',
        '2.3 h1→subtitle': (subtitleRect && h1Rect) ? Math.round(subtitleRect.top - h1Rect.bottom) : 'N/A',
        '2.4 subtitle→facts': (factsRect && subtitleRect) ? Math.round(factsRect.top - subtitleRect.bottom) : 'N/A',
        '2.5 facts→cta': (ctaRect && factsRect) ? Math.round(ctaRect.top - factsRect.bottom) : 'N/A',
      },
      'AC-3 TYPOGRAPHY': {
        '3.1 h1 fontSize': h1 ? cs(h1).fontSize : 'NOT FOUND',
        '3.2 h1 fontWeight': h1 ? cs(h1).fontWeight : 'NOT FOUND',
        '3.3 h1 lineHeight': h1 ? cs(h1).lineHeight : 'NOT FOUND',
        '3.4 h1 color': h1 ? cs(h1).color : 'NOT FOUND',
        '3.5 h1 textAlign': h1 ? cs(h1).textAlign : 'NOT FOUND',
        '3.6 h1 maxWidth': h1 ? cs(h1).maxWidth : 'NOT FOUND',
        '3.7 subtitle fontSize': subtitleP ? cs(subtitleP).fontSize : 'NOT FOUND',
        '3.8 subtitle color': subtitleP ? cs(subtitleP).color : 'NOT FOUND',
        '3.9 subtitle lineHeight': subtitleP ? cs(subtitleP).lineHeight : 'NOT FOUND',
        '3.10 subtitle maxWidth': subtitleP ? cs(subtitleP).maxWidth : 'NOT FOUND',
        '3.11 subtitle textAlign': subtitleP ? cs(subtitleP).textAlign : 'NOT FOUND',
        '3.12 backLink fontSize': backLink ? cs(backLink).fontSize : 'NOT FOUND',
        '3.13 badge fontSize': badgeP ? cs(badgeP).fontSize : 'NOT FOUND',
        '3.14 badge fontFamily': badgeP ? cs(badgeP).fontFamily.substring(0, 50) : 'NOT FOUND',
        '3.15 badge letterSpacing': badgeP ? cs(badgeP).letterSpacing : 'NOT FOUND',
        '3.16 badge lineHeight': badgeP ? cs(badgeP).lineHeight : 'NOT FOUND',
      },
      'AC-4 FACTS': facts ? {
        '4.1 display': cs(facts).display,
        '4.2 gridCols': cs(facts).gridTemplateColumns,
        '4.3 gap': cs(facts).gap,
        '4.4 maxWidth': cs(facts).maxWidth,
        '4.5 padding': cs(facts).padding,
        '4.6 borderRadius': cs(facts).borderRadius,
        '4.7 bg': cs(facts).backgroundColor,
        '4.8 border': cs(facts).border,
        '4.9 margin': cs(facts).margin,
        '4.10 actualWidth': Math.round(rect(facts).width),
        factValue: factValue ? {
          fontSize: cs(factValue).fontSize,
          fontWeight: cs(factValue).fontWeight,
          color: cs(factValue).color,
          lineHeight: cs(factValue).lineHeight,
          marginBottom: cs(factValue).marginBottom,
        } : 'NOT FOUND',
        factLabel: factLabel ? {
          fontSize: cs(factLabel).fontSize,
          color: cs(factLabel).color,
          lineHeight: cs(factLabel).lineHeight,
        } : 'NOT FOUND',
        factIcon: factIcon ? {
          width: factIcon.getAttribute('width'),
          height: factIcon.getAttribute('height'),
          stroke: cs(factIcon).stroke,
        } : 'NOT FOUND',
      } : { found: false },
      'AC-5 CTA': cta ? {
        '5.1 fontSize': cs(cta).fontSize,
        '5.2 fontWeight': cs(cta).fontWeight,
        '5.3 color': cs(cta).color,
        '5.4 bg': cs(cta).backgroundColor,
        '5.5 padding': cs(cta).padding,
        '5.6 borderRadius': cs(cta).borderRadius,
        '5.7 boxShadow': cs(cta).boxShadow ? cs(cta).boxShadow.substring(0, 80) : null,
      } : { found: false },
      ROWS: rows.map((r, i) => ({
        index: i,
        height: Math.round(rect(r).height),
        maxWidth: cs(r).maxWidth,
        margin: cs(r).margin,
        width: Math.round(rect(r).width),
      })),
    };
  });

  console.log(JSON.stringify(m, null, 2));
  await browser.close();
})();
