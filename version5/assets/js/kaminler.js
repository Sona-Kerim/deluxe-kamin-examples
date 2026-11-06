/* Deluxe Kamin — Kaminlər səhifəsi
   Əsas hissə filtrli kataloqdur: kateqoriya ikonları, yan panel (növ, brend, ölkə, baca),
   seçilmiş filtr etiketləri, sıralama. Kart məhsul səhifəsini açır, "Qiymət soruş" WhatsApp-a yazır. */
(function () {
  'use strict';

  var hasGSAP = typeof window.gsap !== 'undefined';
  var motion = document.documentElement.classList.contains('has-motion');
  var $ = function (id) { return document.getElementById(id); };
  var byName = function (n) { return DK.products.find(function (x) { return x.name === n; }); };
  var params = new URLSearchParams(location.search);
  var countryOf = function (p) { return (DK.COUNTRY && DK.COUNTRY[p.brand]) || ''; };
  var esc = function (s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); };

  /* ---------------- Vəziyyət ---------------- */
  var list = function (v) { return v ? v.split(',').filter(Boolean) : []; };
  var state = {
    type: list(params.get('tip')).filter(function (t) { return DK.types[t]; }),
    brand: list(params.get('brend')), country: list(params.get('olke')), chimney: [], q: '', sort: 'rec'
  };
  var GROUPS = [
    { key: 'type', title: 'Növ', val: function (p) { return p.type; }, label: function (v) { return DK.types[v].title; }, order: Object.keys(DK.types) },
    { key: 'brand', title: 'Brend', val: function (p) { return p.brand; }, label: function (v) { return '<span lang="en">' + esc(v) + '</span>'; } },
    { key: 'country', title: 'İstehsal ölkəsi', val: countryOf, label: function (v) { return esc(v); } },
    { key: 'chimney', title: 'Baca', val: function (p) { var t = DK.types[p.type]; return t.accessory ? '' : (t.chimney ? 'yes' : 'no'); },
      label: function (v) { return v === 'yes' ? 'Baca lazımdır' : 'Bacasız'; }, order: ['no', 'yes'] }
  ];
  function matches(p, skip) {
    var q = state.q.trim().toLowerCase();
    if (q && (p.brand + ' ' + p.name + ' ' + DK.types[p.type].title).toLowerCase().indexOf(q) === -1) return false;
    return GROUPS.every(function (g) { return g.key === skip || !state[g.key].length || state[g.key].indexOf(g.val(p)) > -1; });
  }

  /* ---------------- Kateqoriya ikonları (filtr kimi işləyir) ---------------- */
  var CHICLETS = [
    ['elektrik', 'Virtuo Evolve'], ['qaz', 'Pier'], ['odunlu', 'Yan Li'], ['merkezi', 'Alexia 995'],
    ['bio', 'Prime Fire'], ['bag', 'Galio Corten'], ['portal', 'London'], ['aksesuar', 'Siperlik 10.250']
  ];
  var chiclets = $('chiclets');
  function renderChiclets() {
    chiclets.innerHTML = '<button type="button" class="chic chic--all' + (!state.type.length ? ' is-on' : '') + '" data-type="">' +
      '<span class="chic__img chic__img--all">' + DK.products.length + '</span><b>Hamısı</b><small>model</small></button>' +
      CHICLETS.map(function (c) {
        var n = DK.products.filter(function (p) { return p.type === c[0]; }).length;
        return '<button type="button" class="chic' + (state.type.indexOf(c[0]) > -1 ? ' is-on' : '') + '" data-type="' + c[0] + '" aria-pressed="' + (state.type.indexOf(c[0]) > -1) + '">' +
          '<span class="chic__img"><img src="' + byName(c[1]).img + '" alt="" loading="lazy"></span>' +
          '<b>' + DK.types[c[0]].label + '</b><small>' + n + ' model</small></button>';
      }).join('') +
      '<a class="chic" href="baca-sistemleri.html"><span class="chic__img chic__img--w"><img src="' + DK.img('2023/10/Schiedel-Rondo-Plus-Keramik-baca-sistemi-Deluxe.jpg') + '" alt="" loading="lazy"></span><b>Baca sistemləri</b><small>ayrıca səhifə ›</small></a>';
  }
  chiclets.addEventListener('click', function (e) {
    var b = e.target.closest('button[data-type]');
    if (!b) return;
    state.type = b.dataset.type ? [b.dataset.type] : [];
    refresh();
  });

  /* ---------------- Kart ---------------- */
  function priceOf(p) {
    var d = DK.details && DK.details[p.id];
    return d && d.from ? d.from[0] + ' ' + d.from[1] + '-dan' : '';
  }
  function productCard(p) {
    var t = DK.types[p.type], country = countryOf(p), price = priceOf(p);
    var wa = DK.waLink(DK.msg ? DK.msg('product', { x: p.brand + ' ' + p.name }) : 'Salam! ' + p.brand + ' ' + p.name + ' haqqında məlumat və qiymət almaq istəyirəm.');
    return '<article class="sc sc--prod">' +
      '<a class="sc__cover" href="kamin.html?m=' + p.id + '" aria-label="' + esc(p.brand + ' ' + p.name) + '"></a>' +
      '<div class="sc__top"><p class="sc__eyebrow"><span lang="en">' + esc(p.brand) + '</span>' + (country ? ' · ' + country : '') + '</p>' +
      '<h3 class="sc__title">' + esc(p.name) + '</h3>' +
      '<p class="sc__sub">' + (t.accessory ? t.title : t.label + ' · ' + (t.chimney ? 'baca lazımdır' : 'bacasız')) + '</p></div>' +
      '<div class="sc__img"><img src="' + p.img + '" alt="' + esc(p.brand + ' ' + p.name) + '" loading="lazy"></div>' +
      '<div class="sc__foot"><span class="sc__price">' + (price || 'Qiymət sorğu ilə') + '</span>' +
      '<a class="sc__wa" href="' + wa + '" target="_blank" rel="noopener">Qiymət soruş</a></div>' +
      '</article>';
  }

  /* ---------------- Yan panel ---------------- */
  var grid = $('grid'), count = $('count'), facets = $('facets'), search = $('q'), sortSel = $('sort'), pills = $('pills');
  function renderFacets() {
    facets.innerHTML = GROUPS.map(function (g) {
      var counts = {}, all = {};
      DK.products.forEach(function (p) { var v = g.val(p); if (!v) return; all[v] = 1; if (matches(p, g.key)) counts[v] = (counts[v] || 0) + 1; });
      var vals = g.order ? g.order.filter(function (v) { return all[v]; }) : Object.keys(all).sort(function (a, b) { return a.localeCompare(b, 'az'); });
      return '<fieldset class="facet"><legend>' + g.title + '</legend>' + vals.map(function (v) {
        var on = state[g.key].indexOf(v) > -1, n = counts[v] || 0;
        return '<label class="facet__opt' + (!n && !on ? ' is-empty' : '') + '"><input type="checkbox" data-g="' + g.key + '" value="' + esc(v) + '"' + (on ? ' checked' : '') + '>' +
          '<span class="facet__box"></span><span class="facet__txt">' + g.label(v) + '</span><span class="facet__n">' + n + '</span></label>';
      }).join('') + '</fieldset>';
    }).join('');
  }
  function activeCount() { return GROUPS.reduce(function (n, g) { return n + state[g.key].length; }, 0) + (state.q ? 1 : 0); }
  function renderPills() {
    var html = '';
    GROUPS.forEach(function (g) {
      state[g.key].forEach(function (v) {
        html += '<button type="button" class="pill" data-g="' + g.key + '" data-v="' + esc(v) + '">' + g.label(v) + '<i aria-hidden="true">×</i></button>';
      });
    });
    if (state.q) html += '<button type="button" class="pill" data-g="q">“' + esc(state.q) + '”<i aria-hidden="true">×</i></button>';
    if (html) html += '<button type="button" class="pill pill--clear" data-g="all">Hamısını sil</button>';
    pills.innerHTML = html;
    pills.hidden = !html;
    var n = activeCount();
    $('facetReset').hidden = !n;
    $('filterBtnN').textContent = n || '';
  }
  function sorted(arr) {
    var key = function (p) { return (p.brand + ' ' + p.name).toLowerCase(); };
    if (state.sort === 'az') return arr.slice().sort(function (a, b) { return key(a).localeCompare(key(b), 'az'); });
    if (state.sort === 'price') {
      var eur = function (p) { var d = DK.details && DK.details[p.id]; return d && d.from && d.from[1] === '€' ? parseFloat(d.from[0]) : Infinity; };
      return arr.slice().sort(function (a, b) { return eur(a) - eur(b); });
    }
    return arr;
  }
  function renderGrid(animate) {
    var res = sorted(DK.products.filter(function (p) { return matches(p); }));
    grid.innerHTML = res.length ? res.map(productCard).join('') :
      '<div class="empty"><p>Bu filtrə uyğun model tapılmadı.</p><button type="button" class="btn btn--line" data-g="all"><span>Filtrləri sıfırla</span></button></div>';
    count.textContent = res.length;
    $('filterApplyN').textContent = res.length;
    if (animate !== false && hasGSAP && motion) gsap.fromTo(grid.children, { y: 16, opacity: 0 }, { y: 0, opacity: 1, duration: 0.45, ease: 'power3.out', stagger: 0.015 });
    var u = new URLSearchParams();
    if (state.type.length) u.set('tip', state.type.join(','));
    if (state.brand.length) u.set('brend', state.brand.join(','));
    if (state.country.length) u.set('olke', state.country.join(','));
    history.replaceState(null, '', location.pathname + (u.toString() ? '?' + u : '') + location.hash);
  }
  function refresh(animate) { renderChiclets(); renderFacets(); renderPills(); renderGrid(animate); }
  function clearAll() { GROUPS.forEach(function (g) { state[g.key] = []; }); state.q = ''; search.value = ''; refresh(); }

  facets.addEventListener('change', function (e) {
    var i = e.target;
    if (!i.dataset.g) return;
    var arr = state[i.dataset.g], k = arr.indexOf(i.value);
    if (i.checked && k === -1) arr.push(i.value);
    if (!i.checked && k > -1) arr.splice(k, 1);
    refresh();
  });
  document.addEventListener('click', function (e) {
    var b = e.target.closest('.pill, .empty [data-g]');
    if (!b) return;
    var g = b.dataset.g;
    if (g === 'all') return clearAll();
    if (g === 'q') { state.q = ''; search.value = ''; }
    else { var arr = state[g], k = arr.indexOf(b.dataset.v); if (k > -1) arr.splice(k, 1); }
    refresh();
  });
  $('facetReset').addEventListener('click', clearAll);
  var t;
  search.addEventListener('input', function () { clearTimeout(t); t = setTimeout(function () { state.q = search.value.trim(); refresh(); }, 200); });
  sortSel.addEventListener('change', function () { state.sort = sortSel.value; renderGrid(); });

  // telefonda: panel aşağıdan açılır
  var side = $('catSide');
  function drawer(open) {
    side.classList.toggle('is-open', open);
    DK.lockScroll(open);
  }
  $('filterBtn').addEventListener('click', function () { drawer(true); });
  side.addEventListener('click', function (e) { if (e.target.closest('[data-drawer-close]')) drawer(false); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && side.classList.contains('is-open')) drawer(false); });

  /* ---------------- Başlanğıc ---------------- */
  refresh(false);
  if (params.get('drawer') === '1') drawer(true);   // yoxlama üçün
  DK.initReveals();
  var m = params.get('m');   // köhnə link: ?m= → məhsul səhifəsi
  if (m !== null && DK.products[+m]) location.replace('kamin.html?m=' + (+m));
})();
