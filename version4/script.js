// Deluxe Kamin - v4

var IMG = 'https://deluxekamin.com/wp-content/uploads/';
var SITE = 'https://deluxekamin.com/';

var products = {
  elektrik: [
    { brand: 'Dimplex', name: 'Ignite Ultra', text: 'Real alov effekti verən elektrik kaset kamin.', img: '2026/01/Kamin-Dimplex-ignite-ultra.png', url: 'elektrikli-kaminler/kamin-dimplex-ignite-ultra/' },
    { brand: 'Dimplex', name: 'XHD', text: 'Geniş ölçülü, divara quraşdırılan elektrik kamin.', img: '2026/01/Kamin-Dimplex-XHD.png', url: 'elektrikli-kaminler/kamin-dimplex-xhd/' },
    { brand: 'Spartherm DRU', name: 'Virtuo Evolve', text: 'Su buxarı ilə yaradılan 3D alov effekti.', img: '2026/01/Kamin-DRU-Virtuo-Evolve.jpg', url: 'elektrikli-kaminler/kamin-dru-virtuo-evolve/' },
    { brand: 'Flameline', name: 'Pao', text: 'Türkiyə istehsalı, müasir dizaynlı elektrik kamin.', img: '2026/01/Kamin-Flameline-Pao-scaled.jpg', url: 'elektrikli-kaminler/flameline-pao/' }
  ],
  qaz: [
    { brand: 'Italkero', name: 'Mirror Flame', text: 'Güzgü effektli qaz kamin, İtaliya istehsalı.', img: '2022/05/Kamin-Italkero-Mirror-Flame.jpg', url: 'kamin-italkero-mirror-flame/' },
    { brand: 'Majestic', name: 'Echelon II', text: 'İki tərəfdən görünən qaz kamin.', img: '2022/05/Kamin-Majestic-Echelon-II.jpg', url: 'kamin-majestic-echelon-ii-see-through' },
    { brand: 'Majestic', name: 'Pier', text: 'Üç tərəfli şüşəli qaz kamin.', img: '2022/05/Kamin-Majestic-Pier.jpg', url: 'kamin-majestic-pier' },
    { brand: 'Italkero', name: 'Venezia 90', text: 'Klassik interyerlər üçün qaz kamin.', img: '2022/05/Kamin-Italkero-Venezia-90.jpg', url: 'kamin-italkero-venezia-90' }
  ],
  odunlu: [
    { brand: 'Arkiane', name: 'Yan Li', text: 'Asma mərkəzi odunlu kamin.', img: '2022/05/Kamin-Arkiane-Yan-Li.jpg', url: 'kamin-arkiane-yan-li/' },
    { brand: 'Arkiane', name: 'Eclypsya', text: 'Fransız dizaynı, dairəvi mərkəzi kamin.', img: '2022/05/Kamin-Arkiane-Eclypsya.jpg', url: 'kamin-arkiane-eclypsya' },
    { brand: 'JC Bordelet', name: 'Zelia 908', text: 'Fırlanan asma odunlu kamin.', img: '2022/05/Kamin-JC-Bordelet-ZELIA-908.jpg', url: 'kamin-jc-bordelet-zelia-908' },
    { brand: 'JC Bordelet', name: 'Alexia 995', text: 'Divardan asılan odunlu kamin.', img: '2022/05/Kamin-JC-Bordelet-Alexia-995.jpg', url: 'kamin-jc-bordelet-alexia-995' }
  ],
  bio: [
    { brand: 'Planika', name: 'Panorama', text: 'Bacasız bioetanol kamin.', img: '2022/09/Kamin-Planika-Panorama.jpg', url: 'kamin-planika-panorama' },
    { brand: 'Planika', name: 'Prime Fire', text: 'Avtomatik idarə olunan bioetanol ocaq.', img: '2026/01/Kamin-Planika-Prime-Fire-scaled.jpg', url: 'bioethanol-kaminler/kamin-planika-prime-fire' },
    { brand: 'Planika', name: 'Galio Corten', text: 'Həyət və terras üçün açıq hava kamini.', img: '2025/08/Kamin-Planika-Galio-Corten-4-scaled.jpg', url: 'keyfiyyetli-modern-bag-kaminleri-deluxe-kamin-baku/kamin-planika-galio-corten' },
    { brand: 'Italkero', name: 'Falo Evo', text: 'Qazla işləyən bağ kamini.', img: '2025/08/Kamin-Italkero-Falo-Evo-1-scaled.jpg', url: 'keyfiyyetli-modern-bag-kaminleri-deluxe-kamin-baku/kamin-italkero-falo-evo' }
  ],
  portal: [
    { brand: 'Deluxe', name: 'Mərmər portal London', text: 'Fərdi ölçüdə hazırlanan mərmər portal.', img: '2022/06/Mermer-Portal-London.jpg', url: 'mermer-portal-london' },
    { brand: 'Deluxe', name: 'Mərmər portal Roma', text: 'Klassik üslubda mərmər portal.', img: '2022/05/Mermer-Portal-Roma.jpg', url: 'mermer-portal-roma' },
    { brand: 'Deluxe', name: 'Mərmər portal Viktoriya', text: 'Oyma detallı mərmər portal.', img: '2022/07/Mermer-Portal-Xankishizade.jpg', url: 'mermer-portal-viktoriya' }
  ]
};

var grid = document.getElementById('productGrid');

function showProducts(cat) {
  var html = '';
  products[cat].forEach(function (p) {
    html +=
      '<a class="product-card" href="' + SITE + p.url + '">' +
        '<div class="product-img"><img src="' + IMG + p.img + '" alt="' + p.brand + ' ' + p.name + '" loading="lazy"></div>' +
        '<div class="product-info">' +
          '<span class="product-brand">' + p.brand + '</span>' +
          '<h3>' + p.name + '</h3>' +
          '<p>' + p.text + '</p>' +
          '<span class="more">Ətraflı</span>' +
        '</div>' +
      '</a>';
  });
  grid.innerHTML = html;
}

document.querySelectorAll('.tab').forEach(function (tab) {
  tab.addEventListener('click', function () {
    document.querySelectorAll('.tab').forEach(function (t) { t.classList.remove('active'); });
    tab.classList.add('active');
    showProducts(tab.dataset.cat);
  });
});

showProducts('elektrik');

// header shadow
var header = document.getElementById('siteHeader');
window.addEventListener('scroll', function () {
  header.classList.toggle('scrolled', window.scrollY > 10);
});

// mobile menu
var toggle = document.getElementById('navToggle');
var nav = document.getElementById('mainNav');
toggle.addEventListener('click', function () {
  var open = nav.classList.toggle('open');
  toggle.setAttribute('aria-expanded', open);
});
nav.querySelectorAll('a[href^="#"]').forEach(function (a) {
  a.addEventListener('click', function () { nav.classList.remove('open'); });
});

// consultation form -> WhatsApp
document.getElementById('consultForm').addEventListener('submit', function (e) {
  e.preventDefault();
  var name = this.elements.name.value.trim();
  var phone = this.elements.phone.value.trim();
  var msg = 'Salam, mən ' + name + '. Kamin üçün konsultasiya istəyirəm. Nömrəm: ' + phone;
  window.open('https://wa.me/994502520216?text=' + encodeURIComponent(msg), '_blank');
});
