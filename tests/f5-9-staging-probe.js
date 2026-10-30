(function(){
'use strict';
// Test-only Chromium exercise of F5.9 staging candidate inside real app clone.
const params=new URLSearchParams(location.search),scenario=params.get('scenario')||'timeline';
if(!params.has('autotest'))return;
const eventLog=[],originalHref=location.href;
let finished=false;
const wait=ms=>new Promise(resolve=>setTimeout(resolve,ms));
const equal=(a,b)=>JSON.stringify(a)===JSON.stringify(b);
function record(ok,why,more={}){
 if(finished)return;finished=true;
 document.body.dataset.f59Result=ok?'PASS':'FAIL';
 document.body.dataset.f59Scenario=scenario;
 const pre=document.createElement('pre');pre.id='f59Report';
 pre.textContent=JSON.stringify({ok,why,scenario,events:eventLog,...more},null,2);
 document.body.append(pre);
}
async function run(){
 const reader=window.TidensF5Candidate;
 if(!reader){record(false,'Candidate not activated in test copy');return}
 const requestedView=['map','compare','explore','research'].includes(scenario)?scenario:
  ['conflict-camera','browser-back'].includes(scenario)?'map':'timeline';
 const tab=document.getElementById('nav'+requestedView[0].toUpperCase()+requestedView.slice(1));
 if(!tab){record(false,'Missing real nav '+requestedView);return}
 tab.click();
 await new Promise(resolve=>requestAnimationFrame(()=>requestAnimationFrame(resolve)));
 await wait(140); // real C2 deferred fitBounds must have completed
 if(reader.getSnapshot()?.view!==requestedView){record(false,'Real app tab did not activate');return}
 const entryCamera=reader.getCamera(),entrySnapshot=reader.getSnapshot();
 const id=scenario==='bible'?'B001':scenario==='apocrypha'?'D001':scenario==='gilgamesh'?'O067':
  scenario==='topic'?'topic:good':
  scenario==='source'?'source:https://www.metmuseum.org/art/collection/search/544696':'H045';
 if(scenario==='invalid'){
  const noEntry=!reader.open('not-a-post')&&!reader.open('H999')&&reader.getState()===null;
  record(noEntry&&location.href===originalHref,'Invalid IDs must not mutate history or open reader');
  return;
 }
 if(!reader.open(id)){record(false,'Failed to open F4 '+id);return}
 eventLog.push('open:'+id);
 const shell=reader.getDialog();
 const rendered=shell.shadowRoot.querySelector('[data-record="'+id+'"]');
 if(!rendered){record(false,'F4 article content not present');return}
 if(scenario==='nested'&&!reader.open('O067'))eventLog.push('nested-denied');
 else if(scenario==='nested'){record(false,'Nested reader not prevented');return}
 const assertClosed=outcome=>{
  const audit=reader.getAudit(),s=reader.getState();
  const ok=s===null&&audit.includes('close:'+outcome);
  const intact=equal(entrySnapshot,reader.getSnapshot())&&equal(entryCamera,reader.getCamera());
  record(ok&&(outcome!=='restored-original'||intact),
   'Return '+outcome+'; snapshot preserved='+intact,{audit,intact,cameraMeasured:!!entryCamera});
 };
 if(scenario==='conflict-nav'||scenario==='conflict-popstate'||scenario==='resume'){
  document.getElementById('navCompare').click();
  eventLog.push('real-nav-behind-modal');
  if(scenario==='conflict-popstate'||scenario==='resume'){
   history.back();
   await wait(350);
  }else{
   const before=history.length;
   if(reader.requestClose()!==false){record(false,'Unsafe return not preflight-blocked');return}
   if(history.length!==before){record(false,'Preflight changed history');return}
  }
  if(reader.getState()?.phase!=='blocked'){record(false,'Changed C1 was not blocked');return}
  eventLog.push('blocked-before-restore');
  if(scenario==='resume'){
   if(!reader.continueReading()){record(false,'Continue reading unavailable');return}
   if(reader.getState()?.phase!=='reading'){record(false,'Reader did not resume');return}
   if(reader.requestClose()!==false){record(false,'Resumed reader ignored changed context');return}
  }
  if(!reader.keepCurrent()){record(false,'Keep-current recovery refused');return}
  await wait(250);
  if(reader.getSnapshot()?.view!=='compare'){record(false,'Explicit keep-current overwrote compare view');return}
  assertClosed('keep-current');return;
 }
 if(scenario==='conflict-camera'){
  if(typeof leafletMap==='undefined'||!leafletMap||!entryCamera){
   record(false,'Real Leaflet camera unavailable');return
  }
  leafletMap.setView([entryCamera.lat+.25,entryCamera.lng+.2],entryCamera.zoom,{animate:false});
  if(reader.requestClose()!==false||reader.getState()?.phase!=='blocked'){
   record(false,'Map camera drift was not blocked before back');return
  }
  eventLog.push('camera-change-blocked');
  if(!reader.keepCurrent()){record(false,'Cannot keep changed camera');return}
  await wait(250);assertClosed('keep-current');return;
 }
 if(scenario==='browser-back')history.back();
 else reader.requestClose();
 await wait(350);
 assertClosed('restored-original');
}
setTimeout(()=>run().catch(error=>record(false,error.stack||String(error))),420);
setTimeout(()=>{if(!finished)record(false,'Staging test watchdog expired')},5500);
})();
