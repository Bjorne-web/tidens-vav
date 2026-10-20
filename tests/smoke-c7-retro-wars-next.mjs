import assert from 'node:assert/strict';
import fs from 'node:fs';import vm from 'node:vm';
const read=p=>fs.readFileSync(p,'utf8');const ctx={window:{}};vm.createContext(ctx);
vm.runInContext(read('data/c7-dating-retro-wars-o049-o052-o054.js'),ctx);
vm.runInContext(read('v8134-dating-bridge.js'),ctx);
const d=ctx.window.TIDENS_C7_DATING_PILOT;
assert.deepEqual(Object.keys(d).sort(),['O049','O052','O053','O054']);
assert.deepEqual(Array.from(d.O049.phases,x=>x.start),[-264,-218,-149]);
assert.deepEqual(Array.from(d.O049.phases,x=>x.end),[-241,-201,-146]);
assert.equal(d.O052.phases[0].start,1861);assert.equal(d.O053.phases[0].end,1918);assert.equal(d.O054.phases[0].end,1945);
for(const [id,v] of Object.entries(d)){
 assert(v.undated&&v.phases.length,id);
 for(const p of v.phases){
 assert(p.timeType==='historical-event');assert(p.evidence==='A');assert(p.start<=p.end);assert(p.sources.length>=2);
 assert(p.reason.length>40&&p.typeLabel.length>10);
 }
}
const html=read('index.html');assert(html.indexOf('data/c7-dating-retro-wars-o049-o052-o054.js')<html.indexOf('v8134-dating-bridge.js'));assert(html.indexOf('v8134-dating-bridge.js')<html.indexOf('v839-temaspar-context.js'));
console.log('PASS C7 retro war periods O049 O052 O053 O054');