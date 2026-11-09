# GlobalStitch – Garment Export House HTML5 Website Template

A modern, professional, fully responsive HTML5 website template designed for international garment manufacturers, apparel exporters, clothing suppliers, textile conglomerates, and wholesale sourcing houses.

---

## 1. Project Overview

- **Name**: GlobalStitch – Garment Export House Template (Tirupur, India)
- **Stack**: HTML5, Modern CSS3, Vanilla JavaScript (ES6+)
- **Dependencies**: Zero external heavy frameworks (No React, Next, Vue, Angular, jQuery, or Bootstrap). Pure custom modern web code.
- **Audience**: Tier-1 Apparel Manufacturers, OEM/ODM Clothing Factories, International Sourcing Agencies, Textile Export Houses.
- **Marketplace Standard**: Clean, modular, developer-friendly architecture ready for ThemeForest, TemplateMonster, and enterprise client deployments.

---

## 2. Key Features

- **12 Interlinked HTML5 Pages**:
  1. `index.html` – Corporate Homepage with animated statistics, hero video/banner, capabilities grid, 10-stage process preview, interactive maritime trade route map, and testimonial slider.
  2. `about.html` – 25-Year corporate legacy, leadership team bios, mission/vision/values, and strategic milestone timeline.
  3. `capabilities.html` – Comprehensive machinery specifications, Gerber CAD/CAM auto-cutting, 45 Lean sewing lines, screen & DTG printing, and RFID tracking.
  4. `manufacturing-process.html` – Step-by-step 10-stage production flow from organic yarn spinning to AQL 1.5 container dispatch with interactive FAQ accordion.
  5. `products.html` – Multi-category catalog (Men's, Women's, Kids', Casual, Formal, Sportswear, Workwear, Custom) with real-time text search, instant filter buttons, fabric specification library, and modal quick views.
  6. `product-details.html` – Flagship garment deep-dive (Organic Pima Polo) with interactive multi-angle gallery, technical specification matrix, color swatches, and FOB quote drawer.
  7. `compliance.html` – International export compliance (OEKO-TEX Standard 100, GOTS Organic, BSCI Grade-A, SEDEX SMETA, ISO 9001), in-house testing laboratory protocols, and downloadable sample compliance audit report.
  8. `pricing.html` – Incoterms 2020 export framework (FOB, CIF, CFR, DDP), volume MOQ tiers, and an **Interactive FOB Cost & Lead-Time Estimator**.
  9. `blog.html` – Trade intelligence and regulatory insights with category tags, real-time search, and pagination.
  10. `blog-details.html` – In-depth editorial article on EU CSDDD sustainability directives, sticky Table of Contents, pull quotes, social share buttons, and compliance checklists.
  11. `contact.html` – Global office directory, interactive shipping hub map, and **Enterprise Sourcing Enquiry Form** with drag-and-drop techpack file uploader (type/size validation), inline field checks, and instant reference ticket confirmation modal.
  12. `404.html` – Branded error recovery page with search bar and quick navigation.

- **Dual Theme Support (Light & Dark Mode)**:
  - Controlled via CSS custom variables on `[data-theme="dark"]`.
  - Persisted in browser `localStorage`.
  - Meets WCAG 2.1 AA contrast standards in both themes.

- **Bi-Directional Internationalization (RTL & LTR)**:
  - Full native RTL support (`dir="rtl"`) for Arabic and Hebrew buyers.
  - Logical CSS properties (`margin-inline`, `padding-inline`, `inset-inline`).
  - Mirror transforms for navigation arrows and interactive controls.

- **Advanced Animations & Motion**:
  - Scroll-triggered reveal animations via `IntersectionObserver`.
  - Animated numerical counters with exponential easing.
  - Touch-swipe and mouse-drag testimonial slider.
  - Back-to-top button with scroll visibility.
  - Full respect for `prefers-reduced-motion` accessibility settings.

---

## 3. Directory & File Structure

```text
garment-export-house/
│
├── index.html                  # Corporate Homepage
├── about.html                  # About Us & Leadership
├── capabilities.html           # Infrastructure & Machinery Fleet
├── manufacturing-process.html  # 10-Stage Export Process & AQL Flow
├── products.html               # Product Catalog with Search & Filters
├── product-details.html        # Flagship Garment Tech Pack & Specs
├── compliance.html             # OEKO-TEX, GOTS, BSCI & Lab Testing
├── pricing.html                # FOB Pricing Tiers & Interactive Calculator
├── blog.html                   # Global Trade Insights & Articles
├── blog-details.html           # In-Depth Regulatory Editorial
├── contact.html                # Sourcing Enquiry Form & Shipping Map
├── 404.html                    # Branded Error Page
│
├── assets/
│   ├── css/
│   │   ├── style.css           # Core styling, variables, typography, layout & components
│   │   ├── responsive.css      # Responsive media queries (320px to 1920px)
│   │   ├── animations.css      # Keyframes, scroll reveals & preloader
│   │   └── rtl.css             # Right-to-left layout overrides
│   │
│   ├── js/
│   │   ├── theme.js            # Light/Dark mode switcher with localStorage persistence
│   │   ├── navigation.js       # Sticky nav, mobile drawer, RTL switcher, active link detector
│   │   ├── animations.js       # Scroll observer, count-up stats, testimonial slider
│   │   ├── products.js         # Catalog dataset, category filters, quick-view modal
│   │   ├── form-validation.js  # Enquiry validation, drag-and-drop file uploader, cost calculator
│   │   └── main.js             # Accordions, preloader dismissal, newsletter, doc downloads
│   │
│   └── docs/
│       └── sample-compliance-audit-report.pdf # Downloadable sample audit dossier
│
└── README.md                   # Documentation and customization guide
```

---

## 4. Customization Guide

### 4.1 Color Palette
The color system is defined via CSS variables at the top of `assets/css/style.css`:

```css
:root {
  --color-primary: #142B3B;       /* Deep Navy */
  --color-secondary: #20272D;     /* Charcoal */
  --color-accent: #B99A62;        /* Muted Gold */
  --bg-body: #F7F5F0;             /* Warm Ivory */
  --bg-surface-alt: #E8DFD1;      /* Soft Beige */
}
```
Simply adjust these hex values to align with your corporate branding.

### 4.2 Adding Products
To expand the product catalog, edit the `productsData` array inside `assets/js/products.js`:

```javascript
{
  id: 'prod-10',
  title: 'Your Garment Name',
  category: 'mens', // mens | womens | kids | casual | sportswear | workwear | custom
  categoryLabel: "Men's Wear",
  type: 'Corporate Wear',
  gsm: '220 GSM',
  fabric: '100% Combed Organic Cotton',
  moq: '500 Pcs',
  leadTime: '30 - 45 Days',
  colors: ['#142B3B', '#B99A62'],
  image: 'https://your-image-url.jpg',
  description: 'Detailed description of the garment construction.'
}
```

### 4.3 Connecting the Sourcing Form to a Backend
In `assets/js/form-validation.js`, inside the `form.addEventListener('submit', ...)` handler, replace the simulation `setTimeout` with your fetch request to your API or form service (e.g. Formspree, Formkeep, AWS API Gateway, PHP backend):

```javascript
fetch('https://your-api-endpoint.com/sourcing-enquiry', {
  method: 'POST',
  body: formData
})
.then(response => response.json())
.then(data => {
  showSuccessModal(data.refCode, company, email);
})
.catch(error => {
  showToast('Submission Error', 'Failed to transmit dossier.', 'error');
});
```

---

## 5. Quality Assurance & Browser Support

- **Browsers Supported**: Google Chrome, Mozilla Firefox, Apple Safari, Microsoft Edge, Opera.
- **Mobile Viewports**: Tested across 320px, 375px, 425px (Mobile), 768px (Tablet), 1024px (Laptop), 1440px (Desktop), and 1920px (Widescreen).
- **Accessibility**: Semantic HTML5 elements, ARIA attributes on modals and drawers, visible focus outlines, and respect for `prefers-reduced-motion`.

---

## 6. License & Credits

- Developed for international garment export enterprises and corporate apparel manufacturers.
- Free for commercial customization and marketplace deployment.
