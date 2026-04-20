#!/usr/bin/env node
/**
 * fix-favicon.js — Upload transparent Super D PNG and set as site icon
 */
const https = require('https');
const fs = require('fs');

function req(options, body) {
  return new Promise((resolve, reject) => {
    const r = https.request(options, res => {
      let data = '';
      res.on('data', c => data += c);
      res.on('end', () => resolve({ status: res.statusCode, headers: res.headers, data }));
    });
    r.on('error', reject);
    if (body) r.write(body);
    r.end();
  });
}

(async () => {
  // Login
  const loginBody = 'log=admin&pwd=digiwin2026&wp-submit=Log+In&redirect_to=%2Fwp-admin%2F&testcookie=1';
  const loginRes = await req({
    hostname: 'digiwin.co.th', path: '/wp-login.php', method: 'POST', rejectUnauthorized: false,
    headers: { 'Content-Type': 'application/x-www-form-urlencoded', 'Content-Length': Buffer.byteLength(loginBody), 'Cookie': 'wordpress_test_cookie=WP%20Cookie%20check' },
  }, loginBody);

  if (loginRes.status !== 302) { console.log('Login failed:', loginRes.status); return; }
  let cookies = (loginRes.headers['set-cookie'] || []).map(c => c.split(';')[0]).join('; ');
  console.log('Logged in');

  // Get upload nonce from media-new.php
  const mediaPage = await req({
    hostname: 'digiwin.co.th', path: '/wp-admin/media-new.php', method: 'GET', rejectUnauthorized: false,
    headers: { 'Cookie': cookies },
  });
  if (mediaPage.headers['set-cookie']) {
    cookies += '; ' + mediaPage.headers['set-cookie'].map(c => c.split(';')[0]).join('; ');
  }

  const nonceMatch = mediaPage.data.match(/"_wpnonce"\s*:\s*"([^"]+)"/);
  if (!nonceMatch) {
    // Try alternate nonce patterns
    const alt = mediaPage.data.match(/name="_wpnonce"\s+value="([^"]+)"/);
    if (!alt) { console.log('No upload nonce found'); return; }
  }

  // Get nonce for async-upload
  const asyncNonceMatch = mediaPage.data.match(/_wpnonce['"]\s*:\s*['"]([\da-f]+)['"]/);
  const formNonce = mediaPage.data.match(/name="_wpnonce"\s+value="([^"]+)"/);
  const nonce = asyncNonceMatch ? asyncNonceMatch[1] : (formNonce ? formNonce[1] : null);
  if (!nonce) { console.log('No nonce found'); return; }
  console.log('Upload nonce:', nonce);

  // Upload the transparent PNG via async-upload.php
  const pngData = fs.readFileSync('/tmp/super-d-favicon-transparent.png');
  const boundary = '----WKForm' + Date.now();
  const parts = [
    `--${boundary}\r\nContent-Disposition: form-data; name="name"\r\n\r\ndigiwin-super-d-transparent.png`,
    `--${boundary}\r\nContent-Disposition: form-data; name="action"\r\n\r\nupload-attachment`,
    `--${boundary}\r\nContent-Disposition: form-data; name="_wpnonce"\r\n\r\n${nonce}`,
  ];
  const fileHeader = `--${boundary}\r\nContent-Disposition: form-data; name="async-upload"; filename="digiwin-super-d-transparent.png"\r\nContent-Type: image/png\r\n\r\n`;
  const footer = `\r\n--${boundary}--\r\n`;
  const bodyParts = Buffer.concat([
    Buffer.from(parts.join('\r\n') + '\r\n'),
    Buffer.from(fileHeader),
    pngData,
    Buffer.from(footer),
  ]);

  console.log('Uploading transparent PNG (' + pngData.length + ' bytes)...');
  const uploadRes = await req({
    hostname: 'digiwin.co.th', path: '/wp-admin/async-upload.php', method: 'POST', rejectUnauthorized: false,
    headers: { 'Cookie': cookies, 'Content-Type': 'multipart/form-data; boundary=' + boundary, 'Content-Length': bodyParts.length },
  }, bodyParts);

  console.log('Upload status:', uploadRes.status);

  let mediaId = null;
  try {
    const resp = JSON.parse(uploadRes.data);
    if (resp.success && resp.data && resp.data.id) {
      mediaId = resp.data.id;
      console.log('Media uploaded, ID:', mediaId);
      console.log('URL:', resp.data.url);
    } else {
      console.log('Upload response:', uploadRes.data.substring(0, 300));
    }
  } catch (e) {
    // Might be plain text with attachment ID
    const idMatch = uploadRes.data.match(/"id"\s*:\s*(\d+)/);
    if (idMatch) {
      mediaId = parseInt(idMatch[1]);
      console.log('Media ID from response:', mediaId);
    } else {
      console.log('Response:', uploadRes.data.substring(0, 300));
    }
  }

  if (!mediaId) {
    console.log('Failed to get media ID');
    return;
  }

  // Now use the Customizer API to set this as site_icon
  // WordPress site_icon needs cropped versions. Use the site-icon crop AJAX action.
  console.log('Setting as site icon via AJAX...');

  // First, crop the icon (WP requires this step)
  const cropPayload = JSON.stringify({
    action: 'crop-image',
    _ajax_nonce: nonce,
    id: mediaId,
    context: 'site-icon',
    cropDetails: { x1: 0, y1: 0, width: 512, height: 512, dst_width: 512, dst_height: 512 },
  });

  // Use form-encoded for admin-ajax
  const cropForm = `action=crop-image&_ajax_nonce=${nonce}&id=${mediaId}&context=site-icon&cropDetails%5Bx1%5D=0&cropDetails%5By1%5D=0&cropDetails%5Bwidth%5D=512&cropDetails%5Bheight%5D=512&cropDetails%5Bdst_width%5D=512&cropDetails%5Bdst_height%5D=512`;

  const cropRes = await req({
    hostname: 'digiwin.co.th', path: '/wp-admin/admin-ajax.php', method: 'POST', rejectUnauthorized: false,
    headers: { 'Cookie': cookies, 'Content-Type': 'application/x-www-form-urlencoded', 'Content-Length': Buffer.byteLength(cropForm) },
  }, cropForm);

  console.log('Crop status:', cropRes.status);
  let croppedId = mediaId;
  try {
    const cropData = JSON.parse(cropRes.data);
    if (cropData.success && cropData.data) {
      croppedId = cropData.data.id || cropData.data.attachment_id || mediaId;
      console.log('Cropped attachment ID:', croppedId);
    } else {
      console.log('Crop response:', cropRes.data.substring(0, 300));
    }
  } catch (e) {
    console.log('Crop response:', cropRes.data.substring(0, 200));
  }

  // Set site_icon option via SQL push
  console.log('Setting site_icon to', croppedId, 'via SQL...');

  // Write SQL file
  fs.writeFileSync('/tmp/set-site-icon.sql', `UPDATE wp_options SET option_value = '${croppedId}' WHERE option_name = 'site_icon';\n`);

  // Push via da-push.js
  const { execSync } = require('child_process');
  try {
    const result = execSync('node da-push.js --file /tmp/set-site-icon.sql', { cwd: __dirname, timeout: 30000 });
    console.log(result.toString().trim());
  } catch (e) {
    console.log('SQL push output:', e.stdout ? e.stdout.toString() : e.message);
  }

  // Verify
  console.log('\nVerifying...');
  await new Promise(r => setTimeout(r, 2000));
  const verifyRes = await req({ hostname: 'digiwin.co.th', path: '/', method: 'GET', rejectUnauthorized: false, headers: {} });
  const iconTags = verifyRes.data.match(/<link[^>]*rel=["'](?:icon|apple-touch-icon)["'][^>]*>/gi);
  if (iconTags) {
    console.log('Favicon tags:');
    iconTags.forEach(t => console.log(' ', t));
  }
})().catch(console.error);
