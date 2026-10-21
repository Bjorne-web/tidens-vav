import assert from 'node:assert/strict';import fs from 'node:fs';import vm from 'node:vm';
const read=p=>fs.readFileSync(p,'utf8'),ctx={window:{}};vm.createContext(ctx);
vm.runInContext(read('data/c7-dating-o083-perseus.js'),ctx);vm.runInContext(read('v8158-dating-bridge.js'),ctx);
const x=ctx.window.TIDENS_C7_DATING_PILOT.O083;assert(x&&x.phases.length===1);const p=x.phases[0];
assert.equal(p.timeType,'text-composition');assert.equal(p.start,-500);assert.equal(p.end,-475);assert.equal(p.evidence,'B');assert(p.sources.length>=2);
assert(x.undated.includes('Proitos'));assert(x.undated.includes('direkt kopiering'));assert(x.undated.includes('jungfrufödelse'));
const html=read('index.html');assert(html.indexOf('data/c7-dating-o083-perseus.js')<html.indexOf('v8158-dating-bridge.js'));assert(html.indexOf('v8158-dating-bridge.js')<html.indexOf('v839-temaspar-context.js'));
console.log('PASS O083 Pindar text date and Danae source distinctions');