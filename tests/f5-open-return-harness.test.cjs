'use strict';
// F5.3: full open/read/return flow with real v909 C1 reader over a controlled
// browser-state fixture. This is a host simulation, NOT a live app integration.
const assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm');
const {createF5HostIntegration}=require('./f5-return-host.cjs');
const c1Source=fs.readFileSync('v909-view-context-c1.js','utf8');
const {renderFullReader}=require('./f4-reader-renderer.cjs');
const specimens=require('./f4-reader-fixtures.cjs').buildFixtures();
function makeScenario(view){
 const state={view,selected:'H045',min:-955,max:-745,mapYear:-850,
  cat:new Set(['Historia','Arkeologi']),ev:new Set(['Hög']),theme:'israel',themeMode:'graph',
  scrollY:670,readerScroll:115,focusId:'nav'+view, mapCamera:{lat:36,lng:38,zoom:6},
  readerOpen:false};
 const compareIds=['H045','O067'];
 const window={TidensResearchReadModel:{has:id=>specimens.some(x=>x.entity.id===id),
  get:id=>specimens.find(x=>x.entity.id===id)?.entity||null}};
 const env={window,state,compareIds,URLSearchParams,
  location:{search:'?tv_id=H045&tv_view=research'},
  getComputedStyle:()=>({display:'block'}),
  document:{getElementById:id=>({classList:{contains:cls=>cls==='hidden'&&id!==state.view+'View'}})}};
 vm.runInNewContext(c1Source,env,{filename:'v909-view-context-c1.js',timeout:1500});
 const calls=[];const notes={open:0,close:0,verify:0};
 const host={
  snapshot:()=>window.TidensViewContextC1.snapshot(),
  captureExtra:()=>({mapYear:state.mapYear,mapCamera:{...state.mapCamera},
   theme:state.theme,themeMode:state.themeMode,scrollY:state.scrollY,
   readerScroll:state.readerScroll,focusId:state.focusId}),
  hasPost:id=>specimens.some(x=>x.entity.id===id&&x.entity.kind==='post'),
  openReader:({id})=>{
   calls.push('open');notes.open++;
   const rendered=renderFullReader(specimens.find(x=>x.entity.id===id));
   assert(rendered.includes('data-record="'+id+'"'));
   state.readerOpen=true;state.view='research';state.scrollY=0;state.focusId='researchTitle';
   state.mapYear=-200;state.mapCamera={lat:0,lng:0,zoom:2};
   state.theme='humans';state.themeMode='list';state.readerScroll=0;
  },
  closeReader:()=>{calls.push('close');notes.close++;state.readerOpen=false},
  selectedPost:c=>{calls.push('selection');state.selected=c.selectedId},
  filters:c=>{calls.push('filters');state.cat=new Set(c.filters.categories);state.ev=new Set(c.filters.evidence)},
  timelineRange:c=>{calls.push('timelineRange');state.min=c.timeRange.min;state.max=c.timeRange.max},
  mapYear:c=>{calls.push('mapYear');state.mapYear=c.extra.mapYear},
  theme:c=>{calls.push('theme');state.theme=c.extra.theme},
  themeMode:c=>{calls.push('themeMode');state.themeMode=c.extra.themeMode},
  comparison:c=>{calls.push('comparison');compareIds.splice(0,compareIds.length,...c.compareIds)},
  view:c=>{calls.push('view');state.view=c.sourceView;state.scrollY=0;state.readerScroll=0},
  mapCamera:c=>{calls.push('mapCamera');state.mapCamera={...c.extra.mapCamera}},
  readerScroll:c=>{calls.push('readerScroll');state.readerScroll=c.extra.readerScroll},
  scroll:c=>{calls.push('scroll');state.scrollY=c.extra.scrollY},
  focus:c=>{calls.push('focus');state.focusId=c.extra.focusId},
  verifyRestored:c=>{
   calls.push('verify');notes.verify++;
   const actual=window.TidensViewContextC1.snapshot();
   return !state.readerOpen&&actual.view===c.sourceView&&actual.selectedId===c.selectedId
    &&actual.timeRange.min===c.timeRange.min&&actual.timeRange.max===c.timeRange.max
    &&JSON.stringify([...state.cat])===JSON.stringify(c.filters.categories)
    &&JSON.stringify([...state.ev])===JSON.stringify(c.filters.evidence)
    &&JSON.stringify([...compareIds])===JSON.stringify(c.compareIds)
    &&state.mapYear===c.extra.mapYear
    &&state.mapCamera.zoom===c.extra.mapCamera.zoom
    &&state.mapCamera.lat===c.extra.mapCamera.lat
    &&state.mapCamera.lng===c.extra.mapCamera.lng
    &&state.theme===c.extra.theme&&state.themeMode===c.extra.themeMode
    &&state.scrollY===c.extra.scrollY&&state.readerScroll===c.extra.readerScroll
    &&state.focusId===c.extra.focusId;
  }
 };
 return {state,calls,notes,host,window,compareIds};
}
for(const view of ['timeline','map','explore','compare','research']){
 const s=makeScenario(view),integration=createF5HostIntegration(s.host);
 const before=s.host.snapshot(),extra=s.host.captureExtra();
 const c=integration.coordinator;
 assert.equal(c.enter('H045'),true,view+' should open real F4 specimen');
 assert.equal(c.isOpen(),true);
 assert.equal(s.state.scrollY,0,'Reader open resets scroll, so restore must occur after');
 assert.equal(c.enter('O067'),false,'Do not nest readers');
 assert.equal(view==='map'?c.onBrowserBack():c.onEscape(),true,view+' should restore');
 assert.equal(c.isOpen(),false);
 assert.equal(integration.diagnostics().status,'restored');
 assert.equal(s.state.view,before.view);
 assert.deepEqual(s.host.captureExtra(),extra);
 assert.deepEqual([...s.state.cat],Array.from(before.filters.categories));
 assert.deepEqual(s.compareIds,Array.from(before.compareIds));
 assert.equal(s.notes.verify,1);
 assert.deepEqual(s.calls,['open','close','selection','filters','timelineRange','mapYear',
  'theme','themeMode','comparison','view','mapCamera','readerScroll','scroll','focus','verify','close']);
 assert.equal(c.exit(),false);
}
{
 const scenario=makeScenario('map');
 delete scenario.host.mapCamera;
 const x=createF5HostIntegration(scenario.host);
 assert.equal(x.coordinator.enter('H045'),false,'Missing camera capability must block before opening');
 assert.equal(scenario.notes.open,0);
 assert.deepEqual(x.diagnostics().blockers,['restore-map-camera']);
}
{
 const scenario=makeScenario('timeline');
 scenario.host.scroll=()=>false;
 const x=createF5HostIntegration(scenario.host);
 assert(x.coordinator.enter('H045'));
 assert.equal(x.coordinator.exit(),false,'Host restore failure must not declare success');
 assert.equal(x.diagnostics().status,'restore-failed');
 assert.deepEqual(x.diagnostics().blockers,['restore-scroll']);
 assert(x.coordinator.isOpen(),'Session must remain available to retry or recover');
}
console.log('F5.3 isolated open → F4 full reader → return: PASS across timeline, map, explore, compare, research; restoration ordered and blocked on missing capabilities');
