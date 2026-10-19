/* V8.99: Restore the already approved timeline landscape header on C7 preview.
 * Source styling: V8.93 visual prototype. Keep the four shared Start SVG icons untouched. */
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
 // The navigation already uses window.TidensAreaIcons and tv887-shared-icon.
 // Do not replace SVGs, colors or icon sizes when restoring the image.

 const note=document.createElement('div');
 note.className='tv895-timeline-caption';
 note.innerHTML='<strong>Tidslinje</strong><span>Välj område ovan eller utforska den samlade historien med filter och tidsreglage nedan.</span>';
 const toolbar=root.querySelector('.v7toolbar');
 if(toolbar)toolbar.insertAdjacentElement('beforebegin',note);
 const pan=document.getElementById('v827PanControls');
 const timeCaption=root.querySelector('.tv895-timeline-caption');
 if(pan&&timeCaption){
   timeCaption.insertAdjacentElement('afterend',pan);
   pan.classList.add('tv895-pan-inline');
 }

})();