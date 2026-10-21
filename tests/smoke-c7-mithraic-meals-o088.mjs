import assert from 'node:assert/strict';import fs from 'node:fs';import vm from 'node:vm';
const read=p=>fs.readFileSync(p,'utf8'),ctx={window:{}};vm.createContext(ctx);
vm.runInContext(read('data/c7-dating-o088-mithraic-meals.js'),ctx);vm.runInContext(read('v8163-dating-bridge.js'),ctx);
const x=ctx.window.TIDENS_C7_DATING_PILOT.O088;assert(x&&x.phases.length===1);const p=x.phases[0];
assert.equal(p.timeType,'material-witness');assert.equal(p.start,190);assert.equal(p.end,202);assert.equal(p.evidence,'B');assert(p.sources.length>=3);
for(const term of ['Santa Prisca','eldoffer','nattvarden','O078','direkt lånades'])assert(x.undated.includes(term));
const html=read('index.html');assert(html.indexOf('data/c7-dating-o088-mithraic-meals.js')<html.indexOf('v8163-dating-bridge.js'));assert(html.indexOf('v8163-dating-bridge.js')<html.indexOf('v839-temaspar-context.js'));
console.log('PASS O088 Santa Prisca meal witness, archaeology, and independent Eucharist history');