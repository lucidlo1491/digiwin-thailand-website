#!/usr/bin/env node
const fs = require('fs');
const https = require('https');

let API_KEY = process.env.RESPIRA_API_KEY;
if (!API_KEY) {
  const path = require('path');
  const envPath = path.join(__dirname, '..', '.env');
  try {
    const envContent = fs.readFileSync(envPath, 'utf8');
    const match = envContent.match(/RESPIRA_API_KEY=(.+)/);
    if (match) API_KEY = match[1].trim();
  } catch (e) {
    console.error('No .env file found at', envPath);
  }
}

const url = 'https://digiwin-thailand.local/wp-json/respira/v1/pages/100684';
const req = https.request(url, {
  method: 'GET',
  headers: { 'Authorization': 'Bearer ' + API_KEY },
  rejectUnauthorized: false
}, (res) => {
  let body = '';
  res.on('data', chunk => body += chunk);
  res.on('end', () => {
    const data = JSON.parse(body);
    const c = typeof data.content === 'string' ? data.content : (data.content?.raw || data.content?.rendered || '');
    if (!c) {
      console.log('No content found. Full response:');
      console.log(JSON.stringify(data).slice(0, 1000));
      return;
    }
    console.log('Content length:', c.length);

    // === BASE64 APPROACH CHECKS ===
    console.log('\n=== V28 BASE64 SURVIVAL CHECK ===');

    const b64Checks = {
      '<script': (c.match(/<script/g) || []).length,
      'atob(or u8(': (c.match(/(?:atob|u8)\(/g) || []).length,
      'factorySVG': (c.match(/factorySVG/g) || []).length,
      'partnerSVG': (c.match(/partnerSVG/g) || []).length,
      'innerHTML': (c.match(/innerHTML/g) || []).length,
      'dw-factory-svg': (c.match(/dw-factory-svg/g) || []).length,
      'dw-partner-svg': (c.match(/dw-partner-svg/g) || []).length,
      'IntersectionObserver': (c.match(/IntersectionObserver/g) || []).length,
      'data-freeze': (c.match(/data-freeze/g) || []).length,
      'hero-svg-illustration': (c.match(/hero-svg-illustration/g) || []).length,
      'prefers-reduced-motion': (c.match(/prefers-reduced-motion/g) || []).length,
    };

    let allPassed = true;
    Object.entries(b64Checks).forEach(([key, count]) => {
      const passed = count > 0;
      if (!passed) allPassed = false;
      console.log('  ' + key + ': ' + count + (passed ? ' ✓' : ' ✗ MISSING'));
    });

    // === EXTRACT AND DECODE BASE64 ===
    console.log('\n=== BASE64 STRING EXTRACTION ===');

    // Look for atob('...') or u8('...') patterns (u8 = UTF-8 safe Base64 decode)
    const atobMatches = c.match(/(?:atob|u8)\('([^']+)'\)/g) || [];
    console.log('  atob/u8() calls found:', atobMatches.length);

    if (atobMatches.length >= 2) {
      atobMatches.forEach((match, i) => {
        const b64 = match.replace(/(?:atob|u8)\('/, '').replace(/'\)/, '');
        console.log('  B64 string #' + i + ': length=' + b64.length);

        // Try to decode
        try {
          const decoded = Buffer.from(b64, 'base64').toString('utf8');
          console.log('  Decoded length:', decoded.length);

          // Check decoded SVG content
          const decodedChecks = {
            '<svg': (decoded.match(/<svg/g) || []).length,
            '<animate': (decoded.match(/<animate[^T]/g) || []).length,
            '<animateTransform': (decoded.match(/<animateTransform/g) || []).length,
            '<animateMotion': (decoded.match(/<animateMotion/g) || []).length,
            '<g transform': (decoded.match(/<g transform/g) || []).length,
            'translate(': (decoded.match(/translate\(/g) || []).length,
            '<filter': (decoded.match(/<filter/g) || []).length,
            'preserveAspectRatio': (decoded.match(/preserveAspectRatio/g) || []).length,
            'opacity': (decoded.match(/opacity/g) || []).length,
            'additive="sum"': (decoded.match(/additive="sum"/g) || []).length,
            'stop-color': (decoded.match(/stop-color/g) || []).length,
            'fill="freeze"': (decoded.match(/fill="freeze"/g) || []).length,
            'begin="indefinite"': (decoded.match(/begin="indefinite"/g) || []).length,
          };

          console.log('  --- Decoded SVG content ---');
          let decodedPass = true;
          Object.entries(decodedChecks).forEach(([key, count]) => {
            const passed = count > 0;
            if (!passed && key !== 'fill="freeze"' && key !== 'begin="indefinite"' && key !== 'additive="sum"' && key !== '<animateMotion') {
              decodedPass = false;
            }
            console.log('    ' + key + ': ' + count + (passed ? ' ✓' : ' (0)'));
          });

          // K1a: UTF-8 mojibake check — Latin-1 interpretations of multi-byte UTF-8
          const mojibakePattern = /[\xC0-\xFF][\x80-\xBF]/g;
          const mojibakeMatches = decoded.match(mojibakePattern) || [];
          if (mojibakeMatches.length > 0) {
            decodedPass = false;
            console.log('  ✗ K1a MOJIBAKE DETECTED: ' + mojibakeMatches.length + ' broken UTF-8 sequences');
            console.log('    Examples: ' + JSON.stringify(mojibakeMatches.slice(0, 5)));
            console.log('    Fix: Use u8() wrapper instead of raw atob() for Base64 decode');
          } else {
            console.log('  ✓ K1a: No UTF-8 mojibake detected');
          }

          if (decodedPass) {
            console.log('  ✓ BASE64 #' + i + ' DECODED SUCCESSFULLY — ALL CHECKS PASS');
          } else {
            console.log('  ✗ BASE64 #' + i + ' — ISSUES FOUND IN DECODED SVG');
          }

          // Show first 200 chars of decoded
          console.log('  Preview:', decoded.substring(0, 200));

        } catch (e) {
          console.log('  ✗ DECODE FAILED:', e.message);
        }
      });
    } else if (atobMatches.length === 0) {
      console.log('  ✗ NO atob() CALLS FOUND — Base64 approach may have been stripped');

      // Fallback: check if var factorySVG= exists but without atob
      const hasVar = c.indexOf('var factorySVG=') >= 0;
      console.log('  var factorySVG= present:', hasVar);
      if (hasVar) {
        const idx = c.indexOf('var factorySVG=');
        console.log('  Context:', JSON.stringify(c.substring(idx, idx + 100)));
      }
    }

    // === OVERALL VERDICT ===
    console.log('\n=== VERDICT ===');
    if (allPassed && atobMatches.length >= 2) {
      console.log('✓ BASE64 APPROACH WORKS — SVGs encoded, JS injection intact');
    } else if (atobMatches.length >= 2) {
      console.log('⚠ BASE64 strings survived but some JS references missing');
    } else {
      console.log('✗ BASE64 APPROACH FAILED — need different strategy');
    }
  });
});
req.on('error', e => console.error('Error:', e.message));
req.end();
