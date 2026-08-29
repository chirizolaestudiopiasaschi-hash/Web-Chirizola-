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
  var wa='https://wa.me/542236901258?text=Hola%20Jonathan%2C%20vi%20la%20web%20y%20quer%C3%ADa%20hacer%20una%20consulta.';
  if(path!=='/')return;
  var hero=document.querySelector('.hero-cuerpo');

  if(hero){
    var accionesHero=hero.querySelector('.acciones');
    if(accionesHero && !accionesHero.dataset.jcOptimizado){
      accionesHero.dataset.jcOptimizado='true';
      accionesHero.innerHTML='<a class="btn btn-oro" href="'+wa+'" target="_blank" rel="noopener">Escribir por WhatsApp</a><a class="btn btn-linea" href="/recursos/los-5-numeros-de-tu-negocio">Descargar guía gratuita</a>';
    }

    var bloqueAnterior=document.querySelector('[data-acceso-emprendedores]');
    if(bloqueAnterior)bloqueAnterior.remove();

    if(!document.querySelector('[data-guia-home]')){
      var cont=hero.closest('.envoltorio')||hero.parentElement;
      var bloque=document.createElement('section');
      bloque.setAttribute('data-guia-home','');
      bloque.setAttribute('aria-label','Guía gratuita para emprendedores');
      bloque.style.marginTop='34px';
      bloque.style.border='1px solid var(--ln)';
      bloque.style.background='linear-gradient(135deg, rgba(7,32,63,.92), rgba(4,24,57,.76))';
      bloque.style.padding='clamp(22px,3vw,32px)';
      bloque.style.maxWidth='980px';
      bloque.style.backdropFilter='blur(3px)';
      bloque.style.boxShadow='0 22px 60px rgba(0,0,0,.20)';
      bloque.innerHTML=[
        '<div style="display:grid;grid-template-columns:minmax(190px,270px) 1fr;gap:clamp(22px,4vw,38px);align-items:center">',
          '<a href="/recursos/los-5-numeros-de-tu-negocio" aria-label="Descargar guía gratuita Dejá de administrar a ciegas" style="display:block">',
            '<img src="https://drive.google.com/thumbnail?id=1nl_3wYzBtPh6qZoGle9lBlXrTb4jpqa4&sz=w900" alt="Portada de la guía gratuita Dejá de administrar a ciegas" style="width:100%;border:1px solid rgba(201,162,39,.38);box-shadow:0 18px 45px rgba(0,0,0,.32);background:#fff" onerror="this.onerror=null;this.src=\'/guia-1.jpg\'">',
          '</a>',
          '<div>',
            '<span class="rotulo">Guía gratuita para emprendedores</span>',
            '<h2 style="margin-top:12px;font-size:clamp(1.55rem,3vw,2.25rem);line-height:1.08">Dejá de administrar a ciegas</h2>',
            '<p style="margin-top:16px;color:var(--tx-navy);max-width:62ch">Descargá una guía práctica para ordenar tus números, entender tu costo real y tomar mejores decisiones sobre precios, margen, punto de equilibrio y caja.</p>',
            '<ul style="list-style:none;display:grid;gap:8px;margin-top:18px;color:var(--tx-navy);font-size:15px">',
              '<li style="padding-left:18px;position:relative"><span style="position:absolute;left:0;color:var(--dorado)">—</span>Entendé los números básicos de tu negocio.</li>',
              '<li style="padding-left:18px;position:relative"><span style="position:absolute;left:0;color:var(--dorado)">—</span>Revisá costos ocultos, precios y margen.</li>',
              '<li style="padding-left:18px;position:relative"><span style="position:absolute;left:0;color:var(--dorado)">—</span>Detectá desequilibrios en caja y estructura.</li>',
              '<li style="padding-left:18px;position:relative"><span style="position:absolute;left:0;color:var(--dorado)">—</span>Complementalo con herramientas gratuitas y Radiografía PyME 360.</li>',
            '</ul>',
            '<div class="acciones" style="margin-top:24px">',
              '<a class="btn btn-oro" href="/recursos/los-5-numeros-de-tu-negocio">Descargar guía gratis</a>',
              '<a class="btn btn-linea" href="/herramientas">Herramientas gratuitas</a>',
              '<a class="btn btn-linea" href="/diagnostico-negocio">Radiografía PyME 360</a>',
            '</div>',
          '</div>',
        '</div>'
      ].join('');
      cont.insertBefore(bloque, hero.nextSibling);
      var mq=window.matchMedia('(max-width: 760px)');
      function ajustar(){var gr=bloque.firstElementChild;if(gr)gr.style.gridTemplateColumns=mq.matches?'1fr':'minmax(190px,270px) 1fr';}
      ajustar(); if(mq.addEventListener)mq.addEventListener('change',ajustar);
    }
  }

  var guias=document.querySelector('#proximamente .planes');
  if(guias && !guias.querySelector('[data-guia-gratis-card]')){
    var css=document.createElement('style');
    css.setAttribute('data-guia-gratis-style','');
    css.textContent=[
      '#proximamente .planes{grid-template-columns:repeat(4,minmax(0,1fr))}',
      '#proximamente .plan.gratuita{border-color:rgba(201,162,39,.72);background:linear-gradient(180deg,var(--navy-2),rgba(7,32,63,.72));box-shadow:0 0 0 1px rgba(201,162,39,.16)}',
      '#proximamente .plan.gratuita:hover{background:#0a2a52}',
      '#proximamente .plan.gratuita .precio .monto{color:var(--dorado)}',
      '#proximamente .plan.gratuita .insignia{background:#fff;color:var(--navy)}',
      '@media(max-width:1100px){#proximamente .planes{grid-template-columns:repeat(2,minmax(0,1fr))}}',
      '@media(max-width:700px){#proximamente .planes{grid-template-columns:1fr}#proximamente .plan.gratuita{order:-2}#proximamente .plan.destacado{order:-1}}'
    ].join('\n');
    document.head.appendChild(css);

    var card=document.createElement('article');
    card.className='plan gratuita';
    card.setAttribute('data-guia-gratis-card','');
    card.innerHTML=[
      '<span class="insignia">Gratis</span>',
      '<figure class="tapa"><img src="/portada-guia-administrar-ciegas.jpg" alt="Portada de la guía gratuita Dejá de administrar a ciegas" loading="lazy" onerror="this.onerror=null;this.src=\'/guia-1.jpg\'"></figure>',
      '<span class="estado">Guía gratuita</span>',
      '<h3>Dejá de administrar a ciegas</h3>',
      '<p>Ordená los números básicos de tu negocio: costos, precio, margen, punto de equilibrio y caja.</p>',
      '<div class="precio"><span class="monto">Gratis</span><span class="ahorro">Descarga directa</span></div>',
      '<a class="btn btn-oro plan-btn" href="/recursos/los-5-numeros-de-tu-negocio">Descargar gratis</a>'
    ].join('');
    guias.insertBefore(card, guias.firstElementChild);

    var texto=document.querySelector('#proximamente .cabezal p');
    if(texto){
      texto.innerHTML='Recursos escritos para empezar por tu cuenta: una guía gratuita para ordenar los números básicos del negocio y las guías del Método PyME 360 para trabajar patrimonio, empresa y continuidad. Descarga inmediata.';
    }
    var nota=document.querySelector('#proximamente .nota-compra');
    if(nota){
      nota.innerHTML='La guía gratuita se descarga directamente desde la web. Las guías pagas se entregan automáticamente mediante Hotmart: el precio se convierte a tu moneda local al ingresar al checkout e incluye 7 días de garantía.';
    }
  }

  if(!document.querySelector('[data-resenas-home]')){
    var main=document.querySelector('main')||document.body;
    var reviewUrl='https://g.page/r/CVHV3s8Ne-_DEBM/review';
    var profileUrl='https://g.page/r/CVHV3s8Ne-_DEBM';
    var sec=document.createElement('section');
    sec.className='seccion claro';
    sec.setAttribute('data-resenas-home','');
    sec.setAttribute('aria-label','Reseñas y confianza profesional');
    sec.innerHTML=[
      '<div class="envoltorio">',
        '<div style="display:grid;grid-template-columns:1fr minmax(260px,360px);gap:clamp(28px,5vw,58px);align-items:center">',
          '<div>',
            '<span class="rotulo">Confianza profesional</span>',
            '<h2 style="margin-top:12px;font-size:clamp(1.8rem,3.7vw,2.7rem);line-height:1.12">Reseñas del Estudio Piasaschi</h2>',
            '<div class="regla"></div>',
            '<p style="max-width:68ch">Jonathan Chirizola integra el equipo profesional del Estudio Piasaschi. Podés consultar las reseñas públicas del estudio en Google o dejar tu experiencia para ayudar a otros clientes, emprendedores y PyMEs a decidir con más información.</p>',
            '<div class="acciones" style="margin-top:26px">',
              '<a class="btn btn-oro" href="'+reviewUrl+'" target="_blank" rel="noopener">Dejar una reseña</a>',
              '<a class="btn btn-linea" href="'+profileUrl+'" target="_blank" rel="noopener">Ver reseñas en Google</a>',
            '</div>',
          '</div>',
          '<div style="border:1px solid var(--ln-clara);background:#fff;padding:28px;min-height:220px;display:grid;align-content:center;box-shadow:0 18px 50px rgba(4,24,57,.12)">',
            '<span class="rotulo" style="color:#8a6d10">Google</span>',
            '<div style="font-family:\'Source Serif 4\',Georgia,serif;font-size:clamp(2.1rem,5vw,3.3rem);line-height:1;color:var(--navy);margin-top:14px" data-resena-dato>5,0</div>',
            '<p style="font-family:\'IBM Plex Mono\',monospace;font-size:10.5px;letter-spacing:.18em;text-transform:uppercase;color:rgba(4,24,57,.62);margin-top:12px" data-resena-texto>Calificación pública del estudio en Google</p>',
            '<p style="color:rgba(4,24,57,.72);margin-top:16px" data-resena-detalle>11 opiniones públicas visibles en el perfil del Estudio Piasaschi.</p>',
          '</div>',
        '</div>',
      '</div>'
    ].join('');
    main.appendChild(sec);
    var datos=[
      ['5,0','Calificación pública del estudio en Google','Un dato simple de confianza para quien llega por primera vez.'],
      ['11 opiniones','Experiencias públicas de clientes','El perfil del Estudio Piasaschi reúne reseñas visibles en Google.'],
      ['Tu experiencia','También ayuda a otros clientes','Quien ya trabajó con el estudio puede dejar su reseña desde el botón.']
    ];
    var i=0,dato=sec.querySelector('[data-resena-dato]'),txt=sec.querySelector('[data-resena-texto]'),det=sec.querySelector('[data-resena-detalle]');
    setInterval(function(){i=(i+1)%datos.length;if(dato&&txt&&det){dato.textContent=datos[i][0];txt.textContent=datos[i][1];det.textContent=datos[i][2];}},4200);
    var mq2=window.matchMedia('(max-width: 820px)');
    function ajustarRes(){var gr=sec.querySelector('.envoltorio>div');if(gr)gr.style.gridTemplateColumns=mq2.matches?'1fr':'1fr minmax(260px,360px)';}
    ajustarRes(); if(mq2.addEventListener)mq2.addEventListener('change',ajustarRes);
  }
}());

(function(){
  var path=window.location.pathname.replace(/\/+$/,'')||'/';
  if(path!=='/diagnostico')return;
  if(document.querySelector('[data-diagnosticos-pyme]'))return;
  var intro=document.querySelector('.intro');
  if(!intro)return;
  var sec=document.createElement('section');
  sec.className='tarjeta';
  sec.setAttribute('data-diagnosticos-pyme','');
  sec.setAttribute('aria-label','Herramientas de diagnóstico');
  sec.innerHTML=[
    '<span class="rotulo">Herramientas de diagnóstico</span>',
    '<h2 style="margin-top:12px">Elegí la radiografía adecuada</h2>',
    '<p style="color:var(--tx);max-width:68ch;margin-top:10px">Las dos herramientas son gratuitas y orientativas. Sirven para ordenar información antes de avanzar con una consulta profesional.</p>',
    '<div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-top:24px" data-diagnostico-grid>',
      '<article style="border:1px solid var(--ln-s);padding:22px;background:rgba(11,42,82,.45)">',
        '<span class="rotulo">Patrimonio y sucesiones</span>',
        '<h3 style="margin-top:10px">Radiografía Patrimonial</h3>',
        '<p style="color:var(--tx);margin-top:10px">Para revisar bienes, empresa, pareja, herederos, organización documental y planificación sucesoria.</p>',
        '<a class="btn btn-oro" href="/diagnostico" style="margin-top:18px">Empezar</a>',
      '</article>',
      '<article style="border:1px solid var(--ln-s);padding:22px;background:rgba(11,42,82,.45)">',
        '<span class="rotulo">Emprendedores y PyMEs</span>',
        '<h3 style="margin-top:10px">Radiografía PyME 360</h3>',
        '<p style="color:var(--tx);margin-top:10px">Para detectar si el problema está en números, caja, organización, estrategia comercial o estructura legal.</p>',
        '<a class="btn btn-linea" href="/diagnostico-negocio" style="margin-top:18px">Hacer Radiografía PyME</a>',
      '</article>',
    '</div>'
  ].join('');
  intro.insertAdjacentElement('afterend',sec);
  var mq=window.matchMedia('(max-width: 760px)');
  function ajustar(){var gr=sec.querySelector('[data-diagnostico-grid]');if(gr)gr.style.gridTemplateColumns=mq.matches?'1fr':'1fr 1fr';}
  ajustar(); if(mq.addEventListener)mq.addEventListener('change',ajustar);
}());

(function(){
  if(document.querySelector('.whatsapp-flotante'))return;
  var a=document.createElement('a');
  a.className='whatsapp-flotante';
  a.href='https://wa.me/542236901258?text=Hola%20Jonathan%2C%20vi%20la%20web%20y%20quer%C3%ADa%20hacer%20una%20consulta.';
  a.target='_blank';
  a.rel='noopener';
  a.setAttribute('aria-label','Consultar por WhatsApp');
  a.innerHTML='✆ <span>WhatsApp</span>';
  a.style.position='fixed';
  a.style.right='18px';
  a.style.bottom='18px';
  a.style.zIndex='60';
  a.style.display='inline-flex';
  a.style.alignItems='center';
  a.style.gap='9px';
  a.style.background='#25D366';
  a.style.color='#041839';
  a.style.border='1px solid rgba(255,255,255,.35)';
  a.style.boxShadow='0 12px 32px rgba(0,0,0,.28)';
  a.style.padding='13px 16px';
  a.style.borderRadius='999px';
  a.style.fontFamily='IBM Plex Mono,monospace';
  a.style.fontSize='10.5px';
  a.style.letterSpacing='.12em';
  a.style.textTransform='uppercase';
  a.style.fontWeight='500';
  document.body.appendChild(a);
}());
