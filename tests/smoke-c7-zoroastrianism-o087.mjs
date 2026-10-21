import assert from 'node:assert/strict';import fs from 'node:fs';import vm from 'node:vm';
const read=p=>fs.readFileSync(p,'utf8'),ctx={window:{}};vm.createContext(ctx);
vm.runInContext(read('data/c7-dating-o087-zoroastrianism.js'),ctx);vm.runInContext(read('v8162-dating-bridge.js'),ctx);
const x=ctx.window.TIDENS_C7_DATING_PILOT.O087;assert(x&&x.phases.length===1);const p=x.phases[0];
assert.equal(p.timeType,'material-witness');assert.equal(p.start,1323);assert.equal(p.end,1323);assert.equal(p.evidence,'A');assert(p.sources.length>=2);
for(const term of ['omdebatterade','pahlavitexter','frašō.kərəti','direkt påverkan'])assert(x.undated.includes(term));
const html=read('index.html');assert(html.indexOf('data/c7-dating-o087-zoroastrianism.js')<html.indexOf('v8162-dating-bridge.js'));assert(html.indexOf('v8162-dating-bridge.js')<html.indexOf('v839-temaspar-context.js'));
console.log('PASS C7 O087 Yasna K5 witness and disputed eschatology chronology');