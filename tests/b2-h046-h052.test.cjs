const assert=require('node:assert/strict');
const model=require('../v915-category-read-model.js');
const expected={H046:'world',H047:'religions',H048:'religions',H049:'religions',H050:'bible',H051:'world',H052:'world'};
for(const [id,area] of Object.entries(expected)){const post={id,category:'legacy',reviewed:true};const before=JSON.stringify(post);const result=model.get(post);assert.equal(result.primaryArea,area);assert.equal(result.researchStatus,'unknown');assert.equal(result.classificationStatus,'pilot-proposal');assert.equal(JSON.stringify(post),before);}
console.log('H046-H052 passed');
