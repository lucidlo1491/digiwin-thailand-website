# 301 Redirect Map — digiwin.co.th Migration

Generated: 2026-02-24
Old site: Custom WP theme with custom post types (news, resource, industry)
New site: Divi 5 with standard pages

## How to Apply

**Option A: WordPress "Redirection" plugin** (easiest)
1. Install "Redirection" plugin (free, 2M+ installs)
2. Import this as CSV or add manually
3. Works immediately, no server config needed

**Option B: nginx rules** (if using nginx on production)
Add to nginx server block — see Section 3 below.

---

## 1. Product Pages (6 redirects)

These are blog posts on the old site that are actually product pages.

| Old URL | New URL | Notes |
|---------|---------|-------|
| `/erp/` | `/products/erp/` | T100 ERP — now under /products/ |
| `/workflowerp-igp/` | `/products/erp/` | WorkflowERP iGP — same product family |
| `/smes/` | `/products/mes/` | sMES → MES product page |
| `/shop-floor-tracking-system/` | `/products/mes/` | SFT is part of MES |
| `/sfls/` | `/products/wms/` | sFLS → WMS product page |
| `/it-outsourcing/` | `/products/` | IT Outsourcing → products hub |

## 2. Industry Pages (5 redirects)

Old site uses `/industry/` (singular), new site uses `/industries/` (plural).

| Old URL | New URL | Notes |
|---------|---------|-------|
| `/industry/` | `/industries/` | Hub page |
| `/industry/automotive-parts/` | `/industries/automotive/` | Slug simplified |
| `/industry/metal/` | `/industries/metal-plastics/` | Expanded scope |
| `/industry/plastic/` | `/industries/metal-plastics/` | Merged with metal |
| `/industry/furniture/` | `/industries/` | No furniture page on new site — go to hub |

## 3. Resource → Blog / Case Studies (33 redirects)

Old site lumps articles, case studies, and events under `/resource/`.
New site splits into `/blog/`, `/case-studies/`, and `/news/events/`.

### English Articles → Blog

| Old URL | New URL | Notes |
|---------|---------|-------|
| `/resource/benefits-of-erp-system-for-business/` | `/blog/` | Generic ERP benefits → blog hub |
| `/resource/wms-barcode/` | `/products/wms/` | WMS article → WMS product page |
| `/resource/digiwin-erp-digiwin-erp/` | `/products/erp/` | ERP article → ERP product page |

### English Case Studies → Case Studies

| Old URL | New URL | Notes |
|---------|---------|-------|
| `/resource/case-study-mufu-technologies-co-ltd/` | `/case-studies/` | Case study → hub |
| `/resource/mufu-workflow-erp-success/` | `/case-studies/` | Same client, different angle |
| `/resource/casestudy-thai-hosheng-erp/` | `/case-studies/` | Thai Hosheng case |
| `/resource/thai-hosheng-erp-success-story/` | `/case-studies/` | Same client, different URL |
| `/resource/thaialpha-wferp-case-study/` | `/case-studies/` | ThaiAlpha case (EN) |
| `/resource/thaialpha-wferp-case-study-cn/` | `/case-studies/` | ThaiAlpha case (CN) |
| `/resource/case-study-mr-ken/` | `/case-studies/` | Mr. Ken case |
| `/resource/case-study-de-poen-pneumatic-taiwan/` | `/case-studies/` | De Poen case |
| `/resource/case-study-ginfong-precision-industry/` | `/case-studies/` | Ginfong case |
| `/resource/case-study-hoo-chin-electronics-co-ltd/` | `/case-studies/` | Hoo Chin case |
| `/resource/case-study-srang-sern-co-ltd/` | `/case-studies/` | Srang Sern case |
| `/resource/taiyo-fastener-thailand-co-ltd/` | `/case-studies/` | Taiyo Fastener case |

### Thai-Language Articles → Blog

| Old URL | New URL | Notes |
|---------|---------|-------|
| `/resource/erp-%e0%b8%84%e0%b8%b7%e0%b8%ad%e0%b8%ad%e0%b8%b0%e0%b9%84%e0%b8%a3/` | `/blog/` | ERP คืออะไร (What is ERP) |
| `/resource/%e0%b8%97%e0%b8%b3%e0%b9%84%e0%b8%a1%e0%b8%ad%e0%b8%87%e0%b8%84%e0%b9%8c%e0%b8%81%e0%b8%a3%e0%b8%84%e0%b8%a7%e0%b8%a3%e0%b9%83%e0%b8%8a%e0%b9%89%e0%b8%a3%e0%b8%b0%e0%b8%9a%e0%b8%9a-erp/` | `/blog/` | ทำไมองค์กรควรใช้ระบบ ERP |
| `/resource/%e0%b8%ad%e0%b8%a2%e0%b8%b2%e0%b8%81%e0%b9%83%e0%b8%8a%e0%b9%89%e0%b8%87%e0%b8%b2%e0%b8%99%e0%b8%a3%e0%b8%b0%e0%b8%9a%e0%b8%9a-erp-%e0%b8%84%e0%b8%a7%e0%b8%a3%e0%b9%80%e0%b8%a3%e0%b8%b4%e0%b9%88/` | `/blog/` | อยากใช้งานระบบ ERP ควรเริ่ม... |
| `/resource/%e0%b9%80%e0%b8%a5%e0%b8%b7%e0%b8%ad%e0%b8%81-erp-%e0%b8%ad%e0%b8%a2%e0%b9%88%e0%b8%b2%e0%b8%87%e0%b9%84%e0%b8%a3%e0%b9%83%e0%b8%ab%e0%b9%89%e0%b9%80%e0%b8%ab%e0%b8%a1%e0%b8%b2%e0%b8%b0%e0%b8%aa/` | `/blog/` | เลือก ERP อย่างไรให้เหมาะส... |
| `/resource/%e0%b9%83%e0%b8%8a%e0%b9%89%e0%b8%9b%e0%b8%a3%e0%b8%b0%e0%b9%82%e0%b8%a2%e0%b8%8a%e0%b8%99%e0%b9%8c%e0%b8%88%e0%b8%b2%e0%b8%81%e0%b8%81%e0%b8%b2%e0%b8%a3%e0%b8%88%e0%b8%b1%e0%b8%94%e0%b8%81%e0%b8%b2/` | `/blog/` | ใช้ประโยชน์จากการจัดกา... |
| `/resource/%e0%b8%82%e0%b9%89%e0%b8%ad%e0%b9%81%e0%b8%95%e0%b8%81%e0%b8%95%e0%b9%88%e0%b8%b2%e0%b8%87%e0%b8%a3%e0%b8%b0%e0%b8%ab%e0%b8%a7%e0%b9%88%e0%b8%b2%e0%b8%87%e0%b8%95%e0%b9%89%e0%b8%99%e0%b8%97%e0%b8%b8/` | `/blog/` | ข้อแตกต่างระหว่างต้นทุ... |
| `/resource/%e0%b8%81%e0%b8%b2%e0%b8%a3%e0%b8%95%e0%b8%a3%e0%b8%a7%e0%b8%88%e0%b8%aa%e0%b8%ad%e0%b8%9a%e0%b8%a3%e0%b8%b2%e0%b8%a2%e0%b8%87%e0%b8%b2%e0%b8%99%e0%b8%97%e0%b8%b2%e0%b8%87%e0%b8%95%e0%b9%89%e0%b8%99/` | `/blog/` | การตรวจสอบรายงานทางต้น... |
| `/resource/%e0%b8%84%e0%b8%b3%e0%b8%88%e0%b8%b3%e0%b8%81%e0%b8%b1%e0%b8%94%e0%b8%84%e0%b8%a7%e0%b8%b2%e0%b8%a1%e0%b8%82%e0%b8%ad%e0%b8%87%e0%b8%95%e0%b9%89%e0%b8%99%e0%b8%97%e0%b8%b8%e0%b8%99/` | `/blog/` | คำจำกัดความของต้นทุน... |
| `/resource/%e0%b8%81%e0%b8%b2%e0%b8%a3%e0%b8%9c%e0%b8%aa%e0%b8%b2%e0%b8%99%e0%b8%a3%e0%b8%a7%e0%b8%a1%e0%b8%82%e0%b8%ad%e0%b8%87-it-%e0%b9%81%e0%b8%a5%e0%b8%b0-ot-%e0%b8%aa%e0%b8%b2%e0%b8%a1%e0%b8%b2%e0%b8%a3/` | `/blog/` | การผสานรวมของ IT และ OT... |

### Thai Case Studies → Case Studies

| Old URL | New URL | Notes |
|---------|---------|-------|
| `/resource/digiwin-erp-%e0%b8%8a%e0%b9%88%e0%b8%a7%e0%b8%a2%e0%b9%83%e0%b8%ab%e0%b9%89%e0%b8%9a%e0%b8%a3%e0%b8%b4%e0%b8%a9%e0%b8%b1%e0%b8%97dimet-siam%e0%b8%9e%e0%b8%b1%e0%b8%92%e0%b8%99%e0%b8%b2%e0%b8%84/` | `/case-studies/` | Dimet Siam case (TH) |
| `/resource/workflow-erp%e0%b8%8a%e0%b9%88%e0%b8%a7%e0%b8%a2%e0%b9%83%e0%b8%ab%e0%b9%89%e0%b8%9a%e0%b8%a3%e0%b8%b4%e0%b8%a9%e0%b8%b1%e0%b8%97lotus-pack-%e0%b8%9e%e0%b8%b1%e0%b8%92%e0%b8%99%e0%b8%b2%e0%b8%84/` | `/case-studies/` | Lotus Pack case (TH) |

### Chinese-Language Content → Appropriate New Page

| Old URL | New URL | Notes |
|---------|---------|-------|
| `/resource/%e3%80%8a%e6%b3%b0%e5%9b%bd%e7%94%b5%e5%ad%90%e5%8f%91%e7%a5%a8%e6%8c%87%e5%8d%97%e3%80%8b%e7%ba%bf%e4%b8%8a%e7%a0%94%e8%ae%a8%e4%bc%9a/` | `/news/events/` | 泰国电子发票指南 webinar |
| `/resource/%e6%b3%b0%e5%9b%bd%e5%88%b6%e9%80%a0%e4%bc%81%e4%b8%9a%e7%9a%84boi%e5%90%88%e8%a7%84%e4%b8%8e%e6%95%b0%e4%bd%8d%e8%bd%ac%e5%9e%8b%e5%85%b3%e9%94%ae%e8%a7%a3%e6%9e%90%ef%bd%9c%e7%ba%bf%e4%b8%8a/` | `/news/events/` | BOI合规 webinar |
| `/resource/%e7%be%8e%e5%9b%bd%e5%85%b3%e7%a8%8e%e6%96%b0%e5%b1%80%e4%b8%8b%e5%9c%a8%e6%b3%b0%e5%88%b6%e9%80%a0%e4%b8%9a%e7%9a%84%e6%9c%ba%e9%81%87%e4%b8%8e%e5%9b%a0%e5%ba%94%e3%80%90%e4%ba%a7%e8%af%81%e7%af%87/` | `/news/events/` | 美国关税 webinar |
| `/resource/6-19%e6%b3%b0%e5%9b%bd%e9%bc%8e%e6%8d%b7%e3%80%90%e6%b3%b0%e5%9b%bd%e6%96%b0%e5%8e%82%e5%9f%ba%e5%bb%ba%e7%9a%84%e6%9c%80%e5%90%8e%e4%b8%80%e5%93%a9%e8%b7%af%e3%80%91/` | `/news/events/` | 泰国新厂基建 webinar |
| `/resource/erp%e8%88%87mes%e7%9a%84%e6%ad%a3%e7%a2%ba%e7%94%a8%e6%b3%95-%e6%a7%8b%e5%bb%ba%e5%b7%a5%e5%bb%a0%e6%95%b8%e4%bd%8d%e7%a9%bf%e9%80%8f%e5%bc%8f%e7%ae%a1%e7%90%86/` | `/products/erp/` | ERP與MES的正確用法 (Trad CN) |

### Events → News/Events

| Old URL | New URL | Notes |
|---------|---------|-------|
| `/resource/thailand-boi-2026-0128-webinar/` | `/news/events/boi-compliance-workshop/` | BOI webinar → our BOI event |
| `/resource/digiwin-software-at-thailand-china-cooperation-expo-2025/` | `/news/events/manufacturing-expo-2026/` | Expo → our expo page |
| `/resource/virtual-walk-through-in-5g-aiot-experience-experiment-basedigiwin-software-at-thailand-china-cooperation-expo-2025/` | `/news/events/` | Factory tour → events hub |

## 4. News Pages (2 redirects)

| Old URL | New URL | Notes |
|---------|---------|-------|
| `/news/digiwin-software-thailand-%e0%b8%a3%e0%b9%88%e0%b8%a7%e0%b8%a1%e0%b8%a1%e0%b8%b7%e0%b8%ad%e0%b8%81%e0%b8%b1%e0%b8%9a%e0%b8%aa%e0%b8%a1%e0%b8%b2%e0%b8%84%e0%b8%a1%e0%b8%81%e0%b8%b2%e0%b8%a3%e0%b8%84/` | `/news/` | DigiWin partnership news |
| `/news/system-cosulatant/` | `/news/` | System consultant hiring |

## 5. Hub & Category Pages (8 redirects)

| Old URL | New URL | Notes |
|---------|---------|-------|
| `/resources/` | `/blog/` | Old resources hub → blog hub |
| `/resource/` | `/blog/` | Alternate URL for same |
| `/resources/cate/articles/` | `/blog/` | Articles category → blog |
| `/resources/cate/case-studies/` | `/case-studies/` | Case studies category |
| `/resources/cate/events/` | `/news/events/` | Events category |
| `/news/cate/news/` | `/news/` | News category → news hub |
| `/news/cate/career/` | `/about-us/` | Career category → about us |
| `/resource/page/2/` | `/blog/` | Paginated resources |
| `/resource/page/3/` | `/blog/` | Paginated resources |
| `/resource/page/4/` | `/blog/` | Paginated resources |

## 6. Landing Pages & Special Pages (7 redirects)

| Old URL | New URL | Notes |
|---------|---------|-------|
| `/thailand-boi-ebook-download/` | `/blog/boi-compliance-jin-hai/` | BOI ebook → our BOI blog post |
| `/digiwin-software-smes-cpl/` | `/products/mes/` | sMES landing page → MES |
| `/thailand-erp-cpl/` | `/products/erp/` | ERP landing page → ERP |
| `/e-tax-ebook-download/` | `/blog/` | e-Tax ebook → blog hub |
| `/factory-visit-luxin-technology-thailand/` | `/news/events/factory-tour-mes/` | Factory visit → our factory tour event |
| `/odw20250710_boi/` | `/news/events/boi-compliance-workshop/` | BOI webinar → our BOI event |
| `/%e9%9b%bb%e5%ad%90%e7%99%bc%e7%a5%a8/` | `/blog/` | 電子發票 (e-invoice) → blog hub |

## 7. Pages That Map Directly (no redirect needed)

These URLs exist on both old and new sites at the same path:

| URL | Status |
|-----|--------|
| `/about-us/` | Same path |
| `/contact/` | Same path |
| `/news/` | Same path |
| `/privacy-policy/` | Same path |

---

## 3. nginx Rules (if needed)

```nginx
# === Product pages ===
rewrite ^/erp/?$ /products/erp/ permanent;
rewrite ^/workflowerp-igp/?$ /products/erp/ permanent;
rewrite ^/smes/?$ /products/mes/ permanent;
rewrite ^/shop-floor-tracking-system/?$ /products/mes/ permanent;
rewrite ^/sfls/?$ /products/wms/ permanent;
rewrite ^/it-outsourcing/?$ /products/ permanent;

# === Industry pages ===
rewrite ^/industry/?$ /industries/ permanent;
rewrite ^/industry/automotive-parts/?$ /industries/automotive/ permanent;
rewrite ^/industry/metal/?$ /industries/metal-plastics/ permanent;
rewrite ^/industry/plastic/?$ /industries/metal-plastics/ permanent;
rewrite ^/industry/furniture/?$ /industries/ permanent;

# === Resource hub & categories ===
rewrite ^/resources?/?$ /blog/ permanent;
rewrite ^/resources/cate/articles/?$ /blog/ permanent;
rewrite ^/resources/cate/case-studies/?$ /case-studies/ permanent;
rewrite ^/resources/cate/events/?$ /news/events/ permanent;
rewrite ^/resource/page/\d+/?$ /blog/ permanent;

# === News categories ===
rewrite ^/news/cate/news/?$ /news/ permanent;
rewrite ^/news/cate/career/?$ /about-us/ permanent;

# === Catch-all for remaining /resource/ and /news/ posts ===
# Case studies (English)
rewrite ^/resource/case-study-.*$ /case-studies/ permanent;
rewrite ^/resource/casestudy-.*$ /case-studies/ permanent;
rewrite ^/resource/.*-case-study.*$ /case-studies/ permanent;
rewrite ^/resource/.*-success(-story)?/?$ /case-studies/ permanent;
rewrite ^/resource/taiyo-fastener.*$ /case-studies/ permanent;
rewrite ^/resource/mufu-workflow.*$ /case-studies/ permanent;

# Events (webinars, expos)
rewrite ^/resource/thailand-boi-2026.*$ /news/events/boi-compliance-workshop/ permanent;
rewrite ^/resource/digiwin-software-at-thailand-china.*$ /news/events/manufacturing-expo-2026/ permanent;
rewrite ^/resource/virtual-walk-through.*$ /news/events/ permanent;

# Product-related articles
rewrite ^/resource/wms-barcode/?$ /products/wms/ permanent;
rewrite ^/resource/digiwin-erp-digiwin-erp/?$ /products/erp/ permanent;
rewrite ^/resource/benefits-of-erp.*$ /blog/ permanent;

# Landing pages
rewrite ^/thailand-boi-ebook-download/?$ /blog/boi-compliance-jin-hai/ permanent;
rewrite ^/digiwin-software-smes-cpl/?$ /products/mes/ permanent;
rewrite ^/thailand-erp-cpl/?$ /products/erp/ permanent;
rewrite ^/e-tax-ebook-download/?$ /blog/ permanent;
rewrite ^/factory-visit-luxin-technology-thailand/?$ /news/events/factory-tour-mes/ permanent;
rewrite ^/odw20250710_boi/?$ /news/events/boi-compliance-workshop/ permanent;

# === Catch-all: remaining /resource/ → /blog/, remaining /news/ posts → /news/ ===
rewrite ^/resource/.*$ /blog/ permanent;
rewrite ^/news/(?!events)(?!cate).+$ /news/ permanent;
```

## Summary

| Category | Count | Destination |
|----------|-------|-------------|
| Product pages | 6 | /products/* |
| Industry pages | 5 | /industries/* |
| English articles | 3 | /blog/ or product pages |
| English case studies | 12 | /case-studies/ |
| Thai articles | 9 | /blog/ |
| Thai case studies | 2 | /case-studies/ |
| Chinese content | 5 | /news/events/ or /products/ |
| Events | 3 | /news/events/* |
| News posts | 2 | /news/ |
| Hub/category pages | 10 | Various hubs |
| Landing pages | 7 | Various |
| **TOTAL** | **64** | |
