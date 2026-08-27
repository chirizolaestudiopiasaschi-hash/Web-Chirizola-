(function(){
  var boton=document.querySelector('[data-menu-toggle]');
  var nav=document.querySelector('[data-site-nav]');
  if(!boton||!nav)return;
  function cerrar(){nav.classList.remove('abierto');boton.setAttribute('aria-expanded','false');}
  boton.addEventListener('click',function(){var abierto=nav.classList.toggle('abierto');boton.setAttribute('aria-expanded',String(abierto));});
  nav.addEventListener('click',cerrar);
  document.addEventListener('keydown',function(e){if(e.key==='Escape'){cerrar();boton.focus();}});
}());

(function(){
  var path=window.location.pathname.replace(/\/+$/,'')||'/';
  if(path!=='/')return;
  var hero=document.querySelector('.hero-cuerpo');
  if(!hero||document.querySelector('[data-acceso-emprendedores]'))return;
  var bloque=document.createElement('section');
  bloque.setAttribute('data-acceso-emprendedores','');
  bloque.setAttribute('aria-label','Accesos rápidos para emprendedores');
  bloque.style.marginTop='34px';
  bloque.style.border='1px solid var(--ln)';
  bloque.style.background='rgba(7,32,63,.72)';
  bloque.style.padding='24px 22px';
  bloque.style.maxWidth='680px';
  bloque.style.backdropFilter='blur(3px)';
  bloque.innerHTML='\
    <span class="rotulo">Recursos gratuitos para emprendedores</span>\
    <p style="margin-top:12px;color:var(--tx-navy);max-width:58ch">Accedé rápido a la guía para emprendedores, herramientas gratuitas de costos, precios, margen, punto de equilibrio y caja, y a la Radiografía PyME 360.</p>\
    <div class="acciones" style="margin-top:20px">\
      <a class="btn btn-oro" href="/herramientas">Herramientas gratuitas</a>\
      <a class="btn btn-linea" href="/recursos/los-5-numeros-de-tu-negocio">Guía emprendedores</a>\
      <a class="btn btn-linea" href="/diagnostico-negocio">Radiografía PyME 360</a>\
    </div>\
  ';
  var pista=hero.querySelector('.pista-guias');
  if(pista){hero.insertBefore(bloque,pista);}else{hero.appendChild(bloque);}
}());
