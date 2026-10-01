(function(){
  function ajustarNavegacion(){
    var nav=document.querySelector('[data-site-nav]');
    if(!nav)return;
    var links=Array.prototype.slice.call(nav.querySelectorAll('a'));
    var emprendedores=links.find(function(a){return (a.getAttribute('href')||'').replace(/\/+$/,'')==='/emprendedores';});
    if(emprendedores){
      emprendedores.textContent='Método PyME 360';
      emprendedores.setAttribute('aria-label','Conocer Método PyME 360');
    }
    var quien=links.find(function(a){return (a.textContent||'').trim().toLowerCase()==='quién soy';});
    if(!quien){
      quien=document.createElement('a');
      quien.href='/#perfil';
      quien.textContent='Quién soy';
      var servicios=links.find(function(a){return (a.getAttribute('href')||'').indexOf('#servicios')>=0;});
      if(servicios&&servicios.nextSibling)nav.insertBefore(quien,servicios.nextSibling);else if(servicios)nav.appendChild(quien);else nav.insertBefore(quien,nav.firstChild);
    }
  }

  function ajustarMetodoHome(){
    var path=window.location.pathname.replace(/\/+$/,'')||'/';
    if(path!=='/')return;
    var metodo=document.querySelector('.metodo');
    if(!metodo)return;
    var titulo=metodo.querySelector('h2 a');
    if(titulo)titulo.href='/emprendedores';
    var boton=metodo.querySelector('.btn');
    if(boton){boton.href='/emprendedores';boton.textContent='Conocer Método PyME 360';}
  }

  ajustarNavegacion();
  ajustarMetodoHome();

  var actual=document.createElement('script');
  actual.src='/assets/site-nav-current.js?v=20261001-1';
  document.head.appendChild(actual);
}());
