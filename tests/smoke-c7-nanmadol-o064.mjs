import assert from 'node:assert/strict';
import fs from 'node:fs';import vm from 'node:vm';
const read=p=>fs.readFileSync(p,'utf8');const ctx={window:{}};vm.createContext(ctx);
vm.runInContext(read('data/c7-dating-retro-nanmadol-o064.js'),ctx);
vm.runInContext(read('v8140-dating-bridge.js'),ctx);
const post=ctx.window.TIDENS_C7_DATING_PILOT.O064;
assert(post&&post.undated.includes('evidensnivåer'));
assert.equal(post.phases.length,2);
for(const [i,start,end,grade] of [[0,1180,1200,'A'],[1,1200,1500,'B']]){
 const p=post.phases[i];assert.equal(p.start,start);assert.equal(p.end,end);assert.equal(p.evidence,grade);
 assert.equal(p.timeType,'historical-event');assert(p.sources.length>=2);assert(p.reason.length>100);
}
const html=read('index.html');assert(html.indexOf('data/c7-dating-retro-nanmadol-o064.js')<html.indexOf('v8140-dating-bridge.js'));assert(html.indexOf('v8140-dating-bridge.js')<html.indexOf('v839-temaspar-context.js'));
console.log('PASS C7 Nan Madol O064 dated phases');