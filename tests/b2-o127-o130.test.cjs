const assert=require('node:assert/strict');
const fs=require('node:fs');
const model=require('../v915-category-read-model.js');
const src=fs.readFileSync('data/data.generated.js','utf8');
const m=/(?:let|const)\s+originalEvents=/.exec(src);assert(m);
const events=JSON.parse(src.slice(m.index+m[0].length,src.indexOf(';\n',m.index+m[0].length)));
const expected={O127:['bible','early-jesus-movement'],O128:['bible','pauline-letters'],O129:['world','jerusalem-destruction-70'],O130:['bible','book-of-revelation']};
for(const [id,[area,type]] of Object.entries(expected)){
 const original=events.find(x=>x.id===id);assert(original,id);
 const snapshot=JSON.stringify(original),value=model.get(original);
 assert.equal(value.primaryArea,area,id);
 assert(value.contentTypes.includes(type),id);
 assert(value.timeKinds.includes('reception'),id);
 assert.equal(value.classificationStatus,'pilot-proposal',id);
 assert.equal(value.researchStatus,'unknown',id);
 assert.equal(JSON.stringify(original),snapshot,id);
 assert(Object.isFrozen(value),id);
}
assert(model.get({id:'O129'}).timeKinds.includes('historical-event'));
assert(model.get({id:'O128'}).timeKinds.includes('composition'));
assert.equal(model.get({id:'O999'}).primaryArea,'unclassified');
console.log('O127-O130 read-only classification tests pass');
