import assert from 'node:assert/strict';import fs from 'node:fs';import vm from 'node:vm';
const read=p=>fs.readFileSync(p,'utf8'),ctx={window:{}};vm.createContext(ctx);
vm.runInContext(read('data/c7-dating-o082-herakles.js'),ctx);vm.runInContext(read('v8157-dating-bridge.js'),ctx);
const x=ctx.window.TIDENS_C7_DATING_PILOT.O082;assert(x&&x.phases.length===1);
const p=x.phases[0];assert.equal(p.timeType,'text-composition');assert.equal(p.start,-750);assert.equal(p.end,-650);assert.equal(p.evidence,'B');assert(p.sources.length>=3);
assert(x.undated.includes('O086'));assert(x.undated.includes('inte historiskt daterbara'));
const html=read('index.html');assert(html.indexOf('data/c7-dating-o082-herakles.js')<html.indexOf('v8157-dating-bridge.js'));assert(html.indexOf('v8157-dating-bridge.js')<html.indexOf('v839-temaspar-context.js'));
console.log('PASS C7 O082 Hesiodic composition vs Herakles myth and modern savior analogy');