document.querySelectorAll('.faq-item').forEach(item => {
    item.querySelector('.faq-q').addEventListener('click', () => {
      const active = document.querySelector('.faq-item.active');
      if (active && active !== item) active.classList.remove('active');
      item.classList.toggle('active');
    });
  });