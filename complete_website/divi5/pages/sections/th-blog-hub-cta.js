/**
 * th-blog-hub-cta.js — Thai Blog Hub CTA Section (S5)
 *
 * COPY strategy: full HTML rebuild with Thai text, CSS reused from English.
 * Source: blog-hub-cta.js + i18n/th/blog.js hubCta
 */

const base = require('../../lib/templates/_base');
const superD = require('../../lib/super-d');
const en = require('./blog-hub-cta');
const th = require('../../i18n/th/blog');

const P = 'hubc'; // Same CSS prefix as English
const D = th.hubCta;

function blocks() {
  const html = `
    <div class="dw-d-bg dw-d-bg--left" style="opacity: 0.10;"></div>

            <div class="dw-wave-flow" style="height: 140px; opacity: 0.25; z-index: 1;"></div>
            <div class="${P}-cta-inner" style="position: relative; z-index: 2;">
                <h2>${D.title}</h2>
                <p>${D.subtitle}</p>
                <div class="${P}-cta-buttons">
                    <a href="/contact/" class="${P}-btn-white">${D.btnPrimary}</a>
                    <a href="/products/" class="${P}-btn-outline">${D.btnSecondary}</a>
                </div>
            </div>`;

  return base.wrapInDiviSection('Hub Cta', html, 'Hub Cta: Content');
}

// Reuse English CSS identically
function css() {
  return en.css();
}

module.exports = { blocks, css };
