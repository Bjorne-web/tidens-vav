const assert=require('node:assert/strict');
const model=require('../v915-category-read-model.js');
for(let n=7;n<=12;n++){
 const id='O'+String(n).padStart(3,'0');
 const original={id,category:'Människans utveckling',start:-3000000,end:-100000,dating:'Originaldatering – ej faktagranskad'};
 const snapshot=JSON.stringify(original),classified=model.get(original);
 assert.equal(classified.primaryArea,'world',id);
 assert(classified.contentTypes.includes('human-evolution'),id);
 assert(classified.timeKinds.includes('evolutionary-period'),id);
 assert.equal(classified.researchStatus,'unknown',id);
 assert.equal(classified.classificationStatus,'pilot-proposal',id);
 assert.equal(JSON.stringify(original),snapshot,id);
 assert(!classified.relatedAreas.includes(classified.primaryArea),id);
 assert(Object.isFrozen(classified),id);
}
assert.equal(model.get({id:'O055'}).primaryArea,'unclassified');
console.log('O007–O012 category-only proposals pass');
