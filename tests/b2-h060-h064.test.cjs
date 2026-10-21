const assert=require('node:assert/strict');
const model=require('../v915-category-read-model.js');
const expected={H060:['world','historical-period'],H061:['world','historical-period'],H062:['world','material-witness'],H063:['world','historical-event'],H064:['religions','historical-tradition']};
for(const [id,[area,kind]] of Object.entries(expected)){
 const original={id,category:'old',start:70,end:70,reviewed:false},before=JSON.stringify(original);
 const result=model.get(original);
 assert.equal(result.primaryArea,area,id);
 assert(result.timeKinds.includes(kind),id);
 assert.equal(result.researchStatus,'unknown',id);
 assert.equal(result.classificationStatus,'pilot-proposal',id);
 assert.equal(JSON.stringify(original),before);
}
assert.equal(model.get({id:'H070'}).primaryArea,'unclassified');
console.log('H060-H064 classification and source integrity pass');
