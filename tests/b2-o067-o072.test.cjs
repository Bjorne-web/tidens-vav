const assert=require('node:assert/strict');
const fs=require('node:fs');
const model=require('../v915-category-read-model.js');
const src=fs.readFileSync('data/data.generated.js','utf8');
const match=/(?:let|const)\s+originalEvents=/.exec(src);
assert(match);
const entries=JSON.parse(src.slice(match.index+match[0].length,src.indexOf(';\n',match.index+match[0].length)));
const types={O067:'gilgamesh-flood',O068:'atrahasis-flood',O069:'enuma-elish',O070:'sumerian-creation-traditions',O071:'egyptian-cosmogonies',O072:'adapa-narrative'};
for(const [id,kind] of Object.entries(types)){
 const original=entries.find(x=>x.id===id);
 assert(original,id);
 const snapshot=JSON.stringify(original),value=model.get(original);
 assert.equal(value.primaryArea,'religions',id);
 assert(value.relatedAreas.includes('bible'),id);
 assert(value.contentTypes.includes(kind),id);
 assert(value.timeKinds.includes('composition'),id);
 assert(value.timeKinds.includes('material-witness'),id);
 assert.equal(value.classificationStatus,'pilot-proposal',id);
 assert.equal(value.researchStatus,'unknown',id);
 assert.equal(JSON.stringify(original),snapshot,id);
 assert(Object.isFrozen(value),id);
}
assert.equal(model.get({id:'O999'}).primaryArea,'unclassified');
console.log('B2 O067-O072 historical-literary classes pass');
