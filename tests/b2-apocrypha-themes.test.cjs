const assert=require('node:assert/strict');const m=require('../v915-category-read-model.js');
const expected={AP001:'religions',AP002:'bible',AP003:'bible',AP004:'bible',AP005:'bible',AP006:'bible'};
for(const [id,area] of Object.entries(expected)){const post={id,category:'Religion & texter',start:-100,reviewed:false},old=JSON.stringify(post),x=m.get(post);
assert.equal(x.primaryArea,area);assert.equal(x.classificationStatus,'pilot-proposal');assert(!x.contentTypes.includes('apocryphal-book'));assert.equal(x.researchStatus,'unknown');assert.equal(x.legacyCategory,post.category);assert.equal(JSON.stringify(post),old);}
assert.equal(m.get({id:'AP007'}).primaryArea,'unclassified');
for(let n=1;n<=11;n++)assert.equal(m.get({id:'D'+String(n).padStart(3,'0')}).primaryArea,'bible');
console.log('AP001–AP006 thematic classification proposals verified without changing D books.');
