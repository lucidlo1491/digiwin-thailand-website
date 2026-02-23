/**
 * automotive-products.js — Products Section (S5)
 *
 * Source: automotive.html line 602
 * styles.css: 19 base, 4 hover, 3 pseudo, 0 hidden
 */

const base = require('../../lib/templates/_base');

const P = 'pro';

// ════════════════════════════════════════════════════════════════
// BLOCKS
// ════════════════════════════════════════════════════════════════
function blocks() {
  const html = `
    <div class="products-section">
    <div class="products-inner">
                <div class="products-header">
                    <h2>Recommended Products for Automotive</h2>
                </div>
                <div class="products-grid">
                    <a href="../products/erp.html" class="product-card">
                        <div class="product-card-icon">
                            <svg aria-hidden="true" viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18"/><path d="M9 21V9"/></svg>
                        </div>
                        <h3>T100 ERP</h3>
                        <p>Multi-site, multi-currency ERP with automotive-specific modules for EDI, JIT scheduling, and supplier management.</p>
                        <span class="product-card-link">Learn More <span>→</span></span>
                    </a>
                    <a href="../products/mes.html" class="product-card">
                        <div class="product-card-icon">
                            <svg aria-hidden="true" viewBox="0 0 24 24"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M6 7V5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v2"/><circle cx="6" cy="12" r="1"/><circle cx="10" cy="12" r="1"/><circle cx="14" cy="12" r="1"/><circle cx="18" cy="12" r="1"/></svg>
                        </div>
                        <h3>MES</h3>
                        <p>Full traceability, quality data collection, and real-time production visibility for automotive precision requirements.</p>
                        <span class="product-card-link">Learn More <span>→</span></span>
                    </a>
                    <a href="../products/wms.html" class="product-card">
                        <div class="product-card-icon">
                            <svg aria-hidden="true" viewBox="0 0 24 24"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.29 7 12 12 20.71 7"/><line x1="12" y1="22" x2="12" y2="12"/></svg>
                        </div>
                        <h3>sFLS WMS</h3>
                        <p>FIFO enforcement, lot tracking, and sequence delivery support for JIT warehouse operations.</p>
                        <span class="product-card-link">Learn More <span>→</span></span>
                    </a>
                </div>
            </div>
    </div>
    `;

  return base.wrapInDiviSection('Products', html, 'Products: Content');
}

// ════════════════════════════════════════════════════════════════
// CSS
// ════════════════════════════════════════════════════════════════
function css() {
  return `
/* === PRODUCTS (S5) === */
.products-section{padding:100px 0;background:#fff}
.products-inner{max-width:1100px;margin:0 auto;padding:0 24px}
.products-header{text-align:center;margin-bottom:60px}
.products-header h2{font-family:'Noto Sans', sans-serif;font-size:36px;color:#000864;margin-bottom:16px}
.products-grid{display:grid;grid-template-columns:repeat(3, 1fr);gap:24px}
.product-card{background:#fff;border:2px solid #e2e8f0;border-radius:16px;padding:32px;text-decoration:none;transition:all 0.3s ease;display:block}
.product-card-icon{width:56px;height:56px;background:linear-gradient(135deg, rgba(0, 175, 240, 0.1), rgba(0, 175, 240, 0.05));border-radius:14px;display:flex;align-items:center;justify-content:center;margin-bottom:20px;transition:all 0.4s ease}
.product-card-icon svg{width:28px;height:28px;stroke:#00AFF0;stroke-width:1.5;fill:none}
.product-card h3{font-family:'Noto Sans', sans-serif;font-size:20px;color:#000864;margin-bottom:12px}
.product-card p{font-size:14px;color:#5b6b80;line-height:1.6;margin-bottom:16px}
.product-card-link{display:inline-flex;align-items:center;gap:6px;color:#00AFF0;font-family:'Noto Sans', sans-serif;font-weight:600;font-size:14px}
.product-card:hover{border-color:#00AFF0;transform:translateY(-4px);box-shadow:0 12px 40px rgba(0, 175, 240, 0.12)}
.product-card:hover .product-card-icon{background:linear-gradient(135deg, #00AFF0, #003CC8)}
.product-card:hover .product-card-icon svg{stroke:#fff}
.product-card:hover .product-card-link{gap:10px}
/* Divi overrides */
.et_pb_section .products-header h2{font-weight:700 !important;line-height:1.3 !important;font-size:36px !important}
.et_pb_section .product-card h3{font-weight:700 !important;line-height:1.3 !important;color:#000864 !important}
.et_pb_section .product-card p{padding-bottom:0 !important;line-height:1.6 !important;color:#5b6b80 !important}
.et_pb_section .product-card-link{font-size:14px !important;color:#00AFF0 !important}
@media (max-width:1024px){.products-grid{grid-template-columns:1fr}}
/* Defensive SVG sizing */
svg:not([width]):not([class]){max-width:48px;max-height:48px}
${base.reducedMotion('')}
`.trim();
}

module.exports = { blocks, css };
