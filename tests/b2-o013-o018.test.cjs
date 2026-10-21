const assert=require('node:assert/strict');
const model=require('../v915-category-read-model.js');
const expectations={O013:['human-migration','migration-period'],O014:['prehistoric-art','archaeological-period'],O015:['agriculture','historical-period'],O016:['technological-change','historical-period'],O017:['urbanization','historical-period'],O018:['iron-age','historical-period']};
for(const [id,[contentType,timeKind]] of Object.entries(expectations)){
 const input={id,category:'Människans utveckling',start:-3300,end:-1200,dating:'Originaldatering – ej faktagranskad'};
 const snapshot=JSON.stringify(input),out=model.get(input);
 assert.equal(out.primaryArea,'world',id);
 assert(out.contentTypes.includes(contentType),id);
 assert(out.timeKinds.includes(timeKind),id);
 assert.equal(out.classificationStatus,'pilot-proposal',id);
 assert.equal(out.researchStatus,'unknown',id);
 assert.equal(JSON.stringify(input),snapshot,id);
 assert(Object.isFrozen(out),id);
}
assert.equal(model.get({id:'O061'}).primaryArea,'unclassified');
console.log('O013–O018 classification passed');
