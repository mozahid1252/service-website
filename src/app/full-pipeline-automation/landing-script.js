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