/* Etapp C2 – första synliga övergången mellan huvudvyerna.
   Läs post-ID ur C1, använd endast befintliga navigationsknappar.
   Lägger inte till nytt internt state eller kartkoordinater. */
(function(){
'use strict';
const root=document.createElement('div');root.id='tvC2Bridge';root.hidden=true;root.setAttribute('aria-label','Följ vald forskningspost');
const label=document.createElement('span');label.id='tvC2BridgeLabel';const go=document.createElement('button');go.type='button';
const back=document.createElement('button');back.type='button';back.textContent='← Tillbaka till Tidslinje';
root.append(label,go,back);document.body.append(root);
let currentId=null;
function snapshot(){return window.TidensViewContextC1?.snapshot?.()}
function navigate(navId){if(!currentId)return;const target=document.getElementById(navId);if(!target)return;target.click();try{if(typeof setSelected==='function')setSelected(currentId)}catch(_){}refresh()}
go.onclick=()=>navigate('navMap');back.onclick=()=>navigate('navTimeline');
function refresh(){
 const x=snapshot();const section=x?.visibleSection;const id=x?.selectedId;
 const showing=section==='timelineView'||section==='mapView';
 if(!showing||!id){root.hidden=true;currentId=null;return}
 currentId=id;root.hidden=false;const isMap=section==='mapView';
 label.textContent='Vald post: '+id+' · '+(x.selectedPost?.title||'Forskningspost');
 go.hidden=isMap;back.hidden=!isMap;go.textContent='Visa samma post i Karta →';
}
window.TidensCrossViewC2=Object.freeze({refresh,navigateToMap:()=>navigate('navMap'),backToTimeline:()=>navigate('navTimeline')});
document.addEventListener('click',()=>queueMicrotask(refresh));
const target=document.getElementById('timelineView');if(target)new MutationObserver(refresh).observe(target,{attributes:true,attributeFilter:['class']});
const map=document.getElementById('mapView');if(map)new MutationObserver(refresh).observe(map,{attributes:true,attributeFilter:['class']});
refresh();
})();
