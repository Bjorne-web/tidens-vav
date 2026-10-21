const assert=require('node:assert/strict');
const model=require('../v915-category-read-model.js');
const expected={O001:'migration-period',O002:'historical-period',O003:'ethnolinguistic-tradition',O004:'ethnolinguistic-tradition',O005:'ethnolinguistic-tradition',O006:'migration-period'};
for(const [id,kind] of Object.entries(expected)){
 const post={id,category:'Folk',start:-2000,end:2025,reviewed:false};
 const before=JSON.stringify(post),actual=model.get(post);
 assert.equal(actual.primaryArea,'world',id);
 assert(actual.timeKinds.includes(kind),id);
 assert.equal(actual.researchStatus,'unknown',id);
 assert.equal(actual.classificationStatus,'pilot-proposal',id);
 assert.equal(actual.legacyCategory,'Folk',id);
 assert(!actual.relatedAreas.includes(actual.primaryArea),id);
 assert.equal(JSON.stringify(post),before,id);
}
assert.equal(model.get({id:'O013'}).primaryArea,'unclassified');
console.log('B2 O001-O006 classification passes');
