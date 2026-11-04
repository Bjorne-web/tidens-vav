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
  const ok=reader.open(id);
  return {ok,reason:ok?'opened':'reader-refused',ticket,readiness:readiness.reason};
 }finally{pending=false}
}
window.TidensF519EventOpen=Object.freeze({openAfterC2,isPending:()=>pending});
})();