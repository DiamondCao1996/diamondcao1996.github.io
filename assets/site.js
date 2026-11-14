const toggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('#primary-nav');
const mobile = window.matchMedia('(max-width: 700px)');
function setOpen(open) {
  toggle.setAttribute('aria-expanded', String(open));
  toggle.textContent = open ? toggle.dataset.labelClose : toggle.dataset.labelOpen;
  nav.hidden = mobile.matches && !open;
}
function syncMenu() { toggle.hidden = !mobile.matches; setOpen(false); }
toggle.addEventListener('click', () => setOpen(toggle.getAttribute('aria-expanded') !== 'true'));
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && mobile.matches && toggle.getAttribute('aria-expanded') === 'true') {
    setOpen(false);
    toggle.focus();
  }
});
nav.addEventListener('click', event => {
  const link = event.target.closest('a');
  if (!link || !mobile.matches) return;
  const destination = new URL(link.href);
  setOpen(false);
  // Keep keyboard focus at the section, so Tab continues through its content.
  if (destination.pathname === location.pathname && destination.hash) {
    const section = document.getElementById(destination.hash.slice(1));
    if (section) section.focus({ preventScroll: true });
  }
});
mobile.addEventListener('change', syncMenu);
window.addEventListener('pageshow', syncMenu);
syncMenu();

// Carry section context only between language versions of the homepage.
const homePaths = new Set(['/', '/zh/', '/sv/']);
function syncLanguageLinks() {
  if (!homePaths.has(location.pathname)) return;
  document.querySelectorAll('.lang-switcher a').forEach(link => {
    const destination = new URL(link.href);
    if (homePaths.has(destination.pathname)) {
      destination.hash = location.hash;
      link.href = destination.pathname + destination.hash;
    }
  });
}
window.addEventListener('hashchange', syncLanguageLinks);
window.addEventListener('pageshow', syncLanguageLinks);
syncLanguageLinks();
