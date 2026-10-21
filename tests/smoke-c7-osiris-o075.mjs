import assert from 'node:assert/strict';import fs from 'node:fs';import vm from 'node:vm';
const read=p=>fs.readFileSync(p,'utf8'),ctx={window:{}};vm.createContext(ctx);
vm.runInContext(read('data/c7-dating-o075-osiris.js'),ctx);vm.runInContext(read('v8151-dating-bridge.js'),ctx);
const x=ctx.window.TIDENS_C7_DATING_PILOT.O075;assert(x&&x.phases.length===1);
const p=x.phases[0];assert.equal(p.timeType,'material-witness');assert.equal(p.start,-2375);assert.equal(p.end,-2345);assert.equal(p.evidence,'B');assert(p.sources.length>=3);
assert(x.undated.includes('Plutarchos'));assert(x.undated.includes('Ingen historisk datering'));
const html=read('index.html');assert(html.indexOf('data/c7-dating-o075-osiris.js')<html.indexOf('v8151-dating-bridge.js'));assert(html.indexOf('v8151-dating-bridge.js')<html.indexOf('v839-temaspar-context.js'));
console.log('PASS C7 Osiris O075 text witness vs mythical death and resurrection');