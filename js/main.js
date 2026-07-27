// MajsAI Studio — shared behavior

document.addEventListener('DOMContentLoaded', () => {
  const nav = document.querySelector('.nav');
  const toggle = document.querySelector('.nav__toggle');
  const links = document.querySelector('.nav__links');

  // Scrolled nav state
  const onScroll = () => {
    if (window.scrollY > 12) nav.classList.add('is-scrolled');
    else nav.classList.remove('is-scrolled');
  };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  // Mobile nav toggle
  if (toggle && links) {
    toggle.addEventListener('click', () => {
      const open = links.classList.toggle('is-open');
      toggle.classList.toggle('is-open', open);
      document.body.style.overflow = open ? 'hidden' : '';
    });
    links.querySelectorAll('a').forEach((a) => {
      a.addEventListener('click', () => {
        links.classList.remove('is-open');
        toggle.classList.remove('is-open');
        document.body.style.overflow = '';
      });
    });
  }

  // Scroll-reveal
  const revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && revealEls.length) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    revealEls.forEach((el) => io.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add('is-visible'));
  }

  // Hero eye — subtle "gaze follows cursor" effect (desktop/mouse only)
  const heroEye = document.getElementById('heroEye');
  if (heroEye && window.matchMedia('(pointer: fine)').matches) {
    const maxTilt = 7;   // degrees
    const maxShift = 4;  // px
    window.addEventListener('mousemove', (e) => {
      const rect = heroEye.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = (e.clientX - cx) / (window.innerWidth / 2);
      const dy = (e.clientY - cy) / (window.innerHeight / 2);
      const tiltY = Math.max(-1, Math.min(1, dx)) * maxTilt;
      const tiltX = Math.max(-1, Math.min(1, dy)) * -maxTilt;
      const shiftX = Math.max(-1, Math.min(1, dx)) * maxShift;
      const shiftY = Math.max(-1, Math.min(1, dy)) * maxShift;
      heroEye.style.transform =
        `translate(${shiftX}px, ${shiftY}px) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;
    }, { passive: true });
  }
});
