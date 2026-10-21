import assert from 'node:assert/strict';import fs from 'node:fs';import vm from 'node:vm';
const read=p=>fs.readFileSync(p,'utf8'),ctx={window:{}};vm.createContext(ctx);
vm.runInContext(read('data/c7-dating-o080-treaties.js'),ctx);vm.runInContext(read('v8155-dating-bridge.js'),ctx);
const x=ctx.window.TIDENS_C7_DATING_PILOT.O080;assert(x&&x.phases.length===2);
for(const [i,year] of [[0,-1300],[1,-672]]){const p=x.phases[i];assert.equal(p.start,year);assert.equal(p.end,year);assert.equal(p.timeType,'material-witness');assert.equal(p.evidence,'A');assert(p.sources.length>=2);assert(p.reason.length>100);}
assert(x.undated.includes('inte en enda'));assert(x.undated.includes('Femte Moseboken'));
const html=read('index.html');assert(html.indexOf('data/c7-dating-o080-treaties.js')<html.indexOf('v8155-dating-bridge.js'));assert(html.indexOf('v8155-dating-bridge.js')<html.indexOf('v839-temaspar-context.js'));
console.log('PASS C7 O080 independent treaty witnesses and covenant boundaries');