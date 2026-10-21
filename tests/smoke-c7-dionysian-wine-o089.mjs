import assert from 'node:assert/strict';import fs from 'node:fs';import vm from 'node:vm';
const read=p=>fs.readFileSync(p,'utf8'),ctx={window:{}};vm.createContext(ctx);
vm.runInContext(read('data/c7-dating-o089-dionysian-wine.js'),ctx);vm.runInContext(read('v8164-dating-bridge.js'),ctx);
const x=ctx.window.TIDENS_C7_DATING_PILOT.O089;assert(x&&x.phases.length===1);
const p=x.phases[0];assert.equal(p.timeType,'text-composition');assert.equal(p.start,-408);assert.equal(p.end,-405);assert.equal(p.evidence,'A');assert(p.sources.length>=2);
for(const term of ['inte stöd','O084','inte automatiskt','kristna nattvarden'])assert(x.undated.includes(term));
assert(p.reason.includes('inte där vinet uttryckligen som Dionysos blod'));
const html=read('index.html');assert(html.indexOf('data/c7-dating-o089-dionysian-wine.js')<html.indexOf('v8164-dating-bridge.js'));assert(html.indexOf('v8164-dating-bridge.js')<html.indexOf('v839-temaspar-context.js'));
console.log('PASS O089 Bacchae wine witness separated from claimed Eucharistic blood identity');