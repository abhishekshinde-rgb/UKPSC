const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');
menuToggle?.addEventListener('click', () => {
  const open = navLinks.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(open));
});

const filterButtons = [...document.querySelectorAll('.filter-button')];
const noticeItems = [...document.querySelectorAll('.notice-item')];
const emptyState = document.getElementById('emptyState');
filterButtons.forEach(button => button.addEventListener('click', () => {
  filterButtons.forEach(item => item.classList.toggle('active', item === button));
  const filter = button.dataset.filter;
  let visible = 0;
  noticeItems.forEach(item => {
    const show = filter === 'all' || item.dataset.category === filter;
    item.hidden = !show;
    if (show) visible++;
  });
  emptyState.hidden = visible !== 0;
}));

document.getElementById('siteSearch')?.addEventListener('submit', event => {
  event.preventDefault();
  const query = document.getElementById('searchInput').value.trim().toLowerCase();
  if (!query) {
    document.getElementById('searchInput').focus();
    return;
  }
  let visible = 0;
  filterButtons.forEach(item => item.classList.toggle('active', item.dataset.filter === 'all'));
  noticeItems.forEach(item => {
    const show = item.textContent.toLowerCase().includes(query);
    item.hidden = !show;
    if (show) visible++;
  });
  emptyState.textContent = visible ? `Showing ${visible} matching notice${visible === 1 ? '' : 's'} in this sample view.` : 'No matching notices in this sample view. Try a different keyword.';
  emptyState.hidden = visible !== 0;
  document.getElementById('notices').scrollIntoView({behavior: 'smooth'});
});

document.getElementById('contrastToggle')?.addEventListener('click', event => {
  const active = document.body.classList.toggle('high-contrast');
  event.currentTarget.setAttribute('aria-pressed', String(active));
});
let fontSize = 16;
function applyFontSize() {
  document.documentElement.style.setProperty('--base-font', `${fontSize}px`);
}
document.getElementById('fontUp')?.addEventListener('click', () => { fontSize = Math.min(20, fontSize + 1); applyFontSize(); });
document.getElementById('fontDown')?.addEventListener('click', () => { fontSize = Math.max(14, fontSize - 1); applyFontSize(); });
document.getElementById('fontReset')?.addEventListener('click', () => { fontSize = 16; applyFontSize(); });
document.getElementById('languageToggle')?.addEventListener('click', () => {
  alert('This is an English-language design concept. A production version should provide complete Hindi/English content through the CMS.');
});
