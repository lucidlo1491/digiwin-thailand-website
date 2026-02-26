/**
 * th-mes-products.js — Thai MES Products (S4)
 *
 * Same layout/CSS as English. Thai strings from i18n/th/mes.js.
 */

const base = require('../../lib/templates/_base');
const enBuilder = require('./mes-products');
const th = require('../../i18n/th/mes');

function blocks() {
  const p = th.products;
  const boxes = p.boxes;

  const badgeClasses = ['full', 'light', 'entry'];

  const boxesHTML = boxes.map((box, i) => {
    const featuresHTML = box.features.map(f => `
                                <li>${f}</li>`).join('');

    return `
                    <div class="product-box">
                        <div class="product-box-header">
                            <span class="product-box-badge ${badgeClasses[i]}">${box.badge}</span>
                            <h3 class="product-box-title">${box.title}</h3>
                            <p class="product-box-tagline">${box.tagline}</p>
                        </div>
                        <div class="product-box-content">
                            <p class="product-box-desc">${box.desc}</p>
                            <ul class="product-features">${featuresHTML}
                            </ul>
                            <div class="product-best-for">
                                <div class="product-best-for-label">${box.bestForLabel}</div>
                                <div class="product-best-for-text">${box.bestFor}</div>
                            </div>
                        </div>
                    </div>`;
  }).join('\n');

  const arrowSymbols = ['\u25B2', '\u25B2\u25B2', '\u25B2\u25B2\u25B2'];
  const guideHTML = p.selectionGuide.map((item, i) => `
                    <div class="selection-guide-item">
                        <div class="selection-guide-arrow">${arrowSymbols[i]}</div>
                        <div class="selection-guide-product">${item.product}</div>
                        <div class="selection-guide-desc">${item.desc}</div>
                    </div>`).join('');

  const workflowStepsHTML = p.workflow.steps.map((step, i) => {
    const connector = i < p.workflow.steps.length - 1 ? '<div class="workflow-connector"></div>' : '';
    return `
                        <div class="workflow-step">
                            <div class="workflow-step-circle">${i + 1}</div>
                            <div class="workflow-step-label">${step}</div>
                        </div>
                        ${connector}`;
  }).join('');

  const html = `
    <div class="products-section">
    <div class="products-inner">
                <div class="section-header">
                    <h2 class="section-title">${p.title}</h2>
                    <p class="section-subtitle">${p.subtitle}</p>
                </div>
    
                <div class="products-grid">${boxesHTML}
                </div>
    
                <div class="selection-guide">${guideHTML}
                </div>
    
                <div class="erp-compat-callout">
                    <div class="erp-compat-icon">
                        <svg aria-hidden="true" viewBox="0 0 24 24"><path d="M12 2v6m0 8v6M4.93 4.93l4.24 4.24m5.66 5.66l4.24 4.24M2 12h6m8 0h6M4.93 19.07l4.24-4.24m5.66-5.66l4.24-4.24"/></svg>
                    </div>
                    <div class="erp-compat-content">
                        <h3>${p.erpCompat.title}</h3>
                        <p>${p.erpCompat.desc}</p>
                    </div>
                </div>
    
                <div class="workflow-strip">
                    <h3 class="workflow-strip-title">${p.workflow.title}</h3>
                    <div class="workflow-steps">${workflowStepsHTML}
                    </div>
                    <p class="workflow-caption">${p.workflow.caption}</p>
                </div>
            </div>
    </div>
    `;

  return base.wrapInDiviSection('Products (Thai)', html, 'Products: Content');
}

module.exports = { blocks, css: enBuilder.css };
