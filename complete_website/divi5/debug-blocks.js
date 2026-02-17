#!/usr/bin/env node
/**
 * debug-blocks.js — Validate JSON structure of all code/text modules
 */
const sections = ['home-logo-bar', 'home-factory-checks', 'home-partner-checks', 'home-product-pillars',
  'home-industry-tabs', 'home-stats-banner', 'home-trust-anchors', 'home-proven-results', 'home-final-cta'];

for (const name of sections) {
  const mod = require('./pages/sections/' + name);
  const blocks = mod.blocks();
  for (let i = 0; i < blocks.length; i++) {
    const block = blocks[i];

    // Check wp:divi/code
    if (block.includes('wp:divi/code')) {
      const jsonMatch = block.match(/wp:divi\/code (\{.*\}) \/-->/);
      if (jsonMatch) {
        try {
          const parsed = JSON.parse(jsonMatch[1]);
          const val = parsed.content && parsed.content.innerContent && parsed.content.innerContent.desktop && parsed.content.innerContent.desktop.value;
          const type = typeof val;
          const len = type === 'string' ? val.length : 'N/A';
          const label = (parsed.module && parsed.module.meta && parsed.module.meta.adminLabel && parsed.module.meta.adminLabel.desktop && parsed.module.meta.adminLabel.desktop.value) || '?';
          const status = type === 'string' ? 'OK' : 'PROBLEM';
          console.log(`${status} | ${name} | code[${i}] | type:${type} | len:${len} | label:"${label}"`);
          if (type !== 'string') {
            console.log('  Value:', JSON.stringify(val).substring(0, 200));
          }
        } catch(e) {
          console.log(`ERROR | ${name} | code[${i}] | JSON parse: ${e.message.substring(0, 100)}`);
        }
      }
    }

    // Check wp:divi/text
    if (block.includes('wp:divi/text')) {
      const jsonMatch = block.match(/wp:divi\/text (\{.*\}) \/-->/);
      if (jsonMatch) {
        try {
          const parsed = JSON.parse(jsonMatch[1]);
          const val = parsed.content && parsed.content.innerContent && parsed.content.innerContent.desktop && parsed.content.innerContent.desktop.value;
          const type = typeof val;
          const len = type === 'string' ? val.length : 'N/A';
          console.log(`${type === 'string' ? 'OK' : 'PROBLEM'} | ${name} | text[${i}] | type:${type} | len:${len}`);
        } catch(e) {
          console.log(`ERROR | ${name} | text[${i}] | JSON parse: ${e.message.substring(0, 100)}`);
        }
      }
    }
  }
}
