/* Experimental start-page visual layer. No timeline engine or data migrations. */
(function(){
  'use strict';
  const host=document.getElementById('startView');
  if(!host || typeof window.v812Start!=='function')return;
  const areas=[
    {id:'bible',symbol:'▣',name:'Bibeln och dess traditioner',summary:'Bibelns berättelser, böcker och texternas framväxt.',target:'books',label:'Utforska Bibelns böcker',kind:'A'},
    {id:'religion',symbol:'♜',name:'Religionernas historia',summary:'Från forntida religioner till judendom och kristendom.',target:'religion',label:'Utforska religionshistoria',kind:'B'},
    {id:'history',symbol:'◎',name:'Människan och världshistorien',summary:'Samhällen, riken, människor och historiska skeenden.',target:'timeline',label:'Öppna tidslinjen',kind:'C'},
    {id:'philosophy',symbol:'✦',name:'Filosofi och idéhistoria',summary:'En kommande kronologisk ämneslinje för filosofiska traditioner.',target:'none',label:'Under uppbyggnad',kind:'D'}
  ];
  const previous=window.v812Start;
  window.v812Start=function(){
    previous();
    const hero=host.querySelector('.tv876-hero');
    if(!hero || host.querySelector('.tv887-areas'))return;
    const wrap=document.createElement('section');
    wrap.className='tv887-areas';
    wrap.setAttribute('aria-label','Fyra historiska kunskapsområden');
    wrap.innerHTML='<div class="tv887-areas-heading"><h2>Välj vad du vill utforska</h2><p>Börja i Bibeln – och följ sambanden till religioner, världshistorien och filosofins utveckling.</p></div><div class="tv887-area-grid">'+areas.map(a=>'<button type="button" class="tv887-area tv887-'+a.id+'" data-tv887-area="'+a.id+'"'+(a.target==='none'?' disabled title="Den filosofiska ämneslinjen får poster efter källgranskning"':'')+'><span class="tv887-icon" aria-hidden="true">'+a.symbol+'</span><span class="tv887-area-copy"><strong>'+a.name+'</strong><small>'+a.summary+'</small><em>'+a.label+' →</em></span></button>').join('')+'</div><p class="tv887-method"><strong>En ingång – fyra jämställda perspektiv.</strong> Varje post får på sikt ett primärt huvudområde men kan ha belagda kopplingar till de andra. Befintliga kategorier och forskningsstatus är ännu inte omklassificerade.</p>';
    hero.insertAdjacentElement('afterend',wrap);
    wrap.querySelectorAll('[data-tv887-area]:not(:disabled)').forEach(btn=>btn.addEventListener('click',()=>{
      const target=areas.find(a=>a.id===btn.dataset.tv887Area).target;
      if(target==='books'){
        if(typeof window.view==='function')window.view('timeline');
        const checkbox=document.getElementById('tvOnlyBooks');
        if(checkbox&&!checkbox.checked){checkbox.checked=true;checkbox.dispatchEvent(new Event('change',{bubbles:true}));}
      } else if(typeof window.view==='function')window.view(target);
    }));
  };
  if(!host.classList.contains('hidden')&&host.querySelector('.tv876-hero'))window.v812Start();
})();