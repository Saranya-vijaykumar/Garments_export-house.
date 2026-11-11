/**
 * GlobalStitch - Garment Export House
 * Animations & Motion Module (animations.js)
 * IntersectionObserver reveals, count-up stats, testimonial slider, back-to-top
 */

(function () {
  'use strict';

  // --------------------------------------------------------------------------
  // 1. Scroll-Triggered Reveal Animations
  // --------------------------------------------------------------------------
  function initScrollReveals() {
    document.documentElement.classList.add('js-reveal-active');
    const revealElements = document.querySelectorAll(
      '.reveal, .reveal-left, .reveal-right, .reveal-scale'
    );
    if (!revealElements.length) return;

    // Immediately mark active to avoid any blank spaces or scroll delays
    revealElements.forEach((el) => el.classList.add('active'));

    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver(
        (entries, obs) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('active');
              obs.unobserve(entry.target);
            }
          });
        },
        {
          threshold: 0.05,
          rootMargin: '50px'
        }
      );

      revealElements.forEach((el) => observer.observe(el));
    }
  }

  // --------------------------------------------------------------------------
  // 2. Animated Number Counters
  // --------------------------------------------------------------------------
  function initAnimatedCounters() {
    const counters = document.querySelectorAll('.stat-number');
    if (!counters.length) return;

    let hasRun = false;

    function runCounters() {
      counters.forEach((counter) => {
        const target = parseFloat(counter.getAttribute('data-target') || '0');
        const isDecimal = counter.getAttribute('data-decimal') === 'true';
        const duration = 2000; // ms
        const startTime = performance.now();

        function updateCounter(currentTime) {
          const elapsed = currentTime - startTime;
          const progress = Math.min(elapsed / duration, 1);
          // Ease out expo
          const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
          const currentVal = target * easeProgress;

          if (isDecimal) {
            counter.textContent = currentVal.toFixed(1);
          } else {
            counter.textContent = Math.floor(currentVal).toLocaleString();
          }

          if (progress < 1) {
            requestAnimationFrame(updateCounter);
          } else {
            counter.textContent = isDecimal ? target.toFixed(1) : target.toLocaleString();
          }
        }

        requestAnimationFrame(updateCounter);
      });
    }

    const statsSection = document.querySelector('.stats-section');
    if (statsSection && 'IntersectionObserver' in window) {
      const observer = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting && !hasRun) {
            hasRun = true;
            runCounters();
            observer.disconnect();
          }
        },
        { threshold: 0.25 }
      );
      observer.observe(statsSection);
    } else {
      runCounters();
    }
  }

  // --------------------------------------------------------------------------
  // 3. Testimonials Carousel / Slider
  // --------------------------------------------------------------------------
  function initTestimonialSlider() {
    const wrapper = document.querySelector('.testimonial-wrapper');
    if (!wrapper) return;

    const track = wrapper.querySelector('.testimonial-track');
    const slides = wrapper.querySelectorAll('.testimonial-slide');
    const prevBtn = document.querySelector('.slider-prev');
    const nextBtn = document.querySelector('.slider-next');
    const dotsContainer = document.querySelector('.slider-dots');

    if (!track || !slides.length) return;

    let currentIndex = 0;
    const totalSlides = slides.length;
    let autoPlayTimer = null;

    // Create pagination dots if container exists
    if (dotsContainer) {
      dotsContainer.innerHTML = '';
      for (let i = 0; i < totalSlides; i++) {
        const dot = document.createElement('button');
        dot.classList.add('slider-dot');
        dot.setAttribute('aria-label', `Go to testimonial ${i + 1}`);
        if (i === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(i));
        dotsContainer.appendChild(dot);
      }
    }

    function updateSlider() {
      const isRTL = document.documentElement.getAttribute('dir') === 'rtl';
      const offset = isRTL ? currentIndex * 100 : -currentIndex * 100;
      track.style.transform = `translateX(${offset}%)`;

      // Update dots
      if (dotsContainer) {
        const dots = dotsContainer.querySelectorAll('.slider-dot');
        dots.forEach((dot, idx) => {
          dot.classList.toggle('active', idx === currentIndex);
        });
      }
    }

    function nextSlide() {
      currentIndex = (currentIndex + 1) % totalSlides;
      updateSlider();
    }

    function prevSlide() {
      currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
      updateSlider();
    }

    function goToSlide(index) {
      currentIndex = index;
      updateSlider();
      resetAutoplay();
    }

    if (nextBtn) nextBtn.addEventListener('click', () => { nextSlide(); resetAutoplay(); });
    if (prevBtn) prevBtn.addEventListener('click', () => { prevSlide(); resetAutoplay(); });

    // Autoplay
    function startAutoplay() {
      autoPlayTimer = setInterval(nextSlide, 6500);
    }

    function resetAutoplay() {
      clearInterval(autoPlayTimer);
      startAutoplay();
    }

    // Touch / Swipe support
    let touchStartX = 0;
    let touchEndX = 0;

    wrapper.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
      clearInterval(autoPlayTimer);
    }, { passive: true });

    wrapper.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipe();
      startAutoplay();
    }, { passive: true });

    function handleSwipe() {
      const isRTL = document.documentElement.getAttribute('dir') === 'rtl';
      const diff = touchEndX - touchStartX;
      if (Math.abs(diff) > 40) {
        if (diff > 0) {
          isRTL ? nextSlide() : prevSlide();
        } else {
          isRTL ? prevSlide() : nextSlide();
        }
      }
    }

    startAutoplay();
  }

  // --------------------------------------------------------------------------
  // 4. Back to Top Button
  // --------------------------------------------------------------------------
  function initBackToTop() {
    const backToTopBtn = document.querySelector('.back-to-top');
    if (!backToTopBtn) return;

    window.addEventListener('scroll', () => {
      if (window.scrollY > 400) {
        backToTopBtn.classList.add('active');
      } else {
        backToTopBtn.classList.remove('active');
      }
    }, { passive: true });

    backToTopBtn.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // --------------------------------------------------------------------------
  // 5. Page Preloader
  // --------------------------------------------------------------------------
  function initPreloader() {
    const preloader = document.querySelector('.preloader');
    if (!preloader) return;
    preloader.style.display = 'none';
    preloader.classList.add('fade-out');
  }

  // Initialize all on DOM ready
  document.addEventListener('DOMContentLoaded', () => {
    initScrollReveals();
    initAnimatedCounters();
    initTestimonialSlider();
    initBackToTop();
    initPreloader();
  });
})();
