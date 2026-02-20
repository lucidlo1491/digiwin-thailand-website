/**
 * Divi 5 Section Builder: Home Product Pillars (Section 5)
 *
 * ContentSpec §3.5 — Product Pillars
 * Four product cards in a grid layout with icons, features, and hover effects
 */

const { codeModule, textModule, sectionOpen, sectionClose, rowOpen, rowClose, columnOpen, columnClose } = require('../../lib/modules');
const superD = require('../../lib/super-d');

/**
 * Generate section blocks
 */
function blocks() {
  const output = [];

  // Section open
  output.push(sectionOpen({
    adminLabel: 'Home: Product Pillars',
    css: 'selector{background:transparent !important;padding:0 !important;}',
  }));

  output.push(rowOpen({ css: 'selector{max-width:100% !important;margin:0 !important;padding:0 !important;}' }));
  output.push(columnOpen({ css: 'selector{width:100% !important;}' }));

  // Super D decoration — gradient variant, bottom-right corner
  output.push(codeModule(superD.html('products-deco'), 'Decoration: Super D Gradient'));

  // Section Header + Product Cards (single Code Module with wrapper)
  output.push(codeModule(`
      <div class="products-section">
      <div class="products-header">
        <div class="products-header-label">Complete Manufacturing Stack</div>
        <h2 class="products-title">One Ecosystem. Total Visibility.</h2>
        <p class="products-subtitle">From financials to the factory floor, every DigiWin product works together\u2014no integration nightmares, no data silos.</p>
      </div>

      <div class="products-grid">

        <!-- Card 1: ERP Core -->
        <a href="/products/erp.html" class="products-card">
          <div class="products-card__icon">
            <svg width="36" height="36" viewBox="0 0 36 36" fill="none" stroke="#0369a1" stroke-width="1.5">
              <rect x="4" y="2" width="20" height="28" rx="2"/>
              <rect x="12" y="12" width="20" height="22" rx="2" fill="none"/>
              <path d="M8 8h12M8 13h8M8 18h10"/>
              <circle cx="22" cy="23" r="5"/>
              <path d="M22 20v6M19 23h6"/>
            </svg>
          </div>
          <h3 class="products-card__title">ERP Core</h3>
          <div class="products-card__full-name">Enterprise Resource Planning</div>
          <div class="products-card__tagline">The central brain of your business</div>
          <ul class="products-card__features">
            <li><strong>Financials</strong> — accounting, invoicing, budgets in one place</li>
            <li><strong>Inventory</strong> — real-time stock levels across locations</li>
            <li><strong>Operations</strong> — purchase orders, sales, and costs connected</li>
          </ul>
          <div class="products-card__benefit">Replace scattered spreadsheets with one source of truth.</div>
        </a>

        <!-- Card 2: MES -->
        <a href="/products/mes.html" class="products-card">
          <div class="products-card__icon">
            <svg width="36" height="36" viewBox="0 0 36 36" fill="none" stroke="#0369a1" stroke-width="1.5">
              <rect x="2" y="6" width="32" height="18" rx="2"/>
              <path d="M2 14h32"/>
              <rect x="6" y="9" width="4" height="3" rx="1"/>
              <rect x="12" y="9" width="4" height="3" rx="1"/>
              <circle cx="28" cy="11" r="2"/>
              <path d="M6 28h24"/>
              <circle cx="12" cy="28" r="2"/>
              <circle cx="24" cy="28" r="2"/>
              <path d="M12 24v4M24 24v4"/>
            </svg>
          </div>
          <h3 class="products-card__title">MES</h3>
          <div class="products-card__full-name">Manufacturing Execution System</div>
          <div class="products-card__tagline">Your digital eyes on the production floor</div>
          <ul class="products-card__features">
            <li><strong>Track</strong> — follow every product through each workstation</li>
            <li><strong>Record</strong> — who made what, when, and how</li>
            <li><strong>Alert</strong> — spot delays and quality issues instantly</li>
          </ul>
          <div class="products-card__benefit">Answer "which batch was my order?" in seconds.</div>
        </a>

        <!-- Card 3: WMS -->
        <a href="/products/wms.html" class="products-card">
          <div class="products-card__icon">
            <svg width="36" height="36" viewBox="0 0 36 36" fill="none" stroke="#0369a1" stroke-width="1.5">
              <path d="M4 4v28h28"/>
              <path d="M4 16h28M4 24h28"/>
              <path d="M14 4v28M24 4v28"/>
              <rect x="6" y="6" width="6" height="8" rx="1" fill="#0369a1" opacity="0.2"/>
              <rect x="16" y="18" width="6" height="4" rx="1" fill="#0369a1" opacity="0.15"/>
              <rect x="26" y="6" width="4" height="8" rx="1" fill="#0369a1" opacity="0.1"/>
            </svg>
          </div>
          <h3 class="products-card__title">WMS</h3>
          <div class="products-card__full-name">Warehouse Management System</div>
          <div class="products-card__tagline">Never lose track of inventory again</div>
          <ul class="products-card__features">
            <li><strong>Locate</strong> — know which shelf, bin, and zone for every item</li>
            <li><strong>Guide</strong> — barcode scanning for pick, pack, and ship</li>
            <li><strong>Count</strong> — cycle counts that match reality</li>
          </ul>
          <div class="products-card__benefit">Faster fulfillment, fewer mistakes, accurate stock.</div>
        </a>

        <!-- Card 4: AIoT -->
        <a href="/products/aiot.html" class="products-card">
          <div class="products-card__icon">
            <svg width="36" height="36" viewBox="0 0 36 36" fill="none" stroke="#0369a1" stroke-width="1.5">
              <rect x="12" y="12" width="12" height="12" rx="2"/>
              <text x="18" y="20" text-anchor="middle" font-size="6" fill="#0369a1" stroke="none" font-family="monospace">AI</text>
              <circle cx="6" cy="6" r="3"/>
              <circle cx="30" cy="6" r="3"/>
              <circle cx="6" cy="30" r="3"/>
              <circle cx="30" cy="30" r="3"/>
              <path d="M9 9l3 3M27 9l-3 3M9 27l3-3M27 27l-3-3"/>
              <path d="M18 9V12M27 18h-3M18 27V24M9 18h3" stroke-dasharray="2 2"/>
            </svg>
          </div>
          <h3 class="products-card__title">AIoT</h3>
          <div class="products-card__full-name">AI + Internet of Things</div>
          <div class="products-card__tagline">Connect your machines to the digital world</div>
          <ul class="products-card__features">
            <li><strong>Collect</strong> — temperature, speed, vibration automatically</li>
            <li><strong>Predict</strong> — machine breakdowns before they happen</li>
            <li><strong>Optimize</strong> — energy usage and efficiency gains</li>
          </ul>
          <div class="products-card__benefit">No manual logging. AI finds what humans miss.</div>
        </a>

      </div>
      </div>
    `, 'Products: Header + 4 Pillar Cards'));

  output.push(columnClose());
  output.push(rowClose());
  output.push(sectionClose());

  return output;
}

/**
 * Generate section CSS
 */
function css() {
  const parts = [];

  // Section header styles (NO decorative flanking lines — matches HTML original)
  parts.push(`
.products-header{text-align:center;max-width:800px;margin:0 auto 56px;position:relative;z-index:2}
.products-header-label{font-family:'Noto Sans',sans-serif;font-size:13px;font-weight:600;text-transform:uppercase;letter-spacing:0.1em;color:#0369a1;margin-bottom:12px;line-height:1.6}
.products-title{font-family:'Noto Sans',sans-serif;font-size:clamp(32px,4vw,44px);font-weight:700;color:#000864;line-height:1.15;letter-spacing:-0.02em;margin:0 0 16px}
.products-subtitle{font-family:'Noto Sans',sans-serif;font-size:18px;font-weight:400;color:#5b6b80;line-height:1.6;margin:0}`);

  // Super D decoration
  parts.push(`/* Super D: gradient corner-br */\n${superD.css('products-deco', { variant: 'gradient', position: 'corner-br', opacity: 0.08 })}`);

  // Section wrapper
  parts.push(`
/* Products Section Wrapper */
.products-section {
  background: #F5F7FA;
  padding: 100px 80px;
  position: relative;
  -webkit-font-smoothing: auto;
  -moz-osx-font-smoothing: auto;
  font-size: 16px;
  overflow: hidden;
}
.products-header,
.products-grid {
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;
}`);

  // Products grid
  parts.push(`
/* Products Grid */
.products-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;
  margin-top: 60px;
}

/* Product Card */
.products-card {
  position: relative;
  background: #ffffff;
  border-radius: 20px;
  padding: 40px 28px;
  text-align: center;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.04);
  border: 1px solid #f1f5f9;
  transition: all 0.2s ease;
  text-decoration: none;
  display: block;
  line-height: 1.6;
  overflow: hidden;
  color: #333333;
}

.products-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: linear-gradient(90deg, #00AFF0, #003CC8);
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.2s ease;
}

.products-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 20px 60px rgba(0, 175, 240, 0.12);
  border-color: transparent;
}

.products-card:hover::before {
  transform: scaleX(1);
}

/* Card Icon */
.products-card__icon {
  width: 80px;
  height: 80px;
  margin: 0 auto 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(145deg, #000864, #1e3a5f);
  border-radius: 24px;
  transition: all 0.4s ease;
  position: relative;
}

.products-card__icon::after {
  content: '';
  position: absolute;
  inset: -4px;
  border-radius: 28px;
  background: linear-gradient(145deg, #00AFF0, #003CC8);
  opacity: 0;
  transition: opacity 0.4s ease;
  z-index: -1;
}

.products-card:hover .products-card__icon {
  transform: scale(1.05) rotate(-3deg);
}

.products-card:hover .products-card__icon::after {
  opacity: 0.3;
}

.products-card__icon svg {
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1));
}

/* Card Title */
.products-card__title {
  font-family: 'Noto Sans', sans-serif;
  font-weight: 700;
  font-size: 20px;
  line-height: 1.6;
  color: #000864;
  margin: 0 0 10px 0;
}

/* Full Product Name */
.products-card__full-name {
  font-family: 'JetBrains Mono', monospace;
  font-size: 11px;
  font-weight: 500;
  color: #0369a1;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: 4px;
  text-align: left;
}

/* Tagline */
.products-card__tagline {
  font-family: 'Noto Sans', sans-serif;
  font-weight: 600;
  font-size: 15px;
  line-height: 1.3;
  color: #000864;
  margin-bottom: 12px;
  text-align: left;
}

/* Features List */
.products-card__features {
  list-style: none;
  padding: 0;
  margin: 0 0 20px 0;
  text-align: left;
}

.products-card__features li {
  font-family: 'Noto Sans', sans-serif;
  font-size: 13px;
  line-height: 1.6;
  color: #5b6b80;
  margin-bottom: 0;
  padding: 4px 0 4px 12px;
  position: relative;
}

.products-card__features li::before {
  content: '';
  position: absolute;
  left: 0;
  top: 8px;
  width: 4px;
  height: 4px;
  background: #00AFF0;
  border-radius: 50%;
}

.products-card__features li:last-child {
  margin-bottom: 0;
}

.products-card__features strong {
  font-weight: 600;
  color: #475569;
}

/* Benefit Line */
.products-card__benefit {
  font-family: 'Noto Sans', sans-serif;
  font-size: 13px;
  font-weight: 500;
  line-height: 1.6;
  color: #0369a1;
  border-top: 1px solid #e2e8f0;
  padding-top: 10px;
  margin-top: 4px;
  text-align: left;
}

/* Responsive: Tablet */
@media (max-width: 1024px) {
  .products-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
  }

  .products-card {
    padding: 32px 24px;
  }
}

/* Responsive: Mobile */
@media (max-width: 640px) {
  .products-grid {
    grid-template-columns: 1fr;
    gap: 16px;
    margin-top: 40px;
  }

  .products-card {
    padding: 28px 20px;
  }

  .products-card__icon {
    width: 64px;
    height: 64px;
    margin-bottom: 20px;
  }

  .products-card__icon svg {
    width: 28px;
    height: 28px;
  }

  .products-card__title {
    font-size: 18px;
  }

  .products-card__tagline {
    font-size: 14px;
  }

  .products-card__features li {
    font-size: 12px;
  }

  .products-card__benefit {
    font-size: 12px;
  }
}

/* ===== REDUCED MOTION ===== */
@media (prefers-reduced-motion: reduce) {
  .products-card,
  .products-card__icon,
  .products-card__icon::after {
    transition: none !important;
  }
  .products-card:hover .products-card__icon {
    transform: none !important;
  }
}
  `.trim());

  return parts.join('\n\n');
}

module.exports = { blocks, css };
