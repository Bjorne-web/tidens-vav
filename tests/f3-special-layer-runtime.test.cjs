'use strict';
// F3: isolated real special-layer and C7 integration audit, not production code.
const assert=require('node:assert/strict');
const fs=require('node:fs'),vm=require('node:vm');
const read=path=>fs.readFileSync(path,'utf8');
const data=read('data/data.generated.js');
function fromGenerated(name){
 const line=data.split('\n').find(x=>x.startsWith('const '+name+'=')||x.startsWith('let '+name+'='));
 assert(line,'Missing source '+name);
 return JSON.parse(line.slice(line.indexOf('=')+1).replace(/;\s*$/,''));
}
const originalEvents=fromGenerated('originalEvents');
const events=fromGenerated('events');
const allOriginalResearchV828=fromGenerated('allOriginalResearchV828');
const sourceCardsV86=fromGenerated('sourceCardsV86');
const sourceCardsV810=fromGenerated('sourceCardsV810');
const sourceCardsV87=fromGenerated('sourceCardsV87');
const research=fromGenerated('research');
const posts=new Map([...events,...originalEvents].map(x=>[x.id,x]));
const globals={},env={window:globals,URL,idEvent:id=>posts.get(id)||null,
 allOriginalResearchV828,sourceCardsV86,sourceCardsV810,sourceCardsV87,research};
for(const file of [
 'data/special-research.v840.js',
 'data/bible-books-v857.js',
 'data/c7-religionshistorisk-betydelse.v890.js',
 'data/c7-dating-o067-gilgamesh.js'
])vm.runInNewContext(read(file),env,{filename:file,timeout:2000});
vm.runInNewContext(read('v897-research-read-model.js'),env,{timeout:2000});
const model=globals.TidensResearchReadModel;
const selected=model.get('O030');
const special=globals.TIDENS_SPECIAL_RESEARCH.O030.summary;
const original=allOriginalResearchV828.O030.summary;
assert(special&&original&&special!==original,'Expected two real O030 text variants');
assert.equal(selected.summary,special);
assert.equal(selected.provenance.summary,undefined,'Legacy provenance snapshot is captured before pick()');
assert(!('alternatives' in selected),'Current adapter lacks alternative field candidates');
const bible=model.get('B001');
assert(bible.religion&&typeof bible.religion.paragraph==='string');
assert(!Object.hasOwn(bible.provenance,'religion'),'C7 significance provenance not explicit in generic map');
const epic=model.get('O067');
const phase=globals.TIDENS_C7_DATING_GILGAMESH.O067.phases[0];
assert.equal(phase.timeType,'material-witness');
assert.equal(phase.start,-700);
assert.equal(epic.temporal.start,-2100);
assert(!('phases' in epic.temporal),'C7 material witness not integrated into generic temporal shape');
console.log('F3 special-layer audit: PASS; O030 uses special summary, but all field provenance is lost; B001/O067 require C7 metadata');
