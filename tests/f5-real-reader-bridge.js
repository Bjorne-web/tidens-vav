(function(){
'use strict';
// F5.5 TEST ONLY. Included in f5-real-reader-test.html, never index.html.
// Opens F4 HTML in a shadowed overlay above the existing actual app without
// replacing view(), setSelected(), the reader, the map or history routing.
const articles=window.__F5TestOnlyArticles||{};
const articleCss=window.__F5TestOnlyReaderCss||'';
const issues=[],events=[];
const supportedId=id=>Object.hasOwn(articles,id)&&typeof articles[id]==='string';
const canonical=()=>window.TidensViewContextC1?.snapshot?.()||null;
const report=(ok,message)=>{
 document.body.dataset.f5RealResult=ok?'PASS':'FAIL';
 document.body.dataset.f5RealScenario=new URLSearchParams(location.search).get('scenario')||'manual';
 const element=document.getElementById('f5RealResult');
 if(element)element.textContent=(ok?'PASS: ':'FAIL: ')+message;
 const output=document.getElementById('f5RealLog');
 if(output)output.textContent=JSON.stringify({message,events,issues},null,2);
};
function normalize(s){
 if(!s)return null;
 return {view:s.view,visibleSection:s.visibleSection,selectedId:s.selectedId,
  timeRange:s.timeRange,compareIds:[...(s.compareIds||[])],
  categories:[...(s.filters?.categories||[])],evidence:[...(s.filters?.evidence||[])]};
}
function getCamera(){
 try{
  if(typeof leafletMap!=='undefined'&&leafletMap&&typeof leafletMap.getCenter==='function'){
   const c=leafletMap.getCenter();
   return {lat:c?.lat,lng:c?.lng,zoom:leafletMap.getZoom?.()};
  }
 }catch(error){issues.push('camera '+error.message)}
 return null;
}
const host=document.createElement('div');host.id='f5TestOverlay';
host.setAttribute('role','dialog');host.setAttribute('aria-modal','true');
host.setAttribute('aria-label','F5.5 separat test av fullständig forskningsvy');
host.style.cssText='display:none;position:fixed;inset:0;z-index:2147483500;'+
 'background:rgba(15,34,41,.83);padding:clamp(8px,2vw,25px);overflow:auto';
const shadow=host.attachShadow({mode:'open'});
const surface=document.createElement('div');
surface.style.cssText='max-width:1350px;margin:0 auto;background:#f7faf7;border-radius:12px;min-height:85vh;box-shadow:0 18px 80px #1118';
const topbar=document.createElement('div');
topbar.style.cssText='display:flex;align-items:center;justify-content:space-between;gap:12px;padding:12px 20px;'+
 'background:#25464c;color:white;border-radius:12px 12px 0 0;font:14px system-ui';
const title=document.createElement('strong');
title.textContent='Tidens väv · F5.5 forskningsvy (endast test)';
const closeButton=document.createElement('button');
closeButton.textContent='Tillbaka till utgångsvyn ×';
closeButton.type='button';
closeButton.style.cssText='border:1px solid white;background:white;color:#25464c;padding:9px 12px;cursor:pointer;border-radius:6px';
topbar.append(title,closeButton);
const article=document.createElement('div');
article.style.cssText='padding:12px 22px 40px;overflow-wrap:anywhere';
const style=document.createElement('style');
style.textContent=articleCss+'\n:host{color:#25464c} .reader .toolbar{display:none}';
shadow.append(style);
surface.append(topbar,article);shadow.append(surface);
document.body.append(host);
const launch=document.createElement('button');
launch.id='f5TestOpenReader';launch.type='button';launch.textContent='TEST F5.5 · Öppna full forskningsvy';
launch.style.cssText='position:fixed;bottom:12px;right:12px;z-index:99999;'+
 'background:#25464c;color:white;border:1px solid white;border-radius:9px;'+
 'padding:12px 15px;font:14px system-ui;box-shadow:0 5px 22px #0005';
document.body.append(launch);
const messages=document.createElement('div');
messages.style.cssText='padding:10px;background:#f1f5f2;font:12px system-ui';
messages.innerHTML='<strong id="f5RealResult">Manuell testvärd redo</strong><pre id="f5RealLog"></pre>';
document.body.append(messages);
let session=null,sequence=0;
function open(id){
 if(session||typeof id!=='string'||!supportedId(id))return false;
 const before=normalize(canonical());
 if(!before)return false;
 const priorFocus=document.activeElement;
 const priorScroll={x:window.scrollX,y:window.scrollY};
 const priorCamera=getCamera();
 const priorMapYear=typeof state!=='undefined'?state.mapYear:null;
 const priorUrl=location.href;
 // All live app state remains the authoritative source. Unlike F5.3's
 // simulated restoration host, this test adapter never changes it.
 article.innerHTML=articles[id];
 session={id,before,priorFocus,priorScroll,priorCamera,priorMapYear,priorUrl};
 host.style.display='block';host.scrollTop=0;
 const back=shadow.querySelector('.reader .back');
 if(back)back.addEventListener('click',requestClose);
 closeButton.focus({preventScroll:true});
 history.pushState({f5TestOverlay:true,session:++sequence},'',priorUrl);
 events.push('open '+id+' from '+before.view);
 return true;
}
function finish(reason){
 if(!session)return false;
 // F5.6 fail-closed: a different underlying app view/selection/filter or
 // moving Leaflet camera while the article is open must never be reported as
 // a successful return merely because this test overlay disappears.
 const actual=normalize(canonical());
 const actualCamera=getCamera();
 const sameContext=JSON.stringify(actual)===JSON.stringify(session.before);
 const sameCamera=JSON.stringify(actualCamera)===JSON.stringify(session.priorCamera);
 if(!sameContext||!sameCamera){
  const reasonCode=!sameContext?'app-navigation-changed':'map-camera-changed';
  issues.push('Unsafe return: '+reasonCode);
  events.push('blocked '+reasonCode);
  report(false,'F5.6 blocked return: '+reasonCode);
  document.body.dataset.f5RealResult='BLOCKED';
  return false;
 }
 const saved=session;session=null;
 host.style.display='none';article.replaceChildren();
 window.scrollTo(saved.priorScroll.x,saved.priorScroll.y);
 try{saved.priorFocus?.focus?.({preventScroll:true})}catch(_){}
 const after=normalize(canonical());
 const cam=getCamera();
 const mapYear=typeof state!=='undefined'?state.mapYear:null;
 const same=(a,b)=>JSON.stringify(a)===JSON.stringify(b);
 const checks={sameC1:same(after,saved.before),sameScroll:window.scrollY===saved.priorScroll.y,
  sameCamera:same(cam,saved.priorCamera),sameMapYear:mapYear===saved.priorMapYear,
  sameUrl:location.href===saved.priorUrl,
  focus:document.activeElement===saved.priorFocus};
 const ok=Object.values(checks).every(Boolean);
 events.push('return '+reason+' '+JSON.stringify(checks));
 if(!ok)issues.push('Return mismatch '+JSON.stringify(checks));
 report(ok,'F5.5 '+saved.id+' '+saved.before.view+' '+reason+' context='+JSON.stringify(checks));
 return ok;
}
function requestClose(){
 if(!session)return false;
 // Browser history drives return. Keep existing URL unchanged.
 history.back();return true;
}
window.addEventListener('popstate',()=>{
 if(session)finish('popstate');
});
document.addEventListener('keydown',event=>{
 if(!session)return;
 if(event.key==='Escape'){event.preventDefault();requestClose();return}
 if(event.key==='Tab'){
  const available=[...shadow.querySelectorAll('button:not([disabled]),a[href],input:not([disabled]),[tabindex]:not([tabindex="-1"])')]
    .filter(el=>el.getClientRects().length>0);
  if(!available.length){event.preventDefault();closeButton.focus();return}
  const first=available[0],last=available[available.length-1];
  const focused=shadow.activeElement;
  if(event.shiftKey&&(focused===first||!available.includes(focused))){
   event.preventDefault();last.focus({preventScroll:true});
  }else if(!event.shiftKey&&(focused===last||!available.includes(focused))){
   event.preventDefault();first.focus({preventScroll:true});
  }
 }
},true);
closeButton.addEventListener('click',requestClose);
launch.addEventListener('click',()=>open('H045'));
window.F5TestOnlyReader=Object.freeze({open,close:requestClose,isOpen:()=>!!session});
function autoTest(){
 const params=new URLSearchParams(location.search);
 const scenario=params.get('scenario');
 if(!params.has('autotest'))return;
 const mobile=scenario==='mobile';
 const current=scenario==='back'?'map':scenario==='bible'?'timeline':scenario==='apocrypha'?'timeline':scenario;
 const expected=['timeline','map','explore','compare','research'].includes(current)?current:'timeline';
 const navButton=document.getElementById('nav'+expected[0].toUpperCase()+expected.slice(1));
 if(!navButton){report(false,'Missing actual app navigation: '+expected);return}
 navButton.click();
 if(canonical()?.view!==expected){report(false,'Wrong real app view '+canonical()?.view+' expected '+expected);return}
 // In the real app the map tab's C2 handler schedules TWO animation frames
 // for asynchronous fitBounds. Wait for those callbacks before recording the
 // user's "starting" camera; otherwise the snapshot races the old tab transition.
 const execute=()=>{
  const id=scenario==='bible'?'B001':scenario==='apocrypha'?'D001':
   scenario==='gilgamesh'?'O067':scenario==='topic'?'topic:good':
   scenario==='source'?'source:https://www.metmuseum.org/art/collection/search/544696':'H045';
  launch.focus({preventScroll:true});
  window.scrollTo(0,100);
  if(scenario==='invalid'){
   const urlBefore=location.href,contextBefore=normalize(canonical()),historyBefore=history.length;
   const refused=!open('BAD/URL')&&!open('H999')&&!open('javascript:alert(1)');
   const ok=refused&&!session&&host.style.display==='none'&&location.href===urlBefore&&
     history.length===historyBefore&&JSON.stringify(normalize(canonical()))===JSON.stringify(contextBefore);
   events.push('invalid ID denied '+ok);
   report(ok,'Unsupported IDs rejected without navigation or state changes');
   return;
  }
  if(!open(id)){report(false,'Could not open F4 article '+id);return}
  if(!article.textContent.includes(id)){report(false,'F4 article not rendered '+id);return}
  if(!shadow.querySelector('.reader[data-record="'+id+'"]')){report(false,'F4 article DOM missing '+id);return}
  events.push('actual app + F4 reader rendered');
  if(scenario==='double'){
   if(open('O067')||!session||session.id!=='H045'){
    report(false,'Nested article was not denied');return
   }
   events.push('second article open refused while H045 remains active');
  }
  if(scenario==='tab'){
   const before=shadow.activeElement;
   document.dispatchEvent(new KeyboardEvent('keydown',{key:'Tab',shiftKey:true,bubbles:true}));
   const focused=shadow.activeElement;
   if(!focused||!shadow.contains(focused)||focused===before){
    report(false,'Keyboard focus not contained in modal');return
   }
   events.push('Shift+Tab wrapped within modal');
  }
  if(scenario==='interrupted'){
   const control=document.getElementById('navCompare');
   control?.click();
   history.back();
   setTimeout(()=>{
    const blocked=document.body.dataset.f5RealResult==='BLOCKED'&&session&&
     issues.some(x=>x.includes('Unsafe return: app-navigation-changed'));
    if(!blocked)report(false,'Unsafe app navigation was not blocked');
   },400);
   return;
  }
  if(scenario==='back'){history.back()}
  else if(scenario==='mobile'){document.dispatchEvent(new KeyboardEvent('keydown',{key:'Escape',bubbles:true}))}
  else{closeButton.click()}
  setTimeout(()=>{if(document.body.dataset.f5RealResult!=='PASS')report(false,'Browser Back / Escape did not complete')},1600);
 };
 requestAnimationFrame(()=>requestAnimationFrame(()=>setTimeout(execute,120)));
}
setTimeout(autoTest,350);
})();