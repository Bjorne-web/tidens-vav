(function(){
'use strict';
// Runs only in a temporary full-app copy. The live app has no F5.10 probe.
const qp=new URLSearchParams(location.search);
if(!qp.has('f510test'))return;
const scenario=qp.get('scenario')||'desktop';
const wait=ms=>new Promise(r=>setTimeout(r,ms));
let finished=false;
function finish(ok,reason,details={}){
 if(finished)return;finished=true;
 document.body.dataset.f510Result=ok?'PASS':'FAIL';
 const pre=document.createElement('pre');pre.id='f510Report';
 pre.textContent=JSON.stringify({ok,scenario,reason,...details},null,2);
 document.body.append(pre);
}
async function verify(){
 const reader=window.TidensF5Candidate,articles=window.__F510AdditionalArticles||{};
 const samples=Object.keys(articles),tally={success:[],failure:[],cameraMeasured:0,missingCamera:0};
 if(!reader||samples.length<45){finish(false,'Wide article catalogue not loaded',{count:samples.length});return}
 const view=scenario==='mobile'?'timeline':scenario==='map'?'map':'explore';
 const tab=document.getElementById('nav'+view[0].toUpperCase()+view.slice(1));
 if(!tab){finish(false,'Real app navigation not found');return}
 tab.click();
 await new Promise(done=>requestAnimationFrame(()=>requestAnimationFrame(done)));
 await wait(160);
 const original=reader.getSnapshot(),camera=reader.getCamera(),initialUrl=location.href;
 if(original?.view!==view){finish(false,'Unexpected app view',{original});return}
 const equal=(a,b)=>JSON.stringify(a)===JSON.stringify(b);
 for(const id of samples){
  const before=reader.getSnapshot(),beforeCam=reader.getCamera(),beforeUrl=location.href;
  if(!reader.open(id)){tally.failure.push({id,reason:'open refused'});continue}
  const root=reader.getDialog().shadowRoot;
  const record=root.querySelector('[data-record="'+CSS.escape(id)+'"]');
  const correct=record&&record.querySelector('h1')&&record.textContent.includes('Källor och ursprung')&&record.dataset.kind==='post';
  if(!correct){tally.failure.push({id,reason:'full F4 article not visible'});break}
  if(reader.open('H045')){tally.failure.push({id,reason:'nested article unexpectedly opened'});break}
  const rootWidth=reader.getDialog().getBoundingClientRect().width;
  if(rootWidth>window.innerWidth+2){tally.failure.push({id,reason:'overlay outside viewport',rootWidth});break}
  if(!reader.requestClose()){tally.failure.push({id,reason:'return preflight failed'});break}
  let attempts=0;
  while(reader.getState()&&attempts++<30)await wait(30);
  if(reader.getState()){tally.failure.push({id,reason:'history return did not close'});break}
  if(!equal(before,reader.getSnapshot())||!equal(beforeCam,reader.getCamera())||beforeUrl!==location.href){
   tally.failure.push({id,reason:'C1, camera or URL changed'});break
  }
  if(beforeCam&&Number.isFinite(beforeCam.zoom))tally.cameraMeasured++;
  else tally.missingCamera++;
  tally.success.push(id);
 }
 finish(tally.failure.length===0&&tally.success.length===samples.length,
   'Full-app F4 reader open/read/return over expanded real corpus sample',{
    expected:samples.length,passed:tally.success.length,failed:tally.failure,
    cameraMeasured:tally.cameraMeasured,missingCamera:tally.missingCamera,
    view,mobileViewport:window.innerWidth<600,
    originalUnchanged:equal(original,reader.getSnapshot())&&equal(camera,reader.getCamera())&&location.href===initialUrl,
    groups:[...new Set(samples.map(id=>id.slice(0,1)))]
   });
}
setTimeout(()=>verify().catch(e=>finish(false,String(e.stack||e))),450);
setTimeout(()=>{if(!finished)finish(false,'Browser watchdog expired')},30000);
})();
