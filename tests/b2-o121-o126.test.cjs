const assert=require('node:assert/strict');
const fs=require('node:fs');
const model=require('../v915-category-read-model.js');
const src=fs.readFileSync('data/data.generated.js','utf8');
const m=/(?:let|const)\s+originalEvents=/.exec(src);assert(m);
const events=JSON.parse(src.slice(m.index+m[0].length,src.indexOf(';\n',m.index+m[0].length)));
const expected={O121:['bible','proverbs-collection'],O122:['bible','jonah-narrative'],O123:['world','maccabean-revolt'],O124:['bible','birth-of-jesus-traditions'],O125:['bible','jesus-ministry-traditions'],O126:['bible','crucifixion-of-jesus']};
for(const [id,[area,type]] of Object.entries(expected)){
 const original=events.find(x=>x.id===id);assert(original,id);
 const before=JSON.stringify(original),value=model.get(original);
 assert.equal(value.primaryArea,area,id);
 assert(value.contentTypes.includes(type),id);
 assert(value.timeKinds.includes('composition'),id);
 assert(value.timeKinds.includes('reception'),id);
 assert.equal(value.classificationStatus,'pilot-proposal',id);
 assert.equal(value.researchStatus,'unknown',id);
 assert.equal(JSON.stringify(original),before,id);
 assert(Object.isFrozen(value),id);
}
for(const id of ['O124','O126'])assert(model.get({id}).timeKinds.includes('historical-event'));
assert(model.get({id:'O125'}).timeKinds.includes('historical-period'));
assert.equal(model.get({id:'O999'}).primaryArea,'unclassified');
console.log('B2 O121-O126 chronology-aware classifications pass');
