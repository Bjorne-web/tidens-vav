(function(){
'use strict';
const q=new URLSearchParams(location.search);
if(!q.has('f518'))return;
const scenario=q.get('f518'),mode=q.get('mode')||'desktop';
const wait=ms=>new Promise(r=>setTimeout(r,ms));
const same=(a,b)=>JSON.stringify(a)===JSON.stringify(b);
let finished=false;
function done(ok,detail={}){
 if(finished)return;finished=true;
 const p=document.createElement('pre');p.id='f518Report';p.dataset.status=ok?'PASS':'FAIL';
 p.textContent=JSON.stringify({scenario,mode,ok,...detail});document.body.append(p);
}
async function run(){
 const reader=window.TidensF5Candidate,stable=window.TidensF518StableOpen;
 if(!reader||!stable)return done(false,{reason:'missing staging adapter'});
 const navMap=document.getElementById('navMap');
 if(!navMap)return done(false,{reason:'missing navMap'});
 navMap.click();
 if(scenario==='cancel-pending'){
  const attempt=stable.openWhenStable('O065');
  document.getElementById('navCompare')?.click();
  const result=await attempt;
  return done(!result.ok&&result.reason==='context-changed'&&reader.getState()===null,
    {result,view:reader.getSnapshot()?.view});
 }
 if(scenario!=='immediate-map')await wait(400);
 if(reader.getSnapshot()?.view!=='map')return done(false,{reason:'map view not active'});
 const opened=await stable.openWhenStable('O065');
 if(!opened.ok)return done(false,{reason:'stable open failed',opened});
 const before=reader.getSnapshot(),camera=reader.getCamera(),href=location.href;
 const content=reader.getDialog().shadowRoot.querySelector('[data-record="O065"] .c7-undated-reason');
 if(!content)return done(false,{reason:'missing C7 dating explanation'});
 if(scenario==='immediate-map')await wait(250);
 if(scenario==='camera-drift'){
  if(typeof leafletMap==='undefined'||!leafletMap?.setView)return done(false,{reason:'Leaflet unavailable'});
  leafletMap.setView([camera.lat+.3,camera.lng+.2],camera.zoom,{animate:false});
 }else if(scenario==='navigation-drift'){
  document.getElementById('navCompare')?.click();
 }
 const conflict=scenario==='camera-drift'||scenario==='navigation-drift';
 const close=reader.requestClose(),audit=reader.getAudit();
 if(conflict){
  const reason=scenario==='camera-drift'?'blocked:camera-changed':'blocked:context-changed';
  if(close!==false||reader.getState()?.phase!=='blocked'||!audit.includes(reason))
   return done(false,{reason:'unsafe change not blocked',close,audit});
  if(!reader.keepCurrent())return done(false,{reason:'explicit recovery refused'});
  await wait(350);
  return done(reader.getState()===null,{reason:'conflict detected, keep current only',audit:reader.getAudit(),opened});
 }
 if(close!==true)return done(false,{reason:'unexpected blocked close after stabilization',opened,audit,state:reader.getState()});
 await wait(350);
 const ok=reader.getState()===null&&same(before,reader.getSnapshot())&&
  same(camera,reader.getCamera())&&href===location.href&&
  reader.getAudit().includes('close:restored-original')&&
  !reader.getAudit().includes('blocked:camera-changed');
 done(ok,{reason:'stable open + seamless return',opened,audit:reader.getAudit()});
}
setTimeout(()=>run().catch(e=>done(false,{reason:String(e.stack||e)})),500);
setTimeout(()=>done(false,{reason:'watchdog'}),12000);
})();