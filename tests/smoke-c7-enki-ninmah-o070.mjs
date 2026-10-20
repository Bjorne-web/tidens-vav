import assert from 'node:assert/strict';import fs from 'node:fs';import vm from 'node:vm';
const read=p=>fs.readFileSync(p,'utf8'),ctx={window:{}};vm.createContext(ctx);
vm.runInContext(read('data/c7-dating-o070-enki-ninmah.js'),ctx);vm.runInContext(read('v8146-dating-bridge.js'),ctx);
const x=ctx.window.TIDENS_C7_DATING_PILOT.O070;assert(x&&x.phases.length===1);
const p=x.phases[0];assert.equal(p.timeType,'material-witness');assert.equal(p.start,-1900);assert.equal(p.end,-1600);assert.equal(p.evidence,'A');assert(p.sources.length>=2);
assert(x.undated.includes('bred motivkategori'));assert(x.undated.includes('ingen historiskt daterbar tidpunkt'));
const html=read('index.html');assert(html.indexOf('data/c7-dating-o070-enki-ninmah.js')<html.indexOf('v8146-dating-bridge.js'));assert(html.indexOf('v8146-dating-bridge.js')<html.indexOf('v839-temaspar-context.js'));
console.log('PASS C7 O070 clay-creation story vs physical Old Babylonian witness');