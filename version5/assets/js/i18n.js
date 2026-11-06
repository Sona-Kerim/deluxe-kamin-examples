/* Deluxe Kamin — üç dil: az (əsas), tr, en
   Səhifə Azərbaycan dilində yazılır; seçilmiş dildə mətn düyünləri və atributlar lüğətlə əvəz olunur.
   JS ilə sonradan yaranan məzmun (menyu, kartlar, modal) MutationObserver ilə tərcümə olunur. */
(function () {
  'use strict';
  var DK = window.DK = window.DK || {};
  var LANGS = ['az', 'tr', 'en'];

  var lang = 'az';
  try {
    var q = location.search.match(/[?&]lang=(az|tr|en)\b/);
    lang = q ? q[1] : (localStorage.getItem('dk-lang') || 'az');
    if (q) localStorage.setItem('dk-lang', lang);
  } catch (e) {}
  if (LANGS.indexOf(lang) < 0) lang = 'az';
  DK.lang = lang;
  DK.LANGS = LANGS;
  document.documentElement.lang = lang;

  /* [az, tr, en] */
  var D = [
    // ümumi, menyu, footer
    ['Deluxe Kamin — Bakıda kamin və baca sistemləri, 1997-ci ildən', 'Deluxe Kamin — Bakü\'de şömine ve baca sistemleri, 1997\'den beri', 'Deluxe Kamin — Fireplaces and chimney systems in Baku since 1997'],
    ['Dimplex, Spartherm, Planika, Schiedel və daha 13 brendin rəsmi distribütoru. Kamin seçimi, baca hesablaması, quraşdırma və servis. Azadlıq pr. 140/33, Bakı.', 'Dimplex, Spartherm, Planika, Schiedel ve 13 markanın daha resmi distribütörü. Şömine seçimi, baca hesabı, montaj ve servis. Azadlıq pr. 140/33, Bakü.', 'Official distributor of Dimplex, Spartherm, Planika, Schiedel and 13 more brands. Fireplace selection, chimney sizing, installation and service. 140/33 Azadliq Ave, Baku.'],
    ['Deluxe Kamin — ana səhifə', 'Deluxe Kamin — ana sayfa', 'Deluxe Kamin — home'],
    ['Əsas menyu', 'Ana menü', 'Main menu'],
    ['Light rejimə keç', 'Açık moda geç', 'Switch to light mode'],
    ['Dark rejimə keç', 'Koyu moda geç', 'Switch to dark mode'],
    ['Menyu', 'Menü', 'Menu'],
    ['Kaminlər', 'Şömineler', 'Fireplaces'],
    ['Kaminləri kəşf edin', 'Şömineleri keşfedin', 'Explore fireplaces'],
    ['Bütün kaminlər', 'Tüm şömineler', 'All fireplaces'],
    ['Elektrik', 'Elektrikli', 'Electric'],
    ['Qaz', 'Gazlı', 'Gas'],
    ['Odunlu', 'Odunlu', 'Wood-burning'],
    ['Bioetanol', 'Bioetanol', 'Bioethanol'],
    ['Digər', 'Diğer', 'More'],
    ['Bağ kaminləri', 'Bahçe şömineleri', 'Outdoor fireplaces'],
    ['Mərmər portallar', 'Mermer şömine kaplamaları', 'Marble surrounds'],
    ['Mərmər portal', 'Mermer kaplama', 'Marble surround'],
    ['Aksesuarlar', 'Aksesuarlar', 'Accessories'],
    ['Maxitrol qaz sistemləri', 'Maxitrol gaz sistemleri', 'Maxitrol gas controls'],
    ['Brendlər', 'Markalar', 'Brands'],
    ['Kömək', 'Yardım', 'Help'],
    ['Hansı kamin mənə uyğundur?', 'Bana hangi şömine uygun?', 'Which fireplace suits me?'],
    ['Baca lazımdırmı?', 'Baca gerekli mi?', 'Do I need a chimney?'],
    ['Əlaqə', 'İletişim', 'Contact'],
    ['Baca Sistemləri', 'Baca Sistemleri', 'Chimney Systems'],
    ['Baca sistemləri', 'Baca sistemleri', 'Chimney systems'],
    ['Keramik baca', 'Seramik baca', 'Ceramic chimney'],
    ['Polad baca', 'Çelik baca', 'Steel chimney'],
    ['Baca fanları', 'Baca fanları', 'Chimney fans'],
    ['Quraşdırma prosesi', 'Montaj süreci', 'Installation process'],
    ['Radiator', 'Radyatör', 'Radiators'],
    ['Su ilə işləyən radiatorlar', 'Sulu radyatörler', 'Hydronic radiators'],
    ['Elektrikli radiatorlar', 'Elektrikli radyatörler', 'Electric radiators'],
    ['Fan coil', 'Fan coil', 'Fan coil'],
    ['Perila & Kovka', 'Korkuluk & Ferforje', 'Railings & Ironwork'],
    ['Balkon perilası', 'Balkon korkuluğu', 'Balcony railings'],
    ['Pilləkən perilası', 'Merdiven korkuluğu', 'Stair railings'],
    ['Darvazalar', 'Bahçe kapıları', 'Gates'],
    ['Pəncərə barmaqlığı', 'Pencere korkuluğu', 'Window grilles'],
    ['Skamyalar', 'Banklar', 'Benches'],
    ['Besedka və naves', 'Kamelya ve sundurma', 'Gazebos and canopies'],
    ['Masa və stullar', 'Masa ve sandalyeler', 'Tables and chairs'],
    ['Mangal & Fırın', 'Mangal & Fırın', 'Grills & Ovens'],
    ['Odunlu mangallar', 'Odunlu mangallar', 'Wood grills'],
    ['Qazlı mangallar', 'Gazlı mangallar', 'Gas grills'],
    ['Pizza sobaları', 'Pizza fırınları', 'Pizza ovens'],
    ['Haqqımızda', 'Hakkımızda', 'About'],
    ['Kamin seçimində kömək lazımdırsa, yazın.', 'Şömine seçiminde yardıma ihtiyacınız varsa, yazın.', 'Need help choosing a fireplace? Write to us.'],
    ['Adınız', 'Adınız', 'Your name'],
    ['Telefon', 'Telefon', 'Phone'],
    ['Kamin seçimi', 'Şömine seçimi', 'Choosing a fireplace'],
    ['Baca sistemi', 'Baca sistemi', 'Chimney system'],
    ['Kamin + baca', 'Şömine + baca', 'Fireplace + chimney'],
    ['Servis', 'Servis', 'Service'],
    ['Mövzu', 'Konu', 'Topic'],
    ['WhatsApp ilə göndər', 'WhatsApp ile gönder', 'Send via WhatsApp'],
    ['Və ya birbaşa yazın: 050 252 02 16', 'Ya da doğrudan yazın: 050 252 02 16', 'Or message us directly: +994 50 252 02 16'],
    ['1997-ci ildən kamin, baca sistemləri və perila. Türkiyə və Azərbaycan.', '1997\'den beri şömine, baca sistemleri ve korkuluk. Türkiye ve Azerbaycan.', 'Fireplaces, chimney systems and railings since 1997. Türkiye and Azerbaijan.'],
    ['Baca', 'Baca', 'Chimney'],
    ['Suallar', 'Sorular', 'FAQ'],
    ['© 2004–2026 Deluxe Kamin & Perila. Bütün hüquqlar qorunur.', '© 2004–2026 Deluxe Kamin & Perila. Tüm hakları saklıdır.', '© 2004–2026 Deluxe Kamin & Perila. All rights reserved.'],
    ['Yuxarı ↑', 'Yukarı ↑', 'Back to top ↑'],
    ['Əvvəlki', 'Önceki', 'Previous'],
    ['Növbəti', 'Sonraki', 'Next'],
    ['Bağla', 'Kapat', 'Close'],
    ['Dil', 'Dil', 'Language'],
    ['Rejimi dəyiş', 'Modu değiştir', 'Change theme'],

    // ana səhifə — 3D hero
    ['Prestij kaminlə başlar.', 'Prestij şömineyle başlar.', 'Prestige begins with a fireplace.'],
    ['Kamin, baca və ferforje işlərində tam həll.', 'Şömine, baca ve ferforje işlerinde eksiksiz çözüm.', 'Complete solutions for fireplaces, chimneys and wrought-iron work.'],
    ["1997-ci ildən kamin, baca sistemləri, dekorativ radiatorlar və ferforje işləri ilə məşğuluq. Dimplex, Spartherm, Planika, Schiedel və digər beynəlxalq brendlərin rəsmi distribütoru kimi layihəni hazırlayır, məhsulu çatdırır, quraşdırır və satışdan sonra servis göstəririk.", "1997'den beri şömine, baca sistemleri, dekoratif radyatörler ve ferforje işleri yapıyoruz. Dimplex, Spartherm, Planika, Schiedel ve diğer uluslararası markaların resmi distribütörü olarak projeyi hazırlıyor, ürünü teslim ediyor, monte ediyor ve satış sonrası servis veriyoruz.", "Since 1997 we have worked with fireplaces, chimney systems, designer radiators and wrought-iron work. As the official distributor of Dimplex, Spartherm, Planika, Schiedel and other international brands, we design the project, deliver the product, install it and provide after-sales service."],
    ['Kamin, baca sistemləri, dekorativ radiatorlar, perila və ferforje işləri. Satış, layihələndirmə, quraşdırma və servis.', 'Şömine, baca sistemleri, dekoratif radyatörler, korkuluk ve ferforje işleri. Satış, projelendirme, montaj ve servis.', 'Fireplaces, chimney systems, designer radiators, railings and wrought-iron work. Sales, design, installation and service.'],
    ['Eviniz üçün doğru kamin.', 'Eviniz için doğru şömine.', 'The right fireplace for your home.'],
    ['Seçməyə kömək edirik, quraşdırırıq və servis edirik.', 'Seçmenize yardım ediyor, monte ediyor ve servis veriyoruz.', 'We help you choose, then install and service it.'],
    ['3D kamin və baca modeli', '3D şömine ve baca modeli', '3D fireplace and chimney model'],
    ['Bakıda kamin və baca. 1997-ci ildən.', 'Bakü\'de şömine ve baca. 1997\'den beri.', 'Fireplaces and chimneys in Baku. Since 1997.'],
    ['17 brendin rəsmi distribütoru və Spartherm ixtisaslaşmış dileriyik. Kamini seçir, bacanı hesablayır, quraşdırır və servis edirik.', '17 markanın resmi distribütörü ve Spartherm uzman bayisiyiz. Şömineyi seçer, bacayı hesaplar, monte eder ve servisini yaparız.', 'Official distributor of 17 brands and a Spartherm specialist dealer. We help you choose the fireplace, size the chimney, install it and service it.'],
    ['Kaminlərə baxın', 'Şöminelere göz atın', 'Browse fireplaces'],
    ['Showroom: Azadlıq pr. 140/33', 'Showroom: Azadlıq pr. 140/33', 'Showroom: 140/33 Azadliq Ave'],
    ['Şüşə panel', 'Cam panel', 'Glass panel'],
    ['Alov hər bucaqdan görünür. Təmizlik üçün panel önə açılır.', 'Alev her açıdan görünür. Temizlik için panel öne açılır.', 'The flame is visible from every angle. The panel opens forward for cleaning.'],
    ['Yanma kamerası', 'Yanma odası', 'Combustion chamber'],
    ['İstilik otağa, tüstü bacaya yönəlir.', 'Isı odaya, duman bacaya yönelir.', 'Heat goes into the room, smoke goes up the flue.'],
    ['Üç qatlı baca', 'Üç katmanlı baca', 'Three-layer chimney'],
    ['Xarici gövdə, mineral izolyasiya və turşuya davamlı daxili boru.', 'Dış gövde, mineral yalıtım ve aside dayanıklı iç boru.', 'Outer shell, mineral insulation and an acid-resistant inner liner.'],
    ['Kaminin gücünə görə', 'Şöminenin gücüne göre', 'Sized to the fireplace'],
    ['Bacanın diametri və hündürlüyü kaminə uyğun hesablanır.', 'Bacanın çapı ve yüksekliği şömineye göre hesaplanır.', 'Flue diameter and height are calculated for the fireplace.'],
    ['Kamini və bacanı birlikdə hesablayırıq.', 'Şömineyi ve bacayı birlikte hesaplıyoruz.', 'We plan the fireplace and the chimney together.'],
    ['Aşağı sürüşdürün', 'Aşağı kaydırın', 'Scroll down'],

    // ana səhifə — plitələr
    ['Evin mərkəzi', 'Evin merkezi', 'The heart of the home'],
    ['17 beynəlxalq brenddən kaminlər və baca sistemləri. 1997-ci ildən.', '17 uluslararası markadan şömineler ve baca sistemleri. 1997\'den beri.', 'Fireplaces and chimney systems from 17 international brands. Since 1997.'],
    ['Showroom', 'Showroom', 'Showroom'],
    ['Həyət üçün bioetanol ocaq.', 'Bahçe için bioetanol ateş çukuru.', 'A bioethanol fire pit for the garden.'],
    ['Ətraflı', 'Detaylar', 'Learn more'],
    ['Qiymət soruş', 'Fiyat sor', 'Ask for a price'],
    ['Tavandan asılan kamin.', 'Tavandan asılan şömine.', 'A fireplace that hangs from the ceiling.'],
    ['Üç tərəfdən görünən elektrik alov.', 'Üç taraftan görünen elektrikli alev.', 'An electric flame you can see from three sides.'],
    ['Mətbəxlə qonaq otağının arasında.', 'Mutfakla salonun arasında.', 'Between the kitchen and the living room.'],
    ['Terras üçün bioetanol ocaq.', 'Teras için bioetanol ateş çukuru.', 'A bioethanol fire pit for the terrace.'],
    ['Kaminlə birlikdə hesablanır, bizim komanda quraşdırır.', 'Şömineyle birlikte hesaplanır, ekibimiz monte eder.', 'Sized with your fireplace and installed by our own team.'],
    ['Baxış sifariş et', 'Keşif talep et', 'Book a site visit'],
    ['Fərdi ölçüdə hazırlanır.', 'Özel ölçüde üretilir.', 'Made to measure.'],
    ['Portallar', 'Kaplamalar', 'Surrounds'],
    ['Bacasız, tüstüsüz real alov.', 'Bacasız, dumansız gerçek alev.', 'A real flame with no chimney and no smoke.'],
    ['1997-ci ildə Türkiyədə başladı, bu gün Bakıdadır.', "1997'de Türkiye'de başladı, bugün Bakü'de.", 'Started in Türkiye in 1997. Today in Baku.'],
    ['Dizayndan servisə qədər, 1997-ci ildən bir komanda.', 'Tasarımdan servise, 1997\'den beri tek ekip.', 'From design to service, one team since 1997.'],
    ['17 brend · ISO 9001 və ISO 45001 · öz metal emalatxanası', '17 marka · ISO 9001 ve ISO 45001 · kendi metal atölyemiz', '17 brands · ISO 9001 and ISO 45001 · our own metal workshop'],
    ['Təsisçi Fuat Kayhan şirkəti 1997-ci ildə Türkiyədə qurub. MÜSİAD Azərbaycan İdarə Heyətinin sədridir.', 'Kurucumuz Fuat Kayhan şirketi 1997\'de Türkiye\'de kurdu. MÜSİAD Azerbaycan Yönetim Kurulu Başkanıdır.', 'Founder Fuat Kayhan started the company in Türkiye in 1997. He chairs the board of MÜSİAD Azerbaijan.'],
    ['Kaminləri canlı görmək üçün gəlin', 'Şömineleri yerinde görmek için bekleriz', 'Come and see the fireplaces in person'],
    ['Azadlıq prospekti 140/33, Gənclik, Bakı. İş saatlarından kənar görüş də mümkündür.', 'Azadlıq prospekti 140/33, Gənclik, Bakü. Mesai saatleri dışında da randevu verilebilir.', '140/33 Azadliq Avenue, Ganjlik, Baku. Appointments outside opening hours are possible.'],
    ['Yol tarifi', 'Yol tarifi', 'Directions'],
    ['Deluxe Kamin xəritədə', 'Deluxe Kamin haritada', 'Deluxe Kamin on the map'],
    ['Spartherm DRU Virtuo Evolve elektrik kamini interyerdə', 'İç mekânda Spartherm DRU Virtuo Evolve elektrikli şömine', 'Spartherm DRU Virtuo Evolve electric fireplace in a living room'],
    ['Planika Galaxy bağ kamini', 'Planika Galaxy bahçe şöminesi', 'Planika Galaxy outdoor fireplace'],
    ['JC Bordelet Zelia 908 asma kamin', 'JC Bordelet Zelia 908 asma şömine', 'JC Bordelet Zelia 908 suspended fireplace'],
    ['Dimplex Ignite Ultra elektrik kamini', 'Dimplex Ignite Ultra elektrikli şömine', 'Dimplex Ignite Ultra electric fireplace'],
    ['JC Bordelet Eva 992 asma kamin', 'JC Bordelet Eva 992 asma şömine', 'JC Bordelet Eva 992 suspended fireplace'],
    ['Planika Galio Corten bağ kamini', 'Planika Galio Corten bahçe şöminesi', 'Planika Galio Corten outdoor fireplace'],
    ['Schiedel Rondo Plus keramik baca sisteminin kəsiyi', 'Schiedel Rondo Plus seramik baca sisteminin kesiti', 'Cutaway of the Schiedel Rondo Plus ceramic chimney system'],
    ['Odun sobası və tavana qalxan polad baca borusu', 'Odun sobası ve tavana yükselen çelik baca borusu', 'Wood stove with a steel flue pipe rising to the ceiling'],
    ['Ağ portallı müasir kamin', 'Beyaz kaplamalı modern şömine', 'Modern fireplace with a white surround'],
    ['Soba və polad baca borusu', 'Soba ve çelik baca borusu', 'Stove and steel flue pipe'],
    ['Mərmər portal London', 'Mermer kaplama London', 'London marble surround'],
    ['Planika Prime Fire bioetanol kamini', 'Planika Prime Fire bioetanol şömine', 'Planika Prime Fire bioethanol fireplace'],

    // kaminlər səhifəsi
    ['Mağaza — Deluxe Kamin', 'Şömineler — Deluxe Kamin', 'Fireplaces — Deluxe Kamin'],
    ['Elektrik, qaz, odunlu, bioetanol və bağ kaminləri, mərmər portallar və baca sistemləri. Rəsmi zəmanət, quraşdırma və servis. Deluxe Kamin, Bakı.', 'Elektrikli, gazlı, odunlu, bioetanol ve bahçe şömineleri, mermer kaplamalar ve baca sistemleri. Resmi garanti, montaj ve servis. Deluxe Kamin, Bakü.', 'Electric, gas, wood, bioethanol and outdoor fireplaces, marble surrounds and chimney systems. Official warranty, installation and service. Deluxe Kamin, Baku.'],
    ['Rəsmi zəmanət, quraşdırma və servis bir yerdə.', 'Resmi garanti, montaj ve servis tek yerde.', 'Official warranty, installation and service in one place.'],
    ['Seçimdə kömək lazımdır?', 'Seçimde yardım mı lazım?', 'Need help choosing?'],
    ['Mütəxəssislə danışın ›', 'Uzmanla konuşun ›', 'Talk to a specialist ›'],
    ['Mütəxəssislə danışın', 'Uzmanla konuşun', 'Talk to a specialist'],
    ['Showroom-a gəlin', 'Showroom\'a gelin', 'Visit the showroom'],
    ['Azadlıq pr. 140/33 ›', 'Azadlıq pr. 140/33 ›', '140/33 Azadliq Ave ›'],
    ['Keramik, polad', 'Seramik, çelik', 'Ceramic, steel'],
    ['Seçilmiş modellər', 'Öne çıkan modeller', 'Featured models'],
    ['Seçilmiş modellər.', 'Öne çıkan modeller.', 'Featured models.'],
    ['Showroom-da ən çox soruşulanlar.', 'Showroom\'da en çok sorulanlar.', 'The ones people ask about most in our showroom.'],
    ['baca lazımdır', 'baca gerekir', 'needs a chimney'],
    ['bacasız', 'bacasız', 'no chimney'],
    ['Kömək lazımdır?', 'Yardım mı lazım?', 'Need help?'],
    ['Seçimdən quraşdırmaya qədər yanınızdayıq.', 'Seçimden montaja kadar yanınızdayız.', 'We are with you from choosing to installation.'],
    ['Məkanınızın şəklini göndərin, uyğun modelləri təklif edək.', 'Mekânınızın fotoğrafını gönderin, uygun modelleri önerelim.', 'Send us a photo of your space and we will suggest suitable models.'],
    ['WhatsApp ›', 'WhatsApp ›', 'WhatsApp ›'],
    ['Azadlıq prospekti 140/33, Gənclik. İş saatlarından kənar görüş də mümkündür.', 'Azadlıq prospekti 140/33, Gənclik. Mesai saatleri dışında da randevu verilebilir.', '140/33 Azadliq Avenue, Ganjlik. Appointments outside opening hours are possible.'],
    ['Ünvan ›', 'Adres ›', 'Address ›'],
    ['Ünvan', 'Adres', 'Address'],
    ['Yerində baxış', 'Yerinde keşif', 'Site visit'],
    ['Ölçü götürür, kaminin yeri və bacanın xəttini yerində müəyyən edirik.', 'Ölçü alır, şöminenin yerini ve baca hattını yerinde belirleriz.', 'We measure up and decide the fireplace position and chimney route on site.'],
    ['Baxış sifariş et ›', 'Keşif talep et ›', 'Book a site visit ›'],
    ['Baca hesablaması', 'Baca hesabı', 'Chimney sizing'],
    ['Diametr və hündürlüyü kaminin gücünə görə hesablayırıq.', 'Çap ve yüksekliği şöminenin gücüne göre hesaplıyoruz.', 'We calculate diameter and height from the fireplace output.'],
    ['Baca sistemləri ›', 'Baca sistemleri ›', 'Chimney systems ›'],
    ['Elektrik kaminlər', 'Elektrikli şömineler', 'Electric fireplaces'],
    ['Bacasız, istənilən mənzil üçün.', 'Bacasız, her daire için.', 'No chimney needed, works in any apartment.'],
    ['Qaz kaminlər', 'Gazlı şömineler', 'Gas fireplaces'],
    ['Düymə ilə canlı alov.', 'Tek tuşla canlı alev.', 'A live flame at the push of a button.'],
    ['Odunlu kaminlər', 'Odunlu şömineler', 'Wood-burning fireplaces'],
    ['Kaset, mərkəzi və asma modellər.', 'Kaset, ada ve asma modeller.', 'Inserts, central and suspended models.'],
    ['Deluxe fərqi', 'Deluxe farkı', 'The Deluxe difference'],
    ['Deluxe fərqi.', 'Deluxe farkı.', 'The Deluxe difference.'],
    ['Rəsmi distribütordan almağın üstünlükləri.', 'Resmi distribütörden almanın avantajları.', 'Why buying from the official distributor matters.'],
    ['İstehsalçı zəmanəti', 'Üretici garantisi', 'Manufacturer warranty'],
    ['Məhsullar rəsmi nümayəndədən, birbaşa istehsalçı zəmanəti ilə gəlir.', 'Ürünler resmi temsilciden, doğrudan üretici garantisiyle gelir.', 'Products come from the official representative with the full manufacturer warranty.'],
    ['Peşəkar quraşdırma', 'Profesyonel montaj', 'Professional installation'],
    ['Montaj, təhvil və ilk yandırma bizim komandadır.', 'Montaj, teslim ve ilk yakma ekibimizden.', 'Installation, handover and the first firing are done by our team.'],
    ['Öz istehsalımız', 'Kendi üretimimiz', 'Made in-house'],
    ['Metal və ferforje işləri şirkətin öz emalatxanasında hazırlanır.', 'Metal ve ferforje işleri kendi atölyemizde üretilir.', 'Metal and wrought-iron work is made in our own workshop.'],
    ['Servis və baxım', 'Servis ve bakım', 'Service and maintenance'],
    ['Satışdan sonra texniki xidmət və baxım.', 'Satış sonrası teknik servis ve bakım.', 'Technical service and maintenance after the sale.'],
    ['17 rəsmi brend', '17 resmi marka', '17 official brands'],
    ['Spartherm ixtisaslaşmış dileri. Dimplex, Planika, Schiedel və başqaları.', 'Spartherm uzman bayisi. Dimplex, Planika, Schiedel ve diğerleri.', 'Spartherm specialist dealer. Dimplex, Planika, Schiedel and more.'],
    ['Brendlər ›', 'Markalar ›', 'Brands ›'],
    ['Bioetanol kaminlər', 'Bioetanol şömineler', 'Bioethanol fireplaces'],
    ['Tüstüsüz, bacasız real alov.', 'Dumansız, bacasız gerçek alev.', 'A real flame with no smoke and no chimney.'],
    ['Terras və həyət üçün.', 'Teras ve bahçe için.', 'For terraces and gardens.'],
    ['Kamininiz üçün düzgün çəkiş.', 'Şömineniz için doğru çekiş.', 'The right draught for your fireplace.'],
    ['Paslanmaz polad baca', 'Paslanmaz çelik baca', 'Stainless steel chimney'],
    ['Bütün modellər.', 'Tüm modeller.', 'All models.'],
    ['model, filtr və axtarışla.', 'model, filtre ve aramayla.', 'models, with filters and search.'],
    ['Hamısı', 'Tümü', 'All'],
    ['Bütün brendlər', 'Tüm markalar', 'All brands'],
    ['Kateqoriya', 'Kategori', 'Category'],
    ['Brend', 'Marka', 'Brand'],
    ['Axtar', 'Ara', 'Search'],
    ['Model axtar', 'Model ara', 'Search models'],
    ['Harada uyğundur', 'Nereye uygun', 'Where it fits'],
    ['WhatsApp-da soruş', 'WhatsApp\'tan sor', 'Ask on WhatsApp'],
    ['Məhsul səhifəsi', 'Ürün sayfası', 'Product page'],
    ['Baca sistemi tələb olunur', 'Baca sistemi gerekir', 'Requires a chimney system'],
    ['Baca tələb olunmur', 'Baca gerekmez', 'No chimney required'],
    ['Rozetkaya qoşulur, baca tələb etmir. Alov effekti və istilik funksiyası ayrıca idarə olunur, pult və ya tətbiqlə işləyir. Mənzillər üçün ən praktik seçimdir.', 'Prize takılır, baca gerektirmez. Alev efekti ve ısıtma ayrı ayrı kontrol edilir, kumanda veya uygulamayla çalışır. Daireler için en pratik seçimdir.', 'Plugs into a socket and needs no chimney. Flame effect and heat are controlled separately by remote or app. The most practical choice for apartments.'],
    ['Mənzil, ofis, baca imkanı olmayan məkanlar', 'Daire, ofis, baca imkânı olmayan mekânlar', 'Apartments, offices, spaces without a chimney'],
    ['Bir düymə ilə canlı alov, kül və odun yoxdur. Maxitrol idarəetmə sistemi alov qoruması və tənzimlənən qaz axını ilə işləyir.', 'Tek tuşla canlı alev; kül ve odun yok. Maxitrol kontrol sistemi alev emniyeti ve ayarlanabilir gaz akışıyla çalışır.', 'A live flame at the push of a button, with no ash or logs. Maxitrol controls provide flame safety and adjustable gas flow.'],
    ['Villa, restoran, təmiz və sürətli istilik', 'Villa, restoran, temiz ve hızlı ısınma', 'Villas, restaurants, clean and fast heat'],
    ['Odunun səsi, qoxusu və ən yüksək istilik. Kaset sistemlər, mərkəzi və asma modellər interyerin əsas elementinə çevrilir.', 'Odunun sesi, kokusu ve en yüksek ısı. Kaset sistemler, ada ve asma modeller iç mekânın odak noktası olur.', 'The sound and smell of wood, and the most heat. Inserts, central and suspended models become the centrepiece of the room.'],
    ['Həyət evi, villa, geniş qonaq otağı', 'Müstakil ev, villa, geniş salon', 'Houses, villas, large living rooms'],
    ['Tüstüsüz və qoxusuz yanır, baca lazım deyil. Masaüstü, divara və ya mebelin içinə quraşdırılan dizayn həlləri.', 'Dumansız ve kokusuz yanar, baca gerekmez. Masaüstü, duvara veya mobilyanın içine monte edilen tasarım çözümleri.', 'Burns without smoke or smell and needs no chimney. Tabletop, wall-mounted or built into furniture.'],
    ['Müasir mənzil, terras, dizayn yönümlü interyer', 'Modern daire, teras, tasarım odaklı iç mekân', 'Modern apartments, terraces, design-led interiors'],
    ['Açıq hava üçün hazırlanmış, havaya davamlı modellər. Terras, həyət və hovuz kənarı üçün.', 'Açık hava için üretilmiş, hava koşullarına dayanıklı modeller. Teras, bahçe ve havuz kenarı için.', 'Weatherproof models built for outdoors. For terraces, gardens and poolsides.'],
    ['Həyət, terras, bağ evi', 'Bahçe, teras, yazlık ev', 'Gardens, terraces, country houses'],
    ['Kamin kasetinin ətrafına quraşdırılan, fərdi ölçüdə hazırlanan mərmər portallar. Klassik və müasir xətlər.', 'Şömine kasetinin çevresine monte edilen, özel ölçüde üretilen mermer kaplamalar. Klasik ve modern çizgiler.', 'Made-to-measure marble surrounds fitted around the firebox. Classic and modern lines.'],
    ['Klassik və neoklassik interyerlər', 'Klasik ve neoklasik iç mekânlar', 'Classic and neoclassical interiors'],
    ['Elektrik · bacasız', 'Elektrikli · bacasız', 'Electric · no chimney'],

    // Deluxe fərqi
    ['Adətən kamini biri satır, bacanı başqası qurur, servisə isə üçüncüsü gəlir.', 'Genelde şömineyi biri satar, bacayı başkası kurar, servise de üçüncüsü gelir.', 'Usually one company sells the fireplace, another builds the chimney and a third comes for service.'],
    ['Deluxe Kamin-də altı işin hamısını bir komanda görür.', 'Deluxe Kamin\'de altı işin hepsini tek ekip yapar.', 'At Deluxe Kamin, one team does all six jobs.'],
    ['Başqa şirkətlərdə hər iş üçün ayrı adam tapırsınız.', 'Başka firmalarda her iş için ayrı birini bulursunuz.', 'With other companies, every job means a different person.'],
    ['Başqa yerdə hər iş üçün ayrı adam tapırsınız.', 'Başka yerde her iş için ayrı birini bulursunuz.', 'Elsewhere, every job means finding someone new.'],
    ['Deluxe Kamin-də hamısını bir komanda görür.', 'Deluxe Kamin\'de hepsini tek ekip yapar.', 'At Deluxe Kamin, one team does it all.'],
    ['zəng', 'telefon', 'calls'],
    ['Kamindən servisə qədər bir müraciət.', 'Şömineden servise kadar tek başvuru.', 'One point of contact, from fireplace to service.'],
    ['Başqa yerdə hər iş üçün ayrı adam tapırsınız. Bizdə hamısını bir komanda görür.', 'Başka yerde her iş için ayrı birini bulursunuz. Bizde hepsini tek ekip yapar.', 'Elsewhere you find a different person for every job. With us, one team does it all.'],
    ['Ayrı-ayrı', 'Ayrı ayrı', 'Separately'],
    ['Deluxe Kamin ilə', 'Deluxe Kamin ile', 'With Deluxe Kamin'],
    ['Baca montajı', 'Baca montajı', 'Chimney installation'],
    ['Kamin montajı və ilk yandırma', 'Şömine montajı ve ilk yakma', 'Fireplace installation and first firing'],
    ['Metal və portal işləri', 'Metal ve kaplama işleri', 'Metal and surround work'],
    ['Servis və ehtiyat hissələri', 'Servis ve yedek parça', 'Service and spare parts'],
    ['Mağaza', 'Mağaza', 'Shop'],
    ['Mühəndis', 'Mühendis', 'Engineer'],
    ['Bacaçı usta', 'Baca ustası', 'Chimney fitter'],
    ['Usta', 'Usta', 'Installer'],
    ['Emalatxana', 'Atölye', 'Workshop'],
    ['Ayrıca servis', 'Ayrı servis', 'Separate service'],
    ['Rəsmi distribütor, istehsalçı zəmanəti', 'Resmi distribütör, üretici garantisi', 'Official distributor, manufacturer warranty'],
    ['Kaminin gücünə görə, daxildir', 'Şöminenin gücüne göre, dahil', 'Sized to the fireplace, included'],
    ['Öz komandamız', 'Kendi ekibimiz', 'Our own team'],
    ['Öz emalatxanamız', 'Kendi atölyemiz', 'Our own workshop'],
    ['Satışdan sonra da biz', 'Satıştan sonra da biz', 'Still us after the sale'],
    ['6 ayrı əlaqə, 6 ayrı razılaşma', '6 ayrı kişi, 6 ayrı anlaşma', '6 contacts, 6 separate agreements'],
    ['Bir əlaqə, bir məsuliyyət', 'Tek muhatap, tek sorumluluk', 'One contact, one responsibility'],

    // baca səhifəsi
    ['Baca Sistemləri — Deluxe Kamin', 'Baca Sistemleri — Deluxe Kamin', 'Chimney Systems — Deluxe Kamin'],
    ['Schiedel Rondo Plus keramik baca sistemləri, Poujoulat Therminox paslanmaz polad bacalar və Exodraft baca fanları. Layihə, montaj və servis.', 'Schiedel Rondo Plus seramik baca sistemleri, Poujoulat Therminox paslanmaz çelik bacalar ve Exodraft baca fanları. Proje, montaj ve servis.', 'Schiedel Rondo Plus ceramic chimneys, Poujoulat Therminox stainless steel flues and Exodraft chimney fans. Design, installation and service.'],
    ['Schiedel Rondo Plus ilə kamin', 'Schiedel Rondo Plus ile şömine', 'Fireplace with a Schiedel Rondo Plus chimney'],
    ['Schiedel Rondo Plus keramik baca', 'Schiedel Rondo Plus seramik baca', 'Schiedel Rondo Plus ceramic chimney'],
    ['Poujoulat Therminox polad baca', 'Poujoulat Therminox çelik baca', 'Poujoulat Therminox steel chimney'],
    ['Hesablama, quraşdırma və servis bir komandada.', 'Hesap, montaj ve servis tek ekipte.', 'Sizing, installation and service from one team.'],
    ['Baxış sifariş edin ›', 'Keşif talep edin ›', 'Book a site visit ›'],
    ['Sualınız var?', 'Sorunuz mu var?', 'Have a question?'],
    ['WhatsApp-da yazın ›', 'WhatsApp\'tan yazın ›', 'Message us on WhatsApp ›'],
    ['Necə qurulub', 'Nasıl yapılır', 'How it is built'],
    ['Üç qat', 'Üç katman', 'Three layers'],
    ['5 sual', '5 soru', '5 questions'],
    ['Sistemlər', 'Sistemler', 'Systems'],
    ['Yeni tikili üçün keramik, mövcud bina üçün polad.', 'Yeni yapılar için seramik, mevcut binalar için çelik.', 'Ceramic for new builds, steel for existing buildings.'],
    ['Keramik, üç qatlı · T600', 'Seramik, üç katmanlı · T600', 'Ceramic, three-layer · T600'],
    ['İkiqat divarlı polad · 316L · Ø100–250', 'Çift cidarlı çelik · 316L · Ø100–250', 'Twin-wall steel · 316L · Ø100–250'],
    ['Bacanın içi', 'Bacanın içi', 'Inside the chimney'],
    ['Keramik və polad sistemin qatları', 'Seramik ve çelik sistemin katmanları', 'The layers of ceramic and steel systems'],
    ['Çəkiş zəifdirsə və tüstü otağa qayıdırsa, Exodraft fanı.', 'Çekiş zayıfsa ve duman odaya geri dönüyorsa, Exodraft fanı.', 'If the draught is weak and smoke comes back into the room: an Exodraft fan.'],
    ['Baca fanı · məhsul səhifəsi ›', 'Baca fanı · ürün sayfası ›', 'Chimney fan · product page ›'],
    ['Baxışdan ilk alova qədər.', 'Keşiften ilk aleve kadar.', 'From the site visit to the first flame.'],
    ['Binanın quruluşu, dam və bacanın keçəcəyi xətt yerində yoxlanılır.', 'Binanın yapısı, çatı ve baca hattı yerinde kontrol edilir.', 'We check the building structure, the roof and the chimney route on site.'],
    ['Hesablama', 'Hesaplama', 'Sizing'],
    ['Diametr və hündürlük kaminin gücünə və yanacaq növünə görə seçilir.', 'Çap ve yükseklik şöminenin gücüne ve yakıt türüne göre seçilir.', 'Diameter and height are chosen for the fireplace output and fuel type.'],
    ['Proses ›', 'Süreç ›', 'Process ›'],
    ['Evinizin və kaminin şəklini göndərin, uyğun sistemi təklif edək.', 'Evinizin ve şöminenin fotoğrafını gönderin, uygun sistemi önerelim.', 'Send photos of your home and fireplace and we will suggest the right system.'],
    ['Tez-tez verilən suallar', 'Sık sorulan sorular', 'Frequently asked questions'],
    ['Hər kamin üçün baca lazımdır? Keramik, yoxsa polad?', 'Her şömineye baca gerekir mi? Seramik mi, çelik mi?', 'Does every fireplace need a chimney? Ceramic or steel?'],
    ['Suallar ›', 'Sorular ›', 'FAQ ›'],
    ['Bacanın içinə baxaq.', 'Bacanın içine bakalım.', 'A look inside the chimney.'],
    ['Müasir baca üç qatdan ibarətdir. Hər qatın öz işi var. Sətirlərin üzərinə gəlin, sxemdə həmin qat seçiləcək.', 'Modern bir baca üç katmandan oluşur. Her katmanın kendi görevi var. Satırların üzerine gelin, şemada o katman vurgulanır.', 'A modern chimney has three layers, each with its own job. Hover over a row to highlight that layer in the diagram.'],
    ['Keramik', 'Seramik', 'Ceramic'],
    ['Paslanmaz polad', 'Paslanmaz çelik', 'Stainless steel'],
    ['Yüngül beton blok', 'Hafif beton blok', 'Lightweight concrete block'],
    ['Xarici gövdə. Sistemi daşıyır və qoruyur.', 'Dış gövde. Sistemi taşır ve korur.', 'The outer shell. Carries and protects the system.'],
    ['Mineral lif izolyasiya', 'Mineral lif yalıtım', 'Mineral fibre insulation'],
    ['İstiliyi saxlayır, kondensatın qarşısını alır.', 'Isıyı korur, yoğuşmayı önler.', 'Keeps the heat in and prevents condensation.'],
    ['Keramik daxili boru', 'Seramik iç boru', 'Ceramic inner liner'],
    ['Turşuya və yüksək temperatura davamlı, T600.', 'Aside ve yüksek sıcaklığa dayanıklı, T600.', 'Resistant to acid and high temperature, T600.'],
    ['Paslanmaz polad xarici divar', 'Paslanmaz çelik dış cidar', 'Stainless steel outer wall'],
    ['Bina daxilində və fasadda səliqəli görünüş.', 'Bina içinde ve cephede düzgün görünüm.', 'A clean look inside the building and on the facade.'],
    ['Mineral yun, 130 kg/m³', 'Mineral yün, 130 kg/m³', 'Mineral wool, 130 kg/m³'],
    ['Yüksək sıxlıqlı injeksiya olunmuş izolyasiya.', 'Yüksek yoğunluklu enjeksiyonlu yalıtım.', 'High-density injected insulation.'],
    ['316L polad daxili divar', '316L çelik iç cidar', '316L steel inner wall'],
    ['Çoxyanacaqlı, T450 temperatur sinfi.', 'Çok yakıtlı, T450 sıcaklık sınıfı.', 'Multi-fuel, temperature class T450.'],
    ['Müxtəlif isitmə cihazları üçün turşuya davamlı, yanğın təhlükəsiz, CE işarəli keramik baca sistemi. Yeni tikililər və villalar üçün uzunömürlü həll.', 'Farklı ısıtıcılar için aside dayanıklı, yangına karşı güvenli, CE işaretli seramik baca sistemi. Yeni yapılar ve villalar için uzun ömürlü çözüm.', 'An acid-resistant, fire-safe, CE-marked ceramic chimney for all kinds of heating appliances. A long-lasting solution for new builds and villas.'],
    ['Konstruksiya', 'Yapı', 'Construction'],
    ['Keramik daxili boru, mineral lif izolyasiya, yüngül beton xarici blok', 'Seramik iç boru, mineral lif yalıtım, hafif beton dış blok', 'Ceramic liner, mineral fibre insulation, lightweight concrete outer block'],
    ['Temperatur sinfi', 'Sıcaklık sınıfı', 'Temperature class'],
    ['Yanacaq', 'Yakıt', 'Fuel'],
    ['Odun, pelet, hakə, taxıl, yağ və qaz', 'Odun, pelet, talaş, tahıl, yağ ve gaz', 'Wood, pellets, wood chips, grain, oil and gas'],
    ['Diametr', 'Çap', 'Diameter'],
    ['16–35 sm', '16–35 cm', '16–35 cm'],
    ['Sertifikat', 'Sertifika', 'Certification'],
    ['CE, EN 13063-1 və EN 13063-2', 'CE, EN 13063-1 ve EN 13063-2', 'CE, EN 13063-1 and EN 13063-2'],
    ['Kondensata davamlı', 'Yoğuşmaya dayanıklı', 'Condensation-resistant'],
    ['His yanğınına davamlı', 'Kurum yangınına dayanıklı', 'Soot-fire resistant'],
    ['Az istifadədə də yaxşı çəkiş', 'Az kullanımda da iyi çekiş', 'Good draught even with light use'],
    ['45° birləşmə', '45° bağlantı', '45° connection'],
    ['Yüngül bloklar', 'Hafif bloklar', 'Lightweight blocks'],
    ['İkiqat divarlı, izolyasiyalı, çoxyanacaqlı polad baca. Bina daxilində və ya xaricində quraşdırıla bilir, yeni və mövcud tikililər üçün uyğundur.', 'Çift cidarlı, yalıtımlı, çok yakıtlı çelik baca. Bina içine veya dışına monte edilebilir; yeni ve mevcut yapılar için uygundur.', 'A twin-wall, insulated, multi-fuel steel chimney. It can run inside or outside the building and suits both new and existing homes.'],
    ['Daxili divar', 'İç cidar', 'Inner wall'],
    ['316L paslanmaz polad', '316L paslanmaz çelik', '316L stainless steel'],
    ['İzolyasiya', 'Yalıtım', 'Insulation'],
    ['Yüksək sıxlıqlı injeksiya olunmuş mineral yun, 130 kg/m³', 'Yüksek yoğunluklu enjeksiyonlu mineral yün, 130 kg/m³', 'High-density injected mineral wool, 130 kg/m³'],
    ['Diametrlər', 'Çaplar', 'Diameters'],
    ['Yanıcı materiallara məsafə', 'Yanıcı malzemelere mesafe', 'Clearance to combustibles'],
    ['Birləşmə', 'Bağlantı', 'Joints'],
    ['Press-fit, 360° dönmə imkanı', 'Press-fit, 360° dönebilir', 'Press-fit, rotates 360°'],
    ['Odun, kömür, qaz, yağ, pelet', 'Odun, kömür, gaz, yağ, pelet', 'Wood, coal, gas, oil, pellets'],
    ['Daxili və fasad montajı', 'İç ve cephe montajı', 'Indoor and facade installation'],
    ['Mövcud binalar üçün', 'Mevcut binalar için', 'For existing buildings'],
    ['Proses', 'Süreç', 'Process'],
    ['Baca kaminlə birlikdə planlanmalıdır. İdeal halda bu, tikinti və ya təmir mərhələsində olur.', 'Baca şömineyle birlikte planlanmalıdır. İdeali bunun inşaat veya tadilat aşamasında yapılmasıdır.', 'The chimney should be planned together with the fireplace, ideally during construction or renovation.'],
    ['Addım 01', 'Adım 01', 'Step 01'],
    ['Addım 02', 'Adım 02', 'Step 02'],
    ['Addım 03', 'Adım 03', 'Step 03'],
    ['Addım 04', 'Adım 04', 'Step 04'],
    ['Addım 05', 'Adım 05', 'Step 05'],
    ['Binanın quruluşu, dam, kaminin yeri və bacanın keçəcəyi xətt yerində yoxlanılır.', 'Binanın yapısı, çatı, şöminenin yeri ve baca hattı yerinde kontrol edilir.', 'We check the building structure, roof, fireplace position and chimney route on site.'],
    ['Kaminin çıxış diametri, yanacaq növü və bacanın hündürlüyünə görə sistem seçilir.', 'Sistem; şöminenin çıkış çapı, yakıt türü ve baca yüksekliğine göre seçilir.', 'The system is chosen for the fireplace outlet diameter, fuel type and chimney height.'],
    ['Təklif', 'Teklif', 'Quote'],
    ['Material, montaj müddəti və qiymət yazılı şəkildə təqdim olunur.', 'Malzeme, montaj süresi ve fiyat yazılı olarak sunulur.', 'Materials, installation time and price are given to you in writing.'],
    ['Montaj', 'Montaj', 'Installation'],
    ['Komandamız istehsalçının təlimatlarına və standartlara uyğun quraşdırma aparır.', 'Ekibimiz üretici talimatlarına ve standartlara uygun montaj yapar.', 'Our team installs to the manufacturer\'s instructions and the standards.'],
    ['Yoxlama və təhvil', 'Kontrol ve teslim', 'Testing and handover'],
    ['Çəkiş və birləşmələr yoxlanılır, sistem işlək vəziyyətdə təhvil verilir.', 'Çekiş ve bağlantılar kontrol edilir, sistem çalışır durumda teslim edilir.', 'Draught and joints are tested and the system is handed over in working order.'],
    ['Ən çox soruşulanlar', 'En çok sorulanlar', 'Most asked'],
    ['Hər kamin üçün baca lazımdır?', 'Her şömineye baca gerekir mi?', 'Does every fireplace need a chimney?'],
    ['Xeyr. Elektrik və bioetanol kaminlər baca tələb etmir. Odunlu və qaz kaminlər üçün isə tüstü və yanma qazlarını çıxaran baca sistemi lazımdır.', 'Hayır. Elektrikli ve bioetanol şömineler baca gerektirmez. Odunlu ve gazlı şömineler için ise dumanı ve yanma gazlarını dışarı atan bir baca sistemi gerekir.', 'No. Electric and bioethanol fireplaces need no chimney. Wood and gas fireplaces need a chimney system to carry smoke and flue gases out.'],
    ['Keramik, yoxsa paslanmaz polad?', 'Seramik mi, paslanmaz çelik mi?', 'Ceramic or stainless steel?'],
    ['Yeni tikilidə, bina daxilində keramik sistem uzunömürlü və möhkəm həlldir. Mövcud binada, fasadda və ya qısa müddətdə quraşdırma lazım olanda paslanmaz polad daha uyğundur.', 'Yeni yapıda, bina içinde seramik sistem uzun ömürlü ve sağlam bir çözümdür. Mevcut binada, cephede veya kısa sürede montaj gerektiğinde paslanmaz çelik daha uygundur.', 'In a new build, an indoor ceramic system is durable and solid. In an existing building, on a facade or when installation must be quick, stainless steel is the better fit.'],
    ['Hazır evə sonradan baca çəkmək olar?', 'Hazır eve sonradan baca yapılabilir mi?', 'Can a chimney be added to an existing home?'],
    ['Bəli. Poujoulat Therminox binanın içində və ya xaricində, fasad boyunca quraşdırıla bilir. Konkret həll yerində baxışdan sonra müəyyən olunur.', 'Evet. Poujoulat Therminox binanın içine veya dışına, cephe boyunca monte edilebilir. Kesin çözüm yerinde keşiften sonra belirlenir.', 'Yes. Poujoulat Therminox can run inside the building or up the outside wall. The exact solution is decided after a site visit.'],
    ['Baca fanı nə vaxt lazımdır?', 'Baca fanı ne zaman gerekir?', 'When is a chimney fan needed?'],
    ['Baca qısa olanda, külək və ya ətraf binalar çəkişə mane olanda, kamin yandırılanda tüstü otağa qayıdanda. Fan bacanın ucuna quraşdırılır və çəkişi sabitləşdirir.', 'Baca kısa olduğunda, rüzgâr veya çevredeki binalar çekişi engellediğinde, şömine yakılınca duman odaya döndüğünde. Fan bacanın ucuna takılır ve çekişi sabitler.', 'When the chimney is short, when wind or nearby buildings disturb the draught, or when smoke comes back into the room on lighting. The fan sits on top of the chimney and stabilises the draught.'],
    ['Diametri necə seçirsiniz?', 'Çapı nasıl seçiyorsunuz?', 'How do you choose the diameter?'],
    ['Kamin istehsalçısının tövsiyə etdiyi çıxış diametrinə, bacanın ümumi hündürlüyünə, dönmələrin sayına və yanacaq növünə görə hesablanır.', 'Şömine üreticisinin önerdiği çıkış çapına, bacanın toplam yüksekliğine, dirsek sayısına ve yakıt türüne göre hesaplanır.', 'It is calculated from the outlet diameter the manufacturer recommends, the total chimney height, the number of bends and the fuel type.'],
    ['Baca hazırdır.', 'Baca hazır.', 'Chimney sorted.'],
    ['İndi kamini seçək.', 'Şimdi şömineyi seçelim.', 'Now let\'s choose the fireplace.'],
    ['Elektrikdən odunluya, mərkəzi modellərdən mərmər portallara qədər 43 model.', 'Elektrikliden odunluya, ada modellerden mermer kaplamalara kadar 43 model.', '43 models, from electric to wood-burning, from central fireplaces to marble surrounds.'],
    ['Kaminlərə bax', 'Şöminelere bak', 'See fireplaces'],

    // kamin səhifəsi və kataloq filtrləri
    ["‹ Kaminlər", "‹ Şömineler", "‹ Fireplaces"],
    ["Ölçünü seçin", "Ölçüyü seçin", "Choose a size"],
    ["WhatsApp-da qiymət soruş", "WhatsApp'tan fiyat sor", "Ask for a price on WhatsApp"],
    ["Showroom-da baxın", "Showroom'da görün", "See it in the showroom"],
    ["Rəsmi zəmanət · Quraşdırma · Servis", "Resmi garanti · Montaj · Servis", "Official warranty · Installation · Service"],
    ["Qiymətlər ƏDV-siz göstərilib və dəyişə bilər. Dəqiq təklif üçün yazın.", "Fiyatlar KDV hariçtir ve değişebilir. Kesin teklif için yazın.", "Prices exclude VAT and may change. Write to us for an exact quote."],
    ["Əsas xüsusiyyətlər", "Öne çıkan özellikler", "Key features"],
    ["Texniki göstəricilər", "Teknik özellikler", "Tech specs"],
    ["Oxşar modellər", "Benzer modeller", "Similar models"],
    ["Qiymət sorğu ilə", "Fiyat talep üzerine", "Price on request"],
    ["+18% ƏDV", "+%18 KDV", "+18% VAT"],
    ["Bütün ölkələr", "Tüm ülkeler", "All countries"],
    ["Ölkə", "Ülke", "Country"],
    ["model. Növə, brendə və istehsal ölkəsinə görə süzün.", "model. Türe, markaya ve üretim ülkesine göre filtreleyin.", "models. Filter by type, brand and country of origin."],
    ["Bütün modellər", "Tüm modeller", "All models"],
    ["İrlandiya", "İrlanda", "Ireland"],
    ["Niderland", "Hollanda", "Netherlands"],
    ["Türkiyə", "Türkiye", "Türkiye"],
    ["İtaliya", "İtalya", "Italy"],
    ["ABŞ", "ABD", "USA"],
    ["Fransa", "Fransa", "France"],
    ["Polşa", "Polonya", "Poland"],
    ["Öz istehsal", "Kendi üretimimiz", "Made in-house"],
    ["İstehsal", "Üretim", "Made in"],
    ["Növ", "Tür", "Type"],
    ["Lazımdır", "Gerekli", "Required"],
    ["Lazım deyil", "Gerekmez", "Not required"],
    ["Alov texnologiyası", "Alev teknolojisi", "Flame technology"],
    ["İsitmə", "Isıtma", "Heating"],
    ["Alovun tənzimlənməsi", "Alev ayarı", "Flame adjustment"],
    ["Zəmanət", "Garanti", "Warranty"],
    ["Görünüş", "Görünüm", "View"],
    ["Material", "Malzeme", "Material"],
    ["Qidalanma", "Güç kaynağı", "Power supply"],
    ["Var", "Var", "Yes"],
    ["Yoxdur", "Yok", "No"],
    ["1 il", "1 yıl", "1 year"],
    ["Dörd tərəfdən", "Dört taraftan", "Four-sided"],
    ["Polad", "Çelik", "Steel"],
    ["Corten polad", "Corten çelik", "Corten steel"],
    ["6 pillə", "6 kademe", "6 levels"],
    ["2 pillə", "2 kademe", "2 levels"],
    ["Bioetanol, 95–96,6%", "Bioetanol, %95–96,6", "Bioethanol, 95–96.6%"],
    ["Güc", "Güç", "Output"],
    ["Səmərə", "Verim", "Efficiency"],
    ["Çəki", "Ağırlık", "Weight"],
    ["Ölçülər", "Ölçüler", "Dimensions"],
    ["Odun", "Odun", "Wood"],
    ["İstilik gücü", "Isı çıkışı", "Heat output"],
    ["Qaz təzyiqi", "Gaz basıncı", "Gas pressure"],
    ["Hündürlük", "Yükseklik", "Height"],
    ["İsitmə sahəsi", "Isıtma alanı", "Heated area"],
    ["Rəng", "Renk", "Colour"],
    ["Yaşıl", "Yeşil", "Green"],
    // yeni növlər, ölkələr, baca kataloqu
    ["Bütün məhsullar", "Tüm ürünler", "All products"],
    ["məhsul. Növə və istehsal ölkəsinə görə süzün.", "ürün. Türe ve üretim ülkesine göre filtreleyin.", "products. Filter by type and country of origin."],
    ["Baca fanı", "Baca fanı", "Chimney fan"],
    ["Danimarka", "Danimarka", "Denmark"],
    ["Almaniya", "Almanya", "Germany"],
    ["Növlər", "Türler", "Types"],
    ["İstehsal ölkəsi", "Üretim ülkesi", "Country of origin"],
    ["Brend və ölkə", "Marka ve ülke", "Brand and country"],
    ["Bütün baca sistemləri", "Tüm baca sistemleri", "All chimney systems"],
    ["İstehsal ölkəsinə görə", "Üretim ülkesine göre", "By country of origin"],
    ["Hər brend öz ölkəsindən, rəsmi kanalla gəlir.", "Her marka kendi ülkesinden, resmi kanalla gelir.", "Every brand comes from its home country through official channels."],
    ["Mərkəzi", "Ada", "Central"],
    ["Mərkəzi kaminlər", "Ada şömineler", "Central fireplaces"],
    ["Aksesuar", "Aksesuar", "Accessory"],
    ["Kamin aksesuarları", "Şömine aksesuarları", "Fireplace accessories"],
    ["Topkalar və divar kaminləri.", "Kasetler ve duvar şömineleri.", "Inserts and wall-mounted fireplaces."],
    ["Otağın ortasında, hər tərəfdən görünən alov.", "Odanın ortasında, her yönden görünen alev.", "In the middle of the room, with a flame visible from every side."],
    ["Siperlik, odunluq, maşa dəsti.", "Siperlik, odunluk, maşa takımı.", "Fire screens, log holders, tool sets."],
    ["Otağın ortasında, tavandan asılan və ya döşəmədə dayanan odunlu kaminlər. Alov hər tərəfdən görünür, istilik bütün otağa yayılır.", "Odanın ortasında, tavandan asılan veya zeminde duran odunlu şömineler. Alev her yönden görünür, ısı tüm odaya yayılır.", "Wood-burning fireplaces that hang from the ceiling or stand in the middle of the room. The flame is visible from every side and heat spreads through the whole room."],
    ["Geniş qonaq otağı, açıq planlı ev, hündür tavan", "Geniş salon, açık plan ev, yüksek tavan", "Large living rooms, open-plan homes, high ceilings"],
    ["Siperliklər, odunluqlar və maşa dəstləri. Kaminin qarşısını qoruyur, odunu səliqəli saxlayır.", "Siperlikler, odunluklar ve maşa takımları. Şöminenin önünü korur, odunu düzenli tutar.", "Fire screens, log holders and tool sets. They protect the hearth and keep firewood tidy."],
    ["Odunlu və qaz kaminlər", "Odunlu ve gazlı şömineler", "Wood and gas fireplaces"],
    ["Odunun səsi, qoxusu və ən yüksək istilik. Topkalar (kaset) portal və ya divar içinə quraşdırılır, divar modelləri isə interyerin əsas elementinə çevrilir.", "Odunun sesi, kokusu ve en yüksek ısı. Kasetler kaplama veya duvar içine monte edilir, duvar modelleri ise iç mekânın odak noktası olur.", "The sound and smell of wood, and the most heat. Inserts are built into a surround or wall, while wall-mounted models become the centrepiece of the room."],
    ["Paslanmaz polad baca", "Paslanmaz çelik baca", "Stainless steel chimney"],
    ["Polad", "Çelik", "Steel"],
    ["Baca fanı · məhsul səhifəsi ›", "Baca fanı · ürün sayfası ›", "Chimney fan · product page ›"],
    ["Çuqun", "Dökme demir", "Cast iron"],
    ["Uzun yanma", "Uzun yanma", "Long burn"],
    ["3 saat", "3 saat", "3 hours"],
    ["Baca çıxışı", "Baca çıkışı", "Flue outlet"],
    ["Qara", "Siyah", "Black"],
    ["İstifadə", "Kullanım", "Use"],
    ["Yalnız açıq məkan", "Yalnızca açık alan", "Outdoor only"],
    ["5 il", "5 yıl", "5 years"],
    // əlaqə forması
    ["Soyadınız", "Soyadınız", "Surname"],
    ["Mobil nömrəniz", "Cep telefonunuz", "Mobile number"],
    ["E-poçtunuz", "E-postanız", "Email"],
    ["Mesajınız", "Mesajınız", "Message"],
    ["Radiator", "Radyatör", "Radiators"],
    ["Perila və ferforje", "Korkuluk ve ferforje", "Railings and ironwork"],
    ["Servis və təmir", "Servis ve onarım", "Service and repair"],
    ["Digər", "Diğer", "Other"],
    ["E-poçt ilə göndər", "E-postayla gönder", "Send by email"],
    ["Ad və telefon mütləqdir.", "Ad ve telefon zorunludur.", "Name and phone are required."],
    ["Bu model barədə məlumat və qiymət istəyirəm:", "Bu model hakkında bilgi ve fiyat istiyorum:", "I would like information and a price for this model:"],
    // kataloq yan paneli
    ["Filtrlər", "Filtreler", "Filters"],
    ["Filtrləri sıfırla", "Filtreleri sıfırla", "Clear filters"],
    ["modeli göstər", "modeli göster", "Show models"],
    ["Sıralama", "Sıralama", "Sort"],
    ["Tövsiyə olunan", "Önerilen", "Recommended"],
    ["Ad: A–Z", "Ad: A–Z", "Name: A–Z"],
    ["Ad: Z–A", "Ad: Z–A", "Name: Z–A"],
    ["Baca lazımdır", "Baca gerekir", "Needs a chimney"],
    ["Bacasız", "Bacasız", "No chimney"],
    ["Bu filtrə uyğun model tapılmadı.", "Bu filtreye uygun model bulunamadı.", "No models match these filters."],
    // kaminlər səhifəsi (kataloq)
    ["Qiymət: əvvəlcə ucuz", "Fiyat: önce ucuz", "Price: low to high"],
    ["Hamısını sil", "Tümünü temizle", "Clear all"],
    ["Növə, brendə və istehsal ölkəsinə görə seçin. Hər modelin səhifəsində ölçülər, qiymətlər və texniki göstəricilər var.", "Türe, markaya ve üretim ülkesine göre seçin. Her modelin sayfasında ölçüler, fiyatlar ve teknik özellikler var.", "Choose by type, brand and country of origin. Every model page lists sizes, prices and tech specs."],
    ["ayrıca səhifə ›", "ayrı sayfa ›", "separate page ›"],
    ["Baca lazımdır?", "Baca gerekli mi?", "Need a chimney?"],
    ["Məkanınızın şəklini göndərin, uyğun modelləri təklif edək. ›", "Mekânınızın fotoğrafını gönderin, uygun modelleri önerelim. ›", "Send us a photo of your space and we will suggest suitable models. ›"],
    ["Azadlıq prospekti 140/33, Gənclik. ›", "Azadlıq prospekti 140/33, Gənclik. ›", "140/33 Azadliq Avenue, Ganjlik. ›"],
    ["Diametr və hündürlüyü kaminin gücünə görə hesablayırıq. ›", "Çap ve yüksekliği şöminenin gücüne göre hesaplıyoruz. ›", "We calculate diameter and height from the fireplace output. ›"],
    ["model", "model", "models"],
    // baca səhifəsi (kataloq)
    ["Keramik və paslanmaz polad bacalar, baca fanları. Kaminin gücünə görə hesablayır, quraşdırır və servis edirik.", "Seramik ve paslanmaz çelik bacalar, baca fanları. Şöminenin gücüne göre hesaplıyor, monte ediyor ve servis veriyoruz.", "Ceramic and stainless steel chimneys and chimney fans. We size them to the fireplace, install and service them."],
    ["Binanın quruluşu, dam və bacanın keçəcəyi xətt yerində yoxlanılır. ›", "Binanın yapısı, çatı ve baca hattı yerinde kontrol edilir. ›", "We check the building, the roof and the chimney route on site. ›"],
    ["Diametr və hündürlük kaminin gücünə və yanacaq növünə görə seçilir. ›", "Çap ve yükseklik şöminenin gücüne ve yakıt türüne göre seçilir. ›", "Diameter and height are chosen for the fireplace output and fuel type. ›"],
    ["Hər kamin üçün baca lazımdır? Keramik, yoxsa polad? ›", "Her şömineye baca gerekir mi? Seramik mi, çelik mi? ›", "Does every fireplace need a chimney? Ceramic or steel? ›"],
    // açılan menyular
    ["Bütün kaminlər ›", "Tüm şömineler ›", "All fireplaces ›"],
    ["Bütün baca sistemləri ›", "Tüm baca sistemleri ›", "All chimney systems ›"],
    ["Hamısına bax", "Tümünü gör", "See all"],
    ["Bax ›", "İncele ›", "View ›"],
    ["Bu bölmə hələlik mövcud saytda açılır.", "Bu bölüm şimdilik mevcut sitede açılır.", "This section currently opens on the existing site."],
    // WhatsApp mesajları
    ['Salam! Kamin ilə bağlı məlumat almaq istəyirəm.', 'Merhaba! Şömine hakkında bilgi almak istiyorum.', 'Hello! I would like some information about fireplaces.'],
    ['haqqında məlumat və qiymət almaq istəyirəm.', 'hakkında bilgi ve fiyat almak istiyorum.', '— I would like information and a price.'],
    ['Salam!', 'Merhaba!', 'Hello!']
  ];

  var idx = LANGS.indexOf(lang);
  var MAP = {};
  D.forEach(function (r) { MAP[r[0]] = r[idx]; });

  // tərkibli mətnlər: "12 model", "Odunlu · baca lazımdır"
  var PATTERNS = [
    [/^(\d+) model$/, { tr: '$1 model', en: '$1 models' }],
    [/^(\d+) sual$/, { tr: '$1 soru', en: '$1 questions' }],
    [/^([\d.,]+ [€₼])-dan$/, { tr: "$1'den başlayan", en: 'from $1' }]
  ];

  function tr(s) {
    if (lang === 'az' || !s) return s;
    var key = s.replace(/\s+/g, ' ').trim();
    if (!key) return s;
    var out = MAP[key];
    if (out === undefined) {
      for (var i = 0; i < PATTERNS.length; i++) {
        if (PATTERNS[i][0].test(key)) { out = key.replace(PATTERNS[i][0], PATTERNS[i][1][lang]); break; }
      }
    }
    if (out === undefined && key.indexOf(' · ') > 0) {
      var parts = key.split(' · '), hit = false;
      parts = parts.map(function (p) { var t = MAP[p]; if (t !== undefined) { hit = true; return t; } return p; });
      if (hit) out = parts.join(' · ');
    }
    if (out === undefined) return s;
    var lead = s.match(/^\s*/)[0], trail = s.match(/\s*$/)[0];
    return lead + out + trail;
  }
  DK.t = tr;

  var ATTRS = ['alt', 'aria-label', 'placeholder', 'title'];
  function translateNode(root) {
    if (lang === 'az' || !root) return;
    if (root.nodeType === 3) { var v = tr(root.nodeValue); if (v !== root.nodeValue) root.nodeValue = v; return; }
    if (root.nodeType !== 1 || root.tagName === 'SCRIPT' || root.tagName === 'STYLE') return;
    ATTRS.forEach(function (a) {
      if (root.hasAttribute && root.hasAttribute(a)) { var o = root.getAttribute(a), n = tr(o); if (n !== o) root.setAttribute(a, n); }
    });
    var w = document.createTreeWalker(root, NodeFilter.SHOW_TEXT | NodeFilter.SHOW_ELEMENT, null, false), n;
    while ((n = w.nextNode())) {
      if (n.nodeType === 3) { var t = tr(n.nodeValue); if (t !== n.nodeValue) n.nodeValue = t; }
      else if (n.tagName !== 'SCRIPT' && n.tagName !== 'STYLE') {
        for (var i = 0; i < ATTRS.length; i++) {
          var a = ATTRS[i];
          if (n.hasAttribute(a)) { var o2 = n.getAttribute(a), n2 = tr(o2); if (n2 !== o2) n.setAttribute(a, n2); }
        }
      }
    }
  }
  DK.translate = translateNode;

  if (lang !== 'az') {
    document.title = tr(document.title);
    var md = document.querySelector('meta[name="description"]');
    if (md) md.setAttribute('content', tr(md.getAttribute('content')));
    translateNode(document.body);
    new MutationObserver(function (list) {
      list.forEach(function (m) {
        if (m.type === 'characterData') translateNode(m.target);
        else if (m.type === 'attributes') translateNode(m.target);
        else m.addedNodes.forEach(translateNode);
      });
    }).observe(document.body, { childList: true, subtree: true, characterData: true, attributes: true, attributeFilter: ATTRS });
  }

  // WhatsApp mesaj şablonları
  var MSG = {
    product: { az: 'Salam! {x} haqqında məlumat və qiymət almaq istəyirəm.', tr: 'Merhaba! {x} hakkında bilgi ve fiyat almak istiyorum.', en: 'Hello! I would like information and a price for {x}.' },
    lead: { az: 'Salam! Sorğu göndərirəm.\nAd: {n}\nTelefon: {p}\nE-poçt: {e}\nMövzu: {t}\nMesaj: {m}', tr: 'Merhaba! Talep gönderiyorum.\nAd: {n}\nTelefon: {p}\nE-posta: {e}\nKonu: {t}\nMesaj: {m}', en: 'Hello! I am sending an enquiry.\nName: {n}\nPhone: {p}\nEmail: {e}\nTopic: {t}\nMessage: {m}' }
  };
  DK.msg = function (k, v) { return MSG[k][lang].replace(/\{(\w)\}/g, function (_, x) { return v[x] || ''; }); };

  // dil seçimi: düymələr main.js-də yaradılır
  DK.setLang = function (l) {
    if (LANGS.indexOf(l) < 0 || l === lang) return;
    try { localStorage.setItem('dk-lang', l); } catch (e) {}
    var u = location.href.replace(/([?&])lang=(az|tr|en)&?/, '$1').replace(/[?&]$/, '');
    location.href = u;
  };
})();
