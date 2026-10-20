import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
const read=p=>fs.readFileSync(p,'utf8'),ctx={window:{}};vm.createContext(ctx);
vm.runInContext(read('data/c7-dating-retro-monuments-o057-o060.js'),ctx);
vm.runInContext(read('v8136-dating-bridge.js'),ctx);
const d=ctx.window.TIDENS_C7_DATING_PILOT;
assert.equal(Object.keys(d).length,2);
const expected={O057:[[-220,-206],[1368,1644]],O060:[[1632,1648],[1648,1653]]};
for(const [id,periods] of Object.entries(expected)){
 const x=d[id];assert(x.title&&x.undated&&x.phases.length===2,id);
 x.phases.forEach((p,i)=>{assert.equal(p.start,periods[i][0]);assert.equal(p.end,periods[i][1]);assert.equal(p.timeType,'historical-event');assert(['A','B'].includes(p.evidence));assert(p.sources.length>=2);assert(p.reason.length>50);});
}
const html=read('index.html');
assert(html.indexOf('data/c7-dating-retro-monuments-o057-o060.js')<html.indexOf('v8136-dating-bridge.js'));
assert(html.indexOf('v8136-dating-bridge.js')<html.indexOf('v839-temaspar-context.js'));
console.log('PASS C7 UNESCO monument phases O057 O060');