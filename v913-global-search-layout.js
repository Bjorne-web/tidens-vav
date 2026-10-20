/* C2.4: One existing search field for every main view.
   Keep the approved result panel above the sticky header. */
(function(){
'use strict';
const search=document.getElementById('search');
const results=document.getElementById('v827SearchResults');
if(!search||!results)return;
document.body.appendChild(results);
function place(){
 if(results.hidden)return;
 const b=search.getBoundingClientRect();
 const top=Math.max(8,b.bottom+6);
 const width=Math.min(470,window.innerWidth-16);
 results.style.position='fixed';
 results.style.inset='auto';
 results.style.left=Math.max(8,Math.min(b.right-width,window.innerWidth-width-8))+'px';
 results.style.top=top+'px';
 results.style.right='auto';
 results.style.bottom='auto';
 results.style.width=width+'px';
 results.style.maxHeight=Math.max(90,window.innerHeight-top-12)+'px';
 results.style.zIndex='2147483000';
}
search.addEventListener('input',()=>requestAnimationFrame(place));
search.addEventListener('focus',()=>requestAnimationFrame(place));
new MutationObserver(()=>{if(!results.hidden)requestAnimationFrame(place)}).observe(results,{attributes:true,attributeFilter:['hidden']});
window.addEventListener('resize',place);
window.addEventListener('scroll',place,{capture:true,passive:true});
window.TidensGlobalSearchLayout=Object.freeze({place});
})();
