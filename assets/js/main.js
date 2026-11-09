/**
 * Garmen — Textile & Garment Industry
 * Interactive behaviors: Mobile menu, project enquiry form, counters, tabs
 */

document.addEventListener('DOMContentLoaded', function () {
  'use strict';

  // 1. Mobile Menu Toggle
  const menuToggle = document.querySelector('.menu-toggle');
  const mobileDrawer = document.querySelector('.mobile-drawer');

  if (menuToggle && mobileDrawer) {
    menuToggle.addEventListener('click', function () {
      mobileDrawer.classList.toggle('open');
      const isOpen = mobileDrawer.classList.contains('open');
      menuToggle.setAttribute('aria-expanded', isOpen);
    });

    // Close when clicking outside
    document.addEventListener('click', function (e) {
      if (!mobileDrawer.contains(e.target) && !menuToggle.contains(e.target)) {
        mobileDrawer.classList.remove('open');
      }
    });
  }

  // 2. Project Inquiry Form Submission Handler (Start The Project Form)
  const projectForms = document.querySelectorAll('.garmen-project-form');
  projectForms.forEach(function (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      const statusEl = form.querySelector('.form-status') || form.nextElementSibling;
      const submitBtn = form.querySelector('button[type="submit"]');

      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = 'Sending Enquiry...';
      }

      setTimeout(function () {
        if (statusEl) {
          statusEl.style.display = 'block';
          statusEl.style.color = '#10B981';
          statusEl.style.backgroundColor = '#ECFDF5';
          statusEl.style.padding = '14px 18px';
          statusEl.style.borderRadius = '4px';
          statusEl.style.marginTop = '16px';
          statusEl.style.fontSize = '14px';
          statusEl.style.fontWeight = '600';
          statusEl.innerHTML = '✓ Thank you! Your project request has been submitted successfully. Our export merchandising team will contact you within 24 hours.';
        }
        form.reset();
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = 'SUBMIT FORM';
        }
      }, 700);
    });
  });

  // 3. Current Year in Footer
  const yearEls = document.querySelectorAll('.current-year');
  const currentYear = new Date().getFullYear();
  yearEls.forEach(function (el) {
    el.textContent = currentYear;
  });
});
