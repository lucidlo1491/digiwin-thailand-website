/**
 * wms-product-detail-cta.js — WMS CTA Section (S10)
 *
 * REFACTORED: Uses cta-gradient template (91 -> ~25 lines)
 * Source: wms.html — "Ready to End the Warehouse Chaos?"
 */

const ctaGradient = require('../../lib/templates/cta-gradient');

const DATA = {
  adminLabel: 'CTA: Ready to End the Warehouse Chaos?',
  sectionPrefix: 'wms-cta',
  background: 'linear-gradient(135deg, #00AFF0 0%, #003CC8 100%)',
  padding: '100px 24px',
  title: 'Ready to End the Warehouse Chaos?',
  subtitle: 'Fill out the form and our team will reach out to discuss your specific warehouse challenges.',
  buttons: [
    { text: 'Get in Touch', href: '/demo.html', style: 'primary' },
    { text: 'View All Products', href: '/products.html', style: 'ghost' },
  ],
  superD: { variant: 'outline', position: 'left', opacity: 0.16 },
  waveFlow: { height: '170px', opacity: 0.32 },
};

module.exports = {
  blocks: () => ctaGradient.blocks(DATA),
  css: () => ctaGradient.css(DATA),
};
