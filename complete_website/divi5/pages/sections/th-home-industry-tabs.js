/**
 * th-home-industry-tabs.js — Thai Industry Tabs (Deep Merge via tab ID)
 * Template: tab-content (same as English)
 *
 * Deep merge: English layout (extractSvg, tab IDs) + Thai text
 */
const tabContent = require('../../lib/templates/tab-content');
const en = require('./home-industry-tabs');
const th = require('../../i18n/th/home');

const DATA = {
  ...en.DATA,
  adminLabel: th.industryTabs.adminLabel,
  header: th.industryTabs.header,
  tabs: en.DATA.tabs.map(tab => ({
    ...tab,                           // English: id, extractSvg mapping
    ...th.industryTabs.tabs[tab.id],  // Thai: label, title, description, features, cta
  })),
};

module.exports = {
  DATA,
  blocks: () => tabContent.blocks(DATA),
  css: () => tabContent.css(DATA),
};
