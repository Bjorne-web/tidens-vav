const assert=require('node:assert/strict');
const fs=require('node:fs');
const model=require('../v915-category-read-model.js');
const source=fs.readFileSync('data/data.generated.js','utf8');
const m=/(?:let|const)\s+originalEvents=/.exec(source);
assert(m,'Original data array missing');
const entries=JSON.parse(source.slice(m.index+m[0].length,source.indexOf(';\n',m.index+m[0].length)));
const expected={O091:['ideas','babylonian-theodicy'],O092:['religions','contested-fish-hero-comparison'],O093:['religions','babel-narrative'],O094:['bible','samson-narrative'],O095:['bible','creation-narrative'],O096:['bible','eden-narrative']};
for(const [id,[area,kind]] of Object.entries(expected)){
 const original=entries.find(x=>x.id===id);
 assert(original,id);
 const snapshot=JSON.stringify(original),actual=model.get(original);
 assert.equal(actual.primaryArea,area,id);
 assert(actual.contentTypes.includes(kind),id);
 assert(actual.timeKinds.includes('reception'),id);
 assert.equal(actual.classificationStatus,'pilot-proposal',id);
 assert.equal(actual.researchStatus,'unknown',id);
 assert.equal(JSON.stringify(original),snapshot,id);
 assert(Object.isFrozen(actual),id);
}
assert.equal(entries.find(x=>x.id==='O095').title,entries.find(x=>x.id==='O096').title);
assert.notEqual(entries.find(x=>x.id==='O095').description,entries.find(x=>x.id==='O096').description);
assert.equal(model.get({id:'O999'}).primaryArea,'unclassified');
console.log('O091-O096 original-preserving classifications pass');
