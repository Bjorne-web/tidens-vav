const assert=require('node:assert/strict');
const model=require('../v915-category-read-model.js');
const expected={O031:'vedic-traditions',O032:'buddhist-traditions',O033:'confucian-traditions',O034:'christianity',O035:'classical-hindu-traditions',O036:'islam'};
for(const [id,kind] of Object.entries(expected)){
 const post={id,category:'Religion',start:-500,end:2025,dating:'Originaldatering – ej faktagranskad'};
 const before=JSON.stringify(post),value=model.get(post);
 assert.equal(value.primaryArea,'religions',id);
 assert(value.contentTypes.includes(kind),id);
 assert.equal(value.researchStatus,'unknown',id);
 assert.equal(value.classificationStatus,'pilot-proposal',id);
 assert(!value.relatedAreas.includes(value.primaryArea),id);
 assert(Object.isFrozen(value),id);
 assert.equal(JSON.stringify(post),before,id);
}
assert(model.get({id:'O033'}).contentTypes.includes('daoist-traditions'));
assert.equal(model.get({id:'O049'}).primaryArea,'unclassified');
console.log('O031-O036 classification passed');
