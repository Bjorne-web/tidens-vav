/* V8.94 revision 2: preserve existing pan handlers and category colour coding. */
(function(){
 'use strict';
 const get=id=>document.getElementById(id);
 let applying=false;
 function layout(){
  if(applying)return;
  applying=true;
  try{
   const view=get('timelineView'),hero=get('tv895TimelineHero'),toolbar=get('v7toolbar'),sticky=get('v843StickyControls'),
    pan=get('v827PanControls'),axis=get('axis'),strip=get('v881CategoryStrip'),chart=view&&view.querySelector('.timeline-card');
   if(!view||!toolbar||!sticky||!pan||!axis||!chart)return;
   view.querySelector('.tv895-timeline-caption')?.remove();
   const disclosure=get('v879PanDisclosure');
   if(disclosure){if(pan.parentNode===disclosure)disclosure.removeChild(pan);disclosure.remove();}
   if(hero&&view.firstElementChild!==hero)view.insertBefore(hero,view.firstElementChild);
   if(hero&&sticky.previousElementSibling!==hero)hero.insertAdjacentElement('afterend',sticky);
   // Approved order: sorting, slim time bar, coloured categories, scale, chart.
   // Reuse the existing category strip and listeners, never recreate buttons.
   for(const node of [toolbar,pan,axis])sticky.appendChild(node);
   if(strip)pan.insertAdjacentElement('afterend',strip);
   if(chart.previousElementSibling!==sticky)sticky.insertAdjacentElement('afterend',chart);
   // v828Chronological computes tick spacing before the final layout.
   // Recompute AFTER CSS/DOM placement using the current visible time window.
   if(!layout.axisFrame){
    layout.axisFrame=requestAnimationFrame(()=>{
     layout.axisFrame=0;
     const finalAxis=get('axis');
     if(!finalAxis||typeof v814AxisTicks!=='function'||typeof v814AxisLabel!=='function')return;
     const width=finalAxis.getBoundingClientRect().width;
     if(width<100)return;
     const span=Math.max(1,state.max-state.min);
     const ticks=v814AxisTicks(state.min,state.max,width);
     finalAxis.innerHTML=ticks.map(t=>'<span class="tick" style="left:'+t.left+'%">'+v814AxisLabel(t.year,span)+'</span>').join('');
     // Use exactly the same tick percentages for Gantt plot guides.
     // Re-created on each render/pan; underlying dates and event marks stay intact.
     const gantt=view.querySelector('.v828-gantt');
     if(gantt && view.classList.contains('v828-chrono-gantt')){
      const lines=ticks.filter(t=>t.left>=0&&t.left<=100);
      gantt.querySelectorAll('.v828-gantt-track').forEach(track=>{
       track.querySelectorAll('.v894-gantt-guide').forEach(node=>node.remove());
       const fragment=document.createDocumentFragment();
       for(const tick of lines){
        const guide=document.createElement('span');
        guide.className='v894-gantt-guide';
        guide.style.left=tick.left+'%';
        guide.setAttribute('aria-hidden','true');
        fragment.appendChild(guide);
       }
       track.prepend(fragment);
      });
     }

    });
   }

   pan.classList.add('tv895-pan-inline','v894-pan-slim');
   // V8.32 owns the interactive interval and its two draggable endpoints.
   // Do not expose the legacy hidden input or draw a second decorative track.
   const legacy=get('v827PanSlider');
   const extra=get('v894SliderShell');
   if(extra){
    if(legacy&&extra.contains(legacy))extra.parentNode.insertBefore(legacy,extra);
    extra.remove();
   }
   if(legacy){legacy.hidden=true;legacy.setAttribute('aria-hidden','true');legacy.tabIndex=-1;}
   sticky.classList.add('v894-layout');
   if(strip)strip.classList.add('v894-category-restored');
   let toggle=get('v894PanToggle');
   if(!toggle){
    toggle=document.createElement('button');
    toggle.id='v894PanToggle';toggle.type='button';
    toggle.setAttribute('aria-controls','v827PanControls');
    toggle.className='v894-pan-toggle';
    toggle.addEventListener('click',()=>{
     const expanded=toggle.getAttribute('aria-expanded')==='true';
     setExpanded(!expanded);
    });
   }
   if(toggle.parentNode!==toolbar)toolbar.appendChild(toggle);
   function setExpanded(expanded){
    pan.hidden=!expanded;
    pan.style.setProperty('display',expanded?'flex':'none','important');
    toggle.setAttribute('aria-expanded',String(expanded));
    toggle.textContent=expanded?'Dölj tidsreglage':'Visa tidsreglage';
   }
   // Keep the current state on renderer refresh. Default expanded, so "Flytta i tiden" is visible.
   setExpanded(toggle.getAttribute('aria-expanded')!=='false');
  }finally{applying=false;}
 }
 if(typeof renderTimeline==='function'){
  const old=renderTimeline;
  renderTimeline=function(){const result=old.apply(this,arguments);layout();return result;};
 }
 layout();
 window.TidensTimelineV894=Object.freeze({layout});
})();