import assert from 'node:assert/strict';import fs from 'node:fs';import vm from 'node:vm';
const read=p=>fs.readFileSync(p,'utf8'),ctx={window:{}};vm.createContext(ctx);
vm.runInContext(read('data/c7-dating-o092-apkallu-oannes.js'),ctx);vm.runInContext(read('v8167-dating-bridge.js'),ctx);
const x=ctx.window.TIDENS_C7_DATING_PILOT.O092;assert(x&&x.phases.length===1);const p=x.phases[0];
assert.equal(p.timeType,'material-witness');assert.equal(p.start,-800);assert.equal(p.end,-600);assert.equal(p.evidence,'A');assert(p.sources.length>=2);
for(const term of ['Ninurta','Berossos','Jona','inte en och samma gestalt','inte direkt litterärt beroende'])assert(x.undated.includes(term));
const html=read('index.html');assert(html.indexOf('data/c7-dating-o092-apkallu-oannes.js')<html.indexOf('v8167-dating-bridge.js'));assert(html.indexOf('v8167-dating-bridge.js')<html.indexOf('v839-temaspar-context.js'));console.log('PASS O092 distinguish Oannes Ninurta apkallu and Jonah source attestations');