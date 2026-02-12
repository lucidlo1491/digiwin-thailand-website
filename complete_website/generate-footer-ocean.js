/**
 * Generate a static particle ocean PNG for the footer background.
 * Uses the same rendering algorithm as generate-vortex-canvas.html
 * with the "footer" preset: subtle, lower-third wave band.
 *
 * Usage: node generate-footer-ocean.js
 * Output: assets/footer-ocean.png (2800×600)
 */

const { createCanvas } = require('canvas');
const fs = require('fs');
const path = require('path');

const W = 2800, H = 600;
const PI2 = Math.PI * 2;

// Brand colors (RGB)
const BLUE = [0, 175, 240];   // #00AFF0 Smart Blue
const CYAN = [0, 230, 255];   // #00E6FF Cyan accent

// Footer preset — subtle, wave in lower third, very low opacity
const P = {
    bg: '#000864',
    centerY: 0.70,
    bandH: 0.50,
    amp: 55,
    phase: 1.2,
    sweep: 0.20,
    cols: 132,
    rows: 54,
    frontR: 3.2,
    backR: 0.8,
    frontA: 0.40,
    backA: 0.04,
    glow: 1.0
};

function lerp(a, b, t) { return a + (b - a) * t; }

function render() {
    const canvas = createCanvas(W, H);
    const ctx = canvas.getContext('2d');

    // Background — transparent so it layers on top of existing footer bg
    ctx.clearRect(0, 0, W, H);

    // Wave band
    const cols = P.cols, rows = P.rows, t = P.phase;
    const altRatio = 0.15;

    const bandCenter = H * P.centerY;
    const bandHalf = H * P.bandH * 0.5;
    const bandTop = bandCenter - bandHalf;
    const bandBot = bandCenter + bandHalf;

    const ground = bandBot + 20;
    const horizon = bandTop;
    const totalSpan = ground - horizon;

    let dotCount = 0;

    for (let row = rows - 1; row >= 0; row--) {
        const depth = row / (rows - 1);
        const mappedDepth = Math.pow(depth, 0.55);
        const baseY = ground - mappedDepth * totalSpan;

        const dotR = lerp(P.frontR, P.backR, depth);
        const dotA = lerp(P.frontA, P.backA, depth);
        const colSpacing = lerp(W / (cols - 4), W / (cols + 15), depth);
        const rowShift = depth * W * P.sweep;
        const waveScale = (1 - depth * 0.75);
        const amp1 = P.amp * waveScale;
        const amp2 = P.amp * 0.25 * waveScale;

        for (let col = 0; col < cols; col++) {
            const screenX = col * colSpacing - rowShift + colSpacing * 0.5;
            if (screenX < -30 || screenX > W + 30) continue;

            const worldX = col * 24, worldZ = row * 18;
            let wave = amp1 * Math.sin(worldX * 0.0055 + worldZ * 0.010 + t * 0.9);
            wave += amp2 * Math.sin(worldX * 0.011 - worldZ * 0.007 + t * 0.55 + 1.8);
            const screenY = baseY - wave;

            // Soft edge fade
            let edgeDist;
            if (screenY < bandTop) {
                edgeDist = (bandTop - screenY) / (bandHalf * 0.4);
            } else if (screenY > bandBot) {
                edgeDist = (screenY - bandBot) / (bandHalf * 0.4);
            } else {
                edgeDist = 0;
            }
            if (edgeDist > 1) continue;

            const edgeFade = 1 - edgeDist * edgeDist;
            const finalA = dotA * edgeFade;
            if (finalA < 0.005) continue;

            // Color selection (deterministic)
            const hash = (col * 7 + row * 13) % 100;
            const c = hash < (altRatio * 100) ? CYAN : BLUE;

            // Glow
            if (P.glow > 0 && dotR > 1.2 && finalA > 0.06) {
                ctx.beginPath();
                ctx.arc(screenX, screenY, dotR * P.glow, 0, PI2);
                ctx.fillStyle = `rgba(${c[0]},${c[1]},${c[2]},${(finalA * 0.05).toFixed(4)})`;
                ctx.fill();
            }

            // Core dot
            ctx.beginPath();
            ctx.arc(screenX, screenY, dotR, 0, PI2);
            ctx.fillStyle = `rgba(${c[0]},${c[1]},${c[2]},${finalA.toFixed(4)})`;
            ctx.fill();
            dotCount++;
        }
    }

    return { canvas, dotCount };
}

// Generate and save
const { canvas, dotCount } = render();
const outPath = path.join(__dirname, 'assets', 'footer-ocean.png');
const buffer = canvas.toBuffer('image/png');
fs.writeFileSync(outPath, buffer);

console.log(`✓ Generated ${outPath}`);
console.log(`  ${dotCount.toLocaleString()} dots · ${W}×${H} · ${(buffer.length / 1024).toFixed(0)} KB`);
