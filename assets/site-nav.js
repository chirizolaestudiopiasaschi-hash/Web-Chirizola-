(function(){
  function pathActual(){return window.location.pathname.replace(/\/+$/,'')||'/';}

  function navegacion(){
    var nav=document.querySelector('[data-site-nav]');
    if(!nav)return;
    var path=pathActual();
    var items=[
      ['Inicio','/'],
      ['Servicios','/#servicios'],
      ['Sucesiones','/servicios/sucesiones'],
      ['Método PyME 360','/metodo-pyme-360'],
      ['Quién soy','/#perfil'],
      ['Blog','/blog'],
      ['Contacto','/#contacto']
    ];
    nav.innerHTML='';
    items.forEach(function(it){
      var a=document.createElement('a');a.href=it[1];a.textContent=it[0];
      if((it[1]==='/'&&path==='/')||(it[1]==='/blog'&&path.indexOf('/blog')===0)||(it[1]==='/servicios/sucesiones'&&path==='/servicios/sucesiones')||(it[1]==='/metodo-pyme-360'&&path==='/metodo-pyme-360'))a.setAttribute('aria-current','page');
      nav.appendChild(a);
    });
  }

  function home(){
    if(pathActual()!=='/')return;
    var mapa=document.getElementById('mapa');
    var perfil=document.getElementById('perfil');
    var secciones=Array.prototype.slice.call(document.querySelectorAll('section'));
    var areas=secciones.find(function(s){var r=s.querySelector('.rotulo');return r&&(r.textContent||'').trim()==='Áreas de trabajo';});
    if(mapa&&perfil)mapa.parentNode.insertBefore(perfil,mapa);
    if(mapa&&areas)mapa.parentNode.insertBefore(areas,mapa);

    var caps=Array.prototype.slice.call(document.querySelectorAll('.capsula'));
    caps.forEach(function(a){var t=(a.textContent||'').trim();if(t==='Sucesiones')a.href='/servicios/sucesiones';if(t==='Patrimonio')a.href='/servicios/planificacion-patrimonial-sucesoria';if(t==='Societario')a.href='/servicios/derecho-comercial-societario';if(t==='Contratos')a.href='/servicios/contratos-empresariales';});

    if(areas){
      var cards=Array.prototype.slice.call(areas.querySelectorAll('.area'));
      var patr=cards.find(function(c){return /Planificación patrimonial/i.test(c.textContent||'');});
      if(patr){var h=patr.querySelector('h3 a');var p=patr.querySelector('p');if(h){h.href='/servicios/sucesiones';h.textContent='Sucesiones y planificación patrimonial';}if(p)p.textContent='Inicio y seguimiento de sucesiones, declaratoria, bienes, partición e inscripción. Planificación patrimonial y continuidad familiar o empresaria.';}
    }

    var metodo=document.querySelector('.metodo');
    if(metodo){var titulo=metodo.querySelector('h2 a');if(titulo)titulo.href='/metodo-pyme-360';var boton=metodo.querySelector('.btn');if(boton){boton.href='/metodo-pyme-360';boton.textContent='Conocer Método PyME 360';}}
  }

  function diagnosticos(){
    var path=pathActual();
    if(path!=='/diagnostico'&&path!=='/diagnostico-negocio')return;
    if(!document.getElementById('jc-diagnosticos-ui')){
      var st=document.createElement('style');st.id='jc-diagnosticos-ui';st.textContent='\
      .op{position:relative;border-radius:10px!important;padding:18px 20px!important;background:rgba(255,255,255,.025)!important}.op:hover,.op:focus-visible{transform:translateY(-1px);border-color:#c9a227!important;background:rgba(201,162,39,.08)!important}.op b{font-size:16px}.op span{line-height:1.45}.puntuacion{display:grid!important;grid-template-columns:repeat(5,minmax(0,1fr))!important;gap:10px!important;margin-top:14px!important}.puntuacion label{cursor:pointer!important}.puntuacion input{position:absolute!important;opacity:0!important;pointer-events:none!important}.puntuacion label span{display:flex!important;min-height:72px!important;align-items:center!important;justify-content:center!important;text-align:center!important;border:1px solid rgba(255,255,255,.14)!important;border-radius:10px!important;padding:10px 6px!important;line-height:1.25!important;background:rgba(255,255,255,.025)!important;transition:.2s ease!important}.puntuacion label:hover span,.puntuacion input:focus-visible+span{border-color:#c9a227!important;background:rgba(201,162,39,.07)!important}.puntuacion input:checked+span{border-color:#c9a227!important;background:#c9a227!important;color:#041839!important;font-weight:600!important;box-shadow:0 8px 24px rgba(201,162,39,.18)!important}.lista-secciones article{border:1px solid rgba(255,255,255,.12)!important;border-radius:10px!important;padding:18px!important;margin:12px 0!important}.barra-area{height:7px!important;border-radius:999px!important;overflow:hidden!important}.eje li::before{display:none!important}.eje li{padding:12px 14px!important;border-left:2px solid #c9a227!important;background:rgba(255,255,255,.025)!important;border-radius:0 8px 8px 0!important}.eje{padding:22px 0!important}@media(max-width:620px){.puntuacion{grid-template-columns:1fr!important}.puntuacion label span{min-height:52px!important;justify-content:flex-start!important;padding:12px 16px!important}}';
      document.head.appendChild(st);
    }
    if(path==='/diagnostico'&&window.PREGUNTAS&&PREGUNTAS.length===5){
      var textos=[
        'Si hoy hubiera que ordenar una sucesión, ¿tenés claro qué bienes integran tu patrimonio y cómo están registrados?',
        '¿Tenés una empresa, cuotas o acciones que deberían seguir funcionando si vos faltaras?',
        '¿Tu situación de pareja y el régimen patrimonial están claros y actualizados?',
        '¿Tenés claro quiénes serían hoy tus herederos y cómo impactaría eso en tus bienes o empresa?',
        '¿Tenés alguna previsión vigente —testamento, seguro de vida u otra herramienta— y sabés qué cubre realmente?'
      ];
      PREGUNTAS.forEach(function(p,i){p.texto=textos[i];});
      if(typeof pintar==='function')pintar();
    }
    if(path==='/diagnostico-negocio'){
      var etiquetas=['Nunca','Rara vez','A veces','Casi siempre','Siempre'];
      document.querySelectorAll('.puntuacion').forEach(function(grupo){grupo.querySelectorAll('label span').forEach(function(s,i){s.textContent=(i+1)+' · '+etiquetas[i];});});
    }
  }

  function aplicar(){navegacion();home();diagnosticos();}
  aplicar();
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',aplicar);else setTimeout(aplicar,0);
  [120,450,1000].forEach(function(ms){setTimeout(aplicar,ms);});

  var actual=document.createElement('script');
  actual.src='/assets/site-nav-current.js?v=20261005-1';
  document.head.appendChild(actual);
}());
