'use strict';
// F5.1: run ACTUAL v909 C1 code with controlled state, without a browser/app mutation.
const assert=require('node:assert/strict');
const fs=require('node:fs'),vm=require('node:vm');
const {captureContext,currentLink,createNavigationCoordinator}=require('./f5-navigation-contract.cjs');
const contextSource=fs.readFileSync('v909-view-context-c1.js','utf8');
const cases=['timeline','explore','map','compare','research'];
function actualSnapshot(view){
 const state={view,selected:'H045',min:-1000,max:100,
  cat:new Set(['Arkeologi','Historia']),ev:new Set(['Hög'])};
 const compareIds=['H045','O067'];
 const el={classList:{contains:x=>x!== 'hidden'}};
 const env={window:{TidensResearchReadModel:{has:id=>['H045','O067'].includes(id),
   get:id=>({id,kind:'post'})}},
  document:{getElementById:id=>id===view+'View'?el:null},
  state,compareIds,URLSearchParams,
  location:{search:'?tv_id=H045&tv_view='+view},
  getComputedStyle:()=>({display:'block'})};
 vm.runInNewContext(contextSource,env,{filename:'v909-view-context-c1.js',timeout:1500});
 return {snapshot:env.window.TidensViewContextC1.snapshot(),state,compareIds};
}
for(const view of cases){
 const {snapshot,state,compareIds}=actualSnapshot(view);
 assert.equal(snapshot.view,view);
 assert.equal(snapshot.selectedId,'H045');
 assert.equal(snapshot.timeRange.min,-1000);
 assert.equal(snapshot.timeRange.max,100);
 assert.deepEqual(Array.from(snapshot.filters.categories),['Arkeologi','Historia']);
 assert.deepEqual(Array.from(snapshot.compareIds),['H045','O067']);
 const extra={scrollY:880,map:{year:-850,zoom:6,center:[34,32]},gantt:{order:'ascending'}};
 const captured=captureContext(snapshot,extra);
 assert(Object.isFrozen(captured)&&Object.isFrozen(captured.extra));
 assert.equal(captured.sourceView,view);
 assert.equal(captured.visibleSection,view+'View');
 assert.deepEqual(captured.extra.map.center,[34,32]);
 // Existing app state must remain the single source of truth, never changed by F5 contract.
 const before={view:state.view,selected:state.selected,cats:[...state.cat],compare:[...compareIds]};
 const calls=[];let restoration=null;
 const coordinator=createNavigationCoordinator({
  getSnapshot:()=>snapshot,getExtra:()=>extra,
  hasRecord:id=>id==='H045',
  openReader:({id,context})=>{calls.push('open:'+id);assert.equal(context.sourceView,view)},
  restoreSnapshot:(saved,reason)=>{calls.push('restore:'+reason);restoration=saved},
  closeReader:({reason})=>calls.push('close:'+reason)
 });
 assert.equal(coordinator.enter('H045'),true);
 assert.equal(coordinator.isOpen(),true);
 assert.equal(coordinator.enter('H045'),false,'Do not nest open readers');
 assert.equal(coordinator.enter('UNKNOWN'),false);
 assert.equal((view==='map'?coordinator.onBrowserBack():coordinator.onEscape()),true);
 assert.equal(coordinator.isOpen(),false);
 assert.equal(restoration.sourceView,view);
 assert.deepEqual(restoration.extra,extra);
 assert.deepEqual({view:state.view,selected:state.selected,cats:[...state.cat],compare:[...compareIds]},before);
 assert.equal(calls.length,3);
 assert.equal(coordinator.exit(),false);
}
const {snapshot}=actualSnapshot('timeline');
assert.throws(()=>captureContext(null),/required/);
assert.throws(()=>captureContext({...snapshot,view:null}),/source view/);
assert.throws(()=>createNavigationCoordinator({}),/callback/);
const failing=createNavigationCoordinator({
 getSnapshot:()=>snapshot,getExtra:()=>({}),
 hasRecord:()=>true,openReader:()=>{throw new Error('blocked')},
 restoreSnapshot:()=>true,closeReader:()=>true
});
assert.equal(failing.enter('H045'),false);
assert.equal(failing.isOpen(),false);
const unrestorable=createNavigationCoordinator({
 getSnapshot:()=>snapshot,getExtra:()=>({}),
 hasRecord:()=>true,openReader:()=>true,
 restoreSnapshot:()=>false,closeReader:()=>true
});
assert(unrestorable.enter('H045'));
assert.equal(unrestorable.exit(),false);
assert(unrestorable.isOpen(),'Keep captured navigation session if restore declines');
assert.equal(currentLink('https://tidens-vav.pages.dev/?unused=1#detail','H045','research'),
 'https://tidens-vav.pages.dev/?tv_id=H045&tv_view=research');
assert.equal(currentLink('https://tidens-vav.pages.dev','topic:good'),null,
 'Existing deep-link schema must not be silently extended to topic IDs');
assert.equal(currentLink('https://tidens-vav.pages.dev','BAD/URL'),null);
assert.equal(currentLink('javascript:alert(1)','H045'),null);
assert.equal(currentLink('https://tidens-vav.pages.dev','H045','unregistered'),null);
console.log('F5.1 actual C1 context navigation: PASS across timeline, explore, map, compare and research; URL compatible; fail-closed');
