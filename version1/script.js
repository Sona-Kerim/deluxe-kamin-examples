/* ===== Deluxe Kamin — Version 1 "Ember Luxe" ===== */
(() => {
  const WA_NUMBER = '994502520216';

  /* Header on scroll */
  const header = document.getElementById('header');
  const onScroll = () => header.classList.toggle('is-scrolled', window.scrollY > 40);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* Mobile menu */
  const burger = document.getElementById('burger');
  const nav = document.getElementById('nav');
  burger.addEventListener('click', () => nav.classList.toggle('is-open'));
  nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => nav.classList.remove('is-open')));

  /* Reveal on scroll + counters */
  const io = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      const counter = entry.target.querySelector('[data-count]');
      if (counter) animateCount(counter);
      io.unobserve(entry.target);
    });
  }, { threshold: 0.15 });
  document.querySelectorAll('.reveal').forEach((el, i) => {
    el.style.transitionDelay = `${(i % 4) * 80}ms`;
    io.observe(el);
  });

  function animateCount(el) {
    const target = +el.dataset.count;
    const start = performance.now();
    const step = now => {
      const p = Math.min((now - start) / 1600, 1);
      el.textContent = Math.round(target * (1 - Math.pow(1 - p, 3)));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }

  /* Card tilt */
  document.querySelectorAll('.card').forEach(card => {
    card.addEventListener('mousemove', e => {
      const r = card.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      card.style.transform = `perspective(900px) rotateY(${x * 6}deg) rotateX(${-y * 6}deg) translateY(-6px)`;
    });
    card.addEventListener('mouseleave', () => { card.style.transform = ''; });
  });

  /* Baca tabs */
  const chimney = document.getElementById('chimney');
  const labels = {
    ceramic: ['Beton gövdə', 'Mineral izolyasiya', 'Keramik boru'],
    steel: ['Polad xarici divar', 'Yüksək sıxlıqlı izolyasiya', 'AISI 316L daxili boru']
  };
  document.querySelectorAll('.tab').forEach(tab => {
    tab.addEventListener('click', () => {
      const key = tab.dataset.tab;
      document.querySelectorAll('.tab').forEach(t => t.classList.toggle('is-active', t === tab));
      document.querySelectorAll('.tab-panel').forEach(p => p.classList.toggle('is-active', p.dataset.panel === key));
      chimney.classList.toggle('is-steel', key === 'steel');
      labels[key].forEach((txt, i) => { document.getElementById(`lbl${i + 1}`).textContent = txt; });
    });
  });

  /* Lead form -> WhatsApp */
  document.getElementById('leadForm').addEventListener('submit', e => {
    e.preventDefault();
    const d = new FormData(e.target);
    const msg = `Salam! Mən ${d.get('name')}. ${d.get('interest')} ilə maraqlanıram. Telefon: ${d.get('phone')}`;
    window.open(`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`, '_blank');
  });

  /* Ember particles */
  const canvas = document.getElementById('embers');
  const ctx = canvas.getContext('2d');
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let w, h, particles = [];
  const DPR = Math.min(window.devicePixelRatio || 1, 2);

  function resize() {
    w = canvas.offsetWidth; h = canvas.offsetHeight;
    canvas.width = w * DPR; canvas.height = h * DPR;
    ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
    const count = Math.min(140, Math.floor(w / 10));
    particles = Array.from({ length: count }, () => spawn(true));
  }

  function spawn(randomY) {
    return {
      x: Math.random() * w,
      y: randomY ? Math.random() * h : h + 10,
      r: Math.random() * 2.2 + 0.4,
      vy: Math.random() * 0.9 + 0.3,
      vx: (Math.random() - 0.5) * 0.4,
      life: Math.random() * Math.PI * 2,
      hue: 20 + Math.random() * 25
    };
  }

  let mouseX = 0;
  window.addEventListener('mousemove', e => { mouseX = (e.clientX / window.innerWidth - 0.5) * 0.6; });

  function frame() {
    ctx.clearRect(0, 0, w, h);
    ctx.globalCompositeOperation = 'lighter';
    for (const p of particles) {
      p.life += 0.03;
      p.y -= p.vy;
      p.x += p.vx + Math.sin(p.life) * 0.35 + mouseX;
      const alpha = Math.max(0, Math.min(1, p.y / h)) * (0.6 + Math.sin(p.life * 2) * 0.4);
      const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 4);
      g.addColorStop(0, `hsla(${p.hue}, 100%, 65%, ${alpha})`);
      g.addColorStop(1, `hsla(${p.hue}, 100%, 50%, 0)`);
      ctx.fillStyle = g;
      ctx.beginPath(); ctx.arc(p.x, p.y, p.r * 4, 0, Math.PI * 2); ctx.fill();
      if (p.y < -10 || p.x < -20 || p.x > w + 20) Object.assign(p, spawn(false));
    }
    requestAnimationFrame(frame);
  }

  window.addEventListener('resize', resize);
  resize();
  if (!reduce) frame();
})();
