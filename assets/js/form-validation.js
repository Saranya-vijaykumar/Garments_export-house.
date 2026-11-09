/**
 * GlobalStitch - Garment Export House
 * Form Validation & Sourcing Estimator Module (form-validation.js)
 * Enterprise-grade client-side validation, drag-and-drop techpack uploader, interactive cost calculator
 */

(function () {
  'use strict';

  // --------------------------------------------------------------------------
  // 1. Toast Notification Helper
  // --------------------------------------------------------------------------
  function showToast(title, message, type = 'success') {
    let container = document.querySelector('.toast-container');
    if (!container) {
      container = document.createElement('div');
      container.className = 'toast-container';
      document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = `toast ${type}`;

    const iconSvg =
      type === 'success'
        ? `<svg class="toast-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>`
        : `<svg class="toast-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>`;

    toast.innerHTML = `
      ${iconSvg}
      <div class="toast-content">
        <h5>${title}</h5>
        <p>${message}</p>
      </div>
    `;

    container.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateX(50px)';
      toast.style.transition = 'all 0.3s ease';
      setTimeout(() => toast.remove(), 300);
    }, 4500);
  }

  // --------------------------------------------------------------------------
  // 2. Sourcing Enquiry Form Validation
  // --------------------------------------------------------------------------
  function initEnquiryForm() {
    const form = document.querySelector('#sourcingEnquiryForm');
    if (!form) return;

    const fileInput = form.querySelector('#techpackFile');
    const dropzone = form.querySelector('.file-dropzone');
    const filePreview = form.querySelector('.file-preview');
    let selectedFile = null;

    // Drag and Drop File Upload
    if (dropzone && fileInput) {
      ['dragenter', 'dragover'].forEach((eventName) => {
        dropzone.addEventListener(eventName, (e) => {
          e.preventDefault();
          dropzone.classList.add('dragover');
        });
      });

      ['dragleave', 'drop'].forEach((eventName) => {
        dropzone.addEventListener(eventName, (e) => {
          e.preventDefault();
          dropzone.classList.remove('dragover');
        });
      });

      dropzone.addEventListener('drop', (e) => {
        if (e.dataTransfer.files.length) {
          validateAndSetFile(e.dataTransfer.files[0]);
        }
      });

      fileInput.addEventListener('change', () => {
        if (fileInput.files.length) {
          validateAndSetFile(fileInput.files[0]);
        }
      });
    }

    function validateAndSetFile(file) {
      const allowedExts = ['pdf', 'zip', 'ai', 'png', 'jpg', 'jpeg'];
      const fileExt = file.name.split('.').pop().toLowerCase();
      const maxBytes = 10 * 1024 * 1024; // 10MB

      if (!allowedExts.includes(fileExt)) {
        showToast('Invalid File Type', 'Please upload a PDF, ZIP, AI, or High-Res Image (PNG/JPG).', 'error');
        return;
      }

      if (file.size > maxBytes) {
        showToast('File Too Large', 'Maximum techpack upload limit is 10 MB.', 'error');
        return;
      }

      selectedFile = file;
      if (filePreview) {
        filePreview.classList.add('active');
        const fileNameEl = filePreview.querySelector('.file-name');
        const fileSizeEl = filePreview.querySelector('.file-size');
        if (fileNameEl) fileNameEl.textContent = file.name;
        if (fileSizeEl) fileSizeEl.textContent = `(${(file.size / (1024 * 1024)).toFixed(2)} MB)`;

        const removeBtn = filePreview.querySelector('.file-preview-remove');
        if (removeBtn) {
          removeBtn.onclick = () => {
            selectedFile = null;
            if (fileInput) fileInput.value = '';
            filePreview.classList.remove('active');
          };
        }
      }
    }

    // Input Validation Helpers
    function setFieldError(fieldId, errorMsg) {
      const field = form.querySelector(`#${fieldId}`);
      if (!field) return;
      const group = field.closest('.form-group');
      if (group) {
        group.classList.add('has-error');
        let errorSpan = group.querySelector('.form-error');
        if (!errorSpan) {
          errorSpan = document.createElement('span');
          errorSpan.className = 'form-error';
          group.appendChild(errorSpan);
        }
        errorSpan.textContent = errorMsg;
      }
    }

    function clearFieldError(fieldId) {
      const field = form.querySelector(`#${fieldId}`);
      if (!field) return;
      const group = field.closest('.form-group');
      if (group) {
        group.classList.remove('has-error');
      }
    }

    // Real-time blur listeners
    const fieldsToValidate = [
      'companyName',
      'contactPerson',
      'businessEmail',
      'phoneNumber',
      'productCategory',
      'orderQuantity',
      'destinationCountry',
      'enquiryMessage'
    ];

    fieldsToValidate.forEach((id) => {
      const el = form.querySelector(`#${id}`);
      if (el) {
        el.addEventListener('input', () => clearFieldError(id));
      }
    });

    // Form Submission
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      let isValid = true;

      // 1. Company Name
      const company = form.querySelector('#companyName');
      if (!company || company.value.trim().length < 2) {
        setFieldError('companyName', 'Please enter your registered company name.');
        isValid = false;
      } else {
        clearFieldError('companyName');
      }

      // 2. Contact Person
      const person = form.querySelector('#contactPerson');
      if (!person || person.value.trim().length < 2) {
        setFieldError('contactPerson', 'Please provide a primary contact name.');
        isValid = false;
      } else {
        clearFieldError('contactPerson');
      }

      // 3. Email
      const email = form.querySelector('#businessEmail');
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!email || !emailRegex.test(email.value.trim())) {
        setFieldError('businessEmail', 'Please provide a valid corporate email address.');
        isValid = false;
      } else {
        clearFieldError('businessEmail');
      }

      // 4. Phone
      const phone = form.querySelector('#phoneNumber');
      const phoneRegex = /^[+0-9\s\-()]{7,20}$/;
      if (!phone || !phoneRegex.test(phone.value.trim())) {
        setFieldError('phoneNumber', 'Please provide a valid phone number with country code.');
        isValid = false;
      } else {
        clearFieldError('phoneNumber');
      }

      // 5. Product Category
      const category = form.querySelector('#productCategory');
      if (!category || !category.value) {
        setFieldError('productCategory', 'Please select a primary product category.');
        isValid = false;
      } else {
        clearFieldError('productCategory');
      }

      // 6. Order Quantity
      const qty = form.querySelector('#orderQuantity');
      if (!qty || parseInt(qty.value, 10) < 100) {
        setFieldError('orderQuantity', 'Minimum export order quantity is 100 units.');
        isValid = false;
      } else {
        clearFieldError('orderQuantity');
      }

      // 7. Destination Country
      const dest = form.querySelector('#destinationCountry');
      if (!dest || !dest.value.trim()) {
        setFieldError('destinationCountry', 'Please enter your delivery destination country.');
        isValid = false;
      } else {
        clearFieldError('destinationCountry');
      }

      // 8. Message
      const msg = form.querySelector('#enquiryMessage');
      if (!msg || msg.value.trim().length < 15) {
        setFieldError('enquiryMessage', 'Please provide at least 15 characters describing specifications.');
        isValid = false;
      } else {
        clearFieldError('enquiryMessage');
      }

      // 9. Privacy Consent
      const consent = form.querySelector('#privacyConsent');
      if (consent && !consent.checked) {
        showToast('Consent Required', 'Please accept the privacy and export NDA terms.', 'error');
        isValid = false;
      }

      if (!isValid) {
        showToast('Incomplete Form', 'Please review the highlighted fields before submitting.', 'error');
        return;
      }

      // Success State Simulation
      const submitBtn = form.querySelector('button[type="submit"]');
      const originalText = submitBtn ? submitBtn.innerHTML : 'Submit Enquiry';

      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = `
          <svg style="animation:spin 1s linear infinite; width:18px; height:18px;" viewBox="0 0 24 24" fill="none" stroke="currentColor"><circle cx="12" cy="12" r="10" stroke-width="4" stroke="currentColor" stroke-dasharray="32" stroke-linecap="round"/></svg>
          Transmitting Sourcing Dossier...
        `;
      }

      setTimeout(() => {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalText;
        }

        const refCode = 'EXP-' + new Date().getFullYear() + '-' + Math.floor(1000 + Math.random() * 9000);

        // Display Success Modal or Notification
        showSuccessModal(refCode, company.value.trim(), email.value.trim());
        form.reset();
        if (filePreview) filePreview.classList.remove('active');
        selectedFile = null;
      }, 1200);
    });

    // Check URL parameters for pre-filling when navigated from product or pricing pages
    checkUrlPreFill(form);
  }

  function checkUrlPreFill(form) {
    if (!form) return;
    const params = new URLSearchParams(window.location.search);
    const category = params.get('category');
    const style = params.get('style');
    const title = params.get('title') || params.get('product');
    const tier = params.get('tier');
    const type = params.get('type');
    const desk = params.get('desk');

    const catSelect = form.querySelector('#productCategory');
    const qtyInput = form.querySelector('#orderQuantity');
    const msgText = form.querySelector('#enquiryMessage');
    const destInput = form.querySelector('#destinationCountry');

    if (category && catSelect) {
      catSelect.value = category;
    }

    if (tier && qtyInput) {
      if (tier === 'trial') qtyInput.value = 500;
      else if (tier === 'container' || tier === 'commercial') qtyInput.value = 5000;
      else if (tier === 'enterprise') qtyInput.value = 25000;
    }

    if (desk && destInput) {
      if (desk === 'na') destInput.value = 'United States / Canada (East/West Coast)';
      else if (desk === 'eu') destInput.value = 'European Union (Rotterdam / Hamburg / Antwerp)';
      else if (desk === 'apac') destInput.value = 'UAE (Jebel Ali) / Singapore / Tokyo';
    }

    if (title || style) {
      const garmentName = title ? decodeURIComponent(title) : `Style #${style}`;
      if (msgText && !msgText.value) {
        msgText.value = `We are requesting an export FOB price quotation, sample schedule, and tech pack review for: ${garmentName} (Style Code: ${style || 'N/A'}). Please advise your current lab dip lead times and export packaging specifications.`;
      }
    } else if (type === 'audit' && msgText) {
      msgText.value = 'We would like to schedule a formal physical or virtual factory inspection audit with your ESG & Social Compliance leadership team.';
    } else if (type === 'esg' && msgText) {
      msgText.value = 'We are requesting your verified ESG Due Diligence Dossier, including ZLD wastewater laboratory reports, chemical test certificates, and SEDEX SMETA 4-pillar audit certifications.';
    }
  }

  function showSuccessModal(refCode, company, email) {
    const existingModal = document.querySelector('.submission-success-modal');
    if (existingModal) existingModal.remove();

    const modal = document.createElement('div');
    modal.className = 'modal active submission-success-modal';
    modal.innerHTML = `
      <div class="modal-dialog" style="max-width: 580px; text-align: center;">
        <button class="modal-close" aria-label="Close Modal">&times;</button>
        <div class="modal-body" style="padding: 3rem 2rem;">
          <div style="width: 72px; height: 72px; border-radius: 50%; background-color: rgba(27, 135, 85, 0.12); color: var(--color-success); display: inline-flex; align-items: center; justify-content: center; margin-bottom: 1.5rem;">
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
          </div>
          <h3 style="margin-bottom: 0.5rem;">Sourcing Enquiry Confirmed</h3>
          <p class="text-muted" style="margin-bottom: 1.5rem;">
            Thank you, <strong>${company}</strong>. Your export merchandising dossier has been assigned to our International Merchandising Team.
          </p>
          <div style="background-color: var(--bg-surface-alt); padding: 1.25rem; border-radius: var(--radius-sm); margin-bottom: 1.5rem; text-align: left;">
            <div style="display:flex; justify-content:space-between; margin-bottom:0.5rem; font-size:0.9rem;">
              <span>Enquiry Reference:</span>
              <strong style="color:var(--color-accent);">${refCode}</strong>
            </div>
            <div style="display:flex; justify-content:space-between; margin-bottom:0.5rem; font-size:0.9rem;">
              <span>Registered Email:</span>
              <strong>${email}</strong>
            </div>
            <div style="display:flex; justify-content:space-between; font-size:0.9rem;">
              <span>Initial Response Time:</span>
              <strong>Within 24 Business Hours</strong>
            </div>
          </div>
          <p style="font-size: 0.85rem; color: var(--text-muted); margin-bottom: 1.5rem;">
            A formal acknowledgement and preliminary FOB/CIF feasibility matrix have been prepared for dispatch.
          </p>
          <button class="btn btn-primary" id="closeSuccessBtn" style="width: 100%;">
            Return to Sourcing Desk
          </button>
        </div>
      </div>
    `;

    document.body.appendChild(modal);
    document.body.style.overflow = 'hidden';

    const close = () => {
      modal.remove();
      document.body.style.overflow = '';
    };

    modal.querySelector('.modal-close').onclick = close;
    modal.querySelector('#closeSuccessBtn').onclick = close;
    modal.onclick = (e) => {
      if (e.target === modal) close();
    };
  }

  // --------------------------------------------------------------------------
  // 3. Interactive FOB Cost & Production Lead-Time Estimator (for pricing.html)
  // --------------------------------------------------------------------------
  function initCostEstimator() {
    const estimator = document.querySelector('#exportCostEstimator');
    if (!estimator) return;

    const garmentType = estimator.querySelector('#calcGarmentType');
    const fabricGrade = estimator.querySelector('#calcFabricGrade');
    const orderVolume = estimator.querySelector('#calcVolume');
    const volumeDisplay = estimator.querySelector('#calcVolumeDisplay');
    const portSelect = estimator.querySelector('#calcPort');

    const resultFob = estimator.querySelector('#estFobPrice');
    const resultTotal = estimator.querySelector('#estTotalValue');
    const resultLead = estimator.querySelector('#estLeadTime');

    if (!garmentType || !fabricGrade || !orderVolume || !resultFob) return;

    function calculate() {
      const baseRates = {
        polo: 5.2,
        tshirt: 3.4,
        blazer: 28.5,
        hoodie: 11.8,
        leggings: 7.2,
        workwear: 16.5,
        romper: 4.1
      };

      const fabricMultipliers = {
        standard: 1.0,
        organic: 1.22,
        modal: 1.35,
        technical: 1.48
      };

      const qty = parseInt(orderVolume.value, 10);
      if (volumeDisplay) volumeDisplay.textContent = `${qty.toLocaleString()} Units`;

      // Volume discount curve
      let volumeDiscount = 1.0;
      if (qty >= 10000) volumeDiscount = 0.82;
      else if (qty >= 5000) volumeDiscount = 0.88;
      else if (qty >= 2500) volumeDiscount = 0.93;

      const baseRate = baseRates[garmentType.value] || 5.0;
      const fabricMult = fabricMultipliers[fabricGrade.value] || 1.0;

      const unitFob = baseRate * fabricMult * volumeDiscount;
      const totalFob = unitFob * qty;

      let leadDays = 35;
      if (qty >= 10000) leadDays = 55;
      else if (qty >= 5000) leadDays = 45;

      resultFob.textContent = `$${unitFob.toFixed(2)} - $${(unitFob * 1.12).toFixed(2)}`;
      if (resultTotal) resultTotal.textContent = `$${Math.round(totalFob).toLocaleString()}`;
      if (resultLead) resultLead.textContent = `${leadDays} - ${leadDays + 12} Days`;
    }

    [garmentType, fabricGrade, orderVolume, portSelect].forEach((input) => {
      if (input) {
        input.addEventListener('input', calculate);
        input.addEventListener('change', calculate);
      }
    });

    calculate();
  }

  // DOM ready trigger
  document.addEventListener('DOMContentLoaded', () => {
    initEnquiryForm();
    initCostEstimator();
  });

  window.AuraForm = {
    showToast: showToast
  };
})();
