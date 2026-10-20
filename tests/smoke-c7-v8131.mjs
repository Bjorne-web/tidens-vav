import assert from 'node:assert/strict';
import fs from 'node:fs';import vm from 'node:vm';
const read=p=>fs.readFileSync(p,'utf8'),ctx={window:{}};vm.createContext(ctx);
vm.runInContext(read('data/data.generated.js'),ctx);
vm.runInContext(read('data/o127-o130-identity.v8129.js'),ctx);
const ids=['O127','O128','O129','O130'],names=['Församlingens födelse','Paulus brev','Jerusalems förstörelse','Uppenbarelseboken'];
const posts=vm.runInContext('originalEvents.filter(e=>e.id>="O127"&&e.id<="O130")',ctx);
assert.equal(posts.length,4);posts.forEach((e,i)=>assert.equal(e.title,names[i]));
vm.runInContext(read('data/c7-religionshistorisk-betydelse.v8131.js'),ctx);
for(const id of ids){const c=ctx.window.TIDENS_C7_RELIGION[id];assert(c.paragraph.split(/\s+/).length>=155,id+' substance');assert(c.sources.length>=3,id+' sources');}
vm.runInContext(read('data/c7-dating-o127-o130.js'),ctx);
vm.runInContext(read('v8131-dating-bridge.js'),ctx);
const d=ctx.window.TIDENS_C7_DATING_PILOT;
for(const id of ids){assert(d[id].undated,id+' caveat');for(const p of d[id].phases){assert(['A','B'].includes(p.evidence));assert(p.sources.length>=2);assert(p.timeType);assert(p.start<=p.end);}}
assert.equal(d.O129.phases[0].start,70);assert.equal(d.O129.phases[0].end,70);
assert.equal(d.O128.phases.length,0);assert.equal(d.O130.phases.length,0);
const html=read('index.html');for(const file of ['data/c7-religionshistorisk-betydelse.v8131.js','data/c7-dating-o127-o130.js','v8131-dating-bridge.js'])assert(html.includes(file));
assert(html.indexOf('v8131-dating-bridge.js')<html.indexOf('v839-temaspar-context.js'));
console.log('PASS C7 37 identity/research/dating');
