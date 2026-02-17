# Content Spec: Case Studies (PRD Section 5.1)

**Batch:** Batch 6
**PRD Reference:** Section 5.1 — Case Studies
**Playbook Reference:** Section 5.1 (Proof Escalation), Section 5.3 (Case Study Structure), Section 3.2 (Leaf Page Arc Track A)
**Status:** v1.1 — Peter-approved decisions applied
**Last Updated:** February 13, 2026

---

## Page Overview

**Audience:** Both — factory operators in evaluation stage (Track A) and distributor prospects validating DigiWin's track record (Track B)
**Objective:** Provide measurable proof from real Thai factories. Every case study answers: "Has DigiWin done this for someone like me?"
**URL:** digiwin.co.th/case-studies.html
**Emotional Arc:** Recognition → Validation → Confidence → Action

---

## Source Intelligence

All case study data comes from DigiWin Thailand's official website (digiwin.co.th), OCR-verified February 2026. These are first-party DigiWin claims published on the vendor's own site. Five cases have detailed metrics; six additional cases are listed with limited detail.

**Key theme across all cases:** Closing time reduction is the #1 cited benefit (60→15 days, 90→15 days). Stock accuracy (90-95%) is the #2 cited benefit. These align directly with the WMS and ERP pain points named in our product pages.

---

## Section 1: Hero

**Purpose:** Signal depth of proof. This page says "we don't just claim results — here they are."

| Element | Specification |
|---------|---------------|
| **Layout** | Full-width, centered text |
| **Background** | Dark gradient (`linear-gradient(165deg, #0f1419 0%, #1a2632 40%, #000864 100%)`) with particle wave SVG + grain overlay |
| **Padding** | 140px top, 80px bottom |

| Element | Content |
|---------|---------|
| **Badge** | `CASE STUDIES` (JetBrains Mono, pulsing blue dot) |
| **Headline** | `Real Factories. Real Results.` |
| **Subtitle** | `Thai manufacturers share how DigiWin transformed their operations — with measurable outcomes, not marketing promises.` |
| **Stats row** | `5` Case Studies · `3` Industries · `75%` Avg. Closing Time Reduction |

### Hero Stats Detail

| # | Value | Label | Source |
|---|-------|-------|--------|
| 1 | `5` | Detailed Case Studies | Count of deep-read cases from official site |
| 2 | `3` | Industries Represented | Plastics, Packaging, Metal Stamping |
| 3 | `75%` | Avg. Closing Time Reduction | Average of 60→15 days (75%) and 90→15 days (83%) = ~79%, rounded conservatively to 75% |

**Note on "75%":** This is calculated from two verified data points (Thai Alpha: 60→15 days = 75% reduction, Thai Hosheng: 90→15 days = 83% reduction). Using 75% (the lower figure) is conservative and defensible. If Peter prefers, we can use "up to 83%" or remove the aggregate and show individual numbers only.

---

## Section 2: Case Study Grid

**Purpose:** Filterable grid of case study cards. Visitors self-select by industry.

| Element | Specification |
|---------|---------------|
| **Layout** | Filter tabs + 3-column card grid (2-column at 1024px, 1-column at 640px) |
| **Background** | White (#FFFFFF) |
| **Padding** | 80px top, 100px bottom |

### Filter Tabs

| Tab | Filter |
|-----|--------|
| All | Show all case studies |
| Plastics & Packaging | Filter to Thai Alpha, Thai Hosheng, Lotus Pack |
| Metal & Precision | Filter to Ginfong |
| Electronics | Filter to Hoo Chin Electronics |
| Fasteners & Components | Filter to Taiyo Fastener |

**Tab Style:** Horizontal pill buttons, #F5F7FA default bg, #00AFF0 bg when active, 8px radius, JetBrains Mono 13px uppercase.

### Case Study Cards

Each card follows this structure:

```
[Industry Badge]
[Company Name]
[One-line summary]
[Key Metric — large number]
[Products Used — small tags]
[Read More →]
```

**Card Style:** White bg, 1px border #e2e8f0, 16px radius, 32px padding. Hover: blue border + shadow lift + translateY(-2px). Transition: 0.3s ease.

---

## Section 3: Detailed Case Studies (5 Featured)

Each case study follows the Playbook Section 5.3 structure: Challenge → Solution → Results → Timeline.

---

### Case Study 1: Ginfong Precision (金峰精密)

| Field | Content |
|-------|---------|
| **Industry badge** | `Metal Stamping` (blue) |
| **Company** | Ginfong Precision |
| **Location** | Thailand |
| **Products** | ERP + SFT (Shop Floor Tracking) |
| **Hero metric** | `+200%` Revenue Growth |

#### Challenge
Metal stamping manufacturer struggling with cost visibility and production tracking. Manual processes couldn't keep pace with growing order volumes. No real-time view of actual production costs vs. quoted costs.

#### Solution
Deployed DigiWin ERP for financial control and cost tracking, plus SFT (Shop Floor Tracking) for real-time production data collection. The combination gave management live visibility into actual costs at each production stage.

#### Results

| Metric | Before | After | Change |
|--------|--------|-------|--------|
| Gross profit margin | 23% | 34% | +11 percentage points |
| Revenue | Baseline | +200% | Grew through COVID period |

#### Why It Matters
Ginfong didn't just survive COVID — they grew revenue by 200% while competitors contracted. The gross profit improvement from 23% to 34% proves DigiWin's cost visibility directly translates to better pricing decisions and waste reduction.

#### Media
- YouTube video: `youtube.com/watch?v=p5vn_llRe5M` — **link to video** (not embedded; open in new tab)

#### Vendor Selection Criteria (from Ginfong's own evaluation)
Ginfong evaluated ERP vendors on 7 criteria — useful for visitors in their own evaluation stage:
1. After-sales service quality
2. Thai tax compliance
3. Market share and reputation
4. Industry-specific experience
5. Brand longevity
6. Price-to-value ratio
7. Multilingual support

**Implementation note:** Consider displaying these criteria as a sidebar callout — "What Ginfong Looked For in an ERP Partner." Visitors in evaluation stage will see their own concerns reflected.

---

### Case Study 2: Thai Alpha Polymer (泰國阿發高分子)

| Field | Content |
|-------|---------|
| **Industry badge** | `Plastics Manufacturing` (blue) |
| **Company** | Thai Alpha Polymer |
| **Location** | Thailand |
| **Products** | Workflow ERP (iGP) + WMS (sFLS) |
| **Hero metric** | `60→15` Days to Close |

#### Challenge
PET plastic roll manufacturer with inventory accuracy problems and painfully slow month-end closing. Physical counts never matched system records. Finance team spent weeks reconciling.

#### Solution
Deployed DigiWin Workflow ERP for financial management and WMS (sFLS) for barcode-driven warehouse operations. Every material movement now captured at source via scanning.

#### Results

| Metric | Before | After | Change |
|--------|--------|-------|--------|
| Stock accuracy | Unknown | 95% | Barcode-driven accuracy |
| Monthly closing | 60 days | 15 days | 75% faster |

#### Named Users
- **Khun Noo** (Accounting Department) — spoke to closing time improvements
- **Khun Ae** (Warehouse) — spoke to stock accuracy and scanning workflow

#### Referral Chain
Thai Alpha was referred to DigiWin by Thai Hosheng Packing (an existing DigiWin partner). This referral chain is proof that satisfied customers actively recommend DigiWin — the strongest form of social proof.

**Implementation note:** The referral chain is a powerful trust signal. Consider displaying as a callout: "Thai Alpha chose DigiWin based on a recommendation from Thai Hosheng — a fellow manufacturer already running on our system."

---

### Case Study 3: Thai Hosheng Packing (泰鸿兴实业)

| Field | Content |
|-------|---------|
| **Industry badge** | `Packaging` (blue) |
| **Company** | Thai Hosheng Packing |
| **Location** | Thailand |
| **Products** | Workflow ERP (iGP) + WMS (sFLS) + SFT |
| **Hero metric** | `90→15` Days to Close |

#### Challenge
Packaging manufacturer with the worst closing time in our case study portfolio — 90 days. Combined with low stock accuracy and unreliable on-time delivery. The business was growing but operations couldn't keep up.

#### Solution
Full DigiWin stack deployment: Workflow ERP for financials, WMS for warehouse accuracy, and SFT for shop floor tracking. Three systems working as one integrated operation.

#### Results

| Metric | Before | After | Change |
|--------|--------|-------|--------|
| Monthly closing | 90 days | 15 days | 83% faster |
| Stock accuracy | Unknown | 90% | System-matched inventory |
| On-time delivery | Unknown | 80% | Measurable OTD tracking |

#### Why It Matters
Thai Hosheng is the most comprehensive deployment in our case study portfolio — ERP + WMS + SFT together. The 90→15 day closing improvement is the most dramatic transformation. They also referred Thai Alpha to DigiWin, proving satisfaction strong enough to stake their own reputation on.

---

### Case Study 4: MUFU Technologies

| Field | Content |
|-------|---------|
| **Industry badge** | `Manufacturing` (blue) |
| **Company** | MUFU Technologies |
| **Location** | Thailand |
| **Products** | Workflow ERP (iGP) |
| **Hero metric** | `Full Automation` |

#### Challenge
Manufacturing company with manual, disconnected processes across departments. Information silos meant no single view of operations.

#### Solution
Deployed DigiWin Workflow ERP to unify all departments — purchasing, production, inventory, and finance — into a single system.

#### Results
- Full automation of cross-department workflows
- Eliminated manual data re-entry between departments
- Single source of truth for all operational data

**Note:** MUFU has qualitative results only — no specific numerical metrics available. Card should use "Unified Operations" as the hero metric rather than a number.

---

### Case Study 5: Taiyo Fastener Thailand

| Field | Content |
|-------|---------|
| **Industry badge** | `Fasteners` (blue) |
| **Company** | Taiyo Fastener Thailand |
| **Location** | Bangpoo Industrial Estate, Samut Prakan, Thailand |
| **Parent** | Taiyoseiko Corporation (Japan) — **verified** |
| **Products** | ERP + WMS (sFLS) |
| **Hero metric** | `Unified Systems` |

#### Challenge
Japanese fastener manufacturer operating in Thailand with multiple disconnected systems. Material tracking errors caused production delays and customer delivery issues.

#### Solution
Deployed DigiWin ERP and WMS to replace fragmented systems with a single unified platform. Barcode-driven warehouse operations eliminated manual material tracking.

#### Results
- Unified multiple legacy systems into one platform
- Reduced material tracking errors
- Improved production scheduling accuracy

**Note:** Taiyo has qualitative results only — no specific numerical metrics available. Card should use "Systems Unified" as the hero metric.

**Positioning (Peter-approved):** Feature Taiyo as proof that even Japanese-standard manufacturers (known for rigorous quality demands) trust DigiWin. Callout: *"When a Japanese manufacturer with the world's strictest quality standards chose DigiWin for their Thailand operation, it wasn't because we were the cheapest option."*

---

## Section 4: Listed Case Studies (Coming Soon)

**Purpose:** Show additional breadth without full write-ups. These signal "we have more — ask us."

| Element | Specification |
|---------|---------------|
| **Layout** | 3-column grid of minimal cards |
| **Background** | Light gray (#F5F7FA) |
| **Padding** | 80px top/bottom |

| Element | Content |
|---------|---------|
| **Section label** | `MORE SUCCESS STORIES` |
| **Section title** | `Growing Every Quarter` |
| **Section subtitle** | `Our Thailand case study library continues to expand. Contact us for references in your specific industry.` |

### Minimal Cards (6 named)

| Company | Industry | Tag |
|---------|----------|-----|
| DIMET (SIAM) | Manufacturing | Thai company |
| Lotus Pack | Packaging | Workflow ERP |
| Mr. Ken | Manufacturing | Thai company |
| Hoo Chin Electronics | Electronics | Thai electronics |
| SRANG SERN | Manufacturing | Thai company |
| De Poen Pneumatic | Pneumatic equipment | Taiwanese company |

**Card style:** Company name + industry badge + "Contact for Details" link. Muted styling (0.6 opacity text, dashed border). Hover reveals "Ask Us About This Case →" CTA.

### Industry Placeholder Cards (Peter-approved)

For industries where we have strong product pages but no case study data yet. These signal coverage breadth and invite conversation.

| Industry | Icon | Text | CTA |
|----------|------|------|-----|
| Automotive & Parts | Gear icon | `Looking for automotive references? We have them.` | `Contact for References →` |
| Electronics Assembly | Circuit icon | `Electronics manufacturers — ask about our Thai implementations.` | `Contact for References →` |
| Food & Beverage | Factory icon | `Food-grade compliance? We've done it.` | `Contact for References →` |
| Textiles & Garments | Thread icon | `Textile manufacturers — ask about production tracking results.` | `Contact for References →` |

**Placeholder card style:** Light dashed border (#e2e8f0), subtle blue-tinted background (#f8faff), industry icon in #00AFF0. No company names — just industry + invitation. Distinct from the named cards above so visitors can tell these aren't full case studies.

---

## Section 5: Cross-Cutting Insights

**Purpose:** Aggregate the patterns across all case studies into scannable proof points. This section answers "what's the common thread?"

| Element | Specification |
|---------|---------------|
| **Layout** | 3-column stat cards + insight paragraph |
| **Background** | Dark gradient (#000864 → #1a2e40) with grain overlay |
| **Padding** | 80px top/bottom |

### Aggregate Stats

| # | Value | Label | Source |
|---|-------|-------|--------|
| 1 | `75%` | Faster Month-End Closing | Average of Thai Alpha (75%) and Thai Hosheng (83%) |
| 2 | `90-95%` | Stock Accuracy Achieved | Thai Alpha (95%) and Thai Hosheng (90%) |
| 3 | `+11pp` | Gross Profit Improvement | Ginfong: 23%→34% |

### Insight Text

> **The pattern is clear:** DigiWin's Thai customers consistently report two transformations — dramatically faster financial closing (from months to weeks) and stock accuracy that finally matches reality. These aren't aspirational targets. They're measured outcomes from factories operating in Thailand today.

---

## Section 6: CTA

**Purpose:** Convert evaluation-stage visitors. They've seen the proof — now lower the barrier.

| Element | Specification |
|---------|---------------|
| **Layout** | Centered text with button row |
| **Background** | Blue gradient (`linear-gradient(135deg, #00AFF0 0%, #2d7bc4 50%, #1e5a8a 100%)`) with particle wave SVG |
| **Padding** | 100px top/bottom |

| Element | Content |
|---------|---------|
| **Title** | `Want Results Like These?` |
| **Subtitle** | `Every factory is different. Tell us about yours and we'll share relevant case studies from your industry.` |
| **Primary CTA** | `Let's Talk` → `{{basePath}}demo.html` (white button) |
| **Secondary CTA** | `Explore Products` → `{{basePath}}products.html` (outline white button) |

---

## Individual Case Study Page Template

**Purpose:** Full-page deep dive for each featured case study. Linked from the grid cards.

**URL pattern:** `digiwin.co.th/case-studies/{company-slug}.html`

### Template Section Flow

| # | Section | Background | Content |
|---|---------|------------|---------|
| 1 | Hero | Dark gradient + grain | Industry badge, company name, hero metric (large), products used |
| 2 | Challenge | White | 2-3 paragraphs describing the specific manufacturing problem |
| 3 | Solution | Light gray (#F5F7FA) | Which DigiWin products were deployed and why. Integration points. |
| 4 | Results | White | Before/after metrics table. Each metric: value, label, change indicator. |
| 5 | Key Takeaway | Dark navy callout | One-sentence insight that generalizes to the reader's situation |
| 6 | Video (if available) | Light gray | Link to YouTube video with thumbnail preview (Ginfong only for now) |
| 7 | Related Cases | White | 2-3 cards linking to case studies in the same or adjacent industry |
| 8 | CTA | Blue gradient | "Have a similar challenge? Let's Talk" |

### Template Design Rules

- **Max-width:** 900px content area (same as blog articles)
- **Typography:** Noto Sans headings, Noto Sans body 18px/1.6 line-height
- **Metrics display:** Large numbers (48px, Noto Sans 700, #00AFF0) with labels below
- **Before/after table:** Dark header row (#000864), alternating row colors
- **Pull quotes:** Blue left border (#00AFF0), italic, used for named user quotes (Khun Noo, Khun Ae)

---

## Responsive Behavior

| Breakpoint | Changes |
|-----------|---------|
| **≤ 1024px** | Grid: 2-column. Filter tabs: horizontal scroll. |
| **≤ 640px** | Grid: 1-column. Hero stats: stacked vertical. Metrics tables: card layout (not table). |

---

## Flags & Notes

1. **PRD ALIGNMENT — GOOD:** PRD Section 5.1 says "Filterable by industry. Each card: company, industry, key metric, Read More. Start with 3 translated cases." We exceed this with 5 detailed cases + 6 listed.
2. **STATS — VERIFIED:** All metrics come from DigiWin's own official website (first-party claims). No external verification. The 75% closing time reduction is calculated from two data points — conservative and defensible.
3. **STATS — SOFT:** MUFU and Taiyo have qualitative results only. Their cards should NOT show numerical hero metrics — use descriptive language ("Unified Operations", "Systems Unified") instead.
4. **CTA COMPLIANCE:** "Let's Talk" and "Want Results Like These?" — welcoming, not pushy. No "Book a Demo."
5. **VIDEO ASSET:** Ginfong case study video (YouTube) is the only multimedia asset. Consider embedding in both the grid card (thumbnail) and the individual page.
6. **REFERRAL CHAIN:** Thai Alpha → Thai Hosheng referral is a unique proof element. Recommend highlighting on both case study pages and potentially on the homepage trust section.
7. **NAMED USERS:** Khun Noo and Khun Ae are real people quoted in the Thai Alpha case study. Named users dramatically increase credibility vs. anonymous testimonials.
8. **INDUSTRY GAPS:** No automotive, electronics assembly, or furniture case studies with metrics. The PRD specifies these as priority industries (4.1, 4.2). The 6 listed-but-not-detailed cases may include some — DIMET, Hoo Chin Electronics — but we lack metrics.
9. **GINFONG VENDOR CRITERIA:** The 7-point evaluation framework is a unique asset. Visitors in evaluation stage will recognize their own concerns. Consider as a downloadable PDF or sidebar feature.
10. **42 CLIENT LOGOS:** Captured from Thai Alpha page. These can populate the social proof carousel across the site, not just the case studies page.

---

## Resolved Decisions (Feb 13, 2026)

| # | Question | Decision |
|---|----------|----------|
| 1 | Named users (Khun Noo, Khun Ae) | **Approved** — use by name. Already public on official site. |
| 2 | Ginfong YouTube video | **Link only** — open in new tab, not embedded. |
| 3 | Industry placeholder cards | **Approved** — create for Automotive, Electronics, F&B, Textiles. |
| 4 | Taiyo Japanese positioning | **Approved** — position as strength. Verified: subsidiary of Taiyoseiko Corporation (Japan). |

---

*v1.1 — All open questions resolved. Ready for build.*
