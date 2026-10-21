import assert from 'node:assert/strict';import fs from 'node:fs';import vm from 'node:vm';
const read=p=>fs.readFileSync(p,'utf8'),ctx={window:{}};vm.createContext(ctx);
vm.runInContext(read('data/c7-dating-o094-samson-herakles.js'),ctx);vm.runInContext(read('v8169-dating-bridge.js'),ctx);
const x=ctx.window.TIDENS_C7_DATING_PILOT.O094;assert(x&&x.phases.length===2);
const [a,b]=x.phases;assert.equal(a.timeType,'text-composition');assert.equal(a.start,-700);assert.equal(a.end,-400);assert.equal(a.evidence,'B');
assert.equal(b.timeType,'text-composition');assert.equal(b.start,-750);assert.equal(b.end,-650);assert.equal(b.evidence,'B');
for(const term of ['Domarboken 13–16','O082','O086','ingen säker direkt litterär påverkan','filisteernas'])assert(x.undated.includes(term));
const html=read('index.html');assert(html.indexOf('data/c7-dating-o094-samson-herakles.js')<html.indexOf('v8169-dating-bridge.js'));assert(html.indexOf('v8169-dating-bridge.js')<html.indexOf('v839-temaspar-context.js'));
console.log('PASS O094 Samson and Herakles distinct literary source datings');