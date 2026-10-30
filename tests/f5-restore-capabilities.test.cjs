'use strict';
// F5.2: prove blockers are explicit and no assertion of production restoration.
const assert=require('node:assert/strict');
const {captureContext}=require('./f5-navigation-contract.cjs');
const {planReturn}=require('./f5-restore-capabilities.cjs');
const c1={view:'map',visibleSection:'mapView',selectedId:'H045',
 timeRange:{min:-950,max:-750},compareIds:['H045','O067'],
 filters:{categories:['Arkeologi','Historia'],evidence:['Hög']},
 url:{tvId:'H045',tvView:'map'}};
const saved=captureContext(c1,{
 mapYear:-853,mapCamera:{lat:36.5,lng:38.2,zoom:7},
 scrollY:950,readerScroll:110,focusId:'navMap',
 theme:'israel',themeMode:'graph'
});
const partial={selectedPost:true,filters:true,timelineRange:true,mapYear:true,
 theme:true,view:true,comparison:true,readerScroll:true};
const plan=planReturn(saved,partial);
assert.equal(plan.ready,false,'Capturing a context is not proof it can be restored');
assert.deepEqual(plan.blockers,['restore-theme-mode','restore-map-camera','restore-scroll','restore-focus']);
const expected=plan.steps.map(x=>x.id);
assert(expected.indexOf('restore-map-camera')>expected.indexOf('restore-view'),
 'Leaflet camera must be restored after view/map auto-sync');
assert(expected.indexOf('restore-scroll')>expected.indexOf('restore-view'),
 'Scroll restoration must follow view transition, which resets scroll');
assert.deepEqual(plan.steps.filter(x=>x.supported).map(x=>x.capability),
 ['selectedPost','filters','timelineRange','mapYear','theme','comparison','view','readerScroll']);
assert(Object.isFrozen(plan)&&Object.isFrozen(plan.blockers));
const full=Object.fromEntries(plan.steps.map(x=>[x.capability,true]));
assert.equal(planReturn(saved,full).ready,true,'Preflight is satisfied only when host provides every restore capability');
assert.equal(planReturn(saved,{...full,mapCamera:false}).ready,false);
assert.throws(()=>planReturn({...saved,sourceView:'invented'},full),/Unsupported/);
assert.throws(()=>planReturn({...saved,timeRange:{min:0,max:-1}},full),/Invalid time range/);
assert.throws(()=>planReturn({...saved,extra:{scrollY:-4}},full),/Invalid scroll/);
assert.throws(()=>planReturn({...saved,extra:{mapCamera:{lat:'bad',lng:30,zoom:3}}},full),/Invalid map camera/);
const simple=captureContext({...c1,view:'about',visibleSection:'aboutView',selectedId:null,
 compareIds:[],timeRange:{},filters:{}},{});
const simplePlan=planReturn(simple,{view:true,filters:true});
assert.equal(simplePlan.ready,true);
assert(!simplePlan.steps.some(x=>x.id==='restore-map-camera'));
console.log('F5.2 restoration capability matrix: PASS – camera/theme mode/scroll/focus explicitly block premature integration');
