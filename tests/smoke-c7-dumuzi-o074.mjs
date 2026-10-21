import assert from 'node:assert/strict';import fs from 'node:fs';import vm from 'node:vm';
const read=p=>fs.readFileSync(p,'utf8'),ctx={window:{}};vm.createContext(ctx);
vm.runInContext(read('data/c7-dating-o074-dumuzi.js'),ctx);vm.runInContext(read('v8150-dating-bridge.js'),ctx);
const x=ctx.window.TIDENS_C7_DATING_PILOT.O074;assert(x&&x.phases.length===1);
const p=x.phases[0];assert.equal(p.timeType,'material-witness');assert.equal(p.start,-1900);assert.equal(p.end,-1600);assert.equal(p.evidence,'A');assert(p.sources.length>=2);assert(p.sources.some(s=>s.url==='https://cdli.earth/artifacts/453307'));
assert(x.undated.includes('inte i sig'));assert(x.undated.includes('kristen uppståndelsetro'));
const html=read('index.html');assert(html.indexOf('data/c7-dating-o074-dumuzi.js')<html.indexOf('v8150-dating-bridge.js'));assert(html.indexOf('v8150-dating-bridge.js')<html.indexOf('v839-temaspar-context.js'));
console.log('PASS O074 source witness, broad tradition and resurrection caution');