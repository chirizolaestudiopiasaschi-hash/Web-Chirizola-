(function(){
  var original=document.createElement('script');
  original.src='/assets/site-nav-original.js?v=4';
  original.onload=function(){
    var path=window.location.pathname.replace(/\/+$/,'')||'/';

    /* Informe PDF local para la Calculadora de Rentabilidad PyME 360. */
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

        function listo(){boton.style.display=resultado.textContent.trim()!=='—'?'inline-flex':'none';}
        new MutationObserver(listo).observe(resultado,{childList:true,characterData:true,subtree:true});
        listo();

        function cargarJsPDF(callback){
          if(window.jspdf&&window.jspdf.jsPDF){callback();return;}
          var previo=document.getElementById('jspdf-cdn');
          if(previo){previo.addEventListener('load',callback,{once:true});return;}
          var script=document.createElement('script');
          script.id='jspdf-cdn';
          script.src='https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.2/jspdf.umd.min.js';
          script.crossOrigin='anonymous';
          script.onload=callback;
          script.onerror=function(){alert('No pudimos preparar el PDF en este momento. Probá nuevamente en unos segundos.');};
          document.head.appendChild(script);
        }

        function valor(id){var el=document.getElementById(id);return el?el.textContent.trim():'—';}
        function campo(id){var el=document.getElementById(id);return el&&el.value?el.value.trim():'0';}
        function limpiarTexto(s){return String(s||'').replace(/−/g,'-').replace(/\u00a0/g,' ');}

        function generarPDF(){
          if(resultado.textContent.trim()==='—'){alert('Primero calculá tu rentabilidad para generar el informe.');return;}
          cargarJsPDF(function(){
            var jsPDF=window.jspdf.jsPDF;
            var doc=new jsPDF({unit:'mm',format:'a4'});
            var navy=[4,24,57], gold=[201,162,39], ink=[25,35,50], muted=[95,105,120], red=[185,55,65], green=[30,135,95];
            var W=210, M=18, y=0;
            doc.setFillColor(navy[0],navy[1],navy[2]);doc.rect(0,0,W,48,'F');
            doc.setTextColor(255,255,255);doc.setFont('helvetica','bold');doc.setFontSize(18);doc.text('Informe orientativo de rentabilidad',M,20);
            doc.setTextColor(gold[0],gold[1],gold[2]);doc.setFontSize(11);doc.text('METODO PyME 360',M,29);
            doc.setTextColor(225,230,238);doc.setFont('helvetica','normal');doc.setFontSize(9);doc.text('Jonathan Chirizola | jonathanchirizola.com',M,38);
            doc.setTextColor(ink[0],ink[1],ink[2]);
            y=60;doc.setFont('helvetica','bold');doc.setFontSize(12);doc.text('Resultado mensual estimado',M,y);
            var res=limpiarTexto(valor('r-resultado'));
            var negativo=res.indexOf('-')!==-1;
            doc.setTextColor.apply(doc,negativo?red:green);doc.setFontSize(22);doc.text(res,M,y+10);
            doc.setTextColor(muted[0],muted[1],muted[2]);doc.setFont('helvetica','normal');doc.setFontSize(8.5);doc.text('Generado el '+new Date().toLocaleDateString('es-AR')+' con los datos ingresados en la calculadora.',M,y+17);

            y=88;doc.setTextColor(ink[0],ink[1],ink[2]);doc.setFont('helvetica','bold');doc.setFontSize(11);doc.text('Datos cargados',M,y);y+=8;
            var entradas=[
              ['Ventas / facturacion mensual','$ '+campo('ventas')],
              ['Mercaderia / materiales / costo directo','$ '+campo('directo')],
              ['Impuestos sobre ventas',campo('iibb')+'%'],
              ['Comisiones / marketplace',campo('comisiones')+'%'],
              ['Costos financieros',campo('financieros')+'%'],
              ['Otros variables',campo('otros-pct')+'%'],
              ['Otros costos variables mensuales','$ '+campo('otros-pesos')],
              ['Costos fijos mensuales','$ '+campo('fijos')]
            ];
            doc.setFontSize(9);
            entradas.forEach(function(r,i){
              if(i%2===0){doc.setFillColor(246,247,249);doc.rect(M,y-5,174,8,'F');}
              doc.setFont('helvetica','normal');doc.setTextColor(muted[0],muted[1],muted[2]);doc.text(r[0],M+2,y);
              doc.setFont('helvetica','bold');doc.setTextColor(ink[0],ink[1],ink[2]);doc.text(limpiarTexto(r[1]),M+172,y,{align:'right'});y+=8;
            });

            y+=7;doc.setFont('helvetica','bold');doc.setFontSize(11);doc.text('Lectura economica estimada',M,y);y+=8;
            var filas=[
              ['Ventas',valor('r-ventas')],['Costo directo',valor('r-directo')],['Impuestos',valor('r-iibb')],['Comisiones y financiacion',valor('r-fees')],['Otros variables',valor('r-otros')],['Margen de contribucion',valor('r-contrib')],['Costos fijos',valor('r-fijos')],['RESULTADO MENSUAL',valor('r-resultado')]
            ];
            doc.setFontSize(9);
            filas.forEach(function(r,i){
              doc.setDrawColor(225,228,233);doc.line(M,y+3,M+174,y+3);
              doc.setFont('helvetica',i===7?'bold':'normal');doc.setTextColor(ink[0],ink[1],ink[2]);doc.text(r[0],M,y);
              doc.setFont('helvetica','bold');doc.text(limpiarTexto(r[1]),M+174,y,{align:'right'});y+=8;
            });

            y+=5;doc.setFillColor(247,244,233);doc.roundedRect(M,y-5,174,28,2,2,'F');
            doc.setTextColor(ink[0],ink[1],ink[2]);doc.setFont('helvetica','bold');doc.setFontSize(9);doc.text('Indicadores clave',M+5,y+1);
            doc.setFont('helvetica','normal');doc.setFontSize(8.5);
            doc.text('Margen de contribucion: '+limpiarTexto(valor('m-contrib')),M+5,y+9);
            doc.text('Rentabilidad: '+limpiarTexto(valor('m-rent')),M+90,y+9);
            doc.text('Punto de equilibrio: '+limpiarTexto(valor('m-pe')),M+5,y+17);
            doc.text('Facturacion faltante: '+limpiarTexto(valor('m-falta')),M+90,y+17);

            y+=34;doc.setFont('helvetica','bold');doc.setFontSize(10);doc.setTextColor(gold[0],gold[1],gold[2]);doc.text('Lectura orientativa',M,y);
            doc.setFont('helvetica','normal');doc.setFontSize(8.5);doc.setTextColor(ink[0],ink[1],ink[2]);
            var lectura=limpiarTexto(valor('lectura'));var lineas=doc.splitTextToSize(lectura,174);doc.text(lineas,M,y+6);y+=6+(lineas.length*4.2)+5;

            if(y>250){doc.addPage();y=20;}
            doc.setDrawColor(gold[0],gold[1],gold[2]);doc.line(M,y,M+174,y);y+=7;
            doc.setFont('helvetica','bold');doc.setFontSize(10);doc.setTextColor(ink[0],ink[1],ink[2]);doc.text('¿Queres validar estos numeros y definir que corregir primero?',M,y);y+=6;
            doc.setFont('helvetica','normal');doc.setFontSize(8.5);doc.setTextColor(muted[0],muted[1],muted[2]);
            var cta=doc.splitTextToSize('La Radiografia PyME 360 es la instancia profesional para poner los datos en contexto, ordenar prioridades y definir proximos pasos.',174);doc.text(cta,M,y);y+=cta.length*4.2+4;
            doc.setTextColor(40,75,140);doc.textWithLink('jonathanchirizola.com/radiografia-pyme-360',M,y,{url:'https://jonathanchirizola.com/radiografia-pyme-360'});y+=10;
            doc.setTextColor(muted[0],muted[1],muted[2]);doc.setFontSize(7.5);
            var legal=doc.splitTextToSize('Este informe se genera automaticamente con los datos ingresados por el usuario y brinda una estimacion orientativa. No constituye la Radiografia PyME 360 profesional ni reemplaza asesoramiento contable, fiscal, financiero o juridico.',174);doc.text(legal,M,y);
            doc.save('informe-rentabilidad-pyme-360.pdf');
          });
        }
        boton.addEventListener('click',generarPDF);
      }
      return;
    }

    if(path!=='/')return;

    /* Portada vectorial nítida para la guía gratuita. Se usa inline para evitar
       imágenes borrosas y mantener una carga liviana. No recrea el logotipo. */
    var portada='\
<svg xmlns="http://www.w3.org/2000/svg" width="800" height="1200" viewBox="0 0 800 1200">\
<defs>\
 <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#061b35"/><stop offset="1" stop-color="#0b3156"/></linearGradient>\
 <linearGradient id="desk" x1="0" y1="0" x2="0" y2="1"><stop stop-color="#c7a46a"/><stop offset="1" stop-color="#76593c"/></linearGradient>\
</defs>\
<rect width="800" height="1200" fill="url(#bg)"/>\
<rect x="42" y="42" width="716" height="1116" fill="none" stroke="#c9a227" stroke-width="2" opacity=".75"/>\
<text x="400" y="105" text-anchor="middle" fill="#fff" font-family="Georgia,serif" font-size="25" letter-spacing="3">JONATHAN CHIRIZOLA</text>\
<text x="400" y="140" text-anchor="middle" fill="#c9a227" font-family="Arial,sans-serif" font-size="14" letter-spacing="7">ABOGADO</text>\
<text x="82" y="255" fill="#e2c469" font-family="Arial,sans-serif" font-size="27" font-weight="700">GUÍA PRÁCTICA</text>\
<text x="82" y="350" fill="#fff" font-family="Georgia,serif" font-size="70" font-weight="700">Dejá de</text>\
<text x="82" y="430" fill="#fff" font-family="Georgia,serif" font-size="70" font-weight="700">administrar</text>\
<text x="82" y="510" fill="#fff" font-family="Georgia,serif" font-size="70" font-weight="700">a ciegas</text>\
<line x1="82" y1="555" x2="190" y2="555" stroke="#c9a227" stroke-width="4"/>\
<text x="82" y="615" fill="#dce4ee" font-family="Arial,sans-serif" font-size="27">Ordená los números básicos de tu negocio:</text>\
<text x="82" y="655" fill="#dce4ee" font-family="Arial,sans-serif" font-size="27">costos, precio, margen, punto de equilibrio y caja.</text>\
<rect x="0" y="770" width="800" height="310" fill="url(#desk)" opacity=".92"/>\
<polygon points="180,825 560,825 625,980 115,980" fill="#d8dce1"/>\
<rect x="235" y="800" width="270" height="165" rx="8" fill="#aeb5bf" stroke="#f4f5f7" stroke-width="4"/>\
<rect x="250" y="815" width="240" height="135" fill="#1c2a39"/>\
<circle cx="370" cy="882" r="17" fill="#c9a227" opacity=".85"/>\
<rect x="585" y="820" width="88" height="150" rx="8" fill="#e7e3d7"/>\
<path d="M620 820c0-55 18-82 38-102M636 820c15-58 43-79 70-94M608 820c-13-54-7-83 6-108" fill="none" stroke="#78946b" stroke-width="12" stroke-linecap="round"/>\
<text x="400" y="1120" text-anchor="middle" fill="#fff" font-family="Georgia,serif" font-size="27">Método PyME 360</text>\
<text x="400" y="1155" text-anchor="middle" fill="#c9a227" font-family="Arial,sans-serif" font-size="14" letter-spacing="4">NEGOCIO · NÚMEROS · DECISIONES</text>\
</svg>';
    var cover='data:image/svg+xml;charset=UTF-8,'+encodeURIComponent(portada);
    var imgGratis=document.querySelector('#proximamente [data-guia-gratis-card] .tapa img');
    if(imgGratis){imgGratis.src=cover;imgGratis.removeAttribute('onerror');}

    var anterior=document.getElementById('jc-ebook-cover-fix');
    if(anterior)anterior.remove();
    var s=document.createElement('style');
    s.id='jc-ebook-cover-fix';
    s.textContent=[
      '#proximamente .planes{align-items:stretch!important}',
      '#proximamente .plan{height:100%!important;padding:24px 20px 22px!important}',
      '#proximamente .plan .tapa{width:100%!important;height:300px!important;aspect-ratio:auto!important;max-height:none!important;min-height:0!important;padding:10px!important;display:flex!important;align-items:center!important;justify-content:center!important;background:#061b35!important;overflow:hidden!important}',
      '#proximamente .plan .tapa img{width:100%!important;height:100%!important;max-height:none!important;object-fit:contain!important;object-position:center center!important;display:block!important;background:#061b35!important}',
      '#proximamente .plan .precio{margin-top:auto!important}',
      '#proximamente .plan-btn{margin-top:14px!important;width:100%!important;min-height:52px!important;display:flex!important;align-items:center!important;justify-content:center!important;text-align:center!important;background:var(--dorado)!important;border-color:var(--dorado)!important;color:var(--navy)!important;font-weight:500!important;line-height:1.2!important;padding:14px 12px!important}',
      '#proximamente .plan-btn:hover{background:var(--dorado-2)!important;border-color:var(--dorado-2)!important;color:var(--navy)!important}',
      '@media(max-width:1120px){#proximamente .plan .tapa{height:360px!important}}',
      '@media(max-width:700px){#proximamente .plan{padding:20px!important}#proximamente .plan .tapa{height:auto!important;aspect-ratio:2/3!important;max-width:360px!important;margin-left:auto!important;margin-right:auto!important;padding:8px!important}#proximamente .plan .tapa img{height:100%!important;object-fit:contain!important}#proximamente .plan-btn{min-height:54px!important;font-size:11px!important}}'
    ].join('\n');
    document.head.appendChild(s);
  };
  document.head.appendChild(original);
}());
