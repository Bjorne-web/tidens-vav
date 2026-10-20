import assert from 'node:assert/strict';import fs from 'node:fs';import vm from 'node:vm';
const read=p=>fs.readFileSync(p,'utf8'),ctx={window:{}};vm.createContext(ctx);
vm.runInContext(read('data/c7-dating-o071-egyptian-creation.js'),ctx);
vm.runInContext(read('v8147-dating-bridge.js'),ctx);
const x=ctx.window.TIDENS_C7_DATING_PILOT.O071;assert(x&&x.phases.length===2);
assert.equal(x.phases[0].timeType,'material-witness');assert.equal(x.phases[0].start,-2375);assert.equal(x.phases[0].end,-2345);assert.equal(x.phases[0].evidence,'B');
assert.equal(x.phases[1].timeType,'material-witness');assert.equal(x.phases[1].start,-710);assert.equal(x.phases[1].end,-710);assert.equal(x.phases[1].evidence,'A');
for(const p of x.phases){assert(p.sources.length>=2);assert(p.reason.length>100);}
assert(x.undated.includes('paraplypost'));assert(x.undated.includes('inte en verifierbart daterad historisk händelse'));
const html=read('index.html');assert(html.indexOf('data/c7-dating-o071-egyptian-creation.js')<html.indexOf('v8147-dating-bridge.js'));assert(html.indexOf('v8147-dating-bridge.js')<html.indexOf('v839-temaspar-context.js'));
console.log('PASS O071 witness separation and uncertain origins');