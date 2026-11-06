/* ===== Deluxe Kamin — Version 3 "Heat Lab" ===== */
(() => {
  const WA_NUMBER = '994502520216';
  const $ = id => document.getElementById(id);
  const openWA = msg => window.open(`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`, '_blank');
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- Mobile menu ---------- */
  const menu = $('menu');
  $('menuBtn').addEventListener('click', () => menu.classList.toggle('is-open'));
  menu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => menu.classList.remove('is-open')));

  /* ---------- Reveal + counters ---------- */
  const io = new IntersectionObserver(entries => entries.forEach(e => {
    if (!e.isIntersecting) return;
    e.target.classList.add('is-in');
    const num = e.target.querySelector('[data-to]');
    if (num) countUp(num);
    io.unobserve(e.target);
  }), { threshold: 0.15 });
  document.querySelectorAll('.up').forEach((el, i) => { el.style.transitionDelay = `${(i % 4) * 70}ms`; io.observe(el); });

  function countUp(el) {
    const to = +el.dataset.to, from = el.hasAttribute('data-plain') ? to - 60 : 0, t0 = performance.now();
    const tick = now => {
      const p = Math.min((now - t0) / 1400, 1), e = 1 - Math.pow(1 - p, 4);
      el.textContent = Math.round(from + (to - from) * e) + (el.hasAttribute('data-plain') ? '' : '+');
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }

  /* ---------- Bento spotlight ---------- */
  document.querySelectorAll('.bx').forEach(card => card.addEventListener('pointermove', e => {
    const r = card.getBoundingClientRect();
    card.style.setProperty('--mx', `${e.clientX - r.left}px`);
    card.style.setProperty('--my', `${e.clientY - r.top}px`);
  }));

  /* ---------- Helpers ---------- */
  const fillRange = input => {
    const p = ((input.value - input.min) / (input.max - input.min)) * 100;
    input.style.setProperty('--p', `${p}%`);
  };
  const segment = (id, cb) => {
    const el = $(id);
    el.addEventListener('click', e => {
      const btn = e.target.closest('button');
      if (!btn) return;
      el.querySelectorAll('button').forEach(b => b.classList.toggle('is-on', b === btn));
      cb(btn);
    });
    return () => el.querySelector('.is-on');
  };

  /* ---------- Heat calculator ---------- */
  const area = $('area'), height = $('height');
  let k = 1, shownKw = 0, lastRecKey = '';
  const getInsul = segment('insul', btn => { k = +btn.dataset.k; calc(); });

  function recommend(kw) {
    if (kw <= 4) return ['Elektrik kamin', 'Bioetanol kamin'];
    if (kw <= 8) return ['Qaz kamin', 'Odunlu kaset', 'Elektrik kamin'];
    if (kw <= 14) return ['Odunlu kaset', 'Qaz kamin', 'Mərkəzi kamin'];
    return ['Güclü odunlu kaset', 'Mərkəzi kamin', 'Bir neçə istilik nöqtəsi'];
  }

  function calc() {
    [area, height].forEach(fillRange);
    $('areaOut').textContent = `${area.value} m²`;
    $('heightOut').textContent = `${(+height.value).toFixed(1)} m`;
    const kw = (area.value * height.value / 25) * k;
    tweenKw(kw);
    $('gauge').style.width = `${Math.min(kw / 20, 1) * 100}%`;
    const recs = recommend(kw), key = recs.join();
    if (key !== lastRecKey) {
      $('recs').innerHTML = recs.map(r => `<span>${r}</span>`).join('');
      lastRecKey = key;
    }
  }

  let kwRaf;
  function tweenKw(target) {
    cancelAnimationFrame(kwRaf);
    const start = shownKw, t0 = performance.now();
    const step = now => {
      const p = Math.min((now - t0) / 400, 1);
      shownKw = start + (target - start) * (1 - Math.pow(1 - p, 3));
      $('kw').textContent = shownKw.toFixed(1);
      if (p < 1) kwRaf = requestAnimationFrame(step);
    };
    kwRaf = requestAnimationFrame(step);
  }

  [area, height].forEach(i => i.addEventListener('input', calc));
  calc();

  $('calcSend').addEventListener('click', () => {
    openWA(`Salam! İstilik kalkulyatorundan yazıram.\nOtaq: ${area.value} m², tavan: ${height.value} m, izolyasiya: ${getInsul().textContent}.\nTəxmini güc: ${$('kw').textContent} kW. Uyğun kamin təklifi istəyirəm.`);
  });

  /* ---------- Chimney configurator ---------- */
  const svg = $('cfgSvg');
  const G = 500, PX = 28;
  const cfg = { mat: 'ceramic', loc: 'inside', h: 8, d: 200 };
  const cur = { h: 8, d: 200, x: 118 };
  const tgt = { ...cur };

  // ruler
  const ruler = $('ruler');
  let rulerSvg = '';
  for (let m = 0; m <= 15; m++) {
    const y = G - m * PX, long = m % 5 === 0;
    rulerSvg += `<line x1="${long ? 4 : 10}" x2="18" y1="${y}" y2="${y}"/>`;
    if (long && m) rulerSvg += `<text x="0" y="${y - 4}">${m}m</text>`;
  }
  ruler.innerHTML = rulerSvg;

  const setRect = (el, x, y, w, h) => {
    el.setAttribute('x', x); el.setAttribute('y', y);
    el.setAttribute('width', Math.max(0, w)); el.setAttribute('height', Math.max(0, h));
  };

  function draw(s) {
    const ow = 34 * s.d / 200, top = G - s.h * PX;
    setRect($('cOuter'), s.x - ow / 2, top, ow, G - top);
    setRect($('cInsul'), s.x - ow * 0.37, top, ow * 0.74, G - top);
    setRect($('cLiner'), s.x - ow * 0.23, top, ow * 0.46, G - top);
    setRect($('cCap'), s.x - ow / 2 - 6, top - 8, ow + 12, 8);
    $('smoke').setAttribute('transform', `translate(${s.x} ${top - 16})`);

    const bt = G - Math.max(2.5, s.h - 1.5) * PX;
    setRect($('bld'), 40, bt, 160, G - bt);
    setRect($('bldWin'), 40, bt, 160, G - bt);
    setRect($('roof'), 34, bt - 6, 172, 8);

    const mk = $('mk');
    mk.setAttribute('x1', 20); mk.setAttribute('y1', top); mk.setAttribute('y2', top);
    $('mkTxt').setAttribute('y', top + 4);

    const pipe = $('pipe');
    const pipeW = s.x - ow / 2 - 140;
    setRect(pipe, 140, 446, pipeW, 10);
    pipe.style.opacity = cfg.loc === 'facade' ? 1 : 0;
  }

  let cfgRaf;
  function animateCfg() {
    cancelAnimationFrame(cfgRaf);
    const loop = () => {
      let moving = false;
      for (const key of ['h', 'd', 'x']) {
        const diff = tgt[key] - cur[key];
        if (Math.abs(diff) > 0.01) { cur[key] += diff * 0.14; moving = true; } else cur[key] = tgt[key];
      }
      draw(cur);
      if (moving) cfgRaf = requestAnimationFrame(loop);
    };
    loop();
  }

  const FIT = {
    150: 'Qaz kaminlər, kiçik kasetlər',
    180: 'Kiçik və orta odunlu kasetlər',
    200: 'Odunlu kaset kaminlər',
    250: 'Açıq ocaqlı və böyük kaminlər'
  };

  function updateCfg() {
    tgt.h = cfg.h; tgt.d = cfg.d;
    tgt.x = cfg.loc === 'facade' ? 204 + (34 * cfg.d / 200) / 2 : 118;
    svg.classList.toggle('is-steel', cfg.mat === 'steel');

    $('chHOut').textContent = `${cfg.h} m`;
    $('mkTxt').textContent = `${cfg.h} m`;
    fillRange($('chH'));
    $('sSys').textContent = cfg.mat === 'ceramic' ? 'Schiedel keramik' : 'Poujoulat Therminox';
    $('sFit').textContent = FIT[cfg.d];

    const status = $('sStatus');
    let warn = '';
    if (cfg.h < 5) warn = 'Zəif ola bilər: min. 5 m tövsiyə olunur';
    else if (cfg.mat === 'ceramic' && cfg.loc === 'facade') warn = 'Fasad üçün polad sistem tövsiyə olunur';
    status.classList.toggle('is-warn', !!warn);
    status.querySelector('b').textContent = warn || 'Optimal';
    animateCfg();
  }

  segment('mat', b => { cfg.mat = b.dataset.v; updateCfg(); });
  segment('loc', b => { cfg.loc = b.dataset.v; updateCfg(); });
  segment('dia', b => { cfg.d = +b.dataset.v; updateCfg(); });
  $('chH').addEventListener('input', e => { cfg.h = +e.target.value; updateCfg(); });
  updateCfg();

  $('cfgSend').addEventListener('click', () => {
    const mat = cfg.mat === 'ceramic' ? 'Keramik' : 'Paslanmaz polad';
    const loc = cfg.loc === 'inside' ? 'Bina daxili' : 'Fasad';
    openWA(`Salam! Baca sistemi üçün təklif istəyirəm:\n• Material: ${mat}\n• Yerləşmə: ${loc}\n• Hündürlük: ${cfg.h} m\n• Diametr: Ø${cfg.d} mm`);
  });

  /* ---------- Interactive hero fire ---------- */
  const canvas = $('fire'), ctx = canvas.getContext('2d');
  const DPR = Math.min(devicePixelRatio || 1, 2);
  let W, H, parts = [], heat = 0.3, mx = 0.5, lastX = null, lastY = null, running = false;

  function resize() {
    W = canvas.offsetWidth; H = canvas.offsetHeight;
    canvas.width = W * DPR; canvas.height = H * DPR;
    ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
  }
  addEventListener('resize', resize);
  resize();
  mx = W / 2;

  $('hero').addEventListener('pointermove', e => {
    if (lastX !== null) {
      const speed = Math.hypot(e.clientX - lastX, e.clientY - lastY);
      heat = Math.min(1, heat + speed * 0.0025);
    }
    lastX = e.clientX; lastY = e.clientY; mx = e.clientX;
  });

  function spawn() {
    const nearMouse = Math.random() < 0.6;
    const spread = (Math.random() + Math.random() + Math.random() - 1.5) * 260;
    const x = nearMouse ? mx + spread : Math.random() * W;
    const power = 0.6 + heat;
    parts.push({
      x, y: H + 20,
      vx: (Math.random() - 0.5) * 0.8,
      vy: -(1.4 + Math.random() * 2.6) * power,
      size: (18 + Math.random() * 40) * (0.6 + heat * 0.9),
      t: 0,
      life: 50 + Math.random() * 50
    });
  }

  function frame() {
    if (!running) return;
    ctx.clearRect(0, 0, W, H);
    heat += (0.25 - heat) * 0.012;
    const n = Math.round(2 + heat * 9);
    for (let i = 0; i < n && parts.length < 650; i++) spawn();

    ctx.globalCompositeOperation = 'lighter';
    for (let i = parts.length - 1; i >= 0; i--) {
      const p = parts[i];
      p.t++;
      const t = p.t / p.life;
      if (t >= 1) { parts.splice(i, 1); continue; }
      p.x += p.vx + Math.sin(p.t * 0.08 + p.size) * 0.6;
      p.y += p.vy;
      const r = p.size * (1 - t * 0.6);
      const hue = 48 - t * 48;
      const a = (1 - t) * 0.32;
      const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, r);
      g.addColorStop(0, `hsla(${hue}, 100%, ${60 - t * 15}%, ${a})`);
      g.addColorStop(1, `hsla(${hue}, 100%, 50%, 0)`);
      ctx.fillStyle = g;
      ctx.fillRect(p.x - r, p.y - r, r * 2, r * 2);
    }
    ctx.globalCompositeOperation = 'source-over';
    requestAnimationFrame(frame);
  }

  if (!reduce) {
    new IntersectionObserver(([e]) => {
      const wasRunning = running;
      running = e.isIntersecting;
      if (running && !wasRunning) requestAnimationFrame(frame);
    }).observe($('hero'));
  }
})();
