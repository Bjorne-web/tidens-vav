import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
const read=p=>fs.readFileSync(p,'utf8');
const ctx={window:{}};vm.createContext(ctx);
vm.runInContext(read('data/c7-dating-retro-wars-o048-o050-o051.js'),ctx);
vm.runInContext(read('v8133-dating-bridge.js'),ctx);
const data=ctx.window.TIDENS_C7_DATING_PILOT;
const expected={O048:[-431,-404],O050:[1337,1453],O051:[1618,1648]};
assert.deepEqual(Object.keys(data).sort(),Object.keys(expected).sort());
for(const [id,years] of Object.entries(expected)){
 const post=data[id];assert(post.title&&post.undated&&post.phases.length===1);
 const p=post.phases[0];assert.equal(p.start,years[0]);assert.equal(p.end,years[1]);assert.equal(p.timeType,'historical-event');assert.equal(p.evidence,'A');
 assert(p.reason.length>30&&p.typeLabel.length>10&&p.sources.length>=2);
 assert(p.sources.every(s=>s.url.startsWith('https://')));
}
const html=read('index.html');assert(html.includes('data/c7-dating-retro-wars-o048-o050-o051.js'));
assert(html.indexOf('v8133-dating-bridge.js')<html.indexOf('v839-temaspar-context.js'));
console.log('PASS C7 retrospective dates O048/O050/O051');
