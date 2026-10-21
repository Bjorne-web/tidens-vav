const assert=require('node:assert/strict');
const fs=require('node:fs');
const model=require('../v915-category-read-model.js');
const source=fs.readFileSync('data/data.generated.js','utf8');
const m=/(?:let|const)\s+originalEvents=/.exec(source);assert(m);
const events=JSON.parse(source.slice(m.index+m[0].length,source.indexOf(';\n',m.index+m[0].length)));
const repeated=new Map();
for(const item of events){if(!repeated.has(item.title))repeated.set(item.title,[]);repeated.get(item.title).push(item)}
const groups=[...repeated].filter(([,v])=>v.length>1).map(([title,v])=>({title,ids:v.map(x=>x.id)}));
const expected=[
 ['O026','O027','O028','O029'],
 ['O095','O096'],
 ['O097','O098','O099','O100','O101'],
 ['O103','O104','O105','O106','O107','O108','O109','O110','O111','O112'],
 ['O114','O115']
];
assert.equal(groups.length,expected.length,'New repeated title must be triaged');
for(let i=0;i<expected.length;i++)assert.deepEqual(groups[i].ids,expected[i],'Changed repeated-title group');
const ids=expected.flat();
assert.equal(new Set(ids).size,ids.length);
for(const id of ids){const x=events.find(x=>x.id===id),before=JSON.stringify(x),c=model.get(x);assert(c&&c.primaryArea!=='unclassified',id);assert.equal(JSON.stringify(x),before,id)}
assert.equal(events.length,129,'Original O inventory changed');
console.log(JSON.stringify({repeatedTitleGroups:groups.length,affectedPosts:ids.length,groups},null,2));
