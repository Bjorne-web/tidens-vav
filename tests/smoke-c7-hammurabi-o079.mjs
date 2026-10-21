import assert from 'node:assert/strict';import fs from 'node:fs';import vm from 'node:vm';
const read=p=>fs.readFileSync(p,'utf8'),ctx={window:{}};vm.createContext(ctx);
vm.runInContext(read('data/c7-dating-o079-hammurabi.js'),ctx);vm.runInContext(read('v8154-dating-bridge.js'),ctx);
const x=ctx.window.TIDENS_C7_DATING_PILOT.O079;assert(x&&x.phases.length===1);
const p=x.phases[0];assert.equal(p.timeType,'material-witness');assert.equal(p.start,-1792);assert.equal(p.end,-1750);assert.equal(p.evidence,'A');assert(p.sources.length>=2);
assert(x.undated.includes('inte en bild av en gud'));assert(x.undated.includes('direkt kopiering'));
const html=read('index.html');assert(html.indexOf('data/c7-dating-o079-hammurabi.js')<html.indexOf('v8154-dating-bridge.js'));assert(html.indexOf('v8154-dating-bridge.js')<html.indexOf('v839-temaspar-context.js'));
console.log('PASS C7 O079 Louvre stele material witness and Shamash legal distinctions');