const assert=require('node:assert/strict'),model=require('../v915-category-read-model.js');
const cases={H008:['bible','narrated-hypothetical'],H009:['world','historical-period'],H010:['bible','narrated-hypothetical'],H011:['world','historical-source'],H012:['world','archaeological-period'],H013:['bible','narrated-debated']};
for(const [id,[area,kind]] of Object.entries(cases)){const post={id,category:'ursprunglig',start:-1300,end:-1200,reviewed:false};const before=JSON.stringify(post);const x=model.get(post);assert.equal(x.primaryArea,area,id);assert(x.timeKinds.includes(kind),id);assert.equal(x.legacyCategory,post.category);assert.equal(x.researchStatus,'unknown');assert.equal(x.classificationStatus,'pilot-proposal');assert.equal(JSON.stringify(post),before)}
for(const id of ['H008','H010','H013'])assert(model.get({id}).timeKinds.every(k=>k.startsWith('narrated')));
assert.equal(model.get({id:'H014'}).primaryArea,'world');
console.log('B2.3 H008–H013 classified read-only; narrated vs historical time distinct.');
