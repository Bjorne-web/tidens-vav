import assert from 'node:assert/strict';import fs from 'node:fs';import vm from 'node:vm';
const read=p=>fs.readFileSync(new URL('../'+p,import.meta.url),'utf8'),ctx={window:{}};vm.createContext(ctx);
vm.runInContext(read('data/data.generated.js'),ctx);vm.runInContext(read('data/o103-o106-identity.v8123.js'),ctx);
const ids=['O103','O104','O105','O106'],subjects=['Sinai och lagen','Ökenvandringen','Josuas erövringar','Domartiden'];
const entries=vm.runInContext('originalEvents.filter(e=>["O103","O104","O105","O106"].includes(e.id))',ctx);
for(let i=0;i<ids.length;i++){const e=entries.find(x=>x.id===ids[i]);assert.ok(e);assert.equal(e.title,subjects[i]);assert.equal(e.evidence,'Ej granskad');assert.equal(e.legacyTitle,'Exil/Post-exil');assert.equal(e.reviewed,false);}
const modules=[890,891,892,893,894,895,896,897,898,8101,8102,8103,8104,8105,8106,8107,8108,8109,8110,8111,8112,8113,8114,8115,8116,8117,8118,8119,8120,8122];for(const v of modules){const p='data/c7-religionshistorisk-betydelse.v'+v+'.js';vm.runInContext(read(p),ctx,{filename:p});}
const before={...ctx.window.TIDENS_C7_RELIGION};assert.equal(Object.keys(before).length,174);
vm.runInContext(read('data/c7-religionshistorisk-betydelse.v8123.js'),ctx);
const after=ctx.window.TIDENS_C7_RELIGION;assert.equal(Object.keys(after).length,178);assert.deepEqual(Object.keys(after).filter(x=>!(x in before)).sort(),ids);
for(const id of ids){const x=after[id];assert.ok(x.paragraph.split(/\s+/).length>=175);assert.ok(x.sources.length>=3);assert.ok(x.sources.some(y=>y[1].includes('bible.com')));}
for(const id of Object.keys(before))assert.equal(after[id].paragraph,before[id].paragraph);
const html=read('index.html');assert.ok(html.indexOf('data/data.generated.js')<html.indexOf('data/o103-o106-identity.v8123.js'));assert.ok(html.indexOf('data/o103-o106-identity.v8123.js')<html.indexOf('src="app.js"'));assert.ok(html.includes('data/c7-religionshistorisk-betydelse.v8123.js'));
assert.match(read('v839-temaspar-context.js'),/O103','O104','O105','O106/);
console.log('PASS C7 O103–O106 identities and 178 ordinary research analyses');