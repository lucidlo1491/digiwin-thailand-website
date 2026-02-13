# Divi 5 Build Tracker

**Last Updated:** February 12, 2026

Track every page through the 6-step workflow: Prep → Build → Audit → Review → Iterate → Publish

---

## Status Legend

| Symbol | Meaning |
|--------|---------|
| `---` | Not started |
| `WIP` | Work in progress |
| `DONE` | Completed |
| `SKIP` | Not needed for this page |
| `WAIT` | Blocked (see notes) |

---

## Prerequisites

| Item | Status | Notes |
|------|--------|-------|
| WordPress hosting URL | `DONE` | http://digiwin-thailand.local/wp-admin/ (Local by Flywheel) |
| WP admin credentials | `DONE` | admin/admin |
| Divi 5 license activated | `DONE` | Divi 5 active, WP 6.9.1 |
| Client logos (6-8) | `WIP` | Will source from Unsplash/Pexels |
| Domain/staging URL | `DONE` | https://digiwin.co.th/ (production), local for dev |

---

## Step 0: One-Time Setup

| Task | Status | Notes |
|------|--------|-------|
| WordPress installed | `DONE` | Local by Flywheel, WP 6.9.1 |
| Divi 5 activated | `DONE` | Divi 5 with Theme Builder (7 templates) |
| WP Settings configured | `DONE` | Timezone: Bangkok, Permalinks: /%postname%/, Static front page: Home |
| 20 pages created as drafts | `DONE` | With parent-child hierarchy (Partner/Products/Industries) |
| Design Variables configured | `---` | 11 global variables |
| Header (Theme Builder) | `DONE` | Code Module with custom nav, mega menus, "Let's Talk" CTA → /contact |
| Footer (Theme Builder) | `DONE` | Code Module with Products/Industries/Partners links, Contact info, social, copyright |
| 20 pages created as drafts | `DONE` | With parent-child hierarchy (Partner/Products/Industries) |
| DigiWin Main Menu | `DONE` | Menu ID 45, 16 items with parent-child hierarchy |
| Safe Mode disabled | `DONE` | Was causing rendering issues |

---

## Batch 0: Global + Homepage

| Page | Step 1: Spec | Step 2: Build | Step 3: Audit | Step 4: Review | Step 5: Iterate | Step 6: Publish |
|------|-------------|---------------|---------------|----------------|-----------------|-----------------|
| Header | `SKIP` | `DONE` | `---` | `---` | `---` | `---` |
| Footer | `SKIP` | `DONE` | `---` | `---` | `---` | `---` |
| Homepage | `DONE` | `---` | `---` | `---` | `---` | `---` |

**Homepage Spec:** `ContentSpec_Home_Divi5_2.0.md`

---

## Batch 1: Partner Program (Q2 deadline — highest priority)

| Page | Step 1: Spec | Step 2: Build | Step 3: Audit | Step 4: Review | Step 5: Iterate | Step 6: Publish |
|------|-------------|---------------|---------------|----------------|-----------------|-----------------|
| Partner Program (hub) | `DONE` | `---` | `---` | `---` | `---` | `---` |
| Partner Business Model | `DONE` | `---` | `---` | `---` | `---` | `---` |
| Partner Economics | `DONE` | `---` | `---` | `---` | `---` | `---` |
| Partner Solutions | `DONE` | `---` | `---` | `---` | `---` | `---` |

**Divi 5 Specs:** `ContentSpec_PartnerProgram_Divi5_2.0.md`, `ContentSpec_PartnerBusinessModel_Divi5_2.0.md`, `ContentSpec_PartnerEconomics_Divi5_2.0.md`, `ContentSpec_PartnerSolutions_Divi5_2.0.md`

---

## Batch 2: Products

| Page | Step 1: Spec | Step 2: Build | Step 3: Audit | Step 4: Review | Step 5: Iterate | Step 6: Publish |
|------|-------------|---------------|---------------|----------------|-----------------|-----------------|
| Products (hub) | `---` | `---` | `---` | `---` | `---` | `---` |
| ERP | `---` | `---` | `---` | `---` | `---` | `---` |
| MES | `---` | `---` | `---` | `---` | `---` | `---` |
| WMS | `---` | `---` | `---` | `---` | `---` | `---` |
| AIoT | `---` | `---` | `---` | `---` | `---` | `---` |

**ContentSpecs to upgrade:** `ContentSpec_Products_1.0.md`, `ContentSpec_ERP_1.0.md`, `ContentSpec_MES_1.0.md`, `ContentSpec_WMS_1.0.md`, `ContentSpec_AIoT_1.0.md`

---

## Batch 3: Industries

| Page | Step 1: Spec | Step 2: Build | Step 3: Audit | Step 4: Review | Step 5: Iterate | Step 6: Publish |
|------|-------------|---------------|---------------|----------------|-----------------|-----------------|
| Industries (hub) | `---` | `---` | `---` | `---` | `---` | `---` |
| Automotive | `---` | `---` | `---` | `---` | `---` | `---` |
| Electronics | `---` | `---` | `---` | `---` | `---` | `---` |
| Metal & Plastics | `---` | `---` | `---` | `---` | `---` | `---` |

**ContentSpecs to upgrade (light):** `ContentSpec_Industries_1.0.md`, `ContentSpec_Automotive_1.0.md`, `ContentSpec_Electronics_1.0.md`, `ContentSpec_MetalPlastics_1.0.md`

---

## Batch 4: About

| Page | Step 1: Spec | Step 2: Build | Step 3: Audit | Step 4: Review | Step 5: Iterate | Step 6: Publish |
|------|-------------|---------------|---------------|----------------|-----------------|-----------------|
| About Us | `---` | `---` | `---` | `---` | `---` | `---` |

**ContentSpec to upgrade:** `ContentSpec_About_1.0.md`

---

## Batch 5: Demo / Contact

| Page | Step 1: Spec | Step 2: Build | Step 3: Audit | Step 4: Review | Step 5: Iterate | Step 6: Publish |
|------|-------------|---------------|---------------|----------------|-----------------|-----------------|
| Demo / Contact | `---` | `---` | `---` | `---` | `---` | `---` |

**ContentSpec to upgrade (light):** `ContentSpec_Demo_1.0.md`

---

## Batch 6: Blog & News Hubs

| Page | Step 1: Spec | Step 2: Build | Step 3: Audit | Step 4: Review | Step 5: Iterate | Step 6: Publish |
|------|-------------|---------------|---------------|----------------|-----------------|-----------------|
| Blog Hub | `---` | `---` | `---` | `---` | `---` | `---` |
| News Hub | `---` | `---` | `---` | `---` | `---` | `---` |

**ContentSpecs to upgrade (light):** `ContentSpec_Blog_1.0.md`, `ContentSpec_News_1.0.md`

---

## Batch 7: Blog Articles (10)

| Page | Step 1: Spec | Step 2: Build | Step 3: Audit | Step 4: Review | Step 5: Iterate | Step 6: Publish |
|------|-------------|---------------|---------------|----------------|-----------------|-----------------|
| Five Pain Points | `SKIP` | `---` | `---` | `---` | `---` | `---` |
| BOI Compliance | `SKIP` | `---` | `---` | `---` | `---` | `---` |
| SAP End of Life | `SKIP` | `---` | `---` | `---` | `---` | `---` |
| Shop Floor | `SKIP` | `---` | `---` | `---` | `---` | `---` |
| Production Transparency | `SKIP` | `---` | `---` | `---` | `---` | `---` |
| AMRP | `SKIP` | `---` | `---` | `---` | `---` | `---` |
| LRP | `SKIP` | `---` | `---` | `---` | `---` | `---` |
| Co-Product | `SKIP` | `---` | `---` | `---` | `---` | `---` |
| Dual Units | `SKIP` | `---` | `---` | `---` | `---` | `---` |
| Feature Codes | `SKIP` | `---` | `---` | `---` | `---` | `---` |

Blog articles use Post Content module — no Divi 5 spec upgrade needed.

---

## Batch 8: Legal Pages (2)

| Page | Step 1: Spec | Step 2: Build | Step 3: Audit | Step 4: Review | Step 5: Iterate | Step 6: Publish |
|------|-------------|---------------|---------------|----------------|-----------------|-----------------|
| Privacy Policy | `SKIP` | `---` | `---` | `---` | `---` | `---` |
| Terms of Service | `SKIP` | `---` | `---` | `---` | `---` | `---` |

Legal pages are simple Text module layouts — no spec upgrade needed.

---

## Preset Library (built incrementally)

| Preset | Created On | First Used In |
|--------|-----------|---------------|
| Trust Card | `---` | Homepage |
| Check Card (Light) | `---` | Homepage |
| Check Card (Dark) | `---` | Homepage |
| CTA Section | `---` | Homepage |
| Section Header | `---` | Homepage |
| Product Card | `---` | Homepage |
| Stats Row | `---` | Homepage |
| Partner Hero (dark gradient + dot pattern) | `---` | Partner Hub |
| Partner Breadcrumb | `---` | Partner Economics |
| Partner Hero Stats Bar | `---` | Partner Hub |
| Partner CTA Banner (blue gradient) | `---` | Partner Hub |
| Partner Card Hover (translateY + shadow) | `---` | Partner Hub |
| Partner Dark Box (navy gradient + pattern) | `---` | Partner Hub |
| Partner Pill Badge (mono, colored) | `---` | Partner Hub |

---

## Scoreboard

| Metric | Count |
|--------|-------|
| Total pages | 31 |
| Specs ready (Divi 5) | 5 |
| Specs to upgrade | 10 |
| Specs not needed | 16 |
| Pages built | 2 (Header + Footer) |
| Pages published | 0 |
