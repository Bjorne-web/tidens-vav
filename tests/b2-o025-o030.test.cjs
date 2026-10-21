const assert=require('node:assert/strict');
const model=require('../v915-category-read-model.js');
const expected={O025:'historical-period',O026:'narrated-time',O027:'historical-period',O028:'historical-period',O029:'historical-period',O030:'historical-period'};
for(const [id,kind] of Object.entries(expected)){
 const post={id,category:'Religion',dating:'Originaldatering – ej faktagranskad',start:-1200,end:2025};
 const before=JSON.stringify(post),result=model.get(post);
 assert.equal(result.primaryArea,'religions',id);
 assert(result.timeKinds.includes(kind),id);
 assert.equal(result.researchStatus,'unknown',id);
 assert.equal(result.classificationStatus,'pilot-proposal',id);
 assert.equal(JSON.stringify(post),before,id);
}
assert.equal(model.get({id:'O043'}).primaryArea,'unclassified');
console.log('O025-O030 temporal religion classification passes');
