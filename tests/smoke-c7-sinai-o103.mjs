import assert from 'node:assert/strict';import fs from 'node:fs';import vm from 'node:vm';
const read=p=>fs.readFileSync(p,'utf8'),ctx={window:{}};vm.createContext(ctx);vm.runInContext(read('data/c7-dating-o103-sinai-law.js'),ctx);vm.runInContext(read('v8178-dating-bridge.js'),ctx);
const x=ctx.window.TIDENS_C7_DATING_PILOT.O103;assert(x&&x.phases.length===0);assert.equal(x.evidence,'B');assert.equal(x.sources.length,3);
for(const term of ['Joosten','Wildenboer','Schmid','förbundsboken','ingen självständig säker tidsmarkör'])assert(x.undated.includes(term));
const html=read('index.html');const a=html.indexOf('data/c7-dating-o103-sinai-law.js'),b=html.indexOf('v8178-dating-bridge.js'),c=html.indexOf('v839-temaspar-context.js');assert(a>=0&&a<b&&b<c);
assert(read('data/o103-o106-identity.v8123.js').includes('O103'));console.log('PASS C7 O103 Sinai source-dating boundary');
