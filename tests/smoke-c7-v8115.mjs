import assert from 'node:assert/strict';import fs from 'node:fs';import vm from 'node:vm';
const read=p=>fs.readFileSync(new URL('../'+p,import.meta.url),'utf8');
const ctx={window:{}};vm.createContext(ctx);
for(const v of [890,891,892,893,894,895,896,897,898,8101,8102,8103,8104,8105,8106,8107,8108,8109,8110,8111,8112,8113]){const p='data/c7-religionshistorisk-betydelse.v'+v+'.js';vm.runInContext(read(p),ctx,{filename:p});}
const previous={...ctx.window.TIDENS_C7_RELIGION};
assert.equal(Object.keys(previous).length,139,'Published C7 baseline');
const p='data/c7-religionshistorisk-betydelse.v8115.js';vm.runInContext(read(p),ctx,{filename:p});
const all=ctx.window.TIDENS_C7_RELIGION,expected=['O072','O073','O074','O075'];
assert.deepEqual(Object.keys(all).filter(id=>!(id in previous)).sort(),expected);
assert.equal(Object.keys(all).length,143);
for(const [id,x] of Object.entries(previous)){assert.equal(all[id].paragraph,x.paragraph,'Existing content unchanged '+id);}
const d=read('data/data.generated.js');const archive=JSON.parse(d.split('const originalEvents=')[1].split(';\nconst bibleOriginal=')[0]);
for(const id of expected){
 assert.ok(archive.some(p=>p.id===id),'Keep canonical original ID '+id);
 const x=all[id];assert.ok(x.paragraph.split(/\s+/).length>=175,id+' depth');
 assert.ok(x.sources.length>=3,id+' sources');
 assert.ok(x.sources.some(s=>s[1].includes('bible.com')),id+' Bible source');
 for(const [label,url] of x.sources){assert.ok(label.length>=20,id+' source name');assert.match(url,/^https:\/\//);}
}
const html=read('index.html');assert.ok(html.includes('<script src="'+p+'"></script>'));assert.ok(html.includes('v839-temaspar-context.js'));
for(let n=1;n<=66;n++)assert.ok(all['B'+String(n).padStart(3,'0')],'Retain all books');
console.log('C7 omgång 24 PASS: 143 ordinarie C7, O072–O075, no changes to existing entries');
