<?php
/**
 * Plugin Name: DigiWin Font Preload & CLS Fix
 * Description: Preloads Noto Sans + JetBrains Mono to eliminate CLS from font swap.
 *              Uses font-display:optional (invisible swap, no layout shift) and
 *              <link rel="preload"> to start font downloads immediately.
 * Version: 1.0
 * Author: DigiWin Thailand
 *
 * Installation:
 *   Upload this file to: wp-content/mu-plugins/digiwin-font-preload.php
 *   (via DirectAdmin File Manager)
 *   mu-plugins auto-activate — no activation step needed.
 *
 * What this fixes:
 *   CLS (Cumulative Layout Shift) caused by Noto Sans loading with display:swap.
 *   The browser first renders text in a fallback font, then reflows when the web
 *   font arrives — causing visible layout shift (0.3+ CLS score).
 *
 *   This plugin:
 *   1. Preloads the most critical font files (400 + 700 weight) via <link rel="preload">
 *   2. Injects @font-face with font-display:optional (no visible swap = no CLS)
 *   3. Adds size-adjust to the fallback font to minimize any remaining shift
 */

// Priority 1 (very early in <head>) — preload hints tell browser to fetch fonts ASAP
add_action('wp_head', function () {
    if (is_admin()) return;

    // Preload the most-used font weights (400 normal + 700 bold)
    // These are the Google Fonts CDN URLs for woff2 subsets
    echo '<!-- DigiWin Font Preload for CLS Fix -->' . "\n";

    // Noto Sans 400 (Latin subset — covers English content)
    echo '<link rel="preload" href="https://fonts.gstatic.com/s/notosans/v39/o-0mIpQlx3QUlC5A4PNB6Ryti20_6n1iPHjcz6L1SoM-jCpoiyD9A-9a6Vc.woff2" as="font" type="font/woff2" crossorigin>' . "\n";

    // Noto Sans 700 (Latin subset)
    echo '<link rel="preload" href="https://fonts.gstatic.com/s/notosans/v39/o-0mIpQlx3QUlC5A4PNB6Ryti20_6n1iPHjcz6L1SoM-jCpoiyAjBe9a6Vc.woff2" as="font" type="font/woff2" crossorigin>' . "\n";

    // JetBrains Mono 400 (used for labels/stats)
    echo '<link rel="preload" href="https://fonts.gstatic.com/s/jetbrainsmono/v21/tDbY2o-flEEny0FZhsfKu5WU4zr3E_BX0PnT8RD8yKxjPVmUsaaDhw.woff2" as="font" type="font/woff2" crossorigin>' . "\n";
}, 1);

// Priority 2 — inject @font-face override with font-display:optional
// This overrides Google Fonts' default display:swap with display:optional
// display:optional = if font isn't ready by first paint, use fallback for entire page load (no swap = no CLS)
add_action('wp_head', function () {
    if (is_admin()) return;

    echo '<style id="digiwin-font-cls-fix">' . "\n";

    // Override font-display for Noto Sans
    // The size-adjust and metrics help the fallback font match Noto Sans dimensions
    echo '@font-face {
  font-family: "Noto Sans";
  font-style: normal;
  font-weight: 400;
  font-display: optional;
  src: url(https://fonts.gstatic.com/s/notosans/v39/o-0mIpQlx3QUlC5A4PNB6Ryti20_6n1iPHjcz6L1SoM-jCpoiyD9A-9a6Vc.woff2) format("woff2");
  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
}' . "\n";

    echo '@font-face {
  font-family: "Noto Sans";
  font-style: normal;
  font-weight: 700;
  font-display: optional;
  src: url(https://fonts.gstatic.com/s/notosans/v39/o-0mIpQlx3QUlC5A4PNB6Ryti20_6n1iPHjcz6L1SoM-jCpoiyAjBe9a6Vc.woff2) format("woff2");
  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
}' . "\n";

    // Noto Sans Thai (for Thai pages)
    echo '@font-face {
  font-family: "Noto Sans Thai";
  font-style: normal;
  font-weight: 400;
  font-display: optional;
  src: url(https://fonts.gstatic.com/s/notosansthai/v25/iJWnBXeUZi_OHPqn4wq6hQ2_hbJ1xt2a9lUx.woff2) format("woff2");
}' . "\n";

    echo '@font-face {
  font-family: "Noto Sans Thai";
  font-style: normal;
  font-weight: 700;
  font-display: optional;
  src: url(https://fonts.gstatic.com/s/notosansthai/v25/iJWnBXeUZi_OHPqn4wq6hQ2_hbJ1xt2a9lUx.woff2) format("woff2");
}' . "\n";

    echo '@font-face {
  font-family: "JetBrains Mono";
  font-style: normal;
  font-weight: 400;
  font-display: optional;
  src: url(https://fonts.gstatic.com/s/jetbrainsmono/v21/tDbY2o-flEEny0FZhsfKu5WU4zr3E_BX0PnT8RD8yKxjPVmUsaaDhw.woff2) format("woff2");
  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
}' . "\n";

    echo '</style>' . "\n";
}, 2);

// Priority 3 — add fallback font metrics to reduce shift if font-display:optional
// falls back (font didn't load in time)
add_action('wp_head', function () {
    if (is_admin()) return;

    // Adjusted fallback: match system font metrics to Noto Sans as closely as possible
    // This CSS ensures that even if Noto Sans doesn't load, the fallback is sized similarly
    echo '<style id="digiwin-font-fallback-metrics">' . "\n";
    echo '@font-face {
  font-family: "Noto Sans Fallback";
  src: local("Arial"), local("Helvetica Neue"), local("Helvetica");
  size-adjust: 100.5%;
  ascent-override: 105%;
  descent-override: 27%;
  line-gap-override: 0%;
}' . "\n";
    echo '</style>' . "\n";
}, 3);
