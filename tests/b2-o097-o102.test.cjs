const assert=require('node:assert/strict');
const fs=require('node:fs');
const model=require('../v915-category-read-model.js');
const source=fs.readFileSync('data/data.generated.js','utf8');
const m=/(?:let|const)\s+originalEvents=/.exec(source);
assert(m,'Original source missing');
const entries=JSON.parse(source.slice(m.index+m[0].length,source.indexOf(';\n',m.index+m[0].length)));
const expected={O097:'noah-flood-narrative',O098:'tower-of-babel',O099:'abraham-traditions',O100:'isaac-jacob-traditions',O101:'joseph-narrative',O102:'exodus-tradition'};
for(const [id,type] of Object.entries(expected)){
 const original=entries.find(x=>x.id===id);
 assert(original,id);
 const snapshot=JSON.stringify(original),value=model.get(original);
 assert.equal(value.primaryArea,'bible',id);
 assert(value.contentTypes.includes(type),id);
 assert(value.timeKinds.includes('narrated-time'),id);
 assert(value.timeKinds.includes('composition'),id);
 assert.equal(value.classificationStatus,'pilot-proposal',id);
 assert.equal(value.researchStatus,'unknown',id);
 assert.equal(JSON.stringify(original),snapshot,id);
 assert(Object.isFrozen(value),id);
}
assert.equal(entries.find(x=>x.id==='O097').title,'Babylonisk exil');
assert.equal(entries.find(x=>x.id==='O102').description,'Uttåget ur Egypten (Mose)');
assert.equal(model.get({id:'O999'}).primaryArea,'unclassified');
console.log('B2 O097-O102 biblical narrative classification passes');
