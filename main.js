// Nav scroll
window.addEventListener('scroll', function() {
  document.getElementById('navbar').classList.toggle('scrolled', window.scrollY > 50);
}, { passive: true });

// Mobile menu
document.getElementById('hamburger').addEventListener('click', function() {
  document.getElementById('navLinks').classList.toggle('open');
  document.getElementById('navRight').classList.toggle('open');
});

// Dropdown
document.querySelectorAll('.dd-trigger').forEach(function(btn) {
  btn.addEventListener('click', function(e) {
    e.preventDefault();
    this.parentElement.classList.toggle('open');
  });
});

document.addEventListener('click', function(e) {
  if (!e.target.closest('.dropdown')) {
    document.querySelectorAll('.dropdown').forEach(function(d) {
      d.classList.remove('open');
    });
  }
});
