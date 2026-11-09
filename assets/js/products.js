/**
 * GlobalStitch - Garment Export House
 * Products Catalog & Filter Module (products.js)
 * Interactive Filtering, Search, Quick-View Modal, and Catalog Drawer
 */

(function () {
  'use strict';

  // --------------------------------------------------------------------------
  // 1. Comprehensive Product Catalog Dataset (18 Export-Grade Garments)
  // --------------------------------------------------------------------------
  const productsData = [
    {
      id: 'prod-01',
      title: 'Premium Organic Pima Cotton Polo',
      category: 'mens',
      categoryLabel: "Men's Wear",
      type: 'Corporate & Casual',
      gsm: '220 GSM',
      fabric: '100% Organic Pima Cotton Double Piqué',
      moq: '500 Pcs / Color',
      leadTime: '30 - 45 Days',
      colors: ['#142B3B', '#B99A62', '#20272D', '#FFFFFF', '#6B7A82'],
      image: 'assets/images/product-mens.jpg',
      description: 'Export-grade luxury polo crafted with long-staple organic Pima cotton yarn. Features a 3-button mother-of-pearl placket, reinforced herringbone neck tape, and pre-shrunk mercerized finish.'
    },
    {
      id: 'prod-02',
      title: 'Tailored Linen-Blend Executive Blazer',
      category: 'mens',
      categoryLabel: "Men's Wear",
      type: 'Formal Wear',
      gsm: '260 GSM',
      fabric: '55% European Flax Linen / 45% Combed Cotton',
      moq: '300 Pcs / Style',
      leadTime: '45 - 60 Days',
      colors: ['#20272D', '#C5BAA8', '#142B3B', '#4A5B68'],
      image: 'assets/images/product-formal.jpg',
      description: 'Breathable, unstructured summer blazer with half-canvas lining, horn buttons, and AMF pick-stitch detailing. Ideal for European and North American seasonal retail collections.'
    },
    {
      id: 'prod-03',
      title: 'Oxford Button-Down Formal Shirt',
      category: 'mens',
      categoryLabel: "Men's Wear",
      type: 'Formal / Business Casual',
      gsm: '160 GSM',
      fabric: '100% Giza Egyptian Long-Staple Cotton',
      moq: '400 Pcs / Color',
      leadTime: '35 - 50 Days',
      colors: ['#FFFFFF', '#B4D3E5', '#E8DFD1', '#142B3B'],
      image: 'assets/images/product-mens.jpg',
      description: 'Crisp 80/2 two-ply combed Oxford weave shirt with easy-iron resin finish, split back yoke, single-needle side seams, and genuine shell buttons.'
    },
    {
      id: 'prod-04',
      title: 'Modal Ribbed Lounge Set & Cardigan',
      category: 'womens',
      categoryLabel: "Women's Wear",
      type: 'Casual Wear',
      gsm: '240 GSM',
      fabric: '95% Lenzing Modal / 5% Elastane',
      moq: '600 Sets / Style',
      leadTime: '35 - 50 Days',
      colors: ['#E8DFD1', '#9BAEC0', '#142B3B', '#D8C3A5'],
      image: 'assets/images/product-womens.jpg',
      description: 'Ultra-soft, sustainable women’s loungewear set with natural drape and silk-like hand feel. OEKO-TEX Standard 100 Class I certified eco-friendly reactive dyeing.'
    },
    {
      id: 'prod-05',
      title: 'Silk-Touch Georgette Wrap Dress',
      category: 'womens',
      categoryLabel: "Women's Wear",
      type: 'Formal / Evening',
      gsm: '135 GSM',
      fabric: '100% Recycled Poly-Georgette (GRS Certified)',
      moq: '400 Pcs / Print',
      leadTime: '40 - 55 Days',
      colors: ['#B99A62', '#142B3B', '#7A2021', '#2C3E50'],
      image: 'assets/images/product-womens.jpg',
      description: 'Flattering silhouette wrap dress printed with digital eco-reactive inks. Fully lined bodice with French seams and concealed side zipper.'
    },
    {
      id: 'prod-06',
      title: 'Bohemian Tencel Maxi Shirt Dress',
      category: 'womens',
      categoryLabel: "Women's Wear",
      type: 'Casual / Resortwear',
      gsm: '155 GSM',
      fabric: '100% Lyocell Tencel (Closed-Loop)',
      moq: '500 Pcs / Style',
      leadTime: '35 - 48 Days',
      colors: ['#8C9A86', '#E8DFD1', '#C29B38', '#20272D'],
      image: 'assets/images/material-linen.jpg',
      description: 'Airy botanical Lyocell dress with waist belt, side slits, and biodegradable corozo buttons. Silky hand-feel with excellent moisture management.'
    },
    {
      id: 'prod-07',
      title: 'Hypoallergenic Organic Cotton Rompers',
      category: 'kids',
      categoryLabel: "Kids' Wear",
      type: 'Infant & Toddler',
      gsm: '180 GSM',
      fabric: '100% GOTS Certified Combed Interlock',
      moq: '1,000 Pcs / Pack',
      leadTime: '30 - 45 Days',
      colors: ['#F7F5F0', '#E8DFD1', '#A3B5C7', '#D1E8D5'],
      image: 'assets/images/product-kids.jpg',
      description: 'Ultra-gentle babywear designed to meet strict US CPSC and EU child safety regulations. Nickel-free YKK snap fasteners, tagless flatlock comfort stitching.'
    },
    {
      id: 'prod-08',
      title: 'Kids Reinforced Stretch Denim Dungarees',
      category: 'kids',
      categoryLabel: "Kids' Wear",
      type: 'Childrenswear Casual',
      gsm: '280 GSM',
      fabric: '98% Cotton / 2% Elastane Flexible Denim',
      moq: '600 Pcs / Color',
      leadTime: '35 - 50 Days',
      colors: ['#283E51', '#4B79A1', '#B0BEC5'],
      image: 'assets/images/product-kids.jpg',
      description: 'Durable playwear with adjustable shoulder straps, reinforced double-layer knees, and ozone-washed eco fading with zero harmful chemicals.'
    },
    {
      id: 'prod-09',
      title: 'Junior French Terry Tracksuit Set',
      category: 'kids',
      categoryLabel: "Kids' Wear",
      type: 'Sportswear & Loungewear',
      gsm: '260 GSM',
      fabric: '100% Organic Combed Loopback Cotton',
      moq: '800 Sets / Style',
      leadTime: '30 - 45 Days',
      colors: ['#142B3B', '#B99A62', '#E74C3C', '#27AE60'],
      image: 'assets/images/product-kids.jpg',
      description: 'Cozy two-piece kids sweatshirt and jogger pants set. Features rib knit collar and cuffs, soft elasticated waistband, and non-toxic water-based prints.'
    },
    {
      id: 'prod-10',
      title: 'Heavyweight Loopback French Terry Hoodie',
      category: 'casual',
      categoryLabel: 'Casual Wear',
      type: 'Streetwear / Casual',
      gsm: '450 GSM',
      fabric: '100% Combed Cotton Heavy French Terry',
      moq: '500 Pcs / Color',
      leadTime: '35 - 45 Days',
      colors: ['#20272D', '#F7F5F0', '#B99A62', '#142B3B'],
      image: 'assets/images/product-casual.jpg',
      description: 'Luxury streetwear staple with double-layered hood, 2x2 ribbed side gussets, herringbone drawcords with engraved metal aglets.'
    },
    {
      id: 'prod-11',
      title: 'Raw Edge Oversized Heavyweight Tee',
      category: 'casual',
      categoryLabel: 'Casual Wear',
      type: 'Streetwear Drop',
      gsm: '260 GSM',
      fabric: '100% Ring-Spun Combed Jersey',
      moq: '600 Pcs / Color',
      leadTime: '25 - 35 Days',
      colors: ['#20272D', '#D1C7BD', '#5A6B7C', '#F7F5F0'],
      image: 'assets/images/product-casual.jpg',
      description: 'Drop-shoulder relaxed silhouette with 1.25-inch high-ribbed collar, twin-needle hem finishing, and vintage enzyme bio-wash.'
    },
    {
      id: 'prod-12',
      title: 'Garment-Dyed Utility Overshirt',
      category: 'casual',
      categoryLabel: 'Casual Wear',
      type: 'Outerwear / Casual',
      gsm: '300 GSM',
      fabric: '100% Cotton Broken Twill Weave',
      moq: '400 Pcs / Color',
      leadTime: '40 - 55 Days',
      colors: ['#4E5D52', '#B99A62', '#142B3B', '#3E3835'],
      image: 'assets/images/product-casual.jpg',
      description: 'Rugged transitional layer with twin chest bellow pockets, concealed matte horn buttons, and garment pigment dyeing for authentic patina.'
    },
    {
      id: 'prod-13',
      title: 'Technical Seamless Compression Leggings',
      category: 'sportswear',
      categoryLabel: 'Sportswear',
      type: 'Activewear / Performance',
      gsm: '280 GSM',
      fabric: '78% Recycled Polyamide / 22% Lycra Xtra Life',
      moq: '800 Pcs / Style',
      leadTime: '45 - 55 Days',
      colors: ['#20272D', '#142B3B', '#5A6B7C', '#84754E'],
      image: 'assets/images/product-sportswear.jpg',
      description: 'High-waisted compression athletic tights with moisture-wicking QuickDry finish, 4-way stretch, and bonded phone pocket. Tested to 50+ wash cycles.'
    },
    {
      id: 'prod-14',
      title: 'Ultra-Lightweight Hydrophobic Windbreaker',
      category: 'sportswear',
      categoryLabel: 'Sportswear',
      type: 'Running & Outdoor',
      gsm: '85 GSM',
      fabric: '100% GRS Recycled Micro-Ripstop Nylon',
      moq: '500 Pcs / Color',
      leadTime: '40 - 50 Days',
      colors: ['#142B3B', '#2ECC71', '#E74C3C', '#20272D'],
      image: 'assets/images/product-sportswear.jpg',
      description: 'Packable performance jacket with PFC-free Bionic Finish Eco water repellency, laser-cut underarm ventilation eyelets, and YKK Aquaguard zippers.'
    },
    {
      id: 'prod-15',
      title: 'High-Visibility Flame Retardant Workwear',
      category: 'workwear',
      categoryLabel: 'Workwear',
      type: 'Industrial Safety Uniform',
      gsm: '320 GSM',
      fabric: '80% Cotton / 19% Polyester / 1% Antistatic Grid',
      moq: '500 Sets / Order',
      leadTime: '45 - 60 Days',
      colors: ['#E67E22', '#142B3B', '#27AE60', '#F39C12'],
      image: 'assets/images/product-workwear.jpg',
      description: 'EN ISO 11612 & EN ISO 20471 certified safety utility jacket and cargo trousers with 3M Scotchlite reflective bands, reinforced triple-stitched crotch.'
    },
    {
      id: 'prod-16',
      title: 'Hospitality & Healthcare Anti-Microbial Scrub Set',
      category: 'workwear',
      categoryLabel: 'Workwear',
      type: 'Healthcare & Clinical',
      gsm: '190 GSM',
      fabric: '72% Polyester / 21% Rayon / 7% Spandex Silvadur',
      moq: '1,000 Sets / Style',
      leadTime: '30 - 45 Days',
      colors: ['#1ABC9C', '#2980B9', '#8E44AD', '#34495E'],
      image: 'assets/images/product-workwear.jpg',
      description: 'Fluid-barrier and silver-ion antimicrobial treated technical scrubs with 4-way stretch, multiple cargo pockets, and industrial wash durability up to 70°C.'
    },
    {
      id: 'prod-17',
      title: 'Bespoke Private Label Knitwear & Merchandising',
      category: 'custom',
      categoryLabel: 'Custom Apparel',
      type: 'OEM / ODM Manufacturing',
      gsm: 'Custom (140 - 500 GSM)',
      fabric: 'Custom blends, Cashmere, Merino wool, Recycled Blends',
      moq: 'Negotiable / Flexible',
      leadTime: '40 - 65 Days',
      colors: ['#142B3B', '#B99A62', '#20272D', '#E8DFD1'],
      image: 'assets/images/about-garment-rack.jpg',
      description: 'Full-service OEM/ODM product development including CAD pattern grading, tech pack translation, 3D digital sampling, custom woven labels, and barcoded export polybags.'
    },
    {
      id: 'prod-18',
      title: 'Luxury Cashmere-Wool Blend Knit Sweater',
      category: 'custom',
      categoryLabel: 'Custom Apparel',
      type: 'Fine Gauge Knitwear',
      gsm: '310 GSM',
      fabric: '70% Ultra-Fine Merino Wool / 30% Mongolian Cashmere',
      moq: '300 Pcs / Color',
      leadTime: '45 - 60 Days',
      colors: ['#E8DFD1', '#142B3B', '#8C7B6B', '#20272D'],
      image: 'assets/images/product-formal.jpg',
      description: 'Fully fashioned 12-gauge luxury knit sweater with linked crewneck, ribbed cuffs, and non-mulesed Responsible Wool Standard (RWS) certified yarn.'
    }
  ];

  // --------------------------------------------------------------------------
  // 2. Render Products into Container
  // --------------------------------------------------------------------------
  function renderProducts(items, container) {
    if (!container) return;
    container.innerHTML = '';

    if (!items.length) {
      container.innerHTML = `
        <div class="col-span-full text-center" style="grid-column: 1 / -1; padding: 4rem 1rem;">
          <h4 style="margin-bottom: 0.5rem;">No matching garments found</h4>
          <p class="text-muted">Try adjusting your category filter or search keywords.</p>
        </div>
      `;
      return;
    }

    items.forEach((item) => {
      const card = document.createElement('div');
      card.className = 'product-card reveal';
      card.setAttribute('data-category', item.category);

      const colorDots = item.colors
        .map(
          (c) =>
            `<span style="display:inline-block; width:12px; height:12px; border-radius:50%; background-color:${c}; border:1px solid rgba(0,0,0,0.15);" title="Color option"></span>`
        )
        .join(' ');

      card.innerHTML = `
        <div class="product-thumb">
          <a href="product-details.html?id=${item.id}" aria-label="${item.title}">
            <img src="${item.image}" alt="${item.title}" loading="lazy">
          </a>
          <span class="card-badge">${item.gsm}</span>
          <div class="product-actions-overlay">
            <button class="product-action-btn quick-view-btn" data-id="${item.id}" title="Quick View Specifications" aria-label="Quick View ${item.title}">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>
            </button>
            <a href="product-details.html?id=${item.id}" class="product-action-btn" title="View Full Tech Specs" aria-label="View Full Tech Specs">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
            </a>
          </div>
        </div>
        <div class="product-info">
          <span class="product-category">${item.categoryLabel}</span>
          <h4 class="product-title">
            <a href="product-details.html?id=${item.id}" style="color:inherit; text-decoration:none;">${item.title}</a>
          </h4>
          <p style="font-size: 0.85rem; color: var(--text-muted); margin-bottom: 0.75rem;">${item.fabric}</p>
          <div style="display: flex; gap: 6px; margin-bottom: 0.75rem;">
            ${colorDots}
          </div>
          <div class="product-meta">
            <span class="product-moq">MOQ: ${item.moq}</span>
            <span style="font-size: 0.8rem; color: var(--text-muted);">${item.leadTime}</span>
          </div>
        </div>
      `;

      container.appendChild(card);
    });

    // Attach Quick View events
    attachQuickViewEvents(container);
  }

  // --------------------------------------------------------------------------
  // 3. Category Filter & Live Search with URL Query Param Support
  // --------------------------------------------------------------------------
  function initProductFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const searchInput = document.querySelector('.product-search-input');
    const catalogContainer = document.querySelector('.product-catalog-grid');

    if (!catalogContainer) return;

    let activeCategory = 'all';
    let searchQuery = '';

    // Parse URL search parameters (e.g. ?category=mens or ?search=linen)
    const urlParams = new URLSearchParams(window.location.search);
    const categoryParam = urlParams.get('category') || urlParams.get('filter');
    const searchParam = urlParams.get('search') || urlParams.get('q');

    if (categoryParam) {
      activeCategory = categoryParam.toLowerCase();
      filterButtons.forEach((btn) => {
        if (btn.getAttribute('data-filter') === activeCategory) {
          filterButtons.forEach((b) => b.classList.remove('active'));
          btn.classList.add('active');
        }
      });
    }

    if (searchParam && searchInput) {
      searchQuery = searchParam.trim().toLowerCase();
      searchInput.value = searchParam;
    }

    function filterAndRender() {
      const filtered = productsData.filter((item) => {
        const matchesCategory =
          activeCategory === 'all' || item.category === activeCategory;
        const matchesSearch =
          item.title.toLowerCase().includes(searchQuery) ||
          item.fabric.toLowerCase().includes(searchQuery) ||
          item.categoryLabel.toLowerCase().includes(searchQuery) ||
          item.description.toLowerCase().includes(searchQuery);

        return matchesCategory && matchesSearch;
      });

      renderProducts(filtered, catalogContainer);
    }

    // Filter Buttons
    filterButtons.forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        filterButtons.forEach((b) => b.classList.remove('active'));
        btn.classList.add('active');
        activeCategory = btn.getAttribute('data-filter') || 'all';
        filterAndRender();
      });
    });

    // Search Input
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        searchQuery = e.target.value.trim().toLowerCase();
        filterAndRender();
      });
    }

    // Initial render
    filterAndRender();
  }

  // --------------------------------------------------------------------------
  // 4. Quick View Modal
  // --------------------------------------------------------------------------
  function attachQuickViewEvents(container) {
    const quickBtns = container.querySelectorAll('.quick-view-btn');
    const modal = document.querySelector('.product-modal');
    if (!modal) return;

    quickBtns.forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const prodId = btn.getAttribute('data-id');
        const prod = productsData.find((p) => p.id === prodId);
        if (prod) {
          openQuickViewModal(prod, modal);
        }
      });
    });
  }

  function openQuickViewModal(prod, modal) {
    const modalBody = modal.querySelector('.modal-body');
    if (!modalBody) return;

    const swatchHtml = prod.colors
      .map(
        (c) =>
          `<span style="width:24px; height:24px; border-radius:50%; background-color:${c}; border:2px solid #FFF; box-shadow:0 0 0 1px rgba(0,0,0,0.2); cursor:pointer;" title="${c}"></span>`
      )
      .join('');

    modalBody.innerHTML = `
      <div class="grid grid-2" style="gap: 2rem; align-items: center;">
        <div style="border-radius: var(--radius-md); overflow: hidden; max-height: 420px;">
          <img src="${prod.image}" alt="${prod.title}" style="width:100%; height:100%; object-fit:cover;">
        </div>
        <div>
          <span class="product-category">${prod.categoryLabel} / ${prod.type}</span>
          <h3 style="margin-block: 0.35rem 0.75rem;">${prod.title}</h3>
          <p style="font-size: 0.95rem; color: var(--text-muted); margin-bottom: 1.25rem;">${prod.description}</p>
          
          <div style="background-color: var(--bg-surface-alt); padding: 1rem; border-radius: var(--radius-sm); margin-bottom: 1.25rem;">
            <div style="display:flex; justify-content:space-between; margin-bottom: 0.4rem; font-size: 0.9rem;">
              <strong>Fabric Specification:</strong> <span>${prod.fabric}</span>
            </div>
            <div style="display:flex; justify-content:space-between; margin-bottom: 0.4rem; font-size: 0.9rem;">
              <strong>Fabric Weight:</strong> <span>${prod.gsm}</span>
            </div>
            <div style="display:flex; justify-content:space-between; margin-bottom: 0.4rem; font-size: 0.9rem;">
              <strong>Minimum Order (MOQ):</strong> <span>${prod.moq}</span>
            </div>
            <div style="display:flex; justify-content:space-between; font-size: 0.9rem;">
              <strong>Production Lead Time:</strong> <span>${prod.leadTime}</span>
            </div>
          </div>

          <div style="margin-bottom: 1.5rem;">
            <strong style="font-size:0.85rem; display:block; margin-bottom:0.5rem; text-transform:uppercase; letter-spacing:0.05em;">Available Base Shades:</strong>
            <div style="display:flex; gap:0.5rem;">${swatchHtml}</div>
          </div>

          <div style="display:flex; gap:0.75rem; flex-wrap:wrap;">
            <a href="contact.html?product=${encodeURIComponent(prod.title)}" class="btn btn-primary btn-sm">
              Inquire Bulk Order
            </a>
            <a href="product-details.html?id=${prod.id}" class="btn btn-secondary btn-sm">
              Full Tech Pack Specs
            </a>
          </div>
        </div>
      </div>
    `;

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';

    // Bind Close buttons
    const closeBtn = modal.querySelector('.modal-close');
    if (closeBtn) {
      closeBtn.onclick = () => closeQuickViewModal(modal);
    }

    modal.onclick = (e) => {
      if (e.target === modal) {
        closeQuickViewModal(modal);
      }
    };
  }

  function closeQuickViewModal(modal) {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      const activeModal = document.querySelector('.modal.active');
      if (activeModal) {
        closeQuickViewModal(activeModal);
      }
    }
  });

  // --------------------------------------------------------------------------
  // 5. Individual Product Details Page Controller (product-details.html)
  // --------------------------------------------------------------------------
  function initProductDetailPage() {
    const detailContainer = document.querySelector('.product-deep-dive-section');
    if (!detailContainer) return;

    const urlParams = new URLSearchParams(window.location.search);
    const prodId = urlParams.get('id') || 'prod-01';
    const prod = productsData.find((p) => p.id === prodId) || productsData[0];

    // 1. Update Document Title
    document.title = `${prod.title} | Technical Specification | GlobalStitch`;

    // 2. Breadcrumb
    const breadcrumbCurrent = document.querySelector('#productBreadcrumbCurrent');
    if (breadcrumbCurrent) {
      breadcrumbCurrent.textContent = prod.title;
    }

    // 3. Style Code & Category Subtitle
    const styleSubtitle = document.querySelector('#productStyleSubtitle');
    if (styleSubtitle) {
      styleSubtitle.innerHTML = `${prod.categoryLabel} &bull; Style #${prod.id.toUpperCase()}`;
    }

    // 4. Main Title & Lead Description
    const mainTitle = document.querySelector('#productDetailMainTitle');
    if (mainTitle) {
      mainTitle.textContent = prod.title;
    }

    const mainLead = document.querySelector('#productDetailLead');
    if (mainLead) {
      mainLead.textContent = prod.description;
    }

    // 5. Price & MOQ Details
    const priceDisplay = document.querySelector('#productDetailPrice');
    if (priceDisplay) {
      let estPrice = '$4.95 – $6.40';
      if (prod.category === 'kids') estPrice = '$2.90 – $4.20';
      else if (prod.category === 'sportswear') estPrice = '$6.20 – $8.80';
      else if (prod.category === 'workwear') estPrice = '$14.50 – $21.00';
      else if (prod.category === 'custom') estPrice = '$12.00 – $24.00';
      else if (prod.title.includes('Hoodie') || prod.title.includes('Sweatshirt')) estPrice = '$9.50 – $13.80';
      else if (prod.title.includes('Dress')) estPrice = '$7.90 – $11.50';
      else if (prod.title.includes('Shirt')) estPrice = '$6.50 – $8.90';

      priceDisplay.innerHTML = `${estPrice} <span style="font-size:0.9rem; font-family:var(--font-body); font-weight:400; color:var(--text-muted);">/ Unit</span>`;
    }

    const moqText = document.querySelector('#productDetailMoqText');
    if (moqText) {
      moqText.innerHTML = `<strong>Minimum Order Quantity (MOQ):</strong> ${prod.moq} &bull; <strong>Bulk Lead Time:</strong> ${prod.leadTime}`;
    }

    // 6. Color Swatches
    const swatchContainer = document.querySelector('#productDetailSwatches');
    if (swatchContainer) {
      swatchContainer.innerHTML = prod.colors
        .map(
          (c) =>
            `<span style="width:32px; height:32px; border-radius:50%; background-color:${c}; border:2px solid #FFF; box-shadow:0 0 0 1px rgba(0,0,0,0.25); cursor:pointer;" title="Hex ${c}"></span>`
        )
        .join('') + `<span style="font-size:0.85rem; color:var(--text-muted); margin-left:0.5rem;">+ Custom Pantone Matching available</span>`;
    }

    // 7. Request Quote CTA
    const quoteBtn = document.querySelector('#productDetailQuoteBtn');
    if (quoteBtn) {
      quoteBtn.href = `contact.html?style=${prod.id}&title=${encodeURIComponent(prod.title)}&category=${prod.category}`;
    }

    // 8. Main Product Image & Interactive Thumbnails
    const mainImg = document.querySelector('#mainProductImg');
    if (mainImg) {
      mainImg.src = prod.image;
      mainImg.alt = prod.title;
    }

    // Complementary angle images based on category
    const detailImages = [
      prod.image,
      'https://images.unsplash.com/photo-1581655353564-df123a1eb820?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&w=1000&q=80'
    ];

    const thumbButtons = document.querySelectorAll('.thumb-btn');
    thumbButtons.forEach((btn, index) => {
      const img = btn.querySelector('img');
      const targetSrc = detailImages[index] || prod.image;
      if (img) {
        img.src = targetSrc;
        img.alt = `${prod.title} view ${index + 1}`;
      }
      btn.onclick = () => {
        thumbButtons.forEach((b) => {
          b.classList.remove('active');
          b.style.borderColor = 'transparent';
        });
        btn.classList.add('active');
        btn.style.borderColor = 'var(--color-accent)';
        if (mainImg) mainImg.src = targetSrc;
      };
    });

    // 9. Technical Specifications Table
    const specFabric = document.querySelector('#specFabric');
    if (specFabric) specFabric.textContent = prod.fabric;

    const specGsm = document.querySelector('#specGsm');
    if (specGsm) specGsm.textContent = prod.gsm;

    const specClass = document.querySelector('#specClass');
    if (specClass) specClass.textContent = `${prod.categoryLabel} / ${prod.type}`;

    // 10. Related Products List (3 other products linking to their individual product-details.html?id=...)
    const relatedContainer = document.querySelector('#relatedProductsGrid');
    if (relatedContainer) {
      const otherProds = productsData.filter((p) => p.id !== prod.id).slice(0, 3);
      relatedContainer.innerHTML = '';
      otherProds.forEach((rel) => {
        const itemCol = document.createElement('div');
        itemCol.className = 'card';
        itemCol.style.overflow = 'hidden';
        itemCol.style.padding = '0';
        itemCol.innerHTML = `
          <div style="height: 220px; overflow: hidden; position: relative;">
            <a href="product-details.html?id=${rel.id}">
              <img src="${rel.image}" alt="${rel.title}" style="width:100%; height:100%; object-fit:cover;">
            </a>
            <span class="card-badge">${rel.gsm}</span>
          </div>
          <div style="padding: 1.25rem;">
            <span class="product-category">${rel.categoryLabel}</span>
            <h4 style="font-size: 1.05rem; margin-block: 0.25rem 0.5rem;">
              <a href="product-details.html?id=${rel.id}" style="color:inherit; text-decoration:none;">${rel.title}</a>
            </h4>
            <p style="font-size: 0.82rem; color: var(--text-muted); margin-bottom: 0.75rem;">${rel.fabric}</p>
            <div style="display:flex; justify-content:space-between; align-items:center; border-top:1px solid var(--border-light); padding-top:0.75rem;">
              <span style="font-size:0.8rem; font-weight:600; color:var(--color-accent);">MOQ: ${rel.moq}</span>
              <a href="product-details.html?id=${rel.id}" style="font-size:0.85rem; font-weight:700; color:var(--color-primary); text-decoration:none;">View Specs &rarr;</a>
            </div>
          </div>
        `;
        relatedContainer.appendChild(itemCol);
      });
    }
  }

  // DOM Ready initialization
  document.addEventListener('DOMContentLoaded', () => {
    initProductFilters();
    initProductDetailPage();
  });

  window.AuraProducts = {
    getAll: () => productsData,
    render: renderProducts,
    initDetailPage: initProductDetailPage
  };
})();
