/* ===== Deluxe Kamin — Version 2 "Warm Editorial" ===== */
(() => {
  const WA_NUMBER = '994502520216';

  /* Header border + mobile nav */
  const header = document.getElementById('header');
  window.addEventListener('scroll', () => header.classList.toggle('is-scrolled', scrollY > 10), { passive: true });
  const nav = document.getElementById('nav');
  document.getElementById('burger').addEventListener('click', () => nav.classList.toggle('is-open'));
  nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => nav.classList.remove('is-open')));

  /* Fade-in on scroll */
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); } });
  }, { threshold: 0.12 });
  document.querySelectorAll('.fade').forEach((el, i) => { el.style.transitionDelay = `${(i % 3) * 90}ms`; io.observe(el); });

  /* Fuel selector */
  const FUELS = {
    electric: {
      title: 'Elektrik kaminlər',
      chimney: false,
      desc: 'Rozetkaya qoşulur və dərhal işləyir. 3D alov effekti real odunu xatırladır, istilik funksiyası isə ayrıca açılıb-bağlanır. Pult və ya mobil tətbiqlə idarə olunur.',
      ideal: 'Mənzillər, ofislər, baca imkanı olmayan məkanlar.',
      bars: { 'İstilik gücü': 45, 'Quraşdırma asanlığı': 100, 'Atmosfer': 70, 'Baxım rahatlığı': 100 },
      brands: ['Dimplex', 'Flameline', 'Spartherm DRU', 'Faber']
    },
    gas: {
      title: 'Qaz kaminlər',
      chimney: true,
      desc: 'Bir düymə ilə canlı alov, kül və odun yoxdur. Maxitrol sistemi alov qoruması və tənzimlənən qaz axını ilə tam təhlükəsizlik təmin edir.',
      ideal: 'Villalar, restoranlar, sürətli və təmiz istilik istəyənlər.',
      bars: { 'İstilik gücü': 80, 'Quraşdırma asanlığı': 60, 'Atmosfer': 85, 'Baxım rahatlığı': 85 },
      brands: ['Italkero', 'Majestic', 'Maxitrol']
    },
    wood: {
      title: 'Odunlu kaminlər',
      chimney: true,
      desc: 'Odunun çırtıltısı, ətri və maksimum istilik. Müasir kaset sistemləri yüksək effektivliklə yanır, mərkəzi və asma modellər isə interyerin mərkəzinə çevrilir.',
      ideal: 'Həyət evləri, villalar, geniş qonaq otaqları.',
      bars: { 'İstilik gücü': 100, 'Quraşdırma asanlığı': 35, 'Atmosfer': 100, 'Baxım rahatlığı': 45 },
      brands: ['Spartherm', 'Invicta', 'Arkiane', 'JC Bordelet']
    },
    bio: {
      title: 'Bioetanol kaminlər',
      chimney: false,
      desc: 'Tüstüsüz, qoxusuz, ekoloji yanacaq. Real alov, amma baca olmadan. Masaüstü, divara və ya mebelin içinə quraşdırılan dizayner həllər.',
      ideal: 'Müasir mənzillər, terraslar, dizayn yönümlü interyerlər.',
      bars: { 'İstilik gücü': 40, 'Quraşdırma asanlığı': 90, 'Atmosfer': 90, 'Baxım rahatlığı': 80 },
      brands: ['Planika']
    }
  };

  const panel = document.getElementById('fuelPanel');
  const $ = id => document.getElementById(id);

  function renderFuel(key) {
    const f = FUELS[key];
    $('fTitle').textContent = f.title;
    $('fDesc').textContent = f.desc;
    $('fIdeal').textContent = f.ideal;
    const badge = $('fChimney');
    badge.textContent = f.chimney ? 'Baca sistemi tələb olunur' : 'Baca tələb olunmur';
    badge.classList.toggle('is-req', f.chimney);

    $('fBars').innerHTML = Object.entries(f.bars).map(([label, v]) => `
      <div class="bar">
        <div class="bar__label"><span>${label}</span><span>${v}%</span></div>
        <div class="bar__track"><div class="bar__fill" data-v="${v}"></div></div>
      </div>`).join('');
    $('fBrands').innerHTML = f.brands.map(b => `<span>${b}</span>`).join('');

    panel.classList.remove('swap'); void panel.offsetWidth; panel.classList.add('swap');
    requestAnimationFrame(() => requestAnimationFrame(() => {
      panel.querySelectorAll('.bar__fill').forEach(el => { el.style.width = el.dataset.v + '%'; });
    }));
  }

  document.querySelectorAll('.sel').forEach(btn => btn.addEventListener('click', () => {
    document.querySelectorAll('.sel').forEach(b => b.classList.toggle('is-active', b === btn));
    renderFuel(btn.dataset.fuel);
  }));
  renderFuel('electric');

  /* Process steps: highlight on scroll + meter */
  const steps = [...document.querySelectorAll('.pstep')];
  const meter = $('meter');
  function updateSteps() {
    const mid = innerHeight * 0.55;
    let active = -1;
    steps.forEach((s, i) => {
      const on = s.getBoundingClientRect().top < mid;
      s.classList.toggle('is-on', on);
      if (on) active = i;
    });
    meter.style.width = `${((active + 1) / steps.length) * 100}%`;
  }
  window.addEventListener('scroll', updateSteps, { passive: true });
  updateSteps();

  /* Lead form -> WhatsApp */
  $('leadForm').addEventListener('submit', e => {
    e.preventDefault();
    const d = new FormData(e.target);
    let msg = `Salam! Mən ${d.get('name')}. ${d.get('interest')} ilə bağlı konsultasiya istəyirəm. Tel: ${d.get('phone')}`;
    if (d.get('note')) msg += `\nQeyd: ${d.get('note')}`;
    window.open(`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`, '_blank');
  });
})();
