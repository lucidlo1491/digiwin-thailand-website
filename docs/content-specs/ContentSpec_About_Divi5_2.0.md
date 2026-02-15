# Content Spec: About Page — Divi 5 Build (2.0)

**Batch:** 2 (Company Pages)
**PRD Reference:** Section 4, Page 5.0
**Playbook Reference:** Section 2 (Track A Emotional Arc — Empathetic to Confident)
**Status:** v2.0 — Reverse-engineered from HTML build + mapped to Divi 5 modules
**Last Updated:** February 14, 2026
**Platform:** WordPress + Divi 5

---

## Page Overview

| Element | Specification |
|---------|---------------|
| **Audience** | Both — factory operators (Track A) AND distributor prospects (Track B) |
| **Objective** | Establish credibility through heritage, scale, and local commitment |
| **URL** | digiwin.co.th/about |
| **Emotional Arc** | Heritage → Scale → Local Proof → Trust → Action |
| **Page Structure** | 10 sections, ~2800 lines in static build |
| **Key Facts** | 1982 founded, 5,500+ employees, 1,600+ R&D engineers, 1,800+ consultants, 43 offices, 168 AI agents, Common Wealth Magazine stats (80%/54%/77%), Shenzhen listed 2014 |

---

## Divi 5 Capabilities Leveraged

| Divi 5 Feature | Where Used | Why |
|----------------|-----------|-----|
| **CSS Grid Layout** | Hero split, stats banner, beliefs grid, awards grid, region grid | Native 2-col and multi-col grids without custom CSS |
| **Group Module** | Hero stat cards, belief cards, why cards, award cards, milestone cards | Card-style containers with shared background, border, hover effects |
| **Number Counter** | Stats banner (44+, 50K+, 100+, 50+), hero stats, market leadership | Animated count-up on scroll for numeric values |
| **Design Variables** | Colors, fonts, spacing | Define brand colors once; reference everywhere |
| **Interactions System** | Card hovers, scroll reveals, timeline hover | Built-in scroll-triggered animations and hover transforms replace custom JS |
| **Group Carousel** | Timeline horizontal scroll | Native scrollable container for milestone cards |
| **Code Module** | Asia SVG map, grain textures, Super D backgrounds | Complex SVG map requires Code Module |
| **Customizable Breakpoints** | All sections | 7 breakpoints replace manual media queries |
| **Semantic Elements** | Every section | `<section>`, `<article>` tags for SEO and accessibility |
| **Image Module** | Mission photo, outcomes photo | Responsive images with lazy loading |

---

## Design Variables (Global — Set Once in Divi 5)

Inherits all global Design Variables defined in the Homepage spec (ContentSpec_Home_Divi5_2.0.md). Key variables used on this page:

### Colors
| Variable Name | Value | Usage on This Page |
|--------------|-------|-------|
| `--dw-primary-blue` | #00AFF0 | CTA buttons, stat numbers, accent borders |
| `--dw-dark-navy` | #000864 | Hero bg, dark sections, headings on light bg |
| `--dw-navy-deep` | #000432 | Hero gradient end, timeline bg |
| `--dw-navy-mid` | #001080 | Hero gradient mid |
| `--dw-royal` | #003CC8 | CTA gradient secondary |
| `--dw-light-gray` | #F5F7FA | Alternating section backgrounds |
| `--dw-text-dark` | #333333 | Body text |
| `--dw-text-light` | #64748b / #5b6b80 | Secondary text, descriptions |
| `--dw-white` | #FFFFFF | Card backgrounds |
| `--dw-gold` | #F59E0B | Thailand highlight accent, milestone badges |

### Additional Variables for About Page
| Variable Name | Value | Usage |
|--------------|-------|-------|
| `--dw-green-label` | #15803d | Section label text on dark backgrounds |
| `--dw-sky-blue` | #0369a1 | Stat numbers (alt blue), timeline years |

---

## Section 1: Hero — Split Grid

**Purpose:** Establish DigiWin's heritage and scale immediately. 44 years, 50K+ clients, publicly listed — this is not a startup.

### Divi 5 Implementation

| Element | Divi 5 Module | Configuration |
|---------|--------------|---------------|
| **Container** | Section | Background: linear-gradient(135deg, #000432 0%, #000864 50%, #001080 100%), padding: 140px 24px 100px, position: relative, overflow: hidden |
| **Grain Overlay** | Code Module | SVG dot-pattern noise at opacity 0.03, pointer-events: none, positioned absolute inset 0 |
| **Super D** | Code Module | `.dw-d-bg--left .dw-d-bg--gradient .dw-d-parallax` at opacity 0.16 |
| **Content Row** | Row with CSS Grid | `grid-template-columns: 1fr 1fr`, gap: 80px, max-width: 1200px, align-items: center |

### Left Column: Content

| Element | Divi 5 Module | Content |
|---------|--------------|---------|
| **Headline** | Text Module (H1) | `44 Years of Manufacturing Intelligence` — "44" uses `.dw-years` dynamic class in #00AFF0. Noto Sans 700, clamp(36px, 5vw, 52px), white, line-height 1.15 |
| **Subtitle** | Text Module | `From a Taiwanese startup in 1982 to the trusted ERP partner for 50,000+ manufacturers across Asia. We have survived every economic cycle—from the Asian Financial Crisis to Covid-19—without abandoning our manufacturing focus.` — 18px, rgba(255,255,255,0.85), line-height 1.7 |
| **Scroll CTA** | Button Module or Text Module with link | `Explore Our Story` + animated down-arrow SVG → scrolls to #mission. Color: #00AFF0, font-weight 600, 15px. Arrow animation: bounce-down 2s infinite |

### Right Column: Stat Cards (2x2 Grid)

| Element | Divi 5 Module | Configuration |
|---------|--------------|---------------|
| **Stats Grid** | Group Module with CSS Grid | `grid-template-columns: repeat(2, 1fr)`, gap: 24px |
| **Each Stat** | Group Module (nested) | Background: rgba(255,255,255,0.05), border: 1px solid rgba(255,255,255,0.1), border-radius: 16px, padding: 32px, text-align: center |

#### Stat Cards

| Stat | Value | Label | Module |
|------|-------|-------|--------|
| 1 | `1982` | Founded in Taiwan | Text Module (not Number Counter — it's a year, not quantity) |
| 2 | `50K+` | Manufacturing Clients | Number Counter (animate to 50,000) |
| 3 | `1,600+` | R&D Engineers | Number Counter (animate to 1,600) |
| 4 | `300378` | Shenzhen Stock Exchange | Text Module (stock code, no animation) |

Value styling: Noto Sans 700, 48px, #00AFF0, line-height 1. Label styling: 14px, rgba(255,255,255,0.75).

### Responsive Breakpoints

| Breakpoint | Behavior |
|-----------|----------|
| Desktop (>1024px) | 2-column grid side by side |
| Tablet (<=1024px) | Stack to 1 column, stats grid max-width: 400px centered |
| Mobile (<=640px) | Padding: 120px 20px 80px, headline font-size: 28px, stats: 1-column |

---

## Section 2: Mission — "We Power Manufacturing's Digital Future"

**Purpose:** Articulate DigiWin's singular focus on manufacturing. Name-origin story builds cultural connection.

### Divi 5 Implementation

| Element | Divi 5 Module | Configuration |
|---------|--------------|---------------|
| **Container** | Section | Background: #fff, padding: 100px 24px, id: "mission" |
| **Super D** | Code Module | `.dw-d-bg--center` at opacity 0.06 |
| **Content Row** | Row with CSS Grid | `grid-template-columns: 1.2fr 1fr`, gap: 80px, max-width: 1100px, align-items: center |

### Left Column: Content

| Element | Divi 5 Module | Content |
|---------|--------------|---------|
| **Headline** | Text Module (H2) | `We Power Manufacturing's Digital Future` — "Digital Future" in #0369a1. Noto Sans 700, 36px, #000864, line-height 1.2 |
| **Para 1** | Text Module | `DigiWin exists to help manufacturers see clearly, act decisively, and grow confidently...` — 17px, #475569, line-height 1.8 |
| **Para 2** | Text Module | `We don't serve banks, retailers, or hospitals. We serve the shop floor...` |
| **Para 3** | Text Module | `Every line of code we write, every consultant we train...` |
| **Para 4 (AI)** | Text Module | `Today, we're transforming from a software vendor into an AI infrastructure provider. Backed by 1,600+ R&D engineers and 1,800+ implementation consultants, DigiWin has developed 168 AI Agents and 68 operational SOPs...` |
| **Name Origin Box** | Group Module | Background: linear-gradient(135deg, #eff6ff, #dbeafe), border-left: 4px solid #00AFF0, border-radius: 0 12px 12px 0, padding: 24px 28px, margin-top: 32px |

#### Name Origin Box Contents

| Element | Divi 5 Module | Content |
|---------|--------------|---------|
| **Chinese** | Text Module | `鼎新` — Noto Sans TC 700, 32px, #000864 |
| **Pinyin** | Text Module | `Ding Xin` — JetBrains Mono, 14px, #5b6b80 |
| **Meaning** | Text Module | `"To innovate, to renew" — This is the meaning behind our name. Founded by Sun Ai-bin and Gu Feng-yong in 1982, this philosophy has driven us for over four decades.` — 15px, #475569, italic |

### Right Column: Image

| Element | Divi 5 Module | Configuration |
|---------|--------------|---------------|
| **Image** | Image Module | `about-mission.jpg`, alt: "Smart factory floor with digital manufacturing technology", border-radius: 24px, height: 400px, object-fit: cover, lazy loading |

### Responsive

| Breakpoint | Behavior |
|-----------|----------|
| Tablet (<=1024px) | Stack to 1 column, gap: 48px |
| Mobile (<=640px) | Image height: 280px, headline font-size: 28px |

---

## Section 3: Timeline — Horizontal Scroll Rail

**Purpose:** Visually compress 44 years of milestones into an impressive, scannable timeline. Proves longevity and continuous growth.

### Divi 5 Implementation

| Element | Divi 5 Module | Configuration |
|---------|--------------|---------------|
| **Container** | Section | Background: linear-gradient(180deg, #000864 0%, #000432 100%), padding: 80px 24px, grain overlay |
| **Header** | Group Module | Center-aligned |
| **Timeline** | Code Module | Complex horizontal scroll rail requires Code Module — cannot be replicated with native Divi modules |

> **Divi 5 Note:** The horizontal scroll timeline with above/below alternating cards, connecting dots, and fade masks is too structurally complex for native Divi 5 modules. Use a **Code Module** containing the full HTML/CSS. Consider converting to a Lottie animation post-launch for performance.

### Section Header

| Element | Divi 5 Module | Content |
|---------|--------------|---------|
| **Label** | Text Module | `STABILITY THROUGH DECADES` — JetBrains Mono, 12px, uppercase, #15803d, 2px letter-spacing |
| **Title** | Text Module (H2) | `44 Years of Manufacturing Focus` — Noto Sans 700, 36px, white |
| **Subtitle** | Text Module | `Every crisis survived. Every technology wave embraced. One focus: manufacturing.` — 16px, rgba(255,255,255,0.75), max-width: 550px |

### Timeline Milestones (12 total)

| # | Year | Title | Description | Badge | Position |
|---|------|-------|------------|-------|----------|
| 1 | 1982 | Founded | DigiWin founded in Taiwan by Sun Ai-bin & Gu Feng-yong | ORIGIN (gold) | Above |
| 2 | 1989 | First Product | First MRPII manufacturing software released | — | Below |
| 3 | 1992 | First Award | Taiwan Information Month Outstanding Software Package | — | Above |
| 4 | 1995 | TIPTOP ERP | Asia's first Browser/Server architecture ERP | — | Below |
| 5 | 2001 | Taiwan IPO | Listed on Taiwan Stock Exchange | TSEC (blue) | Above |
| 6 | 2006 | China #1 | #1 Manufacturing ERP vendor in China | — | Below |
| 7 | 2014 | Shenzhen IPO | Listed on Shenzhen Stock Exchange (300378.SZ) | 300378 (blue) | Above |
| 8 | 2017 | Thailand | ASEAN expansion accelerates from Bangkok | ASEAN (gold) | Below |
| 9 | 2020 | Foxconn Invests | CNY 560M strategic investment from Foxconn FII | — | Above |
| 10 | 2022 | Red Dot Award | German Red Dot Design Award for Athena Platform | — | Below |
| 11 | 2024 | #1 PLM + MES | IDC #1 in discrete manufacturing, Indonesia entry | — | Above |
| 12 | 2026 | AI Era | SUPA AI framework, smart manufacturing intelligence | NOW (green) | Below |

### Responsive

| Breakpoint | Behavior |
|-----------|----------|
| Desktop (>768px) | Horizontal scroll rail with above/below alternating cards |
| Mobile (<=768px) | Vertical timeline (left-aligned dots with cards stacking down) |

---

## Section 4: Stats Banner

**Purpose:** Reinforce key numbers in a bold, scannable dark section. Acts as a visual break between narrative sections.

### Divi 5 Implementation

| Element | Divi 5 Module | Configuration |
|---------|--------------|---------------|
| **Container** | Section | Background: linear-gradient(135deg, #000864 0%, #000432 100%), padding: 80px 24px, grain overlay |
| **Stats Row** | Row with CSS Grid | `grid-template-columns: repeat(5, 1fr)`, gap: 32px, max-width: 1200px |

### Stats

| # | Value | Label | Module | Color |
|---|-------|-------|--------|-------|
| 1 | `44+` | Years in Manufacturing ERP | Number Counter (animate to 44) | #0369a1 |
| 2 | `50K+` | Manufacturing Clients Worldwide | Number Counter | #0369a1 |
| 3 | `100+` | Thai Implementations | Number Counter | #0369a1 |
| 4 | `50+` | Team Members in Thailand | Number Counter | #0369a1 |
| 5 | `300378` | Shenzhen Stock Exchange Listed | Text Module | white |

Value styling: Noto Sans 700, 56px, line-height 1. Label styling: 15px, rgba(255,255,255,0.75).

### Responsive

| Breakpoint | Grid Columns |
|-----------|-------------|
| Desktop (>1024px) | 5 columns |
| Tablet (<=1024px) | 3 columns |
| Mobile (<=640px) | 2 columns, stat-number: 40px, gap: 24px |

---

## Section 5: Market Leadership — Common Wealth Magazine

**Purpose:** Third-party validation from Taiwan's most respected business publication. Not our claims — their data.

### Divi 5 Implementation

| Element | Divi 5 Module | Configuration |
|---------|--------------|---------------|
| **Container** | Section | Background: linear-gradient(135deg, #000864 0%, #000432 100%), padding: 80px 24px, grain overlay |
| **Header** | Group Module | Center-aligned: label + title |
| **Cards Grid** | Row with CSS Grid | `grid-template-columns: repeat(3, 1fr)`, gap: 32px, max-width: 1100px |
| **Each Card** | Group Module | Background: rgba(255,255,255,0.05), border: 1px solid rgba(255,255,255,0.1), border-radius: 16px, padding: 40px 32px, text-align: center, hover: translateY(-2px) + rgba(0,175,240,0.3) border |
| **Source** | Text Module | Center-aligned below grid |

### Section Header

| Element | Content |
|---------|---------|
| **Label** | `RECOGNIZED BY INDUSTRY LEADERS` — JetBrains Mono, 12px, #15803d, uppercase |
| **Title** | `In Taiwan's Manufacturing Sector` — Noto Sans 700, 36px, white |

### Cards

| Stat | Value | Label |
|------|-------|-------|
| 1 | `80%` | of Taiwan's Top 2,000 manufacturers use DigiWin solutions |
| 2 | `54%` | solutions market share in Taiwan's manufacturing ERP sector |
| 3 | `77%` | of Taiwan Stock Exchange IPO companies are DigiWin clients |

Value: Noto Sans 700, 48px, #00AFF0. Label: 14px, rgba(255,255,255,0.75), line-height 1.5.

**Source line:** `Source: Common Wealth Magazine, 2023 Manufacturing Technology Survey` — JetBrains Mono, 11px, rgba(255,255,255,0.75), center, margin-top: 32px.

### Responsive

| Breakpoint | Grid Columns |
|-----------|-------------|
| Desktop (>768px) | 3 columns |
| Mobile (<=768px) | 1 column, gap: 20px, value font-size: 40px |

---

## Section 6: Core Beliefs — "What We Believe"

**Purpose:** Define DigiWin's philosophy. Manufacturing-only focus, grow-together model, local roots, data liberation.

### Divi 5 Implementation

| Element | Divi 5 Module | Configuration |
|---------|--------------|---------------|
| **Container** | Section | Background: #fff, padding: 100px 24px |
| **Background Scene** | Code Module | Decorative SVG (shield, globe, timeline, document outlines) at very low opacity. Use Code Module for the SVG. |
| **Header** | Group Module | Center-aligned: label + title |
| **Cards Grid** | Row with CSS Grid | `grid-template-columns: repeat(2, 1fr)`, gap: 32px, max-width: 1100px |
| **Each Card** | Group Module | Background: linear-gradient(135deg, #f8fafc, #fff), border: 1px solid #e2e8f0, border-radius: 20px, padding: 40px, hover: blue border + shadow |

### Section Header

| Element | Content |
|---------|---------|
| **Label** | `OUR PHILOSOPHY` — section-label styling |
| **Title** | `What We Believe` — Noto Sans 700, 40px, #000864 |

### Belief Cards (4 total)

| # | Number | Title | Description |
|---|--------|-------|-------------|
| 1 | BELIEF 01 | "Manufacturing Is Not Generic" | We don't sell to banks, retailers, or hospitals. We are manufacturing-only because the factory floor demands it. BOMs, routings, work orders, OEE — these aren't features we added; they're why we exist. |
| 2 | BELIEF 02 | "Grow Together, Not Apart" | Our product suite — iGP -> T100 -> MES -> WMS -> AIoT — means your ERP partner doesn't change as your business scales. Your investment compounds, never resets. From 20-person workshop to multi-site enterprise group. |
| 3 | BELIEF 03 | "Local Roots, Global Standards" | Our Thailand team speaks Thai, understands Thai business culture, and is backed by 44 years of global manufacturing expertise. We're not a remote vendor sending consultants from overseas — we're here. |
| 4 | BELIEF 04 | "Data Should Liberate, Not Complicate" | We turn factory chaos — shadow Excel, ghost inventory, disconnected systems — into clear, actionable intelligence. Your production manager shouldn't need 3 spreadsheets to answer a simple question. |

Number styling: JetBrains Mono, 12px, 600, #0369a1, 1px letter-spacing. Title: Noto Sans 600, 22px, #000864. Description: 15px, #5b6b80, line-height 1.7.

### Responsive

| Breakpoint | Grid Columns |
|-----------|-------------|
| Desktop (>1024px) | 2 columns |
| Tablet/Mobile (<=1024px) | 1 column |

---

## Section 7: "Because of DigiWin, You Can..."

**Purpose:** Bridge from company story to customer outcomes. Shifts from "about us" to "what this means for you."

### Divi 5 Implementation

| Element | Divi 5 Module | Configuration |
|---------|--------------|---------------|
| **Container** | Section | Background: linear-gradient(180deg, #f8fafc 0%, #fff 100%), padding: 100px 24px |
| **Content Row** | Row with CSS Grid | `grid-template-columns: 1fr 1.3fr`, gap: 60px, max-width: 1200px, align-items: center |

### Left Column: Image

| Element | Divi 5 Module | Configuration |
|---------|--------------|---------------|
| **Image** | Image Module | `about-outcomes.jpg`, alt: "Team collaborating in modern manufacturing workspace", border-radius: 24px, height: 500px, object-fit: cover |

### Right Column: Outcome Items (6 total)

| Element | Divi 5 Module | Content |
|---------|--------------|---------|
| **Headline** | Text Module (H2) | `Because of DigiWin, You Can...` — "You Can..." in #0369a1 |

Each outcome item is a **Group Module** containing:

| Element | Module | Styling |
|---------|--------|---------|
| **Icon** | Image or Code Module | 48x48px, linear-gradient(135deg, #00AFF0, #003CC8) background, border-radius: 12px, white SVG icon |
| **Title** | Text Module (H3) | Noto Sans 600, 17px, #000864 |
| **Description** | Text Module | 14px, #5b6b80, line-height 1.6 |

#### Outcome Items

| # | Title | Description |
|---|-------|-------------|
| 1 | See Your Factory in Real Time | MES and AIoT give you live production data, not yesterday's spreadsheet. |
| 2 | Control Costs Before They Control You | Material tracking, scrap reduction, yield optimization across every production run. |
| 3 | Ship On Time, Every Time | Production scheduling and WMS working together to meet customer delivery promises. |
| 4 | Scale Without Starting Over | One ecosystem from workshop to enterprise group. Add MES when you're ready, add WMS when you need it. |
| 5 | Pass BOI Audits with Confidence | Production-order-level material reconciliation that matches exactly what the BOI board audits. One client saved 10M+ THB/year in supplementary taxes. |
| 6 | Make Decisions with Confidence | BI dashboards and analytics that turn raw data into strategic clarity. |

Items separated by border-bottom: 1px solid #e2e8f0, padding-bottom: 28px, margin-bottom: 28px (except last).

### Responsive

| Breakpoint | Behavior |
|-----------|----------|
| Tablet (<=1024px) | Stack to 1 column, gap: 48px |
| Mobile (<=640px) | Image height: 320px |

---

## Section 8: Thailand Commitment

**Purpose:** Prove local presence. Not a remote vendor — a neighbor with 50+ team members.

### Divi 5 Implementation

| Element | Divi 5 Module | Configuration |
|---------|--------------|---------------|
| **Container** | Section | Background: #fff, padding: 100px 24px |
| **Header** | Group Module | Center-aligned: label + title + subtitle |
| **Content Row** | Row with CSS Grid | `grid-template-columns: 1.2fr 1fr`, gap: 48px, max-width: 1000px |

### Section Header

| Element | Content |
|---------|---------|
| **Label** | `PROVEN IN YOUR NEIGHBORHOOD` |
| **Title** | `Thailand Commitment` — Noto Sans 700, 40px, #000864 |
| **Subtitle** | `Real support, no translation needed. You are not the "guinea pig."` — 18px, #5b6b80 |

### Left Column: Proof + Text + Compliance

#### Proof Grid (2x2)

| Element | Divi 5 Module | Configuration |
|---------|--------------|---------------|
| **Grid** | Row with CSS Grid | `grid-template-columns: repeat(2, 1fr)`, gap: 16px |
| **Each Card** | Group Module | Background: linear-gradient(135deg, #eff6ff, #dbeafe), border-radius: 12px, padding: 20px, text-align: center |

| Stat | Value | Label |
|------|-------|-------|
| 1 | `100+` | Customers & Partners in Thailand |
| 2 | `50+` | Thai Team Members |
| 3 | `60%+` | Bilingual (Thai + Chinese) |
| 4 | `Since 2017` | Serving Thai Manufacturers |

Value: Noto Sans 700, 24px, #0369a1. Label: 13px, #5b6b80.

#### Body Text

Text Module: `DigiWin entered Thailand in 2017, initially serving Taiwanese and Chinese manufacturers who had set up operations here. As demand grew, we formally registered our Thai company in 2019 and built a local team from the ground up...`

#### Named References

| Element | Module | Content |
|---------|--------|---------|
| **Heading** | Text Module (H3) | `Named Thai References` |
| **Intro** | Text Module | `Active production environments running on our systems today:` |
| **Names** | Group Module (Flexbox row) | Badges: GoldenSea Sanki, Top Mould, Accauto, Unique New Energy, Intensive Mould — each in a styled span (background: #f8fafc, border: 1px solid #e2e8f0, border-radius: 8px, padding: 10px 16px) |

#### Thai Compliance

| Element | Module | Content |
|---------|--------|---------|
| **Heading** | Text Module (H3) | `Thai Compliance Ready` |
| **List** | Icon List Module | 4 items with checkmark icons in #00AFF0 |

Items:
1. **Thai Revenue Department certified** (bold)
2. Withholding Tax logic built-in
3. e-Tax integration ready
4. BOI reporting support

### Right Column: Contact Card

| Element | Divi 5 Module | Configuration |
|---------|--------------|---------------|
| **Card** | Group Module | Background: linear-gradient(135deg, #f8fafc, #f1f5f9), border-radius: 24px, padding: 40px |
| **Title** | Text Module (H3) | `Thailand Office` — 24px, 600, #000864 |
| **Address** | Text Module | `No. 2/117-118, Bangna Complex Office Tower, 22nd Floor, Theparat Road, Bangna, Bangkok 10260` |
| **Email** | Text Module | `info@digiwin.co.th` (linked) |
| **CTA** | Button Module | `Get in Touch ->` → /demo.html — Primary blue gradient, white text, full-width, border-radius: 12px |

### Responsive

| Breakpoint | Behavior |
|-----------|----------|
| Tablet (<=1024px) | Stack to 1 column |
| Mobile (<=640px) | Proof grid: 1 column |

---

## Section 9: Asia Presence — Regional Map + Cards

**Purpose:** Show the scale of DigiWin's Asia-Pacific footprint. Thailand is highlighted as "You Are Here."

### Divi 5 Implementation

| Element | Divi 5 Module | Configuration |
|---------|--------------|---------------|
| **Container** | Section | Background: linear-gradient(180deg, #f8fafc 0%, #fff 100%), padding: 100px 24px |
| **Header** | Group Module | Center-aligned |
| **SVG Map** | Code Module | Full inline SVG Asia map with city markers — too complex for native Divi modules |
| **Mobile Map** | Code Module | Corridor-style vertical layout (shown only on mobile via display rules) |
| **Region Cards** | Row with CSS Grid | `grid-template-columns: repeat(2, 1fr)`, gap: 20px |
| **ASEAN Timeline** | Code Module | Horizontal timeline with arrows connecting expansion dates |
| **Presence Stats** | Row with CSS Grid | 4-column stats in dark container |

### Section Header

| Element | Content |
|---------|---------|
| **Label** | `ACROSS ASIA-PACIFIC` |
| **Title** | `Regional Presence` — Noto Sans 700, 40px, #000864 |
| **Subtitle** | `Dual headquarters in Taiwan and Shanghai, with 43 offices across China and ASEAN.` — 18px, #5b6b80 |

### SVG Map (Desktop Only)

> **Divi 5 Note:** The Asia map is a complex 600+ line SVG with country boundaries, city markers (circles with labels), animated Bangkok highlight (pulsing ring), and glow filters. This MUST be a Code Module. The map shows:
> - Taiwan HQ (Taipei) — large blue dot with glow
> - China HQ (Shanghai) — large blue dot with glow
> - Bangkok (Thailand) — large gold dot with pulsing animation, "You Are Here" label
> - 33+ China branches — orange dots with city names
> - Vietnam (Ho Chi Minh), Malaysia (Kuala Lumpur) — orange dots
> - Country outlines at low opacity

### Region Cards (4 total)

| Region | Flag | Title | Badge | Key Detail |
|--------|------|-------|-------|------------|
| China | CN | China | HQ + 33 branches | Shanghai HQ, expandable city list (33 cities with Chinese names) |
| Taiwan | TW | Taiwan | HQ + 5 branches | Taipei HQ, 5 branches: Taoyuan, Hsinchu, Taichung, Tainan, Kaohsiung |
| Thailand | TH | Thailand | You Are Here | Bangkok (Bangna Complex, 22F), Thai + Bilingual consultants. Gold border featured style. |
| ASEAN | Globe | ASEAN | 3 more countries | Vietnam (2008), Malaysia (2013), Indonesia (2024) |

Each card: Group Module with region-header (navy gradient bg), content section(s).

### ASEAN Expansion Timeline

Dark navy container with 4 stops connected by arrows:
- 2008: Vietnam
- 2013: Malaysia
- **2019: Thailand** (highlighted with blue bg)
- 2024: Indonesia

Below: 4-column stats bar (35+ China Branches, 6 Taiwan Branches, 4 ASEAN Countries, 43+ Total Offices).

### Responsive

| Breakpoint | Behavior |
|-----------|----------|
| Tablet (<=1024px) | Region grid: 1 column, ASEAN timeline: vertical |
| Mobile (<=640px) | SVG map hidden, mobile corridor map shown. Region grid: 1 column. Presence stats: 2 columns. |

---

## Section 10: CTA — "Let's Start a Conversation"

**Purpose:** Convert interest built through the About page into a contact action.

### Divi 5 Implementation

| Element | Divi 5 Module | Configuration |
|---------|--------------|---------------|
| **Container** | Section | Background: linear-gradient(135deg, #00AFF0 0%, #003CC8 50%, #001080 100%), padding: 100px 24px, grain overlay at 0.07 |
| **Inner** | Group Module | max-width: 800px, center, text-align: center |

### Content

| Element | Divi 5 Module | Content |
|---------|--------------|---------|
| **Headline** | Text Module (H2) | `Let's Start a Conversation` — Noto Sans 700, 40px, white |
| **Subtitle** | Text Module | `Whether you're a factory owner seeking solutions or a distributor exploring partnership — we'd love to hear from you.` — 18px, rgba(255,255,255,0.9) |
| **Buttons Row** | Group Module (Flexbox) | Center-aligned, gap: 16px, flex-wrap: wrap |
| **Button 1** | Button Module | `Let's Talk` → /demo.html — `.btn-white` style (white bg, navy text) |
| **Button 2** | Button Module | `Explore Products` → /products.html — `.btn-outline-white` style (transparent bg, white border) |
| **Contact Info** | Group Module (Flexbox) | Center, gap: 40px, margin-top: 40px |
| **Email** | Text Module + Icon | `info@digiwin.co.th` — 15px, rgba(255,255,255,0.85) |
| **Location** | Text Module + Icon | `Bangkok, Thailand` — 15px, rgba(255,255,255,0.85) |

---

## Animation Strategy

### Scroll-Triggered Animations

| Element | Divi 5 Interaction | Settings |
|---------|-------------------|----------|
| All cards (belief, why, award, outcome) | Scroll → Fade In Up | Duration: 400ms, ease, stagger: 70ms between siblings |
| Hero stat cards | Scroll → Fade In Up | Duration: 400ms, stagger: 100ms |
| Stats banner numbers | Number Counter auto-animation | Built-in viewport trigger |
| Market leadership cards | Scroll → Fade In Up | Duration: 400ms, stagger: 100ms |
| Timeline milestones | Code Module internal CSS | Keep existing CSS transitions |

### Hover Interactions

| Element | Divi 5 Interaction | Settings |
|---------|-------------------|----------|
| Belief cards | Hover → Border color + Shadow | Border: #00AFF0, box-shadow: 0 12px 40px rgba(0,175,240,0.1), transition: 0.3s ease |
| Region blocks | Hover → Border color + Shadow | Border: #00AFF0, box-shadow: 0 8px 24px rgba(0,175,240,0.1), transition: 0.3s ease |
| Market stat cards | Hover → TranslateY + Border | translateY: -2px, border: rgba(0,175,240,0.3), transition: 0.3s ease |
| CTA buttons | Hover → TranslateY + Shadow | translateY: -2px, shadow increase, transition: 0.3s ease |

### Reduced Motion

All animations and transitions respect `prefers-reduced-motion: reduce` — set in Divi 5 Section/Module advanced CSS or via Code Module media query.

---

## Validation Checklist

| Check | Requirement | Implementation |
|-------|------------|----------------|
| Skip link | `<a href="#about-content" class="dw-skip-link">Skip to content</a>` | Before `<main>` |
| Main landmark | `<main id="about-content">` | Wraps all content |
| Semantic sections | Each content block uses `<section>` tag | Divi 5 Semantic Elements setting |
| Heading hierarchy | H1 (hero) -> H2 (section titles) -> H3 (card titles) -> H4 (sub-items) | No skipped levels |
| Image alt text | All images have descriptive alt attributes | Mission image, outcomes image |
| Color contrast | Text on dark backgrounds >= rgba(255,255,255,0.75) | All text-on-dark sections verified |
| Reduced motion | `prefers-reduced-motion: reduce` disables all animations | Timeline, cards, scroll CTA |
| Dynamic year | `.dw-years` class auto-updates via `digiwin-dynamic.js` | Hero H1, stats banner, beliefs |
| Form labels | N/A (no forms on About page) | — |
| Stock code display | `300378` is NOT animated (it's a stock code, not a quantity) | Text Module, not Number Counter |
| Source attribution | Common Wealth Magazine stats include source line | Section 5 footer |
| Real links only | CTA buttons link to existing pages (/demo.html, /products.html) | Verified |
| Grain texture | SVG dot-pattern overlays on dark sections at 0.03 opacity | Code Module |
| Super D background | Brand D mark on hero (left, gradient, parallax) and mission (center) | Code Module |
| No "Book a Demo" | All CTAs use "Let's Talk" or "Get in Touch" | Verified |
