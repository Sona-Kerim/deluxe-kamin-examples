/* Deluxe Kamin — ortaq skript: naviqasiya, footer, intro, keçidlər, reveal-lər */
(function () {
  'use strict';

  var LOGO = 'https://deluxekamin.com/wp-content/uploads/2022/03/cropped-KAMIN-LOGO.png';
  var page = document.body.dataset.page || 'home';
  var hasGSAP = typeof window.gsap !== 'undefined';
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  // yoxlama üçün: ?only=showroom — yalnız bir bölməni animasiyasız göstərir
  var onlyM = location.search.match(/[?&]only=([\w-]+)/);
  if (onlyM) {
    reduce = true;
    var keep = document.querySelector('main > #' + onlyM[1] + ', main > .' + onlyM[1]);
    if (keep) document.querySelectorAll('main > section').forEach(function (s) { if (s !== keep) s.style.display = 'none'; });
  }
  var EXT = DK.SITE;

  if (hasGSAP && window.ScrollTrigger) gsap.registerPlugin(ScrollTrigger);
  document.documentElement.classList.add(hasGSAP && !reduce ? 'has-motion' : 'no-motion');

  /* ------------------------------------------------------------------
     Menyu strukturu
  ------------------------------------------------------------------ */
  function link(href, text, cls) {
    return '<a href="' + href + '"' + (cls ? ' class="' + cls + '"' : '') + '>' + text + '</a>';
  }

  var MENU = [
    {
      label: 'Kaminlər', href: 'kaminler.html', key: 'kaminler', mega: true, all: ['Bütün kaminlər', 'kaminler.html'],
      cols: [
        { title: 'Növlər', tiles: true, items: [['Elektrik', 'kaminler.html?tip=elektrik', 'Virtuo Evolve'], ['Qaz', 'kaminler.html?tip=qaz', 'Pier'], ['Odunlu', 'kaminler.html?tip=odunlu', 'Yan Li'], ['Mərkəzi', 'kaminler.html?tip=merkezi', 'Alexia 995'],
          ['Bioetanol', 'kaminler.html?tip=bio', 'Prime Fire'], ['Bağ kaminləri', 'kaminler.html?tip=bag', 'Galio Corten'], ['Mərmər portallar', 'kaminler.html?tip=portal', 'London'], ['Aksesuarlar', 'kaminler.html?tip=aksesuar', 'Siperlik 10.250']] },
        { title: 'İstehsal ölkəsi', items: [['İrlandiya', 'kaminler.html?olke=%C4%B0rlandiya'], ['Fransa', 'kaminler.html?olke=Fransa'], ['İtaliya', 'kaminler.html?olke=%C4%B0taliya'], ['Polşa', 'kaminler.html?olke=Pol%C5%9Fa'], ['Almaniya', 'kaminler.html?olke=Almaniya'], ['Türkiyə', 'kaminler.html?olke=T%C3%BCrkiy%C9%99'], ['ABŞ', 'kaminler.html?olke=AB%C5%9E']] },
        { title: 'Kömək', items: [['Hansı kamin mənə uyğundur?', 'https://wa.me/994502520216'], ['Baca lazımdırmı?', 'baca-sistemleri.html#suallar'], ['Maxitrol qaz sistemləri', EXT + 'gaz-sistemi/'], ['Əlaqə', '#elaqe']] }
      ],
      feature: { img: DK.img('2022/05/Kamin-Arkiane-Yan-Li.jpg'), title: 'Arkiane Yan Li', sub: 'Odunlu · Fransa', href: 'kamin.html?m=17' }
    },
    {
      label: 'Baca Sistemləri', href: 'baca-sistemleri.html', key: 'baca', mega: true, all: ['Bütün baca sistemləri', 'baca-sistemleri.html'],
      cols: [
        { title: 'Növlər', tiles: true, items: [['Keramik baca', 'baca-sistemleri.html?tip=keramik', DK.img('2023/10/Schiedel-Rondo-Plus-Keramik-baca-sistemi-Deluxe.jpg'), 1], ['Paslanmaz polad baca', 'baca-sistemleri.html?tip=polad', DK.img('2022/06/Poujoulat-Therminox-celik-baca-sistemi.jpg'), 1], ['Baca fanları', 'baca-sistemleri.html?tip=fan', DK.img('2022/08/Exodraft-RSV-baca-fani.jpg'), 9]] },
        { title: 'Brend və ölkə', items: [['Schiedel · Almaniya', 'baca-sistemleri.html?brend=Schiedel'], ['Poujoulat · Fransa', 'baca-sistemleri.html?brend=Poujoulat'], ['Exodraft · Danimarka', 'baca-sistemleri.html?brend=Exodraft']] },
        { title: 'Kömək', items: [['Bacanın içi', 'baca-sistemleri.html#kesik'], ['Quraşdırma prosesi', 'baca-sistemleri.html#proses'], ['Tez-tez verilən suallar', 'baca-sistemleri.html#suallar']] }
      ],
      feature: { img: DK.img('2022/06/Poujoulat-Therminox-celik-baca-sistemi.jpg'), title: 'Poujoulat Therminox', sub: 'Paslanmaz polad · Fransa', href: 'baca-sistemleri.html#polad' }
    },
    {
      label: 'Radiator', href: EXT + 'radiator',
      items: [['Su ilə işləyən radiatorlar', EXT + 'radiator'], ['Elektrikli radiatorlar', EXT + 'elektrikli-radiator'], ['Fan coil', EXT + 'fancoil-radiator']]
    },
    {
      label: 'Perila & Kovka', href: EXT + 'perila-kovka',
      items: [['Balkon perilası', EXT + 'balkon-korkuluk'], ['Pilləkən perilası', EXT + 'merdiven-korkuluk'], ['Darvazalar', EXT + 'darvaza-kapi/'], ['Pəncərə barmaqlığı', EXT + 'pencere-korkuluk'], ['Skamyalar', EXT + 'skamya'], ['Besedka və naves', EXT + 'besedka-naves/'], ['Masa və stullar', EXT + 'sandalye-masa']]
    },
    {
      label: 'Mangal & Fırın', href: EXT + 'mangal-firin',
      items: [['Odunlu mangallar', EXT + 'odunla-yanan-mangal'], ['Qazlı mangallar', EXT + 'gazli-mangal'], ['Pizza sobaları', EXT + 'firin/']]
    },
    { label: 'Haqqımızda', href: 'index.html#haqqimizda' }
  ];

  function tileImg(x) {
    if (/^https?:/.test(x)) return x;
    var p = DK.products && DK.products.find(function (q) { return q.name === x; });
    return p ? p.img : '';
  }
  function tileCount(i) {
    if (i[3] !== undefined) return i[3];
    var m = /tip=([a-z]+)/.exec(i[1]);
    return m && DK.products ? DK.products.filter(function (p) { return p.type === m[1]; }).length : '';
  }
  var isExt = function (href) { return href.indexOf(EXT) === 0; };
  var extMark = '<i class="ext" aria-hidden="true">↗</i>';
  function desktopNav() {
    return MENU.map(function (m) {
      var active = m.key === page ? ' is-active' : '';
      if (m.mega) {
        var cols = m.cols.map(function (c) {
          if (c.tiles) {
            return '<div class="mega__col mega__col--tiles"><div class="mega__head"><span class="mega__title">' + c.title + '</span>' + link(m.all[1], m.all[0] + ' ›', 'mega__all') + '</div>' +
              '<div class="mtiles">' + c.items.map(function (i) {
                var n = tileCount(i);
                return '<a class="mtile" href="' + i[1] + '"><span class="mtile__img"><img src="' + tileImg(i[2]) + '" alt="" loading="lazy"></span>' +
                  '<span class="mtile__txt"><b>' + i[0] + '</b>' + (n !== '' ? '<small>' + n + ' model</small>' : '') + '</span></a>';
              }).join('') + '</div></div>';
          }
          return '<div class="mega__col"><span class="mega__title">' + c.title + '</span><ul>' +
            c.items.map(function (i) { return '<li><a href="' + i[1] + '">' + i[0] + (isExt(i[1]) ? extMark : '') + '</a></li>'; }).join('') + '</ul></div>';
        }).join('');
        return '<li class="nav__item has-drop' + active + '">' + link(m.href, m.label, 'nav__link') +
          '<div class="drop"><div class="mega mega--v2">' + cols +
          '<a class="mega__feature" href="' + m.feature.href + '"><img src="' + m.feature.img + '" alt="" loading="lazy"><span class="mega__ftxt"><b>' + m.feature.title + '</b><small>' + m.feature.sub + '</small><em>Bax ›</em></span></a>' +
          '</div></div></li>';
      }
      if (m.items) {
        return '<li class="nav__item has-drop' + active + '">' + link(m.href, m.label, 'nav__link') +
          '<div class="drop"><div class="dsimple"><div class="dsimple__head"><b>' + m.label + '</b><a href="' + m.href + '">Hamısına bax' + extMark + '</a></div>' +
          '<ul class="dsimple__list">' + m.items.map(function (i) { return '<li><a href="' + i[1] + '">' + i[0] + (isExt(i[1]) ? extMark : '') + '</a></li>'; }).join('') + '</ul>' +
          '<p class="dsimple__note">Bu bölmə hələlik mövcud saytda açılır.</p></div></div></li>';
      }
      return '<li class="nav__item' + active + '">' + link(m.href, m.label, 'nav__link') + '</li>';
    }).join('');
  }
  function mobileNav() {
    return MENU.map(function (m, idx) {
      var sub = m.all ? [m.all] : [];
      if (m.cols) m.cols.slice(0, 2).forEach(function (c) { sub = sub.concat(c.items); });
      if (m.items) sub = m.items;
      if (!sub.length) return '<li class="mnav__item">' + link(m.href, m.label, 'mnav__link') + '</li>';
      return '<li class="mnav__item"><button class="mnav__link mnav__toggle" aria-expanded="false" aria-controls="msub' + idx + '">' +
        m.label + '<span class="mnav__plus"></span></button><ul class="mnav__sub" id="msub' + idx + '">' +
        sub.map(function (i) { return '<li>' + link(i[1], i[0]) + '</li>'; }).join('') + '</ul></li>';
    }).join('');
  }

  function langBtns() {
    return (DK.LANGS || ['az']).map(function (l) {
      return '<button type="button" lang="' + l + '" data-lang="' + l + '"' + (l === DK.lang ? ' class="is-on" aria-current="true"' : '') + '>' + l.toUpperCase() + '</button>';
    }).join('');
  }
  var headerHTML =
    '<header class="hdr" id="hdr">' +
      '<a href="index.html" class="hdr__logo" aria-label="Deluxe Kamin — ana səhifə"><img src="' + LOGO + '" alt="Deluxe Kamin"></a>' +
      '<nav class="nav" aria-label="Əsas menyu"><ul class="nav__list">' + desktopNav() + '</ul></nav>' +
      '<a href="tel:+994124494130" class="hdr__phone">012 449 41 30</a>' +
      '<div class="lang" role="group" aria-label="Dil">' + langBtns() + '</div>' +
      '<button class="theme-btn" id="themeBtn" type="button" aria-label="Rejimi dəyiş">' +
        '<svg class="i-sun" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="4.2"/><path d="M12 2.5v2M12 19.5v2M2.5 12h2M19.5 12h2M5.3 5.3l1.4 1.4M17.3 17.3l1.4 1.4M5.3 18.7l1.4-1.4M17.3 6.7l1.4-1.4"/></svg>' +
        '<svg class="i-moon" viewBox="0 0 24 24" aria-hidden="true"><path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5z"/></svg>' +
      '</button>' +
      '<a href="#elaqe" class="btn hdr__cta"><span>Əlaqə</span></a>' +
      '<button class="burger" id="burger" aria-label="Menyu" aria-expanded="false"><span></span><span></span></button>' +
    '</header>' +
    '<div class="nav-dim" aria-hidden="true"></div>' +
    '<div class="mmenu" id="mmenu" aria-hidden="true">' +
      '<ul class="mnav">' + mobileNav() + '<li class="mnav__item">' + link('#elaqe', 'Əlaqə', 'mnav__link') + '</li></ul>' +
      '<div class="lang lang--m" role="group" aria-label="Dil">' + langBtns() + '</div>' +
      '<div class="mmenu__foot"><a href="tel:+994124494130">012 449 41 30</a><a href="tel:+994502520216">050 252 02 16</a></div>' +
    '</div>';

  var footerHTML =
    '<footer class="ftr" id="elaqe">' +
      '<div class="ftr__cta wrap">' +
        '<h2 class="ftr__title" data-split>Kamin seçimində kömək lazımdırsa, yazın.</h2>' +
        '<div class="ftr__row">' +
          '<form class="ftr__form" id="leadForm" novalidate>' +
            '<div class="field"><input id="fName" name="name" required placeholder=" " autocomplete="given-name"><label for="fName">Adınız</label></div>' +
            '<div class="field"><input id="fSurname" name="surname" placeholder=" " autocomplete="family-name"><label for="fSurname">Soyadınız</label></div>' +
            '<div class="field"><input id="fPhone" name="phone" type="tel" required placeholder=" " autocomplete="tel"><label for="fPhone">Mobil nömrəniz</label></div>' +
            '<div class="field"><input id="fEmail" name="email" type="email" placeholder=" " autocomplete="email"><label for="fEmail">E-poçtunuz</label></div>' +
            '<div class="field field--select field--wide"><select id="fTopic" name="topic"><option>Kamin seçimi</option><option>Baca sistemi</option><option>Kamin + baca</option><option>Mərmər portal</option><option>Radiator</option><option>Perila və ferforje</option><option>Servis və təmir</option><option>Digər</option></select><label for="fTopic">Mövzu</label></div>' +
            '<div class="field field--wide field--area"><textarea id="fMsg" name="message" rows="4" placeholder=" "></textarea><label for="fMsg">Mesajınız</label></div>' +
            '<div class="ftr__send field--wide">' +
              '<button type="submit" class="btn" data-via="wa"><span>WhatsApp ilə göndər</span></button>' +
              '<button type="submit" class="btn btn--line" data-via="mail"><span>E-poçt ilə göndər</span></button>' +
              '<p class="ftr__hint">Ad və telefon mütləqdir.</p>' +
            '</div>' +
          '</form>' +
          '<a href="' + DK.waLink(DK.t('Salam! Kamin ilə bağlı məlumat almaq istəyirəm.')) + '" class="ftr__circle" target="_blank" rel="noopener">Və ya birbaşa yazın: 050 252 02 16 <span class="ftr__circle-arrow">›</span></a>' +
        '</div>' +
      '</div>' +
      '<div class="ftr__grid wrap">' +
        '<div class="ftr__brand"><span class="ftr__logo"><img src="' + LOGO + '" alt="Deluxe Kamin"></span><p>1997-ci ildən kamin, baca sistemləri və perila. Türkiyə və Azərbaycan.</p><img class="ftr__iso" src="' + DK.img('2026/04/iso_certified-400x400.png') + '" alt="ISO 9001" loading="lazy"></div>' +
        '<div><h4>Kaminlər</h4><ul>' +
          '<li>' + link('kaminler.html?tip=elektrik', 'Elektrik') + '</li><li>' + link('kaminler.html?tip=qaz', 'Qaz') + '</li><li>' + link('kaminler.html?tip=odunlu', 'Odunlu') + '</li><li>' + link('kaminler.html?tip=bio', 'Bioetanol') + '</li><li>' + link('kaminler.html?tip=bag', 'Bağ kaminləri') + '</li><li>' + link('kaminler.html?tip=portal', 'Mərmər portal') + '</li>' +
        '</ul></div>' +
        '<div><h4>Baca</h4><ul>' +
          '<li>' + link('baca-sistemleri.html#keramik', 'Keramik baca') + '</li><li>' + link('baca-sistemleri.html#polad', 'Polad baca') + '</li><li>' + link('baca-sistemleri.html#fanlar', 'Baca fanları') + '</li><li>' + link('baca-sistemleri.html#suallar', 'Suallar') + '</li>' +
        '</ul></div>' +
        '<div><h4>Əlaqə</h4><ul>' +
          '<li>' + link('tel:+994124494130', '012 449 41 30') + '</li><li>' + link('tel:+994502520216', '050 252 02 16') + '</li>' +
          '<li><a href="https://www.instagram.com/deluxe_kamin_perila_kovka" target="_blank" rel="noopener">Instagram</a></li>' +
          '<li><a href="https://www.facebook.com/deluxekaminperilakovka" target="_blank" rel="noopener">Facebook</a></li>' +
          '<li><a href="https://www.youtube.com/@deluxekaminperilakovka" target="_blank" rel="noopener">YouTube</a></li>' +
          '<li><a href="https://www.linkedin.com/company/deluxekamin" target="_blank" rel="noopener">LinkedIn</a></li>' +
        '</ul></div>' +
      '</div>' +
      '<div class="ftr__bottom wrap"><span>© 2004–2026 Deluxe Kamin &amp; Perila. Bütün hüquqlar qorunur.</span><button class="ftr__top" id="toTop">Yuxarı ↑</button></div>' +
      '<div class="ftr__giant" id="ftrGiant" aria-hidden="true">DELUXE KAMİN</div>' +
    '</footer>';

  document.body.insertAdjacentHTML('afterbegin', headerHTML);
  var main = document.querySelector('main');
  if (main) main.insertAdjacentHTML('afterend', footerHTML);
  document.addEventListener('click', function (e) {
    var b = e.target.closest('.lang [data-lang]');
    if (b && DK.setLang) DK.setLang(b.dataset.lang);
  });
  document.body.insertAdjacentHTML('beforeend', '<div class="pt" id="pt" aria-hidden="true"></div><div class="progress" aria-hidden="true"><i id="progressBar"></i></div>');

  var progressBar = document.getElementById('progressBar');
  function onScrollProgress() {
    var max = document.documentElement.scrollHeight - window.innerHeight;
    progressBar.style.transform = 'scaleX(' + (max > 0 ? window.scrollY / max : 0) + ')';
  }
  window.addEventListener('scroll', onScrollProgress, { passive: true });
  window.addEventListener('resize', onScrollProgress);

  /* ------------------------------------------------------------------
     Ümumi köməkçilər
  ------------------------------------------------------------------ */
  DK.scrollTo = function (target, opts) {
    opts = opts || {};
    var offset = opts.offset !== undefined ? opts.offset : -(document.querySelector('.lnav') ? 110 : 60);
    if (typeof target === 'number') { window.scrollTo({ top: target, behavior: reduce ? 'auto' : 'smooth' }); return; }
    var el = typeof target === 'string' ? document.querySelector(target) : target;
    if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY + offset, behavior: reduce ? 'auto' : 'smooth' });
  };
  DK.lockScroll = function (lock) { document.documentElement.classList.toggle('is-locked', lock); };
  DK.bindMagnetic = function () {};

  DK.split = function (el) {
    if (el._words) return el._words;
    (function walk(node) {
      Array.prototype.slice.call(node.childNodes).forEach(function (child) {
        if (child.nodeType === 3) {
          var frag = document.createDocumentFragment();
          child.textContent.split(/(\s+)/).forEach(function (part) {
            if (!part) return;
            if (/^\s+$/.test(part)) { frag.appendChild(document.createTextNode(' ')); return; }
            var w = document.createElement('span'); w.className = 'w';
            var i = document.createElement('span'); i.className = 'w__i'; i.textContent = part;
            w.appendChild(i); frag.appendChild(w);
          });
          node.replaceChild(frag, child);
        } else if (child.nodeType === 1 && child.tagName !== 'BR' && !child.classList.contains('no-split')) {
          walk(child);
        }
      });
    })(el);
    el._words = el.querySelectorAll('.w__i');
    return el._words;
  };

  /* Sözləri hərflərə bölür (hero və footer yazısı üçün) */
  DK.splitChars = function (el) {
    if (el._chars) return el._chars;
    var targets = el.querySelectorAll('.w__i');
    if (!targets.length) targets = [el];
    Array.prototype.forEach.call(targets, function (t) {
      var text = t.textContent;
      t.textContent = '';
      Array.from(text).forEach(function (c) {
        var s = document.createElement('span');
        s.className = 'ch';
        s.textContent = c === ' ' ? ' ' : c;
        t.appendChild(s);
      });
    });
    el._chars = el.querySelectorAll('.ch');
    return el._chars;
  };

  /* Sakit, dəqiq reveal-lər: fade + yüngül yuxarı hərəkət */
  var giantDone = false;
  DK.initReveals = function (root) {
    root = root || document;
    if (!hasGSAP || reduce) return;
    var giant = document.getElementById('ftrGiant');
    if (giant && !giantDone) {
      giantDone = true;
      gsap.from(DK.splitChars(giant), { yPercent: 110, duration: 1.4, ease: 'expo.out', stagger: 0.04,
        scrollTrigger: { trigger: giant, start: 'top 98%' } });
    }
    // başlıqlar söz-söz yox, bütöv və sakit görünür
    root.querySelectorAll('[data-split]:not([data-split="manual"])').forEach(function (el) {
      gsap.from(el, { y: 30, opacity: 0, duration: 1, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 88%' } });
    });
    root.querySelectorAll('[data-reveal="up"]').forEach(function (el) {
      gsap.from(el, { y: 40, opacity: 0, duration: 1.1, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 90%' } });
    });
    root.querySelectorAll('[data-reveal="stagger"]').forEach(function (el) {
      gsap.from(el.children, { y: 40, opacity: 0, duration: 1, ease: 'power3.out', stagger: 0.07, scrollTrigger: { trigger: el, start: 'top 88%' } });
    });
    root.querySelectorAll('[data-reveal="img"]').forEach(function (el) {
      var img = el.querySelector('img');
      gsap.from(el, { opacity: 0, y: 40, duration: 1.2, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 88%' } });
      if (img) gsap.fromTo(img, { scale: 1.12 }, { scale: 1, ease: 'none', scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: true } });
    });
    root.querySelectorAll('[data-parallax]').forEach(function (el) {
      gsap.fromTo(el, { scale: 1.12 }, { scale: 1, ease: 'none', scrollTrigger: { trigger: el.parentElement, start: 'top bottom', end: 'bottom top', scrub: true } });
    });
    root.querySelectorAll('[data-count]').forEach(function (el) {
      var o = { v: parseFloat(el.dataset.from || 0) };
      gsap.to(o, { v: parseFloat(el.dataset.count), duration: 1.8, ease: 'power2.out', scrollTrigger: { trigger: el, start: 'top 90%' },
        onUpdate: function () { el.textContent = Math.round(o.v); } });
    });
  };

  /* CSS uppercase azərbaycanca "i"-ni səhv çevirir — lazım olan yerlərdə düzəldirik */
  DK.azUpper = function (root) {
    (root || document).querySelectorAll('[data-az-upper]').forEach(function (el) {
      var w = document.createTreeWalker(el, NodeFilter.SHOW_TEXT), n;
      while ((n = w.nextNode())) n.nodeValue = n.nodeValue.replace(/i/g, 'İ');
    });
  };
  DK.azUpper();

  /* ------------------------------------------------------------------
     Light / dark rejim
  ------------------------------------------------------------------ */
  var root = document.documentElement;
  function storedTheme() { try { return localStorage.getItem('dk-theme'); } catch (e) { return null; } }
  function setTheme(t, animate) {
    if (animate) {
      root.classList.add('theme-anim');
      setTimeout(function () { root.classList.remove('theme-anim'); }, 600);
    }
    root.dataset.theme = t;
    var btn = document.getElementById('themeBtn');
    if (btn) btn.setAttribute('aria-label', t === 'dark' ? 'Light rejimə keç' : 'Dark rejimə keç');
  }
  DK.theme = function () { return root.dataset.theme === 'dark' ? 'dark' : 'light'; };
  if (!root.dataset.theme) setTheme(window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  else setTheme(root.dataset.theme);
  document.getElementById('themeBtn').addEventListener('click', function () {
    var next = DK.theme() === 'dark' ? 'light' : 'dark';
    setTheme(next, true);
    try { localStorage.setItem('dk-theme', next); } catch (e) {}
  });
  // istifadəçi özü seçməyibsə, sistem rejimini izləyirik
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function (e) {
    if (!storedTheme()) setTheme(e.matches ? 'dark' : 'light', true);
  });

  /* ------------------------------------------------------------------
     Naviqasiya
  ------------------------------------------------------------------ */
  document.querySelectorAll('.has-drop').forEach(function (item) {
    var t;
    item.addEventListener('mouseenter', function () { clearTimeout(t); document.body.classList.add('nav-open'); });
    item.addEventListener('mouseleave', function () { t = setTimeout(function () { document.body.classList.remove('nav-open'); }, 80); });
    item.addEventListener('focusin', function () { document.body.classList.add('nav-open'); });
    item.addEventListener('focusout', function () { document.body.classList.remove('nav-open'); });
  });

  // yoxlama üçün: ?drop=0 birinci açılan menyunu açıq saxlayır
  var dm = location.search.match(/[?&]drop=(\d)/);
  if (dm) { var di = document.querySelectorAll('.has-drop')[+dm[1]]; if (di) { di.classList.add('is-forced'); document.body.classList.add('nav-open'); } }

  var burger = document.getElementById('burger');
  var mmenu = document.getElementById('mmenu');
  function toggleMenu(open) {
    document.body.classList.toggle('menu-open', open);
    burger.setAttribute('aria-expanded', open);
    mmenu.setAttribute('aria-hidden', !open);
    DK.lockScroll(open);
    if (open && hasGSAP && !reduce) gsap.from('.mnav__item', { y: 16, opacity: 0, stagger: 0.04, duration: 0.6, ease: 'power3.out', delay: 0.1, clearProps: 'all' });
  }
  burger.addEventListener('click', function () { toggleMenu(!document.body.classList.contains('menu-open')); });
  if (/[?&]menu=1/.test(location.search)) toggleMenu(true);   // yoxlama üçün
  mmenu.querySelectorAll('.mnav__toggle').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var open = btn.getAttribute('aria-expanded') !== 'true';
      btn.setAttribute('aria-expanded', open);
      btn.parentElement.classList.toggle('is-open', open);
    });
  });
  document.addEventListener('keydown', function (e) {
    if (e.key !== 'Escape') return;
    if (document.activeElement && document.activeElement.closest('.has-drop')) document.activeElement.blur();
    document.body.classList.remove('nav-open');
    if (document.body.classList.contains('menu-open')) toggleMenu(false);
  });

  /* ------------------------------------------------------------------
     Linklər: anchor scroll + səhifə keçidi (qısa fade)
  ------------------------------------------------------------------ */
  var pt = document.getElementById('pt');
  var currentFile = location.pathname.split('/').pop() || 'index.html';

  document.addEventListener('click', function (e) {
    var a = e.target.closest('a');
    if (!a || e.defaultPrevented || e.metaKey || e.ctrlKey || e.shiftKey || a.target === '_blank') return;
    var href = a.getAttribute('href');
    if (!href || /^(tel:|mailto:|https?:)/.test(href)) return;
    var hashIdx = href.indexOf('#');
    var file = hashIdx === 0 ? currentFile : href.split('#')[0].split('?')[0];

    if (hashIdx > -1 && file === currentFile && href.indexOf('?') === -1) {
      var target = document.querySelector(href.slice(hashIdx));
      if (target) {
        e.preventDefault();
        document.body.classList.remove('nav-open');
        if (document.body.classList.contains('menu-open')) toggleMenu(false);
        DK.scrollTo(target);
        history.replaceState(null, '', location.pathname + location.search + href.slice(hashIdx));
      }
      return;
    }
    if (/^[\w-]+\.html/.test(href) && hasGSAP && !reduce) {
      e.preventDefault();
      try { sessionStorage.setItem('dkPt', '1'); } catch (err) {}
      gsap.set(pt, { visibility: 'visible' });
      gsap.to(pt, { opacity: 1, duration: 0.35, ease: 'power1.out', onComplete: function () { location.href = href; } });
    }
  });
  window.addEventListener('pageshow', function (e) { if (e.persisted && hasGSAP) gsap.set(pt, { opacity: 0, visibility: 'hidden' }); });

  function revealPage(fromNav) {
    if (fromNav && hasGSAP && !reduce) {
      gsap.set(pt, { opacity: 1, visibility: 'visible' });
      gsap.to(pt, { opacity: 0, duration: 0.6, ease: 'power1.out', delay: 0.05, onComplete: function () { gsap.set(pt, { visibility: 'hidden' }); } });
    }
  }

  /* ------------------------------------------------------------------
     Form → WhatsApp
  ------------------------------------------------------------------ */
  var form = document.getElementById('leadForm'), via = 'wa';
  form.addEventListener('click', function (e) { var b = e.target.closest('[data-via]'); if (b) via = b.dataset.via; });
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var el = form.elements, ok = true;
    function check(f, bad) { f.parentElement.classList.toggle('is-error', bad); if (bad) ok = false; }
    check(el.name, !el.name.value.trim());
    check(el.phone, el.phone.value.replace(/\D/g, '').length < 7);
    check(el.email, !!el.email.value.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(el.email.value.trim()));
    if (!ok) { var first = form.querySelector('.is-error input'); if (first) first.focus(); return; }
    var text = DK.msg('lead', {
      n: (el.name.value + ' ' + el.surname.value).trim(), p: el.phone.value.trim(), e: el.email.value.trim() || '—',
      t: el.topic.value, m: el.message.value.trim() || '—'
    });
    if (via === 'mail') location.href = 'mailto:info@deluxekamin.com?subject=' + encodeURIComponent(el.topic.value + ' — ' + el.name.value.trim()) + '&body=' + encodeURIComponent(text);
    else window.open(DK.waLink(text), '_blank');
  });
  document.getElementById('toTop').addEventListener('click', function () { DK.scrollTo(0); });

  /* ------------------------------------------------------------------
     Giriş ekranı — hər səhifə açılanda.
     Sayta ilk giriş / yeniləmə: tam versiya. Daxili keçid: qısa versiya.
  ------------------------------------------------------------------ */
  var LOADER_HTML =
    '<div class="loader" id="loader" aria-hidden="true">' +
      '<div class="loader__half loader__half--top"></div>' +
      '<div class="loader__half loader__half--bot"></div>' +
      '<div class="loader__inner">' +
        '<div class="loader__glow"><i></i></div>' +
        '<img class="loader__logo" src="' + LOGO + '" alt="">' +
        '<p class="loader__tag">PRESTİJ KAMİNLƏ BAŞLAR</p>' +
      '</div>' +
    '</div>';

  // giriş ekranı: əvvəlki dizayn (parıltı, loqo, şüar, ortadan açılan pərdə), faizsiz, ~1 saniyə
  function runIntro() {
    return new Promise(function (resolve) {
      var fromNav = false;
      try { fromNav = sessionStorage.getItem('dkPt') === '1'; sessionStorage.removeItem('dkPt'); } catch (err) {}
      var skip = /[?&]intro=0/.test(location.search) || !hasGSAP || reduce;
      if (skip) { root.classList.remove('is-loading'); revealPage(fromNav); return resolve(false); }

      document.body.insertAdjacentHTML('beforeend', LOADER_HTML);
      var loader = document.getElementById('loader');
      if (fromNav) loader.classList.add('loader--short');
      root.classList.remove('is-loading');
      gsap.set(pt, { opacity: 0, visibility: 'hidden' });
      DK.lockScroll(true);

      var base = DK.theme() === 'dark' ? 'brightness(0) invert(1) ' : '';
      var k = fromNav ? 0.7 : 1;
      var tl = gsap.timeline({ onComplete: function () { loader.remove(); DK.lockScroll(false); } });
      tl.fromTo('.loader__glow', { opacity: 0, scale: 0.6 }, { opacity: 1, scale: 1, duration: 0.5 * k, ease: 'power2.out' }, 0)
        .fromTo('.loader__logo', { opacity: 0, y: 16, filter: base + 'blur(10px)' }, { opacity: 1, y: 0, filter: base + 'blur(0px)', duration: 0.4 * k, ease: 'power3.out' }, 0.05);
      if (!fromNav) tl.fromTo(DK.splitChars(loader.querySelector('.loader__tag')), { opacity: 0, y: 8 }, { opacity: 1, y: 0, duration: 0.3, stagger: 0.012, ease: 'power2.out' }, 0.2);
      tl.to('.loader__inner', { opacity: 0, scale: 1.04, duration: 0.25 * k, ease: 'power2.in' }, 0.6 * k)
        .to('.loader__half--top', { yPercent: -100, duration: 0.45 * k, ease: 'expo.inOut' }, 0.7 * k)
        .to('.loader__half--bot', { yPercent: 100, duration: 0.45 * k, ease: 'expo.inOut' }, '<')
        .add(function () { resolve(true); }, '<0.15');
    });
  }

  DK.ready = runIntro();
  // yoxlama üçün: ?sy=1500 səhifəni həmin nöqtəyə sürüşdürür
  var syM = location.search.match(/[?&]sy=(\d+)/);
  if (syM) DK.ready.then(function () { setTimeout(function () { window.scrollTo({ top: +syM[1], behavior: 'instant' }); }, 400); });
  window.addEventListener('load', function () { if (window.ScrollTrigger) ScrollTrigger.refresh(); onScrollProgress(); });
})();
