import assert from 'node:assert/strict';import fs from 'node:fs';import vm from 'node:vm';
const read=p=>fs.readFileSync(p,'utf8'),ctx={window:{}};vm.createContext(ctx);
vm.runInContext(read('data/c7-dating-o100-isaac-jacob.js'),ctx);vm.runInContext(read('v8175-dating-bridge.js'),ctx);
const x=ctx.window.TIDENS_C7_DATING_PILOT.O100;assert(x&&x.phases.length===0);assert.equal(x.evidence,'B');
for(const term of ['Isak','Jakob','Finkelstein','Römer','Na\'aman','Schmid','700-talet','500-talet','ingen separat'])assert(x.undated.toLowerCase().includes(term.toLowerCase()));
const html=read('index.html');assert(html.indexOf('data/c7-dating-o100-isaac-jacob.js')<html.indexOf('v8175-dating-bridge.js'));assert(html.indexOf('v8175-dating-bridge.js')<html.indexOf('v839-temaspar-context.js'));
assert(read('data/o099-o102-identity.v8122.js').includes("O100:{name:'Isak och Jakob'"));
console.log('PASS O100 Isak Jakob historical-critical dating uncertainty');
