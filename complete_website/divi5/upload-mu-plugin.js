#!/usr/bin/env node
/**
 * upload-mu-plugin.js — Upload a PHP file to wp-content/mu-plugins/ via DirectAdmin
 *
 * Usage: node upload-mu-plugin.js <filename>
 *   e.g. node upload-mu-plugin.js digiwin-favicon.php
 */

const https = require('https');
const fs = require('fs');
const path = require('path');

const config = require('./da-push.local.js');
const fileName = process.argv[2] || 'digiwin-favicon.php';
const filePath = path.join(__dirname, 'phpmyadmin-export', fileName);

if (!fs.existsSync(filePath)) {
  console.error(`File not found: ${filePath}`);
  process.exit(1);
}

const fileContent = fs.readFileSync(filePath);
const auth = Buffer.from(config.daUser + ':' + config.daPass).toString('base64');
const boundary = '----DABoundary' + Date.now();

const remotePath = '/domains/digiwin.co.th/public_html/wp-content/mu-plugins';

// Build multipart body
const header = [
  `--${boundary}\r\nContent-Disposition: form-data; name="action"\r\n\r\nupload`,
  `--${boundary}\r\nContent-Disposition: form-data; name="path"\r\n\r\n${remotePath}`,
  `--${boundary}\r\nContent-Disposition: form-data; name="file1"; filename="${fileName}"\r\nContent-Type: application/octet-stream\r\n\r\n`,
].join('\r\n');
const footer = `\r\n--${boundary}--\r\n`;

const body = Buffer.concat([
  Buffer.from(header + '\r\n'),
  fileContent,
  Buffer.from(footer),
]);

console.log(`Uploading ${fileName} (${fileContent.length} bytes) to ${remotePath}/`);

const req = https.request({
  hostname: config.daHost,
  port: config.daPort,
  path: '/CMD_FILE_MANAGER',
  method: 'POST',
  rejectUnauthorized: false,
  headers: {
    'Authorization': 'Basic ' + auth,
    'Content-Type': 'multipart/form-data; boundary=' + boundary,
    'Content-Length': body.length,
  },
}, (res) => {
  let data = '';
  res.on('data', c => data += c);
  res.on('end', () => {
    console.log('Status:', res.statusCode);
    if (res.statusCode === 200 && !data.toLowerCase().includes('error')) {
      console.log('Upload appears successful.');
    } else {
      console.log('Response:', data.substring(0, 800));
    }
  });
});

req.on('error', (e) => {
  console.error('Request failed:', e.message);
  process.exit(1);
});

req.write(body);
req.end();
