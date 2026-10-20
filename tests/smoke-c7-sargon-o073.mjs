import assert from 'node:assert/strict';import fs from 'node:fs';import vm from 'node:vm';
const read=p=>fs.readFileSync(p,'utf8'),ctx={window:{}};vm.createContext(ctx);
vm.runInContext(read('data/c7-dating-o073-sargon-birth.js'),ctx);vm.runInContext(read('v8149-dating-bridge.js'),ctx);
const x=ctx.window.TIDENS_C7_DATING_PILOT.O073;assert(x&&x.phases.length===1);
const p=x.phases[0];assert.equal(p.timeType,'material-witness');assert.equal(p.start,-700);assert.equal(p.end,-601);assert.equal(p.evidence,'B');assert(p.sources.length>=3);
assert(x.undated.includes('direkt kopierade'));assert(x.undated.includes('Sargons egen livstid'));
const html=read('index.html');assert(html.indexOf('data/c7-dating-o073-sargon-birth.js')<html.indexOf('v8149-dating-bridge.js'));assert(html.indexOf('v8149-dating-bridge.js')<html.indexOf('v839-temaspar-context.js'));
console.log('PASS C7 O073 Neo-Assyrian birth legend witness not birth chronology');