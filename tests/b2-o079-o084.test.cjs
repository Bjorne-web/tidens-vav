const assert=require('node:assert/strict');
const fs=require('node:fs');
const model=require('../v915-category-read-model.js');
const source=fs.readFileSync('data/data.generated.js','utf8');
const m=/(?:let|const)\s+originalEvents=/.exec(source);
assert(m,'Original source missing');
const events=JSON.parse(source.slice(m.index+m[0].length,source.indexOf(';\n',m.index+m[0].length)));
const expected={O079:['world','hammurabi-law-collection'],O080:['world','ancient-near-eastern-treaties'],O081:['religions','horus-traditions'],O082:['religions','herakles-traditions'],O083:['religions','perseus-traditions'],O084:['religions','dionysos-traditions']};
for(const [id,[area,kind]] of Object.entries(expected)){
 const original=events.find(x=>x.id===id);assert(original,id);
 const before=JSON.stringify(original),value=model.get(original);
 assert.equal(value.primaryArea,area,id);
 assert(value.relatedAreas.includes('bible'),id);
 assert(value.contentTypes.includes(kind),id);
 assert(value.timeKinds.includes('material-witness'),id);
 assert.equal(value.classificationStatus,'pilot-proposal',id);
 assert.equal(value.researchStatus,'unknown',id);
 assert.equal(JSON.stringify(original),before,id);
 assert(Object.isFrozen(value),id);
}
for(const id of ['O081','O083'])assert(model.get({id}).contentTypes.includes('contested-virgin-birth-claim'));
assert.equal(model.get({id:'O999'}).primaryArea,'unclassified');
console.log('B2 O079-O084 read-only classification checks pass');
