/**
 * Garmen Textile & Garment Export House
 * Universal Theme, Direction & Mobile Navigation Controller (theme.js)
 * Manages:
 *  1. Light / Dark mode toggle with persistent storage ('garmen_theme')
 *  2. LTR / RTL direction toggle with persistent storage ('garmen_dir')
 *  3. Dynamic synchronization of navbar control buttons & labels
 *  4. Mobile Hamburger Button & Slide-out Navigation Drawer with complete submenus
 *  5. Crystal clear high-contrast font visibility across both themes
 */

(function () {
  'use strict';

  const THEME_KEY = 'garmen_theme';
  const DIR_KEY = 'garmen_dir';
  const htmlRoot = document.documentElement;

  // 1. Initial State Resolution
  function getPreferredTheme() {
    const stored = localStorage.getItem(THEME_KEY) || localStorage.getItem('globalstitch_theme');
    if (stored === 'dark' || stored === 'light') {
      return stored;
    }
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light';
  }

  function getPreferredDir() {
    const stored = localStorage.getItem(DIR_KEY) || localStorage.getItem('globalstitch_dir');
    return stored === 'rtl' ? 'rtl' : 'ltr';
  }

  // 2. Set Theme Function
  function setTheme(theme) {
    if (theme === 'dark') {
      htmlRoot.setAttribute('data-theme', 'dark');
    } else {
      htmlRoot.setAttribute('data-theme', 'light');
    }
    localStorage.setItem(THEME_KEY, theme);
    localStorage.setItem('globalstitch_theme', theme);
    updateButtons();
  }

  // 3. Set Direction Function
  function setDir(dir) {
    if (dir === 'rtl') {
      htmlRoot.setAttribute('dir', 'rtl');
    } else {
      htmlRoot.setAttribute('dir', 'ltr');
    }
    localStorage.setItem(DIR_KEY, dir);
    localStorage.setItem('globalstitch_dir', dir);
    updateButtons();
  }

  // 4. Update UI Buttons & Badges (Synchronizes topbar & mobile drawer)
  function updateButtons() {
    const isDark = htmlRoot.getAttribute('data-theme') === 'dark';
    const isRtl = htmlRoot.getAttribute('dir') === 'rtl';

    document.querySelectorAll('.theme-toggle').forEach((btn) => {
      btn.setAttribute('aria-pressed', isDark ? 'true' : 'false');
      btn.setAttribute('title', isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode');
      const label = btn.querySelector('.theme-label');
      if (label) {
        label.textContent = isDark ? 'Light' : 'Dark';
      }
    });

    document.querySelectorAll('.rtl-toggle').forEach((btn) => {
      btn.setAttribute('aria-pressed', isRtl ? 'true' : 'false');
      btn.setAttribute('title', isRtl ? 'Switch to LTR Layout' : 'Switch to RTL Layout');
      const label = btn.querySelector('.dir-label');
      if (label) {
        label.textContent = isRtl ? 'LTR' : 'RTL';
      }
    });
  }

  // Apply initial preferences immediately before DOM render to prevent flash
  const initialTheme = getPreferredTheme();
  const initialDir = getPreferredDir();
  setTheme(initialTheme);
  setDir(initialDir);

  // 5. Ensure Theme, RTL and Hamburger controls exist in navbar
  function mountNavbarControls() {
    const containers = document.querySelectorAll('.header-cta, .header-actions');
    containers.forEach((container) => {
      // 5.1 Theme Toggle
      if (!container.querySelector('.theme-toggle')) {
        const themeBtn = document.createElement('button');
        themeBtn.type = 'button';
        themeBtn.className = 'nav-control-btn theme-toggle';
        themeBtn.id = 'themeToggleBtn';
        themeBtn.setAttribute('aria-label', 'Toggle Dark and Light Mode');
        themeBtn.setAttribute('title', 'Switch Theme (Dark / Light)');
        themeBtn.innerHTML = `
          <span class="theme-icon-sun" aria-hidden="true">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>
          </span>
          <span class="theme-icon-moon" aria-hidden="true">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
          </span>
          <span class="control-label theme-label">Dark</span>
        `;
        container.insertBefore(themeBtn, container.firstChild);
      }

      // 5.2 RTL Toggle
      if (!container.querySelector('.rtl-toggle')) {
        const rtlBtn = document.createElement('button');
        rtlBtn.type = 'button';
        rtlBtn.className = 'nav-control-btn rtl-toggle';
        rtlBtn.id = 'rtlToggleBtn';
        rtlBtn.setAttribute('aria-label', 'Toggle RTL or LTR Layout');
        rtlBtn.setAttribute('title', 'Switch Direction (LTR / RTL)');
        rtlBtn.innerHTML = `
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M4 17h16"/><path d="m14 11 6 6-6 6"/><path d="M20 7H4"/><path d="m10 1-6 6 6 6"/>
          </svg>
          <span class="control-label dir-label">RTL</span>
        `;
        const themeBtn = container.querySelector('.theme-toggle');
        if (themeBtn && themeBtn.nextSibling) {
          container.insertBefore(rtlBtn, themeBtn.nextSibling);
        } else {
          container.appendChild(rtlBtn);
        }
      }

      // 5.3 Mobile Hamburger Button
      if (!container.querySelector('.menu-toggle, .hamburger-btn')) {
        const menuBtn = document.createElement('button');
        menuBtn.type = 'button';
        menuBtn.className = 'menu-toggle hamburger-btn';
        menuBtn.id = 'menuToggleBtn';
        menuBtn.setAttribute('aria-label', 'Toggle Mobile Navigation Menu');
        menuBtn.setAttribute('aria-expanded', 'false');
        menuBtn.setAttribute('title', 'Navigation Menu');
        menuBtn.innerHTML = `
          <span class="hamburger-box">
            <span class="hamburger-bar"></span>
            <span class="hamburger-bar"></span>
            <span class="hamburger-bar"></span>
          </span>
        `;
        container.appendChild(menuBtn);
      }
    });

    updateButtons();
  }

  // 6. Build and Mount Mobile Drawer
  function mountMobileDrawer() {
    if (document.querySelector('.mobile-drawer')) return;

    // Overlay
    const overlay = document.createElement('div');
    overlay.className = 'mobile-overlay';
    overlay.id = 'mobileOverlay';
    document.body.appendChild(overlay);

    // Current path detection for active link
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';

    // Drawer container
    const drawer = document.createElement('aside');
    drawer.className = 'mobile-drawer';
    drawer.id = 'mobileDrawer';
    drawer.setAttribute('aria-label', 'Mobile Navigation Drawer');

    drawer.innerHTML = `
      <div class="drawer-header">
        <div class="brand-text">
          <div class="brand-name">Garmen</div>
          <div class="brand-sub">TEXTILE &amp; GARMENT INDUSTRY</div>
        </div>
        <button type="button" class="drawer-close" id="drawerCloseBtn" aria-label="Close navigation menu">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        </button>
      </div>

      <div class="drawer-quick-controls">
        <button type="button" class="nav-control-btn theme-toggle" aria-label="Toggle Dark / Light Theme" title="Switch Theme">
          <span class="theme-icon-sun" aria-hidden="true">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>
          </span>
          <span class="theme-icon-moon" aria-hidden="true">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
          </span>
          <span class="control-label theme-label">Dark</span>
        </button>

        <button type="button" class="nav-control-btn rtl-toggle" aria-label="Toggle RTL or LTR Layout" title="Switch Direction">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round">
            <path d="M4 17h16"/><path d="m14 11 6 6-6 6"/><path d="M20 7H4"/><path d="m10 1-6 6 6 6"/>
          </svg>
          <span class="control-label dir-label">RTL</span>
        </button>
      </div>

      <nav class="drawer-nav" aria-label="Mobile Navigation Links">
        <ul class="drawer-nav-list">
          <li class="drawer-nav-item ${currentPath === 'index.html' || currentPath === 'home-2.html' ? 'open active' : ''}">
            <div class="drawer-nav-link">
              <a href="index.html" class="${currentPath === 'index.html' ? 'active' : ''}">Home</a>
              <button type="button" class="drawer-sub-toggle" aria-label="Toggle Home Submenu">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"/></svg>
              </button>
            </div>
            <ul class="drawer-sub-menu">
              <li><a href="index.html" class="drawer-sub-link ${currentPath === 'index.html' ? 'active' : ''}">Home 1 - Industrial Export</a></li>
              <li><a href="home-2.html" class="drawer-sub-link ${currentPath === 'home-2.html' ? 'active' : ''}">Home 2 - Fashion Atelier</a></li>
            </ul>
          </li>

          <li class="drawer-nav-item">
            <a href="about.html" class="drawer-nav-link ${currentPath === 'about.html' ? 'active' : ''}">About Us</a>
          </li>

          <li class="drawer-nav-item ${currentPath.includes('service') || currentPath === 'products.html' ? 'open active' : ''}">
            <div class="drawer-nav-link">
              <a href="products.html" class="${currentPath === 'products.html' ? 'active' : ''}">Services &amp; Fabrics</a>
              <button type="button" class="drawer-sub-toggle" aria-label="Toggle Services Submenu">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"/></svg>
              </button>
            </div>
            <ul class="drawer-sub-menu">
              <li><a href="service-knitting.html" class="drawer-sub-link ${currentPath === 'service-knitting.html' ? 'active' : ''}">Circular &amp; Flat Knitting</a></li>
              <li><a href="service-assembly.html" class="drawer-sub-link ${currentPath === 'service-assembly.html' ? 'active' : ''}">Automated Assembly Lines</a></li>
              <li><a href="service-finishes.html" class="drawer-sub-link ${currentPath === 'service-finishes.html' ? 'active' : ''}">Specialty Finishes &amp; Trims</a></li>
              <li><a href="products.html" class="drawer-sub-link ${currentPath === 'products.html' ? 'active' : ''}">Fabric &amp; Material Library</a></li>
              <li><a href="products.html#catalog" class="drawer-sub-link">Garment Export Catalog</a></li>
            </ul>
          </li>

          <li class="drawer-nav-item">
            <a href="compliance.html" class="drawer-nav-link ${currentPath === 'compliance.html' ? 'active' : ''}">Compliance</a>
          </li>

          <li class="drawer-nav-item">
            <a href="blog.html" class="drawer-nav-link ${currentPath === 'blog.html' || currentPath === 'blog-details.html' ? 'active' : ''}">Blog</a>
          </li>

          <li class="drawer-nav-item">
            <a href="contact.html" class="drawer-nav-link ${currentPath === 'contact.html' ? 'active' : ''}">Contact Us</a>
          </li>
        </ul>
      </nav>

      <div class="drawer-footer">
        <a href="contact.html" class="drawer-btn-cta">MAKE PROJECT ↗</a>
        <div class="drawer-contact-mini">
          <span>📞 <a href="tel:+919876543210">+91 98765 43210</a></span>
          <span>✉️ <a href="mailto:hello@garmenexport.com">hello@garmenexport.com</a></span>
          <span>📍 Tirupur, Tamil Nadu, India</span>
        </div>
      </div>
    `;

    document.body.appendChild(drawer);
  }

  // 7. Open & Close Drawer Functions
  function openMobileMenu() {
    const drawer = document.querySelector('.mobile-drawer');
    const overlay = document.querySelector('.mobile-overlay');
    const toggleBtns = document.querySelectorAll('.menu-toggle, .hamburger-btn, .mobile-toggle');

    if (drawer) drawer.classList.add('active');
    if (overlay) overlay.classList.add('active');
    toggleBtns.forEach((btn) => {
      btn.classList.add('active');
      btn.setAttribute('aria-expanded', 'true');
    });
    document.body.style.overflow = 'hidden';
  }

  function closeMobileMenu() {
    const drawer = document.querySelector('.mobile-drawer');
    const overlay = document.querySelector('.mobile-overlay');
    const toggleBtns = document.querySelectorAll('.menu-toggle, .hamburger-btn, .mobile-toggle');

    if (drawer) drawer.classList.remove('active');
    if (overlay) overlay.classList.remove('active');
    toggleBtns.forEach((btn) => {
      btn.classList.remove('active');
      btn.setAttribute('aria-expanded', 'false');
    });
    document.body.style.overflow = '';
  }

  // 8. Setup DOM & Event Listeners
  function init() {
    mountNavbarControls();
    mountMobileDrawer();
    updateButtons();

    // Universal Click Delegator
    document.addEventListener('click', function (e) {
      // Theme Toggle click
      const themeBtn = e.target.closest('.theme-toggle');
      if (themeBtn) {
        e.preventDefault();
        const current = htmlRoot.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
        const next = current === 'dark' ? 'light' : 'dark';
        setTheme(next);
        return;
      }

      // RTL Toggle click
      const rtlBtn = e.target.closest('.rtl-toggle');
      if (rtlBtn) {
        e.preventDefault();
        const current = htmlRoot.getAttribute('dir') === 'rtl' ? 'rtl' : 'ltr';
        const next = current === 'rtl' ? 'ltr' : 'rtl';
        setDir(next);
        return;
      }

      // Hamburger button click
      const hamburger = e.target.closest('.menu-toggle, .hamburger-btn, .mobile-toggle');
      if (hamburger) {
        e.preventDefault();
        const drawer = document.querySelector('.mobile-drawer');
        if (drawer && drawer.classList.contains('active')) {
          closeMobileMenu();
        } else {
          openMobileMenu();
        }
        return;
      }

      // Drawer close button click
      const closeBtn = e.target.closest('.drawer-close');
      if (closeBtn) {
        e.preventDefault();
        closeMobileMenu();
        return;
      }

      // Overlay backdrop click
      if (e.target.classList.contains('mobile-overlay')) {
        e.preventDefault();
        closeMobileMenu();
        return;
      }

      // Drawer sub-menu accordion toggle
      const subToggle = e.target.closest('.drawer-sub-toggle');
      if (subToggle) {
        e.preventDefault();
        const item = subToggle.closest('.drawer-nav-item');
        if (item) {
          item.classList.toggle('open');
        }
        return;
      }

      // Drawer nav link clicked (close drawer unless it's a submenu toggle)
      const navLink = e.target.closest('.drawer-sub-link, .drawer-btn-cta, .drawer-nav-item > a');
      if (navLink) {
        closeMobileMenu();
      }
    });

    // Close on Escape key press
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' || e.key === 'Esc') {
        const drawer = document.querySelector('.mobile-drawer');
        if (drawer && drawer.classList.contains('active')) {
          closeMobileMenu();
        }
      }
    });

    // Listen for OS system theme changes
    if (window.matchMedia) {
      window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
        if (!localStorage.getItem(THEME_KEY)) {
          setTheme(e.matches ? 'dark' : 'light');
        }
      });
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // Expose global controller
  window.GarmenApp = {
    setTheme: setTheme,
    setDir: setDir,
    toggleTheme: () => setTheme(htmlRoot.getAttribute('data-theme') === 'dark' ? 'light' : 'dark'),
    toggleDir: () => setDir(htmlRoot.getAttribute('dir') === 'rtl' ? 'ltr' : 'rtl'),
    openMenu: openMobileMenu,
    closeMenu: closeMobileMenu,
    getTheme: () => htmlRoot.getAttribute('data-theme') || 'light',
    getDir: () => htmlRoot.getAttribute('dir') || 'ltr'
  };
})();
