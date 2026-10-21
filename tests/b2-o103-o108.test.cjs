const assert=require('node:assert/strict');
const fs=require('node:fs');
const model=require('../v915-category-read-model.js');
const src=fs.readFileSync('data/data.generated.js','utf8');
const m=/(?:let|const)\s+originalEvents=/.exec(src);assert(m);
const originals=JSON.parse(src.slice(m.index+m[0].length,src.indexOf(';\n',m.index+m[0].length)));
const expected={O103:'sinai-covenant-narrative',O104:'wilderness-narrative',O105:'joshua-conquest-narrative',O106:'judges-narratives',O107:'saul-kingship-narrative',O108:'david-goliath-narrative'};
for(const [id,kind] of Object.entries(expected)){
 const original=originals.find(x=>x.id===id);assert(original,id);
 const before=JSON.stringify(original),item=model.get(original);
 assert.equal(item.primaryArea,'bible',id);
 assert(item.contentTypes.includes(kind),id);
 assert(item.timeKinds.includes('narrated-time'),id);
 assert(item.timeKinds.includes('composition'),id);
 assert(item.timeKinds.includes('reception'),id);
 assert.equal(item.classificationStatus,'pilot-proposal',id);
 assert.equal(item.researchStatus,'unknown',id);
 assert.equal(JSON.stringify(original),before,id);
 assert(Object.isFrozen(item),id);
}
assert.equal(model.get({id:'O999'}).primaryArea,'unclassified');
console.log('O103–O108 classifications passed');
