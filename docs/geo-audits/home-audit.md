# CORE-EEAT GEO Audit: DigiWin Thailand Homepage

**Audit Date:** 2026-03-06
**Page:** `complete_website/index.html` (Homepage)
**Live URL:** `https://www.digiwin.co.th/`
**Auditor:** Claude (automated, anti-hallucination rules enforced)

---

## Overall Score: 60.6 / 100 — Grade B

| Dimension | Score | Grade |
|-----------|-------|-------|
| C — Content Quality | 70 | B |
| O — Optimization | 75 | B |
| R — References & Citations | 40 | C |
| E1 — Experience | 55 | C |
| E2 — Expertise | 70 | B |
| A — Authoritativeness | 65 | B |
| T — Trustworthiness | 60 | B |
| G — GEO-Specific | 50 | C |
| **Overall Average** | **60.6** | **B** |

---

## C — Content Quality (70/100)

| ID | Item | Score | Finding |
|----|------|-------|---------|
| C01 | Comprehensive topic coverage | 10 | Excellent. Dual-audience (factory operators + ERP implementers) with deep pain-point coverage, product pillars, industry verticals, trust anchors, and results. |
| C02 | Unique insights or original data | 5 | Partial. Pain-point naming ("Shadow Excel", "Ghost Inventory", "Man-Day Trap") is distinctive and original. However, no proprietary research, benchmark data, or whitepapers are surfaced. |
| C03 | Clear structure with headings hierarchy | 10 | Strong H1 + H2 hierarchy across 10 sections. Each section has label, title, subtitle. Heading levels are semantically correct. |
| C04 | Technical terms defined at first use | 10 | Industry terms are defined inline: ERP ("Enterprise Resource Planning"), MES ("Manufacturing Execution System"), WMS ("Warehouse Management System"), AIoT ("AI + Internet of Things"), OEM ("Original Equipment Manufacturers"), EDI ("Electronic Data Interchange"), IATF 16949, SMT, MSD, AOI all spelled out. |
| C05 | Actionable takeaways or next steps | 10 | Every section has a CTA: "Let's Talk About Your Factory", "See the Way Out", "Explore Automotive Solutions", etc. Final CTA is clear and non-pushy. |
| C06 | Content freshness signals | 5 | Partial. Dynamic year calculation (`dw-years` class computes years since 1982). Footer shows "2026". But no publish/update dates, no "as of" timestamps on stats. Common Wealth Magazine citation says "2023" — that is 3 years old. |
| C07 | Multimedia integration | 10 | Rich SVG illustrations per section (factory floor, PCB board, CNC machines, revenue ceiling). Logo marquee, animated stats counters, particle wave effects. No video (acceptable for homepage). |
| C08 | Internal linking to related content | 5 | Partial. Product cards link to product pages. Industry tabs link to industry pages. CTA links to demo page. However, no blog post links in body content (only one in trust section BOI card). No cross-references to case studies page from results section (only "See all case studies" link). |
| C09 | FAQ or common questions addressed | 0 | Fail. No FAQ section. No "People Also Ask" style content. The checks sections function as pain-point acknowledgment, not Q&A. |
| C10 | Summary or key takeaways section | 5 | Partial. The stats banner provides a summary of company credentials. The final CTA provides a summary prompt. But there is no explicit "key takeaways" or "what you'll learn" section. |

---

## O — Optimization (75/100)

| ID | Item | Score | Finding |
|----|------|-------|---------|
| O01 | Schema markup present and valid | 10 | Organization schema (name, address, founding date, stock code, parent org) + WebSite schema both present as JSON-LD. BreadcrumbList configured in page config for WP build. |
| O02 | Meta title optimized | 5 | Partial. Title is "DigiWin Thailand - Manufacturing Intelligence for ASEAN Factories" (62 chars — slightly over 60 char ideal). Primary keyword "Manufacturing Intelligence" is mid-positioned. Consider front-loading "ERP" or "Manufacturing ERP" for search intent. |
| O03 | Meta description compelling | 10 | "44+ years of manufacturing expertise. 50,000+ factories worldwide. ERP, MES, WMS, and AIoT solutions built specifically for manufacturing." (142 chars). Within range, includes key stats and product terms. |
| O04 | H1 unique and keyword-rich | 5 | Partial. H1 is "Your True Costs Are Invisible." — emotionally compelling but lacks target keywords (ERP, manufacturing, Thailand). An AI or search engine may not understand this is a manufacturing software homepage. |
| O05 | URL structure clean and descriptive | 10 | Root URL `https://www.digiwin.co.th/` — clean and appropriate for homepage. |
| O06 | Image alt text descriptive | 5 | Partial. Logo images have alt text ("DigiWin", "Cal-Comp Electronics", etc.). Client logos have descriptive alt text. However, many SVG illustrations use `aria-hidden="true"` with no alternative text description — appropriate for decorative SVGs but some contain informational content (factory floor, PCB board). |
| O07 | Page speed optimized | 10 | Font loading uses `media="print" onload` lazy pattern. Images use `loading="lazy"`. Inline critical CSS. Scripts deferred. Lighthouse baseline shows Performance 100 (mobile) per MEMORY.md. |
| O08 | Mobile responsiveness | 10 | Comprehensive responsive breakpoints at 1024px, 768px, 640px. Grid collapse, font scaling, touch targets audited (63/63 pages pass per git status). `prefers-reduced-motion` support. |
| O09 | Canonical URL set correctly | 5 | Canonical is `https://www.digiwin.co.th/` (correct). However, hreflang alternate for Thai version (`/th/`) is handled by mu-plugin, not visible in the HTML prototype. [NEEDS VERIFICATION on live WP] |
| O10 | Open Graph / social meta tags | 5 | Partial. OG title, description, type, url, site_name, image, locale all present. Twitter Card tags present. However, `og:image` points to `og-default.jpg` — [NEEDS PETER] confirm this image exists and is 1200x630px. Social links in footer are placeholder `#` hrefs. |

---

## R — References & Citations (40/100)

| ID | Item | Score | Finding |
|----|------|-------|---------|
| R01 | Statistics have named sources | 5 | Partial. Stats banner cites "Common Wealth Magazine, 2023" for market share numbers. But hero stats (44 years, 50K+ factories, 300378 listing) have no inline source. Company facts are verified in `verified-claims.json` but not surfaced to users. |
| R02 | Claims are verifiable | 5 | Partial. Stock code 300378 is publicly verifiable on Shenzhen exchange. "Since 1982" is verifiable. "50,000+ factories" — verified in codebase as cumulative Taiwan+China count, but no public source linked. "100+ Thai implementations" is a soft number per verified-claims.json. |
| R03 | External authoritative links present | 0 | Fail. Zero external links. No links to Shenzhen Stock Exchange, Common Wealth Magazine, BOI website, IATF standards body, or any third-party validation. |
| R04 | Industry standards referenced | 10 | IATF 16949, BOI compliance, ISO (implied in trust section scene SVG), Thai Revenue Department certification, EDI integration standards all referenced. |
| R05 | Case studies with specific details | 5 | Partial. Two case study cards with company names (Thai Alpha Polymer, Ginfong Precision Metal Stamping) and specific metrics. But no links to full case study pages from the cards themselves. BOI trust card references "10M+ THB/year" savings with link to blog post. |
| R06 | Methodology or process transparency | 0 | Fail. No explanation of implementation methodology, project timelines, or how DigiWin delivers results. The "what" is clear but the "how" is missing. |
| R07 | Data recency | 5 | Partial. Dynamic year calculation keeps "44 years" current. Common Wealth Magazine 2023 citation is within 3 years but aging. Case study results lack dates. |
| R08 | Multiple source types | 5 | Partial. Uses magazine citation, stock exchange listing, client testimonial data. Missing: third-party analyst reports, industry awards, government certifications documentation. |
| R09 | Attribution format consistent | 0 | Fail. No consistent attribution format. The one source (Common Wealth Magazine) is inline text with no link. Stats in hero and logo bar have no attribution. |
| R10 | No unsubstantiated superlatives | 5 | Partial. Mostly grounded: "44 years", "50,000+", "100+". But "54% Taiwan Manufacturing Solutions Market Share" needs source link (attributed to Common Wealth Magazine but readers cannot verify). "80% of Taiwan's Top 2,000 Manufacturers" — same issue. |

---

## E1 — Experience (55/100)

| ID | Item | Score | Finding |
|----|------|-------|---------|
| Exp01 | First-person practitioner perspective | 5 | Partial. Pain-point cards use second-person voice addressing the reader directly ("You know your factory isn't actually running..."). But no first-person practitioner voice ("We've seen this in 500 factories..."). |
| Exp02 | Implementation timeline expectations | 0 | Fail. No mention of typical implementation duration, phases, or what to expect during deployment. |
| Exp03 | Common challenges acknowledged honestly | 10 | Excellent. The factory checks section names 5 specific pain points with unflinching directness. Partner checks names 3 more. This is one of the page's strongest features. |
| Exp04 | Before/after scenarios | 10 | Strong. "Month-end closing: 60 days to 15 days", "Revenue growth of 200%, margins from 23% to 34%". Ghost inventory framing is implicitly before/after. |
| Exp05 | Tool or process screenshots | 0 | Fail. No product screenshots, dashboard previews, or UI previews. All visuals are abstract SVG illustrations. |
| Exp06 | Step-by-step guidance | 0 | Fail. No implementation journey, onboarding steps, or "what happens after you contact us" process. |
| Exp07 | Edge cases or limitations mentioned | 5 | Partial. Acknowledges that "most Thai SMEs lack a dedicated IT manager" (partner section). Mentions BOI audit compliance challenges. But no explicit product limitations or "this isn't for everyone" honesty. |
| Exp08 | Real-world examples | 10 | Named companies: Thai Alpha Polymer, Ginfong Precision, Cal-Comp Electronics, Haidilao, Yeong Guan Energy, S.T.K. Steel, Goldensea Hi-Tech, Chelic, Chung Tai Rubber. All verified in codebase. |
| Exp09 | Industry-specific context (Thai manufacturing) | 10 | Strong. References Thailand as ASEAN automotive hub, BOI compliance, Thai Revenue Department certification, Thai SME challenges. Industry tabs address automotive, electronics, metal/plastics — key Thai manufacturing sectors. |
| Exp10 | Practical tips beyond marketing | 5 | Partial. Pain-point descriptions contain actionable insights (production-order-level tracking, cycle counts). But no downloadable guides, checklists, or educational content linked from homepage. |

---

## E2 — Expertise (70/100)

| ID | Item | Score | Finding |
|----|------|-------|---------|
| Ext01 | Author/company credentials stated | 10 | Founded 1982, Shenzhen-listed (300378), Foxconn FII strategic investment, 5,000+ employees. Trust section dedicates 5 cards to credentials. |
| Ext02 | Industry-specific terminology used correctly | 10 | ERP, MES, WMS, AIoT, OEE, BOM, EDI, IATF 16949, SMT, MSD, AOI, CNC, JIT, Kanban — all used correctly and defined where appropriate. Verified against `verified-claims.json` blocklist. |
| Ext03 | Technical depth appropriate for audience | 10 | Dual-track approach calibrated well: factory owners get plain-language pain points; ERP implementers get business model analysis. Product descriptions balance clarity with substance. |
| Ext04 | Comparison with alternatives | 5 | Partial. Implicit comparison: "We didn't pivot to crypto or retail POS when it was trendy." Partner section compares man-day model vs. product-based margins. But no explicit feature comparison framework. Per business constraints, competitors are never named (correct). |
| Ext05 | Standards compliance knowledge demonstrated | 10 | BOI compliance, IATF 16949, Thai Revenue Department certification, ISO (implied). Industry features reference specific compliance needs (lot-level traceability for recalls, EDI integration). |
| Ext06 | Integration context | 10 | "One Ecosystem. Total Visibility." section explicitly addresses integration: "every DigiWin product works together—no integration nightmares, no data silos." Product cards mention ERP+WMS, ERP+SFT combinations. |
| Ext07 | ROI or business case framework | 5 | Partial. Case studies cite specific ROI (60 days to 15, 200% growth, 10M THB saved). Partner section cites 30-40% license margins. But no structured ROI calculator, TCO framework, or payback timeline. |
| Ext08 | Risk factors addressed | 5 | Partial. Trust section addresses vendor stability risk (public company, 44 years). Mentions "vendor that might disappear after implementation." But no explicit risk discussion around implementation failure, change management, or switching costs. |
| Ext09 | Scalability considerations | 0 | Fail. No mention of scaling from SME to enterprise, multi-site deployments, or growth path. Products page may cover this, but homepage doesn't signal it. |
| Ext10 | Future-proofing or roadmap signals | 5 | Partial. "Survived every technology shift (DOS to Windows to Cloud)" implies future-proofing. AIoT section signals modern capabilities. But no explicit roadmap, upcoming features, or technology direction. |

---

## A — Authoritativeness (65/100)

| ID | Item | Score | Finding |
|----|------|-------|---------|
| A01 | Company history and track record stated | 10 | "Since 1982", "44 years", survived DOS/Windows/Cloud transitions. Clear founding narrative. |
| A02 | Client count or market position | 10 | "50,000+ factories", "80% of Taiwan's Top 2,000 Manufacturers", "54% Taiwan market share", "100+ Thai implementations". |
| A03 | Geographic presence mentioned | 10 | Thailand (primary), ASEAN, Asia-wide. Bangkok office address in footer. Stock exchange in Shenzhen. Foxconn partnership implies global credibility. |
| A04 | Industry partnerships or certifications | 5 | Partial. Foxconn FII strategic investment mentioned. Thai Revenue Department certification. But no formal partner logos (Microsoft, AWS, etc.), no certification badges, no alliance program visibility. |
| A05 | Awards or recognition | 5 | Partial. Common Wealth Magazine market share ranking cited. But no awards section, no analyst recognition (Gartner, IDC), no industry awards displayed. [NEEDS PETER: Does DigiWin have any awards worth displaying?] |
| A06 | Thought leadership signals | 0 | Fail. No blog excerpts on homepage, no webinar promotions, no whitepapers or guides offered. Blog exists but isn't promoted from homepage body content. |
| A07 | Community involvement | 0 | Fail. No mention of community, events (though events page exists), workshops, or industry participation on homepage. |
| A08 | Press or media mentions | 5 | Partial. Common Wealth Magazine mentioned as source. But no press section, no "as seen in" logos, no media coverage links. |
| A09 | Consistent NAP | 10 | Name: DigiWin Thailand. Address: Bangna Complex Office Tower, 22nd Floor (in footer + schema). Email: info@digiwin.co.th. Note: schema.js has a different address (Interchange 21 Building) — **ADDRESS DISCREPANCY** between HTML prototype and schema.js. [NEEDS PETER: Which address is current?] |
| A10 | Professional design and UX | 10 | Premium industrial aesthetic. Consistent brand system (Navy/Blue palette, Noto Sans, JetBrains Mono labels, grain textures, particle waves, Super D device). Responsive. Accessible (skip-link, landmarks, reduced-motion). |

---

## T — Trustworthiness (60/100)

| ID | Item | Score | Finding |
|----|------|-------|---------|
| T01 | Privacy policy linked and accessible | 10 | Footer links to `privacy-policy.html`. |
| T02 | Contact information visible | 10 | Email, physical address in footer. "Let's Talk" CTA in header and multiple sections. |
| T03 | HTTPS and security signals | 5 | Partial. Canonical URL uses HTTPS. Local development on HTTPS (local cert). But no visible security badges, trust seals, or SSL certificate display for end users. |
| T04 | Terms of service present | 10 | Footer links to `terms.html`. |
| T05 | PDPA/data protection compliance | 0 | Fail. No PDPA (Thailand's data protection act) mention, no cookie consent banner, no data processing disclosure. Thailand PDPA has been enforceable since June 2022. **This is a compliance gap.** |
| T06 | No misleading claims or dark patterns | 10 | Clean. No deceptive patterns. CTAs are "Let's Talk" not "Book a Demo". Pricing is transparent ("Contact for pricing" in schema). Stats are grounded. |
| T07 | Transparent pricing approach | 5 | Partial. "Contact us" model is stated via CTA design. Partner section mentions "30-40% license margins". But no pricing page, no pricing tiers, no "starting from" indicators. |
| T08 | Customer testimonials with attribution | 5 | Partial. Case study results name real companies with specific metrics. But no direct quotes from named individuals, no job titles, no testimonial portraits. Pain-point quotes are composite/fictional voices, not attributed. |
| T09 | Company registration or legal entity info | 0 | Fail. No Thai company registration number, no DBD (Department of Business Development) registration, no legal entity name visible on website. Schema uses "Data Systems Consulting Co., Ltd." but this isn't displayed to users. |
| T10 | Consistent branding across pages | 5 | Partial on homepage alone — branding is excellent. But social media links are placeholder `#` hrefs (no actual social profiles linked). Footer "sameAs" in schema is an empty array. |

---

## G — GEO-Specific (50/100)

| ID | Item | Score | Finding |
|----|------|-------|---------|
| G01 | Quotable/citable sentences | 10 | Strong quotable sentences: "DigiWin has spent 44 years exclusively in manufacturing software." "50,000+ factory deployments across Asia." "Month-end closing reduced from 60 days to 15 days." These combine stat + context in one sentence, ideal for AI extraction. |
| G02 | Structured data for AI extraction | 5 | Partial. Organization and WebSite JSON-LD present. But no FAQPage schema, no Product schema for the 4 product pillars, no HowTo schema, no Review/Rating schema. Homepage config only generates BreadcrumbList. |
| G03 | Definition-style content for entity recognition | 10 | Each product pillar includes: full name expansion, tagline, 3 feature bullets, benefit statement. "ERP: Enterprise Resource Planning — The central brain of your business." These are entity-definition-ready. |
| G04 | Comparison tables or structured data | 0 | Fail. No comparison tables, feature matrices, or tabular data. Industry tabs have checklists but not in table format. |
| G05 | "People also ask" style Q&A content | 0 | Fail. No Q&A content. Pain-point cards are statements, not questions (except section headers "Do You Recognize These Problems?" and "Trapped in These Cycles?" which are rhetorical, not structured Q&A). |
| G06 | List-format content | 10 | Abundant lists: product feature bullets, industry feature checklists, pain-point numbered cards (01-05, 01-03), trust anchor cards. Well-structured for AI parsing. |
| G07 | Geographic specificity | 10 | "Thailand", "ASEAN", "Bangkok", "Thai Revenue Department", "BOI", "Thai SMEs", "Thai manufacturers", "Thai Alpha Polymer". Strong geographic signal density. |
| G08 | Industry entity associations | 5 | Partial. Manufacturing, ERP, MES, WMS, AIoT associations are clear. But no explicit "DigiWin is a [category] company" definition sentence. Schema lacks `@type: SoftwareApplication` on homepage. |
| G09 | Temporal relevance signals | 0 | Fail. No publish date, no "updated March 2026", no "2026 manufacturing trends" framing. Dynamic year is computed client-side (invisible to crawlers that don't execute JS). The `dw-years` class shows "44" but crawlers see the static "44" in HTML. Stats banner source says "2023" — aging. |
| G10 | Multi-format content | 0 | Fail. Text + SVG illustrations only. No video, no downloadable PDFs, no interactive tools, no embedded calculators. Audio/video content would significantly boost GEO signals. |

---

## Priority Actions (Ranked by Impact)

### P0 — Critical (Do First)

1. **Add PDPA cookie consent + privacy notice** (T05)
   - Thailand PDPA is enforceable. Missing consent mechanism is a compliance risk.
   - [NEEDS PETER: Confirm PDPA compliance requirements for the site]

2. **Resolve address discrepancy** (A09)
   - HTML footer: "Bangna Complex Office Tower, 22nd Floor"
   - `schema.js`: "399 Interchange 21 Building, 25th Floor, Unit 2501/2, Sukhumvit Road"
   - These are different buildings. Schema.org and visible content must match.
   - [NEEDS PETER: Which is the current office address?]

3. **Add FAQPage schema to homepage** (G02, C09, G05)
   - Convert the 5 factory pain-points and 3 partner pain-points into Q&A format
   - Generate FAQPage JSON-LD for AI/search extraction
   - Impact: Improves 3 audit dimensions simultaneously

### P1 — High Impact

4. **Add source links to statistics** (R01, R03, R09)
   - Link "300378" to Shenzhen Stock Exchange profile
   - Link "Common Wealth Magazine, 2023" to actual article URL
   - Add footnotes or tooltips for "50,000+" and "100+" with source descriptions
   - Impact: Lifts R dimension from 40 to ~60

5. **Add temporal signals visible to crawlers** (G09, C06)
   - Add a `<time>` element with `datetime` attribute for page last-updated date
   - Consider a visible "Last updated: March 2026" in footer or stats section
   - Update Common Wealth Magazine citation to most recent edition if available

6. **Add company registration info** (T09)
   - Display Thai company registration number in footer
   - Add legal entity name ("Data Systems Consulting Co., Ltd." or Thai name)
   - [NEEDS PETER: Thai company registration number?]

7. **Populate social media links** (T10, A09)
   - Replace `#` placeholder hrefs with actual LinkedIn, Facebook, LINE URLs
   - Add to `sameAs` array in Organization schema
   - [NEEDS PETER: What are the actual social media URLs?]

### P2 — Medium Impact

8. **Add product screenshots or dashboard previews** (Exp05)
   - Even stylized/blurred screenshots would signal practical experience
   - Consider a "See it in action" section with UI mockups

9. **Add implementation journey section** (Exp02, Exp06, R06)
   - Brief "What to Expect" or "How We Work" section: Discovery -> Planning -> Go-Live -> Support
   - Addresses methodology transparency gap

10. **Add external authoritative links** (R03)
    - Link to BOI website for compliance context
    - Link to IATF 16949 standard description
    - Link to Shenzhen Stock Exchange company profile

11. **Enrich homepage JSON-LD** (G02, G08)
    - Add `SoftwareApplication` schema for ERP, MES, WMS, AIoT from product pillars section
    - Add `ItemList` schema for the industry tabs
    - Add `Review` or `AggregateRating` schema if client satisfaction data exists

12. **Surface blog content on homepage** (A06, C08)
    - Add a "Latest Insights" section with 2-3 blog post cards
    - Increases internal linking and signals thought leadership

---

## Items Needing Peter's Input

| # | Question | Audit Item |
|---|----------|------------|
| 1 | Which office address is current? Footer says Bangna Complex, schema.js says Interchange 21. | A09 |
| 2 | Does DigiWin Thailand have a Thai company registration number to display? | T09 |
| 3 | What are the actual social media URLs (LinkedIn, Facebook, LINE)? | T10 |
| 4 | Does `og-default.jpg` exist at the specified URL? Is it 1200x630px? | O10 |
| 5 | Has DigiWin received any industry awards worth displaying? | A05 |
| 6 | Is there a more recent Common Wealth Magazine citation than 2023? | R07 |
| 7 | What is the PDPA compliance plan for the website? | T05 |
| 8 | Does DigiWin have client satisfaction/NPS data for schema ratings? | G02 |

---

## Methodology Notes

- Audit performed against HTML prototype (`complete_website/index.html`), not live WordPress render
- Statistics verified against `complete_website/verified-claims.json`
- Schema markup verified against both inline JSON-LD in HTML and `divi5/lib/schema.js`
- Page structure verified against `divi5/pages/home.js` section config
- No external URLs were fetched (LocalWP not reachable, per instructions)
- Items marked [NEEDS PETER] require human input to resolve
- Items marked [UNVERIFIED] could not be confirmed from codebase alone
