/* Deluxe Kamin — məhsul bazası
   Şəkillər və linklər deluxekamin.com-dakı real məhsul səhifələrinə aiddir. */

window.DK = window.DK || {};

DK.UPLOADS = 'https://deluxekamin.com/wp-content/uploads/';
DK.SITE = 'https://deluxekamin.com/';
DK.WA = '994502520216';

DK.types = {
  elektrik: {
    label: 'Elektrik',
    title: 'Elektrik kaminlər',
    chimney: false,
    text: 'Rozetkaya qoşulur, baca tələb etmir. Alov effekti və istilik funksiyası ayrıca idarə olunur, pult və ya tətbiqlə işləyir. Mənzillər üçün ən praktik seçimdir.',
    ideal: 'Mənzil, ofis, baca imkanı olmayan məkanlar'
  },
  qaz: {
    label: 'Qaz',
    title: 'Qaz kaminlər',
    chimney: true,
    text: 'Bir düymə ilə canlı alov, kül və odun yoxdur. Maxitrol idarəetmə sistemi alov qoruması və tənzimlənən qaz axını ilə işləyir.',
    ideal: 'Villa, restoran, təmiz və sürətli istilik'
  },
  odunlu: {
    label: 'Odunlu',
    title: 'Odunlu kaminlər',
    chimney: true,
    text: 'Odunun səsi, qoxusu və ən yüksək istilik. Topkalar (kaset) portal və ya divar içinə quraşdırılır, divar modelləri isə interyerin əsas elementinə çevrilir.',
    ideal: 'Həyət evi, villa, geniş qonaq otağı'
  },
  merkezi: {
    label: 'Mərkəzi',
    title: 'Mərkəzi kaminlər',
    chimney: true,
    text: 'Otağın ortasında, tavandan asılan və ya döşəmədə dayanan odunlu kaminlər. Alov hər tərəfdən görünür, istilik bütün otağa yayılır.',
    ideal: 'Geniş qonaq otağı, açıq planlı ev, hündür tavan'
  },
  bio: {
    label: 'Bioetanol',
    title: 'Bioetanol kaminlər',
    chimney: false,
    text: 'Tüstüsüz və qoxusuz yanır, baca lazım deyil. Masaüstü, divara və ya mebelin içinə quraşdırılan dizayn həlləri.',
    ideal: 'Müasir mənzil, terras, dizayn yönümlü interyer'
  },
  bag: {
    label: 'Bağ kaminləri',
    title: 'Bağ kaminləri',
    chimney: false,
    text: 'Açıq hava üçün hazırlanmış, havaya davamlı modellər. Terras, həyət və hovuz kənarı üçün.',
    ideal: 'Həyət, terras, bağ evi'
  },
  portal: {
    label: 'Mərmər portal',
    title: 'Mərmər portallar',
    chimney: false,
    text: 'Kamin kasetinin ətrafına quraşdırılan, fərdi ölçüdə hazırlanan mərmər portallar. Klassik və müasir xətlər.',
    ideal: 'Klassik və neoklassik interyerlər'
  },
  aksesuar: {
    label: 'Aksesuar',
    title: 'Kamin aksesuarları',
    chimney: false,
    accessory: true,
    text: 'Siperliklər, odunluqlar və maşa dəstləri. Kaminin qarşısını qoruyur, odunu səliqəli saxlayır.',
    ideal: 'Odunlu və qaz kaminlər'
  }
};

/* [type, brand, name, image, page] */
DK.products = [
  ['elektrik', 'Dimplex', 'Ignite Ultra', '2026/01/Kamin-Dimplex-ignite-ultra.png', 'elektrikli-kaminler/kamin-dimplex-ignite-ultra/'],
  ['elektrik', 'Dimplex', 'Ignite Evolve', '2026/01/Kamin-Dimplex-Ignite-Evolve.png', 'elektrikli-kaminler/kamin-dimplex-ignite-evolve/'],
  ['elektrik', 'Dimplex', 'XHD', '2026/01/Kamin-Dimplex-XHD.png', 'elektrikli-kaminler/kamin-dimplex-xhd/'],
  ['elektrik', 'Dimplex', 'Aspire', '2026/01/Kamin-Dimplex-Aspire.png', 'elektrikli-kaminler/dimplex-aspire/'],
  ['elektrik', 'Dimplex', 'Vista', '2026/01/Kamin-Dimplex-Vista-3.png', 'elektrikli-kaminler/kamin-dimplex-vista/'],
  ['elektrik', 'Dimplex', 'Vivente Plus', '2026/01/Kamin-Dimplex-Vivente-Plus.png', 'elektrikli-kaminler/kamin-dimplex-vivente/'],
  ['elektrik', 'Dimplex', 'Cassette', '2025/12/Kamin-Dimplex-Cassette-scaled.jpg', 'elektrikli-kaminler/dimplex-cassette-retail/'],
  ['elektrik', 'Spartherm DRU', 'Virtuo Evolve', '2026/01/Kamin-DRU-Virtuo-Evolve.jpg', 'elektrikli-kaminler/kamin-dru-virtuo-evolve/'],
  ['elektrik', 'Flameline', 'Pao', '2026/01/Kamin-Flameline-Pao-scaled.jpg', 'elektrikli-kaminler/flameline-pao/'],
  ['elektrik', 'Flameline', 'Coza RZN', '2026/01/flameline-coza-rzn-scaled.png', 'elektrikli-kaminler/flameline-coza-rzn/'],
  ['elektrik', 'Flameline', 'Nada KRN', '2026/01/Kamin-Flameline-Nada-KRN-2-scaled.jpg', 'elektrikli-kaminler/flameline-nada-krn/'],
  ['elektrik', 'Flameline', 'Gaze BSC', '2026/01/Kamin-Flameline-Gaze-BSC-scaled.jpg', 'elektrikli-kaminler/kamin-flameline-gaze-bsc/'],

  ['qaz', 'Italkero', 'Mirror Flame', '2022/05/Kamin-Italkero-Mirror-Flame.jpg', 'kamin-italkero-mirror-flame/'],
  ['qaz', 'Italkero', 'Venezia 90', '2022/05/Kamin-Italkero-Venezia-90.jpg', 'kamin-italkero-venezia-90'],
  ['qaz', 'Italkero', 'Dolcevita Lightfire', '2022/03/Kamin-Italkero-Dolcevita.jpg', 'kamin-italkero-dolcevita-lightfire'],
  ['qaz', 'Majestic', 'Echelon II', '2022/05/Kamin-Majestic-Echelon-II.jpg', 'kamin-majestic-echelon-ii-see-through'],
  ['qaz', 'Majestic', 'Pier', '2022/05/Kamin-Majestic-Pier.jpg', 'kamin-majestic-pier'],

  ['odunlu', 'Arkiane', 'Yan Li', '2022/05/Kamin-Arkiane-Yan-Li.jpg', 'kamin-arkiane-yan-li/'],
  ['merkezi', 'Arkiane', 'Eclypsya', '2022/05/Kamin-Arkiane-Eclypsya.jpg', 'kamin-arkiane-eclypsya'],
  ['merkezi', 'Arkiane', 'Kephren', '2022/05/Kamin-Arkiane-Kephren.jpg', 'kamin-arkiane-kephren'],
  ['merkezi', 'JC Bordelet', 'Zelia 908', '2022/05/Kamin-JC-Bordelet-ZELIA-908.jpg', 'kamin-jc-bordelet-zelia-908'],
  ['merkezi', 'JC Bordelet', 'Alexia 995', '2022/05/Kamin-JC-Bordelet-Alexia-995.jpg', 'kamin-jc-bordelet-alexia-995'],
  ['merkezi', 'JC Bordelet', 'Lea 998', '2022/05/Kamin-JC-Bordelet-LEA-998.jpg', 'kamin-jc-bordelet-lea-998'],
  ['merkezi', 'JC Bordelet', 'Eva 992', '2022/03/Kamin-JC-Bordelet-EVA-992.jpg', 'kamin-jc-bordolet-eva-992'],

  ['bio', 'Planika', 'Panorama', '2022/09/Kamin-Planika-Panorama.jpg', 'kamin-planika-panorama'],
  ['bio', 'Planika', 'Prime Fire', '2026/01/Kamin-Planika-Prime-Fire-scaled.jpg', 'bioethanol-kaminler/kamin-planika-prime-fire'],
  ['bio', 'Planika', 'Cabo Burner', '2026/01/Kamin-Planika-Cabo-1-scaled.jpg', 'bioethanol-kaminler/kamin-planika-cabo-burner'],
  ['bio', 'Planika', 'Neo Burner', '2026/01/Kamin-Planika-Neo-Burner-scaled.jpg', 'bioethanol-kaminler/kamin-planika-neo-burner'],
  ['bio', 'Planika', 'Dancing Flames', '2022/05/Biokamin-Planika-Dancing-Flames.jpg', 'biokamin-planika-dancing-flames'],

  ['bag', 'Planika', 'Galio Corten', '2025/08/Kamin-Planika-Galio-Corten-4-scaled.jpg', 'keyfiyyetli-modern-bag-kaminleri-deluxe-kamin-baku/kamin-planika-galio-corten'],
  ['bag', 'Planika', 'Galio Star Black', '2025/08/Kamin-Planika-Galio-Star-Black-3-scaled.jpg', 'keyfiyyetli-modern-bag-kaminleri-deluxe-kamin-baku/kamin-planika-galio-star-black'],
  ['bag', 'Planika', 'Galaxy Fireplace', '2025/08/Kamin-Planika-Galaxy-Fireplace-main-scaled.jpg', 'keyfiyyetli-modern-bag-kaminleri-deluxe-kamin-baku/kamin-planika-galaxy-fireplace'],
  ['bag', 'Planika', 'Pivot', '2025/08/Kamin-Planika-Pivot-1-scaled.jpg', 'keyfiyyetli-modern-bag-kaminleri-deluxe-kamin-baku/kamin-planika-pivot'],
  ['bag', 'Italkero', 'Falo Evo', '2025/08/Kamin-Italkero-Falo-Evo-1-scaled.jpg', 'keyfiyyetli-modern-bag-kaminleri-deluxe-kamin-baku/kamin-italkero-falo-evo'],

  ['portal', 'Deluxe', 'London', '2022/06/Mermer-Portal-London.jpg', 'mermer-portal-london'],
  ['portal', 'Deluxe', 'Roma', '2022/05/Mermer-Portal-Roma.jpg', 'mermer-portal-roma'],
  ['portal', 'Deluxe', 'Viktoriya', '2022/07/Mermer-Portal-Xankishizade.jpg', 'mermer-portal-viktoriya'],
  ['portal', 'Deluxe', 'Angel', '2022/05/Kamin-Mermer-Portal-Angel.jpg', 'kamin-mermer-portal-angel'],
  ['portal', 'Deluxe', 'Deluxe', '2022/05/Mermer-Portal-Deluks.jpg', 'mermer-portal-deluxe'],
  ['portal', 'Deluxe', 'Dolça', '2022/06/Mermer-Portal-Dolcha.jpg', 'mermer-portal-dolca'],
  ['portal', 'Deluxe', 'Güllü', '2022/06/Mermer-Portal-Gullu.jpg', 'mermer-portal-gullu'],
  ['portal', 'Deluxe', 'Must', '2022/05/Mermer-Portal-Must.jpg', 'mermer-portal-must'],
  ['portal', 'Deluxe', 'Turan', '2022/05/Kamin-Mermer-Portal-Turan.jpg', 'mermer-portal-turan'],

  // köhnə saytın menyusundan əlavə olunanlar (id-lər dəyişməsin deyə sonda)
  ['odunlu', 'Invicta', 'Philos Standart 700', '2022/05/Topka-Invicta-Philos-700.jpg', 'topka-invicta-philos-standart-700'],
  ['odunlu', 'Invicta', 'Grand Angle 700', '2022/05/Topka-Invicta-Grand-Angle-700.jpg', 'topka-invicta-grand-angle-700'],
  ['odunlu', 'Invicta', 'Grande Vision 800', '2022/07/Topka-Invicta-Grande-Vision-800.jpg', 'topka-invicta-grande-vision-800'],
  ['odunlu', 'Invicta', 'Grande Vision 900', '2022/05/Topka-Invicta-Grande-Vision-900.jpg', 'topka-invicta-grande-vision-900'],
  ['odunlu', 'Invicta', 'Grande Vision 1100', '2022/07/Topka-Invicta-Grande-Vision-1100.jpg', 'topka-invicta-grande-vision-1100'],
  ['odunlu', 'Spartherm', 'Speedy MR 51', '2022/05/Topka-Spartherm-Speedy-MR-51.jpg', 'topka-spartherm-speedy-mr-51'],
  ['qaz', 'Majestic', 'Fresco 42', '2022/05/Kamin-Majestic-Fresco-42.jpg', 'kamin-majestic-fresco-42'],
  ['bio', 'Planika', 'FLA4', '2026/01/Kamin-Planika-FLA4-590-scaled.jpg', 'bioethanol-kaminler/planika-fla4'],
  ['portal', 'Deluxe', 'Nis', '2022/05/Kamin-Mermer-Portal-Nis.jpg', 'mermer-portal-nis'],
  ['aksesuar', 'Comex', 'Siperlik 10.249', '2022/06/Siperlik-Comex-10.249.jpg', 'siperlik-comex-10-249'],
  ['aksesuar', 'Comex', 'Siperlik 10.250', '2022/06/Siperlik-Comex-10.250.jpg', 'siperlik-comex-10-250'],
  ['aksesuar', 'Comex', 'Siperlik 10.225M', '2022/06/Siperlik-Comex-10.225M.jpg', 'siperlik-comex-10-225m'],
  ['aksesuar', 'Comex', 'Siperlik 50.489', '2022/06/Siperlik-Comex-50.489.jpg', 'siperlik-comex-50-489'],
  ['aksesuar', 'Comex', 'Odunluq 10.049', '2022/05/Odunluk-Comex-10.049.jpg', 'odunluk-comex-10-049'],
  ['aksesuar', 'Comex', 'Odunluq 10.049N', '2022/05/Odunluk-Comex-10.049N.jpg', 'odunluk-comex-10-049n'],
  ['aksesuar', 'Comex', 'Odunluq 50.048R', '2022/05/Odunluk-Comex-50.048R.jpg', 'odunluk-comex-50-048r'],
  ['aksesuar', 'Comex', 'Maşa dəsti 10.072', '2022/05/Masa-takimi-Comex-10.072.jpg', 'masa-takimi-comex-10-072'],
  ['aksesuar', 'Comex', 'Maşa dəsti 90.941L', '2022/05/Masa-takimi-Comex-90.941L.jpg', 'masa-takimi-comex-90-941l'],
  ['aksesuar', 'Comex', 'Maşa dəsti 50.245', '2022/06/Masa-Takimi-Comex-50.245.jpg', 'masa-takimi-comex-50-245'],
  ['aksesuar', 'Comex', 'Maşa dəsti 50.246', '2022/06/Masa-Takimi-Comex-50.246.jpg', 'masa-takimi-comex-50-246']
].map(function (p, i) {
  return { id: i, type: p[0], brand: p[1], name: p[2], img: DK.UPLOADS + p[3], url: DK.SITE + p[4] };
});

DK.fans = [
  ['RS', '2022/08/Exodraft-RS-baca-fani.jpg', 'exodraft-rs-baca-fani/'],
  ['RSV', '2022/08/Exodraft-RSV-baca-fani.jpg', 'exodraft-rsv-baca-fani/'],
  ['RSVG', '2022/08/Exodraft-RSVG-baca-fani.jpg', 'exodraft-rsvg-baca-fani/'],
  ['RSHG', '2022/08/Exodraft-RSHG-baca-fani.jpg', 'exodraft-rshg-baca-fani/'],
  ['RSHT', '2022/05/Exodraft-RSHT-Baca-Fani.jpg', 'exodraft-rsht-baca-fani/'],
  ['RSG', '2022/05/Exodraft-RSG-Baca-fani.jpg', 'exodraft-rsg-baca-fani/'],
  ['RHG', '2022/08/Exodraft-RHG-baca-fani.jpg', 'exodraft-rhg-baca-fani/'],
  ['RHGC', '2022/08/Exodraft-RHGC-baca-fani.jpg', 'exodraft-rhgc-baca-fani/'],
  ['GSV', '2022/08/Exodraft-GSV-baca-fani.jpg', 'exodraft-gsv-baca-fani/']
].map(function (f) {
  return { name: 'Exodraft ' + f[0], img: DK.UPLOADS + f[1], url: DK.SITE + f[2] };
});

DK.img = function (path) { return DK.UPLOADS + path; };
DK.waLink = function (msg) { return 'https://wa.me/' + DK.WA + '?text=' + encodeURIComponent(msg); };
