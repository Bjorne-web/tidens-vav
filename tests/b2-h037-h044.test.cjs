const assert=require('node:assert/strict');
const model=require('../v915-category-read-model.js');
const expected={H037:'historical-period',H038:'archaeological-period',H039:'historical-period',H040:'historical-source',H041:'historical-source',H042:'historical-event',H043:'archaeological-period',H044:'historical-period'};
for(const [id,time] of Object.entries(expected)){
 const post={id,category:'legacy',start:-800,end:-700,reviewed:true};
 const before=JSON.stringify(post),result=model.get(post);
 assert.equal(result.primaryArea,'world',id);
 assert(result.timeKinds.includes(time),id);
 assert.equal(result.legacyCategory,'legacy',id);
 assert.equal(result.researchStatus,'unknown',id);
 assert.equal(result.classificationStatus,'pilot-proposal',id);
 assert.equal(JSON.stringify(post),before,id);
 assert(Object.isFrozen(result),id);
}
assert.equal(model.get({id:'H046'}).primaryArea,'unclassified');
console.log('H037-H044 classification passed');
