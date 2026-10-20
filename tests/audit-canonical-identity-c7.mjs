import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
const read=p=>fs.readFileSync(p,'utf8');
const mapping=JSON.parse(read('docs/c7-o095-o130-id-mapping-20261019.json'));
const ctx={window:{}};vm.createContext(ctx);
vm.runInContext(read('data/data.generated.js'),ctx);
const imports=['o095-o098-identity-fix.v8121.js','o099-o102-identity.v8122.js','o103-o106-identity.v8123.js','o107-o110-identity.v8124.js','o111-o114-identity.v8125.js','o115-o118-identity.v8126.js','o119-o122-identity.v8127.js','o123-o126-identity.v8128.js'];
for(const file of imports)vm.runInContext(read('data/'+file),ctx);
const entries=vm.runInContext('originalEvents.map(e=>({id:e.id,title:e.title,subject:e.subject,legacyTitle:e.legacyTitle,start:e.start,end:e.end}))',ctx);
const byId=new Map();
for(const e of entries){assert(!byId.has(e.id),'Duplicated original ID '+e.id);byId.set(e.id,e);}
const audit=mapping.entries.filter(e=>/^O(0(9[5-9])|1([0-2][0-9]|30))$/.test(e.id));
const corrected=[],pending=[];
for(const rec of audit){
 const event=byId.get(rec.id);assert(event,'Missing '+rec.id);
 const normalized=event.title===rec.biblical_subject;
 if(normalized){
   corrected.push(rec.id);
   assert.equal(event.subject,rec.biblical_subject,rec.id+' subject');
   assert(typeof event.legacyTitle==='string'&&event.legacyTitle.length>0,rec.id+' missing legacy title');
 } else pending.push({id:rec.id,current:event.title,expected:rec.biblical_subject});
}
assert(corrected.includes('O123')&&corrected.includes('O126'));
const html=read('index.html');for(const file of imports)assert(html.includes('data/'+file),'Missing script '+file);
console.log(JSON.stringify({count:entries.length,corrected:corrected.length,pending},null,2));
