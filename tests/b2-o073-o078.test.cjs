const assert=require('node:assert/strict');
const fs=require('node:fs');
const model=require('../v915-category-read-model.js');
const source=fs.readFileSync('data/data.generated.js','utf8');
const match=/(?:let|const)\s+originalEvents=/.exec(source);
assert(match);
const posts=JSON.parse(source.slice(match.index+match[0].length,source.indexOf(';\n',match.index+match[0].length)));
const types={O073:'sargon-birth-legend',O074:'dumuzi-traditions',O075:'osiris-myths',O076:'baal-cycle',O077:'adonis-traditions',O078:'roman-mithraism'};
for(const [id,kind] of Object.entries(types)){
 const original=posts.find(x=>x.id===id);
 assert(original,id);
 const snapshot=JSON.stringify(original),value=model.get(original);
 assert.equal(value.primaryArea,'religions',id);
 assert(value.relatedAreas.includes('bible'),id);
 assert(value.contentTypes.includes(kind),id);
 assert(value.timeKinds.includes('material-witness'),id);
 assert.equal(value.classificationStatus,'pilot-proposal',id);
 assert.equal(value.researchStatus,'unknown',id);
 assert.equal(JSON.stringify(original),snapshot,id);
 assert(Object.isFrozen(value),id);
}
assert(model.get({id:'O078'}).contentTypes.includes('contested-resurrection-claim'));
assert(!model.get({id:'O078'}).timeKinds.includes('composition'));
assert.equal(model.get({id:'O999'}).primaryArea,'unclassified');
console.log('B2 O073–O078 narrative comparison classification checks pass');
