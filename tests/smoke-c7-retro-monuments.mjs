import assert from 'node:assert/strict';
import fs from 'node:fs';import vm from 'node:vm';
const read=p=>fs.readFileSync(p,'utf8'),ctx={window:{}};vm.createContext(ctx);
vm.runInContext(read('data/c7-dating-retro-monuments-o055-o058-o059.js'),ctx);
vm.runInContext(read('v8135-dating-bridge.js'),ctx);
const d=ctx.window.TIDENS_C7_DATING_PILOT;
const expected={O055:[-2580,-2550],O058:[72,80],O059:[532,537]};
assert.deepEqual(Object.keys(d).sort(),Object.keys(expected).sort());
for(const [id,[start,end]] of Object.entries(expected)){
 const x=d[id];assert(x.title&&x.undated&&x.phases.length===1,id);
 const p=x.phases[0];assert.equal(p.start,start);assert.equal(p.end,end);
 assert.equal(p.timeType,'historical-event');assert(['A','B'].includes(p.evidence));
 assert(p.typeLabel&&p.reason.length>40&&p.sources.length>=2);
 assert(p.sources.every(s=>s.url.startsWith('https://')));
}
const html=read('index.html');
assert(html.indexOf('data/c7-dating-retro-monuments-o055-o058-o059.js')<html.indexOf('v8135-dating-bridge.js'));
assert(html.indexOf('v8135-dating-bridge.js')<html.indexOf('v839-temaspar-context.js'));
console.log('PASS C7 retrospective monument phases O055 O058 O059');