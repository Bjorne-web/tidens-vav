import assert from 'node:assert/strict';import fs from 'node:fs';import vm from 'node:vm';
const read=p=>fs.readFileSync(p,'utf8'),ctx={window:{}};vm.createContext(ctx);
vm.runInContext(read('data/c7-dating-o091-babylonian-theodicy.js'),ctx);vm.runInContext(read('v8166-dating-bridge.js'),ctx);
const x=ctx.window.TIDENS_C7_DATING_PILOT.O091;assert(x&&x.phases.length===1);const p=x.phases[0];
assert.equal(p.timeType,'material-witness');assert.equal(p.start,-700);assert.equal(p.end,-300);assert.equal(p.evidence,'B');assert(p.sources.length>=2);
for(const term of ['27 strofer','Saggil','Jobs bok','inte att Jobs bok direkt kopierade','Kommentarsfragmentet'])assert(x.undated.includes(term));
assert(p.reason.includes('inte originalverket självt'));
const html=read('index.html');assert(html.indexOf('data/c7-dating-o091-babylonian-theodicy.js')<html.indexOf('v8166-dating-bridge.js'));assert(html.indexOf('v8166-dating-bridge.js')<html.indexOf('v839-temaspar-context.js'));
console.log('PASS O091 Babylonian Theodicy commentary witness and Job comparison boundaries');