const assert=require('node:assert/strict');
const fs=require('node:fs');
const model=require('../v915-category-read-model.js');
const source=fs.readFileSync('data/data.generated.js','utf8');
const m=/(?:let|const)\s+originalEvents=/.exec(source);
assert(m);
const originals=JSON.parse(source.slice(m.index+m[0].length,source.indexOf(';\n',m.index+m[0].length)));
const expected={O085:['religions','contested-twelve-followers-claim'],O086:['religions','herakles-labours'],O087:['religions','zoroastrian-eschatology'],O088:['religions','ritual-meal'],O089:['religions','contested-wine-as-blood-claim'],O090:['ideas','instruction-of-amenemope']};
for(const [id,[area,type]] of Object.entries(expected)){
 const original=originals.find(x=>x.id===id);assert(original,id);
 const before=JSON.stringify(original),actual=model.get(original);
 assert.equal(actual.primaryArea,area,id);
 assert(actual.relatedAreas.includes('bible'),id);
 assert(actual.contentTypes.includes(type),id);
 assert(actual.timeKinds.includes('material-witness'),id);
 assert.equal(actual.classificationStatus,'pilot-proposal',id);
 assert.equal(actual.researchStatus,'unknown',id);
 assert.equal(JSON.stringify(original),before,id);
 assert(Object.isFrozen(actual),id);
}
assert.equal(model.get({id:'O999'}).primaryArea,'unclassified');
console.log('O085-O090 content classification passed');
