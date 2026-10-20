/* C1 – gemensam läskontext. Inga skrivningar till gammal appstate.
   Alla uppgifter hämtas vid lästillfället; inga dubblett-tillstånd lagras. */
(function(){
'use strict';
const read=fn=>{try{return fn()}catch(_){return null}};
const freezeArray=values=>Object.freeze(Array.isArray(values)?[...values]:[]);
const canonicalId=id=>typeof id==='string'&&/^[A-Z]{1,2}[0-9]{3,6}$/.test(id)&&window.TidensResearchReadModel?.has(id)?id:null;
const visibleSection=()=>{
 const active=['startView','timelineView','mapView','exploreView','compareView','aboutView','researchView','recordsView'];
 return active.find(id=>{const section=document.getElementById(id);return section&&!section.classList.contains('hidden')&&getComputedStyle(section).display!=='none'})||null;
};
function snapshot(){
 const v=read(()=>state.view),id=canonicalId(read(()=>state.selected));
 const ids=read(()=>compareIds);
 const min=read(()=>state.min),max=read(()=>state.max);
 const cat=read(()=>[...state.cat]),evidence=read(()=>[...state.ev]);
 return Object.freeze({
  version:'c1-pilot',
  view:typeof v==='string'?v:null,
  visibleSection:visibleSection(),
  selectedId:id,
  selectedPost:id?window.TidensResearchReadModel.get(id):null,
  timeRange:Object.freeze({min:Number.isFinite(min)?min:null,max:Number.isFinite(max)?max:null}),
  compareIds:freezeArray((Array.isArray(ids)?ids:[]).filter(canonicalId)),
  filters:Object.freeze({categories:freezeArray(cat),evidence:freezeArray(evidence)}),
  url:Object.freeze({tvId:new URLSearchParams(location.search).get('tv_id'),tvView:new URLSearchParams(location.search).get('tv_view')})
 });
}
function diagnose(){
 const x=snapshot();
 const warnings=[];
 if(x.selectedId&&!x.selectedPost)warnings.push('Vald post saknar forskningsmodell');
 if(x.view&&x.visibleSection&&!x.visibleSection.toLowerCase().startsWith(x.view.toLowerCase()))warnings.push('Aktiv intern vy och synlig sektion skiljer sig – äldre specialvy kan vara aktiv');
 if(x.timeRange.min!=null&&x.timeRange.max!=null&&x.timeRange.min>=x.timeRange.max)warnings.push('Ogiltigt tidsintervall');
 return Object.freeze({snapshot:x,warnings:freezeArray(warnings)});
}
window.TidensViewContextC1=Object.freeze({snapshot,diagnose});
if(new URLSearchParams(location.search).has('contextdebug')){
 const root=document.createElement('aside');root.id='tvC1Diagnostics';root.setAttribute('aria-label','C1 – kontextdiagnostik (test)');const title=document.createElement('strong');title.textContent='C1 · Gemensam vykontext';const pre=document.createElement('pre');const btn=document.createElement('button');btn.textContent='Uppdatera status';btn.type='button';btn.onclick=()=>{const d=diagnose();pre.textContent=JSON.stringify({view:d.snapshot.view,visibleSection:d.snapshot.visibleSection,selectedId:d.snapshot.selectedId,timeRange:d.snapshot.timeRange,compareIds:d.snapshot.compareIds,categories:d.snapshot.filters.categories,warning:d.warnings},null,2)};
 root.append(title,btn,pre);document.body.append(root);btn.click();
}
})();
