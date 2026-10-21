const assert=require('node:assert/strict');
const fs=require('node:fs');
const model=require('../v915-category-read-model.js');
const src=fs.readFileSync('data/data.generated.js','utf8');
const m=/(?:let|const)\s+originalEvents=/.exec(src);assert(m);
const events=JSON.parse(src.slice(m.index+m[0].length,src.indexOf(';\n',m.index+m[0].length)));
const expected={O115:['babylonian-exile','historical-period'],O116:['daniel-lions-den','narrated-time'],O117:['return-from-exile','historical-period'],O118:['esther-narrative','narrated-time'],O119:['job-literature','narrated-time'],O120:['psalms-collection','composition']};
for(const [id,[kind,time]] of Object.entries(expected)){
 const original=events.find(x=>x.id===id);assert(original,id);
 const prior=JSON.stringify(original),result=model.get(original);
 assert.equal(result.primaryArea,'bible',id);
 assert(result.contentTypes.includes(kind),id);
 assert(result.timeKinds.includes(time),id);
 assert(result.timeKinds.includes('composition'),id);
 assert.equal(result.classificationStatus,'pilot-proposal',id);
 assert.equal(result.researchStatus,'unknown',id);
 assert.equal(JSON.stringify(original),prior,id);
 assert(Object.isFrozen(result),id);
}
assert.equal(model.get({id:'O999'}).primaryArea,'unclassified');
console.log('B2 O115–O120 classifications pass');
