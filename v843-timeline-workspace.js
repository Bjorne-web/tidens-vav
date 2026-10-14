/* V8.43 – arbetsyta med fast tidsstyrning och tydliga kategorinamn.
 * Flyttar befintliga DOM-noder, ingen förändring av årtal, kategori-ID,
 * filtrering, tidslinjens datalogik eller sidopanelens läsarkort. */
(function(){
  'use strict';
  const shortNames=Object.freeze({
    'Historia':'Världshistoria',
    'Religion & texter':'Religion & texter',
    'Bibelberättelse':'Bibelns berättade tid',
    'Bibeltext':'Textens tillkomst',
    'Arkeologi':'Arkeologi',
    'Folk':'Folk',
    'Människans utveckling':'Människans utveckling',
    'Civilisation':'Civilisationer & riken',
    'Religion':'Religioner',
    'Byggnadsverk':'Byggnadsverk & faser',
    'Krig':'Krig & konflikter',
    'Konflikterande berättelser':'Historiska & religiösa berättelser',
    'Bibelberättelser':'Bibeltexter · olika tidstyper'
  });
  function categoryLabels(){
    const filters=document.getElementById('catFilters');
    if(!filters)return;
    filters.querySelectorAll('label.check').forEach(label=>{
      const input=label.querySelector('input');
      if(!input || !(input.value in shortNames))return;
      // Ändra bara textnoden. Det ursprungliga checkbox-värdet och
      // alla lyssnare behålls, liksom fullständig benämning via tooltip.
      const node=Array.from(label.childNodes).reverse().find(n=>n.nodeType===3);
      if(node)node.textContent=shortNames[input.value];
      const full=typeof laneNames!=='undefined'?(laneNames[input.value]||input.value):input.value;
      label.title=full;
      label.setAttribute('aria-label','Kategori: '+full);
    });
  }
  function structure(){
    const host=document.getElementById('timelineView');
    if(!host)return false;
    const tools=document.getElementById('v7toolbar');
    const pan=document.getElementById('v827PanControls');
    const axis=document.getElementById('axis');
    const chart=host.querySelector('.timeline-card');
    if(!tools||!pan||!axis||!chart)return false;

    let sticky=document.getElementById('v843StickyControls');
    if(!sticky){
      sticky=document.createElement('div');
      sticky.id='v843StickyControls';
      sticky.className='v843-sticky-controls';
      sticky.setAttribute('aria-label','Tidslinjens fasta reglage och tidsskala');
      chart.parentNode.insertBefore(sticky,chart);
    }
    // Flytta aldrig ett redan monterat reglage vid omritning: det skulle
    // släppa pointer capture mitt under dragning av tidsintervallet.
    for(const node of [tools,pan,axis])if(node.parentNode!==sticky)sticky.appendChild(node);

    // Också tidslinjekortet ska bara flyttas om ordningen faktiskt är fel.
    if(chart.previousElementSibling!==sticky)sticky.insertAdjacentElement('afterend',chart);

    // Allt annat som tidigare låg ovanför tidslinjen flyttas efter,
    // med bevarade klickfunktioner och referenser. Eventuella
    // forskningsnotiser får ligga kvar före tidslinjens fotnoter.
    const extras=Array.from(host.children).filter(n=>n!==sticky&&n!==chart);
    extras.forEach(n=>host.appendChild(n));
    host.classList.add('v843-timeline-layout');
    return true;
  }
  const previousTimeline=renderTimeline;
  renderTimeline=function(){
    previousTimeline();
    structure();
    categoryLabels();
  };
  structure();
  categoryLabels();
  // V8.47: keep unreviewed imported entries in archive, not global research search.
  if(typeof v827Index!=='undefined' && Array.isArray(v827Index)){
    for(let i=v827Index.length-1;i>=0;i--)if(v827Index[i].type==='archive')v827Index.splice(i,1);
  }
  window.TidensTimelineV843=Object.freeze({shortNames,structure,categoryLabels});
})();
