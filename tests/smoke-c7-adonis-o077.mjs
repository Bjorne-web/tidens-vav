import assert from 'node:assert/strict';import fs from 'node:fs';import vm from 'node:vm';
const read=p=>fs.readFileSync(p,'utf8'),ctx={window:{}};vm.createContext(ctx);
vm.runInContext(read('data/c7-dating-o077-adonis.js'),ctx);vm.runInContext(read('v8152-dating-bridge.js'),ctx);
const x=ctx.window.TIDENS_C7_DATING_PILOT.O077;assert(x&&x.phases.length===1);
const p=x.phases[0];assert.equal(p.timeType,'text-composition');assert.equal(p.start,-300);assert.equal(p.end,-201);assert.equal(p.evidence,'B');assert(p.sources.length>=3);
assert(x.undated.includes('inte utan vidare likställas'));assert(x.undated.includes('Ovidius'));
const html=read('index.html');assert(html.indexOf('data/c7-dating-o077-adonis.js')<html.indexOf('v8152-dating-bridge.js'));assert(html.indexOf('v8152-dating-bridge.js')<html.indexOf('v839-temaspar-context.js'));
console.log('PASS O077 Adonis Theocritus composition vs myth and cult origins');