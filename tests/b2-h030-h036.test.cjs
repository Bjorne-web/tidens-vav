const assert=require('node:assert/strict');
const model=require('../v915-category-read-model.js');
const expected={
 H030:['bible','composition'],
 H031:['bible','composition'],
 H032:['world','historical-event'],
 H033:['bible','composition'],
 H034:['bible','composition'],
 H035:['bible','composition'],
 H036:['world','historical-period']
};
for(const [id,[area,timeKind]] of Object.entries(expected)){
 const original={id,category:'legacy',start:70,end:90,reviewed:false};
 const before=JSON.stringify(original);
 const actual=model.get(original);
 assert.equal(actual.primaryArea,area,id);
 assert(actual.timeKinds.includes(timeKind),id);
 assert.equal(actual.researchStatus,'unknown',id);
 assert.equal(actual.classificationStatus,'pilot-proposal',id);
 assert.equal(JSON.stringify(original),before,id);
 assert(Object.isFrozen(actual),id);
}
assert.equal(model.get({id:'H037'}).primaryArea,'unclassified');
console.log('H030-H036 classification checks passed.');
