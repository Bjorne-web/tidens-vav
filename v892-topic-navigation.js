/* V8.92 — exploratory topic navigation in timeline, without reclassifying records. */
(function(){
 'use strict';
 const host=document.getElementById('timelineView');
 if(!host || host.querySelector('#tv892Topics'))return;
 const anchor=host.querySelector('.v7toolbar');
 if(!anchor)return;
 const section=document.createElement('section');
 section.id='tv892Topics';
 section.className='tv892-topics';
 section.innerHTML='<div class="tv892-head"><div><strong>Utforska historien ur fyra perspektiv</strong><p>Bibeln är ingången. Övriga huvudområden är jämställda delar av undersökningen. En fullständig omklassificering av tidslinjens poster återstår.</p></div><span class="tv892-note">Ny ämnesnavigation · test</span></div><div class="tv892-grid">'+[
  ['bible','📖','Bibeln','Bibelns böcker och texternas tillkomst','books'],
  ['religion','🏛','Religioner','Israels religion och dess omvärld','religion'],
  ['history','🌍','Världshistoria','Händelser och historiska sammanhang','history'],
  ['philosophy','◈','Filosofi','Egen tidslinje byggs ut senare','none']
 ].map(x=>'<button type="button" data-tv892-action="'+x[4]+'" class="tv892-topic tv892-'+x[0]+'"'+(x[4]==='none'?' disabled':'')+'><span class="tv892-icon" aria-hidden="true">'+x[1]+'</span><span><strong>'+x[2]+'</strong><small>'+x[3]+'</small></span></button>').join('')+'</div>';
 anchor.parentNode.insertBefore(section,anchor);
 section.addEventListener('click',event=>{
  const button=event.target.closest('button[data-tv892-action]');
  if(!button || button.disabled)return;
  const action=button.dataset.tv892Action;
  if(action==='religion'){if(typeof window.view==='function')window.view('religion');return;}
  if(action==='books'){
   const chk=document.getElementById('tvOnlyBooks');
   if(chk&&!chk.checked){chk.checked=true;chk.dispatchEvent(new Event('change',{bubbles:true}));}
   document.getElementById('lanes')?.scrollIntoView({behavior:'smooth',block:'nearest'});
   return;
  }
  if(action==='history'){
   const chk=document.getElementById('tvOnlyBooks');
   if(chk&&chk.checked){chk.checked=false;chk.dispatchEvent(new Event('change',{bubbles:true}));}
   document.getElementById('lanes')?.scrollIntoView({behavior:'smooth',block:'nearest'});
  }
 });
})();