const fs=require('node:fs'),assert=require('node:assert/strict');
const model=require('../v915-category-read-model.js');
const src=fs.readFileSync('data/data.generated.js','utf8');
const match=/(?:let|const)\s+events=/.exec(src);
assert(match,'Missing H events collection');
const start=match.index+match[0].length;
const posts=JSON.parse(src.slice(start,src.indexOf(';\n',start)));
const layers=[
 ['data/dilmun-ninti.v887.js',['H065']],
 ['data/lilith.v888-draft.js',['H066','H067']],
 ['data/ophites-naghammadi.v889-draft.js',['H068','H069']]
];
const ids=posts.map(p=>p.id).filter(id=>/^H\d{3}$/.test(id));
for(const [file,expected] of layers){
 const content=fs.readFileSync(file,'utf8');
 for(const id of expected){assert(new RegExp("id:['\"]"+id+"['\"]").test(content),id+' missing from '+file);ids.push(id)}
}
assert.equal(ids.length,69,'Expected 64 main H entries and 5 extensions');
assert.equal(new Set(ids).size,69,'Duplicate H IDs');
const areas={bible:0,religions:0,world:0,ideas:0};
for(const id of ids){
 const original=posts.find(p=>p.id===id)||{id,category:'supplementary-source'};
 const before=JSON.stringify(original),c=model.get(original);
 assert(model.hasPilot(id),'Missing mapping '+id);
 assert(model.areas.includes(c.primaryArea),'Unknown primary area '+id);
 assert(!c.relatedAreas.includes(c.primaryArea),'Self relation '+id);
 assert.equal(c.researchStatus,'unknown',id);
 assert.equal(c.classificationStatus,'pilot-proposal',id);
 assert(Object.isFrozen(c));
 assert.equal(JSON.stringify(original),before,id+' mutated');
 areas[c.primaryArea]++;
}
console.log('H001-H069: 69 unique entries classified; area counts:',JSON.stringify(areas));
