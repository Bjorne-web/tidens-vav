/* C3 pilot – use the existing approved four homepage area cards.
   Only redirects three ready areas to their established main navigation flows. */
(function(){
'use strict';
const home=document.getElementById('startView');
if(!home)return;
function open(id){
 const navId=id==='religion'?'navExplore':'navTimeline';
 const nav=document.getElementById(navId);
 if(!nav)return false;
 nav.click();
 if(id==='bible'||id==='history'){
  const checkbox=document.getElementById('tvOnlyBooks');
  const shouldBooks=id==='bible';
  if(checkbox&&checkbox.checked!==shouldBooks){checkbox.checked=shouldBooks;checkbox.dispatchEvent(new Event('change',{bubbles:true}))}
 }
 if(id==='religion'){
  // Existing Temaspår themes remain authoritative: don't invent a new category or content.
  const region=document.getElementById('exploreView');
  region?.scrollIntoView({block:'start',behavior:'smooth'});
 }
 return true;
}
home.addEventListener('click',event=>{
 const card=event.target.closest?.('button[data-tv887-area]');
 if(!card||card.disabled)return;
 const id=card.dataset.tv887Area;
 if(!['bible','religion','history'].includes(id))return;
 event.preventDefault();
 event.stopImmediatePropagation();
 open(id);
},true);
window.TidensHomePathsC3=Object.freeze({open});
})();
