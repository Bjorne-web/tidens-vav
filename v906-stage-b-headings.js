/* Etapp B2: common introductory header for secondary primary views.
 * Scoped to existing sections; does not change routing or research content. */
(function(){
'use strict';
const pages=[
 ['mapView','Karta','Utforska platser, regioner och historiska samband.'],
 ['exploreView','Temaspår','Följ idéer, texter och utvecklingslinjer genom historien.'],
 ['compareView','Jämför','Undersök utvalda poster sida vid sida och upptäck paralleller.'],
 ['aboutView','Om Tidens väv','Läs om projektets syfte, arbetsmetod och källkritiska perspektiv.']
];
function attach(){
 for(const [id,title,description] of pages){
  const section=document.getElementById(id);if(!section||section.querySelector(':scope > .tvb-view-intro'))continue;
  const header=document.createElement('header');header.className='tvb-view-intro';
  const eyebrow=document.createElement('span');eyebrow.className='tvb-eyebrow';eyebrow.textContent='TIDENS VÄV · UTFORSKA';
  const h=document.createElement('h2');h.textContent=title;
  const p=document.createElement('p');p.textContent=description;
  header.append(eyebrow,h,p);section.prepend(header);
 }
}
attach();
document.addEventListener('click',e=>{if(e.target.closest?.('.tabs,.v84-bottom-nav,[data-v84nav]'))queueMicrotask(attach)});
window.TidensStageBHeaders=Object.freeze({refresh:attach});
})();
