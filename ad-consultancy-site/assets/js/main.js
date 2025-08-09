(function () {
  const select = (q, c = document) => c.querySelector(q);
  const selectAll = (q, c = document) => Array.from(c.querySelectorAll(q));

  // Dynamic year
  const yearEl = select('#year');
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  // Mobile nav toggle
  const toggle = select('.nav-toggle');
  const navLinks = select('.nav-links');
  if (toggle && navLinks) {
    toggle.addEventListener('click', () => {
      const open = navLinks.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(open));
    });
  }

  // Active link based on current page
  const bodyPage = document.body.getAttribute('data-page');
  if (bodyPage && navLinks) {
    selectAll('a', navLinks).forEach((a) => {
      const href = a.getAttribute('href') || '';
      if (href.includes(`${bodyPage}.html`) || (bodyPage === 'home' && href.endsWith('index.html'))) {
        a.classList.add('active');
      }
    });
  }

  // Reveal on scroll
  const revealEls = selectAll('[data-reveal]');
  if (revealEls.length) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('is-visible');
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    revealEls.forEach((el) => io.observe(el));
  }

  // Number counters
  function animateCount(el) {
    const targetStr = el.getAttribute('data-count');
    if (!targetStr) return;
    const decimals = Number(el.getAttribute('data-decimals') || 0);
    const suffix = el.getAttribute('data-suffix') || '';
    const target = Number(targetStr);
    const duration = 1200;
    const start = performance.now();
    function frame(now) {
      const p = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      const value = (target * eased).toFixed(decimals);
      el.textContent = value + suffix;
      if (p < 1) requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);
  }
  const countEls = selectAll('.num[data-count]');
  if (countEls.length) {
    const io2 = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            animateCount(e.target);
            io2.unobserve(e.target);
          }
        });
      },
      { threshold: 0.4 }
    );
    countEls.forEach((el) => io2.observe(el));
  }

  // Contact form mock submit
  const form = select('#contactForm');
  const success = select('#formSuccess');
  if (form && success) {
    form.addEventListener('submit', (ev) => {
      ev.preventDefault();
      const submitBtn = select('button[type="submit"]', form);
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = 'Sending...';
      }
      setTimeout(() => {
        success.hidden = false;
        form.reset();
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.textContent = 'Send request';
        }
      }, 900);
    });
  }

  // WhatsApp button
  const waBtn = select('#waBtn');
  if (waBtn && typeof window !== 'undefined') {
    waBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const phone = '923001234567'; // replace with your WhatsApp number
      const msg = encodeURIComponent('Salam, paid ads consultancy discuss karni hai.');
      window.location.href = `https://wa.me/${phone}?text=${msg}`;
    });
  }
})();