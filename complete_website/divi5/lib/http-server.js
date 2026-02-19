/**
 * http-server.js — Shared temp HTTP server for complete_website/
 *
 * Used by screenshot-reference.js and computed-style-diff.js to serve
 * the HTML prototype locally for Puppeteer access.
 *
 * Port binding retries 3 times for EADDRINUSE resilience.
 */

const http = require('http');
const fs = require('fs');
const path = require('path');

const COMPLETE_WEBSITE_DIR = path.join(__dirname, '..', '..');

const MIME_TYPES = {
  '.html': 'text/html', '.css': 'text/css', '.js': 'application/javascript',
  '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg',
  '.gif': 'image/gif', '.woff2': 'font/woff2', '.woff': 'font/woff',
  '.ttf': 'font/ttf', '.json': 'application/json', '.ico': 'image/x-icon',
};

/**
 * Start a simple static file server for complete_website/.
 * Retries up to 3 times on EADDRINUSE.
 *
 * @param {string} [rootDir] — override root directory (default: complete_website/)
 * @returns {Promise<{ server: http.Server, port: number, close: Function }>}
 */
function startServer(rootDir) {
  const root = rootDir || COMPLETE_WEBSITE_DIR;

  const server = http.createServer((req, res) => {
    let urlPath = req.url.split('?')[0];
    if (urlPath === '/') urlPath = '/index.html';
    const filePath = path.join(root, urlPath);

    if (!fs.existsSync(filePath) || fs.statSync(filePath).isDirectory()) {
      const indexPath = path.join(filePath, 'index.html');
      if (fs.existsSync(indexPath)) {
        const content = fs.readFileSync(indexPath);
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(content);
        return;
      }
      res.writeHead(404);
      res.end('Not Found');
      return;
    }

    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';
    const content = fs.readFileSync(filePath);
    res.writeHead(200, { 'Content-Type': contentType });
    res.end(content);
  });

  let attempts = 0;
  const MAX_ATTEMPTS = 3;

  return new Promise((resolve, reject) => {
    function tryListen() {
      attempts++;
      server.listen(0, '127.0.0.1', () => {
        const port = server.address().port;
        resolve({
          server,
          port,
          close: () => new Promise(r => server.close(r)),
        });
      });

      server.once('error', (err) => {
        if (err.code === 'EADDRINUSE' && attempts < MAX_ATTEMPTS) {
          setTimeout(tryListen, 100);
        } else {
          reject(err);
        }
      });
    }

    tryListen();
  });
}

module.exports = { startServer, COMPLETE_WEBSITE_DIR };
