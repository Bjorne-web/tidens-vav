const assert=require('node:assert/strict');
const model=require('../v915-category-read-model.js');
const expected={H053:['religions','material-witness'],H054:['world','material-witness'],H055:['bible','translation'],H056:['bible','material-witness'],H057:['religions','material-witness'],H058:['bible','material-witness'],H059:['religions','historical-period']};
for(const [id,[area,time]] of Object.entries(expected)){const original={id,category:'legacy',start:-200,end:-100,reviewed:true};const before=JSON.stringify(original);const row=model.get(original);assert.equal(row.primaryArea,area,id);assert(row.timeKinds.includes(time),id);assert.equal(row.researchStatus,'unknown',id);assert.equal(row.classificationStatus,'pilot-proposal',id);assert.equal(before,JSON.stringify(original),id);}
assert.equal(model.get({id:'H070'}).primaryArea,'unclassified');
console.log('B2 H053–H059 classification passed');
