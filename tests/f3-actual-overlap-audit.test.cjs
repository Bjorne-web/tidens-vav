'use strict';
// F3 only: real overlapping field audit, no production integration.
const assert=require('node:assert/strict');
const fs=require('node:fs');
const vm=require('node:vm');
const {resolveField}=require('./f3-provenance-core.cjs');
const generated=fs.readFileSync('data/data.generated.js','utf8');
function table(name){
 const line=generated.split('\n').find(s=>s.startsWith('const '+name+'=')||s.startsWith('let '+name+'='));
 assert(line,'Missing real dataset '+name);
 return JSON.parse(line.slice(line.indexOf('=')+1).replace(/;\s*$/,''));
}
const names=['allOriginalResearchV828','sourceCardsV86','sourceCardsV810','sourceCardsV87','research'];
const layers=Object.fromEntries(names.map(name=>[name,table(name)]));
const records=new Set(names.flatMap(name=>Object.keys(layers[name])));
const results={};
for(const field of ['summary','context','impact','limits','heading']){
 let overlapping=0,identical=0;const differences=[];
 for(const id of records){
  const claims=names.flatMap(name=>{
   const value=layers[name]?.[id]?.[field];
   return typeof value==='string'&&value.trim()?[{origin:name,value:value.trim()}]:[];
  });
  if(claims.length<2)continue;
  overlapping++;
  if(new Set(claims.map(x=>x.value)).size===1)identical++;
  else differences.push({id,origins:claims.map(x=>x.origin)});
 }
 results[field]={overlapping,identical,differences};
}
assert(results.summary.overlapping>=32,'Regression: expected overlapping summaries absent');
assert(results.summary.identical>=31,'Regression: expected matching summaries absent');
assert(results.summary.differences.some(x=>x.id==='O073'),'Sargon variants disappeared unexpectedly');
assert.equal(results.context.identical>=32,true);
assert.equal(results.limits.identical>=32,true);
const long=layers.allOriginalResearchV828.O073.summary;
const short=layers.sourceCardsV810.O073.summary;
assert(long.startsWith(short)&&long.length>short.length,'Known editorial length variant changed');
const r=resolveField('summary',[
 {id:'original',fields:{summary:long}},
 {id:'sourceV810',fields:{summary:short}}
]);
assert.equal(r.conflict,true,'Different strings should remain traceable');
assert.equal(r.selected,null,'Do not silently select a competing text');
const equal=resolveField('summary',[
 {id:'original',fields:{summary:layers.allOriginalResearchV828.O068.summary}},
 {id:'sourceV810',fields:{summary:layers.sourceCardsV810.O068.summary}}
]);
assert.equal(equal.conflict,false);
const events=table('events'),originalEvents=table('originalEvents');
const byId=new Map([...events,...originalEvents].map(x=>[x.id,x]));
const globals={};const env={window:globals,URL,idEvent:id=>byId.get(id)||null};
for(const name of names)env[name]=layers[name];
vm.runInNewContext(fs.readFileSync('v897-research-read-model.js','utf8'),env,{timeout:2000});
const current=globals.TidensResearchReadModel.get('O073');
assert(current&&current.summary===long);
assert.equal(current.provenance.summary,undefined,'Legacy model snapshots provenance before pick() populates it');
assert(!('alternatives' in current),'Legacy reader does not expose competing summaries');
console.log('F3 real overlap audit:',JSON.stringify(results));
console.log('F3 O073: longer original selected; shorter source card preserved only in its source layer.');
