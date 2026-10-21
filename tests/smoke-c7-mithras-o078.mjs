import assert from 'node:assert/strict';import fs from 'node:fs';import vm from 'node:vm';
const read=p=>fs.readFileSync(p,'utf8'),ctx={window:{}};vm.createContext(ctx);
vm.runInContext(read('data/c7-dating-o078-mithras.js'),ctx);vm.runInContext(read('v8153-dating-bridge.js'),ctx);
const x=ctx.window.TIDENS_C7_DATING_PILOT.O078;assert(x&&x.phases.length===2);
const [early,later]=x.phases;assert.equal(early.start,75);assert.equal(early.end,125);assert.equal(later.start,150);assert.equal(later.end,350);
for(const p of x.phases){assert.equal(p.timeType,'historical-event');assert.equal(p.evidence,'B');assert(p.sources.length>=2);assert(p.reason.length>100);}
assert(x.undated.includes('tre dagar'));assert(x.undated.includes('25 december'));assert(x.undated.includes('iranska'));
const html=read('index.html');assert(html.indexOf('data/c7-dating-o078-mithras.js')<html.indexOf('v8153-dating-bridge.js'));assert(html.indexOf('v8153-dating-bridge.js')<html.indexOf('v839-temaspar-context.js'));
console.log('PASS O078 Roman Mithras evidence and false parallel guardrails');