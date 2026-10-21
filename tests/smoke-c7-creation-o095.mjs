import assert from 'node:assert/strict';import fs from 'node:fs';import vm from 'node:vm';
const read=p=>fs.readFileSync(p,'utf8'),ctx={window:{}};vm.createContext(ctx);
vm.runInContext(read('data/c7-dating-o095-creation.js'),ctx);vm.runInContext(read('v8170-dating-bridge.js'),ctx);
const x=ctx.window.TIDENS_C7_DATING_PILOT.O095;assert(x&&x.phases.length===0);assert.equal(x.evidence,'B');assert.equal(x.title,'Skapelsen – Första Moseboken 1–2');
for(const term of ['kanoniskt återställda','1:1–2:3','2:4–25','Qumran','utan separat tidsmarkör','originalarkivet'])assert(x.undated.includes(term));
const html=read('index.html');assert(html.indexOf('data/c7-dating-o095-creation.js')<html.indexOf('v8170-dating-bridge.js'));assert(html.indexOf('v8170-dating-bridge.js')<html.indexOf('v839-temaspar-context.js'));
assert(read('data/o095-o098-identity-fix.v8121.js').includes("O095:{title:'Skapelsen'"));
console.log('PASS O095 canonical identity and qualified undated Genesis creation traditions');