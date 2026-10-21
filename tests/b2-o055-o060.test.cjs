const assert=require('node:assert/strict');
const model=require('../v915-category-read-model.js');
const expected={O055:['great-pyramid','construction-period'],O056:['colossus-of-rhodes','construction-period'],O057:['great-wall-of-china','construction-period'],O058:['colosseum','historical-event'],O059:['hagia-sophia','historical-event'],O060:['taj-mahal','construction-period']};
for(const [id,[type,kind]] of Object.entries(expected)){
 const original={id,category:'Byggnadsverk',start:537,end:537,dating:'Originaldatering – ej faktagranskad'};
 const before=JSON.stringify(original),result=model.get(original);
 assert.equal(result.primaryArea,'world',id);
 assert(result.contentTypes.includes(type),id);
 assert(result.timeKinds.includes(kind),id);
 assert.equal(result.researchStatus,'unknown',id);
 assert.equal(result.classificationStatus,'pilot-proposal',id);
 assert.equal(JSON.stringify(original),before,id);
 assert(Object.isFrozen(result),id);
}
assert.equal(model.get({id:'O999'}).primaryArea,'unclassified');
console.log('B2 O055-O060 classifications pass');
