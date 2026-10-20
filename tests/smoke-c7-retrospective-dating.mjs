import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
const read=p=>fs.readFileSync(p,'utf8');
const ctx={window:{}};vm.createContext(ctx);
vm.runInContext(read('data/c7-dating-retrospective-o112-o115-o117.js'),ctx);
vm.runInContext(read('v8132-dating-bridge.js'),ctx);
const d=ctx.window.TIDENS_C7_DATING_PILOT;
assert.deepEqual(Object.keys(d).sort(),['O112','O115','O117']);
for(const [id,x] of Object.entries(d)){
 assert(x.undated&&x.phases.length,id+' notes');
 for(const p of x.phases){
  assert.equal(p.timeType,'historical-event');
  assert(['A','B'].includes(p.evidence));
  assert(Number.isFinite(p.start)&&Number.isFinite(p.end)&&p.start<=p.end);
  assert(p.sources.length>=2);
  assert(p.typeLabel&&p.reason);
 }
}
assert.equal(d.O112.phases[0].start,-722);
assert.equal(d.O115.phases[0].start,-597);
assert.equal(d.O117.phases[0].start,-539);
const html=read('index.html');
assert(html.indexOf('v8132-dating-bridge.js')<html.indexOf('v839-temaspar-context.js'));
assert(html.indexOf('data/c7-dating-retrospective-o112-o115-o117.js')<html.indexOf('v8132-dating-bridge.js'));
console.log('PASS C7 retrospective typed date anchors');