/* ==================== БЛОК «ОЦИФРОВАННЫЕ ОБРАЗЫ» ==================== */
function renderDigitizedList(){
  const items = documents.slice(0, 9);
  const perPage = 3;
  const pages = [];
  for(let i = 0; i < items.length; i += perPage){
    pages.push(items.slice(i, i + perPage));
  }

  el('digitizedList').innerHTML = pages.map((page, idx) => `
    <div class="digitized-page${idx === 0 ? ' digitized-page--active' : ''}" data-page="${idx}">
      ${page.map(d => `
        <a class="digitized-item" href="#detail/${d.n}" title="${escapeHtml(d.t)}">
          <div class="digitized-item__img"></div>
          <div>
            <div class="digitized-item__title">${escapeHtml(d.t)}</div>
            <div class="digitized-item__meta">${escapeHtml(d.s)} · ${escapeHtml(d.d)}</div>
          </div>
        </a>
      `).join('')}
    </div>
  `).join('');

  el('digitizedDots').innerHTML = pages.map((_, idx) => `
    <span${idx === 0 ? ' class="active"' : ''} data-page="${idx}"></span>
  `).join('');
}

document.addEventListener('click', e => {
  const dot = e.target.closest('#digitizedDots span');
  if(!dot) return;
  const pageIdx = dot.dataset.page;
  document.querySelectorAll('#digitizedList .digitized-page').forEach(p => {
    p.classList.toggle('digitized-page--active', p.dataset.page === pageIdx);
  });
  document.querySelectorAll('#digitizedDots span').forEach(s => {
    s.classList.toggle('active', s === dot);
  });
});