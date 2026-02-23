/**
 * about-cta.js — Cta Section (S11)
 *
 * REFACTORED: Uses cta-gradient template + contact info injection.
 * NOTE: Contains inline SVGs — may need Base64 JS injection if wp_kses strips elements.
 * Source: about.html line 3248
 */

const ctaGradient = require('../../lib/templates/cta-gradient');

const P = 'about-cta';

const DATA = {
  adminLabel: 'CTA',
  sectionPrefix: P,
  background: 'linear-gradient(135deg, #00AFF0 0%, #003CC8 100%)',
  padding: '100px 24px',
  maxWidth: '800px',
  title: 'Ready to Work with a Team That Understands Manufacturing?',
  subtitle: 'See how <span class="dw-years">44</span> years of manufacturing expertise\u2014backed by Foxconn FII\u2014can help you compete on the global stage.',
  subtitleFontSize: '18px',
  buttons: [
    { text: "Let\u2019s Talk", href: '/demo.html', style: 'primary' },
    { text: 'Become a Partner', href: '/partner-program.html', style: 'ghost' },
  ],
  superD: { variant: 'gradient', position: 'right', opacity: 0.12 },
  waveFlow: { height: '160px', opacity: 0.3 },
};

function blocks() {
  const templateBlocks = ctaGradient.blocks(DATA);

  // Inject contact info after the button row (same pattern as partner-final-cta.js)
  const contactHTML =
    `<div class=\\"${P}-contact-info\\">` +
    `<div class=\\"${P}-contact-item\\">` +
    `<svg aria-hidden=\\"true\\" viewBox=\\"0 0 24 24\\" fill=\\"none\\" stroke=\\"currentColor\\" stroke-width=\\"2\\"><path d=\\"M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z\\"/><circle cx=\\"12\\" cy=\\"10\\" r=\\"3\\"/></svg>` +
    `<span>No. 2/117-118, Bangna Complex Office Tower, 22F, Theparat Rd, Bangna, Bangkok 10260</span>` +
    `</div>` +
    `<div class=\\"${P}-contact-item\\">` +
    `<svg aria-hidden=\\"true\\" viewBox=\\"0 0 24 24\\" fill=\\"none\\" stroke=\\"currentColor\\" stroke-width=\\"2\\"><path d=\\"M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z\\"/><polyline points=\\"22,6 12,13 2,6\\"/></svg>` +
    `<a href=\\"mailto:info@digiwin.co.th\\">info@digiwin.co.th</a>` +
    `</div>` +
    `</div>`;

  templateBlocks[3] = templateBlocks[3].replace(
    '</div>\n    </div>\n    </div>',
    '</div>\n    ' + contactHTML + '\n    </div>\n    </div>'
  );
  return templateBlocks;
}

function css() {
  return ctaGradient.css(DATA) + `
.${P}-btn--primary{color:rgb(3,105,161) !important;box-shadow:rgba(0,0,0,0.15) 0px 4px 14px 0px !important}
.${P}-btn--ghost{padding:20px 40px !important;border-color:rgba(255,255,255,0.5) !important;border-radius:14px !important}
.${P}-subtitle{line-height:28.8px !important}
.${P}-subtitle .dw-years{line-height:28.8px !important}
.${P}-contact-info{display:flex;gap:40px;justify-content:center;flex-wrap:wrap;margin-top:40px;position:relative;z-index:3}
.${P}-contact-item{display:flex;align-items:center;gap:10px;font-family:'Noto Sans',sans-serif;font-size:15px;color:rgba(255,255,255,0.85)}
.${P}-contact-item svg{width:18px;height:18px;flex-shrink:0;stroke:rgba(255,255,255,0.85)}
.${P}-contact-item span{color:rgba(255,255,255,0.85) !important}
.${P}-contact-item a{color:#fff !important;text-decoration:none}
.${P}-contact-item a:hover{text-decoration:underline}`;
}

module.exports = { blocks, css };
