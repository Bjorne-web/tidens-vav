import assert from 'node:assert/strict';import fs from 'node:fs';import vm from 'node:vm';
const read=p=>fs.readFileSync(p,'utf8'),ctx={window:{}};vm.createContext(ctx);
vm.runInContext(read('data/c7-dating-o099-abraham.js'),ctx);vm.runInContext(read('v8174-dating-bridge.js'),ctx);
const x=ctx.window.TIDENS_C7_DATING_PILOT.O099;assert(x&&x.phases.length===0);assert.equal(x.evidence,'B');
for(const term of ['kanoniska identitet','Första Moseboken 12–25','600–500 f.Kr.','Na\'aman','Schmid','Hendel','ingen separat källsäker tidsmarkör'])assert(x.undated.includes(term));
const html=read('index.html');assert(html.indexOf('data/c7-dating-o099-abraham.js')<html.indexOf('v8174-dating-bridge.js'));assert(html.indexOf('v8174-dating-bridge.js')<html.indexOf('v839-temaspar-context.js'));
assert(read('data/o099-o102-identity.v8122.js').includes("O099:{name:'Abraham'"));
console.log('PASS O099 Abraham canonical identity and source-dating uncertainty');