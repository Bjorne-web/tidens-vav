import assert from 'node:assert/strict';import fs from 'node:fs';import vm from 'node:vm';
const read=p=>fs.readFileSync(p,'utf8'),ctx={window:{}};vm.createContext(ctx);
vm.runInContext(read('data/c7-dating-o093-babel-ziggurat.js'),ctx);vm.runInContext(read('v8168-dating-bridge.js'),ctx);
const x=ctx.window.TIDENS_C7_DATING_PILOT.O093;assert(x&&x.phases.length===2);
const [a,b]=x.phases;assert.equal(a.timeType,'material-witness');assert.equal(a.start,-604);assert.equal(a.end,-562);assert.equal(a.evidence,'A');
assert.equal(b.timeType,'material-witness');assert.equal(b.start,-229);assert.equal(b.end,-229);assert.equal(b.evidence,'A');
for(const term of ['Första Moseboken 11','språken','kompositions','första zigguraten','Esagil-tavlan'])assert(x.undated.includes(term));
const html=read('index.html');assert(html.indexOf('data/c7-dating-o093-babel-ziggurat.js')<html.indexOf('v8168-dating-bridge.js'));assert(html.indexOf('v8168-dating-bridge.js')<html.indexOf('v839-temaspar-context.js'));
console.log('PASS O093 Etemenanki witnesses distinct from Genesis Babel account');