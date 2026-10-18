/* V8.93: time-window journeys using the timeline's existing, verified period selector. */
(function(){
 'use strict';
 const root=document.getElementById('timelineView');
 const nav=document.getElementById('tv892Topics');
 const focus=document.getElementById('v7focus');
 if(!root||!nav||!focus||root.querySelector('#tv893Journeys'))return;
 const panel=document.createElement('section');
 panel.id='tv893Journeys';
 panel.className='tv893-journeys';
 panel.innerHTML='<div class="tv893-heading"><div><span class="tv893-kicker">FYRA PERSPEKTIV · EN GEMENSAM HISTORIA</span><h3>Följ sambanden genom tiden</h3><p>Välj en historisk period som första steg. Tidslinjens befintliga källbedömningar, kategorier och dateringar är oförändrade.</p></div></div><div class="tv893-periods">'+[
 ['early','Människans utveckling','Tidiga spår av samhällen och föreställningsvärldar'],
 ['bronze','Tidiga civilisationer','Miljöerna där flera forntida traditioner växte fram'],
 ['biblical','Bibelns historiska värld','Berättelser och historia prövas sida vid sida'],
 ['classical','Antiken och romersk tid','Kulturmöten, idéer och nya religiösa sammanhang'],
 ['modern','Medeltid till framtid','Hur traditioner och samhällen förändras']
 ].map(x=>'<button class="tv893-period" type="button" data-tv893-focus="'+x[0]+'" aria-pressed="false"><strong>'+x[1]+'</strong><small>'+x[2]+'</small><span aria-hidden="true">↗</span></button>').join('')+'</div><p class="tv893-caution"><strong>Viktigt:</strong> Periodvalet är en tidsavgränsning, inte en vetenskaplig klassificering av posterna. Fördelningen på de fyra ämnesområdena införs först efter källgranskning.</p>';
 nav.insertAdjacentElement('afterend',panel);
 const buttons=Array.from(panel.querySelectorAll('[data-tv893-focus]'));
 const refresh=()=>buttons.forEach(b=>b.setAttribute('aria-pressed',String(focus.value===b.dataset.tv893Focus)));
 panel.addEventListener('click',event=>{
  const b=event.target.closest('button[data-tv893-focus]');
  if(!b)return;
  focus.value=b.dataset.tv893Focus;
  focus.dispatchEvent(new Event('change',{bubbles:true}));
  refresh();
  root.querySelector('.timeline-card')?.scrollIntoView({behavior:'smooth',block:'start'});
 });
 focus.addEventListener('change',refresh);
 refresh();
})();