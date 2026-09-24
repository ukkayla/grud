/* ==================== STEAM-СЛАЙДЕР ==================== */
const cachedRandomDocs = [...documents].sort(() => Math.random() - 0.5).slice(0, 5);
const cachedRandomGeo = [...geo].sort(() => Math.random() - 0.5).slice(0, 10);

const featuredSlides = [
  {
    id: 'register',
    title: 'Реестр',
    tags: ['Уникальные документы', 'Архивный фонд'],
    description: 'Государственный реестр уникальных документов Архивного фонда Российской Федерации — общероссийский свод особо ценных документов.',
    cta: 'Перейти в Реестр',
    link: '#register',
    bgUrl: 'assets/images/s1.jpg',
    side: 'documents'
  },
  {
    id: 'archives',
    title: 'Архивы-хранители',
    tags: ['Федеральные', 'Региональные', 'Музеи', 'НКО'],
    description: 'Федеральные и региональные архивы, музеи и некоммерческие организации — хранители уникальных документов Российской Федерации.',
    cta: 'Открыть список архивов',
    link: '#archives',
    bgUrl: 'assets/images/s2.jpg',
    side: 'archives'
  },
  {
    id: 'geo',
    title: 'Географический указатель',
    tags: ['География', 'Топонимы', 'Регионы'],
    description: 'Топонимы, встречающиеся в описаниях уникальных документов Государственного реестра: города, губернии, реки, моря, области.',
    cta: 'Открыть указатель',
    link: '#geo',
    bgUrl: 'assets/images/s3.jpg',
    side: 'geo'
  }
];

function renderSideDocuments(){
  return `
    <div class="steam-slider__side-title">Из Реестра</div>
    ${cachedRandomDocs.map(d => `
      <a class="steam-side-item" href="#detail/${d.n}">
        <div class="steam-side-item__thumb"></div>
        <div class="steam-side-item__body">
          <div class="steam-side-item__title">${escapeHtml(d.t)}</div>
          <div class="steam-side-item__meta">№ ${d.n} · ${escapeHtml(d.d)}</div>
        </div>
      </a>
    `).join('')}
  `;
}

function renderSideArchives(){
  const items = [
    { title: 'Федеральные архивы',      meta: `${archivesData.federal.length} учреждений`, icon: 'building' },
    { title: 'Региональные архивы',     meta: `${archivesData.regional.length} учреждений`, icon: 'map' },
    { title: 'Музеи',                    meta: `${archivesData.museums.length} организаций`, icon: 'museum' },
    { title: 'Некоммерческие организации', meta: `${archivesData.ngo.length} организаций`, icon: 'users' }
  ];
  const icons = {
    building: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M3 21h18M5 21V9l7-5 7 5v12M9 21v-6h6v6"/></svg>',
    map:      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 21s-8-7.5-8-12a8 8 0 1116 0c0 4.5-8 12-8 12z"/><circle cx="12" cy="9" r="3"/></svg>',
    museum:   '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M3 10l9-6 9 6M5 10v10h14V10M9 20v-6h6v6"/></svg>',
    users:    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="8" r="3"/><circle cx="17" cy="10" r="2.5"/><path d="M3 20c0-3 3-5 6-5s6 2 6 5M15 20c0-2 2-3.5 4-3.5s3 1 3 3"/></svg>'
  };
  return `
    <div class="steam-slider__side-title">Категории архивов</div>
    ${items.map(i => `
      <a class="steam-side-item" href="#archives">
        <div class="steam-side-item__icon">${icons[i.icon]}</div>
        <div class="steam-side-item__body">
          <div class="steam-side-item__title">${i.title}</div>
          <div class="steam-side-item__meta">${i.meta}</div>
        </div>
      </a>
    `).join('')}
  `;
}

function renderSideGeo(){
  return `
    <div class="steam-slider__side-title">Топонимы</div>
    ${cachedRandomGeo.map(g => `<a class="steam-side-geo" href="#geo">${escapeHtml(g)}</a>`).join('')}
  `;
}

function initSteamSlider({ root, slidesData, renderSlide, renderSide, autoplay = 6000 }){
  if(!root) return;
  const track    = root.querySelector('[data-track]');
  const dotsWrap = root.querySelector('[data-dots]');
  const progress = root.querySelector('[data-progress]');
  const sideWrap = root.querySelector('[data-side]');
  const prevBtn  = root.querySelector('[data-prev]');
  const nextBtn  = root.querySelector('[data-next]');

  track.innerHTML = slidesData.map((item, i) => `
    <div class="steam-slider__slide${i === 0 ? ' is-active' : ''}" data-index="${i}">
      ${renderSlide(item)}
    </div>
  `).join('');

  dotsWrap.innerHTML = slidesData.map((_, i) => `
    <button class="steam-slider__dot${i === 0 ? ' is-active' : ''}"
            type="button" data-dot="${i}"
            aria-label="Слайд ${i + 1}"></button>
  `).join('');

  const slides = () => track.querySelectorAll('.steam-slider__slide');
  const dots   = () => dotsWrap.querySelectorAll('.steam-slider__dot');
  let current = 0;
  let lastSideIdx = -1;
  let timer = null;
  let progressTimer = null;

  function goTo(idx){
    const total = slides().length;
    if(!total) return;
    idx = ((idx % total) + total) % total;
    track.style.transform = `translateX(-${idx * 100}%)`;
    slides().forEach((el, i) => el.classList.toggle('is-active', i === idx));
    dots().forEach((el, i) => el.classList.toggle('is-active', i === idx));
    current = idx;

    if(idx !== lastSideIdx && sideWrap && renderSide){
      sideWrap.innerHTML = renderSide(slidesData[idx]);
      lastSideIdx = idx;
    }
  }

  prevBtn?.addEventListener('click', () => { goTo(current - 1); resetAuto(); });
  nextBtn?.addEventListener('click', () => { goTo(current + 1); resetAuto(); });

  dotsWrap.addEventListener('click', e => {
    const dot = e.target.closest('[data-dot]');
    if(!dot) return;
    goTo(+dot.dataset.dot);
    resetAuto();
  });

  track.addEventListener('click', e => {
    if(e.target.closest('a')) return;
    const slide = e.target.closest('.steam-slider__slide');
    if(!slide) return;
    const link = slide.querySelector('[data-slide-link]');
    if(link) window.location.href = link.getAttribute('href');
  });

  let startX = null, startY = null;
  track.addEventListener('touchstart', e => {
    startX = e.touches[0].clientX;
    startY = e.touches[0].clientY;
  }, { passive:true });

  track.addEventListener('touchend', e => {
    if(startX === null) return;
    const dx = e.changedTouches[0].clientX - startX;
    const dy = e.changedTouches[0].clientY - startY;
    if(Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy)){
      goTo(current + (dx < 0 ? 1 : -1));
      resetAuto();
    }
    startX = startY = null;
  }, { passive:true });

  root.setAttribute('tabindex', '0');
  root.addEventListener('keydown', e => {
    if(e.key === 'ArrowLeft'){ goTo(current - 1); resetAuto(); }
    if(e.key === 'ArrowRight'){ goTo(current + 1); resetAuto(); }
  });

  function resetAuto(){
    clearInterval(timer);
    clearInterval(progressTimer);
    if(progress) progress.style.width = '0%';
    if(!autoplay) return;
    const startedAt = Date.now();
    progressTimer = setInterval(() => {
      const pct = Math.min(((Date.now() - startedAt) / autoplay) * 100, 100);
      if(progress) progress.style.width = pct + '%';
    }, 50);
    timer = setInterval(() => {
      goTo(current + 1);
      resetAuto();
    }, autoplay);
  }
  resetAuto();

  root.addEventListener('mouseenter', () => {
    clearInterval(timer);
    clearInterval(progressTimer);
    if(progress) progress.style.width = '0%';
  });
  root.addEventListener('mouseleave', resetAuto);

  goTo(0);
}

function renderSteamSlider(){
  initSteamSlider({
    root: document.getElementById('steamSlider'),
    slidesData: featuredSlides,
    autoplay: 7000,
    renderSlide: s => `
      <div class="steam-slider__bg" style="background-image:url('${s.bgUrl}');"></div>
      <div class="steam-slider__overlay"></div>
      <div class="steam-slider__content">
        <h3 class="steam-slider__title">${escapeHtml(s.title)}</h3>
        <div class="steam-slider__tags">
          ${s.tags.map(t => `<span class="steam-slider__tag">${escapeHtml(t)}</span>`).join('')}
        </div>
        <p class="steam-slider__meta">${escapeHtml(s.description)}</p>
        <a class="steam-slider__cta" href="${s.link}" data-slide-link>${escapeHtml(s.cta)}</a>
      </div>
    `,
    renderSide: s => {
      if(s.side === 'documents') return renderSideDocuments();
      if(s.side === 'archives')  return renderSideArchives();
      if(s.side === 'geo')       return renderSideGeo();
      return '';
    }
  });
}