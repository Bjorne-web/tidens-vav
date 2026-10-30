'use strict';
// F3: actual read-only adapter against real source registries, isolated in a Node VM.
const assert=require('node:assert/strict');
const fs=require('node:fs');
const vm=require('node:vm');
const read=path=>fs.readFileSync(path,'utf8');
const generated=read('data/data.generated.js');
function parseGenerated(name){
 const line=generated.split('\n').find(x=>x.startsWith('let '+name+'=')||x.startsWith('const '+name+'='));
 assert.ok(line,'Missing generated data series: '+name);
 return JSON.parse(line.slice(line.indexOf('=')+1).replace(/;\s*$/,''));
}
const events=parseGenerated('events');
const originals=parseGenerated('originalEvents');
const byId=new Map([...events,...originals].map(x=>[x.id,x]));
const globals={};
const env={window:globals,URL,idEvent:id=>byId.get(id)||null};
for(const path of ['data/bible-books-v857.js','data/apocrypha-books-v891.js','data/c7-religionshistorisk-betydelse.v890.js']){
 vm.runInNewContext(read(path),env,{filename:path,timeout:1000});
}
vm.runInNewContext(read('v897-research-read-model.js'),env,{filename:'v897-research-read-model.js',timeout:1000});
const model=globals.TidensResearchReadModel;
assert.equal(typeof model.get,'function');
const ahab=model.get('H045');
assert.equal(ahab.title,'Ahab i assyrisk inskrift: Qarqar');
assert.equal(ahab.temporal.start,-853);
assert(ahab.sources.some(s=>s.url.includes('britishmuseum.org')));
const genesis=model.get('B001');
assert.equal(genesis.subtype,'bible-book');
assert.equal(genesis.dateType,'föreslagen tillkomst/redaktion');
assert.equal(genesis.reviewStatus,'preliminary');
assert(genesis.religion&&typeof genesis.religion.paragraph==='string');
const tobit=model.get('D001');
assert.equal(tobit.title,'Tobit');
assert.equal(tobit.subtype,'apocrypha-book');
assert.equal(tobit.temporal.start,-250);
assert.equal(tobit.reviewStatus,'preliminary');
assert(tobit.sources.length>=2);
const epic=model.get('O067');
assert.equal(epic.temporal.start,-2100);
assert.equal(epic.subtype,'historical');
assert.equal(model.has('AP001'),false,'AP theme is not necessarily a canonical book in the adapter');
assert.equal(model.get('ZZ999'),null);
assert.equal(epic.dateType,null);
console.log('F3 real reader adapter: PASS (H045, B001, D001, O067; AP thematic distinction)');
