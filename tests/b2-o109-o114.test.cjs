const assert=require('node:assert/strict');
const fs=require('node:fs');
const model=require('../v915-category-read-model.js');
const src=fs.readFileSync('data/data.generated.js','utf8');
const m=/(?:let|const)\s+originalEvents=/.exec(src);assert(m);
const original=JSON.parse(src.slice(m.index+m[0].length,src.indexOf(';\n',m.index+m[0].length)));
const expected={O109:'solomon-temple-narrative',O110:'divided-monarchy-narrative',O111:'elijah-elisha-narratives',O112:'assyrian-conquest-narrative',O113:'isaiah-traditions',O114:'jeremiah-traditions'};
for(const [id,type] of Object.entries(expected)){
 const post=original.find(x=>x.id===id);assert(post,id);
 const before=JSON.stringify(post),value=model.get(post);
 assert.equal(value.primaryArea,'bible',id);
 assert(value.contentTypes.includes(type),id);
 assert(value.timeKinds.includes('composition'),id);
 assert(value.timeKinds.includes('reception'),id);
 assert.equal(value.classificationStatus,'pilot-proposal',id);
 assert.equal(value.researchStatus,'unknown',id);
 assert.equal(JSON.stringify(post),before,id);
 assert(Object.isFrozen(value),id);
}
assert(model.get({id:'O112'}).timeKinds.includes('historical-event'));
assert.equal(model.get({id:'O999'}).primaryArea,'unclassified');
console.log('B2 O109–O114 narrative and source checks pass');
