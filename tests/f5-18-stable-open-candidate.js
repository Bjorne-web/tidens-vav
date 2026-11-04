(function(){
'use strict';
// F5.18 opt-in staging only: allow C2's scheduled map fit to settle BEFORE reader.open()
// No mutation to v910 or live application. Abort if the underlying view changes.
const reader=window.TidensF5Candidate;
if(!reader)return;
const same=(a,b)=>JSON.stringify(a)===JSON.stringify(b);
const wait=ms=>new Promise(resolve=>setTimeout(resolve,ms));
const active=()=>reader.getSnapshot();
const cam=()=>reader.getCamera();
let pending=false;
async function openWhenStable(id,options={}){
 if(pending||reader.getState())return {ok:false,reason:'busy'};
 const expected=active();
 if(expected?.view!=='map')return {ok:false,reason:'not-map'};
 pending=true;
 try{
  const maxWait=options.maxWait??1800,interval=options.interval??75;
  const start=performance.now();
  let previous=null,stableSamples=0,samples=0;
  while(performance.now()-start<maxWait){
   await wait(interval);
   const now=active(),camera=cam();
   if(!same(now,expected))return {ok:false,reason:'context-changed',samples};
   if(!camera)return {ok:false,reason:'camera-unavailable',samples};
   stableSamples=previous&&same(camera,previous)?stableSamples+1:0;
   previous=camera;samples++;
   // At least 3 elapsed samples and two consecutive stable measurements
   // This is a staging heuristic, not a general promise of Leaflet moveend.
   if(samples>=3&&stableSamples>=2){
    const ok=reader.open(id);
    return {ok,reason:ok?'opened':'reader-refused',samples,camera};
   }
  }
  return {ok:false,reason:'camera-not-stable-timeout',samples};
 }finally{pending=false}
}
window.TidensF518StableOpen=Object.freeze({openWhenStable,isPending:()=>pending});
})();