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
  var WA='https://wa.me/542236901258?text=Hola%20Jonathan%2C%20vi%20la%20web%20y%20quer%C3%ADa%20hacer%20una%20consulta.';
  var COVER='/portada-guia-administrar-ciegas.jpg?v=3';

  function addStyle(id,css){
    if(document.getElementById(id))return;
    var s=document.createElement('style');
    s.id=id;
    s.textContent=css;
    document.head.appendChild(s);
  }

  function compactarHome(){
    var path=window.location.pathname.replace(/\/+$/,'')||'/';
    if(path!=='/')return;

    addStyle('jc-home-correcciones-mobile',[
      '[data-guia-home]{display:none!important}',
      '[data-acceso-emprendedores]{display:none!important}',
      '.jc-accesos-home{margin-top:26px;border:1px solid var(--ln);background:rgba(7,32,63,.72);padding:clamp(16px,2.4vw,22px);box-shadow:0 18px 48px rgba(0,0,0,.14)}',
      '.jc-accesos-home .jc-accesos-grid{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:10px}',
      '.jc-accesos-home a{display:block;border:1px solid rgba(201,162,39,.24);padding:14px 14px;min-height:96px;background:rgba(4,24,57,.55);transition:background .22s,border-color .22s,transform .22s}',
      '.jc-accesos-home a:hover{background:rgba(201,162,39,.12);border-color:rgba(201,162,39,.62);transform:translateY(-1px)}',
      '.jc-accesos-home b{display:block;font-family:\'Source Serif 4\',Georgia,serif;font-size:1.02rem;line-height:1.08;color:#fff}',
      '.jc-accesos-home span{display:block;margin-top:7px;font-size:13px;line-height:1.35;color:var(--tx-navy)}',
      '@media(max-width:900px){.jc-accesos-home .jc-accesos-grid{grid-template-columns:repeat(2,minmax(0,1fr))}.jc-accesos-home a{min-height:86px}}',
      '@media(max-width:560px){.jc-accesos-home{margin-top:18px;padding:14px}.jc-accesos-home .jc-accesos-grid{grid-template-columns:1fr 1fr;gap:8px}.jc-accesos-home a{padding:12px 10px;min-height:auto}.jc-accesos-home b{font-size:.95rem}.jc-accesos-home span{font-size:12px}}',
      '#proximamente .cabezal{margin-bottom:28px}',
      '#proximamente .planes{grid-template-columns:repeat(4,minmax(0,1fr))!important;gap:16px!important;align-items:stretch!important}',
      '#proximamente .plan{display:flex!important;flex-direction:column!important;min-height:0!important;overflow:hidden!important}',
      '#proximamente .plan .tapa{width:100%!important;aspect-ratio:4/3!important;max-height:245px!important;margin:0 0 18px!important;background:#061b35!important;border:1px solid rgba(201,162,39,.28)!important;overflow:hidden!important;display:block!important}',
      '#proximamente .plan .tapa img{width:100%!important;height:100%!important;display:block!important;object-fit:cover!important;object-position:center top!important;background:#061b35!important}',
      '#proximamente .plan.gratuita{border-color:rgba(201,162,39,.72)!important;background:linear-gradient(180deg,var(--navy-2),rgba(7,32,63,.72))!important;box-shadow:0 0 0 1px rgba(201,162,39,.16)!important}',
      '#proximamente .plan.gratuita .precio .monto{color:var(--dorado)!important}',
      '#proximamente .plan.gratuita .insignia{background:var(--dorado)!important;color:var(--navy)!important}',
      '#proximamente .plan h3{font-size:clamp(1.35rem,2.2vw,1.7rem)!important;line-height:1.12!important}',
      '#proximamente .plan p{font-size:15px!important;line-height:1.5!important}',
      '#proximamente .plan .precio{margin-top:auto!important}',
      '@media(max-width:1120px){#proximamente .planes{grid-template-columns:repeat(2,minmax(0,1fr))!important}}',
      '@media(max-width:700px){#proximamente .planes{grid-template-columns:1fr!important;gap:18px!important}#proximamente .plan{padding:22px!important}#proximamente .plan .tapa{aspect-ratio:16/10!important;max-height:220px!important;margin-bottom:16px!important}#proximamente .plan.gratuita{order:-4}#proximamente .plan.destacado{order:-1}}',
      '[data-resenas-home] .jc-resenas-grid{display:grid;grid-template-columns:minmax(0,1fr) minmax(260px,360px);gap:clamp(28px,5vw,58px);align-items:center}',
      '[data-resenas-home] .jc-resenas-texto p{max-width:68ch}',
      '[data-resenas-home] .jc-resenas-card{border:1px solid var(--ln-clara);background:#fff;padding:28px;min-height:220px;display:grid;align-content:center;box-shadow:0 18px 50px rgba(4,24,57,.12)}',
      '@media(max-width:820px){[data-resenas-home] .jc-resenas-grid{display:block!important}[data-resenas-home] .jc-resenas-texto p{max-width:100%!important}[data-resenas-home] .jc-resenas-card{margin-top:24px!important;width:100%!important;min-height:0!important;padding:22px!important}[data-resenas-home] h2{font-size:clamp(1.9rem,10vw,2.55rem)!important;line-height:1.05!important}}',
      '@media(max-width:430px){[data-resenas-home]{padding-top:64px!important;padding-bottom:74px!important}[data-resenas-home] .envoltorio{padding-left:22px!important;padding-right:22px!important}}'
    ].join('\n'));

    var hero=document.querySelector('.hero-cuerpo');
    if(hero){
      var accionesHero=hero.querySelector('.acciones');
      if(accionesHero && !accionesHero.dataset.jcOptimizado){
        accionesHero.dataset.jcOptimizado='true';
        accionesHero.innerHTML='<a class="btn btn-oro" href="'+WA+'" target="_blank" rel="noopener">Escribir por WhatsApp</a><a class="btn btn-linea" href="/recursos/los-5-numeros-de-tu-negocio">Descargar guía gratuita</a>';
      }
      if(!document.querySelector('.jc-accesos-home')){
        var cont=hero.closest('.envoltorio')||hero.parentElement;
        var accesos=document.createElement('section');
        accesos.className='jc-accesos-home';
        accesos.setAttribute('aria-label','Accesos rápidos a recursos para empresas y PyMEs');
        accesos.innerHTML='\
          <span class="rotulo">Recursos para emprendedores y PyMEs</span>\
          <div class="jc-accesos-grid" style="margin-top:14px">\
            <a href="/recursos/los-5-numeros-de-tu-negocio"><b>Guía gratuita</b><span>Ordená números, costos, precios y caja.</span></a>\
            <a href="/#proximamente"><b>E-books</b><span>Guías de patrimonio, empresa y continuidad.</span></a>\
            <a href="/herramientas"><b>Herramientas</b><span>Calculadoras para decidir con datos.</span></a>\
            <a href="/diagnostico-negocio"><b>Radiografía PyME 360</b><span>Diagnóstico inicial del negocio.</span></a>\
          </div>';
        cont.insertBefore(accesos,hero.nextSibling);
      }
    }

    var guias=document.querySelector('#proximamente .planes');
    if(guias){
      if(!guias.querySelector('[data-guia-gratis-card]')){
        var card=document.createElement('article');
        card.className='plan gratuita';
        card.setAttribute('data-guia-gratis-card','');
        card.innerHTML='\
          <span class="insignia">Gratis</span>\
          <figure class="tapa"><img src="'+COVER+'" alt="Portada de la guía gratuita Dejá de administrar a ciegas" loading="lazy" onerror="this.onerror=null;this.src=\'/guia-1.jpg\'"></figure>\
          <span class="estado">Guía gratuita</span>\
          <h3>Dejá de administrar a ciegas</h3>\
          <p>Ordená los números básicos de tu negocio: costos, precio, margen, punto de equilibrio y caja.</p>\
          <div class="precio"><span class="monto">Gratis</span><span class="ahorro">Descarga directa</span></div>\
          <a class="btn btn-oro plan-btn" href="/recursos/los-5-numeros-de-tu-negocio">Descargar gratis</a>';
        guias.insertBefore(card,guias.firstElementChild);
      }
      var cabezal=document.querySelector('#proximamente .cabezal');
      if(cabezal){
        var rot=cabezal.querySelector('.rotulo');
        var h=cabezal.querySelector('h2');
        var p=cabezal.querySelector('p');
        if(rot)rot.textContent='Biblioteca PyME 360';
        if(h)h.textContent='Guías y recursos para ordenar tu negocio';
        if(p)p.textContent='En un solo lugar: guía gratuita, e-books, pack completo, herramientas y diagnóstico para trabajar números, estructura jurídica, patrimonio y continuidad empresaria.';
      }
      var nota=document.querySelector('#proximamente .nota-compra');
      if(nota){nota.textContent='La guía gratuita se descarga directamente desde la web. Las guías pagas se entregan mediante Hotmart y el precio se convierte a la moneda local al ingresar al checkout.';}
    }
  }

  function resenasHome(){
    var path=window.location.pathname.replace(/\/+$/,'')||'/';
    if(path!=='/')return;
    if(document.querySelector('[data-resenas-home]'))return;
    var main=document.querySelector('main')||document.body;
    var sec=document.createElement('section');
    sec.className='seccion claro';
    sec.setAttribute('data-resenas-home','');
    sec.setAttribute('aria-label','Reseñas y confianza profesional');
    var reviewUrl='https://g.page/r/CVHV3s8Ne-_DEBM/review';
    var profileUrl='https://g.page/r/CVHV3s8Ne-_DEBM';
    sec.innerHTML='\
      <div class="envoltorio">\
        <div class="jc-resenas-grid">\
          <div class="jc-resenas-texto">\
            <span class="rotulo">Confianza profesional</span>\
            <h2 style="margin-top:12px;font-size:clamp(1.8rem,3.7vw,2.7rem);line-height:1.12">Reseñas del Estudio Piasaschi</h2>\
            <div class="regla"></div>\
            <p>Jonathan Chirizola integra el equipo profesional del Estudio Piasaschi. Podés consultar las reseñas públicas del estudio en Google o dejar tu experiencia para ayudar a otros clientes, emprendedores y PyMEs a decidir con más información.</p>\
            <div class="acciones" style="margin-top:26px">\
              <a class="btn btn-oro" href="'+reviewUrl+'" target="_blank" rel="noopener">Dejar una reseña</a>\
              <a class="btn btn-linea" href="'+profileUrl+'" target="_blank" rel="noopener">Ver reseñas en Google</a>\
            </div>\
          </div>\
          <div class="jc-resenas-card">\
            <span class="rotulo" style="color:#8a6d10">Google</span>\
            <div style="font-family:\'Source Serif 4\',Georgia,serif;font-size:clamp(2.1rem,5vw,3.3rem);line-height:1;color:var(--navy);margin-top:14px" data-resena-dato>5,0</div>\
            <p style="font-family:\'IBM Plex Mono\',monospace;font-size:10.5px;letter-spacing:.18em;text-transform:uppercase;color:rgba(4,24,57,.62);margin-top:12px" data-resena-texto>Calificación pública del estudio en Google</p>\
            <p style="color:rgba(4,24,57,.72);margin-top:16px" data-resena-detalle>11 opiniones públicas visibles en el perfil del Estudio Piasaschi.</p>\
          </div>\
        </div>\
      </div>';
    main.appendChild(sec);
    var datos=[['5,0','Calificación pública del estudio en Google','Un dato simple de confianza para quien llega por primera vez.'],['11 opiniones','Experiencias públicas de clientes','El perfil del Estudio Piasaschi reúne reseñas visibles en Google.'],['Tu experiencia','También ayuda a otros clientes','Quien ya trabajó con el estudio puede dejar su reseña desde el botón.']];
    var i=0,dato=sec.querySelector('[data-resena-dato]'),txt=sec.querySelector('[data-resena-texto]'),det=sec.querySelector('[data-resena-detalle]');
    setInterval(function(){i=(i+1)%datos.length;if(dato&&txt&&det){dato.textContent=datos[i][0];txt.textContent=datos[i][1];det.textContent=datos[i][2];}},4200);
  }

  function diagnostico(){
    var path=window.location.pathname.replace(/\/+$/,'')||'/';
    if(path!=='/diagnostico')return;
    if(document.querySelector('[data-diagnosticos-pyme]'))return;
    var intro=document.querySelector('.intro');
    if(!intro)return;
    var sec=document.createElement('section');
    sec.className='tarjeta';
    sec.setAttribute('data-diagnosticos-pyme','');
    sec.setAttribute('aria-label','Herramientas de diagnóstico');
    sec.innerHTML='\
      <span class="rotulo">Herramientas de diagnóstico</span>\
      <h2 style="margin-top:12px">Elegí la radiografía adecuada</h2>\
      <p style="color:var(--tx);max-width:68ch;margin-top:10px">Las dos herramientas son gratuitas y orientativas. Sirven para ordenar información antes de avanzar con una consulta profesional.</p>\
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-top:24px" data-diagnostico-grid>\
        <article style="border:1px solid var(--ln-s);padding:22px;background:rgba(11,42,82,.45)"><span class="rotulo">Patrimonio y sucesiones</span><h3 style="margin-top:10px">Radiografía Patrimonial</h3><p style="color:var(--tx);margin-top:10px">Para revisar bienes, empresa, pareja, herederos, organización documental y planificación sucesoria.</p><a class="btn btn-oro" href="/diagnostico" style="margin-top:18px">Empezar</a></article>\
        <article style="border:1px solid var(--ln-s);padding:22px;background:rgba(11,42,82,.45)"><span class="rotulo">Emprendedores y PyMEs</span><h3 style="margin-top:10px">Radiografía PyME 360</h3><p style="color:var(--tx);margin-top:10px">Para detectar si el problema está en números, caja, organización, estrategia comercial o estructura legal.</p><a class="btn btn-linea" href="/diagnostico-negocio" style="margin-top:18px">Hacer Radiografía PyME</a></article>\
      </div>';
    intro.insertAdjacentElement('afterend',sec);
    var mq=window.matchMedia('(max-width:760px)');
    function ajustar(){var gr=sec.querySelector('[data-diagnostico-grid]');if(gr)gr.style.gridTemplateColumns=mq.matches?'1fr':'1fr 1fr';}
    ajustar(); if(mq.addEventListener)mq.addEventListener('change',ajustar);
  }

  function whatsapp(){
    if(document.querySelector('.whatsapp-flotante'))return;
    addStyle('jc-whatsapp-style',[
      '.whatsapp-flotante{position:fixed;right:18px;bottom:calc(18px + env(safe-area-inset-bottom,0px));z-index:60;display:inline-flex;align-items:center;justify-content:center;gap:9px;min-width:58px;height:58px;padding:0 18px;border-radius:999px;background:#25D366;color:#fff!important;border:3px solid rgba(255,255,255,.92);box-shadow:0 12px 30px rgba(0,0,0,.28);font-family:\'IBM Plex Mono\',monospace;font-size:10.5px;letter-spacing:.12em;text-transform:uppercase;font-weight:600;transition:transform .2s,box-shadow .2s}',
      '.whatsapp-flotante:hover{transform:translateY(-2px);box-shadow:0 16px 36px rgba(0,0,0,.32)}',
      '.whatsapp-flotante svg{width:29px;height:29px;display:block;fill:#fff}',
      '@media(max-width:760px){.whatsapp-flotante{width:56px;height:56px;min-width:56px;padding:0;right:16px;bottom:calc(16px + env(safe-area-inset-bottom,0px))}.whatsapp-flotante span{display:none!important}.whatsapp-flotante svg{width:28px;height:28px}}'
    ].join('\n'));
    var a=document.createElement('a');
    a.className='whatsapp-flotante';
    a.href=WA;
    a.target='_blank';
    a.rel='noopener';
    a.setAttribute('aria-label','Consultar por WhatsApp');
    a.innerHTML='<svg viewBox="0 0 32 32" aria-hidden="true"><path d="M16.04 3.2A12.71 12.71 0 0 0 5.16 22.5L3.6 28.8l6.45-1.52a12.72 12.72 0 1 0 5.99-24.08Zm0 2.35a10.36 10.36 0 0 1 8.78 15.86 10.36 10.36 0 0 1-13.98 3.55l-.46-.27-3.54.83.86-3.43-.3-.48A10.36 10.36 0 0 1 16.04 5.55Zm-4.3 5.63c-.24 0-.62.09-.95.44-.33.36-1.25 1.22-1.25 2.98s1.28 3.46 1.46 3.7c.18.24 2.48 3.96 6.1 5.39 3.01 1.19 3.63.95 4.28.89.65-.06 2.1-.86 2.4-1.69.3-.83.3-1.54.21-1.69-.09-.15-.33-.24-.68-.42-.36-.18-2.1-1.04-2.43-1.16-.33-.12-.56-.18-.8.18-.24.36-.92 1.16-1.13 1.4-.21.24-.42.27-.77.09-.36-.18-1.5-.55-2.86-1.76-1.06-.94-1.77-2.1-1.98-2.46-.21-.36-.02-.55.16-.73.16-.16.36-.42.53-.63.18-.21.24-.36.36-.59.12-.24.06-.44-.03-.62-.09-.18-.8-1.94-1.1-2.66-.29-.7-.59-.61-.8-.62l-.68-.01Z"/></svg><span>WhatsApp</span>';
    document.body.appendChild(a);
  }

  compactarHome();
  resenasHome();
  diagnostico();
  whatsapp();
}());
