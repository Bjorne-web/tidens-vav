import assert from 'node:assert/strict';import fs from 'node:fs';import vm from 'node:vm';
const read=p=>fs.readFileSync(p,'utf8'),ctx={window:{}};vm.createContext(ctx);
vm.runInContext(read('data/c7-dating-o086-herakles-labours.js'),ctx);vm.runInContext(read('v8161-dating-bridge.js'),ctx);
const x=ctx.window.TIDENS_C7_DATING_PILOT.O086;assert(x&&x.phases.length===1);const p=x.phases[0];
assert.equal(p.timeType,'material-witness');assert.equal(p.start,-470);assert.equal(p.end,-456);assert.equal(p.evidence,'A');assert(p.sources.length>=3);
for(const term of ['Pausanias','O082','ingen historiskt daterbar','tolv apostlar'])assert(x.undated.includes(term));
const html=read('index.html');assert(html.indexOf('data/c7-dating-o086-herakles-labours.js')<html.indexOf('v8161-dating-bridge.js'));assert(html.indexOf('v8161-dating-bridge.js')<html.indexOf('v839-temaspar-context.js'));
console.log('PASS O086 archaeology of twelve metopes versus undatable mythic deeds');