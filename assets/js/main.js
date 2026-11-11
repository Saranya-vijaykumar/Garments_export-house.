/**
 * Garmen — Textile & Garment Industry
 * Interactive behaviors: Navigation, Filters, Modal Reader, Form Autfill
 */

document.addEventListener('DOMContentLoaded', function () {
  'use strict';

  // 2. Active Navbar State Highlighter
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link').forEach(function (link) {
    const href = link.getAttribute('href');
    if (href === currentPath || (currentPath === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

  // 3. Interactive Category Filter Engine (Products, Blog, Compliance)
  const filterToolbars = document.querySelectorAll('.filter-toolbar');
  filterToolbars.forEach(function (toolbar) {
    const filterGroup = toolbar.getAttribute('data-filter-group');
    const buttons = toolbar.querySelectorAll('.filter-btn');
    const targetSection = toolbar.closest('section');
    if (!targetSection) return;

    const items = targetSection.querySelectorAll('.filter-item, .garmen-card, .catalog-card');

    buttons.forEach(function (btn) {
      btn.addEventListener('click', function () {
        buttons.forEach(function (b) { b.classList.remove('active'); });
        btn.classList.add('active');

        const filterValue = btn.getAttribute('data-filter');

        items.forEach(function (item) {
          const category = item.getAttribute('data-category');
          if (filterValue === 'all' || category === filterValue || (category && category.includes(filterValue))) {
            item.classList.remove('is-hidden');
            item.style.display = '';
            item.style.opacity = '0';
            item.style.transform = 'translateY(12px)';
            setTimeout(function () {
              item.style.opacity = '1';
              item.style.transform = 'translateY(0)';
            }, 30);
          } else {
            item.classList.add('is-hidden');
            item.style.display = 'none';
          }
        });
      });
    });
  });

  // 4. URL Query Parameter Handler (Auto-filter & Form Auto-fill)
  const urlParams = new URLSearchParams(window.location.search);
  const filterParam = urlParams.get('filter');
  const fabricParam = urlParams.get('fabric');
  const typeParam = urlParams.get('type') || urlParams.get('inquiry');

  // Trigger filter if ?filter=... present
  if (filterParam) {
    const targetBtn = document.querySelector('.filter-btn[data-filter="' + filterParam + '"]');
    if (targetBtn) {
      targetBtn.click();
    }
  }

  // Pre-fill Project Inquiry form if ?fabric=... or ?type=... present
  const projectForms = document.querySelectorAll('.garmen-project-form');
  projectForms.forEach(function (form) {
    const selectEl = form.querySelector('select');
    const textareaEl = form.querySelector('textarea');

    if (fabricParam && selectEl) {
      for (let i = 0; i < selectEl.options.length; i++) {
        if (selectEl.options[i].value.toLowerCase().includes(fabricParam.toLowerCase())) {
          selectEl.selectedIndex = i;
          break;
        }
      }
      if (textareaEl && !textareaEl.value) {
        textareaEl.value = 'Inquiry regarding ' + fabricParam.toUpperCase() + ' Fabric specifications, available GSM, lab dip lead time, and bulk export pricing.';
      }
      form.scrollIntoView({ behavior: 'smooth', block: 'center' });
      form.classList.add('field-highlight');
      setTimeout(function () { form.classList.remove('field-highlight'); }, 3000);
    }

    if (typeParam && selectEl) {
      for (let i = 0; i < selectEl.options.length; i++) {
        if (selectEl.options[i].value.toLowerCase().includes(typeParam.toLowerCase())) {
          selectEl.selectedIndex = i;
          break;
        }
      }
      form.scrollIntoView({ behavior: 'smooth', block: 'center' });
      form.classList.add('field-highlight');
      setTimeout(function () { form.classList.remove('field-highlight'); }, 3000);
    }

    // Submit handler
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      const statusEl = form.querySelector('.form-status') || form.nextElementSibling;
      const submitBtn = form.querySelector('button[type="submit"]');

      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = 'Sending Project Details...';
      }

      setTimeout(function () {
        if (statusEl) {
          statusEl.style.display = 'block';
          statusEl.style.color = '#10B981';
          statusEl.style.backgroundColor = '#ECFDF5';
          statusEl.style.border = '1px solid #A7F3D0';
          statusEl.style.padding = '14px 18px';
          statusEl.style.borderRadius = '6px';
          statusEl.style.marginTop = '16px';
          statusEl.style.fontSize = '14.5px';
          statusEl.style.fontWeight = '600';
          statusEl.innerHTML = '✓ Thank you! Your project specification has been received. Our senior export merchandising team will review your requirements and respond within 24 hours with a custom techpack and FOB quote.';
        }
        form.reset();
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = 'SUBMIT FORM';
        }
      }, 700);
    });
  });

  // 5. Blog Article Modal Reader
  const articleData = {
    
    'csddd': {
      title: 'EU Ecodesign & CSDDD: What Global Apparel Brands Must Know in 2026',
      date: '12 February 2026',
      author: 'Hector Furman, Sustainable Sourcing Lead',
      readTime: '8 min read',
      img: 'assets/images/blog-csddd.jpg',
      content: '<p>The European Union Corporate Sustainability Due Diligence Directive (CSDDD) and Digital Product Passport (DPP) regulations impose mandatory full-tier traceability across garment manufacturing supply chains.</p><h4>Key Compliance Pillars</h4><p>1. <strong>Digital Product Passport (DPP):</strong> Every exported garment must carry an encrypted QR identifier cataloging fiber origin, chemistry declarations, and carbon footprint metrics.</p><p>2. <strong>Durability & Recyclability:</strong> Enforced minimum tensile thresholds and restriction of mixed fiber blends that hinder automated sorting in municipal textile recycling plants.</p><p>3. <strong>Living Wage & Labor Audits:</strong> Independent third-party validation that factory tier-1 and tier-2 partners comply with ILO fundamental conventions.</p>'
    },
    'dyeing': {
      title: 'Low-Liquor Jet Dyeing: Cutting Water Footprint by 68% in Tirupur',
      date: '14 February 2026',
      author: 'Claudia Stephens, Textile Quality Master',
      readTime: '6 min read',
      img: 'assets/images/blog-dyeing-tech.jpg',
      content: '<p>Traditional exhaust batch dyeing consumes between 80 to 120 liters of fresh water per kilogram of cotton fabric. In our modern Tirupur wet processing facility, advanced airflow jet dyeing machines reduce the liquor ratio to an unprecedented 1:3.5.</p><h4>Process Innovations</h4><p>• <strong>Aerodynamic Air-Jet Circulation:</strong> High-velocity steam and compressed air propel fabric rope without requiring hydrostatic liquor immersion.</p><p>• <strong>Automated Salt & Alkali Dosing:</strong> Microprocessor-controlled pH curves ensure 98.5% dyestuff fixation, drastically minimizing wash-off rinse cycles.</p><p>• <strong>Zero Liquid Discharge (ZLD) Integration:</strong> 98% of process effluent is recovered through biological oxidation, ultra-filtration, and multi-stage reverse osmosis.</p>'
    },
    'nearshoring': {
      title: 'Nearshoring vs Strategic Asian Sourcing: Total Landed Cost Analysis',
      date: '15 February 2026',
      author: 'Executive Export Board',
      readTime: '7 min read',
      img: 'assets/images/blog-nearshoring.jpg',
      content: '<p>While nearshoring to Turkey, Portugal, or Central America offers shorter transit times, a rigorous Total Landed Cost (TLC) evaluation demonstrates why integrated Indian textile ecosystems remain indispensable for global fashion brands.</p><h4>Comparative Advantages</h4><p>1. <strong>Raw Material Integration:</strong> India is the world largest producer of cotton, enabling direct seed-to-hanger manufacturing with zero fabric import tariffs.</p><p>2. <strong>Scale & Flexibility:</strong> Balancing multi-million garment seasonal orders with rapid 500-piece capsule turnarounds under a single roof.</p><p>3. <strong>Renewable Energy Adoption:</strong> Over 75% of our spinning and knitting operations are powered by dedicated rooftop solar and wind turbine grids.</p>'
    },
    'seams': {
      title: 'Various Types and Classes of Seams Used in Sewing',
      date: '10 February 2026',
      author: 'Erica Stewart, Lead Technical Pattern Master',
      readTime: '6 min read',
      img: 'assets/images/garmen-blog-seams.jpg',
      content: '<p>In commercial garment export manufacturing, seam performance directly dictates garment durability, elongation tolerance, and aesthetic longevity under repeated wash cycles. Under the international standard <strong>ASTM D6193 (ISO 4916)</strong>, seams are categorized into eight distinct functional classes.</p><h4>Class 1: Superimposed Seams (SS)</h4><p>The most pervasive seam class in t-shirt and knitwear assembly. The edges of two fabric plies are aligned face-to-face and joined via overlock (Stitch Class 504/514). Provides outstanding tensile recovery for stretchy jersey fabrics.</p><h4>Class 2: Lapped Seams (LS)</h4><p>Used predominantly in denim jeans and heavy twill outerwear. Fabric edges overlap in opposite directions, secured by double-needle chainstitches (Stitch Class 401). Delivers unmatched structural integrity against shearing stresses.</p><h4>Class 3: Bound Seams (BS)</h4><p>A binding strip encapsulates the raw edge of the body fabric. Common in necklines, armholes, and unlined luxury jackets where raw cut edges must remain immaculate.</p><h4>Class 4: Flat Seams (FS)</h4><p>Two fabric plies meet edge-to-edge without overlapping, united by interlock coverstitches (Stitch Class 607 flatlock). Highly prized in athletic compression wear and seamless underwear to prevent skin abrasion.</p>'
    },
    'design': {
      title: 'Textile Designing: Types, Importance and Impacts',
      date: '08 February 2026',
      author: 'Melissa Shafer, Senior Textile Designer',
      readTime: '8 min read',
      img: 'assets/images/garmen-blog-design.jpg',
      content: '<p>Textile design bridges mechanical material science and contemporary sartorial aesthetics. It encompasses the structured manipulation of fibers, yarn geometry, weave structures, and surface embellishments.</p><h4>Core Dimensions of Textile Design</h4><p>1. <strong>Structural Design:</strong> Selecting filament counts, twist directions (S vs Z twist), and loom harness configurations (plain, twill, satin, jacquard) to achieve target drape and handfeel.</p><p>2. <strong>Surface Design:</strong> Rotary screen printing, direct-to-fabric digital printing, pigment discharge, and flocking treatments that add visual narrative without sacrificing fabric breathability.</p><h4>Environmental Impact & Circular Design</h4><p>Modern export houses prioritize low-liquor dyeing, GOTS-compliant inks, and mono-fiber constructions that allow post-consumer mechanical recycling without hazardous chemical separation.</p>'
    },
    'thread': {
      title: 'Functional and Aesthetic Properties of Sewing Thread',
      date: '05 February 2026',
      author: 'Claudia Stephens, Textile Quality Master',
      readTime: '5 min read',
      img: 'assets/images/garmen-blog-thread.jpg',
      content: '<p>A chain is only as strong as its weakest link, and a garment is only as reliable as its sewing thread. Thread selection influences seam pucker, needle heat resistance, and wash shrinkage harmony.</p><h4>Essential Technical Parameters</h4><p>1. <strong>Tensile Tenacity:</strong> Corespun polyester threads (e.g. poly-wrap poly-core) deliver 40-50% higher breaking tenacity than spun polyester of equivalent ticket numbers.</p><p>2. <strong>Elongation at Break:</strong> For circular knit activewear, thread must possess a minimum of 18-22% elongation to prevent seam breakage during athletic extension.</p><p>3. <strong>Colorfastness:</strong> Grade 4.5+ fastness to chlorinated pool water, perspiration (acidic and alkaline), and ISO 105-C06 wash test standards.</p>'
    },
    'startup': {
      title: 'Startup Idea for Distinctive Artisanal Fabric-Products',
      date: '02 February 2026',
      author: 'Hector Furman, Sustainable Sourcing Lead',
      readTime: '7 min read',
      img: 'assets/images/garmen-blog-artisanal.jpg',
      content: '<p>Emerging DTC fashion founders face fierce competition from fast-fashion conglomerates. The most profitable modern niche lies in limited-run artisanal products created with traceable provenance.</p><h4>High-Growth Product Categories</h4><p>• <strong>Heritage Handloom Linen Shirts:</strong> Combining pre-washed organic flax with real mother-of-pearl buttons.</p><p>• <strong>Plant-Dyed Capsule Collections:</strong> Utilizing madder root, pomegranate rind, and indigo extracts certified under GOTS 6.0.</p><p>• <strong>Zero-Waste Deadstock Accessories:</strong> Upcycling factory selvage trimmings into luxury bucket hats, tote bags, and quilted laptop sleeves.</p>'
    },
    'weaving': {
      title: 'What is Satin Weave in Textile Fabric Manufacturing',
      date: '28 January 2026',
      author: 'Erica Stewart, Lead Technical Pattern Master',
      readTime: '6 min read',
      img: 'assets/images/garmen-blog-satin.jpg',
      content: '<p>Satin is one of the three fundamental textile weave structures, alongside plain and twill. Its defining characteristic is the deliberate minimization of warp and weft interlacing points, resulting in long surface "floats".</p><h4>The Science of Lustre</h4><p>Because the yarn floats lie uninterrupted on the fabric surface, light reflects in specular fashion rather than scattering diffusely, creating the signature high-sheen satin gloss.</p><h4>Manufacturing Considerations</h4><p>Satin weaves require higher warp density (ends per inch) and are more vulnerable to snagging. In our Tirupur facility, we utilize air-jet rapier looms with automated electronic let-off mechanisms to maintain uniform warp tension and avoid float distortions.</p>'
    },
    'business': {
      title: '5 Great Business Lessons From the Textile Industry',
      date: '25 January 2026',
      author: 'Export Executive Board',
      readTime: '9 min read',
      img: 'assets/images/garmen-blog-business.jpg',
      content: '<p>Having manufactured and exported over 5 million garments to buyers across Europe, the US, and Asia, here are five foundational business truths from the front lines of textile manufacturing:</p><h4>1. Quality Control at the Yarn Stage Saves 10x Later</h4><p>Catching uneven twist or count variation before knitting prevents hundreds of meters of rejected grey fabric down the line.</p><h4>2. Compliance is an Asset, Not a Cost</h4><p>Independent certifications like WRAP, BSCI, and GOTS unlock premium tier-1 global buyers who refuse to trade with unverified subcontractors.</p><h4>3. Transparent Lead Times Build 10-Year Partnerships</h4><p>Giving realistic, data-backed shipping schedules builds deeper commercial loyalty than over-promising and under-delivering.</p><h4>4. Constant Process Water Innovation is Essential</h4><p>Transitioning to Zero Liquid Discharge (ZLD) protects local groundwater and insulates operations from regulatory shutdowns.</p><h4>5. Flexibility and Agility Win the Market</h4><p>Balancing massive high-volume line efficiency with nimble rapid-turnaround sample rooms ensures both stability and innovation.</p>'
    }
  };

  // Create article modal in DOM
  const modalBackdrop = document.createElement('div');
  modalBackdrop.className = 'article-modal-backdrop';
  modalBackdrop.innerHTML = `
    <div class="article-modal-container">
      <div class="article-modal-header">
        <img src="" alt="Article Banner" id="modalArticleImg">
        <button class="article-modal-close" aria-label="Close modal">&times;</button>
      </div>
      <div class="article-modal-body">
        <div class="article-modal-meta">
          <span id="modalArticleDate"></span>
          <span>&bull;</span>
          <span id="modalArticleAuthor"></span>
          <span>&bull;</span>
          <span id="modalArticleReadTime" style="color:var(--garmen-pink); font-weight:700;"></span>
        </div>
        <h2 class="article-modal-title" id="modalArticleTitle"></h2>
        <div class="article-modal-content" id="modalArticleContent"></div>
        <div class="article-modal-footer">
          <span style="font-size:13.5px; color:#64748B;">Published by Garmen Technical Knowledge Base</span>
          <a href="contact.html#project-form" class="btn-make-project" style="padding:8px 18px; font-size:12px;">ENQUIRE WITH OUR TEAM</a>
        </div>
      </div>
    </div>
  `;
  document.body.appendChild(modalBackdrop);

  const modalImg = modalBackdrop.querySelector('#modalArticleImg');
  const modalDate = modalBackdrop.querySelector('#modalArticleDate');
  const modalAuthor = modalBackdrop.querySelector('#modalArticleAuthor');
  const modalReadTime = modalBackdrop.querySelector('#modalArticleReadTime');
  const modalTitle = modalBackdrop.querySelector('#modalArticleTitle');
  const modalContent = modalBackdrop.querySelector('#modalArticleContent');
  const modalClose = modalBackdrop.querySelector('.article-modal-close');

  function openArticleModal(key) {
    const data = articleData[key] || articleData['seams'];
    modalImg.src = data.img;
    modalDate.textContent = data.date;
    modalAuthor.textContent = data.author;
    modalReadTime.textContent = data.readTime;
    modalTitle.textContent = data.title;
    modalContent.innerHTML = data.content;
    modalBackdrop.classList.add('is-open');
    document.body.style.overflow = 'hidden';
  }

  function closeArticleModal() {
    modalBackdrop.classList.remove('is-open');
    document.body.style.overflow = '';
  }

  modalClose.addEventListener('click', closeArticleModal);
  modalBackdrop.addEventListener('click', function (e) {
    if (e.target === modalBackdrop) closeArticleModal();
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeArticleModal();
  });

  // Attach to article card buttons on blog.html
  document.querySelectorAll('[data-article-key]').forEach(function (trigger) {
    trigger.addEventListener('click', function (e) {
      e.preventDefault();
      const key = trigger.getAttribute('data-article-key');
      openArticleModal(key);
    });
  });

  // 6. Smooth Scrolling for Anchor Links (#...)
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const href = anchor.getAttribute('href');
      if (href === '#' || href === '') return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // 7. Floating Back-to-Top Button Handler
  const backToTopBtn = document.querySelector('.back-to-top');
  if (backToTopBtn) {
    window.addEventListener('scroll', function () {
      if (window.scrollY > 350) {
        backToTopBtn.classList.add('active');
      } else {
        backToTopBtn.classList.remove('active');
      }
    }, { passive: true });

    backToTopBtn.addEventListener('click', function (e) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
});
