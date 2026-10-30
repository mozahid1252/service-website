document.querySelectorAll('.faq-item').forEach(item => {
    item.querySelector('.faq-q').addEventListener('click', () => {
      const active = document.querySelector('.faq-item.active');
      if (active && active !== item) active.classList.remove('active');
      item.classList.toggle('active');
    });
  });

  // Scroll Reveal
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        // Trigger number animation for KPIs if they are in the dashboard
        if (entry.target.classList.contains('premium-dashboard')) {
          animateKpis();
        }
      }
    });
  }, { threshold: 0.1 });
  document.querySelectorAll('.scroll-reveal').forEach(el => observer.observe(el));

  // Animate KPI numbers
  function animateKpis() {
    const kpis = document.querySelectorAll('.pd-kpi-value[data-target]');
    kpis.forEach(kpi => {
      const target = parseInt(kpi.getAttribute('data-target'));
      const prefix = kpi.getAttribute('data-prefix') || '';
      let current = 0;
      const increment = target / 50;
      const updateNumber = () => {
        current += increment;
        if (current < target) {
          kpi.textContent = prefix + Math.floor(current).toLocaleString();
          requestAnimationFrame(updateNumber);
        } else {
          // Format final number (e.g., 127400 -> $127.4K)
          if (target >= 1000) {
             kpi.textContent = prefix + (target / 1000).toFixed(1) + 'K';
          } else {
             kpi.textContent = prefix + target.toLocaleString();
          }
        }
      };
      updateNumber();
    });
  }
// Mobile hamburger navigation
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
