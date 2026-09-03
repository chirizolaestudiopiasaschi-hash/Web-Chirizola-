(function(){
  var original=document.createElement('script');
  original.src='/assets/site-nav-original.js?v=4';
  original.onload=function(){
    var path=window.location.pathname.replace(/\/+$/,'')||'/';
    if(path!=='/')return;
    var anterior=document.getElementById('jc-ebook-cover-fix');
    if(anterior)anterior.remove();
    var s=document.createElement('style');
    s.id='jc-ebook-cover-fix';
    s.textContent=[
      '#proximamente .plan .tapa{aspect-ratio:auto!important;max-height:none!important;min-height:0!important;padding:10px!important;display:flex!important;align-items:center!important;justify-content:center!important;background:#061b35!important;overflow:hidden!important}',
      '#proximamente .plan .tapa img{width:100%!important;height:auto!important;max-height:420px!important;object-fit:contain!important;object-position:center center!important;display:block!important;background:#061b35!important}',
      '@media(max-width:700px){#proximamente .plan .tapa{aspect-ratio:auto!important;max-height:none!important;padding:8px!important}#proximamente .plan .tapa img{height:auto!important;max-height:460px!important;object-fit:contain!important}}'
    ].join('\n');
    document.head.appendChild(s);
  };
  document.head.appendChild(original);
}());
