/**
* Template Name: Company
* Template URL: https://bootstrapmade.com/company-free-html-bootstrap-template/
* Updated: Aug 07 2024 with Bootstrap v5.3.3
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/

(function() {
  "use strict";

  /**
   * Apply .scrolled class to the body as the page is scrolled down
   */
  function toggleScrolled() {
    const selectBody = document.querySelector('body');
    const selectHeader = document.querySelector('#header');
    if (!selectHeader.classList.contains('scroll-up-sticky') && !selectHeader.classList.contains('sticky-top') && !selectHeader.classList.contains('fixed-top')) return;
    window.scrollY > 100 ? selectBody.classList.add('scrolled') : selectBody.classList.remove('scrolled');
  }

  document.addEventListener('scroll', toggleScrolled);
  window.addEventListener('load', toggleScrolled);

  /**
   * Mobile nav toggle
   */
  const mobileNavToggleBtn = document.querySelector('.mobile-nav-toggle');

  function mobileNavToogle() {
    const body = document.querySelector('body');
    const navMenu = document.querySelector('#navmenu');
    
    if (body.classList.contains('mobile-nav-active')) {
      body.classList.remove('mobile-nav-active');
      navMenu.classList.remove('active');
      mobileNavToggleBtn.classList.remove('bi-x');
      mobileNavToggleBtn.classList.add('bi-list');
    } else {
      body.classList.add('mobile-nav-active');
      navMenu.classList.add('active');
      mobileNavToggleBtn.classList.remove('bi-list');
      mobileNavToggleBtn.classList.add('bi-x');
    }
  }
  mobileNavToggleBtn.addEventListener('click', mobileNavToogle);

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll('#navmenu a').forEach(navmenu => {
    navmenu.addEventListener('click', () => {
      if (document.querySelector('.mobile-nav-active')) {
        mobileNavToogle();
      }
    });

  });

  /**
   * Toggle mobile nav dropdowns
   */
  document.querySelectorAll('.navmenu .toggle-dropdown').forEach(navmenu => {
    navmenu.addEventListener('click', function(e) {
      e.preventDefault();
      this.parentNode.classList.toggle('active');
      this.parentNode.nextElementSibling.classList.toggle('dropdown-active');
      e.stopImmediatePropagation();
    });
  });

  /**
   * Preloader
   */
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove();
    });
  }

  /**
   * Scroll top button
   */
  let scrollTop = document.querySelector('.scroll-top');

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
  }
  scrollTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  /**
   * Handle active navigation menu item
   */
  function setActiveNav() {
    const currentPage = window.location.pathname.split('/').pop();
    if (currentPage === 'index.html' || currentPage === '') {
      currentPage = 'index.html';
    }
    
    const navLinks = document.querySelectorAll('#navmenu a');
    navLinks.forEach(link => {
      if (link.getAttribute('href') === currentPage) {
        link.classList.add('active');
      }
    });
  }
  document.addEventListener('DOMContentLoaded', setActiveNav);

  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);

  /**
   * Animation on scroll function and init
   */
  function aosInit() {
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }
  window.addEventListener('load', aosInit);

  /**
   * Auto generate the carousel indicators
   */
  document.querySelectorAll('.carousel-indicators').forEach((carouselIndicator) => {
    carouselIndicator.closest('.carousel').querySelectorAll('.carousel-item').forEach((carouselItem, index) => {
      if (index === 0) {
        carouselIndicator.innerHTML += `<li data-bs-target="#${carouselIndicator.closest('.carousel').id}" data-bs-slide-to="${index}" class="active"></li>`;
      } else {
        carouselIndicator.innerHTML += `<li data-bs-target="#${carouselIndicator.closest('.carousel').id}" data-bs-slide-to="${index}"></li>`;
      }
    });
  });

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: '.glightbox'
  });

  /**
   * Init isotope layout and filters
   */
  document.querySelectorAll('.isotope-layout').forEach(function(isotopeItem) {
    let layout = isotopeItem.getAttribute('data-layout') ?? 'masonry';
    let filter = isotopeItem.getAttribute('data-default-filter') ?? '*';
    let sort = isotopeItem.getAttribute('data-sort') ?? 'original-order';

    let initIsotope;
    imagesLoaded(isotopeItem.querySelector('.isotope-container'), function() {
      initIsotope = new Isotope(isotopeItem.querySelector('.isotope-container'), {
        itemSelector: '.isotope-item',
        layoutMode: layout,
        filter: filter,
        sortBy: sort
      });
    });

    isotopeItem.querySelectorAll('.isotope-filters li').forEach(function(filters) {
      filters.addEventListener('click', function() {
        isotopeItem.querySelector('.isotope-filters .filter-active').classList.remove('filter-active');
        this.classList.add('filter-active');
        initIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        if (typeof aosInit === 'function') {
          aosInit();
        }
      }, false);
    });

  });

  /**
   * Animate the skills items on reveal
   */
  let skillsAnimation = document.querySelectorAll('.skills-animation');
  skillsAnimation.forEach((item) => {
    new Waypoint({
      element: item,
      offset: '80%',
      handler: function(direction) {
        let progress = item.querySelectorAll('.progress .progress-bar');
        progress.forEach(el => {
          el.style.width = el.getAttribute('aria-valuenow') + '%';
        });
      }
    });
  });

  /**
   * Init swiper sliders
   */
  function initSwiper() {
    document.querySelectorAll(".init-swiper").forEach(function(swiperElement) {
      let config = JSON.parse(
        swiperElement.querySelector(".swiper-config").innerHTML.trim()
      );

      if (swiperElement.classList.contains("swiper-tab")) {
        initSwiperWithCustomPagination(swiperElement, config);
      } else {
        new Swiper(swiperElement, config);
      }
    });
  }

  window.addEventListener("load", initSwiper);

  // Form handling
  document.addEventListener('DOMContentLoaded', function() {
    const forms = document.querySelectorAll('.php-email-form');
    
    // Form validation functions
    function validateField(input) {
      const validationDiv = input.nextElementSibling;
      if (input.value.trim() === '') {
        validationDiv.textContent = `${input.getAttribute('placeholder')} is required`;
        return false;
      } else {
        validationDiv.textContent = '';
        return true;
      }
    }

    function validateEmail(email) {
      const validationDiv = email.nextElementSibling;
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email.value.trim())) {
        validationDiv.textContent = 'Please enter a valid email address';
        return false;
      } else {
        validationDiv.textContent = '';
        return true;
      }
    }

    forms.forEach(function(form) {
      const submitBtn = form.querySelector('button[type="submit"]');
      const loading = form.querySelector('.loading');
      const errorMessage = form.querySelector('.error-message');
      const successMessage = form.querySelector('.sent-message');
      const inputs = form.querySelectorAll('input, textarea');

      // Add validation on blur
      inputs.forEach(input => {
        input.addEventListener('blur', () => {
          if (input.type === 'email') {
            validateEmail(input);
          } else {
            validateField(input);
          }
        });
      });

      // Form submission
      form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Validate all fields
        let isValid = true;
        inputs.forEach(input => {
          if (input.type === 'email') {
            isValid = validateEmail(input) && isValid;
          } else {
            isValid = validateField(input) && isValid;
          }
        });

        if (!isValid) return;

        // Get form elements
        const submitButton = form.querySelector('button[type="submit"]');

        // Show loading
        loading.classList.remove('d-none');
        errorMessage.textContent = '';
        successMessage.textContent = '';
        submitButton.disabled = true;

        // For local testing
        if (window.location.hostname === 'localhost' || window.location.hostname === '') {
          // Simulate form submission after 2 seconds
          setTimeout(() => {
            form.reset();
            loading.classList.add('d-none');
            successMessage.textContent = 'Your message has been sent. Thank you!';
            submitButton.disabled = false;
          }, 2000);
          return;
        }

        // Submit form using Netlify's form handling
        fetch('/', {
          method: 'POST',
          headers: { 'Accept': 'application/json' },
          body: new FormData(form)
        })
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then(data => {
          if (data.success) {
            form.reset();
            loading.classList.add('d-none');
            successMessage.textContent = 'Your message has been sent. Thank you!';
          } else {
            throw new Error('Form submission failed');
          }
        })
        .catch(error => {
          loading.classList.add('d-none');
          errorMessage.textContent = 'Error: ' + error.message;
        })
        .finally(() => {
          submitButton.disabled = false;
        });
      });
    });
  });

})();