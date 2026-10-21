import assert from 'node:assert/strict';import fs from 'node:fs';import vm from 'node:vm';
const read=p=>fs.readFileSync(p,'utf8'),ctx={window:{}};vm.createContext(ctx);
vm.runInContext(read('data/c7-dating-o085-dionysos-twelve.js'),ctx);vm.runInContext(read('v8160-dating-bridge.js'),ctx);
const x=ctx.window.TIDENS_C7_DATING_PILOT.O085;assert(x);assert.equal(x.evidence,'C');assert.equal(x.phases.length,0);
for(const term of ['inga här verifierade antika primärkällor','exakt tolv','O084','utan tidsmarkör','apostlarna'])assert(x.undated.includes(term));
assert(x.sources.length>=2);
const html=read('index.html');assert(html.indexOf('data/c7-dating-o085-dionysos-twelve.js')<html.indexOf('v8160-dating-bridge.js'));assert(html.indexOf('v8160-dating-bridge.js')<html.indexOf('v839-temaspar-context.js'));
console.log('PASS C7 O085 undated twelve followers claim without fabricated historical date');