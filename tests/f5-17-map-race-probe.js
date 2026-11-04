(function(){
'use strict';
const q=new URLSearchParams(location.search);
if(!q.has('f517'))return;
const scenario=q.get('f517'),mode=q.get('mode')||'desktop';
const wait=ms=>new Promise(resolve=>setTimeout(resolve,ms));
const same=(a,b)=>JSON.stringify(a)===JSON.stringify(b);
let doneOnce=false;
function done(ok,details={}){
 if(doneOnce)return;doneOnce=true;
 const node=document.createElement('pre');node.id='f517Report';node.dataset.status=ok?'PASS':'FAIL';
 node.textContent=JSON.stringify({scenario,mode,ok,...details});
 document.body.append(node);
}
async function run(){
 const reader=window.TidensF5Candidate;
 if(!reader)return done(false,{reason:'candidate bridge absent'});
 const tab=document.getElementById('navMap');
 if(!tab)return done(false,{reason:'real navMap missing'});
 tab.click();
 if(scenario!=='immediate-map')await wait(400);
 const id='O065';
 const before=reader.getSnapshot(),camera=reader.getCamera(),href=location.href;
 if(before?.view!=='map')return done(false,{reason:'real map view not active',before});
 if(!camera)return done(false,{reason:'Leaflet camera unavailable',before});
 if(!reader.open(id))return done(false,{reason:'cannot open C7 article',id});
 const pane=reader.getDialog().shadowRoot.querySelector('[data-record="'+id+'"]');
 if(!pane?.querySelector('.c7-undated-reason'))return done(false,{reason:'C7 undated reason missing'});
 const initialHistoryLength=history.length;
 let expected='';
 if(scenario==='camera-drift'){
  if(typeof leafletMap==='undefined'||typeof leafletMap.setView!=='function')return done(false,{reason:'Leaflet setView unavailable'});
  leafletMap.setView([camera.lat+0.3,camera.lng+0.2],camera.zoom,{animate:false});
  expected='blocked:camera-changed';
 }else if(scenario==='navigation-drift'){
  document.getElementById('navCompare')?.click();
  expected='blocked:context-changed';
 }else if(scenario==='immediate-map'){
  await wait(230);
 }
 if(scenario==='camera-drift'||scenario==='navigation-drift'){
  const refused=reader.requestClose()===false;
  const blocked=reader.getState()?.phase==='blocked';
  const audit=reader.getAudit();
  const preservedHistory=history.length===initialHistoryLength;
  if(!refused||!blocked||!audit.includes(expected)||!preservedHistory)
   return done(false,{reason:'unsafe transition was not fail-closed',refused,blocked,audit,preservedHistory});
  if(!reader.keepCurrent())return done(false,{reason:'explicit keep current was refused'});
  await wait(300);
  return done(reader.getState()===null,{
   reason:'conflict safely blocked, explicit keep-current required',audit:reader.getAudit(),
   view:reader.getSnapshot()?.view,
   camera:reader.getCamera()
  });
 }
 const result=reader.requestClose();
 const state=reader.getState();
 const audit=reader.getAudit();
 if(result===false&&state?.phase==='blocked'){
  if(!reader.keepCurrent())return done(false,{reason:'drift blocked but recovery refused',audit});
  await wait(300);
  return done(reader.getState()===null,{
    reason:'deferred map drift detected, blocked and explicit keep-current used',
    changed:same(camera,reader.getCamera())?false:true,audit:reader.getAudit()
  });
 }
 if(result!==true)return done(false,{reason:'close request unexpectedly rejected',state,audit});
 await wait(350);
 const restored=reader.getState()===null&&same(before,reader.getSnapshot())&&same(camera,reader.getCamera())&&href===location.href;
 done(restored,{reason:'stable return to map',audit:reader.getAudit(),restored});
}
setTimeout(()=>run().catch(error=>done(false,{reason:String(error.stack||error)})),500);
setTimeout(()=>done(false,{reason:'watchdog timeout'}),10000);
})();