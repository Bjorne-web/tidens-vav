const assert=require('node:assert/strict');
const model=require('../v915-category-read-model.js');
const expected={
 H023:['bible','composition'],
 H024:['world','historical-period'],
 H025:['religions','text-tradition'],
 H026:['world','historical-event'],
 H027:['religions','historical-reconstruction'],
 H028:['religions','historical-reconstruction'],
 H029:['world','historical-reconstruction']
};
for(const [id,[area,timeKind]] of Object.entries(expected)){
 const post={id,category:'legacy category',start:-167,end:-164,reviewed:false};
 const before=JSON.stringify(post);
 const result=model.get(post);
 assert.equal(result.primaryArea,area,id);
 assert(result.timeKinds.includes(timeKind),id);
 assert.equal(result.legacyCategory,'legacy category',id);
 assert.equal(result.researchStatus,'unknown',id);
 assert.equal(result.classificationStatus,'pilot-proposal',id);
 assert.equal(JSON.stringify(post),before,id+' must remain unmodified');
 assert(Object.isFrozen(result),id);
}
assert.equal(model.get({id:'H046'}).primaryArea,'unclassified');
console.log('H023-H029 temporal classification pilot checks passed.');
