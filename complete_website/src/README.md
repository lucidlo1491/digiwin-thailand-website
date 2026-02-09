# DigiWin Website Build System

A simple build system for managing shared headers and footers across all pages.

## Quick Start

```bash
# Build all pages
node build.js

# Watch for changes and rebuild automatically
node build.js --watch
```

## Directory Structure

```
/complete_website
├── build.js              # Build script
├── src/
│   ├── partials/
│   │   ├── header.html   # Global header (navbar)
│   │   └── footer.html   # Global footer
│   └── pages/
│       ├── index.html    # Page templates
│       ├── products.html
│       ├── products/
│       │   ├── erp.html
│       │   └── ...
│       └── ...
├── styles.css            # Stylesheets (not compiled)
├── index.html            # ← Compiled output
├── products.html         # ← Compiled output
└── products/
    └── erp.html          # ← Compiled output
```

## How It Works

### Placeholders

Templates use three placeholders:

| Placeholder | Description |
|-------------|-------------|
| `{{header}}` | Replaced with contents of `partials/header.html` |
| `{{footer}}` | Replaced with contents of `partials/footer.html` |
| `{{basePath}}` | Replaced with relative path prefix |

### Base Path

The `{{basePath}}` is automatically calculated:
- **Root pages** (`src/pages/index.html`): `{{basePath}}` → empty string
- **Subdirectory pages** (`src/pages/products/erp.html`): `{{basePath}}` → `../`
- **Deeper pages** (`src/pages/a/b/c.html`): `{{basePath}}` → `../../`

### Example Template

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <title>My Page - DigiWin Thailand</title>
    <link rel="stylesheet" href="{{basePath}}styles.css">
</head>
<body>
{{header}}

    <!-- Your page content here -->
    <section class="dw-section">
        <h1>Page Title</h1>
    </section>

{{footer}}

    <script src="{{basePath}}digiwin-dynamic.js"></script>
</body>
</html>
```

## Converting Existing Pages

To convert an existing page to use the build system:

1. Copy the page to `src/pages/` (maintaining directory structure)
2. Replace the entire `<header>...</header>` block with `{{header}}`
3. Replace the entire `<footer>...</footer>` block with `{{footer}}`
4. Replace relative paths with `{{basePath}}` prefix:
   - `href="styles.css"` → `href="{{basePath}}styles.css"`
   - `href="products/erp.html"` → `href="{{basePath}}products/erp.html"`
   - `src="digiwin-dynamic.js"` → `src="{{basePath}}digiwin-dynamic.js"`
5. Run `node build.js` to compile

## Updating Header/Footer

To update the header or footer across all pages:

1. Edit `src/partials/header.html` or `src/partials/footer.html`
2. Run `node build.js`
3. All pages are updated instantly

## Tips

- **Don't edit compiled files directly** - changes will be overwritten on next build
- **Use `--watch` during development** - auto-rebuilds on file changes
- **Keep page-specific styles in the page template** - only shared components go in partials
