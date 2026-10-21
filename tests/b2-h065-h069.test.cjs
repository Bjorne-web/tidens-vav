const assert=require('node:assert/strict');
const model=require('../v915-category-read-model.js');
const expected={
 H065:['religions','material-witness'],H066:['religions','reception'],
 H067:['religions','composition'],H068:['religions','historical-source'],
 H069:['religions','material-witness']
};
for(const [id,[area,timeKind]] of Object.entries(expected)){
 const post={id,category:'legacy',start:300,end:399,reviewed:false};
 const snapshot=JSON.stringify(post),actual=model.get(post);
 assert.equal(actual.primaryArea,area,id);
 assert(actual.timeKinds.includes(timeKind),id);
 assert.equal(actual.researchStatus,'unknown',id);
 assert.equal(actual.classificationStatus,'pilot-proposal',id);
 assert.equal(JSON.stringify(post),snapshot,id);
}
assert.equal(model.get({id:'H070'}).primaryArea,'unclassified');
console.log('H065-H069 supplementary classifications passed');
