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
  bloque.innerHTML='<span class="rotulo">Guía gratuita + herramientas para emprendedores</span><p style="margin-top:12px;color:var(--tx-navy);max-width:58ch">Descargá la guía <strong>Dejá de administrar a ciegas</strong>, usá calculadoras gratuitas de costos, precios, margen, punto de equilibrio y caja, y completá tu Radiografía PyME 360.</p><div class="acciones" style="margin-top:20px"><a class="btn btn-oro" href="/recursos/los-5-numeros-de-tu-negocio">Descargar guía gratis</a><a class="btn btn-linea" href="/herramientas">Herramientas gratuitas</a><a class="btn btn-linea" href="/diagnostico-negocio">Radiografía PyME 360</a></div>';
  var pista=hero.querySelector('.pista-guias');
  if(pista){hero.insertBefore(bloque,pista);}else{hero.appendChild(bloque);}
}());

(function(){
  var path=window.location.pathname.replace(/\/+$/,'')||'/';
  if(path!=='/diagnostico'&&path!=='/diagnostico.html')return;
  if(document.querySelector('[data-diagnosticos-hub]'))return;
  var intro=document.querySelector('.intro');
  if(!intro)return;
  var hub=document.createElement('section');
  hub.className='tarjeta';
  hub.setAttribute('data-diagnosticos-hub','');
  hub.setAttribute('aria-label','Herramientas de diagnóstico');
  hub.innerHTML='<span class="rotulo">Dos herramientas de diagnóstico</span><h2 style="margin:12px 0 10px">Elegí la radiografía que querés completar</h2><p style="color:var(--tx);max-width:62ch;margin-bottom:22px">Podés empezar por tu situación patrimonial o por la economía y organización de tu emprendimiento. Las dos herramientas son gratuitas, orientativas y no reemplazan una consulta profesional.</p><div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(230px,1fr));gap:14px"><a href="/diagnostico" style="border:1px solid var(--ln);padding:20px;background:var(--navy-3);display:block"><span class="rotulo">Personas y patrimonio</span><h3 style="margin:10px 0 8px">Radiografía Patrimonial</h3><p style="color:var(--tx);font-size:15px">Bienes, empresa, pareja, herederos y planificación sucesoria.</p><span style="font-family:IBM Plex Mono,monospace;font-size:10px;letter-spacing:.16em;text-transform:uppercase;color:var(--dorado);display:block;margin-top:16px">Completar ahora →</span></a><a href="/diagnostico-negocio" style="border:1px solid var(--ln);padding:20px;background:var(--navy-3);display:block"><span class="rotulo">Emprendedores y PyMEs</span><h3 style="margin:10px 0 8px">Radiografía PyME 360</h3><p style="color:var(--tx);font-size:15px">Números, caja, organización, estrategia comercial y estructura legal.</p><span style="font-family:IBM Plex Mono,monospace;font-size:10px;letter-spacing:.16em;text-transform:uppercase;color:var(--dorado);display:block;margin-top:16px">Completar ahora →</span></a></div>';
  intro.parentNode.insertBefore(hub,intro.nextSibling);
}());

(function(){
  var path=window.location.pathname.replace(/\/+$/,'')||'/';
  if(path!=='/')return;
  if(document.querySelector('[data-resenas-google-home]'))return;
  var main=document.querySelector('main');
  if(!main)return;
  var reviewUrl='https://g.page/r/CVHV3s8Ne-_DEBM/review';
  var profileUrl='https://g.page/r/CVHV3s8Ne-_DEBM';
  var items=[
    {k:'5,0 en Google',t:'Reseñas públicas del Estudio Piasaschi',d:'Experiencias reales de clientes que ya trabajaron con el equipo profesional.'},
    {k:'11 opiniones',t:'Confianza construida con trabajo profesional',d:'Las reseñas se consultan directamente en Google para mantener transparencia.'},
    {k:'Tu experiencia ayuda',t:'Dejá una reseña y ayudá a otros a decidir',d:'Una opinión breve puede orientar a emprendedores, PyMEs y clientes que buscan asesoramiento.'}
  ];
  var sec=document.createElement('section');
  sec.className='seccion';
  sec.setAttribute('data-resenas-google-home','');
  sec.setAttribute('aria-label','Reseñas y confianza profesional');
  sec.innerHTML='<div class="env"><div style="border:1px solid var(--ln);background:rgba(7,32,63,.72);padding:clamp(26px,4vw,40px);display:grid;grid-template-columns:minmax(0,1.1fr) minmax(260px,.9fr);gap:28px;align-items:center"><div><span class="rotulo">Confianza profesional</span><h2 style="margin-top:12px">Reseñas del Estudio Piasaschi</h2><p style="max-width:68ch">Jonathan Chirizola integra el equipo profesional del Estudio Piasaschi. Las reseñas públicas del estudio pueden consultarse en Google y ayudan a que otros clientes, emprendedores y PyMEs decidan con más información.</p><div class="acciones" style="margin-top:22px"><a class="btn btn-oro" href="'+reviewUrl+'" target="_blank" rel="noopener">Dejar una reseña</a><a class="btn btn-linea" href="'+profileUrl+'" target="_blank" rel="noopener">Ver reseñas en Google</a></div></div><div style="border:1px solid var(--ln);background:var(--navy-2);padding:24px;min-height:190px" data-resena-card><span class="rotulo" data-resena-k>'+items[0].k+'</span><h3 style="margin:12px 0 10px" data-resena-t>'+items[0].t+'</h3><p style="color:var(--tx);font-size:15px" data-resena-d>'+items[0].d+'</p><div style="margin-top:18px;color:var(--dorado);font-family:IBM Plex Mono,monospace;font-size:14px;letter-spacing:.08em">★★★★★</div></div></div></div>';
  main.appendChild(sec);
  var i=0;
  window.setInterval(function(){
    var card=sec.querySelector('[data-resena-card]');
    if(!card)return;
    i=(i+1)%items.length;
    sec.querySelector('[data-resena-k]').textContent=items[i].k;
    sec.querySelector('[data-resena-t]').textContent=items[i].t;
    sec.querySelector('[data-resena-d]').textContent=items[i].d;
  },4200);
}());

(function(){
  if(document.querySelector('.whatsapp-flotante'))return;
  var a=document.createElement('a');
  a.className='whatsapp-flotante';
  a.href='https://wa.me/542236901258?text=Hola%20Jonathan%2C%20vi%20la%20web%20y%20quer%C3%ADa%20hacer%20una%20consulta.';
  a.target='_blank';a.rel='noopener';a.setAttribute('aria-label','Consultar por WhatsApp');
  a.innerHTML='✆ <span>WhatsApp</span>';
  a.style.position='fixed';a.style.right='18px';a.style.bottom='18px';a.style.zIndex='60';a.style.display='inline-flex';a.style.alignItems='center';a.style.gap='9px';a.style.background='#25D366';a.style.color='#041839';a.style.border='1px solid rgba(255,255,255,.35)';a.style.boxShadow='0 12px 32px rgba(0,0,0,.28)';a.style.padding='13px 16px';a.style.borderRadius='999px';a.style.fontFamily='IBM Plex Mono,monospace';a.style.fontSize='10.5px';a.style.letterSpacing='.12em';a.style.textTransform='uppercase';a.style.fontWeight='500';
  document.body.appendChild(a);
}());
