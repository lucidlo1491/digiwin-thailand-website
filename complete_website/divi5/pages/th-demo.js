/**
 * th-demo.js — Thai Contact page config
 *
 * WordPress page: Thai Contact (ID 100810, slug: demo, parent: /th/)
 */

const path = require('path');

const heroBuilder = require('./sections/th-demo-hero');
const formBuilder = require('./sections/th-demo-form');
const expectBuilder = require('./sections/th-demo-expect');

module.exports = {
  pageId: 100810,
  title: 'ติดต่อเรา — DigiWin Thailand',
  siteUrl: 'https://digiwin-thailand.local',
  prototypePath: path.join(__dirname, '..', '..', 'demo.html'),
  protoFile: 'demo.html',

  sections: [
    { name: 'hero', builder: heroBuilder },
    { name: 'form', builder: formBuilder },
    { name: 'expect', builder: expectBuilder },
  ],

  editabilityRules: {
    bannedBlocks: ['wp:divi/button', 'wp:divi/group'],
    maxHtmlBlocks: 5,
  },
};
