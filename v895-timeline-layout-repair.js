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
 const keepFirst=()=>{if(root.firstElementChild!==hero)root.insertBefore(hero,root.firstElementChild);};
 const observer=new MutationObserver(keepFirst);
 observer.observe(root,{childList:true});
 hero.appendChild(topics);
 const journey=document.getElementById('tv893Journeys');
 if(journey){journey.hidden=true;journey.setAttribute('aria-hidden','true');}
 const heads=topics.querySelector('.tv892-head');
 if(heads)heads.hidden=true;
  const iconSvg={
    bible:'<svg viewBox="0 0 24 24" width="30" height="30" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 7v14M3 18V5a2 2 0 0 1 2-2h3a4 4 0 0 1 4 4 4 4 0 0 1 4-4h3a2 2 0 0 1 2 2v13a2 2 0 0 0-2-2h-3a4 4 0 0 0-4 4 4 4 0 0 0-4-4H5a2 2 0 0 0-2 2Z"/></svg>',
    religion:'<svg viewBox="0 0 24 24" width="30" height="30" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="m3 10 9-7 9 7M4 10h16M5 21h14M7 10v10M12 10v10M17 10v10M3 21h18"/></svg>',
    history:'<svg viewBox="0 0 24 24" width="30" height="30" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c-3 3-4 6-4 9s1 6 4 9M12 3c3 3 4 6 4 9s-1 6-4 9"/></svg>',
    philosophy:'<svg viewBox="0 0 24 24" width="30" height="30" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3a4 4 0 0 0-5 5 4 4 0 0 0-3 5 4 4 0 0 0 4 5v-5M12 3a4 4 0 0 1 5 5 4 4 0 0 1 3 5 4 4 0 0 1-4 5v-5M12 3v18M8 8c1 0 3 1 4 3M16 8c-1 0-3 1-4 3M8 18c1-1 3-1 4-2M16 18c-1-1-3-1-4-2"/></svg>'
  };

 const svgKeys={books:'bible',religion:'religion',history:'history',none:'philosophy'};
 const labels={'books':['Bibeln','Texter, berättelser och traditioner'],'religion':['Religionernas historia','Trosuppfattningar och religioner'],'history':['Världshistorien','Människor, samhällen och kulturer'],'none':['Filosofi och idéhistoria','Tankar, idéer och världsbild']};
 topics.querySelectorAll('.tv892-topic').forEach(btn=>{
  const data=labels[btn.dataset.tv892Action];
  if(!data)return;
  const icon=btn.querySelector('.tv892-icon');
  if(icon)icon.innerHTML=iconSvg[svgKeys[btn.dataset.tv892Action]];
  btn.querySelector('strong').textContent=data[0];
  btn.querySelector('small').textContent=data[1];
 });
 const note=document.createElement('div');
 note.className='tv895-timeline-caption';
 note.innerHTML='<strong>Tidslinje</strong><span>Välj område ovan eller utforska den samlade historien med filter och tidsreglage nedan.</span>';
 const toolbar=root.querySelector('#v7toolbar');
 const pan=document.getElementById('v827PanControls');
 const strip=document.getElementById('v881CategoryStrip');
 const card=root.querySelector('.timeline-card');
 const actionbar=root.querySelector('.v884-timeline-actionbar');
 if(toolbar&&pan&&card){
   pan.classList.add('tv895-pan-inline');
   root.insertBefore(note,toolbar);
   const order=[hero,note,toolbar,strip,pan,card].filter(Boolean);
   const arrange=()=>{
     // Restore the requested order without cloning any inputs or attaching new handlers.
     for(let i=0;i<order.length;i++){
       const node=order[i];if(node.parentElement!==root)root.appendChild(node);
       const prev=i?order[i-1]:null;
       if(prev && node.previousElementSibling!==prev)prev.insertAdjacentElement('afterend',node);
       if(!prev && root.firstElementChild!==node)root.insertBefore(node,root.firstElementChild);
     }
     if(actionbar && actionbar.parentElement===root && actionbar.previousElementSibling!==card){
       card.insertAdjacentElement('afterend',actionbar);
     }
   };
   arrange();
   const observer=new MutationObserver(()=>{
     if(order.some((n,i)=>n.parentElement!==root || (i>0&&n.previousElementSibling!==order[i-1])))arrange();
   });
   observer.observe(root,{childList:true});
 }
})();
