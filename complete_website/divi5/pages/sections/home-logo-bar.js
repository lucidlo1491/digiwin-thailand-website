/**
 * home-logo-bar.js — Client Logo Bar (§3.2)
 * 8 client logos in a marquee + 3 stats below.
 *
 * Template: logo-marquee
 */

const path = require('path');
const logoMarquee = require('../../lib/templates/logo-marquee');

const DATA = {
  adminLabel: 'Client Logo Bar',
  sectionPrefix: 'logobar',
  label: 'Trusted by Leading Manufacturers in Thailand',
  logoDir: path.join(__dirname, '..', '..', '..', 'logos'),
  clients: [
    { name: 'Cal-Comp Electronics', subtitle: 'SET: CCET', initials: 'CC', color: '#0369a1', logo: 'calcomp.png' },
    { name: 'TTS Plastic', subtitle: 'Injection Molding', initials: 'TTS', color: '#dc2626', logo: 'tts-plastic.png' },
    { name: 'Yeong Guan Energy', subtitle: 'TWSE: 1589', initials: 'YG', color: '#059669', logo: 'yeong-guan.jpg' },
    { name: 'S.T.K. Steel', subtitle: 'Stainless Steel', initials: 'STK', color: '#7c3aed', logo: 'stk-steel.png' },
    { name: 'Goldensea Hi-Tech', subtitle: 'Specialty Chemicals', initials: 'GH', color: '#ea580c', logo: 'goldensea.png' },
    { name: 'Chelic Corporation', subtitle: 'TWSE: 4555', initials: 'CHE', color: '#0891b2', logo: 'chelic.png' },
    { name: 'Chung Tai Rubber', subtitle: 'Vibration Control', initials: 'CTR', color: '#475569', logo: 'ctr.png' },
    { name: 'Haidilao International', subtitle: 'HKEX: 6862', initials: 'HDL', color: '#dc2626', logo: 'haidilao.png' },
  ],
  stats: [
    { value: '50,000+', label: 'Factories Worldwide' },
    { value: '44', label: 'Years in Manufacturing' },
    { value: 'Certified', label: 'Thai Revenue Department' },
  ],
  spec: {
    background: 'linear-gradient(180deg, #f8fafc 0%, #ffffff 100%)',
    padding: '60px 0',
    logoHeight: '108px',
    logoMaxWidth: '126px',
    filterDefault: 'grayscale(100%) opacity(0.45)',
    filterHover: 'grayscale(0%) opacity(1)',
    nameSize: '30px',
    nameWeight: '600',
    nameColor: '#334155',
    nameOpacity: '0.55',
    subtitleSize: '16px',
    labelColor: '#5b6b80',
    marqueeSpeed: '35s',
    marqueeGap: '60px',
    maskImage: 'linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent)',
  },
};

module.exports = {
  DATA,
  blocks: () => logoMarquee.blocks(DATA),
  css: () => logoMarquee.css(DATA),
};
