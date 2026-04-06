/* Wyn Group Inc */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
}, { passive: true });

function toggleNav() {
  document.getElementById('navCenter').classList.toggle('open');
  document.getElementById('navRight').classList.toggle('open');
}
function closeNav() {
  document.getElementById('navCenter').classList.remove('open');
  document.getElementById('navRight').classList.remove('open');
  document.querySelectorAll('.nav-dropdown').forEach(d => d.classList.remove('open'));
}

/* Dropdown */
document.querySelectorAll('.nav-dropdown > a').forEach(trigger => {
  trigger.addEventListener('click', (e) => {
    e.preventDefault();
    const parent = trigger.parentElement;
    document.querySelectorAll('.nav-dropdown').forEach(d => { if (d !== parent) d.classList.remove('open'); });
    parent.classList.toggle('open');
  });
});
document.addEventListener('click', (e) => {
  if (!e.target.closest('.nav-dropdown')) {
    document.querySelectorAll('.nav-dropdown').forEach(d => d.classList.remove('open'));
  }
});

/* Fade-in */
const observer = new IntersectionObserver((entries) => {
  entries.forEach((e) => {
    if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target); }
  });
}, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });
document.querySelectorAll('.fade-up').forEach((el, i) => {
  el.style.transitionDelay = `${(i % 6) * 0.08}s`;
  observer.observe(el);
});
