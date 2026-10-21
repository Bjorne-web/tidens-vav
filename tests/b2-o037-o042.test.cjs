const assert=require('node:assert/strict');
const model=require('../v915-category-read-model.js');
const expected={O037:'mesopotamian-civilizations',O038:'ancient-egypt',O039:'indus-civilization',O040:'akkadian-empire',O041:'chinese-dynasties',O042:'ancient-greece'};
for(const [id,kind] of Object.entries(expected)){const post={id,category:'Civilisation',dating:'Originaldatering – ej faktagranskad'};const before=JSON.stringify(post);const result=model.get(post);assert.equal(result.primaryArea,'world',id);assert(result.contentTypes.includes(kind),id);assert.equal(result.researchStatus,'unknown',id);assert.equal(result.classificationStatus,'pilot-proposal',id);assert.equal(JSON.stringify(post),before,id);}
assert(model.get({id:'O039'}).timeKinds.includes('archaeological-period'));
assert.equal(model.get({id:'O061'}).primaryArea,'unclassified');
console.log('O037-O042 classification passed');
