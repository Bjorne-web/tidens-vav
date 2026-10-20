import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
const source=p=>fs.readFileSync(p,'utf8');
const ctx={window:{}};vm.createContext(ctx);
vm.runInContext(source('data/data.generated.js'),ctx);
vm.runInContext(source('data/o123-o126-identity.v8128.js'),ctx);
const names=['Makkaberupproret','Jesu födelse','Jesu offentliga verksamhet','Jesu korsfästelse'];
const ids=['O123','O124','O125','O126'];
const original=vm.runInContext('originalEvents.filter(e=>e.id>="O123" && e.id<="O126").map(e=>({id:e.id,title:e.title,legacyTitle:e.legacyTitle}))',ctx);
assert.equal(original.length,4);
for(let i=0;i<4;i++)assert.equal(original[i].title,names[i]);
vm.runInContext(source('data/c7-religionshistorisk-betydelse.v8130.js'),ctx);
const religion=ctx.window.TIDENS_C7_RELIGION;
for(const id of ids){assert(religion[id].paragraph.split(/\s+/).length>=170,id+' content');assert(religion[id].sources.length>=3,id+' sources');}
vm.runInContext(source('data/c7-dating-pilot-o119-o122.js'),ctx);
vm.runInContext(source('data/c7-dating-o123-o126.js'),ctx);
vm.runInContext(source('v8130-dating-bridge.js'),ctx);
const times=ctx.window.TIDENS_C7_DATING_PILOT;
for(const id of ids){assert(times[id].undated,id+' caveat');for(const phase of times[id].phases){assert(['B','A'].includes(phase.evidence));assert(['text-composition','material-witness','historical-event','narrated-time'].includes(phase.timeType));assert(phase.sources.length>=2);assert(phase.start<=phase.end);}}
assert.equal(times.O124.phases.length,0);
assert.equal(times.O125.phases.length,0);
assert.equal(times.O123.phases[0].start,-167);
assert.equal(times.O126.phases[0].timeType,'historical-event');
assert(times.O119&&times.O120,'pilot retained');
const html=source('index.html');
for(const path of ['data/c7-religionshistorisk-betydelse.v8130.js','data/c7-dating-o123-o126.js','v8130-dating-bridge.js'])assert(html.includes(path),path);
assert(html.indexOf('v8130-dating-bridge.js')<html.indexOf('v839-temaspar-context.js'));
console.log('PASS C7 36 content, time types, ID and sources');