const assert=require('node:assert/strict');
const model=require('../v915-category-read-model.js');
const expected={O019:['ideas','intellectual-history-period'],O020:['world','historical-period'],O021:['world','historical-period'],O022:['world','historical-period'],O023:['religions','archaeological-period'],O024:['religions','historical-period']};
for(const [id,[area,kind]] of Object.entries(expected)){
 const post={id,category:'original',start:-3500,end:2025,dating:'Originaldatering – ej faktagranskad'};
 const snapshot=JSON.stringify(post),row=model.get(post);
 assert.equal(row.primaryArea,area,id);
 assert(row.timeKinds.includes(kind),id);
 assert.equal(row.researchStatus,'unknown',id);
 assert.equal(row.classificationStatus,'pilot-proposal',id);
 assert.equal(JSON.stringify(post),snapshot,id);
}
assert.equal(model.get({id:'O037'}).primaryArea,'unclassified');
console.log('O019-O024 class proposals passed');
