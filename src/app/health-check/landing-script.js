// Accordion
  document.querySelectorAll('.faq-item').forEach(item => {
    const q = item.querySelector('.faq-q');
    q.addEventListener('click', () => {
      const currentlyActive = document.querySelector('.faq-item.active');
      if (currentlyActive && currentlyActive !== item) {
        currentlyActive.classList.remove('active');
      }
      item.classList.toggle('active');
    });
  });