/* Deluxe Kamin v5 — Baca sistemləri səhifəsi */
(function () {
  'use strict';

  var hasGSAP = typeof window.gsap !== 'undefined';
  var motion = document.documentElement.classList.contains('has-motion');
  var $ = function (id) { return document.getElementById(id); };

  /* ---------------- Kəsik: material keçidi ---------------- */
  var LAYERS = {
    ceramic: [
      ['Yüngül beton blok', 'Xarici gövdə. Sistemi daşıyır və qoruyur.'],
      ['Mineral lif izolyasiya', 'İstiliyi saxlayır, kondensatın qarşısını alır.'],
      ['Keramik daxili boru', 'Turşuya və yüksək temperatura davamlı, T600.']
    ],
    steel: [
      ['Paslanmaz polad xarici divar', 'Bina daxilində və fasadda səliqəli görünüş.'],
      ['Mineral yun, 130 kg/m³', 'Yüksək sıxlıqlı injeksiya olunmuş izolyasiya.'],
      ['316L polad daxili divar', 'Çoxyanacaqlı, T450 temperatur sinfi.']
    ]
  };
  var KEYS = ['o', 'i', 'l'];
  var svg = $('xsvg'), xlist = $('xlist'), toggle = $('toggle'), pill = $('togglePill');

  function renderLayers(mat) {
    var data = LAYERS[mat];
    xlist.innerHTML = data.map(function (d, i) {
      return '<li data-k="' + KEYS[i] + '"><span>0' + (i + 1) + '</span><div><b>' + d[0] + '</b><p>' + d[1] + '</p></div></li>';
    }).join('');
    data.forEach(function (d, i) { $('lbl' + i).textContent = d[0]; });
    if (hasGSAP && motion) {
      gsap.fromTo('#xlist li', { x: -20, opacity: 0 }, { x: 0, opacity: 1, stagger: 0.07, duration: 0.6, ease: 'power3.out' });
      gsap.fromTo('.xsvg .lbl text', { opacity: 0, x: -8 }, { opacity: 1, x: 0, stagger: 0.07, duration: 0.5 });
    }
  }

  function movePill() {
    var on = toggle.querySelector('.is-on');
    pill.style.width = on.offsetWidth + 'px';
    pill.style.transform = 'translateX(' + (on.offsetLeft - 5) + 'px)';
  }

  toggle.addEventListener('click', function (e) {
    var b = e.target.closest('button');
    if (!b || b.classList.contains('is-on')) return;
    toggle.querySelectorAll('button').forEach(function (x) { x.classList.toggle('is-on', x === b); });
    svg.classList.toggle('is-steel', b.dataset.mat === 'steel');
    movePill();
    renderLayers(b.dataset.mat);
    if (hasGSAP && motion) gsap.fromTo('.xsvg .ly', { scaleX: 0.6 }, { scaleX: 1, duration: 0.9, ease: 'elastic.out(1, 0.5)', stagger: 0.05 });
  });

  xlist.addEventListener('pointerover', function (e) {
    var li = e.target.closest('li');
    svg.classList.remove('hl-o', 'hl-i', 'hl-l');
    xlist.querySelectorAll('li').forEach(function (x) { x.classList.toggle('is-hl', x === li); });
    if (li) svg.classList.add('hl-' + li.dataset.k);
  });
  xlist.addEventListener('pointerleave', function () {
    svg.classList.remove('hl-o', 'hl-i', 'hl-l');
    xlist.querySelectorAll('li').forEach(function (x) { x.classList.remove('is-hl'); });
  });

  renderLayers('ceramic');
  movePill();
  window.addEventListener('resize', movePill);
  if (document.fonts) document.fonts.ready.then(movePill);

  /* ---------------- Kataloq: növ ikonları + yan panel ---------------- */
  var esc = function (x) { return String(x).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); };
  var BTYPES = { keramik: 'Keramik baca', polad: 'Paslanmaz polad baca', fan: 'Baca fanı' };
  var BITEMS = [
    { type: 'keramik', brand: 'Schiedel', country: 'Almaniya', name: 'Rondo Plus', sub: 'Keramik, üç qatlı · T600', img: DK.img('2023/10/Schiedel-Rondo-Plus-Keramik-baca-sistemi-Deluxe.jpg'), href: '#keramik', contain: true },
    { type: 'polad', brand: 'Poujoulat', country: 'Fransa', name: 'Therminox', sub: 'İkiqat divarlı polad · 316L · Ø100–250', img: DK.img('2022/06/Poujoulat-Therminox-celik-baca-sistemi.jpg'), href: '#polad' }
  ].concat(DK.fans.map(function (f) {
    return { type: 'fan', brand: 'Exodraft', country: 'Danimarka', name: f.name.replace('Exodraft ', ''), sub: 'Baca fanı', img: f.img, href: f.url, ext: true, contain: true };
  }));
  var bp = new URLSearchParams(location.search);
  var csv = function (v) { return v ? v.split(',').filter(Boolean) : []; };
  var st = {
    type: location.hash === '#fanlar' ? ['fan'] : csv(bp.get('tip')).filter(function (t) { return BTYPES[t]; }),
    brand: csv(bp.get('brend')), country: csv(bp.get('olke')), q: ''
  };
  var G = [
    { key: 'type', title: 'Növ', val: function (x) { return x.type; }, label: function (v) { return BTYPES[v]; }, order: Object.keys(BTYPES) },
    { key: 'brand', title: 'Brend', val: function (x) { return x.brand; }, label: function (v) { return '<span lang="en">' + esc(v) + '</span>'; } },
    { key: 'country', title: 'İstehsal ölkəsi', val: function (x) { return x.country; }, label: function (v) { return esc(v); } }
  ];
  function ok(x, skip) {
    var q = st.q.toLowerCase();
    if (q && (x.brand + ' ' + x.name + ' ' + BTYPES[x.type]).toLowerCase().indexOf(q) === -1) return false;
    return G.every(function (g) { return g.key === skip || !st[g.key].length || st[g.key].indexOf(g.val(x)) > -1; });
  }
  var CH = [['keramik', BITEMS[0].img, true], ['polad', BITEMS[1].img, false], ['fan', DK.img('2022/08/Exodraft-RSV-baca-fani.jpg'), true]];
  function renderChics() {
    $('bchiclets').innerHTML = '<button type="button" class="chic' + (!st.type.length ? ' is-on' : '') + '" data-type=""><span class="chic__img chic__img--all">' + BITEMS.length + '</span><b>Hamısı</b><small>model</small></button>' +
      CH.map(function (c) {
        var n = BITEMS.filter(function (x) { return x.type === c[0]; }).length;
        return '<button type="button" class="chic' + (st.type.indexOf(c[0]) > -1 ? ' is-on' : '') + '" data-type="' + c[0] + '"><span class="chic__img' + (c[2] ? ' chic__img--w' : '') + '"><img src="' + c[1] + '" alt="" loading="lazy"></span><b>' + BTYPES[c[0]] + '</b><small>' + n + ' model</small></button>';
      }).join('') +
      '<a class="chic" href="#kesik"><span class="chic__img"><img src="https://images.unsplash.com/photo-1716291033271-6321288e3c73?auto=format&fit=crop&w=400&q=70" alt="" loading="lazy"></span><b>Necə qurulub</b><small>Üç qat</small></a>' +
      '<a class="chic" href="#suallar"><span class="chic__img chic__img--all">?</span><b>Suallar</b><small>5 sual</small></a>';
  }
  function renderFacets() {
    $('facets').innerHTML = G.map(function (g) {
      var counts = {}, all = {};
      BITEMS.forEach(function (x) { var v = g.val(x); all[v] = 1; if (ok(x, g.key)) counts[v] = (counts[v] || 0) + 1; });
      var vals = g.order || Object.keys(all).sort(function (a, b) { return a.localeCompare(b, 'az'); });
      return '<fieldset class="facet"><legend>' + g.title + '</legend>' + vals.map(function (v) {
        var on = st[g.key].indexOf(v) > -1, n = counts[v] || 0;
        return '<label class="facet__opt' + (!n && !on ? ' is-empty' : '') + '"><input type="checkbox" data-g="' + g.key + '" value="' + esc(v) + '"' + (on ? ' checked' : '') + '><span class="facet__box"></span><span class="facet__txt">' + g.label(v) + '</span><span class="facet__n">' + n + '</span></label>';
      }).join('') + '</fieldset>';
    }).join('');
  }
  function renderPills() {
    var h = '';
    G.forEach(function (g) { st[g.key].forEach(function (v) { h += '<button type="button" class="pill" data-g="' + g.key + '" data-v="' + esc(v) + '">' + g.label(v) + '<i aria-hidden="true">×</i></button>'; }); });
    if (st.q) h += '<button type="button" class="pill" data-g="q">"' + esc(st.q) + '"<i aria-hidden="true">×</i></button>';
    if (h) h += '<button type="button" class="pill pill--clear" data-g="all">Hamısını sil</button>';
    $('pills').innerHTML = h; $('pills').hidden = !h;
    var n = G.reduce(function (a, g) { return a + st[g.key].length; }, 0) + (st.q ? 1 : 0);
    $('facetReset').hidden = !n; $('filterBtnN').textContent = n || '';
  }
  function card(x) {
    var wa = DK.waLink(DK.msg ? DK.msg('product', { x: x.brand + ' ' + x.name }) : 'Salam! ' + x.brand + ' ' + x.name + ' haqqında məlumat və qiymət almaq istəyirəm.');
    return '<article class="sc sc--prod"><a class="sc__cover" href="' + x.href + '"' + (x.ext ? ' target="_blank" rel="noopener"' : '') + ' aria-label="' + esc(x.brand + ' ' + x.name) + '"></a>' +
      '<div class="sc__top"><p class="sc__eyebrow"><span lang="en">' + esc(x.brand) + '</span> · ' + x.country + '</p><h3 class="sc__title">' + esc(x.name) + '</h3><p class="sc__sub">' + x.sub + '</p></div>' +
      '<div class="sc__img' + (x.contain ? ' sc__img--contain' : '') + '"><img src="' + x.img + '" alt="' + esc(x.brand + ' ' + x.name) + '" loading="lazy"></div>' +
      '<div class="sc__foot"><span class="sc__price">Qiymət sorğu ilə</span><a class="sc__wa" href="' + wa + '" target="_blank" rel="noopener">Qiymət soruş</a></div></article>';
  }
  function renderGrid(anim) {
    var res = BITEMS.filter(function (x) { return ok(x); });
    $('grid').innerHTML = res.length ? res.map(card).join('') : '<div class="empty"><p>Bu filtrə uyğun model tapılmadı.</p><button type="button" class="btn btn--line" data-g="all"><span>Filtrləri sıfırla</span></button></div>';
    $('count').textContent = res.length; $('filterApplyN').textContent = res.length;
    if (anim !== false && hasGSAP && motion) gsap.fromTo($('grid').children, { y: 16, opacity: 0 }, { y: 0, opacity: 1, duration: 0.45, ease: 'power3.out', stagger: 0.02 });
  }
  function refresh(anim) { renderChics(); renderFacets(); renderPills(); renderGrid(anim); }
  function clearAll() { G.forEach(function (g) { st[g.key] = []; }); st.q = ''; $('q').value = ''; refresh(); }
  $('bchiclets').addEventListener('click', function (e) { var b = e.target.closest('button[data-type]'); if (!b) return; st.type = b.dataset.type ? [b.dataset.type] : []; refresh(); });
  $('facets').addEventListener('change', function (e) {
    var i = e.target; if (!i.dataset.g) return;
    var arr = st[i.dataset.g], k = arr.indexOf(i.value);
    if (i.checked && k === -1) arr.push(i.value);
    if (!i.checked && k > -1) arr.splice(k, 1);
    refresh();
  });
  document.addEventListener('click', function (e) {
    var b = e.target.closest('.pill, .empty [data-g]'); if (!b) return;
    var g = b.dataset.g;
    if (g === 'all') return clearAll();
    if (g === 'q') { st.q = ''; $('q').value = ''; } else { var arr = st[g], k = arr.indexOf(b.dataset.v); if (k > -1) arr.splice(k, 1); }
    refresh();
  });
  $('facetReset').addEventListener('click', clearAll);
  var qt;
  $('q').addEventListener('input', function () { clearTimeout(qt); qt = setTimeout(function () { st.q = $('q').value.trim(); refresh(); }, 200); });
  var side = $('catSide');
  function drawer(open) { side.classList.toggle('is-open', open); DK.lockScroll(open); }
  $('filterBtn').addEventListener('click', function () { drawer(true); });
  side.addEventListener('click', function (e) { if (e.target.closest('[data-drawer-close]')) drawer(false); });
  window.addEventListener('hashchange', function () { if (location.hash === '#fanlar') { st.type = ['fan']; refresh(); } });
  refresh(false);
  if (bp.get('olke') || bp.get('tip') || bp.get('brend')) DK.ready.then(function () { setTimeout(function () { DK.scrollTo('#mehsullar'); }, 400); });

  /* ---------------- Suallar ---------------- */
  var faq = $('faq');
  function toggleAcc(item, open) {
    var panel = item.querySelector('.acc__panel');
    item.classList.toggle('is-open', open);
    item.querySelector('.acc__btn').setAttribute('aria-expanded', open);
    if (hasGSAP && motion) gsap.to(panel, { height: open ? 'auto' : 0, duration: 0.7, ease: 'expo.inOut', onComplete: function () { ScrollTrigger.refresh(); } });
    else panel.style.height = open ? 'auto' : '0px';
  }
  faq.addEventListener('click', function (e) {
    var btn = e.target.closest('.acc__btn');
    if (!btn) return;
    var item = btn.parentElement, open = !item.classList.contains('is-open');
    faq.querySelectorAll('.acc__item.is-open').forEach(function (o) { if (o !== item) toggleAcc(o, false); });
    toggleAcc(item, open);
  });
  toggleAcc(faq.firstElementChild, true);

  /* ---------------- Animasiyalar ---------------- */
  DK.initReveals();
  if (location.hash) DK.ready.then(function () { setTimeout(function () { DK.scrollTo(location.hash); }, 400); });
  if (!hasGSAP || !motion) return;

  // proses xətti
  var steps = gsap.utils.toArray('.pstep');
  gsap.to('#procLine', { scaleY: 1, ease: 'none', scrollTrigger: { trigger: '#steps', start: 'top 60%', end: 'bottom 60%', scrub: true } });
  steps.forEach(function (s) {
    ScrollTrigger.create({ trigger: s, start: 'top 62%', onToggle: function (self) { s.classList.toggle('is-on', self.isActive || self.progress === 1); }, end: 'max' });
    gsap.from(s.children, { y: 30, opacity: 0, stagger: 0.06, duration: 0.9, ease: 'power3.out', scrollTrigger: { trigger: s, start: 'top 80%' } });
  });

  // kəsikdəki bacanın scroll ilə "qurulması"
  gsap.from('.xsvg .ly, .xsvg .cap', { scaleY: 0, transformOrigin: '50% 100%', duration: 1.4, ease: 'expo.out', stagger: 0.12,
    scrollTrigger: { trigger: '#xsvg', start: 'top 75%' } });
})();
