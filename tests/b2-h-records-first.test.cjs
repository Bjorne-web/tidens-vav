const assert=require('node:assert/strict');const m=require('../v915-category-read-model.js');
const expected={H001:'world',H002:'world',H003:'world',H004:'religions',H005:'religions',H006:'religions',H007:'world'};
for(const [id,area] of Object.entries(expected)){const post={id,category:'legacy',start:-3000,reviewed:false},before=JSON.stringify(post),x=m.get(post);assert.equal(x.primaryArea,area,id);assert.equal(x.id,id);assert.equal(x.legacyCategory,'legacy');assert.equal(x.classificationStatus,'pilot-proposal');assert.equal(x.researchStatus,'unknown');assert.equal(JSON.stringify(post),before);}
for(const id of ['H008','H010','H013']){assert.equal(m.get({id}).primaryArea,'bible',id);assert(m.get({id}).timeKinds.some(k=>k.startsWith('narrated')),id);}
assert.equal(m.get({id:'B066'}).primaryArea,'bible');assert.equal(m.get({id:'D011'}).primaryArea,'bible');assert.equal(m.get({id:'AP001'}).primaryArea,'religions');
console.log('Seven H-record pilot mappings verified with legacy data unchanged.');
