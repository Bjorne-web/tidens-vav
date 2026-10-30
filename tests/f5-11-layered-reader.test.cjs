'use strict';
// F5.11 construct C7-enriched F3/F4 candidates without modifying the app.
// Explicitly keep imported O dates unclassified and empty C7 phases undated.
const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict'),path=require('node:path');
const {reportRows,latestDating,activeSig,significanceOrigins}=require('./f5-11-c7-source-inventory.cjs');
const {assembleResearchObject}=require('./f3-unified-research-contract.cjs');
const {renderFullReader}=require('./f4-reader-renderer.cjs');
function table(name){
 const s=fs.readFileSync('data/data.generated.js','utf8');
 const line=s.split('\n').find(x=>x.startsWith('let '+name+'=')||x.startsWith('const '+name+'='));
 return JSON.parse(line.slice(line.indexOf('=')+1).replace(/;\s*$/,''));
}
const originals=table('originalEvents'),events=table('events');
const cards=table('sourceCardsV86'),oldResearch=table('allOriginalResearchV828');
const ctx={window:{}};
for(const file of ['data/bible-books-v857.js','data/apocrypha-books-v891.js'])
 vm.runInNewContext(fs.readFileSync(file,'utf8'),ctx,{filename:file});
const books=ctx.window.TIDENS_BIBLE_BOOKS,apocrypha=ctx.window.TIDENS_APOCRYPHA_BOOKS;
const raw=new Map([...events,...originals,...books,...apocrypha].map(x=>[x.id,x]));
const rows=reportRows.filter(x=>x.c7DateOrigin||x.significanceOrigin);
const rendered=[],phaseChecks=[],unclassifiedKept=0,emptyPhaseNotPromoted=0,
 missingUndatedInRenderer=[],noSignificanceSource=[],dateTypeDistribution={};
const f4Kinds=['event','historical-period','composition','textual-chronology','narrative','material-witness'];
function normSources(values){return (Array.isArray(values)?values:[]).filter(x=>x&&
  (Array.isArray(x)&&typeof x[1]==='string'||typeof x.url==='string'))}
for(const row of rows){
 const item=raw.get(row.id);
 if(!item){continue}
 const dated=latestDating[row.id];
 const phases=Array.isArray(dated?.entry?.phases)?dated.entry.phases:[];
 const significance=activeSig[row.id]||null;
 const sourceLayers=[
  ...(cards[row.id]?[{id:'sourceCardsV86',fields:cards[row.id]}]:[]),
  ...(oldResearch[row.id]?[{id:'allOriginalResearchV828',fields:oldResearch[row.id]}]:[]),
  {id:row.group,fields:{...item,
   ...(item.critical?{summary:item.critical}:item.description?{summary:item.description}:{})}},
  ...((dated||significance)?[{id:dated?.file||significanceOrigins[row.id],
   fields:{sources:[...normSources(dated?.entry?.sources),
    ...phases.flatMap(p=>normSources(p.sources))]}}]:[])
 ];
 const legacy=row.group==='originalEvents';
 const baseTime=Number.isFinite(item.start)&&Number.isFinite(item.end)?
  {start:item.start,end:item.end,timeType:legacy?'legacy-unspecified':
   row.group==='TIDENS_BIBLE_BOOKS'||row.group==='TIDENS_APOCRYPHA_BOOKS'?'text-composition':'historical-event',
   origin:row.group,certainty:item.evidence||null,rationale:item.dating||item.dateType}:null;
 const model=assembleResearchObject('post',{
  id:row.id,title:item.title,reviewStatus:item.reviewStatus,
  baseTime,
  datingPhases:phases.map(p=>({...p,origin:dated.file})),
  sourceLayers,
  significance,significanceOrigin:significance?significanceOrigins[row.id]:null
 });
 const html=renderFullReader({
  entity:model,category:legacy?'religion':row.group==='events'?'history':'bible',
  description:item.description||item.critical||null,
  overviewOrigin:row.group+'.'+row.id,sourceNote:item.dating,
  sourceNotes:Array.isArray(item.sources)?item.sources:[],
  narrative:item.narrativeTime||null,genre:item.genre||null,
  traditionAttribution:item.attributed||null,dateBasis:item.dateType||null
 });
 assert(html.includes('data-record="'+row.id+'"'),'F4 article must render '+row.id);
 if(significance){
  assert(html.includes('Betydelse för Israels religion, judendomen och kristendomen'),
   'Actual C7 significance missing '+row.id);
  assert(html.includes(significanceOrigins[row.id]),'C7 provenance origin missing '+row.id);
 }
 if(legacy){
  assert(model.temporal.unclassified.some(x=>x.origin==='originalEvents'),
   'Legacy original date wrongly promoted '+row.id);
  unclassifiedKept++;
 }
 const known=phases.filter(p=>Number.isFinite(p.start)&&Number.isFinite(p.end));
 for(const p of known){
  const kind=p.timeType==='historical-event'?'event':p.timeType==='text-composition'?'composition':p.timeType;
  if(f4Kinds.includes(kind)){
   const list=model.temporal[kind]?.alternatives||[];
   assert(list.some(x=>x.start===p.start&&x.end===p.end&&x.origin===dated.file),
    'C7 date type/source conflated '+row.id+' '+p.timeType);
   dateTypeDistribution[kind]=(dateTypeDistribution[kind]||0)+1;
   phaseChecks.push({id:row.id,kind,start:p.start,end:p.end,origin:dated.file});
  }
 }
 if(dated&&phases.length===0){
  const typed=f4Kinds.some(k=>(model.temporal[k]?.alternatives||[]).some(x=>x.origin===dated.file));
  assert(!typed,'Empty C7 date was converted to invented dated claim '+row.id);
  emptyPhaseNotPromoted++;
  if(typeof dated.entry.undated==='string'&&!html.includes(dated.entry.undated))
   missingUndatedInRenderer.push(row.id);
 }
 if(significance&&model.references.filter(x=>x.origin===significanceOrigins[row.id]).length===0)
  noSignificanceSource.push(row.id);
 rendered.push({id:row.id,group:row.group,c7Dating:dated?.file||null,
  c7Religion:significance?significanceOrigins[row.id]:null,
  typedPhases:known.length,references:model.references.length,
  originLinks:model.references.map(x=>({sourceId:x.sourceId,origin:x.origin,url:x.url}))});
}
assert(rows.length>50,'C7 overlay coverage unexpectedly too small');
assert(rendered.length>50,'C7 integrated candidates not rendered');
assert(phaseChecks.length>0,'No C7 typed claims verified');
const report={
 phase:'F5.11 candidate assembly without production code changes',
 rendered:rendered.length,coveredSourceRows:rows.length,
 verifiedTypedPhases:phaseChecks.length,legacyOriginalIntervalsKeptUnclassified:unclassifiedKept,
 emptyC7DateSetsNotPromoted:emptyPhaseNotPromoted,
 c7UndatedReasonNotYetShownByUnmodifiedF4Reader:missingUndatedInRenderer,
 c7SignificanceRecordsWithoutSeparateReference:noSignificanceSource,
 dateTypeDistribution,
 risk:'C7 undated explanations must be visibly rendered in future reader; original import years remain unclassified.'
};
fs.writeFileSync('out/f5-11/layered-reader-audit.json',JSON.stringify({report,rendered,phaseChecks},null,2)+'\n');
console.log('F5.11 real F3/F4 C7 layered reader candidates:',rendered.length,
 'typed claims:',phaseChecks.length,'legacy intervals preserved:',unclassifiedKept,
 'undated C7 explanations not displayed:',missingUndatedInRenderer.length);
module.exports={report};
