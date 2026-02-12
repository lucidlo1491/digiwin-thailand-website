# Content Spec: Partner Economics (PRD Section 2.3)

**Batch:** 1
**PRD Reference:** Section 2.3 — Partner Economics
**Playbook Reference:** Sections 2.3 (Track B Voice), 3.5 (Economics Page Arc), 7.4 (Partner Economics Notes)
**Status:** v1.0 — Reverse-engineered from HTML build
**Last Updated:** February 12, 2026

---

## Page Overview

**Audience:** Distributor prospects in evaluation stage — they want numbers, not narrative
**Objective:** Prove the financial case with concrete scenarios. This page must feel like opening a spreadsheet, not reading a brochure (Playbook 7.4).
**URL:** digiwin.co.th/partner-program/economics.html
**Emotional Arc:** Numbers-first (signal concreteness) > Revenue model (how the math works) > Year 1-2-3 projection (realistic timeline) > Protection (risk removed) > CTA (confidence to act)
**Title Tag:** `Partner Economics - DigiWin Partner Program`

---

## Section 1: Hero

**Purpose:** Signal immediately that this page is about numbers, not marketing. Green accent color signals "money/growth."

| Element | Specification |
|---------|---------------|
| **Layout** | Full-width dark hero, single-column left-aligned (900px max), proof bar at bottom |
| **Background** | `linear-gradient(135deg, #1a2e40 0%, #000864 50%, #2d4a5e 100%)` with dot pattern overlay |
| **Padding** | 140px top, 100px bottom (mobile: 120px top, 80px bottom) |

| Element | Content |
|---------|---------|
| **Breadcrumb** | Partner Program / Partner Economics (link to `partner-program.html`) |
| **Headline** | `See the Actual Economics—Not a Sales Pitch` — "Not a Sales Pitch" in green `#4ade80` |
| **Subtitle** | "Realistic numbers in Thai Baht. Conservative scenarios. No hype. Here's exactly how the partner model works financially—from Year 1 survival to Year 3 asset building." |

### Hero Proof Bar (4-column grid, green accent)

| Element | Specification |
|---------|---------------|
| **Layout** | 4-column grid, separated by `1px solid rgba(255,255,255,0.1)` top border, 40px top padding |
| **Value Style** | Noto Sans 32px bold, `#4ade80` |
| **Label Style** | JetBrains Mono 11px, uppercase, `rgba(255,255,255,0.6)` |

| Stat | Value | Label |
|------|-------|-------|
| 1 | 30-40% | License Margin |

> **Updated Feb 10, 2026:** Hero stat aligned with undersell strategy (30-40%). The detailed tier breakdown later on the page reveals higher actual margins (Silver 50-62%, Golden 62-70%) — this is intentional. Hero understates; body content delivers the "exceed expectations" moment.
| 2 | 100% | Service Revenue |
| 3 | 12% | Fixed MA Cost to You |
| 4 | 6mo | Lead Lock Protection |

---

## Section 2: The 4 Revenue Streams

**Purpose:** Show how partner revenue actually works — license, service, MA, upsell. Maps to PRD "Profit Model" section.

| Element | Specification |
|---------|---------------|
| **Layout** | 2-column grid of revenue stream cards (1-col at 1024px) |
| **Background** | `#fff` |
| **Padding** | 100px top/bottom |
| **Max Width** | 1200px |

| Element | Content |
|---------|---------|
| **Section Label** | "THE 4 REVENUE STREAMS" (JetBrains Mono, uppercase, `#00AFF0`, letter-spacing 2px) |
| **Section Headline** | "How Partner Revenue Actually Works" |
| **Section Subhead** | "Unlike SaaS vendors that trickle revenue over years, our model provides substantial upfront margin plus recurring income." |

### Revenue Stream Cards

Each card has: dark header (`linear-gradient(135deg, #000864, #1a2e40)`) with icon + title + tag, followed by white body with description + margin grid + note.

#### Stream 1: License Revenue

| Element | Content |
|---------|---------|
| **Tag** | "Front-Loaded Cash Flow" |
| **Description** | You purchase license keys at Distributor Price, sell at Suggested Selling Price (SSP). The difference is **immediate gross profit**—profitable from Day 1. |

| Level | Margin |
|-------|--------|
| Silver Partner | ~50% margin |
| Gold Partner | ~62-70% margin (highlighted green) |

#### Stream 2: Service Revenue

| Element | Content |
|---------|---------|
| **Tag** | "100% Retention" |
| **Description** | DigiWin is a product vendor, not a service competitor. **You keep 100%** of all Implementation, Customization, and Training fees. |

| Project Type | Value |
|-------------|-------|
| Workflow iGP Project | ฿800K - ฿1.2M |
| T100/eMES Project | Hourly billing (highlighted green) |

| **Note** | *We "give up" this high-margin revenue to partners in exchange for market scale.* |

#### Stream 3: Recurring Support (MA)

| Element | Content |
|---------|---------|
| **Tag** | "The Annuity Stream" |
| **Description** | DigiWin charges you a fixed **12% of SSP** annually (starting Year 2) for Tier 2 support—core bug fixes, patches, and R&D. You provide Tier 1 support and **set your own client rate**. |

| Line Item | Value |
|-----------|-------|
| Your Cost to DigiWin | 12% of SSP |
| You Charge the Client | Your call (e.g. 18-20%) (highlighted green) |

> **VP-confirmed model (Oct 10, 2025):** No profit-sharing. DigiWin charges distributor a fixed 12%. How much the distributor charges the client is their business. The "75/25 split" from earlier contract drafts was explicitly rejected by VP.

| **Note** | *No profit-sharing. You pay us 12%, charge clients what the market bears. As install base grows, MA becomes your most predictable revenue stream.* |

#### Stream 4: Upsell & Cross-Sell

| Element | Content |
|---------|---------|
| **Tag** | "Growth Multiplier" |
| **Description** | Revenue doesn't end at Go-Live. Build IP on the **Digiwin.cloud PaaS platform**. Custom modules become licensable assets. |

| Type | Margin |
|------|--------|
| Module Add-ons | Same tier-based margin (30-40%+ depending on tier) |
| Referral Fees | 5-10% of license (highlighted green) |

| **Note** | *A single client can generate 3-4 additional license sales over 5 years.* |

---

## Section 3: The 3-Year Partner Journey

**Purpose:** Realistic Year 1-2-3 revenue scenarios. Playbook 7.4 demands "conservative and credible — overpromising kills trust here."

| Element | Specification |
|---------|---------------|
| **Layout** | 3-column year phase cards, followed by dark summary bar chart |
| **Background** | `linear-gradient(180deg, #f8fafc 0%, #fff 100%)` |
| **Padding** | 100px top/bottom |
| **Max Width** | 1200px |

| Element | Content |
|---------|---------|
| **Section Label** | "REALISTIC YEAR 1-2-3 SCENARIOS" (JetBrains Mono) |
| **Section Headline** | "The 3-Year Partner Journey" |
| **Section Subhead** | "Conservative estimates. No hype. Here's what typical progression looks like for a partner starting with SME products." |

### Year 1: Investment & Ramp

| Element | Content |
|---------|---------|
| **Header** | Year 1 gradient: gray (`#94a3b8 → #64748b`) |
| **Badge** | "Year 1" |
| **Title** | "Investment & Ramp" |
| **Status** | Silver Partner (Co-Delivery) |
| **Reality Check** | "Don't expect profit in Q1-Q2. Your focus is training your core team and closing first 'Pilot' deals with DigiWin's heavy assistance." |

**Timeline:**

| Quarter | Activity |
|---------|----------|
| Q1-Q2 | 2 Senior Consultants undergo certification |
| Q3-Q4 | Close 2 Workflow iGP projects |

**Revenue Math:**

| Line Item | Amount |
|-----------|--------|
| License Revenue | ~฿380,000 |
| Service Revenue | ~฿1,600,000 |
| Recurring (MA) | ฿0 (warranty) |
| **Total Year 1** | **~฿2.0M** |

**Outcome:** Break even or small loss, but 2 reference sites and certified team. You survived the "Valley of Death."

### Year 2: Cash Flow Phase

| Element | Content |
|---------|---------|
| **Header** | Year 2 gradient: blue (`#00AFF0 → #2d7bc4`) |
| **Badge** | "Year 2" |
| **Title** | "Cash Flow Phase" |
| **Status** | Transition to Gold Partner |
| **Reality Check** | "Team can now deploy iGP without hand-holding. Stop bleeding hours on learning. Introduce 'Reverse Cut' strategy with eMES." |
| **Activity** | New Sales: 3 iGP projects + 1 eMES standalone |

**Revenue Math:**

| Line Item | Amount |
|-----------|--------|
| License Revenue | ~฿1,100,000 |
| Service Revenue | ~฿3,500,000 |
| Recurring (MA) | ~฿100,000 |
| **Total Year 2** | **~฿4.7M** |

**Outcome:** **Profitable practice.** Service revenue funds operations; license revenue is pure profit. MA covers office rent.

### Year 3: Asset Building Phase (Featured — green border + glow)

| Element | Content |
|---------|---------|
| **Header** | Year 3 gradient: green (`#4ade80 → #22c55e`) |
| **Badge** | "Year 3" |
| **Title** | "Asset Building Phase" |
| **Status** | Gold Partner (Specialized) |
| **Reality Check** | "No longer just 'hunting.' The farming engine kicks in. MA covers a junior consultant's salary. First T100 or AIoT upsell attempts." |
| **Activity** | New Sales: 4 iGP + 1 T100 Enterprise or 2 eMES add-ons |

**Revenue Math:**

| Line Item | Amount |
|-----------|--------|
| License Revenue | ~฿2,000,000+ |
| Service Revenue | ~฿5,000,000+ |
| Recurring (MA) | ~฿350,000+ (highlighted green) |
| **Total Year 3** | **~฿7.4M+** |

**Outcome:** Business valuation shifts. **You have a recurring revenue stream and sticky client base.** You built an asset, not just a job.

### 3-Year Summary Bar Chart

| Element | Specification |
|---------|---------------|
| **Layout** | Dark box (`linear-gradient(135deg, #000864, #1a2e40)`), centered, 3 vertical bars |
| **Title** | "3-Year Revenue Trajectory" |

| Year | Value | Label | Bar Color | Relative Height |
|------|-------|-------|-----------|----------------|
| Y1 | ฿2M | Y1: Surviving | Blue (`#00AFF0`) | 27% |
| Y2 | ฿4.7M | Y2: Profitable | Blue (`#00AFF0`) | 63% |
| Y3 | ฿7.4M+ | Y3: Asset | Green (`#4ade80`, featured) | 100% |

---

## Section 4: Your Protection Structure

**Purpose:** Remove risk — partnership isn't just about revenue, it's about protecting the investment. Maps to PRD "Protection Guarantees" section.

| Element | Specification |
|---------|---------------|
| **Layout** | 2-column grid of protection cards (1-col at 1024px) |
| **Background** | `#fff` |
| **Padding** | 100px top/bottom |
| **Max Width** | 1200px |

| Element | Content |
|---------|---------|
| **Section Label** | "RISK MITIGATION" (JetBrains Mono) |
| **Section Headline** | "Your Protection Structure" |
| **Section Subhead** | "Partnership isn't just about revenue—it's about protecting your investment and reducing risk." |

### Protection Card 1: Territory & Conflict Protection

| Element | Content |
|---------|---------|
| **Icon** | Shield |
| **Point 1** | **6-Month Ironclad Lock:** Once you register a qualified lead, it's legally locked to you for 6 months (renewable +3). No one can approach the client. |
| **Point 2** | **Structural Segmentation:** DigiWin's direct team is restricted to Chinese/Taiwanese inbound accounts. Thai Local Market is exclusively for partners. |
| **Point 3** | **Non-Compete Clause:** Master Agreement explicitly states DigiWin cannot operate leads booked by partners during valid period. |
| **Proof Quote** | "Your leads are locked. Contractual protection, not just promises." |

### Protection Card 2: Co-Implementation Support

| Element | Content |
|---------|---------|
| **Icon** | Users/team |
| **Point 1** | **Tiered Support:** You own Tier 1 (user questions, basic configs). DigiWin handles Tier 2 (core bugs, API failures, R&D). |
| **Point 2** | **"Entrusted Service" Safety Net:** If you sell but lack capacity, DigiWin delivers under your brand via formal agreement. |
| **Point 3** | **On-Site Pilot Assistance:** For first projects, we provide on-site guidance for critical phases like Go-Live Simulation. |
| **Proof Quote** | "You are never alone on Go-Live." |

### Protection Card 3: Training & Certification

| Element | Content |
|---------|---------|
| **Icon** | Graduation cap |
| **Point 1** | **Mandatory Certification:** Your staff must complete Sales, Pre-sales, and Delivery certification tracks within 3-5 months. |
| **Point 2** | **Role-Based Tracks:** T100 Certified → Enterprise projects. eMES Certified → Factory floor. Gold Status → Higher margins (60%+). |
| **Point 3** | **Sales "Weaponization":** Industry whitepapers, ROI calculators, localized demo scripts—go in as manufacturing consultants. |
| **Proof Quote** | "Competency transfer, not just manuals." |

### Protection Card 4: Demand Generation

| Element | Content |
|---------|---------|
| **Icon** | Pulse/heartbeat |
| **Point 1** | **100% Lead Distribution:** Leads from Brand Roadshows and digital marketing are distributed 100% to qualified partners who attend. |
| **Point 2** | **Gold Priority Allocation:** High-quality inbound leads are allocated based on performance to Gold Partners first. |
| **Point 3** | **Division of Labor:** We generate demand; you capture and service it. We're the marketing engine; you're the closing engine. |
| **Proof Quote** | "We feed the army." |

---

## Section 5: Final CTA

**Purpose:** The conversion ask. PRD says "Let's Talk Numbers" + "Download Partner Economics Brief."

| Element | Specification |
|---------|---------------|
| **Layout** | Centered text with dual CTAs |
| **Background** | `linear-gradient(135deg, #00AFF0 0%, #2d7bc4 50%, #1e5a8a 100%)` with dot pattern |
| **Padding** | 100px top/bottom |
| **Max Width** | 800px |

| Element | Content |
|---------|---------|
| **Headline** | "Ready to Run the Numbers for Your Firm?" |
| **Body** | "Let's discuss your territory, your targets, and build a 3-year projection specific to your business. No obligation—just spreadsheet reality." |
| **Primary CTA** | "Schedule Discovery Call" → `demo.html` (class: `dw-btn dw-btn-white`) |
| **Secondary CTA** | "Back to Partner Overview" → `partner-program.html` (class: `dw-btn dw-btn-outline-white`) |

---

## Responsive Behavior

| Breakpoint | Changes |
|------------|---------|
| **1024px** | Hero proof bar → 2-col; Revenue streams → 1-col; Journey years → 1-col; Protection grid → 1-col; Summary bars narrower (80px wide) |
| **640px** | Hero padding reduced; H1 → 28px; Hero proof values → 24px; Margin grids → 1-col; Section headlines → 32px; Summary bars height reduced to 150px |

---

## Flags & Notes

1. **Revenue Figures are Highly Specific:** The 3-year journey includes exact THB figures (฿380K, ฿1.6M, ฿2.0M total for Year 1, etc.). PRD Section 2.3 notes: "Pricing: directional ranges only. Exact pricing requires HQ approval." These figures should be reviewed — they read as "scenario examples" rather than guaranteed pricing, but the specificity may create expectations. Consider adding a disclaimer like "Illustrative scenario — actual results depend on your market and effort."

2. **License Margin Range — HARMONIZED (Feb 10, 2026):** All public-facing pages now use **30-40%** as the headline margin range (undersell strategy, confirmed by Peter). Actual margins from Price Sheet V2.0: Silver 50-62%, Golden 62-70%. The specific tier breakdowns on this Economics page can show higher numbers since visitors are deeper in the funnel — but hero/overview stats across all pages should say "30-40%". Homepage hero uses qualitative "Industry-Leading Margins" instead of a specific number.

3. **MA Model — CORRECTED (Feb 12, 2026):** The page previously showed a "75/25 split (9% partner / 3% DigiWin)" which was based on an early contract proposal that VP explicitly rejected in the Oct 10, 2025 meeting (經銷商合約會議逐字稿 Part 2). The VP's actual model: DigiWin charges the distributor a **fixed 12% of SSP** for Tier 2 support. The distributor sets their own client rate and keeps the markup. **No profit-sharing.** Source: Google Doc `19oyQH1kLLrwqfkfsmOTf3dybPeT1HGZCBGF3xeNVZwI`. NOTE: The Partner Hub page may still reference "9% Annual Maintenance Share" — check and correct if so.

4. **CTA Link — `demo.html`:** Primary CTA links to `demo.html`. Same concern as Partner Hub — filename "demo" contradicts no-demo principle.

5. **Missing "Download Partner Economics Brief":** PRD specifies both a high-touch CTA (discovery call) and a self-serve CTA (download brief). Playbook 3.5 also specifies dual CTAs. The current page only has "Schedule Discovery Call" and "Back to Partner Overview" — the download option is missing.

6. **Missing 4-Stage Maturity Path:** PRD Section 2.3 specifies a "4-Stage Maturity Path: Filter → Empower → Pilot → Independent" section. This is not present in the Economics page HTML. It appears partially on the Partner Hub page as the "Structured Ascension Path" (Ready/Silver/Gold) but with different terminology.

7. **Tier Naming:** Uses "Silver Partner" and "Gold Partner" in the revenue streams section. This aligns with the Partner Hub but deviates from PRD's "Filter → Empower → Pilot → Independent" framework.

8. **"Entrusted Service" Term:** The Co-Implementation card mentions an "Entrusted Service" safety net. This appears to be a specific contractual term — should be verified with the actual partner agreement.

9. **Inline CSS:** This page has ~620 lines of inline CSS. Significant overlap with Partner Hub CSS (breadcrumb, hero, CTA section, card patterns). Should be extracted to `styles.css`.

10. **Playbook Alignment — "Spreadsheet Energy":** The page successfully delivers the "spreadsheet energy" called for in Playbook 7.4 — numbers are front and center, ranges are used, scenarios are conservative. The Year 1 "break even or small loss" framing is appropriately honest.
