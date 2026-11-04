(function(){
'use strict';
const q=new URLSearchParams(location.search);
if(!q.has('f519'))return;
const scenario=q.get('f519'),mode=q.get('mode')||'desktop';
const wait=n=>new Promise(r=>setTimeout(r,n));
const same=(a,b)=>JSON.stringify(a)===JSON.stringify(b);
let finished=false;
function done(ok,detail={}){
 if(finished)return;finished=true;
 const p=document.createElement('pre');p.id='f519Report';p.dataset.status=ok?'PASS':'FAIL';
 p.textContent=JSON.stringify({ok,scenario,mode,...detail});document.body.append(p);
}
async function run(){
 const reader=window.TidensF5Candidate,gate=window.TidensF519EventOpen;
 const c2=window.TidensC2Ready;
 if(!reader||!gate||!c2)return done(false,{reason:'candidate unavailable'});
 const nav=document.getElementById('navMap');
 if(!nav)return done(false,{reason:'map navigation missing'});
 nav.click();
 if(scenario==='cancel-pending'){
  const attempt=gate.openAfterC2('O065');
  document.getElementById('navCompare').click();
  const r=await attempt;
  return done(!r.ok&&reader.getState()===null&&reader.getSnapshot()?.view==='compare',
   {reason:'cancel pending on navigation',result:r});
 }
 if(scenario==='double-request'){
  const first=gate.openAfterC2('O065'),second=await gate.openAfterC2('O065');
  const result=await first;
  if(second.reason!=='busy'||!result.ok)return done(false,{first:result,second});
 }else if(scenario==='repeat-map'){
  document.getElementById('navExplore').click();
  nav.click();
  document.getElementById('navExplore').click();
  nav.click();
  const res=await gate.openAfterC2('O065');
  if(!res.ok)return done(false,{reason:'repeated map navigation',res});
 }else{
  if(scenario!=='immediate-map')await wait(400);
  const result=await gate.openAfterC2('O065');
  if(!result.ok)return done(false,{reason:'opening after C2 failed',result});
 }
 const before=reader.getSnapshot(),beforeCam=reader.getCamera(),url=location.href;
 if(before?.view!=='map'||!beforeCam||!reader.getDialog().shadowRoot.querySelector('[data-record="O065"] .c7-undated-reason'))
  return done(false,{reason:'missing map, camera, or article'});
 if(scenario==='immediate-map')await wait(220);
 if(scenario==='camera-drift'){
  leafletMap.setView([beforeCam.lat+.27,beforeCam.lng+.2],beforeCam.zoom,{animate:false});
 }else if(scenario==='navigation-drift'){
  document.getElementById('navCompare').click();
 }
 const conflict=['camera-drift','navigation-drift'].includes(scenario);
 const closed=reader.requestClose();
 if(conflict){
  const mark=scenario==='camera-drift'?'blocked:camera-changed':'blocked:context-changed';
  if(closed!==false||reader.getState()?.phase!=='blocked'||!reader.getAudit().includes(mark))
   return done(false,{reason:'conflict not safely blocked',closed,audit:reader.getAudit()});
  if(!reader.keepCurrent())return done(false,{reason:'keep current unavailable'});
  await wait(330);
  return done(reader.getState()===null,{reason:'intentional drift safely blocked',audit:reader.getAudit()});
 }
 if(closed!==true)return done(false,{reason:'unexpected blocked close',audit:reader.getAudit()});
 await wait(330);
 const ok=reader.getState()===null&&same(before,reader.getSnapshot())&&same(beforeCam,reader.getCamera())&&
  location.href===url&&reader.getAudit().includes('close:restored-original')&&!reader.getAudit().includes('blocked:camera-changed');
 done(ok,{reason:'event-ready seamless return',audit:reader.getAudit(),completed:c2.completed()});
}
setTimeout(()=>run().catch(e=>done(false,{reason:String(e.stack||e)})),500);
setTimeout(()=>done(false,{reason:'watchdog'}),12000);
})();