(function(){
  var original=document.createElement('script');
  original.src='/assets/site-nav-original.js?v=4';
  original.onload=function(){
    var path=window.location.pathname.replace(/\/+$/,'')||'/';

    /* PDF local y sin dependencias externas para Rentabilidad PyME 360. */
    if(path==='/rentabilidad-pyme'){
      var resultado=document.getElementById('r-resultado');
      var acciones=document.querySelector('#resultado .calc-cta .calc-actions');
      if(resultado&&acciones&&!document.getElementById('descargar-informe-pdf')){
        var boton=document.createElement('button');
        boton.type='button';
        boton.id='descargar-informe-pdf';
        boton.className='calc-secondary';
        boton.textContent='Descargar mi informe PDF';
        boton.style.display='none';
        acciones.insertBefore(boton,acciones.firstChild);
        var ayuda=document.createElement('p');
        ayuda.id='ayuda-descarga-pdf';ayuda.className='nota-calculo';ayuda.style.display='none';
        ayuda.textContent='En iPhone o iPad se abrirá la opción para guardar el PDF en Archivos o compartirlo.';
        acciones.parentNode.insertBefore(ayuda,acciones.nextSibling);
        function listo(){var ok=resultado.textContent.trim()!=='—';boton.style.display=ok?'inline-flex':'none';ayuda.style.display=ok?'block':'none';}
        new MutationObserver(listo).observe(resultado,{childList:true,characterData:true,subtree:true});listo();
        function valor(id){var el=document.getElementById(id);return el?el.textContent.trim():'—';}
        function campo(id){var el=document.getElementById(id);return el&&el.value?el.value.trim():'0';}
        function ascii(s){var m={'á':'a','é':'e','í':'i','ó':'o','ú':'u','Á':'A','É':'E','Í':'I','Ó':'O','Ú':'U','ñ':'n','Ñ':'N','ü':'u','Ü':'U','¿':'','¡':'','—':'-','−':'-','“':'"','”':'"','’':"'"};return String(s||'').replace(/[áéíóúÁÉÍÓÚñÑüÜ¿¡—−“”’]/g,function(c){return m[c]||c;}).replace(/\u00a0/g,' ');}
        function esc(s){return ascii(s).replace(/\\/g,'\\\\').replace(/\(/g,'\\(').replace(/\)/g,'\\)');}
        function wrap(s,max){var w=ascii(s).split(/\s+/),ls=[],l='';w.forEach(function(x){var q=l?l+' '+x:x;if(q.length>max&&l){ls.push(l);l=x;}else l=q;});if(l)ls.push(l);return ls;}
        function t(x,y,size,font,text,color){return (color||'0.10 0.14 0.20')+' rg BT /'+font+' '+size+' Tf 1 0 0 1 '+x+' '+y+' Tm ('+esc(text)+') Tj ET\n';}
        function linea(x1,y1,x2,y2,color){return (color||'0.86 0.87 0.89')+' RG '+x1+' '+y1+' m '+x2+' '+y2+' l S\n';}
        function crearPDF(){
          var c='';
          c+='0.015 0.094 0.223 rg 0 760 595 82 re f\n';
          c+=t(42,805,18,'F2','Informe orientativo de rentabilidad','1 1 1');
          c+=t(42,785,11,'F2','METODO PyME 360','0.79 0.64 0.15');
          c+=t(42,770,8.5,'F1','Jonathan Chirizola - Abogado | Mar del Plata','0.88 0.91 0.95');
          c+='q 0.93 0.93 0.93 rg BT /F2 30 Tf 0.7071 0.7071 -0.7071 0.7071 115 330 Tm (JONATHAN CHIRIZOLA - METODO PyME 360) Tj ET Q\n';
          var y=730;
          c+=t(42,y,10,'F2','Resultado mensual estimado');y-=24;
          c+=t(42,y,20,'F2',valor('r-resultado'),valor('r-resultado').indexOf('-')>=0?'0.72 0.22 0.26':'0.12 0.53 0.37');
          y-=16;c+=t(42,y,8,'F1','Generado el '+new Date().toLocaleDateString('es-AR')+' con los datos ingresados en la calculadora.','0.38 0.42 0.48');
          y-=28;c+=t(42,y,11,'F2','Datos cargados');y-=18;
          var entradas=[['Ventas / facturacion mensual','$ '+campo('ventas')],['Mercaderia / materiales / costo directo','$ '+campo('directo')],['Impuestos sobre ventas',campo('iibb')+'%'],['Comisiones / marketplace',campo('comisiones')+'%'],['Costos financieros',campo('financieros')+'%'],['Otros variables',campo('otros-pct')+'%'],['Otros costos variables mensuales','$ '+campo('otros-pesos')],['Costos fijos mensuales','$ '+campo('fijos')]];
          entradas.forEach(function(r){c+=t(44,y,8.2,'F1',r[0],'0.38 0.42 0.48');c+=t(390,y,8.2,'F2',r[1]);c+=linea(42,y-5,553,y-5);y-=18;});
          y-=8;c+=t(42,y,11,'F2','Lectura economica estimada');y-=18;
          var filas=[['Ventas',valor('r-ventas')],['Costo directo',valor('r-directo')],['Impuestos',valor('r-iibb')],['Comisiones y financiacion',valor('r-fees')],['Otros variables',valor('r-otros')],['Margen de contribucion',valor('r-contrib')],['Costos fijos',valor('r-fijos')],['RESULTADO MENSUAL',valor('r-resultado')]];
          filas.forEach(function(r,i){c+=t(44,y,8.2,i===7?'F2':'F1',r[0]);c+=t(390,y,8.2,'F2',r[1]);c+=linea(42,y-5,553,y-5);y-=17;});
          y-=4;c+='0.97 0.95 0.88 rg 42 '+(y-48)+' 511 58 re f\n';c+=t(52,y-2,9,'F2','Indicadores clave');
          c+=t(52,y-18,8,'F1','Margen de contribucion: '+valor('m-contrib'));c+=t(300,y-18,8,'F1','Rentabilidad: '+valor('m-rent'));
          c+=t(52,y-34,8,'F1','Punto de equilibrio: '+valor('m-pe'));c+=t(300,y-34,8,'F1','Facturacion faltante: '+valor('m-falta'));y-=72;
          c+=t(42,y,9,'F2','Lectura orientativa','0.79 0.64 0.15');y-=15;wrap(valor('lectura'),92).slice(0,3).forEach(function(l){c+=t(42,y,8,'F1',l);y-=12;});
          y-=8;c+=linea(42,y,553,y,'0.79 0.64 0.15');y-=18;c+=t(42,y,9.5,'F2','¿Queres revisar estos numeros y definir que corregir primero?');y-=15;
          c+=t(42,y,8,'F1','Radiografia PyME 360 - revision profesional y plan de prioridades.');y-=14;
          c+=t(42,y,8.5,'F2','WhatsApp: +54 9 223 690 1258','0.04 0.20 0.42');y-=14;c+=t(42,y,8.5,'F2','Web: jonathanchirizola.com','0.04 0.20 0.42');y-=14;c+=t(42,y,8.5,'F2','Radiografia: jonathanchirizola.com/radiografia-pyme-360','0.04 0.20 0.42');y-=20;
          wrap('Este informe se genera automaticamente con los datos ingresados por el usuario y brinda una estimacion orientativa. No reemplaza una revision profesional ni constituye asesoramiento contable, fiscal, financiero o juridico.',105).forEach(function(l){c+=t(42,y,6.8,'F1',l,'0.38 0.42 0.48');y-=10;});
          var objs=[];objs[1]='<< /Type /Catalog /Pages 2 0 R >>';objs[2]='<< /Type /Pages /Kids [3 0 R] /Count 1 >>';objs[3]='<< /Type /Page /Parent 2 0 R /MediaBox [0 0 595 842] /Resources << /Font << /F1 4 0 R /F2 5 0 R >> >> /Contents 6 0 R >>';objs[4]='<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>';objs[5]='<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>';objs[6]='<< /Length '+c.length+' >>\nstream\n'+c+'endstream';
          var pdf='%PDF-1.4\n%1234\n',off=[0],i;for(i=1;i<=6;i++){off[i]=pdf.length;pdf+=i+' 0 obj\n'+objs[i]+'\nendobj\n';}var xref=pdf.length;pdf+='xref\n0 7\n0000000000 65535 f \n';for(i=1;i<=6;i++)pdf+=String(off[i]).padStart(10,'0')+' 00000 n \n';pdf+='trailer\n<< /Size 7 /Root 1 0 R >>\nstartxref\n'+xref+'\n%%EOF';return new Blob([pdf],{type:'application/pdf'});
        }
        function descargaNormal(blob,nombre){var url=URL.createObjectURL(blob),a=document.createElement('a');a.href=url;a.download=nombre;a.target='_blank';a.rel='noopener';document.body.appendChild(a);a.click();a.remove();setTimeout(function(){URL.revokeObjectURL(url);},60000);}
        function entregar(blob){var nombre='informe-rentabilidad-pyme-360.pdf';var esIOS=/iPad|iPhone|iPod/.test(navigator.userAgent)||(navigator.platform==='MacIntel'&&navigator.maxTouchPoints>1);if(esIOS&&navigator.share&&navigator.canShare){try{var archivo=new File([blob],nombre,{type:'application/pdf'});if(navigator.canShare({files:[archivo]})){navigator.share({files:[archivo],title:'Informe de rentabilidad PyME 360'}).catch(function(e){if(!e||e.name!=='AbortError')descargaNormal(blob,nombre);});return;}}catch(e){}}descargaNormal(blob,nombre);}
        boton.addEventListener('click',function(){if(resultado.textContent.trim()==='—'){alert('Primero calculá tu rentabilidad para generar el informe.');return;}try{entregar(crearPDF());}catch(e){alert('No pudimos generar el PDF. Recargá la página y probá nuevamente.');}});
      }
      return;
    }

    if(path!=='/')return;
    var portada='\
<svg xmlns="http://www.w3.org/2000/svg" width="800" height="1200" viewBox="0 0 800 1200">\
<defs><linearGradient id="bg" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#061b35"/><stop offset="1" stop-color="#0b3156"/></linearGradient><linearGradient id="desk" x1="0" y1="0" x2="0" y2="1"><stop stop-color="#c7a46a"/><stop offset="1" stop-color="#76593c"/></linearGradient></defs>\
<rect width="800" height="1200" fill="url(#bg)"/><rect x="42" y="42" width="716" height="1116" fill="none" stroke="#c9a227" stroke-width="2" opacity=".75"/>\
<text x="400" y="105" text-anchor="middle" fill="#fff" font-family="Georgia,serif" font-size="25" letter-spacing="3">JONATHAN CHIRIZOLA</text><text x="400" y="140" text-anchor="middle" fill="#c9a227" font-family="Arial,sans-serif" font-size="14" letter-spacing="7">ABOGADO</text>\
<text x="82" y="255" fill="#e2c469" font-family="Arial,sans-serif" font-size="27" font-weight="700">GUÍA PRÁCTICA</text><text x="82" y="350" fill="#fff" font-family="Georgia,serif" font-size="70" font-weight="700">Dejá de</text><text x="82" y="430" fill="#fff" font-family="Georgia,serif" font-size="70" font-weight="700">administrar</text><text x="82" y="510" fill="#fff" font-family="Georgia,serif" font-size="70" font-weight="700">a ciegas</text>\
<line x1="82" y1="555" x2="190" y2="555" stroke="#c9a227" stroke-width="4"/><text x="82" y="615" fill="#dce4ee" font-family="Arial,sans-serif" font-size="27">Ordená los números básicos de tu negocio:</text><text x="82" y="655" fill="#dce4ee" font-family="Arial,sans-serif" font-size="27">costos, precio, margen, punto de equilibrio y caja.</text>\
<rect x="0" y="770" width="800" height="310" fill="url(#desk)" opacity=".92"/><polygon points="180,825 560,825 625,980 115,980" fill="#d8dce1"/><rect x="235" y="800" width="270" height="165" rx="8" fill="#aeb5bf" stroke="#f4f5f7" stroke-width="4"/><rect x="250" y="815" width="240" height="135" fill="#1c2a39"/><circle cx="370" cy="882" r="17" fill="#c9a227" opacity=".85"/><rect x="585" y="820" width="88" height="150" rx="8" fill="#e7e3d7"/><path d="M620 820c0-55 18-82 38-102M636 820c15-58 43-79 70-94M608 820c-13-54-7-83 6-108" fill="none" stroke="#78946b" stroke-width="12" stroke-linecap="round"/>\
<text x="400" y="1120" text-anchor="middle" fill="#fff" font-family="Georgia,serif" font-size="27">Método PyME 360</text><text x="400" y="1155" text-anchor="middle" fill="#c9a227" font-family="Arial,sans-serif" font-size="14" letter-spacing="4">NEGOCIO · NÚMEROS · DECISIONES</text></svg>';
    var cover='data:image/svg+xml;charset=UTF-8,'+encodeURIComponent(portada);var imgGratis=document.querySelector('#proximamente [data-guia-gratis-card] .tapa img');if(imgGratis){imgGratis.src=cover;imgGratis.removeAttribute('onerror');}
    var anterior=document.getElementById('jc-ebook-cover-fix');if(anterior)anterior.remove();var s=document.createElement('style');s.id='jc-ebook-cover-fix';s.textContent=['#proximamente .planes{align-items:stretch!important}','#proximamente .plan{height:100%!important;padding:24px 20px 22px!important}','#proximamente .plan .tapa{width:100%!important;height:300px!important;aspect-ratio:auto!important;max-height:none!important;min-height:0!important;padding:10px!important;display:flex!important;align-items:center!important;justify-content:center!important;background:#061b35!important;overflow:hidden!important}','#proximamente .plan .tapa img{width:100%!important;height:100%!important;max-height:none!important;object-fit:contain!important;object-position:center center!important;display:block!important;background:#061b35!important}','#proximamente .plan .precio{margin-top:auto!important}','#proximamente .plan-btn{margin-top:14px!important;width:100%!important;min-height:52px!important;display:flex!important;align-items:center!important;justify-content:center!important;text-align:center!important;background:var(--dorado)!important;border-color:var(--dorado)!important;color:var(--navy)!important;font-weight:500!important;line-height:1.2!important;padding:14px 12px!important}','#proximamente .plan-btn:hover{background:var(--dorado-2)!important;border-color:var(--dorado-2)!important;color:var(--navy)!important}','@media(max-width:1120px){#proximamente .plan .tapa{height:360px!important}}','@media(max-width:700px){#proximamente .plan{padding:20px!important}#proximamente .plan .tapa{height:auto!important;aspect-ratio:2/3!important;max-width:360px!important;margin-left:auto!important;margin-right:auto!important;padding:8px!important}#proximamente .plan .tapa img{height:100%!important;object-fit:contain!important}#proximamente .plan-btn{min-height:54px!important;font-size:11px!important}}'].join('\n');document.head.appendChild(s);
  };
  document.head.appendChild(original);
}());
