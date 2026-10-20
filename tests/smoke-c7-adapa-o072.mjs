import assert from 'node:assert/strict';import fs from 'node:fs';import vm from 'node:vm';
const read=p=>fs.readFileSync(p,'utf8'),ctx={window:{}};vm.createContext(ctx);
vm.runInContext(read('data/c7-dating-o072-adapa.js'),ctx);vm.runInContext(read('v8148-dating-bridge.js'),ctx);
const x=ctx.window.TIDENS_C7_DATING_PILOT.O072;assert(x&&x.phases.length===2);
assert.equal(x.phases[0].start,-1400);assert.equal(x.phases[0].end,-1301);assert.equal(x.phases[0].evidence,'A');
assert.equal(x.phases[1].start,-700);assert.equal(x.phases[1].end,-601);assert.equal(x.phases[1].evidence,'B');
for(const p of x.phases){assert.equal(p.timeType,'material-witness');assert(p.sources.length>=2);assert(p.reason.length>100);}
assert(x.undated.includes('inte historiskt daterade'));assert(x.undated.includes('direkt kopiering'));
const html=read('index.html');assert(html.indexOf('data/c7-dating-o072-adapa.js')<html.indexOf('v8148-dating-bridge.js'));assert(html.indexOf('v8148-dating-bridge.js')<html.indexOf('v839-temaspar-context.js'));
console.log('PASS O072 Adapa separated witness chronology and text revisions');