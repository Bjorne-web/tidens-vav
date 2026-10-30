'use strict';
// F4 isolated fixture adapter. Reads current repository data, leaves originals untouched.
const fs=require('node:fs'),vm=require('node:vm');
const assert=require('node:assert/strict');
const {assembleResearchObject}=require('./f3-unified-research-contract.cjs');
const read=path=>fs.readFileSync(path,'utf8');
const generated=read('data/data.generated.js');
function table(name){
 const line=generated.split('\n').find(s=>s.startsWith('let '+name+'=')||s.startsWith('const '+name+'='));
 assert(line,'Source registry not found: '+name);
 return JSON.parse(line.slice(line.indexOf('=')+1).replace(/;\s*$/,''));
}
function globals(files){
 const ctx=vm.createContext({window:{}});
 for(const f of files)vm.runInContext(read(f),ctx,{filename:f,timeout:2000});
 return ctx.window;
}
// Use the same C7 script order as index.html, not just the earliest significance file.
function liveC7Scripts(){
 const html=read('index.html');
 const paths=[...html.matchAll(/<script\s+src="([^"]+)"/g)].map(m=>m[1]);
 const significance=paths.filter(p=>/^data\/c7-religionshistorisk-betydelse\.v\d+\.js$/.test(p));
 const datings=paths.filter(p=>/^data\/c7-dating-.+\.js$/.test(p));
 assert(significance.length>=37&&datings.length>=78,'Incomplete C7 source list: inspect main app script order');
 return {significance,datings};
}
function buildFixtures(){
 const ev=table('events').find(x=>x.id==='H045');
 const old=table('originalEvents').find(x=>x.id==='O067');
 const cards=table('sourceCardsV86'),research=table('allOriginalResearchV828');
 const ar=table('archaeologyCasesV818').find(x=>x.id==='A01');
 const c7=liveC7Scripts();
 const w=globals(['data/bible-books-v857.js','data/apocrypha-books-v891.js',
  ...c7.significance,...c7.datings]);
 const bible=w.TIDENS_BIBLE_BOOKS.find(x=>x.id==='B001');
 const tobit=w.TIDENS_APOCRYPHA_BOOKS.find(x=>x.id==='D001');
 assert(ev&&old&&ar&&bible&&tobit&&cards.H045&&research.O067);
 const h=assembleResearchObject('post',{
  id:'H045',title:ev.title,baseTime:{start:ev.start,end:ev.end,timeType:'historical-event',origin:'events',certainty:ev.evidence},
  sourceLayers:[{id:'sourceCardsV86',fields:cards.H045},{id:'events',fields:{source:ev.source}}]});
 const b=assembleResearchObject('post',{
  id:'B001',title:bible.title,reviewStatus:bible.reviewStatus,
  baseTime:{start:bible.start,end:bible.end,timeType:'text-composition',origin:'TIDENS_BIBLE_BOOKS',certainty:bible.reviewStatus},
  sourceLayers:[{id:'TIDENS_BIBLE_BOOKS',fields:{summary:bible.critical}}],
  significance:w.TIDENS_C7_RELIGION.B001,significanceOrigin:'C7 significance registry (37 files in index.html order)'});
 const d=assembleResearchObject('post',{
  id:'D001',title:tobit.title,reviewStatus:tobit.reviewStatus,
  baseTime:{start:tobit.start,end:tobit.end,timeType:'text-composition',origin:'TIDENS_APOCRYPHA_BOOKS',certainty:tobit.reviewStatus},
  sourceLayers:[{id:'TIDENS_APOCRYPHA_BOOKS',fields:{summary:tobit.critical,sources:tobit.sources,primary:tobit.primary}}]});
 const witness=w.TIDENS_C7_DATING_GILGAMESH?.O067;
 assert(witness&&Array.isArray(witness.phases),'Latest C7 dating registry missing O067 phases');
 const o=assembleResearchObject('post',{
  id:'O067',title:old.title,
  baseTime:{start:old.start,end:old.end,origin:'originalEvents',timeType:'legacy-unspecified',certainty:old.evidence,rationale:old.dating},
  datingPhases:witness.phases.map(x=>({...x,origin:'data/c7-dating-o067-gilgamesh.js'})),
  sourceLayers:[{id:'allOriginalResearchV828',fields:research.O067},
   {id:'data/c7-dating-o067-gilgamesh.js',fields:{sources:witness.phases.flatMap(x=>x.sources||[])}}]});
 const tcode=read('v889-research-tracks.js');const idx=tcode.indexOf('function section(t){');
 assert(idx>0,'Topics moved; review F4 fixture integration');
 const sandbox={window:{}};vm.runInNewContext(tcode.slice(0,idx)+'window.__tracks=tracks;})();',sandbox,{timeout:2000});
 const good=sandbox.window.__tracks.find(t=>t.key==='good');assert(good);
 const topic=assembleResearchObject('topic',{
  key:good.key,label:good.heading,description:good.intro,
  sections:good.sections.map(x=>({...x,origin:'v889-research-tracks.js'})),
  relations:good.links.map(x=>({to:x.id,relationType:'links-post',rationale:x.label,origin:'v889-research-tracks.js'})),
  references:good.sources.map(x=>({...x,origin:'v889-research-tracks.js'}))});
 const ref=ar.sources[0];assert(ref);
 const source=assembleResearchObject('source',{title:ref.name,url:ref.url,
  provenance:'data/data.generated.js:archaeologyCasesV818.A01.sources',sourceKind:ref.type,
  uses:[{targetId:'archaeology-case:A01',supports:ref.supports,origin:'archaeologyCasesV818.A01.sources'}]});
 const entries=[
  {entity:h,category:'history',description:ev.description,sourceNote:ev.dating,
    evidenceNotes:cards.H045.sources,primaryReference:ev.bible},
  {entity:b,category:'bible',description:bible.critical,narrative:bible.narrativeTime,
    sourceNotes:bible.sources,genre:bible.genre,traditionAttribution:bible.attributed,dateBasis:bible.dateType},
  {entity:d,category:'bible',description:tobit.critical,narrative:tobit.narrativeTime,canon:tobit.canon,
    sourceNotes:tobit.sources,genre:tobit.genre,traditionAttribution:tobit.attributed,
    dateBasis:tobit.dateType,relatedIds:tobit.related?[tobit.related]:[]},
  {entity:o,category:'religion',description:old.dating,sourceNotes:research.O067.sources},
  {entity:topic,category:'ideas'},
  {entity:source,category:'history',evidenceNotes:ar.sources}];
 return entries;
}
module.exports={buildFixtures};
