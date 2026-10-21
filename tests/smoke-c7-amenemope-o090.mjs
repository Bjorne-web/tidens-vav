import assert from 'node:assert/strict';import fs from 'node:fs';import vm from 'node:vm';
const read=p=>fs.readFileSync(p,'utf8'),ctx={window:{}};vm.createContext(ctx);
vm.runInContext(read('data/c7-dating-o090-amenemope.js'),ctx);vm.runInContext(read('v8165-dating-bridge.js'),ctx);
const x=ctx.window.TIDENS_C7_DATING_PILOT.O090;assert(x&&x.phases.length===1);const p=x.phases[0];
assert.equal(p.timeType,'material-witness');assert.equal(p.start,-700);assert.equal(p.end,-501);assert.equal(p.evidence,'B');assert(p.sources.length>=3);
for(const term of ['22:17–23:11','24:22','22:20','falskt exakt','trettio'])assert(x.undated.includes(term));
assert(p.reason.includes('Third Intermediate'));
const html=read('index.html');assert(html.indexOf('data/c7-dating-o090-amenemope.js')<html.indexOf('v8165-dating-bridge.js'));assert(html.indexOf('v8165-dating-bridge.js')<html.indexOf('v839-temaspar-context.js'));
console.log('PASS O090 Amenemope original papyrus, disputed date, and Proverbs source boundaries');