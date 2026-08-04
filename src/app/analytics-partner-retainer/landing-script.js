document.querySelectorAll('.faq-item').forEach(item => {
    item.querySelector('.faq-q').addEventListener('click', () => {
      const active = document.querySelector('.faq-item.active');
      if (active && active !== item) active.classList.remove('active');
      item.classList.toggle('active');
    });
  });
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  document.querySelectorAll('.scroll-reveal').forEach(el => observer.observe(el));
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
