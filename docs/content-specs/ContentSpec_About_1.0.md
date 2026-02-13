# Content Spec: About Us (5.2)

**Batch:** 2
**PRD Reference:** Section 5.2
**Playbook Reference:** Section 7.6 (Due Diligence Page), Section 4 (Objection Handling)
**Status:** v1.3 — Official site stats integrated: R&D 1,600+, Common Wealth market share, employee 5,500+, 43 branches
**Last Updated:** February 13, 2026

---

## Page Overview

**Audience:** Both — factory operators AND distributor prospects (due diligence page)
**Objective:** Build complete trust through depth. Visitors doing due diligence (distributor owners evaluating us, factory CFOs checking vendor stability, procurement teams verifying credentials) will read this page end-to-end. Depth is intentional.
**URL:** digiwin.co.th/about
**Emotional Arc:** Authority → Authenticity → Local Proof → Action

---

## Section 1: Hero – Company Identity

**Purpose:** Immediate brand authority. Match the depth signal — this is not a splash page, it's a credibility document.

| Element | Specification |
|---------|---------------|
| **Layout** | 2-column grid: left text (55%), right stats grid (45%) |
| **Background** | Dark gradient (#1a2e40 → #000864 → #2d4a5e) with grain texture overlay |
| **Padding** | 140px top, 100px bottom |

### Left Panel (Content)

| Element | Content |
|---------|---------|
| **Headline** | `<span class="dw-years">44</span> Years of Manufacturing Intelligence` |
| **Subhead** | From a Taiwanese startup in 1982 to the trusted ERP partner for 50,000+ manufacturers across Asia. We have survived every economic cycle—from the Asian Financial Crisis to Covid-19—without abandoning our manufacturing focus. |
| **CTA** | Explore Our Story (scroll anchor to #mission) |
| **CTA Style** | Blue text link with bounce-down arrow animation |

### Right Panel (Stats Grid)

| Stat | Value | Label |
|------|-------|-------|
| 1 | 1982 | Founded in Taiwan |
| 2 | 50K+ | Manufacturing Clients |
| 3 | 1,600+ | R&D Engineers |
| 4 | 300378 | Shenzhen Stock Exchange |

**Design:** 2x2 grid of frosted glass cards (rgba white bg, 1px white border, 16px radius)

---

## Section 2: Our Mission – "We Power Manufacturing's Digital Future"

**Purpose:** Company purpose statement. Format as narrative prose — NOT bullet points. This is the soul of the page.

| Element | Specification |
|---------|---------------|
| **Layout** | 2-column grid: left text (55%), right visual (45%) |
| **Background** | White (#FFFFFF) |
| **Padding** | 100px top/bottom |
| **ID** | `#mission` (scroll anchor target) |

### Left Panel (Mission Text)

| Element | Content |
|---------|---------|
| **Headline** | We Power Manufacturing's `<span style="color:#00AFF0">Digital Future</span>` |
| **Paragraph 1** | DigiWin exists to help manufacturers see clearly, act decisively, and grow confidently. For over four decades, we've been singularly focused on one thing: making factory operations visible, predictable, and profitable. |
| **Paragraph 2** | We don't serve banks, retailers, or hospitals. We serve the shop floor—the engineers tracking BOMs, the planners scheduling production runs, the operators monitoring OEE in real time. This focus isn't a marketing position. It's our DNA. |
| **Paragraph 3** | Every line of code we write, every consultant we train, every implementation we deliver is designed for one outcome: helping manufacturers compete and win. |
| **Paragraph 4** | Today, we're transforming from a software vendor into an AI infrastructure provider. With 1,600+ R&D engineers and 1,800+ consultants, we've deployed 168 AI Agents and rebuilt 68 operational SOPs with intelligent automation. DigiWin is pioneering the Zhuge Platform — where AI doesn't just report on your factory, it helps run it. |

### Etymology Block

| Element | Content |
|---------|---------|
| **Chinese** | 鼎新 (Noto Sans SC, 32px, bold) |
| **Pinyin** | Dǐng Xīn (JetBrains Mono, 14px) |
| **Meaning** | "To innovate, to renew" — This is the meaning behind our name. Founded by Sun Ai-bin and Gu Feng-yong in 1982, this philosophy has driven us for over four decades. |
| **Style** | Blue-left-border card, light blue gradient background |

### Right Panel (Visual)

| Element | Specification |
|---------|---------------|
| **Image** | Placeholder: dark rounded card with concentric circle SVG |
| **Future** | Replace with DigiWin team/HQ photo when available |

---

## Section 3: Timeline – Stability Through Decades

**Purpose:** Visual history that builds trust through longevity. Every crisis survived signals permanence. The horizontal rail metaphor evokes a production line — on-brand for manufacturing.

| Element | Specification |
|---------|---------------|
| **Layout** | **Horizontal Scroll Rail** — a single horizontal line (the "rail") runs left-to-right across the section. Year-dot markers sit on the line. Milestone cards alternate above and below the rail (odd above, even below), creating a compact zigzag rhythm. Container uses `overflow-x: auto` with `scroll-snap-type: x mandatory`. Gradient fade masks at left/right edges hint at scrollability. |
| **Background** | Dark gradient (#000864 → #1a2e40) with grain texture |
| **Padding** | 80px top/bottom |
| **Rail Line** | 2px horizontal line at vertical center, blue gradient (`rgba(55,152,228,0.15)` → `0.4` → `0.15`) |

| Element | Content |
|---------|---------|
| **Label** | STABILITY THROUGH DECADES (JetBrains Mono, green #4ade80) |
| **Headline** | `<span class="dw-years">44</span> Years of Manufacturing Focus` |
| **Subhead** | Every crisis survived. Every technology wave embraced. One focus: manufacturing. |

### Timeline Milestones (12 milestones, alternating above/below rail)

| # | Year | Title | Description | Badge | Position |
|---|------|-------|-------------|-------|----------|
| 1 | 1982 | Founded | DigiWin founded in Taiwan by Sun Ai-bin & Gu Feng-yong | Origin (gold) | Above |
| 2 | 1989 | First Product | First MRPII manufacturing software released | — | Below |
| 3 | 1992 | First Award | Taiwan Information Month Outstanding Software Package | — | Above |
| 4 | 1995 | TIPTOP ERP | Asia's first Browser/Server architecture ERP | — | Below |
| 5 | 2001 | Taiwan IPO | Listed on Taiwan Stock Exchange | TSEC (blue) | Above |
| 6 | 2006 | China #1 | #1 Manufacturing ERP vendor in China | — | Below |
| 7 | 2014 | Shenzhen IPO | Listed on Shenzhen Stock Exchange (300378.SZ) | 300378 (blue) | Above |
| 8 | 2017 | Thailand | ASEAN expansion accelerates from Bangkok | ASEAN (red) | Below |
| 9 | 2020 | Foxconn Invests | CNY 560M strategic investment from Foxconn FII | — | Above |
| 10 | 2022 | Red Dot Award | German Red Dot Design Award for Athena Platform | — | Below |
| 11 | 2024 | #1 PLM + MES | IDC #1 in discrete manufacturing, Indonesia entry | — | Above |
| 12 | 2026 | AI Era | SUPA AI framework, smart manufacturing intelligence | Now (green) | Below |

### Milestone Card Style

| Property | Value |
|----------|-------|
| **Background** | `rgba(255,255,255,0.04)`, border `rgba(255,255,255,0.08)` |
| **Border radius** | 12px |
| **Padding** | 16px 20px |
| **Width** | 200px (fixed, for scroll consistency) |
| **Year** | JetBrains Mono, 14px, #00AFF0 |
| **Title** | Noto Sans 600, 14px, white 0.95 |
| **Description** | 12px, white 0.55 |
| **Hover** | border-color → `rgba(55,152,228,0.3)`, translateY(-2px) |

### Year Dot Style

| Property | Value |
|----------|-------|
| **Size** | 14px diameter |
| **Background** | #000864 with 3px border #00AFF0 |
| **Connector** | 24px vertical line from dot to card |
| **Active glow (2014, 2026)** | Background #00AFF0, box-shadow 6px glow |

### Scroll Container

| Property | Value |
|----------|-------|
| **Overflow** | `overflow-x: auto`, hidden scrollbar (`-webkit-scrollbar: none`) |
| **Scroll snap** | `scroll-snap-type: x mandatory`, each milestone `scroll-snap-align: center` |
| **Fade masks** | Pseudo-elements on `.timeline-scroll-container` — 60px linear-gradient from `#000864` → transparent at left and right edges |
| **Rail padding** | `140px 60px` (vertical space for above/below cards, horizontal padding for edge milestones) |
| **Gap** | 48px between milestones |

### Responsive Behavior

| Breakpoint | Behavior |
|------------|----------|
| ≥1024px | Full horizontal scroll rail, all 12 milestones in a single scrollable row |
| ≤768px | Switch to **vertical compact timeline**: single vertical line on left, all cards on right side. Year dot on the line, card beside it. No horizontal scroll. |
| ≤480px | Same vertical layout, cards go full width |

### Animation

| Element | Animation | Timing |
|---------|-----------|--------|
| Milestone cards | Fade-in + slide-up, staggered | 0.4s ease, 0.07s stagger |
| Year dots | Scale-in on scroll | 0.3s ease |
| Rail line | Gradient reveal left-to-right | 0.6s ease on first scroll into view |

---

## Section 4: Stats Banner – By the Numbers

**Purpose:** Hard credibility metrics. Most visually impactful element — large numbers, dark background, counter animation on scroll.

| Element | Specification |
|---------|---------------|
| **Layout** | 5-column grid (3-column at 1024px, 2-column at 640px) |
| **Background** | Dark gradient (#000864 → #1a2e40) with grain texture |
| **Padding** | 80px top/bottom |
| **Animation** | Counter animation on scroll (numbers count up from 0) |

### Statistics

| # | Value | Label | Style |
|---|-------|-------|-------|
| 1 | 44+ | Years in Manufacturing ERP | Blue (#00AFF0) |
| 2 | 50K+ | Manufacturing Clients Worldwide | Blue (#00AFF0) |
| 3 | 100+ | Thai Implementations | Blue (#00AFF0) |
| 4 | 50+ | Team Members in Thailand | Blue (#00AFF0) |
| 5 | 300378 | Shenzhen Stock Exchange Listed | White (#FFFFFF) |

**Critical:** Stats 3 and 4 are Thai-specific numbers that address the "Will they understand the Thai market?" objection. Do not replace with Taiwan-only stats.

### Market Leadership Callout (NEW v1.3 — Common Wealth Magazine Stats)

**Purpose:** Third-party market validation from Taiwan's leading business magazine. These stats prove dominance, not just presence.

| Element | Specification |
|---------|---------------|
| **Layout** | 3-column stat cards inline with Section 4 OR as a sub-section below stats banner |
| **Background** | Same dark gradient as stats banner |
| **Source line** | `Source: Common Wealth Magazine, 2023` (JetBrains Mono, 11px, white 0.4) |

| # | Value | Label | Context |
|---|-------|-------|---------|
| 1 | `80%` | Top 2,000 Manufacturers Use DigiWin | Taiwan's largest manufacturers trust us |
| 2 | `54%` | Manufacturing Solutions Market Share | More than half the market |
| 3 | `77%` | IPO Companies Choose DigiWin | 2,349 IPO companies surveyed, 84% among manufacturing subset |

**Attribution:** Common Wealth (天下雜誌) is Taiwan's equivalent of Fortune/Bloomberg Businessweek. These numbers are Taiwan-specific — present with `"In Taiwan's manufacturing sector"` qualifier to avoid implying global/Thailand figures.

**Design:** Each stat card has a small Common Wealth logo placeholder or magazine icon. Numbers in 48px Noto Sans 700, #00AFF0. Labels in 14px Noto Sans 400, white 0.7.

---

## Section 5: What We Believe – Core Philosophy

**Purpose:** Cultural identity. Bold statements that differentiate from generic ERP vendors.

| Element | Specification |
|---------|---------------|
| **Layout** | 2x2 grid of cards (1-column on mobile) |
| **Background** | White (#FFFFFF) |
| **Padding** | 100px top/bottom |

| Element | Content |
|---------|---------|
| **Label** | OUR PHILOSOPHY (JetBrains Mono, green) |
| **Headline** | What We Believe |

### Belief Cards

| # | Title | Copy |
|---|-------|------|
| 01 | "Manufacturing Is Not Generic" | We don't sell to banks, retailers, or hospitals. We are manufacturing-only because the factory floor demands it. BOMs, routings, work orders, OEE—these aren't features we added; they're why we exist. |
| 02 | "Grow Together, Not Apart" | Our product suite—iGP → T100 → MES → WMS → AIoT—means your ERP partner doesn't change as your business scales. Your investment compounds, never resets. From 20-person workshop to multi-site enterprise group. |
| 03 | "Local Roots, Global Standards" | Our Thailand team speaks Thai, understands Thai business culture, and is backed by 44 years of global manufacturing expertise. We're not a remote vendor sending consultants from overseas—we're here. |
| 04 | "Data Should Liberate, Not Complicate" | We turn factory chaos—shadow Excel, ghost inventory, disconnected systems—into clear, actionable intelligence. Your production manager shouldn't need 3 spreadsheets to answer a simple question. |

**Card Style:** Light gradient bg, 1px border, 20px radius, 40px padding. Hover: blue border + shadow lift.

---

## Section 6: Because of DigiWin, You Can...

**Purpose:** Pivot from company story to visitor benefit. Outcome-focused, not feature-focused.

| Element | Specification |
|---------|---------------|
| **Layout** | 2-column: left tall visual (40%), right benefit list (60%) |
| **Background** | Light gray gradient (#f8fafc → #fff) |
| **Padding** | 100px top/bottom |

| Element | Content |
|---------|---------|
| **Headline** | Because of DigiWin, `<span style="color:#00AFF0">You Can...</span>` |

### Benefit Items

| # | Icon | Headline | Description |
|---|------|----------|-------------|
| 1 | Clock | See Your Factory in Real Time | MES and AIoT give you live production data, not yesterday's spreadsheet. Know what's happening now, not what happened last shift. |
| 2 | Dollar | Control Costs Before They Control You | Material tracking, scrap reduction, yield optimization across every production run. See waste before it becomes loss. |
| 3 | Arrow | Ship On Time, Every Time | Production scheduling and WMS working together to meet customer delivery promises. No more expediting chaos. |
| 4 | Box | Scale Without Starting Over | One ecosystem from workshop to enterprise group. Add MES when you're ready, add WMS when you need it. Your foundation stays solid. |
| 5 | Shield | Pass BOI Audits with Confidence | Production-order-level material reconciliation that matches exactly what the BOI board audits. One client saved 10M+ THB/year in supplementary taxes. Thai Revenue Department certified, with full traceability and audit trails built into every process. |
| 6 | Book | Make Decisions with Confidence | BI dashboards and analytics that turn raw data into strategic clarity. See the patterns, not just the numbers. |

**Item Style:** Blue rounded icon (48px) + bold headline + 1-2 line description. Items separated by 1px border-bottom.

---

## Section 7: Thailand Commitment – Our Local Story

**Purpose:** Directly address the key objection: "Will a Taiwanese company understand the Thai market?" This section must feel authentic, not corporate.
**Playbook reference:** Objection 4 ("My team can't learn a new system") and Objection 5 ("They won't understand the Thai market")

| Element | Specification |
|---------|---------------|
| **Layout** | Header + 2-column: left proof content (55%), right contact card (45%) |
| **Background** | White (#FFFFFF) |
| **Padding** | 100px top/bottom |

| Element | Content |
|---------|---------|
| **Label** | PROVEN IN YOUR NEIGHBORHOOD (JetBrains Mono, green) |
| **Headline** | Thailand Commitment |
| **Subhead** | Real support, no translation needed. You are not the "guinea pig." |

### Left Panel – Proof Content

#### Proof Grid (2x2)

| Stat | Label |
|------|-------|
| 100+ | Customers & Partners in Thailand |
| 50+ | Thai Team Members |
| 60%+ | Bilingual (Thai + Chinese) |
| Since 2017 | Serving Thai Manufacturers |

#### Evolution Narrative (NEW — addresses the "understand Thai market" objection)

> DigiWin entered Thailand in 2017, initially serving Taiwanese and Chinese manufacturers who had set up operations here. As demand grew, we formally registered our Thai company in 2019 and built a local team from the ground up—hiring Thai consultants, learning Thai business culture, and building relationships with Thai factory owners. Today, we serve the Thai local market directly with 50+ team members. We're not a remote vendor sending consultants from overseas. We're your neighbor.

#### Named Thai References

Active production environments running on our systems today:
- GoldenSea Sanki
- Top Mould
- Accauto
- Unique New Energy
- Intensive Mould

#### Thai Compliance Ready

- Thai Revenue Department certified
- Withholding Tax logic built-in
- e-Tax integration ready
- BOI reporting support

### Right Panel – Contact Card

| Element | Content |
|---------|---------|
| **Heading** | Thailand Office |
| **Location** | Bangna Complex Office Tower, 22nd Floor, Bangkok |
| **Position** | EEC Gateway (Eastern Economic Corridor) |
| **Email** | info@digiwin.co.th |
| **CTA** | Get in Touch → (links to demo.html) |

---

**Section Ordering Note:** Sections 7 (Thailand) and 8 (Regional Presence) must appear in this order — Thailand FIRST, then Regional Presence. This is validated by checklist item "Thailand section comes BEFORE Global Presence section."

---

## Section 8: Regional Presence – Across Asia-Pacific

**Purpose:** Scale proof through geography. Shows DigiWin is not a small company.

| Element | Specification |
|---------|---------------|
| **Layout** | Header + SVG Map + Region Cards Grid + ASEAN Timeline |
| **Background** | Light gray gradient (#f8fafc → #fff) |
| **Padding** | 100px top/bottom |

| Element | Content |
|---------|---------|
| **Label** | ACROSS ASIA-PACIFIC (JetBrains Mono, green) |
| **Headline** | Regional Presence |
| **Subhead** | Dual headquarters in Taiwan and Shanghai, with 43 offices across China and ASEAN. |

### SVG Map
- **Aspect ratio:** ~4:3 landscape (wider than tall)
- **Labels:** English city names (Beijing, Shanghai, Shenzhen, Taipei, Bangkok, etc.) — not Chinese characters
- **viewBox:** Adjusted to fit China + Southeast Asia in landscape orientation
- **Max width:** 900px, centered
- China outline with city markers (Beijing, Shanghai HQ, Shenzhen, etc.)
- Taiwan outline with Taipei HQ marker
- Thailand highlighted in red with animated Bangkok marker ("You Are Here")
- Vietnam, Malaysia marked
- Legend: HQ (blue), Thailand (red), Branch (white)

### Region Cards (2x2 grid)
1. **China** — HQ + 33+ branches, Shanghai HQ, expandable city list
2. **Taiwan** — HQ + 5 branches, Taipei HQ
3. **Thailand** — Featured (red border), Bangkok, "You Are Here" badge
4. **ASEAN** — Vietnam (2008), Malaysia (2013), Indonesia (2024)

### ASEAN Expansion Timeline
Horizontal: 2008 Vietnam → 2013 Malaysia → 2019 Thailand (highlighted) → 2024 Indonesia

### Presence Stats
| Stat | Label |
|------|-------|
| 33+ | China Branches |
| 6 | Taiwan Branches |
| 5,500+ | Employees Worldwide |
| 4 | ASEAN Countries |

**Source:** Official About Us page (Feb 2026). Employee count confirmed at 5,500+ (not the outdated 4,000+ from homepage). Branch total = 43 (33 China + 6 Taiwan + 4 ASEAN).

---

## Section 9: Leadership

**Status:** Skipped for v1. Pending leadership photos and bios from Peter.

---

## Section 10: Awards & Recognition

**Purpose:** Third-party validation. Industry analysts and certification bodies confirm what customers already know.

| Element | Specification |
|---------|---------------|
| **Layout** | Header + 4x2 award card grid + certifications bar |
| **Background** | Light gray gradient (#f8fafc → #fff) |
| **Padding** | 100px top/bottom |

| Element | Content |
|---------|---------|
| **Label** | THIRD-PARTY VALIDATION (JetBrains Mono, green) |
| **Headline** | Awards & Recognition |
| **Subhead** | Industry analysts and certification bodies validate what our customers already know. |

### Award Cards (8)

| Year | Award | Description | Icon Style |
|------|-------|-------------|------------|
| 2022 | German Red Dot Design Award | Digiwin Athena Platform recognized for innovative industrial software design | Gold |
| 2024-2025 | #1 PLM + MES Market Share | IDC rankings: 32% market share in discrete manufacturing for 3 consecutive years | Blue |
| 2010 | CMMI Level 4 | Quantitatively managed software processes—rare credential for ERP vendors | Blue |
| 1996–2025 | ISO 9001 & 27001 | Continuous quality and information security certification for 29 years | Blue |
| 2013 | National Industry Innovation Award | Taiwan Ministry of Economic Affairs recognition for industry contribution | Gold |
| 2024 | Industrial Internet Excellent Solution | PLM category recognition for smart manufacturing innovation | Blue |
| 1992 | Taiwan's First ERP Software Award | Information Month Outstanding Software Package—our first industry recognition | Blue |
| 2020 | Foxconn Strategic Investment | CNY 560M from world's largest electronics manufacturer validates our technology | Blue |

### Certifications Bar

Dark bar (#000864 → #1a2e40), centered flex layout:
- ISO 27001 — Information Security
- ISO 9001 — Quality Management
- CMMI L4 — Process Maturity
- Thai RD — Revenue Dept. Certified
- 300378.SZ — Shenzhen Listed

---

## Section 11: Final CTA – Let's Talk

**Purpose:** Convert visitors who've read this far. Dual CTAs for both audiences.

| Element | Specification |
|---------|---------------|
| **Layout** | Centered text + dual buttons + contact info |
| **Background** | Blue gradient (#00AFF0 → #2d7bc4 → #1e5a8a) with grain texture |
| **Padding** | 100px top/bottom |

| Element | Content |
|---------|---------|
| **Headline** | Ready to Work with a Team That Understands Manufacturing? |
| **Subhead** | See how `<span class="dw-years">44</span>` years of manufacturing expertise—backed by Foxconn FII—can help you compete on the global stage. |
| **Primary CTA** | Let's Talk (white bg, blue text — links to demo.html) |
| **Secondary CTA** | Become a Partner (ghost button, white border — links to partner-program.html) |

### Contact Info Row

| Icon | Content |
|------|---------|
| Map Pin | Bangna Complex Office Tower, 22nd Floor, Bangkok |
| Email | info@digiwin.co.th |

---

## Animation Specifications

| Element | Animation | Timing |
|---------|-----------|--------|
| Hero stat cards | Fade-in + slide-up, staggered | 0.4s ease, 0.07s stagger |
| Timeline milestones | Fade-in + slide-up, staggered on horizontal rail | 0.4s ease, 0.07s stagger |
| Stats banner numbers | Counter animation (0 → target) | 1.5s ease-out on scroll |
| Belief cards | Fade-in + slide-up, staggered | 0.4s ease, 0.07s stagger |
| Outcome items | Fade-in + slide-up, staggered | 0.4s ease, 0.07s stagger |
| Region blocks | Fade-in + slide-up, staggered | 0.4s ease, 0.07s stagger |
| Award cards | Fade-in + slide-up, staggered | 0.4s ease, 0.07s stagger |

**Implementation:** IntersectionObserver with `threshold: 0.15`. Each selector group resets its stagger index (do not accumulate across sections — learned from homepage fix).

---

## Validation Checklist

- [ ] All 5 stats in banner are Thai-audience-relevant (includes 100+ Thai, 50+ Thai team)
- [ ] Thailand section comes BEFORE Global Presence section
- [ ] Thailand section includes team composition (50+, 60%+ bilingual) and evolution narrative
- [ ] CTA says "Let's Talk" not "Request a Demo"
- [ ] Partner link goes to partner-program.html (not partner.html)
- [ ] Footer social links use SVG icons (not text placeholders)
- [ ] Copyright year uses dynamic `dw-current-year` span
- [ ] Counter animation triggers on scroll for stats banner
- [ ] Stagger animations on all card groups
- [ ] All `dw-years` elements update via digiwin-dynamic.js
- [ ] Mobile responsive at 1024px, 768px, 640px breakpoints
- [ ] No links to pages that don't exist

---

## Open Questions for Peter

1. ~~**Thailand establishment year:**~~ RESOLVED — Entered Thailand 2017, registered company 2019. Both dates now reflected.
2. ~~**Team size:**~~ CONFIRMED — 50+ team members is accurate.
3. ~~**Thai implementations count:**~~ CONFIRMED — 100+ is correct.
4. **Leadership section:** No photos/bios from Peter. Researching online for public info.
5. **Office/team photo:** Not available at this time. Using placeholder visuals.
6. **[NEW v1.3] Common Wealth stats qualifier:** Stats are Taiwan-specific (80% top 2000, 54% market share, 77% IPO). Presented with "In Taiwan's manufacturing sector" qualifier. Peter to confirm this framing is acceptable for Thai audience.

---

## Change Log

**v1.3 (Feb 13, 2026) — Official site intelligence integrated:**
- Hero stats: R&D Engineers updated from 1,300+ → 1,600+ (official About Us page)
- Mission paragraph 4: Added team scale (1,600+ R&D, 1,800+ consultants)
- NEW: Market Leadership Callout section — Common Wealth Magazine 2023 stats (80%, 54%, 77%) with Taiwan qualifier and attribution
- Regional Presence: Subhead updated to "43 offices" (was "40+"), branch total sourced, employee count confirmed at 5,500+
- Presence Stats: Source attribution added

**v1.2 (Feb 9, 2026):** Horizontal scroll rail timeline, English map labels, BOI outcomes, section ordering.
**v1.1 (Feb 8, 2026):** Initial intelligence pass.
