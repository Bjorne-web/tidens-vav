const assert=require('node:assert/strict');
const model=require('../v915-category-read-model.js');
const expected={O049:['punic-wars','historical-period'],O050:['hundred-years-war','historical-period'],O051:['thirty-years-war','historical-period'],O052:['american-civil-war','historical-event'],O053:['world-war-one','historical-event'],O054:['world-war-two','historical-event']};
for(const [id,[type,kind]] of Object.entries(expected)){
 const original={id,category:'Krig',start:1914,end:1918,dating:'Originaldatering – ej faktagranskad'};
 const before=JSON.stringify(original),classified=model.get(original);
 assert.equal(classified.primaryArea,'world',id);
 assert(classified.contentTypes.includes(type),id);
 assert(classified.contentTypes.includes('armed-conflict'),id);
 assert(classified.timeKinds.includes(kind),id);
 assert.equal(classified.researchStatus,'unknown',id);
 assert.equal(classified.classificationStatus,'pilot-proposal',id);
 assert(Object.isFrozen(classified),id);
 assert.equal(JSON.stringify(original),before,id);
}
assert.equal(model.get({id:'O999'}).primaryArea,'unclassified');
console.log('B2 O049-O054 classifications pass');
