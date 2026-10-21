/* Etapp C2.3: carry selected post to themes and comparison.
   Existing state and compare API remain source of truth. */
(function(){
'use strict';
const read=()=>window.TidensViewContextC1?.snapshot?.();
let lastMessage='';
function message(value){let node=document.getElementById('tvC23Note');if(!node){node=document.createElement('div');node.id='tvC23Note';node.setAttribute('role','status');node.hidden=true;document.body.append(node)}if(!value){node.hidden=true;return}node.textContent=value;node.hidden=false;lastMessage=value;}
function onThemes(){
 const s=read(),id=s?.selectedId;if(!id){message('Välj först en forskningspost i Tidslinjen.');return}
 try{
  if(typeof v829Focus!=='undefined')v829Focus.id=id;
  if(typeof v827RelationFocus!=='undefined')v827RelationFocus=id;
  if(typeof setSelected==='function')setSelected(id);
  message('Temaspår · Vald forskningspost: '+id+' · '+(s.selectedPost?.title||''));
 }catch(_){message('Posten kunde inte överföras till Temaspår.')}
}
function onCompare(){
 const s=read(),id=s?.selectedId;if(!id){message('Välj först en forskningspost i Tidslinjen.');return}
 try{
  if(typeof compareIds!=='undefined'&&Array.isArray(compareIds)&&!compareIds.includes(id)&&typeof toggleCompare==='function')toggleCompare(id);
  if(typeof setSelected==='function')setSelected(id);
  message('Jämför · Vald forskningspost: '+id+' · '+(s.selectedPost?.title||''));
 }catch(_){message('Posten kunde inte läggas till i Jämför.')}
}
document.getElementById('navExplore')?.addEventListener('click',()=>queueMicrotask(onThemes));
document.getElementById('navCompare')?.addEventListener('click',()=>queueMicrotask(onCompare));
document.getElementById('navTimeline')?.addEventListener('click',()=>message(''));
window.TidensCrossViewC23=Object.freeze({onThemes,onCompare});
})();
