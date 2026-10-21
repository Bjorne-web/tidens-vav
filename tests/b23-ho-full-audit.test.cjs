const assert=require('node:assert/strict');
const fs=require('node:fs');
const model=require('../v915-category-read-model.js');
const data=fs.readFileSync('data/data.generated.js','utf8');
const source=fs.readFileSync('v915-category-read-model.js','utf8');
function read(n){const m=new RegExp('(?:let|const)\\s+'+n+'=').exec(data);assert(m,'Missing '+n);return JSON.parse(data.slice(m.index+m[0].length,data.indexOf(';\n',m.index+m[0].length)));}
const originalO=read('originalEvents').filter(x=>/^O\d{3}$/.test(x.id));
const originalH=read('events').filter(x=>/^H\d{3}$/.test(x.id));
const keys=[...source.matchAll(/^\s*([HO]\d{3}):\{/gm)].map(m=>m[1]);
for(const [type,posts,count] of [['O',originalO,129],['H',originalH,64]]){
 assert.equal(posts.length,count,type+' source count changed: review explicitly');
 const srcIds=posts.map(x=>x.id);
 assert.equal(new Set(srcIds).size,count,type+' duplicate source ID');
 const ids=keys.filter(id=>id.startsWith(type));
 assert.equal(ids.length,type==='H'?69:count,type+' override count changed');
 assert.equal(new Set(ids).size,ids.length,type+' duplicate override declaration');
 if(type==='O')assert.deepEqual(ids.slice().sort(),srcIds.slice().sort(),type+' missing/orphan overrides');
 else {
  const files={'H065':'data/dilmun-ninti.v887.js','H066':'data/lilith.v888-draft.js','H067':'data/lilith.v888-draft.js','H068':'data/ophites-naghammadi.v889-draft.js','H069':'data/ophites-naghammadi.v889-draft.js'};
  const html=fs.readFileSync('index.html','utf8');
  for(const [id,file] of Object.entries(files)){
   const supplement=fs.readFileSync(file,'utf8');
   assert(supplement.includes("id:'"+id+"'"),id+' missing in supplemental source '+file);
   assert(html.includes('src="'+file+'"'),file+' not loaded by index');
   assert(html.indexOf('data/data.generated.js')<html.indexOf('src="'+file+'"'),file+' loaded before originals');
  }
  const extra=ids.filter(id=>!srcIds.includes(id)).sort();
  assert.deepEqual(extra,['H065','H066','H067','H068','H069'],'Undocumented H overrides not found in original events');
  for(const id of extra){const value=model.get({id});assert(model.hasPilot(id));assert(model.areas.includes(value.primaryArea));assert.equal(value.researchStatus,'unknown');}
  assert(srcIds.every(id=>ids.includes(id)),'Original H entry missing from classifications');
 }
 for(const post of posts){
  const before=JSON.stringify(post),result=model.get(post);
  assert(model.hasPilot(post.id),post.id);
  assert(model.areas.includes(result.primaryArea),post.id);
  assert(!result.relatedAreas.includes(result.primaryArea),post.id);
  assert.equal(new Set(result.relatedAreas).size,result.relatedAreas.length,post.id);
  assert(result.relatedAreas.every(a=>model.areas.includes(a)),post.id);
  assert(result.contentTypes.length>0&&result.timeKinds.length>0,post.id);
  assert.equal(result.researchStatus,'unknown',post.id);
  assert.equal(result.classificationStatus,'pilot-proposal',post.id);
  assert.equal(JSON.stringify(post),before,post.id+' source changed');
  assert(Object.isFrozen(result),post.id);
 }
}
assert(!originalO.some(x=>x.id==='O066'),'O066 source has appeared; revisit gap');
assert(!model.hasPilot('O066'),'Do not invent O066 override');
assert.equal(model.get({id:'O999'}).primaryArea,'unclassified');
console.log('B2.3 all 198 H/O classifications covered and internally consistent; O066 remains absent');
