(function(){
  var boton=document.querySelector('[data-menu-toggle]');
  var nav=document.querySelector('[data-site-nav]');
  if(!boton||!nav)return;
  function cerrar(){nav.classList.remove('abierto');boton.setAttribute('aria-expanded','false');}
  boton.addEventListener('click',function(){var abierto=nav.classList.toggle('abierto');boton.setAttribute('aria-expanded',String(abierto));});
  nav.addEventListener('click',cerrar);
  document.addEventListener('keydown',function(e){if(e.key==='Escape'){cerrar();boton.focus();}});
}());
