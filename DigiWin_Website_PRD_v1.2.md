# DigiWin Thailand Website â€” Product Requirements Document

**Version:** 1.5
**Last Updated:** February 11, 2026
**Author:** Peter (Head of Distributor) + Claude (AI Operating System)
**Status:** Draft â€" Under Review

---

## 1. Project Overview

DigiWin Thailand (digiwin.co.th) needs a complete website redesign to serve two distinct audiences: Thai manufacturing companies seeking ERP solutions and potential distribution partners evaluating the DigiWin partner program.

### 1.1 Business Context

DigiWin has served Taiwanese and Chinese companies in Thailand since 2017. The next growth phase requires capturing the Thai local market through distributors â€” ERP implementers, accounting firms, and IT consultancies who resell DigiWin's manufacturing software to Thai-owned factories.

The website must function as both a **lead generation engine** for factory buyers and a **recruitment platform** for distributor prospects. These audiences have different pain points, different buying journeys, and different conversion actions.

### 1.2 Design Reference

SYSPRO.com serves as the primary design and persuasion reference. Key patterns to adopt:

- Bold, industry-specific hero sections with strong manufacturing imagery
- Social proof through client logos immediately after hero
- Capability pillars presented as icon + headline + one-liner (not paragraphs)
- Industry vertical selector with tabbed/accordion UI showing relevant imagery per vertical
- Differentiator section ("Only with DigiWin") with 3 unique selling points
- Persistent "Let's Talk" / "Contact Us" CTA in header and as page closer
- Clean, modern aesthetic: dark hero sections, bright accent colors, plenty of whitespace

### 1.3 Key Differentiator

Unlike SYSPRO which serves only end-users, DigiWin Thailand's website must serve a dual audience: factory operators AND distributor prospects. The homepage splits traffic; the Partner Program path (2.x) is entirely separate from the Products path (3.x). This dual-audience architecture is the defining structural decision of this project.

**BOI Compliance as Competitive Moat:** DigiWin's production-order-based material reconciliation is the only solution that passes BOI audit scrutiny. Competitors (Kingdee, Yonyou, SAP) rely on theoretical BOM calculations that create gaps between imported materials and actual production consumption â€" gaps that result in supplementary taxes. Proven: Jin Hai client reduced 10M+ THB/year in supplementary taxes to zero.

### 1.4 Competitive Landscape (Thailand 2026)

- **Kingdee:** ~20 staff, expanding but no production-level BOI reconciliation
- **Yonyou:** ~20 staff, Vietnam-first strategy, same BOI weakness
- **SAP:** Established but expensive; ECC end-of-life 2027 creates migration window; no co-product accounting, no dual units, weak Thai localization
- **Odoo:** SEO-dominant, low distributor margins (2-5% real), BOM/WO module only released Nov 2025 â€" implementers can't deploy yet

### 1.5 Product Naming Clarification

- **iGP** is the current branded name for what was previously called **WorkFlow ERP**. All internal transcripts reference "WorkFlow ERP"; marketing materials use "iGP."
- On the website: use **iGP** in navigation, product cards, and headers. Add "(WorkFlow ERP)" parenthetical on first detailed mention in product pages and blog articles for audiences familiar with the legacy name.
- **T100** is the flagship enterprise ERP â€" no naming ambiguity.

### 1.6 Voice & Tone

Expert, confident, manufacturing-specific. Never generic. Always grounded in concrete numbers: 44 years, 50,000+ clients, 100+ Thai implementations. The tone says "we've done this thousands of times" without arrogance.

---

## 2. Persuasion Framework (Rewritten in v1.2)

Every page follows a persuasion architecture, but the architecture adapts based on **who is reading** and **where they are in their buying journey**. This section defines the principles; the separate **Persuasion Playbook** (Layer 2 document) provides the full copywriting guide.

### 2.1 Dual-Audience Persuasion Tracks

The website serves two audiences with fundamentally different emotional arcs:

**Track A â€” Factory Operators (End-Users)**

| Stage | Emotion | Page Role | Proof Type |
|-------|---------|-----------|------------|
| Awareness | Frustration with status quo (Excel chaos, ghost inventory, missed shipments) | Home, Industry Hub | Stats: "44 years, 50,000+ clients" |
| Consideration | Hope that a manufacturing-specific solution exists | Product pages, Industry verticals | Case studies with measurable outcomes |
| Evaluation | Fear of implementation failure, production disruption, vendor lock-in | Product detail pages, About Us | Testimonials, implementation timeline guarantees, "grows with you" narrative |
| Decision | Confidence to act | CTA moments across all pages | ROI scenarios, free assessment offer, local team proof |

**Track B â€” Distributor Prospects (Partners)**

| Stage | Emotion | Page Role | Proof Type |
|-------|---------|-----------|------------|
| Awareness | Dissatisfaction with current business model (margin compression, burnout) | Partner Program Hub (2.0) | Pain-point naming: "The Man-Day Trap" |
| Consideration | Curiosity about an alternative model | Business Model Crisis (2.1), Solution Stack (2.2) | Product portfolio depth, cross-sell visual, "reverse cut" strategy |
| Evaluation | Skepticism about economics and support | Partner Economics (2.3) | Revenue scenarios (Year 1-2-3), margin comparisons, 4-stage maturity path |
| Decision | Confidence that DigiWin will protect their investment | Final CTAs across 2.x pages | Territory protection, zero channel conflict, implementation support guarantees |

### 2.2 Page-Level Persuasion Anatomy

Not every page uses every element. The framework provides a menu, not a mandate:

| Element | Purpose | Used On |
|---------|---------|---------|
| **Pain Naming** | Articulate the problem the visitor already feels but hasn't verbalized | Hub pages (Home, 2.0, 3.0, 4.0) |
| **Social Proof Bar** | Immediate credibility via logos, stats, or stock code | All hub pages, About Us |
| **Value Proposition** | "Here's what changes if you work with us" | Every page |
| **Proof Escalation** | Stats â†’ Case Study â†’ Testimonial â†’ ROI Calculator (escalates as visitor goes deeper) | Across the full journey |
| **Objection Preemption** | Name and neutralize the fear before the visitor raises it | Leaf pages, especially 2.1, 2.3 |
| **Bridge CTA** | Move visitor to the next page in sequence, not just "Contact Us" | Every page except final conversion pages |
| **Final CTA** | The conversion action: demo request, discovery call, PDF download | Bottom of every page |

### 2.3 Manufacturing ERP Fear Inventory

These are the unspoken objections both audiences carry. The Persuasion Playbook maps each to specific pages and neutralization strategies:

**Factory Operator Fears:**
1. "Implementation will disrupt production" â†’ Address with: phased rollout, parallel run, local support team
2. "We tried ERP before and it failed" â†’ Address with: manufacturing-specific vs. generic distinction, case studies from similar factories
3. "We'll be locked into a vendor" â†’ Address with: "grows with you" product ladder, open integration architecture
4. "My team can't learn a new system" â†’ Address with: Thai-language support, bilingual team, training program
5. "It's too expensive for our size" â†' Address with: iGP for SME (not enterprise pricing), ROI within 12 months
6. "BOI compliance is handled by our accountant" â†' Address with: production-order-level reconciliation vs. theoretical BOM; Jin Hai case study (10M THB â†' zero)
7. "We already have Kingdee/Yonyou/SAP" â†' Address with: specific technical gaps (co-product, LRP, dual units, AMRP) without naming competitors on Track A pages

**Distributor Prospect Fears:**
1. "DigiWin will compete with me for clients" â†’ Address with: zero channel conflict guarantee, territory protection
2. "The product is too complex for my team to implement" â†’ Address with: 4-stage maturity path (Filter â†’ Empower â†’ Pilot â†’ Independent), DigiWin co-implementation support
3. "My existing clients won't switch from SAP/Oracle" â†’ Address with: "reverse cut" MES entry strategy, no rip-and-replace needed
4. "The margins won't be better than what I have now" â†’ Address with: Partner Economics page, concrete revenue scenarios
5. "It's a Taiwanese company â€” will they understand the Thai market?" â†’ Address with: 50+ Thai staff, 60%+ bilingual, 100+ Thai implementations, 8 years in-country

### 2.4 Relationship to Persuasion Playbook

This section defines the **what** and **why** of persuasion. The separate **Persuasion Playbook** (Layer 2) defines the **how** â€” specific copywriting patterns, tone calibration per audience, objection-handling scripts, and proof formatting guidelines. The Playbook is the copywriter's bible; this PRD section is the strategist's blueprint.

---

## 3. Site Architecture

The site is organized into 5 main sections. Hub pages aggregate and route; leaf pages convert.

```
1.0 Home (Traffic Routing Hub)
â”œâ”€â”€ 2.0 Partner Program (Profit Reframing Hub)
â”‚   â”œâ”€â”€ 2.1 The Business Model Crisis
â”‚   â”œâ”€â”€ 2.2 The Solution Stack (Product Portfolio for Partners)
â”‚   â”‚   â”œâ”€â”€ 2.2.1 T100: Tier-1 ERP Alternative
â”‚   â”‚   â”œâ”€â”€ 2.2.2 iGP: Revenue Workhorse
â”‚   â”‚   â””â”€â”€ 2.2.3 AIoT & MES: Retention Moat
â”‚   â””â”€â”€ 2.3 Partner Economics
â”œâ”€â”€ 3.0 Products (End-User Hub)
â”‚   â”œâ”€â”€ 3.1 ERP Core: T100 & iGP
â”‚   â”œâ”€â”€ 3.2 MES: sMES & SFT
â”‚   â””â”€â”€ 3.3 WMS: sFLS
â”œâ”€â”€ 4.0 Industries (Vertical Validation Hub)
â”‚   â”œâ”€â”€ 4.1 Automotive Parts
â”‚   â”œâ”€â”€ 4.2 Electronics Assembly
â”‚   â””â”€â”€ 4.3 Metal & Plastics Processing
â””â”€â”€ 5.0 Resources & Company
    â”œâ”€â”€ 5.1 Case Studies
    â”œâ”€â”€ 5.2 About Us
    â""â"€â"€ 5.3 ESG & Net Zero
6.0 News & Events
    └── 6.1 Event Detail Page (Template — reused for all event types)
7.0 Blog / Knowledge Base
    â""â"€â"€ Article Template
```

Total: 23 pages (5 hubs + 15 leaves + 3 content marketing). About Us is a comprehensive multi-section page.

Priority: Partner Program path (2.x) first, then Home (1.0), then Products (3.x), Industries (4.x), Resources (5.x), then Content Marketing (6.0, 7.0).

---

## 4. Page Specifications

Each page spec defines the audience, objective, section flow, and primary CTA.

### 1.0 Home (Traffic Routing Hub)

**Audience:** Both â€” factory operators and distributor prospects
**Objective:** Segment and route within 5 seconds

#### Section Flow

**Section 1: Hero â€” Split Screen**
Purpose: Immediately segment the two audiences

- Left panel: "Smarter Manufacturing Starts Here" â€” targets factory operators
- Right panel: "Grow Your Consulting Business" â€” targets distributor prospects
- Each side has its own CTA button leading to respective hub page
- Background: manufacturing imagery (production line, dashboard screens)

**Section 2: Social Proof â€” Logo Bar**
Purpose: Build credibility for both audiences

- Scrolling logo carousel of existing clients
- Headline: "Trusted by 50,000+ Manufacturers Worldwide"

**Section 3: Quick Value Props â€” Icon Grid**
Purpose: Show breadth of capabilities at a glance

- 4 pillars: ERP (44 years), MES (real-time), WMS (zero ghost inventory), AIoT (smart factory)
- Each: icon + bold headline + one-line description
- Link each to its respective product page

**Section 4: Industry Selector**
Purpose: Let visitors self-identify by vertical

- Tabbed or accordion UI (SYSPRO pattern)
- 3 industries: Automotive, Electronics, Metal & Plastics
- Each tab: relevant image + 2-line description + "Learn More"

**Section 5: DigiWin Difference**
Purpose: Why choose DigiWin

- 3 differentiators: Manufacturing-only (44 years), Grows with you (Workflow â†’ T100 â†’ MES â†’ AIoT), Local team (50+ staff)

**Section 6: Final CTA Banner**
Purpose: Convert interested visitors

- "Ready to See What DigiWin Can Do?"
- Two buttons: "Let's Talk" + "Become a Partner"

**Notes:** Must load fast. No heavy animations. Route within 5 seconds.

---

### 2.0 Partner Program (Profit Reframing Hub)

**Audience:** Distributor prospects â€” ERP implementers, accounting firms, IT consultancies
**Objective:** Reframe their business model problem and position DigiWin as the solution

#### Section Flow

**Section 1: Hero â€” Provocative Headline**
Purpose: Disrupt complacency

- Headline: "Stop Selling Man-Days. Start Selling Manufacturing Outcomes."
- Subhead: "Partner with the ERP company that's been manufacturing-only for 44 years."
- CTA: "Schedule a Discovery Call"

**Section 2: Pain Point Trio**
Purpose: Name the 3 problems distributors face

- Card 1: "Margin Compression" â€” SAP/Oracle maintenance fees eating profit
- Card 2: "Consultant Burnout" â€” Best people exhausted from project billing
- Card 3: "Product Ceiling" â€” Clients outgrow your solution, they leave
- Each links to Page 2.1

**Section 3: The DigiWin Partner Model**
Purpose: Present the alternative

- "From Man-Days to Recurring Revenue"
- Visual: product growth ladder (iGP â†’ T100 â†’ MES â†’ AIoT â†’ WMS)
- Links to Page 2.2

**Section 4: Partner Benefits Grid**
Purpose: Concrete value exchange

- 4 benefits: Margin Protection, Zero Channel Conflict, Implementation Support, Training & Certification
- Link to Page 2.3

**Section 5: Social Proof for Partners**
Purpose: Show this model works

- Partner testimonial or: "50,000+ clients served through partner network"
- Stock code 300378 as stability proof

**Section 6: Final CTA**
Purpose: Convert

- "Schedule a 30-Minute Discovery Call"
- Secondary: "Download Partner Overview PDF"

**Notes:** MOST IMPORTANT PAGE. Every element answers: "What's in it for my business?"

---

### 2.1 The Business Model Crisis

**Audience:** Distributor prospects deep in the awareness/consideration stage
**Objective:** Deepen the pain, then pivot to possibility

#### Section Flow

**Section 1: Hero**
Purpose: Hook with truth

- "The Man-Day Trap: Why ERP Consultancies Hit a Growth Ceiling"
- "You're billing hours. Your competitors are building recurring revenue."

**Section 2: The 3 Profit Killers (Expanded)**
Purpose: Detailed breakdown

- A: Margin Erosion â€” maintenance fees shrink implementation margins YoY
- B: Talent Drain â€” best consultants leave from project exhaustion
- C: Product Ceiling â€” clients outgrow, leave entirely (no upsell path)

**Section 3: The Alternative Model**
Purpose: Pivot to possibility

- Side-by-side: Man-Day model vs. Product-Led model
- Metrics: revenue per consultant, client LTV, scalability

**Section 4: Bridge CTA**
Purpose: Lead to solution

- "See How DigiWin's Product Suite Changes the Math" â†’ 2.2

**Notes:** Empathetic tone, not aggressive.

---

### 2.2 The Solution Stack (Product Portfolio for Partners)

**Audience:** Distributor prospects evaluating what they'd actually sell
**Objective:** Show the portfolio depth and cross-sell opportunity

#### Section Flow

**Section 1: Hero**
Purpose: Portfolio overview

- "Your Complete Manufacturing Product Portfolio"
- Product hierarchy diagram showing growth path

**Section 2: Product Cards (3 tiers)**
Purpose: Partner resale value

- T100 â€” "Tier-1 Killer" for enterprise (links 2.2.1)
- iGP â€” "Revenue Workhorse" for SME (links 2.2.2)
- AIoT & MES â€” "Retention Moat" for upselling (links 2.2.3)
- Each: target segment, deal size range, timeline

**Section 3: Cross-Sell Visual**
Purpose: Land-and-expand

- MES entry â†’ ERP expansion â†’ WMS + AIoT (the "reverse cut" visualized)

**Section 4: CTA**
Purpose: Convert

- "Explore Each Product" or "Discuss Your Portfolio"

**Notes:** Partner-framed: "what you can sell" not "what it does."

---

### 2.2.1 T100: Tier-1 ERP Alternative

**Audience:** Distributor prospects evaluating enterprise deals
**Objective:** Position T100 as the SAP/Oracle alternative they can profitably sell

#### Section Flow

**Section 1: Hero**
Purpose: Position vs SAP/Oracle

- "Enterprise ERP Without the Enterprise Price Tag"

**Section 2: Key Capabilities**
Purpose: What partners can sell

- Multi-entity, consolidated financials, multi-currency, BOM, MRP

**Section 3: Partner Opportunity**
Purpose: Revenue potential

- Deal size, timeline, margin range. Ideal: group companies 200+ employees

**Section 4: CTA**
Purpose: Convert

- "Add T100 to Your Portfolio"

---

### 2.2.2 iGP: Revenue Workhorse

**Audience:** Distributor prospects looking for volume
**Objective:** Show iGP as the high-throughput, high-volume revenue engine

#### Section Flow

**Section 1: Hero**
Purpose: Volume opportunity

- "The ERP That Pays Your Bills Every Month"

**Section 2: Key Capabilities**
Purpose: Core SME ERP

- Workflow, inventory, purchasing, production, financials. Factories 20-200 employees

**Section 3: Partner Opportunity**
Purpose: Volume math

- Fastest implementation = highest throughput. Market: thousands of Thai SME manufacturers

**Section 4: CTA**
Purpose: Convert

- "Start Selling iGP"

---

### 2.2.3 AIoT & MES: Retention Moat

**Audience:** Distributor prospects interested in the "reverse cut" entry strategy
**Objective:** Show MES/AIoT as both the entry wedge and the retention lock

#### Section Flow

**Section 1: Hero**
Purpose: Upsell narrative

- "The Upgrade That Makes Clients Stay Forever"

**Section 2: Capabilities**
Purpose: MES + AIoT

- Real-time monitoring, OEE, machine connectivity. "Reverse cut" entry point

**Section 3: Partner Opportunity**
Purpose: Client retention

- Enter through MES first (lower resistance), expand to ERP. Recurring revenue

**Section 4: CTA**
Purpose: Convert

- "Explore the MES Entry Strategy"

**Notes:** Supports the "reverse cut" strategy.

---

### 2.3 Partner Economics

**Audience:** Distributor prospects in evaluation stage â€” they want numbers
**Objective:** Prove the financial case with concrete scenarios

#### Section Flow

**Section 1: Hero**
Purpose: Numbers-first

- "The Math Behind a DigiWin Partnership"

**Section 2: Profit Model**
Purpose: Show the money

- Margin: implementation + license + recurring
- Comparison vs SAP/Oracle partner margins
- Revenue scenario: Year 1, 2, 3

**Section 3: Protection Guarantees**
Purpose: Remove risk

- Territory protection, pre-sales support, certification included

**Section 4: 4-Stage Maturity Path**
Purpose: Show journey

- Filter â†’ Empower â†’ Pilot â†’ Independent

**Section 5: Final CTA**
Purpose: The ask

- "Let's Talk Numbers" + "Download Partner Economics Brief"

**Notes:** Pricing: directional ranges only. Exact pricing requires HQ approval.

---

### 3.0 Products (End-User Hub)

**Audience:** Factory operators â€” production managers, plant managers, CFOs
**Objective:** Route to the right product based on their pain

#### Section Flow

**Section 1: Hero**
Purpose: Manufacturing authority

- "Manufacturing Software by Manufacturing Experts"
- "44 years. 50,000+ factories. One focus."

**Section 2: Product Navigation Cards**
Purpose: Route to solutions

- ERP Core â€” "The brain"
- MES â€” "Eyes on production"
- WMS â€” "Every item accounted for"

**Section 3: Integration Visual**
Purpose: Connected ecosystem

- ERP â†” MES â†” WMS â†” AIoT diagram

**Section 4: CTA**
Purpose: Convert

- "Not Sure? Request a Free Assessment"

**Notes:** End-user-framed. Outcomes, not features.

---

### 3.1 ERP Core: T100 & iGP

**Audience:** Factory operators evaluating ERP options
**Objective:** Show the right ERP for their size

#### Section Flow

**Section 1: Hero**
Purpose: Financial control + visibility

- T100 enterprise, iGP SME â€” clear segmentation

**Section 2: Features as Problemâ†’Solution**
Purpose: Key capabilities

- Compliance, BOM, MRP, scheduling, multi-entity

**Section 3: Case Study + CTA**
Purpose: Proof

- One measurable case study. "Let's Talk About ERP"

---

### 3.2 MES: sMES & SFT

**Audience:** Factory operators struggling with production visibility
**Objective:** "Stop guessing, start seeing"

#### Section Flow

**Section 1: Hero**
Purpose: Production pain

- "Stop Guessing. Start Seeing."

**Section 2: Capabilities + Before/After**
Purpose: Visual impact

- Real-time monitoring, OEE, work orders. Before/after visual

**Section 3: CTA**
Purpose: Convert

- "See MES in Action"

---

### 3.3 WMS: sFLS

**Audience:** Factory operators with inventory accuracy problems
**Objective:** Zero ghost inventory

#### Section Flow

**Section 1: Hero**
Purpose: Inventory accuracy

- "Every Item. Every Location. Every Time."

**Section 2: Capabilities**
Purpose: WMS specifics

- Barcode/RFID, bin management, FIFO, automated picking

**Section 3: CTA**
Purpose: Convert

- "See WMS in Action"

---

### 4.0 Industries (Vertical Validation Hub)

**Audience:** Factory operators who want proof DigiWin knows their industry
**Objective:** Self-identification and industry-specific credibility

#### Section Flow

**Section 1: Hero**
Purpose: Industry authority

- "Built for Your Industry. Proven by Experience."

**Section 2: Industry Selector (SYSPRO-style tabs)**
Purpose: Self-identification

- Automotive, Electronics, Metal & Plastics. Each: image + 3 pain points + link

**Section 3: Cross-Industry Capabilities**
Purpose: Universal value

- Traceability, dual-unit conversion, compliance

**Section 4: CTA**
Purpose: Convert

- "Tell Us Your Industry"

---

### 4.1 Automotive Parts

**Audience:** Automotive parts manufacturers
**Objective:** Prove DigiWin understands JIT, traceability, EDI

#### Section Flow

**Section 1: Hero + Pain Points**
Purpose: Automotive-specific

- JIT, traceability, EDI, mold management

**Section 2: Solution Mapping + Case Study**
Purpose: Proof

- Each pain â†’ DigiWin capability. Automotive case study

**Section 3: CTA**
Purpose: Convert

- "See DigiWin in an Automotive Factory"

---

### 4.2 Electronics Assembly

**Audience:** Electronics manufacturers
**Objective:** Prove DigiWin handles component-level complexity

#### Section Flow

**Section 1: Hero + Pain Points + Solutions**
Purpose: Electronics-specific

- Component traceability, yield calculation, SMT integration

**Section 2: Case Study + CTA**
Purpose: Proof

- Electronics case study. "See DigiWin in Electronics"

---

### 4.3 Metal & Plastics Processing

**Audience:** Metal stamping, injection molding, extrusion manufacturers
**Objective:** Prove DigiWin handles process manufacturing complexity

#### Section Flow

**Section 1: Hero + Pain Points + Solutions**
Purpose: Processing-specific

- Dual-unit (kgâ†’PCS), scrap/waste, material yield

**Section 2: Case Study + CTA**
Purpose: Proof

- Metal/plastics case study. "See DigiWin in Processing"

---

### 5.0 Resources & Company

**Audience:** Both â€” anyone doing due diligence
**Objective:** Route to supporting content

#### Section Flow

**Section 1: Resource Navigation**
Purpose: Route to content types

- Card 1: Case Studies â€” "Real results from real factories"
- Card 2: About Us â€” "44 years of manufacturing DNA"
- Card 3: ESG & Net Zero â€” "Sustainability built into every solution"

**Notes:** Simple navigation page.

---

### 5.1 Case Studies

**Audience:** Both audiences during evaluation stage
**Objective:** Provide measurable proof

#### Section Flow

**Section 1: Case Study Grid**
Purpose: Showcase successes

- Filterable by industry. Each card: company, industry, key metric, "Read More"
- Start with 3 translated cases (Plastics, Metal, Automotive)

**Notes:** Expand case study library over time.

---

### 5.2 About Us (Comprehensive â€” Expanded in v1.1)

**Audience:** Both â€” distributor owners doing due diligence, factory CFOs checking vendor stability, procurement teams verifying credentials
**Objective:** Tell the complete DigiWin story â€” trust through depth

#### Section Flow

**Section 1: Hero â€” Company Identity**
Purpose: Immediate brand authority (matches SYSPRO's "Industry Expertise You Can Count On" pattern)

- Headline: "DigiWin: 44 Years of Manufacturing Intelligence"
- Subhead: "From a Taiwanese startup in 1982 to the trusted ERP partner for 50,000+ manufacturers across Asia."
- Background: DigiWin HQ or major factory floor implementation photo
- CTA: "Explore Our Story" (scroll anchor to next section)

**Section 2: Our Mission â€” "We Power Manufacturing's Digital Future"**
Purpose: Company purpose statement (matches SYSPRO's "We Move Industry Forward" section)

- 2-3 paragraphs of narrative prose â€” NOT bullet points
- Core message: DigiWin exists to help manufacturers see clearly, act decisively, and grow confidently
- Mention the name origin: é¼Žæ–° (DÇng XÄ«n) = "to innovate, to renew" â€” this is the DNA
- Left side: mission text. Right side: hero image of DigiWin team or implementation

**Section 3: The DigiWin Timeline â€" 44 Years of Milestones**
Purpose: Visual history that builds trust through longevity

- **Layout: Horizontal Scroll Rail** â€" a single horizontal line runs left-to-right (the "rail"). Year-dot markers sit on the line. Milestone cards alternate above and below the rail (odd milestones above, even below), creating a compact zigzag rhythm. The container uses `overflow-x: auto` with `scroll-snap-type: x mandatory` for smooth scrolling. Gradient fade masks at left/right edges hint at scrollability.
- **Industrial metaphor:** The horizontal rail reads like a production line / conveyor belt â€" on-brand for manufacturing.
- **Responsive:** At â‰¤768px, switches to a compact vertical timeline (single column, cards on one side of a vertical line).
- 12 key milestones (each: year, title, 1-2 line description, optional badge):
  - 1982: Founded â€" DigiWin founded in Taiwan by Sun Ai-bin & Gu Feng-yong
  - 1989: First Product â€" First MRPII manufacturing software released
  - 1992: First Award â€" Taiwan Information Month Outstanding Software Package
  - 1995: TIPTOP ERP â€" Asia's first Browser/Server architecture ERP
  - 2001: Taiwan IPO â€" Listed on Taiwan Stock Exchange
  - 2006: China #1 â€" #1 Manufacturing ERP vendor in China
  - 2014: Shenzhen IPO â€" Listed on Shenzhen Stock Exchange (300378.SZ)
  - 2017: Thailand â€" ASEAN expansion accelerates from Bangkok
  - 2020: Foxconn Invests â€" CNY 560M strategic investment from Foxconn FII
  - 2022: Red Dot Award â€" German Red Dot Design Award for Athena Platform
  - 2024: #1 PLM + MES â€" IDC #1 in discrete manufacturing, Indonesia entry
  - 2026: AI Era â€" SUPA AI framework, smart manufacturing intelligence

**Section 4: By the Numbers â€” Stats Banner**
Purpose: Hard credibility metrics (matches SYSPRO's stats pattern)

- Dark background banner with 4-5 large animated counter numbers:
  - 44+ Years in Manufacturing ERP
  - 50,000+ Manufacturing Clients Worldwide
  - 100+ Thai Implementations
  - 50+ Team Members in Thailand
  - 300378: Shenzhen Stock Exchange Listed
- Each number: large font, counter animation on scroll, one-line label beneath

**Section 5: What We Believe â€” Core Values / Philosophy**
Purpose: Cultural identity (matches SYSPRO's "A Community of True Pros" section)

- 3-4 core beliefs presented as bold statement + supporting paragraph:
  - Belief 1: "Manufacturing Is Not Generic" â€” We don't sell to banks, retailers, or hospitals. We are manufacturing-only because the factory floor demands it.
  - Belief 2: "Grow Together, Not Apart" â€” Our product suite (Workflow â†’ T100 â†’ MES â†’ AIoT) means your ERP partner doesn't change as your business scales.
  - Belief 3: "Local Roots, Global Standards" â€” Our Thailand team speaks Thai, understands Thai business culture, and is backed by 44 years of global manufacturing expertise.
  - Belief 4: "Data Should Liberate, Not Complicate" â€” We turn factory chaos (shadow Excel, ghost inventory, disconnected systems) into clear, actionable intelligence.
- Format: alternating left-text/right-image, right-text/left-image (zigzag layout)

**Section 6: Because of DigiWin, You Can...**
Purpose: Outcome-focused benefits (adapts SYSPRO's "Because of Syspro you can..." section)

- Left side: tall factory/warehouse image
- Right side: 5-6 benefit items, each with icon + bold headline + 2-line description:
  - See Your Factory in Real Time â€” MES and AIoT give you live production data, not yesterday's spreadsheet
  - Control Costs Before They Control You â€” Material tracking, scrap reduction, yield optimization across every production run
  - Ship On Time, Every Time â€” Production scheduling and WMS working together to meet customer delivery promises
  - Scale Without Starting Over â€” One ecosystem from 20-person workshop to multi-site enterprise group
  - Meet Compliance Requirements Confidently â€” Full traceability, audit trails, and ESG reporting built into every process
  - Make Decisions with Confidence â€” BI dashboards and analytics that turn raw data into strategic clarity

**Section 7: DigiWin Thailand â€” Our Local Story**
Purpose: Specific Thailand context (unique to DigiWin's dual-market positioning)

- Subsection: "Serving Thailand Since 2017"
- Paragraph on Thailand establishment: entered Thailand in 2017 serving Taiwanese/Chinese manufacturers; formally registered Thai company in 2019 as demand grew
- Team composition: 50+ employees, 60%+ bilingual (Thai + Chinese), deep understanding of both Thai business culture and manufacturing practices
- The evolution: from direct sales to Taiwanese/Chinese clients â†’ now opening the Thai local market through distributors
- Photo: DigiWin Thailand office or team photo
- Optional: Map showing Thailand office location (Bangkok) connected to Taiwan HQ

**Section 8: Global Presence â€” Our Reach Across Asia**
Purpose: Scale proof through geography (matches SYSPRO's "Regional Operations Serving 6 Continents")

- Map visual showing DigiWin offices: Taiwan (HQ), China (multiple), Thailand, Vietnam, Malaysia, and other ASEAN locations
- Each pin: office name + brief description (e.g., "Taiwan HQ â€” R&D and product development center")
- Alternatively: a clean list with flag icons if map is too complex for v1

**Section 9: Leadership (Optional for v1)**
Purpose: Human face behind the company

- If photos available: CEO/founder portrait + brief bio
- Thailand team: Head of Distributor, key technical leads
- If no photos available for v1: skip this section and add later
- Note: Coordinate with HQ marketing for approved leadership photos and bios

**Section 10: Awards & Recognition (If Available)**
Purpose: Third-party validation

- Any industry awards, certifications, or analyst mentions
- Shenzhen Stock Exchange listing as a trust signal
- If limited awards available: merge into the Stats Banner section instead

**Section 11: Final CTA â€” Contact Us**
Purpose: Convert visitors who've read this far

- "Ready to Work with a Team That Understands Manufacturing?"
- Two paths: "Let's Talk" (factory buyers) / "Become a Partner" (distributors)
- Contact information: Bangkok office address, phone, email

**Notes:** This page must tell a COMPLETE story. Visitors doing due diligence (distributor owners evaluating us, factory CFOs checking vendor stability, procurement teams) will read this page end-to-end. Depth is intentional.

---

### 5.3 ESG & Net Zero

**Audience:** Factory operators with sustainability mandates
**Objective:** Future-facing credibility

#### Section Flow

**Section 1: ESG Positioning**
Purpose: Future-facing credibility

- Carbon tracking, waste reduction, energy monitoring capabilities
- Connection to Thailand's sustainability regulations

**Notes:** Lower priority. Simple single-section initially.

---

### 6.0 News & Events

**Audience:** Both â€" factory operators seeking learning opportunities, distributor prospects evaluating DigiWin's market presence
**Objective:** Drive event registrations and demonstrate active market engagement

#### Section Flow

| Section | Content | Module |
|---------|---------|--------|
| Hero | Badge: "NEWS & EVENTS" / Title: "Where Manufacturing Intelligence Meets Action" / Subtitle: "Seminars, workshops, factory visits, and trade shows â€" where Thai manufacturers discover what's possible." | Full-width dark gradient |
| Featured Event | Large card: event image, type badge, title, date/time/location, description, CTA button | 2-column (60/40) |
| Upcoming Events Grid | 3-column event cards, color-coded by type: Seminar (#3798E4), Workshop (#22C55E), Factory Visit (#F59E0B), Trade Show (#8B5CF6) | Card grid |
| Event Series | "Manufacturing Competitiveness Series" â€" themed monthly campaign: BOI Compliance â†' Production Transparency â†' Cash Flow Management â†' SAP Migration Options | Timeline/progression |
| Past Events Archive | Filterable grid with type tabs | Tab filter + card grid |
| CTA | "Don't Miss the Next Event" â€" email subscribe + "Let's Talk" | CTA banner |

**Notes:** Events are a primary lead generation channel for Thai market. Color-coded event types help visitors quickly identify relevant opportunities.

---

### 6.1 Event Detail Page (Template)

**Audience:** Track A (Factory Operators) — attendees seeking specific event information before committing
**Objective:** Convert event interest into registration by providing event-specific context, outcomes, and logistics

**Template Design:** One reusable template serves all four event types. Each type applies a CSS accent color:
- Seminar: #3798E4 (blue)
- Workshop: #22C55E (green)
- Factory Visit: #F59E0B (amber)
- Trade Show: #8B5CF6 (purple)

#### Section Flow

| # | Section | Background | Persuasion Purpose |
|---|---------|------------|-------------------|
| 1 | Hero | Dark gradient + grain (event-color accent) | Instant clarity: what, when, where + urgency |
| 2 | The Problem | White | Pain-first: "This is YOUR challenge right now" |
| 3 | What You'll Walk Away With | Light gray (#F5F7FA) | Outcomes > topics. "You'll leave knowing how to..." |
| 4 | Agenda | White | Proves structure + professionalism, not a sales pitch |
| 5 | Who Should Attend | Light gray | Self-selection: reader sees themselves |
| 6 | Proof / Social Signal | White | Past event stats, attendee testimonials, track record |
| 7 | Logistics | Light gray | Remove friction: venue, parking, what to bring |
| 8 | Registration CTA | Dark gradient + grain | Urgency recap + simple action |
| 9 | Related Events | Light gray | Keep them in funnel if this event doesn't fit |

**Key Design Decisions:**
- NO separate FAQ section — address objections inline (per Playbook: "Every unspoken fear addressed within page copy, not FAQ sections")
- Hero includes "Register Now" button AND quick-facts bar (date/time/location/seats) — no scrolling needed to act
- "What You'll Walk Away With" uses outcome language, not agenda language
- "Who Should Attend" uses persona cards for self-selection
- Back link to News & Events hub for navigation continuity

**Notes:** Event pages link from the News hub (6.0). Registration CTA links to demo.html (contact form). One template, unlimited events — each event is a new page built from this template with event-specific content.

---

### 7.0 Blog / Knowledge Base

**Audience:** Both â€" factory operators researching solutions, distributor prospects evaluating DigiWin's expertise
**Objective:** Establish thought leadership, drive organic search traffic, nurture leads with educational content

#### Section Flow

| Section | Content | Module |
|---------|---------|--------|
| Hero | Badge: "INSIGHTS & KNOWLEDGE" / Title: "Manufacturing Intelligence, Shared" / Subtitle: "Technical guides, compliance insights, and real implementation stories from Thailand's manufacturing floor." | Full-width dark gradient |
| Featured Article | Large 2-column card featuring the strongest proof-backed article (BOI compliance first) | 2-column (60/40) |
| Article Grid | 3-column cards with category filter tabs: All / BOI & Compliance / Production Planning / Cost Management / Smart Factory / Industry Insights | Tab filter + card grid |
| Deep Dive Library | Structured list grouped by category for longer technical content | Accordion/list |
| CTA | "Have a Manufacturing Challenge? Let's Talk" | CTA banner |

#### Content Funnel Staging

Every article is mapped to a funnel stage, which determines its CTA strategy and cross-linking behavior:

| Stage | Reader Mindset | Content Goal | CTA Type |
|-------|---------------|--------------|----------|
| TOFU (Awareness) | "I have this problem" | Name the pain, earn trust | Soft: "Read more" â†' related article or product overview |
| MOFU (Consideration) | "I need a system â€" what are my options?" | Show depth, differentiate | Bridge: "See how this works" â†' product/industry page |
| BOFU (Decision) | "Should I talk to DigiWin?" | Provide proof, remove risk | Direct: "Let's Talk" â†' demo.html |

#### Blog-to-Product Linking Rules

1. Every article links to 1-2 product/industry pages within its body (not just bottom CTA)
2. Links placed AFTER educational explanation, never in first 3 paragraphs
3. Maximum 2 product page links per article (avoid feeling promotional)
4. Distinguish educational mentions (inline text link) from CTA moments (highlight box)

#### Category-to-Product Mapping

| Category | Primary Product Page | Secondary |
|----------|---------------------|-----------|
| BOI & Compliance | ERP (T100/iGP) | All industry pages |
| Production Planning | ERP | MES |
| Cost Management | ERP | â€" |
| Smart Factory | MES | AIoT |
| Industry Insights | Products hub | All industry pages |
| Partner Insights (NEW) | â€" | All partner pages |

#### Content Calendar

- Publication frequency: 2 articles/month (bi-weekly)
- Sequencing: alternate between Track A and Track B content
- Priority: fill BOFU gaps and Track B gaps first (aligned with Q2 2026 deadline)

**Notes:** BOI compliance content should be prioritized first â€" it's the strongest proof point and highest-intent search topic for Thai manufacturers.

---

### 7.1 Blog Article Template

**Audience:** Readers of individual blog/knowledge base articles
**Objective:** Deliver expert content with clear structure, then convert to conversation

#### Article Template Specification

| Element | Specification |
|---------|--------------|
| Hero | Compact: dark gradient, category badge, title, author, date, read time |
| Body | Max-width 800px, Lexend headings, Source Sans 3 body 18px/1.8 line-height |
| Pull Quotes | Blue left border (#3798E4), italic, larger font |
| Data Callouts | JetBrains Mono, dark background cards, large numbers |
| Highlight Boxes | Light blue background (#EBF5FF), key takeaways |
| Related Articles | 3-card grid at bottom |
| CTA | Soft: "Have questions about [topic]? Let's Talk" |

**Notes:** Article template should feel premium and focused. No sidebar clutter. Reader's attention stays on content, with a gentle conversion path at the end.

---

## 5. Three-Layer Documentation Model (NEW in v1.2)

This PRD is one of three documents that together drive the website build. Each layer serves a different purpose and changes at a different frequency.

### Layer 1: PRD (This Document)

**Purpose:** Strategy, architecture, design system, page specifications.
**Changes:** Rarely. Updated only when strategic direction shifts, pages are added/removed, or design system evolves.
**Format:** Single markdown artifact, maintained in Claude.
**Audience:** Peter + Claude as shared reference.

### Layer 2: Persuasion Playbook

**Purpose:** Voice guide, tone calibration per audience, objection-handling scripts, proof formatting guidelines, emotional arc templates.
**Changes:** Rarely. Updated when new audience insights emerge or copywriting patterns are refined.
**Format:** Separate markdown artifact.
**Audience:** Claude (as copywriting reference when generating Content Specs).

### Layer 3: Content Specs (Per-Batch)

**Purpose:** Exact production blueprints for each page batch. Contains the precise headlines, body copy, button text, image specifications, and DIVI module mapping that Claude will use to generate JSON.
**Changes:** Per batch. Each batch is a new Content Spec document.
**Format:** Separate markdown artifact per batch.
**Audience:** Peter reviews and approves before JSON generation.

**Example Content Spec entry:**

> **Section 1 Hero**
> - Headline: "Stop Selling Man-Days. Start Selling Manufacturing Outcomes."
> - Font: 48px bold white
> - Background: partner-hero-factory.jpg (1920Ã—800) with #253B50 overlay at 65%
> - CTA Button: "Explore the Partner Program" in #3798E4
> - DIVI Module: Fullwidth Header

### Peter's Day-to-Day Workflow

1. **Claude** generates Content Spec (batch of pages) â†’ presents as artifact
2. **Peter** reviews, edits, approves
3. **Claude** generates DIVI JSON with approved content + stock image URLs
4. **Claude** imports JSON into DIVI via WordPress admin (Claude in Chrome)
5. **Claude** takes screenshot of imported page
6. **Peter** reviews screenshot, requests adjustments
7. **Peter** (post-launch) replaces stock images with custom photography

The PRD and Playbook work silently in the background ensuring consistency across all 20 pages. Peter only interacts with Content Specs and JSON files during production.

---

## 6. Production Workflow (Rewritten in v1.2)

### 6.1 DIVI JSON Import Pipeline

The website is built via **DIVI JSON import**, not manual DIVI Visual Builder construction. This is the critical production method.

**How DIVI JSON works:**
- DIVI allows importing page layouts as JSON files
- JSON encodes: page structure, section layout, module types, text content, styling parameters
- Images are stored as **URL references** (not embedded binary) â€” images must exist in WordPress Media Library before JSON import

**The Pipeline:**

| Step | Who | Action |
|------|-----|--------|
| 1 | Claude | Generates Content Spec (text, image specs, DIVI module mapping) â€” Layer 3 artifact |
| 2 | Peter | Reviews and approves Content Spec |
| 3 | Claude | Generates DIVI JSON with stock image URLs embedded directly |
| 4 | Claude | Imports JSON into DIVI via WordPress admin (Claude in Chrome) |
| 5 | Claude | Takes screenshot of imported page for Peter's visual QA |
| 6 | Peter | Reviews screenshot, requests adjustments if needed |
| 7 | Peter | **Post-launch:** Replaces stock images with custom photography via WordPress Media Library |

**Stock image approach (v1):** Unsplash and Pexels provide direct public CDN URLs (e.g., `https://images.unsplash.com/photo-xxxxx?w=1920&h=800&fit=crop`). These are embedded directly in DIVI JSON â€” no upload step required during the build phase. Peter replaces with custom photography later.

**Browser requirement:** Peter logs into WordPress admin once per session. Claude operates the browser from there â€” navigating to pages, opening DIVI Portability, uploading JSON, and importing. Claude in Chrome handles all browser interactions; Claude Cowork is not suitable for this workflow (it manages local files, not browser-based tools).

**Production note:** For final production launch, stock images should be downloaded and re-hosted in WordPress Media Library to eliminate dependency on external CDNs. This can be done in a single batch after all 20 pages are built.

### 6.2 Validation Test (Batch 0)

Before scaling to all 20 pages, we run a single-page validation test to confirm the pipeline works end-to-end.

**Test page:** 1.0 Home (traffic routing hub â€” tests split-screen hero, logo bar, icon grid, tabs, and dual-CTA patterns that recur across all other pages)

**Validation checklist:**
- [ ] Content Spec accurately represents page design intent
- [ ] SVG icons render correctly in WordPress
- [ ] Stock image URLs (Unsplash/Pexels) load correctly in imported page
- [ ] Claude successfully imports JSON via DIVI Portability (no errors)
- [ ] Text content appears as specified (headings, body, CTAs)
- [ ] Split-screen hero renders correctly (this pattern recurs across other pages)
- [ ] Module types match specification (Fullwidth Header, Blurb, CTA, etc.)
- [ ] Responsive behavior acceptable on mobile (Claude takes mobile-width screenshot)
- [ ] Peter can fine-tune in Visual Builder without breaking structure

**Decision gate:** If validation passes â†’ proceed to Batch 1. If issues found â†’ adjust pipeline before scaling.

### 6.3 Build Order (Priority Sequence)

| Batch | Pages | Focus |
|-------|-------|-------|
| **Batch 0** | 1.0 Home | **Validation test** â€” full pipeline end-to-end |
| **Batch 1** | 2.0 Partner Program Hub | Most important conversion page |
| **Batch 2** | 2.1, 2.2, 2.3 | Complete Partner Program path |
| **Batch 3** | 2.2.1, 2.2.2, 2.2.3 | Partner product detail pages |
| **Batch 4** | 3.0 Products Hub, 3.1, 3.2, 3.3 | End-user product pages |
| **Batch 5** | 4.0, 4.1, 4.2, 4.3 | Industry vertical pages |
| **Batch 6** | 5.0, 5.1, 5.2, 5.3 | Resources and About Us |
| **Batch 7** | 6.0 News & Events, 7.0 Blog | Content marketing |

Total: 22 pages across 8 batches (including validation).

**Global header and footer** are built FIRST, before Batch 0, using DIVI Theme Builder. These persist across all pages automatically.

---

## 7. Design System (Based on digiwin.com.tw)

The Thailand website should feel like a natural extension of DigiWin Taiwan's brand identity while adapting for the Thai local market. All design decisions below are extracted from the live digiwin.com.tw site as of January 2026.

### 7.1 Color Palette (Extracted from digiwin.com.tw)

| Role | Color | Hex | Usage |
|------|-------|-----|-------|
| Primary Blue | DigiWin Blue | #3798E4 | CTA buttons, links, active states, icon accents |
| Dark Navy | Footer/Header Dark | #253B50 | Footer background, hero overlays, dark sections |
| White | Background | #FFFFFF | Page backgrounds, card backgrounds |
| Light Gray | Section Alternate | #F5F7FA | Alternating section backgrounds for visual rhythm |
| Text Dark | Primary Text | #333333 | Body text, headings |
| Text Light | Secondary Text | #666666 | Subheadings, descriptions, meta text |
| Accent Green | Success/Growth | #4CAF50 | Growth indicators, success states (used sparingly) |

### 7.2 Typography

DigiWin Taiwan uses a clean sans-serif system. Thailand site should match:

- Headings: Bold, large (40-48px hero, 32px section heads, 24px sub-heads)
- Body: 16-18px, line-height 1.5-1.6
- Font recommendation: Inter, Noto Sans, or DIVI's default sans-serif
- Thai text: Ensure chosen font has Thai glyph support (Noto Sans Thai is ideal)

### 7.3 Image Strategy

- Hero images: Manufacturing environments (production lines, CNC machines, dashboards)
- Partner pages: Professional/business imagery (meetings, handshakes, offices)
- Industry pages: Industry-specific factory environments
- Source: Unsplash/Pexels initially, upgrade to professional photography later
- All heroes: dark overlay gradient (#253B50 at 60-70% opacity) for text readability
- DigiWin Taiwan uses a mix of stock + custom illustration. Thailand v1 can start with stock.

### 7.4 Responsive Requirements

- Mobile-first: all pages render correctly on phone and tablet
- Hero split-screen (Home) collapses to stacked on mobile
- Industry tabs collapse to accordion on mobile
- CTA buttons: full-width on mobile
- Stats counters: 2x2 grid on mobile instead of 4-column row

### 7.5 Global Header & Footer

Since we're importing page content via DIVI JSON templates, we MUST define a global header and footer that persist across all pages. These are built ONCE in DIVI Theme Builder, NOT included in per-page JSON.

**GLOBAL HEADER**

| Element | Specification |
|---------|---------------|
| Logo | DigiWin logo, left-aligned, links to Home |
| Navigation | Home Â· Products Â· Industries Â· Partners Â· Resources (News & Events, Insights & Knowledge) Â· About Us |
| CTA Button | "Let's Talk" â€" #3798E4 background, white text, right-aligned |
| Language Selector | EN / TH toggle (if bilingual v1) |
| Behavior | Sticky on scroll, white background with subtle shadow |

**GLOBAL FOOTER**

| Element | Specification |
|---------|---------------|
| Background | #253B50 (dark navy) |
| Column 1 | DigiWin logo + one-line tagline + stock code 300378 |
| Column 2 | Quick Links: Products, Industries, Partner Program, About Us |
| Column 3 | Contact: Bangkok office address, phone, email |
| Column 4 | Social media icons (if applicable) |
| Bottom Bar | Â© 2026 DigiWin Thailand. All rights reserved. Â· Privacy Policy Â· Terms |

**CRITICAL:** The global header and footer should be built FIRST, before any page content. This ensures consistent navigation and branding from day one. In DIVI, these are created in Theme Builder â†’ Global Header / Global Footer â€” they are NOT part of per-page JSON imports.

---

## 8. Reader Journey Map & Content Strategy

This section defines how visitors flow through the site â€" from entry to conversion â€" and how content supports that journey.

### 8.1 Entry Points by Channel

| Channel | Typical Entry | Primary Audience |
|---------|--------------|-----------------|
| Organic Search | Blog articles | Track A (factory operators) |
| LinkedIn | TOFU awareness articles, Partner Program pages | Both |
| Referral (accounting firms) | Partner Program pages | Track B (distributors) |
| Direct | Homepage â†' split into Track A/B | Both |
| Events/QR codes | Specific articles matching seminar topic | Track A |

### 8.2 Track A Journey (Factory Operators)

B2B manufacturing ERP requires 5-7+ touches over weeks or months. The blog must support multiple return visits, not just one-and-done.

```
Touch 1: Blog article (problem awareness â€" "I have this problem too")
Touch 2: Related article or product page (deepening â€" "there's a framework for this")
Touch 3: Industry page (validation â€" "they serve my vertical")
Touch 4: Return visit â€" another article or About Us (due diligence)
Touch 5-7: Demo page â€" "Let's Talk" (conversion)
```

### 8.3 Track B Journey (Distributor Prospects)

```
Touch 1: LinkedIn/blog article (market opportunity awareness)
Touch 2: Partner Program hub (business model reframe)
Touch 3: Partner Economics page (the numbers)
Touch 4: Blog articles (validating DigiWin's technical depth)
Touch 5: Discovery call CTA (conversion)
```

### 8.4 Cross-Linking Architecture

Content pages must link to each other bidirectionally to support multi-touch journeys:

| From | To | Link Type |
|------|----|-----------|
| Blog articles | Product pages | Contextual links within article body (after educational content) |
| Blog articles | Industry pages | When industry-specific scenarios are mentioned |
| Blog articles | Partner pages | When distributor angle is present in the content |
| Product pages | Blog articles | "Related Insights" section at bottom |
| Industry pages | Blog articles | "Related Insights" section at bottom |
| Homepage | Featured blog article | Keep fresh â€" rotate monthly |

### 8.5 SEO Content Framework

#### Topic Selection

Every article targets a search intent. The portfolio should maintain this balance:

| Intent Type | Share | Examples |
|-------------|-------|---------|
| Informational / Problem-aware | 60% | "What is MES?", "5 pain points Thai factories face" |
| Comparison / Compliance | 30% | "SAP ECC end-of-life", "DigiWin vs. Odoo" |
| Commercial | 10% | Landing pages, partner program |

#### Article SEO Structure

- **Title tag:** [Primary Keyword]: [Benefit] | DigiWin Thailand
- **Meta description:** 120-155 characters, includes primary keyword
- **H1:** Contains primary keyword, under 65 characters
- **H2s:** Target long-tail keyword variations
- **Schema markup:** Article + BreadcrumbList + FAQ (where applicable)

#### Internal Linking for SEO

Blog articles link to product/industry pages (passes authority to commercial pages). Product/industry pages link back to blog articles ("Related Insights" section). This bidirectional linking creates topical clusters that improve search ranking for both content and commercial pages.

---

## 9. Open Items & Decisions Needed

| # | Item | Status | Owner | Notes |
|---|------|--------|-------|-------|
| 1 | Client logos for social proof bar | âŒ Pending | Peter | Need 8-12 recognizable manufacturing client logos (with permission) |
| 2 | Partner testimonial for 2.0 | âŒ Pending | Peter | If no real testimonial yet, use stat-based proof instead |
| 3 | Case study translations (3 priority) | âŒ Pending | Peter | Plastics, Metal, Automotive â€” source from HQ library |
| 4 | Leadership photos and bios | âŒ Pending | Peter | For About Us Section 9 â€” coordinate with HQ marketing |
| 5 | DigiWin Thailand team/office photos | âŒ Pending | Peter | For About Us Section 7 |
| 6 | Global office locations list | âŒ Pending | Peter | For About Us Section 8 â€” confirm which offices to show |
| 7 | Awards/certifications inventory | âŒ Pending | Peter | For About Us Section 10 â€” may merge into stats banner if limited |
| 8 | Thai language toggle for v1? | â“ Decision needed | Peter | Full bilingual or English-only for v1 launch? |
| 9 | Partner Economics: approved margin ranges | âŒ Pending | Peter + HQ | Directional ranges only â€” exact pricing requires HQ approval |
| 10 | WordPress media library organization | â“ Post-launch | Peter | Folder structure / naming convention for when stock images are replaced with custom photography |
| 11 | Image naming convention | â“ Post-launch | Peter + Claude | Predictable URL pattern for self-hosted images â€” not needed during v1 build (stock URLs used) |
| 12 | DIVI JSON validation test schedule | â“ Decision needed | Peter | When to run Batch 0 validation on Home page â€” Peter must be logged into WordPress admin for Claude to operate browser |
| 13 | Unsplash/Pexels image sourcing | â“ Process needed | Claude | Claude proposes specific images with URLs; Peter approves before download/upload |
| 14 | SVG icon style guide | â“ Decision needed | Claude | Outline vs. filled, color (monochrome #3798E4 vs. multi-color), size standard |

---

## Changelog

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | Feb 3, 2026 | Initial PRD â€” 20-page architecture, persuasion framework, page specs, production workflow |
| 1.1 | Feb 3, 2026 | Expanded About Us (11 sections, SYSPRO-modeled), DigiWin Taiwan style guide extraction, global header/footer specs, content-to-DIVI mapping |
| 1.2 | Feb 3, 2026 | Rewrote Section 2 (dual-track persuasion framework with fear inventory), added Three-Layer Documentation Model (Section 5), rewrote Production Workflow (Section 6) for DIVI JSON import pipeline â€" Claude handles import via Chrome browser, direct stock image URLs (no upload step), changed Batch 0 validation to Home page, expanded Open Items from 12 to 14 |
| 1.3 | Feb 9, 2026 | +News/Events page (6.0) and Blog (7.0) specs, +blog article template (7.1), +BOI compliance differentiator, +competitive landscape, +iGP/WorkFlow branding note, fixed CTA language ("Let's Talk"), updated build order |
| 1.4 | Feb 11, 2026 | +Content funnel staging for blog (TOFU/MOFU/BOFU), +blog-to-product linking rules, +category-to-product mapping, +content calendar. New Section 8: Reader Journey Map (entry points, Track A/B journeys, cross-linking architecture) + SEO Content Framework (topic selection, article SEO structure, internal linking for SEO). Renumbered Open Items to Section 9 |
| 1.5 | Feb 11, 2026 | +Event Detail Page template (6.1) — reusable template for all event types with 9-section persuasion flow. Updated sitemap (23 pages). Added to build order under Batch 7 |

---

*â€" End of PRD v1.4 â€"*
