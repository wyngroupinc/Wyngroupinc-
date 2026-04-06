// Scroll effect
window.addEventListener('scroll', function () {
  var nav = document.querySelector('.navbar');
  if (window.scrollY > 50) {
    nav.classList.add('scrolled');
  } else {
    nav.classList.remove('scrolled');
  }
});

// Mobile menu
var toggle = document.querySelector('.nav-toggle');
if (toggle) {
  toggle.addEventListener('click', function () {
    document.querySelector('.nav-menu').classList.toggle('open');
    document.querySelector('.nav-actions').classList.toggle('open');
  });
}

// Dropdown
var triggers = document.querySelectorAll('.nav-dropdown > a');
for (var i = 0; i < triggers.length; i++) {
  triggers[i].addEventListener('click', function (e) {
    e.preventDefault();
    this.parentElement.classList.toggle('active');
  });
}

document.addEventListener('click', function (e) {
  if (!e.target.closest('.nav-dropdown')) {
    var dd = document.querySelectorAll('.nav-dropdown');
    for (var i = 0; i < dd.length; i++) {
      dd[i].classList.remove('active');
    }
  }
});
