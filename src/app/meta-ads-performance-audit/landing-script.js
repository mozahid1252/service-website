
  // ============ SCROLL REVEAL ============
  const revealEls = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver((entries)=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  },{threshold:0.12,rootMargin:'0px 0px -40px 0px'});
  revealEls.forEach(el=>observer.observe(el));

  // ============ FAQ ACCORDION ============
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item=>{
    const btn = item.querySelector('.faq-q');
    btn.addEventListener('click',()=>{
      const isOpen = item.classList.contains('open');
      faqItems.forEach(i=>i.classList.remove('open'));
      if(!isOpen) item.classList.add('open');
    });
  });

  // ============ SMOOTH ANCHOR ============
  document.querySelectorAll('a[href^="#"]').forEach(a=>{
    a.addEventListener('click',e=>{
      const id = a.getAttribute('href');
      if(id.length>1){
        const target = document.querySelector(id);
        if(target){
          e.preventDefault();
          const offset = 70;
          const y = target.getBoundingClientRect().top + window.pageYOffset - offset;
          window.scrollTo({top:y,behavior:'smooth'});
        }
      }
    });
  });

  // ============ NAV ACTIVE STATE ============
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');
  const navObserver = new IntersectionObserver((entries)=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){
        const id = entry.target.id;
        navLinks.forEach(l=>{
          l.style.color = l.getAttribute('href')==='#'+id ? 'var(--accent)' : '';
          l.style.background = l.getAttribute('href')==='#'+id ? 'var(--accent-soft)' : '';
        });
      }
    });
  },{rootMargin:'-40% 0px -55% 0px'});
  sections.forEach(s=>navObserver.observe(s));