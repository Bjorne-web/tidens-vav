/* Granskning 5: endast två forskningsposter får en synlig och typad länklista.
 * Inget ingrepp i gemensam navigation, Gantt, C6 eller originaldata. */
(function(){
  'use strict';
  if(typeof renderDetail!=='function'||typeof setSelected!=='function')return;
  const previous=renderDetail;
  renderDetail=function(){
    previous();
    const id=state&&state.selected;
    if(id!=='H068'&&id!=='H069')return;
    const data=research[id];
    const host=document.getElementById('detail');
    if(!host||!data||!Array.isArray(data.related))return;
    const available=data.related.filter(x=>idEvent(x.id));
    if(!available.length)return;
    const section=document.createElement('section');
    section.className='note v889-related';
    section.innerHTML='<b>Följ sambanden i Väven</b><p class="tiny">Länkarna visar tolkning, jämförelse eller gemensam bakgrund – inte automatiskt direkt påverkan.</p>'+
      available.map(x=>'<div style="margin:8px 0"><button type="button" data-v889-id="'+enc(x.id)+'">'+enc(x.id)+' · '+enc(idEvent(x.id).title)+' →</button><div class="tiny">'+enc(x.relation)+'</div></div>').join('')+
      '<div class="tiny">'+enc(data.reviewStatus||'Granskning pågår')+'</div>';
    host.appendChild(section);
    section.querySelectorAll('button[data-v889-id]').forEach(button=>{
      button.addEventListener('click',()=>setSelected(button.getAttribute('data-v889-id')));
    });
  };
})();
