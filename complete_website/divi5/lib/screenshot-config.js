/**
 * screenshot-config.js — Single source of truth for all Puppeteer screenshot tools
 *
 * Fixes V1-V12: eliminates divergent freeze/selector/timing logic across
 * screenshot.js, screenshot-reference.js, computed-style-diff.js,
 * wait-for-divi.js, and visual-diff.js.
 *
 * Every Puppeteer tool MUST import constants from here. No local overrides.
 */

module.exports = {
  // ═══════════════════════════════════════════════════════
  // CSS INJECTION — freeze animations + hide dynamic content
  // ═══════════════════════════════════════════════════════

  /** Freeze ALL CSS animations/transitions + hide dynamic canvases + marquee */
  FREEZE_CSS: `
    *, *::before, *::after {
      animation-duration: 0s !important;
      animation-delay: 0s !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0s !important;
      transition-delay: 0s !important;
    }
    .dw-clients-track { animation: none !important; }
    .dw-particle-wave, [data-particles] canvas { display: none !important; }
    .fade-in { opacity: 1 !important; transform: none !important; }
  `,

  // ═══════════════════════════════════════════════════════
  // JS INJECTION — deterministic content state
  // ═══════════════════════════════════════════════════════

  /** Force counters to final values AND prevent re-animation */
  COUNTER_FINALIZE_JS: `
    document.querySelectorAll('[data-target]').forEach(el => {
      el.textContent = el.getAttribute('data-target');
      el.classList.remove('stats-counter');
      el.classList.remove('counting');
    });
  `,

  /** Remove SVG animate elements for deterministic SVG rendering */
  SVG_ANIMATE_REMOVE_JS: `
    document.querySelectorAll('animate, animateTransform, animateMotion').forEach(el => el.remove());
  `,

  /** Neutralize JS-driven animations (rAF-based) */
  JS_ANIMATION_KILL_JS: `
    window._origRAF = window.requestAnimationFrame;
    window.requestAnimationFrame = function(cb) { return window._origRAF(function() { cb(0); }); };
  `,

  /** Remove WP admin bar + fix margin */
  WP_ADMIN_BAR_JS: `
    var bar = document.getElementById('wpadminbar');
    if (bar) bar.style.display = 'none';
    document.documentElement.style.marginTop = '0px';
  `,

  // ═══════════════════════════════════════════════════════
  // SELECTORS — element visibility + header hiding
  // ═══════════════════════════════════════════════════════

  /**
   * Scroll-animated element selectors to force visible.
   * Covers BOTH HTML class names (dw-*) and WP class names.
   * These elements start at opacity:0 / translateY:20px via JS scroll animation.
   */
  SCROLL_ANIMATED_SELECTORS: [
    '.dw-trust-card', '.trust-card',
    '.dw-check-card', '.checks-card', '.pchecks-card',
    '.dw-result-card', '.results-card',
    '.dw-value-prop', '.products-card',
    '.fade-in',
  ].join(', '),

  /** Header hiding — HTML side */
  HEADER_HIDE_HTML: 'header, .dw-header, nav.dw-nav, [data-sticky]',

  /** Header hiding — WordPress side */
  HEADER_HIDE_WP: 'header, .et-l--header, .et_pb_section_0_tb_header, #et-boc > .et-l--header, [data-sticky]',

  // ═══════════════════════════════════════════════════════
  // FONT LOADING — consistent across all tools
  // ═══════════════════════════════════════════════════════

  FONT_FAMILIES: [
    { family: 'Noto Sans', weights: ['400', '700'] },
    { family: 'JetBrains Mono', weights: ['400', '700'] },
  ],

  // ═══════════════════════════════════════════════════════
  // TIMING + VIEWPORT — consistent across all tools
  // ═══════════════════════════════════════════════════════

  VIEWPORT: { width: 1440, height: 900 },
  WAIT_UNTIL: 'networkidle2',
  WARM_UP_WAIT_UNTIL: 'domcontentloaded',
  STABILIZATION_MS: 2000,
  PRESENCE_CHECK_STABILIZATION_MS: 3000,
  PROTOCOL_TIMEOUT: 300000,   // 5 min — consistent across all tools
  PUPPETEER_ARGS: ['--ignore-certificate-errors', '--no-sandbox', '--font-render-hinting=none'],

  // ═══════════════════════════════════════════════════════
  // HELPER — load fonts on a Puppeteer page
  // ═══════════════════════════════════════════════════════

  /**
   * Load all configured fonts on a Puppeteer page.
   * @param {import('puppeteer').Page} page
   */
  async loadFonts(page) {
    await page.evaluate(() => document.fonts.ready);
    await page.evaluate(async (families) => {
      for (const { family, weights } of families) {
        for (const weight of weights) {
          try { await document.fonts.load(`${weight} 16px "${family}"`); } catch {}
        }
      }
    }, this.FONT_FAMILIES);
  },

  /**
   * Force scroll-animated elements visible on a Puppeteer page.
   * @param {import('puppeteer').Page} page
   */
  async forceScrollElementsVisible(page) {
    await page.evaluate((selectors) => {
      document.querySelectorAll(selectors).forEach(el => {
        el.style.setProperty('opacity', '1', 'important');
        el.style.setProperty('transform', 'none', 'important');
      });
    }, this.SCROLL_ANIMATED_SELECTORS);
  },

  /**
   * Apply full freeze: CSS + counter finalize + SVG animate removal.
   * @param {import('puppeteer').Page} page
   */
  async applyFreeze(page) {
    await page.addStyleTag({ content: this.FREEZE_CSS });
    await page.evaluate(new Function(this.COUNTER_FINALIZE_JS));
    await page.evaluate(new Function(this.SVG_ANIMATE_REMOVE_JS));
    await new Promise(r => setTimeout(r, 300));
  },

  /**
   * Hide WP admin bar.
   * @param {import('puppeteer').Page} page
   */
  async hideAdminBar(page) {
    await page.evaluate(new Function(this.WP_ADMIN_BAR_JS));
  },

  /**
   * Hide fixed header (HTML side).
   * @param {import('puppeteer').Page} page
   */
  async hideHeaderHTML(page) {
    await page.evaluate((sel) => {
      document.querySelectorAll(sel).forEach(el => {
        el.style.setProperty('display', 'none', 'important');
      });
    }, this.HEADER_HIDE_HTML);
  },

  /**
   * Hide fixed header (WordPress side).
   * @param {import('puppeteer').Page} page
   */
  async hideHeaderWP(page) {
    await page.evaluate((sel) => {
      document.querySelectorAll(sel).forEach(el => {
        el.style.setProperty('display', 'none', 'important');
      });
    }, this.HEADER_HIDE_WP);
  },

  /**
   * Clip element to viewport width (prevents marquee/overflow capture).
   * @param {import('puppeteer').Page} page
   * @param {string} selector
   */
  async clipToViewport(page, selector) {
    await page.evaluate((sel, vw) => {
      const el = document.querySelector(sel);
      if (el) {
        el.style.setProperty('overflow', 'hidden', 'important');
        el.style.setProperty('max-width', vw + 'px', 'important');
      }
    }, selector, this.VIEWPORT.width);
  },
};
