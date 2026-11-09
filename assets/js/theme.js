/**
 * Garmen Textile & Garment Export House
 * Universal Theme & Direction Controller (theme.js)
 * Manages:
 *  1. Light / Dark mode toggle with persistent storage ('garmen_theme')
 *  2. LTR / RTL direction toggle with persistent storage ('garmen_dir')
 *  3. Dynamic synchronization of navbar control buttons & labels
 *  4. High-contrast font visibility assurance across all views
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

  // 4. Update UI Buttons
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

  // 5. Ensure controls exist in navbar if missing in HTML
  function mountControlsIfMissing() {
    const containers = document.querySelectorAll('.header-cta, .header-actions');
    containers.forEach((container) => {
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
    });

    updateButtons();
  }

  // 6. DOM Setup
  function init() {
    mountControlsIfMissing();

    // Event delegation for theme & rtl toggles
    document.addEventListener('click', function (e) {
      const themeBtn = e.target.closest('.theme-toggle');
      if (themeBtn) {
        e.preventDefault();
        const current = htmlRoot.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
        const next = current === 'dark' ? 'light' : 'dark';
        setTheme(next);
        return;
      }

      const rtlBtn = e.target.closest('.rtl-toggle');
      if (rtlBtn) {
        e.preventDefault();
        const current = htmlRoot.getAttribute('dir') === 'rtl' ? 'rtl' : 'ltr';
        const next = current === 'rtl' ? 'ltr' : 'rtl';
        setDir(next);
        return;
      }
    });

    // Listen for OS system theme changes if user hasn't explicitly set preference
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
    getTheme: () => htmlRoot.getAttribute('data-theme') || 'light',
    getDir: () => htmlRoot.getAttribute('dir') || 'ltr'
  };
})();
