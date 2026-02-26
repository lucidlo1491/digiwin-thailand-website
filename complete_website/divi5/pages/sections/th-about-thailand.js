/**
 * th-about-thailand.js — Thai About Us Thailand Section (S8)
 *
 * COPY strategy: full HTML rebuild with Thai text, CSS reused from English.
 * Source: about-thailand.js + i18n/th/about.js thailand
 */

const base = require('../../lib/templates/_base');
const en = require('./about-thailand');
const th = require('../../i18n/th/about');

const D = th.thailand;

function blocks() {
  const proofsHTML = D.proofs.map(p => `
                            <div class="thailand-proof">
                                <span class="proof-number">${p.number}</span>
                                <span class="proof-text">${p.text}</span>
                            </div>`).join('');

  const referencesHTML = D.references.map(r =>
    `<span class="reference-name">${r}</span>`
  ).join('\n                            ');

  const complianceHTML = D.complianceItems.map(item => `
                            <li>
                                <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>
                                <span>${item}</span>
                            </li>`).join('');

  const html = `
    <div class="thailand-section">
    <div class="thailand-inner" style="position: relative; z-index: 2;">
                <div class="thailand-header">
                    <span class="section-label">${D.label}</span>
                    <h2>${D.title}</h2>
                    <p>${D.subtitle}</p>
                </div>
                <div class="thailand-content">
                    <div class="thailand-text">
                        <div class="thailand-proof-grid">
${proofsHTML}
                        </div>

                        <p style="font-size: 15px; color: #475569; line-height: 1.8; margin: 24px 0;">${D.description}</p>

                        <h3>${D.referencesTitle}</h3>
                        <p class="reference-intro">${D.referencesIntro}</p>
                        <div class="reference-logos">
                            ${referencesHTML}
                        </div>

                        <h3>${D.complianceTitle}</h3>
                        <ul class="thailand-highlights">
${complianceHTML}
                        </ul>
                    </div>
                    <div class="contact-card">
                        <h3>${D.officeTitle}</h3>
                        <div class="contact-item">
                            <div class="contact-label">${D.addressLabel}</div>
                            <div class="contact-value">${D.address}</div>
                        </div>
                        <div class="contact-item">
                            <div class="contact-label">${D.emailLabel}</div>
                            <div class="contact-value"><a href="mailto:info@digiwin.co.th">info@digiwin.co.th</a></div>
                        </div>
                        <a href="demo.html" class="contact-cta">${D.contactCta}</a>
                    </div>
                </div>
            </div>
    </div>
    `;

  return base.wrapInDiviSection('ประเทศไทย', html, 'Thailand: เนื้อหา');
}

function css() {
  return en.css();
}

module.exports = { blocks, css };
