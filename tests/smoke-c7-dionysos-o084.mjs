import assert from 'node:assert/strict';import fs from 'node:fs';import vm from 'node:vm';
const read=p=>fs.readFileSync(p,'utf8'),ctx={window:{}};vm.createContext(ctx);
vm.runInContext(read('data/c7-dating-o084-dionysos.js'),ctx);vm.runInContext(read('v8159-dating-bridge.js'),ctx);
const x=ctx.window.TIDENS_C7_DATING_PILOT.O084;assert(x&&x.phases.length===1);const p=x.phases[0];
assert.equal(p.timeType,'text-composition');assert.equal(p.start,-408);assert.equal(p.end,-405);assert.equal(p.evidence,'A');assert(p.sources.length>=2);
for(const term of ['tolv fasta lärjungar','O085','O089','direkt kopiering'])assert(x.undated.includes(term));
const html=read('index.html');assert(html.indexOf('data/c7-dating-o084-dionysos.js')<html.indexOf('v8159-dating-bridge.js'));assert(html.indexOf('v8159-dating-bridge.js')<html.indexOf('v839-temaspar-context.js'));
console.log('PASS C7 O084 literary Bacchae date and discrete motifs');