#!/usr/bin/env node
/**
 * clear-divi-cache.js — Upload a self-destructing mu-plugin that clears Divi's et-cache
 * Uses DirectAdmin's CMD_API_FILE_MANAGER: create + save
 */
const https = require('https');
const config = require('./da-push.local.js');
const auth = Buffer.from(config.daUser + ':' + config.daPass).toString('base64');

const fs = require('fs');
const path = require('path');

// Try multiple known directories
const TARGETS = [
  { dir: '/domains/digiwin.co.th/public_html/wp-content/mu-plugins', name: 'digiwin-cache-flush.php' },
  { dir: '/domains/digiwin.co.th/public_html', name: 'cache-flush-temp.php' },
];
const dirPath = TARGETS[0].dir;
const fileName = TARGETS[0].name;
const filePath = dirPath + '/' + fileName;

// Read PHP from file to avoid JS template literal corrupting $variables
const phpCode = fs.readFileSync(
  path.join(__dirname, 'phpmyadmin-export', 'digiwin-cache-flush.php'),
  'utf8'
);

function daPost(path, body) {
  return new Promise((resolve, reject) => {
    const req = https.request({
      hostname: config.daHost, port: config.daPort,
      path, method: 'POST',
      rejectUnauthorized: false,
      headers: {
        'Authorization': 'Basic ' + auth,
        'Content-Type': 'application/x-www-form-urlencoded',
        'Content-Length': Buffer.byteLength(body),
      },
    }, res => {
      let d = '';
      res.on('data', c => d += c);
      res.on('end', () => resolve({ status: res.statusCode, body: d }));
    });
    req.on('error', reject);
    req.write(body);
    req.end();
  });
}

async function main() {
  const parentDir = '/domains/digiwin.co.th/public_html/wp-content';

  // Step 1: Ensure mu-plugins directory exists
  console.log('Step 1: Creating mu-plugins directory (if needed)...');
  const mkdirBody = 'action=folder&path=' + encodeURIComponent(parentDir) + '&name=mu-plugins';
  const mkdirRes = await daPost('/CMD_API_FILE_MANAGER', mkdirBody);
  console.log('  mkdir:', mkdirRes.status, decodeURIComponent(mkdirRes.body).substring(0, 200));

  // Step 2: Create the file
  console.log('\nStep 2: Creating', fileName, '...');
  const createBody = 'action=create&path=' + encodeURIComponent(dirPath) + '&name=' + encodeURIComponent(fileName);
  const createRes = await daPost('/CMD_API_FILE_MANAGER', createBody);
  console.log('  Create:', createRes.status, decodeURIComponent(createRes.body).substring(0, 200));

  // Step 3: Save PHP content
  console.log('\nStep 3: Saving content...');
  const saveBody = 'action=save&path=' + encodeURIComponent(filePath) + '&text=' + encodeURIComponent(phpCode);
  const saveRes = await daPost('/CMD_API_FILE_MANAGER', saveBody);
  console.log('  Save:', saveRes.status, decodeURIComponent(saveRes.body).substring(0, 200));

  if (saveRes.status === 200) {
    console.log('\n✓ mu-plugin uploaded. Visit digiwin.co.th to trigger cache flush.');
  } else {
    console.log('\n✗ Upload failed. May need to upload via DirectAdmin File Manager UI.');
  }

  console.log('\nPHP content preview (verifying $variables):');
  console.log(phpCode.substring(0, 200));
}

main().catch(err => console.error('Error:', err.message));
