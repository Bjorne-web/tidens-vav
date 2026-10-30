'use strict';
const assert=require('node:assert/strict');
const {makeRecoveryController}=require('./f5-8-safe-return.cjs');
const original={view:'map',selectedId:'H045',filters:{categories:['Historia']},
 timeRange:{min:-955,max:-745},scrollY:200};
const originalCamera={lat:36,lng:38,zoom:6};
function scenario(){
 let context=structuredClone(original),camera=structuredClone(originalCamera),historyCalls=0,closes=[];
 let allowHistory=true,allowRestore=true,correctRestore=true,allowClose=true;
 const controller=makeRecoveryController({
  readCurrent:()=>context,readCamera:()=>camera,
  beginHistoryBack:()=>{historyCalls++;return allowHistory},
  closeOverlay:result=>{closes.push(result);return allowClose},
  restoreOriginal:(wanted,wantedCamera)=>{
   if(!allowRestore)return false;
   context=structuredClone(wanted);
   if(correctRestore)camera=structuredClone(wantedCamera);
   return true;
  }
 });
 return {controller,
  moveView:()=>{context.view='compare'},
  moveCamera:()=>{camera.lat+=.5},
  get:()=>({context,camera,historyCalls,closes}),
  refuseHistory:()=>{allowHistory=false},
  refuseRestore:()=>{allowRestore=false},
  partialRestore:()=>{correctRestore=false},
  refuseClose:()=>{allowClose=false}};
}
{
 const x=scenario(),c=x.controller;
 assert.equal(c.begin(original,originalCamera),true);
 original.filters.categories.push('Mutation after begin should not change captured snapshot');
 assert.equal(c.begin(original,originalCamera),false,'No nested reader session');
 assert.equal(c.requestReturn(),true);
 assert.equal(c.state().state,'history-pending');
 assert.equal(x.get().historyCalls,1);
 assert.equal(c.requestReturn(),false,'Do not schedule duplicate browser back');
 assert.equal(c.onPopState(),true);
 assert.equal(c.state().state,'closed-original');
 assert.equal(x.get().closes[0].outcome,'restored-original');
 assert.equal(c.onPopState(),false);
 original.filters.categories.pop();
}
{
 const x=scenario(),c=x.controller;c.begin(original,originalCamera);
 x.moveView();
 assert.equal(c.requestReturn(),false,'Must reject unsafe manual return before back');
 assert.deepEqual({state:c.state().state,reason:c.state().reason},
  {state:'blocked',reason:'app-context-drift'});
 assert.equal(x.get().historyCalls,0,'No history mutation on failed preflight');
 assert.equal(x.get().closes.length,0);
 assert.equal(c.restoreOriginal(),true,'Explicit restoration can be verified');
 assert.equal(c.state().state,'closed-original');
 assert.equal(x.get().context.view,'map');
}
{
 const x=scenario(),c=x.controller;c.begin(original,originalCamera);
 x.moveCamera();
 assert.equal(c.requestReturn(),false);
 assert.equal(c.state().reason,'map-camera-drift');
 assert.equal(x.get().historyCalls,0);
 assert.equal(c.keepCurrent(),true,'Explicit keep-current action closes without overwriting camera');
 assert.equal(c.state().state,'closed-current');
 assert.equal(x.get().camera.lat,36.5);
 assert.equal(x.get().closes[0].outcome,'keep-current');
}
{
 const x=scenario(),c=x.controller;c.begin(original,originalCamera);
 assert.equal(c.requestReturn(),true);
 x.moveView(); // Drift after browser navigation was initiated, before popstate.
 assert.equal(c.onPopState(),false);
 assert.equal(c.state().reason,'app-context-drift');
 assert.equal(x.get().closes.length,0);
 assert.equal(c.keepCurrent(),true,'Do not force previous view after browser event');
}
{
 const x=scenario(),c=x.controller;c.begin(original,originalCamera);x.moveView();x.refuseRestore();
 assert.equal(c.requestReturn(),false);
 assert.equal(c.restoreOriginal(),false,'Host refusing restore cannot mark success');
 assert.equal(c.state().reason,'restore-refused');
 assert.equal(x.get().closes.length,0);
}
{
 const x=scenario(),c=x.controller;c.begin(original,originalCamera);x.moveCamera();x.partialRestore();
 assert.equal(c.requestReturn(),false);
 assert.equal(c.restoreOriginal(),false);
 assert.equal(c.state().reason,'restore-mismatch','Verify camera after attempted restore');
 assert.equal(x.get().closes.length,0);
}
{
 const x=scenario(),c=x.controller;c.begin(original,originalCamera);x.refuseHistory();
 assert.equal(c.requestReturn(),false);
 assert.equal(c.state().reason,'history-back-refused');
 assert.equal(x.get().closes.length,0);
}
{
 const x=scenario(),c=x.controller;c.begin(original,originalCamera);x.refuseClose();
 assert.equal(c.requestReturn(),true);
 assert.equal(c.onPopState(),false);
 assert.equal(c.state().reason,'close-refused');
 assert.equal(x.get().closes.length,1);
}
assert.throws(()=>makeRecoveryController({}),/Missing recovery callback/);
console.log('F5.8 safe-return design: PASS – preflight blocks history, explicit recover/keep-current and no false success');
