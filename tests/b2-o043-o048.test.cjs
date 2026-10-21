const assert=require('node:assert/strict');
const model=require('../v915-category-read-model.js');
const expected={O043:['persian-empires','historical-period'],O044:['roman-empire','historical-period'],O045:['byzantine-empire','historical-period'],O046:['medieval-europe','historical-period'],O047:['modern-europe','historical-period'],O048:['peloponnesian-war','historical-event']};
for(const [id,[type,kind]] of Object.entries(expected)){
 const original={id,category:'original',dating:'Originaldatering – ej faktagranskad',start:-431,end:-404};
 const before=JSON.stringify(original),actual=model.get(original);
 assert.equal(actual.primaryArea,'world',id);
 assert(actual.contentTypes.includes(type),id);
 assert(actual.timeKinds.includes(kind),id);
 assert.equal(actual.researchStatus,'unknown',id);
 assert.equal(actual.classificationStatus,'pilot-proposal',id);
 assert.equal(JSON.stringify(original),before,id);
}
assert.equal(model.get({id:'O999'}).primaryArea,'unclassified');
console.log('B2.3 O043-O048 category checks pass');
