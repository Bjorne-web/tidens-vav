import assert from 'node:assert/strict';import fs from 'node:fs';import vm from 'node:vm';
const read=p=>fs.readFileSync(p,'utf8');const ctx={window:{}};vm.createContext(ctx);
vm.runInContext(read('data/c7-dating-retro-colossus-o056.js'),ctx);vm.runInContext(read('v8142-dating-bridge.js'),ctx);
const p=ctx.window.TIDENS_C7_DATING_PILOT.O056;assert(p&&p.phases.length===2);
assert(p.undated.includes('hamninloppet'));
assert.equal(p.phases[0].start,-295);assert.equal(p.phases[0].end,-280);
assert.equal(p.phases[1].start,-228);assert.equal(p.phases[1].end,-226);
for(const phase of p.phases){assert.equal(phase.evidence,'B');assert.equal(phase.timeType,'historical-event');assert(phase.reason.length>=150);assert(phase.sources.length>=2);}
const html=read('index.html');assert(html.indexOf('data/c7-dating-retro-colossus-o056.js')<html.indexOf('v8142-dating-bridge.js'));assert(html.indexOf('v8142-dating-bridge.js')<html.indexOf('v839-temaspar-context.js'));
console.log('PASS C7 O056 Colossus alternative scholarship and dates');