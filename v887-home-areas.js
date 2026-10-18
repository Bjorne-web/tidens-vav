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
  const iconSvg={
    bible:'<svg viewBox="0 0 24 24" width="30" height="30" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 7v14M3 18V5a2 2 0 0 1 2-2h3a4 4 0 0 1 4 4 4 4 0 0 1 4-4h3a2 2 0 0 1 2 2v13a2 2 0 0 0-2-2h-3a4 4 0 0 0-4 4 4 4 0 0 0-4-4H5a2 2 0 0 0-2 2Z"/></svg>',
    religion:'<svg viewBox="0 0 24 24" width="30" height="30" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="m3 10 9-7 9 7M4 10h16M5 21h14M7 10v10M12 10v10M17 10v10M3 21h18"/></svg>',
    history:'<svg viewBox="0 0 24 24" width="30" height="30" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c-3 3-4 6-4 9s1 6 4 9M12 3c3 3 4 6 4 9s-1 6-4 9"/></svg>',
    philosophy:'<svg viewBox="0 0 24 24" width="30" height="30" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3a4 4 0 0 0-5 5 4 4 0 0 0-3 5 4 4 0 0 0 4 5v-5M12 3a4 4 0 0 1 5 5 4 4 0 0 1 3 5 4 4 0 0 1-4 5v-5M12 3v18M8 8c1 0 3 1 4 3M16 8c-1 0-3 1-4 3M8 18c1-1 3-1 4-2M16 18c-1-1-3-1-4-2"/></svg>'
  };
  const previous=window.v812Start;
  window.v812Start=function(){
    previous();
    const hero=host.querySelector('.tv876-hero');
    if(!hero || host.querySelector('.tv887-areas'))return;
    const wrap=document.createElement('section');
    wrap.className='tv887-areas';
    wrap.setAttribute('aria-label','Fyra historiska kunskapsområden');
    wrap.innerHTML='<div class="tv887-areas-heading"><h2>Välj vad du vill utforska</h2><p>Börja i Bibeln – och följ sambanden till religioner, världshistorien och filosofins utveckling.</p></div><div class="tv887-area-grid">'+areas.map(a=>'<button type="button" class="tv887-area tv887-'+a.id+'" data-tv887-area="'+a.id+'"'+(a.target==='none'?' disabled title="Den filosofiska ämneslinjen får poster efter källgranskning"':'')+'><span class="tv887-icon" aria-hidden="true">'+iconSvg[a.id]+'</span><span class="tv887-area-copy"><strong>'+a.name+'</strong><small>'+a.summary+'</small><em>'+a.label+' →</em></span></button>').join('')+'</div><p class="tv887-method"><strong>En ingång – fyra jämställda perspektiv.</strong> Varje post får på sikt ett primärt huvudområde men kan ha belagda kopplingar till de andra. Befintliga kategorier och forskningsstatus är ännu inte omklassificerade.</p>';
    hero.appendChild(wrap);
    const intro=hero.querySelector('.tv876-lead');
    if(intro)intro.textContent='Utforska hur Bibeln och kristendomen växte fram genom människorna, kulturerna och idéerna i sin historiska omvärld.';
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