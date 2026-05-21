/* ============================================================
   BODHI MINDS — MAIN JAVASCRIPT
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  // === NAV SCROLL ===
  const nav = document.querySelector('.site-nav');
  if (nav) {
    window.addEventListener('scroll', () => {
      nav.classList.toggle('scrolled', window.scrollY > 60);
    });
  }

  // === MOBILE DRAWER ===
  const hamburger = document.querySelector('.nav-hamburger');
  const drawer = document.querySelector('.mobile-drawer');
  if (hamburger && drawer) {
    hamburger.addEventListener('click', () => {
      drawer.classList.toggle('open');
      document.body.style.overflow = drawer.classList.contains('open') ? 'hidden' : '';
    });
    drawer.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        drawer.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  // === REVEAL ON SCROLL ===
  const revealElements = document.querySelectorAll('[data-reveal]');
  if (revealElements.length > 0) {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const delay = el.dataset.revealDelay || 0;
          setTimeout(() => {
            el.classList.add('revealed');
          }, parseFloat(delay) * 1000);
          revealObserver.unobserve(el);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
    revealElements.forEach(el => revealObserver.observe(el));
  }

  // === STAGGER CHILDREN REVEAL ===
  const staggerGroups = document.querySelectorAll('[data-stagger]');
  staggerGroups.forEach(group => {
    const children = group.children;
    Array.from(children).forEach((child, i) => {
      child.setAttribute('data-reveal', '');
      child.setAttribute('data-reveal-delay', (i * 0.12).toFixed(2));
    });
  });
  // Re-observe staggered children
  const allReveals = document.querySelectorAll('[data-reveal]:not(.revealed)');
  if (allReveals.length > 0) {
    const staggerObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const delay = el.dataset.revealDelay || 0;
          setTimeout(() => {
            el.classList.add('revealed');
          }, parseFloat(delay) * 1000);
          staggerObserver.unobserve(el);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
    allReveals.forEach(el => staggerObserver.observe(el));
  }

  // === FAB (Book a Tour) ===
  const fab = document.querySelector('.fab');
  if (fab) {
    window.addEventListener('scroll', () => {
      fab.classList.toggle('visible', window.scrollY > 300);
    });
  }

  // === FAQ ACCORDION ===
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    if (question) {
      question.addEventListener('click', () => {
        const wasOpen = item.classList.contains('open');
        // Close all
        faqItems.forEach(i => i.classList.remove('open'));
        // Toggle clicked
        if (!wasOpen) item.classList.add('open');
      });
    }
  });

  // === LIGHTBOX ===
  const lightbox = document.querySelector('.lightbox');
  const lightboxImg = lightbox ? lightbox.querySelector('img') : null;
  const galleryItems = document.querySelectorAll('.gallery-item img');
  
  if (lightbox && lightboxImg) {
    galleryItems.forEach(img => {
      img.addEventListener('click', () => {
        lightboxImg.src = img.src;
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
      });
    });
    
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox || e.target.classList.contains('lightbox-close')) {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && lightbox.classList.contains('active')) {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  }

  // === SMOOTH SCROLL FOR ANCHOR LINKS ===
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // === FORM HANDLING (prevent default) ===
  document.querySelectorAll('form').forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = form.querySelector('button[type="submit"]');
      if (btn) {
        const orig = btn.textContent;
        btn.textContent = 'Sent! ✓';
        btn.style.backgroundColor = '#3B6D11';
        setTimeout(() => {
          btn.textContent = orig;
          btn.style.backgroundColor = '';
          form.reset();
        }, 2000);
      }
    });
  });
});
