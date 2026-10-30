'use strict';
// F5.7 release audit. A green TEST means "risk classification is truthful",
// never "the production release is ready".
const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm');
const assert=require('node:assert/strict');
const read=p=>fs.readFileSync(p,'utf8');
const runtime=read('v897-research-read-model.js');
const fake={
 window:{sourceCardsV86:{H045:{summary:'Kontrollerbar sammanfattning',context:'Kontrollerbart sammanhang'}}},
 idEvent:id=>id==='H045'?{id,title:'Ahab – testobjekt',start:-853,end:-853}:null,
 URL
};
vm.runInNewContext(runtime,fake,{filename:'v897-research-read-model.js',timeout:1500});
const historical=fake.window.TidensResearchReadModel.get('H045');
assert.equal(historical.summary,'Kontrollerbar sammanfattning','Real legacy research model must be exercised');
assert.equal(historical.context,'Kontrollerbart sammanhang');
const lostProvenance=Object.keys(historical.provenance).length===0;
assert(lostProvenance,'v897 provenance behavior has changed; redo evidence review before deciding release');
assert(runtime.indexOf('const postProvenance=')<runtime.indexOf("summary:pick('summary'"),
 'Original v897 freeze-before-pick issue must be reviewed if upstream changes');

const c2=read('v910-cross-view-c2.js');
const mapSchedulesTwoFrames=c2.includes('requestAnimationFrame(()=>requestAnimationFrame(syncToPost))');
assert(mapSchedulesTwoFrames,'C2 map timing contract changed; revalidate race before any release');
const legacy=read('v835-deeplinks.js');
assert(legacy.includes("new Set(['explore','timeline','research'])"),'v835 URL allowed views changed');
assert(legacy.includes('const ID_PATTERN=/^(?:[A-Z][0-9]{3,6}|AP[0-9]{3})$/;'),
 'v835 post ID format changed – must update link tests');

const html=read('index.html'),quick=read('v898-quick-research-pilot.js');
assert(!html.includes('f5-real-reader-bridge.js')&&!html.includes('f5TestOpenReader'),
 'F5 test-only bridge must not be present in production HTML');
assert(quick.includes('Öppna befintlig fördjupning'),'Existing quick reader action is still active');

const copy=read('tests/f5-generate-real-reader-copy.cjs');
const bridge=read('tests/f5-real-reader-bridge.js');
const browser=read('tests/f5-real-reader-browser.sh');
assert(copy.includes('f5-real-reader-test.html')&&copy.includes('f5-real-reader-data.js'));
assert(bridge.includes("host.attachShadow({mode:'open'})"),'F5 test reader containment has changed');
const specimen=['H045','O067','B001','D001','topic:good','source:https://www.metmuseum.org/art/collection/search/544696'];
for(const id of specimen)assert(copy.includes(id),'F4 research specimen missing in F5 test copy: '+id);
for(const scenario of ['timeline','map','explore','compare','research','mobile','back',
  'bible','apocrypha','gilgamesh','topic','source','invalid','double','tab','interrupted',
  'camera-drift','deeplink'])
 assert(browser.includes(scenario),'F5 Chromium scenario missing: '+scenario);

const gates=[
 {id:'G01',status:'tested-isolated',area:'Full F4 article can overlay actual app clone',
  evidence:'F5.5/F5.6 Chromium actual index copy + F4 renderer',
  releaseRequirement:'Wire into approved product navigation; do not add seventh main tab'},
 {id:'G02',status:'tested-isolated',area:'C1/URL/filter/scroll/Leaflet camera return on unchanged host',
  evidence:'Real app clone return-audit (camera actually measured), 18 cases including blocked negative scenarios',
  releaseRequirement:'Real production integration, rapid transitions and full device coverage'},
 {id:'G03',status:'tested-isolated',area:'Actual original app quick window and B001/D001 existing book readers',
  evidence:'F5.4 original app smoke and B/D reader checks',
  releaseRequirement:'Protect more biblical/apocryphal/special-reader cases on mobile and desktop'},
 {id:'G04',status:'blocked',area:'Product route and full reader trigger',
  evidence:'index.html does not load F5 bridge; F5 only injected into CI app copy',
  releaseRequirement:'Explicit integration design, user approval, staging deploy and regression'},
 {id:'G05',status:'blocked',area:'Original v897 field provenance',
  evidence:'Reproduced: summary/context selected but provenance object frozen before pick, stays empty',
  releaseRequirement:'Fix and test per-field provenance in isolated production candidate'},
 {id:'G06',status:'blocked',area:'Map race and recovery during in-flight camera centering',
  evidence:'v910 uses two nested requestAnimationFrame; F5.5 initial failure; F5.6 waits in test',
  releaseRequirement:'Coordinated cancellation/restore and fast map changes in real app'},
 {id:'G07',status:'blocked',area:'Recoverable underlying-app changes while article is open',
  evidence:'F5.6 intentionally returns BLOCKED on simultaneous app navigation or camera drift',
  releaseRequirement:'Prevent incompatible actions or implement rollback/recovery; do not strand user'},
 {id:'G08',status:'blocked',area:'Complete post/topic/source and special-reader catalogue',
  evidence:'Only six F4 specimens, not all registered records; source/topic have no legacy tv_id route',
  releaseRequirement:'General datasource adapter, coverage inventory, missing fields, C7 typed dates'},
 {id:'G09',status:'blocked',area:'Browser history and deep links in deployed app',
  evidence:'v835 only allows canonical post IDs and explore/timeline/research; F5 history only in test copy',
  releaseRequirement:'Explicit URL contract for post/topic/source and back/forward without breaking old links'},
 {id:'G10',status:'blocked',area:'Accessibility and devices',
  evidence:'One Chromium small viewport and Tab/Escape smoke, not screen-reader or real mobile device coverage',
  releaseRequirement:'Dialog accessibility, focus trap, touch/OS back, small screens, reduced motion'},
 {id:'G11',status:'blocked',area:'Scientific and temporal content completeness',
  evidence:'F4 C7 source layers reviewed for selected samples; no full catalogue scholarly audit',
  releaseRequirement:'Confirm dating types, uncertainty and traceable evidence in all connected records'},
 {id:'G12',status:'blocked',area:'Staging acceptance and explicit release decision',
  evidence:'PR #379 and #380 are unmerged draft test-only; production untouched',
  releaseRequirement:'Approved end-to-end staging test, formal acceptance and separate deploy approval'}
];
assert.equal(gates.filter(x=>x.status==='tested-isolated').length,3);
assert.equal(gates.filter(x=>x.status==='blocked').length,9);
const report={
 title:'F5.7 – Evidensstyrda integrationsgrindar',
 generatedFrom:'App source as checked out by F5 isolated workflow',
 releaseReady:false,
 productionCodeChangedByF5:false,
 observed:{v897ProvenanceSnapshotBeforePick:lostProvenance,
  c2UsesTwoDeferredAnimationFrames:mapSchedulesTwoFrames,
  verifiedSpecimens:specimen.length,browserScenarioCount:18,
  caveat:'Actual Chrome pass/fail and camera measured count are supplied separately by F5 browser suite'},
 gates
};
const file='out/f5/readiness/f5-7-acceptance-gates.json';
fs.mkdirSync(path.dirname(file),{recursive:true});
fs.writeFileSync(file,JSON.stringify(report,null,2)+'\n','utf8');
console.log('F5.7 acceptance gates: 3 test-only verified, 9 production release blockers. RELEASE READY: NO');
console.log('F5.7 reproduced v897 provenance bug and verified v910 nested map-centering scheduling.');
console.log('F5.7 risk report saved:',file);
