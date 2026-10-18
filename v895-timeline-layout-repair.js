/* V8.93 layout repair: align timeline research gateway with approved visual concept. */
(function(){
 'use strict';
 const root=document.getElementById('timelineView');
 const topics=document.getElementById('tv892Topics');
 if(!root||!topics||document.getElementById('tv895TimelineHero'))return;
 const hero=document.createElement('section');
 hero.id='tv895TimelineHero';
 hero.className='tv895-timeline-hero';
 hero.innerHTML='<div class="tv895-topline"><span class="tv895-brand">Tidens väv</span><span class="tv895-subtitle">Historien bakom Bibeln och den kristna tron</span></div><div class="tv895-heading"><span>FYRA PERSPEKTIV · EN GEMENSAM HISTORIA</span><h2>Utforska historiens samband</h2><p>Följ Bibelns texter, religionernas historia, världshistorien och idéernas utveckling längs en gemensam tidsaxel.</p></div>';
 root.insertBefore(hero,root.firstElementChild);
 hero.appendChild(topics);
 const journey=document.getElementById('tv893Journeys');
 if(journey){journey.hidden=true;journey.setAttribute('aria-hidden','true');}
 const heads=topics.querySelector('.tv892-head');
 if(heads)heads.hidden=true;
 const labels={'books':['Bibeln','Texter, berättelser och traditioner'],'religion':['Religionernas historia','Trosuppfattningar och religioner'],'history':['Världshistorien','Människor, samhällen och kulturer'],'none':['Filosofi och idéhistoria','Tankar, idéer och världsbild']};
 topics.querySelectorAll('.tv892-topic').forEach(btn=>{
  const data=labels[btn.dataset.tv892Action];
  if(!data)return;
  btn.querySelector('strong').textContent=data[0];
  btn.querySelector('small').textContent=data[1];
 });
 const note=document.createElement('div');
 note.className='tv895-timeline-caption';
 note.innerHTML='<strong>Tidslinje</strong><span>Välj område ovan eller utforska den samlade historien med filter och tidsreglage nedan.</span>';
 const toolbar=root.querySelector('.v7toolbar');
 if(toolbar)toolbar.insertAdjacentElement('beforebegin',note);
})();