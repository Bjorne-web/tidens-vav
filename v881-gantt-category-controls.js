/* V8.81: category visibility controls use the same state as timeline sidebar filters. */
(function(){
 'use strict';
 const host=document.getElementById('lanes');if(!host)return;
 function paint(){
  host.querySelectorAll('.v815-category').forEach(section=>{
   const cat=section.dataset.v815Category;
   const header=section.querySelector('.v815-compact-header,header');
   if(!cat||!header||header.querySelector('.v881-visibility'))return;
   const button=document.createElement('button');
   button.type='button';button.className='v881-visibility';
   const refresh=()=>{const selected=state.cat.has(cat);button.textContent=selected?'Visa: på':'Visa: av';button.setAttribute('aria-pressed',String(selected));button.title='Visa eller dölj kategorin '+cat;};
   button.addEventListener('click',event=>{
    event.stopPropagation();
    const desired=!state.cat.has(cat);
    if(desired)state.cat.add(cat);else state.cat.delete(cat);
    const filter=[...document.querySelectorAll('#catFilters input[type=checkbox]')].find(box=>box.value===cat);
    if(filter)filter.checked=desired;
    renderAll();
   });
   refresh();header.append(button);
  });
 }
 const observer=new MutationObserver(()=>{observer.disconnect();paint();observer.observe(host,{childList:true,subtree:true});});
 observer.observe(host,{childList:true,subtree:true});paint();
})();