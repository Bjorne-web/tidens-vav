/* B3.4: inject only the theme view's shared visual shell. No map, routing or research-state modifications. */
(function(){'use strict';
const root=document.getElementById('exploreView');if(!root||root.querySelector(':scope > .tvb-theme-hero'))return;
const hero=document.createElement('section');hero.className='tvb-theme-hero';
const top=document.createElement('div');top.className='tvb-theme-topline';
const brand=document.createElement('span');brand.className='tvb-theme-brand';brand.textContent='Tidens väv';
const sub=document.createElement('span');sub.className='tvb-theme-subtitle';sub.textContent='Historien bakom Bibeln och den kristna tron';top.append(brand,sub);
const heading=document.createElement('div');heading.className='tvb-theme-heading';
const eyebrow=document.createElement('span');eyebrow.className='tvb-theme-eyebrow';eyebrow.textContent='FYRA PERSPEKTIV · EN GEMENSAM HISTORIA';
const title=document.createElement('h2');title.textContent='Följ historiens temaspår';
const desc=document.createElement('p');desc.textContent='Följ hur berättelser, religioner och idéer möts och förändras genom historien.';
heading.append(eyebrow,title,desc);hero.append(top,heading);
const caption=document.createElement('div');caption.className='tvb-theme-caption';
const label=document.createElement('strong');label.textContent='Temaspår';
const helper=document.createElement('span');helper.textContent='Utforska tematiska samband med de befintliga verktygen.';
caption.append(label,helper);
// Reuse the actual approved topic cards/SVGs; do not create replacement icons.
const original=document.querySelector('#timelineView #tv892Topics .tv892-grid');
if(original){
 const grid=original.cloneNode(true);
 grid.classList.add('tvb-theme-topic-grid');
 grid.querySelectorAll('[id]').forEach(el=>el.removeAttribute('id'));
 grid.addEventListener('click',event=>{
  const target=event.target.closest('button[data-tv892-action]');
  if(!target || target.disabled)return;
  const source=original.querySelector('button[data-tv892-action="'+target.dataset.tv892Action+'"]');
  source?.click();
 });
 hero.append(grid);
}
root.prepend(caption);root.prepend(hero);
})();
