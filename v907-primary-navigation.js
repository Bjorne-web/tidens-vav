/* Tidens väv: new six-entry primary navigation (test only).
   Delegates to existing navigation buttons, without changing routes/data. */
(function(){
'use strict';
const old=document.querySelector('.top .tabs');if(!old||document.getElementById('tvPrimaryNav'))return;
const choices=[['Hem','navStart'],['Tidslinje','navTimeline'],['Karta','navMap'],['Temaspår','navExplore'],['Jämför','navCompare'],['Om','navAbout']];
const nav=document.createElement('nav');nav.id='tvPrimaryNav';nav.setAttribute('aria-label','Huvudnavigation');
const links=new Map();
for(const [text,id] of choices){
 const btn=document.createElement('button');btn.type='button';btn.textContent=text;btn.dataset.target=id;btn.className='tv-primary-link';btn.addEventListener('click',()=>{document.getElementById(id)?.click();refresh()});links.set(id,btn);nav.append(btn);
}
const more=document.createElement('details');more.id='tvLegacyViews';const summary=document.createElement('summary');summary.textContent='Fler vyer';more.append(summary);
const list=document.createElement('div');list.className='tv-legacy-list';
const keep=new Set(choices.map(c=>c[1]));
for(const btn of [...old.querySelectorAll('button.tab')]){
 if(keep.has(btn.id))continue;
 const item=document.createElement('button');item.type='button';item.textContent=btn.textContent;item.onclick=()=>{btn.click();more.open=false;refresh()};list.append(item);
}
more.append(list);nav.append(more);old.after(nav);old.classList.add('tv-original-nav-hidden');
function refresh(){for(const [id,btn] of links){const active=document.getElementById(id)?.classList.contains('active');btn.classList.toggle('active',!!active);if(active)btn.setAttribute('aria-current','page');else btn.removeAttribute('aria-current')}}
refresh();
document.addEventListener('click',()=>queueMicrotask(refresh));
new MutationObserver(refresh).observe(old,{subtree:true,attributes:true,attributeFilter:['class']});
})();
