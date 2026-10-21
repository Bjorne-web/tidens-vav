import assert from 'node:assert/strict';import fs from 'node:fs';import vm from 'node:vm';
const read=p=>fs.readFileSync(p,'utf8'),ctx={window:{}};vm.createContext(ctx);
vm.runInContext(read('data/c7-dating-o101-joseph-egypt.js'),ctx);vm.runInContext(read('v8176-dating-bridge.js'),ctx);
const x=ctx.window.TIDENS_C7_DATING_PILOT.O101;assert(x&&x.phases.length===0);assert.equal(x.evidence,'B');
for(const term of ['Första Moseboken 37–50','Schipper','Rezetko','Shupak','persisk tid','muntlig tradition','ingen egen historiskt säker tidsmarkör'])assert(x.undated.includes(term));
assert.equal(x.sources.length,3);
const html=read('index.html');const a=html.indexOf('data/c7-dating-o101-joseph-egypt.js'),b=html.indexOf('v8176-dating-bridge.js'),c=html.indexOf('v839-temaspar-context.js');assert(a>0&&a<b&&b<c);
assert(read('data/o099-o102-identity.v8122.js').includes("O101:{name:'Josef i Egypten'"));
console.log('PASS C7 O101 Joseph historical critical source uncertainty');
