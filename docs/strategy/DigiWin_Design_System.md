# DigiWin Design System
*Official brand standards from 鼎捷数智品牌视觉识别手册 (DigiWin Brand Visual Identity Manual)*

---

## 1. Core Identity: "The Super Symbol D"

### The Symbol
The "D" logo (shaped like a handshake or link) with the central dot represents:
- **"Data Core"** — Data is our fundamental asset
- **"Partnership"** — Connection between DigiWin and clients

### Website Application

| Element | Usage |
|---------|-------|
| **Favicon** | Use the "D" symbol alone |
| **Section Dividers** | Transparent background watermark (opacity <10%) on white sections |
| **Image Masking** | Use the "D-curve" on hero images for dynamic forward motion |

---

## 2. Color Palette

### Primary Brand Colors

| Color | Hex | CSS Variable | Usage |
|-------|-----|--------------|-------|
| **Smart Blue** | `#00AFF0` | `--dw-smart-blue` | CTA buttons, primary actions, navigation highlights |
| **Deep Blue** | `#000064` | `--dw-deep-blue` | Footer backgrounds, text headings, stability |

### Industry-Specific Coding

| Industry | Color | Hex | Signal |
|----------|-------|-----|--------|
| **Manufacturing** (T100/MES) | Tech Blue | `#005AFF` | Precision, Industry |
| **Distribution/Retail** (iGP) | Warm Yellow | `#FFD200` | Activity, Flow |
| **ESG/Green Industry** | Sustainable Green | `#14E69B` | Sustainability |

### Supporting Colors

| Color | Hex | Usage |
|-------|-----|-------|
| **Dark Navy** | `#000864` | Alternative footer, hero overlays |
| **Light Gray** | `#F5F7FA` | Alternating section backgrounds |
| **Text Dark** | `#333333` | Body text |
| **Text Light** | `#64748b` | Secondary text, descriptions |
| **White** | `#FFFFFF` | Cards, content backgrounds |

### CSS Variables

```css
:root {
  /* Primary Brand */
  --dw-smart-blue: #00AFF0;
  --dw-deep-blue: #000064;

  /* Industry Coding */
  --dw-tech-blue: #005AFF;
  --dw-warm-yellow: #FFD200;
  --dw-sustainable-green: #14E69B;

  /* Supporting */
  --dw-dark-navy: #000864;
  --dw-light-gray: #F5F7FA;
  --dw-text-dark: #333333;
  --dw-text-light: #64748b;
  --dw-white: #FFFFFF;
}
```

---

## 3. Typography: "Clean Engineering"

### Font Stack

| Language | Primary Font | Fallback |
|----------|--------------|----------|
| **English/Thai** | Noto Sans | Arial, Helvetica |
| **Chinese** | Source Han Sans (思源黑体) | — |

### Font Weights

| Weight | Usage |
|--------|-------|
| **Bold (700)** | Headlines (H1, H2) — Assert authority |
| **SemiBold (600)** | Subheadings, buttons, labels |
| **Regular (400)** | Body text — Complex technical descriptions |
| **Light (300)** | Annotations, captions, meta text |

### Type Scale

| Element | Size | Weight | Line Height |
|---------|------|--------|-------------|
| **H1** | 48-56px | Bold | 1.1 |
| **H2** | 36-44px | Bold | 1.15 |
| **H3** | 24-28px | SemiBold | 1.2 |
| **H4** | 20px | SemiBold | 1.3 |
| **Body** | 16-18px | Regular | 1.6 |
| **Small** | 14px | Regular | 1.5 |
| **Caption** | 12-13px | Light | 1.4 |

### CSS Import

```css
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans:wght@300;400;600;700&family=Noto+Sans+Thai:wght@300;400;600;700&display=swap');

body {
  font-family: 'Noto Sans', 'Noto Sans Thai', Arial, Helvetica, sans-serif;
}
```

---

## 4. Imagery Strategy: "The Three Lenses"

### Style A: "Data Ocean" (Abstract)

| Attribute | Specification |
|-----------|---------------|
| **Visual** | Particles, dots, flowing lines representing data streams |
| **Usage** | Hero backgrounds, page headers |
| **Purpose** | "Future-Ready" aesthetic, replaces generic factory photos |

**Example Prompt for AI Image Generation:**
> "Abstract data visualization, flowing blue particles and light streams, dark background, tech aesthetic, representing data flow and digital transformation, clean minimal style"

---

### Style B: "Tech" (Value & Utility)

| Attribute | Specification |
|-----------|---------------|
| **Visual** | Software interfaces, dashboards, "Digital Twin" visualizations |
| **Usage** | Product pages (3.0, 3.x) |
| **Purpose** | Show software working, demonstrate value |

**Rules:**
- Show actual UI/dashboards
- Never show people staring at blank screens
- Include data visualizations, charts, metrics

---

### Style C: "Human" (Confident & Warm)

| Attribute | Specification |
|-----------|---------------|
| **Visual** | Natural light, genuine expressions, "Enjoying Life" |
| **Usage** | Partner success stories, About Us, testimonials |
| **Purpose** | Show the result of using good software |

**Rules:**
- Subjects look confident and relaxed (not stressed)
- No aggressive corporate poses
- Natural settings, genuine moments

---

## 5. Visual Motifs: "Data Flow"

### Dot Matrix Pattern

| Property | Value |
|----------|-------|
| **Opacity** | 5-10% on white backgrounds |
| **Usage** | "Why DigiWin," "Partner Economics," section backgrounds |
| **Purpose** | Reinforce that *data* is the underlying asset |

### Data Current Graphics

- Derived from logo's central dot
- Flowing lines suggesting movement and connection
- Use as subtle textures, not dominant elements

### CSS Implementation

```css
.dw-data-texture {
  background-image: radial-gradient(circle, rgba(0, 175, 240, 0.05) 1px, transparent 1px);
  background-size: 20px 20px;
}

.dw-data-flow {
  background:
    linear-gradient(135deg, transparent 40%, rgba(0, 175, 240, 0.03) 50%, transparent 60%),
    radial-gradient(circle at 20% 30%, rgba(0, 175, 240, 0.05) 0%, transparent 50%);
}
```

---

## 6. Taglines & Messaging

### Primary Tagline
> **"Use Data & Intelligence to Realize Ideas"**
> Chinese: 用数智实现创想

**Usage:** Homepage H1 or Innovation/AIoT page hero

---

### Mission Statement
> **"Innovate Productivity"**
> Chinese: 创新生产力

**Usage:** Manufacturing Solution pages

---

## 7. Component Specifications

### Buttons

| Type | Background | Text | Border | Shadow |
|------|------------|------|--------|--------|
| **Primary** | `#00AFF0` | White | None | `0 4px 14px rgba(0, 175, 240, 0.35)` |
| **Ghost** | Transparent | White | 2px white | None |
| **Outline** | Transparent | `#00AFF0` | 2px `#00AFF0` | None |
| **Secondary** | `#F5F7FA` | `#333333` | None | `0 2px 8px rgba(0,0,0,0.06)` |

### Cards

| Property | Value |
|----------|-------|
| **Background** | `#FFFFFF` |
| **Border Radius** | 16px |
| **Shadow** | `0 4px 20px rgba(0,0,0,0.06)` |
| **Hover Shadow** | `0 12px 40px rgba(0,0,0,0.12)` |
| **Hover Transform** | `translateY(-4px)` |

### Icons

| Property | Value |
|----------|-------|
| **Container** | 48-64px square |
| **Border Radius** | 12-16px |
| **Background** | `linear-gradient(135deg, #00AFF0 0%, #005AFF 100%)` |
| **Color** | White |

---

## 8. Page-Specific Color Coding

### Track A: Factory Owners (Manufacturing)

| Element | Color |
|---------|-------|
| **Accent** | Tech Blue `#005AFF` |
| **Hero Overlay** | Deep Blue `#000064` gradient |
| **Icons** | Tech Blue gradient |

### Track B: Distributor Partners

| Element | Color |
|---------|-------|
| **Accent** | Smart Blue `#00AFF0` |
| **Hero Overlay** | Dark Navy `#000864` gradient |
| **Icons** | Smart Blue gradient |

### Industry Pages

| Page | Accent Color |
|------|--------------|
| **Automotive** | Tech Blue `#005AFF` |
| **Electronics** | Tech Blue `#005AFF` |
| **Metal/Plastics** | Tech Blue `#005AFF` |
| **Distribution** | Warm Yellow `#FFD200` |
| **ESG/Sustainability** | Sustainable Green `#14E69B` |

---

## 9. Implementation Checklist

### For Web Development Team

- [ ] **Buttons:** Primary CTA uses `#00AFF0` (Smart Blue)
- [ ] **Fonts:** Noto Sans (all weights: 300, 400, 600, 700)
- [ ] **Hero Masks:** Use "D-Shape" curve to crop images
- [ ] **Texture:** Data Dots at 5% opacity on white backgrounds
- [ ] **Industry Coding:** Blue = Mfg, Yellow = Retail, Green = ESG
- [ ] **Favicon:** "D" symbol only
- [ ] **Footer:** Deep Blue `#000064` background
- [ ] **Headings:** Deep Blue `#000064` text color

---

## 10. Do's and Don'ts

### Do

- Use Smart Blue for all primary actions
- Apply Data Flow texture subtly (5-10% opacity)
- Show confident, relaxed people in photos
- Use D-curve for hero image masking
- Apply industry color coding consistently

### Don't

- Use generic stock photos of "people pointing at screens"
- Mix industry colors on single pages
- Use decorative fonts
- Make Data Flow texture too prominent
- Use the full logo where the D symbol is sufficient

---

*Reference: 鼎捷数智品牌视觉识别手册 (DigiWin Brand Visual Identity Manual)*
*Last Updated: February 2025*
