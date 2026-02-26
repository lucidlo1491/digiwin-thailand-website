/**
 * th-wms-product-detail-cta.js — Thai WMS CTA Section (S10) — TEMPLATE
 *
 * Uses cta-gradient template with Thai content from i18n.
 */

const ctaGradient = require('../../lib/templates/cta-gradient');
const th = require('../../i18n/th/wms');

const DATA = {
  adminLabel: th.cta.adminLabel,
  sectionPrefix: th.cta.sectionPrefix,
  background: 'linear-gradient(135deg, #00AFF0 0%, #003CC8 100%)',
  padding: '100px 24px',
  title: th.cta.title,
  subtitle: th.cta.subtitle,
  buttons: th.cta.buttons,
  superD: { variant: 'gradient', position: 'left', opacity: 0.14 },
  waveFlow: { height: '170px', opacity: 0.32 },
};

module.exports = {
  blocks: () => ctaGradient.blocks(DATA),
  css: () => ctaGradient.css(DATA),
};
