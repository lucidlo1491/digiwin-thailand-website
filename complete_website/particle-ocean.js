/**
 * DigiWin 数据洋流 (Data Ocean Current)
 *
 * Recreates the brand kit's signature visual: a 3D dot-grid surface
 * with dramatic rolling wave crests, viewed from a low angle.
 * Reference: DigiWin 2025 Annual Report cover, brand kit pp.61-68.
 *
 * Usage:
 *   <section data-particles>              — subtle on light bg (default)
 *   <section data-particles="bold">       — vivid on dark navy bg
 *   <section data-particles="medium">     — moderate visibility
 *
 * WordPress: wp_enqueue_script or Code Module. Self-initializing.
 */

(function () {
    'use strict';

    var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var PI2 = Math.PI * 2;

    // ── Brand colors (RGB) ──────────────────────────────────────────
    var BLUE = [0, 175, 240];   // #00AFF0 Smart Blue
    var CYAN = [0, 230, 255];   // #00E6FF Cyan accent

    // ── Presets ─────────────────────────────────────────────────────
    var PRESETS = {
        light: {
            frontOpacity: 0.18,   // visible but not distracting on white/light backgrounds
            backOpacity: 0.03,
            frontRadius: 3.5,
            backRadius: 0.5,
            color: BLUE,
            colorAlt: CYAN,
            altRatio: 0.10
        },
        subtle: {
            frontOpacity: 0.30,   // foreground dot opacity
            backOpacity: 0.04,    // distant dot opacity
            frontRadius: 4.5,     // foreground dot size (px)
            backRadius: 0.6,      // distant dot size (px)
            color: BLUE,
            colorAlt: CYAN,
            altRatio: 0.12
        },
        medium: {
            frontOpacity: 0.45,
            backOpacity: 0.06,
            frontRadius: 5.0,
            backRadius: 0.8,
            color: BLUE,
            colorAlt: CYAN,
            altRatio: 0.18
        },
        bold: {
            frontOpacity: 0.60,
            backOpacity: 0.10,
            frontRadius: 5.5,
            backRadius: 1.0,
            color: CYAN,
            colorAlt: BLUE,
            altRatio: 0.25
        }
    };

    // ── Utility ─────────────────────────────────────────────────────
    function lerp(a, b, t) { return a + (b - a) * t; }

    // ── DataOcean class ─────────────────────────────────────────────
    function DataOcean(el) {
        this.el = el;
        this.canvas = null;
        this.ctx = null;
        this.w = 0;
        this.h = 0;
        this.dpr = Math.min(window.devicePixelRatio || 1, 2);
        this.visible = false;
        this.raf = null;
        this.time = 0;
        this.resizeTimer = null;
        this.colors = null; // pre-assigned per grid point

        this.opts = this._parseOpts();
        this._setup();
        this._buildColors();
        this._observe();

        if (!reducedMotion) {
            this._loop();
        } else {
            this.visible = true;
            this._draw(0);
        }
    }

    DataOcean.prototype._parseOpts = function () {
        var name = this.el.getAttribute('data-particles') || 'subtle';
        if (name === '' || name === 'true') name = 'subtle';
        return PRESETS[name] || PRESETS.subtle;
    };

    DataOcean.prototype._setup = function () {
        var c = document.createElement('canvas');
        c.setAttribute('aria-hidden', 'true');
        c.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;pointer-events:none;z-index:0;';
        var pos = getComputedStyle(this.el).position;
        if (pos === 'static') this.el.style.position = 'relative';
        this.el.style.overflow = 'hidden';
        this.el.insertBefore(c, this.el.firstChild);
        this.canvas = c;
        this.ctx = c.getContext('2d');
        this._resize();

        var self = this;
        window.addEventListener('resize', function () {
            clearTimeout(self.resizeTimer);
            self.resizeTimer = setTimeout(function () {
                self._resize();
                self._buildColors();
            }, 200);
        });
    };

    DataOcean.prototype._resize = function () {
        var r = this.el.getBoundingClientRect();
        this.w = r.width;
        this.h = r.height;
        this.canvas.width = this.w * this.dpr;
        this.canvas.height = this.h * this.dpr;
        this.ctx.setTransform(this.dpr, 0, 0, this.dpr, 0, 0);
    };

    // Grid: ~55 cols × ~35 rows. Pre-assign a color to each dot.
    DataOcean.prototype._buildColors = function () {
        var cols = Math.min(65, Math.ceil(this.w / 22) + 4);
        var rows = 35;
        this._cols = cols;
        this._rows = rows;
        var n = cols * rows;
        this.colors = new Array(n);
        var alt = this.opts.altRatio;
        for (var i = 0; i < n; i++) {
            this.colors[i] = Math.random() < alt ? this.opts.colorAlt : this.opts.color;
        }
    };

    DataOcean.prototype._observe = function () {
        var self = this;
        if ('IntersectionObserver' in window) {
            this._obs = new IntersectionObserver(function (e) {
                self.visible = e[0].isIntersecting;
            }, { rootMargin: '150px 0px' });
            this._obs.observe(this.el);
        } else {
            this.visible = true;
        }
    };

    DataOcean.prototype._loop = function () {
        var self = this;
        var last = 0;
        (function tick(ts) {
            self.raf = requestAnimationFrame(tick);
            if (!self.visible) return;
            if (ts - last < 30) return; // ~30 fps
            last = ts;
            self.time += 0.006;
            self._draw(self.time);
        })(0);
    };

    /**
     * ── Core renderer ───────────────────────────────────────────────
     *
     * Approach: Think of a flat grid of dots on a table, viewed from a
     * low angle. The table surface undulates with large rolling waves.
     *
     * "depth" goes from 0 (nearest / bottom of screen) to 1 (farthest /
     * top area). Everything scales with depth:
     *   - dot size shrinks
     *   - dot opacity fades
     *   - vertical row spacing compresses (perspective foreshortening)
     *   - horizontal dot spacing tightens
     *   - wave amplitude diminishes
     *
     * The wave function creates 2-3 visible rolling crests that sweep
     * diagonally across the surface — matching the annual report cover.
     */
    DataOcean.prototype._draw = function (t) {
        var ctx = this.ctx;
        var w = this.w;
        var h = this.h;
        var opts = this.opts;
        var cols = this._cols;
        var rows = this._rows;

        ctx.clearRect(0, 0, w, h);

        // ── Perspective layout ──────────────────────────────────────
        //
        // The wave occupies the bottom ~55% of the section.
        // "horizon" is where distant rows converge (top of wave area).
        // "ground" is the bottom edge of the section.

        var ground = h + 10;               // bottom edge (+ small overflow)
        var horizon = h * 0.35;            // where distant dots vanish toward
        var totalSpan = ground - horizon;   // vertical pixel range for the wave

        var idx = 0;

        // Draw back-to-front for correct visual layering
        for (var row = rows - 1; row >= 0; row--) {

            // ── Depth (0 = near/bottom, 1 = far/top) ───────────────
            var depth = row / (rows - 1);

            // Non-linear depth mapping: compress more toward horizon
            // This creates the "accelerating compression" of perspective
            var mappedDepth = Math.pow(depth, 0.55);

            // Screen Y baseline for this row (no wave yet)
            var baseY = ground - mappedDepth * totalSpan;

            // ── Per-row properties (lerp by depth) ──────────────────
            var dotR = lerp(opts.frontRadius, opts.backRadius, depth);
            var dotA = lerp(opts.frontOpacity, opts.backOpacity, depth);
            var colSpacing = lerp(w / (cols - 4), w / (cols + 15), depth);

            // Slight horizontal offset per row (creates diagonal sweep)
            var rowShift = depth * w * 0.12;

            // ── Wave: two layers for organic rolling feel ───────────
            //
            // Primary wave: large rolling crests (creates the signature look)
            // Secondary wave: smaller ripple for naturalism
            //
            // Wave amplitude is BIG near foreground and diminishes with depth.
            // This is what makes the crests dramatically visible.

            var waveScale = (1 - depth * 0.75); // waves diminish into distance
            var amp1 = 70 * waveScale;           // primary crest amplitude (px)
            var amp2 = 25 * waveScale;           // secondary ripple

            for (var col = 0; col < cols; col++) {
                // Screen X
                var screenX = col * colSpacing - rowShift + colSpacing * 0.5;

                // Wrap X for seamless edge handling
                if (screenX < -30 || screenX > w + 30) { idx++; continue; }

                // ── Wave displacement ───────────────────────────────
                //
                // The primary wave sweeps diagonally (uses both col and row).
                // freq values tuned so ~2 full crests are visible across width.

                var worldX = col * 24; // stable world-space coordinate for wave
                var worldZ = row * 18;

                var wave = amp1 * Math.sin(
                    worldX * 0.0065 + worldZ * 0.012 + t * 0.9
                );
                wave += amp2 * Math.sin(
                    worldX * 0.013 - worldZ * 0.008 + t * 0.55 + 1.8
                );

                var screenY = baseY - wave;

                // Skip if outside visible area
                if (screenY < -15 || screenY > h + 15) { idx++; continue; }

                // ── Draw dot ────────────────────────────────────────
                var c = this.colors[idx % this.colors.length];
                ctx.beginPath();
                ctx.arc(screenX, screenY, dotR, 0, PI2);
                ctx.fillStyle = 'rgba(' + c[0] + ',' + c[1] + ',' + c[2] + ',' + dotA + ')';
                ctx.fill();

                idx++;
            }
        }
    };

    DataOcean.prototype.destroy = function () {
        if (this.raf) cancelAnimationFrame(this.raf);
        if (this._obs) this._obs.disconnect();
        if (this.canvas && this.canvas.parentNode) {
            this.canvas.parentNode.removeChild(this.canvas);
        }
    };

    // ── Auto-init ───────────────────────────────────────────────────
    function init() {
        var els = document.querySelectorAll('[data-particles]');
        var inst = [];
        for (var i = 0; i < els.length; i++) inst.push(new DataOcean(els[i]));

        window.DigiWinParticleOcean = {
            instances: inst,
            DataOcean: DataOcean,
            refresh: function () {
                for (var j = 0; j < inst.length; j++) inst[j].destroy();
                inst = [];
                var els2 = document.querySelectorAll('[data-particles]');
                for (var k = 0; k < els2.length; k++) inst.push(new DataOcean(els2[k]));
                this.instances = inst;
            }
        };
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
