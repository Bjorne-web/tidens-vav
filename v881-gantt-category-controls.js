/* V8.81: category visibility controls use the same state as timeline sidebar filters. */
(function(){
 'use strict';
 const host=document.getElementById('lanes');if(!host)return;
 const strip=document.createElement('div');strip.id='v881CategoryStrip';strip.className='v881-category-strip';
 strip.setAttribute('aria-label','Visa eller dölj tidslinjens kategorier');
 host.parentNode.insertBefore(strip,host);
 const categoryEntries=()=>[...Object.entries(laneNames),...((window.TIDENS_BIBLE_BOOKS||[]).length?[['Bibelns böcker','Bibelns böcker']]:[])];
 function renderStrip(){
  for(const [cat,label] of categoryEntries()){
   let b=[...strip.children].find(x=>x.dataset.category===cat);
   if(!b){b=document.createElement('button');b.type='button';b.dataset.category=cat;
    if(typeof dark!=='undefined')b.style.setProperty('--v881-cat-color',dark[cat]||'#6e8ba7');
    b.onclick=()=>{const on=!state.cat.has(cat);if(on)state.cat.add(cat);else state.cat.delete(cat);
     const input=[...document.querySelectorAll('#catFilters input[type=checkbox]')].find(x=>x.value===cat);if(input)input.checked=on;
     renderAll();renderStrip();};strip.append(b);}
   const enabled=state.cat.has(cat);b.textContent=label;b.setAttribute('aria-pressed',String(enabled));b.title=(enabled?'Dölj ':'Visa ')+label;
  }
 }
 renderStrip();
 function paint(){
  renderStrip();
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