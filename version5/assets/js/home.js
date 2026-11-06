/* Deluxe Kamin — ana səhifə */
(function () {
  'use strict';

  var hasGSAP = typeof window.gsap !== 'undefined';
  var motion = document.documentElement.classList.contains('has-motion');
  var $ = function (id) { return document.getElementById(id); };
  var byName = function (n) { return DK.products.find(function (x) { return x.name === n; }); };

  /* ---------------- 3D kamin ---------------- */
  var x3d = $('x3d');
  var hero = null;
  try { hero = DK.hero3d ? DK.hero3d($('x3dCanvas')) : null; } catch (e) { hero = null; }
  if (!hero) x3d.classList.add('x3d--fallback');

  // ilkin kadr: kamin mətnin altında qalmasın
  var introEl = document.querySelector('.x3d__intro');
  function baseFrame() {
    var w = window.innerWidth, h = window.innerHeight;
    if (w >= 1000) {
      var txt = introEl.getBoundingClientRect();
      return { sx: (txt.right + w) / 2 - w / 2, sy: -h * 0.18, zoom: h < 700 ? 0.86 : 0.76 };
    }
    var bottom = 0;
    introEl.querySelectorAll('.ctas, .x3d__sub').forEach(function (b) { bottom = Math.max(bottom, b.getBoundingClientRect().bottom); });
    var region = h - bottom - 40;
    return { sx: 0, sy: bottom + region * 0.52 - h * 0.66, zoom: Math.min(1.9, Math.max(1, (h * 0.42) / Math.max(region, 120))) };
  }
  var bf = baseFrame();
  if (hero) hero.snapFrame(bf);
  window.addEventListener('resize', function () { bf = baseFrame(); });

  /* ---------------- Foto-plitələr: linklər ---------------- */
  document.querySelectorAll('.fp [data-m]').forEach(function (a) {
    var p = byName(a.dataset.m);
    if (p) a.href = 'kamin.html?m=' + p.id;
  });
  document.querySelectorAll('.fp [data-wa]').forEach(function (a) {
    a.href = DK.waLink(DK.msg('product', { x: a.dataset.wa }));
    a.target = '_blank'; a.rel = 'noopener';
  });

  /* ---------------- Animasiyalar (seçilmiş yerlərdə) ---------------- */
  /* ---------------- Deluxe fərqi: altı iş, bir müraciət ---------------- */
  function initDiff() {
    var stage = $('diffStage');
    if (!stage) return;
    var box = stage.closest('.diff__box');
    var num = $('diffNum');
    if (!(hasGSAP && motion && window.ScrollTrigger)) { box.classList.add('is-final'); num.textContent = '1'; return; }
    var items = gsap.utils.toArray(stage.querySelectorAll('.diff__list li'));

    var SCAT = [[-34, -2.4], [40, 1.8], [-18, 1.2], [46, -1.6], [-42, 2.2], [22, -1.1]];
    var who = stage.querySelectorAll('.diff__who'), ok = stage.querySelectorAll('.diff__ok');
    var head = stage.querySelector('.diff__head'), list = stage.querySelector('.diff__list');
    var counter = { n: 0 };
    function showNum() { num.textContent = Math.max(0, Math.round(counter.n)); }

    gsap.set(items, { opacity: 0, y: 40, x: function (i) { return SCAT[i][0]; }, rotation: function (i) { return SCAT[i][1]; } });
    gsap.set(head, { height: 0, opacity: 0, paddingTop: 0, paddingBottom: 0 });
    gsap.set(ok, { opacity: 0 });
    gsap.set('.diff__c2, .diff__h', { opacity: 0, y: 16 });
    gsap.set(list, { gap: 14 });
    showNum();

    // vaxta bağlı animasiya: görünəndə öz-özünə oynayır, sonda dayanıb təkrarlanır
    var tl = gsap.timeline({ paused: true, repeat: -1, repeatDelay: 0.4, defaults: { ease: 'power2.inOut' } });
    var grid = box.querySelector('.diff__grid');
    function ours(on) { box.classList.toggle('is-ours', on); }
    tl.set(grid, { opacity: 1 }, 0).call(ours, [false], 0);
    // 1) iş-iş, adam-adam: kartlar dağınıq gəlir, sayğac 1 → 6
    tl.to(items, { opacity: 1, y: 0, duration: 0.8, stagger: 0.7, ease: 'power3.out' }, 0)
      .to(counter, { n: 6, duration: 0.7 * 5 + 0.8, ease: 'none', onUpdate: showNum }, 0)
    // 2) qısa fasilə; sonra rəng bordoya keçir və yazı dəyişir — indi bizim hissəmiz
      .addLabel('merge', '+=1.2')
      .call(ours, [true], 'merge')
      .to('.diff__c1', { opacity: 0, y: -16, duration: 0.5 }, 'merge')
      .to('.diff__c2', { opacity: 1, y: 0, duration: 0.6 }, 'merge+=0.3')
      .to(head, { height: 76, opacity: 1, duration: 0.8 }, 'merge')
      .to(items, { x: 0, rotation: 0, borderRadius: 0, boxShadow: '0 0 0 rgba(0,0,0,0)', duration: 1.2, stagger: 0.35 }, 'merge+=0.3')
      .to(who, { opacity: 0, duration: 0.4, stagger: 0.35 }, 'merge+=0.5')
      .to(ok, { opacity: 1, duration: 0.5, stagger: 0.35 }, 'merge+=0.8')
      .to(list, { gap: 0, duration: 1.4 }, 'merge+=1.6')
      .to(counter, { n: 1, duration: 2.6, ease: 'power1.inOut', onUpdate: showNum }, 'merge+=0.3')
      .to(items[items.length - 1], { borderBottomLeftRadius: 22, borderBottomRightRadius: 22, duration: 0.5 }, '>-0.2')
    // 4) nəticə
      .to('.diff__h', { opacity: 1, y: 0, duration: 0.8 }, '>')
      .to(grid, { opacity: 0, duration: 0.6 }, '+=3.5')
      .call(ours, [false], '>-0.2');

    var dp = location.search.match(/[?&]dp=([\d.]+)/);   // yoxlama: ?dp=0.5 animasiyanın ortası
    if (dp) { tl.pause().progress(+dp[1]); ours(tl.time() > tl.labels.merge); return; }
    new IntersectionObserver(function (en) {
      if (en[0].isIntersecting) tl.play(); else tl.pause();
    }, { threshold: 0.45 }).observe(stage);
  }

  initDiff();

  if (!hasGSAP || !motion) return;

  // hero: başlıq və mətn sakitcə gəlir, kamin qaranlıqdan çıxır
  gsap.set('#heroTitle, [data-hero]', { opacity: 0, y: 24 });
  gsap.set('#x3dCanvas', { opacity: 0 });
  DK.ready.then(function () {
    gsap.timeline({ defaults: { ease: 'power3.out' } })
      .to('#x3dCanvas', { opacity: 1, duration: 1.8, ease: 'power2.out' }, 0)
      .to('#heroTitle', { opacity: 1, y: 0, duration: 1.1 }, 0.15)
      .to('[data-hero]', { opacity: 1, y: 0, duration: 0.9, stagger: 0.08 }, 0.35);
  });

  // 3D hekayə — səhnə yerində qalır, scroll prosesi idarə edir
  var calls = document.querySelectorAll('.x3d__call, .x3d__outro');
  function band(p, a, b) {
    var fade = 0.05;
    if (p < a - fade || p > b + fade) return 0;
    if (p < a) return (p - (a - fade)) / fade;
    if (p > b) return 1 - (p - b) / fade;
    return 1;
  }
  var forcedP = location.search.match(/[?&]p=([\d.]+)/);   // yoxlama üçün: ?p=0.65
  function updateX3d(p) {
    if (forcedP) p = parseFloat(forcedP[1]);
    if (hero) {
      hero.setProgress(p);
      var k = Math.min(1, p / 0.14); k = k * k * (3 - 2 * k);
      hero.setFrame({ sx: bf.sx * (1 - k), sy: bf.sy * (1 - k), zoom: 1 + (bf.zoom - 1) * (1 - k) });
    }
    var io = 1 - Math.min(1, p / 0.12);
    introEl.style.opacity = io;
    introEl.style.transform = 'translateY(' + (-40 * (1 - io)) + 'px)';
    introEl.style.visibility = io <= 0.01 ? 'hidden' : 'visible';
    calls.forEach(function (c) {
      var o = band(p, parseFloat(c.dataset.in), parseFloat(c.dataset.out));
      c.style.opacity = o;
      c.style.transform = 'translateY(' + (20 * (1 - o)) + 'px)';
      c.style.pointerEvents = o > 0.6 ? 'auto' : 'none';
    });
    $('x3dHint').style.opacity = 1 - Math.min(1, p / 0.05);
    $('x3dBar').style.transform = 'scaleX(' + p + ')';
  }
  var shot = /[?&]shot=1/.test(location.search);   // yoxlama screenshot-ları üçün sabit hündürlüklər
  if (shot) document.documentElement.classList.add('shot');
  else ScrollTrigger.create({
    trigger: x3d, start: 'top top', end: '+=340%', pin: '.x3d__stage', scrub: true, anticipatePin: 1,
    onUpdate: function (self) { updateX3d(self.progress); }
  });
  if (forcedP) DK.ready.then(function () { updateX3d(0); });

  // plitələr: foto yaxınlaşaraq açılır, yazı yuxarı qalxır
  gsap.utils.toArray('.fp').forEach(function (t) {
    var img = t.querySelector(':scope > img');
    var tl = gsap.timeline({ scrollTrigger: { trigger: t, start: 'top 88%' } });
    tl.from(t, { y: 60, opacity: 0, duration: 1, ease: 'power3.out' }, 0)
      .from(t.querySelectorAll(':scope > h2, :scope > p, :scope > .fp__ctas, :scope > dl'), { y: 24, opacity: 0, duration: 0.8, stagger: 0.07, ease: 'power3.out' }, 0.15);
    if (img) gsap.fromTo(img, { scale: 1.12 }, { scale: 1, ease: 'none', scrollTrigger: { trigger: t, start: 'top bottom', end: 'bottom top', scrub: true } });
  });

  DK.initReveals();

  var ym = location.search.match(/[?&]y=(\d+)/);
  if (ym) DK.ready.then(function () { setTimeout(function () { window.scrollTo(0, +ym[1]); ScrollTrigger.update(); }, 300); });
})();
