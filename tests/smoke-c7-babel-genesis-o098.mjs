import assert from 'node:assert/strict';import fs from 'node:fs';import vm from 'node:vm';
const read=p=>fs.readFileSync(p,'utf8'),ctx={window:{}};vm.createContext(ctx);
vm.runInContext(read('data/c7-dating-o098-babel-genesis.js'),ctx);vm.runInContext(read('v8173-dating-bridge.js'),ctx);
const x=ctx.window.TIDENS_C7_DATING_PILOT.O098;assert(x&&x.phases.length===0);assert.equal(x.evidence,'B');
for(const term of ['kanoniska ID-korrigeringen','Första Moseboken 11:1–9','600–500 f.Kr.','O093','Apostlagärningarna 2','ingen källsäker separat tidsmarkör'])assert(x.undated.includes(term));
const html=read('index.html');assert(html.indexOf('data/c7-dating-o098-babel-genesis.js')<html.indexOf('v8173-dating-bridge.js'));assert(html.indexOf('v8173-dating-bridge.js')<html.indexOf('v839-temaspar-context.js'));
assert(read('data/o095-o098-identity-fix.v8121.js').includes("O098:{title:'Babels torn'"));
console.log('PASS O098 Genesis 11 Babel distinct from O093 Etemenanki witness');