import assert from 'node:assert/strict';import fs from 'node:fs';import vm from 'node:vm';
const read=p=>fs.readFileSync(p,'utf8'),ctx={window:{}};vm.createContext(ctx);vm.runInContext(read('data/c7-dating-o102-exodus-moses.js'),ctx);vm.runInContext(read('v8177-dating-bridge.js'),ctx);
const x=ctx.window.TIDENS_C7_DATING_PILOT.O102;assert(x&&x.phases.length===0);assert.equal(x.evidence,'B');assert.equal(x.sources.length,4);
for(const term of ['Merneptahstelen','Hoffmeier','Schmid','första årtusendet','ingen självständig säker tidsmarkör'])assert(x.undated.includes(term));
const html=read('index.html');const a=html.indexOf('data/c7-dating-o102-exodus-moses.js'),b=html.indexOf('v8177-dating-bridge.js'),c=html.indexOf('v839-temaspar-context.js');assert(a>=0&&a<b&&b<c);
assert(read('data/o099-o102-identity.v8122.js').includes("O102:{name:'Uttåget ur Egypten (Mose)'"));
console.log('PASS O102 Exodus historical-critical dating boundary');
