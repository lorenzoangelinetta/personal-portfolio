(function () {
  'use strict';

  /**
   * Mobile menu toggle
   */
  const toggle = document.querySelector('.header-toggle');
  const headerEl = document.querySelector('#header');
  const overlay = document.querySelector('.sidebar-overlay');

  function handleMenu() {
    headerEl.classList.toggle('expanded');
    overlay.classList.toggle('active');
    if (headerEl.classList.contains('expanded')) {
      toggle.classList.remove('bi-list');
      toggle.classList.add('bi-x');
    } else {
      toggle.classList.remove('bi-x');
      toggle.classList.add('bi-list');
    }
  }
  if (toggle) toggle.addEventListener('click', handleMenu);
  if (overlay) overlay.addEventListener('click', handleMenu);

  /**
   * Preloader
   */
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => preloader.remove());
  }

  /**
   * Scroll top button
   */
  const scrollTop = document.querySelector('.scroll-top');

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100
        ? scrollTop.classList.add('active')
        : scrollTop.classList.remove('active');
    }
  }
  if (scrollTop) {
    scrollTop.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);

  /**
   * Typed.js
   */
  const selectTyped = document.querySelector('.typed');
  if (selectTyped) {
    const strings = selectTyped.getAttribute('data-typed-items').split(',');
    new Typed('.typed', {
      strings,
      loop: true,
      typeSpeed: 100,
      backSpeed: 50,
      backDelay: 2000
    });
  }

  /**
   * Scroll to hash on page load
   */
  window.addEventListener('load', () => {
    if (window.location.hash) {
      const section = document.querySelector(window.location.hash);
      if (section) {
        setTimeout(() => {
          const offset = parseInt(getComputedStyle(section).scrollMarginTop) || 0;
          window.scrollTo({ top: section.offsetTop - offset, behavior: 'smooth' });
        }, 100);
      }
    }
  });

  /**
   * Navmenu scrollspy
   */
  const navmenulinks = document.querySelectorAll('.navmenu a');

  function navmenuScrollspy() {
    navmenulinks.forEach((link) => {
      if (!link.hash) return;
      const section = document.querySelector(link.hash);
      if (!section) return;
      const pos = window.scrollY + 200;
      if (pos >= section.offsetTop && pos <= section.offsetTop + section.offsetHeight) {
        document.querySelectorAll('.navmenu a.active').forEach((a) => a.classList.remove('active'));
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  }
  window.addEventListener('load', navmenuScrollspy);
  document.addEventListener('scroll', navmenuScrollspy);

})();
