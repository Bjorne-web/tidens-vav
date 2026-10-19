import assert from 'node:assert/strict';import fs from 'node:fs';import vm from 'node:vm';
const read=p=>fs.readFileSync(new URL('../'+p,import.meta.url),'utf8');
const ctx={window:{}};vm.createContext(ctx);
for(const v of [890,891,892,893,894,895,896,897,898,8101,8102,8103,8104,8105,8106,8107,8108,8109,8110,8111,8112,8113,8114,8115,8116]){const p='data/c7-religionshistorisk-betydelse.v'+v+'.js';vm.runInContext(read(p),ctx,{filename:p});}
const before={...ctx.window.TIDENS_C7_RELIGION};assert.equal(Object.keys(before).length,156);
const path='data/c7-religionshistorisk-betydelse.v8117.js';vm.runInContext(read(path),ctx,{filename:path});
const after=ctx.window.TIDENS_C7_RELIGION,added=['O081','O082','O083','O084'];
assert.deepEqual(Object.keys(after).filter(k=>!(k in before)).sort(),added);
assert.equal(Object.keys(after).length,152);
for(const [id,v] of Object.entries(before)){assert.equal(after[id].paragraph,v.paragraph);assert.equal(after[id].level,v.level);}
const d=read('data/data.generated.js');const archive=JSON.parse(d.split('const originalEvents=')[1].split(';\nconst bibleOriginal=')[0]);
for(const id of added){assert.ok(archive.some(x=>x.id===id));const a=after[id];assert.ok(a.paragraph.split(/\s+/).length>=175);assert.ok(a.sources.length>=3);assert.ok(a.sources.some(s=>s[1].includes('bible.com')));for(const [n,url] of a.sources){assert.ok(n.length>=20);assert.match(url,/^https:\/\//);}}
assert.ok(after.O078,'O078 remains covered');
assert.ok(read('index.html').includes('<script src="'+path+'"></script>'));
console.log('PASS: C7 omgång 25 O077–O080, total 152 ordinary C7, earlier entries intact');
