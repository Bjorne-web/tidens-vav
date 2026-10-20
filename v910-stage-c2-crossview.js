/* C2.1: contextual transitions that reuse the existing selected post.
   Never writes a parallel state or changes C7 research content. */
(function(){
'use strict';
const views=[['timelineView','Tidslinje','navTimeline'],['mapView','Karta','navMap'],['exploreView','Temaspår','navExplore'],['compareView','Jämför','navCompare']];
const sections=views.map(([id,label,target])=>({node:document.getElementById(id),label,target,id})).filter(x=>x.node);
if(!window.TidensViewContextC1||sections.length!==4)return;
const bars=new Map();
for(const {id,node} of sections){
 const bar=document.createElement('div');bar.className='tvc2-context-bar';bar.hidden=true;bar.setAttribute('role','group');bar.setAttribute('aria-label','Fortsätt utforska vald forskningspost');
 const label=document.createElement('span');label.className='tvc2-selected';bar.append(label);
 const nav=document.createElement('div');nav.className='tvc2-links';
 for(const v of views.filter(x=>x[0]!==id)){
  const button=document.createElement('button');button.type='button';button.textContent='Visa i '+v[1];button.onclick=()=>document.getElementById(v[2])?.click();nav.append(button);
 }
 bar.append(nav);node.prepend(bar);bars.set(id,{bar,label});
}
function refresh(){
 const snapshot=window.TidensViewContextC1.snapshot();
 const post=snapshot.selectedPost;
 for(const [id,{bar,label}] of bars){
  const node=document.getElementById(id);
  const active=!!node&&!node.classList.contains('hidden');
  bar.hidden=!post||!active;
  if(post)label.textContent='Vald post: '+post.id+' · '+post.title;
 }
}
let pending=false;
function schedule(){if(pending)return;pending=true;queueMicrotask(()=>{pending=false;refresh()})}
document.addEventListener('click',schedule);
for(const {node} of sections)new MutationObserver(schedule).observe(node,{attributes:true,attributeFilter:['class']});
refresh();
window.TidensCrossViewC21=Object.freeze({refresh});
})();
