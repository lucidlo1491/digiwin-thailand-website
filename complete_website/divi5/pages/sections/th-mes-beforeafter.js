/**
 * th-mes-beforeafter.js — Thai MES Before/After (S3)
 *
 * Same layout/CSS as English. Thai strings from i18n/th/mes.js.
 */

const base = require('../../lib/templates/_base');
const enBuilder = require('./mes-beforeafter');
const th = require('../../i18n/th/mes');

function blocks() {
  const b = th.beforeafter;

  const beforeItemsHTML = b.before.map(item => `
                            <div class="beforeafter-item">
                                <div class="beforeafter-item-title">${item.title}</div>
                                <div class="beforeafter-item-desc">${item.desc}</div>
                            </div>`).join('');

  const afterItemsHTML = b.after.map(item => `
                            <div class="beforeafter-item">
                                <div class="beforeafter-item-title">${item.title}</div>
                                <div class="beforeafter-item-desc">${item.desc}</div>
                            </div>`).join('');

  const html = `
    <div class="beforeafter-section">
    <div class="beforeafter-inner">
                <div class="section-header">
                    <h2 class="section-title">${b.title}</h2>
                    <p class="section-subtitle">${b.subtitle}</p>
                </div>
    
                <div class="beforeafter-grid">
                    <div class="beforeafter-column before">
                        <div class="beforeafter-header before">
                            <div class="beforeafter-label before">${b.beforeLabel}</div>
                        </div>
                        <div class="beforeafter-content">${beforeItemsHTML}
                        </div>
                    </div>
    
                    <div class="beforeafter-arrow">\u2192</div>
    
                    <div class="beforeafter-column after">
                        <div class="beforeafter-header after">
                            <div class="beforeafter-label after">${b.afterLabel}</div>
                        </div>
                        <div class="beforeafter-content">${afterItemsHTML}
                        </div>
                    </div>
                </div>
            </div>
    </div>
    `;

  return base.wrapInDiviSection('Beforeafter (Thai)', html, 'Beforeafter: Content');
}

module.exports = { blocks, css: enBuilder.css };
