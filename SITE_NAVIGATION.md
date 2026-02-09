# DigiWin Thailand - Complete Site Navigation

## URL Structure

All internal links should use these exact paths for consistency across all pages.

### Main Pages (20 Total)

| Page | URL | Menu Location |
|------|-----|---------------|
| **Home** | `/` | Header |
| **Products Hub** | `/products` | Header > Products |
| **ERP Core** | `/products/erp` | Header > Products |
| **MES** | `/products/mes` | Header > Products |
| **WMS** | `/products/wms` | Header > Products |
| **Industries Hub** | `/industries` | Header > Industries |
| **Automotive** | `/industries/automotive` | Header > Industries |
| **Electronics** | `/industries/electronics` | Header > Industries |
| **Metal & Plastics** | `/industries/metal-plastics` | Header > Industries |
| **Partner Program Hub** | `/partner-program` | Header > Partner Program |
| **Business Model Crisis** | `/partner-program/business-model` | Header > Partner Program |
| **Solution Stack** | `/partner-program/solutions` | Header > Partner Program |
| **Partner Economics** | `/partner-program/economics` | Header > Partner Program |
| **T100 Detail** | `/partner-program/solutions/t100` | From Solution Stack |
| **iGP Detail** | `/partner-program/solutions/igp` | From Solution Stack |
| **AIoT & MES Detail** | `/partner-program/solutions/aiot-mes` | From Solution Stack |
| **Resources Hub** | `/resources` | Header > Resources |
| **Case Studies** | `/resources/case-studies` | Header > Resources |
| **About Us** | `/about` | Header > Resources |
| **ESG & Net Zero** | `/resources/esg` | Header > Resources |

### Utility Pages

| Page | URL |
|------|-----|
| Demo Request | `/demo` |
| Contact | `/contact` |
| Privacy Policy | `/privacy-policy` |
| Terms of Service | `/terms` |

---

## WordPress Setup Instructions

### Creating Pages with Correct URLs

For each page in WordPress:

1. **Go to:** Pages > Add New
2. **Title:** Use the page name (e.g., "Partner Program")
3. **URL Slug:** Set in the URL settings:
   - For `/partner-program` → slug is `partner-program`
   - For `/products/erp` → create parent page `/products` first, then create `erp` as child

### Parent/Child Page Structure

```
Products (parent)
├── ERP Core (child)
├── MES (child)
└── WMS (child)

Industries (parent)
├── Automotive (child)
├── Electronics (child)
└── Metal & Plastics (child)

Partner Program (parent)
├── Business Model (child)
├── Solutions (child)
│   ├── T100 (grandchild)
│   ├── iGP (grandchild)
│   └── AIoT & MES (grandchild)
└── Economics (child)

Resources (parent)
├── Case Studies (child)
└── ESG (child)

About Us (standalone - not child of Resources)
```

---

## Link Reference for Copy/Paste

### Homepage Links
```html
<a href="/products">Explore Solutions</a>
<a href="/partner-program">Become a Partner</a>
<a href="/demo">Request a Demo</a>
```

### Product Links
```html
<a href="/products">All Products</a>
<a href="/products/erp">ERP: T100 & iGP</a>
<a href="/products/mes">MES: sMES & SFT</a>
<a href="/products/wms">WMS: sFLS</a>
```

### Industry Links
```html
<a href="/industries">All Industries</a>
<a href="/industries/automotive">Automotive Parts</a>
<a href="/industries/electronics">Electronics Assembly</a>
<a href="/industries/metal-plastics">Metal & Plastics</a>
```

### Partner Links
```html
<a href="/partner-program">Partner Program</a>
<a href="/partner-program/business-model">Business Model Crisis</a>
<a href="/partner-program/solutions">Solution Stack</a>
<a href="/partner-program/economics">Partner Economics</a>
```

### Resource Links
```html
<a href="/resources">Resources</a>
<a href="/resources/case-studies">Case Studies</a>
<a href="/about">About Us</a>
<a href="/resources/esg">ESG & Net Zero</a>
```

---

## Internal Linking Rules

1. **Every page must link to at least:**
   - The next logical page in the journey
   - A primary CTA (demo/contact)
   - Related pages in the same section

2. **Cross-linking between tracks:**
   - Products pages link to related Industries
   - Industries pages link to relevant Products
   - Partner pages reference Products they can sell

3. **CTA consistency:**
   - Factory visitors → "Request a Demo" → `/demo`
   - Partner visitors → "Become a Partner" or "Schedule Discovery Call" → `/partner-program` or `/contact`
