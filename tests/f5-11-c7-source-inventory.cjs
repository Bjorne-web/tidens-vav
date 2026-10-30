'use strict';
// F5.11 read-only C7 and non-H/O/B/D source inventory. Never rewrites source files.
const fs=require('node:fs'),vm=require('node:vm'),path=require('node:path'),assert=require('node:assert/strict');
const {catalog}=require('./f5-10-catalog-inventory.cjs');
const {assembleResearchObject}=require('./f3-unified-research-contract.cjs');
const {renderFullReader}=require('./f4-reader-renderer.cjs');
const {normalizeTimeType}=require('./f3-provenance-core.cjs');
const read=file=>fs.readFileSync(file,'utf8');
const scripts=[...read('index.html').matchAll(/<script[^>]*src="([^"]+)"/g)].map(m=>m[1]);
const dating=scripts.filter(f=>/^data\/c7-dating-.+\.js$/.test(f));
const significance=scripts.filter(f=>/^data\/c7-religionshistorisk-betydelse\.v\d+\.js$/.test(f));
assert(dating.length>=78&&significance.length>=37,'C7 load order or file set changed');
const ctx=vm.createContext({window:{}});
const latestDating={},history={},significanceOrigins={};
const issues=[],dateTypes={},sourceTypes={};
function run(file){
 vm.runInContext('(function(){\n'+read(file)+'\n})();',ctx,{filename:file,timeout:3000});
}
const oldSig=new Map();
for(const file of scripts.filter(f=>significance.includes(f)||dating.includes(f)||f==='data/c7-nihilism.v892.js')){
 run(file);
 if(significance.includes(file)||file==='data/c7-nihilism.v892.js'){
  const set=ctx.window.TIDENS_C7_RELIGION||{};
  for(const [id,entry] of Object.entries(set)){
   const serialized=JSON.stringify(entry);
   if(oldSig.get(id)!==serialized){significanceOrigins[id]=file;oldSig.set(id,serialized)}
  }
 }
 if(dating.includes(file)){
  const globals=Object.entries(ctx.window)
   .filter(([k,v])=>k.startsWith('TIDENS_C7_DATING_')&&v&&typeof v==='object');
  let written=0;
  for(const [registry,entries] of globals){
   for(const [id,entry] of Object.entries(entries)){
    if(!/^([A-Z]{1,2}\d{3,6})$/.test(id)||!entry||typeof entry!=='object')continue;
    const signature=JSON.stringify(entry),old=latestDating[id];
    if(old?.signature===signature)continue;
    latestDating[id]={entry,file,registry,signature};
    (history[id]||=([])).push({file,registry,phases:(entry.phases||[]).length});
    written++;
   }
  }
  if(!written)issues.push({kind:'no-new-date-dataset',file});
 }
}
const activeSig=ctx.window.TIDENS_C7_RELIGION||{};
const main=new Map(catalog.map(x=>[x.id,x]));
const c7Ids=Object.keys(latestDating),sigIds=Object.keys(activeSig);
const unmatchedDating=c7Ids.filter(id=>!main.has(id));
const unmatchedSignificance=sigIds.filter(id=>!main.has(id));
const summaries=[];
const allOrigins=[];
let precisePhases=0,undatedExplicit=0,withC7Dates=0,withC7Religion=0,richSourceLinks=0;
const reportRows=[];
function links(value){
 const raw=Array.isArray(value)?value:[];
 return raw.map(x=>Array.isArray(x)?{title:x[0],url:x[1]}:typeof x==='string'?{url:x}:x)
  .filter(x=>x&&typeof x.url==='string'&&/^https?:\/\//.test(x.url));
}
for(const item of catalog){
 const id=item.id,c7=latestDating[id],sig=activeSig[id]||null;
 const phases=Array.isArray(c7?.entry?.phases)?c7.entry.phases:[];
 const parsed=[];
 for(const [i,p] of phases.entries()){
  if(!p||!Number.isFinite(p.start)||!Number.isFinite(p.end)||p.start>p.end){
   issues.push({kind:'invalid-phase',id,origin:c7.file,phase:i});continue
  }
  const type=normalizeTimeType(p.timeType);
  const typed=!!type;dateTypes[p.timeType||'unspecified']=(dateTypes[p.timeType||'unspecified']||0)+1;
  if(!typed)issues.push({kind:'unclassified-phase',id,origin:c7.file,timeType:p.timeType||null});
  parsed.push({title:p.title||null,start:p.start,end:p.end,timeType:p.timeType||'unspecified',
   typeLabel:p.typeLabel||null,evidence:p.evidence||null,reason:p.reason||null,
   sources:links(p.sources),origin:c7.file,typed});
 }
 if(parsed.length){precisePhases+=parsed.length;withC7Dates++}
 if(c7&&typeof c7.entry?.undated==='string'&&c7.entry.undated.trim())undatedExplicit++;
 if(sig)withC7Religion++;
 const c7Refs=[
  ...links(c7?.entry?.sources),...parsed.flatMap(x=>x.sources),...links(sig?.sources)
 ];
 richSourceLinks+=c7Refs.length;
 const base=item.hasDates?{start:item.typedDate?null:null}:null; // legacy dates left in original model, not promoted
 const row={id,group:item.group,title:item.title,rawDateExists:item.hasDates,
  legacyUnclassified:item.group==='originalEvents',
  originalSourceCount:item.sourceCount,
  c7DateOrigin:c7?.file||null,c7History:history[id]||[],
  phases:parsed,c7Undated:c7?.entry?.undated||null,
  c7Evidence:c7?.entry?.evidence||null,
  significanceOrigin:sig?significanceOrigins[id]||null:null,
  significanceLevel:sig?.level||null,
  significanceText:sig?.paragraph||null,
  sourceLinks:c7Refs,
  missingSourceLinkAfterOverlay:item.sourceCount+c7Refs.length===0
 };
 reportRows.push(row);
}
function snapshotDynamic(file){
 const sandbox={window:{},events:[],research:{}};
 vm.runInNewContext(read(file),sandbox,{filename:file,timeout:3000});
 return {file,events:sandbox.events.map(x=>({id:x.id,title:x.title,start:x.start,end:x.end,
  dating:x.dating||null,source:x.source||null})),
  researchIds:Object.keys(sandbox.research)};
}
const dynamicFiles=[
 'data/apokryfer-granskning3.v888.js',
 'data/dilmun-ninti.v887.js',
 'data/lilith.v888-draft.js',
 'data/ophites-naghammadi.v889-draft.js',
 'data/nihilism.v892.js'
];
const dynamic=dynamicFiles.map(snapshotDynamic);
const seenDyn=new Set(),duplicates=[];
for(const file of dynamic)for(const x of file.events){
 if(seenDyn.has(x.id)||main.has(x.id))duplicates.push(x.id);
 seenDyn.add(x.id);
}
const tcode=read('v889-research-tracks.js'),idx=tcode.indexOf('function section(t){');
assert(idx>0,'Idea research tracks moved');
const topicsContext={window:{}};
vm.runInNewContext(tcode.slice(0,idx)+'window.__tracks=tracks;})();',topicsContext,{timeout:2000});
const topics=topicsContext.window.__tracks.map(t=>({id:'topic:'+t.key,label:t.heading,
 sections:t.sections.length,references:t.sources.length}));
const generated=read('data/data.generated.js');
function table(name){
 const line=generated.split('\n').find(x=>x.startsWith('let '+name+'=')||x.startsWith('const '+name+'='));
 assert(line,'Missing '+name);return JSON.parse(line.slice(line.indexOf('=')+1).replace(/;\s*$/,''));
}
const cases=['archaeologyCasesV818','religionCasesV820','exileCasesV821',
 'hellenisticCasesV822','romanCasesV823'].map(key=>{
 const rows=table(key);
 return {registry:key,count:rows.length,ids:rows.map(x=>x.id)};
});
const ancillaryContext={window:{}};
runExtra('data/research-chronology.v894.js');
function runExtra(file){vm.runInNewContext(read(file),ancillaryContext,{filename:file,timeout:2000})}
const iq=ancillaryContext.window.TIDENS_BIG_QUESTIONS_TIMELINE?.events||[];
const ledgerContext={window:{}};
vm.runInNewContext(read('data/review-ledger.js'),ledgerContext,{timeout:3000});
const ledger=ledgerContext.window.TIDENS_REVIEW_LEDGER;
const ledgerRecords=Object.keys(ledger?.claimChecks||{});
const report={
 type:'F5.11 C7 layer and outside-four-registries inventory',
 status:'read-only research source audit; not release or scholarly sign-off',
 scriptOrder:{dating:dating.length,significance:significance.length},
 mainCatalog:{count:catalog.length,withC7DateDataset:reportRows.filter(x=>x.c7DateOrigin).length,
  withAtLeastOneTypedPhase:reportRows.filter(x=>x.phases.some(p=>p.typed)).length,
  withExplicitUndatedReason:undatedExplicit,datedPhaseCount:precisePhases,
  withSignificance:withC7Religion,
  baselineWithoutSourceLinks:catalog.filter(x=>x.sourceCount===0).length,
  afterAdditionalC7RefsMissing:reportRows.filter(x=>x.missingSourceLinkAfterOverlay).length},
 coverageOutsideCatalog:{
  datingIdsNotInFourRegistries:unmatchedDating,
  significanceIdsNotInFourRegistries:unmatchedSignificance,
  dynamic,topics,cases,
  bigQuestionsChronology:{count:iq.length,withRelatedPost:iq.filter(x=>x.relatedPostId).length,
    caution:'IQ timeline events are contextual timeline entries, not automatically canonical research posts'},
  claimLedger:{postIdsWithClaimChecks:ledgerRecords.length,
   fullPostReviews:Object.keys(ledger.completePostReviews||{}).length,
   caution:'A checked claim is not an approved full research post'}
 },
 datingTypeCounts:dateTypes,issues,duplicateDynamicIds:duplicates,
 constraints:[
 'Never replace imported legacy time interval with a C7 chronology type',
 'Empty phases plus explicit undated reason means NO new dated marker',
 'Material witness is not the composition or narrated event date',
 'C7 sources and significance origins are registered metadata, not independently verified evidence',
 'No existing source or research post is modified by this audit',
 'Outside-catalog category cases and thematic tracks need separately approved model/URL contracts'
 ]
};
const out='out/f5-11';fs.mkdirSync(out,{recursive:true});
fs.writeFileSync(path.join(out,'c7-coverage.json'),JSON.stringify(report,null,2)+'\n');
fs.writeFileSync(path.join(out,'per-post-c7.json'),JSON.stringify(reportRows,null,2)+'\n');
assert(!duplicates.length,'Dynamic post IDs collided: '+duplicates.join(','));
assert(!issues.some(x=>x.kind==='invalid-phase'),'Malformed dated phase: '+JSON.stringify(issues.slice(0,6)));
assert(report.mainCatalog.count===270,'Base catalogue changed – review ID membership');
assert(report.scriptOrder.dating===78&&report.scriptOrder.significance===37,
 'Expected C7 script counts changed – review new coverage');
assert(precisePhases>0&&undatedExplicit>0&&withC7Religion>0,'No C7 enhancement observed');
console.log('F5.11 C7 scripts:',dating.length,'dating and',significance.length,'significance');
console.log('F5.11 dataset IDs',c7Ids.length,'typed phases',precisePhases,
 'explicit undated',undatedExplicit,'C7 significance',withC7Religion);
console.log('F5.11 registered links absent: before',report.mainCatalog.baselineWithoutSourceLinks,
 'after C7 overlays',report.mainCatalog.afterAdditionalC7RefsMissing);
console.log('F5.11 dynamic extra:',dynamic.map(x=>x.file+':'+x.events.length).join(', '),
 '; research tracks:',topics.length,'; category case registries:',cases.map(x=>x.count).join('+'));
module.exports={report,reportRows,latestDating,activeSig,significanceOrigins};
