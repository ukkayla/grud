/* ==================== НАВИГАЦИЯ ПО ДОКУМЕНТАМ ==================== */
document.addEventListener('click', e => {
  const navLink = e.target.closest('[data-nav]');
  if(navLink){
    e.preventDefault();
    goTo(navLink.dataset.nav);
    return;
  }
  const card = e.target.closest('.card[data-doc-id]');
  if(card){ goTo('detail/' + card.dataset.docId); }
});

document.addEventListener('keydown', e => {
  if(e.key === 'Enter' || e.key === ' '){
    const card = e.target.closest('.card[data-doc-id]');
    if(card){ e.preventDefault(); goTo('detail/' + card.dataset.docId); }
  }
});

/* Навигация по главному меню */
document.addEventListener('DOMContentLoaded', () => {
  const nav = document.getElementById('mainNav');
  if(nav){
    nav.addEventListener('click', e => {
      const btn = e.target.closest('.nav__link');
      if(btn) goTo(btn.dataset.page);
    });
  }
});