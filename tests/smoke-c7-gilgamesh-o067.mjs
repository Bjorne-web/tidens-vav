import assert from 'node:assert/strict';import fs from 'node:fs';import vm from 'node:vm';
const read=p=>fs.readFileSync(p,'utf8'),ctx={window:{}};vm.createContext(ctx);
vm.runInContext(read('data/c7-dating-o067-gilgamesh.js'),ctx);vm.runInContext(read('v8143-dating-bridge.js'),ctx);
const x=ctx.window.TIDENS_C7_DATING_PILOT.O067;assert(x);assert.equal(x.phases.length,1);
const p=x.phases[0];assert.equal(p.timeType,'material-witness');assert.equal(p.start,-700);assert.equal(p.end,-601);assert.equal(p.evidence,'A');assert(p.sources.length>=2);
assert(x.undated.includes('ingen historiskt verifierad kalenderdatering'));assert(x.sources.length>=2);
const html=read('index.html');assert(html.indexOf('data/c7-dating-o067-gilgamesh.js')<html.indexOf('v8143-dating-bridge.js'));assert(html.indexOf('v8143-dating-bridge.js')<html.indexOf('v839-temaspar-context.js'));
console.log('PASS O067 manuscript witness vs composition and narrated time');