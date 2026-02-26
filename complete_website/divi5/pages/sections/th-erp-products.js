/**
 * th-erp-products.js — Thai Products Section
 *
 * Reuses English CSS. Replaces all English text with Thai content.
 */

const base = require('../../lib/templates/_base');
const en = require('./erp-products');
const thErp = require('../../i18n/th/erp');

const t = thErp.products;

function blocks() {
  const checkSvg = '<span class="check-icon"><svg aria-hidden="true" viewBox="0 0 12 12"><path d="M2 6l3 3 5-5"/></svg></span>';

  const t100Features = t.t100.features.map(f => `<li>${checkSvg} ${f}</li>`).join('\n                                ');
  const igpFeatures = t.igp.features.map(f => `<li>${checkSvg} ${f}</li>`).join('\n                                ');

  const erpiiModulesHTML = t.igp.erpiiModules.map((m, i) => {
    // Reuse the same SVG icons from English
    const svgs = [
      '<svg aria-hidden="true" viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/></svg>',
      '<svg aria-hidden="true" viewBox="0 0 24 24"><path d="M16 3h5v5M4 20L21 3M21 16v5h-5M14 14l7 7M3 8V3h5M10 10L3 3"/></svg>',
      '<svg aria-hidden="true" viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>',
      '<svg aria-hidden="true" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="16" rx="2"/><path d="M3 10h18"/><path d="M8 2v4M16 2v4"/></svg>',
      '<svg aria-hidden="true" viewBox="0 0 24 24"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M6 8v8M10 8v8M14 8v8M18 8v8"/></svg>',
      '<svg aria-hidden="true" viewBox="0 0 24 24"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>',
    ];
    const mesLink = i === 4 ? `<a href="mes.html" style="color: inherit; text-decoration: underline; text-decoration-color: #0369a1; text-underline-offset: 2px;">${m.name}</a>` : m.name;
    return `
                                        <div class="erpii-module-card">
                                            <div class="erpii-module-icon">${svgs[i]}</div>
                                            <div class="erpii-module-label">${m.label}</div>
                                            <div class="erpii-module-name">${i === 4 ? mesLink : m.name}</div>
                                            <div class="erpii-module-desc">${m.desc}</div>
                                        </div>`;
  }).join('');

  const useCasePillsHTML = t.useCasePills.map((pill, i) => {
    const hrefs = ['#igp-card', '#t100-card', '#igp-card', '#capabilities', '#t100-card'];
    return `<a href="${hrefs[i]}" class="erp-use-case-pill">${pill}</a>`;
  }).join('\n                    ');

  const html = `
    <div class="products-section">
    <div class="products-inner">
                <div class="products-header">
                    <p class="products-label">${t.label}</p>
                    <h2 class="products-title">${t.title}</h2>
                    <p class="products-subtitle">${t.subtitle}</p>
                </div>

                <nav class="erp-use-case-pills" aria-label="ERP use cases">
                    ${useCasePillsHTML}
                </nav>

                <div class="products-comparison">

                    <div class="product-card" id="t100-card">
                        <div class="product-card-header">
                            <span class="product-card-badge">${t.t100.badge}</span>
                            <h3 class="product-card-name">${t.t100.name}</h3>
                            <p class="product-card-tagline">${t.t100.tagline}</p>
                        </div>
                        <div class="product-card-body">
                            <p class="product-card-desc">${t.t100.desc}</p>
                            <ul class="product-features">
                                ${t100Features}
                            </ul>
                            <div class="product-best-for">
                                <div class="product-best-for-label">${t.t100.bestForLabel}</div>
                                <div class="product-best-for-text">${t.t100.bestForText}</div>
                            </div>

                            <div class="erp-trust-callout">
                                <div class="erp-trust-icon">
                                    <svg aria-hidden="true" viewBox="0 0 24 24"><rect x="5" y="11" width="14" height="10" rx="2"/><path d="M12 3a4 4 0 0 0-4 4v4h8V7a4 4 0 0 0-4-4z"/><path d="M8 7v4M16 7v4"/><circle cx="12" cy="16" r="1"/><path d="M12 17v2"/></svg>
                                </div>
                                <div>
                                    <h4 class="erp-trust-title">${t.t100.trustTitle}</h4>
                                    <p class="erp-trust-body">${t.t100.trustBody}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="product-card" id="igp-card">
                        <div class="product-card-header">
                            <span class="product-card-badge">${t.igp.badge}</span>
                            <h3 class="product-card-name">${t.igp.name}</h3>
                            <p class="product-card-tagline">${t.igp.tagline}</p>
                        </div>
                        <div class="product-card-body">
                            <p class="product-card-desc">${t.igp.desc}</p>
                            <ul class="product-features">
                                ${igpFeatures}
                            </ul>
                            <div class="product-best-for">
                                <div class="product-best-for-label">${t.igp.bestForLabel}</div>
                                <div class="product-best-for-text">${t.igp.bestForText}</div>
                            </div>

                            <p class="erp-proven-in">${t.igp.provenIn}</p>

                            <details class="erp-erpii-accordion">
                                <summary>${t.igp.erpiiSummary} <span class="accordion-icon" aria-hidden="true">+</span></summary>
                                <div class="erpii-content">
                                    <h4 class="erpii-title">${t.igp.erpiiTitle}</h4>
                                    <p class="erpii-subtitle">${t.igp.erpiiSubtitle}</p>
                                    <div class="erpii-modules-grid">${erpiiModulesHTML}
                                    </div>
                                </div>
                            </details>
                        </div>
                    </div>
                </div>
            </div>
    </div>
    `;

  return base.wrapInDiviSection('Products (Thai)', html, 'Products: Content');
}

module.exports = { blocks, css: () => en.css() };
