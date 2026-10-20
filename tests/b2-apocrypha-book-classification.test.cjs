const assert=require('node:assert/strict');const model=require('../v915-category-read-model.js');
for(let n=1;n<=11;n++){const id='D'+String(n).padStart(3,'0'),post={id,title:'test',reviewStatus:'preliminary'},old=JSON.stringify(post),c=model.get(post);
assert.equal(c.primaryArea,'bible',id);assert(c.contentTypes.includes('apocryphal-book'));assert.equal(c.classificationStatus,'structural-apocrypha-identity');assert.equal(c.researchStatus,'unknown');assert.deepEqual([...c.relatedAreas],[]);assert.equal(JSON.stringify(post),old);}
assert.equal(model.get({id:'D012'}).primaryArea,'unclassified');
assert.equal(model.get({id:'AP001'}).primaryArea,'religions');
assert.equal(model.get({id:'B066'}).primaryArea,'bible');
assert.equal(model.get({id:'H001',category:'Arkeologi'}).legacyCategory,'Arkeologi');
console.log('D001–D011 structural apocrypha identity verified; canon/review status untouched.');
