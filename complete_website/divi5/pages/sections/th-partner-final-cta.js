/**
 * th-partner-final-cta.js — Thai Final CTA Section (S9)
 *
 * MERGE: cta-gradient template is config-based. Flat merge of Thai content.
 */

const ctaGradient = require('../../lib/templates/cta-gradient');
const en = require('./partner-final-cta');
const th = require('../../i18n/th/partner-program');

const P = 'pp-cta'; // Same CSS prefix as English

const DATA = {
  ...en.DATA,
  adminLabel: th.finalCta.adminLabel,
  title: th.finalCta.title,
  subtitle: th.finalCta.subtitle,
  buttons: th.finalCta.buttons,
};

function blocks() {
  const templateBlocks = ctaGradient.blocks(DATA);

  // Inject Thai footer text (same pattern as English builder)
  const footerHTML = `<p class=\\"${P}-footer-text\\"><strong>${th.finalCta.footerText.split('?')[0]}?</strong> ${th.finalCta.footerText.split('?').slice(1).join('?').trim().replace(th.finalCta.footerLinkText, `<a href=\\"/partner-program/economics/\\">${th.finalCta.footerLinkText}</a>`)}</p>`;
  templateBlocks[3] = templateBlocks[3].replace(
    '</div>\\n    </div>\\n    </div>',
    '</div>\\n    ' + footerHTML + '\\n    </div>\\n    </div>'
  );
  return templateBlocks;
}

function css() {
  return en.css();
}

module.exports = { blocks, css, DATA };
