import assert from 'node:assert/strict';import fs from 'node:fs';import vm from 'node:vm';
const read=p=>fs.readFileSync(new URL('../'+p,import.meta.url),'utf8');
const ctx={window:{},console};vm.createContext(ctx);
vm.runInContext(read('data/data.generated.js'),ctx);
const ids=['O095','O096','O097','O098'],expected=['Skapelsen','Syndafallet','Noas ark','Babels torn'];
const previous=ctx.window.TIDENS_O_IDENTITY_AUDIT;
assert.equal(previous,undefined);
vm.runInContext(read('data/o095-o098-identity-fix.v8121.js'),ctx);
const audit=ctx.window.TIDENS_O_IDENTITY_AUDIT;assert.ok(audit);
for(let i=0;i<ids.length;i++){
 const id=ids[i];
 const result=vm.runInContext('({original:originalEvents.find(x=>x.id==='+JSON.stringify(id)+'),dossier:allOriginalResearchV828['+JSON.stringify(id)+'],time:editorialChronologyV817.filter(x=>x.id==='+JSON.stringify(id)+')})',ctx);
 assert.equal(result.original.title,expected[i],id+' title');
 assert.equal(result.original.description,expected[i],id+' description');
 assert.match(result.dossier.heading,new RegExp(['Skapelse','Eden','Noa','Babel'][i],'i'));
 assert.equal(result.original.evidence,'Ej granskad');
 assert.equal(result.original.start,-600);assert.equal(result.original.end,-500);
 assert.equal(result.time.length,0);
 assert.ok(result.dossier.sources.length>=2);
 assert.ok(audit.originalArchive[id].title.startsWith('Babylonisk'));
}
assert.deepEqual(Array.from(audit.displacedChronology,x=>x.id).sort(),['O096','O098']);
assert.match(audit.displacedChronology.find(x=>x.id==='O096').title,/deportationer/);
assert.match(audit.displacedChronology.find(x=>x.id==='O098').title,/persisk tid/);
const html=read('index.html');
assert.ok(html.indexOf('data/data.generated.js')<html.indexOf('data/o095-o098-identity-fix.v8121.js'));
assert.ok(html.indexOf('data/o095-o098-identity-fix.v8121.js')<html.indexOf('src="app.js"'));
console.log('PASS O095–O098: one ID per subject, prior histories preserved in audit, no false reviewed chronology');
