// Scroll Reveal Animation
  const revealEls = document.querySelectorAll('.reveal');
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.1 });
  revealEls.forEach(el => io.observe(el));

  // Nav background change on scroll
  const nav = document.getElementById('nav');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      nav.classList.add('scrolled');
      nav.style.background = 'rgba(255, 255, 255, 0.95)';
      nav.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.08)';
    } else {
      nav.classList.remove('scrolled');
      nav.style.background = 'rgba(255, 255, 255, 0.8)';
      nav.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.05)';
    }
  });