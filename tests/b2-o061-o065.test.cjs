const assert=require('node:assert/strict');
const fs=require('node:fs');
const model=require('../v915-category-read-model.js');
const raw=fs.readFileSync('data/data.generated.js','utf8');
const m=/(?:let|const)\s+originalEvents=/.exec(raw);
assert(m,'originalEvents source not found');
const posts=JSON.parse(raw.slice(m.index+m[0].length,raw.indexOf(';\n',m.index+m[0].length)));
const expected={O061:'gobekli-tepe',O062:'baalbek',O063:'puma-punku',O064:'nan-madol',O065:'longyou-caves'};
for(const [id,type] of Object.entries(expected)){
 const post=posts.find(x=>x.id===id);assert(post,'Missing source '+id);
 const before=JSON.stringify(post),value=model.get(post);
 assert.equal(value.primaryArea,'world',id);
 assert(value.contentTypes.includes(type),id);
 assert(value.timeKinds.includes('archaeological-period'),id);
 assert.equal(value.researchStatus,'unknown',id);
 assert.equal(value.classificationStatus,'pilot-proposal',id);
 assert.equal(JSON.stringify(post),before,id);
 assert(Object.isFrozen(value),id);
}
assert(!posts.some(x=>x.id==='O066'),'O066 source unexpectedly exists: reassess documented gap');
assert.equal(model.hasPilot('O066'),false);
assert.equal(model.get({id:'O999'}).primaryArea,'unclassified');
console.log('O061–O065 classified; O066 source gap documented');
