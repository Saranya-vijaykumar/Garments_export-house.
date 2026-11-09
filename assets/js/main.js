/**
 * GlobalStitch - Garment Export House
 * Main Bootstrap Script (main.js)
 * Global interactions, FAQ accordions, newsletter, sample document downloads
 */

(function () {
  'use strict';

  // --------------------------------------------------------------------------
  // 1. Dynamic Year Update
  // --------------------------------------------------------------------------
  function initDynamicYear() {
    const yearEls = document.querySelectorAll('.current-year');
    const currentYear = new Date().getFullYear();
    yearEls.forEach((el) => {
      el.textContent = currentYear;
    });
  }

  // --------------------------------------------------------------------------
  // 2. FAQ Accordion Interactive Component
  // --------------------------------------------------------------------------
  function initFaqAccordions() {
    const accordionItems = document.querySelectorAll('.faq-item');
    if (!accordionItems.length) return;

    accordionItems.forEach((item) => {
      const trigger = item.querySelector('.faq-trigger');
      const content = item.querySelector('.faq-content');

      if (trigger && content) {
        trigger.addEventListener('click', () => {
          const isOpen = item.classList.contains('active');

          // Close siblings if in single-accordion group
          const parentGroup = item.closest('.faq-accordion');
          if (parentGroup && !parentGroup.hasAttribute('data-multi-expand')) {
            parentGroup.querySelectorAll('.faq-item').forEach((sibling) => {
              if (sibling !== item) {
                sibling.classList.remove('active');
                const sibTrigger = sibling.querySelector('.faq-trigger');
                if (sibTrigger) sibTrigger.setAttribute('aria-expanded', 'false');
              }
            });
          }

          if (isOpen) {
            item.classList.remove('active');
            trigger.setAttribute('aria-expanded', 'false');
          } else {
            item.classList.add('active');
            trigger.setAttribute('aria-expanded', 'true');
          }
        });
      }
    });
  }

  // --------------------------------------------------------------------------
  // 3. Global Newsletter Subscription Form
  // --------------------------------------------------------------------------
  function initNewsletter() {
    const forms = document.querySelectorAll('.newsletter-form');
    forms.forEach((form) => {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        const input = form.querySelector('input[type="email"]');
        if (!input) return;

        const email = input.value.trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!email || !emailRegex.test(email)) {
          if (window.AuraForm) {
            window.AuraForm.showToast('Invalid Email', 'Please provide a valid trade email address.', 'error');
          } else {
            alert('Please provide a valid trade email address.');
          }
          return;
        }

        const submitBtn = form.querySelector('button[type="submit"]');
        if (submitBtn) submitBtn.disabled = true;

        setTimeout(() => {
          if (submitBtn) submitBtn.disabled = false;
          input.value = '';
          if (window.AuraForm) {
            window.AuraForm.showToast(
              'Subscription Active',
              'You have been subscribed to GlobalStitch Garment Export House Bulletins.',
              'success'
            );
          } else {
            alert('Subscribed successfully to GlobalStitch.');
          }
        }, 600);
      });
    });
  }

  // --------------------------------------------------------------------------
  // 4. Sample Document Download Trigger
  // --------------------------------------------------------------------------
  function initDocDownloads() {
    const downloadBtns = document.querySelectorAll('.download-compliance-doc');
    downloadBtns.forEach((btn) => {
      btn.addEventListener('click', (e) => {
        // Natural link behavior to real generated file in assets/docs/
        if (window.AuraForm) {
          window.AuraForm.showToast(
            'Downloading Dossier',
            'Your sample GlobalStitch ESG & Quality Compliance Audit Summary PDF is preparing for download.',
            'success'
          );
        }
      });
    });
  }

  // --------------------------------------------------------------------------
  // 4b. Testimonials Carousel
  // --------------------------------------------------------------------------
  function initTestimonialSlider() {
    const prevBtn = document.querySelector('.split-card-box .slider-prev');
    const nextBtn = document.querySelector('.split-card-box .slider-next');
    if (!prevBtn || !nextBtn) return;

    const reviews = [
      {
        quote: "“Exceptional Quality, Reliable Partner!”",
        text: "Their professionalism and quality have exceeded our expectations.",
        author: "James Anderson",
        company: "Global Retail Group",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=85"
      },
      {
        quote: "“Seamless Sourcing & Fast Delivery!”",
        text: "GlobalStitch maintains a 99.4% on-time dispatch rate and handles worldwide shipping with perfection.",
        author: "Elena Rostova",
        company: "Nordica Apparel (Stockholm)",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=85"
      },
      {
        quote: "“Uncompromising Technical Precision”",
        text: "Their fabric selection, computerized laser cutting, and certified organic dyes are best in class.",
        author: "Marcus Vance",
        company: "Hudson Fashion Corp (New York)",
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=85"
      }
    ];

    let currentIndex = 0;
    const parentBox = prevBtn.closest('.split-card-box');
    const headingEl = parentBox.querySelector('h3');
    const descEl = parentBox.querySelector('p.text-muted');
    const authorImg = parentBox.querySelector('img');
    const authorName = parentBox.querySelector('div[style*="font-weight: 700"]');
    const authorCo = parentBox.querySelector('div[style*="font-size: 0.85rem"]');

    function updateReview(index) {
      const r = reviews[index];
      if (headingEl) headingEl.textContent = r.quote;
      if (descEl) descEl.textContent = r.text;
      if (authorImg) authorImg.src = r.avatar;
      if (authorName) authorName.textContent = r.author;
      if (authorCo) authorCo.textContent = r.company;
    }

    prevBtn.addEventListener('click', () => {
      currentIndex = (currentIndex - 1 + reviews.length) % reviews.length;
      updateReview(currentIndex);
    });

    nextBtn.addEventListener('click', () => {
      currentIndex = (currentIndex + 1) % reviews.length;
      updateReview(currentIndex);
    });
  }

  // --------------------------------------------------------------------------
  // 5. Individual Blog Article Detail Page Controller (blog-details.html)
  // --------------------------------------------------------------------------
  function initBlogDetailPage() {
    const articleContainer = document.querySelector('#blogArticleBody');
    if (!articleContainer || !window.AuraBlogData) return;

    const urlParams = new URLSearchParams(window.location.search);
    const postId = urlParams.get('id') || 'post-01';
    const article = window.AuraBlogData.find((a) => a.id === postId) || window.AuraBlogData[0];

    // Document Title
    document.title = `${article.title} | GlobalStitch`;

    // Breadcrumb
    const bc = document.querySelector('#blogBreadcrumbTitle');
    if (bc) bc.textContent = article.title;

    // Category Badge
    const catBadge = document.querySelector('#blogCategoryBadge');
    if (catBadge) catBadge.textContent = article.category;

    // Main Heading
    const heading = document.querySelector('#blogMainHeading');
    if (heading) heading.textContent = article.title;

    // Author
    const authorImg = document.querySelector('#blogAuthorAvatar');
    if (authorImg) {
      authorImg.src = article.authorAvatar;
      authorImg.alt = article.author;
    }
    const authorName = document.querySelector('#blogAuthorName');
    if (authorName) authorName.textContent = article.author;
    const authorRole = document.querySelector('#blogAuthorRole');
    if (authorRole) authorRole.textContent = `${article.authorRole}, GlobalStitch`;

    // Publish Meta
    const meta = document.querySelector('#blogPublishMeta');
    if (meta) meta.textContent = `Published: ${article.date} \u2022 ${article.readTime}`;

    // Table of Contents
    const tocList = document.querySelector('#blogTocList');
    if (tocList && article.tableOfContents) {
      tocList.innerHTML = article.tableOfContents
        .map(
          (t) =>
            `<li><a href="#${t.id}" style="color:var(--text-main); font-weight:600;">${t.title}</a></li>`
        )
        .join('');
    }

    // Hero Image
    const heroImg = document.querySelector('#blogHeroImg');
    if (heroImg) {
      heroImg.src = article.heroImage;
      heroImg.alt = article.title;
    }

    // Lead Excerpt
    const lead = document.querySelector('#blogLeadText');
    if (lead) lead.textContent = article.excerpt;

    // Figure Image, Caption & Badge
    const figImg = document.querySelector('#blogFigureImg');
    if (figImg && article.figureImage) {
      figImg.src = article.figureImage;
      figImg.alt = article.figureCaption || article.title;
    }
    const figCaption = document.querySelector('#blogFigureCaption');
    if (figCaption && article.figureCaption) {
      const parts = article.figureCaption.split(':');
      figCaption.innerHTML = `<strong>${parts[0]}:</strong> ${parts[1] || ''}`;
    }
    const figBadge = document.querySelector('#blogFigureBadge');
    if (figBadge && article.figureBadge) {
      figBadge.textContent = article.figureBadge;
    }

    // Blockquote
    const quote = document.querySelector('#blogBlockquote');
    if (quote && article.quote) {
      quote.textContent = article.quote;
    }

    // Render Subsections
    const sectionsContainer = document.querySelector('#blogSectionsContainer');
    if (sectionsContainer && article.sections) {
      sectionsContainer.innerHTML = article.sections
        .map(
          (sec) => `
          <div style="margin-block: 2rem 1.5rem;">
            <h3 id="${sec.id}" style="color: var(--color-primary); margin-bottom: 0.75rem;">${sec.heading}</h3>
            ${sec.content}
          </div>
        `
        )
        .join('');
    }

    // Related Articles (3 other articles with individual links)
    const relatedContainer = document.querySelector('#relatedBlogsGrid');
    if (relatedContainer) {
      const others = window.AuraBlogData.filter((a) => a.id !== article.id).slice(0, 3);
      relatedContainer.innerHTML = '';
      others.forEach((rel) => {
        const col = document.createElement('article');
        col.className = 'card blog-card reveal';
        col.innerHTML = `
          <div class="blog-thumb">
            <a href="blog-details.html?id=${rel.id}" aria-label="${rel.title}">
              <img src="${rel.heroImage}" alt="${rel.title}" loading="lazy">
            </a>
            <span class="card-badge">${rel.categoryBadge || rel.category}</span>
          </div>
          <div class="blog-body">
            <div class="blog-meta">
              <span>${rel.date}</span>
              <span>&bull;</span>
              <span>${rel.readTime}</span>
            </div>
            <h3 class="blog-title">
              <a href="blog-details.html?id=${rel.id}">${rel.title}</a>
            </h3>
            <p class="blog-excerpt">${rel.excerpt}</p>
            <a href="blog-details.html?id=${rel.id}" class="blog-link">
              <span>Read Briefing</span>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
            </a>
          </div>
        `;
        relatedContainer.appendChild(col);
      });
    }
  }

  // Execute on DOM Ready
  document.addEventListener('DOMContentLoaded', () => {
    initDynamicYear();
    initFaqAccordions();
    initNewsletter();
    initDocDownloads();
    initTestimonialSlider();
    initBlogDetailPage();
  });
})();
