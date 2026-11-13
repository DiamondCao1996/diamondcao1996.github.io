const toggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('#primary-nav');
const mobile = window.matchMedia('(max-width: 700px)');
function setOpen(open) {
  toggle.setAttribute('aria-expanded', String(open));
  toggle.textContent = open ? 'Close menu' : 'Menu';
  nav.hidden = mobile.matches && !open;
}
function syncMenu() { toggle.hidden = !mobile.matches; setOpen(false); }
toggle.addEventListener('click', () => setOpen(toggle.getAttribute('aria-expanded') !== 'true'));
nav.addEventListener('keydown', event => {
  if (event.key === 'Escape' && mobile.matches) { setOpen(false); toggle.focus(); }
});
nav.addEventListener('click', event => {
  if (event.target.closest('a') && mobile.matches) { setOpen(false); toggle.focus(); }
});
mobile.addEventListener('change', syncMenu);
syncMenu();
