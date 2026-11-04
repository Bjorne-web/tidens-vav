(function(){
'use strict';
const reader=window.TidensF5Candidate;
const c2=window.TidensC2Ready;
if(!reader||!c2)return;
const same=(a,b)=>JSON.stringify(a)===JSON.stringify(b);
let pending=false;
function waitC2(ticket,maxWait,expected){
 return new Promise(resolve=>{
  if(c2.completed()===ticket)return resolve({ok:true,reason:'already-complete'});
  let finished=false;
  const clear=()=>{clearTimeout(timer);window.removeEventListener('TidensC2MapReady',onReady);document.removeEventListener('click',onClick,true)};
  const finish=(result)=>{if(finished)return;finished=true;clear();resolve(result)};
  const onReady=e=>{
   if(e.detail?.ticket!==ticket)return;
   if(!same(reader.getSnapshot(),expected))finish({ok:false,reason:'context-changed'});
   else finish({ok:true,reason:'c2-ready-event'});
  };
  const onClick=e=>{
   if(e.target?.closest?.('[id^="nav"]'))finish({ok:false,reason:'navigation-interrupted'});
  };
  const timer=setTimeout(()=>finish({ok:false,reason:'c2-ready-timeout'}),maxWait);
  window.addEventListener('TidensC2MapReady',onReady);
  document.addEventListener('click',onClick,true);
 });
}
async function openAfterC2(id,options={}){
 if(pending||reader.getState())return {ok:false,reason:'busy'};
 const expected=reader.getSnapshot();
 if(expected?.view!=='map')return {ok:false,reason:'not-map'};
 const ticket=c2.current();
 if(!ticket)return {ok:false,reason:'no-map-navigation'};
 pending=true;
 try{
  const readiness=await waitC2(ticket,options.maxWait??2000,expected);
  if(!readiness.ok)return readiness;
  if(c2.current()!==ticket||!same(reader.getSnapshot(),expected))
   return {ok:false,reason:'context-changed'};
  // C2 completion does not imply other Leaflet observers have stopped moving.
  // Wait for a bounded quiet window, reset by Leaflet moveend, before snapshot.
  const leaflet=typeof leafletMap!=='undefined'?leafletMap:null;
  const starting=reader.getCamera();
  if(!starting)return {ok:false,reason:'camera-unavailable'};
  const quiet=await new Promise(resolve=>{
   let settled=false;
   const finish=reason=>{if(settled)return;settled=true;clearTimeout(quietTimer);clearTimeout(limitTimer);
    leaflet?.off?.('moveend',onMove);document.removeEventListener('click',onNav,true);resolve(reason)};
   const onMove=()=>{clearTimeout(quietTimer);quietTimer=setTimeout(()=>finish('quiet'),220)};
   const onNav=e=>{if(e.target?.closest?.('[id^="nav"]'))finish('navigation-interrupted')};
   let quietTimer=setTimeout(()=>finish('quiet'),220);
   const limitTimer=setTimeout(()=>finish('camera-timeout'),options.maxWait??2000);
   leaflet?.on?.('moveend',onMove);
   document.addEventListener('click',onNav,true);
  });
  if(quiet!=='quiet')return {ok:false,reason:quiet};
  if(c2.current()!==ticket||!same(reader.getSnapshot(),expected))
   return {ok:false,reason:'context-changed'};
  const ok=reader.open(id);
  return {ok,reason:ok?'opened':'reader-refused',ticket,readiness:readiness.reason};
 }finally{pending=false}
}
window.TidensF519EventOpen=Object.freeze({openAfterC2,isPending:()=>pending});
})();