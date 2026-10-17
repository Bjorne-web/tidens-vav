// Editorial gate: every research record added after the baseline must have an
// individual, source-backed explanation of its meaning for Israel/Judaism/Christianity.
// Baseline preserves pre-existing work for a separate C7 backlog audit.
// H066 and H067 are explicitly checked because this gate fixes their omission.
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
const html=fs.readFileSync('index.html','utf8');
const paths=[...html.matchAll(/<script src="(data\/[^"]+\.js)"><\/script>/g)].map(m=>m[1]);
assert.ok(paths.includes('data/data.generated.js'));
assert.ok(paths.includes('data/c7-religionshistorisk-betydelse.v890.js'));
const ctx=vm.createContext({window:{}});
for(const p of paths)vm.runInContext(fs.readFileSync(p,'utf8'),ctx,{filename:p});
vm.runInContext('globalThis.__rec={events,research};',ctx);
const list=ctx.__rec.events, c7=ctx.window.TIDENS_C7_RELIGION||{};
const old=new Set([
 ...Array.from({length:69},(_,i)=>'H'+String(i+1).padStart(3,'0')),
 ...Array.from({length:6},(_,i)=>'AP'+String(i+1).padStart(3,'0'))
]);
const mandatory=new Set(['H066','H067']);
const newlyAdded=list.filter(e=>!old.has(e.id)).map(e=>e.id);
for(const id of newlyAdded)mandatory.add(id);
for(const id of mandatory){
 assert.equal(list.filter(e=>e.id===id).length,1,'Unique new research entry required: '+id);
 const d=c7[id];
 assert.ok(d,'Missing required C7 significance for '+id);
 assert.ok(typeof d.level==='string' && d.level.trim().length>=28,'Need specific historical confidence/status for '+id);
 assert.ok(typeof d.paragraph==='string' && d.paragraph.trim().length>=550,'Need substantive individual historical significance for '+id);
 assert.ok(!/återstår att särskilt granska|ingen individuell.*analys.*registrerad|behöver kompletteras/i.test(d.paragraph),'Placeholder is not allowed for '+id);
 assert.ok(Array.isArray(d.sources) && d.sources.length>=2,'Two supporting sources required for '+id);
 for(const [name,url] of d.sources){
  assert.ok(typeof name==='string' && name.trim().length>=8,'Need bibliographic name: '+id);
  assert.ok(typeof url==='string' && /^https:\/\//.test(url),'Need valid HTTPS source: '+id);
 }
}
assert.ok(c7.H066.paragraph.includes('Jesaja 34:14') && c7.H067.paragraph.includes('Ben Siras alfabet'));
console.log('C7 content gate PASS:', [...mandatory].join(', '),'; baseline:',old.size,'historical IDs');
