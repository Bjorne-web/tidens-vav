/* F5.9 staging candidate only. Loaded only by the temporary test HTML. */
(function(){
'use strict';
if(window.TidensF5CandidateConfig?.enabled!==true)return;
const cfg=window.TidensF5CandidateConfig,docs=cfg.articles||{};
const equal=(a,b)=>JSON.stringify(a)===JSON.stringify(b);
function snapshot(){
 const x=window.TidensViewContextC1?.snapshot?.();if(!x)return null;
 return {view:x.view,visibleSection:x.visibleSection,selectedId:x.selectedId,
  timeRange:{min:x.timeRange?.min??null,max:x.timeRange?.max??null},
  compareIds:Array.from(x.compareIds||[]),
  categories:Array.from(x.filters?.categories||[]),evidence:Array.from(x.filters?.evidence||[])};
}
function camera(){
 try{
  if(typeof leafletMap==='undefined'||!leafletMap||typeof leafletMap.getCenter!=='function')return null;
  const c=leafletMap.getCenter(),zoom=leafletMap.getZoom?.();
  return c&&Number.isFinite(c.lat)&&Number.isFinite(c.lng)&&Number.isFinite(zoom)?{lat:c.lat,lng:c.lng,zoom}:null;
 }catch(_){return null}
}
const shell=document.createElement('div');shell.id='f5CandidateDialog';
shell.style.cssText='display:none;position:fixed;inset:0;background:#102734e0;z-index:2147483000;overflow:auto;padding:12px';
shell.setAttribute('role','dialog');shell.setAttribute('aria-modal','true');shell.setAttribute('aria-label','Fullständig forskningsvy');
const root=shell.attachShadow({mode:'open'});
const style=document.createElement('style');
style.textContent=(cfg.css||'')+
 '.f5candidate-panel{max-width:1280px;min-height:80vh;margin:0 auto;background:#f7f9f8;border-radius:12px;overflow:hidden;color:#183646;font:15px system-ui}'+
 '.f5candidate-bar{display:flex;align-items:center;gap:12px;justify-content:space-between;padding:12px 18px;background:#24454e;color:white}'+
 '.f5candidate-bar button,.f5candidate-warning button{border:1px solid #7f9caa;border-radius:6px;background:white;color:#163846;padding:9px 13px;cursor:pointer;font:inherit}'+
 '.f5candidate-content{padding:12px 20px 36px;overflow-wrap:anywhere}'+
 '.f5candidate-warning{background:#fff3e7;border-left:4px solid #aa6835;padding:16px;margin:14px 20px}'+
 '.f5candidate-warning[hidden]{display:none}.f5candidate-actions{display:flex;flex-wrap:wrap;gap:10px}';
const panel=document.createElement('section');panel.className='f5candidate-panel';
const bar=document.createElement('div');bar.className='f5candidate-bar';
const heading=document.createElement('strong');heading.textContent='Tidens väv · Fullständig forskningsvy';
const close=document.createElement('button');close.textContent='Tillbaka till utgångsvyn';close.type='button';
bar.append(heading,close);
const warning=document.createElement('section');warning.className='f5candidate-warning';warning.hidden=true;
const warningHeading=document.createElement('strong');warningHeading.textContent='Utgångsläget har förändrats';
const warningText=document.createElement('p');warningText.textContent='Det går inte att återgå säkert. Du kan fortsätta läsa eller behålla det nuvarande läget.';
const actions=document.createElement('div');actions.className='f5candidate-actions';
const continueBtn=document.createElement('button');continueBtn.textContent='Fortsätt läsa';
const keepBtn=document.createElement('button');keepBtn.textContent='Behåll aktuellt läge och stäng';
actions.append(continueBtn,keepBtn);warning.append(warningHeading,warningText,actions);
const article=document.createElement('main');article.className='f5candidate-content';
panel.append(bar,warning,article);root.append(style,panel);document.body.append(shell);
let session=null,serial=0;const audit=[];
const state=()=>session?{id:session.id,phase:session.phase}:null;
function changed(){
 if(!session)return 'no-session';
 if(!equal(snapshot(),session.context))return 'context-changed';
 if(!equal(camera(),session.camera))return 'camera-changed';
 return null;
}
function block(reason){
 if(!session)return;
 session.phase='blocked';session.reason=reason;warning.hidden=false;
 audit.push('blocked:'+reason);continueBtn.focus({preventScroll:true});
}
function finish(outcome){
 if(!session)return false;
 const saved=session;session=null;
 shell.style.display='none';warning.hidden=true;article.replaceChildren();
 document.documentElement.style.overflow=saved.overflow;
 try{saved.focus?.focus?.({preventScroll:true})}catch(_){}
 audit.push('close:'+outcome);return true;
}
function open(id){
 if(session||typeof id!=='string'||!Object.prototype.hasOwnProperty.call(docs,id)||
  typeof docs[id]!=='string'||!docs[id].includes('data-record="'+id+'"'))return false;
 const context=snapshot();if(!context)return false;
 const focus=document.activeElement,overflow=document.documentElement.style.overflow;
 const initialCamera=camera(),url=location.href;
 session={id,context,camera:initialCamera,url,focus,overflow,phase:'reading'};
 article.innerHTML=docs[id];shell.style.display='block';shell.scrollTop=0;warning.hidden=true;
 document.documentElement.style.overflow='hidden';
 history.pushState({f5Candidate:true,serial:++serial},'',url);
 close.focus({preventScroll:true});audit.push('open:'+id);return true;
}
function requestClose(){
 if(!session||session.phase==='history-pending')return false;
 const reason=changed();if(reason){block(reason);return false}
 session.phase='history-pending';audit.push('back-request');history.back();return true;
}
function onHistory(){
 if(!session)return;
 const reason=changed();if(reason){block(reason);return}
 finish('restored-original');
}
function keepCurrent(){
 if(!session||session.phase!=='blocked')return false;
 return finish('keep-current');
}
function continueReading(){
 if(!session||session.phase!=='blocked')return false;
 warning.hidden=true;session.phase='reading';close.focus({preventScroll:true});return true;
}
close.addEventListener('click',requestClose);
continueBtn.addEventListener('click',continueReading);
keepBtn.addEventListener('click',keepCurrent);
window.addEventListener('popstate',onHistory);
document.addEventListener('keydown',e=>{
 if(!session)return;
 if(e.key==='Escape'){e.preventDefault();requestClose();return}
 if(e.key!=='Tab')return;
 const controls=[...root.querySelectorAll('button:not([disabled]),a[href],input:not([disabled]),[tabindex]:not([tabindex="-1"])')]
  .filter(el=>el.getClientRects().length);
 const first=controls[0],last=controls[controls.length-1],active=root.activeElement;
 if(!first){e.preventDefault();close.focus();return}
 if(e.shiftKey&&(active===first||!controls.includes(active))){e.preventDefault();last.focus({preventScroll:true})}
 else if(!e.shiftKey&&(active===last||!controls.includes(active))){e.preventDefault();first.focus({preventScroll:true})}
},true);
window.TidensF5Candidate=Object.freeze({
 open,requestClose,keepCurrent,continueReading,getState:state,
 getAudit:()=>audit.slice(),getSnapshot:snapshot,getCamera:camera,
 getDialog:()=>shell
});
})();
