
// Sticky nav
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  if (window.scrollY > 20) nav.classList.add('scrolled');
  else nav.classList.remove('scrolled');
});

// Mobile hamburger navigation (matches Meta Ads reference)
(function() {
  var hamburger = document.querySelector('.nav-hamburger');
  var mobileMenu = document.querySelector('.nav-mobile-menu');
  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', function() {
      mobileMenu.classList.toggle('open');
      hamburger.classList.toggle('open');
    });
    var links = mobileMenu.querySelectorAll('a');
    links.forEach(function(link) {
      link.addEventListener('click', function() {
        mobileMenu.classList.remove('open');
        hamburger.classList.remove('open');
      });
    });
    document.addEventListener('click', function(e) {
      if (!hamburger.contains(e.target) && !mobileMenu.contains(e.target)) {
        mobileMenu.classList.remove('open');
        hamburger.classList.remove('open');
      }
    });
  }
})();

// Reveal on scroll
const revealEls = document.querySelectorAll('.reveal');
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('in');
      io.unobserve(e.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });
revealEls.forEach(el => io.observe(el));

// Smooth scroll offset for sticky nav
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', (e) => {
    const href = a.getAttribute('href');
    if (href === '#' || href.length < 2) return;
    const target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      const top = target.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

// Mobile: convert all grid layouts to stacked flex column to prevent horizontal overflow
(function() {
  function fixMobileGrids() {
    var isMobile = window.matchMedia && window.matchMedia('(max-width: 900px)').matches;
    document.querySelectorAll('[class*="grid"], [class*="row"], [style*="grid-template"]').forEach(function(el) {
      if (isMobile) {
        if (!el.getAttribute('data-grid-fixed')) {
          if (getComputedStyle(el).display === 'grid') {
            el.setAttribute('data-grid-fixed', '1');
            el.style.setProperty('display', 'flex', 'important');
            el.style.setProperty('flex-direction', 'column', 'important');
          }
        }
      } else {
        if (el.getAttribute('data-grid-fixed')) {
          el.style.removeProperty('display');
          el.style.removeProperty('flex-direction');
          el.removeAttribute('data-grid-fixed');
        }
      }
    });
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', fixMobileGrids);
  } else {
    fixMobileGrids();
  }
  var rt;
  window.addEventListener('resize', function() { clearTimeout(rt); rt = setTimeout(fixMobileGrids, 150); });
})();
