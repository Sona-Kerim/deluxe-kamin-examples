/* Deluxe Kamin — kamin səhifəsi (kamin.html?m=<id>)
   Qalereya, ölçü/variant seçimi, qiymət, xüsusiyyətlər, texniki göstəricilər, oxşar modellər. */
(function () {
  'use strict';

  var $ = function (id) { return document.getElementById(id); };
  var params = new URLSearchParams(location.search);
  var id = parseInt(params.get('m'), 10);
  var p = DK.products[id];
  if (!p) { location.replace('kaminler.html'); return; }

  var d = (DK.details && DK.details[id]) || { sub: '', desc: '', feats: [], specs: [], from: null, variants: [], gallery: [] };
  var type = DK.types[p.type];
  var country = (DK.COUNTRY && DK.COUNTRY[p.brand]) || '';
  var UP = 'https://deluxekamin.com/wp-content/uploads/';
  var esc = function (s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); };

  document.title = p.brand + ' ' + p.name + ' — Deluxe Kamin';

  /* ---------- Başlıq ---------- */
  $('pdCrumbType').innerHTML = ' / <a href="kaminler.html?tip=' + p.type + '">' + type.title + '</a>';
  $('pdBrand').innerHTML = '<span lang="en">' + esc(p.brand) + '</span>' + (country ? ' · ' + country : '');
  $('pdName').textContent = p.name;
  $('pdSub').textContent = d.sub || type.title;
  $('pdTags').textContent = type.accessory ? type.title : type.label + ' · ' + (type.chimney ? 'baca lazımdır' : 'bacasız');

  /* ---------- Qalereya ---------- */
  var imgs = d.gallery.length ? d.gallery.map(function (g) { return UP + g; }) : [p.img];
  if (imgs.indexOf(p.img) === -1) imgs.unshift(p.img);
  imgs = imgs.slice(0, 8);
  var cur = 0;
  $('pdStage').innerHTML = imgs.map(function (u, i) {
    return '<img src="' + u + '" alt="' + esc(p.brand + ' ' + p.name) + '"' + (i ? ' loading="lazy"' : '') + ' class="' + (i === 0 ? 'is-on' : '') + '">';
  }).join('') + (imgs.length > 1 ? '<button class="pd__nav pd__nav--l" data-step="-1" aria-label="Əvvəlki">‹</button><button class="pd__nav pd__nav--r" data-step="1" aria-label="Növbəti">›</button>' : '');
  $('pdThumbs').innerHTML = imgs.length > 1 ? imgs.map(function (u, i) {
    return '<button class="' + (i === 0 ? 'is-on' : '') + '" data-i="' + i + '" aria-label="Şəkil ' + (i + 1) + '"><img src="' + u + '" alt="" loading="lazy"></button>';
  }).join('') : '';
  function show(i) {
    cur = (i + imgs.length) % imgs.length;
    $('pdStage').querySelectorAll('img').forEach(function (im, k) { im.classList.toggle('is-on', k === cur); });
    $('pdThumbs').querySelectorAll('button').forEach(function (b, k) { b.classList.toggle('is-on', k === cur); });
  }
  $('pdStage').addEventListener('click', function (e) { var b = e.target.closest('[data-step]'); if (b) show(cur + +b.dataset.step); });
  $('pdThumbs').addEventListener('click', function (e) { var b = e.target.closest('[data-i]'); if (b) show(+b.dataset.i); });
  document.addEventListener('keydown', function (e) { if (e.key === 'ArrowLeft') show(cur - 1); if (e.key === 'ArrowRight') show(cur + 1); });
  // barmaqla sürüşdürmə
  var sx = null;
  $('pdStage').addEventListener('touchstart', function (e) { sx = e.touches[0].clientX; }, { passive: true });
  $('pdStage').addEventListener('touchend', function (e) {
    if (sx === null) return;
    var dx = e.changedTouches[0].clientX - sx; sx = null;
    if (Math.abs(dx) > 40) show(cur + (dx < 0 ? 1 : -1));
  });

  /* ---------- Qiymət və variantlar ---------- */
  function shortName(v) {
    var out = v;
    if (out.indexOf(p.name) > -1) out = out.slice(out.indexOf(p.name) + p.name.length);
    else p.brand.split(' ').concat(['DRU']).forEach(function (w) { out = out.replace(new RegExp('^' + w + '\\s+'), ''); });
    out = out.trim();
    return out || p.name;
  }
  var chosen = null;
  function renderPrice() {
    var el = $('pdPrice');
    if (chosen) el.innerHTML = '<b>' + esc(chosen[1]) + '</b><span>+18% ƏDV</span>';
    else if (d.from) el.innerHTML = '<b>' + esc(d.from[0] + ' ' + d.from[1]) + '-dan</b><span>+18% ƏDV</span>';
    else el.innerHTML = '<b class="pd__ask">Qiymət sorğu ilə</b>';
  }
  if (d.variants.length) {
    $('pdVariants').innerHTML = d.variants.map(function (v, i) {
      return '<button type="button" data-v="' + i + '"><span>' + esc(shortName(v[0])) + '</span><small>' + esc(v[1]) + '</small></button>';
    }).join('');
    $('pdVariants').addEventListener('click', function (e) {
      var b = e.target.closest('[data-v]');
      if (!b) return;
      var v = d.variants[+b.dataset.v];
      chosen = chosen === v ? null : v;
      $('pdVariants').querySelectorAll('button').forEach(function (x) { x.classList.toggle('is-on', chosen && x === b); });
      renderPrice();
    });
    if (d.variants.length > 8) $('pdVariants').classList.add('is-many');
  } else {
    $('pdVariantsWrap').hidden = true;
  }
  renderPrice();
  if (!d.from && !d.variants.length) document.querySelector('.pd__note').hidden = true;

  // WhatsApp: seçilmiş ölçü ilə birlikdə (dil faylı sonra yüklənir, ona görə klik anında qurulur)
  $('pdWa').addEventListener('click', function () {
    var x = p.brand + ' ' + p.name + (chosen ? ' (' + shortName(chosen[0]) + ')' : '');
    this.href = DK.waLink(DK.msg ? DK.msg('product', { x: x }) : 'Salam! ' + x + ' haqqında məlumat və qiymət almaq istəyirəm.');
  });
  $('pdWa').href = DK.waLink('Salam! ' + p.brand + ' ' + p.name + ' haqqında məlumat və qiymət almaq istəyirəm.');

  // footer formasını bu məhsulla doldur (main.js formanı sonra yaradır)
  var autoMsg = '';
  function fillForm() {
    var msg = document.getElementById('fMsg');
    if (!msg || (msg.value && msg.value !== autoMsg)) return;
    var x = p.brand + ' ' + p.name + (chosen ? ' (' + shortName(chosen[0]) + ')' : '');
    autoMsg = (DK.t ? DK.t('Bu model barədə məlumat və qiymət istəyirəm:') : 'Bu model barədə məlumat və qiymət istəyirəm:') + ' ' + x;
    msg.value = autoMsg;
    var topic = document.getElementById('fTopic');
    if (topic) topic.selectedIndex = type.accessory ? 7 : 0;
  }
  window.addEventListener('load', fillForm);
  $('pdVariants').addEventListener('click', function () { setTimeout(fillForm, 0); });

  /* ---------- Xüsusiyyətlər və texniki göstəricilər ---------- */
  $('pdDesc').textContent = d.desc || type.text;
  $('pdFeats').innerHTML = d.feats.map(function (f) { return '<li>' + esc(f) + '</li>'; }).join('');
  var specs = d.specs.slice();
  var keys = specs.map(function (s) { return s[0]; });
  if (keys.indexOf('Növ') === -1) specs.unshift(['Növ', type.title]);
  if (keys.indexOf('Baca') === -1 && !type.accessory) specs.push(['Baca', type.chimney ? 'Lazımdır' : 'Lazım deyil']);
  if (country) specs.push(['İstehsal', country]);
  specs.push(['Harada uyğundur', type.ideal]);
  $('pdSpecs').innerHTML = specs.map(function (s) { return '<div><dt>' + esc(s[0]) + '</dt><dd>' + esc(s[1]) + '</dd></div>'; }).join('');

  /* ---------- Oxşar modellər ---------- */
  var more = DK.products.filter(function (x) { return x.type === p.type && x.id !== p.id; }).slice(0, 10);
  $('pdMoreH').textContent = type.title;
  $('pdMoreRow').innerHTML = more.map(function (x) {
    var dx = DK.details && DK.details[x.id];
    return '<a class="sc" href="kamin.html?m=' + x.id + '"><div class="sc__top"><p class="sc__eyebrow"><span lang="en">' + esc(x.brand) + '</span></p><h3 class="sc__title">' + esc(x.name) + '</h3>' +
      (dx && dx.from ? '<p class="sc__price">' + esc(dx.from[0] + ' ' + dx.from[1]) + '-dan</p>' : '') + '</div>' +
      '<div class="sc__img"><img src="' + x.img + '" alt="' + esc(x.brand + ' ' + x.name) + '" loading="lazy"></div></a>';
  }).join('');
  if (!more.length) $('pdMore').hidden = true;
})();
