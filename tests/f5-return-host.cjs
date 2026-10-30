'use strict';
// F5.3 test-only host boundary. Requires explicit browser/restoration callbacks.
// This is NOT wired to index.html or app.js. Refuse partial restore if a
// capability is absent; a failed host callback still needs a future rollback.
const {planReturn}=require('./f5-restore-capabilities.cjs');
const {createNavigationCoordinator}=require('./f5-navigation-contract.cjs');
const operations=Object.freeze({
 'restore-selection':'selectedPost',
 'restore-filters':'filters',
 'restore-time-range':'timelineRange',
 'restore-map-year':'mapYear',
 'restore-theme':'theme',
 'restore-theme-mode':'themeMode',
 'restore-compare':'comparison',
 'restore-view':'view',
 'restore-map-camera':'mapCamera',
 'restore-reader-position':'readerScroll',
 'restore-scroll':'scroll',
 'restore-focus':'focus'
});
function prepareHost(host){
 if(!host||typeof host!=='object')throw new TypeError('Host required');
 for(const key of ['snapshot','captureExtra','hasPost','openReader','closeReader','verifyRestored'])
  if(typeof host[key]!=='function')throw new TypeError('Missing host contract: '+key);
 const available={};
 for(const callback of Object.values(operations))available[callback]=typeof host[callback]==='function';
 return Object.freeze(available);
}
function createF5HostIntegration(host){
 const available=prepareHost(host);
 let last=Object.freeze({status:'idle',blockers:Object.freeze([])});
 const record=(status,blockers=[])=>{last=Object.freeze({status,blockers:Object.freeze([...blockers])})};
 const coordinator=createNavigationCoordinator({
  getSnapshot:()=>host.snapshot(),
  getExtra:()=>host.captureExtra(),
  hasRecord:id=>host.hasPost(id),
  openReader:({id,context})=>{
   const plan=planReturn(context,available);
   if(!plan.ready){record('blocked',plan.blockers);return false}
   if(host.openReader({id,context})===false){record('open-refused');return false}
   record('open');return true;
  },
  restoreSnapshot:(context,reason)=>{
   const plan=planReturn(context,available);
   if(!plan.ready){record('blocked',plan.blockers);return false}
   // Real legacy readers and view() reset scroll and focus. The host must close
   // before doing viewport, camera, scroll and focus restoration.
   // closeReader below is idempotent if the reader was already closed.
   try{
    if(host.closeReader({reason,phase:'before-restore'})===false){
     record('close-refused');return false
    }
    for(const step of plan.steps){
     const callback=operations[step.id];
     if(host[callback](context,reason)===false){record('restore-failed',[step.id]);return false}
    }
    if(host.verifyRestored(context)!==true){record('verify-failed');return false}
    record('restored');return true;
   }catch(error){record('restore-exception',[String(error?.message||error)]);return false}
  },
  closeReader:({reason})=>{
   try{return host.closeReader({reason,phase:'after-restore'})!==false}
   catch(_){record('late-close-exception');return false}
  }
 });
 return Object.freeze({coordinator,available,diagnostics:()=>last});
}
module.exports={operations,prepareHost,createF5HostIntegration};
