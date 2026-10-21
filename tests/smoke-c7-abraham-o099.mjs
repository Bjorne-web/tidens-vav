import assert from 'node:assert/strict';import fs from 'node:fs';import vm from 'node:vm';
const read=p=>fs.readFileSync(p,'utf8'),ctx={window:{}};vm.createContext(ctx);
vm.runInContext(read('data/c7-dating-o099-abraham.js'),ctx);vm.runInContext(read('v8174-dating-bridge.js'),ctx);
const x=ctx.window.TIDENS_C7_DATING_PILOT.O099;assert(x&&x.phases.length===0);assert.equal(x.evidence,'B');
for(const term of ['Första Moseboken 12–25','Babylonisk exil','arkeologiskt','600–500 f.Kr.','Romarbrevet 4','ingen självständig tidsmarkör'])assert(x.undated.includes(term));
const html=read('index.html');assert(html.indexOf('data/c7-dating-o099-abraham.js')<html.indexOf('v8174-dating-bridge.js'));assert(html.indexOf('v8174-dating-bridge.js')<html.indexOf('v839-temaspar-context.js'));
assert(read('data/o099-o102-identity.v8122.js').includes("O099:{name:'Abraham'"));
console.log('PASS O099 canonical Abraham identity and honest chronology limits');