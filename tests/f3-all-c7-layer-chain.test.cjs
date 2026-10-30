'use strict';
// F3: executable coverage inventory for every C7 significance/dating script loaded by index.
// No UI, production model or C7 data is modified. File order is taken from index.html.
const assert=require('node:assert/strict');
const fs=require('node:fs');
const vm=require('node:vm');
const {normalizeTimeType}=require('./f3-provenance-core.cjs');
const html=fs.readFileSync('index.html','utf8');
const scripts=[...html.matchAll(/<script\s+src="([^"]+)"/g)].map(m=>m[1]);
const significances=scripts.filter(p=>/^data\/c7-religionshistorisk-betydelse\.v\d+\.js$/.test(p));
const datings=scripts.filter(p=>/^data\/c7-dating-.+\.js$/.test(p));
assert(significances.length>=37,'Expected 37+ C7 significance layers in the live script order');
assert(datings.length>=78,'Expected 78+ C7 dating layers in the live script order');
const ctx=vm.createContext({window:{}});
const load=path=>vm.runInContext('(function(){\n'+fs.readFileSync(path,'utf8')+'\n})();',ctx,{filename:path,timeout:2000});
const originalById=new Map();
const overrides=[];
let additions=0;
for(const path of significances){
 const before=ctx.window.TIDENS_C7_RELIGION||{};
 const snapshot=new Map(Object.entries(before).map(([id,v])=>[id,JSON.stringify(v)]));
 load(path);
 const after=ctx.window.TIDENS_C7_RELIGION||{};
 for(const id of snapshot.keys())assert(Object.hasOwn(after,id),'C7 significance entry deleted: '+id+' in '+path);
 for(const [id,record] of Object.entries(after)){
  if(!snapshot.has(id)){additions++;originalById.set(id,path)}
  else if(snapshot.get(id)!==JSON.stringify(record)){overrides.push({id,path,previousOwner:originalById.get(id)||null});originalById.set(id,path)}
 }
}
assert(Object.hasOwn(ctx.window.TIDENS_C7_RELIGION,'B001'));
assert(Object.hasOwn(ctx.window.TIDENS_C7_RELIGION,'O127'));
const c7SignificanceCount=Object.keys(ctx.window.TIDENS_C7_RELIGION).length;
assert(c7SignificanceCount>100,'C7 significance chain seems incomplete');
const datingOwners=new Map(), rawTypes=new Map(), unmapped=new Map(), datingIds=new Set();
let datedPhases=0, undatedEntries=0, provenanceCount=0;
for(const path of datings){
 const prior=new Map(Object.entries(ctx.window).filter(([k])=>k.startsWith('TIDENS_C7_DATING_')).map(([k,v])=>[k,JSON.stringify(v)]));
 load(path);
 const regs=Object.entries(ctx.window).filter(([k])=>k.startsWith('TIDENS_C7_DATING_'));
 const changed=regs.filter(([k,v])=>prior.get(k)!==JSON.stringify(v));
 assert(changed.length>=1,'Dating script added no changed TIDENS_C7_DATING_* registry: '+path);
 for(const [name,records] of changed){
  if(!records||typeof records!=='object')continue;
  for(const [id,post] of Object.entries(records)){
   datingIds.add(id);
   const key=name+':'+id;datingOwners.set(key,path);
   if(typeof post.undated==='string'&&post.undated.trim())undatedEntries++;
   const phases=Array.isArray(post.phases)?post.phases:[];
   for(const phase of phases){
    const type=typeof phase.timeType==='string'?phase.timeType:'(missing)';
    rawTypes.set(type,(rawTypes.get(type)||0)+1);
    if(!normalizeTimeType(type))unmapped.set(type,(unmapped.get(type)||0)+1);
    if(Number.isFinite(phase.start)&&Number.isFinite(phase.end))datedPhases++;
    if(Array.isArray(phase.sources)&&phase.sources.length)provenanceCount++;
   }
  }
 }
}
assert(datingIds.has('O067')&&datingIds.has('O073'),'Missing key C7 dating records');
assert(rawTypes.has('material-witness'),'Expected manuscript material-witness dating');
assert(rawTypes.has('historical-event'),'Expected historical-event source type');
assert(rawTypes.has('text-composition'),'Expected text-composition source type');
const report={significanceFiles:significances.length,significancePosts:c7SignificanceCount,
 significanceOverrides:overrides.length,significanceAdditions:additions,
 datingFiles:datings.length,datingPosts:datingIds.size,datedPhases,undatedEntries,
 phasesWithSources:provenanceCount,
 rawTimeTypes:Object.fromEntries([...rawTypes].sort(([a],[b])=>a.localeCompare(b))),
 unmappedTimeTypes:Object.fromEntries([...unmapped].sort(([a],[b])=>a.localeCompare(b)))};
console.log('F3 complete C7 layer-chain audit',JSON.stringify(report));
if(overrides.length)console.log('F3 C7 significance field overrides require provenance review:',JSON.stringify(overrides.slice(0,30)));
if(unmapped.size)console.log('F3 unknown C7 time types are retained, NOT silently mapped:',JSON.stringify([...unmapped]));
