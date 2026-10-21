/* B3.4: inject only the map's shared visual shell. No map, routing or research-state modifications. */
(function(){'use strict';
const root=document.getElementById('mapView');if(!root||root.querySelector(':scope > .tvb-map-hero'))return;
const hero=document.createElement('section');hero.className='tvb-map-hero';
const top=document.createElement('div');top.className='tvb-map-topline';
const brand=document.createElement('span');brand.className='tvb-map-brand';brand.textContent='Tidens väv';
const sub=document.createElement('span');sub.className='tvb-map-subtitle';sub.textContent='Historien bakom Bibeln och den kristna tron';top.append(brand,sub);
const heading=document.createElement('div');heading.className='tvb-map-heading';
const eyebrow=document.createElement('span');eyebrow.className='tvb-map-eyebrow';eyebrow.textContent='FYRA PERSPEKTIV · EN GEMENSAM HISTORIA';
const title=document.createElement('h2');title.textContent='Utforska historiens platser';
const desc=document.createElement('p');desc.textContent='Se var historiska händelser, texter och traditioner hör hemma geografiskt och utforska deras samband.';
heading.append(eyebrow,title,desc);hero.append(top,heading);
const caption=document.createElement('div');caption.className='tvb-map-caption';
const label=document.createElement('strong');label.textContent='Karta';
const helper=document.createElement('span');helper.textContent='Utforska platser och regioner med kartans befintliga kontroller.';
caption.append(label,helper);root.prepend(caption);root.prepend(hero);
})();
