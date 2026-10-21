import assert from 'node:assert/strict';import fs from 'node:fs';import vm from 'node:vm';
const read=p=>fs.readFileSync(p,'utf8'),ctx={window:{}};vm.createContext(ctx);
vm.runInContext(read('data/c7-dating-o096-eden.js'),ctx);vm.runInContext(read('v8171-dating-bridge.js'),ctx);
const x=ctx.window.TIDENS_C7_DATING_PILOT.O096;assert(x&&x.phases.length===0);assert.equal(x.evidence,'B');
for(const term of ['kanoniska ID-korrigeringen','Första Moseboken 2:4–3:24','Romarbrevet 5','ingen separat tidsmarkör','senare teologisk','600–500 f.Kr.'])assert(x.undated.includes(term));
const html=read('index.html');assert(html.indexOf('data/c7-dating-o096-eden.js')<html.indexOf('v8171-dating-bridge.js'));assert(html.indexOf('v8171-dating-bridge.js')<html.indexOf('v839-temaspar-context.js'));assert(read('data/o095-o098-identity-fix.v8121.js').includes("O096:{title:'Syndafallet'"));
console.log('PASS O096 Eden original canonical identity and reception without false dates');