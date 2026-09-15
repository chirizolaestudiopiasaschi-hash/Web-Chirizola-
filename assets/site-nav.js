(function(){
  var original=document.createElement('script');
  original.src='/assets/site-nav-original.js?v=4';
  original.onload=function(){
    var path=window.location.pathname.replace(/\/+$/,'')||'/';
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
