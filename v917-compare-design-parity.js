/* B3.4: inject only the compare view's shared visual shell. No map, routing or research-state modifications. */
(function(){'use strict';
const root=document.getElementById('compareView');if(!root)return;
const hero=document.createElement('section');hero.className='tvb-compare-hero';
const top=document.createElement('div');top.className='tvb-compare-topline';
const brand=document.createElement('span');brand.className='tvb-compare-brand';brand.textContent='Tidens väv';
const sub=document.createElement('span');sub.className='tvb-compare-subtitle';sub.textContent='Historien bakom Bibeln och den kristna tron';top.append(brand,sub);
const heading=document.createElement('div');heading.className='tvb-compare-heading';
const eyebrow=document.createElement('span');eyebrow.className='tvb-compare-eyebrow';eyebrow.textContent='FYRA PERSPEKTIV · EN GEMENSAM HISTORIA';
const title=document.createElement('h2');title.textContent='Jämför historiens perspektiv';
const desc=document.createElement('p');desc.textContent='Ställ historiska händelser, texter och tolkningar sida vid sida och undersök skillnader och samband.';
heading.append(eyebrow,title,desc);hero.append(top,heading);
const caption=document.createElement('div');caption.className='tvb-compare-caption';
const label=document.createElement('strong');label.textContent='Jämför';
const helper=document.createElement('span');helper.textContent='Ställ utvalda forskningsposter bredvid varandra med befintliga jämförelseverktyg.';
caption.append(label,helper);
// Reuse the actual approved topic cards/SVGs; do not create replacement icons.
const original=document.querySelector('#timelineView #tv892Topics .tv892-grid');
if(original){
 const grid=original.cloneNode(true);
 grid.classList.add('tvb-compare-topic-grid');
 grid.querySelectorAll('[id]').forEach(el=>el.removeAttribute('id'));
 grid.addEventListener('click',event=>{
  const target=event.target.closest('button[data-tv892-action]');
  if(!target || target.disabled)return;
  const source=original.querySelector('button[data-tv892-action="'+target.dataset.tv892Action+'"]');
  source?.click();
 });
 hero.append(grid);
}
// Jämför is rendered again by its own scripts; keep the shell outside those updates.
let pending=false;
function ensureShell(){
 pending=false;
 if(!root.isConnected)return;
 if(!root.contains(hero))root.prepend(hero);
 if(!root.contains(caption))hero.insertAdjacentElement('afterend',caption);
 if(root.firstElementChild!==hero)root.prepend(hero);
 if(hero.nextElementSibling!==caption)hero.insertAdjacentElement('afterend',caption);
}
function requestEnsure(){if(pending)return;pending=true;queueMicrotask(ensureShell);}
ensureShell();
const observer=new MutationObserver(requestEnsure);
observer.observe(root,{childList:true});
document.addEventListener('click',event=>{
 if(event.target.closest?.('#tvPrimaryNav,.tabs,.v84-bottom-nav,[data-v84nav]'))requestEnsure();
});
})();
