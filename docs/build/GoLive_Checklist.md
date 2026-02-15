# Go-Live Checklist: Local WordPress → digiwin.co.th

**Purpose:** Step-by-step guide for migrating the locally-built WordPress/Divi 5 site to the live digiwin.co.th server.

**Estimated time:** 2-4 hours (plus DNS propagation if applicable)

---

## Phase 0: Before You Touch Anything

### 0.1 Backup Everything
- [ ] **Local site:** Export a full backup of your local WordPress (database + files) — this is your safety net
- [ ] **Live site:** If digiwin.co.th already has content, take a full backup of the existing live site before making ANY changes
  - Use hosting panel's backup tool, or install All-in-One WP Migration on the live site and export
- [ ] **Screenshot the current live homepage** — you may need to reference or restore it

### 0.2 Inventory Check (Local Site)
- [ ] **Pages:** Confirm all pages are published (not draft) in WP Admin → Pages
- [ ] **Homepage assigned:** Settings → Reading → "A static page" → Homepage = your index page
- [ ] **Theme Builder:** Divi → Theme Builder → Verify Header and Footer templates are assigned globally
- [ ] **Menus:** Appearance → Menus → All navigation menus are built and assigned to correct locations
- [ ] **Permalinks:** Settings → Permalinks → Verify structure matches what you want on live (recommended: `/sample-page/` i.e., "Post name")
- [ ] **Forms:** Test the contact/demo form locally — does it submit without errors?
- [ ] **Custom code files exist:**
  - [ ] Child theme `style.css` (CSS custom properties + Code Module styles)
  - [ ] `digiwin-components.js` (nav, scroll animations, header scroll, mobile menu)
  - [ ] `digiwin-dynamic.js` (dynamic year calculation)
  - [ ] SVG assets (Super D, particle waves, section scenes)

### 0.3 Plugin Inventory
Document every plugin installed locally. You'll need the same ones on the live site:

| Plugin | Purpose | Required? |
|--------|---------|-----------|
| Divi 5 (theme) | Page builder | Yes — need active license |
| Safe SVG | Allow SVG uploads | Yes |
| (your form plugin) | Contact form handling | Yes |
| (any others) | ... | Check |

> **License check:** Confirm your Divi 5 license allows activation on the live domain. If it's currently activated on `localhost`, you may need to deactivate locally first, then activate on the live server.

---

## Phase 1: Prepare the Live Server

### 1.1 Hosting & Access
- [ ] **Hosting confirmed** for digiwin.co.th (provider name: _____________)
- [ ] **WordPress installed** on the live server (fresh install, or existing installation)
- [ ] **Admin credentials** — you can log in to `digiwin.co.th/wp-admin`
- [ ] **PHP version** ≥ 8.0 (Divi 5 requirement — check hosting panel)
- [ ] **MySQL/MariaDB** available and accessible
- [ ] **File access** — FTP/SFTP credentials OR hosting file manager available
- [ ] **Upload limit** ≥ 256MB (for migration file import — check with hosting or update `php.ini`)

### 1.2 SSL / HTTPS
- [ ] SSL certificate installed for digiwin.co.th
- [ ] Site loads on `https://digiwin.co.th` (not just `http://`)
- [ ] If SSL isn't set up yet, install it BEFORE migration (easier than fixing URLs after)

### 1.3 Install Required Plugins on Live Server
Before importing, install on the live site:
- [ ] **Divi 5 theme** — upload and activate, enter license key
- [ ] **All-in-One WP Migration** (free for imports up to ~512MB, or buy the Unlimited extension for larger sites)
- [ ] **Safe SVG** — activate before importing so SVGs in Media Library are preserved
- [ ] Any other plugins from your inventory (Phase 0.3)

---

## Phase 2: Migration

### Option A: Full Site Migration (Recommended)

This is the cleanest path. It moves everything — pages, media, settings, Divi templates, menus, forms — in one package.

#### Export (Local)
- [ ] Install **All-in-One WP Migration** on local site (if not already)
- [ ] Go to All-in-One WP Migration → Export
- [ ] Choose "File" as export method
- [ ] **Find & Replace** (CRITICAL): The plugin automatically replaces your local URL with the live URL during import. Verify it shows:
  - Find: `http://localhost:8888` (or whatever your local URL is)
  - Replace: `https://digiwin.co.th`
- [ ] Download the `.wpress` export file
- [ ] Note the file size — if > 512MB, you need the Unlimited Import extension on the live site

#### Import (Live)
- [ ] Go to `digiwin.co.th/wp-admin` → All-in-One WP Migration → Import
- [ ] Upload the `.wpress` file (drag & drop or browse)
- [ ] Wait for import to complete (do NOT close the browser tab)
- [ ] When prompted: **"This will overwrite your database, media, plugins, and themes"** → Proceed
- [ ] After import: you'll be logged out — log back in with your **local site's credentials** (the import overwrites the live database, so the live admin password is now your local admin password)

#### Post-Import (Live)
- [ ] Log in to `digiwin.co.th/wp-admin`
- [ ] Go to Settings → Permalinks → click "Save Changes" (flushes rewrite rules — don't skip this)
- [ ] Go to Divi → Theme Builder → verify Header/Footer templates are assigned
- [ ] Go to Settings → Reading → verify Homepage is assigned correctly
- [ ] Re-activate Divi license if prompted (may need to deactivate from local first)
- [ ] Re-activate any plugin licenses

### Option B: Divi Layout Export (If preserving existing live content)

Use this only if the live site has content you must keep. It's more manual work.

#### Export Divi Layouts (Local)
- [ ] For each page: Edit with Divi → click "..." → Save to Library → name it clearly (e.g., "DigiWin Home v1")
- [ ] Go to Divi → Divi Library → select all saved layouts → Portability → Export → download `.json`
- [ ] Go to Divi → Theme Builder → Portability → Export → download Theme Builder `.json`

#### Upload Assets First (Live)
- [ ] Upload ALL images to live site Media Library FIRST (WP Admin → Media → Add New)
- [ ] Upload SVGs (Safe SVG plugin must be active)
- [ ] Note: Image IDs will differ from local — you'll need to re-link images in pages

#### Import Divi Layouts (Live)
- [ ] Go to Divi → Divi Library → Portability → Import the layouts `.json`
- [ ] Create each page (Pages → Add New) → Load from Library → select the imported layout
- [ ] Go through each page and **re-link any broken images** from the Media Library
- [ ] Import Theme Builder templates → assign Header/Footer globally
- [ ] Build menus manually (Appearance → Menus)
- [ ] Set homepage (Settings → Reading)

> **This is significantly more work than Option A.** Only use if you have no choice.

---

## Phase 3: Post-Migration Verification

### 3.1 Critical Checks (Do These Immediately)
- [ ] **Homepage loads** at `https://digiwin.co.th`
- [ ] **All pages load** — click through every page in the navigation
- [ ] **Images display** — check hero images, logos, SVG backgrounds, case study photos
- [ ] **Navigation works** — desktop mega menu, mobile hamburger menu, all dropdown links
- [ ] **Footer renders** — address, links, JS-powered components
- [ ] **Contact form submits** — test with a real email address, verify you receive the submission
- [ ] **Internal links work** — click CTAs, cross-links between pages, breadcrumbs
- [ ] **HTTPS everywhere** — no mixed content warnings (padlock icon in browser)

### 3.2 Visual Spot-Check (5 minutes per page)
Quickly scan these pages — they have the most complex layouts:

| Page | What to check |
|------|---------------|
| Homepage | Hero split layout, client logo marquee, product cards, industry tabs, stats counters |
| ERP | Dashboard mockup, pain point cards, BOI callout, product comparison |
| MES | Before/after columns, 3-tier comparison, capability grid, operator workflow strip |
| WMS | Warehouse bin mockup, 6 station cards, process flow, before/after table |
| AIoT | Sensor dashboard mockup, data flow pipeline, protocol tags |
| About | Timeline horizontal scroll, Asia map SVG, stat counters |
| Case Studies | Filter functionality, results tables, logo display |
| Partner Program | Revenue calculator (if interactive), margin tables |

### 3.3 Technical Checks
- [ ] **Page speed:** Run a quick Lighthouse audit on the homepage (aim for 70+ performance)
- [ ] **Mobile responsive:** Test on a real phone or Chrome DevTools mobile view
- [ ] **404 page:** Visit `digiwin.co.th/nonexistent-page` — does it show a proper 404?
- [ ] **Favicon:** Does the DigiWin icon show in the browser tab?
- [ ] **Open Graph:** Share a page URL in a messaging app — does it show the correct title/image/description?
- [ ] **robots.txt:** Visit `digiwin.co.th/robots.txt` — make sure it's NOT blocking search engines (unless you want to soft-launch first)
- [ ] **XML sitemap:** Check if a sitemap exists at `digiwin.co.th/sitemap.xml` (Divi or an SEO plugin generates this)

### 3.4 SEO Essentials
- [ ] **Page titles** display correctly in browser tabs (check 5-6 key pages)
- [ ] **Meta descriptions** are set (View Page Source → look for `<meta name="description">`)
- [ ] **Canonical URLs** point to `https://digiwin.co.th/...` (not localhost)
- [ ] **Structured data** (JSON-LD) is present on key pages — test at [Google Rich Results Test](https://search.google.com/test/rich-results)
- [ ] **No index on staging** — if you had `noindex` during development, REMOVE it now

---

## Phase 4: DNS & Domain (If Changing Hosting)

Skip this if digiwin.co.th already points to the correct server.

### If You Need to Update DNS
- [ ] Get the new server's IP address from hosting provider
- [ ] Log in to domain registrar (whoever manages digiwin.co.th)
- [ ] Update A record to point to new server IP
- [ ] Update CNAME for `www` subdomain if applicable
- [ ] **TTL warning:** DNS changes can take 1-48 hours to propagate worldwide
- [ ] Use [whatsmydns.net](https://www.whatsmydns.net/) to check propagation status

### Minimize Downtime
- [ ] Set DNS TTL to 300 (5 minutes) at least 24 hours BEFORE the switch
- [ ] Do the migration on the new server first, THEN point DNS
- [ ] The old site stays live until DNS propagates to the new server

---

## Phase 5: Post-Launch Housekeeping

### Within 24 Hours
- [ ] **Remove migration plugin** — All-in-One WP Migration is a security risk if left installed. Deactivate and delete after successful migration.
- [ ] **Change admin password** on the live site (your local password is now on a live server)
- [ ] **Set up automated backups** — daily database, weekly full site (hosting panel or plugin like UpdraftPlus)
- [ ] **Install security plugin** — Wordfence or Sucuri (basic firewall + login protection)
- [ ] **Disable XML-RPC** if not needed (common attack vector)
- [ ] **Update WordPress, Divi, and all plugins** to latest versions

### Within 1 Week
- [ ] **Set up Google Analytics** (GA4) + Google Tag Manager
- [ ] **Submit sitemap** to Google Search Console (`digiwin.co.th/sitemap.xml`)
- [ ] **Submit sitemap** to Bing Webmaster Tools
- [ ] **Monitor uptime** — set up a free monitor (UptimeRobot, Better Uptime)
- [ ] **Test email delivery** — ensure form submissions arrive reliably (consider SMTP plugin like WP Mail SMTP if using shared hosting)
- [ ] **Performance baseline** — run full Lighthouse audit on top 5 pages, save scores

### Within 1 Month
- [ ] **Replace stock images** with custom photography (per original plan)
- [ ] **Monitor Search Console** for crawl errors, indexing issues
- [ ] **Check 404 errors** — are visitors hitting any broken URLs?
- [ ] **Begin Thai localization** planning (WPML + translator)

---

## Common Pitfalls & Fixes

### "Images are broken after migration"
**Cause:** URL replacement didn't catch all references (common with Divi's `et_pb_image` shortcodes or CSS background-image URLs).
**Fix:** Install **Better Search Replace** plugin → Find your local URL → Replace with live URL → run on `wp_posts` and `wp_postmeta` tables.

### "Styles look different on live site"
**Cause:** Browser cache showing old styles, or child theme CSS wasn't migrated.
**Fix:** Hard refresh (Ctrl+Shift+R), clear any server-side cache (hosting panel or caching plugin), verify child theme is active.

### "SVGs don't display"
**Cause:** Safe SVG plugin not active on live site, or server blocks SVG MIME type.
**Fix:** Activate Safe SVG, or add to `.htaccess`:
```
AddType image/svg+xml svg svgz
```

### "Contact form doesn't send emails"
**Cause:** Shared hosting often blocks PHP `mail()`. Very common.
**Fix:** Install **WP Mail SMTP** → configure with an SMTP provider (Gmail, SendGrid, Mailgun, or hosting's SMTP).

### "Can't log in after migration"
**Cause:** All-in-One WP Migration overwrites the database — the live admin credentials are now your LOCAL credentials.
**Fix:** Log in with your local site's username/password.

### "Permalinks show 404 on all pages except homepage"
**Cause:** Apache mod_rewrite not enabled, or `.htaccess` not writable.
**Fix:** Settings → Permalinks → Save Changes. If still broken, manually create `.htaccess` in WordPress root with standard WP rewrite rules, or contact hosting to enable mod_rewrite.

### "Mixed content warnings (HTTPS padlock broken)"
**Cause:** Some URLs in the database still use `http://` instead of `https://`.
**Fix:** Better Search Replace → Find `http://digiwin.co.th` → Replace with `https://digiwin.co.th` → run on all tables.

### "Divi Visual Builder won't load on live site"
**Cause:** Memory limit too low, or server timeout too short.
**Fix:** Increase PHP memory limit to 256MB and max execution time to 300 in `php.ini` or `.htaccess`:
```
php_value memory_limit 256M
php_value max_execution_time 300
```

---

## Quick Reference: Migration Day Timeline

| Time | Action |
|------|--------|
| T-1 day | Backup live site, lower DNS TTL if changing servers |
| T+0:00 | Export local site with All-in-One WP Migration |
| T+0:15 | Install plugins on live server (Divi, Safe SVG, Migration) |
| T+0:20 | Import `.wpress` file on live server |
| T+0:45 | Flush permalinks, verify homepage, check Divi Theme Builder |
| T+1:00 | Run through Phase 3 verification checklist |
| T+1:30 | Fix any broken images, mixed content, or form issues |
| T+2:00 | Remove migration plugin, change admin password, enable backups |
| T+2:30 | Point DNS if needed, announce internally |

---

*Last updated: Feb 14, 2026*
*For the DigiWin Thailand website migration (digiwin.co.th)*
