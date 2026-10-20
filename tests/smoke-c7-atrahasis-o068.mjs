import assert from 'node:assert/strict';import fs from 'node:fs';import vm from 'node:vm';
const read=p=>fs.readFileSync(p,'utf8'),ctx={window:{}};vm.createContext(ctx);
vm.runInContext(read('data/c7-dating-o068-atrahasis.js'),ctx);vm.runInContext(read('v8144-dating-bridge.js'),ctx);
const x=ctx.window.TIDENS_C7_DATING_PILOT.O068;assert(x&&x.phases.length===1);
const p=x.phases[0];assert.equal(p.timeType,'material-witness');assert.equal(p.start,-2000);assert.equal(p.end,-1600);assert.equal(p.evidence,'A');assert(p.sources.length>=2);
assert(x.undated.includes('inte dateras som en verifierad historisk händelse'));assert(x.sources.length>=3);
const html=read('index.html');assert(html.indexOf('data/c7-dating-o068-atrahasis.js')<html.indexOf('v8144-dating-bridge.js'));assert(html.indexOf('v8144-dating-bridge.js')<html.indexOf('v839-temaspar-context.js'));
console.log('PASS O068 Atrahasis material artifact vs mythical narrative');