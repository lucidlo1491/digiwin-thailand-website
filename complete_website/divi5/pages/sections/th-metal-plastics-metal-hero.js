/**
 * th-metal-plastics-metal-hero.js — Thai Metal Hero Section
 *
 * Reuses English CSS. Replaces all English text with Thai content.
 */

const base = require('../../lib/templates/_base');
const superD = require('../../lib/super-d');
const en = require('./metal-plastics-metal-hero');
const thMetal = require('../../i18n/th/metal-plastics');

const t = thMetal.hero;
const P = 'metal-hero'; // CSS prefix — same as English

function blocks() {
  // Inline <style> bypasses Divi's CSS compiler cache (proven pattern)
  const inlineCSS = `<style>
.et_pb_section:has(.${P}-inner){background:linear-gradient(135deg,#000432 0%,#000864 50%,#001080 100%)!important;padding:140px 0 100px!important;position:relative;overflow:hidden}
.${P}-inner{max-width:1200px;margin:0 auto;padding:0 24px;position:relative;z-index:1;text-align:center}
.${P}-inner h1{font-family:'Noto Sans',sans-serif!important;font-size:52px!important;font-weight:700!important;color:#fff!important;margin:0 0 20px 0!important;padding:0!important;line-height:1.15!important}
.${P}-inner h1 span{color:#00AFF0!important}
.${P}-badge{display:inline-flex;align-items:center;gap:8px;background:rgba(0,175,240,0.2);border:1px solid rgba(0,175,240,0.3);padding:8px 20px;border-radius:50px;color:#7EC8F2;font-size:14px;font-weight:500;margin-bottom:24px}
.${P}-subtitle{font-family:'Noto Sans',sans-serif;font-size:20px!important;color:rgba(255,255,255,0.85)!important;max-width:700px;margin:0 auto 50px;line-height:32px!important}
.${P}-stats{display:flex;justify-content:center;gap:60px}
.${P}-stat-value{font-family:'Noto Sans',sans-serif;font-size:42px;font-weight:700;color:#00AFF0!important;line-height:67.2px!important}
.${P}-stat-label{font-size:14px;color:rgba(255,255,255,0.85);margin-top:4px!important;line-height:22.4px!important}
@media(max-width:1024px){.${P}-inner h1{font-size:40px!important}.${P}-stats{gap:40px}}
@media(max-width:640px){.${P}-inner h1{font-size:32px!important}.${P}-subtitle{font-size:17px!important}.${P}-stats{flex-direction:column;gap:24px}.${P}-stat-value{font-size:36px}}
</style>`;

  const html = `${inlineCSS}
    <div class="dw-d-bg dw-d-bg--bottom dw-d-bg--particle" style="opacity: 0.15; min-height: 30vh; bottom: -10%;"></div>
            <div class="${P}-inner" style="position: relative; z-index: 2;">
                <div class="${P}-badge">
                    <span>${t.badge}</span>
                </div>
                <h1>${t.h1}</h1>
                <p class="${P}-subtitle">${t.subtitle}</p>
                <div class="${P}-stats">
                    <div class="${P}-stat">
                        <div class="${P}-stat-value">${t.stats[0].value}</div>
                        <div class="${P}-stat-label">${t.stats[0].label}</div>
                    </div>
                    <div class="${P}-stat">
                        <div class="${P}-stat-value">${t.stats[1].value}</div>
                        <div class="${P}-stat-label">${t.stats[1].label}</div>
                    </div>
                    <div class="${P}-stat">
                        <div class="${P}-stat-value">${t.stats[2].value}</div>
                        <div class="${P}-stat-label">${t.stats[2].label}</div>
                    </div>
                </div>
            </div>`;

  return base.wrapInDiviSection('Metal Hero (Thai)', html, 'Metal Hero: Content');
}

module.exports = { blocks, css: () => en.css() };
