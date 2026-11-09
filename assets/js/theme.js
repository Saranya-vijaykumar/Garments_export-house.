/**
 * GlobalStitch - Garment Export House
 * Theme Switcher Module (theme.js)
 * Manages Light / Dark mode toggling with localStorage persistence
 */

(function () {
  'use strict';

  const STORAGE_KEY = 'globalstitch_theme';
  const htmlRoot = document.documentElement;

  // Retrieve stored theme or default to system preference / light
  function getPreferredTheme() {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return stored;
    }
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light';
  }

  // Apply theme to DOM
  function setTheme(theme) {
    if (theme === 'dark') {
      htmlRoot.setAttribute('data-theme', 'dark');
    } else {
      htmlRoot.removeAttribute('data-theme');
    }
    localStorage.setItem(STORAGE_KEY, theme);
    updateToggleButtons(theme);
  }

  // Update button ARIA and attributes
  function updateToggleButtons(theme) {
    const toggleBtns = document.querySelectorAll('.theme-toggle');
    toggleBtns.forEach((btn) => {
      btn.setAttribute('aria-pressed', theme === 'dark' ? 'true' : 'false');
      btn.setAttribute(
        'title',
        theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'
      );
    });
  }

  // Initialize immediately to prevent flash of wrong theme
  const currentTheme = getPreferredTheme();
  setTheme(currentTheme);

  // Setup DOM listeners once ready
  document.addEventListener('DOMContentLoaded', () => {
    updateToggleButtons(getPreferredTheme());

    const toggleBtns = document.querySelectorAll('.theme-toggle');
    toggleBtns.forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const activeTheme = htmlRoot.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
        const newTheme = activeTheme === 'dark' ? 'light' : 'dark';
        setTheme(newTheme);
      });
    });

    // Listen for OS system theme changes if user hasn't explicitly set preference
    if (window.matchMedia) {
      window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
        if (!localStorage.getItem(STORAGE_KEY)) {
          setTheme(e.matches ? 'dark' : 'light');
        }
      });
    }
  });

  // Expose to window for external scripts if needed
  window.AuraTheme = {
    setTheme: setTheme,
    getTheme: () => (htmlRoot.getAttribute('data-theme') === 'dark' ? 'dark' : 'light')
  };
})();
