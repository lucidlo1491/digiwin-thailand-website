/**
 * partner-final-cta.js — Final CTA Section (S9)
 *
 * Uses cta-gradient template with partner-specific copy.
 * Adds optional footer text for "not ready" follow-up.
 *
 * Source: partner-program.html lines 1457-1472
 */

const ctaGradient = require('../../lib/templates/cta-gradient');
const { codeModule } = require('../../lib/modules');

const P = 'pp-cta';

const DATA = {
  adminLabel: 'Final CTA: Ready to Discuss',
  sectionPrefix: P,
  background: 'linear-gradient(135deg, #00AFF0 0%, #003CC8 50%, #001080 100%)',
  padding: '100px 24px',
  title: 'Ready to Discuss Your Territory?',
  subtitle: 'A straightforward conversation about <em>your</em> margins, <em>your</em> market, and whether the partnership math works for both sides.',
  buttons: [
    { text: "Let\u2019s Talk Partnership", href: '/demo.html', style: 'primary' },
    { text: 'See the Math First', href: '/partner-program/economics.html', style: 'ghost' },
  ],
  superD: { variant: 'gradient', position: 'left', opacity: 0.12 },
  waveFlow: { height: '160px', opacity: 0.30 },
};

function blocks() {
  const templateBlocks = ctaGradient.blocks(DATA);

  // Inject footer text into the code module HTML (index 3 = code module with section HTML)
  // Content is JSON-encoded inside the block, so newlines are \\n literals
  const footerHTML = `<p class=\\"${P}-footer-text\\"><strong>Not ready to talk?</strong> Start with the <a href=\\"/partner-program/economics.html\\">Partner Economics</a> page \\u2014 validate the numbers privately before reaching out.</p>`;
  // Insert before last two closing divs (container + section wrapper)
  templateBlocks[3] = templateBlocks[3].replace(
    '</div>\\n    </div>\\n    </div>',
    '</div>\\n    ' + footerHTML + '\\n    </div>\\n    </div>'
  );
  return templateBlocks;
}

function css() {
  const templateCSS = ctaGradient.css(DATA);

  // Override template values to match HTML reference
  const overrideCSS = `
.${P}-title{font-size:40px;line-height:1.6;letter-spacing:normal;margin-bottom:16px}
.${P}-subtitle{font-size:18px;line-height:1.6;max-width:600px;margin-bottom:40px}
.${P}-btn--primary{color:#0369a1}
.${P}-btn-row{gap:16px}`;

  // Add footer text styling
  const footerCSS = `
.${P}-footer-text{text-align:center;max-width:600px;margin:32px auto 40px;font-family:'Noto Sans',sans-serif;font-size:14px;color:rgba(255,255,255,0.75);position:relative;z-index:3}
.${P}-footer-text strong{font-weight:600;color:rgba(255,255,255,0.9)}
.${P}-footer-text a{color:#7EC8F2;text-decoration:underline;transition:color 0.2s}
.${P}-footer-text a:hover{color:#fff}`;

  return templateCSS + overrideCSS + footerCSS;
}

module.exports = { blocks, css };
