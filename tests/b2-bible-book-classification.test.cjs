const assert=require('node:assert/strict');
const model=require('../v915-category-read-model.js');
for(let n=1;n<=66;n++){
 const id='B'+String(n).padStart(3,'0'),post={id,title:'test',reviewStatus:'preliminary'};
 const snapshot=JSON.stringify(post),x=model.get(post);
 assert.equal(x.primaryArea,'bible',id);
 assert(x.contentTypes.includes('bible-book'),id);
 assert.equal(x.researchStatus,'unknown',id);
 assert.equal(JSON.stringify(post),snapshot,id);
}
assert.equal(model.get({id:'B067'}).primaryArea,'unclassified');
assert.equal(model.get({id:'D001'}).primaryArea,'bible');
assert.equal(model.get({id:'H045',category:'Arkeologi'}).legacyCategory,'Arkeologi');
assert.equal(model.get({id:'O067'}).primaryArea,'religions');
console.log('B2.3 verified 66 B-series book identities without mutating sources.');
