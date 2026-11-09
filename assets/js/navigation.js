/**
 * GlobalStitch - Garment Export House
 * Navigation & Localization Module (navigation.js)
 * Manages Sticky Nav, Mobile Drawer, Dropdowns, Active links & RTL/LTR Switcher
 */

(function () {
  'use strict';

  const RTL_STORAGE_KEY = 'globalstitch_direction';
  const htmlRoot = document.documentElement;

  // --------------------------------------------------------------------------
  // 1. RTL / LTR Language Direction Handler
  // --------------------------------------------------------------------------
  function initDirection() {
    const savedDir = localStorage.getItem(RTL_STORAGE_KEY) || 'ltr';
    setDirection(savedDir);

    const rtlBtns = document.querySelectorAll('.rtl-toggle');
    rtlBtns.forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const currentDir = htmlRoot.getAttribute('dir') || 'ltr';
        const nextDir = currentDir === 'ltr' ? 'rtl' : 'ltr';
        setDirection(nextDir);
      });
    });
  }

  function setDirection(dir) {
    if (dir === 'rtl') {
      htmlRoot.setAttribute('dir', 'rtl');
      htmlRoot.setAttribute('lang', 'ar');
    } else {
      htmlRoot.setAttribute('dir', 'ltr');
      htmlRoot.setAttribute('lang', 'en');
    }
    localStorage.setItem(RTL_STORAGE_KEY, dir);

    const rtlLabels = document.querySelectorAll('.rtl-label');
    rtlLabels.forEach((label) => {
      label.textContent = dir === 'rtl' ? 'LTR' : 'RTL';
    });
  }

  // --------------------------------------------------------------------------
  // 2. Sticky Header Handler
  // --------------------------------------------------------------------------
  function initStickyHeader() {
    const header = document.querySelector('.site-header');
    if (!header) return;

    const handleScroll = () => {
      if (window.scrollY > 40) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
  }

  // --------------------------------------------------------------------------
  // 3. Mobile Navigation Drawer & Dropdowns
  // --------------------------------------------------------------------------
  function initMobileMenu() {
    const toggleBtn = document.querySelector('.mobile-toggle');
    const mainNav = document.querySelector('.main-nav');
    if (!toggleBtn || !mainNav) return;

    function openMenu() {
      toggleBtn.classList.add('active');
      mainNav.classList.add('active');
      toggleBtn.setAttribute('aria-expanded', 'true');
      document.body.style.overflow = 'hidden';
    }

    function closeMenu() {
      toggleBtn.classList.remove('active');
      mainNav.classList.remove('active');
      toggleBtn.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    }

    toggleBtn.addEventListener('click', () => {
      const isOpen = mainNav.classList.contains('active');
      if (isOpen) {
        closeMenu();
      } else {
        openMenu();
      }
    });

    // Close when clicking outside of nav
    document.addEventListener('click', (e) => {
      if (
        mainNav.classList.contains('active') &&
        !mainNav.contains(e.target) &&
        !toggleBtn.contains(e.target)
      ) {
        closeMenu();
      }
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && mainNav.classList.contains('active')) {
        closeMenu();
      }
    });

    // Mobile dropdown accordion
    const dropdownParents = mainNav.querySelectorAll('.nav-item.has-dropdown');
    dropdownParents.forEach((parent) => {
      const link = parent.querySelector('.nav-link');
      if (link) {
        link.addEventListener('click', (e) => {
          if (window.innerWidth <= 1024) {
            e.preventDefault();
            parent.classList.toggle('dropdown-open');
          }
        });
      }
    });
  }

  // --------------------------------------------------------------------------
  // 4. Highlight Active Navigation Item
  // --------------------------------------------------------------------------
  function initActiveNav() {
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link, .dropdown-link');

    navLinks.forEach((link) => {
      const href = link.getAttribute('href');
      if (!href) return;
      const targetPage = href.split('/').pop();

      if (
        targetPage === currentPath ||
        (currentPath === '' && targetPage === 'index.html') ||
        (currentPath === '/' && targetPage === 'index.html')
      ) {
        link.classList.add('active');
        const parentDropdown = link.closest('.nav-item.has-dropdown');
        if (parentDropdown) {
          const parentLink = parentDropdown.querySelector('.nav-link');
          if (parentLink) parentLink.classList.add('active');
        }
      }
    });
  }

  // Execute on DOM Ready
  document.addEventListener('DOMContentLoaded', () => {
    initDirection();
    initStickyHeader();
    initMobileMenu();
    initActiveNav();
  });

  window.AuraNav = {
    setDirection: setDirection
  };
})();
