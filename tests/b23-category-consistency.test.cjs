const assert=require('node:assert/strict');
const fs=require('node:fs');
const model=require('../v915-category-read-model.js');
const data=fs.readFileSync('data/data.generated.js','utf8');
const m=/(?:let|const)\s+originalEvents=/.exec(data);assert(m);
const posts=JSON.parse(data.slice(m.index+m[0].length,data.indexOf(';\n',m.index+m[0].length)));
const areas=new Map();
for(const p of posts){
 const before=JSON.stringify(p),c=model.get(p);
 assert(model.areas.includes(c.primaryArea),p.id);
 assert(c.relatedAreas.every(a=>model.areas.includes(a)&&a!==c.primaryArea),p.id);
 assert.equal(new Set(c.relatedAreas).size,c.relatedAreas.length,p.id);
 assert(c.contentTypes.length>0&&c.timeKinds.length>0,p.id);
 assert.equal(c.researchStatus,'unknown',p.id);
 assert.equal(JSON.stringify(p),before,p.id);
 (areas.get(c.primaryArea)||areas.set(c.primaryArea,[]).get(c.primaryArea)).push(p.id);
}
function expect(ids,area){
 for(const id of ids){const post=posts.find(x=>x.id===id);assert(post,id+' missing from source');assert.equal(model.get(post).primaryArea,area,id)}
}
expect(['O026','O027','O028','O029'],'religions');
expect(['O095','O096','O097','O098','O099','O100','O101','O102','O103','O104','O105','O106','O107','O108','O109','O110','O111','O112','O113','O114','O115','O116','O117','O118','O119','O120','O121','O122','O124','O125','O126','O127','O128','O130'],'bible');
expect(['O123','O129'],'world');
assert(model.get(posts.find(x=>x.id==='O119')).relatedAreas.includes('ideas'),'Job must remain searchable as a philosophical theme');
assert(model.get(posts.find(x=>x.id==='O124')).timeKinds.includes('historical-event'));
assert(model.get(posts.find(x=>x.id==='O126')).timeKinds.includes('historical-event'));
console.log(JSON.stringify(Object.fromEntries([...areas].map(([k,v])=>[k,v.length])),null,2));
