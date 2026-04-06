const nb=document.getElementById('navbar');
window.addEventListener('scroll',()=>{nb.classList.toggle('scrolled',window.scrollY>50)},{passive:true});
document.getElementById('hamburger').addEventListener('click',()=>{document.getElementById('navCenter').classList.toggle('open');document.getElementById('navRight').classList.toggle('open')});
document.querySelectorAll('.dd-trigger').forEach(t=>{t.addEventListener('click',e=>{e.preventDefault();t.parentElement.classList.toggle('open')})});
document.addEventListener('click',e=>{if(!e.target.closest('.nav-dropdown'))document.querySelectorAll('.nav-dropdown').forEach(d=>d.classList.remove('open'))});
